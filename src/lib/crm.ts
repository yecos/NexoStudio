import { neon } from "@neondatabase/serverless";
import {
  budgetPriority,
  isLeadPriority,
  isLeadStatus,
  type LeadRecord,
  type LeadUpdateInput,
  type NewLeadInput,
} from "@/data/crm";

let schemaPromise: Promise<void> | null = null;

function databaseUrl(): string | null {
  const explicit = [
    process.env.DATABASE_URL,
    process.env.STORAGE_DATABASE_URL,
    process.env.STORAGE_URL,
    process.env.POSTGRES_URL,
    process.env.NEON_DATABASE_URL,
  ]
    .map((value) => value?.trim())
    .find(
      (value): value is string =>
        typeof value === "string" &&
        (value.startsWith("postgres://") || value.startsWith("postgresql://")),
    );

  if (explicit) return explicit;

  const discovered = Object.entries(process.env).find(
    ([key, value]) =>
      /(DATABASE|POSTGRES|NEON|PG).*URL/i.test(key) &&
      typeof value === "string" &&
      (value.startsWith("postgres://") || value.startsWith("postgresql://")),
  );

  return discovered?.[1]?.trim() || null;
}

export function isCrmConfigured(): boolean {
  return Boolean(databaseUrl());
}

function getSql() {
  const url = databaseUrl();
  if (!url) {
    throw new Error("No hay una URL de conexión de Neon configurada.");
  }
  return neon(url);
}

async function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS nexo_leads (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL DEFAULT '',
          project_type TEXT NOT NULL,
          location TEXT NOT NULL,
          area TEXT NOT NULL DEFAULT '',
          budget TEXT NOT NULL DEFAULT '',
          timeline TEXT NOT NULL DEFAULT '',
          message TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'new',
          priority TEXT NOT NULL DEFAULT 'low',
          notes TEXT NOT NULL DEFAULT '',
          source TEXT NOT NULL DEFAULT 'website',
          page TEXT NOT NULL DEFAULT '',
          referrer TEXT NOT NULL DEFAULT '',
          utm_source TEXT NOT NULL DEFAULT '',
          utm_medium TEXT NOT NULL DEFAULT '',
          utm_campaign TEXT NOT NULL DEFAULT '',
          utm_content TEXT NOT NULL DEFAULT '',
          utm_term TEXT NOT NULL DEFAULT '',
          gclid TEXT NOT NULL DEFAULT '',
          next_follow_up_at TIMESTAMPTZ,
          last_contacted_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          CONSTRAINT nexo_leads_status_check CHECK (
            status IN ('new','qualified','meeting','proposal','negotiation','won','project','lost')
          ),
          CONSTRAINT nexo_leads_priority_check CHECK (
            priority IN ('low','medium','high')
          )
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS nexo_leads_status_created_idx ON nexo_leads (status, created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS nexo_leads_phone_idx ON nexo_leads (phone)`;
      await sql`CREATE INDEX IF NOT EXISTS nexo_leads_email_idx ON nexo_leads (email)`;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

function mapRow(row: Record<string, unknown>): LeadRecord {
  const toIso = (value: unknown) =>
    value instanceof Date ? value.toISOString() : String(value ?? "");
  const nullableIso = (value: unknown) => (value == null ? null : toIso(value));

  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    phone: String(row.phone ?? ""),
    email: String(row.email ?? ""),
    projectType: String(row.project_type ?? ""),
    location: String(row.location ?? ""),
    area: String(row.area ?? ""),
    budget: String(row.budget ?? ""),
    timeline: String(row.timeline ?? ""),
    message: String(row.message ?? ""),
    status: isLeadStatus(row.status) ? row.status : "new",
    priority: isLeadPriority(row.priority) ? row.priority : "low",
    notes: String(row.notes ?? ""),
    source: String(row.source ?? "website"),
    attribution: {
      page: String(row.page ?? ""),
      referrer: String(row.referrer ?? ""),
      utmSource: String(row.utm_source ?? ""),
      utmMedium: String(row.utm_medium ?? ""),
      utmCampaign: String(row.utm_campaign ?? ""),
      utmContent: String(row.utm_content ?? ""),
      utmTerm: String(row.utm_term ?? ""),
      gclid: String(row.gclid ?? ""),
    },
    nextFollowUpAt: nullableIso(row.next_follow_up_at),
    lastContactedAt: nullableIso(row.last_contacted_at),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export async function createLead(input: NewLeadInput): Promise<LeadRecord> {
  await ensureSchema();
  const sql = getSql();
  const priority = budgetPriority(input.budget);
  const rows = await sql`
    INSERT INTO nexo_leads (
      name, phone, email, project_type, location, area, budget, timeline, message,
      priority, page, referrer, utm_source, utm_medium, utm_campaign,
      utm_content, utm_term, gclid
    )
    VALUES (
      ${input.name}, ${input.phone}, ${input.email}, ${input.projectType},
      ${input.location}, ${input.area}, ${input.budget}, ${input.timeline},
      ${input.message}, ${priority}, ${input.attribution.page},
      ${input.attribution.referrer}, ${input.attribution.utmSource},
      ${input.attribution.utmMedium}, ${input.attribution.utmCampaign},
      ${input.attribution.utmContent}, ${input.attribution.utmTerm},
      ${input.attribution.gclid}
    )
    RETURNING *
  `;
  return mapRow(rows[0] as Record<string, unknown>);
}

export async function listLeads(): Promise<LeadRecord[]> {
  await ensureSchema();
  const rows = await getSql()`
    SELECT * FROM nexo_leads
    ORDER BY
      CASE status
        WHEN 'new' THEN 1 WHEN 'qualified' THEN 2 WHEN 'meeting' THEN 3
        WHEN 'proposal' THEN 4 WHEN 'negotiation' THEN 5 WHEN 'won' THEN 6
        WHEN 'project' THEN 7 ELSE 8
      END,
      created_at DESC
  `;
  return rows.map((row) => mapRow(row as Record<string, unknown>));
}

export async function updateLead(
  id: string,
  input: LeadUpdateInput,
): Promise<LeadRecord | null> {
  await ensureSchema();
  const rows = await getSql()`
    UPDATE nexo_leads
    SET
      status = COALESCE(${input.status ?? null}::text, status),
      priority = COALESCE(${input.priority ?? null}::text, priority),
      notes = COALESCE(${input.notes ?? null}::text, notes),
      next_follow_up_at = CASE
        WHEN ${input.nextFollowUpAt === undefined}::boolean THEN next_follow_up_at
        ELSE ${input.nextFollowUpAt ?? null}::timestamptz
      END,
      last_contacted_at = CASE
        WHEN ${input.lastContactedAt === undefined}::boolean THEN last_contacted_at
        ELSE ${input.lastContactedAt ?? null}::timestamptz
      END,
      updated_at = NOW()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  return rows[0] ? mapRow(rows[0] as Record<string, unknown>) : null;
}


export async function checkCrmHealth(): Promise<boolean> {
  if (!isCrmConfigured()) return false;
  try {
    await ensureSchema();
    const rows = await getSql()`SELECT 1 AS ok`;
    return Number((rows[0] as { ok?: number } | undefined)?.ok) === 1;
  } catch {
    return false;
  }
}
