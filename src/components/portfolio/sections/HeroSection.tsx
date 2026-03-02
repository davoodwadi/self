import { ArrowDown } from "lucide-react";
import { FadeUp } from "@/components/portfolio/primitives/FadeUp";
import { PillBadge } from "@/components/portfolio/primitives/PillBadge";
import { PortfolioButton } from "@/components/portfolio/primitives/PortfolioButton";
import { SectionContainer } from "@/components/portfolio/primitives/SectionContainer";
import type { portfolioData } from "@/app/(main)/sections.data";

type HeroSectionProps = {
  data: typeof portfolioData.hero;
};

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <SectionContainer
      id="hero"
      className=""
      contentClassName="max-w-5xl text-center z-10"
    >
      <FadeUp>
        <PillBadge>{data.badge}</PillBadge>
      </FadeUp>
      <FadeUp>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight gradient-text mt-4">
          {data.name}
        </h1>
      </FadeUp>
      <FadeUp>
        <p className="text-lg md:text-2xl text-gray-400 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          {data.description.map((part, idx) => {
            if (part.type === "text") return part.text;
            return (
              <span
                key={idx}
                className={
                  part.color === "accent"
                    ? "text-accent-400 font-medium"
                    : "text-white font-medium"
                }
              >
                {part.text}
              </span>
            );
          })}
        </p>
      </FadeUp>
      <FadeUp className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {data.buttons.map((button) => (
          <PortfolioButton
            key={button.label}
            href={button.href}
            variant={button.variant}
          >
            {button.label}
          </PortfolioButton>
        ))}
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
