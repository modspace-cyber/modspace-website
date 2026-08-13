"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { Home, Building2, Zap, X } from "lucide-react";
import { useState } from "react";
import { useFormModal } from "@/components/ui/FormModal";

const SERVICES = {
  residential: {
    title: "Residential Interior Design Services",
    icon: Home,
    services: [
      {
        name: "Space Planning & Architectural Design",
        details: [
          "Vastu-compliant floor layouts",
          "3D photorealistic rendering",
          "Working drawings",
        ],
      },
      {
        name: "Civil Construction & Structural Renovation",
        details: [
          "Wall demolition",
          "Masonry partitioning",
          "Damp-proofing waterproofing",
          "Luxury marble/tile flooring",
          "POP false ceilings",
        ],
      },
      {
        name: "MEP & Smart Systems",
        details: [
          "Electrical panel wiring",
          "Architectural lighting design",
          "Sanitary plumbing",
          "HVAC ducting",
          "Smart home automation",
          "MEP - Mehanical Electrical and Plumbing works"
        ],
      },
      {
        name: "Custom Carpentry",
        details: [
          "Modular kitchen design",
          "Walk-in wardrobes",
          "Custom furniture",
          "Decorative wood paneling",
          "Door/windows making with fixing",
        ],
      },
      {
        name: "Surface Finishes & Handover",
        details: [
          "Premium wall treatments (paints/wallpapers)",
          "Custom glass-and-metal partitions",
          "Soft furnishings",
          "White-glove post-construction cleaning",
        ],
      },
    ],
  },
  commercial: {
    title: "Commercial Fit-Outs & Workplace Interior Services",
    icon: Building2,
    services: [
      {
        name: "Workplace Space Planning",
        details: [
          "Spatial density optimization",
          "Brand-integrated concept design",
          "3D visualization",
          "Building code compliance",
        ],
      },
      {
        name: "Civil & Acoustic Partitioning",
        details: [
          "Structural layout modifications",
          "Frameless glass office partitions",
          "Acoustic wall/ceiling treatments",
          "High-traffic commercial flooring",
        ],
      },
      {
        name: "Commercial MEP & IT Infrastructure",
        details: [
          "Power distribution panels",
          "Task lighting design",
          "Commercial HVAC ductwork",
          "Fire suppression integration",
          "Access control/CCTV systems",
        ],
      },
      {
        name: "Workplace Fabrication & Custom Furniture",
        details: [
          "Ergonomic modular workstations",
          "Executive director suites",
          "Reception counters",
          "Boardroom tables",
          "Acoustic paneling",
        ],
      },
      {
        name: "Corporate Branding & Final Handover",
        details: [
          "Architectural wall graphics",
          "LED illuminated signage",
          "Site safety audits",
          "Complete turnkey handover",
        ],
      },
    ],
  },
  exterior: {
    title: "Exterior Facade & Elevation Services",
    icon: Zap,
    services: [
      {
        name: "Exterior Elevation & Facade Design",
        details: [
          "3D facade visualization",
          "Architectural elevation drafting",
          "Structural load calculations",
        ],
      },
      {
        name: "Exterior Cladding Systems",
        details: [
          "High-Pressure Laminate (HPL) panels",
          "Aluminium Composite Panel (ACP) cladding",
          "WPC composite siding",
          "Terracotta rain-screen systems from 1000+ options",
        ],
      },
      {
        name: "Architectural Glass & Structural Glazing",
        details: [
          "Curtain wall systems",
          "Stainless steel spider glazing",
          "Double Glazed Units (DGU)",
          "Frameless glass balcony railings",
        ],
      },
      {
        name: "Natural Stone Cladding & Masonry",
        details: [
          "Mechanical dry stone cladding",
          "Wet stone",
          "CNC cutting panels",
          "Hydrophobic stone sealing",
        ],
      },
      {
        name: "Outdoor Structures & Weatherproof Finishes",
        details: [
          "Custom steel",
          "Motorized aluminium louvers",
          "Entrance canopies",
          "Weatherproof textured wall coatings",
          "Elevation accent lighting",
        ],
      },
    ],
  },
};

function ServiceCard({
  category,
  data,
  index,
  onViewDetails,
}: {
  category: keyof typeof SERVICES;
  data: (typeof SERVICES)[keyof typeof SERVICES];
  index: number;
  onViewDetails: () => void;
}) {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={onViewDetails}
        className="w-full h-80 bg-gradient-to-br from-[var(--color-accent-gold)]/80 to-[#d4a574] rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <Icon className="w-16 h-16 mb-4 opacity-90" />
        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
          {data.title}
        </h3>
        <p className="text-sm opacity-90">
          {data.services.length} comprehensive services
        </p>
        <p className="text-xs mt-6 opacity-75">
          Click to explore details →
        </p>
      </button>
    </motion.div>
  );
}

function ServiceModal({
  data,
  isOpen,
  onClose,
}: {
  data: (typeof SERVICES)[keyof typeof SERVICES] | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-gradient-to-br from-[var(--color-accent-gold)] to-[#d4a574] text-white flex items-center justify-between p-6">
          <h2 className="font-serif text-3xl font-bold">{data.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {data.services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border-l-4 border-[var(--color-accent-gold)] pl-6"
            >
              <h3 className="font-semibold text-[var(--color-text-dark)] text-lg mb-3">
                {service.name}
              </h3>
              <ul className="space-y-2">
                {service.details.map((detail, detailIdx) => (
                  <motion.li
                    key={detailIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (idx * 0.05) + (detailIdx * 0.02) }}
                    className="flex items-start gap-3 text-neutral-600"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-[var(--color-accent-gold)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function DetailedServiceOfferings() {
  const { openModal } = useFormModal();
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SERVICES | null>(null);
  const categories = Object.entries(SERVICES) as Array<
    [keyof typeof SERVICES, (typeof SERVICES)[keyof typeof SERVICES]]
  >;

  return (
    <>
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">
              Our Comprehensive Service Portfolio
            </h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Explore our complete range of interior design, contracting, and exterior services. Click on any category card to discover detailed service offerings.
            </p>
          </motion.div>

          {/* Service Categories Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {categories.map(([category, data], idx) => (
              <ServiceCard
                key={category}
                category={category}
                data={data}
                index={idx}
                onViewDetails={() => setSelectedCategory(category)}
              />
            ))}
          </div>

          {/* Bottom Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="mt-16 md:mt-24 text-center"
          >
            <button
              onClick={() => openModal('callback')}
              className="mt-4 px-8 py-3 bg-[var(--color-accent-gold)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Request a Callback
            </button>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        data={selectedCategory ? SERVICES[selectedCategory] : null}
        isOpen={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
      />
    </>
  );
}
