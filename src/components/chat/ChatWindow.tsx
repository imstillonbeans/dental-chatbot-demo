'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import QuickReplies from './QuickReplies'
import TypingIndicator from './TypingIndicator'
import { DISCLAIMER } from '@/lib/disclaimer'

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

// Placeholder responses for Phase 1 — replaced by Claude API in Phase 4
const PLACEHOLDER_RESPONSE =
  "Thanks for your message! I can help with scheduling and office questions. " +
  "To get started, try one of the quick replies above, or ask me about " +
  "office hours, insurance, or booking an appointment."

type Message = {
  role: 'bot' | 'user'
  content: string
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: WELCOME_MESSAGE },
  ])
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    setShowQuickReplies(false)
    setMessages((prev) => [...prev, { role: 'user', content: text }])

    // Phase 4: replace this block with a POST to /api/chat
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: PLACEHOLDER_RESPONSE },
      ])
    }, 1000)
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
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  )
}
