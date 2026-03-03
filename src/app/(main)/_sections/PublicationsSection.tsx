import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { ResearchPapers } from "./ResearchPapers";
import { CoursesList } from "./CoursesList";
import { ServiceList } from "./ServiceList";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            Projects & Courses
          </h2>
          <CoursesList />
        </FadeUp>

        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            Academic Service
          </h2>
          <ServiceList />
        </FadeUp>
      </div>
    </SectionContainer>
  );
}
