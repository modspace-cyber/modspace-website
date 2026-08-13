import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ServicesHero } from "@/components/sections/services-page/ServicesHero";
import { ServiceOfferings } from "@/components/sections/services-page/ServiceOfferings";
import { DetailedServiceOfferings } from "@/components/sections/services-page/DetailedServiceOfferings";
import { WorkProcess } from "@/components/sections/services-page/WorkProcess";
import { QualityStandards } from "@/components/sections/services-page/QualityStandards";
import { ServicesFAQ } from "@/components/sections/services-page/ServicesFAQ";
import { ConsultationHub } from "@/components/sections/services-page/ConsultationHub";
import { FormModalProvider } from "@/components/ui/FormModal";

export const metadata = {
  title: "Luxury Interior Design & Turnkey Services | Modspace Interior",
  description: "Luxury interior design, turnkey contracting, and custom millwork services across Delhi NCR.",
};

export default function ServicesPage() {
  return (
    <FormModalProvider>
      <main className="bg-[var(--color-light-primary)] min-h-screen flex flex-col">
        <Navbar />
        <ServicesHero />
        <ServiceOfferings />
        <DetailedServiceOfferings />
        <WorkProcess />
        <QualityStandards />
        <ServicesFAQ />
        <ConsultationHub />
        <Footer />
      </main>
    </FormModalProvider>
  );
}
