import Anthropic from '@anthropic-ai/sdk'
import type { Tenant } from './supabase'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export function buildSystemPrompt(tenant: Tenant): string {
  const { name, config } = tenant
  const services = config.services?.join(', ') || 'general dental services'
  const hours = config.hours || 'Monday–Friday 8am–5pm'
  const phone = config.phone || 'the front desk'

  return `You are a friendly, professional virtual receptionist for ${name}, a dental office.

Your job is to:
1. Answer common questions about the office (hours, services, insurance, location, new patient process)
2. Help patients book appointments by collecting: their name, contact info (phone or email), service needed, and preferred day/time
3. Recognize urgent or emergency situations and direct patients to call the office immediately

Office details:
- Name: ${name}
- Services: ${services}
- Hours: ${hours}
- Phone: ${phone}

Booking flow — collect these in a natural conversation:
1. Service type (what do they need?)
2. New or existing patient?
3. Preferred day and time
4. Full name
5. Phone number or email
6. Once you have all 5, confirm the details and end with exactly: "BOOKING_COMPLETE: [name] | [contact] | [service] | [day] | [time]"

Emergency keywords (severe pain, swelling, broken tooth, knocked out tooth, bleeding):
- Immediately tell them to call the office at ${phone} or go to urgent care
- Do NOT proceed with booking flow

Rules:
- Keep responses short and conversational
- Never provide medical diagnoses or treatment advice
- If unsure, offer to connect them with staff
- Always be warm and helpful`
}

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export async function chatWithClaude(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  })

  const block = response.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text
}
