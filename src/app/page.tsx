import ChatWindow from '@/components/chat/ChatWindow'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Hero + Chat */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Copy */}
        <div>
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            AI Booking Assistant
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Your dental office,<br />
            <span className="text-blue-600">always available.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Help patients book appointments and get answers to common questions —
            24/7, without adding staff hours.
          </p>
          <ul className="space-y-3">
            {[
              'Answers FAQs instantly — hours, insurance, location',
              'Collects appointment requests around the clock',
              'Routes urgent issues directly to your phone line',
              'Live in under 48 hours on your existing website',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Chat Widget */}
        <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
          <ChatWindow />
          <p className="mt-3 text-center text-xs text-slate-400">
            Live demo — try asking about office hours or booking
          </p>
        </div>
      </section>

      {/* FAQ Topics */}
      <section className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
            What patients can ask
          </h2>
          <p className="text-slate-500 text-center mb-10 text-sm">
            The assistant handles these questions automatically — no staff time required.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: '🕐', label: 'Office Hours' },
              { icon: '📍', label: 'Location & Directions' },
              { icon: '🦷', label: 'Services Offered' },
              { icon: '💳', label: 'Insurance Accepted' },
              { icon: '🆕', label: 'New Patient Process' },
              { icon: '📅', label: 'Book Appointment' },
              { icon: '🔄', label: 'Reschedule / Cancel' },
              { icon: '📞', label: 'Contact Staff' },
              { icon: '🚨', label: 'Dental Emergencies' },
              { icon: '🚶', label: 'Walk-in Policy' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Ready to add this to your practice?
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            One line of code on your website. Live in 48 hours. No technical setup required on your end.
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-150 text-sm"
          >
            Get in touch
          </a>
          <p className="mt-4 text-xs text-slate-400">
            We&apos;ll walk you through it in 15 minutes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 px-6 text-center">
        <p className="text-xs text-slate-400">
          Need to speak with staff directly?{' '}
          <a href="tel:+1-719-000-0000" className="text-blue-500 hover:underline">
            Call the office
          </a>
          {' · '}
          <a href="mailto:office@example.com" className="text-blue-500 hover:underline">
            Send an email
          </a>
        </p>
      </footer>

    </main>
  )
}
