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
  Summary,
} from "../_visuals/kit";
import {
  HeroFourRevolutionsEngine,
  Canada1759Interactive,
  SteamMillCrossSectionInteractive,
  FirstRevSocietySimulatorInteractive,
  Transition1890BridgeInteractive,
  SecondRevolutionPowerGridInteractive,
  InventionsWorkbenchInteractive,
  MegacitySkylineInteractive,
  WorkerBalance1932Interactive,
  SiliconWaferCircuitInteractive,
  InnovationWaveInteractive,
  Workflow2006AdapterInteractive,
  CyberPhysicalConvergenceInteractive,
  Industry4ImpactDialInteractive,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "1st Revolution" },
  { id: "ch2", label: "2nd Revolution" },
  { id: "ch3", label: "3rd Revolution" },
  { id: "ch4", label: "Industry 4.0" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BODY_BASE =
  "font-sans leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const BODY = `${BODY_BASE} text-base md:text-[1.0625rem]`;
const LIST =
  "list-none flex flex-col gap-1.5 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";
const SUBLIST =
  "list-none flex flex-col gap-1 mt-1 pl-4 [&>li]:flex [&>li]:gap-2.5 [&>li]:before:content-['-'] [&>li]:before:shrink-0";

function Bullets({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`${LIST} ${className}`}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Dashes({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={SUBLIST}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DigitalTransformationWeek9() {
  const [activeFirstPillar, setActiveFirstPillar] = useState(0);
  const [activeFirstImpact, setActiveFirstImpact] = useState(0);
  const [activeSecondPillar, setActiveSecondPillar] = useState(0);
  const [activeSecondInvention, setActiveSecondInvention] = useState(0);
  const [activeSecondImpact, setActiveSecondImpact] = useState(0);
  const [activeThirdPillar, setActiveThirdPillar] = useState(0);
  const [activeThirdInnovation, setActiveThirdInnovation] = useState(0);
  const [activeFourthTech, setActiveFourthTech] = useState(0);
  const [activeFourthImpact, setActiveFourthImpact] = useState(0);

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
        category="Week 09: Digital Transformation"
        title="Industry 4.0"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "The First Industrial Revolution",
          "The Second Industrial Revolution",
          "The Third Industrial Revolution (Digital Revolution)",
          "The Fourth Industrial Revolution (Industry 4.0)",
          "Impact on Society and Business",
        ]}
        plate={<HeroFourRevolutionsEngine />}
      />

      {/* ================================================================
          CHAPTER 1: THE FIRST INDUSTRIAL REVOLUTION
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="The First Industrial Revolution" />

      <Slide id="question-1759" label="QUESTION" title="Question">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-5`}>
          <Bullets
            items={[
              <>Place yourself in 1759.</>,
              <>You are in Canada.</>,
            ]}
          />
          <Bullets
            items={[
              <>As an individual, what jobs are available to you?</>,
              <>Which career path would you choose?</>,
            ]}
          />
        </div>
        <PlateWell>
          <Canada1759Interactive />
        </PlateWell>
      </Slide>

      <Slide
        id="the-first-industrial-revolution"
        label="18TH: 19TH CENTURY"
        title="The First Industrial Revolution"
        exercise={exercise["the-first-industrial-revolution"]}
      >
        <div className={`${BODY} flex flex-wrap items-center justify-between gap-4`}>
          <a
            href="https://www.youtube.com/watch?v=xLhNP0qp38Q"
            target="_blank"
            rel="noreferrer"
            className="underline font-sans font-bold hover:text-[var(--dt-signal)]"
          >
            The Industrial Revolution (18-19th Century)
          </a>
        </div>
        <PlateWell>
          <SteamMillCrossSectionInteractive active={activeFirstPillar} onSelect={setActiveFirstPillar} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Mechanization of Production",
              desc: "Introduction of machines to replace human and animal labor, significantly increasing productivity.",
            },
            {
              title: "2. Steam Power",
              desc: "The development of the steam engine revolutionized transportation and manufacturing.",
            },
            {
              title: "3. Factory System",
              desc: (
                <>
                  Large-scale production in centralized factories replaced cottage industries and small
                  workshops.
                </>
              ),
            },
            {
              title: "4. Textile Industry Boom",
              desc: "The invention of machines like the spinning jenny and power loom transformed textile manufacturing.",
            },
            {
              title: "5. Iron and Coal Production",
              desc: "Growth in ironworks and coal mining provided the raw materials for machinery and transportation.",
            },
            {
              title: "6. Railroads and Canals",
              desc: "Improved transportation networks enabled faster movement of goods and people.",
            },
          ].map((it, i) => {
            const isLit = i === activeFirstPillar;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide id="first-revolution-impact-on-society" label="SOCIETAL SHIFT" title="Impact on Society">
        <PlateWell>
          <FirstRevSocietySimulatorInteractive active={activeFirstImpact} onSelect={setActiveFirstImpact} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Urbanization",
              desc: "People moved to cities for factory jobs, leading to rapid urban growth.",
            },
            {
              title: "2. Rise of the Working Class",
              desc: "A new class of industrial workers emerged, often working in harsh conditions.",
            },
            {
              title: "3. Improved Transportation",
              desc: "Railways and steamships facilitated faster trade and mobility.",
            },
            {
              title: "4. Increased Production and Trade",
              desc: "Widespread availability of goods improved standards of living for some.",
            },
            {
              title: "5. Environmental Effects",
              desc: "Increased pollution and deforestation due to industrial activity.",
            },
          ].map((it, i) => {
            const isLit = i === activeFirstImpact;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          CHAPTER 2: THE SECOND INDUSTRIAL REVOLUTION
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="The Second Industrial Revolution" />

      <Slide id="question-1890" label="QUESTION" title="Question">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-5`}>
          <Bullets
            items={[
              <>It is 1890.</>,
              <>The Industrial Revolution has just happened.</>,
            ]}
          />
          <Bullets
            items={[
              <>How would you transition from your current job to a new one.</>,
              <>Which career path would you take?</>,
            ]}
          />
        </div>
        <PlateWell>
          <Transition1890BridgeInteractive />
        </PlateWell>
      </Slide>

      <Slide
        id="the-second-industrial-revolution"
        label="ELECTRIFICATION & MASS PRODUCTION"
        title="The Second Industrial Revolution"
      >
        <div className={`${BODY} flex flex-wrap items-center justify-between gap-4`}>
          <a
            href="https://www.youtube.com/watch?v=aLvJ8p9KIH8"
            target="_blank"
            rel="noreferrer"
            className="underline font-sans font-bold hover:text-[var(--dt-signal)]"
          >
            The Second Industrial Revolution
          </a>
        </div>
        <PlateWell>
          <SecondRevolutionPowerGridInteractive active={activeSecondPillar} onSelect={setActiveSecondPillar} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Mass Production & Assembly Line",
              items: [
                "Standardized manufacturing processes made products cheaper and more widely available.",
                "Henry Ford’s assembly line (1913) revolutionized automobile production, reducing costs and time.",
              ],
            },
            {
              title: "2. Widespread Electrification",
              items: [
                "Electricity replaced steam as the primary power source, leading to new industries and consumer products.",
                "Enabled efficient lighting, factory machinery, and communication systems.",
              ],
            },
            {
              title: "3. Innovation in Steel Production",
              items: [
                "The Bessemer Process (1856) allowed for mass manufacturing of steel, boosting construction and infrastructure.",
                "Led to skyscrapers, bridges, and modern railroads.",
              ],
            },
            {
              title: "4. Advances in Chemical Industry",
              items: [
                "Large-scale production of chemicals, including fertilizers, plastics, and synthetic dyes.",
                "Paved the way for modern medicine, explosives, and consumer goods.",
              ],
            },
            {
              title: "5. Revolution in Transportation & Communication",
              items: [
                "Automobiles & Airplanes: Karl Benz (1885) and the Wright Brothers (1903) transformed personal and commercial travel.",
                "Telegraph & Telephone: Samuel Morse (telegraph, 1830s) and Alexander Graham Bell (telephone, 1876) accelerated global communication.",
              ],
            },
          ].map((it, i) => {
            const isLit = i === activeSecondPillar;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg mt-1">
                  <Dashes items={it.items} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide
        id="second-revolution-key-inventions"
        label="KEY INVENTIONS"
        title="The Second Industrial Revolution"
        exercise={exercise["second-revolution-key-inventions"]}
      >
        <p className="font-sans font-bold text-xl border-l-2 border-[var(--dt-ink)]/25 pl-4">Key inventions</p>
        <PlateWell>
          <InventionsWorkbenchInteractive active={activeSecondInvention} onSelect={setActiveSecondInvention} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Electric Light Bulb",
              desc: (
                <>
                  Thomas Edison (1879) enabled night-time work and extended productivity.
                </>
              ),
            },
            {
              title: "2. Internal Combustion Engine",
              desc: "Powered automobiles and transformed transportation.",
            },
            {
              title: "3. Radio Waves",
              desc: "Guglielmo Marconi transmitted the first wireless communication (1895).",
            },
            {
              title: "4. Automobile Production Line",
              desc: "Henry Ford’s innovation made cars affordable for the masses.",
            },
          ].map((it, i) => {
            const isLit = i === activeSecondInvention;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide id="second-revolution-impact-on-society" label="SOCIETAL SHIFT" title="Impact on Society">
        <PlateWell>
          <MegacitySkylineInteractive active={activeSecondImpact} onSelect={setActiveSecondImpact} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Urban Growth & Megacities",
              desc: "Expansion of cities, improved sanitation, and the rise of skyscrapers.",
            },
            {
              title: "2. Rise of Consumer Culture",
              desc: "Increased production led to greater product variety and advertising growth.",
            },
            {
              title: "3. New Job Opportunities",
              desc: "The rise of industrial corporations required a larger workforce, including in business management.",
            },
            {
              title: "4. Improved Living Standards",
              desc: "Advancements in medicine, sanitation, and food production extended life expectancy.",
            },
            {
              title: "5. Worker Exploitation and Inequality",
              desc: "Long hours, low wages, and unsafe working conditions sparked labor movements.",
            },
            {
              title: "6. Environmental Consequences",
              desc: "Increased pollution from coal, steel, and chemical industries.",
            },
          ].map((it, i) => {
            const isLit = i === activeSecondImpact;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          CHAPTER 3: THE THIRD INDUSTRIAL REVOLUTION (DIGITAL REVOLUTION)
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="The Third Industrial Revolution (Digital Revolution)" />

      <Slide id="questions-1932" label="QUESTIONS" title="Questions">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-5`}>
          <Bullets
            items={[
              <>It is 1932.</>,
              <>How is your job impacted now?</>,
            ]}
          />
          <Bullets
            items={[
              <>In what aspects has it improved?</>,
              <>In what aspects has it worsened?</>,
            ]}
          />
        </div>
        <PlateWell>
          <WorkerBalance1932Interactive />
        </PlateWell>
      </Slide>

      <Slide
        id="the-third-industrial-revolution"
        label="DIGITAL REVOLUTION"
        title="The Third Industrial Revolution (Digital Revolution)"
      >
        <div className={`${BODY} text-sm md:text-[0.95rem] border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
          <Bullets
            className="md:grid md:grid-cols-3 md:gap-4"
            items={[
              <>The First Industrial Revolution (1760-1840) introduced steam-powered machines and mechanization.</>,
              <>
                The Second Industrial Revolution (1870-1914) advanced with electricity, mass production, and
                telecommunications.
              </>,
              <>
                The Third Industrial Revolution (1960s-Present) leverages digital computing, automation, and the
                internet to transform industries.
              </>,
            ]}
          />
        </div>
        <PlateWell>
          <SiliconWaferCircuitInteractive active={activeThirdPillar} onSelect={setActiveThirdPillar} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Digital Computing & Microprocessors",
              desc: "The invention of the transistor (1947) and microprocessor (1971) enabled the development of personal computers and digital devices.",
            },
            {
              title: "2. Automation & Robotics",
              desc: "Industries began integrating robots and automated systems for manufacturing, reducing human labor while increasing efficiency.",
            },
            {
              title: "3. The Internet & Connectivity",
              desc: "The invention of the internet (1969, ARPANET) and World Wide Web (1990, Tim Berners-Lee) transformed how businesses and people interact.",
            },
            {
              title: "4. Renewable Energy",
              desc: "Shift from fossil fuels to sustainable energy sources, such as solar and wind power.",
            },
            {
              title: "5. Big Data and AI Advancements",
              desc: "Growth in data collection, cloud computing, and artificial intelligence allows for smarter decision-making and automation.",
            },
          ].map((it, i) => {
            const isLit = i === activeThirdPillar;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide
        id="third-revolution-key-innovations"
        label="PLATFORM SHIFT"
        title="Key Innovations"
        exercise={exercise["third-revolution-key-innovations"]}
      >
        <p className="font-sans font-bold text-xl border-l-2 border-[var(--dt-ink)]/25 pl-4">
          Innovation replaces invention
        </p>
        <PlateWell>
          <InnovationWaveInteractive active={activeThirdInnovation} onSelect={setActiveThirdInnovation} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Personal Computers (1970s-1980s)",
              desc: "Enabled businesses and individuals access to computers (democratization).",
            },
            {
              title: "2. The Internet (1990s-Present)",
              desc: "Changed communication, commerce, and social interactions globally.",
            },
            {
              title: "3. Mobile Technology (2000s-Present)",
              desc: "Smartphones and wireless networks revolutionized accessibility.",
            },
            {
              title: "4. E-Commerce (1990s-Present)",
              desc: "Platforms like Amazon and Alibaba transformed global trade.",
            },
            {
              title: "5. Artificial Intelligence & Machine Learning (2010s-Present)",
              desc: "Automation of decision-making and business processes.",
            },
          ].map((it, i) => {
            const isLit = i === activeThirdInnovation;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          CHAPTER 4: THE FOURTH INDUSTRIAL REVOLUTION (INDUSTRY 4.0)
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="The Fourth Industrial Revolution (Industry 4.0)" />

      <Slide id="question-2006" label="QUESTION" title="Question">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-5`}>
          <Bullets items={[<>It is 2006.</>]} />
          <Bullets items={[<>How would your job adapt to the Third Industrial Revolution.</>]} />
        </div>
        <PlateWell>
          <Workflow2006AdapterInteractive />
        </PlateWell>
      </Slide>

      <Slide
        id="the-fourth-industrial-revolution"
        label="INDUSTRY 4.0"
        title="The Fourth Industrial Revolution (Industry 4.0)"
        exercise={exercise["the-fourth-industrial-revolution"]}
      >
        <div className={`${BODY} flex flex-wrap items-center gap-6 text-sm md:text-base`}>
          <a
            href="https://www.youtube.com/watch?v=SCGV1tNBoeU"
            target="_blank"
            rel="noreferrer"
            className="underline font-sans font-bold hover:text-[var(--dt-signal)]"
          >
            The Fourth Industrial Revolution - WEF
          </a>
          <a
            href="https://www.youtube.com/watch?v=eH1fFdjzJAw"
            target="_blank"
            rel="noreferrer"
            className="underline font-sans font-bold hover:text-[var(--dt-signal)]"
          >
            What will the future of jobs be like? - WEF
          </a>
        </div>
        <PlateWell>
          <CyberPhysicalConvergenceInteractive active={activeFourthTech} onSelect={setActiveFourthTech} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Artificial Intelligence (AI) & Machine Learning",
              desc: "Examples: Chatbots, self-learning algorithms, recommendation systems (Netflix, Amazon).",
            },
            {
              title: "2. Internet of Things (IoT) & Cyber-Physical Systems",
              desc: "Example: Smart factories where machines self-diagnose issues and optimize operations.",
            },
            {
              title: "3. Big Data & Cloud Computing",
              desc: "Example: Real-time supply chain optimization by companies like Amazon.",
            },
            {
              title: "4. Blockchain & Decentralized Technologies",
              desc: "Example: Cryptocurrencies (Bitcoin), supply chain tracking.",
            },
            {
              title: "5. Advanced Robotics & Automation",
              desc: "Example: Automated warehouse robots in e-commerce fulfillment.",
            },
            {
              title: "6. Biotechnology, 3D Printing & Human-Machine Integration",
              desc: "Example: 3D-printed organs and AI-assisted drug discovery.",
            },
            {
              title: "7. Quantum Computing & 5G Networks",
              desc: "Example: AI-powered medical diagnostics using quantum-enhanced computing power.",
            },
          ].map((it, i) => {
            const isLit = i === activeFourthTech;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide
        id="fourth-revolution-impact-on-society-and-business"
        label="SOCIETY & BUSINESS"
        title="Impact on Society and Business"
        exercise={exercise["fourth-revolution-impact-on-society-and-business"]}
      >
        <div className={`${BODY} flex flex-wrap items-center justify-between gap-4 text-sm md:text-base`}>
          <a
            href="https://www.youtube.com/watch?v=hfqD5aW0X5U"
            target="_blank"
            rel="noreferrer"
            className="underline font-sans font-bold hover:text-[var(--dt-signal)]"
          >
            Ready for Brain Transparency? - WEF
          </a>
        </div>
        <PlateWell>
          <Industry4ImpactDialInteractive active={activeFourthImpact} onSelect={setActiveFourthImpact} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              title: "1. Hyper-Personalized Products & Services",
              desc: "AI enables better customization.",
            },
            {
              title: "2. Smart Cities & Digital Governance",
              desc: "Urban management improves with IoT-enabled infrastructure.",
            },
            {
              title: "3. Increased Productivity & Efficiency",
              desc: "AI and automation reduce waste and costs.",
            },
            {
              title: "4. New Business Models",
              desc: "Growth of platform economies (Uber, Airbnb) and subscription-based services (Netflix, SaaS).",
            },
            {
              title: "5. Job Disruption & Reskilling Needs",
              desc: "AI and automation may replace millions of jobs.",
            },
            {
              title: "6. Cybersecurity & Privacy Concerns",
              desc: "Increased reliance on digital tech poses risks of cyberattacks.",
            },
            {
              title: "7. Ethical Challenges",
              desc: "AI bias, surveillance, and job displacement concerns.",
            },
          ].map((it, i) => {
            const isLit = i === activeFourthImpact;
            return (
              <li
                key={it.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-xl md:text-2xl">{it.title}</p>
                <div className="text-lg md:text-xl mt-1">
                  <Dashes items={[it.desc]} />
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          CONCLUSION
          ================================================================ */}
      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "The First Industrial Revolution (1760-1840) introduced steam-powered machines and mechanization.",
          "The Second Industrial Revolution (1870-1914) advanced with electricity, mass production, and telecommunications.",
          "The Third Industrial Revolution (1960s-Present) leverages digital computing, automation, and the internet to transform industries.",
          "The Fourth Industrial Revolution (Industry 4.0) integrates AI, IoT, cyber-physical systems, cloud, blockchain, robotics, biotechnology, and quantum computing.",
        ]}
      />
    </main>
  );
}

