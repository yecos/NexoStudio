"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  type LeadPriority,
  type LeadRecord,
  type LeadStatus,
} from "@/data/crm";

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Nuevo",
  qualified: "Calificado",
  meeting: "Reunión",
  proposal: "Propuesta",
  negotiation: "Negociación",
  won: "Ganado",
  project: "Proyecto",
  lost: "Perdido",
};

const PRIORITY_LABELS: Record<LeadPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

interface LeadsBoardProps {
  initialLeads: LeadRecord[];
  configured: boolean;
}

function localDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(value));
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  return `https://wa.me/${digits.startsWith("57") ? digits : `57${digits}`}`;
}

export function LeadsBoard({ initialLeads, configured }: LeadsBoardProps) {
  const { toast } = useToast();
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<LeadRecord | null>(null);
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((lead) =>
      [lead.name, lead.phone, lead.email, lead.projectType, lead.location, lead.budget, lead.attribution.utmSource]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [leads, query]);

  const stats = useMemo(() => ({
    total: leads.length,
    active: leads.filter((lead) => !["won", "project", "lost"].includes(lead.status)).length,
    high: leads.filter((lead) => lead.priority === "high").length,
    won: leads.filter((lead) => ["won", "project"].includes(lead.status)).length,
  }), [leads]);

  async function patchLead(id: string, patch: Record<string, unknown>) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = (await response.json()) as { lead?: LeadRecord; error?: string };
    if (!response.ok || !data.lead) throw new Error(data.error || "No se pudo actualizar.");
    setLeads((current) => current.map((lead) => (lead.id === id ? data.lead! : lead)));
    if (selected?.id === id) setSelected(data.lead);
    return data.lead;
  }

  async function refresh() {
    setRefreshing(true);
    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = (await response.json()) as { leads?: LeadRecord[]; error?: string };
      if (!response.ok) throw new Error(data.error);
      setLeads(data.leads ?? []);
    } catch (error) {
      toast({
        title: "No se pudo actualizar el CRM",
        description: error instanceof Error ? error.message : undefined,
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  }

  function openDetails(lead: LeadRecord) {
    setSelected(lead);
    setNotes(lead.notes);
    setFollowUp(lead.nextFollowUpAt ? lead.nextFollowUpAt.slice(0, 16) : "");
  }

  async function saveDetails() {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await patchLead(selected.id, {
        notes,
        nextFollowUpAt: followUp ? new Date(followUp).toISOString() : null,
      });
      setSelected(updated);
      toast({ title: "Lead actualizado" });
    } catch (error) {
      toast({
        title: "No se pudo guardar",
        description: error instanceof Error ? error.message : undefined,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-warm/30 bg-warm/8 p-6 sm:p-8">
        <Users className="w-8 h-8 text-warm mb-4" />
        <h2 className="text-2xl font-semibold text-white">CRM listo para conectar</h2>
        <p className="mt-3 max-w-2xl text-white/60 leading-relaxed">
          Falta vincular Neon al proyecto de Vercel para que exista
          <code className="mx-1 text-warm">DATABASE_URL</code>.
          WhatsApp seguirá funcionando mientras tanto.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          ["Leads", stats.total],
          ["Activos", stats.active],
          ["Prioridad alta", stats.high],
          ["Ganados / Proyecto", stats.won],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-xl border border-white/8 bg-dark-800/55 p-4">
            <p className="text-xs text-white/45">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar nombre, zona, presupuesto, fuente…" className="pl-9" />
        </div>
        <Button variant="outline" onClick={() => void refresh()} disabled={refreshing} className="border-white/15 text-white/80 hover:bg-white/5">
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="grid grid-flow-col auto-cols-[290px] gap-4 min-w-max">
          {LEAD_STATUSES.map((status) => {
            const items = filtered.filter((lead) => lead.status === status);
            return (
              <section key={status} className="rounded-2xl border border-white/8 bg-dark-800/35 p-3">
                <div className="flex items-center justify-between px-1 pb-3">
                  <h2 className="text-sm font-semibold text-white">{STATUS_LABELS[status]}</h2>
                  <span className="text-xs text-white/40">{items.length}</span>
                </div>
                <div className="space-y-3">
                  {items.map((lead) => (
                    <article key={lead.id} className="rounded-xl border border-white/8 bg-dark-900 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-white truncate">{lead.name}</h3>
                          <p className="mt-1 text-xs text-white/45 truncate">{lead.projectType}</p>
                        </div>
                        <select
                          value={lead.priority}
                          onChange={(e) => void patchLead(lead.id, { priority: e.target.value as LeadPriority })}
                          className="rounded-full border border-white/10 bg-dark-800 px-2 py-1 text-[10px] text-white/65 outline-none"
                        >
                          {LEAD_PRIORITIES.map((priority) => <option key={priority} value={priority}>{PRIORITY_LABELS[priority]}</option>)}
                        </select>
                      </div>

                      <div className="mt-4 space-y-2 text-xs text-white/55">
                        <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-warm" />{lead.location}</p>
                        <p className="flex items-center gap-2"><CircleDollarSign className="w-3.5 h-3.5 text-warm" />{lead.budget || "Sin rango"}</p>
                        <p className="flex items-center gap-2"><CalendarClock className="w-3.5 h-3.5 text-warm" />{localDate(lead.createdAt)}</p>
                      </div>

                      <div className="mt-4 flex gap-1.5">
                        <a href={whatsappHref(lead.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-green-400 hover:bg-white/5" aria-label="WhatsApp">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a href={`tel:${lead.phone}`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/65 hover:bg-white/5" aria-label="Llamar">
                          <Phone className="w-4 h-4" />
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/65 hover:bg-white/5" aria-label="Email">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        <button onClick={() => openDetails(lead)} className="ml-auto inline-flex h-8 items-center gap-1 rounded-lg border border-warm/25 px-2.5 text-xs text-warm hover:bg-warm/10">
                          Detalle <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <select
                        value={lead.status}
                        onChange={(e) => void patchLead(lead.id, { status: e.target.value as LeadStatus })}
                        className="mt-3 w-full rounded-lg border border-white/10 bg-dark-800 px-3 py-2 text-xs text-white/70 outline-none"
                      >
                        {LEAD_STATUSES.map((next) => <option key={next} value={next}>{STATUS_LABELS[next]}</option>)}
                      </select>
                    </article>
                  ))}
                  {items.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/8 p-5 text-center text-xs text-white/30">Sin leads</div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-dark-800 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-warm">{STATUS_LABELS[selected.status]}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selected.name}</h2>
                <p className="mt-1 text-sm text-white/45">{selected.projectType} · {selected.location}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)} aria-label="Cerrar"><X className="w-5 h-5" /></Button>
            </div>

            <div className="mt-7 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-dark-900/70 p-4">
                <p className="text-white/40 text-xs">Contacto</p>
                <p className="mt-2 text-white">{selected.phone}</p>
                <p className="mt-1 text-white/60 break-all">{selected.email || "Sin email"}</p>
              </div>
              <div className="rounded-xl bg-dark-900/70 p-4">
                <p className="text-white/40 text-xs">Proyecto</p>
                <p className="mt-2 text-white">{selected.budget || "Sin rango"}</p>
                <p className="mt-1 text-white/60">{selected.area || "Área no indicada"} · {selected.timeline}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-dark-900/70 p-4">
              <p className="text-xs text-white/40">Contexto del cliente</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-white/70 leading-relaxed">{selected.message}</p>
            </div>

            <div className="mt-4 rounded-xl bg-dark-900/70 p-4">
              <p className="text-xs text-white/40 mb-2">Origen</p>
              <p className="text-sm text-white/65">UTM: {selected.attribution.utmSource || "directo"} / {selected.attribution.utmCampaign || "—"}</p>
              <p className="mt-1 text-xs text-white/35 break-all">{selected.attribution.page || "Sin página registrada"}</p>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-white/70 mb-2">Notas internas</label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} placeholder="Seguimiento, necesidades, decisiones, próxima acción…" />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-white/70 mb-2">Próximo seguimiento</label>
              <Input type="datetime-local" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelected(null)} className="border-white/15 text-white/75">Cerrar</Button>
              <Button onClick={() => void saveDetails()} disabled={saving} className="bg-warm text-dark-900 hover:bg-warm-light">
                {saving ? "Guardando…" : "Guardar seguimiento"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
