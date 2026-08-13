"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { useFormModal } from "@/components/ui/FormModal";
import { MapPin, Phone } from "lucide-react";

export function ConsultationHub() {
  const { openModal } = useFormModal();

  return (
    <section className="py-20 md:py-32 bg-[var(--color-text-dark)] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Ready to Modify Your Space?</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Schedule an in-person meeting at your site or a virtual consultation with our lead designers today.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-8">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-neutral-400 uppercase tracking-widest mb-1">Direct Contact</p>
                  <a
                    href="tel:+919718552104"
                    className="text-lg font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
                  >
                    +91-9718552104
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-neutral-400 uppercase tracking-widest mb-1">Service Area</p>
                  <p className="text-lg font-semibold">
                    Delhi, Noida, Gurugram, Faridabad and the wider Delhi NCR region
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 md:p-12">
            <h3 className="font-serif text-2xl mb-8">Schedule a Consultation</h3>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] text-white placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] text-white placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Project Type</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] text-white">
                  <option className="text-[var(--color-text-dark)]">Residential</option>
                  <option className="text-[var(--color-text-dark)]">Commercial</option>
                  <option className="text-[var(--color-text-dark)]">Custom Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Estimated Timeline</label>
                <input
                  type="text"
                  placeholder="e.g., Next 2-3 months"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] text-white placeholder:text-neutral-400"
                />
              </div>
            </div>

            <button
              onClick={() => openModal("callback")}
              className="w-full bg-[var(--color-accent-gold)] text-[var(--color-text-dark)] font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Request Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
