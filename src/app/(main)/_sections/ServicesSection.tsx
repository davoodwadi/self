import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { ServiceList } from "./ServiceList";

export function ServicesSection() {
  return (
    <SectionContainer id="services" contentClassName="max-w-4xl">
      <SectionHeader align="center">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Academic Service
          </h2>
          <p className="text-gray-400 font-light">
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
