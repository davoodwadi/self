import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { CourseCard } from "@/components/portfolio/CourseCard";

export function CurriculumSection() {
  return (
    <SectionContainer id="curricula" contentClassName="max-w-6xl space-y-20">
      <div>
        <SectionHeader align="center">
          <div>
            <h2 className="section-title">Curriculum Design</h2>
            <p className="section-subtitle">Recent courses designed.</p>
          </div>
        </SectionHeader>
      </div>
      <div className=" gap-12">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <CourseCard
              label="Featured Course"
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
