"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Loader2,
  MapPin,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import type { Project } from "@/data/projects";
import type { FormView } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LocationPicker } from "@/components/map/location-picker";
import { slugify } from "@/lib/slug";
import { fileToResizedDataUrl, generateImageName } from "@/lib/image-client";

const CATEGORIES = [
  "Residencial",
  "Comercial",
  "Remodelación",
  "Obra nueva",
  "Interiorismo",
  "Residencial / Comercial",
] as const;

const STATUSES = [
  "Proyecto conceptual",
  "Anteproyecto",
  "En obra",
  "Ejecutado",
] as const;

interface ProjectFormProps {
  project: Project | null;
  existingSlugs: string[];
  onCancel: () => void;
  onSaved: (project: Project) => void;
}

let tempCounter = 0;

/** Formulario de creación/edición de proyecto del panel admin. */
export function ProjectForm({
  project,
  existingSlugs,
  onCancel,
  onSaved,
}: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [location, setLocation] = useState(project?.location ?? "");
  const [lat, setLat] = useState<number>(project?.lat ?? 6.244);
  const [lng, setLng] = useState<number>(project?.lng ?? -75.581);
  const [category, setCategory] = useState<string>(project?.category ?? "Residencial");
  const [status, setStatus] = useState<string>(project?.status ?? "Proyecto conceptual");
  const [scope, setScope] = useState(project?.scope ?? "Diseño arquitectónico");
  const [year, setYear] = useState<number>(project?.year ?? new Date().getFullYear());
  const [description, setDescription] = useState(project?.description ?? "");
  const [views, setViews] = useState<FormView[]>(
    project?.views.map((v) => ({ ...v })) ?? [],
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const effectiveSlug = slugTouched ? slug : slugify(name);
  const slugConflict = useMemo(
    () =>
      effectiveSlug.length > 0 &&
      existingSlugs.includes(effectiveSlug) &&
      effectiveSlug !== project?.slug,
    [effectiveSlug, existingSlugs, project?.slug],
  );

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function addImages(files: File[], replaceIndex?: number) {
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const processed: FormView[] = [];
      for (const file of files) {
        const dataUrl = await fileToResizedDataUrl(file);
        tempCounter += 1;
        processed.push({
          src: `temp:${tempCounter}`,
          alt: "",
          dataUrl,
          fileName: generateImageName(tempCounter),
        });
      }
      setViews((current) => {
        if (typeof replaceIndex === "number") {
          const next = [...current];
          const previous = current[replaceIndex];
          next[replaceIndex] = { ...processed[0], alt: previous?.alt ?? "" };
          return next;
        }
        return [...current, ...processed];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo procesar la imagen.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function moveView(index: number, direction: -1 | 1) {
    setViews((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function updateViewAlt(index: number, alt: string) {
    setViews((current) =>
      current.map((v, i) => (i === index ? { ...v, alt } : v)),
    );
  }

  function removeView(index: number) {
    setViews((current) => current.filter((_, i) => i !== index));
  }

  function handlePick(lat: number, lng: number) {
    setLat(lat);
    setLng(lng);
  }

  async function handleSave() {
    if (busy) return;
    setError(null);

    // Validación rápida en cliente (el servidor valida de nuevo)
    if (name.trim().length < 2) return setError("Escribe el nombre del proyecto.");
    if (description.trim().length < 30)
      return setError("La descripción debe tener al menos 30 caracteres.");
    if (views.length === 0)
      return setError("Agrega al menos una imagen del proyecto.");
    if (views.some((v) => v.alt.trim().length < 5))
      return setError("Todas las imágenes necesitan un texto alternativo descriptivo.");
    if (slugConflict) return setError("El slug está en uso: cámbialo para continuar.");

    const payload = {
      project: {
        name: name.trim(),
        slug: effectiveSlug,
        location: location.trim(),
        lat,
        lng,
        category,
        scope: scope.trim(),
        status,
        year,
        description: description.trim(),
        views: views.map((v) => ({ src: v.src, alt: v.alt.trim() })),
      },
      newImages: views
        .filter((v) => v.src.startsWith("temp:"))
        .map((v) => ({
          localId: v.src.slice(5),
          fileName: v.fileName ?? "",
          dataBase64: (v.dataUrl ?? "").split(",")[1] ?? "",
        })),
    };

    setBusy(true);
    try {
      const url = project
        ? `/api/admin/projects/${project.id}`
        : "/api/admin/projects";
      const res = await fetch(url, {
        method: project ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { project?: Project; error?: string };
      if (res.status === 401) {
        setError("Tu sesión expiró. Inicia sesión de nuevo.");
        router.refresh();
        return;
      }
      if (!res.ok || !data.project) {
        setError(data.error ?? "No se pudo guardar el proyecto.");
        return;
      }
      toast({
        title: project ? "Proyecto actualizado" : "Proyecto creado",
        description: "El sitio se redespliega automáticamente en ~2 minutos.",
      });
      onSaved(data.project);
    } catch {
      setError("Error de conexión al guardar. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSave();
      }}
      className="space-y-6"
      aria-label={project ? `Editar ${project.name}` : "Nuevo proyecto"}
    >
      {error && (
        <div
          role="alert"
          className="flex gap-2 items-start rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-300"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {/* Información básica */}
      <fieldset className="rounded-2xl bg-dark-800/55 border border-white/8 p-5 sm:p-6">
        <legend className="px-2 text-sm font-semibold text-warm uppercase tracking-wider">
          Información
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="pf-name" className="block text-sm font-medium text-white/80 mb-1.5">
              Nombre del proyecto *
            </label>
            <Input
              id="pf-name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Casa Los Cedros"
              required
              maxLength={80}
            />
          </div>
          <div>
            <label htmlFor="pf-slug" className="block text-sm font-medium text-white/80 mb-1.5">
              Slug (URL) {slugConflict && <span className="text-red-400">— ya en uso</span>}
            </label>
            <Input
              id="pf-slug"
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="casa-los-cedros"
              aria-invalid={slugConflict}
            />
            <p className="mt-1 text-xs text-white/40">
              /proyectos/{effectiveSlug || "…"}
            </p>
          </div>
          <div>
            <label htmlFor="pf-year" className="block text-sm font-medium text-white/80 mb-1.5">
              Año
            </label>
            <Input
              id="pf-year"
              type="number"
              min={1990}
              max={2100}
              value={year}
              onChange={(e) => setYear(Number(e.target.value) || new Date().getFullYear())}
              required
            />
          </div>
          <div>
            <label htmlFor="pf-category" className="block text-sm font-medium text-white/80 mb-1.5">
              Categoría
            </label>
            <select
              id="pf-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 w-full rounded-md border border-white/12 bg-dark-800 px-3 text-sm text-white focus:border-warm focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-status" className="block text-sm font-medium text-white/80 mb-1.5">
              Estado
            </label>
            <select
              id="pf-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 w-full rounded-md border border-white/12 bg-dark-800 px-3 text-sm text-white focus:border-warm focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="pf-scope" className="block text-sm font-medium text-white/80 mb-1.5">
              Alcance
            </label>
            <Input
              id="pf-scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Diseño arquitectónico"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="pf-description" className="block text-sm font-medium text-white/80 mb-1.5">
              Descripción * (mín. 30 caracteres)
            </label>
            <Textarea
              id="pf-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe el proyecto: concepto, materiales, solución espacial…"
              required
            />
            <p className="mt-1 text-xs text-white/40">
              {description.trim().length} caracteres
            </p>
          </div>
        </div>
      </fieldset>

      {/* Ubicación */}
      <fieldset className="rounded-2xl bg-dark-800/55 border border-white/8 p-5 sm:p-6">
        <legend className="px-2 text-sm font-semibold text-warm uppercase tracking-wider">
          Ubicación
        </legend>
        <div className="mb-4">
          <label htmlFor="pf-location" className="block text-sm font-medium text-white/80 mb-1.5">
            Dirección / municipio *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden />
            <Input
              id="pf-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Envigado, Antioquia"
              className="pl-9"
              required
            />
          </div>
        </div>
        <p className="text-xs text-white/55 mb-2">
          Haz clic en el mapa (o arrastra el pin) para marcar la ubicación exacta.
        </p>
        <LocationPicker lat={lat} lng={lng} onPick={handlePick} />
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label htmlFor="pf-lat" className="block text-xs font-medium text-white/60 mb-1">
              Latitud
            </label>
            <Input
              id="pf-lat"
              type="number"
              step="0.00001"
              value={lat}
              onChange={(e) => setLat(Number(e.target.value) || 0)}
              required
            />
          </div>
          <div>
            <label htmlFor="pf-lng" className="block text-xs font-medium text-white/60 mb-1">
              Longitud
            </label>
            <Input
              id="pf-lng"
              type="number"
              step="0.00001"
              value={lng}
              onChange={(e) => setLng(Number(e.target.value) || 0)}
              required
            />
          </div>
        </div>
      </fieldset>

      {/* Imágenes */}
      <fieldset className="rounded-2xl bg-dark-800/55 border border-white/8 p-5 sm:p-6">
        <legend className="px-2 text-sm font-semibold text-warm uppercase tracking-wider">
          Imágenes ({views.length})
        </legend>
        <p className="text-xs text-white/55 mb-4">
          Se redimensionan automáticamente (máx. 1920px, JPEG). La primera es la
          portada del proyecto. Ordena con las flechas.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => void addImages(Array.from(e.target.files ?? []))}
          aria-label="Añadir imágenes del proyecto"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="mb-5 border-warm/40 text-warm hover:bg-warm/10 h-11"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          ) : (
            <ImagePlus className="w-4 h-4" aria-hidden />
          )}
          {uploading ? "Procesando imágenes…" : "Añadir imágenes"}
        </Button>

        <ul className="space-y-3">
          {views.map((view, index) => {
            const isNew = view.src.startsWith("temp:");
            const preview = isNew ? view.dataUrl : view.src;
            return (
              <li
                key={view.src}
                className="flex flex-col sm:flex-row gap-3 rounded-xl bg-dark-900/60 border border-white/8 p-3"
              >
                <div className="w-full sm:w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-dark-800">
                  <img
                    src={preview}
                    alt={view.alt || `Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor={`alt-${view.src}`} className="sr-only">
                    Texto alternativo de la imagen {index + 1}
                  </label>
                  <Input
                    id={`alt-${view.src}`}
                    value={view.alt}
                    onChange={(e) => updateViewAlt(index, e.target.value)}
                    placeholder={`Texto alternativo (describe la imagen ${index + 1})…`}
                    maxLength={140}
                  />
                  <div className="flex flex-wrap gap-2 items-center">
                    {index === 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-dark-900 bg-warm rounded-full px-2 py-0.5">
                        Portada
                      </span>
                    )}
                    <div className="flex gap-1 ml-auto">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveView(index, -1)}
                        disabled={index === 0}
                        aria-label={`Mover imagen ${index + 1} arriba`}
                        className="text-white/70 hover:text-white"
                      >
                        <ArrowUp className="w-4 h-4" aria-hidden />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveView(index, 1)}
                        disabled={index === views.length - 1}
                        aria-label={`Mover imagen ${index + 1} abajo`}
                        className="text-white/70 hover:text-white"
                      >
                        <ArrowDown className="w-4 h-4" aria-hidden />
                      </Button>
                      <ReplaceImageButton
                        onFile={(file) => void addImages([file], index)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeView(index)}
                        aria-label={`Eliminar imagen ${index + 1}`}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Acciones */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end sticky bottom-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={busy}
          className="h-11 border-white/15 text-white/80 hover:bg-white/5"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={busy || uploading}
          className="h-11 bg-warm hover:bg-warm-light text-dark-900 font-semibold px-6"
        >
          {busy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Guardando en GitHub…
            </>
          ) : (
            <>
              <Save className="w-4 h-4" aria-hidden />
              {project ? "Guardar cambios" : "Crear proyecto"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/** Botón con input oculto para reemplazar la imagen de una vista. */
function ReplaceImageButton({ onFile }: { onFile: (file: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          if (ref.current) ref.current.value = "";
        }}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => ref.current?.click()}
        aria-label="Reemplazar imagen"
        className="text-white/70 hover:text-white"
      >
        <RefreshCw className="w-4 h-4" aria-hidden />
      </Button>
    </>
  );
}
