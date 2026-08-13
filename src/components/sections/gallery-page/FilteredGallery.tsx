"use client";

import { useState } from "react";
import { GALLERY_CATEGORIES, GALLERY_DATA } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

// ==========================================
// Isolated Card Component for Clean State Management
// ==========================================
interface GalleryItem {
  id: number;
  category: string;
  src: string;
  alt: string;
}

function GalleryCard({ item, heightRatio }: { item: GalleryItem; heightRatio: string }) {
  // Gracefully handles individual upstream 404s without breaking the layout
  const [imgSrc, setImgSrc] = useState<string>(item.src);
  const FALLBACK_IMAGE = "/images/placeholder-fallback.jpg"; // Update this path to your preferred fallback asset

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl break-inside-avoid group cursor-pointer"
    >
      <div className="relative w-full" style={{ paddingBottom: heightRatio }}>
        <Image
          src={imgSrc}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => {
            if (imgSrc !== FALLBACK_IMAGE) {
              setImgSrc(FALLBACK_IMAGE);
            }
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div>
          <h3 className="text-white font-serif text-xl mb-1">{item.alt}</h3>
          <p className="text-[var(--color-accent-gold)] font-sans text-sm">{item.category}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// Main Component
// ==========================================
export function FilteredGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredData = activeCategory === "All" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 bg-[var(--color-dark-primary)] min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Category Navigation Pills */}
        <div className="flex overflow-x-auto pb-6 mb-12 gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {GALLERY_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "whitespace-nowrap px-6 py-2 rounded-full text-sm font-sans font-medium transition-all",
                activeCategory === category 
                  ? "bg-[var(--color-accent-gold)] text-white" 
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => {
              // Creating a pseudo-random height based on index for the masonry effect
              const heights = ["100%", "120%", "80%", "140%", "90%", "110%", "130%"];
              const heightRatio = heights[index % heights.length];
              
              return (
                <GalleryCard 
                  key={item.id} 
                  item={item} 
                  heightRatio={heightRatio} 
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center text-neutral-500 py-20 font-sans">
            No images found for this category.
          </div>
        )}
      </div>
    </section>
  );
}