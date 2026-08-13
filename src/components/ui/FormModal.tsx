"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type FormType = "callback" | "residential" | "commercial";

export interface FormModalContextType {
  isOpen: boolean;
  formType: FormType;
  prefillData?: Record<string, any>;
  openModal: (type: FormType, prefill?: Record<string, any>) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormModal must be used within FormModalProvider");
  }
  return context;
}

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("callback");
  const [prefillData, setPrefillData] = useState<Record<string, any>>();

  const openModal = (type: FormType, prefill?: Record<string, any>) => {
    setFormType(type);
    setPrefillData(prefill);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefillData(undefined);
  };

  return (
    <FormModalContext.Provider value={{ isOpen, formType, prefillData, openModal, closeModal }}>
      {children}
      <FormModalComponent />
    </FormModalContext.Provider>
  );
}

function FormModalComponent() {
  const { isOpen, closeModal, formType, prefillData } = useFormModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === "services" || key === "scope") {
        if (!data[key]) data[key] = [];
        (data[key] as string[]).push(value as string);
      } else {
        data[key] = value;
      }
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, ...data }),
      });

      if (response.ok) {
        setSubmitMessage({ type: "success", text: "Thank you! We'll contact you soon." });
        setTimeout(() => {
          closeModal();
          setSubmitMessage(null);
        }, 2000);
      } else {
        const error = await response.json();
        setSubmitMessage({
          type: "error",
          text: error.error || "Failed to submit. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-neutral-200 flex items-center justify-between p-6">
          <h2 className="font-serif text-2xl text-[var(--color-text-dark)]">
            {formType === "callback"
              ? "Quick Callback Request"
              : formType === "residential"
              ? "Residential Project Inquiry"
              : "Commercial Project Inquiry"}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {formType === "callback" && <CallbackForm prefill={prefillData} />}
          {formType === "residential" && <ResidentialForm prefill={prefillData} />}
          {formType === "commercial" && <CommercialForm prefill={prefillData} />}

          {submitMessage && (
            <div
              className={cn(
                "p-4 rounded-lg font-sans",
                submitMessage.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              )}
            >
              {submitMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--color-accent-gold)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CallbackForm({ prefill }: { prefill?: Record<string, any> }) {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          defaultValue={prefill?.fullName || ""}
          placeholder="e.g., Ananya Sharma"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Phone / WhatsApp *
        </label>
        <input
          type="tel"
          name="phone"
          defaultValue={prefill?.phone || ""}
          placeholder="+91-9718552104"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Project Location *
        </label>
        <select
          name="location"
          defaultValue={prefill?.location || ""}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        >
          <option value="">Select location</option>
          <option value="Noida">Noida</option>
          <option value="Gurugram">Gurugram</option>
          <option value="Delhi">Delhi</option>
          <option value="Greater Noida">Greater Noida</option>
          <option value="Other">Other (Delhi NCR)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-3">
          Preferred Call Time
        </label>
        <div className="space-y-2">
          {["Morning (9 AM – 12 PM)", "Afternoon (12 PM – 4 PM)", "Evening (4 PM – 8 PM)"].map((time) => (
            <label key={time} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="callTime"
                value={time}
                defaultChecked={prefill?.callTime === time}
                className="w-4 h-4"
              />
              <span className="text-sm text-[var(--color-text-dark)]">{time}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

function ResidentialForm({ prefill }: { prefill?: Record<string, any> }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            defaultValue={prefill?.fullName || ""}
            placeholder="Enter your full name"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={prefill?.phone || ""}
            placeholder="+91 XXXXX XXXXX"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          defaultValue={prefill?.email || ""}
          placeholder="name@example.com"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Property Type *
        </label>
        <select
          name="propertyType"
          defaultValue={prefill?.propertyType || ""}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        >
          <option value="">Select property type</option>
          <option value="Apartment 2BHK">Apartment (2BHK)</option>
          <option value="Apartment 3BHK">Apartment (3BHK)</option>
          <option value="Apartment 4BHK+">Apartment (4BHK+)</option>
          <option value="Independent Villa">Independent Villa</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Duplex">Duplex</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-3">
          Possession Status *
        </label>
        <div className="space-y-2">
          {[
            "Ready to Move",
            "Possession in < 30 Days",
            "Under Construction",
            "Renovation of Existing Space",
          ].map((status) => (
            <label key={status} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="possessionStatus"
                value={status}
                defaultChecked={prefill?.possessionStatus === status}
                required
                className="w-4 h-4"
              />
              <span className="text-sm text-[var(--color-text-dark)]">{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-3">
          Services of Interest
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Layout & Movement Planning",
            "Concept Design & Themes",
            "3D Realistic Visualization",
            "Architectural Floor Plans & Elevations",
            "Vastu/Feng Shui Consulting",
            "Material & Labor Sourcing",
            "Color Consultation",
          ].map((service) => (
            <label key={service} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="services" value={service} className="w-4 h-4" />
              <span className="text-sm text-[var(--color-text-dark)]">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Estimated Budget Range *
        </label>
        <select
          name="budget"
          defaultValue={prefill?.budget || ""}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        >
          <option value="">Select budget range</option>
          <option value="₹15L - ₹30L">₹15 Lakhs – ₹30 Lakhs</option>
          <option value="₹30L - ₹50L">₹30 Lakhs – ₹50 Lakhs</option>
          <option value="₹50L - ₹1Cr">₹50 Lakhs – ₹1 Crore</option>
          <option value="₹1Cr+">₹1 Crore+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Special Requirements / Notes
        </label>
        <textarea
          name="notes"
          defaultValue={prefill?.notes || ""}
          placeholder="Mention specific design preferences, timeline targets, or material choices..."
          rows={4}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] resize-none"
        />
      </div>
    </>
  );
}

function CommercialForm({ prefill }: { prefill?: Record<string, any> }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
            Company / Business Name *
          </label>
          <input
            type="text"
            name="companyName"
            defaultValue={prefill?.companyName || ""}
            placeholder="e.g., Tech Solutions Pvt Ltd"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
            Contact Person Name *
          </label>
          <input
            type="text"
            name="contactPerson"
            defaultValue={prefill?.contactPerson || ""}
            placeholder="e.g., Vikram Mehta"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
            Designation / Role *
          </label>
          <input
            type="text"
            name="designation"
            defaultValue={prefill?.designation || ""}
            placeholder="e.g., Admin Lead, Founder"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
            Corporate Email *
          </label>
          <input
            type="email"
            name="email"
            defaultValue={prefill?.email || ""}
            placeholder="official.email@company.com"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Mobile Number *
        </label>
        <input
          type="tel"
          name="phone"
          defaultValue={prefill?.phone || ""}
          placeholder="+91 XXXXX XXXXX"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Commercial Space Type *
        </label>
        <select
          name="spaceType"
          defaultValue={prefill?.spaceType || ""}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        >
          <option value="">Select space type</option>
          <option value="Corporate Office">Corporate Office</option>
          <option value="Retail Showroom">Retail Showroom</option>
          <option value="Experience Center">Experience Center</option>
          <option value="Hospitality / Cafe">Hospitality / Cafe</option>
          <option value="Boutique Store">Boutique Store</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Total Carpet Area (Sq. Ft.) *
        </label>
        <input
          type="number"
          name="carpetArea"
          defaultValue={prefill?.carpetArea || ""}
          placeholder="e.g., 3500"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-3">
          Scope of Work
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Demolition & Masonry",
            "Structural Partitioning",
            "Flooring",
            "False Ceiling",
            "Glass & Metal Partitions",
            "Electrical & Panels",
            "Lighting Design",
            "Plumbing & Sanitation",
            "HVAC & Ventilation",
            "Modular Workstations",
            "Executive Suites",
            "Acoustic Paneling",
          ].map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="scope" value={item} className="w-4 h-4" />
              <span className="text-sm text-[var(--color-text-dark)]">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text-dark)] mb-2">
          Expected Project Start Date
        </label>
        <input
          type="date"
          name="startDate"
          defaultValue={prefill?.startDate || ""}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
        />
      </div>
    </>
  );
}
