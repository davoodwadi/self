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
// CONSUMER BEHAVIOR · WEEK 10 — SOCIAL INFLUENCES, REFERENCE GROUPS, AND
// WORD OF MOUTH
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's fixed cast: the shopper (one Person look), the
// sneaker being weighed up, the speech bubble that carries advice, the review
// card, and the AI assistant.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive plates (students act on the drawing itself):
//   · Asch's room: answer the line test, then switch the room (alone, the
//     group answering first, writing the answer down) on Asch's (1956) data.
//   · Who asks whom: switch the product category and watch whose advice
//     spreads: each opinion leader in one category, the market maven in all.
//   · Fake reviews: add synthetic five-star reviews (SIMULATED) and watch the
//     AI summary, the shopper and the AI agent change their pick.
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


export default function Week10() {
  return (
    <SlideDeck label="Week 10">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 10
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[20ch]">
              Social Influences, Reference Groups, and Word of Mouth
            </Title>
            <div className="mt-8 max-w-[42ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                Consumers rarely choose alone. Other people, and now AI
                assistants, <Tint>shape what they buy</Tint>.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[580px]">
            <V.NotAlone />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Why Other People Shape Our Choices
          ================================================================ */}
      <Slide className={TIGHT} id="why-other-people-shape-our-choices" border>
        <Heading>Why Other People Shape Our Choices</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <Statement className="!max-w-[24ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
            Consumers look to other people for{" "}
            <Tint>information, approval, and a sense of identity</Tint>.
          </Statement>
          <Cells
            cols={2}
            className="lg:!grid-cols-2"
            items={[
              {
                key: "teen",
                tone: "ink",
                plate: <V.AdmiredSneakers />,
                text: <>A teenager chooses sneakers that friends will admire.</>,
              },
              {
                key: "parent",
                tone: "ink",
                plate: <V.AskOtherParents />,
                text: <>A new parent asks other parents which stroller to buy.</>,
              },
            ]}
          />
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                Social influence is strongest for products that others can
                see, such as clothing, cars, and phones.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Social influence is weaker for private products, such as
                toothpaste or a mattress.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Marketers use social influence when they show real customers,
                popular choices, and recommendations from trusted people.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.SeenOrNot />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Reference Groups: Membership, Aspirational, and Dissociative
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="reference-groups-membership-aspirational-and-dissociative"
        border
        exercise={exercise["reference-groups-membership-aspirational-and-dissociative"]}
      >
        <Heading kicker="Reference Groups:">
          Membership, Aspirational, and Dissociative
        </Heading>
        <Statement className="!max-w-[56ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
          A <Term>reference group</Term> is a person or group whose values and
          behavior a consumer uses as a guide.
        </Statement>
        <Cells
          cols={3}
          className="mt-6"
          items={[
            {
              key: "membership",
              tone: "ink",
              plate: <V.TeamPhoto />,
              text: (
                <>
                  A <Term>membership group</Term> is a group the consumer
                  already belongs to, such as family, classmates, or a sports
                  team.
                </>
              ),
            },
            {
              key: "aspirational",
              tone: "ink",
              plate: <V.LookingUp />,
              text: (
                <>
                  An <Term>aspirational group</Term> is a group the consumer
                  wants to join, such as successful professionals or elite
                  athletes.
                </>
              ),
            },
            {
              key: "dissociative",
              tone: "ink",
              plate: <V.TurnAway />,
              text: (
                <>
                  A <Term>dissociative group</Term> is a group the consumer
                  wants to avoid being associated with.
                </>
              ),
            },
          ]}
        />
        <Big className="mt-6 !max-w-[70ch] !text-[clamp(1.15rem,1.6vw,1.4rem)]">
          Consumers buy products that{" "}
          <Tint>signal membership in the groups they value</Tint> and avoid
          products linked with groups they reject.
        </Big>
      </Slide>

      {/* ================================================================
          Three Types of Reference Group Influence
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="three-types-of-reference-group-influence"
        border
        exercise={exercise["three-types-of-reference-group-influence"]}
      >
        <Heading className="!max-w-none">Three Types of Reference Group Influence</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-10">
          <Statement className="!max-w-[20ch] !text-[clamp(1.4rem,2.2vw,1.9rem)]">
            Reference groups influence consumers in{" "}
            <Tint>three ways</Tint> (Park &amp; Lessig, 1977).
          </Statement>
          <div className="flex min-w-0 flex-col gap-4">
            <SideCell plate={<V.AskTheExpertFriend />} className="sm:grid-cols-[1.2fr_1fr]" plateClass="lg:max-w-[240px] lg:justify-self-end">
              <Term>Informational influence</Term> occurs when a consumer
              seeks advice from people with expertise, such as asking a friend
              who works in IT which laptop to buy.
            </SideCell>
            <SideCell plate={<V.DressForTheOffice />} className="sm:grid-cols-[1.2fr_1fr]" plateClass="lg:max-w-[240px] lg:justify-self-end">
              <Term>Utilitarian influence</Term> occurs when a consumer
              conforms to gain rewards or avoid disapproval, such as dressing
              to meet the expectations of coworkers.
            </SideCell>
            <SideCell plate={<V.AthletesBrand />} className="sm:grid-cols-[1.2fr_1fr]" plateClass="lg:max-w-[240px] lg:justify-self-end">
              <Term>Value-expressive influence</Term> occurs when a consumer
              buys a product to express a desired identity, such as buying the
              brand that athletes wear.
            </SideCell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Conformity: Following the Group
          ================================================================ */}
      <Slide className={TIGHT} id="conformity-following-the-group" border>
        <Heading kicker="Conformity:">Following the Group</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.75fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              <Term>Conformity</Term> is a change in beliefs or behavior in
              response to real or imagined group pressure.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <Statement className="!max-w-none !text-[clamp(1.1rem,1.5vw,1.3rem)]">
                In classic experiments, many people gave an obviously wrong
                answer{" "}
                <Tint>when everyone else in the room gave it first</Tint>{" "}
                (Asch, 1956).
              </Statement>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Consumers conform to <Term>norms</Term>, the informal rules
                about what is appropriate in a group.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.AschRoom />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.HarderToTell />} className="sm:grid-cols-[1fr_1fr]">
            Conformity is stronger when the group is cohesive, when the
            consumer is uncertain, and when the choice is public.
          </SideCell>
          <SideCell plate={<V.BestsellerShelf />} className="sm:grid-cols-[1fr_1fr]">
            Labels such as &quot;bestseller&quot; and &quot;most popular&quot;
            use conformity by showing what other consumers chose.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Five Bases of Social Power
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="five-bases-of-social-power"
        border
        exercise={exercise["five-bases-of-social-power"]}
      >
        <Heading>Five Bases of Social Power</Heading>
        <Statement className="!max-w-[56ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
          <Term>Social power</Term> is{" "}
          <Tint>the capacity to change the actions of others</Tint> (French
          &amp; Raven, 1959).
        </Statement>
        <Cells
          cols={5}
          className="mt-6"
          items={[
            {
              key: "referent",
              tone: "ink",
              plate: <V.CopyTheAthlete />,
              text: (
                <>
                  <Term>Referent power</Term> comes from admiration. Consumers
                  imitate people they like and identify with, such as a
                  favorite athlete.
                </>
              ),
            },
            {
              key: "legitimate",
              tone: "ink",
              plate: <V.OfficerStop />,
              text: (
                <>
                  <Term>Legitimate power</Term> comes from a recognized
                  position or role, such as a police officer or a teacher.
                </>
              ),
            },
            {
              key: "expert",
              tone: "ink",
              plate: <V.DermatologistAdvice />,
              text: (
                <>
                  <Term>Expert power</Term> comes from knowledge or skill, such
                  as a dermatologist recommending a sunscreen.
                </>
              ),
            },
            {
              key: "reward",
              tone: "ink",
              plate: <V.Rewards />,
              text: (
                <>
                  <Term>Reward power</Term> comes from the ability to give
                  something valued, such as praise, a discount, or a prize.
                </>
              ),
            },
            {
              key: "coercive",
              tone: "ink",
              plate: <V.ParkingFine />,
              text: (
                <>
                  <Term>Coercive power</Term> comes from the ability to punish,
                  such as social exclusion or a fine.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Expert Power and AI Assistants
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="expert-power-and-ai-assistants"
        border
        exercise={exercise["expert-power-and-ai-assistants"]}
      >
        <Heading>Expert Power and AI Assistants</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead className="!max-w-[46ch]">
              Consumers now ask AI assistants which product to buy, much as
              they would ask a knowledgeable friend.
            </Lead>
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-[60ch]">
                Many consumers attribute expert power to these assistants,
                because the answers are fluent, detailed, and fast.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-[60ch]">
                This attributed expertise gives the assistant{" "}
                <Tint>influence over the consideration set and the final choice</Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate className="mx-auto lg:max-w-[380px]">
            <V.AskTheAssistant />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.SameConfidence />} className="sm:grid-cols-[1fr_1.1fr]">
            Expert power depends on actual knowledge. An AI assistant can state
            wrong facts with the same confidence as correct ones.
          </SideCell>
          <SideCell plate={<V.WhoPaysTheExpert />} className="sm:grid-cols-[1fr_1.1fr]">
            Expert power also depends on independence. Consumers trust a human
            expert less when the expert is paid to recommend a product.{" "}
            The same question applies to an AI assistant: consumers need to
            know whether the platform that runs it profits from what it
            recommends.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Word of Mouth and Opinion Leaders
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="word-of-mouth-and-opinion-leaders"
        border
        exercise={exercise["word-of-mouth-and-opinion-leaders"]}
      >
        <Heading>Word of Mouth and Opinion Leaders</Heading>
        <div className="grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.FriendOrAd />} className="sm:grid-cols-[1fr_230px]">
            <Term>Word of mouth (WOM)</Term> is product information passed
            from one consumer to another.{" "}
            WOM is more credible than advertising, because the speaker usually
            has no financial interest in the sale.
          </SideCell>
          <SideCell plate={<V.OneComplaint />} className="sm:grid-cols-[1fr_230px]">
            <Tint>Negative WOM carries more weight than positive WOM.</Tint>{" "}
            Consumers pay more attention to a complaint than to praise.
          </SideCell>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1.5fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <SideCell plate={<V.EWomForms />} className="sm:grid-cols-[1fr_190px]">
              <Term>Electronic word of mouth (eWOM)</Term> includes online
              reviews, ratings, forum posts, and social media comments.
            </SideCell>
            <Ruled tone="ink" className="!pt-3">
              <P>
                An <Term>opinion leader</Term> is a person who frequently
                influences the attitudes and behavior of others in a product
                category.{" "}
                Opinion leaders are knowledgeable, involved in the category,
                and socially active. Their influence is usually limited to one
                category, such as fashion or technology.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A <Term>market maven</Term> has broad information about many
                kinds of products and places to shop, and likes to share it
                (Feick &amp; Price, 1987).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.WhoAsksWhom />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          AI-Generated Review Summaries and Synthetic Reviews
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="ai-generated-review-summaries-and-synthetic-reviews"
        border
        exercise={exercise["ai-generated-review-summaries-and-synthetic-reviews"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          AI-Generated Review Summaries and Synthetic Reviews
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              Many shopping sites now show a short summary of a product&apos;s
              reviews, written by AI.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Consumers may read the summary instead of the reviews
                themselves. The summary then becomes a new source of word of
                mouth.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A summary reflects the reviews it draws on. If many of those
                reviews were written in return for a reward, the summary
                carries the same influence.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.FakeReviews />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-8 gap-y-5 lg:grid-cols-[1fr_1.5fr_1fr]">
          <Ruled tone="ink" className="!pt-3">
            <P>
              AI also makes it easy to write <Term>synthetic reviews</Term>:
              reviews that look genuine but were not written by real
              customers.{" "}
              Synthetic reviews weaken the credibility that makes word of
              mouth powerful.
            </P>
          </Ruled>
          <SideCell plate={<V.FakeReviewBan />} className="sm:grid-cols-[1.15fr_1fr]">
            In 2024, the U.S. Federal Trade Commission adopted a rule that bans
            fake reviews, including reviews attributed to people who do not
            exist, such as reviews generated by AI.
          </SideCell>
          <Ruled tone="ink" className="!pt-3">
            <Big className="!text-[clamp(1.05rem,1.4vw,1.25rem)]">
              AI agents that shop for consumers also read reviews. A fake
              review can therefore{" "}
              <Tint>mislead the consumer and the agent at the same time</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Influencers, Virtual Influencers, and Online Communities
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="influencers-virtual-influencers-and-online-communities"
        border
        exercise={exercise["influencers-virtual-influencers-and-online-communities"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.8rem,2.8vw,2.6rem)]">
          Influencers, Virtual Influencers, and Online Communities
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              An <Term>influencer</Term> is a person who has built an audience
              on social media and promotes products to it.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Macro-influencers</Term> have large audiences.{" "}
                <Term>Micro-influencers</Term> have smaller audiences but
                often <Tint>higher engagement and trust</Tint>.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.MacroMicro />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.OneSided />} className="sm:grid-cols-[1fr_220px]">
            Followers can form a <Term>parasocial relationship</Term> with an
            influencer: a one-sided feeling of friendship with someone they
            have never met.
          </SideCell>
          <SideCell plate={<V.VirtualInfluencer />} className="sm:grid-cols-[1fr_220px]">
            A <Term>virtual influencer</Term> is a computer-generated character
            that posts and promotes products like a human influencer, such as
            Lil Miquela.{" "}
            A virtual influencer has no lived experience of the product it
            promotes, which raises questions about its credibility and honesty.
          </SideCell>
          <SideCell plate={<V.BrandForum />} className="sm:grid-cols-[1fr_220px]">
            Online communities, such as brand forums and fan groups, act as
            social proof. Members see how others use a product and adopt the
            group&apos;s norms.
          </SideCell>
          <SideCell plate={<V.PaidPost />} className="sm:grid-cols-[1fr_220px]">
            Paid endorsements must be disclosed, so that followers can judge
            the message as advertising.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Who Influenced Your Last Purchase?
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-who-influenced-your-last-purchase" border>
        <Heading kicker="Discussion:" tone="counter">
          Who Influenced Your Last Purchase?
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">
              Think of a recent purchase. Which person, group, influencer, or
              AI assistant influenced it? Which base of social power did that
              source have over you?
            </p>
          </div>
          <Plate className="mx-auto lg:max-w-[440px]">
            <V.WhoInfluenced />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
