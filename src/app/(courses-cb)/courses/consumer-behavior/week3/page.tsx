"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
import {
  BrainBrands,
  ExperienceChanges,
  DirectTry,
  IndirectWatch,
  UpdateLoop,
  HabitWeek,
  Pavlov,
  ConditioningFlow,
  RepetitionCurve,
  GeneralizationChart,
  CopyCat,
  SpotTheDifference,
  InstrumentalMatrix,
  LoyaltyPoints,
  HeadacheGone,
  LateFee,
  LearnByWatching,
  AttendModel,
  RememberModel,
  CopyPurchase,
  MemoryStorageFlow,
  Chunking,
  SpiderWeb,
  BrandAssociativeNetwork,
  SpreadingActivation,
  StrongLinks,
  Retrieve,
  RetrievalCues,
  GreenBox,
  MoodMatch,
  ForgettingCurve,
  Interference,
  Retroactive,
  Proactive,
  FightForgetting,
  YourBrandWeb,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 03 — LEARNING AND MEMORY
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// SIGNAL marks what is learned, lit or recalled; COUNTER the brand itself and
// the other side of a contrast (wear-out, discrimination, the discussion).
//
// Wayfinding: the title line says people "learn, remember, and forget", so a
// PhaseRule strip lights the one of those three each later slide belongs to.
//
// Quizzes: `Slide` renders `quizData` AFTER its section, so each [quiz]-tagged
// topic carries its own quiz, testing that slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

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
    <p className={cn("gsap-reveal type-body max-w-[var(--measure)]", className)}>{children}</p>
  );
}

/** A line promoted to lead size. */
function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("gsap-reveal type-lead max-w-[48ch]", className)}>{children}</p>;
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("gsap-reveal type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("gsap-reveal type-h2 !font-normal", className)}>{children}</p>;
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
    <div className={cn("gsap-reveal min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/** A plate that lives in a column: a figure well without the 680px floor. */
function Plate({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("gsap-reveal figure-well w-full min-w-0 p-3 sm:p-5", className)}>
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
    <div className="gsap-reveal mb-10 w-full md:mb-14">
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

/** Learn · Remember · Forget — the words of the title line. */
const PHASES = ["Learn", "Remember", "Forget"];

function PhaseRule({ active }: { active: number[] }) {
  return (
    <ol aria-hidden className="gsap-reveal mb-12 grid w-full grid-cols-3 gap-2 md:mb-16 sm:gap-4">
      {PHASES.map((name, i) => {
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

/** A numbered column; the numeral comes from CSS so the sentence stays whole. */
function Step({
  n,
  tone = "ink",
  children,
  className = "",
}: {
  n: number;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      data-n={String(n)}
      className={cn(
        "gsap-reveal min-w-0 border-t-2 pt-5 before:mb-3 before:block before:font-[family-name:var(--font-heading)] before:text-[1.6rem] before:leading-none before:content-[attr(data-n)]",
        BORDER[tone],
        tone === "signal" ? "before:text-[var(--signal)]" : "before:text-[var(--ink-3)]",
        className,
      )}
    >
      {children}
    </li>
  );
}

/** One consequence of a behaviour: the line and a small scene. */
function OutcomeRow({
  tone,
  plate,
  children,
}: {
  tone: Tone;
  plate: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "gsap-reveal grid min-w-0 items-center gap-6 border-t-2 pt-6 md:grid-cols-[1fr_minmax(0,22rem)] md:gap-12",
        BORDER[tone],
      )}
    >
      <p className="type-h2 !font-normal !text-[clamp(1.25rem,2vw,1.7rem)]">{children}</p>
      <div className="figure-well w-full min-w-0 p-3">{plate}</div>
    </li>
  );
}

export default function Week3() {
  return (
    <SlideDeck label="Week 03">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="gsap-reveal type-label !text-[0.8rem] !text-[var(--signal)]">
              Week 03
            </p>
            <p className="gsap-reveal type-caption mt-2">Consumer Behavior · Davood Wadi, PhD</p>
            <Title className="mt-8 !max-w-[14ch]">Learning and Memory</Title>
            <div className="gsap-reveal mt-10 max-w-[34ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                Brands live in the <Tint>brain</Tint>.{" "}
                <span className="text-[var(--ink-3)]">How people </span>
                <Tint tone="ink">learn, remember, and forget</Tint>
                <span className="text-[var(--ink-3)]"> shapes every purchase.</span>
              </p>
            </div>
          </div>
          <div className="gsap-reveal mx-auto w-full max-w-[340px]">
            <BrainBrands />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is Consumer Learning?
          ================================================================ */}
      <Slide id="what-is-consumer-learning" border>
        <PhaseRule active={[0]} />
        <Heading>What Is Consumer Learning?</Heading>
        <Statement className="!max-w-[34ch]">
          Learning is a <Tint>permanent change in behavior</Tint> caused by{" "}
          <Tint tone="ink">experience</Tint>.
        </Statement>
        <Figure height="auto">
          <ExperienceChanges />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                The experience can be <Term>direct</Term>. You try a new snack and like the taste.
              </>
            }
            plate={<DirectTry />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                The experience can also be <Term>indirect</Term>. You see an ad or watch a friend
                buy running shoes.
              </>
            }
            plate={<IndirectWatch />}
          />
        </Columns>
        <Pair plate={<UpdateLoop />} className="mt-20">
          <Ruled tone="ink">
            <Lead>
              Learning is an <Term tone="ink">ongoing process</Term>. Consumers constantly update
              their knowledge when they see new products.
            </Lead>
          </Ruled>
        </Pair>
        <Ruled tone="signal" className="mt-20 w-full">
          <Big className="max-w-[44ch]">
            Marketers study learning so that brand names become{" "}
            <Tint>automatic habits</Tint> in the mind of the buyer.
          </Big>
        </Ruled>
        <Figure height="auto">
          <HabitWeek />
        </Figure>
      </Slide>

      {/* ================================================================
          Classical Conditioning: Pairing Stimuli
          ================================================================ */}
      <Slide
        id="classical-conditioning-pairing-stimuli"
        border
        quizData={quiz["classical-conditioning-pairing-stimuli"]}
      >
        <PhaseRule active={[0]} />
        <Heading kicker="Classical Conditioning:">Pairing Stimuli</Heading>
        <Pair plate={<Pavlov />}>
          <Statement>
            Classical conditioning happens when a stimulus that brings a{" "}
            <Tint>natural response</Tint> pairs with a <Tint tone="counter">neutral stimulus</Tint>.
          </Statement>{" "}
          <P className="mt-8">
            <Term tone="ink">Ivan Pavlov</Term> first demonstrated this with dogs, meat powder, and
            a bell.
          </P>
        </Pair>
        <ol className="mt-16 grid w-full gap-10 md:grid-cols-3 md:gap-8">
          <Step n={1}>
            <p className="type-body">
              {" "}
              In marketing, an <Term tone="ink">unconditioned stimulus</Term> like upbeat music
              naturally triggers positive feelings.
            </p>
          </Step>
          <Step n={2}>
            <p className="type-body">
              {" "}
              A brand <Term tone="ink">pairs</Term> this music with its logo or product
              repeatedly.
            </p>
          </Step>
          <Step n={3} tone="signal">
            <p className="type-body">
              {" "}
              Over time, seeing the brand alone produces the positive feeling. This is a{" "}
              <Term>conditioned response</Term>.
            </p>
          </Step>
        </ol>
        <Figure height="auto">
          <ConditioningFlow />
        </Figure>
      </Slide>

      {/* ================================================================
          Repetition and Stimulus Generalization
          ================================================================ */}
      <Slide
        id="repetition-and-stimulus-generalization"
        border
        quizData={quiz["repetition-and-stimulus-generalization"]}
      >
        <PhaseRule active={[0]} />
        <Heading>Repetition and Stimulus Generalization</Heading>
        <Columns>
          <Ruled tone="signal">
            <Lead>
              Conditioning needs <Term>repetition</Term>. Repeated exposures prevent memory decay
              and strengthen the link.
            </Lead>
          </Ruled>
          <Ruled tone="counter">
            <Lead>
              Too much repetition causes <Term tone="counter">advertising wear-out</Term>.
              Consumers tune out or get annoyed.
            </Lead>
          </Ruled>
        </Columns>
        <Figure height="auto">
          <RepetitionCurve />
        </Figure>
        <Big className="mt-10 max-w-[42ch]">
          <Tint>Stimulus generalization</Tint> happens when similar stimuli trigger the same
          learned response.
        </Big>
        <Figure height="auto">
          <GeneralizationChart />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Store brands</Term> use this principle. They copy the package colors and
                fonts of national brand leaders.
              </>
            }
            plate={<CopyCat />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Stimulus discrimination</Term> occurs when a brand teaches
                consumers to spot unique differences between products.
              </>
            }
            plate={<SpotTheDifference />}
          />
        </Columns>
      </Slide>

      {/* ================================================================
          Instrumental Conditioning: Rewards and Punishments
          ================================================================ */}
      <Slide id="instrumental-conditioning-rewards-and-punishments" border>
        <PhaseRule active={[0]} />
        <Heading kicker="Instrumental Conditioning:">Rewards and Punishments</Heading>
        <Lead className="text-[var(--ink-3)]">
          Instrumental conditioning is also called <Term tone="ink">operant conditioning</Term>.
        </Lead>
        <Statement className="mt-10 !max-w-[34ch]">
          People learn to <Tint>perform</Tint> behaviors that produce positive outcomes and{" "}
          <Tint tone="ink">avoid</Tint> negative outcomes.
        </Statement>
        <Figure height="auto">
          <InstrumentalMatrix />
        </Figure>
        <ol className="flex w-full flex-col gap-10">
          <OutcomeRow tone="signal" plate={<LoyaltyPoints />}>
            {" "}
            <Term>Positive reinforcement</Term> rewards good behavior. Loyalty points and
            thank-you discounts encourage repeat visits.
          </OutcomeRow>
          <OutcomeRow tone="signal" plate={<HeadacheGone />}>
            {" "}
            <Term>Negative reinforcement</Term> shows how a product removes a negative state.
            Taking medicine removes a headache.
          </OutcomeRow>
          <OutcomeRow tone="ink" plate={<LateFee />}>
            {" "}
            <Term tone="ink">Punishment</Term> occurs when an unpleasant event follows an action.
            Late fees teach consumers not to pay bills late.
          </OutcomeRow>
        </ol>
      </Slide>

      {/* ================================================================
          Observational Learning: Watching Others
          ================================================================ */}
      <Slide
        id="observational-learning-watching-others"
        border
        quizData={quiz["observational-learning-watching-others"]}
      >
        <PhaseRule active={[0]} />
        <Heading kicker="Observational Learning:">Watching Others</Heading>
        <Statement className="!max-w-[36ch]">
          Consumers do not learn only from personal rewards.{" "}
          <Tint>They also learn by watching other people.</Tint>
        </Statement>
        <Figure height="auto">
          <LearnByWatching />
        </Figure>
        <Big className="max-w-[40ch]">
          This process is called <Tint>observational learning</Tint> or <Tint>modeling</Tint>.
        </Big>
        <ol className="mt-16 grid w-full gap-12 lg:grid-cols-3 lg:gap-8">
          {[
            {
              key: "attention",
              plate: <AttendModel />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">First</Term>, the consumer directs attention to an attractive or
                  credible model.
                </>
              ),
            },
            {
              key: "memory",
              plate: <RememberModel />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Second</Term>, the consumer remembers what the model says or
                  does.
                </>
              ),
            },
            {
              key: "action",
              plate: <CopyPurchase />,
              text: (
                <>
                  {" "}
                  <Term>Third</Term>, the consumer converts this memory into action by purchasing
                  the same clothing, phone, or car.
                </>
              ),
            },
          ].map((s, i) => (
            <li key={s.key} className="gsap-reveal flex min-w-0 flex-col gap-6">
              <div className="figure-well w-full min-w-0 p-3">{s.plate}</div>
              <div
                className={cn(
                  "border-t-2 pt-5",
                  i === 2 ? "border-[var(--signal)]" : "border-[var(--ink)]",
                )}
              >
                <p className="type-body">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          The Memory System: Three Stores
          ================================================================ */}
      <Slide
        id="the-memory-system-three-stores"
        border
        quizData={quiz["the-memory-system-three-stores"]}
      >
        <PhaseRule active={[1]} />
        <Heading kicker="The Memory System:">Three Stores</Heading>
        <Statement className="!max-w-[34ch]">
          Memory is the process of <Tint>acquiring</Tint> information and{" "}
          <Tint>storing</Tint> it over time for later use.
        </Statement>
        <Figure height="auto">
          <MemoryStorageFlow />
        </Figure>
        <div className="grid w-full gap-12 lg:grid-cols-3 lg:gap-8">
          <Ruled tone="ink">
            <P>
              <Term tone="ink">Sensory memory</Term> holds brief sensory inputs for a few seconds.
              If an ad gets attention, it moves forward.
            </P>
          </Ruled>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled tone="ink">
              <P>
                <Term tone="ink">Short-term memory</Term> holds a small amount of information in
                active consciousness for about twenty seconds.
              </P>
            </Ruled>{" "}
            <Ruled tone="signal">
              <P>
                <Term>Chunking</Term> helps short-term memory. Brands group phone numbers or slogan
                words into memorable chunks.
              </P>
            </Ruled>
            <Plate>
              <Chunking />
            </Plate>
          </div>
          <Ruled tone="signal">
            <P>
              <Term>Long-term memory</Term> retains information for days, months, or years
              through elaborative rehearsal.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Associative Networks and Brand Nodes
          ================================================================ */}
      <Slide id="associative-networks-and-brand-nodes" border>
        <PhaseRule active={[1]} />
        <Heading>Associative Networks and Brand Nodes</Heading>
        <Pair plate={<SpiderWeb />}>
          <Statement>
            Long-term memory stores knowledge as an <Tint>associative network</Tint>.
          </Statement>{" "}
          <P className="mt-8">
            Think of memory as a <Term tone="ink">spider web of connected nodes</Term>. Each node
            represents a concept, brand, or feeling.
          </P>
        </Pair>
        <Big className="mt-20 max-w-[44ch]">
          When you think of a brand like Nike, related nodes <Tint>light up</Tint>: running,
          sneakers, athletes, and Just Do It.
        </Big>
        <Figure height="auto">
          <BrandAssociativeNetwork />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Lead className="!max-w-[56ch]">
            <Term>Spreading activation</Term> happens when one memory node triggers nearby
            connected nodes.
          </Lead>
        </Ruled>
        <Figure height="auto">
          <SpreadingActivation />
        </Figure>
        <Pair plate={<StrongLinks />}>
          <Statement>
            Strong positive links make a brand <Tint>easy to recall</Tint> when standing in a store
            aisle.
          </Statement>
        </Pair>
      </Slide>

      {/* ================================================================
          Brand Retrieval and Cues in the Aisle
          ================================================================ */}
      <Slide id="brand-retrieval-and-cues-in-the-aisle" border>
        <PhaseRule active={[1]} />
        <Heading>Brand Retrieval and Cues in the Aisle</Heading>
        <Pair plate={<Retrieve />}>
          <Statement>
            Having information in memory is useless if the buyer{" "}
            <Tint>cannot retrieve it</Tint> at the point of purchase.
          </Statement>{" "}
          <P className="mt-8">
            <Term tone="ink">Retrieval</Term> is the process of accessing information from
            long-term memory.
          </P>
        </Pair>
        <Big className="mt-20 max-w-[44ch]">
          <Tint>Retrieval cues</Tint> trigger brand memories. Packaging shapes, colors, and logos
          act as visual retrieval cues.
        </Big>
        <Figure height="auto">
          <RetrievalCues />
        </Figure>
        <Ruled tone="ink" className="w-full">
          <Lead className="!max-w-[58ch]">
            If an ad shows a distinct green box, using that <Term>exact green box</Term> on the
            shelf helps shoppers find the product.
          </Lead>
        </Ruled>
        <Figure height="auto">
          <GreenBox />
        </Figure>
        <Pair plate={<MoodMatch />}>
          <Ruled tone="signal">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              <Term>State-dependent retrieval</Term> means buyers remember ad messages better when
              their internal mood matches the ad.
            </P>
          </Ruled>
        </Pair>
      </Slide>

      {/* ================================================================
          Why Consumers Forget
          ================================================================ */}
      <Slide id="why-consumers-forget" border>
        <PhaseRule active={[2]} />
        <Heading>Why Consumers Forget</Heading>
        <Statement className="!max-w-[34ch]">
          Forgetting is normal. Memory traces <Tint>fade over time</Tint> through decay.
        </Statement>
        <Figure height="auto">
          <ForgettingCurve />
        </Figure>
        <Pair plate={<Interference />}>
          <Ruled tone="ink">
            <Lead>
              <Term tone="ink">Interference</Term> also causes forgetting. New brand ads displace
              memories of older brand messages.
            </Lead>
          </Ruled>
        </Pair>
        <Columns className="mt-20">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Retroactive interference</Term> occurs when new learning displaces old
                information.
              </>
            }
            plate={<Retroactive />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Proactive interference</Term> occurs when older habits make it hard to learn a
                new brand name.
              </>
            }
            plate={<Proactive />}
          />
        </Columns>
        <Ruled tone="counter" className="mt-20 w-full">
          <Big className="max-w-[44ch]">
            Marketers <Tint tone="counter">fight forgetting</Tint> with consistent visual identity,
            reminder ads, and clear shelf placement.
          </Big>
        </Ruled>
        <Figure height="auto">
          <FightForgetting />
        </Figure>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide id="discussion-your-brand-web" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Brand Web
        </Heading>
        <Figure height="auto" className="!mt-0">
          <YourBrandWeb />
        </Figure>
        <div className="gsap-reveal relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
          <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Pick a brand you buy regularly.{" "}
            <Tint tone="counter">What four associations pop into your mind first?</Tint> Did the
            brand teach you these links through conditioning, observation, or personal experience?
          </p>
        </div>
      </Slide>
    </SlideDeck>
  );
}
