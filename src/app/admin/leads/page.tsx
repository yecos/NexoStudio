import Link from "next/link";
import { Lock, PanelsTopLeft, Users } from "lucide-react";
import { isAdminConfigured, isAdminRequest } from "@/lib/auth";
import { isCrmConfigured, listLeads } from "@/lib/crm";
import { LoginForm } from "@/components/admin/login-form";
import { LeadsBoard } from "@/components/admin/leads-board";
import type { LeadRecord } from "@/data/crm";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "CRM de Leads — Nexo Studio",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const authed = await isAdminRequest();
  const configured = isCrmConfigured();
  let leads: LeadRecord[] = [];

  if (authed && configured) {
    try {
      leads = await listLeads();
    } catch {
      leads = [];
    }
  }

  return (
    <main className="min-h-screen bg-dark-900 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warm/15 border border-warm/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-warm" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Nexo Studio · CRM</h1>
              <p className="text-sm text-white/55">Leads, seguimiento y oportunidades</p>
            </div>
          </div>
          {authed && (
            <nav className="flex gap-2">
              <Link href="/admin" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/65 hover:border-warm/30 hover:text-warm">
                <PanelsTopLeft className="w-4 h-4" /> Proyectos
              </Link>
              <Link href="/admin/leads" className="inline-flex items-center gap-2 rounded-lg border border-warm/35 bg-warm/10 px-4 py-2 text-sm text-warm">
                <Users className="w-4 h-4" /> CRM
              </Link>
            </nav>
          )}
        </header>
        {authed ? (
          <LeadsBoard initialLeads={leads} configured={configured} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <LoginForm configured={isAdminConfigured()} />
          </div>
        )}
      </div>
    </main>
  );
}
