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
// CONSUMER BEHAVIOR · WEEK 09 — POST-PURCHASE BEHAVIOR, SATISFACTION, AND LOYALTY
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's fixed cast: the owner (one Person look), the
// headphones she bought, the Face that marks satisfaction, the review card,
// the coffee bag an agent reorders, and the AI agent.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive plates (students act on the drawing itself):
//   · Disconfirmation: drag the ad's promise and the product's performance;
//     the face reports the verdict. Overpromising flips it.
//   · Review requests: switch reviewer, incentive and message on the
//     retailer's field data (Wadi et al., 2026b, Table II).
//   · Delegated repurchase: drag a rival coffee along the price scale and
//     watch which bag each instruction's agent reorders.
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

export default function Week9() {
  return (
    <SlideDeck label="Week 09">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 09
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[20ch]">
              Post-Purchase Behavior, Satisfaction, and Loyalty
            </Title>
            <div className="mt-8 max-w-[42ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                The sale is not the end of the relationship. What happens after
                the purchase decides{" "}
                <Tint>whether the consumer returns</Tint>.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <V.AfterTheSale />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          After the Purchase
          ================================================================ */}
      <Slide className={TIGHT} id="after-the-purchase" border>
        <Heading>After the Purchase</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <Statement className="!max-w-[26ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
            <Term>Postpurchase behavior</Term> includes{" "}
            <Tint>everything the consumer does after buying</Tint>: using the
            product, judging it, talking about it, and eventually getting rid
            of it.
          </Statement>
          <Plate wide>
            <V.ProductLife />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                In this stage, the consumer decides whether the purchase was a
                good one.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                That judgment shapes repeat purchases, reviews,
                recommendations, and complaints.
              </P>
            </Ruled>
          </div>
          <SideCell plate={<V.KeepVsWin />} className="sm:grid-cols-[1fr_1fr]">
            Keeping an existing customer usually costs less than winning a new
            one.{" "}
            For this reason, marketers study the postpurchase stage as closely
            as the purchase itself.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Expectations and Reality: The Disconfirmation Model
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="expectations-and-reality-the-disconfirmation-model"
        border
        exercise={exercise["expectations-and-reality-the-disconfirmation-model"]}
      >
        <Heading kicker="Expectations and Reality:">
          The Disconfirmation Model
        </Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[0.85fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              <Term>Customer satisfaction</Term> is the consumer&apos;s overall
              feeling about a product after purchase and use.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <Statement className="!max-w-none !text-[clamp(1.15rem,1.6vw,1.4rem)]">
                The <Term>expectancy disconfirmation model</Term> states that
                satisfaction depends on{" "}
                <Tint>the gap between expectations and perceived performance</Tint>{" "}
                (Oliver, 1980).
              </Statement>
            </Ruled>
          </div>
          <Plate wide className="self-center">
            <V.Disconfirmation />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled tone="ink" className="!pt-3">
            <P>
              <Term>Positive disconfirmation</Term> occurs when performance
              exceeds expectations. The consumer is satisfied or delighted.
            </P>
          </Ruled>
          <Ruled tone="ink" className="!pt-3">
            <P>
              <Term>Confirmation</Term> occurs when performance matches
              expectations. The consumer is satisfied.
            </P>
          </Ruled>
          <Ruled tone="ink" className="!pt-3">
            <P>
              <Term>Negative disconfirmation</Term> occurs when performance
              falls below expectations. The consumer is dissatisfied.
            </P>
          </Ruled>
        </div>
        <Big className="mt-6 !max-w-[64ch] !text-[clamp(1.15rem,1.6vw,1.4rem)]">
          Marketers who promise too much in advertising raise expectations and
          make negative disconfirmation more likely.
        </Big>
      </Slide>

      {/* ================================================================
          Other Influences on Satisfaction
          ================================================================ */}
      <Slide className={TIGHT} id="other-influences-on-satisfaction" border>
        <Heading>Other Influences on Satisfaction</Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Perceived quality</Term> is the consumer&apos;s judgment
                of how well the product performs its function.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Equity theory</Term> states that consumers judge whether
                an exchange was fair. They compare what they gave, such as
                money and effort, with what they received.
              </P>
            </Ruled>
            <Plate>
              <V.EquityScale />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-none">
                <Term>Attribution theory</Term> explains how consumers assign
                the cause of a product failure.
              </P>
            </Ruled>
            <div className="grid w-full gap-6 md:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-3">
                <P>
                  If a consumer blames the company for a failure that the
                  company could have prevented,{" "}
                  <Tint>dissatisfaction is stronger</Tint>.
                </P>
                <Plate className="mt-auto">
                  <V.BlameCompany />
                </Plate>
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <P>
                  If a consumer blames chance or their own misuse,
                  dissatisfaction is weaker.
                </P>
                <Plate className="mt-auto">
                  <V.BlameSelf />
                </Plate>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Cognitive Dissonance and Buyer's Regret
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cognitive-dissonance-and-buyers-regret"
        border
        exercise={exercise["cognitive-dissonance-and-buyers-regret"]}
      >
        <Heading>Cognitive Dissonance and Buyer&apos;s Regret</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!max-w-[34ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
              <Term>Cognitive dissonance</Term> is the discomfort a person
              feels when holding two conflicting beliefs (Festinger, 1957).
            </Statement>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Postpurchase dissonance</Term> occurs when a consumer{" "}
                <Tint>doubts a purchase decision after making it</Tint>.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Buyer&apos;s regret</Term> is the feeling that another
                option would have been better.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SecondThoughts />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.FinalSale />} className="sm:grid-cols-[1fr_1.1fr]">
            Dissonance is most likely when the purchase is expensive,
            important, and hard to reverse.
          </SideCell>
          <SideCell
            plate={<V.MissingFeature />}
            className="sm:grid-cols-[1fr_1.1fr]"
          >
            Dissonance is also more likely when the rejected alternatives had
            attractive features that the chosen product lacks.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Reducing Postpurchase Dissonance
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="reducing-postpurchase-dissonance"
        border
        exercise={exercise["reducing-postpurchase-dissonance"]}
      >
        <Heading>Reducing Postpurchase Dissonance</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <Lead className="!max-w-[52ch]">
            Consumers reduce dissonance on their own. They{" "}
            <Tint>seek information that supports their choice</Tint>, avoid
            information that favors the rejected options, or lower the
            importance of the missing features.
          </Lead>
          <Plate>
            <V.SupportingInfo />
          </Plate>
        </div>
        <Cells
          cols={4}
          className="mt-6"
          items={[
            {
              key: "follow-up",
              tone: "ink",
              plate: <V.ThankYouNote />,
              text: (
                <>
                  Marketers can help. A follow-up message thanks
                  the customer and confirms the benefits of the product.
                </>
              ),
            },
            {
              key: "guarantees",
              tone: "ink",
              plate: <V.WarrantyReturns />,
              text: (
                <>
                  Guarantees, warranties, and easy return policies reduce the
                  risk that the consumer feels after buying.
                </>
              ),
            },
            {
              key: "owners",
              tone: "ink",
              plate: <V.OwnersAd />,
              text: (
                <>
                  Advertising that shows satisfied owners reassures recent
                  buyers as well as future ones.
                </>
              ),
            },
            {
              key: "service",
              tone: "ink",
              plate: <V.QuickReply />,
              text: (
                <>
                  Customer service that responds quickly to problems prevents
                  doubt from turning into dissatisfaction.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Responses to Dissatisfaction
          ================================================================ */}
      <Slide className={TIGHT} id="responses-to-dissatisfaction" border>
        <Heading>Responses to Dissatisfaction</Heading>
        <Lead className="!max-w-none !mb-5">
          A dissatisfied consumer can respond in three ways (Singh, 1988).
        </Lead>
        <Cells
          cols={3}
          items={[
            {
              key: "voice",
              tone: "ink",
              plate: <V.VoiceResponse />,
              text: (
                <>
                  A <Term>voice response</Term> means complaining directly to
                  the seller and asking for a refund or repair.
                </>
              ),
            },
            {
              key: "private",
              tone: "ink",
              plate: <V.PrivateResponse />,
              text: (
                <>
                  A <Term>private response</Term> means switching brands and
                  warning friends and family.
                </>
              ),
            },
            {
              key: "third-party",
              tone: "ink",
              plate: <V.ThirdPartyResponse />,
              text: (
                <>
                  A <Term>third-party response</Term> means taking action
                  through an outside party, such as a consumer agency, a court,
                  or a public online review.
                </>
              ),
            },
          ]}
        />
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_2.1fr] lg:gap-10">
          <Ruled tone="ink">
            <Big className="!text-[clamp(1.15rem,1.6vw,1.4rem)]">
              Most dissatisfied customers never complain to the firm. A
              complaint is therefore{" "}
              <Tint>an opportunity to recover the customer</Tint>.
            </Big>
          </Ruled>
          <Plate wide>
            <V.SilentMajority />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Product Disposal and Secondary Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="product-disposal-and-secondary-markets"
        border
        exercise={exercise["product-disposal-and-secondary-markets"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Product Disposal and Secondary Markets
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Lead className="!max-w-none">
              Disposal is the final stage of consumption.
            </Lead>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A consumer can <Term>keep</Term> a product, using it for its
                original purpose, finding a new use for it, or storing it.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A consumer can get rid of a product{" "}
                <Term>temporarily</Term>, by renting it out or lending it.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A consumer can get rid of a product <Term>permanently</Term>,
                by throwing it away, giving it away, trading it, or selling it.
              </P>
            </Ruled>
          </div>
          {/* Left to right, the plate's three paths follow the three lines. */}
          <Plate wide>
            <V.DisposalPaths />
          </Plate>
        </div>
        <div className="mt-5 grid w-full items-center gap-x-10 gap-y-5 lg:grid-cols-[1.35fr_1fr]">
          <SideCell
            plate={<V.LateralCycling />}
            className="sm:grid-cols-[1fr_0.9fr]"
          >
            <Term>Lateral cycling</Term> occurs when one consumer&apos;s used
            product passes to another consumer, through a garage sale, a thrift
            store, or a resale app.
          </SideCell>
          <Ruled tone="ink" className="!pt-3">
            <Big className="!text-[clamp(1.1rem,1.5vw,1.3rem)]">
              Secondary markets for clothing, electronics, and furniture{" "}
              <Tint>give products a second life</Tint> and create new business
              models for brands.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Online Reviews as Postpurchase Behavior
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="online-reviews-as-postpurchase-behavior"
        border
        exercise={exercise["online-reviews-as-postpurchase-behavior"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Online Reviews as Postpurchase Behavior
        </Heading>
        <div className="grid w-full gap-x-8 gap-y-4 md:grid-cols-3">
          <Lead className="!max-w-none !text-[clamp(1.1rem,1.5vw,1.3rem)]">
            Writing an online review is one of the most visible postpurchase
            behaviors.
          </Lead>
          <P>
            Consumers write reviews to help other shoppers, to express
            satisfaction or anger, to gain recognition, or to return a favor to
            the firm.
          </P>
          <P>
            <Term>Social exchange theory</Term> helps explain the request to
            write a review. A request to help other shoppers reinforces a
            social exchange. A request to help the company reinforces a
            reciprocal exchange.
          </P>
        </div>
        <div className="mt-5 grid w-full gap-8 lg:grid-cols-[1fr_2.25fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              When a review request offered a financial incentive, asking
              customers to help the company worked less well than asking them
              to help other shoppers (Wadi et al., 2026a).
            </P>
            <Plate className="mt-auto">
              <V.HelpWhom />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-2">
              <P>
                Incentives paid only for helpful reviews raised review writing
                and review length more among first-time reviewers than among
                experienced reviewers (Wadi et al., 2026b).
              </P>
              <P>
                A message framed as a reciprocal exchange with the company led
                reviewers to write longer reviews, but fewer customers chose to
                write one (Wadi et al., 2026b).
              </P>
            </div>
            <Plate wide>
              <V.ReviewRequests />
            </Plate>
          </div>
        </div>
        <div className="mt-5 grid w-full items-center gap-6 border-t-2 border-[var(--ink)] pt-3 sm:grid-cols-[1fr_124px]">
          <Big className="!text-[clamp(1.1rem,1.5vw,1.3rem)]">
            Reviews now have two audiences. They inform human shoppers and{" "}
            <Tint>the AI agents that read reviews on shoppers&apos; behalf</Tint>.
          </Big>
          <div className="figure-well w-full min-w-0 p-1.5">
            <V.TwoAudiences />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          From Satisfaction to Loyalty
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="from-satisfaction-to-loyalty"
        border
        exercise={exercise["from-satisfaction-to-loyalty"]}
      >
        <Heading>From Satisfaction to Loyalty</Heading>
        <Statement className="!max-w-[52ch] !text-[clamp(1.35rem,2.1vw,1.85rem)]">
          <Term>Brand loyalty</Term> is a pattern of repeat purchase supported
          by a positive attitude toward the brand (Dick &amp; Basu, 1994).
        </Statement>
        <Cells
          cols={3}
          className="mt-5"
          items={[
            {
              key: "true",
              tone: "ink",
              plate: <V.TrueLoyalty />,
              text: (
                <>
                  <Term>True loyalty</Term> combines frequent repeat purchase
                  with a strong positive attitude.
                </>
              ),
            },
            {
              key: "spurious",
              tone: "ink",
              plate: <V.SpuriousLoyalty />,
              text: (
                <>
                  <Term>Spurious loyalty</Term> is repeat purchase without a
                  strong attitude. The consumer buys out of habit, convenience,
                  or lack of alternatives.
                </>
              ),
            },
            {
              key: "latent",
              tone: "ink",
              plate: <V.LatentLoyalty />,
              text: (
                <>
                  <Term>Latent loyalty</Term> is a strong positive attitude
                  without repeat purchase. The consumer likes the brand but
                  rarely buys it, perhaps because of price or availability.
                </>
              ),
            },
          ]}
        />
        <div className="mt-6 grid w-full items-center gap-x-10 gap-y-5 lg:grid-cols-[1.3fr_1fr]">
          <SideCell plate={<V.BetterDeal />} className="sm:grid-cols-[1fr_0.95fr]">
            <Tint>Satisfaction does not guarantee loyalty.</Tint> Satisfied
            customers still switch when a competitor offers a better deal.
          </SideCell>
          <Ruled tone="ink" className="!pt-3">
            <Big className="!text-[clamp(1.1rem,1.5vw,1.3rem)]">
              Loyalty programs reward repeat purchase, but they build true
              loyalty only when customers also value the brand.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Brand Loyalty and Delegated Repurchase
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-loyalty-and-delegated-repurchase"
        border
        exercise={exercise["brand-loyalty-and-delegated-repurchase"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Brand Loyalty and Delegated Repurchase
        </Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[0.85fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Lead className="!max-w-none">
              AI agents can now reorder routine products for the consumer, such
              as detergent, coffee, or pet food.
            </Lead>
            <P>When an agent handles the repurchase, loyalty can take two forms.</P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Loyalty to the brand</Term> appears when the consumer
                names the brand in the instruction, for example &quot;reorder
                my usual coffee.&quot;
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Reliance on the agent</Term> appears when the consumer
                states only a goal, for example &quot;buy coffee at the best
                price,&quot; and lets the agent choose the brand.
              </P>
            </Ruled>
          </div>
          <div className="min-w-0">
            <P className="mb-3 !max-w-none">
              In the second case, the agent&apos;s choice depends on the goal it
              was given and the information it gathers (Wadi &amp; Ma, 2026b).
              The consumer&apos;s past attachment to a brand may count for
              little unless the instruction mentions it.
            </P>
            <Plate wide>
              <V.UsualOrBest />
            </Plate>
          </div>
        </div>
        <div className="mt-6 grid w-full gap-6 border-t-2 border-[var(--ink)] pt-3 md:grid-cols-2 md:gap-10">
          <P>
            Spurious loyalty based on habit is therefore at risk when
            repurchase is delegated. A brand is more secure when{" "}
            <Tint>the consumer names it in the instruction</Tint> or when it
            remains the best option under the consumer&apos;s criteria.
          </P>
          <P>
            Brands that depend on delegated repurchase compete to be named in
            the consumer&apos;s instruction and to present clear product
            information to the agent.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: The Review You Did Not Write
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-the-review-you-did-not-write" border>
        <Heading kicker="Discussion:" tone="counter">
          The Review You Did Not Write
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">
              Think of a product you were very satisfied or dissatisfied with.
              Did you write a review? What would have made you write one, and
              would the answer change if the firm had offered you a reward?
            </p>
          </div>
          <Plate className="mx-auto lg:max-w-[420px]">
            <V.UnwrittenReview />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
