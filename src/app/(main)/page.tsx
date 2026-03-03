import { AboutSection } from "./_sections/AboutSection";
import { ContactSection } from "./_sections/ContactSection";
import { ExpertiseSection } from "./_sections/ExpertiseSection";
import { HeroSection } from "./_sections/HeroSection";
import { PublicationsSection } from "./_sections/PublicationsSection";

export default function DavoodWadiPortfolio() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-accent-500 selection:text-white relative">
      <main>
        <>
          <HeroSection />
          <AboutSection />
          <ExpertiseSection />
          <PublicationsSection />
          <ContactSection />
        </>
      </main>

      <footer className="py-8 text-center px-6 relative z-10 w-full">
        <p className="text-gray-600 text-sm font-light">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://davoodwadi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--crimson)] transition-colors duration-300"
          >
            Davood Wadi
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
