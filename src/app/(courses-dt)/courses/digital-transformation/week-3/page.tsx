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
  DiscussionList,
  Kicker,
  Summary,
} from "../_visuals/kit";
import {
  HeroStairs,
  DiscToStream,
  FourTypes,
  NetflixTimeline,
  NETFLIX_YEARS,
  NetflixConsiderations,
  AlignedChange,
  KotterStairs,
  KotterSteps1To4,
  KotterSteps5To8,
  BoxToCloud,
  MicrosoftKotter1To4,
  MicrosoftKotter5To8,
  AdkarOverview,
  AdkarFirstThree,
  AdkarLastTwo,
  SmallReleases,
  TwoPaths,
  TradVsAgileInteractive,
  RugbyScrum,
  ScrumPrinciples1To3,
  ScrumPrinciples4To6,
  ScrumProcess,
  ScrumRolesHub,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "The Case of Netflix" },
  { id: "ch2", label: "Change Management" },
  { id: "ch3", label: "Agile Project Management" },
  { id: "ch4", label: "Scrum" },
  { id: "conclusion", label: "Conclusion" },
];

// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic in content.md carries one exercise of the
// type that fits it, and it only tests what the slide has just taught.
const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy in upright sans-serif. */
const BODY =
  "font-sans text-base md:text-[1.0625rem] leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const LIST =
  "list-none flex flex-col gap-1 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";
const SUB = "font-sans font-semibold text-sm tracking-normal text-[var(--ink-3)]";

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

/* A discussion question set under the points it belongs to. */
function Ask({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 pt-3 border-t border-[var(--dt-ink)]/15 font-sans text-base leading-relaxed text-[var(--dt-ink)] [&_strong]:font-semibold">
      <span className={`${SUB} block mb-1`}>Question:</span> {children}
    </p>
  );
}

/* An ADKAR letter on its ink block. */
function Letter({ l, size = "w-10 h-10 text-xl" }: { l: string; size?: string }) {
  return (
    <span
      aria-hidden
      className={`${size} shrink-0 inline-flex items-center justify-center bg-[var(--dt-ink)] text-[var(--dt-white)] font-sans font-bold`}
    >
      {l}
    </span>
  );
}

export default function DigitalTransformationWeek3() {
  const [activeAnalytics, setActiveAnalytics] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activeKotter14, setActiveKotter14] = useState(0);
  const [activeKotter58, setActiveKotter58] = useState(0);
  const [activeMs14, setActiveMs14] = useState(0);
  const [activeMs58, setActiveMs58] = useState(0);
  const [activeAdkarOverview, setActiveAdkarOverview] = useState(0);
  const [activeAdkar13, setActiveAdkar13] = useState(0);
  const [activeAdkar45, setActiveAdkar45] = useState(0);
  const [activeTradAgile, setActiveTradAgile] = useState(0);
  const [activeScrum13, setActiveScrum13] = useState(0);
  const [activeScrum46, setActiveScrum46] = useState(0);
  const [activeScrumRole, setActiveScrumRole] = useState(0);
  const [activeScrumEvent1, setActiveScrumEvent1] = useState(0);
  const [activeScrumEvent2, setActiveScrumEvent2] = useState(0);
  const [activeScrumArtifact, setActiveScrumArtifact] = useState(0);

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
        category="Week 03: Digital Transformation"
        title="Change Management, Project Management"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "The Case of Netflix",
          "Describe change management",
          "Importance of change management in digital transformation",
          "Agile project management",
          "Scrum",
          "Conclusion",
          "Q&A",
        ]}
        plate={<HeroStairs />}
      />

      {/* ================================================================
          CHAPTER 1: THE CASE OF NETFLIX
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="The Case of Netflix" />

      <Slide
        id="how-netflix-transformed-the-movie-industry"
        title="How Netflix Transformed The Movie Industry"
      >
        <p className="font-sans text-xl md:text-2xl leading-[1.4] text-[var(--dt-ink)] max-w-4xl">
          Prescriptive Analytics for Strategic Decision-Making in Business
        </p>
        <Row cols="lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className={SUB}>Question:</p>
            <ol className="mt-3">
              {[
                <>
                  What is Prescriptive Analytics?
                </>,
                <>What other types of analytics do we have?</>,
              ].map((q, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-4 py-4 border-t border-[var(--dt-ink)]/15 first:border-t-0 font-sans text-lg md:text-xl leading-[1.45] text-[var(--dt-ink)]"
                >
                  <span className="font-sans text-sm font-semibold text-[var(--ink-3)] w-6 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
          <PlateWell>
            <DiscToStream />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="data-analytics-four-key-types"
        label="DATA ANALYTICS"
        title="Data analytics - Four key types"
        exercise={exercise["data-analytics-four-key-types"]}
      >
        <PlateWell>
          <FourTypes active={activeAnalytics} onSelect={setActiveAnalytics} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            {
              name: "Descriptive",
              q: "What happened?",
              def: (
                <>
                  <strong>Descriptive analytics</strong> is the process of summarizing historical data to
                  understand what has happened in the past.
                </>
              ),
            },
            {
              name: "Diagnostic",
              q: "Why did this happen?",
              def: (
                <>
                  <strong>Diagnostic analytics</strong> is the process of examining data to uncover the{" "}
                  root causes and why an outcome happened.
                </>
              ),
            },
            {
              name: "Prescriptive",
              q: "What should we do next?",
              def: (
                <>
                  <strong>Prescriptive analytics</strong> is the process of using data to determine an{" "}
                  optimal course of action, yielding recommendations for next steps.
                </>
              ),
            },
            {
              name: "Predictive",
              q: "What might happen in the future?",
              def: (
                <>
                  <strong>Predictive analytics</strong> is the process of using{" "}
                  historical data and statistical models to forecast what might happen in the
                  future.
                </>
              ),
            },
          ].map((item, i) => {
            const isLit = i === activeAnalytics;
            return (
              <li
                key={item.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 flex flex-col gap-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans text-2xl md:text-3xl leading-snug flex items-baseline gap-3">
                  <span className="font-sans font-bold">{i + 1}.</span>
                  <span>
                    <strong>{item.name}</strong>: {item.q}
                  </span>
                </p>
                <div className="border-t border-[var(--dt-ink)]/15 pt-4 grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-2 items-baseline">
                  <p className="font-sans font-bold text-xl">{item.name} Analytics</p>
                  <div>
                    <p className={`${SUB} mb-1`}>Definition:</p>
                    <p className="text-lg">{item.def}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide id="netflix-timeline" label="CASE STUDY" title="Netflix Timeline">
        <PlateWell>
          <NetflixTimeline active={activeTimeline} onSelect={setActiveTimeline} />
        </PlateWell>
        <ol className={`${BODY} grid gap-4`}>
          {[
            ["Netflix founded", "Pay-per-rental model"],
            ["Change in business model", "Monthly subscription"],
            ["Growth in user base", "1 million subscribers"],
            ["Streaming service", "Complete transformation of business into digital"],
          ].map(([name, text], i) => {
            const isLit = i === activeTimeline;
            return (
              <li
                key={name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans text-2xl md:text-3xl leading-snug flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-sans font-bold">{NETFLIX_YEARS[i]}:</span>{" "}
                  <span>
                    <strong>{name}</strong>: {text}
                  </span>
                </p>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide
        id="challenges-and-considerations"
        label="Challenges and Considerations"
        title="What Netflix needs to consider for digital transformation"
        exercise={exercise["challenges-and-considerations"]}
      >
        <PlateWell>
          <NetflixConsiderations active={activeChallenge} onSelect={setActiveChallenge} />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-2 gap-6`}>
          {[
            {
              name: "Technology",
              items: [
                <>
                  Cloud infrastructure to support demand
                </>,
                <>
                  Video encoding technology (high fidelity yet lightweight)
                </>,
              ],
            },
            {
              name: "Business",
              items: [
                <>
                  New <strong>business model</strong>: Movie rental -&gt; Stream on demand
                </>,
                <>
                  Competition and Piracy
                </>,
                <>
                  Consumer engagement and loyalty
                </>,
              ],
            },
          ].map((group, i) => {
            const isLit = i === activeChallenge;
            return (
              <div
                key={group.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-2xl md:text-3xl mb-3">{group.name}</p>
                <Bullets items={group.items} />
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 2: CHANGE MANAGEMENT
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Change Management" />

      <DiscussionList
        questions={[
          "What challenges do organizations face when undergoing major changes?",
          "Why do employees often resist change?",
          "What strategies might help ensure smooth transitions during change?",
          "How can leaders align people and processes during transformation?",
        ]}
      />

      <Slide id="change-management" label="DEFINITION" title="Change Management">
        <p className="font-sans text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.3] max-w-5xl [&_strong]:font-bold">
          Change management ensures that organizations smoothly transition to digital transformation by aligning{" "}
          people, processes, and technology.
        </p>
        <PlateWell>
          <AlignedChange />
        </PlateWell>
      </Slide>

      <Slide id="kotters-8-step-change-management" label="FRAMEWORK" title="Kotter's 8 Step Change Management">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 md:gap-10`}>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            Kotter&apos;s 8-Step Change Management Model is a framework developed by Dr. John Kotter, a professor at
            Harvard Business School, to help organizations implement successful change initiatives.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            The model outlines a step-by-step process for leading change and is widely used in various
            industries.
          </p>
        </div>
        <PlateWell>
          <KotterStairs />
        </PlateWell>
      </Slide>

      <Slide id="the-eight-steps-1-to-4" label="KOTTER'S 8 STEPS" title="The Eight Steps: 1 to 4">
        <PlateWell>
          <KotterSteps1To4 active={activeKotter14} onSelect={setActiveKotter14} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              n: 1,
              name: "Create a Sense of Urgency",
              points: [
                <>
                  Highlight the importance of change and the potential{" "}
                  risks of not changing.
                </>,
                <>
                  This step involves communicating the need for change to motivate{" "}
                  stakeholders and create a sense of urgency.
                </>,
              ],
              ask: (
                <>
                  How can leaders effectively create urgency without causing panic or{" "}
                  resistance?
                </>
              ),
            },
            {
              n: 2,
              name: "Build a Guiding Coalition",
              points: [
                <>
                  Form a group of influential people within the organization who can lead the change
                  effort.
                </>,
                <>
                  This coalition should have the authority, expertise, and{" "}
                  credibility to drive the change process.
                </>,
              ],
              ask: <>What qualities should leaders look for when forming a guiding coalition?</>,
            },
            {
              n: 3,
              name: "Form a Strategic Vision and Initiatives",
              points: [
                <>
                  Develop a clear vision for the future and outline the initiatives{" "}
                  that will help achieve that vision.
                </>,
                <>
                  This step involves articulating the desired outcomes and how the
                  change will benefit the organization.
                </>,
              ],
              ask: <>How can a compelling vision help unify and motivate employees during digital transformation?</>,
            },
            {
              n: 4,
              name: "Communicate the Vision",
              points: [
                <>
                  Share the vision and strategy with all stakeholders.
                </>,
                <>
                  Effective communication is crucial to ensure that everyone understands the
                  change and is aligned with the vision.
                </>,
              ],
              ask: (
                <>
                  What communication methods are most effective for ensuring employees understand and support the
                  vision?
                </>
              ),
            },
          ].map((s, i) => {
            const isLit = i === activeKotter14;
            return (
              <div
                key={s.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <p className="font-sans font-bold text-2xl leading-tight mb-3 flex items-baseline gap-3">
                    <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">{s.n}.</span>
                    <span>{s.name}:</span>
                  </p>
                  <Bullets items={s.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l md:border-[var(--dt-ink)]/15 md:pl-6">
                  <Ask>{s.ask}</Ask>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="the-eight-steps-5-to-8"
        label="KOTTER'S 8 STEPS"
        title="The Eight Steps: 5 to 8"
        exercise={exercise["the-eight-steps-5-to-8"]}
      >
        <PlateWell>
          <KotterSteps5To8 active={activeKotter58} onSelect={setActiveKotter58} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              n: 5,
              name: "Empower Broad-Based Action",
              points: [
                <>
                  Remove obstacles that may hinder change and empower employees to take{" "}
                  action.
                </>,
                <>
                  This may involve providing training, resources, and{" "}
                  support to help individuals contribute to the change effort.
                </>,
              ],
              ask: "What challenges might organizations face when empowering employees to act on the change vision?",
            },
            {
              n: 6,
              name: "Generate Short-Term Wins",
              points: [
                <>
                  Create and celebrate short-term successes to build momentum and{" "}
                  demonstrate the benefits of the change.
                </>,
                <>
                  Recognizing and rewarding achievements can help maintain motivation
                  and support for the change initiative.
                </>,
              ],
              ask: "Why are short-term wins important for sustaining long-term change?",
            },
            {
              n: 7,
              name: "Consolidate Gains and Produce More Change",
              points: [
                <>
                  Use the credibility gained from short-term wins to tackle{" "}
                  larger change initiatives.
                </>,
                <>
                  This step involves reinforcing the change and ensuring that it becomes part
                  of the organizational culture.
                </>,
              ],
              ask: "How can organizations avoid complacency after achieving initial success in change initiatives?",
            },
            {
              n: 8,
              name: "Anchor New Approaches in the Culture",
              points: [
                <>
                  Ensure that the changes are integrated into the organization&apos;s culture{" "}
                  and practices.
                </>,
                <>
                  This involves reinforcing the new behaviors and values through policies,{" "}
                  procedures, and ongoing communication.
                </>,
              ],
              ask: "What strategies can leaders use to ensure changes become permanent and part of the organizational culture?",
            },
          ].map((s, i) => {
            const isLit = i === activeKotter58;
            return (
              <div
                key={s.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <p className="font-sans font-bold text-2xl leading-tight mb-3 flex items-baseline gap-3">
                    <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">{s.n}.</span>
                    <span>{s.name}:</span>
                  </p>
                  <Bullets items={s.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l md:border-[var(--dt-ink)]/15 md:pl-6">
                  <Ask>{s.ask}</Ask>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide id="the-case-of-microsoft" label="CASE STUDY" title="The Case of Microsoft">
        <Row cols="lg:grid-cols-[1.2fr_1fr]">
          <ol className="flex flex-col">
            {[
              <>Microsoft under CEO Satya Nadella</>,
              <>around 2014 when he took over leadership</>,
              <>Nadella&apos;s approach to change management aligns well with Kotter&apos;s framework</>,
              <>
                He sought to shift the company&apos;s culture
              </>,
              <>
                Focus towards cloud computing
              </>,
            ].map((s, i) => (
              <li
                key={i}
                className="font-sans text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.35] py-3 border-t border-[var(--dt-ink)]/15 first:border-t-0 first:pt-0"
              >
                {s}
              </li>
            ))}
          </ol>
          <PlateWell>
            <BoxToCloud />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="microsoft-kotter-1-to-4"
        label="THE CASE OF MICROSOFT"
        title="Microsoft’s transformation and Kotter’s 8 Steps: 1 to 4"
      >
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
          <PlateWell>
            <MicrosoftKotter1To4 active={activeMs14} onSelect={setActiveMs14} />
          </PlateWell>
          <div className={`${BODY} grid gap-4`}>
            {[
              {
                n: 1,
                name: "Create a Sense of Urgency",
                items: [
                  <>
                    Nadella&apos;s emphasis on adapting to a rapidly changing technology landscape
                  </>,
                  <>
                    the rise of cloud computing and mobile technology
                  </>,
                  <>
                    He communicated the urgency of evolving from a traditional software company to a{" "}
                    cloud-first, mobile-first organization.
                  </>,
                ],
              },
              {
                n: 2,
                name: "Build a Guiding Coalition",
                items: [
                  <>
                    Nadella built a strong leadership team that included executives from{" "}
                    various divisions.
                  </>,
                ],
              },
              {
                n: 3,
                name: "Form a Strategic Vision and Initiatives",
                items: [
                  <>
                    Nadella articulated a clear vision for Microsoft’s future:
                    <Bullets
                      className="mt-1"
                      items={["cloud services", "artificial intelligence", "collaboration tools"]}
                    />
                  </>,
                  <>
                    Introduced initiatives like Microsoft Azure and Office 365 to
                    support this vision
                  </>,
                ],
              },
              {
                n: 4,
                name: "Communicate the Vision",
                items: [
                  <>
                    Through various channels:
                    <Bullets className="mt-1" items={["company-wide meetings,", "emails,", "public appearances"]} />
                  </>,
                  <>
                    He encouraged open dialogue and feedback, fostering a{" "}
                    culture of transparency.
                  </>,
                ],
              },
            ].map((s, i) => {
              const isLit = i === activeMs14;
              return (
                <div
                  key={s.n}
                  aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-5 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
                >
                  <p className="font-sans font-bold text-2xl md:text-3xl leading-tight mb-4 flex items-baseline gap-3">
                    <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">{s.n}.</span>
                    <span>{s.name}:</span>
                  </p>
                  <Bullets className="gap-2" items={s.items} />
                </div>
              );
            })}
          </div>
        </div>
      </Slide>

      <Slide
        id="microsoft-kotter-5-to-8"
        label="THE CASE OF MICROSOFT"
        title="Microsoft’s transformation and Kotter’s 8 Steps: 5 to 8"
      >
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-center">
          <div className={`${BODY} !text-lg grid order-2 lg:order-1`}>
            {[
              {
                n: 5,
                name: "Empower Broad-Based Action",
                items: [
                  <>
                    Nadella encouraged employees to take risks and innovate.
                  </>,
                  <>
                    He removed bureaucratic obstacles and promoted a growth mindset,
                    allowing teams to experiment and learn from failures.
                  </>,
                ],
              },
              {
                n: 6,
                name: "Generate Short-Term Wins",
                items: [
                  <>
                    Microsoft saw significant early successes with the adoption of Azure and the growth of
                    Office 365.
                  </>,
                  <>
                    These wins were celebrated and communicated throughout the
                    organization.
                  </>,
                ],
              },
              {
                n: 7,
                name: "Consolidate Gains and Produce More Change",
                items: [
                  <>
                    Building on the initial successes, Microsoft continued to invest in cloud
                    technology and expand its product offerings.
                  </>,
                  <>
                    Nadella’s leadership helped to solidify the company’s position in the{" "}
                    cloud market.
                  </>,
                ],
              },
              {
                n: 8,
                name: "Anchor New Approaches in the Culture",
                items: [
                  <>
                    Nadella worked to embed a culture of collaboration, inclusivity,
                    and continuous learning within Microsoft.
                  </>,
                  <>
                    He emphasized values such as empathy and teamwork
                  </>,
                  <>
                    Ensuring that the new approaches became part of the organizational culture.
                  </>,
                ],
              },
            ].map((s, i) => {
              const isLit = i === activeMs58;
              return (
                <div
                  key={s.n}
                  aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-5 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
                >
                  <p className="font-sans font-bold text-2xl md:text-3xl leading-tight mb-4 flex items-baseline gap-3">
                    <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">{s.n}.</span>
                    <span>{s.name}:</span>
                  </p>
                  <Bullets className="gap-2" items={s.items} />
                </div>
              );
            })}
          </div>
          <div className="order-1 lg:order-2">
            <PlateWell>
              <MicrosoftKotter5To8 active={activeMs58} onSelect={setActiveMs58} />
            </PlateWell>
          </div>
        </div>
      </Slide>

      <Slide id="prosci-adkar-change-management-model" label="FRAMEWORK" title="Prosci - ADKAR Change Management Model">
        <div className={`${BODY} grid md:grid-cols-2 gap-x-10 gap-y-2`}>
          <Bullets
            className="gap-2"
            items={[
              <>
                The Prosci ADKAR Model is a widely recognized framework for change management
              </>,
              <>Developed by Prosci, a research and training organization focused on change management practices.</>,
            ]}
          />
          <Bullets
            className="gap-2"
            items={[
              <>
                The model is designed to help organizations manage change effectively by focusing on
                the individual aspects of change.
              </>,
              <>
                ADKAR is an acronym that stands for the five key outcomes that{" "}
                individuals need to achieve for successful change.
              </>,
            ]}
          />
        </div>
        <PlateWell>
          <AdkarOverview active={activeAdkarOverview} onSelect={setActiveAdkarOverview} />
        </PlateWell>
        <ol className="grid">
          {[
            ["A", "Awareness", "Of the need for change"],
            ["D", "Desire", "To participate and support the change"],
            ["K", "Knowledge", "On how to change"],
            ["A", "Ability", "To implement required skills and behaviors"],
            ["R", "Reinforcement", "To sustain the change"],
          ].map(([l, name, text], i) => {
            const isLit = i === activeAdkarOverview;
            return (
              <li
                key={name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 flex items-center gap-4 border border-[var(--dt-ink)]/15 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <Letter l={l} size="w-10 h-10 text-xl" />
                <p className="font-sans text-xl md:text-2xl leading-snug pr-4">
                  <strong className="font-sans font-bold">{name}</strong> - {text}
                </p>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide id="adkar-awareness-desire-knowledge" label="PROSCI - ADKAR" title="ADKAR: Awareness, Desire, Knowledge">
        <PlateWell>
          <AdkarFirstThree active={activeAdkar13} onSelect={setActiveAdkar13} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              l: "A",
              name: "Awareness",
              points: [
                <>
                  Individuals must be aware of the need for change.
                </>,
                <>
                  This involves understanding why the change is necessary and what the{" "}
                  drivers behind it are.
                </>,
                <>
                  Effective communication is crucial at this stage to ensure that everyone understands
                  the reasons for the change.
                </>,
              ],
              ask: "Why is it important for employees to understand the reasons behind a change initiative?",
            },
            {
              l: "D",
              name: "Desire",
              points: [
                <>
                  Once individuals are aware of the change, they need to have the desire to support and{" "}
                  participate in it.
                </>,
                <>
                  This involves addressing any concerns or resistance and fostering a{" "}
                  positive attitude towards the change.
                </>,
                <>
                  Engaging stakeholders and addressing their motivations can help build this desire.
                </>,
              ],
              ask: "How can personal motivations and emotions influence an individual’s willingness to support change?",
            },
            {
              l: "K",
              name: "Knowledge",
              points: [
                <>
                  Individuals must have the knowledge of how to change.
                </>,
                <>
                  This includes understanding the new processes, systems, or{" "}
                  behaviors that will be implemented.
                </>,
                <>
                  Training and resources are essential to equip individuals with the
                  necessary skills and information.
                </>,
              ],
              ask: "What happens if employees understand the need for change but lack the necessary knowledge to implement it?",
            },
          ].map((e, i) => {
            const isLit = i === activeAdkar13;
            return (
              <div
                key={e.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Letter l={e.l} size="w-10 h-10 text-xl" />
                    <p className="font-sans font-bold text-2xl">
                      <span className="font-sans text-base mr-2">{i + 1}.</span>
                      {e.name}:
                    </p>
                  </div>
                  <Bullets items={e.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l md:border-[var(--dt-ink)]/15 md:pl-6">
                  <Ask>{e.ask}</Ask>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="adkar-ability-reinforcement"
        label="PROSCI - ADKAR"
        title="ADKAR: Ability, Reinforcement"
        exercise={exercise["adkar-ability-reinforcement"]}
      >
        <PlateWell>
          <AdkarLastTwo active={activeAdkar45} onSelect={setActiveAdkar45} />
        </PlateWell>
        <div className={`${BODY} md:!text-lg grid`}>
          {[
            {
              l: "A",
              n: 4,
              name: "Ability",
              points: [
                <>Having the knowledge is not enough</>,
                <>
                  individuals must also be able to implement the change.
                </>,
                <>
                  This involves practicing new skills, overcoming obstacles
                </>,
              ],
              ask: "Why is practical application of skills essential for successful change implementation?",
            },
            {
              l: "R",
              n: 5,
              name: "Reinforcement",
              points: [
                <>
                  Individuals need reinforcement to ensure that the change is maintained over time.
                </>,
                <>
                  This can include recognition, rewards, and{" "}
                  ongoing support to encourage continued adherence to the new ways of working.
                </>,
              ],
              ask: "What risks do organizations face if they fail to reinforce changes after implementation?",
            },
          ].map((e, i) => {
            const isLit = i === activeAdkar45;
            return (
              <div
                key={e.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 grid md:grid-cols-[auto_1.4fr_1fr] gap-x-8 gap-y-3 items-start pt-5 border-t border-[var(--dt-ink)]/15 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Letter l={e.l} size="w-16 h-16 text-5xl" />
                  <p className="font-sans font-bold text-2xl md:hidden">
                    {e.n}. {e.name}:
                  </p>
                </div>
                <div>
                  <p className="font-sans font-bold text-2xl mb-2 hidden md:block">
                    <span className="font-sans text-base mr-2">{e.n}.</span>
                    {e.name}:
                  </p>
                  <Bullets items={e.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l md:border-[var(--dt-ink)]/15 md:pl-6">
                  <Ask>{e.ask}</Ask>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 3: AGILE PROJECT MANAGEMENT
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Agile Project Management" />

      <Slide id="agile-project-management" title="Agile Project Management">
        <Row cols="lg:grid-cols-[1fr_1.2fr]">
          <p className="font-sans text-lg md:text-xl leading-[1.5] text-[var(--dt-ink)]">
            <span className={`${SUB} block mb-2`}>Question:</span>
            Why do traditional project management methods often struggle to adapt to rapidly changing requirements?
          </p>
          <PlateWell>
            <TwoPaths />
          </PlateWell>
        </Row>
        <Row cols="lg:grid-cols-[1fr_1.1fr]">
          <div className={`${BODY} text-lg lg:order-2`}>
            <Bullets
              className="gap-2"
              items={[
                <>
                  A flexible and iterative approach to managing projects
                </>,
                <>Particularly in software development</>,
                <>Applicable to various fields</>,
                <>
                  Emphasizes collaboration, customer feedback, and{" "}
                  small, rapid releases of products or features.
                </>,
                <>
                  Designed to accommodate change and deliver value to customers more{" "}
                  efficiently.
                </>,
              ]}
            />
          </div>
          <PlateWell>
            <SmallReleases />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="traditional-vs-agile-project-management"
        label="COMPARISON"
        title="Traditional vs. Agile Project Management"
        exercise={exercise["traditional-vs-agile-project-management"]}
      >
        <PlateWell>
          <TradVsAgileInteractive active={activeTradAgile} onSelect={setActiveTradAgile} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              n: 1,
              name: "Goal Setting",
              trad: [
                <>
                  Define a fixed target
                </>,
                <>
                  upfront
                </>,
                <>
                  Based on detailed planning.
                </>,
                <>
                  Assumes stability and clear end goals
                </>,
                <>Suitable for predictable environments</>,
              ],
              agile: [
                <>
                  Define a flexible vision
                </>,
                <>
                  serves as a guiding principle
                </>,
                <>
                  allowing adjustments based on changing circumstances and feedback.
                </>,
              ],
            },
            {
              n: 2,
              name: "Initial Steps",
              trad: [
                <>
                  Take aim with detailed plans and schedules before starting the project.
                </>,
                <>
                  The focus is on minimizing deviations from the original plan.
                </>,
              ],
              agile: [
                <>
                  Begin in a broad direction with minimal but sufficient planning.
                </>,
                <>
                  Adjustments are expected as the project progresses.
                </>,
              ],
            },
            {
              n: 3,
              name: "Execution",
              trad: [
                <>
                  Launch the project and manage it according to the established plan.
                </>,
                <>
                  Any changes to the plan require formal processes and approvals.
                </>,
              ],
              agile: [
                <>
                  Learn and adapt continuously by breaking the project into smaller,{" "}
                  manageable iterations.
                </>,
                <>
                  Feedback from stakeholders informs improvements after each iteration.
                </>,
              ],
            },
            {
              n: 4,
              name: "Focus",
              trad: [
                <>
                  Strictly focus on achieving the original target,
                </>,
                <>
                  Success measured by adherence to the initial plan, timeline, and budget.
                </>,
              ],
              agile: [
                <>
                  Evolve towards the target with iterative refinements.
                </>,
                <>
                  Success is measured by delivering value incrementally, even if the{" "}
                  end goal shifts over time.
                </>,
              ],
            },
          ].map((r, i) => {
            const isLit = i === activeTradAgile;
            return (
              <div
                key={r.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-2xl mb-4 flex items-baseline gap-3">
                  <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">{r.n}.</span>
                  <span>{r.name}:</span>
                </p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div className="border-t border-[var(--dt-ink)]/15 pt-3">
                    <p className="font-sans font-bold text-xl mb-2">Traditional:</p>
                    <Bullets items={r.trad} />
                  </div>
                  <div className="border-t border-[var(--dt-ink)]/15 pt-3">
                    <p className="font-sans font-bold text-xl mb-2">Agile:</p>
                    <Bullets items={r.agile} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 4: SCRUM
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Scrum" />

      <Slide id="scrum" title="Scrum">
        <p className="font-sans text-lg md:text-xl leading-[1.5] text-[var(--dt-ink)] max-w-4xl">
          <span className={`${SUB} block mb-2`}>Question:</span>
          What challenges might arise when managing complex projects with multiple stakeholders?
        </p>
        <Row cols="lg:grid-cols-[1fr_1.3fr]" className="!items-start">
          <div className={`${BODY} text-lg border-t border-[var(--dt-ink)]/15 pt-4`}>
            <Bullets
              className="gap-2"
              items={[
                <>Scrum is an Agile framework</>,
                <>
                  iterative and incremental development
                </>,
                <>
                  Particularly popular in software development
                </>,
                <>Can be applied to various fields</>,
              ]}
            />
          </div>
          <div className={`${BODY} border-t border-[var(--dt-ink)]/15 pt-4 flex flex-col gap-4`}>
            <Bullets
              items={[
                <>
                  The term &quot;Scrum&quot; originates from the game of rugby.
                </>,
                <>
                  In rugby, a &quot;scrum&quot; is a method of restarting play after a{" "}
                  minor infraction
                </>,
                <>
                  players from each team pack closely together with their heads down and attempt to{" "}
                  gain possession of the ball.
                </>,
              ]}
            />
            <PlateWell>
              <RugbyScrum />
            </PlateWell>
          </div>
        </Row>
      </Slide>

      <Slide id="scrum-from-rugby-to-software" title="Scrum: From Rugby to Software">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {[
            [
              <>
                The use of the term in the context of project management was popularized by Ken Schwaber and Jeff
                Sutherland,
              </>,
              <>Developed the Scrum framework in the early 1990s</>,
              <>
                They chose the name &quot;Scrum&quot; to reflect the importance of teamwork and{" "}
                collaboration in the development process
              </>,
              <>Similar to how players in a rugby scrum must work together to succeed.</>,
            ],
            [
              <>In their 1995 paper titled &quot;Scrum Development Process,&quot;</>,
              <>
                Schwaber and Sutherland drew parallels between the dynamics of a rugby scrum and the
                collaborative nature of Agile software development,
              </>,
              <>
                teams should be self-organizing
              </>,
              <>Iterative development, continuous feedback, and adaptability.</>,
            ],
          ].map((group, g) => (
            <ol key={g} className="flex flex-col border-t border-[var(--dt-ink)]/15 pt-2">
              {group.map((s, i) => (
                <li
                  key={i}
                  className="font-sans text-base md:text-lg leading-[1.55] text-[var(--ink-2)] py-2.5 border-t border-[var(--dt-ink)]/12 first:border-t-0 [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]"
                >
                  {s}
                </li>
              ))}
            </ol>
          ))}
        </div>
      </Slide>

      <Slide id="principles-of-scrum-1-to-3" label="PRINCIPLES OF SCRUM" title="Principles of Scrum: 1 to 3">
        <PlateWell>
          <ScrumPrinciples1To3 active={activeScrum13} onSelect={setActiveScrum13} />
        </PlateWell>
        <div className={`${BODY} grid`}>
          <div
            aria-hidden={activeScrum13 !== 0}
            className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
              activeScrum13 === 0 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-sans font-bold text-2xl mb-3 flex items-baseline gap-3">
              <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">1.</span>
              <span>Empirical Process Control:</span>
            </p>
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-x-10 gap-y-3 items-start">
              <div>
                <p className="font-sans font-bold">Definition:</p>
                <Bullets
                  items={[
                    <>
                      This principle is based on the idea that knowledge comes from experience
                    </>,
                    <>
                      decisions should be made based on what is known.
                    </>,
                  ]}
                />
                <p className="font-sans font-bold mt-3">Application in Scrum:</p>
                <Bullets
                  items={[
                    <>
                      Scrum relies on three key pillars:
                      <Bullets
                        className="mt-1"
                        items={[
                          <>
                            Transparency,
                          </>,
                          <>
                            Inspection,
                          </>,
                          <>
                            Adaptation.
                          </>,
                        ]}
                      />
                    </>,
                  ]}
                />
              </div>
              <Bullets
                className="gap-2"
                items={[
                  <>
                    Transparency ensures that all aspects of the process are visible
                    to those responsible for the outcome.
                  </>,
                  <>
                    Inspection involves regularly checking{" "}
                    progress and performance to identify any deviations from the
                    expected results.
                  </>,
                  <>
                    Adaptation means <strong>adjusting</strong> processes and plans based on the{" "}
                    insights gained from inspection.
                  </>,
                ]}
              />
            </div>
          </div>

          <div
            aria-hidden={activeScrum13 !== 1}
            className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
              activeScrum13 === 1 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-sans font-bold text-2xl mb-3 flex items-baseline gap-3">
              <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">2.</span>
              <span>Self-Organization:</span>
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="font-sans font-bold">Definition:</p>
                <Bullets
                  items={[
                    <>
                      Teams are empowered to organize their work{" "}
                      without being directed by outside authorities.
                    </>,
                  ]}
                />
              </div>
              <div>
                <p className="font-sans font-bold">Application in Scrum:</p>
                <Bullets
                  items={[
                    <>
                      Scrum teams are cross-functional and self-managing,
                    </>,
                    <>
                      They decide how to accomplish their work.
                    </>,
                    <>
                      This autonomy fosters creativity, accountability, and{" "}
                      a sense of ownership among team members,
                    </>,
                    <>
                      leading to higher motivation and better results.
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>

          <div
            aria-hidden={activeScrum13 !== 2}
            className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
              activeScrum13 === 2 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-sans font-bold text-2xl mb-3 flex items-baseline gap-3">
              <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">3.</span>
              <span>Collaboration:</span>
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="font-sans font-bold">Definition:</p>
                <Bullets
                  items={[
                    <>
                      Effective teamwork and communication are essential in Scrum.
                    </>,
                  ]}
                />
              </div>
              <div>
                <p className="font-sans font-bold">Application in Scrum:</p>
                <Bullets
                  items={[
                    <>Scrum promotes collaboration among team members, stakeholders, and customers.</>,
                    <>
                      Regular ceremonies,
                      <Bullets
                        className="mt-1"
                        items={[
                          <>
                            Daily Scrums,
                          </>,
                          <>
                            Sprint Reviews,
                          </>,
                          <>
                            Retrospectives,
                          </>,
                        ]}
                      />
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide
        id="principles-of-scrum-4-to-6"
        label="PRINCIPLES OF SCRUM"
        title="Principles of Scrum: 4 to 6"
        exercise={exercise["principles-of-scrum-4-to-6"]}
      >
        <PlateWell>
          <ScrumPrinciples4To6 active={activeScrum46} onSelect={setActiveScrum46} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              n: 4,
              name: "Value-Based Prioritization",
              def: (
                <>
                  Work should be prioritized based on the value it delivers to the customer and the
                  business.
                </>
              ),
              app: [
                <>
                  The Product Owner is responsible for managing the Product Backlog{" "}
                  and prioritizing items based on their value.
                </>,
                <>
                  Ensures that the team focuses on delivering the{" "}
                  most important features first, maximizing the return on investment and
                  ensuring that customer needs are met.
                </>,
              ],
            },
            {
              n: 5,
              name: "Time Boxing",
              def: (
                <>
                  Time boxing involves setting fixed time limits for activities to create a sense of{" "}
                  urgency and focus.
                </>
              ),
            },
            {
              n: 6,
              name: "Iterative Development",
              def: (
                <>
                  Development is carried out in small, incremental cycles, allowing
                  for regular feedback and adjustments.
                </>
              ),
            },
          ].map((p, i) => {
            const isLit = i === activeScrum46;
            return (
              <div
                key={p.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-2xl leading-tight mb-3 flex items-baseline gap-3">
                  <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums">{p.n}.</span>
                  <span>{p.name}</span>
                </p>
                <div className={`grid ${p.app ? "md:grid-cols-2" : "md:grid-cols-1"} gap-6 md:gap-10`}>
                  <div>
                    <p className="font-sans font-bold">Definition:</p>
                    <Bullets items={[p.def]} />
                  </div>
                  {p.app && (
                    <div>
                      <p className="font-sans font-bold">Application in Scrum:</p>
                      <Bullets items={p.app} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide id="scrum-methodology" title="Scrum Methodology">
        <PlateWell>
          <ScrumProcess />
        </PlateWell>
        <p className="font-sans text-base text-[var(--ink-3)]">
          Note. backlog refers to a prioritized list of work items or tasks that need to be completed for a project
        </p>
      </Slide>

      <Slide id="roles-in-scrum" label="1. ROLES IN SCRUM" title="Roles in Scrum" exercise={exercise["roles-in-scrum"]}>
        <p className="font-sans text-xl md:text-2xl leading-snug">
          Scrum defines three primary roles, each with specific responsibilities:
        </p>
        <PlateWell>
          <ScrumRolesHub active={activeScrumRole} onSelect={setActiveScrumRole} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              name: "Product Owner",
              points: [
                <>
                  Represents the stakeholders and the voice of the customer.
                </>,
                <>
                  Responsible for defining the product vision and managing the{" "}
                  product backlog.
                </>,
                <>
                  Ensures that the team understands the items in the backlog.
                </>,
              ],
            },
            {
              name: "Scrum Master",
              points: [
                <>
                  Acts as a facilitator and coach for the Scrum team.
                </>,
                <>
                  Removes impediments that may hinder the team&apos;s progress.
                </>,
                <>
                  Shields the team from external distractions and interruptions.
                </>,
              ],
            },
            {
              name: "Development Team",
              points: [
                <>
                  A cross-functional group of professionals who work collaboratively to deliver the
                  product increment.
                </>,
                <>
                  Typically consists of 3 to 9 members with various skills (e.g., developers,{" "}
                  testers, designers).
                </>,
                <>
                  Self-organizes to determine how to accomplish the work in the sprint.
                </>,
              ],
            },
          ].map((r, i) => {
            const isLit = i === activeScrumRole;
            return (
              <div
                key={r.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 flex flex-col gap-3 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-2xl">{r.name}:</p>
                <Bullets items={r.points} />
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="events-in-scrum-sprint-and-sprint-planning"
        label="2. EVENTS IN SCRUM"
        title="Events in Scrum: Sprint and Sprint Planning"
      >
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-5">
            <p className="font-sans text-lg leading-[1.5] text-[var(--dt-ink)] [&_strong]:font-semibold">
              <span className={`${SUB} block mb-2`}>Question:</span>
              How can regular events like daily meetings improve team collaboration and accountability?
            </p>
            <p className="font-sans font-semibold text-lg text-[var(--dt-ink)]">Events (ceremonies) that structure the workflow:</p>
          </div>
          <PlateWell>
            <ScrumProcess mode="events-first" active={activeScrumEvent1} onSelect={setActiveScrumEvent1} />
          </PlateWell>
        </div>
        <div className={`${BODY} grid`}>
          {[
            {
              name: "Sprint",
              items: [
                <>
                  A time-boxed iteration, usually lasting 1 to 4 weeks
                </>,
                <>
                  A potentially shippable product increment is created.
                </>,
                <>
                  Each sprint begins with a planning session and ends with a{" "}
                  review and retrospective.
                </>,
              ],
            },
            {
              name: "Sprint Planning",
              items: [
                <>
                  A meeting held at the beginning of each sprint where the team decides{" "}
                  what work will be done.
                </>,
                <>
                  The team selects items from the product backlog to include in the{" "}
                  sprint backlog based on priority and team capacity.
                </>,
                <>
                  The team defines the sprint goal, which is a clear objective for the sprint.
                </>,
              ],
            },
          ].map((ev, i) => {
            const isLit = i === activeScrumEvent1;
            return (
              <div
                key={ev.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-2xl mb-2">{ev.name}:</p>
                <Bullets items={ev.items} />
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="events-in-scrum-daily-scrum-review-retrospective"
        label="2. EVENTS IN SCRUM"
        title="Events in Scrum: Daily Scrum, Review, Retrospective"
        exercise={exercise["events-in-scrum-daily-scrum-review-retrospective"]}
      >
        <PlateWell>
          <ScrumProcess mode="events-second" active={activeScrumEvent2} onSelect={setActiveScrumEvent2} />
        </PlateWell>
        <div className={`${BODY} grid`}>
          <div
            aria-hidden={activeScrumEvent2 !== 0}
            className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
              activeScrumEvent2 === 0 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-sans font-bold text-2xl mb-2">Daily Scrum (Stand-up):</p>
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-start">
              <div>
                <Bullets
                  items={[
                    <>
                      A short, time-boxed meeting (usually 15 minutes) held
                      every day during the sprint.
                    </>,
                    <>Team members answer three questions:</>,
                    <>
                      The purpose is to synchronize activities and identify any{" "}
                      impediments.
                    </>,
                  ]}
                />
              </div>
              <ol className="flex flex-col gap-1 bg-[var(--paper-2)] p-4">
                {["What did I do yesterday?", "What will I do today?", "What obstacles are in my way?"].map((q) => (
                  <li key={q} className="font-sans font-bold text-lg">
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            aria-hidden={activeScrumEvent2 !== 1}
            className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
              activeScrumEvent2 === 1 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-sans font-bold text-2xl mb-2">Sprint Review:</p>
            <Bullets
              items={[
                <>
                  A meeting held at the end of the sprint to demonstrate the{" "}
                  completed work to stakeholders.
                </>,
                <>
                  The team presents the product increment and gathers feedback.
                </>,
                <>
                  The product backlog may be adjusted based on feedback received.
                </>,
              ]}
            />
          </div>

          <div
            aria-hidden={activeScrumEvent2 !== 2}
            className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
              activeScrumEvent2 === 2 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-sans font-bold text-2xl mb-2">Sprint Retrospective:</p>
            <Bullets
              items={[
                <>
                  A meeting held after the sprint review to reflect on the sprint process.
                </>,
                <>
                  The team discusses
                  <Bullets
                    className="mt-1"
                    items={[
                      <>
                        what went well,
                      </>,
                      <>
                        what could be improved,
                      </>,
                      <>
                        how to implement changes in the next sprint.
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </div>
        </div>
      </Slide>

      <Slide
        id="artifacts-in-scrum"
        label="3. ARTIFACTS IN SCRUM"
        title="Artifacts in Scrum"
        exercise={exercise["artifacts-in-scrum"]}
      >
        <p className="font-sans text-xl md:text-2xl leading-snug">
          Scrum uses specific artifacts to manage work and provide transparency:
        </p>
        <PlateWell>
          <ScrumProcess mode="artifacts" active={activeScrumArtifact} onSelect={setActiveScrumArtifact} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              name: "Product Backlog",
              items: [
                <>
                  An ordered list of all desired work on the project,
                  <span className="block mt-1 font-sans text-[var(--ink-3)]">
                    features, enhancements, bug fixes, technical tasks.
                  </span>
                </>,
                <>
                  The product owner is responsible for maintaining and prioritizing the backlog.
                </>,
              ],
            },
            {
              name: "Sprint Backlog",
              items: [
                <>
                  A subset of the product backlog items selected for the current sprint,
                </>,
                <>
                  The development team is responsible for managing the sprint backlog.
                </>,
              ],
            },
            {
              name: "Increment",
              items: [
                <>
                  The sum of all completed product backlog items at the end of a sprint.
                </>,
                <>
                  The increment must meet the team&apos;s definition of &quot;done,&quot;{" "}
                  which includes quality criteria and acceptance criteria.
                </>,
              ],
            },
          ].map((ar, i) => {
            const isLit = i === activeScrumArtifact;
            return (
              <div
                key={ar.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-sans font-bold text-2xl mb-2">{ar.name}:</p>
                <Bullets items={ar.items} />
              </div>
            );
          })}
        </div>
      </Slide>

      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "Kotter's 8 Step Change Management",
          "The Case of Microsoft and Essay #2 - Analyzing Change Management through Kotter's 8-Step Model",
          "Prosci - ADKAR Change Management Model",
          "Traditional vs. Agile Project Management",
          "Scrum principles, methodology, events, and artifacts",
        ]}
      />
    </main>
  );
}
