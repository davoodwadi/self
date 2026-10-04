"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import {
  createExerciseLookup,
  type ExerciseInput,
} from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 08 — BEHAVIORAL ECONOMICS, HEURISTICS, AND BIASES
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's fixed cast: the shopper (one Person look), the AI
// agent (a phone with the sparkle), the coffee jar and the paper price tag.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive plates (students act on the drawing itself, all on real data):
//   · Anchoring: drag the last two digits of a social security number and
//     watch what the class would pay for a keyboard (Ariely et al., 2003).
//   · Loss aversion: add found money until it balances a lost $20.
//   · Storefront design: switch the agent's goal and the cost of a look-up
//     and see how often agents chose the better coffee (Wadi & Ma, 2026b).
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise, of the type that fits
// it, testing that slide and the ones before it.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** Content slides trim the deck's outer padding so each topic fits one screen. */
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
function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-body max-w-[var(--measure)]", className)}>
      {children}
    </p>
  );
}

/** A line promoted to lead size. */
function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-lead max-w-[48ch]", className)}>{children}</p>;
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-h2 !font-normal", className)}>{children}</p>;
}

/** Coloured term inside a line. */
function Term({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>
  );
}

/** Inline colour for a phrase inside a serif line. */
function Tint({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
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
 * A plate that lives in a column: a figure well without the 680px floor. A
 * `wide` (800-unit) plate keeps a legible minimum width on phones and scrolls
 * inside its well there, like `Figure`; from lg up the column is wide enough.
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
      {wide ? (
        <div className="min-w-[480px] lg:min-w-0">{children}</div>
      ) : (
        children
      )}
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
  className = "",
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
  className?: string;
}) {
  return (
    <div className="mb-6 w-full">
      <h2 className={cn("type-h1 max-w-[32ch]", className)}>
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
      <div className="mt-3 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Ruled lines in a grid, each followed by its own plate. */
function Cells({
  cols = 2,
  items,
  className = "",
}: {
  cols?: 2 | 3 | 4 | 5;
  items: {
    key: string;
    tone: Tone;
    plate?: React.ReactNode;
    text: React.ReactNode;
  }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-10 md:grid-cols-2 md:gap-x-8 lg:gap-x-6 lg:gap-y-6",
        {
          2: "md:gap-x-10",
          3: "lg:grid-cols-3",
          4: "lg:grid-cols-4",
          5: "lg:grid-cols-5",
        }[cols],
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-3">
          <div className={cn("border-t-2 pt-3", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          {s.plate ? (
            <div className="figure-well mt-auto w-full min-w-0 p-3">
              {s.plate}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** A ruled line with its plate beside it, for rows of text-and-picture pairs. */
function SideCell({
  plate,
  children,
  plateClass = "",
  className = "",
}: {
  plate: React.ReactNode;
  children: React.ReactNode;
  plateClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-w-0 items-center gap-4 border-t-2 border-[var(--ink)] pt-3 sm:grid-cols-[1fr_1.15fr]",
        className,
      )}
    >
      <p className="type-body min-w-0">{children}</p>
      <div className={cn("figure-well w-full min-w-0 p-2", plateClass)}>
        {plate}
      </div>
    </div>
  );
}


export default function Week8() {
  return (
    <SlideDeck label="Week 08">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 08
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[18ch]">
              Behavioral Economics, Heuristics, and Biases
            </Title>
            <div className="mt-8 max-w-[40ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                Consumers follow predictable mental shortcuts. In some
                conditions, <Tint>so do the AI agents that shop for them</Tint>.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <V.ShortcutShelf />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Beyond the Rational Consumer
          ================================================================ */}
      <Slide className={TIGHT} id="beyond-the-rational-consumer" border>
        <Heading>Beyond the Rational Consumer</Heading>
        {/* The same shelf twice: the rational model looks at every jar and
            buys the best; the satisficer stops at the first good enough. */}
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                Classical economics assumes that consumers compare every option
                and choose the one with the highest value.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <V.CompareEvery />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Behavioral economics</Term> studies how people actually
                make economic decisions.
              </P>
            </Ruled>
            <P>
              Herbert Simon proposed that people have{" "}
              <Term>bounded rationality</Term>. They have limited time,
              information, and attention.
            </P>
            <P>
              Because of these limits, people often choose an option that is
              good enough instead of the best possible option. Simon called this{" "}
              <Term>satisficing</Term>.
            </P>
            <Plate className="mt-auto">
              <V.GoodEnough />
            </Plate>
          </div>
        </div>
        <Statement className="mt-6 !max-w-[60ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
          The departures from the rational model are not random. They follow
          patterns that <Tint>researchers can predict and marketers can use</Tint>.
        </Statement>
      </Slide>

      {/* ================================================================
          System 1 and System 2
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="system-1-and-system-2"
        border
        exercise={exercise["system-1-and-system-2"]}
      >
        <Heading>System 1 and System 2</Heading>
        <Lead className="!max-w-none !mb-4">
          Psychologists describe two modes of thinking (Kahneman, 2011).
        </Lead>
        {/* Each mode as a row: its line beside its scene. The two lines on
            when each mode works sit to the right. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <SideCell plate={<V.SaleGlance />} className="sm:grid-cols-[1fr_1.1fr]">
              <Term>System 1</Term> is fast, automatic, and effortless. It
              recognizes a familiar logo or reacts to a red &quot;SALE&quot; sign
              in an instant.
            </SideCell>
            <SideCell plate={<V.SlowCompare />} className="sm:grid-cols-[1fr_1.1fr]">
              <Term>System 2</Term> is slow, deliberate, and effortful. It
              compares the price per unit of two packages or reads the terms of
              a phone contract.
            </SideCell>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Statement className="!max-w-[22ch] !text-[clamp(1.5rem,2.4vw,2rem)]">
              Most everyday purchases <Tint>rely on System 1</Tint>.
            </Statement>
            <Ruled tone="ink" className="!pt-3">
              <P>
                System 2 takes over when the decision is important, unfamiliar,
                or clearly wrong at first sight, and when the consumer has the
                time and energy to think.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Heuristics: Mental Shortcuts
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="heuristics-mental-shortcuts"
        border
        exercise={exercise["heuristics-mental-shortcuts"]}
      >
        <Heading kicker="Heuristics:">Mental Shortcuts</Heading>
        <Statement className="!max-w-[44ch] !text-[clamp(1.4rem,2.2vw,1.9rem)] !mb-5">
          A <Term>heuristic</Term> is a mental shortcut that simplifies a
          decision.
        </Statement>
        <Cells
          cols={3}
          items={[
            {
              key: "availability",
              tone: "ink",
              plate: <V.RecallPaper />,
              text: (
                <>
                  The <Term>availability heuristic</Term> judges how likely
                  something is by how easily examples come to mind. A consumer
                  who recently heard about a car recall may overestimate the
                  risk of that brand.
                </>
              ),
            },
            {
              key: "representativeness",
              tone: "ink",
              plate: <V.LookAlike />,
              text: (
                <>
                  The <Term>representativeness heuristic</Term> judges an item
                  by how closely it resembles a familiar category. A store
                  brand in packaging like the market leader seems to share its
                  quality.
                </>
              ),
            },
            {
              key: "price-quality",
              tone: "ink",
              plate: <V.WinePrice />,
              text: (
                <>
                  The <Term>price-quality inference</Term> assumes that a higher
                  price signals higher quality. Consumers rely on it most when
                  they cannot judge quality directly, as with wine or perfume.
                </>
              ),
            },
          ]}
        />
        <Ruled tone="ink" className="mt-6 w-full">
          <Big className="!text-[clamp(1.2rem,1.7vw,1.5rem)]">
            Heuristics save time and often work well. They lead to errors{" "}
            <Tint>when the shortcut does not fit the situation</Tint>.
          </Big>
        </Ruled>
      </Slide>

      {/* ================================================================
          Anchoring: The First Number Counts
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="anchoring-the-first-number-counts"
        border
        exercise={exercise["anchoring-the-first-number-counts"]}
      >
        <Heading kicker="Anchoring:">The First Number Counts</Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[0.85fr_1.7fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Statement className="!max-w-[26ch] !text-[clamp(1.25rem,1.9vw,1.65rem)]">
              <Term>Anchoring</Term> occurs when an initial number influences a
              later judgment, <Tint>even when the number is irrelevant</Tint>.
            </Statement>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A &quot;compare at $120&quot; label makes a $79 price seem lower
                than it would appear on its own.
              </P>
            </Ruled>
            <Plate>
              <V.CompareAt />
            </Plate>
          </div>
          {/* The instrument: drag the digits, read the price the class gave. */}
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-none">
                In one classic study, people who first wrote down the last two
                digits of their social security number were then willing to pay
                more for products when those digits were high (Ariely,
                Loewenstein, &amp; Prelec, 2003).
              </P>
            </Ruled>
            <Plate wide>
              <V.AnchorDigits />
            </Plate>
          </div>
        </div>
        <SideCell
          plate={<V.MarketerAnchors />}
          className="mt-6 w-full sm:grid-cols-[1fr_2fr]"
        >
          Marketers use anchors in reference prices, suggested quantities such
          as &quot;limit 12 per customer,&quot; and high-priced options placed
          first on a menu.
        </SideCell>
      </Slide>

      {/* ================================================================
          Loss Aversion and the Endowment Effect
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="loss-aversion-and-the-endowment-effect"
        border
        exercise={exercise["loss-aversion-and-the-endowment-effect"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Loss Aversion and the Endowment Effect
        </Heading>
        {/* Prospect theory and its balance on the left two thirds; the
            endowment effect and the free trial on the right. */}
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1fr_1fr] lg:gap-8">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Prospect theory</Term> states that people judge outcomes
                as gains or losses relative to a reference point (Kahneman
                &amp; Tversky, 1979).
              </P>
            </Ruled>
            <Statement className="!text-[clamp(1.25rem,1.9vw,1.6rem)]">
              <Term>Loss aversion</Term> means that a loss feels{" "}
              <Tint>about twice as strong</Tint> as a gain of the same size.
            </Statement>
            <P>Losing $20 hurts more than finding $20 pleases.</P>
          </div>
          <div className="min-w-0 self-center">
            <Plate>
              <V.LossBalance />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>endowment effect</Term> means that people value an
                item more once they own it.
              </P>
            </Ruled>
            <P>
              Free trials and money-back guarantees use this effect. After a
              consumer has used a product for a month, giving it up feels like a
              loss.
            </P>
            <Plate className="mt-auto">
              <V.FreeTrial />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Status Quo Bias and Framing Effects
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="status-quo-bias-and-framing-effects"
        border
        exercise={exercise["status-quo-bias-and-framing-effects"]}
      >
        <Heading>Status Quo Bias and Framing Effects</Heading>
        <Cells
          cols={3}
          items={[
            {
              key: "status-quo",
              tone: "ink",
              plate: <V.SameProvider />,
              text: (
                <>
                  <Term>Status quo bias</Term> is the preference for keeping
                  things as they are. Consumers stay with the same bank, phone
                  plan, or streaming service even when a better offer exists.
                </>
              ),
            },
            {
              key: "framing",
              tone: "ink",
              plate: <V.LeanFat />,
              text: (
                <>
                  A <Term>framing effect</Term> occurs when the way information
                  is presented changes the choice, even though the facts are the
                  same. Consumers rate ground beef more favorably when it is
                  described as &quot;75% lean&quot; than as &quot;25% fat&quot;
                  (Levin &amp; Gaeth, 1988).
                </>
              ),
            },
            {
              key: "surcharge",
              tone: "ink",
              plate: <V.SurchargeDiscount />,
              text: (
                <>
                  A surcharge for paying by card and a discount for paying in
                  cash can describe the same price gap, but consumers react more
                  strongly to the surcharge{" "}
                  <Tint>because it is framed as a loss</Tint>.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Pricing Cues: Just-Below Prices and Discount Frames
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="pricing-cues-just-below-prices-and-discount-frames"
        border
      >
        <Heading kicker="Pricing Cues:">
          Just-Below Prices and Discount Frames
        </Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          {/* The text runs around the tag's outline, magazine style; on
              phones the tag follows the first sentence. */}
          <div className="min-w-0">
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-none">
                <Term>Just-below pricing</Term> ends a price just under a round
                number, such as $4.99 instead of $5.00.
              </P>
              <div
                className="my-4 w-full md:float-right md:my-0 md:ml-2 md:w-[48%]"
                style={{
                  shapeOutside:
                    "polygon(0% 26%, 34% 14%, 66% 14%, 100% 26%, 100% 100%, 0% 100%)",
                  shapeMargin: "18px",
                }}
              >
                <V.LeftDigit />
              </div>
              <P className="mt-4 !max-w-none">
                Consumers read prices from left to right and give extra weight
                to the leftmost digit. This is called the{" "}
                <Term>left-digit effect</Term> (Thomas &amp; Morwitz, 2005).
              </P>
              <P className="mt-4 !max-w-none">
                A price of $4.99 therefore feels closer to $4 than to $5.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Promotional framing</Term> presents a price as a discount
                from a higher list price, such as &quot;20% off.&quot;
              </P>
            </Ruled>
            <P>
              The discount adds a feeling of a good deal, called{" "}
              <Term>transaction utility</Term>, on top of the value of the
              product itself (Thaler, 1985).
            </P>
            <Plate className="mt-auto">
              <V.DealTag />
            </Plate>
          </div>
        </div>
        <Statement className="clear-both mt-6 !max-w-[64ch] !text-[clamp(1.25rem,1.9vw,1.6rem)]">
          <Tint>Both cues work through System 1.</Tint> A consumer who
          calculates the price per unit is less affected by them.
        </Statement>
      </Slide>

      {/* ================================================================
          Choice Architecture, Defaults, and Nudges
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="choice-architecture-defaults-and-nudges"
        border
        exercise={exercise["choice-architecture-defaults-and-nudges"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Choice Architecture, Defaults, and Nudges
        </Heading>
        <Lead className="!max-w-none !mb-4">
          <Term>Choice architecture</Term> is the way options are arranged and
          presented to the decision maker (Thaler &amp; Sunstein, 2008).
        </Lead>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                A <Term>default</Term> is the option a person receives if they
                do nothing. Many people keep the default because changing it
                takes effort.
              </P>
            </Ruled>
            <P>
              In countries where organ donation is the default, far more people
              are registered donors than in countries where people must opt in
              (Johnson &amp; Goldstein, 2003).
            </P>
          </div>
          <Plate wide>
            <V.OrganDefaults />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <SideCell plate={<V.FruitEyeLevel />} className="sm:grid-cols-[1fr_1fr]">
            A <Term>nudge</Term> is a change in choice architecture that steers
            behavior without removing any option or changing its price. Placing
            fruit at eye level in a cafeteria is a nudge.
          </SideCell>
          <Statement className="!max-w-[30ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
            A nudge is transparent and serves the person&apos;s own interest. A{" "}
            <Term>dark pattern</Term> uses the same tools{" "}
            <Tint>against the person&apos;s interest</Tint>.
          </Statement>
        </div>
      </Slide>

      {/* ================================================================
          Do AI Agents Use Heuristics?
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="do-ai-agents-use-heuristics"
        border
        exercise={exercise["do-ai-agents-use-heuristics"]}
      >
        <Heading>Do AI Agents Use Heuristics?</Heading>
        <Lead className="!max-w-none !mb-4">
          AI agents learn from text written by people, so researchers ask
          whether agents also show human biases.
        </Lead>
        {/* Two kinds of evidence, side by side: heuristic-like and rational. */}
        <div className="grid w-full gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-none">
                Some studies find heuristic-like choices. AI models stated a
                higher willingness to pay for a product after seeing a high
                number in the question, which is an anchoring effect (Wadi &amp;
                Fredette, 2025).
              </P>
            </Ruled>
            <P className="!max-w-none">
              In that study, newer models were more susceptible to anchoring
              than older models. A newer model is not always a less biased one
              (Wadi &amp; Fredette, 2025).
            </P>
            <Plate wide>
              <V.AnchorByGeneration />
            </Plate>
            <P className="!max-w-none">
              AI agents can also favor options because of where they appear in a
              list, which is a position effect (Wadi &amp; Ma, 2026a).
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                Other studies find rational choices. When all product details
                were visible, seven of eight AI agents gave the cents in a price
                the same weight as whole dollars, so a $4.99 price did not
                mislead them (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
            <P>
              Likewise, six of eight agents gave a dollar saved through a
              discount the same weight as a dollar of list price (Wadi &amp; Ma,
              2026b).
            </P>
            <Plate className="mt-auto">
              <V.EightAgents />
            </Plate>
          </div>
        </div>
        <Statement className="mt-5 !max-w-[60ch] !text-[clamp(1.25rem,1.9vw,1.6rem)]">
          Whether an agent shows a bias therefore depends on{" "}
          <Tint>the conditions in which it chooses</Tint>.
        </Statement>
      </Slide>

      {/* ================================================================
          Information Costs and Storefront Design
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="information-costs-and-storefront-design"
        border
        exercise={exercise["information-costs-and-storefront-design"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Information Costs and Storefront Design
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Storefront information architecture</Term> is the way a
                store organizes product information and how easy it is to reach.
              </P>
            </Ruled>
            <P>
              A human shopper who must click into each product page to find its
              weight faces a search cost. An AI agent faces the same kind of
              cost in time, computing, or money.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                When the details were hidden behind costly look-ups and the goal
                was vague, AI agents often skipped the details needed to compare
                value (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
          </div>
          {/* The instrument: switch the goal and the cost of a look-up. */}
          <Plate wide>
            <V.StorefrontLab />
          </Plate>
        </div>
        <div className="mt-4 grid w-full gap-6 border-t-2 border-[var(--ink)] pt-3 md:grid-cols-3 md:gap-8">
          <P>
            Their choices then looked like human heuristics. They chose the
            lower whole-dollar price or the lower list price, even when it was
            the worse deal (Wadi &amp; Ma, 2026b).
          </P>
          <P>
            When the agents were given the missing details, most chose the
            better product, and none made an error when asked to calculate the
            price per unit (Wadi &amp; Ma, 2026b).
          </P>
          <P>
            In most cases, the heuristic-like choice came from{" "}
            <Term>the information the agent held</Term>, not from an error in
            its reasoning.
          </P>
        </div>
        <Statement className="mt-4 !max-w-none !text-[clamp(1.1rem,1.45vw,1.3rem)]">
          Retailers who make diagnostic details, such as weight and unit price,
          easy for agents to reach <Tint>help agents choose well</Tint>. Rules
          that require unit prices on shelf labels were written for human
          shoppers and do not yet cover what an agent can reach.
        </Statement>
      </Slide>

      {/* ================================================================
          Discussion: Spot the Shortcut
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-spot-the-shortcut" border>
        <Heading kicker="Discussion:" tone="counter">
          Spot the Shortcut
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>
            <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">
              Find an online product page or a store shelf. Which heuristics,
              anchors, or frames does it use? Would an AI agent shopping for you
              be affected by the same cues, and which details would it need to
              see to avoid them?
            </p>
          </div>
          <Plate>
            <V.ProductPage />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
