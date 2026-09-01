import { Lock } from "lucide-react";
import { isAdminConfigured, isAdminRequest } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Panel de administración — Nexo Studio",
  robots: { index: false, follow: false },
};

/**
 * Panel de administración: gestiona proyectos (crear/editar/eliminar).
 * Los cambios se commitean al repo vía GitHub API y Vercel redespliega.
 */
export default async function AdminPage() {
  const authed = await isAdminRequest();

  return (
    <main className="min-h-screen bg-dark-900 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warm/15 border border-warm/30 flex items-center justify-center">
            <Lock className="w-5 h-5 text-warm" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Nexo Studio · Admin
            </h1>
            <p className="text-sm text-white/55">
              Gestión del portafolio de proyectos
            </p>
          </div>
        </header>

        {authed ? (
          <AdminDashboard initialProjects={projects} />
        ) : (
          <LoginForm configured={isAdminConfigured()} />
        )}
      </div>
    </main>
  );
}
