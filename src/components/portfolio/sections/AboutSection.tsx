import { ProfilePortrait } from "@/components/portfolio/blocks/ProfilePortrait";
import { FadeUp } from "@/components/portfolio/primitives/FadeUp";
import { SectionContainer } from "@/components/portfolio/primitives/SectionContainer";
import type { portfolioData } from "@/app/(main)/sections.data";

type AboutSectionProps = {
  data: typeof portfolioData.about;
};

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <SectionContainer
      id="about"
      className="md:py-32"
      contentClassName="max-w-4xl"
    >
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <FadeUp className="w-full md:w-1/3">
          <ProfilePortrait src={data.portrait.src} alt={data.portrait.alt} />
        </FadeUp>
        <FadeUp className="w-full md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 border-b border-gray-800 pb-4">
            {data.heading}{" "}
            <span className="gradient-text-accent">{data.headingAccent}</span>
          </h2>
          {data.paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-gray-400 text-lg leading-relaxed font-light"
              style={{
                marginBottom: idx < data.paragraphs.length - 1 ? "1.5rem" : 0,
              }}
            >
              {para}
            </p>
          ))}
        </FadeUp>
      </div>
    </SectionContainer>
  );
}
