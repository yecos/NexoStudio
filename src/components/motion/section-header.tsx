import { FadeIn } from "./fade-in";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

/** Encabezado de sección estándar (etiqueta + título + descripción). */
export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <FadeIn className={`text-center mb-10 sm:mb-12 ${className}`}>
      <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-warm mb-4">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
        {title} {highlight && <span className="text-warm">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
