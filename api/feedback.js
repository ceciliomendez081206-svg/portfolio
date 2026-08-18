import fs from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let payload
  try {
    payload = await req.json()
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // If a webhook is configured (Slack, Zapier, etc.), forward the payload.
  if (process.env.FEEDBACK_WEBHOOK) {
    try {
      const r = await fetch(process.env.FEEDBACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!r.ok) throw new Error('Webhook responded with ' + r.status)
      return res.status(200).json({ ok: true, forwarded: true })
    } catch (err) {
      console.error('Webhook forward failed:', err.message)
      // fall through to local store fallback
    }
  }
  // Try Airtable and Supabase if configured (server-side).
  const results = {}

  async function tryAirtable(payload) {
    const API_KEY = process.env.FEEDBACK_AIRTABLE_API_KEY
    const BASE = process.env.FEEDBACK_AIRTABLE_BASE
    const TABLE = process.env.FEEDBACK_AIRTABLE_TABLE
    if (!API_KEY || !BASE || !TABLE) return false
    try {
      const url = `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(TABLE)}`
      const fields = {}
      for (const k of Object.keys(payload || {})) {
        const v = payload[k]
        fields[k] = typeof v === 'object' ? JSON.stringify(v) : String(v ?? '')
      }
      const r = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      })
      if (!r.ok) {
        const txt = await r.text()
        console.error('Airtable insert failed:', r.status, txt)
        return false
      }
      return true
    } catch (err) {
      console.error('Airtable error:', err)
      return false
    }
  }

  async function trySupabase(payload) {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    const TABLE = process.env.SUPABASE_TABLE
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !TABLE) return false
    try {
      const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${TABLE}`
      const r = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(payload),
      })
      if (!r.ok) {
        const txt = await r.text()
        console.error('Supabase insert failed:', r.status, txt)
        return false
      }
      return true
    } catch (err) {
      console.error('Supabase error:', err)
      return false
    }
  }

  // Attempt both integrations (collect results). Prefer any successful server-side persistence.
  try {
    if (process.env.FEEDBACK_AIRTABLE_API_KEY && process.env.FEEDBACK_AIRTABLE_BASE && process.env.FEEDBACK_AIRTABLE_TABLE) {
      results.airtable = await tryAirtable(payload)
    }
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_TABLE) {
      results.supabase = await trySupabase(payload)
    }
    if (Object.values(results).some(Boolean)) {
      return res.status(200).json({ ok: true, results })
    }
  } catch (err) {
    console.error('Integration attempt failed:', err)
  }

  // Fallback: store submissions in repo's /data/feedback_submissions.json (useful for local testing)
  try {
    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    const file = path.join(dataDir, 'feedback_submissions.json')
    let list = []
    try {
      const text = await fs.readFile(file, 'utf8')
      list = JSON.parse(text)
    } catch (e) {
      // ignore, start fresh
    }
    list.push({ ...payload, receivedAt: new Date().toISOString() })
    await fs.writeFile(file, JSON.stringify(list, null, 2), 'utf8')
    return res.status(200).json({ ok: true, stored: true })
  } catch (err) {
    console.error('Save fallback failed:', err)
    return res.status(500).json({ error: 'Failed to persist feedback' })
  }
}
