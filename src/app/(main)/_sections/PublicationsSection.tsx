import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { ResearchPapers } from "./ResearchPapers";

export function PublicationsSection() {
  return (
    <SectionContainer
      id="publications"
      className="section-padding bg-[#030303] relative"
      contentClassName="max-w-7xl space-y-20 relative z-10"
    >
      <div className="ambient-glow opacity-60"></div>
      <div>
        <SectionHeader align="center" className="mb-16">
          <div className="flex flex-col items-center">
            <h2 className="heading-secondary text-white/95 mb-4">
              Selected Research
            </h2>
            <div className="w-16 h-px bg-accent-500/50 mb-6"></div>
            <p className="text-body max-w-2xl text-center">
              Recent papers and journal articles at the intersection of AI and
              Marketing.
            </p>
          </div>
        </SectionHeader>

        <ResearchPapers />
      </div>
    </SectionContainer>
  );
}
