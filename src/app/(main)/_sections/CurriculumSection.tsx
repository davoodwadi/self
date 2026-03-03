import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { CourseCard } from "@/components/portfolio/CourseCard";

export function CurriculumSection() {
  return (
    <SectionContainer
      id="curricula"
      className="section-padding bg-[#08080a]"
      contentClassName="max-w-7xl space-y-20"
    >
      <div>
        <SectionHeader align="center" className="mb-16">
          <div className="flex flex-col items-center">
            <h2 className="heading-secondary text-white/95 mb-4">
              Curriculum Design
            </h2>
            <div className="w-16 h-px bg-accent-500/50 mb-6"></div>
            <p className="text-body max-w-2xl text-center">
              Recent courses designed.
            </p>
          </div>
        </SectionHeader>
      </div>
      <div className=" gap-12">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <CourseCard
              label="Course"
              title="Applications of AI in Business"
              description="Hands-on course covering LLMs, prompt engineering, deep learning for NLP and computer vision, and how to evaluate AI tools for real business problems. Designed for MBA and graduate students."
              link={{
                href: "/courses",
                label: "View Curriculum",
              }}
            />
            <CourseCard
              label="Course"
              title="Digital Transformation"
              description="Covers how organizations adopt new technologies, manage the transition, and measure outcomes. Topics include platform business models, data-driven decision-making, and technology adoption frameworks."
              link={{
                href: "#",
                label: "",
              }}
            />
          </div>
        </FadeUp>
      </div>
    </SectionContainer>
  );
}
