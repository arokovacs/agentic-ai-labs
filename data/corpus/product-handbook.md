# Lumen Platform — Product Handbook (Internal)

## What Lumen is

Lumen is a fictional B2B analytics platform. It ingests event streams and exposes
dashboards and a query API. Pricing is per ingested event with three tiers:
**Starter**, **Growth**, and **Enterprise**.

## Plans and limits

- **Starter**: up to 1 million events/month, 7-day retention, community support.
- **Growth**: up to 50 million events/month, 90-day retention, email support,
  SSO via OIDC.
- **Enterprise**: custom volume, 18-month retention, 24/7 support, EU data
  residency guarantee, audit logs, and a 99.95% uptime SLA.

## Data residency

All Enterprise data is stored in the **EU (Frankfurt and Paris regions)**.
Customer data is never replicated outside the EU. This is a contractual
commitment and a GDPR requirement for our European customers.

## API rate limits

The query API allows **100 requests per minute** on Growth and **600 requests
per minute** on Enterprise. Exceeding the limit returns HTTP 429 with a
`Retry-After` header. Batch endpoints are recommended above 10 requests/second.

## Authentication

The API uses **OAuth 2.0 client credentials**. Tokens expire after **1 hour**.
SSO (OIDC) is available on Growth and Enterprise. API keys are deprecated and
will be removed in the next major version — migrate to OAuth.

## Support SLAs

- Enterprise: first response within **1 hour** for critical (P1) incidents.
- Growth: first response within **8 business hours**.
- Starter: best-effort community forum only.
