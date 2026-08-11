"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { useFormModal } from "@/components/ui/FormModal";
import { Briefcase, Home, Building2, Hammer } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    number: "01",
    title: "Luxury Residential Interior Design",
    description:
      "Comprehensive spatial re-engineering for luxury apartments, penthouses, and private villas. We design cohesive interior landscapes, managing every detail from structural modifications and custom lighting schemes to luxury soft furnishings and custom cabinetry.",
    includes: [
      "Architectural space planning",
      "Material boards",
      "Ceiling/lighting design",
      "Modular kitchens",
      "Master suite layouts",
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    icon: Home,
    formType: "residential" as const,
  },
  {
    id: 2,
    number: "02",
    title: "Interior Contracting & Site Execution",
    description:
      "A single-point contracting solution eliminating friction of managing multiple vendors. We take complete responsibility for structural alterations, civil construction, electrical and plumbing (MEP) execution, and final fitting installation.",
    includes: [
      "Dedicated project engineering",
      "Rigid site management",
      "Civil alterations",
      "MEP coordination",
      "Guaranteed completion timelines",
    ],
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    icon: Hammer,
    formType: "callback" as const,
  },
  {
    id: 3,
    number: "03",
    title: "Commercial & Workplace Design",
    description:
      "Purpose-built interior environments for corporate offices, boutique retail outlets, and brand experience centers. We integrate ergonomic spatial planning with strong corporate branding to create workplaces optimized for both productivity and client impact.",
    includes: [
      "Acoustic wall paneling",
      "Modular workstations",
      "Executive suites",
      "HVAC coordination",
      "Safety compliance",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    icon: Building2,
    formType: "commercial" as const,
  },
  {
    id: 4,
    number: "04",
    title: "Bespoke Millwork & Custom Furniture Manufacturing",
    description:
      "Tailor-made furniture and joinery engineered specifically for your spatial dimensions. Operating with high-grade materials, our craftsmen create exclusive built-in cabinetry, wall paneling systems, and statement furniture pieces.",
    includes: [
      "3D shop drawings",
      "Custom brass and marble inlay work",
      "Architectural veneer selection",
      "Premium soft upholstery",
      "Bespoke fabrication",
    ],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    icon: Briefcase,
    formType: "callback" as const,
  },
];

export function ServiceOfferings() {
  const { openModal } = useFormModal();

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
            Core Service Offerings
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Comprehensive interior design and contracting solutions tailored to your vision
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeInUp}
                className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? "md:grid-flow-dense" : ""}`}
              >
                {/* Image */}
                <div className={`${!isEven ? "md:col-start-2" : ""} overflow-hidden rounded-lg h-80 md:h-full`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className={isEven ? "" : ""}>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-serif text-5xl md:text-6xl text-[var(--color-accent-gold)] opacity-30">
                      {service.number}
                    </span>
                    {/* <Icon className="w-8 h-8 text-[var(--color-accent-gold)] flex-shrink-0" /> */}
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-text-dark)] mb-4">
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <p className="text-sm font-semibold text-[var(--color-text-dark)] mb-3 uppercase tracking-widest">
                      Includes
                    </p>
                    <ul className="space-y-2">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)] mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openModal(service.formType)}
                    className="px-6 py-3 bg-[var(--color-accent-gold)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Inquire About This Service
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
