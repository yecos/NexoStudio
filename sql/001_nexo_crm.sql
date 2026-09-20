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
  CONSTRAINT nexo_leads_priority_check CHECK (priority IN ('low','medium','high'))
);

CREATE INDEX IF NOT EXISTS nexo_leads_status_created_idx ON nexo_leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS nexo_leads_phone_idx ON nexo_leads (phone);
CREATE INDEX IF NOT EXISTS nexo_leads_email_idx ON nexo_leads (email);
