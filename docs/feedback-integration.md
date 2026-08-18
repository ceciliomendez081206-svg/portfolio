Feedback integrations

This project supports multiple server-side destinations for feedback submissions from the frontend. The `/api/feedback` serverless route will attempt these in order:

- `FEEDBACK_WEBHOOK` — forward the raw payload to a webhook (Slack, Zapier, etc.).
- Airtable — when `FEEDBACK_AIRTABLE_API_KEY`, `FEEDBACK_AIRTABLE_BASE`, and `FEEDBACK_AIRTABLE_TABLE` are set.
- Supabase — when `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_TABLE` are set.
- Fallback: writes to `data/feedback_submissions.json` (useful for local testing).

Environment variable examples

- Webhook (Slack/Zapier):
  - `FEEDBACK_WEBHOOK` = https://hooks.example.com/...

- Airtable:
  - `FEEDBACK_AIRTABLE_API_KEY` = your Airtable API key (starts with `key...`)
  - `FEEDBACK_AIRTABLE_BASE` = your Airtable Base ID (e.g. `app...`)
  - `FEEDBACK_AIRTABLE_TABLE` = the table name (e.g. `Submissions`)

- Supabase:
  - `SUPABASE_URL` = https://xyzcompany.supabase.co
  - `SUPABASE_SERVICE_ROLE_KEY` = your Service Role API key (keep secret)
  - `SUPABASE_TABLE` = the target table name (e.g. `feedback`)

Notes and security

- For Airtable, the server code uses the standard Airtable REST API to create a single record. Fields are taken directly from the submitted JSON (nested objects are JSON-stringified).
- For Supabase, the server uses the REST endpoint with the Service Role key for server-side inserts. Do NOT expose the Service Role key to client-side code.
- In production prefer forwarding to a webhook or inserting into a database rather than relying on the `data/` file fallback — serverless platforms often have ephemeral filesystems.

Quick tests (after deploying to Vercel or running a Node server that exposes `/api/feedback`)

Curl example:

```bash
curl -X POST https://your-deploy.com/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"you@example.com","message":"hello"}'
```

Local dev

- The fallback `data/feedback_submissions.json` is written only when integrations/webhook are not configured or forwarding fails. On Vite dev server this file will not be created unless you run a separate Node server that mounts the `api/` handler (or deploy to Vercel).

If you want, I can:
- Add example serverless env settings for Vercel.
- Add an Airtable schema recommendation or a Supabase migration SQL for the `feedback` table.
