"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import HeaderLogo from "./HeaderLogo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-dark-primary)] px-5 box-border z-50 flex items-center justify-between">
        <Link href="/" className="inline-block hover:scale-[1.05] transition-transform duration-300">
          <span className="text-white font-serif text-lg font-bold">MOD SPACE INTERIOR</span>
        </Link>
        <button
          className="p-2 text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop nav */}
      <nav
        className={cn(
          "hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between w-full box-border transition-all duration-[800ms]",
          isScrolled
            ? "bg-[var(--color-dark-primary)] h-20 px-12 py-2.5"
            : "bg-transparent h-24 px-24 py-2.5"
        )}
      >
        <Link href="/" className="inline-block hover:scale-[1.05] transition-transform duration-300">
          <span className={cn(
            "font-serif font-bold transition-all duration-[800ms]",
            isScrolled ? "text-white text-xl" : "text-[var(--color-text-dark)] text-2xl"
          )}>MOD SPACE INTERIOR</span>
        </Link>

        <ul className="flex items-center gap-6 font-manrope text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "uppercase transition-all duration-[800ms] hover:text-[var(--color-accent-gold)]",
                  isScrolled ? "text-white" : "text-[var(--color-text-dark)]"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 right-0 w-full bg-[var(--color-dark-primary)] z-40"
          >
            <ul className="flex flex-col items-center text-white py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name} className="w-full text-center">
                  <Link
                    href={link.href}
                    className="block py-4 px-5 text-lg font-bold uppercase hover:text-[var(--color-accent-gold)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pushes page content down when mobile menu is open */}
      {isMobileMenuOpen && <div className="md:hidden h-[calc(4rem+5*56px)]" />}
    </>
  );
}
