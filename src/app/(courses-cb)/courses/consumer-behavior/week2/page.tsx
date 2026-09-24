"use client";

import React from "react";
import { SlideDeck, Slide, Title } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import {
  Filters,
  SelectOrganizeInterpret,
  SensoryFlood,
  SameAdTwoImpressions,
  PerceptionFunnel,
  SightVignette,
  SoundVignette,
  SmellVignette,
  TouchVignette,
  TasteVignette,
  AbsoluteThreshold,
  FarBillboard,
  JndLadder,
  ProportionBars,
  CandyJump,
  LaptopSliver,
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

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 02 — PERCEPTION AND SENSORY MARKETING
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx (Editorial Sketch, see ../CLAUDE.md).
//
// SIGNAL marks what gets through (noticed, detected, the sense beyond sight
// and sound), COUNTER the other view (the unnoticed change, the sign).
//
// Wayfinding: once the three stages are taught, a StageRule strip lights the
// stage each later slide belongs to.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. The three stages of perception are put in order,
// the three look-alike Gestalt principles are named case by case (identify);
// thresholds and Weber's law apply one idea to a case, so they are quizzes.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** Content slides trim the section's 7rem padding so each topic reads as one screen. */
const TIGHT = "md:!py-16";

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

/**
 * A plate in a figure well. A `wide` (800-unit) plate keeps a legible minimum
 * width on phones and scrolls inside its well there; from lg up it fits.
 */
function Plate({
  children,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("figure-well w-full min-w-0 p-3", wide && "overflow-x-auto", className)}>
      {wide ? <div className="min-w-[480px] lg:min-w-0">{children}</div> : children}
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
    <div className="mb-8 w-full md:mb-10">
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
      <div className="mt-5 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/**
 * A row of ruled cells, each a verbatim line with its plate beneath. Plates
 * sit at the foot of their cell so a row of them shares one baseline.
 */
function Cells({
  cols,
  items,
  className = "",
}: {
  cols: 3 | 4 | 5;
  items: { key: string; tone: Tone; text: React.ReactNode; plate: React.ReactNode }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-10 sm:grid-cols-2 sm:gap-x-8 lg:gap-6",
        { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" }[cols],
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-4">
          <div className={cn("border-t-2 pt-4", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          <Plate className="mt-auto">{s.plate}</Plate>
        </li>
      ))}
    </ol>
  );
}

/** Exposure · Attention · Interpretation — the stage each slide belongs to. */
const STAGE_NAMES = ["Exposure", "Attention", "Interpretation"];

function StageRule({ active }: { active: number[] }) {
  return (
    <ol aria-hidden className="mb-8 grid w-full grid-cols-3 gap-2 sm:gap-4 md:mb-10">
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
      <Slide className={TIGHT} id="what-is-perception" border>
        <Heading>What Is Perception?</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-12">
          <Statement className="!text-[clamp(1.35rem,2.2vw,1.9rem)]">
            Perception is the process of <Tint>selecting</Tint>, <Tint>organizing</Tint>, and{" "}
            <Tint>interpreting</Tint> sensations.
          </Statement>
          <Plate wide>
            <SelectOrganizeInterpret />
          </Plate>
        </div>
        <div className="mt-10 grid w-full items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-4">
              <P>Raw sensory inputs reach our sensory organs every second.</P>{" "}
              <P className="mt-2">
                <Term tone="ink">Sights, sounds, smells, tastes, and textures</Term> flood our
                environment.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <SensoryFlood />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal" className="!pt-4">
              <P>
                Perception creates <Term>meaning</Term> out of this <Term tone="ink">chaos</Term>.
              </P>{" "}
              <P className="mt-2">
                Two people exposed to the <Term tone="ink">exact same advertisement</Term> often
                walk away with <Term>completely different impressions</Term>.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <SameAdTwoImpressions />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Three Stages of Perception
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-three-stages-of-perception"
        border
        exercise={exercise["the-three-stages-of-perception"]}
      >
        <StageRule active={[0, 1, 2]} />
        <Heading>The Three Stages of Perception</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-12">
          <Statement>Perception occurs in three sequential stages.</Statement>
          <Plate wide>
            <PerceptionFunnel />
          </Plate>
        </div>
        <ol className="mt-10 grid w-full gap-8 md:grid-cols-3">
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
                "min-w-0 border-t-2 pt-4",
                i === 2 ? "border-[var(--signal)]" : "border-[var(--ink)]",
              )}
            >
              <p
                className={cn(
                  "type-h2 !font-normal !text-[clamp(1.25rem,1.9vw,1.6rem)]",
                  i === 2 && "text-[var(--signal)]",
                )}
              >
                {s.stage}
              </p>{" "}
              <p className="type-body mt-3">{s.def}</p>
            </li>
          ))}
        </ol>
        <Ruled tone="ink" className="mt-10 w-full">
          <Statement className="!max-w-[46ch] !text-[clamp(1.2rem,1.8vw,1.5rem)]">
            Most stimuli get <Tint tone="ink">filtered out</Tint> during exposure and attention
            before reaching <Tint>interpretation</Tint>.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Sensory Marketing: Beyond Sight and Sound
          ================================================================ */}
      <Slide className={TIGHT} id="sensory-marketing-beyond-sight-and-sound" border>
        <StageRule active={[0]} />
        <Heading kicker="Sensory Marketing:">Beyond Sight and Sound</Heading>
        <Statement className="!max-w-[40ch]">
          Sensory marketing engages the consumer&apos;s <Tint>senses</Tint> to influence their
          feelings and choices.
        </Statement>
        <Cells
          cols={5}
          className="mt-10"
          items={[
            {
              key: "sight",
              tone: "ink",
              plate: <SightVignette />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Sight</Term> creates visual identity, package recognition, and
                  color associations.
                </>
              ),
            },
            {
              key: "sound",
              tone: "ink",
              plate: <SoundVignette />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Sound</Term> shapes shopping tempo and brand memory through
                  musical jingles.
                </>
              ),
            },
            {
              key: "smell",
              tone: "signal",
              plate: <SmellVignette />,
              text: (
                <>
                  {" "}
                  <Term>Smell</Term> connects directly to the limbic system, triggering emotional
                  memories.
                </>
              ),
            },
            {
              key: "touch",
              tone: "signal",
              plate: <TouchVignette />,
              text: (
                <>
                  {" "}
                  <Term>Touch</Term>, also called haptics, builds psychological ownership when
                  consumers hold an item.
                </>
              ),
            },
            {
              key: "taste",
              tone: "signal",
              plate: <TasteVignette />,
              text: (
                <>
                  {" "}
                  <Term>Taste</Term> drives loyalty in food and beverage markets through distinct
                  flavor profiles.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Sensory Thresholds: The Limits of Awareness
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sensory-thresholds-the-limits-of-awareness"
        border
        exercise={exercise["sensory-thresholds-the-limits-of-awareness"]}
      >
        <StageRule active={[0]} />
        <Heading kicker="Sensory Thresholds:">The Limits of Awareness</Heading>
        <Lead>Senses have physical and psychological limits.</Lead>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "absolute",
              tone: "signal",
              plate: <AbsoluteThreshold />,
              text: (
                <>
                  The <Term>absolute threshold</Term> is the minimum amount of stimulation a person
                  can detect on a sensory channel.
                </>
              ),
            },
            {
              key: "billboard",
              tone: "ink",
              plate: <FarBillboard />,
              text: (
                <>
                  A billboard with tiny text placed far from a highway falls{" "}
                  <Term>below the absolute threshold</Term> of drivers.
                </>
              ),
            },
            {
              key: "differential",
              tone: "counter",
              plate: <JndLadder />,
              text: (
                <>
                  The <Term tone="counter">differential threshold</Term> is the ability of a
                  sensory system to detect changes or differences between two stimuli.{" "}
                  <span className="mt-2 block">
                    The minimum difference between two stimuli needed for detection is called the{" "}
                    <Term>Just Noticeable Difference, or JND</Term>.
                  </span>
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Weber's Law: When Differences Matter
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="webers-law-when-differences-matter"
        border
        exercise={exercise["webers-law-when-differences-matter"]}
      >
        <StageRule active={[0]} />
        <Heading kicker="Weber's Law:">When Differences Matter</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Statement className="!max-w-[36ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
              Weber&apos;s Law states that the <Tint tone="ink">stronger the initial stimulus</Tint>,
              the <Tint>greater the change</Tint> must be for people to notice it.
            </Statement>{" "}
            <P className="mt-5">
              The needed change is not a fixed amount. It is a{" "}
              <Term>constant proportion</Term> of the initial intensity.
            </P>
          </div>
          <Plate className="max-w-[440px] lg:justify-self-end">
            <ProportionBars />
          </Plate>
        </div>
        <Cells
          cols={4}
          className="mt-10"
          items={[
            {
              key: "candy",
              tone: "signal",
              plate: <CandyJump />,
              text: (
                <>
                  A ten-cent price increase on a one-dollar candy bar is{" "}
                  <Term>noticeable right away</Term> because it is a ten percent jump.
                </>
              ),
            },
            {
              key: "laptop",
              tone: "ink",
              plate: <LaptopSliver />,
              text: (
                <>
                  A ten-cent price increase on a thousand-dollar laptop will go{" "}
                  <Term tone="ink">completely unnoticed</Term>.
                </>
              ),
            },
            {
              key: "below",
              tone: "counter",
              plate: <StayBelow />,
              text: (
                <>
                  Marketers <Term tone="counter">stay below the JND</Term> when shrinking package
                  sizes or raising prices slightly.
                </>
              ),
            },
            {
              key: "exceed",
              tone: "signal",
              plate: <Exceed />,
              text: (
                <>
                  Marketers <Term>exceed the JND</Term> when redesigning a package or announcing a
                  major discount.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Attention: The Battle for Mental Energy
          ================================================================ */}
      <Slide className={TIGHT} id="attention-the-battle-for-mental-energy" border>
        <StageRule active={[1]} />
        <Heading kicker="Attention:">The Battle for Mental Energy</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-12">
          <Big className="!text-[clamp(1.3rem,2vw,1.75rem)]">
            Consumers face <Tint>sensory overload</Tint> from thousands of ads, notifications, and
            store displays every day.
          </Big>
          <Plate wide>
            <Overload />
          </Plate>
        </div>
        <Cells
          cols={4}
          className="mt-10"
          items={[
            {
              key: "selective",
              tone: "ink",
              plate: <SkipAd />,
              text: (
                <>
                  <Term tone="ink">Selective exposure</Term> means consumers choose what media and
                  messages they see or avoid.
                </>
              ),
            },
            {
              key: "vigilance",
              tone: "signal",
              plate: <Vigilance />,
              text: (
                <>
                  <Term>Perceptual vigilance</Term> means consumers notice stimuli that relate to
                  their current needs. A hungry person notices restaurant signs.
                </>
              ),
            },
            {
              key: "defense",
              tone: "signal",
              plate: <Defense />,
              text: (
                <>
                  <Term>Perceptual defense</Term> means consumers screen out threatening or
                  contradictory messages. Heavy smokers often ignore warning labels on cigarette
                  packs.
                </>
              ),
            },
            {
              key: "adaptation",
              tone: "ink",
              plate: <Adaptation />,
              text: (
                <>
                  <Term tone="ink">Adaptation</Term> occurs when consumers no with time stop paying
                  attention to familiar stimuli.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Interpretation and Gestalt Principles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="interpretation-and-gestalt-principles"
        border
        exercise={exercise["interpretation-and-gestalt-principles"]}
      >
        <StageRule active={[2]} />
        <Heading>Interpretation and Gestalt Principles</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Statement className="!max-w-[36ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
              People do not interpret stimuli in isolation.{" "}
              <Tint>They organize them into patterns.</Tint>
            </Statement>{" "}
            <P className="mt-5">
              <Term tone="ink">Gestalt psychology</Term> explains how people construct whole
              meanings from individual elements.
            </P>
          </div>
          <Plate className="max-w-[440px] lg:justify-self-end">
            <WholeFromParts />
          </Plate>
        </div>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "closure",
              tone: "signal",
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
              key: "similarity",
              tone: "signal",
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
              key: "figure-ground",
              tone: "signal",
              plate: <FigureGround />,
              text: (
                <>
                  {" "}
                  The <Term>Figure-Ground</Term> principle means people separate a main focal
                  object from its background.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Semiotics: The Meaning of Marketing Messages
          ================================================================ */}
      <Slide className={TIGHT} id="semiotics-the-meaning-of-marketing-messages" border>
        <StageRule active={[2]} />
        <Heading kicker="Semiotics:">The Meaning of Marketing Messages</Heading>
        {/* The triangle sits beside the lines it draws; on phones it follows
            the definition of semiotics, before the three parts. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-x-12">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
            <Lead>Marketers design ads to send symbolic messages to buyers.</Lead>
            <Big className="mt-5 !text-[clamp(1.3rem,2vw,1.75rem)]">
              <Tint>Semiotics</Tint> is the study of signs, symbols, and their assigned meanings.
            </Big>
          </div>
          <Plate wide className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <SemioticTriangle />
          </Plate>
          <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
            <ol className="grid w-full gap-4">
              <li className="min-w-0 border-t-2 border-[var(--ink)] pt-3">
                <p className="type-body">
                  {" "}
                  An <Term tone="ink">object</Term> is the actual product being promoted.
                </p>
              </li>
              <li className="min-w-0 border-t-2 border-[var(--counter)] pt-3">
                <p className="type-body">
                  {" "}
                  A <Term tone="counter">sign</Term> is the sensory image or symbol representing
                  the intended meaning.
                </p>
              </li>
              <li className="min-w-0 border-t-2 border-[var(--signal)] pt-3">
                <p className="type-body">
                  {" "}
                  An <Term>interpretant</Term> is the meaning or feeling derived by the consumer
                  from the sign.
                </p>
              </li>
            </ol>
          </div>
        </div>
        <Ruled tone="signal" className="mt-10 w-full">
          <Statement className="!max-w-[46ch] !text-[clamp(1.2rem,1.8vw,1.5rem)]">
            A luxury watch ad uses an image of an <Tint tone="counter">eagle</Tint> to signify{" "}
            <Tint>freedom and prestige</Tint>.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-sensory-signatures" border>
        <Heading kicker="Discussion:" tone="counter">
          Sensory Signatures
        </Heading>
        <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-8 md:px-12 md:py-10">
          <p className="type-quote !text-[clamp(1.3rem,2.2vw,1.9rem)] max-w-[52ch]">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Name a brand that you recognize instantly{" "}
            <Tint tone="counter">without seeing its name or logo</Tint>. Does it use a signature
            scent, a distinct jingle, a unique bottle shape, or a specific color?{" "}
            <Tint>How does that sensory cue build brand recall?</Tint>
          </p>
        </div>
        <Plate wide className="mt-8">
          <SensorySignatures />
        </Plate>
      </Slide>
    </SlideDeck>
  );
}
