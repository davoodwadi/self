"use client";

import { SlideDeck, Slide } from "@/components/SlideDeck";
import { HeroHeader, SectionHeader, ContentCard, DiscussionCard, StrategyRow } from "@/components/SlideComponents";

export default function Week1Introduction() {
  return (
    <SlideDeck>
      {/* Slide 1: Title Slide */}
      <Slide border={false} className="items-center text-center">
        <HeroHeader 
          tag="BUSI 654: Applications of AI in Business"
          title="Week 01: Introduction"
          subtitle="Navigating the Business Landscape of Artificial Intelligence"
        />
      </Slide>

      {/* Slide 2: The Problem */}
      <Slide>
        <div className="max-w-4xl">
          <SectionHeader title="The Problem" />
          <p className="gsap-reveal text-2xl font-light text-neutral-400 leading-relaxed mb-10">
            AI is often viewed as a black box or a pure engineering challenge. Business leaders struggle to bridge the gap between technical capability and strategic value.
          </p>
          <ul className="gsap-reveal text-xl space-y-6 text-neutral-300">
            <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Over-investment in hype without ROI.</li>
            <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Misalignment between technical teams and business goals.</li>
            <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Lack of scalable architecture.</li>
          </ul>
        </div>
      </Slide>

      {/* Slide 3: Technical Concept */}
      <Slide>
        <div className="max-w-5xl">
          <SectionHeader title="Technical Concepts (Simplified)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <ContentCard 
              title="Machine Learning"
              description="Systems that improve performance on a specific task by analyzing data, rather than through explicit programming."
              className="bg-neutral-900 border-neutral-800 shadow-2xl"
            />
            <ContentCard 
              title="Generative AI"
              description="Models that generate novel content (text, images, code) by learning patterns from massive training datasets."
              className="bg-neutral-900 border-neutral-800 shadow-2xl"
            />
          </div>
        </div>
      </Slide>

      {/* Slide 4: Business Impact */}
      <Slide>
        <div className="max-w-4xl">
          <SectionHeader 
            title="Business Impact & ROI" 
            subtitle="Transitioning from AI as an experiment to AI as an enterprise capability."
          />
          <div className="flex flex-col gap-6 mt-10">
            <StrategyRow 
              number="01"
              title="Operational Efficiency"
              description="Automating workflows and reducing time-to-market for core services."
            />
            <StrategyRow 
              number="02"
              title="New Revenue Streams"
              description="Creating novel AI-powered product offerings and personalized experiences."
            />
          </div>
        </div>
      </Slide>
    </SlideDeck>
  );
}
