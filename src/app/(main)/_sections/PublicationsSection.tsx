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
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Selected Research
            </h2>
            <p className="text-gray-400 font-light">
              Recent papers and journal articles.
            </p>
          </div>
        </SectionHeader>

        <ResearchPapers />
      </div>
    </SectionContainer>
  );
}
