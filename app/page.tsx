import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioSection from "@/components/PortfolioSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import Certificates from "@/components/Certificates";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 left-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute bottom-20 right-0 h-72 w-72 rounded-full bg-sky-400/15 blur-[120px]" />
      </div>
      <Navbar />
      <Hero />
      <PortfolioSection />
      <JourneyTimeline />
      <Certificates />
      <Skills />
      <Footer />
    </main>
  );
}
