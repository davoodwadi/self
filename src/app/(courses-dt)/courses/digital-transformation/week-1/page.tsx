"use client";

import React, { useState } from "react";
import { ProgressBar } from "@/components/presentation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import exercisesData from "./exercises.json";

import {
  DECK_THEME,
  DeckNav,
  PosterHero,
  ChapterBand,
  Slide,
  PlateWell,
  DiscussionSlide,
  Summary,
} from "../_visuals/kit";
import {
  HeroShopScreen,
  EqualFooting,
  DataDecision,
  KeyComponentsHub,
  TransformationSteps,
  Pyramid,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Digital Transformation" },
  { id: "ch2", label: "Digitization to Transformation" },
  { id: "ch3", label: "The Pyramid" },
  { id: "conclusion", label: "Summary" },
];

// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic in content.md carries one exercise of the
// type that fits it, and it only tests what the slide has just taught.
const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy in upright sans-serif. */
const BODY =
  "font-sans text-base md:text-[1.0625rem] leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";

const COMPONENTS: [string, React.ReactNode][] = [
  [
    "Technology Integration",
    "This involves the adoption of advanced technologies such as cloud computing, artificial intelligence (AI), big data analytics, the Internet of Things (IoT), and automation. These technologies enable organizations to streamline processes, enhance decision-making, and improve efficiency.",
  ],
  [
    "Cultural Change",
    "Digital transformation requires a shift in organizational culture. It encourages a mindset of innovation, agility, and collaboration. Employees at all levels must be willing to embrace change, experiment with new ideas, and adapt to evolving market conditions.",
  ],
  [
    "Customer-Centric Approach",
    "Understanding and meeting customer needs is at the heart of digital transformation. Organizations must leverage data and analytics to gain insights into customer behavior, preferences, and pain points, allowing them to deliver personalized experiences and build stronger relationships.",
  ],
  [
    "Process Optimization",
    "Digital transformation often involves reengineering business processes to eliminate inefficiencies and enhance productivity. This can include automating routine tasks, improving supply chain management, and optimizing resource allocation.",
  ],
  [
    "Data-Driven Decision Making",
    "Organizations must harness the power of data to inform their strategies and operations. By collecting, analyzing, and interpreting data, businesses can make informed decisions that drive growth and innovation.",
  ],
  [
    "Agility and Flexibility",
    "In a rapidly changing digital landscape, organizations must be agile and responsive. This means being able to quickly adapt to new technologies, market trends, and customer demands.",
  ],
];

const STAGES: [string, string, string[]][] = [
  [
    "Digitization",
    "Digitization is the process of converting analog information into a digital format. This involves transforming physical objects, documents, or processes into a digital representation that can be easily stored, accessed, and manipulated by computers.",
    [
      "Scanning paper documents to create digital files (PDFs, images).",
      "Converting vinyl records into digital audio files (MP3s).",
      "Turning physical photographs into digital images.",
    ],
  ],
  [
    "Digitalization",
    "Digitalization refers to the use of digital technologies to change a business model and provide new revenue and value-producing opportunities. It involves leveraging digitized data to improve processes, enhance customer experiences, and create efficiencies.",
    [
      "Implementing electronic invoicing systems to streamline billing processes.",
      "Using customer relationship management (CRM) software to manage customer interactions and data.",
      "Automating workflows through software tools to improve operational efficiency.",
    ],
  ],
  [
    "Digital Transformation",
    "Digital transformation is a broader, more strategic concept that encompasses the cultural, organizational, and operational changes that organizations undergo to fully leverage digital technologies. It involves rethinking how an organization operates and delivers value to customers in a digital-first world.",
    [
      "A retail company shifting from brick-and-mortar stores to an omnichannel approach that integrates online and offline shopping experiences.",
      "A traditional manufacturing company adopting IoT (Internet of Things) technologies to optimize production processes and supply chain management.",
      "A financial institution transforming its services to offer mobile banking and digital payment solutions, enhancing customer engagement and accessibility.",
    ],
  ],
];

const LIST =
  "list-none flex flex-col gap-1.5 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";

const LAYERS = [
  ["Foundation Layer (Technology Infrastructure)", "This is the base of the pyramid and includes the essential technology infrastructure that supports digital initiatives. It encompasses hardware, software, networks, and data management systems.", "Cloud computing, data storage solutions, cybersecurity measures, and network infrastructure."],
  ["Data Layer", "Above the foundation, this layer focuses on data collection, management, and analytics. Organizations need to harness data effectively to drive insights and decision-making.", "Data governance, data analytics tools, business intelligence, and data visualization."],
  ["Process Layer", "This layer involves the re-engineering of business processes to leverage digital technologies. It emphasizes automation, efficiency, and agility in operations.", "Workflow automation, process optimization, and integration of digital tools into existing processes."],
  ["Customer Experience Layer", "This layer focuses on enhancing the customer experience through digital channels. It involves understanding customer needs and preferences and delivering personalized experiences.", "Customer relationship management (CRM) systems, digital marketing strategies, and user experience (UX) design."],
  ["Culture and Leadership Layer", "At the top of the pyramid, this layer emphasizes the importance of organizational culture and leadership in driving digital transformation. A supportive culture and visionary leadership are crucial for successful implementation.", "Change management, employee training and development, and fostering a culture of innovation and collaboration."],
  ["Innovation Layer (Optional)", "Some models include an additional layer focused on innovation, which encourages organizations to continuously explore new technologies and business models.", "Research and development (R&D), experimentation, and partnerships with startups or tech companies."],
];

export default function DigitalTransformationWeek1() {
  const [activeComponent, setActiveComponent] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <main className="relative w-full overflow-x-hidden min-h-screen font-sans" style={DECK_THEME}>
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 text-[var(--ink-3)] hover:text-[var(--dt-signal)] transition-colors duration-200"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="Week 1: Digital Transformation"
        title="Introduction to digital transformation"
        subtitle="Foundations of Digital Transformation"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Introduction to Digital Transformation",
          "Digitization, Digitalization, and Digital Transformation",
          "The Digital Transformation Pyramid",
        ]}
        plate={<HeroShopScreen />}
      />

      {/* ================================================================
          CHAPTER 1: INTRODUCTION TO DIGITAL TRANSFORMATION
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Introduction to Digital Transformation" />

      <Slide
        id="digital-transformation"
        title="Digital Transformation"
        exercise={exercise["digital-transformation"]}
      >
        <p className="font-sans text-xl md:text-2xl leading-[1.4] text-[var(--dt-ink)] max-w-4xl">
          Digital transformation is the{" "}
          
            integration of digital technology into all areas of a business
          
          .
        </p>
        <div className={`${BODY} grid md:grid-cols-2 gap-6 md:gap-10`}>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            It fundamentally changes how businesses operate and deliver value to customers.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            It requires a cultural shift that challenges the status quo.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className={`${BODY} flex flex-col gap-3`}>
            <p className="border-t border-[var(--dt-ink)]/15 pt-3">
              Technology is a key enabler, but people and processes are equally important.
            </p>
            <PlateWell>
              <EqualFooting />
            </PlateWell>
          </div>
          <div className={`${BODY} flex flex-col gap-3`}>
            <p className="border-t border-[var(--dt-ink)]/15 pt-3">
              Data-driven decision-making is essential for successful transformation.
            </p>
            <PlateWell>
              <DataDecision />
            </PlateWell>
          </div>
        </div>
      </Slide>

      <Slide
        id="key-components"
        title="Key Components of Digital Transformation"
        exercise={exercise["key-components"]}
      >
        <PlateWell>
          <KeyComponentsHub active={activeComponent} onSelect={setActiveComponent} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {COMPONENTS.map(([name, text], i) => {
            const isLit = i === activeComponent;
            return (
              <li
                key={name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 flex flex-col gap-2 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-sans font-semibold text-sm text-[var(--ink-3)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong className="text-lg md:text-xl leading-snug text-[var(--dt-ink)]">{name}:</strong>
                </p>
                <p>{text}</p>
              </li>
            );
          })}
        </ol>
      </Slide>

      <DiscussionSlide
        quote="Which company exemplifies Digital Transformation?"
        author="Discussion Question"
      />

      {/* ================================================================
          CHAPTER 2: DIGITIZATION, DIGITALIZATION, AND DIGITAL TRANSFORMATION
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Digitization, Digitalization, and Digital Transformation" />

      <Slide
        id="digitization-digitalization-transformation"
        title="Digitization, Digitalization, and Digital Transformation"
        exercise={exercise["digitization-digitalization-transformation"]}
      >
        <PlateWell>
          <TransformationSteps active={activeStage} onSelect={setActiveStage} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {STAGES.map(([name, definition, examples], i) => {
            const isLit = i === activeStage;
            return (
              <li
                key={name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <p className="flex items-baseline gap-3">
                    <span className="font-sans font-semibold text-sm text-[var(--ink-3)] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-lg md:text-xl leading-snug text-[var(--dt-ink)]">{name}</strong>
                  </p>
                  <p>
                    <strong>Definition</strong>: {definition}
                  </p>
                </div>
                <div className="border-t lg:border-t-0 lg:border-l border-[var(--dt-ink)]/15 pt-3 lg:pt-0 lg:pl-8">
                  <p className="mb-1.5 font-sans text-sm font-semibold text-[var(--ink-3)]">
                    Examples:
                  </p>
                  <ul className={LIST}>
                    {examples.map((ex) => (
                      <li key={ex}>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <DiscussionSlide
        quote="How can organizations ensure that their digitization efforts align with their overall digital transformation strategy?"
        author="Discussion Question"
      />

      {/* ================================================================
          CHAPTER 3: THE DIGITAL TRANSFORMATION PYRAMID
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="The Digital Transformation Pyramid" />

      <Slide
        id="pyramid"
        title="The Digital Transformation Pyramid"
        exercise={exercise["pyramid"]}
      >
        <div className="grid lg:grid-cols-[1.08fr_1fr] gap-8 lg:gap-12 items-center">
          <PlateWell>
            <Pyramid active={activeLayer} onSelect={setActiveLayer} />
          </PlateWell>
          <ol className={`${BODY} grid gap-4`}>
            {LAYERS.map(([name, description, components], i) => {
              const isLit = i === activeLayer;
              return (
                <li
                  key={name}
                  aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-5 flex flex-col gap-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
                >
                  <p className="flex items-baseline gap-3">
                    <span className="font-sans font-semibold text-sm text-[var(--ink-3)] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-xl md:text-2xl leading-snug text-[var(--dt-ink)]">
                      {name}
                    </strong>
                  </p>
                  <p className="border-t border-[var(--dt-ink)]/15 pt-4">
                    <strong>Description</strong>: {description}
                  </p>
                  <p className="border-t border-[var(--dt-ink)]/15 pt-4">
                    <strong>Key Components</strong>: {components}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Slide>

      <Summary
        id="conclusion"
        title="Summary"
        summary="Digital transformation is the integration of digital technology into all areas of a business."
        takeaways={[
          "Technology is a key enabler, but people and processes are equally important.",
          "Digitization refers to converting analog information into digital format.",
          "Digital transformation goes beyond digitization by rethinking business models and processes.",
          "Successful digital transformation requires a strategic vision and leadership commitment.",
        ]}
      />
    </main>
  );
}
