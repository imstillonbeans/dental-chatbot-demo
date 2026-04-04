'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import QuickReplies from './QuickReplies'
import TypingIndicator from './TypingIndicator'
import { DISCLAIMER } from '@/lib/disclaimer'
import { isBookingComplete, extractBooking } from '@/lib/booking-extractor'

const QUICK_REPLIES = [
  'Book Appointment',
  'Office Hours',
  'Insurance',
  'New Patient Info',
  'Emergency?',
  'Talk to Staff',
]

const WELCOME_MESSAGE =
  "Hi! I'm your dental office assistant. I can help you schedule an appointment, " +
  "answer common questions, or connect you with our staff. How can I help you today?"

type Message = {
  role: 'bot' | 'user'
  content: string
}

type Props = {
  tenantId: string
}

export default function ChatWindow({ tenantId }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: WELCOME_MESSAGE },
  ])
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [bookingDone, setBookingDone] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    if (isTyping || bookingDone) return

    setShowQuickReplies(false)
    const updatedMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(updatedMessages)
    setIsTyping(true)

    try {
      // Build message history in Claude's format
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, tenantId }),
      })

      const data = await res.json()
      const reply: string = data.reply ?? 'Sorry, something went wrong. Please try again.'

      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', content: reply }])

      // If Claude signals a completed booking, save it to the DB
      if (isBookingComplete(reply)) {
        const booking = extractBooking(reply)
        if (booking) {
          setBookingDone(true)
          await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...booking, tenant_id: tenantId }),
          })
        }
      }
    } catch {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Connection error. Please try again.' },
      ])
    }
  }

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden"
      style={{ height: '560px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800 text-sm leading-tight">
            Dental Office Assistant
          </p>
          <p className="text-xs text-green-600 font-medium">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="px-4 py-2 border-t border-slate-100">
          <QuickReplies replies={QUICK_REPLIES} onSelect={handleSend} />
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
        <p className="text-xs text-amber-700 leading-snug">{DISCLAIMER}</p>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-100">
        <ChatInput onSend={handleSend} disabled={isTyping || bookingDone} />
      </div>
    </div>
  )
}
