"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramEmbed } from "react-social-media-embed";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import { cn } from "@/lib/cn";

const INSTAGRAM_POST_URLS = [
  "https://www.instagram.com/reel/DYoPXCRT3c_/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DSPtaYhk9BK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DYIWYxIzBTv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DYozBKFtfzf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DbvhJZWMu-I/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/Db2-rPwucra/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
];

export function InstagramFeed() {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const itemsPerPage = isDesktop ? 3 : 1;
  const maxIndex = Math.max(0, INSTAGRAM_POST_URLS.length - itemsPerPage);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const visiblePosts = INSTAGRAM_POST_URLS.slice(index, index + itemsPerPage);

  return (
    <section className="py-20 md:py-32 bg-[var(--color-dark-primary)]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-sans text-sm font-medium text-[var(--color-accent-gold)] uppercase tracking-widest">
            Follow our work
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[var(--color-text-light)] mt-4">
            Recent Projects on Instagram
          </h2>
          {/* <p className="text-neutral-600 text-base md:text-lg mt-4 max-w-2xl mx-auto">
            Stay inspired by our latest interior design transformations
          </p> */}
        </motion.div>

        <div className="relative flex items-stretch gap-3 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous posts"
            className={cn(
              "hidden md:flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-full border border-neutral-200 bg-white shadow-sm transition-colors self-center",
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
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              >
                {visiblePosts.map((url, i) => (
                  <div key={i} className="flex justify-center overflow-hidden rounded-lg">
                    <InstagramEmbed url={url} width={328} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next posts"
            className={cn(
              "hidden md:flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-full border border-neutral-200 bg-white shadow-sm transition-colors self-center",
              index === maxIndex
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to post set ${i + 1}`}
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
