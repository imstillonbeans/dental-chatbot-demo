import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Booking } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<Booking, 'id' | 'created_at' | 'status'>

    const { tenant_id, patient_name, patient_contact, service_type, preferred_day, preferred_time } = body

    if (!tenant_id || !patient_name || !patient_contact || !service_type || !preferred_day || !preferred_time) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 })
    }

    // Write booking to Supabase
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({ tenant_id, patient_name, patient_contact, service_type, preferred_day, preferred_time, status: 'pending' })
      .select()
      .single()

    if (dbError) {
      console.error('[/api/bookings] DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
    }

    // Send email notification if RESEND_API_KEY is set
    if (process.env.RESEND_API_KEY) {
      const { data: tenant } = await supabase
        .from('tenants')
        .select('name, notification_email')
        .eq('id', tenant_id)
        .single()

      if (tenant) {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Dental Chatbot <onboarding@resend.dev>',
          to: tenant.notification_email,
          subject: `New Booking Request — ${patient_name}`,
          text: [
            `New booking request for ${tenant.name}`,
            '',
            `Patient: ${patient_name}`,
            `Contact: ${patient_contact}`,
            `Service: ${service_type}`,
            `Preferred day: ${preferred_day}`,
            `Preferred time: ${preferred_time}`,
            '',
            `Booking ID: ${booking.id}`,
          ].join('\n'),
        })
        if (emailError) console.error('[/api/bookings] Resend error:', emailError)
        else console.log('[/api/bookings] Email sent:', emailData?.id)
      }
    }

    return NextResponse.json({ success: true, booking })
  } catch (err) {
    console.error('[/api/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
