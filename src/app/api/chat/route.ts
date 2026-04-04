import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { buildSystemPrompt, chatWithClaude } from '@/lib/claude'
import type { ChatMessage } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const { messages, tenantId } = await req.json() as {
      messages: ChatMessage[]
      tenantId: string
    }

    if (!messages || !tenantId) {
      return NextResponse.json({ error: 'messages and tenantId are required' }, { status: 400 })
    }

    // Fetch tenant config from Supabase
    const { data: tenant, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single()

    if (error || !tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    const systemPrompt = buildSystemPrompt(tenant)
    const reply = await chatWithClaude(messages, systemPrompt)

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[/api/chat]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
