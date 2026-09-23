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
  Receipt,
  Iceberg,
  OneSecondChain,
  ConsumptionCycle,
  ConsumerMark,
  MarketerMark,
  BuysUses,
  CalculatorWalk,
  ShortcutWalk,
  FourPulls,
  CalculatorError,
  NeedWantTrio,
  RoleGlyph,
  FamilyCar,
  OneMessage,
  SortedGroups,
  SegmentationPillars,
  Informs,
  Marionette,
  DarkPattern,
  Punished,
  RegretCheck,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 01 — WHAT IS CONSUMER BEHAVIOR?
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// SIGNAL marks the operative case (the consumer's real behaviour, the
// customer who pays, the ethical side), COUNTER the other view (the marketer
// watching, the consumer who uses, the old model).
//
// Quizzes: `Slide` renders `quizData` AFTER its section, so each [quiz]-tagged
// topic carries its own quiz, testing that slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

const SERIF = { fontFamily: "var(--font-heading)", fontWeight: 500 } as const;

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

/** Two ruled columns, each a line with its plate beneath. */
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

/** Before · during · after — where each slide sits on the consumption chain. */
const PHASES = ["Before", "During", "After"];

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

const numerals = `.step-n::before { content: attr(data-n); }`;

export default function Week1() {
  return (
    <SlideDeck label="Week 01">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="gsap-reveal type-label !text-[0.8rem] !text-[var(--signal)]">
              Week 01
            </p>
            <p className="gsap-reveal type-caption mt-2">Consumer Behavior · Davood Wadi, PhD</p>
            <Title className="mt-8 !max-w-[14ch]">What Is Consumer Behavior?</Title>
            <div className="gsap-reveal mt-10 max-w-[34ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                People do not buy products.{" "}
                <span className="text-[var(--ink-3)]">They buy solutions to </span>
                <Tint>feelings</Tint>
                <span className="text-[var(--ink-3)]">, </span>
                <Tint>problems</Tint>
                <span className="text-[var(--ink-3)]">, and </span>
                <Tint>social needs</Tint>
                <span className="text-[var(--ink-3)]">.</span>
              </p>
            </div>
          </div>
          <div className="gsap-reveal mx-auto w-full max-w-[380px] -rotate-2">
            <Receipt />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Tip of the Iceberg
          ================================================================ */}
      <Slide id="the-tip-of-the-iceberg" border>
        <Heading>The Tip of the Iceberg</Heading>
        <Statement className="!max-w-[26ch]">
          Most people think consumer behavior is <Tint>just shopping</Tint>.
        </Statement>
        <Figure height="auto">
          <Iceberg />
        </Figure>
        <Pair plate={<OneSecondChain />}>
          <Big>
            The purchase at the register is only <Tint>one second</Tint> in a long chain.
          </Big>
        </Pair>
        <Columns className="mt-16">
          <Ruled tone="ink">
            <p className="type-label mb-3 !text-[var(--ink)]">Before</p>
            <P>People spend weeks noticing problems, searching options, and asking friends.</P>
          </Ruled>
          <Ruled tone="ink">
            <p className="type-label mb-3 !text-[var(--ink)]">After</p>
            <P>After the sale, they use the item, feel happy or regretful, and tell others.</P>
          </Ruled>
        </Columns>
        <Ruled tone="signal" className="mt-16 w-full">
          <Statement className="!max-w-[34ch]">
            Consumer behavior studies the <Tint>whole chain</Tint>: before, during, and after
            the sale.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          The Three Stages of Consumption
          ================================================================ */}
      <Slide
        id="the-three-stages-of-consumption"
        border
        quizData={quiz["the-three-stages-of-consumption"]}
      >
        <PhaseRule active={[0, 1, 2]} />
        <Heading>The Three Stages of Consumption</Heading>
        <Lead>Consumption happens in three distinct stages.</Lead>
        <Figure height="auto">
          <ConsumptionCycle />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-3 md:gap-8">
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
            <li key={s.stage} className="gsap-reveal min-w-0 border-t-2 border-[var(--ink)] pt-5">
              <p className="type-h2 !font-normal">{s.stage}</p>{" "}
              <div className="mt-6 flex items-start gap-3">
                <ConsumerMark />
                <p className="type-body">{s.consumer}</p>
              </div>{" "}
              <div className="mt-4 flex items-start gap-3 border-t border-[var(--rule)] pt-4">
                <MarketerMark />
                <p className="type-body !text-[var(--counter)]">{s.marketer}</p>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Consumers Versus Customers
          ================================================================ */}
      <Slide id="consumers-versus-customers" border>
        <PhaseRule active={[1, 2]} />
        <Heading>Consumers Versus Customers</Heading>
        <Pair
          plate={
            <div
              aria-hidden
              className="flex items-baseline justify-center gap-5 py-6 text-[clamp(1.6rem,3vw,2.4rem)]"
              style={SERIF}
            >
              <span className="text-[var(--counter)]">consumer</span>
              <span className="relative text-[var(--ink-3)]">
                =
                <span className="absolute left-1/2 top-1/2 h-[1.2em] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] bg-[var(--signal)]" />
              </span>
              <span className="text-[var(--signal)]">customer</span>
            </div>
          }
        >
          <Lead>
            In common speech, people use consumer and customer to mean the same thing.
          </Lead>
        </Pair>
        <div className="mt-14 grid w-full gap-8 md:grid-cols-2">
          <Ruled tone="signal">
            <Big>
              A <Tint>customer</Tint> buys the product.
            </Big>
          </Ruled>{" "}
          <Ruled tone="counter">
            <Big>
              A <Tint tone="counter">consumer</Tint> uses the product.
            </Big>
          </Ruled>
        </div>
        <Figure height="auto">
          <BuysUses />
        </Figure>
        <P className="!max-w-[60ch]">
          A parent buys baby food at the grocery store. <Term>The parent is the customer.</Term>{" "}
          <Term tone="counter">The baby is the consumer.</Term>
        </P>
        <div className="mt-14 w-full">
          <Statement>Marketers must satisfy both people.</Statement>{" "}
          <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
            <Ruled tone="signal">
              <P>
                The parent cares about <Term>price and nutrition</Term>.
              </P>
            </Ruled>{" "}
            <Ruled tone="counter">
              <P>
                The baby cares about <Term tone="counter">taste and texture</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Why Consumers Are Not Calculators
          ================================================================ */}
      <Slide
        id="why-consumers-are-not-calculators"
        border
        quizData={quiz["why-consumers-are-not-calculators"]}
      >
        <Heading>Why Consumers Are Not Calculators</Heading>
        <Lead>
          Old economics assumed buyers were <Term tone="counter">perfectly rational</Term>.
        </Lead>
        <Columns className="mt-12">
          <PlateColumn
            tone="counter"
            text="This model assumed buyers compare all choices, calculate costs, and pick the best option."
            plate={<CalculatorWalk />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Real people have <Term>limited time and energy</Term>. They use{" "}
                <Term>mental shortcuts</Term> instead.
              </>
            }
            plate={<ShortcutWalk />}
          />
        </Columns>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[40ch]">
            Real decisions depend on <Tint>mood</Tint>, <Tint>habits</Tint>,{" "}
            <Tint>brand loyalty</Tint>, and <Tint>social pressure</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <FourPulls />
        </Figure>
        <Pair plateFirst plate={<CalculatorError />} className="mt-6">
          <Statement>
            Marketers who treat consumers as <Tint tone="counter">cold calculators</Tint> make{" "}
            <Tint>bad predictions</Tint>.
          </Statement>
        </Pair>
      </Slide>

      {/* ================================================================
          Needs Versus Wants
          ================================================================ */}
      <Slide id="needs-versus-wants" border>
        <PhaseRule active={[0]} />
        <Heading>Needs Versus Wants</Heading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="ink">
            <p className="type-label mb-3 !text-[var(--ink)]">Need</p>
            <Big>
              A <Tint tone="ink">need</Tint> is a basic biological or psychological requirement.
            </Big>{" "}
            <P className="mt-5">
              Examples include thirst, hunger, shelter, and belonging.{" "}
              <Term tone="ink">Needs exist before marketing.</Term>
            </P>
          </Ruled>{" "}
          <Ruled tone="signal">
            <p className="type-label mb-3">Want</p>
            <Big>
              A <Tint>want</Tint> is a specific way to satisfy that need.
            </Big>{" "}
            <P className="mt-5">
              <Term>Culture and personality shape wants.</Term>
            </P>
          </Ruled>
        </div>
        <Figure height="auto" className="!mt-14">
          <NeedWantTrio />
        </Figure>
        <P className="!max-w-[62ch]">
          A thirsty person in <Term tone="ink">Montreal</Term> wants cold tap water or a soda. A
          thirsty person in <Term tone="ink">another country</Term> might want hot tea.
        </P>
        <div className="mt-16 grid w-full gap-8 md:grid-cols-2">
          <Ruled tone="counter">
            <Statement>
              Marketers <Tint tone="counter">do not create</Tint> basic needs.
            </Statement>
          </Ruled>{" "}
          <Ruled tone="signal">
            <Statement>
              Marketers <Tint>create attractive wants</Tint> to satisfy existing needs.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Many Roles One Person Plays
          ================================================================ */}
      <Slide id="the-many-roles-one-person-plays" border>
        <PhaseRule active={[0, 1, 2]} />
        <Heading>The Many Roles One Person Plays</Heading>
        <Lead>One purchase often involves several distinct roles.</Lead>
        <ol className="mt-12 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[
            { role: "initiator", rest: "identifies the problem first." },
            { role: "influencer", rest: "gives advice and sways the choice." },
            { role: "buyer", rest: "pays for the goods." },
            { role: "user", rest: "consumes or handles the product." },
          ].map((r, i) => (
            <li key={r.role} className="gsap-reveal min-w-0 border-t-2 border-[var(--ink)] pt-5">
              <span
                aria-hidden
                data-n={String(i + 1).padStart(2, "0")}
                className="step-n block text-[1.6rem] leading-none text-[var(--signal)]"
                style={SERIF}
              />
              <div className="my-5">
                <RoleGlyph role={i as 0 | 1 | 2 | 3} />
              </div>
              <p className="type-body">
                {" "}
                The <Term>{r.role}</Term> {r.rest}
              </p>
            </li>
          ))}
        </ol>
        <Figure height="auto" className="!mt-16">
          <FamilyCar />
        </Figure>
        <Big className="max-w-[48ch]">
          In a household buying a family car, <Tint tone="counter">children influence</Tint> the
          choice, but <Tint>parents buy</Tint> the vehicle.
        </Big>
        <style>{numerals}</style>
      </Slide>

      {/* ================================================================
          Market Segmentation
          ================================================================ */}
      <Slide
        id="market-segmentation-who-are-we-talking-to"
        border
        quizData={quiz["market-segmentation-who-are-we-talking-to"]}
      >
        <Heading kicker="Market Segmentation:">Who Are We Talking To?</Heading>
        <Columns>
          <PlateColumn
            tone="counter"
            text={
              <>
                You cannot appeal to everyone with the <Term tone="counter">same message</Term>.
              </>
            }
            plate={<OneMessage />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Market segmentation</Term> divides a big market into smaller groups with
                shared traits.
              </>
            }
            plate={<SortedGroups />}
          />
        </Columns>
        <Figure height="auto" className="!mt-16 !mb-0">
          <SegmentationPillars />
        </Figure>
        <ol className="mt-8 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {[
            "Demographics group people by age, gender, income, and education.",
            "Geographics group people by location, city size, and climate.",
            "Psychographics group people by lifestyle, values, and personality.",
            "Behavioral segments group people by how often they buy and how they use the item.",
          ].map((t) => {
            const [head, ...rest] = t.split(" group people by ");
            return (
              <li key={t} className="gsap-reveal min-w-0 border-t-2 border-[var(--signal)] pt-4">
                <p className="type-body">
                  {" "}
                  <Term>{head}</Term> group people by {rest.join(" group people by ")}
                </p>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          The Ethical Border
          ================================================================ */}
      <Slide id="the-ethical-border-helping-versus-manipulating" border>
        <Heading kicker="The Ethical Border:">Helping Versus Manipulating</Heading>
        <Statement className="!max-w-[32ch]">
          Understanding consumers gives firms <Tint>great power</Tint> over everyday choices.
        </Statement>
        <div className="mt-14 grid w-full md:grid-cols-2">
          <div className="gsap-reveal min-w-0 pb-10 md:pb-0 md:pr-10">
            <p className="type-label mb-4 !text-[var(--counter)]">Helping</p>
            <Big>
              <Tint tone="counter">Ethical marketing</Tint> informs buyers and delivers genuine
              value.
            </Big>
            <Plate className="mt-6">
              <Informs />
            </Plate>
          </div>{" "}
          <div className="gsap-reveal min-w-0 border-t-2 border-dashed border-[var(--ink)] pt-10 md:border-l-2 md:border-t-0 md:pl-10 md:pt-0">
            <p className="type-label mb-4 !text-[var(--signal)]">Manipulating</p>
            <Big>
              <Tint>Manipulative marketing</Tint> takes unfair advantage of human cognitive
              weaknesses.
            </Big>
            <Plate className="mt-6">
              <Marionette />
            </Plate>
          </div>
        </div>
        <Pair plate={<DarkPattern />} className="mt-20">
          <Big>
            <Tint>Dark patterns</Tint> are deceptive website designs that trick shoppers into
            signing up or spending more.
          </Big>
        </Pair>
        <Pair plateFirst plate={<Punished />} className="mt-16">
          <Ruled tone="ink">
            <Big>
              Regulators and consumers increasingly <Tint>punish</Tint> companies that rely on
              trickery.
            </Big>
          </Ruled>
        </Pair>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide id="discussion-your-last-regretful-purchase" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Last Regretful Purchase
        </Heading>
        <Figure height="auto" className="!mt-0">
          <RegretCheck />
        </Figure>
        <div className="gsap-reveal relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
          <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Think of an item you bought recently that you now regret buying.{" "}
            <Tint tone="counter">Which stage of consumption failed you?</Tint> Did you buy it for
            a <Tint tone="counter">need</Tint> or an <Tint>impulsive want</Tint>?
          </p>
        </div>
      </Slide>
    </SlideDeck>
  );
}
