"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import HeaderLogo from "./HeaderLogo";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isGalleryPage = pathname === "/gallery";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile bar */}
      <div className={cn("md:hidden fixed top-0 left-0 right-0 h-16 px-5 box-border z-50 flex items-center justify-between", isGalleryPage ? "bg-white" : "bg-[var(--color-dark-primary)]")}>
        <Link href="/" className="inline-block hover:scale-[1.05] transition-transform duration-300">
          <span className={cn("font-serif text-lg font-bold", isGalleryPage ? "text-[var(--color-text-dark)]" : "text-white")}>MOD SPACE INTERIOR</span>
        </Link>
        <button
          className={cn("p-2 focus:outline-none", isGalleryPage ? "text-[var(--color-text-dark)]" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop nav */}
      <nav
        className={cn(
          "hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between w-full box-border transition-all duration-[800ms]",
          isGalleryPage
            ? "bg-white h-20 px-12 py-2.5"
            : isScrolled
            ? "bg-[var(--color-dark-primary)] h-20 px-12 py-2.5"
            : "bg-transparent h-24 px-24 py-2.5"
        )}
      >
        <Link href="/" className="inline-block hover:scale-[1.05] transition-transform duration-300">
          <span className={cn(
            "font-serif font-bold transition-all duration-[800ms]",
            isGalleryPage
              ? "text-[var(--color-text-dark)] text-xl"
              : isScrolled ? "text-white text-xl" : "text-[var(--color-text-dark)] text-2xl"
          )}>MOD SPACE INTERIOR</span>
        </Link>

        <ul className="flex items-center gap-6 font-sans text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "uppercase transition-all duration-[800ms] hover:text-[var(--color-accent-gold)]",
                  isGalleryPage
                    ? "text-[var(--color-text-dark)]"
                    : isScrolled ? "text-white" : "text-[var(--color-text-dark)]"
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
            className={cn("md:hidden fixed top-16 left-0 right-0 w-full z-40", isGalleryPage ? "bg-white" : "bg-[var(--color-dark-primary)]")}
          >
            <ul className={cn("flex flex-col items-center py-6", isGalleryPage ? "text-[var(--color-text-dark)]" : "text-white")}>
              {NAV_LINKS.map((link) => (
                <li key={link.name} className="w-full text-center">
                  <Link
                    href={link.href}
                    className={cn("block py-4 px-5 text-lg font-bold uppercase hover:text-[var(--color-accent-gold)] transition-colors", isGalleryPage ? "text-[var(--color-text-dark)]" : "text-white")}
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
