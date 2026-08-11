"use client";

import { useFormModal } from "@/components/ui/FormModal";

export function ContactBanner() {
  const { openModal } = useFormModal();

  return (
    <section id="contact" className="py-24 bg-[var(--color-accent-gold)] text-[var(--color-dark-primary)]">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-bold text-white">Ready to start your project?</h2>
        <p className="text-lg mb-10 font-sans max-w-2xl mx-auto text-white/90">
          Get in touch with us to discuss your vision. We're here to help you create the perfect custom interiors.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-manrope text-lg font-medium mb-10 text-white">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <a href="tel:+919718552104" className="hover:underline">+91-9718552104</a>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/50"></div>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <a href="mailto:modspacenoida@gmail.com" className="hover:underline">modspacenoida@gmail.com</a>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <a href="mailto:interiormodspace@gmail.com" className="hover:underline">interiormodspace@gmail.com</a>
          </div>
        </div>
        <button
          onClick={() => openModal("callback")}
          className="bg-[var(--color-dark-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
        >
          Book a consultation
        </button>
      </div>
    </section>
  );
}
