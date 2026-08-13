"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { Accordion } from "@/components/ui/Accordion";

const SERVICES_FAQ = [
  {
    question: "What is included in your turnkey interior design services?",
    answer:
      "Our turnkey services cover the full project cycle: initial 3D space planning, civil modifications, MEP engineering, material procurement, custom furniture manufacturing, site management, decor styling, and final handover under a unified contract.",
  },
  {
    question: "How do you price interior design projects in Delhi NCR?",
    answer:
      "Pricing is based on project scale, structural scope, and material selection. We offer a transparent pricing structure combining a design fee with a detailed, itemized Bill of Quantities (BOQ) or a fixed per-square-foot execution rate.",
  },
  {
    question: "What is the typical timeline for a complete residential interior project?",
    answer:
      "Full-home residential projects typically require 12 to 18 weeks from final design approval to handover, depending on civil structural changes and custom furniture complexity.",
  },
  {
    question: "Do you handle minor structural or civil modifications?",
    answer:
      "Yes, our turnkey contracting team handles all necessary civil work, including wall repositioning, plumbing rerouting, ceiling leveling, electrical overhauls, and tile/marble laying.",
  },
];

export function ServicesFAQ() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="grid md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">
              Service FAQs
            </h2>
            <p className="text-[var(--color-muted-gray)] font-sans text-lg mb-8">
              Common questions about our services and project processes.
            </p>
          </div>

          <div className="md:col-span-7">
            <Accordion items={SERVICES_FAQ} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
