// Parses a completed booking from Claude's final message.
// Claude is instructed to end with: "BOOKING_COMPLETE: [name] | [contact] | [service] | [day] | [time]"

export type ExtractedBooking = {
  patient_name: string
  patient_contact: string
  service_type: string
  preferred_day: string
  preferred_time: string
}

export function extractBooking(message: string): ExtractedBooking | null {
  const match = message.match(/BOOKING_COMPLETE:\s*(.+)/)
  if (!match) return null

  const parts = match[1].split('|').map((s) => s.trim())
  if (parts.length < 5) return null

  const [patient_name, patient_contact, service_type, preferred_day, preferred_time] = parts

  if (!patient_name || !patient_contact || !service_type || !preferred_day || !preferred_time) {
    return null
  }

  return { patient_name, patient_contact, service_type, preferred_day, preferred_time }
}

export function isBookingComplete(message: string): boolean {
  return /BOOKING_COMPLETE:/.test(message)
}
