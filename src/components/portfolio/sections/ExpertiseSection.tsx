import {
  GraduationCap,
  Monitor,
  PieChart,
  type LucideIcon,
} from "lucide-react";
import { ExpertiseCard } from "@/components/portfolio/blocks/ExpertiseCard";
import { SectionContainer } from "@/components/portfolio/primitives/SectionContainer";
import { SectionHeader } from "@/components/portfolio/primitives/SectionHeader";
import type { portfolioData } from "@/app/(main)/sections.data";

type ExpertiseSectionProps = {
  data: typeof portfolioData.expertise;
};

const iconMap: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  monitor: Monitor,
  "pie-chart": PieChart,
};

export function ExpertiseSection({ data }: ExpertiseSectionProps) {
  return (
    <SectionContainer id="expertise" contentClassName="max-w-6xl">
      <SectionHeader
        align="center"
        className="mb-16"
        title={data.title}
        description={data.description}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.domains.map((domain) => {
          const IconComponent = iconMap[domain.iconType];
          return (
            <ExpertiseCard
              key={domain.title}
              icon={
                IconComponent ? (
                  <IconComponent
                    className="w-6 h-6 text-accent-400"
                    strokeWidth={1.5}
                  />
                ) : null
              }
              title={domain.title}
              description={domain.description}
              items={domain.items}
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}
