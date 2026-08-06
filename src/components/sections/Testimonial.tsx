"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { GOOGLE_REVIEWS } from "@/lib/constants";
import { cn } from "@/lib/cn";

const AVATAR_COLORS = [
  "#1a73e8", // google blue
  "#d93025", // google red
  "#188038", // google green
  "#f9ab00", // google yellow/amber
  "#8430ce", // purple
  "#0b8043", // dark green
];

function avatarColor(name: string) {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.55-5.17 3.55-8.87z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A11.998 11.998 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.28a12 12 0 0 0 0 10.74l3.99-3.1z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.63l3.99 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={i < rating ? "#fbbc04" : "#e0e0e0"}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.77l-5.2 2.75.99-5.8-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, rating, text }: { name: string; rating: number; text: string }) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-manrope font-semibold text-base flex-shrink-0"
          style={{ backgroundColor: avatarColor(name) }}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <div className="font-manrope font-semibold text-[var(--color-text-dark)] truncate">{name}</div>
          <div className="flex items-center gap-1">
            <StarRow rating={rating} />
            <GoogleIcon className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>

      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans line-clamp-6 sm:line-clamp-5">
        {text}
      </p>
    </div>
  );
}

// how many cards are visible at once, per breakpoint
function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 768) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function Testimonial() {
  const visibleCount = useVisibleCount();
  const maxIndex = Math.max(0, GOOGLE_REVIEWS.length - visibleCount);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const visibleReviews = GOOGLE_REVIEWS.slice(index, index + visibleCount);

  return (
    <section className="py-20 md:py-32 bg-[var(--color-light-primary)]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GoogleIcon className="w-6 h-6" />
            <span className="font-manrope text-sm font-medium text-neutral-500 uppercase tracking-widest">
              Google Reviews
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[var(--color-text-dark)]">
            What our clients say
          </h2>
        </motion.div>

        <div className="relative flex items-stretch gap-3 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous reviews"
            className={cn(
              "hidden sm:flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-full border border-neutral-200 bg-white shadow-sm transition-colors self-center",
              index === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {visibleReviews.map((review) => (
                  <ReviewCard key={review.name} {...review} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next reviews"
            className={cn(
              "hidden sm:flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-full border border-neutral-200 bg-white shadow-sm transition-colors self-center",
              index === maxIndex
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile nav + dots */}
        <div className="flex sm:hidden items-center justify-center gap-6 mt-6">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous reviews"
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white shadow-sm",
              index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--color-accent-gold)] hover:text-white"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next reviews"
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white shadow-sm",
              index === maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--color-accent-gold)] hover:text-white"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to review set ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-[var(--color-accent-gold)]" : "w-2 bg-neutral-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
