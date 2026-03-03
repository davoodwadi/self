import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { ServiceList } from "./ServiceList";

export function ServicesSection() {
  return (
    <SectionContainer
      id="services"
      className="section-padding bg-[#08080a]"
      contentClassName="max-w-5xl"
    >
      <SectionHeader align="center" className="mb-16">
        <div className="flex flex-col items-center">
          <h2 className="heading-secondary text-white/95 mb-4">
            Academic Service
          </h2>
          <div className="w-16 h-px bg-accent-500/50 mb-6"></div>
          <p className="text-body max-w-2xl text-center">
            Peer review, ethics oversight, and curriculum design.
          </p>
        </div>
      </SectionHeader>

      <FadeUp delayMs={100}>
        <div className="glass-card p-8 md:p-10 rounded-xl">
          <ServiceList />
        </div>
      </FadeUp>
    </SectionContainer>
  );
}
