# Dental AI Chatbot — SaaS Platform

A multi-tenant AI chatbot platform built for independent dental practices — handling patient inquiries, FAQs, and lead capture 24/7 so your front desk doesn't have to.

---

## What It Does

- **24/7 Patient Engagement** — Answers common questions and captures new patient leads around the clock, including after business hours
- **Multi-Tenant Widget** — Each dental practice gets its own embeddable chat widget, independently configured and branded
- **Conversational AI** — Powered by Anthropic's Claude API for natural, high-quality responses that go beyond rigid rule-based bots
- **Lead Capture & FAQ** — Collects new patient info, answers insurance and appointment questions, and routes complex inquiries to staff — no PHI stored

---

## Why It Works

**40% of dental patient inquiries arrive after business hours** — and most go unanswered until the next day, costing practices new patients and revenue.

| Metric | Impact |
|---|---|
| Reduction in front desk call volume | **70%** |
| Reduction in patient no-shows | **40%** |
| Monthly operational savings per practice | **$3,000 – $5,000** |

Existing solutions — TrueLark, Intercom, AgentiveAIQ — are either priced for enterprise, built on rigid decision trees, or not designed for dental workflows. This platform is purpose-built for independent practices, priced accessibly, and backed by Claude's industry-leading conversational quality.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [Next.js](https://nextjs.org/) (TypeScript, App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Backend / Database | [Supabase](https://supabase.com/) (Postgres, Auth, Storage) |
| AI / Chat | [Anthropic Claude API](https://www.anthropic.com/) |
| Hosting | [Vercel](https://vercel.com/) |

---

## Current Status

> **Scaffolded — MVP in active development**

The project was initialized with `create-next-app` with TypeScript and Tailwind CSS configured. The default Next.js starter page is currently in place. Core chatbot UI and backend integrations are being built out in Phase 1.

---

## Roadmap

### Phase 1 — MVP *(current)*
- [ ] Core embeddable chat widget
- [ ] Claude API integration with dental-specific system prompts
- [ ] Supabase multi-tenant backend (one schema per practice)
- [ ] Basic FAQ training per practice
- [ ] New patient lead capture form via chat

### Phase 2 — Integrations
- [ ] Calendar booking (Google Calendar, Dentrix, Eaglesoft)
- [ ] SMS / WhatsApp channel support
- [ ] Google review prompt automation for satisfied patients
- [ ] Email notification routing for captured leads

### Phase 3 — Scale
- [ ] Analytics dashboard per practice (conversation volume, lead rate, topics)
- [ ] White-label option for DSO / multi-location groups
- [ ] Insurance pre-verification conversational flow
- [ ] Post-procedure follow-up automation
- [ ] HIPAA compliance infrastructure (BAA, encrypted PHI storage)

---

## Use Cases

1. **After-Hours Inquiry Handling** — Capture patient questions and lead info when the office is closed
2. **Appointment FAQ** — Answer questions about scheduling, cancellations, and wait times
3. **New Patient Intake** — Collect name, contact info, insurance carrier, and reason for visit before the first call
4. **Insurance Questions** — Answer common in-network / out-of-network questions and direct patients to the right contact
5. **After-Hours Triage** — Guide patients with urgent concerns (toothache, broken tooth) to appropriate next steps
6. **Patient Reactivation** — Re-engage patients who haven't been in for a cleaning or follow-up
7. **Treatment FAQ** — Explain common procedures (cleanings, fillings, whitening, implants) in plain language
8. **Review Generation** — Prompt happy patients to leave a Google review at the right moment in the conversation

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/imstillonbeans/dental-chatbot-demo.git
cd dental-chatbot-demo
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Business Model

Designed for **independent dental practices in Colorado** with plans to expand regionally.

| Plan | Price | Best For |
|---|---|---|
| Starter | $99 / month | Single-location practice, core FAQ + lead capture |
| Growth | $249 / month | Calendar integration, SMS notifications, review prompts |
| Pro | $499 / month | Multi-location, analytics dashboard, priority support |

> **Note:** This is a lead capture and FAQ tool. No Protected Health Information (PHI) is stored. HIPAA compliance infrastructure is planned for Phase 3.

---

## Built By

**Jack Long** — [Peak AI Automations](https://peakautomations.org)

Building practical AI automation tools for small and independent businesses.
