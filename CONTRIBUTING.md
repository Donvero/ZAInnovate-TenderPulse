# Contributing to TenderPulse

Thank you for your interest in contributing to **TenderPulse** — the South African government tender alert SaaS engineered by **ZAInnovate Technologies (Pty) Ltd**.

## 🇿🇦 Context & Standards

TenderPulse is a commercial procurement intelligence engine serving South African SMMEs, contractors, and civil engineers. Code quality, typography, and styling must adhere to institutional terminal standards (dark obsidian navy `#070E17` / `#0E1B2E` and electric gold `#FFC20E`).

## 🛠️ Development Workflow

1. Fork or branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Ensure strict TypeScript types (`strict: true`):
   No `any` unless strictly interfacing with dynamic legacy government scrape feeds.
3. Keep South African context authentic:
   - Currency: South African Rand (ZAR)
   - Proper SBD / MBD form terminology
   - CIDB contractor gradings (1GB - 9CE)
   - 9 Official South African provinces
4. Test changes locally:
   ```bash
   npm run build
   ```
5. Submit a descriptive Pull Request with visual verification.

## 🏢 Contact
Engineered by ZAInnovate Technologies (Pty) Ltd  
East London, Eastern Cape, South Africa  
Email: `procurement@zainnovate.co.za`
