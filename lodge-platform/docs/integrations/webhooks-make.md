# Catch BAIA webhooks in Make.com

Make (formerly Integromat) can receive BAIA `entity.action` webhooks and route them to hundreds of apps.

## 1. Subscribe in BAIA

Follow **[Webhooks & events](../webhooks.md#subscribing)**:

```http
POST /api/v1/connect/subscriptions
Authorization: (none — use x-api-key; see connect-api-key.md)
```

Include `propertyId`, `callbackUrl`, `events`, and a strong `secret`. Use `POST /api/v1/connect/subscriptions/:id/test` to send a sample event.

## 2. Custom webhook module

1. Create a new scenario → **Webhooks** → **Custom webhook**.
2. Copy the generated URL into BAIA `callbackUrl`.
3. Configure the webhook to accept **POST** with **JSON** body.

Run the scenario once so Make registers the webhook, then trigger BAIA’s test delivery.

## 3. Verify the signature

Read headers from the incoming request:

| Header | Use |
|--------|-----|
| `X-BAIA-Signature` | HMAC-SHA256 of the **raw** body, prefixed with `sha256=` |
| `X-BAIA-Event-Id` | Idempotency key |
| `X-BAIA-Event-Type` | Same as JSON `eventType` |

Implement verification in a **Make Code** module (JavaScript) using your subscription `secret`. Algorithm and sample code: **[Webhooks & events](../webhooks.md#delivery-format)**.

If verification fails, stop the scenario and return a non-2xx response so BAIA can retry per **[retries](../webhooks.md#retries)**.

## 4. Map fields

Parse JSON fields: `eventType`, `propertyId`, `entityId`, `data`, `timestamp`. Branch routers on `eventType` or `entityType`.

For PII-heavy workflows, call BAIA REST endpoints with your integration credentials after the webhook (webhook alone does not grant API access).

## 5. Production notes

- Respond with HTTP 200 quickly; defer heavy steps to later modules.
- Store processed `X-BAIA-Event-Id` values (Data store module) to skip duplicates.
- Monitor `GET /api/v1/connect/subscriptions/:id/deliveries` if deliveries fail.
