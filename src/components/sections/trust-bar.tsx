import { Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { TRUST_POINTS } from "@/data/landing";

/** Franja de señales de confianza bajo el hero. */
export function TrustBar() {
  return (
    <section aria-label="Razones para trabajar con Nexo Studio" className="relative z-10 -mt-16 sm:-mt-20 pb-14 sm:pb-18 bg-gradient-to-b from-transparent via-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            {TRUST_POINTS.map((point) => (
              <div key={point.label} className="group rounded-lg border border-white/8 bg-dark-900/82 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/24 hover:border-warm/24 hover:bg-warm/[0.06] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-warm/12 text-warm flex items-center justify-center group-hover:bg-warm/20 transition-colors">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white leading-none">{point.value}</div>
                    <div className="text-sm font-semibold text-warm mt-1">{point.label}</div>
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
