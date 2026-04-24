import { ArrowDown } from "lucide-react";
import { FadeUp } from "@/components/portfolio/FadeUp";
import { PillBadge } from "@/components/portfolio/PillBadge";
import { PortfolioButton } from "@/components/portfolio/PortfolioButton";
import { SectionContainer } from "@/components/portfolio/SectionContainer";

export function HeroSection() {
  return (
    <div className="relative min-h-screen">
      <SectionContainer
        id="hero"
        className="min-h-screen flex items-center relative overflow-hidden bg-[#030303]"
        contentClassName="max-w-5xl text-center z-10 relative w-full"
      >
        {/* <div className="ambient-glow"></div> */}

        <FadeUp>
          <PillBadge className="border-accent-500/20 bg-accent-500/5 text-accent-500 tracking-[0.2em] text-xs">
            AI RESEARCH + MARKETING SCIENCE
          </PillBadge>
        </FadeUp>
        <FadeUp>
          <h1 className="heading-primary mb-6 mt-8">Davood Wadi</h1>
        </FadeUp>
        <FadeUp>
          <p className="text-body mb-12 max-w-2xl mx-auto md:text-xl">
            Studying how{" "}
            <span className="text-highlight">large language models</span>{" "}
            behave, and what that means for{" "}
            <span className="text-white/90 font-medium">
              marketing and business
            </span>
            .
          </p>
        </FadeUp>
        <FadeUp className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PortfolioButton href="#publications" variant="primary">
            Explore Work
          </PortfolioButton>
          <PortfolioButton href="#contact" variant="secondary">
            Let's Connect
          </PortfolioButton>
        </FadeUp>
      </SectionContainer>

      <FadeUp className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a
          href="#about"
          className="text-white/50 hover:text-white transition-colors"
        >
          <ArrowDown className="w-8 h-8" />
        </a>
      </FadeUp>
    </div>
  );
}
