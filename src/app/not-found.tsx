import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[#c8956c]">
        Error 404
      </div>
      <h1 className="font-sans text-7xl font-bold tracking-tight text-white sm:text-9xl">
        4<span className="text-[#c8956c]">0</span>4
      </h1>
      <p className="mt-6 max-w-md text-lg text-white/60">
        La página que buscas no existe o fue movida. Quizá la están rediseñando.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-[#c8956c] px-8 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-[#b07a52]"
      >
        Volver al inicio
      </Link>
      <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
        Nexo Studio · Arquitectura, Remodelaciones e Interiores
      </p>
    </main>
  );
}
