"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { useFormModal } from "@/components/ui/FormModal";
import { Briefcase, Home, Building2, Hammer } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    number: "01",
    title: "Residential Interior Architecture & Design Contracting",
    description:
      "A single-point design and construction solution for private residences. We deliver custom space layouts, high-end finishing, integrated storage solutions, and luxury furnishings.",
    includes: [
      "Concept development, Mood boards & 3D visuals",
      "False ceiling design, ambient lighting & MEP drawings",
      "Custom wardrobes, vanity units & luxury furniture integration",
      "Natural stone flooring, hard surface masonry & wall finishes",
      "Complete site supervision, procurement & turnkey handover",
    ],
    video: "/videos/Architectural_hall_modular_kitchen.mp4",
    icon: Home,
    formType: "residential" as const,
  },
  {
    id: 2,
    number: "02",
    title: "Exterior Elevation & Civil Contracting",
    description:
      "Turnkey exterior transformations, structural civil works, and high-performance facade execution. From precision dry stone cladding and structural glazing to custom motorized louvers, we deliver engineered exteriors built for longevity.",
    includes: [
      "3D facade visualization & elevation drafting",
      "ACP, HPL & terracotta rain-screen cladding",
      "Structural glazing, DGU & curtain wall systems",
      "Mechanical dry stone cladding & CNC masonry",
      "Motorized louvers, canopies & weatherproofing",
    ],
    video: "/videos/Drone_flying_over_building_facade.mp4",
    icon: Hammer,
    formType: "callback" as const,
  },
  {
    id: 3,
    number: "03",
    title: "Workplace & Commercial Execution",
    description:
      "Purpose-built commercial interior environments. From spatial strategy and ergonomic furniture layout to technical infrastructure, we turn raw core-and-shell spaces into fully functional, high-impact commercial properties.",
    includes: [
      "Workplace strategy & agile layout planning",
      "Soundproofing, acoustic baffles & glass office partitions",
      "Ergonomic modular workstations & executive boardroom suites",
      "MEP, fire safety, HVAC & low-voltage cabling coordination",
      "Commercial-grade flooring, wall cladding & durable finishes",
    ],
    video: "/videos/Camera_gliding_through_modern_office.mp4",
    icon: Building2,
    formType: "commercial" as const,
  },
  {
    id: 4,
    number: "04",
    title: "Millwork & Luxury Furniture Production",
    description:
      "End-to-end custom furniture design and architectural joinery fabrication. From natural stone and timber selection to soft upholstery and metal integration, we craft exclusive built-in and free-standing interior elements.",
    includes: [
      "3D shop drawings & fabrication details",
      "Architectural veneer & solid wood joinery",
      "Custom marble, quartz & brass inlay work",
      "Acoustic & decorative wall paneling systems",
      "Custom sofas, dining tables & soft furnishings",
    ],
    video: "/videos/Modern_walk-in_wardrobe.mp4",
    icon: Briefcase,
    formType: "callback" as const,
},
];

export function ServiceOfferings() {
  const { openModal } = useFormModal();

  return (
    <section className="py-16 md:py-28 bg-white">
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

        <div className="space-y-14 md:space-y-20">
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
                {/* Video */}
                <div className={`${!isEven ? "md:col-start-2" : ""} overflow-hidden rounded-lg h-80 md:h-full`}>
                  <video
                    src={service.video}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    autoPlay
                    muted
                    loop
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
