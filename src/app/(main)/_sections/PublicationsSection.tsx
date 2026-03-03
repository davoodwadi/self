import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { ResearchPapers } from "./ResearchPapers";

export function PublicationsSection() {
  return (
    <SectionContainer id="publications" contentClassName="max-w-6xl space-y-20">
      <div>
        <SectionHeader align="center">
          <div>
            <h2 className="section-title">Selected Research</h2>
            <p className="section-subtitle">
              Recent papers and journal articles.
            </p>
          </div>
        </SectionHeader>

        <ResearchPapers />
      </div>
    </SectionContainer>
  );
}
