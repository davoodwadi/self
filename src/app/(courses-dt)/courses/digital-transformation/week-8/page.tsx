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
  HeroImmersivePlate,
  PilotTrainingInteractive,
  SimulatingPlate,
  InteractingPlate,
  BlendingPlate,
  VirtualRealityPlate,
  AugmentedRealityPlate,
  SwipeVsSweepPlate,
  GamificationElementsInteractive,
  GamificationElementsTall,
  ProgressBarComparisonInteractive,
  OverjustificationInteractive,
  ExcessiveFreedomPlate,
  FlightSimCaseInteractive,
  FlightSimCaseTall,
  GuitarHeroCurveInteractive,
  ZombiesRunPlate,
  ZombiesRunTall,
  MilitaryControllerPlate,
  BusinessQuestionsPlate,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Immersive Technologies" },
  { id: "ch2", label: "Gamification" },
  { id: "ch3", label: "Business Cases" },
  { id: "ch4", label: "Ethical Concerns" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy: the reading serif. Terms set bold in the display serif. */
const BODY_BASE = "font-body leading-[1.6] [&_strong]:font-heading [&_strong]:font-bold";
const BODY = `${BODY_BASE} text-base md:text-[1.08rem]`;
const LIST =
  "list-none flex flex-col gap-1.5 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rotate-45 [&>li]:before:shrink-0 [&>li]:before:bg-[var(--dt-ink)]";
const SUBLIST =
  "list-none flex flex-col gap-1 mt-1.5 pl-4 [&>li]:flex [&>li]:gap-2.5 [&>li]:before:content-['-'] [&>li]:before:shrink-0";

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

export default function DigitalTransformationWeek8() {
  const [activeElement, setActiveElement] = useState(0);
  const [activeFlightFeature, setActiveFlightFeature] = useState(0);
  const [activeBizQuestion, setActiveBizQuestion] = useState(0);

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
        category="WEEK 8: DIGITAL TRANSFORMATION"
        title="Week 8: Immersive Technologies"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Immersive Technologies: AR, VR",
          "Gamification",
          "Business Cases",
          "Ethical Concerns",
        ]}
        plate={<HeroImmersivePlate />}
      />

      {/* ================================================================
          CHAPTER 1: IMMERSIVE TECHNOLOGIES
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Immersive Technologies" />

      <Slide id="question-becoming-a-pilot" label="QUESTION" title="Question">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-5`}>
          <Bullets
            items={[
              <>Think of becoming a pilot.</>,
              <>Why is it deemed a difficult task? Why are there more people with driver&apos;s license than with pilot&apos;s license?</>,
            ]}
          />
          <Bullets
            items={[
              <>&ldquo;It takes 10,000 hours to become proficient with flying.&rdquo;</>,
              <>What solutions do we have to this problem?</>,
            ]}
          />
        </div>
        <PlateWell>
          <PilotTrainingInteractive />
        </PlateWell>
      </Slide>

      <Slide id="immersive-technologies" label="CORE CONCEPT" title="Immersive technologies">
        <div className={`${BODY} text-xl md:text-2xl border-l-[5px] border-[var(--dt-ink)] pl-4`}>
          <p>
            Immersive technologies: a group of digital tools and techniques that create or enhance{" "}
            <strong>user experiences</strong>
          </p>
        </div>
        <div className={`${BODY} grid md:grid-cols-3 gap-6 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <p className="text-lg md:text-xl">
              <strong>simulating</strong> realistic environments,
            </p>
            <PlateWell>
              <SimulatingPlate />
            </PlateWell>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <p className="text-lg md:text-xl">
              <strong>interacting</strong> with virtual elements,
            </p>
            <PlateWell>
              <InteractingPlate />
            </PlateWell>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <p className="text-lg md:text-xl">
              <strong>blending</strong> digital content with the physical world.
            </p>
            <PlateWell>
              <BlendingPlate />
            </PlateWell>
          </div>
        </div>
      </Slide>

      <Slide
        id="virtual-reality-vr-and-augmented-reality-ar"
        label="IMMERSIVE TECHNOLOGIES"
        title="Virtual Reality (VR) and Augmented Reality (AR)"
        exercise={exercise["virtual-reality-vr-and-augmented-reality-ar"]}
      >
        <div className={`${BODY} grid md:grid-cols-2 gap-6 md:gap-8 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <div>
              <p className="text-xl">
                1. <strong>Virtual Reality (VR)</strong>
              </p>
              <Dashes
                items={[
                  <>
                    using headsets to create a <em>fully computer-generated</em> environment that users can interact
                    with.
                  </>,
                  <>
                    In VR, users are completely immersed in a virtual world, typically experienced through visual and
                    auditory stimuli, and sometimes through haptic feedback.
                  </>,
                ]}
              />
            </div>
            <PlateWell>
              <VirtualRealityPlate />
            </PlateWell>
            <p className="border-l-[4px] border-[var(--dt-ink)] pl-3 text-[0.98rem]">
              Research <em>three</em> VR hardware. Find what their use cases are. Write the information down and share
              it with the class.
            </p>
          </div>

          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <div>
              <p className="text-xl">
                2. <strong>Augmented Reality (AR)</strong>
              </p>
              <Dashes
                items={[
                  <>
                    AR <strong>overlays</strong> digital information or objects onto the real world,
                  </>,
                  <>enhancing the perception of the surroundings.</>,
                  <>
                    Users can view AR content through devices like{" "}
                    <strong>smartphones, tablets, or AR glasses</strong>,
                  </>,
                  <>
                    allowing for interaction with <strong>both</strong> virtual and physical elements.
                  </>,
                ]}
              />
            </div>
            <PlateWell>
              <AugmentedRealityPlate />
            </PlateWell>
            <p className="border-l-[4px] border-[var(--dt-ink)] pl-3 text-[0.98rem]">
              Research <em>three</em> AR hardware. Find what their use cases are. Write the information down and share
              it with the class.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 2: GAMIFICATION
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Gamification" />

      <Slide id="gamification" label="BEHAVIORAL DESIGN" title="Gamification">
        <Row cols="lg:grid-cols-[1.15fr_1fr]">
          <div className={`${BODY} flex flex-col gap-5`}>
            <Bullets
              items={[
                <>
                  Gamification is the application of <strong>game-design</strong> elements, principles, and mechanics in
                  non-game contexts
                </>,
                <>
                  <strong>engage and motivate</strong> individuals to achieve specific goals, enhance user experience,
                  and drive behavior.
                </>,
                <>
                  to leverage humans&apos; <strong>natural tendencies</strong> toward{" "}
                  <em>play, achievement, and social interaction</em>,
                </>,
                <>
                  making tasks feel <em>more enjoyable and rewarding</em>.
                </>,
              ]}
            />
            <p className="font-heading font-bold text-xl border-t-[4px] border-[var(--dt-ink)] pt-4">
              Why are people more willing to swipe their phone than sweep their floor?
            </p>
          </div>
          <PlateWell>
            <SwipeVsSweepPlate />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="elements-of-gamification"
        label="MECHANICS"
        title="Elements of Gamification"
        exercise={exercise["elements-of-gamification"]}
      >
        <PlateWell>
          <div className="hidden sm:block">
            <GamificationElementsInteractive active={activeElement} onSelect={setActiveElement} />
          </div>
          <div className="sm:hidden">
            <GamificationElementsTall active={activeElement} onSelect={setActiveElement} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            <p key="points" className="text-xl">
              1. <strong>Points</strong>: Users earn points for completing tasks, achieving milestones, or participating
              in activities. Points serve as a measurable form of progress and achievement.
            </p>,
            <div key="badges" className="text-xl">
              <p>
                2. <strong>Badges</strong>: Badges are visual representations of accomplishments that users can earn by
                completing specific tasks or challenges.
              </p>
              <Dashes
                items={[
                  <>
                    They provide <em>recognition</em> and can <em>motivate</em> further participation.
                  </>,
                ]}
              />
            </div>,
            <div key="leaderboards" className="text-xl">
              <p>
                3. <strong>Leaderboards</strong>: Leaderboards rank participants based on their performance, often
                fostering healthy competition among users.
              </p>
              <Dashes
                items={[
                  <>
                    This element taps into people&apos;s desire for <em>social comparison and status</em>.
                  </>,
                ]}
              />
            </div>,
            <div key="challenges" className="grid md:grid-cols-[1.25fr_1fr] gap-6">
              <p className="text-lg">
                4. <strong>Challenges and Quests</strong>: Structuring tasks as challenges or quests can create a sense
                of adventure and engagement. Users may be motivated to complete these tasks to overcome obstacles or
                unlock rewards.
              </p>
              <div className="border-l-[4px] border-[var(--dt-ink)] pl-4">
                <Bullets
                  items={[
                    <>Why some people are drawn to challenging games?</>,
                    <>What is the difference between a challenging game and a challenging job? What is a chore?</>,
                  ]}
                />
              </div>
            </div>,
            <p key="levels" className="text-xl">
              5. <strong>Levels and Progression</strong>: Users can advance through levels by completing certain
              objectives or accumulating points. This system provides a <strong>sense of progression</strong>.
            </p>,
          ].map((item, i) => {
            const isLit = i === activeElement;
            return (
              <div
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide id="progress-bar-and-group-question" label="PROGRESSION DESIGN" title="Progress Bar and Group Question">
        <p className="font-heading font-bold text-xl border-l-[5px] border-[var(--dt-ink)] pl-4">
          What is the difference between these two progress bars in terms of design?
        </p>
        <PlateWell>
          <ProgressBarComparisonInteractive />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-3 gap-5 border-t-[4px] border-[var(--dt-ink)] pt-4`}>
          <p>Think about your MBA program.</p>
          <p>
            Does the two-year completion timelime provide enough <strong>progression</strong> to give you a sense of
            progression?
          </p>
          <p>Provide a proposal that would enhance the sense of progression for the students.</p>
        </div>
      </Slide>

      <Slide
        id="challenges-of-gamification"
        label="PITFALLS"
        title="Challenges of Gamification:"
        exercise={exercise["challenges-of-gamification"]}
      >
        <div className={`${BODY} grid md:grid-cols-2 gap-6 md:gap-8 items-start`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <div>
              <p className="text-xl mb-1.5">
                <strong>Overjustification Effect</strong>
              </p>
              <Dashes
                items={[
                  <>
                    Relying too heavily on <strong>extrinsic rewards</strong> can undermine{" "}
                    <strong>intrinsic motivation</strong>, leading users to only engage in activities for the{" "}
                    <em>rewards</em> rather than for personal growth or <em>enjoyment</em>.
                  </>,
                  <>e.g., when you finish a game you tend to enjoy the game world less.</>,
                ]}
              />
            </div>
            <PlateWell>
              <OverjustificationInteractive />
            </PlateWell>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <div>
              <p className="text-xl mb-1.5">
                <strong>Excessive Freedom</strong>
              </p>
              <Dashes
                items={[
                  <>An open-world game with no objectives</>,
                  <>Does it make the game boring?</>,
                ]}
              />
            </div>
            <PlateWell>
              <ExcessiveFreedomPlate />
            </PlateWell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 3: BUSINESS CASES
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Business Cases" />

      <Slide
        id="the-case-of-microsoft-flight-simulator"
        label="CASE STUDY"
        title="The Case of Microsoft Flight Simulator"
      >
        <div className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
          {[
            <>Realistic Graphics and Simulated Environments</>,
            <>Virtual Cockpit Experiences</>,
            <>VR Support</>,
            <>Dynamic Weather and Air Traffic</>,
            <>Community and Multiplayer Features</>,
          ].map((item, i) => {
            const isLit = i === activeFlightFeature;
            return (
              <div
                key={i}
                onClick={() => setActiveFlightFeature(i)}
                className={`cursor-pointer border-t-[4px] border-[var(--dt-ink)] pt-3 flex items-baseline gap-2.5 transition-colors ${
                  isLit ? "font-heading font-bold" : ""
                }`}
              >
                <span className="font-accent text-sm shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </div>
            );
          })}
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <a
              href="https://www.youtube.com/watch?v=LPoZx88OQQg"
              target="_blank"
              rel="noreferrer"
              className="underline font-heading font-bold hover:text-[var(--dt-signal)]"
            >
              Motion Simulator build and test flight
            </a>
          </div>
        </div>
        <PlateWell>
          <div className="hidden sm:block">
            <FlightSimCaseInteractive active={activeFlightFeature} onSelect={setActiveFlightFeature} />
          </div>
          <div className="sm:hidden">
            <FlightSimCaseTall active={activeFlightFeature} onSelect={setActiveFlightFeature} />
          </div>
        </PlateWell>
      </Slide>

      <Slide id="guitar-hero" label="CASE STUDY" title="Guitar Hero">
        <Row cols="lg:grid-cols-[1.1fr_1fr]">
          <div className={`${BODY} flex flex-col gap-3`}>
            <Bullets
              items={[
                <>Learning to play a musical instrument can be quite challenging.</>,
                <>The initial learning curve is steep.</>,
                <>In the first few months there seems to be little progression.</>,
                <>Until you get good, nobody wants to listen to your play.</>,
                <>Introducing Guitar Hero</>,
                <a
                  key="gh-link"
                  href="https://www.youtube.com/watch?v=Fneaa0E6PwE"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-heading font-bold hover:text-[var(--dt-signal)]"
                >
                  ONE BY METALLICA ~ 150% SPEED ~ FIRST EVER 100% FC!!!!!!!!!!
                </a>,
              ]}
            />
          </div>
          <PlateWell>
            <GuitarHeroCurveInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="zombies-run" label="CASE STUDY" title="Zombies, Run!" exercise={exercise["zombies-run"]}>
        <div className={`${BODY} grid md:grid-cols-3 gap-5 border-t-[4px] border-[var(--dt-ink)] pt-4`}>
          <p>
            <a
              href="https://www.youtube.com/watch?v=QXV5akCoHSQ"
              target="_blank"
              rel="noreferrer"
              className="underline font-heading font-bold hover:text-[var(--dt-signal)]"
            >
              Trailer
            </a>
          </p>
          <p>What do you think this trailer is?</p>
          <p className="font-heading font-bold">Zombies, Run!</p>
        </div>
        <PlateWell>
          <div className="hidden sm:block">
            <ZombiesRunPlate />
          </div>
          <div className="sm:hidden">
            <ZombiesRunTall />
          </div>
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 4: ETHICAL CONCERNS & BUSINESS STRATEGY
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Ethical Concerns & Business Strategy" />

      <Slide id="ethical-concerns" label="ETHICAL CONCERNS" title="Ethical Concerns" exercise={exercise["ethical-concerns"]}>
        <div className={`${BODY} text-lg border-l-[5px] border-[var(--dt-ink)] pl-4`}>
          <Bullets
            items={[
              <>US Military has been using Xbox Controllers for controlling advanced weapons systems.</>,
              <>Why?</>,
            ]}
          />
        </div>
        <PlateWell>
          <MilitaryControllerPlate />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-2 gap-6`}>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            &ldquo;For RADBO, the operators are generally a much younger audience,&rdquo; an Air Force spokesman tells
            WIRED. &ldquo;Therefore, utilizing a PlayStation or Xbox type of controller such as the FMCU seems to be a
            natural transition for the gaming generation.&rdquo;
          </p>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            &ldquo;By 2006, games like Halo were dominant in the military,&rdquo; Tom Phelps, then a product director at
            iRobot, told Business Insider in 2013 of the company’s adoption of a standard Xbox controller for its
            PackBot IED disposal robot. &ldquo;So we worked with the military to socialize and standardize the concept …
            It was considered a very strong success, younger soldiers with a lot of gaming experience were able to adapt
            quickly.&rdquo;
          </p>
        </div>
      </Slide>

      <Slide
        id="can-immersive-technology-and-gamification-help-my-business"
        label="BUSINESS STRATEGY"
        title="Can Immersive Technology and Gamification Help My Business?"
        exercise={exercise["can-immersive-technology-and-gamification-help-my-business"]}
      >
        <Row cols="lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col gap-4">
            <p className="font-heading font-bold text-xl">Questions to ask</p>
            <ol className={`${BODY} flex flex-col gap-3`}>
              {[
                <>Do my users struggle with intrinsic motivation?</>,
                <>How can you induce intrinsic motivation using a story?</>,
                <>How to properly balance extrinsic vs. intrinsic motivation?</>,
                <>Is replacing the actual intrinsic motivation with the fabricated one going to hurt the person?</>,
              ].map((q, i) => {
                const isLit = i === activeBizQuestion;
                return (
                  <li
                    key={i}
                    onClick={() => setActiveBizQuestion(i)}
                    className={`cursor-pointer border-t-[4px] border-[var(--dt-ink)] pt-3 flex items-baseline gap-3 text-lg transition-colors ${
                      isLit ? "font-heading font-bold" : ""
                    }`}
                  >
                    <span className="font-accent text-sm shrink-0">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                );
              })}
            </ol>
          </div>
          <PlateWell>
            <BusinessQuestionsPlate active={activeBizQuestion} onSelect={setActiveBizQuestion} />
          </PlateWell>
        </Row>
      </Slide>

      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "Explain Immersive Technology",
          "Give examples of Gamification",
          "Difference between intrinsic and extrinsic motivation",
          "Ethical concerns with gamification",
        ]}
      />
    </main>
  );
}

