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
import { Conversation } from "../_visuals/objects";
import {
  HeroStairs,
  DiscToStream,
  FourTypes,
  NetflixTimeline,
  NETFLIX_YEARS,
  NetflixConsiderations,
  NetflixConsiderationsTall,
  AlignedChange,
  KotterStairs,
  KotterSteps1To4,
  KotterSteps1To4Tall,
  KotterSteps5To8,
  KotterSteps5To8Tall,
  BoxToCloud,
  MicrosoftKotter1To4,
  MicrosoftKotter5To8,
  AdkarOverview,
  AdkarOverviewTall,
  AdkarFirstThree,
  AdkarFirstThreeTall,
  AdkarLastTwo,
  AdkarLastTwoTall,
  SmallReleases,
  TwoPaths,
  TradVsAgileInteractive,
  TradVsAgileTall,
  RugbyScrum,
  ScrumPrinciples1To3,
  ScrumPrinciples1To3Tall,
  ScrumPrinciples4To6,
  ScrumPrinciples4To6Tall,
  ScrumProcess,
  ScrumRolesHub,
  ScrumRolesHubTall,
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

/* Body copy: the reading serif; terms set bold in the display serif. */
const BODY = "font-body text-base md:text-[1.06rem] leading-[1.6] [&_strong]:font-heading [&_strong]:font-bold";
const LIST =
  "list-none flex flex-col gap-1 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rotate-45 [&>li]:before:shrink-0 [&>li]:before:bg-[var(--dt-ink)]";
const SUB = "font-accent font-bold uppercase tracking-[0.2em] text-[0.68rem]";

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
    <p className="mt-3 pt-3 border-t border-[var(--rule-2)] font-heading italic leading-snug [&_strong]:font-bold">
      <span className={`${SUB} not-italic block mb-1`}>Question:</span> {children}
    </p>
  );
}

/* An ADKAR letter on its ink block. */
function Letter({ l, size = "w-12 h-12 text-3xl" }: { l: string; size?: string }) {
  return (
    <span
      aria-hidden
      className={`${size} shrink-0 inline-flex items-center justify-center bg-[var(--dt-ink)] text-[var(--dt-cream)] font-heading font-bold`}
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
        category="WEEK 03 — DIGITAL TRANSFORMATION"
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
          CHAPTER 1 — THE CASE OF NETFLIX
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="The Case of Netflix" />

      <Slide
        id="how-netflix-transformed-the-movie-industry"
        label="CASE STUDY"
        title="How Netflix Transformed The Movie Industry"
      >
        <p className="font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug max-w-4xl">
          <strong>Prescriptive</strong> Analytics for Strategic Decision-Making in Business
        </p>
        <Row cols="lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Kicker>Question:</Kicker>
            <ol className="mt-3">
              {[
                <>
                  What is <strong>Prescriptive</strong> Analytics?
                </>,
                <>What other types of analytics do we have?</>,
              ].map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 py-4 border-t-[3px] border-[var(--dt-ink)] first:border-t-0 font-heading font-bold text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.25]"
                >
                  <span className="text-3xl leading-none w-6 shrink-0">{i + 1}</span>
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
        <ol className={`${BODY} grid`}>
          {[
            {
              name: "Descriptive",
              q: "What happened?",
              def: (
                <>
                  <strong>Descriptive analytics</strong> is the process of summarizing <em>historical data</em> to
                  understand <strong>what has happened</strong> in the past.
                </>
              ),
            },
            {
              name: "Diagnostic",
              q: "Why did this happen?",
              def: (
                <>
                  <strong>Diagnostic analytics</strong> is the process of examining data to uncover the{" "}
                  <em>root causes</em> and <strong>why an outcome happened</strong>.
                </>
              ),
            },
            {
              name: "Prescriptive",
              q: "What should we do next?",
              def: (
                <>
                  <strong>Prescriptive analytics</strong> is the process of using data to determine an{" "}
                  <em>optimal course of action</em>, yielding <strong>recommendations</strong> for next steps.
                </>
              ),
            },
            {
              name: "Predictive",
              q: "What might happen in the future?",
              def: (
                <>
                  <strong>Predictive analytics</strong> is the process of using{" "}
                  <em>historical data and statistical models</em> to <strong>forecast</strong> what might happen in the
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
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading text-2xl md:text-3xl leading-snug flex items-baseline gap-3">
                  <span className="font-heading font-bold">{i + 1}.</span>
                  <span>
                    <strong>{item.name}</strong>: {item.q}
                  </span>
                </p>
                <div className="border-t-[2px] border-[var(--dt-ink)] pt-4 grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-2 items-baseline">
                  <p className="font-heading font-bold text-xl">{item.name} Analytics</p>
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
        <ol className={`${BODY} grid`}>
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
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading text-2xl md:text-3xl leading-snug flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-heading font-bold">{NETFLIX_YEARS[i]}:</span>{" "}
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
          <div className="hidden sm:block">
            <NetflixConsiderations active={activeChallenge} onSelect={setActiveChallenge} />
          </div>
          <div className="sm:hidden">
            <NetflixConsiderationsTall active={activeChallenge} onSelect={setActiveChallenge} />
          </div>
        </PlateWell>
        <div className={`${BODY} !text-lg md:!text-xl grid`}>
          {[
            {
              name: "Technology",
              items: [
                <>
                  <strong>Cloud infrastructure</strong> to support demand
                </>,
                <>
                  <strong>Video encoding</strong> technology (high fidelity yet lightweight)
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
                  <strong>Competition</strong> and <strong>Piracy</strong>
                </>,
                <>
                  Consumer <strong>engagement</strong> and <strong>loyalty</strong>
                </>,
              ],
            },
          ].map((group, i) => {
            const isLit = i === activeChallenge;
            return (
              <div
                key={group.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl md:text-3xl mb-3">{group.name}</p>
                <Bullets items={group.items} />
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 2 — CHANGE MANAGEMENT
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Change Management" />

      <DiscussionList
        questions={[
          "What challenges do organizations face when undergoing major changes?",
          "Why do employees often resist change?",
          "What strategies might help ensure smooth transitions during change?",
          "How can leaders align people and processes during transformation?",
        ]}
        plate={<Conversation />}
      />

      <Slide id="change-management" label="DEFINITION" title="Change Management">
        <p className="font-heading text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.3] max-w-5xl [&_strong]:font-bold">
          Change management ensures that organizations smoothly transition to digital transformation by aligning{" "}
          <strong>people</strong>, <strong>processes</strong>, and <strong>technology</strong>.
        </p>
        <PlateWell>
          <AlignedChange />
        </PlateWell>
      </Slide>

      <Slide id="kotters-8-step-change-management" label="FRAMEWORK" title="Kotter's 8 Step Change Management">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 md:gap-10`}>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            Kotter&apos;s 8-Step Change Management Model is a framework developed by Dr. John Kotter, a professor at
            Harvard Business School, to help organizations implement <strong>successful change initiatives</strong>.
          </p>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            The model outlines a <strong>step-by-step</strong> process for leading change and is widely used in various
            industries.
          </p>
        </div>
        <PlateWell>
          <KotterStairs />
        </PlateWell>
      </Slide>

      <Slide id="the-eight-steps-1-to-4" label="KOTTER'S 8 STEPS" title="The Eight Steps: 1 to 4">
        <PlateWell>
          <div className="hidden sm:block">
            <KotterSteps1To4 active={activeKotter14} onSelect={setActiveKotter14} />
          </div>
          <div className="sm:hidden">
            <KotterSteps1To4Tall active={activeKotter14} onSelect={setActiveKotter14} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              n: 1,
              name: "Create a Sense of Urgency",
              points: [
                <>
                  Highlight the <strong>importance of change</strong> and the potential{" "}
                  <strong>risks of not changing</strong>.
                </>,
                <>
                  This step involves <strong>communicating</strong> the need for change to <strong>motivate</strong>{" "}
                  stakeholders and create a sense of urgency.
                </>,
              ],
              ask: (
                <>
                  How can leaders effectively create urgency without causing <strong>panic</strong> or{" "}
                  <strong>resistance</strong>?
                </>
              ),
            },
            {
              n: 2,
              name: "Build a Guiding Coalition",
              points: [
                <>
                  Form a group of <strong>influential people</strong> within the organization who can lead the change
                  effort.
                </>,
                <>
                  This coalition should have the <strong>authority</strong>, <strong>expertise</strong>, and{" "}
                  <strong>credibility</strong> to drive the change process.
                </>,
              ],
              ask: <>What qualities should leaders look for when forming a guiding coalition?</>,
            },
            {
              n: 3,
              name: "Form a Strategic Vision and Initiatives",
              points: [
                <>
                  Develop a clear <strong>vision</strong> for the future and outline the <strong>initiatives</strong>{" "}
                  that will help achieve that vision.
                </>,
                <>
                  This step involves <strong>articulating</strong> the <strong>desired outcomes</strong> and how the
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
                  Share the vision and strategy with <strong>all stakeholders</strong>.
                </>,
                <>
                  Effective communication is crucial to ensure that <em>everyone</em> <strong>understands</strong> the
                  change and is <strong>aligned</strong> with the vision.
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
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <p className="font-heading font-bold text-2xl leading-tight mb-3 flex items-baseline gap-3">
                    <span className="font-heading text-3xl leading-none">{s.n}.</span>
                    <span>{s.name}:</span>
                  </p>
                  <Bullets items={s.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l-[3px] md:border-[var(--dt-ink)] md:pl-6">
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
          <div className="hidden sm:block">
            <KotterSteps5To8 active={activeKotter58} onSelect={setActiveKotter58} />
          </div>
          <div className="sm:hidden">
            <KotterSteps5To8Tall active={activeKotter58} onSelect={setActiveKotter58} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              n: 5,
              name: "Empower Broad-Based Action",
              points: [
                <>
                  Remove <strong>obstacles</strong> that may <em>hinder change</em> and empower employees to take{" "}
                  <strong>action</strong>.
                </>,
                <>
                  This may involve providing <strong>training</strong>, <strong>resources</strong>, and{" "}
                  <strong>support</strong> to help individuals contribute to the change effort.
                </>,
              ],
              ask: "What challenges might organizations face when empowering employees to act on the change vision?",
            },
            {
              n: 6,
              name: "Generate Short-Term Wins",
              points: [
                <>
                  Create and celebrate short-term successes to build <strong>momentum</strong> and{" "}
                  <strong>demonstrate</strong> the <em>benefits</em> of the change.
                </>,
                <>
                  <strong>Recognizing</strong> and <strong>rewarding</strong> achievements can help maintain motivation
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
                  Use the <strong>credibility</strong> gained from <em>short-term wins</em> to tackle{" "}
                  <strong>larger</strong> change initiatives.
                </>,
                <>
                  This step involves <strong>reinforcing</strong> the <em>change</em> and ensuring that it becomes part
                  of the organizational <strong>culture</strong>.
                </>,
              ],
              ask: "How can organizations avoid complacency after achieving initial success in change initiatives?",
            },
            {
              n: 8,
              name: "Anchor New Approaches in the Culture",
              points: [
                <>
                  Ensure that the changes are <em>integrated</em> into the organization&apos;s <strong>culture</strong>{" "}
                  and <strong>practices</strong>.
                </>,
                <>
                  This involves reinforcing the new behaviors and values through <strong>policies</strong>,{" "}
                  <strong>procedures</strong>, and <strong>ongoing communication</strong>.
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
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <p className="font-heading font-bold text-2xl leading-tight mb-3 flex items-baseline gap-3">
                    <span className="font-heading text-3xl leading-none">{s.n}.</span>
                    <span>{s.name}:</span>
                  </p>
                  <Bullets items={s.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l-[3px] md:border-[var(--dt-ink)] md:pl-6">
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
                He sought to shift the company&apos;s <strong>culture</strong>
              </>,
              <>
                Focus towards <strong>cloud computing</strong>
              </>,
            ].map((s, i) => (
              <li
                key={i}
                className="font-heading text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.35] py-3 border-t-[3px] border-[var(--dt-ink)] first:border-t-0 first:pt-0"
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
          <div className={`${BODY} !text-lg grid`}>
            {[
              {
                n: 1,
                name: "Create a Sense of Urgency",
                items: [
                  <>
                    Nadella&apos;s emphasis on adapting to a <strong>rapidly changing</strong> technology landscape
                  </>,
                  <>
                    the rise of <strong>cloud computing</strong> and <strong>mobile</strong> technology
                  </>,
                  <>
                    He communicated the urgency of evolving from a <strong>traditional software</strong> company to a{" "}
                    <strong>cloud-first</strong>, <strong>mobile-first</strong> organization.
                  </>,
                ],
              },
              {
                n: 2,
                name: "Build a Guiding Coalition",
                items: [
                  <>
                    Nadella built a strong leadership team that included <strong>executives</strong> from{" "}
                    <em>various divisions</em>.
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
                    Introduced initiatives like <strong>Microsoft Azure</strong> and <strong>Office 365</strong> to
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
                    He encouraged <strong>open dialogue</strong> and <strong>feedback</strong>, fostering a{" "}
                    <em>culture of transparency</em>.
                  </>,
                ],
              },
            ].map((s, i) => {
              const isLit = i === activeMs14;
              return (
                <div
                  key={s.n}
                  aria-hidden={!isLit}
                  className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-5 transition-opacity duration-200 ${
                    isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                  }`}
                >
                  <p className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-4 flex items-baseline gap-3">
                    <span className="font-heading text-3xl md:text-4xl leading-none">{s.n}.</span>
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
                    Nadella encouraged employees to <strong>take risks</strong> and <strong>innovate</strong>.
                  </>,
                  <>
                    He removed <strong>bureaucratic obstacles</strong> and promoted a <strong>growth mindset</strong>,
                    allowing teams to experiment and <em>learn from failures</em>.
                  </>,
                ],
              },
              {
                n: 6,
                name: "Generate Short-Term Wins",
                items: [
                  <>
                    Microsoft saw <em>significant early successes</em> with the adoption of Azure and the growth of
                    Office 365.
                  </>,
                  <>
                    These wins were <strong>celebrated</strong> and <strong>communicated</strong> throughout the
                    organization.
                  </>,
                ],
              },
              {
                n: 7,
                name: "Consolidate Gains and Produce More Change",
                items: [
                  <>
                    Building on the initial successes, Microsoft continued to <strong>invest</strong> in cloud
                    technology and expand its <strong>product offerings</strong>.
                  </>,
                  <>
                    Nadella’s leadership helped to <strong>solidify</strong> the company’s position in the{" "}
                    <em>cloud market</em>.
                  </>,
                ],
              },
              {
                n: 8,
                name: "Anchor New Approaches in the Culture",
                items: [
                  <>
                    Nadella worked to embed a culture of <strong>collaboration</strong>, <strong>inclusivity</strong>,
                    and <strong>continuous learning</strong> within Microsoft.
                  </>,
                  <>
                    He emphasized values such as <strong>empathy</strong> and <strong>teamwork</strong>
                  </>,
                  <>
                    Ensuring that the new approaches became part of the <strong>organizational culture</strong>.
                  </>,
                ],
              },
            ].map((s, i) => {
              const isLit = i === activeMs58;
              return (
                <div
                  key={s.n}
                  aria-hidden={!isLit}
                  className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-5 transition-opacity duration-200 ${
                    isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                  }`}
                >
                  <p className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-4 flex items-baseline gap-3">
                    <span className="font-heading text-3xl md:text-4xl leading-none">{s.n}.</span>
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
                The <strong>Prosci ADKAR Model</strong> is a widely recognized framework for change management
              </>,
              <>Developed by Prosci, a research and training organization focused on change management practices.</>,
            ]}
          />
          <Bullets
            className="gap-2"
            items={[
              <>
                The model is designed to help organizations <strong>manage change effectively</strong> by focusing on
                the <strong>individual aspects of change</strong>.
              </>,
              <>
                ADKAR is an <em>acronym</em> that stands for the <em>five key outcomes</em> that{" "}
                <strong>individuals</strong> need to achieve for successful change.
              </>,
            ]}
          />
        </div>
        <PlateWell>
          <div className="hidden sm:block">
            <AdkarOverview active={activeAdkarOverview} onSelect={setActiveAdkarOverview} />
          </div>
          <div className="sm:hidden">
            <AdkarOverviewTall active={activeAdkarOverview} onSelect={setActiveAdkarOverview} />
          </div>
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
                className={`col-start-1 row-start-1 flex items-center gap-4 border-[3px] border-[var(--dt-ink)] transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <Letter l={l} size="w-14 h-14 text-4xl" />
                <p className="font-body text-xl md:text-2xl leading-snug pr-4">
                  <strong className="font-heading font-bold">{name}</strong> – {text}
                </p>
              </li>
            );
          })}
        </ol>
      </Slide>

      <Slide id="adkar-awareness-desire-knowledge" label="PROSCI - ADKAR" title="ADKAR: Awareness, Desire, Knowledge">
        <PlateWell>
          <div className="hidden sm:block">
            <AdkarFirstThree active={activeAdkar13} onSelect={setActiveAdkar13} />
          </div>
          <div className="sm:hidden">
            <AdkarFirstThreeTall active={activeAdkar13} onSelect={setActiveAdkar13} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              l: "A",
              name: "Awareness",
              points: [
                <>
                  Individuals must be aware of the <strong>need for change</strong>.
                </>,
                <>
                  This involves understanding <em>why the change is necessary</em> and what the{" "}
                  <em>drivers behind it</em> are.
                </>,
                <>
                  <strong>Effective communication</strong> is crucial at this stage to ensure that everyone understands
                  the <em>reasons for the change</em>.
                </>,
              ],
              ask: "Why is it important for employees to understand the reasons behind a change initiative?",
            },
            {
              l: "D",
              name: "Desire",
              points: [
                <>
                  Once individuals are aware of the change, they need to have the desire to <strong>support</strong> and{" "}
                  <strong>participate</strong> in it.
                </>,
                <>
                  This involves addressing any <strong>concerns</strong> or <strong>resistance</strong> and fostering a{" "}
                  <strong>positive attitude</strong> towards the change.
                </>,
                <>
                  Engaging <strong>stakeholders</strong> and addressing their motivations can help build this desire.
                </>,
              ],
              ask: "How can personal motivations and emotions influence an individual’s willingness to support change?",
            },
            {
              l: "K",
              name: "Knowledge",
              points: [
                <>
                  Individuals must have the knowledge of <strong>how to change</strong>.
                </>,
                <>
                  This includes <strong>understanding</strong> the <em>new processes</em>, <em>systems</em>, or{" "}
                  <em>behaviors</em> that will be implemented.
                </>,
                <>
                  <strong>Training</strong> and <strong>resources</strong> are essential to equip individuals with the
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
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Letter l={e.l} size="w-14 h-14 text-4xl" />
                    <p className="font-heading font-bold text-2xl">
                      <span className="font-accent text-base mr-2">{i + 1}.</span>
                      {e.name}:
                    </p>
                  </div>
                  <Bullets items={e.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l-[3px] md:border-[var(--dt-ink)] md:pl-6">
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
          <div className="hidden sm:block">
            <AdkarLastTwo active={activeAdkar45} onSelect={setActiveAdkar45} />
          </div>
          <div className="sm:hidden">
            <AdkarLastTwoTall active={activeAdkar45} onSelect={setActiveAdkar45} />
          </div>
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
                  individuals must also be able to <strong>implement</strong> the change.
                </>,
                <>
                  This involves practicing <strong>new skills</strong>, <strong>overcoming obstacles</strong>
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
                  Individuals need reinforcement to ensure that the change is <strong>maintained over time</strong>.
                </>,
                <>
                  This can include <strong>recognition</strong>, <strong>rewards</strong>, and{" "}
                  <strong>ongoing support</strong> to encourage continued adherence to the new ways of working.
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
                className={`col-start-1 row-start-1 grid md:grid-cols-[auto_1.4fr_1fr] gap-x-8 gap-y-3 items-start pt-5 border-t-[4px] border-[var(--dt-ink)] transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Letter l={e.l} size="w-16 h-16 text-5xl" />
                  <p className="font-heading font-bold text-2xl md:hidden">
                    {e.n}. {e.name}:
                  </p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl mb-2 hidden md:block">
                    <span className="font-accent text-base mr-2">{e.n}.</span>
                    {e.name}:
                  </p>
                  <Bullets items={e.points} />
                </div>
                <div className="[&>p]:mt-0 [&>p]:pt-0 [&>p]:border-t-0 md:border-l-[3px] md:border-[var(--dt-ink)] md:pl-6">
                  <Ask>{e.ask}</Ask>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 3 — AGILE PROJECT MANAGEMENT
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Agile Project Management" />

      <Slide id="agile-project-management" label="QUESTION" title="Agile Project Management">
        <Row cols="lg:grid-cols-[1fr_1.2fr]">
          <p className="font-heading italic text-[clamp(1.3rem,2.2vw,1.8rem)] leading-snug">
            <span className={`${SUB} not-italic block mb-2`}>Question:</span>
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
                  A flexible and iterative approach to <strong>managing projects</strong>
                </>,
                <>Particularly in software development</>,
                <>Applicable to various fields</>,
                <>
                  Emphasizes <strong>collaboration</strong>, <strong>customer feedback</strong>, and{" "}
                  <strong>small, rapid releases of products or features</strong>.
                </>,
                <>
                  Designed to <strong>accommodate change</strong> and <strong>deliver value</strong> to customers more{" "}
                  <em>efficiently</em>.
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
          <div className="hidden sm:block">
            <TradVsAgileInteractive active={activeTradAgile} onSelect={setActiveTradAgile} />
          </div>
          <div className="sm:hidden">
            <TradVsAgileTall active={activeTradAgile} onSelect={setActiveTradAgile} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              n: 1,
              name: "Goal Setting",
              trad: [
                <>
                  Define a <strong>fixed target</strong>
                </>,
                <>
                  <strong>upfront</strong>
                </>,
                <>
                  Based on <strong>detailed planning</strong>.
                </>,
                <>
                  Assumes <strong>stability</strong> and <strong>clear end goals</strong>
                </>,
                <>Suitable for predictable environments</>,
              ],
              agile: [
                <>
                  Define a <strong>flexible</strong> vision
                </>,
                <>
                  serves as a <strong>guiding principle</strong>
                </>,
                <>
                  allowing <strong>adjustments</strong> based on <em>changing circumstances and feedback</em>.
                </>,
              ],
            },
            {
              n: 2,
              name: "Initial Steps",
              trad: [
                <>
                  <em>Take aim</em> with detailed plans and schedules <strong>before starting</strong> the project.
                </>,
                <>
                  The focus is on <strong>minimizing deviations</strong> from the original plan.
                </>,
              ],
              agile: [
                <>
                  Begin in a <strong>broad direction</strong> with <em>minimal</em> but sufficient planning.
                </>,
                <>
                  <strong>Adjustments</strong> are expected as the project progresses.
                </>,
              ],
            },
            {
              n: 3,
              name: "Execution",
              trad: [
                <>
                  Launch the project and manage it according to the <strong>established plan</strong>.
                </>,
                <>
                  Any <strong>changes</strong> to the plan require <strong>formal processes and approvals</strong>.
                </>,
              ],
              agile: [
                <>
                  Learn and <strong>adapt continuously</strong> by breaking the project into <em>smaller</em>,{" "}
                  <em>manageable iterations</em>.
                </>,
                <>
                  <strong>Feedback from stakeholders</strong> informs <em>improvements after each iteration</em>.
                </>,
              ],
            },
            {
              n: 4,
              name: "Focus",
              trad: [
                <>
                  Strictly focus on achieving the <strong>original target</strong>,
                </>,
                <>
                  Success measured by adherence to the <strong>initial plan, timeline, and budget</strong>.
                </>,
              ],
              agile: [
                <>
                  Evolve towards the target with <strong>iterative refinements</strong>.
                </>,
                <>
                  Success is measured by <strong>delivering value incrementally</strong>, even if the{" "}
                  <em>end goal shifts</em> over time.
                </>,
              ],
            },
          ].map((r, i) => {
            const isLit = i === activeTradAgile;
            return (
              <div
                key={r.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl mb-4 flex items-baseline gap-3">
                  <span className="font-heading text-3xl leading-none">{r.n}.</span>
                  <span>{r.name}:</span>
                </p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div className="border-t-[2px] border-[var(--dt-ink)] pt-3">
                    <p className="font-heading font-bold text-xl mb-2">Traditional:</p>
                    <Bullets items={r.trad} />
                  </div>
                  <div className="border-t-[2px] border-[var(--dt-ink)] pt-3">
                    <p className="font-heading font-bold text-xl mb-2">Agile:</p>
                    <Bullets items={r.agile} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 4 — SCRUM
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Scrum" />

      <Slide id="scrum" label="AGILE FRAMEWORK" title="Scrum">
        <p className="font-heading italic text-[clamp(1.2rem,2vw,1.6rem)] leading-snug max-w-5xl">
          <span className={`${SUB} not-italic block mb-2`}>Question:</span>
          What challenges might arise when managing complex projects with multiple stakeholders?
        </p>
        <Row cols="lg:grid-cols-[1fr_1.3fr]" className="!items-start">
          <div className={`${BODY} text-lg border-t-[4px] border-[var(--dt-ink)] pt-4`}>
            <Bullets
              className="gap-2"
              items={[
                <>Scrum is an Agile framework</>,
                <>
                  <strong>iterative and incremental development</strong>
                </>,
                <>
                  Particularly popular in <em>software development</em>
                </>,
                <>Can be applied to various fields</>,
              ]}
            />
          </div>
          <div className={`${BODY} border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-4`}>
            <Bullets
              items={[
                <>
                  The term &quot;Scrum&quot; originates from the game of <strong>rugby</strong>.
                </>,
                <>
                  In rugby, a &quot;scrum&quot; is a method of <strong>restarting play</strong> after a{" "}
                  <em>minor infraction</em>
                </>,
                <>
                  players from each team pack <em>closely together</em> with their heads down and attempt to{" "}
                  <strong>gain possession</strong> of the ball.
                </>,
              ]}
            />
            <PlateWell>
              <RugbyScrum />
            </PlateWell>
          </div>
        </Row>
      </Slide>

      <Slide id="scrum-from-rugby-to-software">
        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start">
          <div>
            <Kicker>SCRUM</Kicker>
            <h3 className="font-heading font-bold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] mt-3 max-w-[12ch]">
              Scrum: From Rugby to Software
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            {[
              [
                <>
                  The use of the term in the context of project management was popularized by Ken Schwaber and Jeff
                  Sutherland,
                </>,
                <>Developed the Scrum framework in the early 1990s</>,
                <>
                  They chose the name &quot;Scrum&quot; to reflect the importance of <strong>teamwork</strong> and{" "}
                  <strong>collaboration</strong> in the development process
                </>,
                <>Similar to how players in a rugby scrum must work together to succeed.</>,
              ],
              [
                <>In their 1995 paper titled &quot;Scrum Development Process,&quot;</>,
                <>
                  Schwaber and Sutherland drew parallels between the dynamics of a <strong>rugby scrum</strong> and the
                  collaborative nature of <strong>Agile software development</strong>,
                </>,
                <>
                  teams should be <strong className="text-[var(--dt-signal)]">self-organizing</strong>
                </>,
                <>Iterative development, continuous feedback, and adaptability.</>,
              ],
            ].map((group, g) => (
              <ol key={g} className="flex flex-col border-t-[5px] border-[var(--dt-ink)] pt-2">
                {group.map((s, i) => (
                  <li
                    key={i}
                    className="font-heading text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.35] py-2 border-t border-[var(--rule-2)] first:border-t-0 [&_strong]:font-bold"
                  >
                    {s}
                  </li>
                ))}
              </ol>
            ))}
          </div>
        </div>
      </Slide>

      <Slide id="principles-of-scrum-1-to-3" label="PRINCIPLES OF SCRUM" title="Principles of Scrum: 1 to 3">
        <PlateWell>
          <div className="hidden sm:block">
            <ScrumPrinciples1To3 active={activeScrum13} onSelect={setActiveScrum13} />
          </div>
          <div className="sm:hidden">
            <ScrumPrinciples1To3Tall active={activeScrum13} onSelect={setActiveScrum13} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          <div
            aria-hidden={activeScrum13 !== 0}
            className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
              activeScrum13 === 0 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-heading font-bold text-2xl mb-3 flex items-baseline gap-3">
              <span className="font-heading text-3xl leading-none">1.</span>
              <span>Empirical Process Control:</span>
            </p>
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-x-10 gap-y-3 items-start">
              <div>
                <p className="font-heading font-bold">Definition:</p>
                <Bullets
                  items={[
                    <>
                      This principle is based on the idea that <strong>knowledge comes from experience</strong>
                    </>,
                    <>
                      decisions should be made based on <strong>what is known</strong>.
                    </>,
                  ]}
                />
                <p className="font-heading font-bold mt-3">Application in Scrum:</p>
                <Bullets
                  items={[
                    <>
                      Scrum relies on three key pillars:
                      <Bullets
                        className="mt-1"
                        items={[
                          <>
                            <strong>Transparency</strong>,
                          </>,
                          <>
                            <strong>Inspection</strong>,
                          </>,
                          <>
                            <strong>Adaptation</strong>.
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
                    <strong>Transparency</strong> ensures that <strong>all aspects</strong> of the process are visible
                    to <em>those responsible for the outcome</em>.
                  </>,
                  <>
                    <strong>Inspection</strong> involves <strong>regularly</strong> checking{" "}
                    <strong>progress and performance</strong> to identify any <strong>deviations</strong> from the
                    expected results.
                  </>,
                  <>
                    <strong>Adaptation</strong> means <strong>adjusting</strong> processes and plans based on the{" "}
                    <strong>insights gained from inspection</strong>.
                  </>,
                ]}
              />
            </div>
          </div>

          <div
            aria-hidden={activeScrum13 !== 1}
            className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
              activeScrum13 === 1 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-heading font-bold text-2xl mb-3 flex items-baseline gap-3">
              <span className="font-heading text-3xl leading-none">2.</span>
              <span>Self-Organization:</span>
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="font-heading font-bold">Definition:</p>
                <Bullets
                  items={[
                    <>
                      Teams are empowered to <strong>organize</strong> their work{" "}
                      <strong>without being directed</strong> by outside authorities.
                    </>,
                  ]}
                />
              </div>
              <div>
                <p className="font-heading font-bold">Application in Scrum:</p>
                <Bullets
                  items={[
                    <>
                      Scrum teams are <strong>cross-functional</strong> and <strong>self-managing</strong>,
                    </>,
                    <>
                      They decide <strong>how</strong> to accomplish their work.
                    </>,
                    <>
                      This autonomy fosters <strong>creativity</strong>, <strong>accountability</strong>, and{" "}
                      <strong>a sense of ownership</strong> among team members,
                    </>,
                    <>
                      leading to higher <strong>motivation</strong> and better <strong>results</strong>.
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>

          <div
            aria-hidden={activeScrum13 !== 2}
            className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
              activeScrum13 === 2 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-heading font-bold text-2xl mb-3 flex items-baseline gap-3">
              <span className="font-heading text-3xl leading-none">3.</span>
              <span>Collaboration:</span>
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="font-heading font-bold">Definition:</p>
                <Bullets
                  items={[
                    <>
                      Effective <strong>teamwork</strong> and <strong>communication</strong> are essential in Scrum.
                    </>,
                  ]}
                />
              </div>
              <div>
                <p className="font-heading font-bold">Application in Scrum:</p>
                <Bullets
                  items={[
                    <>Scrum promotes collaboration among team members, stakeholders, and customers.</>,
                    <>
                      <em>Regular ceremonies</em>,
                      <Bullets
                        className="mt-1"
                        items={[
                          <>
                            <strong>Daily Scrums</strong>,
                          </>,
                          <>
                            <strong>Sprint Reviews</strong>,
                          </>,
                          <>
                            <strong>Retrospectives</strong>,
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
          <div className="hidden sm:block">
            <ScrumPrinciples4To6 active={activeScrum46} onSelect={setActiveScrum46} />
          </div>
          <div className="sm:hidden">
            <ScrumPrinciples4To6Tall active={activeScrum46} onSelect={setActiveScrum46} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              n: 4,
              name: "Value-Based Prioritization",
              def: (
                <>
                  Work should be prioritized based on the <strong>value</strong> it delivers to the customer and the
                  business.
                </>
              ),
              app: [
                <>
                  <strong>The Product Owner</strong> is responsible for managing the <strong>Product Backlog</strong>{" "}
                  and prioritizing items based on their <strong>value</strong>.
                </>,
                <>
                  Ensures that the team focuses on <strong>delivering</strong> the{" "}
                  <strong>most important features first</strong>, maximizing the <em>return on investment</em> and
                  ensuring that <em>customer needs</em> are met.
                </>,
              ],
            },
            {
              n: 5,
              name: "Time Boxing",
              def: (
                <>
                  Time boxing involves setting <strong>fixed time limits</strong> for activities to create a sense of{" "}
                  <strong>urgency</strong> and <strong>focus</strong>.
                </>
              ),
            },
            {
              n: 6,
              name: "Iterative Development",
              def: (
                <>
                  Development is carried out in <strong>small</strong>, <strong>incremental cycles</strong>, allowing
                  for regular <strong>feedback and adjustments</strong>.
                </>
              ),
            },
          ].map((p, i) => {
            const isLit = i === activeScrum46;
            return (
              <div
                key={p.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl leading-tight mb-3 flex items-baseline gap-3">
                  <span className="font-heading text-3xl leading-none">{p.n}.</span>
                  <span>{p.name}</span>
                </p>
                <div className={`grid ${p.app ? "md:grid-cols-2" : "md:grid-cols-1"} gap-6 md:gap-10`}>
                  <div>
                    <p className="font-heading font-bold">Definition:</p>
                    <Bullets items={[p.def]} />
                  </div>
                  {p.app && (
                    <div>
                      <p className="font-heading font-bold">Application in Scrum:</p>
                      <Bullets items={p.app} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide id="scrum-methodology" label="HOW SCRUM WORKS" title="Scrum Methodology">
        <PlateWell>
          <ScrumProcess />
        </PlateWell>
        <p className="font-body italic text-lg">
          Note. backlog refers to a prioritized list of work items or tasks that need to be completed for a project
        </p>
      </Slide>

      <Slide id="roles-in-scrum" label="1. ROLES IN SCRUM" title="Roles in Scrum" exercise={exercise["roles-in-scrum"]}>
        <p className="font-heading text-xl md:text-2xl leading-snug">
          Scrum defines three primary roles, each with specific responsibilities:
        </p>
        <PlateWell>
          <div className="hidden sm:block">
            <ScrumRolesHub active={activeScrumRole} onSelect={setActiveScrumRole} />
          </div>
          <div className="sm:hidden">
            <ScrumRolesHubTall active={activeScrumRole} onSelect={setActiveScrumRole} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              name: "Product Owner",
              points: [
                <>
                  Represents the <strong>stakeholders</strong> and the voice of the <strong>customer</strong>.
                </>,
                <>
                  Responsible for defining the <strong>product vision</strong> and managing the{" "}
                  <strong>product backlog</strong>.
                </>,
                <>
                  Ensures that the <strong>team understands</strong> the <em>items in the backlog</em>.
                </>,
              ],
            },
            {
              name: "Scrum Master",
              points: [
                <>
                  Acts as a <em>facilitator</em> and <em>coach</em> for the Scrum team.
                </>,
                <>
                  <strong>Removes impediments</strong> that may hinder the team&apos;s progress.
                </>,
                <>
                  Shields the team from <strong>external distractions</strong> and <strong>interruptions</strong>.
                </>,
              ],
            },
            {
              name: "Development Team",
              points: [
                <>
                  A <strong>cross-functional</strong> group of professionals who work collaboratively to deliver the
                  product increment.
                </>,
                <>
                  Typically consists of <strong>3 to 9 members</strong> with various skills (e.g., <em>developers</em>,{" "}
                  <em>testers</em>, <em>designers</em>).
                </>,
                <>
                  <strong>Self-organizes</strong> to determine how to accomplish the work in the sprint.
                </>,
              ],
            },
          ].map((r, i) => {
            const isLit = i === activeScrumRole;
            return (
              <div
                key={r.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 flex flex-col gap-3 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl">{r.name}:</p>
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
            <p className="font-heading italic text-xl leading-snug [&_strong]:font-bold">
              <span className={`${SUB} not-italic block mb-2`}>Question:</span>
              How can <strong>regular events</strong> like daily meetings improve team collaboration and accountability?
            </p>
            <p className="font-heading text-xl">Events (ceremonies) that structure the workflow:</p>
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
                  A <strong>time-boxed iteration</strong>, usually lasting <em>1 to 4 weeks</em>
                </>,
                <>
                  A <em>potentially shippable product</em> increment is created.
                </>,
                <>
                  Each sprint begins with a <strong>planning session</strong> and ends with a{" "}
                  <strong>review and retrospective</strong>.
                </>,
              ],
            },
            {
              name: "Sprint Planning",
              items: [
                <>
                  A meeting held at the beginning of each sprint where the team decides{" "}
                  <strong>what work will be done</strong>.
                </>,
                <>
                  The team selects <strong>items from the product backlog</strong> to include in the{" "}
                  <strong>sprint backlog</strong> based on priority and team capacity.
                </>,
                <>
                  The team defines the <strong>sprint goal</strong>, which is a clear objective for the sprint.
                </>,
              ],
            },
          ].map((ev, i) => {
            const isLit = i === activeScrumEvent1;
            return (
              <div
                key={ev.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl mb-2">{ev.name}:</p>
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
            className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
              activeScrumEvent2 === 0 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-heading font-bold text-2xl mb-2">Daily Scrum (Stand-up):</p>
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-start">
              <div>
                <Bullets
                  items={[
                    <>
                      A <strong>short</strong>, <strong>time-boxed</strong> meeting (<em>usually 15 minutes</em>) held
                      every day during the sprint.
                    </>,
                    <>Team members answer three questions:</>,
                    <>
                      The purpose is to <strong>synchronize</strong> activities and identify any{" "}
                      <strong>impediments</strong>.
                    </>,
                  ]}
                />
              </div>
              <ol className="flex flex-col gap-1 bg-[var(--paper-2)] p-4">
                {["What did I do yesterday?", "What will I do today?", "What obstacles are in my way?"].map((q) => (
                  <li key={q} className="font-heading font-bold text-lg">
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            aria-hidden={activeScrumEvent2 !== 1}
            className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
              activeScrumEvent2 === 1 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-heading font-bold text-2xl mb-2">Sprint Review:</p>
            <Bullets
              items={[
                <>
                  A meeting held at the <strong>end</strong> of the sprint to <strong>demonstrate</strong> the{" "}
                  <em>completed work</em> to stakeholders.
                </>,
                <>
                  The team presents the <em>product increment</em> and gathers <strong>feedback</strong>.
                </>,
                <>
                  The <em>product backlog</em> may be <strong>adjusted</strong> based on feedback received.
                </>,
              ]}
            />
          </div>

          <div
            aria-hidden={activeScrumEvent2 !== 2}
            className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
              activeScrumEvent2 === 2 ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="font-heading font-bold text-2xl mb-2">Sprint Retrospective:</p>
            <Bullets
              items={[
                <>
                  A meeting held <strong>after</strong> the sprint review to reflect on the sprint process.
                </>,
                <>
                  The team discusses
                  <Bullets
                    className="mt-1"
                    items={[
                      <>
                        <em>what went well</em>,
                      </>,
                      <>
                        <em>what could be improved</em>,
                      </>,
                      <>
                        <em>how to implement changes</em> in the next sprint.
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
        <p className="font-heading text-xl md:text-2xl leading-snug">
          Scrum uses specific artifacts to <em>manage</em> work and provide <em>transparency</em>:
        </p>
        <PlateWell>
          <ScrumProcess mode="artifacts" active={activeScrumArtifact} onSelect={setActiveScrumArtifact} />
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              name: "Product Backlog",
              items: [
                <>
                  An <strong>ordered</strong> list of all desired work on the project,
                  <span className="block mt-1 font-heading italic">
                    features, enhancements, bug fixes, technical tasks.
                  </span>
                </>,
                <>
                  The <strong>product owner</strong> is responsible for maintaining and prioritizing the backlog.
                </>,
              ],
            },
            {
              name: "Sprint Backlog",
              items: [
                <>
                  A subset of the product backlog items selected for the <strong>current sprint</strong>,
                </>,
                <>
                  The <strong>development team</strong> is responsible for managing the sprint backlog.
                </>,
              ],
            },
            {
              name: "Increment",
              items: [
                <>
                  The <strong>sum of all completed</strong> product backlog items at the end of a sprint.
                </>,
                <>
                  The increment must meet the team&apos;s <em>definition</em> of <strong>&quot;done,&quot;</strong>{" "}
                  which includes <strong>quality</strong> criteria and <strong>acceptance</strong> criteria.
                </>,
              ],
            },
          ].map((ar, i) => {
            const isLit = i === activeScrumArtifact;
            return (
              <div
                key={ar.name}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl mb-2">{ar.name}:</p>
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
