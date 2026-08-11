"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { Search, Palette, Wrench, CheckCircle } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Discovery & Architectural Assessment",
    description:
      "We evaluate site dimensions, conduct structural feasibility checks, review lifestyle/operational requirements, and define transparent budget parameters.",
    icon: Search,
  },
  {
    number: "02",
    title: "3D Visualization & Material Curation",
    description:
      "We present photorealistic 3D renders alongside physical material palettes—including natural stones, wood veneers, fabrics, and metal finishes—for full tactile approval before execution.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Precision Civil Execution & Procurement",
    description:
      "Site engineers manage civil modifications, custom millwork, electrical wiring, and plumbing according to strict technical drawings and itemized Bill of Quantities (BOQ).",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Styling, Quality Audit & Handover",
    description:
      "We conduct a multi-point structural quality check, install curated decor elements, execute deep site cleaning, and complete white-glove key delivery.",
    icon: CheckCircle,
  },
];

export function WorkProcess() {
  return (
    <section className="py-20 md:py-32 bg-[var(--color-light-primary)]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">
            The 4-Step Working Process
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            From discovery to handover, we manage every detail with precision and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-[var(--color-accent-gold)]" />
                )}

                <div className="bg-white rounded-lg p-8 border border-neutral-200 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-gold)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-serif text-2xl text-[var(--color-accent-gold)] opacity-50">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[var(--color-text-dark)] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
