import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { GrantsList } from "./GrantsList";
import { FadeUp } from "@/components/portfolio/FadeUp";

export function GrantsSection() {
  return (
    <SectionContainer
      id="grants"
      className="section-padding bg-[#030303] relative"
      contentClassName="max-w-7xl relative z-10"
    >
      {/* <div className="ambient-glow opacity-50"></div> */}
      <SectionHeader align="center" className="mb-16">
        <div className="flex flex-col items-center">
          <h2 className="heading-secondary text-white/95 mb-4">
            Grants & Awards
          </h2>
          <div className="w-16 h-px bg-accent-500/50 mb-6"></div>
          <p className="text-body max-w-2xl text-center">
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
