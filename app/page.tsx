import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import JourneyTimeline from "@/components/JourneyTimeline";
import PortfolioSection from "@/components/PortfolioSection";
import Contact from "@/components/Contact";
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
      <About />
      <JourneyTimeline />
      <PortfolioSection />
      <Contact />
      <Footer />
    </main>
  );
}
