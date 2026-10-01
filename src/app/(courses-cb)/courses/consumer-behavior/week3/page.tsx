"use client";

import React from "react";
import { SlideDeck, Slide, Title } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import {
  BrainBrands,
  ExperienceChanges,
  DirectTry,
  IndirectWatch,
  UpdateLoop,
  HabitWeek,
  Pavlov,
  MusicFeeling,
  PairedRepeatedly,
  BrandAlone,
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
  AssistantShortList,
  WebFromReviews,
  CueInQuestion,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 03 — LEARNING AND MEMORY
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx (Editorial Sketch, see ../CLAUDE.md).
//
// Colour is rare (see the root CLAUDE.md): each slide gives SIGNAL to at most
// one phrase, its key idea; defined terms are bold ink and every rule is ink.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. The parts of classical conditioning are matched to
// a new campaign; repetition, wear-out, generalization and discrimination are
// told apart case by case (identify), as are the three memory stores; the
// moments of observational learning are sorted into its three steps.
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
function Term({ children, tone = "ink" }: { children: React.ReactNode; tone?: Tone }) {
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
      <h2 className="type-h1 max-w-[40ch]">
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-4 block !text-[0.8rem]",
                "!text-[var(--ink-3)]",
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

/** Lines on the left, a plate on the right; on phones the plate follows the lines. */
function Lede({
  children,
  plate,
  wide = false,
  cols = "lg:grid-cols-[1fr_1.9fr]",
}: {
  children: React.ReactNode;
  plate: React.ReactNode;
  wide?: boolean;
  cols?: string;
}) {
  return (
    <div className={cn("grid w-full items-center gap-8 lg:gap-12", cols)}>
      <div className="min-w-0">{children}</div>
      <Plate wide={wide} className={wide ? "" : "lg:max-w-[440px] lg:justify-self-end"}>
        {plate}
      </Plate>
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
  cols: 3 | 4;
  items: { key: string; tone: Tone; text: React.ReactNode; plate?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-10 sm:grid-cols-2 sm:gap-x-8 lg:gap-6",
        { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[cols],
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-4">
          <div className={cn("border-t-2 pt-4", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          {s.plate ? <Plate className="mt-auto">{s.plate}</Plate> : null}
        </li>
      ))}
    </ol>
  );
}

/** A lede line sized to share a row with a wide plate. */
const LEDE = "!text-[clamp(1.3rem,2vw,1.75rem)]";

export default function Week3() {
  return (
    <SlideDeck label="Week 03">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 03
            </p>
            <p className="type-caption mt-2">Consumer Behavior · Davood Wadi, PhD</p>
            <Title className="mt-8 !max-w-[14ch]">Learning and Memory</Title>
            <div className="mt-10 max-w-[34ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                Brands live in the <Tint>brain</Tint>.{" "}
                <span className="text-[var(--ink-3)]">How people </span>
                <Tint tone="ink">learn, remember, and forget</Tint>
                <span className="text-[var(--ink-3)]"> shapes every purchase.</span>
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[340px]">
            <BrainBrands />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is Consumer Learning?
          ================================================================ */}
      <Slide className={TIGHT} id="what-is-consumer-learning" border>
        <Heading>What Is Consumer Learning?</Heading>
        <Lede wide plate={<ExperienceChanges />}>
          <Statement className={LEDE}>
            Learning is a <Tint>permanent change in behavior</Tint> caused by{" "}
            <Tint tone="ink">experience</Tint>.
          </Statement>
        </Lede>
        <Cells
          cols={4}
          className="mt-10"
          items={[
            {
              key: "direct",
              tone: "ink",
              plate: <DirectTry />,
              text: (
                <>
                  The experience can be <Term>direct</Term>. You try a new snack and like the taste.
                </>
              ),
            },
            {
              key: "indirect",
              tone: "ink",
              plate: <IndirectWatch />,
              text: (
                <>
                  The experience can also be <Term>indirect</Term>. You see an ad or watch a friend
                  buy running shoes.
                </>
              ),
            },
            {
              key: "ongoing",
              tone: "ink",
              plate: <UpdateLoop />,
              text: (
                <>
                  Learning is an <Term>ongoing process</Term>. Consumers constantly update
                  their knowledge when they see new products.
                </>
              ),
            },
            {
              key: "habits",
              tone: "ink",
              plate: <HabitWeek />,
              text: (
                <>
                  Marketers study learning so that brand names become{" "}
                  <Term>automatic habits</Term> in the mind of the buyer.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Classical Conditioning: Pairing Stimuli
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="classical-conditioning-pairing-stimuli"
        border
        exercise={exercise["classical-conditioning-pairing-stimuli"]}
      >
        <Heading kicker="Classical Conditioning:">Pairing Stimuli</Heading>
        <Lede plate={<Pavlov />} cols="lg:grid-cols-[1.3fr_1fr]">
          <Statement className={cn(LEDE, "!max-w-[36ch]")}>
            Classical conditioning happens when a stimulus that brings a{" "}
            natural response pairs with a neutral stimulus.
          </Statement>{" "}
          <P className="mt-5">
            <Term>Ivan Pavlov</Term> first demonstrated this with dogs, meat powder, and
            a bell.
          </P>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "unconditioned",
              tone: "ink",
              plate: <MusicFeeling />,
              text: (
                <>
                  {" "}
                  In marketing, an <Term>unconditioned stimulus</Term> like upbeat music
                  naturally triggers positive feelings.
                </>
              ),
            },
            {
              key: "pairs",
              tone: "ink",
              plate: <PairedRepeatedly />,
              text: (
                <>
                  {" "}
                  A brand <Term>pairs</Term> this music with its logo or product
                  repeatedly.
                </>
              ),
            },
            {
              key: "conditioned",
              tone: "ink",
              plate: <BrandAlone />,
              text: (
                <>
                  {" "}
                  Over time, seeing the brand alone produces the positive feeling. This is a{" "}
                  <Term>conditioned response</Term>.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Repetition and Stimulus Generalization
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="repetition-and-stimulus-generalization"
        border
        exercise={exercise["repetition-and-stimulus-generalization"]}
      >
        <Heading>Repetition and Stimulus Generalization</Heading>
        <Lede wide plate={<RepetitionCurve />}>
          <Ruled tone="ink" className="!pt-4">
            <P>
              Conditioning needs <Term>repetition</Term>. Repeated exposures prevent memory decay
              and strengthen the link.
            </P>
          </Ruled>
          <Ruled tone="ink" className="mt-6 !pt-4">
            <P>
              Too much repetition causes <Term>advertising wear-out</Term>.
              Consumers tune out or get annoyed.
            </P>
          </Ruled>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "generalization",
              tone: "ink",
              plate: <GeneralizationChart />,
              text: (
                <>
                  <Term>Stimulus generalization</Term> happens when similar stimuli trigger the same
                  learned response.
                </>
              ),
            },
            {
              key: "store-brands",
              tone: "ink",
              plate: <CopyCat />,
              text: (
                <>
                  <Term>Store brands</Term> use this principle. They copy the package colors and
                  fonts of national brand leaders.
                </>
              ),
            },
            {
              key: "discrimination",
              tone: "ink",
              plate: <SpotTheDifference />,
              text: (
                <>
                  <Term>Stimulus discrimination</Term> occurs when a brand teaches
                  consumers to spot unique differences between products.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Instrumental Conditioning: Rewards and Punishments
          ================================================================ */}
      <Slide className={TIGHT} id="instrumental-conditioning-rewards-and-punishments" border>
        <Heading kicker="Instrumental Conditioning:">Rewards and Punishments</Heading>
        <Lede plate={<InstrumentalMatrix />} cols="lg:grid-cols-[1fr_1.2fr]">
          <Lead className="text-[var(--ink-3)]">
            Instrumental conditioning is also called <Term>operant conditioning</Term>.
          </Lead>{" "}
          <Statement className={cn(LEDE, "mt-5 !max-w-[34ch]")}>
            People learn to <Tint>perform</Tint> behaviors that produce positive outcomes and{" "}
            <Tint tone="ink">avoid</Tint> negative outcomes.
          </Statement>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "positive",
              tone: "ink",
              plate: <LoyaltyPoints />,
              text: (
                <>
                  {" "}
                  <Term>Positive reinforcement</Term> rewards good behavior. Loyalty points and
                  thank-you discounts encourage repeat visits.
                </>
              ),
            },
            {
              key: "negative",
              tone: "ink",
              plate: <HeadacheGone />,
              text: (
                <>
                  {" "}
                  <Term>Negative reinforcement</Term> shows how a product removes a negative state.
                  Taking medicine removes a headache.
                </>
              ),
            },
            {
              key: "punishment",
              tone: "ink",
              plate: <LateFee />,
              text: (
                <>
                  {" "}
                  <Term>Punishment</Term> occurs when an unpleasant event follows an
                  action. Late fees teach consumers not to pay bills late.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Observational Learning: Watching Others
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="observational-learning-watching-others"
        border
        exercise={exercise["observational-learning-watching-others"]}
      >
        <Heading kicker="Observational Learning:">Watching Others</Heading>
        <Lede plate={<LearnByWatching />} cols="lg:grid-cols-[1fr_1.3fr]">
          <Statement className={cn(LEDE, "!max-w-[36ch]")}>
            Consumers do not learn only from personal rewards.{" "}
            They also learn by watching other people.
          </Statement>{" "}
          <Big className="mt-5 !text-[clamp(1.15rem,1.7vw,1.45rem)]">
            This process is called <Tint>observational learning</Tint> or <Tint>modeling</Tint>.
          </Big>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "attention",
              tone: "ink",
              plate: <AttendModel />,
              text: (
                <>
                  {" "}
                  <Term>First</Term>, the consumer directs attention to an attractive or
                  credible model.
                </>
              ),
            },
            {
              key: "memory",
              tone: "ink",
              plate: <RememberModel />,
              text: (
                <>
                  {" "}
                  <Term>Second</Term>, the consumer remembers what the model says or
                  does.
                </>
              ),
            },
            {
              key: "action",
              tone: "ink",
              plate: <CopyPurchase />,
              text: (
                <>
                  {" "}
                  <Term>Third</Term>, the consumer converts this memory into action by purchasing
                  the same clothing, phone, or car.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          The Memory System: Three Stores
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-memory-system-three-stores"
        border
        exercise={exercise["the-memory-system-three-stores"]}
      >
        <Heading kicker="The Memory System:">Three Stores</Heading>
        <Lede wide plate={<MemoryStorageFlow />}>
          <Statement className={LEDE}>
            Memory is the process of <Tint>acquiring</Tint> information and{" "}
            <Tint>storing</Tint> it over time for later use.
          </Statement>
        </Lede>
        <Cells
          cols={4}
          className="mt-10"
          items={[
            {
              key: "sensory",
              tone: "ink",
              text: (
                <>
                  <Term>Sensory memory</Term> holds brief sensory inputs for a few
                  seconds. If an ad gets attention, it moves forward.
                </>
              ),
            },
            {
              key: "short-term",
              tone: "ink",
              text: (
                <>
                  <Term>Short-term memory</Term> holds a small amount of information in
                  active consciousness for about twenty seconds.
                </>
              ),
            },
            {
              key: "chunking",
              tone: "ink",
              plate: <Chunking />,
              text: (
                <>
                  <Term>Chunking</Term> helps short-term memory. Brands group phone numbers or slogan
                  words into memorable chunks.
                </>
              ),
            },
            {
              key: "long-term",
              tone: "ink",
              text: (
                <>
                  <Term>Long-term memory</Term> retains information for days, months, or years
                  through elaborative rehearsal.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Associative Networks and Brand Nodes
          ================================================================ */}
      <Slide className={TIGHT} id="associative-networks-and-brand-nodes" border>
        <Heading>Associative Networks and Brand Nodes</Heading>
        <Lede plate={<SpiderWeb />} cols="lg:grid-cols-[1.4fr_1fr]">
          <Statement className={LEDE}>
            Long-term memory stores knowledge as an <Tint>associative network</Tint>.
          </Statement>{" "}
          <P className="mt-5">
            Think of memory as a <Term>spider web of connected nodes</Term>. Each node
            represents a concept, brand, or feeling.
          </P>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "nike",
              tone: "ink",
              plate: <BrandAssociativeNetwork />,
              text: (
                <>
                  When you think of a brand like Nike, related nodes <Term>light up</Term>: running,
                  sneakers, athletes, and Just Do It.
                </>
              ),
            },
            {
              key: "spreading",
              tone: "ink",
              plate: <SpreadingActivation />,
              text: (
                <>
                  <Term>Spreading activation</Term> happens when one memory node triggers nearby
                  connected nodes.
                </>
              ),
            },
            {
              key: "strong",
              tone: "ink",
              plate: <StrongLinks />,
              text: (
                <>
                  Strong positive links make a brand <Term>easy to recall</Term> when standing in a
                  store aisle.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Brand Retrieval and Cues in the Aisle
          ================================================================ */}
      <Slide className={TIGHT} id="brand-retrieval-and-cues-in-the-aisle" border>
        <Heading>Brand Retrieval and Cues in the Aisle</Heading>
        <Lede plate={<Retrieve />} cols="lg:grid-cols-[1.4fr_1fr]">
          <Statement className={LEDE}>
            Having information in memory is useless if the buyer{" "}
            <Tint>cannot retrieve it</Tint> at the point of purchase.
          </Statement>{" "}
          <P className="mt-5">
            <Term>Retrieval</Term> is the process of accessing information from
            long-term memory.
          </P>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "cues",
              tone: "ink",
              plate: <RetrievalCues />,
              text: (
                <>
                  <Term>Retrieval cues</Term> trigger brand memories. Packaging shapes, colors, and
                  logos act as visual retrieval cues.
                </>
              ),
            },
            {
              key: "green-box",
              tone: "ink",
              plate: <GreenBox />,
              text: (
                <>
                  If an ad shows a distinct green box, using that <Term>exact green box</Term> on
                  the shelf helps shoppers find the product.
                </>
              ),
            },
            {
              key: "mood",
              tone: "ink",
              plate: <MoodMatch />,
              text: (
                <>
                  <Term>State-dependent retrieval</Term> means buyers remember ad messages better
                  when their internal mood matches the ad.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Brand Retrieval in Conversational Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-retrieval-in-conversational-search"
        border
        exercise={exercise["brand-retrieval-in-conversational-search"]}
      >
        <Heading>Brand Retrieval in Conversational Search</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Statement className="!max-w-[44ch] !text-[clamp(1.2rem,1.8vw,1.5rem)]">
              Consumers now also search by <Tint>asking an AI assistant</Tint>, such as
              &ldquo;Which running shoes are best for flat feet?&rdquo;
            </Statement>{" "}
            <P className="mt-4">The assistant answers with a short list of brands.</P>{" "}
            <P className="mt-2">
              This list often becomes the consumer&apos;s <Term>consideration set</Term>: the small
              group of brands the consumer seriously considers.
            </P>{" "}
            <P className="mt-2">
              A brand that is <Term>missing from the answer</Term> may never be
              considered, even if the consumer knows it.
            </P>
          </div>
          <Plate className="lg:max-w-[340px] lg:justify-self-end">
            <AssistantShortList />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-10 md:grid-cols-2 md:gap-10">
          {[
            {
              key: "links",
              tone: "ink" as Tone,
              plate: <WebFromReviews />,
              text: (
                <>
                  The assistant learns about brands from what is written about them, such as
                  reviews, articles, and product pages. In this way, the assistant also forms{" "}
                  <Term>links between brands and attributes</Term>, much like an
                  associative network.
                </>
              ),
            },
            {
              key: "cues",
              tone: "ink" as Tone,
              plate: <CueInQuestion />,
              text: (
                <>
                  <Term>Retrieval cues</Term> move from the shelf into the question. Words such as
                  &ldquo;cheap,&rdquo; &ldquo;durable,&rdquo; or &ldquo;eco-friendly&rdquo; shape
                  which brands the assistant retrieves.
                </>
              ),
            },
          ].map((c) => (
            <li
              key={c.key}
              className={cn(
                "grid min-w-0 items-center gap-4 border-t-2 pt-4 sm:grid-cols-[1fr_minmax(0,250px)]",
                BORDER[c.tone],
              )}
            >
              <p className="type-body">{c.text}</p>
              <Plate>{c.plate}</Plate>
            </li>
          ))}
        </ol>
        <Ruled tone="ink" className="mt-6 w-full !pt-3">
          <P className="!max-w-none !text-[clamp(1.05rem,1.4vw,1.25rem)]">
            Marketers therefore work to <Term>link their brands clearly</Term> to the needs that
            consumers mention in their questions.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Why Consumers Forget
          ================================================================ */}
      <Slide className={TIGHT} id="why-consumers-forget" border>
        <Heading>Why Consumers Forget</Heading>
        <Lede wide plate={<ForgettingCurve />} cols="lg:grid-cols-[1fr_1.5fr]">
          <Statement className={LEDE}>
            Forgetting is normal. Memory traces <Tint>fade over time</Tint> through decay.
          </Statement>
        </Lede>
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "interference",
              tone: "ink",
              plate: <Interference />,
              text: (
                <>
                  <Term>Interference</Term> also causes forgetting. New brand ads
                  displace memories of older brand messages.
                </>
              ),
            },
            {
              key: "retroactive",
              tone: "ink",
              plate: <Retroactive />,
              text: (
                <>
                  <Term>Retroactive interference</Term> occurs when new learning displaces old
                  information.
                </>
              ),
            },
            {
              key: "proactive",
              tone: "ink",
              plate: <Proactive />,
              text: (
                <>
                  <Term>Proactive interference</Term> occurs when older habits make it hard to learn
                  a new brand name.
                </>
              ),
            },
          ]}
        />
        <div className="mt-8 w-full">
          <Lede wide plate={<FightForgetting />} cols="lg:grid-cols-[1fr_1.5fr]">
            <Ruled tone="ink">
              <Big className="!text-[clamp(1.2rem,1.8vw,1.55rem)]">
                Marketers fight forgetting with consistent visual
                identity, reminder ads, and clear shelf placement.
              </Big>
            </Ruled>
          </Lede>
        </div>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-your-brand-web" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Brand Web
        </Heading>
        <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-8 md:px-12 md:py-10">
          <p className="type-quote !text-[clamp(1.3rem,2.2vw,1.9rem)] max-w-[52ch]">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Pick a brand you buy regularly.{" "}
            What four associations pop into your mind first? Did the
            brand teach you these links through conditioning, observation, or personal experience?
          </p>
        </div>
        <Plate wide className="mt-8">
          <YourBrandWeb />
        </Plate>
      </Slide>
    </SlideDeck>
  );
}
