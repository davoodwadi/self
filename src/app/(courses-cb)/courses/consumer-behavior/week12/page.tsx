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
// CONSUMER BEHAVIOR · WEEK 12 — AI-MEDIATED CONSUMPTION AND FUTURE TRENDS
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's fixed cast: the consumer (one Person look), the AI
// agent and the listing (one result row, tagged when paid for).
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive plates (students act on the drawing itself):
//   · The filter bubble: like products in a feed and watch it narrow
//     (SIMULATED recommender, labelled on the plate).
//   · Whom the agent serves: tag a hotel as sponsored and change whom the
//     system prompt says the agent works for (real data: Wadi & Ma, 2026c,
//     Study 1, 500 bookings per setting).
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


export default function Week12() {
  return (
    <SlideDeck label="Week 12">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 12
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[20ch]">
              AI-Mediated Consumption and Future Trends
            </Title>
            <div className="mt-8 max-w-[46ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                Consumers increasingly shop through screens, algorithms, and AI
                agents. The question is{" "}
                <Tint>whose interests these intermediaries serve</Tint>.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[600px]">
            <V.DeskOfResults />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Digital Consumer
          ================================================================ */}
      <Slide className={TIGHT} id="the-digital-consumer" border>
        <Heading>The Digital Consumer</Heading>
        <div className="grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.PhoneInTheAisle />} className="sm:grid-cols-[1fr_1.1fr]">
            Most consumers now research, compare, and buy at least part of
            their purchases online.{" "}
            The smartphone is the main shopping device for many consumers. They
            check prices and reviews even while standing in a physical store.
          </SideCell>
          <SideCell plate={<V.RecordToOffer />} className="sm:grid-cols-[1fr_1.1fr]">
            Digital shopping leaves a record of every search, click, and
            purchase.{" "}
            Firms use this record to personalize products, prices, and
            messages.
          </SideCell>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[0.75fr_2fr] lg:gap-10">
          <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
            Between the consumer and the product now stand{" "}
            <Tint>several intermediaries</Tint>: platforms, recommendation
            algorithms, and AI agents.
          </Statement>
          <Plate wide>
            <V.Intermediaries />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Mobile Shopping and Social Commerce
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="mobile-shopping-and-social-commerce"
        border
        exercise={exercise["mobile-shopping-and-social-commerce"]}
      >
        <Heading>Mobile Shopping and Social Commerce</Heading>
        <Cells
          cols={4}
          items={[
            {
              key: "mobile",
              tone: "ink",
              plate: <V.LateNightBuy />,
              text: (
                <>
                  <Term>Mobile shopping</Term> is buying through a smartphone
                  app or mobile website.{" "}
                  Mobile shopping makes purchases possible at any moment, which
                  increases impulse buying.
                </>
              ),
            },
            {
              key: "social",
              tone: "ink",
              plate: <V.TapToBuy />,
              text: (
                <>
                  <Term>Social commerce</Term> is buying directly inside a
                  social media platform, without leaving the app.{" "}
                  A consumer sees a product in a video, taps it, and buys it in
                  the same feed.
                </>
              ),
            },
            {
              key: "live",
              tone: "ink",
              plate: <V.LiveStream />,
              text: (
                <>
                  <Term>Live-stream shopping</Term> combines entertainment, a
                  host&apos;s demonstration, and a limited-time offer.
                </>
              ),
            },
            {
              key: "merge",
              tone: "ink",
              plate: <V.StagesMerge />,
              text: (
                <>
                  Social commerce joins social influence and the purchase in a
                  single moment, so{" "}
                  <Tint>the prepurchase and purchase stages almost merge</Tint>.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Algorithm-Driven Discovery
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="algorithm-driven-discovery"
        border
        exercise={exercise["algorithm-driven-discovery"]}
      >
        <Heading>Algorithm-Driven Discovery</Heading>
        <div className="grid w-full items-center gap-x-10 gap-y-5 lg:grid-cols-[1fr_1.15fr]">
          <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.45rem)]">
            A <Term>recommender system</Term> is an algorithm that suggests
            products based on a consumer&apos;s past behavior and the behavior
            of similar consumers.
          </Statement>
          <SideCell plate={<V.TwoRecommenders />} className="sm:grid-cols-[1fr_1.3fr]">
            &quot;Customers who bought this also bought&quot; and a
            personalized streaming home page are recommender systems.
          </SideCell>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              Recommendations help consumers find relevant products in very
              large assortments.
            </P>
            <P>
              Recommendations also narrow what consumers see. A consumer may
              never discover products outside the algorithm&apos;s predictions.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A <Term>filter bubble</Term> forms when the algorithm keeps
                showing more of what the consumer already likes.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.FilterBubble />
          </Plate>
        </div>
        <Big className="mt-5 !max-w-[72ch] !text-[clamp(1.1rem,1.5vw,1.3rem)]">
          In algorithm-driven discovery,{" "}
          <Tint>the algorithm decides which products reach the consumer&apos;s attention</Tint>.
        </Big>
      </Slide>

      {/* ================================================================
          Agentic Commerce: From Recommendation to Autonomous Purchase
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="agentic-commerce-from-recommendation-to-autonomous-purchase"
        border
        exercise={exercise["agentic-commerce-from-recommendation-to-autonomous-purchase"]}
      >
        <Heading kicker="Agentic Commerce:" className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          From Recommendation to Autonomous Purchase
        </Heading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          <Term>Agentic commerce</Term> is shopping in which an AI agent{" "}
          <Tint>acts for the consumer, not only advises</Tint>.
        </Statement>
        <Cells
          cols={4}
          className="mt-5"
          items={[
            {
              key: "l1",
              tone: "ink",
              plate: <V.AgentLevel1 />,
              text: (
                <>
                  At the first level, the AI recommends products, and the
                  consumer searches and buys.
                </>
              ),
            },
            {
              key: "l2",
              tone: "ink",
              plate: <V.AgentLevel2 />,
              text: (
                <>
                  At the second level, the AI searches and compares options,
                  and the consumer chooses and buys.
                </>
              ),
            },
            {
              key: "l3",
              tone: "ink",
              plate: <V.AgentLevel3 />,
              text: (
                <>
                  At the third level, the AI selects a product and prepares the
                  purchase, and the consumer approves it.
                </>
              ),
            },
            {
              key: "l4",
              tone: "ink",
              plate: <V.AgentLevel4 />,
              text: (
                <>
                  At the fourth level, the AI completes the purchase on its own
                  within limits the consumer has set, such as a budget.
                </>
              ),
            },
          ]}
        />
        <div className="mt-6 grid w-full items-center gap-x-10 gap-y-5 lg:grid-cols-[1fr_1.4fr]">
          <Ruled tone="ink" className="!pt-3">
            <Big className="!text-[clamp(1.1rem,1.5vw,1.3rem)]">
              At each level, the consumer hands more of the decision to the
              agent and sees less of the marketplace directly.
            </Big>
          </Ruled>
          <SideCell plate={<V.TwoAudiences />} className="sm:grid-cols-[1fr_1.2fr]">
            Marketers then inform two parties: the consumer who sets the goal
            and the agent that carries it out.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Conflicts of Duty: Whom Does the AI Agent Serve?
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="conflicts-of-duty-whom-does-the-ai-agent-serve"
        border
        exercise={exercise["conflicts-of-duty-whom-does-the-ai-agent-serve"]}
      >
        <Heading kicker="Conflicts of Duty:" className="!max-w-none">Whom Does the AI Agent Serve?</Heading>
        <div className="grid w-full items-center gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.75fr]">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              In a <Term>principal–agent relationship</Term>, an agent acts on
              behalf of a principal and owes that principal a duty of loyalty.
            </P>
            <P>
              A consumer who relies on an AI shopping assistant expects to be
              its principal.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              The platform that deploys the assistant may also profit when the
              assistant recommends <Term>sponsored listings</Term>, which are
              products whose sellers paid for placement.
            </P>
            <P>
              The AI agent then faces a <Term>conflict of duty</Term> between
              two principals: the consumer and the platform.
            </P>
          </div>
          <Plate className="md:col-span-2 lg:col-span-1">
            <V.TwoPrincipals />
          </Plate>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 border-t-2 border-[var(--ink)] pt-4 lg:grid-cols-[1fr_1.75fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              In hotel-booking experiments, an AI agent told that it worked for
              the traveler chose a sponsored hotel less often than an otherwise
              similar hotel without sponsorship (Wadi &amp; Ma, 2026c).
            </P>
            <P>
              When the same agent was told that it worked for the booking
              platform, it penalized sponsored hotels less (Wadi &amp; Ma,
              2026c).
            </P>
            <P>
              Adding one sentence stating that its recommendations should serve
              the traveler removed this difference (Wadi &amp; Ma, 2026c).
            </P>
          </div>
          <Plate wide>
            <V.WhomItServes />
          </Plate>
        </div>
        <Big className="mt-5 !max-w-[72ch] !text-[clamp(1.1rem,1.5vw,1.3rem)]">
          <Tint>Whom the agent is told it serves</Tint> shapes the
          recommendation the consumer receives.
        </Big>
      </Slide>

      {/* ================================================================
          Disclosure Reaches the Agent, Not the Consumer
          ================================================================ */}
      <Slide className={TIGHT} id="disclosure-reaches-the-agent-not-the-consumer" border>
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Disclosure Reaches the Agent, Not the Consumer
        </Heading>
        <div className="grid w-full gap-x-10 gap-y-6 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              Disclosure rules require platforms to label paid placements, so
              that consumers can discount them.
            </P>
            <P>
              When an AI agent reads the listings for the consumer, the label
              reaches the agent, and the consumer may never see it.
            </P>
            <Plate className="mt-auto">
              <V.LabelReachesAgent />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              The wording of the label mattered. &quot;Sponsored&quot; reduced
              choice of the paid listing more than &quot;Promoted&quot; did
              (Wadi &amp; Ma, 2026c).
            </P>
            <P>
              A clearer label did not remove the difference between an agent
              that served the traveler and one that served the platform (Wadi
              &amp; Ma, 2026c).
            </P>
            <Plate className="mt-auto">
              <V.LabelWording />
            </Plate>
          </div>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-4 md:grid-cols-2">
          <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.45rem)]">
            Disclosure rules written for human consumers{" "}
            <Tint>cannot by themselves protect consumers</Tint> in AI-mediated
            commerce.
          </Statement>
          <Ruled tone="ink" className="!pt-3">
            <Big className="!text-[clamp(1.1rem,1.5vw,1.3rem)]">
              Stating that the consumer is the beneficiary of the agent&apos;s
              recommendations offers a direct protection.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Data Collection and Surveillance
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="data-collection-and-surveillance"
        border
        exercise={exercise["data-collection-and-surveillance"]}
      >
        <Heading>Data Collection and Surveillance</Heading>
        <Cells
          cols={3}
          items={[
            {
              key: "collect",
              tone: "ink",
              plate: <V.DataTrail />,
              text: (
                <>
                  Firms collect data on consumers&apos; searches, locations,
                  purchases, and conversations with AI assistants.{" "}
                  Personalization gives consumers relevant offers and saves
                  them time.
                </>
              ),
            },
            {
              key: "paradox",
              tone: "ink",
              plate: <V.PrivacyParadox />,
              text: (
                <>
                  The <Term>privacy paradox</Term> is the gap between what
                  consumers say and what they do. Many consumers say they value
                  privacy, yet they share personal data for small benefits.
                </>
              ),
            },
            {
              key: "conversations",
              tone: "ink",
              plate: <V.SearchVsChat />,
              text: (
                <>
                  <Term>Surveillance capitalism</Term> describes a business
                  model that turns data on human behavior into predictions that
                  are sold to others (Zuboff, 2019).{" "}
                  Conversations with AI assistants can reveal needs, worries,
                  and plans in more detail than a search history.
                </>
              ),
            },
          ]}
        />
        <Big className="mt-6 !max-w-[78ch] !text-[clamp(1.1rem,1.5vw,1.3rem)]">
          Ethical data practice asks consumers for{" "}
          <Tint>informed consent</Tint>, collects only what is needed, and
          explains how the data will be used.
        </Big>
      </Slide>

      {/* ================================================================
          Algorithmic Pricing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="algorithmic-pricing"
        border
        exercise={exercise["algorithmic-pricing"]}
      >
        <Heading>Algorithmic Pricing</Heading>
        <Statement className="!max-w-[60ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          <Term>Algorithmic pricing</Term> uses software to set and change
          prices automatically.
        </Statement>
        <Cells
          cols={3}
          className="mt-5"
          items={[
            {
              key: "dynamic",
              tone: "ink",
              plate: <V.SeatsAndFares />,
              text: (
                <>
                  <Term>Dynamic pricing</Term> changes prices with demand and
                  supply, such as surge pricing for rides or airfares that rise
                  as seats sell.
                </>
              ),
            },
            {
              key: "personalized",
              tone: "ink",
              plate: <V.TwoPrices />,
              text: (
                <>
                  <Term>Personalized pricing</Term> charges different consumers
                  different prices for the same product, based on data about
                  each consumer.{" "}
                  Consumers often judge personalized pricing as unfair,
                  especially when they learn that someone else paid less.
                </>
              ),
            },
            {
              key: "algorithms",
              tone: "ink",
              plate: <V.AlgorithmMeetsAgent />,
              text: (
                <>
                  In simulations, pricing algorithms learned to keep prices
                  high without any communication between the firms (Calvano,
                  Calzolari, Denicolò, &amp; Pastorello, 2020).{" "}
                  When AI agents shop for consumers, pricing algorithms may face
                  buying algorithms, and both the price and the choice may be
                  set <Tint>without a human in the moment of purchase</Tint>.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Sustainable Consumption and the Conscious Consumer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sustainable-consumption-and-the-conscious-consumer"
        border
        exercise={exercise["sustainable-consumption-and-the-conscious-consumer"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.7rem,2.8vw,2.6rem)]">
          Sustainable Consumption and the Conscious Consumer
        </Heading>
        <div className="grid w-full gap-x-8 gap-y-4 md:grid-cols-[1.4fr_1fr]">
          <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.45rem)]">
            <Term>Sustainable consumption</Term> is buying and using products
            in ways that meet present needs without harming the ability of
            future generations to meet theirs.
          </Statement>
          <Ruled tone="ink" className="!pt-3">
            <P>
              The <Term>conscious consumer</Term> considers the environmental
              and social effects of a purchase, not only its price and
              performance.
            </P>
          </Ruled>
        </div>
        <Cells
          cols={3}
          className="mt-5"
          items={[
            {
              key: "gap",
              tone: "ink",
              plate: <V.SayGreenBuyCheap />,
              text: (
                <>
                  The <Term>attitude-behavior gap</Term> is the difference
                  between positive attitudes toward sustainability and actual
                  purchases. Many consumers say they prefer green products but
                  buy the cheaper option.
                </>
              ),
            },
            {
              key: "greenwash",
              tone: "ink",
              plate: <V.Greenwash />,
              text: (
                <>
                  <Term>Greenwashing</Term> occurs when a firm makes misleading
                  claims about the environmental benefits of its products.{" "}
                  Resale, repair, rental, and sharing extend the life of
                  products and reduce waste.
                </>
              ),
            },
            {
              key: "delegate",
              tone: "ink",
              plate: <V.GreenInstruction />,
              text: (
                <>
                  A consumer who delegates shopping to an AI agent can include
                  sustainability in the instruction. The agent can then{" "}
                  <Tint>apply the criterion to every purchase</Tint>, provided
                  it gathers the information needed to judge it.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Looking Back: The Consumer and the Agent
          ================================================================ */}
      <Slide className={TIGHT} id="looking-back-the-consumer-and-the-agent" border>
        <Heading kicker="Looking Back:">The Consumer and the Agent</Heading>
        <Statement className="!max-w-[62ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          This course has followed the consumer from perception and memory
          through motivation, attitudes, decisions, and social influence.
        </Statement>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-none">
                The same theories now describe two actors: the consumer and the
                AI agent that searches and buys on the consumer&apos;s behalf.
              </P>
            </Ruled>
            <P className="!max-w-none">
              The agent perceives products through data, retrieves brands from
              what has been written about them, and can show heuristic-like
              choices when information is costly.
            </P>
            <P className="!max-w-none">
              The consumer still holds the goal, the values, and the experience
              of using the product.
            </P>
          </div>
          <Plate className="mx-auto lg:max-w-[460px]">
            <V.TwoActors />
          </Plate>
        </div>
        <Big className="mt-6 !max-w-[80ch] !text-[clamp(1.1rem,1.5vw,1.3rem)]">
          Marketers who understand both actors can{" "}
          <Tint>inform them honestly</Tint>. Marketing that exploits the limits
          of either actor harms consumer well-being and weakens trust in the
          market.
        </Big>
      </Slide>

      {/* ================================================================
          Discussion: Your Agent's Instructions
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-your-agents-instructions" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Agent&apos;s Instructions
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">
              Imagine you give an AI agent the authority to do your weekly
              shopping for one year. Which goals, limits, and values would you
              write into its instructions? Whose interests should it serve if
              the platform that runs it earns money from sponsored products?
            </p>
          </div>
          <Plate className="mx-auto lg:max-w-[440px]">
            <V.AgentInstructions />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
