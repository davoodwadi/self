import { BookOpen, MoveRight } from "lucide-react";
import Link from "next/link";
import { PublicationCard } from "@/components/portfolio/blocks/PublicationCard";
import { ServiceListItem } from "@/components/portfolio/blocks/ServiceListItem";
import { FadeUp } from "@/components/portfolio/primitives/FadeUp";
import { SectionContainer } from "@/components/portfolio/primitives/SectionContainer";
import type { portfolioData } from "@/app/(main)/sections.data";

type PublicationsSectionProps = {
  data: typeof portfolioData.publications;
};

export function PublicationsSection({ data }: PublicationsSectionProps) {
  return (
    <SectionContainer id="publications" contentClassName="max-w-6xl space-y-20">
      <div>
        <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              {data.researchTitle}
            </h2>
            <p className="text-gray-400 font-light">
              {data.researchDescription}
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.papers.map((paper) => (
            <PublicationCard key={paper.title} {...paper} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            {data.courses.heading}
          </h2>
          <div className="space-y-6">
            {data.courses.items.map((course, index) => (
              <div
                key={`course-${index}`}
                className="glass-card p-8 rounded-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-500 block">
                      {course.label}
                    </span>
                    <BookOpen size={20} className="text-accent-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold tracking-tight mb-4 text-white">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-6">
                    {course.description}
                  </p>
                  {course.link.label && (
                    <Link
                      href={course.link.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent-500 hover:text-accent-400 transition-colors"
                    >
                      {course.link.label}
                      <span className="group-hover:translate-x-1 transition-transform inline-flex">
                        <MoveRight size={16} />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            {data.service.heading}
          </h2>
          <div className="space-y-6">
            {data.service.items.map((item, index) => (
              <ServiceListItem
                key={`service-${index}`}
                title={item.title}
                bordered={item.bordered}
              >
                {item.listItems ? (
                  <ul className="text-sm text-gray-400 font-light space-y-2">
                    {item.listItems.map((listItem, idx) => (
                      <li key={idx}>
                        <span className="text-accent-400 font-medium">
                          {listItem.label}
                        </span>
                        {listItem.description && ` - ${listItem.description}`}
                      </li>
                    ))}
                  </ul>
                ) : item.content && item.content.includes("<") ? (
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                ) : (
                  item.content
                )}
              </ServiceListItem>
            ))}
            {data.service.curricula && data.service.curricula.length > 0 && (
              <ServiceListItem
                key="curricula"
                title={data.service.curricula[0].title}
                bordered={data.service.curricula[0].bordered}
              >
                <ul className="text-sm text-gray-400 font-light space-y-2">
                  {data.service.curricula.map((curriculum, index) => (
                    <li key={index}>{curriculum.description}</li>
                  ))}
                </ul>
              </ServiceListItem>
            )}
          </div>
        </FadeUp>
      </div>
    </SectionContainer>
  );
}
