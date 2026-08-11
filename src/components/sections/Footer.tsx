"use client";

import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark-primary)] text-[var(--color-text-light)] pt-24 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16 border-b border-white/10 pb-16">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold uppercase tracking-wider mb-6 text-white">
              MOD SPACE INTERIOR
            </h2>
            <p className="text-neutral-400 max-w-xs font-sans">
              We bring your vision to life, creating spaces that feel uniquely yours.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end w-full">
            <h3 className="font-manrope font-semibold text-lg mb-6 text-white">Contact Info</h3>
            <div className="flex flex-col items-center md:items-end gap-4 text-neutral-400">
              <a
                href="https://share.google/Vztbe41gOl1Iyzgch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent-gold)] transition-colors"
              >
                Address: gali no 8A, Babu Ram colony, Plot no 7, Sector 81, Salarpur, Noida, Uttar Pradesh - 201305
              </a>
              <a
                href="tel:+919718552104"
                className="hover:text-[var(--color-accent-gold)] transition-colors"
              >
                Phone: +919718552104
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500 font-manrope">
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} MODSPACE INTERIOR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
