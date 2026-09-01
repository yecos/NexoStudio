"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ProjectForm } from "./project-form";

interface AdminDashboardProps {
  initialProjects: Project[];
}

/** Panel principal: lista de proyectos + crear/editar/eliminar. */
export function AdminDashboard({ initialProjects }: AdminDashboardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editing, setEditing] = useState<Project | "new" | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [busyDelete, setBusyDelete] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = projects.filter((p) =>
    `${p.name} ${p.location} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
  );

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = (await res.json()) as { projects: Project[] };
        setProjects(data.projects);
        toast({ title: "Lista actualizada", description: `${data.projects.length} proyectos en el repositorio.` });
      }
    } catch {
      toast({
        title: "No se pudo actualizar",
        description: "Error de conexión con GitHub.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  }

  function handleSaved(saved: Project) {
    setProjects((current) => {
      const exists = current.some((p) => p.id === saved.id);
      return exists ? current.map((p) => (p.id === saved.id ? saved : p)) : [...current, saved];
    });
    setEditing(null);
  }

  async function confirmDelete() {
    if (!deleting || busyDelete) return;
    setBusyDelete(true);
    try {
      const res = await fetch(`/api/admin/projects/${deleting.id}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        if (res.status === 401) {
          router.refresh();
          return;
        }
        toast({ title: "No se pudo eliminar", description: data.error, variant: "destructive" });
        return;
      }
      setProjects((current) => current.filter((p) => p.id !== deleting.id));
      toast({
        title: "Proyecto eliminado",
        description: "El sitio se redespliega automáticamente en ~2 minutos.",
      });
      setDeleting(null);
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setBusyDelete(false);
    }
  }

  // ----- Vista de edición -----
  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <h2 className="text-xl font-bold text-white">
            {editing === "new" ? "Nuevo proyecto" : `Editar: ${editing.name}`}
          </h2>
          <Button
            variant="outline"
            onClick={() => setEditing(null)}
            className="border-white/15 text-white/80 hover:bg-white/5"
          >
            Volver a la lista
          </Button>
        </div>
        <ProjectForm
          project={editing === "new" ? null : editing}
          existingSlugs={projects.map((p) => p.slug)}
          onCancel={() => setEditing(null)}
          onSaved={handleSaved}
        />
      </div>
    );
  }

  // ----- Vista de lista -----
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, zona o categoría…"
            className="pl-9"
            aria-label="Buscar proyectos"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => void handleRefresh()}
            disabled={refreshing}
            className="border-white/15 text-white/80 hover:bg-white/5"
            aria-label="Recargar lista desde GitHub"
          >
            {refreshing ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            ) : (
              <RefreshCw className="w-4 h-4" aria-hidden />
            )}
            <span className="hidden sm:inline">Recargar</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => void handleLogout()}
            className="border-white/15 text-white/80 hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" aria-hidden />
            <span className="hidden sm:inline">Salir</span>
          </Button>
          <Button
            onClick={() => setEditing("new")}
            className="bg-warm hover:bg-warm-light text-dark-900 font-semibold"
          >
            <Plus className="w-4 h-4" aria-hidden />
            Nuevo proyecto
          </Button>
        </div>
      </div>

      <p className="text-xs text-white/45 mb-4">
        {projects.length} proyectos · los cambios se publican como commits en
        GitHub y el sitio se redespliega solo (~2 min).
      </p>

      <ul className="space-y-3">
        {filtered.map((project) => (
          <li
            key={project.id}
            className="flex items-center gap-4 rounded-xl bg-dark-800/55 border border-white/8 p-3 sm:p-4 hover:border-warm/25 transition-colors"
          >
            <div className="w-20 h-14 sm:w-24 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-dark-900">
              <img
                src={project.views[0]?.src}
                alt={project.views[0]?.alt ?? project.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-white truncate">
                {project.name}
              </p>
              <p className="text-xs text-white/55 truncate">
                {project.location} · {project.category} · {project.year} ·{" "}
                {project.status}
              </p>
              <p className="text-[10px] text-white/35 mt-0.5">
                /proyectos/{project.slug} · act. {project.updatedAt}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label={`Ver ${project.name} en el sitio`}
              >
                <a href={`/proyectos/${project.slug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditing(project)}
                aria-label={`Editar ${project.name}`}
                className="text-warm hover:bg-warm/10"
              >
                <Pencil className="w-4 h-4" aria-hidden />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleting(project)}
                aria-label={`Eliminar ${project.name}`}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" aria-hidden />
              </Button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-xl bg-dark-800/40 border border-white/8 p-8 text-center text-white/50 text-sm">
            {query
              ? "No hay proyectos que coincidan con la búsqueda."
              : "Aún no hay proyectos. Crea el primero con el botón «Nuevo proyecto»."}
          </li>
        )}
      </ul>

      {/* Confirmación de eliminación */}
      {deleting && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-dark-800 border border-white/10 p-6 shadow-2xl">
            <h3 id="delete-title" className="text-lg font-bold text-white mb-2">
              ¿Eliminar «{deleting.name}»?
            </h3>
            <p className="text-sm text-white/65 mb-6">
              Se quitará del portafolio y del mapa. Las imágenes quedarán en el
              repositorio (sin referenciar). Esta acción crea un commit en
              GitHub y el sitio se redespliega.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleting(null)}
                disabled={busyDelete}
                className="border-white/15 text-white/80 hover:bg-white/5"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => void confirmDelete()}
                disabled={busyDelete}
                className="bg-red-600 hover:bg-red-500 text-white font-semibold"
              >
                {busyDelete ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                ) : (
                  <Trash2 className="w-4 h-4" aria-hidden />
                )}
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
