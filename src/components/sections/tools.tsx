import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { TOOLS } from "@/data/landing";

/** Grilla de herramientas de trabajo. */
export function Tools() {
  return (
    <section className="py-14 sm:py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Tecnología" title="Herramientas que" highlight="utilizamos" />

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.name}>
              <div className="group h-full flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-dark-800/55 border border-white/6 hover:border-warm/22 transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${tool.color}20` }}>
                  <span style={{ color: tool.color }}>{tool.initial}</span>
                </div>
                <span className="text-xs sm:text-sm text-white/68 group-hover:text-white/92 font-medium text-center transition-colors duration-300">{tool.name}</span>
                <span className="text-[10px] sm:text-xs text-white/38 text-center leading-tight">{tool.desc}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
