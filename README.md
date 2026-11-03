# TenderPulse

Tender discovery and alerting software for South African contractors, engineers, and SMMEs.

TenderPulse collects public procurement notices, lets users filter them by province, category, value, and CIDB grading, and supports saved tenders, bid pipelines, alerts, and ZAR subscriptions.

## Current scope

- Next.js App Router, TypeScript, Prisma, PostgreSQL, and NextAuth.
- Tender ingestion and search.
- Province, category, value, and CIDB filters.
- Saved tenders and alert configuration.
- Paystack billing and webhook handling.

## Development

```bash
npm ci
npm run dev
npm test
npm run build
```

Configure `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `CRON_SECRET`, and Paystack credentials for connected flows. Production cron access must use `CRON_SECRET`; development demo access must be explicitly enabled and must never be the production authentication path.

## Product and data rules

- Keep South African terminology, provinces, ZAR values, CIDB gradings, and SBD/MBD references accurate.
- Preserve the source URL and retrieval time for every tender.
- Mark stale, simulated, and incomplete records clearly.
- Scope saved tenders, alerts, subscriptions, and payment history to the authenticated user.
- Verify Paystack signatures before processing events and make event handling idempotent.

## License

See `LICENSE`.
