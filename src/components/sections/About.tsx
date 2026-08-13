"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 bg-[var(--color-dark-primary)] text-[var(--color-text-light)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="font-sans text-[var(--color-accent-gold)] tracking-[0.2em] uppercase text-sm font-semibold mb-4">
              Where design meets comfort
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-white">
              Crafting timeless pieces for modern living spaces.
            </h3>
            <div className="space-y-6 text-neutral-400 font-sans leading-relaxed mb-10">
              <p>
                Founded on the principles of exceptional craftsmanship and innovative design, Verdance has been transforming houses into homes for over two decades. We believe that furniture should not only be beautiful but also deeply functional and built to last generations.
              </p>
              <p>
                Every piece that leaves our workshop is a testament to our dedication to quality. From selecting the finest sustainable materials to the final hand-polished finish, our artisans pour their passion into creating furniture that tells a story.
              </p>
            </div>
            <Button variant="outlinebg">Get in touch</Button>
          </div>

          <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
            <div className="col-span-1 relative rounded-2xl overflow-hidden h-full">
              <Image
                src="/portfolio/modular-wardrobe-1.jpg"
                alt="Living room setup"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-full">
                <Image
                  src="/portfolio/lighting-2.jpg"
                  alt="Craftsmanship detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-full">
                <Image
                  src="/portfolio/false-ceiling-1.jpg"
                  alt="Modern chair"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
