"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { useFormModal } from "@/components/ui/FormModal";
import { useRouter } from 'next/navigation';

export function ServicesHero() {
  const { openModal } = useFormModal();
  const router = useRouter();

  return (
    <section className="relative md:min-h-screen bg-gradient-to-b from-neutral-50 to-white overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[var(--color-text-dark)] mb-6 leading-tight">
            Interior Design & Architectural Execution
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
            Modspace Interior transforms residential and commercial spaces across Delhi NCR with Full-spectrum interior architecture, structural engineering, and custom furniture solutions built around your lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => openModal("residential")}
              className="px-8 py-4 bg-[var(--color-accent-gold)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Schedule a Design Consultation
            </button>
            <button
              onClick={() => router.push("/gallery")}
              className="px-8 py-4 border-2 border-[var(--color-text-dark)] text-[var(--color-text-dark)] font-semibold rounded-lg hover:bg-[var(--color-text-dark)] hover:text-white transition-colors"
            >
              Explore Our Portfolio
            </button>
          </div>
          {/* <div className="bg-white rounded-lg border border-neutral-200 p-8 md:p-12 text-left">
            <div className="flex gap-3 mb-4">
              <div className="w-1 bg-[var(--color-accent-gold)] rounded-full flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[var(--color-accent-gold)] uppercase tracking-widest mb-3">
                  About Modspace Interior
                </p>
                <p className="text-[var(--color-text-dark)] leading-relaxed">
                  <strong>Modspace Interior</strong> is a premier luxury interior design and turnkey contracting
                  firm based in Delhi NCR. Specializing in high-end residential interiors, commercial fit-outs,
                  custom architectural millwork, and full site civil execution, Modspace Interior manages every
                  project stage from initial 3D visualization and itemized BOQ planning to site handover.
                </p>
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
