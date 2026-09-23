"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import {
  Filters,
  SelectOrganizeInterpret,
  SensoryFlood,
  SameAdTwoImpressions,
  PerceptionFunnel,
  SensoryWheel,
  SenseMark,
  SightVignette,
  SoundVignette,
  SmellVignette,
  TouchVignette,
  TasteVignette,
  AbsoluteThreshold,
  FarBillboard,
  JndLadder,
  ProportionBars,
  WebersLawScale,
  StayBelow,
  Exceed,
  Overload,
  SkipAd,
  Vigilance,
  Defense,
  Adaptation,
  WholeFromParts,
  Closure,
  Similarity,
  FigureGround,
  SemioticTriangle,
  SensorySignatures,
} from "./visuals";
import type { Sense } from "../_visuals/flat";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 02 — PERCEPTION AND SENSORY MARKETING
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// SIGNAL marks what gets through (noticed, detected, the sense beyond sight
// and sound), COUNTER the other view (the unnoticed change, the sign).
//
// Wayfinding: once the three stages are taught, a StageRule strip lights the
// stage each later slide belongs to.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. The three stages of perception are put in order;
// thresholds, Weber's law and Gestalt apply an idea to a case, so they are quizzes.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

type Tone = "signal" | "counter" | "ink";

const BORDER: Record<Tone, string> = {
  signal: "border-[var(--signal)]",
  counter: "border-[var(--counter)]",
  ink: "border-[var(--ink)]",
};

const TEXT: Record<Tone, string> = {
  signal: "text-[var(--signal)]",
  counter: "text-[var(--counter)]",
  ink: "text-[var(--ink)]",
};

/** One verbatim line at reading size. */
function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("type-body max-w-[var(--measure)]", className)}>{children}</p>
  );
}

/** A line promoted to lead size. */
function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-lead max-w-[48ch]", className)}>{children}</p>;
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-h2 !font-normal", className)}>{children}</p>;
}

/** Coloured term inside a line. */
function Term({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
  return <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>;
}

/** Inline colour for a phrase inside a serif line. */
function Tint({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={TEXT[tone]}>{children}</span>;
}

/** Hairline-topped block. */
function Ruled({
  tone = "ink",
  children,
  className = "",
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/** A plate that lives in a column: a figure well without the 680px floor. */
function Plate({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("figure-well w-full min-w-0 p-3 sm:p-5", className)}>
      {children}
    </div>
  );
}

/**
 * Slide heading. A "Label:" prefix from the content is set as a small tracked
 * kicker inside the same h2, so the heading text stays exactly as written.
 */
function Heading({
  kicker,
  children,
  tone = "signal",
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
}) {
  return (
    <div className="mb-10 w-full md:mb-14">
      <h2 className="type-h1 max-w-[22ch]">
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-4 block !text-[0.8rem]",
                tone === "counter" ? "!text-[var(--counter)]" : "!text-[var(--signal)]",
              )}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** A line and a column plate side by side. */
function Pair({
  plateFirst = false,
  plate,
  children,
  className = "",
}: {
  plateFirst?: boolean;
  plate: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14", className)}>
      {plateFirst ? <Plate>{plate}</Plate> : null}
      <div className="min-w-0">{children}</div>
      {plateFirst ? null : <Plate>{plate}</Plate>}
    </div>
  );
}

/** A ruled line with its plate beneath. */
function PlateColumn({
  tone = "ink",
  text,
  plate,
}: {
  tone?: Tone;
  text: React.ReactNode;
  plate: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Ruled tone={tone}>
        <P className="!text-[clamp(1.05rem,1.5vw,1.3rem)]">{text}</P>
      </Ruled>
      <Plate>{plate}</Plate>
    </div>
  );
}

function Columns({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14", className)}>
      {children}
    </div>
  );
}

/** Exposure · Attention · Interpretation — the stage each slide belongs to. */
const STAGE_NAMES = ["Exposure", "Attention", "Interpretation"];

function StageRule({ active }: { active: number[] }) {
  return (
    <ol aria-hidden className="mb-12 grid w-full grid-cols-3 gap-2 md:mb-16 sm:gap-4">
      {STAGE_NAMES.map((name, i) => {
        const on = active.includes(i);
        return (
          <li
            key={name}
            className={cn(
              "min-w-0 border-t-2 pt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]",
              on
                ? "border-[var(--signal)] text-[var(--signal)]"
                : "border-[var(--rule)] text-[var(--ink-3)]",
            )}
          >
            {name}
          </li>
        );
      })}
    </ol>
  );
}

/** One sense: its glyph, the verbatim line, and a small scene. */
function SenseRow({
  kind,
  beyond,
  plate,
  children,
}: {
  kind: Sense;
  beyond: boolean;
  plate: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "grid min-w-0 items-center gap-6 border-t-2 pt-6 md:grid-cols-[4rem_1fr_minmax(0,22rem)] md:gap-10",
        beyond ? "border-[var(--signal)]" : "border-[var(--rule-2)]",
      )}
    >
      <SenseMark kind={kind} tone={beyond ? "var(--signal)" : "var(--ink-3)"} />
      <p className="type-h2 !font-normal !text-[clamp(1.25rem,2vw,1.7rem)]">{children}</p>
      <div className="figure-well w-full min-w-0 p-3">{plate}</div>
    </li>
  );
}

export default function Week2() {
  return (
    <SlideDeck label="Week 02">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--signal)]">
              Week 02
            </p>
            <p className="type-caption mt-2">Consumer Behavior · Davood Wadi, PhD</p>
            <Title className="mt-8 !max-w-[14ch]">Perception and Sensory Marketing</Title>
            <div className="mt-10 max-w-[34ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                We do not see things as they are.{" "}
                <span className="text-[var(--ink-3)]">We see things through our </span>
                <Tint>senses</Tint>
                <span className="text-[var(--ink-3)]"> and </span>
                <Tint>personal filters</Tint>
                <span className="text-[var(--ink-3)]">.</span>
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[340px]">
            <Filters />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is Perception?
          ================================================================ */}
      <Slide id="what-is-perception" border>
        <Heading>What Is Perception?</Heading>
        <Statement className="!max-w-[34ch]">
          Perception is the process of <Tint>selecting</Tint>, <Tint>organizing</Tint>, and{" "}
          <Tint>interpreting</Tint> sensations.
        </Statement>
        <Figure height="auto">
          <SelectOrganizeInterpret />
        </Figure>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled tone="ink">
            <Lead>Raw sensory inputs reach our sensory organs every second.</Lead>
          </Ruled>{" "}
          <Ruled tone="ink">
            <Lead>
              <Term tone="ink">Sights, sounds, smells, tastes, and textures</Term> flood our
              environment.
            </Lead>
          </Ruled>
        </div>
        <Figure height="auto">
          <SensoryFlood />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Statement className="!max-w-[34ch]">
            Perception creates <Tint>meaning</Tint> out of this <Tint tone="ink">chaos</Tint>.
          </Statement>
        </Ruled>
        <Figure height="auto" className="!mt-16">
          <SameAdTwoImpressions />
        </Figure>
        <Big className="max-w-[46ch]">
          Two people exposed to the <Tint tone="ink">exact same advertisement</Tint> often walk
          away with <Tint>completely different impressions</Tint>.
        </Big>
      </Slide>

      {/* ================================================================
          The Three Stages of Perception
          ================================================================ */}
      <Slide
        id="the-three-stages-of-perception"
        border
        exercise={exercise["the-three-stages-of-perception"]}
      >
        <StageRule active={[0, 1, 2]} />
        <Heading>The Three Stages of Perception</Heading>
        <Lead>Perception occurs in three sequential stages.</Lead>
        <Figure height="auto">
          <PerceptionFunnel />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-3 md:gap-8">
          {[
            {
              stage: "Stage 1 is Exposure.",
              def: "Sensory stimuli come within the range of a person's sensory receptors.",
            },
            {
              stage: "Stage 2 is Attention.",
              def: "The mind allocates mental processing capacity to a specific stimulus.",
            },
            {
              stage: "Stage 3 is Interpretation.",
              def: "The brain assigns meaning to the sensory stimulus based on past experiences and expectations.",
            },
          ].map((s, i) => (
            <li
              key={s.stage}
              className={cn(
                "min-w-0 border-t-2 pt-5",
                i === 2 ? "border-[var(--signal)]" : "border-[var(--ink)]",
              )}
            >
              <p className={cn("type-h2 !font-normal", i === 2 && "text-[var(--signal)]")}>
                {s.stage}
              </p>{" "}
              <p className="type-body mt-5">{s.def}</p>
            </li>
          ))}
        </ol>
        <Ruled tone="ink" className="mt-16 w-full">
          <Statement className="!max-w-[36ch]">
            Most stimuli get <Tint tone="ink">filtered out</Tint> during exposure and attention
            before reaching <Tint>interpretation</Tint>.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Sensory Marketing: Beyond Sight and Sound
          ================================================================ */}
      <Slide id="sensory-marketing-beyond-sight-and-sound" border>
        <StageRule active={[0]} />
        <Heading kicker="Sensory Marketing:">Beyond Sight and Sound</Heading>
        <Statement className="!max-w-[34ch]">
          Sensory marketing engages the consumer&apos;s <Tint>senses</Tint> to influence their
          feelings and choices.
        </Statement>
        <Figure height="auto">
          <SensoryWheel />
        </Figure>
        <ol className="flex w-full flex-col gap-10">
          <SenseRow kind="sight" beyond={false} plate={<SightVignette />}>
            {" "}
            <Term tone="ink">Sight</Term> creates visual identity, package recognition, and color
            associations.
          </SenseRow>
          <SenseRow kind="sound" beyond={false} plate={<SoundVignette />}>
            {" "}
            <Term tone="ink">Sound</Term> shapes shopping tempo and brand memory through musical
            jingles.
          </SenseRow>
          <SenseRow kind="smell" beyond plate={<SmellVignette />}>
            {" "}
            <Term>Smell</Term> connects directly to the limbic system, triggering emotional
            memories.
          </SenseRow>
          <SenseRow kind="touch" beyond plate={<TouchVignette />}>
            {" "}
            <Term>Touch</Term>, also called haptics, builds psychological ownership when consumers
            hold an item.
          </SenseRow>
          <SenseRow kind="taste" beyond plate={<TasteVignette />}>
            {" "}
            <Term>Taste</Term> drives loyalty in food and beverage markets through distinct flavor
            profiles.
          </SenseRow>
        </ol>
      </Slide>

      {/* ================================================================
          Sensory Thresholds: The Limits of Awareness
          ================================================================ */}
      <Slide
        id="sensory-thresholds-the-limits-of-awareness"
        border
        exercise={exercise["sensory-thresholds-the-limits-of-awareness"]}
      >
        <StageRule active={[0]} />
        <Heading kicker="Sensory Thresholds:">The Limits of Awareness</Heading>
        <Lead>Senses have physical and psychological limits.</Lead>
        <Big className="mt-12 max-w-[42ch]">
          The <Tint>absolute threshold</Tint> is the minimum amount of stimulation a person can
          detect on a sensory channel.
        </Big>
        <Figure height="auto">
          <AbsoluteThreshold />
        </Figure>
        <Pair plate={<FarBillboard />}>
          <Ruled tone="ink">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              A billboard with tiny text placed far from a highway falls{" "}
              <Term>below the absolute threshold</Term> of drivers.
            </P>
          </Ruled>
        </Pair>
        <div className="mt-20 grid w-full gap-8 md:grid-cols-2">
          <Ruled tone="counter">
            <Big>
              The <Tint tone="counter">differential threshold</Tint> is the ability of a sensory
              system to detect changes or differences between two stimuli.
            </Big>
          </Ruled>{" "}
          <Ruled tone="signal">
            <Big>
              The minimum difference between two stimuli needed for detection is called the{" "}
              <Tint>Just Noticeable Difference, or JND</Tint>.
            </Big>
          </Ruled>
        </div>
        <Figure height="auto">
          <JndLadder />
        </Figure>
      </Slide>

      {/* ================================================================
          Weber's Law: When Differences Matter
          ================================================================ */}
      <Slide
        id="webers-law-when-differences-matter"
        border
        exercise={exercise["webers-law-when-differences-matter"]}
      >
        <StageRule active={[0]} />
        <Heading kicker="Weber's Law:">When Differences Matter</Heading>
        <Pair plate={<ProportionBars />}>
          <Statement>
            Weber&apos;s Law states that the <Tint tone="ink">stronger the initial stimulus</Tint>,
            the <Tint>greater the change</Tint> must be for people to notice it.
          </Statement>{" "}
          <P className="mt-8">
            The needed change is not a fixed amount. It is a{" "}
            <Term>constant proportion</Term> of the initial intensity.
          </P>
        </Pair>
        <Figure height="auto" className="!mt-16">
          <WebersLawScale />
        </Figure>
        <Columns>
          <Ruled tone="signal">
            <P>
              A ten-cent price increase on a one-dollar candy bar is{" "}
              <Term>noticeable right away</Term> because it is a ten percent jump.
            </P>
          </Ruled>
          <Ruled tone="ink">
            <P>
              A ten-cent price increase on a thousand-dollar laptop will go{" "}
              <Term tone="ink">completely unnoticed</Term>.
            </P>
          </Ruled>
        </Columns>
        <Columns className="mt-20">
          <PlateColumn
            tone="counter"
            text={
              <>
                Marketers <Term tone="counter">stay below the JND</Term> when shrinking package
                sizes or raising prices slightly.
              </>
            }
            plate={<StayBelow />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Marketers <Term>exceed the JND</Term> when redesigning a package or announcing a
                major discount.
              </>
            }
            plate={<Exceed />}
          />
        </Columns>
      </Slide>

      {/* ================================================================
          Attention: The Battle for Mental Energy
          ================================================================ */}
      <Slide id="attention-the-battle-for-mental-energy" border>
        <StageRule active={[1]} />
        <Heading kicker="Attention:">The Battle for Mental Energy</Heading>
        <Big className="max-w-[44ch]">
          Consumers face <Tint>sensory overload</Tint> from thousands of ads, notifications, and
          store displays every day.
        </Big>
        <Figure height="auto">
          <Overload />
        </Figure>
        <div className="grid w-full gap-x-14 gap-y-16 lg:grid-cols-2">
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Selective exposure</Term> means consumers choose what media and
                messages they see or avoid.
              </>
            }
            plate={<SkipAd />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Perceptual vigilance</Term> means consumers notice stimuli that relate to
                their current needs. A hungry person notices restaurant signs.
              </>
            }
            plate={<Vigilance />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Perceptual defense</Term> means consumers screen out threatening or
                contradictory messages. Heavy smokers often ignore warning labels on cigarette
                packs.
              </>
            }
            plate={<Defense />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Adaptation</Term> occurs when consumers no with time stop paying
                attention to familiar stimuli.
              </>
            }
            plate={<Adaptation />}
          />
        </div>
      </Slide>

      {/* ================================================================
          Interpretation and Gestalt Principles
          ================================================================ */}
      <Slide
        id="interpretation-and-gestalt-principles"
        border
        exercise={exercise["interpretation-and-gestalt-principles"]}
      >
        <StageRule active={[2]} />
        <Heading>Interpretation and Gestalt Principles</Heading>
        <Pair plate={<WholeFromParts />}>
          <Statement>
            People do not interpret stimuli in isolation.{" "}
            <Tint>They organize them into patterns.</Tint>
          </Statement>{" "}
          <P className="mt-8">
            <Term tone="ink">Gestalt psychology</Term> explains how people construct whole
            meanings from individual elements.
          </P>
        </Pair>
        <ol className="mt-20 grid w-full gap-12 lg:grid-cols-3 lg:gap-8">
          {[
            {
              name: "Closure",
              plate: <Closure />,
              text: (
                <>
                  {" "}
                  The <Term>Closure</Term> principle means people fill in missing pieces to
                  perceive a complete picture, such as an incomplete brand logo.
                </>
              ),
            },
            {
              name: "Similarity",
              plate: <Similarity />,
              text: (
                <>
                  {" "}
                  The <Term>Similarity</Term> principle means consumers group objects with shared
                  visual traits like color and shape together.
                </>
              ),
            },
            {
              name: "Figure-Ground",
              plate: <FigureGround />,
              text: (
                <>
                  {" "}
                  The <Term>Figure-Ground</Term> principle means people separate a main focal
                  object from its background.
                </>
              ),
            },
          ].map((g) => (
            <li key={g.name} className="flex min-w-0 flex-col gap-6">
              <div className="figure-well w-full min-w-0 p-3">{g.plate}</div>
              <div className="border-t-2 border-[var(--signal)] pt-5">
                <p className="type-body">{g.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Semiotics: The Meaning of Marketing Messages
          ================================================================ */}
      <Slide id="semiotics-the-meaning-of-marketing-messages" border>
        <StageRule active={[2]} />
        <Heading kicker="Semiotics:">The Meaning of Marketing Messages</Heading>
        <Lead>Marketers design ads to send symbolic messages to buyers.</Lead>
        <Big className="mt-10 max-w-[40ch]">
          <Tint>Semiotics</Tint> is the study of signs, symbols, and their assigned meanings.
        </Big>
        <Figure height="auto">
          <SemioticTriangle />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-3 md:gap-8">
          <li className="min-w-0 border-t-2 border-[var(--ink)] pt-5">
            <p className="type-body">
              {" "}
              An <Term tone="ink">object</Term> is the actual product being promoted.
            </p>
          </li>
          <li className="min-w-0 border-t-2 border-[var(--counter)] pt-5">
            <p className="type-body">
              {" "}
              A <Term tone="counter">sign</Term> is the sensory image or symbol representing the
              intended meaning.
            </p>
          </li>
          <li className="min-w-0 border-t-2 border-[var(--signal)] pt-5">
            <p className="type-body">
              {" "}
              An <Term>interpretant</Term> is the meaning or feeling derived by the consumer from
              the sign.
            </p>
          </li>
        </ol>
        <Ruled tone="signal" className="mt-16 w-full">
          <Statement className="!max-w-[34ch]">
            A luxury watch ad uses an image of an <Tint tone="counter">eagle</Tint> to signify{" "}
            <Tint>freedom and prestige</Tint>.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide id="discussion-sensory-signatures" border>
        <Heading kicker="Discussion:" tone="counter">
          Sensory Signatures
        </Heading>
        <Figure height="auto" className="!mt-0">
          <SensorySignatures />
        </Figure>
        <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
          <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Name a brand that you recognize instantly{" "}
            <Tint tone="counter">without seeing its name or logo</Tint>. Does it use a signature
            scent, a distinct jingle, a unique bottle shape, or a specific color?{" "}
            <Tint>How does that sensory cue build brand recall?</Tint>
          </p>
        </div>
      </Slide>
    </SlideDeck>
  );
}
