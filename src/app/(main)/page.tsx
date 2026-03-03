import { AboutSection } from "./_sections/AboutSection";
import { ContactSection } from "./_sections/ContactSection";
import { HeroSection } from "./_sections/HeroSection";
import { PublicationsSection } from "./_sections/PublicationsSection";
import { GrantsSection } from "./_sections/GrantsSection";
import { ServicesSection } from "./_sections/ServicesSection";
import { TeachingSection } from "./_sections/TeachingSection";
import { CurriculumSection } from "./_sections/CurriculumSection";
export default function DavoodWadiPortfolio() {
  return (
    <div className="min-h-screen bg-[#030303] selection:bg-accent-500/30 selection:text-white relative font-sans">
      <div className="ambient-glow"></div>
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TeachingSection />
        <PublicationsSection />
        <ServicesSection />
        <GrantsSection />
        <CurriculumSection />
        <ContactSection />
      </main>

      <footer className="py-12 text-center px-6 relative z-10 w-full bg-[#030303] border-t border-white/5">
        <p className="text-muted tracking-wide text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://davoodwadi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-400 hover:text-accent-500 transition-colors duration-300"
          >
            Davood Wadi
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
