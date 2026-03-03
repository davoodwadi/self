import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { GrantsList } from "./GrantsList";
import { FadeUp } from "@/components/portfolio/FadeUp";

export function GrantsSection() {
  return (
    <SectionContainer id="grants" contentClassName="max-w-6xl">
      <SectionHeader align="center">
        <div>
          <h2 className="section-title">Grants & Awards</h2>
          <p className="section-subtitle">
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
