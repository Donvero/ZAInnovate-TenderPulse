# TenderPulse 🇿🇦 — South African Government Tender Alert Intelligence Terminal

[![Brand](https://img.shields.io/badge/ZAInnovate-Technologies-0E1B2E?style=for-the-badge&logoColor=FFC20E)](https://zainnovate.co.za)
[![B-BBEE](https://img.shields.io/badge/B--BBEE-Level%201%20(135%25)-FFC20E?style=for-the-badge&labelColor=0E1B2E)](https://zainnovate.co.za)
[![Ownership](https://img.shields.io/badge/100%25-Black%20Youth--Owned-emerald?style=for-the-badge&labelColor=0E1B2E)](https://zainnovate.co.za)
[![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Payments](https://img.shields.io/badge/Payments-Paystack%20ZAR-09A5DB?style=for-the-badge)](https://paystack.com)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Prisma-336791?style=for-the-badge&logo=postgresql)](https://prisma.io)

> **TenderPulse** is an institutional procurement intelligence SaaS engineered by **ZAInnovate Technologies (Pty) Ltd** (East London, Eastern Cape, South Africa). It alerts South African emerging contractors, civil engineers, IT service providers, and SMMEs about new national, provincial, and municipal government tenders matching their specific profile in under 3 minutes.

---

## ⚡ Key Value Proposition

Government procurement in South Africa exceeds **R900 Billion annually**, yet over 80% of emerging SMMEs are systematically disqualified due to:
1. **Missed Briefing Sessions:** Tenders published quietly with compulsory briefings scheduled 48 hours later in distant towns.
2. **eTenders Portal Downtime:** Unreliable access and broken download links on public servers during peak submission windows.
3. **Administrative Disqualification:** Failure to attach mandatory **SBD 1, SBD 4, SBD 6.1 (PPPFA preference claims)**, or having an inactive CSD tax status PIN.

**TenderPulse solves this:**
- 🚀 **Sub-3-Minute WhatsApp & Email Alerts:** Direct push notifications within 180 seconds of gazetting.
- 🏗️ **CIDB Grade & Province Matching:** Filter specifically for your grading (1GB through 9CE) across all 9 provinces.
- 📅 **Compulsory Briefing Countdown & Calendar Sync:** Physical venue GPS coordinates and virtual meeting links with 48h/24h reminders.
- 📋 **Automated SBD Compliance Pre-Flight Checklist:** Never drop an incomplete envelope in the municipal tender box.
- 💳 **Seamless ZAR Billing via Paystack:** Accessible at **R99/month** (Pro Contractor) or **R299/month** (Enterprise Growth) with Capitec Pay, Ozow Instant EFT, Visa, and Mastercard.

---

## 🏛️ System Architecture

```
                                  SOUTH AFRICAN TENDER SOURCES
     [National Treasury eTenders]   [CIDB i-Tender Bulletin]   [Provincial Bulletins (EC, GP, WC)]
                   │                          │                          │
                   └──────────────────────────┼──────────────────────────┘
                                              ▼
                             ┌─────────────────────────────────┐
                             │    eTenders Scraper & Parser    │
                             │   (Cheerio, Regex, Categorizer) │
                             └────────────────┬────────────────┘
                                              ▼
                             ┌─────────────────────────────────┐
                             │       PostgreSQL Database       │
                             │  (Supabase / Prisma ORM Engine) │
                             └────────────────┬────────────────┘
                                              ▼
                             ┌─────────────────────────────────┐
                             │     TenderPulse Match Engine    │
                             │ (Profile, CIDB, Province, SBD)  │
                             └───────┬─────────────────┬───────┘
                                     │                 │
             ┌───────────────────────┘                 └───────────────────────┐
             ▼                                                                 ▼
┌─────────────────────────┐                                       ┌─────────────────────────┐
│  WhatsApp Rapid Gateway │                                       │      Resend Engine      │
│ (Twilio / AT / Infobip) │                                       │ (Rich HTML Navy & Gold) │
└────────────┬────────────┘                                       └────────────┬────────────┘
             │                                                                 │
             └───────────────────────────────┬─────────────────────────────────┘
                                             ▼
                             ┌─────────────────────────────────┐
                             │    Contractor Terminal HUD      │
                             │ (Linear / Bloomberg Dark UI)   │
                             └─────────────────────────────────┘
```

---

## 💰 Subscription Plans

| Tier | Price (ZAR) | Scope | Features |
|---|---|---|---|
| **Explorer** | Free | National Directory | 3 full document views/mo, weekly email digest, standard category browse. |
| **Pro Contractor** | **R99 / month**<br>*(or R990/yr)* | 2 Target Provinces + 4 Categories | **⚡ Sub-3-min WhatsApp & Email alerts**, unlimited downloads, CIDB grade filtering (1-9), compulsory briefing reminders, full SBD packs. |
| **Enterprise Growth** | **R299 / month**<br>*(or R2,990/yr)* | All 9 SA Provinces | All Pro features + unlimited categories, multi-user seats (up to 5 team members), historical pricing benchmarks, dedicated account manager. |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org) (App Router, Server Components & Server Actions)
- **Language:** TypeScript 5.6 (Strict Type Checking)
- **Styling:** Tailwind CSS + Custom Institutional Terminal Navy (`#070E17`, `#0E1B2E`) and Electric Gold (`#FFC20E`)
- **Icons:** [Lucide React](https://lucide.dev)
- **Database & ORM:** PostgreSQL ([Supabase](https://supabase.com)) with [Prisma ORM](https://prisma.io)
- **Authentication:** [NextAuth.js](https://next-auth.js.org) (Credentials Terminal Access + Google OAuth)
- **Payments:** [Paystack](https://paystack.com) South African Rand Gateway (Subscriptions, Webhooks, Instant EFT, Capitec Pay)
- **Email Delivery:** [Resend](https://resend.com) with custom branded HTML templates
- **Scraper:** Cheerio HTML parser + National Treasury API connector

---

## 🚀 Quickstart Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Donvero/ZAInnovate-TenderPulse.git
cd ZAInnovate-TenderPulse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env` based on `.env.example`:
```bash
cp .env.example .env
```

Fill in your secrets:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-nextauth-secret"

# PostgreSQL (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Paystack (ZAR)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
PAYSTACK_PRO_PLAN_CODE="PLN_tenderpulse_pro_99"
PAYSTACK_BUSINESS_PLAN_CODE="PLN_tenderpulse_biz_299"

# Resend Email
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="TenderPulse <alerts@zainnovate.co.za>"

# Cron Authentication
CRON_SECRET="your-cron-secret-token"
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run automated test suites
```bash
npx vitest run
```
Expected output: **14/14 tests passed (100%)** across:
- `paystack-webhook.test.ts` (HMAC-SHA512 webhook security, event handling, subscription states)
- `scraper-engine.test.ts` (eTenders South Africa parsing, regex CIDB grading 1GB–9CE, PPPFA 80/20 & 90/10 points calculation)

### 6. Build for production
```bash
npm run build
```
Compiles with static page optimization across all 17 routes and React `<Suspense>` boundaries.

---

## 💎 Design Taste & Terminal Interface Standards

TenderPulse is engineered according to anti-AI-slop design and craft engineering standards derived from [`Donvero/hallmark`](https://github.com/Donvero/hallmark) and [`Donvero/taste-skill`](https://github.com/Donvero/taste-skill):
- **The Floor:** WCAG AAA high-contrast readability (Obsidian canvas `#070E17`, Terminal Navy `#0E1B2E`, Electric Gold `#FFC20E`), tactile card interactions, mobile-responsive layout where contractor filters fold away cleanly.
- **Color Spent Strictly on Data:** Color is used exclusively for actionable procurement status (Green for Open/Active Tenders, Amber for 48h Compulsory Briefings, Red for Disqualification Risk).
- **Tabular Numerals & Monospace Pricing:** Financial amounts (e.g. `R1,480,000.00`) and CIDB grades (`8CE`, `7GB`) are formatted in monospace typography to prevent visual jitters.
- **Zero AI Slop:** No generic AI templates, no placeholder tenders, and no artificial testimonials. Built for real South African contractors and SMMEs.

---

## 📜 Sovereign IP, Forkability & Public View License

This repository is published for **public inspection, peer audit, and statutory procurement verification**.

- **Public View & Review:** Public inspection and technical evaluation are permitted.
- **Forkability & Commercial Use:** Forking, redistribution, deployment, or commercial utilization of the TenderPulse codebase, matching algorithms, or Paystack webhook pipelines is **strictly subject to prior written approval of the owner**:
  - **Owner:** Fana Siyasanga Qhawe Mgengo ([@Donvero](https://github.com/Donvero))
  - **Entity:** ZAinnovate Technologies (Pty) Ltd (Reg: 2025/572318/07)
  - **Licensing Contact:** `director@zainnovate.co.za` | `legal@zainnovate.co.za`

---

## 🏢 Company Profile & Statutory Credentials

**ZAInnovate Technologies (Pty) Ltd**
- **Registration Number:** 2025/572318/07
- **National Treasury CSD:** MAAA1646894
- **B-BBEE Status:** Level 1 Contributor (135% Procurement Spend Recognition)
- **Ownership:** 100% Black Youth-Owned Enterprise
- **Headquarters:** 14 Abdullah Ibrahim Close, Belgravia Valley, East London, Eastern Cape, 5241
- **Website:** [https://zainnovate.co.za](https://zainnovate.co.za)
- **Contact:** `procurement@zainnovate.co.za` | `contact@zainnovate.co.za`

---

<div align="center">
  <sub>TenderPulse is sovereign software engineered by ZAInnovate Technologies (Pty) Ltd. Copyright © 2025–2026. All sovereign rights reserved. Built with mathematical precision in East London, South Africa.</sub>
</div>
