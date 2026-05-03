# v0 Scope Doc

Scope: single happy path O2C flow. CRM -> Orchestrator -> ERP with payment application

## What it does

- Accept order webhook from a stub CRM
- Validates order for valid customer id format, order total reconciles to line item sums.
- Persists with status
- Async pushes to a stub ERP
- Retries failure with a backoff
- Idempotent on duplicate webhooks
- Accept payment webhook from a stub payment gateway
- Exposes a status query endpoint

## What it does not do

- No real CRM integration
- No real ERP integration
- No multi-tenancy
- No admin UI
- No transformation DSL
- No support for multiple CRMs
- No support for physical inventory
- No support for returns
- No authentication on the webhook beyond a shared secret header
- No real message broker, Postgres outbox only
- No retry policy configurability, hardcoded backoff schedule
- No order modifications or cancellations
- No multi-currency or tax calculation logic
- No customer or product master data sync
- No frontend

## What does done look like?

I can run docker-compose up, POST a sample order JSON to the webhook endpoint, watch it flow through validation
and the outbox, see it arrive in at the stub ERP, GET the status endpoint and see it marked synced. I can
POST a sample payment JSON and see it applied to the order in the stub ERP. I can POST duplicates and see it
deduped, and configure the stub ERP to keep failing past the retry limit and see the order land in a failed state, queryable via the status endpoint.

## v1

- Deploy to AWS with IaC
- Swap Postgres outbox for real broker
- Add observability beyond logs
