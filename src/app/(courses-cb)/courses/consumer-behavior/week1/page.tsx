"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import {
  Iceberg,
  ConsumptionCycle,
  BuysUses,
  FourPulls,
  NeedWantTrio,
  FamilyCar,
  SegmentationPillars,
  DelegatedPurchase,
  HiddenUnitPrice,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 1: INTRODUCTION TO CONSUMER BEHAVIOR
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md. The
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// Colour is rare (see the root CLAUDE.md): each slide gives SIGNAL to at most
// one phrase, its key idea. Defined terms are bold ink and every rule is ink.
// The consumer/customer slide keeps COUNTER for the one contrast it teaches.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. The type fits the topic: the stages, the
// calculator contrast and the split of work between consumer and AI agent are
// sorts, the four segmentation bases a match-up.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** Content slides trim the section's 7rem padding so each topic reads as one screen. */
const TIGHT = "md:!py-16";

const SERIF = { fontFamily: "var(--font-heading)", fontWeight: 500 } as const;

type Tone = "signal" | "counter" | "ink";

const BORDER: Record<Tone, string> = {
  signal: "border-[var(--rule)]",
  counter: "border-[var(--rule)]",
  ink: "border-[var(--rule)]",
};

const TEXT: Record<Tone, string> = {
  signal: "text-[var(--ink)]",
  counter: "text-[var(--ink)]",
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

/** Inline emphasis for a phrase inside a line. */
function Tint({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
  return <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>;
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
    <div className={cn("min-w-0 border-t pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/**
 * A plate that lives in a column: a figure well without the 680px floor. A
 * `wide` (800-unit) plate keeps a legible minimum width on phones and scrolls
 * inside its well there, like `Figure`. From lg up the column is wide enough.
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
    <div
      className={cn(
        "figure-well w-full min-w-0 p-3",
        wide && "overflow-x-auto",
        className,
      )}
    >
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
      <h2 className="type-h1 max-w-[32ch]">
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

/** The ethical border: helping, manipulating, the trickery aimed at shoppers
 *  and at their agents, and its price. */
const ETHICS: {
  key: string;
  text: React.ReactNode;
}[] = [
  {
    key: "helping",
    text: (
      <>
        <Tint tone="counter">Ethical marketing</Tint> informs buyers and delivers genuine
        value.
      </>
    ),
  },
  {
    key: "manipulating",
    text: (
      <>
        <Tint>Manipulative marketing</Tint> takes unfair advantage of human cognitive
        weaknesses.
      </>
    ),
  },
  {
    key: "dark",
    text: (
      <>
        <Tint>Dark patterns</Tint> are deceptive website designs that trick shoppers into
        signing up or spending more.
      </>
    ),
  },
  {
    key: "agents",
    text: (
      <>
        Dark patterns can also target the <Tint>AI agents</Tint> that shop for consumers.
        A store can make key details, such as the unit price, hard for an agent to find.
        The agent may then choose a worse option for the consumer.
      </>
    ),
  },
  {
    key: "punish",
    text: (
      <>
        Regulators and consumers increasingly <Tint>punish</Tint> companies that rely on
        trickery.
      </>
    ),
  },
];

const numerals = `.step-n::before { content: attr(data-n); }`;

export default function Week1() {
  return (
    <SlideDeck label="Week 1">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 1
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Introduction to Consumer Behavior</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              People do not buy products.{" "}
              {"They buy solutions to "}
              <Tint>feelings</Tint>
              {", "}
              <Tint>problems</Tint>
              {", and "}
              <Tint>social needs</Tint>
              .
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Tip of the Iceberg
          ================================================================ */}
      <Slide className={TIGHT} id="the-tip-of-the-iceberg" border>
        <Heading>The Tip of the Iceberg</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-x-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!max-w-[26ch]">
              Most people think consumer behavior is just shopping.
            </Statement>
            <Big className="!text-[clamp(1.3rem,2vw,1.7rem)]">
              The purchase at the register is only one second in a long chain.
            </Big>
          </div>
          <Plate wide>
            <Iceberg />
          </Plate>
        </div>
        <div className="mt-10 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="ink">
            <P>People spend weeks noticing problems, searching options, and asking friends.</P>
          </Ruled>
          <Ruled tone="ink">
            <P>After the sale, they use the item, feel happy or regretful, and tell others.</P>
          </Ruled>
          <Ruled tone="ink">
            <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
              Consumer behavior studies the <Tint>whole chain</Tint>: before, during, and after
              the sale.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Three Stages of Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-three-stages-of-consumption"
        border
        exercise={exercise["the-three-stages-of-consumption"]}
      >
        <Heading>The Three Stages of Consumption</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <Statement>Consumption happens in three distinct stages.</Statement>
          <Plate wide>
            <ConsumptionCycle />
          </Plate>
        </div>
        <ol className="mt-10 grid w-full gap-10 md:grid-cols-3 md:gap-8">
          {[
            {
              stage: "Stage 1 is Prepurchase.",
              consumer: "The consumer identifies a need and searches for information.",
              marketer: "The marketer studies how consumer attitudes form.",
            },
            {
              stage: "Stage 2 is Purchase.",
              consumer: "The consumer experiences the store, website, and checkout.",
              marketer: "The marketer focuses on packaging, convenience, and store atmosphere.",
            },
            {
              stage: "Stage 3 is Postpurchase.",
              consumer: "The consumer uses the product and judges its quality.",
              marketer: "The marketer monitors satisfaction, returns, and repeat purchases.",
            },
          ].map((s) => (
            <li key={s.stage} className="min-w-0 border-t border-[var(--rule)] pt-4">
              <p className="type-h2 !font-normal">{s.stage}</p>{" "}
              <p className="type-body mt-4">{s.consumer}</p>{" "}
              <p className="type-body mt-3 border-t border-[var(--rule)] pt-3">
                {s.marketer}
              </p>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Consumers Versus Customers
          ================================================================ */}
      <Slide className={TIGHT} id="consumers-versus-customers" border>
        <Heading>Consumers Versus Customers</Heading>
        {/* The two definitions sit beside the parent and baby they describe.
            What each of them cares about closes the slide. */}
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <div className="min-w-0">
            <Lead>
              In common speech, people use consumer and customer to mean the same thing.
            </Lead>
            <div className="mt-8 grid w-full gap-6 sm:grid-cols-2">
              <Ruled tone="ink">
                <Big>
                  A customer buys the product.
                </Big>
              </Ruled>{" "}
              <Ruled tone="ink">
                <Big>
                  A consumer uses the product.
                </Big>
              </Ruled>
            </div>
          </div>
          <div className="min-w-0">
            <Plate wide>
              <BuysUses />
            </Plate>
            <P className="mt-5 !max-w-[60ch]">
              A parent buys baby food at the grocery store. <Term>The parent is the customer.</Term>{" "}
              <Term>The baby is the consumer.</Term>
            </P>
          </div>
        </div>
        <div className="mt-10 grid w-full items-end gap-6 md:grid-cols-3 md:gap-8">
          <Statement>Marketers must satisfy both people.</Statement>{" "}
          <Ruled tone="ink">
            <P>
              The parent cares about <Term>price and nutrition</Term>.
            </P>
          </Ruled>{" "}
          <Ruled tone="ink">
            <P>
              The baby cares about <Term>taste and texture</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Why Consumers Are Not Calculators
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="why-consumers-are-not-calculators"
        border
        exercise={exercise["why-consumers-are-not-calculators"]}
      >
        <Heading>Why Consumers Are Not Calculators</Heading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead>
              Old economics assumed buyers were <Term>perfectly rational</Term>.
            </Lead>
            <Ruled tone="ink">
              <P>This model assumed buyers compare all choices, calculate costs, and pick the best option.</P>
            </Ruled>
            <Ruled tone="ink">
              <P>
                Real people have <Term>limited time and energy</Term>. They use{" "}
                <Term>mental shortcuts</Term> instead.
              </P>
            </Ruled>
            <Ruled tone="ink">
              <Statement className="!text-[clamp(1.25rem,1.8vw,1.55rem)]">
                Marketers who treat consumers as cold calculators{" "}
                make bad predictions.
              </Statement>
            </Ruled>
          </div>
          <div className="min-w-0">
            <Ruled tone="ink">
              <Big className="!text-[clamp(1.3rem,2vw,1.7rem)]">
                Real decisions depend on <Tint>mood</Tint>, <Tint>habits</Tint>,{" "}
                <Tint>brand loyalty</Tint>, and <Tint>social pressure</Tint>.
              </Big>
            </Ruled>
            <Plate wide className="mt-5">
              <FourPulls />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Needs Versus Wants
          ================================================================ */}
      <Slide className={TIGHT} id="needs-versus-wants" border>
        <Heading>Needs Versus Wants</Heading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="ink">
            <Big>
              A need is a basic biological or psychological requirement.
            </Big>{" "}
            <P className="mt-4">
              Examples include thirst, hunger, shelter, and belonging.{" "}
              <Term>Needs exist before marketing.</Term>
            </P>
          </Ruled>{" "}
          <Ruled tone="ink">
            <Big>
              A want is a specific way to satisfy that need.
            </Big>{" "}
            <P className="mt-4">
              <Term>Culture and personality shape wants.</Term>
            </P>
          </Ruled>
        </div>
        {/* The Montreal example leads the trio. The two closing lines sit
            under it, beside the plate. */}
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-x-12">
          <P className="!max-w-[62ch] lg:col-start-1 lg:row-start-1 lg:self-end">
            A thirsty person in <Term>Montreal</Term> wants cold tap water or a soda. A
            thirsty person in <Term>another country</Term> might want hot tea.
          </P>
          <Plate wide className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <NeedWantTrio />
          </Plate>
          <div className="grid w-full gap-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            <Ruled tone="ink">
              <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
                Marketers do not create basic needs.
              </Statement>
            </Ruled>{" "}
            <Ruled tone="ink">
              <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
                Marketers <Tint>create attractive wants</Tint> to satisfy existing needs.
              </Statement>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Many Roles One Person Plays
          ================================================================ */}
      <Slide className={TIGHT} id="the-many-roles-one-person-plays" border>
        <Heading>The Many Roles One Person Plays</Heading>
        <Lead>One purchase often involves several distinct roles.</Lead>
        <ol className="mt-8 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[
            { role: "initiator", rest: "identifies the problem first." },
            { role: "influencer", rest: "gives advice and sways the choice." },
            { role: "buyer", rest: "pays for the goods." },
            { role: "user", rest: "consumes or handles the product." },
          ].map((r, i) => (
            <li
              key={r.role}
              className="flex min-w-0 flex-col border-t border-[var(--rule)] pt-4"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  data-n={String(i + 1)}
                  className="step-n block shrink-0 text-[1.6rem] leading-none text-[var(--ink)]"
                  style={SERIF}
                />
                <p className="type-body">
                  {" "}
                  The <Term>{r.role}</Term> {r.rest}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <Big className="max-w-[48ch]">
            In a household buying a family car, children influence the
            choice, but parents buy the vehicle.
          </Big>
          <Plate wide>
            <FamilyCar />
          </Plate>
        </div>
        <style>{numerals}</style>
      </Slide>

      {/* ================================================================
          The AI Agent as a Surrogate Consumer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-ai-agent-as-a-surrogate-consumer"
        border
        exercise={exercise["the-ai-agent-as-a-surrogate-consumer"]}
      >
        <Heading>The AI Agent as a Surrogate Consumer</Heading>
        <div className="grid w-full items-end gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <Statement className="!max-w-[36ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
            A <Tint>surrogate consumer</Tint> is an agent who makes buying decisions on behalf of
            another person.
          </Statement>
          <div className="grid min-w-0 gap-4">
            <P>Personal shoppers, travel agents, and wedding planners have long played this role.</P>
            <Ruled tone="ink" className="!pt-3">
              <Big className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
                Today, consumers can also delegate this role to AI agents.
              </Big>
            </Ruled>
          </div>
        </div>
        {/* The three lines sit over the three panels they describe. The
            roles line and the two audiences follow beside the plate. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1.9fr_1fr] lg:gap-10">
          <div className="min-w-0">
            <ol className="grid w-full gap-6 md:grid-cols-3">
              {[
                {
                  tone: "ink" as Tone,
                  text: <>The consumer states a goal, such as &ldquo;find running shoes under $120.&rdquo;</>,
                },
                {
                  tone: "ink" as Tone,
                  text: (
                    <>
                      The <Term>AI agent</Term> searches for options, compares them, and can
                      complete the purchase.
                    </>
                  ),
                },
                {
                  tone: "ink" as Tone,
                  text: <>The consumer still uses the product and judges its quality after the sale.</>,
                },
              ].map((c, i) => (
                <li key={i} className={cn("min-w-0 border-t pt-3", BORDER[c.tone])}>
                  <p className="type-body">{c.text}</p>
                </li>
              ))}
            </ol>
            <Plate wide className="mt-4">
              <DelegatedPurchase />
            </Plate>
          </div>
          <div className="grid min-w-0 gap-6">
            <P className="!text-[clamp(1.05rem,1.5vw,1.3rem)]">
              In the language of roles, the AI agent can act as the <Term>influencer</Term> and
              the <Term>buyer</Term>. The consumer remains the <Term>user</Term>.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
                Marketers now inform two audiences: the consumer and the AI agent
                that shops for the consumer.
              </Statement>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Market Segmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="market-segmentation-who-are-we-talking-to"
        border
        exercise={exercise["market-segmentation-who-are-we-talking-to"]}
      >
        <Heading kicker="Market Segmentation:">Who Are We Talking To?</Heading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled tone="ink">
            <P className="!text-[clamp(1.05rem,1.5vw,1.3rem)]">
              You cannot appeal to everyone with the <Term>same message</Term>.
            </P>
          </Ruled>
          <Ruled tone="ink">
            <P className="!text-[clamp(1.05rem,1.5vw,1.3rem)]">
              <Term>Market segmentation</Term> divides a big market into smaller groups with
              shared traits.
            </P>
          </Ruled>
        </div>
        {/* The four bases lead the pillars they stand for. */}
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <ol className="grid w-full gap-6 sm:grid-cols-2">
            {[
              "Demographics group people by age, gender, income, and education.",
              "Geographics group people by location, city size, and climate.",
              "Psychographics group people by lifestyle, values, and personality.",
              "Behavioral segments group people by how often they buy and how they use the item.",
            ].map((t) => {
              const [head, ...rest] = t.split(" group people by ");
              return (
                <li key={t} className="min-w-0 border-t border-[var(--rule)] pt-4">
                  <p className="type-body">
                    {" "}
                    <Term>{head}</Term> group people by {rest.join(" group people by ")}
                  </p>
                </li>
              );
            })}
          </ol>
          <Plate wide>
            <SegmentationPillars />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          The Ethical Border
          ================================================================ */}
      <Slide className={TIGHT} id="the-ethical-border-helping-versus-manipulating" border>
        <Heading kicker="The Ethical Border:">Helping Versus Manipulating</Heading>
        <Statement className="!max-w-[48ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
          Understanding consumers gives firms <Tint>great power</Tint> over everyday choices.
        </Statement>
        <div className="mt-8 grid w-full items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <ol className="grid w-full gap-6 sm:grid-cols-2">
            {ETHICS.map((c) => (
              <li key={c.key} className="min-w-0 border-t border-[var(--rule)] pt-4">
                <p className="type-body">{c.text}</p>
              </li>
            ))}
          </ol>
          <Plate>
            <HiddenUnitPrice />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-your-last-regretful-purchase" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Last Regretful Purchase
        </Heading>
        <div className="relative w-full max-w-4xl border-l border-[var(--rule-2)] pl-6 py-2">
          <p className="type-quote !text-[clamp(1.35rem,2.3vw,2rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--ink-3)]">
              Discussion:
            </span>{" "}
            Think of an item you bought recently that you now regret buying.{" "}
            Which stage of consumption failed you? Did you buy it for
            a need or an impulsive want?
          </p>
        </div>
      </Slide>
    </SlideDeck>
  );
}
