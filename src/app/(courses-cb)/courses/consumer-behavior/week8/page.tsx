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
import {
  Lead,
  Numbered,
  P,
  PartHead,
  Plate,
  Prompt,
  Ruled,
  SlideHeading,
  Statement,
  Term,
  TIGHT,
  Tint,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AnchorByGeneration,
  AnchorDigits,
  CompareEvery,
  DealTag,
  EightAgents,
  GoodEnough,
  LeanFat,
  LeftDigit,
  LossBalance,
  OrganDefaults,
  ProductPage,
  RecallPaper,
  ShortcutShelf,
  SlowCompare,
  StorefrontLab,
  WinePrice,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 8: BEHAVIORAL ECONOMICS, HEURISTICS, AND BIASES
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week8() {
  return (
    <SlideDeck label="Week 8">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 8
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Behavioral Economics, Heuristics, and Biases
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Behavioral economics explains how{" "}
              <Tint>
                cognitive shortcuts, reference points, and choice architecture
              </Tint>{" "}
              systematically shape decisions made by human consumers and by AI
              shopping agents.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          From Classical Utility to Behavioral Economics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="from-classical-utility-to-behavioral-economics"
        border
      >
        <SlideHeading>
          From Classical Utility to Behavioral Economics
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Neoclassical economic theory</Term> assumes that consumers
              hold stable preferences, evaluate outcomes in terms of absolute
              wealth, and maximize expected utility without cognitive error.
            </Lead>
            <Ruled>
              <P>
                <Term>Behavioral economics</Term> integrates experimental
                psychology into economic analysis to study how real people make
                financial and consumption choices.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CompareEvery />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Rather than treating departures from utility maximization as
              random noise, behavioral economics shows that human deviations are{" "}
              <Tint>systematic, directional, and predictable</Tint>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A price tag, a default checkbox, or the order in which menu items
              appear can alter choice share even when underlying product utility
              is unchanged.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Understanding these regularities helps marketers design persuasive
              offers and helps regulators protect consumers from predictable
              traps.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Bounded Rationality and Satisficing
          ================================================================ */}
      <Slide className={TIGHT} id="bounded-rationality-and-satisficing" border>
        <SlideHeading>Bounded Rationality and Satisficing</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Herbert Simon introduced <Term>bounded rationality</Term> to
              describe decision making under realistic constraints of limited
              time, incomplete market information, and finite working memory
              (Simon, 1955).
            </Lead>
            <Ruled>
              <P>
                Because exhaustive optimization across hundreds of products is
                computationally intractable for a human shopper, consumers
                replace optimization with <Term>satisficing</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <GoodEnough />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Satisficing</Term> means setting an{" "}
              <Term>aspiration level</Term> (a threshold of what counts as good
              enough) and terminating search as soon as an alternative meets
              that threshold.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Satisficing is an adaptive response to search costs rather than a
              sign of irrationality.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, because satisficers stop searching once they find an
              acceptable option, the{" "}
              <Tint>sequence in which alternatives are encountered</Tint>{" "}
              strongly influences which product is chosen.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Dual-Process Thinking and Judgment Heuristics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-dual-process-thinking-and-judgment-heuristics"
        border
      >
        <PartHead n={1} title="Dual-Process Thinking and Judgment Heuristics" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Dual-process theories of cognition distinguish between{" "}
            <Tint>rapid intuitive impressions and deliberate analytical reasoning</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Under everyday shopping constraints, consumers rely on judgment
              heuristics that trade exhaustive accuracy for speed.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          System 1 and System 2 Modes of Thought
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="system-1-and-system-2-modes-of-thought"
        border
        exercise={exercise["system-1-and-system-2-modes-of-thought"]}
      >
        <SlideHeading>System 1 and System 2 Modes of Thought</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Daniel Kahneman popularized the distinction between two modes of
              cognitive processing: <Term>System 1</Term> and{" "}
              <Term>System 2</Term> (Kahneman, 2011).
            </Lead>
            <Ruled>
              <P>
                <Term>System 1</Term> operates automatically, rapidly, and
                effortlessly, generating immediate affective impressions and
                recognizing familiar brand colors or red clearance tags at a
                glance.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SlowCompare />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>System 2</Term> allocates slow, effortful, and conscious
              mental computation to complex tasks, such as calculating unit
              prices across different package sizes or reading mortgage contract
              terms.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because System 2 requires scarce cognitive energy, consumers{" "}
              <Tint>default to System 1 judgments</Tint> for most routine
              grocery and online retail purchases.
            </P>
          </Ruled>
          <Ruled>
            <P>
              System 2 overrides System 1 only when the consumer detects a clear
              anomaly, faces high stakes, and has sufficient time and cognitive
              capacity available.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Availability and Representativeness Heuristics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="availability-and-representativeness-heuristics"
        border
        exercise={exercise["availability-and-representativeness-heuristics"]}
      >
        <SlideHeading>
          Availability and Representativeness Heuristics
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              A <Term>heuristic</Term> is a mental rule of thumb that simplifies
              judgment by substituting an easier question for a harder
              statistical question (Tversky &amp; Kahneman, 1974).
            </Lead>
            <Ruled>
              <P>
                The <Term>availability heuristic</Term> estimates the frequency
                or probability of an event by the ease with which instances can
                be retrieved from memory.
              </P>
            </Ruled>
          </div>
          <Plate>
            <RecallPaper />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Vivid media coverage of a single product recall or aircraft
              incident makes the event highly accessible in memory, causing
              consumers to <Tint>overestimate the objective risk</Tint> of that
              brand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>representativeness heuristic</Term> judges the
              probability that an object belongs to a category by how closely
              its surface features resemble the category prototype.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Private-label packages that mimic the typography and color palette
              of a national brand leader leverage representativeness to imply
              comparable manufacturing quality.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Market Beliefs and Price-Quality Inferences
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="market-beliefs-and-price-quality-inferences"
        border
      >
        <SlideHeading>Market Beliefs and Price-Quality Inferences</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Over repeated marketplace experiences, consumers develop{" "}
              <Term>generalized market beliefs</Term> that serve as
              domain-specific heuristics.
            </Lead>
            <Ruled>
              <P>
                The <Term>price-quality heuristic</Term> is the belief that
                higher monetary price reliably indicates superior materials,
                craftsmanship, or performance (Rao &amp; Monroe, 1989).
              </P>
            </Ruled>
          </div>
          <Plate>
            <WinePrice />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Consumers rely on the price-quality heuristic most heavily when{" "}
              <Tint>objective quality is difficult to judge</Tint> prior to
              purchase, as with wine, cosmetics, or medical services.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Placebos and blind taste tests show that labeling the identical
              wine with a higher price tag increases not only self-reported
              taste ratings but also activity in brain regions associated with
              experienced pleasantness (Plassmann et al., 2008).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Other common market beliefs include assuming that larger package
              sizes always offer a lower unit price or that stores with
              warehouse decor charge lower margins.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Reference Points, Prospect Theory, and Framing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-reference-points-prospect-theory-and-framing"
        border
      >
        <PartHead
          n={2}
          title="Reference Points, Prospect Theory, and Framing"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Human consumers do not evaluate prices, gains, and losses in
            absolute terms. Instead, they judge every outcome{" "}
            <Tint>relative to a psychological reference point</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Anchoring, prospect theory, and framing effects explain how
              shifting the reference point reverses consumer preferences.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Anchoring and Arbitrary Reference Numbers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="anchoring-and-arbitrary-reference-numbers"
        border
        exercise={exercise["anchoring-and-arbitrary-reference-numbers"]}
      >
        <SlideHeading>Anchoring and Arbitrary Reference Numbers</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Anchoring and adjustment</Term> occurs when an initial
              numerical value serves as a starting reference point that pulls
              subsequent numerical estimates toward it (Tversky &amp; Kahneman,
              1974).
            </Lead>
            <Ruled>
              <P>
                Adjustments away from an initial anchor are typically
                insufficient, leaving final judgments{" "}
                <Tint>biased toward the starting number</Tint>.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <AnchorDigits />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In a classic experiment by Ariely, Loewenstein, and Prelec (2003),
              participants who first wrote down the last two digits of their
              social security number stated significantly higher maximum
              willingness to pay for wine, chocolates, and computer accessories
              when those random digits were high.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Retailers establish commercial anchors through manufacturer
              suggested retail prices (&ldquo;Compare at 120 dollars&rdquo;),
              high-priced decoy items at the top of a menu, and purchase
              quantity limits (&ldquo;Limit 12 cans per customer&rdquo;).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Even when buyers know a reference price is inflated, the anchor
              still elevates the price they consider acceptable.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Prospect Theory, Loss Aversion, and the Endowment Effect
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="prospect-theory-loss-aversion-and-the-endowment-effect"
        border
        exercise={
          exercise["prospect-theory-loss-aversion-and-the-endowment-effect"]
        }
      >
        <SlideHeading>
          Prospect Theory, Loss Aversion, and the Endowment Effect
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Developed by Daniel Kahneman and Amos Tversky (1979),{" "}
              <Term>prospect theory</Term> replaces classical expected utility
              with a value function defined over gains and losses relative to a
              reference point.
            </Lead>
            <Ruled>
              <P>
                First, the value function exhibits{" "}
                <Term>diminishing sensitivity</Term>: the psychological
                difference between a 10-dollar and 20-dollar gain feels much
                larger than the difference between a 1,010-dollar and
                1,020-dollar gain.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LossBalance />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Second, the value function is steeper in the domain of losses than
              in the domain of gains, a property known as{" "}
              <Term>loss aversion</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Loss aversion implies that losing 50 dollars inflicts{" "}
              <Tint>roughly twice as much psychological pain</Tint> as gaining
              50 dollars provides pleasure.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>endowment effect</Term> is a direct corollary of loss
              aversion: once a consumer owns or possesses an item (such as
              through a 30-day free home trial), giving it up is coded as a
              loss, raising the value assigned to the item (Thaler, 1980).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Status Quo Bias and Attribute Framing
          ================================================================ */}
      <Slide className={TIGHT} id="status-quo-bias-and-attribute-framing" border>
        <SlideHeading>Status Quo Bias and Attribute Framing</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Status quo bias</Term> is the strong preference for
              maintaining one&apos;s current state or existing service provider
              because any change requires trading potential gains against more
              heavily weighted potential losses (Samuelson &amp; Zeckhauser,
              1988).
            </Lead>
            <Ruled>
              <P>
                Consumers frequently remain on suboptimal telecommunications
                plans, insurance policies, or software subscriptions because
                switching feels risky and effortful.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LeanFat />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Attribute framing</Term> occurs when describing the exact
              same objective statistic in{" "}
              <Tint>positive versus negative terms</Tint> alters evaluation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In a classic study by Levin and Gaeth (1988), consumers evaluated
              ground beef as leaner and higher in quality when labeled &ldquo;75
              percent lean&rdquo; than when labeled &ldquo;25 percent fat.&rdquo;
            </P>
          </Ruled>
          <Ruled>
            <P>
              Similarly, framing a price difference between payment methods as a
              &ldquo;cash discount&rdquo; triggers less resistance than framing
              the identical gap as a &ldquo;credit card surcharge.&rdquo;
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Auditing Behavioral Pricing on an E-Commerce Page
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-auditing-behavioral-pricing-on-an-e-commerce-page"
        border
      >
        <SlideHeading kicker="Discussion:">
          Auditing Behavioral Pricing on an E-Commerce Page
        </SlideHeading>
        <Prompt>
          An online travel booking platform displays a hotel room with the
          crossed-out label &ldquo;Was 340 dollars, Now 219 dollars,&rdquo;
          pre-selects a 28-dollar trip-protection insurance add-on labeled
          &ldquo;Recommended: Don&apos;t risk losing your non-refundable
          booking,&rdquo; and shows a banner reading &ldquo;Only 1 room left at
          this price.&rdquo; Identify the exact behavioral economics mechanisms
          operating in each element, explain how System 1 and prospect theory
          predict the traveler&apos;s response, and distinguish which elements
          are informative versus manipulative.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Mental Accounting, Pricing Cues, and Choice Architecture
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-mental-accounting-pricing-cues-and-choice-architecture"
        border
      >
        <PartHead
          n={3}
          title="Mental Accounting, Pricing Cues, and Choice Architecture"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Consumers organize financial decisions into{" "}
            <Tint>separate mental budgets</Tint> and respond systematically to
            how digits, discounts, and default options are structured.
          </Statement>
          <Ruled>
            <Lead>
              Mental accounting and choice architecture provide a framework for
              analyzing retail pricing and public policy nudges.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Mental Accounting, Sunk Costs, and Transaction Utility
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="mental-accounting-sunk-costs-and-transaction-utility"
        border
      >
        <SlideHeading>
          Mental Accounting, Sunk Costs, and Transaction Utility
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Formulated by Richard Thaler (1985), <Term>mental accounting</Term>{" "}
              describes how individuals code, categorize, and evaluate financial
              outcomes into separate mental budgets rather than treating money
              as perfectly fungible.
            </Lead>
            <Ruled>
              <P>
                Consumers spend a 100-dollar tax refund or casino windfall more
                freely on hedonic luxuries than 100 dollars of regular wage
                income.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DealTag />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Total utility from a purchase is the sum of{" "}
              <Term>acquisition utility</Term> (the value of the good received
              relative to its price) and <Term>transaction utility</Term> (the{" "}
              <Tint>perceived psychological merit of the deal</Tint> relative to
              the consumer&apos;s internal reference price) (Thaler, 1985).
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>sunk cost effect</Term> occurs when consumers continue
              using or investing in a poor option solely because they have
              already paid a non-recoverable fee, such as attending an outdoor
              event in a rainstorm because tickets were prepaid (Arkes &amp;
              Blumer, 1985).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Subscription pricing and prepaid vacation packages decouple the
              moment of payment from the moment of consumption, reducing the
              pain of paying during usage (Prelec &amp; Loewenstein, 1998).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Just-Below Pricing and the Left-Digit Effect
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="just-below-pricing-and-the-left-digit-effect"
        border
        exercise={exercise["just-below-pricing-and-the-left-digit-effect"]}
      >
        <SlideHeading>
          Just-Below Pricing and the Left-Digit Effect
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Just-below pricing</Term> (or charm pricing) sets a retail
              price one cent or one unit below a round number, such as 4.99
              dollars instead of 5.00 dollars or 199 dollars instead of 200
              dollars.
            </Lead>
            <Ruled>
              <P>
                Because consumers read numerical prices from left to right under
                System 1, they anchor disproportionately on the{" "}
                <Tint>leftmost digit</Tint> before finishing encoding the
                remaining digits, a phenomenon known as the{" "}
                <Term>left-digit effect</Term> (Thomas &amp; Morwitz, 2005).
              </P>
            </Ruled>
          </div>
          <Plate>
            <LeftDigit />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Consequently, a one-cent reduction from 5.00 dollars to 4.99
              dollars lowers perceived price magnitude much more than a one-cent
              reduction from 4.99 dollars to 4.98 dollars.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Just-below pricing is particularly effective when the left digit
              changes and when the buyer is not performing explicit arithmetic
              comparisons.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, luxury and prestige brands often use{" "}
              <Term>round-number pricing</Term> (such as 500 dollars rather than
              499.99 dollars) because round numbers are processed fluently and
              signal high quality rather than discount positioning.
            </P>
          </Ruled>
        </div>
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
        <SlideHeading>Choice Architecture, Defaults, and Nudges</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Choice architecture</Term> refers to the design of the
              environment in which people make decisions, including option
              ordering, attribute grouping, and default settings (Thaler &amp;
              Sunstein, 2008).
            </Lead>
            <Ruled>
              <P>
                A <Term>default option</Term> is the outcome that takes effect
                automatically if the decision maker takes no active step to
                change it.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <OrganDefaults />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Because of status quo bias, effort minimization, and the
              perception that the default represents an implicit endorsement by
              the designer, defaults exert powerful effects on behavior.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In a cross-national study by Johnson and Goldstein (2003),
              countries where organ donation was the default (opt-out) achieved{" "}
              <Tint>consent rates above 85 percent</Tint>, whereas comparable
              countries requiring active registration (opt-in) achieved rates
              below 30 percent.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>nudge</Term> alters choice architecture to steer behavior
              in a predictable way that benefits the chooser without forbidding
              any alternatives or significantly changing economic incentives
              (Thaler &amp; Sunstein, 2008).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Heuristic-Like Choice in AI Shopping Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-heuristic-like-choice-in-ai-shopping-agents"
        border
      >
        <PartHead n={4} title="Heuristic-Like Choice in AI Shopping Agents" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Because large language models are trained on human-generated text,
            researchers investigate whether AI shopping agents{" "}
            <Tint>replicate human cognitive biases or behave like rational economic calculators</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Controlled experiments reveal that whether an AI agent exhibits a
              behavioral bias depends critically on the task structure and
              information environment.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Anchoring and Position Effects in Language Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="anchoring-and-position-effects-in-language-models"
        border
      >
        <SlideHeading>
          Anchoring and Position Effects in Language Models
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1.35fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              In judgment tasks lacking an objective calculation formula, large
              language models can display classic human-like biases.
            </Lead>
            <Ruled>
              <P>
                When asked to state willingness to pay for consumer products
                after exposure to an arbitrary numerical anchor in the prompt,
                language models shifted their valuations toward the anchor (Wadi
                &amp; Fredette, 2025).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <AnchorByGeneration />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Notably, newer and more capable model generations exhibited{" "}
              <Tint>stronger susceptibility to numerical anchoring</Tint> than
              earlier generations, demonstrating that scaling model size does
              not automatically eliminate judgment biases (Wadi &amp; Fredette,
              2025).
            </P>
          </Ruled>
          <Ruled>
            <P>
              In multi-option choice tasks, AI shopping agents also exhibit
              pronounced <Term>position effects</Term>, favoring options placed
              at the beginning or end of a candidate list (Wadi &amp; Ma,
              2026a).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Thus, in open-ended valuation and list scanning, language models
              inherit contextual sensitivities from their architecture and
              training data.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How AI Agents Respond to Just-Below Pricing and Promotional Framing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-ai-agents-respond-to-just-below-pricing-and-promotional-framing"
        border
        exercise={
          exercise[
            "how-ai-agents-respond-to-just-below-pricing-and-promotional-framing"
          ]
        }
      >
        <SlideHeading>
          How AI Agents Respond to Just-Below Pricing and Promotional Framing
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1.3fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              A central question for retail pricing is whether AI shopping
              agents are fooled by System 1 pricing cues such as 4.99-dollar
              just-below prices and &ldquo;Save 20 percent&rdquo; promotional
              discount frames.
            </Lead>
            <Ruled>
              <P>
                In controlled experiments where all product attributes and
                prices were simultaneously visible on the screen,{" "}
                <Term>seven out of eight</Term> tested AI shopping agents
                weighted the cents component of a price equally with the
                whole-dollar component (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <EightAgents />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Under full information, a 4.99-dollar price tag did not induce a
              left-digit illusion in those agents compared with a 5.00-dollar
              price tag (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Similarly, <Term>six out of eight</Term> tested agents weighted a
              dollar saved through a promotional discount identically to a
              dollar reduction in regular list price, showing no
              transaction-utility distortion (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              When relevant numbers are directly visible, most frontier AI
              agents <Tint>evaluate prices arithmetically</Tint> rather than
              relying on human System 1 perceptual shortcuts.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Distinguishing Reasoning Errors from Information Deficits
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="distinguishing-reasoning-errors-from-information-deficits"
        border
      >
        <SlideHeading>
          Distinguishing Reasoning Errors from Information Deficits
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Why do AI shopping agents sometimes make choices that resemble
              human heuristic errors in realistic digital storefronts?
            </Lead>
            <Ruled>
              <P>
                Research by Wadi and Ma (2026b) demonstrates that apparent
                heuristic behavior in AI agents usually stems from{" "}
                <Tint>incomplete information acquisition</Tint> rather than
                flawed arithmetic reasoning.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ShortcutShelf />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When agents were explicitly given all package weights and prices
              and instructed to compute unit prices, <Term>zero agents</Term>{" "}
              made a calculation error (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, when package weights were hidden behind costly secondary
              lookups and the user&apos;s goal was stated vaguely, agents
              frequently skipped the weight lookup and selected the option with
              the lower headline dollar price or larger promotional badge (Wadi
              &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Treating an agent&apos;s choice error as an internal cognitive
              bias when it is actually a rational response to lookup costs and
              vague instructions leads to the wrong managerial diagnosis.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Information Acquisition Costs and Storefront Architecture
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-information-acquisition-costs-and-storefront-architecture"
        border
      >
        <PartHead
          n={5}
          title="Information Acquisition Costs and Storefront Architecture"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Storefront information architecture determines how product
            attributes are organized across{" "}
            <Tint>search summary pages, detail pages, and API endpoints</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              How a retailer structures attribute visibility directly governs
              whether AI shopping agents make value-maximizing or heuristic-like
              choices.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Hidden Attributes and Search Costs in Agent-Mediated Shopping
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="hidden-attributes-and-search-costs-in-agent-mediated-shopping"
        border
      >
        <SlideHeading>
          Hidden Attributes and Search Costs in Agent-Mediated Shopping
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              In many online stores, the search results page displays only the
              product title, thumbnail image, headline price, and promotional
              badge, while net weight or unit count requires opening the
              individual product page.
            </Lead>
            <Ruled>
              <P>
                For both a time-pressed human shopper and an AI agent facing
                token or latency costs, this two-tier layout imposes an{" "}
                <Term>information acquisition cost</Term> on calculating true
                unit value.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <StorefrontLab />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When lookup costs are positive and the buyer&apos;s prompt is
              vague (&ldquo;buy the best deal&rdquo;), AI agents often rely on
              the visible headline price alone and select smaller packages with
              higher unit costs (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              The resulting choice mimics human left-digit or promotional
              framing biases even though the underlying mechanism is costly
              information search (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Storefront friction therefore{" "}
              <Tint>converts an analytically capable AI agent into a surface-cue chooser</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Full-Information Recovery and Unit-Price Calculation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="full-information-recovery-and-unit-price-calculation"
        border
      >
        <SlideHeading>
          Full-Information Recovery and Unit-Price Calculation
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Two interventions restore rational unit-value choice in AI
              shopping agents:{" "}
              <Term>lowering storefront lookup friction</Term> or{" "}
              <Term>increasing prompt specificity</Term> (Wadi &amp; Ma, 2026b).
            </Lead>
            <Ruled>
              <P>
                First, when diagnostic attributes such as net weight, volume, or
                unit price are surfaced directly on the initial search results
                feed, agents incorporate them immediately and select the lower
                cost per ounce (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
          </div>
          <Plate>
            <ProductPage />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Second, even when attributes remain hidden behind costly lookups,
              instructing the agent with a <Term>specific criterion</Term>{" "}
              (&ldquo;find the lowest price per ounce&rdquo;) compels the agent
              to pay the lookup cost and verify weight before choosing (Wadi
              &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Retailers offering genuine unit-price value benefit from{" "}
              <Tint>surfacing complete package specifications</Tint> in
              machine-readable search summaries.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, sellers offering poor unit value behind low headline
              prices benefit when diagnostic attributes are buried deeper in the
              interface.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Regulatory and Merchandising Implications for Storefront Design
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="regulatory-and-merchandising-implications-for-storefront-design"
        border
      >
        <SlideHeading>
          Regulatory and Merchandising Implications for Storefront Design
        </SlideHeading>
        <Lead>
          Consumer protection regulations in many jurisdictions require
          supermarkets to print <Term>standardized unit prices</Term> (price per
          100 grams or per ounce) on physical shelf tags.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              These disclosure mandates were written for human shoppers walking
              down physical aisles and often do not specify how unit prices must
              be exposed in digital HTML or API feeds consulted by AI agents.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If unit prices are rendered only as visual graphics or buried
              behind secondary clicks, an AI agent shopping for a consumer does
              not receive the regulatory protection intended for the buyer.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Updating choice-architecture regulation for agentic commerce
              requires mandating that unit prices, mandatory fees, and package
              quantities be exposed in{" "}
              <Tint>standardized, low-friction machine-readable fields</Tint>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Brands that provide transparent, easily accessible unit
              specifications build preference among both analytical human buyers
              and autonomous shopping agents.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing Storefront Architecture for Human and AI Shoppers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-storefront-architecture-for-human-and-ai-shoppers"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing Storefront Architecture for Human and AI Shoppers
        </SlideHeading>
        <Prompt>
          A consumer advocacy agency is reviewing an online grocery marketplace
          where national brands sell 14-ounce cereal boxes for 4.99 dollars
          (&ldquo;Special Deal!&rdquo;) alongside 18-ounce boxes for 5.29
          dollars, with package weights visible only after clicking a secondary
          &ldquo;Specifications&rdquo; tab on each product page. Based on
          Kahneman (2011), Thomas and Morwitz (2005), and Wadi and Ma (2026b),
          compare how a rushed human shopper versus an AI shopping agent
          responds to this storefront under vague versus specific instructions,
          and propose a regulatory standard for digital unit-price disclosure.
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <P>
              Behavioral economics shows that consumers operate under bounded
              rationality and satisfice rather than optimize exhaustively across
              all market options.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              System 1 thinking is fast, automatic, and effortless, whereas
              System 2 thinking is slow, analytical, and effortful, leading
              everyday shoppers to rely on availability, representativeness, and
              price-quality heuristics.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Judgments are reference-dependent: arbitrary numerical anchors
              shift willingness to pay, prospect theory&apos;s loss aversion
              makes losses loom roughly twice as large as gains (driving the
              endowment effect and status quo bias), and positive attribute
              frames outperform negative frames.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Mental accounting, transaction utility, and the left-digit effect
              in just-below pricing (4.99 dollars vs. 5.00 dollars) shape price
              perception, while choice architecture uses defaults and nudges to
              guide behavior.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              AI models exhibit anchoring in open-ended valuation and position
              effects in list choice, but under full information most AI
              shopping agents weight cents and promotional discounts rationally
              without left-digit or transaction-utility illusions.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              When storefront architecture hides diagnostic attributes such as
              package weight behind costly lookups and the user&apos;s goal is
              vague, AI agents skip lookups and make heuristic-like choices,
              which can be corrected by specific delegation prompts or
              transparent machine-readable unit pricing.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
