"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";

const MATRIX_DATA = [
  {
    pillar: "Residential Interiors",
    deliverables: "2D/3D layouts, electrical plans, finish schedules",
    benefits: "Complete design cohesion, zero spatial waste",
    scope: "Full apartments, villas, penthouses",
  },
  {
    pillar: "Turnkey Contracting",
    deliverables: "Itemized BOQ, milestone chart, MEP blueprints",
    benefits: "Fixed-budget delivery, single-contact accountability",
    scope: "Complete civil & interior fit-outs",
  },
  {
    pillar: "Commercial Workplaces",
    deliverables: "Space optimization plans, acoustic & lighting design",
    benefits: "Enhanced employee productivity, strong brand presence",
    scope: "Corporate offices, retail showrooms",
  },
  {
    pillar: "Bespoke Millwork",
    deliverables: "Shop drawings, wood/metal samples, hardware specs",
    benefits: "Unique 1-of-1 furniture, perfect spatial fit",
    scope: "Custom wardrobes, paneling, joinery",
  },
];

export function DeliverableMatrix() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">
            Deliverables & Specifications
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Clear technical and client-facing outcomes for every service
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="overflow-x-auto border border-neutral-200 rounded-lg"
        >
          <table className="w-full">
            <thead className="bg-[var(--color-text-dark)] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-widest">
                  Service Pillar
                </th>
                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-widest">
                  Key Technical Deliverables
                </th>
                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-widest">
                  Client Benefits
                </th>
                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-widest">
                  Primary Scope
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-neutral-200 ${idx % 2 === 0 ? "bg-neutral-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[var(--color-text-dark)]">{row.pillar}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{row.deliverables}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{row.benefits}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
