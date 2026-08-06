"use client";

import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/framer-variants";

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[var(--color-light-primary)] border-t border-neutral-200">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="grid md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--color-muted-gray)] font-sans text-lg mb-8">
              Find answers to common questions about Modspace Interior.
            </p>
          </div>
          
          <div className="md:col-span-7">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
