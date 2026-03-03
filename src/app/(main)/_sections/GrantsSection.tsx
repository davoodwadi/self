import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { GrantsList } from "./GrantsList";
import { FadeUp } from "@/components/portfolio/FadeUp";

export function GrantsSection() {
  return (
    <SectionContainer id="grants" contentClassName="max-w-6xl">
      <SectionHeader align="center">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Grants & Awards
          </h2>
          <p className="text-gray-400 font-light">
            Funding and recognition for AI-driven research.
          </p>
        </div>
      </SectionHeader>

      <FadeUp delayMs={100}>
        <GrantsList />
      </FadeUp>
    </SectionContainer>
  );
}
