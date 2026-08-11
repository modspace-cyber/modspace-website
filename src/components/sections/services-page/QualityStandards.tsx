"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { Shield, Layers, DollarSign } from "lucide-react";

const STANDARDS = [
  {
    title: "Material Curation",
    description:
      "Every stone slab, wood veneer, and brass fixture is hand-selected from trusted global suppliers and regional artisans across India to ensure durability and aesthetic harmony.",
    icon: Layers,
  },
  {
    title: "Engineering Integrity",
    description:
      "All structural modifications, wiring, and plumbing comply with rigorous safety codes, featuring hidden utility pathways, damp-proofing treatments, and branded electrical fixtures.",
    icon: Shield,
  },
  {
    title: "Transparent BOQ",
    description:
      "Every line item in our pricing estimate outlines specific material grades, quantities, and labor charges, preventing budget overruns or hidden fees mid-project.",
    icon: DollarSign,
  },
];

export function QualityStandards() {
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
            Sourcing & Quality Standards
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Unwavering commitment to excellence at every project stage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {STANDARDS.map((standard, idx) => {
            const Icon = standard.icon;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-8 border border-neutral-200"
              >
                <div className="w-14 h-14 rounded-lg bg-[var(--color-accent-gold)]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[var(--color-accent-gold)]" />
                </div>

                <h3 className="font-serif text-2xl text-[var(--color-text-dark)] mb-4">
                  {standard.title}
                </h3>

                <p className="text-neutral-600 leading-relaxed">
                  {standard.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
