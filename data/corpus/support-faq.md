# Lumen Support — Internal FAQ & Runbook

## How do I reset a customer's API credentials?

Open a ticket of type `credentials-rotation`. Rotation is **irreversible** and
invalidates existing tokens immediately, so it requires **human approval** before
execution. Always confirm the customer contact via a verified channel first.

## A customer reports HTTP 429 errors

They are exceeding their plan's rate limit (see the Product Handbook). Advise
batch endpoints and exponential backoff honouring the `Retry-After` header.
If they are on Growth and consistently throttled, suggest an upgrade to Enterprise.

## A customer reports missing data after 7 days

They are almost certainly on the **Starter** plan, which has **7-day retention**.
Data older than the retention window is permanently deleted and cannot be
recovered. Recommend upgrading for longer retention.

## How do I escalate a P1 incident?

For Enterprise customers, a P1 (production down) must get a first response within
**1 hour**. Page the on-call engineer, open a `severity-1` ticket, and start an
incident channel. Post-incident, a written RCA is due within **5 business days**.

## Refund policy

Refunds for service credits follow the SLA. If monthly uptime drops below the
**99.95%** Enterprise SLA, the customer is eligible for service credits
proportional to the downtime, capped at **30% of the monthly fee**.

## Common ticket priorities

- `low`: questions, how-to, non-blocking.
- `high`: blocked workflow, data discrepancy, or anything affecting production.
