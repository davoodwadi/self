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
  Row,
  PlateWell,
  Summary,
} from "../_visuals/kit";
import {
  HeroGovernanceCompassInteractive,
  ReviewRevolutionsDialInteractive,
  ThreatLandscapeDefenseDomeInteractive,
  NorthAmericaBreachLabInteractive,
  HallucinatedReportScannerInteractive,
  CraBreachForensicTimelineInteractive,
  PrivacyMinimizationApertureInteractive,
  AlgorithmGovernanceXrayInteractive,
  InformationIntegrityFulcrumInteractive,
  AiTrainingFootprintComparatorInteractive,
  ExponentialCostForecasterInteractive,
  CloudMonopolyGravityInteractive,
  WeaponsOfMathDestructionInteractive,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "review-of-last-week", label: "Review" },
  { id: "ch1", label: "Threat Landscape" },
  { id: "ch2", label: "CRA Case Study" },
  { id: "ch3", label: "Ethics & AI" },
  { id: "ch4", label: "Sustainability & Power" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BODY_BASE = "font-body leading-[1.6] [&_strong]:font-heading [&_strong]:font-bold";
const BODY = `${BODY_BASE} text-base md:text-[1.06rem]`;
const LIST =
  "list-none flex flex-col gap-1.5 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rotate-45 [&>li]:before:shrink-0 [&>li]:before:bg-[var(--dt-ink)]";
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

export default function DigitalTransformationWeek10() {
  const [activeReviewQ, setActiveReviewQ] = useState(0);
  const [activeThreat, setActiveThreat] = useState(0);
  const [activeCraStage, setActiveCraStage] = useState(0);
  const [activeBias, setActiveBias] = useState(0);
  const [activeAiModel, setActiveAiModel] = useState(1);

  return (
    <main className="relative w-full overflow-x-hidden min-h-screen font-body" style={DECK_THEME}>
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 text-[var(--ink-3)] hover:text-[var(--dt-signal)] transition-colors duration-300"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="WEEK 10: DIGITAL TRANSFORMATION"
        title={
          <span className="block text-[clamp(1.95rem,3.3vw,2.95rem)] leading-[1.06]">
            Week 10: Cyber Security, Ethics and Social Issues of Digital Transformation
          </span>
        }
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Analyze cybersecurity risks and governance frameworks in digitally transformed businesses",
          "Evaluate ethical implications of emerging technologies and digital business models",
          "Develop strategies to address social challenges arising from digital transformation",
          "Create balanced approaches that drive innovation while managing risks responsibly",
        ]}
        plate={<HeroGovernanceCompassInteractive />}
      />

      {/* ================================================================
          REVIEW OF LAST WEEK
          ================================================================ */}
      <Slide id="review-of-last-week" label="RECAP | INDUSTRY 4.0" title="Review of Last Week">
        <ol className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-5 gap-3`}>
          {[
            "What was the First Industrial Revolution?",
            "What was the Second Industrial Revolution?",
            "What was the Third Industrial Revolution?",
            "What was the Fourth Industrial Revolution?",
            "What changes are expected in Industry 4.0?",
          ].map((q, i) => {
            const isLit = i === activeReviewQ;
            return (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => setActiveReviewQ(i)}
                  className={`w-full h-full text-left p-3.5 border-t-[4px] transition-colors cursor-pointer ${
                    isLit
                      ? "border-[var(--dt-signal)] bg-[var(--paper-2)]"
                      : "border-[var(--dt-ink)] hover:bg-[var(--paper-2)]/60"
                  }`}
                >
                  <span className="font-heading font-bold text-lg block mb-1">{i + 1}.</span>
                  <span className="font-heading font-bold text-[0.98rem] leading-snug block">{q}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <PlateWell>
          <ReviewRevolutionsDialInteractive active={activeReviewQ} onSelect={setActiveReviewQ} />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 1: THE EVOLVING THREAT LANDSCAPE
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="The Evolving Threat Landscape" />

      <Slide
        id="the-evolving-threat-landscape"
        label="CYBERSECURITY RISKS"
        title="The Evolving Threat Landscape"
        exercise={exercise["the-evolving-threat-landscape"]}
      >
        <Row cols="lg:grid-cols-[1fr_1.18fr]">
          <div className={`${BODY} flex flex-col gap-4`}>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <Bullets
                items={[
                  <>
                    Emergence of sophisticated cyber threats (
                    <button
                      type="button"
                      onClick={() => setActiveThreat(0)}
                      className="underline decoration-2 underline-offset-2 cursor-pointer"
                    >
                      <strong>state-sponsored attacks</strong>
                    </button>
                    ,{" "}
                    <button
                      type="button"
                      onClick={() => setActiveThreat(1)}
                      className="underline decoration-2 underline-offset-2 cursor-pointer"
                    >
                      <strong>ransomware</strong>
                    </button>
                    ,{" "}
                    <button
                      type="button"
                      onClick={() => setActiveThreat(2)}
                      className="underline decoration-2 underline-offset-2 cursor-pointer"
                    >
                      <strong>supply chain vulnerabilities</strong>
                    </button>
                    )
                  </>,
                ]}
              />
            </div>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <Bullets
                items={[
                  <>
                    Attack surface expansion through IoT (e.g., Device Manipulation), cloud adoption, and remote work
                    (e.g., Multifactor Authentication)
                  </>,
                ]}
              />
            </div>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <Bullets
                items={[
                  <>Economic impact of cybersecurity breaches on business operations and reputation</>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <ThreatLandscapeDefenseDomeInteractive
              activeThreat={activeThreat}
              onSelectThreat={setActiveThreat}
            />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="question-north-america-breach" label="CLASS INVESTIGATION" title="Question">
        <div className={`${BODY} grid md:grid-cols-3 gap-5 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets items={[<>Research a recent cyber security breaches in North America.</>]} />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  Find out why the breach happened.
                  <Dashes items={[<>Who caused it?</>, <>What vulnerability enabled it?</>]} />
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets items={[<>How could the organization/business prevented the breach?</>]} />
          </div>
        </div>
        <PlateWell>
          <NorthAmericaBreachLabInteractive />
        </PlateWell>
      </Slide>

      <Slide id="note-on-research" label="INFORMATION LITERACY" title="Note on Research">
        <Row cols="lg:grid-cols-[1.05fr_1.15fr]">
          <div className={`${BODY} flex flex-col gap-5`}>
            <div className="border-l-[5px] border-[var(--dt-ink)] pl-5 py-1">
              <Bullets
                className="text-lg md:text-xl gap-4"
                items={[
                  <>Not all internet sources are viable</>,
                  <>
                    Especially in GenAI era, there has been numerous fake/hallucinated reports (e.g.,{" "}
                    <a
                      href="https://www.etechcomputing.com/2024-in-review-the-most-notable-data-breaches-in-north-america/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-heading font-bold hover:text-[var(--dt-signal)]"
                    >
                      2024 in Review: The Most Notable Data Breaches in North America
                    </a>{" "}
                    talking about data breaches that did not happen!)
                  </>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <HallucinatedReportScannerInteractive />
          </PlateWell>
        </Row>
      </Slide>

      {/* ================================================================
          CHAPTER 2: CASE STUDY: CANADIAN REVENUE AGENCY (CRA) DATA LEAK
          ================================================================ */}
      <ChapterBand
        id="ch2"
        number="02"
        title="Case Study: Canadian Revenue Agency (CRA) Data Leak"
      />

      <Slide
        id="case-study-cra-data-leak"
        label="CASE STUDY"
        title="Case Study: Canadian Revenue Agency (CRA) Data Leak"
        exercise={exercise["case-study-cra-data-leak"]}
      >
        <PlateWell>
          <CraBreachForensicTimelineInteractive
            activeStage={activeCraStage}
            onSelectStage={setActiveCraStage}
          />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-3 gap-5 items-stretch`}>
          {[
            {
              stage: 0,
              items: [
                <>Canadian Revenue Agency (CRA)</>,
                <>Dating back to 2020</>,
                <>
                  Hackers obtained confidential data used by <strong>H&amp;R Block Canada</strong>, one of the
                  country&apos;s largest tax preparation firms
                </>,
                <>
                  Unauthorized access allowed imposters to change <strong>direct deposit information</strong>, submit
                  false tax returns, and steal over $6 million in fraudulent refunds
                </>,
              ],
            },
            {
              stage: 1,
              items: [
                <>
                  CRA confirmed that an internal error led to the exposure of over 30,000 Canadian taxpayers’ personal
                  information.
                </>,
                <>
                  Resulted in Social Insurance Numbers (SIN), tax returns, and financial details being left accessible
                  to unauthorized individuals.
                </>,
              ],
            },
            {
              stage: 2,
              items: [
                <>An investigation is ongoing</>,
                <>
                  Office of the Privacy Commissioner of Canada (OPC) is examining whether the CRA met its obligations
                  under the <strong>Privacy Act</strong>
                </>,
              ],
            },
          ].map((col) => {
            const isLit = activeCraStage === col.stage;
            return (
              <div
                key={col.stage}
                role="button"
                tabIndex={0}
                onClick={() => setActiveCraStage(col.stage)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCraStage(col.stage);
                  }
                }}
                className={`p-3 border-t-[4px] text-[0.95rem] leading-[1.48] transition-colors cursor-pointer ${
                  isLit
                    ? "border-[var(--dt-signal)] bg-[var(--paper-2)]"
                    : "border-[var(--dt-ink)] hover:bg-[var(--paper-2)]/50"
                }`}
              >
                <Bullets items={col.items} />
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 3: ETHICS IN DIGITAL TRANSFORMATION
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Ethics in Digital Transformation" />

      <Slide
        id="ethics-in-digital-transformation"
        label="PRIVACY BY DESIGN"
        title="Ethics in Digital Transformation"
        exercise={exercise["ethics-in-digital-transformation"]}
      >
        <div className={`${BODY} grid md:grid-cols-3 gap-5 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets items={[<>Privacy by design methodologies</>]} />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  Data minimization vs. data-driven business models
                  <Dashes items={[<>Instead of protecting the collected data, do not collect data at all.</>]} />
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  Balancing personalization and privacy rights
                  <Dashes
                    items={[<>Personalization needs personal data.</>, <>Privacy needs little data collection.</>]}
                  />
                </>,
              ]}
            />
          </div>
        </div>
        <PlateWell>
          <PrivacyMinimizationApertureInteractive />
        </PlateWell>
      </Slide>

      <Slide
        id="ethical-ai-and-algorithm-governance"
        label="RESPONSIBLE AI"
        title="Ethical AI and Algorithm Governance"
        exercise={exercise["ethical-ai-and-algorithm-governance"]}
      >
        <Row cols="lg:grid-cols-[0.95fr_1.25fr]">
          <div className={`${BODY} flex flex-col gap-5`}>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <Bullets
                items={[
                  <>
                    Algorithmic bias and fairness considerations
                    <ul className="list-none flex flex-col gap-1.5 mt-2 pl-4">
                      {["Social bias", "Racial bias", "Gender bias", "Cognitive bias"].map((b, i) => {
                        const isLit = i === activeBias;
                        return (
                          <li key={b}>
                            <button
                              type="button"
                              onClick={() => setActiveBias(i)}
                              className={`w-full text-left px-3 py-1.5 border-l-[4px] transition-colors cursor-pointer ${
                                isLit
                                  ? "border-[var(--dt-signal)] bg-[var(--paper-2)] font-heading font-bold"
                                  : "border-[var(--dt-ink)] hover:bg-[var(--paper-2)]/50"
                              }`}
                            >
                              - {b}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>,
                ]}
              />
            </div>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <Bullets
                items={[
                  <>
                    Transparency and explainability requirements
                    <Dashes items={[<>How is the AI model making decisions?</>]} />
                  </>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <AlgorithmGovernanceXrayInteractive activeBias={activeBias} onSelectBias={setActiveBias} />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="truth-trust-and-digital-information-integrity"
        label="INFORMATION INTEGRITY"
        title="Truth, Trust and Digital Information Integrity"
      >
        <div className={`${BODY} grid md:grid-cols-2 gap-6 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  Misinformation and synthetic media challenges
                  <Dashes
                    items={[
                      <>
                        e.g.,{" "}
                        <a
                          href="https://www.etechcomputing.com/2024-in-review-the-most-notable-data-breaches-in-north-america/"
                          target="_blank"
                          rel="noreferrer"
                          className="underline font-heading font-bold hover:text-[var(--dt-signal)]"
                        >
                          2024 in Review: The Most Notable Data Breaches in North America
                        </a>{" "}
                        talking about data breaches that did not happen!
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  Corporate responsibility in content moderation
                  <Dashes items={[<>The balance between battling misinformation and censorship</>]} />
                </>,
              ]}
            />
          </div>
        </div>
        <PlateWell>
          <InformationIntegrityFulcrumInteractive />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 4: SUSTAINABILITY & PLATFORM POWER
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Environmental Sustainability & Platform Power" />

      <Slide
        id="environmental-sustainability"
        label="CARBON FOOTPRINT OF AI"
        title="Environmental Sustainability"
      >
        <div className={`${BODY} border-l-[5px] border-[var(--dt-ink)] pl-4`}>
          <Bullets items={[<>Carbon footprint of digital technologies</>]} />
        </div>
        <div className={`${BODY} grid md:grid-cols-3 gap-4`}>
          {[
            {
              idx: 0,
              text: "GPT-3 (2020): Estimated training cost ranged from $2 million to $4.6 million.",
            },
            {
              idx: 1,
              text: "GPT-4 (2023): Training costs were estimated between $41 million and $78.4 million. OpenAI CEO Sam Altman suggested the total cost exceeded $100 million when including staff salaries.",
            },
            {
              idx: 2,
              text: "Gemini Ultra (2023): Google's advanced AI model had estimated training costs between $30 million and $191 million, not including staff salaries.",
            },
          ].map((card) => {
            const isLit = activeAiModel === card.idx;
            return (
              <div
                key={card.idx}
                role="button"
                tabIndex={0}
                onClick={() => setActiveAiModel(card.idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveAiModel(card.idx);
                  }
                }}
                className={`p-3.5 border-t-[4px] transition-colors cursor-pointer ${
                  isLit
                    ? "border-[var(--dt-signal)] bg-[var(--paper-2)]"
                    : "border-[var(--dt-ink)] hover:bg-[var(--paper-2)]/50"
                }`}
              >
                <Bullets items={[<>{card.text}</>]} />
              </div>
            );
          })}
        </div>
        <PlateWell>
          <AiTrainingFootprintComparatorInteractive
            activeModel={activeAiModel}
            onSelectModel={setActiveAiModel}
          />
        </PlateWell>
      </Slide>

      <Slide
        id="environmental-sustainability-growth"
        label="EXPONENTIAL TRAJECTORY"
        title="Environmental Sustainability"
        exercise={exercise["environmental-sustainability-growth"]}
      >
        <PlateWell>
          <ExponentialCostForecasterInteractive />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-3 gap-5 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  From 2017 to 2023, costs rose from $930 for the <strong>Transformer model</strong> to over $78
                  million for <strong>GPT-4</strong>.
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  Training costs for frontier AI models have grown by a factor of <strong>2x</strong> to{" "}
                  <strong>3x</strong> per year for the past eight years.
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <Bullets
              items={[
                <>
                  If this trend continues, the largest training runs could cost more than a billion dollars by 2027.
                </>,
              ]}
            />
          </div>
        </div>
      </Slide>

      <Slide
        id="platform-power-and-digital-monopolies"
        label="MARKET CONCENTRATION"
        title="Platform Power and Digital Monopolies"
        exercise={exercise["platform-power-and-digital-monopolies"]}
      >
        <Row cols="lg:grid-cols-[0.95fr_1.25fr]">
          <div className={`${BODY} border-t-[4px] border-[var(--dt-ink)] pt-4`}>
            <Bullets
              className="text-lg md:text-xl"
              items={[
                <>
                  Network effects and winner-takes-all dynamics
                  <Dashes
                    items={[
                      <>
                        In 2024, if you were to host your website, you had to go through one of top five cloud
                        companies.
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </div>
          <PlateWell>
            <CloudMonopolyGravityInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="further-readings" label="RECOMMENDED LITERATURE" title="Further Readings">
        <div className={`${BODY} border-l-[5px] border-[var(--dt-ink)] pl-5 text-lg md:text-xl`}>
          <Bullets
            items={[
              <>
                O&apos;Neil, C. (2016). Weapons of Math Destruction: How Big Data Increases Inequality and Threatens
                Democracy
              </>,
            ]}
          />
        </div>
        <PlateWell>
          <WeaponsOfMathDestructionInteractive />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CONCLUSION
          ================================================================ */}
      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "Digital Transformation Cybersecurity Threats",
          "Responsible AI and AI Ethics",
          "Environmental Impacts of Artificial Intelligence",
          "Centralization of Cloud Computing Power",
        ]}
      />
    </main>
  );
}

