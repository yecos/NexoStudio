/**
 * Integración opcional de leads del sitio con HubSpot.
 *
 * Requiere HUBSPOT_ACCESS_TOKEN (Service Key recomendado para integraciones
 * sistema-a-sistema). Si no existe, la integración se considera desactivada.
 *
 * Deal opcional:
 * - HUBSPOT_DEAL_PIPELINE_ID
 * - HUBSPOT_DEAL_STAGE_ID
 */

const HUBSPOT_API = "https://api.hubapi.com";
const CRM_VERSION = "2026-09";
const NOTES_VERSION = "2026-03";

export interface WebsiteLeadAttribution {
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
}

export interface WebsiteLead {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  area: string;
  budget: string;
  timeline: string;
  message: string;
  attribution: WebsiteLeadAttribution;
}

export interface HubSpotSyncResult {
  enabled: boolean;
  synced: boolean;
  contactId?: string;
  dealId?: string;
}

interface HubSpotObject {
  id: string;
}

interface HubSpotSearchResponse {
  total: number;
  results: HubSpotObject[];
}

function token(): string | null {
  return process.env.HUBSPOT_ACCESS_TOKEN?.trim() || null;
}

function authHeaders(): HeadersInit {
  const accessToken = token();
  if (!accessToken) return {};

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

async function hsFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const response = await fetch(`${HUBSPOT_API}${path}`, {
    ...init,
    headers: {
      ...authHeaders(),
      ...init.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`HubSpot request failed: ${response.status}`);
  }

  return response;
}

function splitName(fullName: string): { firstname: string; lastname?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstname: parts[0] ?? fullName.trim() };

  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

async function findContact(lead: WebsiteLead): Promise<string | null> {
  const propertyName = lead.email ? "email" : "phone";
  const value = lead.email || lead.phone;
  if (!value) return null;

  const response = await hsFetch(
    `/crm/objects/${CRM_VERSION}/contacts/search`,
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName,
                operator: "EQ",
                value,
              },
            ],
          },
        ],
        limit: 1,
        properties: ["email", "phone"],
      }),
    },
  );

  const data = (await response.json()) as HubSpotSearchResponse;
  return data.results[0]?.id ?? null;
}

function contactProperties(lead: WebsiteLead): Record<string, string> {
  const name = splitName(lead.name);
  const properties: Record<string, string> = {
    firstname: name.firstname,
    phone: lead.phone,
  };

  if (name.lastname) properties.lastname = name.lastname;
  if (lead.email) properties.email = lead.email;

  return properties;
}

async function upsertContact(lead: WebsiteLead): Promise<string> {
  const existingId = await findContact(lead);
  const properties = contactProperties(lead);

  if (existingId) {
    await hsFetch(
      `/crm/objects/${CRM_VERSION}/contacts/${encodeURIComponent(existingId)}`,
      {
        method: "PATCH",
        body: JSON.stringify({ properties }),
      },
    );
    return existingId;
  }

  const response = await hsFetch(`/crm/objects/${CRM_VERSION}/contacts`, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
  const created = (await response.json()) as HubSpotObject;
  return created.id;
}

async function createDeal(lead: WebsiteLead): Promise<string | null> {
  const pipeline = process.env.HUBSPOT_DEAL_PIPELINE_ID?.trim();
  const stage = process.env.HUBSPOT_DEAL_STAGE_ID?.trim();

  if (!pipeline || !stage) return null;

  const response = await hsFetch(`/crm/objects/${CRM_VERSION}/deals`, {
    method: "POST",
    body: JSON.stringify({
      properties: {
        dealname: `Web · ${safe.projectType} · ${lead.name}`,
        pipeline,
        dealstage: stage,
      },
    }),
  });

  const created = (await response.json()) as HubSpotObject;
  return created.id;
}

async function associate(
  fromType: string,
  fromId: string,
  toType: string,
  toId: string,
): Promise<void> {
  await hsFetch(
    `/crm/v4/objects/${fromType}/${encodeURIComponent(fromId)}/associations/default/${toType}/${encodeURIComponent(toId)}`,
    { method: "PUT" },
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function noteBody(lead: WebsiteLead): string {
  const safe = {
    projectType: escapeHtml(lead.projectType),
    location: escapeHtml(lead.location),
    area: escapeHtml(lead.area),
    budget: escapeHtml(lead.budget),
    timeline: escapeHtml(lead.timeline),
    message: escapeHtml(lead.message),
    utmSource: escapeHtml(lead.attribution.utmSource),
    utmCampaign: escapeHtml(lead.attribution.utmCampaign),
    page: escapeHtml(lead.attribution.page),
  };

  const rows = [
    "<strong>Lead desde nexostudioarq.com</strong>",
    `<br><strong>Tipo de proyecto:</strong> ${safe.projectType}`,
    `<br><strong>Ubicación:</strong> ${safe.location}`,
    lead.area ? `<br><strong>Área:</strong> ${safe.area}` : "",
    `<br><strong>Inversión:</strong> ${safe.budget}`,
    `<br><strong>Inicio:</strong> ${safe.timeline}`,
    `<br><strong>Contexto:</strong> ${safe.message}`,
    lead.attribution.utmSource
      ? `<br><strong>UTM source:</strong> ${safe.utmSource}`
      : "",
    lead.attribution.utmCampaign
      ? `<br><strong>UTM campaign:</strong> ${safe.utmCampaign}`
      : "",
    lead.attribution.page
      ? `<br><strong>Página:</strong> ${safe.page}`
      : "",
  ];

  return rows.filter(Boolean).join("");
}

async function createNote(
  lead: WebsiteLead,
  contactId: string,
  dealId: string | null,
): Promise<string> {
  const response = await hsFetch(`/crm/objects/${NOTES_VERSION}/notes`, {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: noteBody(lead),
      },
    }),
  });

  const note = (await response.json()) as HubSpotObject;

  await associate("notes", note.id, "contacts", contactId);
  if (dealId) {
    await associate("notes", note.id, "deals", dealId);
  }

  return note.id;
}

export async function syncLeadToHubSpot(
  lead: WebsiteLead,
): Promise<HubSpotSyncResult> {
  if (!token()) {
    return { enabled: false, synced: false };
  }

  const contactId = await upsertContact(lead);
  const dealId = await createDeal(lead);

  if (dealId) {
    await associate("deals", dealId, "contacts", contactId);
  }

  await createNote(lead, contactId, dealId);

  return {
    enabled: true,
    synced: true,
    contactId,
    dealId: dealId ?? undefined,
  };
}
