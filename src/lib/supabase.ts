import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client — uses the service role key, which bypasses RLS.
// Only import this in API routes (server-side). Never use in client components.
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Type definitions matching our database schema
export type Tenant = {
  id: string
  name: string
  slug: string
  notification_email: string
  config: {
    services: string[]
    hours: string
    phone?: string
  }
  created_at: string
}

export type Booking = {
  id?: string
  tenant_id: string
  patient_name: string
  patient_contact: string
  service_type: string
  preferred_day: string
  preferred_time: string
  status?: string
  created_at?: string
}
