export const LEAD_STATUSES = [
  "new",
  "qualified",
  "meeting",
  "proposal",
  "negotiation",
  "won",
  "project",
  "lost",
] as const;

export const LEAD_PRIORITIES = ["low", "medium", "high"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export interface LeadAttribution {
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
}

export interface NewLeadInput {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  area: string;
  budget: string;
  timeline: string;
  message: string;
  attribution: LeadAttribution;
}

export interface LeadRecord extends NewLeadInput {
  id: string;
  status: LeadStatus;
  priority: LeadPriority;
  notes: string;
  source: string;
  nextFollowUpAt: string | null;
  lastContactedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadUpdateInput {
  status?: LeadStatus;
  priority?: LeadPriority;
  notes?: string;
  nextFollowUpAt?: string | null;
  lastContactedAt?: string | null;
}

export function budgetPriority(budget: string): LeadPriority {
  if (budget.includes("$500M - $1.000M") || budget.includes("Más de $1.000M")) {
    return "high";
  }
  if (budget.includes("$100M - $250M") || budget.includes("$250M - $500M")) {
    return "medium";
  }
  return "low";
}

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && LEAD_STATUSES.includes(value as LeadStatus);
}

export function isLeadPriority(value: unknown): value is LeadPriority {
  return typeof value === "string" && LEAD_PRIORITIES.includes(value as LeadPriority);
}
