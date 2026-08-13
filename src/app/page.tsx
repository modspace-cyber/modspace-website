import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { DetailedServiceOfferings } from "@/components/sections/services-page/DetailedServiceOfferings";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonial } from "@/components/sections/Testimonial";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { FormModalProvider } from "@/components/ui/FormModal";

export default function Home() {
  return (
    <FormModalProvider>
      <main>
        <Navbar />
        <Hero />
        <Stats />
        <About />
        <DetailedServiceOfferings/>
        <Gallery />
        <Testimonial />
        <InstagramFeed />
        <FAQ />
        <Footer />
      </main>
    </FormModalProvider>
  );
}
