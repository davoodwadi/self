import { ArrowDown } from "lucide-react";
import { FadeUp } from "@/components/portfolio/FadeUp";
import { PillBadge } from "@/components/portfolio/PillBadge";
import { PortfolioButton } from "@/components/portfolio/PortfolioButton";
import { SectionContainer } from "@/components/portfolio/SectionContainer";

export function HeroSection() {
  return (
    <SectionContainer
      id="hero"
      className=""
      contentClassName="max-w-5xl text-center z-10"
    >
      <FadeUp>
        <PillBadge>AI Research + Marketing Science</PillBadge>
      </FadeUp>
      <FadeUp>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight gradient-text mt-4">
          Davood Wadi
        </h1>
      </FadeUp>
      <FadeUp>
        <p className="text-lg md:text-2xl text-gray-400 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          Studying how{" "}
          <span className="text-accent-400 font-medium">
            large language models
          </span>{" "}
          behave, and what that means for{" "}
          <span className="text-white font-medium">marketing and business</span>
          .
        </p>
      </FadeUp>
      <FadeUp className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <PortfolioButton href="#expertise" variant="primary">
          Explore Work
        </PortfolioButton>
        <PortfolioButton href="#contact" variant="secondary">
          Let&apos;s Connect
        </PortfolioButton>
      </FadeUp>

      <FadeUp className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="text-gray-500 hover:text-white transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </a>
      </FadeUp>
    </SectionContainer>
  );
}
