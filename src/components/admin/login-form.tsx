"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  configured: boolean;
}

/** Login del panel: contraseña única (ADMIN_PASSWORD) → cookie firmada. */
export function LoginForm({ configured }: LoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-dark-800/55 border border-white/8 p-6 sm:p-8 max-w-md mx-auto"
      aria-labelledby="login-title"
    >
      <h2 id="login-title" className="text-lg font-bold text-white mb-1">
        Acceso al panel
      </h2>
      <p className="text-sm text-white/60 mb-6">
        Ingresa la contraseña de administración para gestionar los proyectos.
      </p>

      <label htmlFor="admin-password" className="block text-sm font-medium text-white/80 mb-2">
        Contraseña
      </label>
      <div className="relative mb-4">
        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden />
        <Input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          autoFocus
          className="pl-9"
          required
        />
      </div>

      {!configured && (
        <div
          role="alert"
          className="mb-4 flex gap-2 items-start rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-sm text-amber-200"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
          <span>
            ADMIN_PASSWORD no está configurada en el servidor. Revisa el README
            para configurarla en Vercel.
          </span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-4 flex gap-2 items-center rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={busy || !password}
        className="w-full bg-warm hover:bg-warm-light text-dark-900 font-semibold h-11"
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Verificando…
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
