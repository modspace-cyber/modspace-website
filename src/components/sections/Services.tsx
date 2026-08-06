"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { staggerChildren, fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { Armchair, Table, Sofa } from "lucide-react";
import { VariantType } from "@/types";

const services = [
  {
    title: "Residential Interior Design",
    description: "Bespoke interior architecture, custom cabinetry, and curated furnishings crafted for luxurious personal living spaces.",
    icon: Armchair,
    variant: "solid" as VariantType,
  },
  {
    title: "Commercial & Corporate Fit-Outs",
    description: "Turnkey office and retail environments engineered for productivity, brand presence, and seamless spatial flow.",
    icon: Table,
    variant: "glassmorph" as VariantType,
  },
  {
    title: "Sectors & Specializations",
    description: "Hospitality, Fine Dining, Luxury Retail, Healthcare Facilities, and Corporate Headquarters.",
    icon: Sofa,
    variant: "solid" as VariantType,
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-[var(--color-light-primary)] relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-gold)]/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-4">
            What We Do Best
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto font-sans text-lg">
            Bringing your ideas to life with personal care, transparent processes, and uncompromised quality.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerChildren}
          className="grid md:grid-cols-3 gap-8 relative z-20"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card variant={service.variant} className="h-full flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
                <div className="h-14 w-14 rounded-full bg-[var(--color-dark-primary)] text-white flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-[var(--color-text-dark)]">{service.title}</h3>
                <p className="text-neutral-600 mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                <a href="https://wa.me/+919718552104?text=%22Hi%20ModSpace%20Interior!%20I%20was%20exploring%20your%20website%20and%20would%20like%20to%20consult%20with%20your%20design%20team%20regarding%20a%20project." target="_blank" rel="noopener noreferrer" className="font-manrope text-[var(--color-accent-gold)] font-semibold hover:text-[var(--color-dark-primary)] transition-colors inline-flex items-center gap-2 mt-auto">
                  Get a quote <span aria-hidden="true">&rarr;</span>
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
