"use client";

import { STATS } from "@/lib/constants";
import { useCounter } from "@/hooks/useCounter";

function StatItem({ value, label }: { value: number; label: string }) {
  const { ref, displayValue } = useCounter(value, 2000);
  
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-accent-gold)] mb-2 flex items-center">
        <span ref={ref}>{displayValue}</span>+
      </div>
      <div className="font-sans text-sm md:text-base text-[var(--color-text-dark)] uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-white border-y border-neutral-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-neutral-200">
          {STATS.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
