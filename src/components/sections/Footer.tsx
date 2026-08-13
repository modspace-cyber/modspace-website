"use client";

import { useState } from "react";
import { Home, Building2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES_DATA = {
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

const SERVICE_CATEGORIES = [
  { name: "Residential", key: "residential" as const },
  { name: "Commercial", key: "commercial" as const },
  { name: "Exterior", key: "exterior" as const },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/modspaceinterior/",
    label: "Instagram",
    svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mod-space-interior-89b635389/",
    label: "LinkedIn",
    svg: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@MODSpaceInterior",
    label: "YouTube",
    svg: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.547 12 3.547 12 3.547s-7.505 0-9.377.503a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.503 9.377.503 9.377.503s7.505 0 9.377-.503a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

interface ServiceModalProps {
  selectedCategory: keyof typeof SERVICES_DATA | null;
  onClose: () => void;
}

function ServiceModal({ selectedCategory, onClose }: ServiceModalProps) {
  if (!selectedCategory) return null;

  const data = SERVICES_DATA[selectedCategory];

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
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-2xl"
          >
            ✕
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

export function Footer() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SERVICES_DATA | null>(null);

  return (
    <>
      <footer className="bg-[var(--color-dark-primary)] text-[var(--color-text-light)] pt-24 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          {/* Main Footer Grid - 3 Columns */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16 pb-16 border-b border-white/10">
            {/* Column 1: Branding */}
            <div>
              <h2 className="font-serif text-3xl font-bold uppercase tracking-wider mb-4 text-white">
                MOD SPACE INTERIOR
              </h2>
              <p className="text-neutral-400 font-sans leading-relaxed">
                We bring your vision to life, creating spaces that feel uniquely yours.
              </p>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="font-sans font-semibold text-lg mb-6 text-white">Explore Services</h3>
              <div className="flex flex-col gap-4">
                {SERVICE_CATEGORIES.map((service) => (
                  <button
                    key={service.key}
                    onClick={() => setSelectedCategory(service.key)}
                    className="flex items-center gap-2 text-neutral-400 hover:text-[var(--color-accent-gold)] transition-colors text-left group"
                  >
                    <span>{service.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </button>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent-gold)] transition-colors text-neutral-400"
                    aria-label={social.label}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.svg} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="font-sans font-semibold text-lg mb-6 text-[var(--color-accent-gold)]">Contact Us</h3>
              <div className="flex flex-col gap-6">
                {/* Address */}
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Address</p>
                    <a
                      href="https://share.google/Vztbe41gOl1Iyzgch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 text-sm hover:text-[var(--color-accent-gold)] transition-colors leading-snug"
                    >
                      Gali no 8A, Babu Ram colony, Plot no 7, Sector 81, Salarpur, Noida, Uttar Pradesh - 201305
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Phone</p>
                    <a
                      href="tel:+919718552104"
                      className="text-neutral-400 text-sm hover:text-[var(--color-accent-gold)] transition-colors"
                    >
                      +91-9718552104
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-neutral-500 font-sans">
            <p>&copy; {new Date().getFullYear()} MODSPACE INTERIOR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Service Modal */}
      <ServiceModal
        selectedCategory={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </>
  );
}
