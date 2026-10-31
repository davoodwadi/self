"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Statement, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  BotMeetsBot,
  BuyBox,
  CouponDispersion,
  DataAppropriation,
  DetectionLag,
  DualEntitlement,
  FacingMachines,
  ForcedCut,
  Frames,
  OutputExpansion,
  Pathway,
  PricingThenNow,
  ReservationEstimate,
  RuleVsScore,
  SameMoment,
  SieveStack,
  SteeredResults,
  SurplusCapture,
  TrustLedger,
} from "./visuals";

// ============================================================================
// WEEK 9: ALGORITHMIC PRICING, COLLUSION, AND FAIR COMPETITION
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week9Page() {
  return (
    <SlideDeck label="Week 9">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 9: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">Algorithmic Pricing, Collusion, and Fair Competition</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[58ch] !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          When algorithms set prices continuously and interact with competing
          algorithms, governance must address granular price discrimination,
          consumer fairness perceptions,{" "}
          tacit algorithmic collusion,
          and platform self-preferencing.
        </p>
      </Slide>

      {/* ================================================================
          When Algorithms Set Market Prices [no-exercise]
          ================================================================ */}
      <Slide id="when-algorithms-set-market-prices" border className="!py-8">
        <SlideHeading className="!mb-5">When Algorithms Set Market Prices</SlideHeading>
        <Statement className="mb-6 !max-w-none !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          Price is the central coordinating signal of a market economy and the
          only element of the marketing mix that directly generates revenue.
        </Statement>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Historically, changing prices across thousands of products required
              manual analysis and physical menu or shelf updates, which kept prices
              relatively stable and uniform across shoppers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Today, automated pricing algorithms observe competitor prices,
              inventory levels, search traffic, and individual customer telemetry
              in real time, updating prices milliseconds before a page loads.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <PricingThenNow />
        </Plate>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            This speed and granularity create two major governance challenges: at
            the individual level, algorithms can extract consumer surplus through
            opaque personalized pricing. At the market level,{" "}
            <Term>
              competing algorithms can learn to sustain supra-competitive prices
              without an explicit human cartel
            </Term>
            .
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Dynamic Pricing Versus Personalized Pricing [exercise]
          ================================================================ */}
      <Slide
        id="dynamic-pricing-versus-personalized-pricing"
        border
        className="!py-8"
        exercise={exercise["dynamic-pricing-versus-personalized-pricing"]}
      >
        <SlideHeading className="!mb-5">Dynamic Pricing Versus Personalized Pricing</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                <Term>Dynamic pricing</Term> adjusts the market price of
                a product over time in response to aggregate supply and demand
                conditions, so that two consumers shopping at the exact same moment
                see the same price, as in airline seat inventory or ride-hailing
                surge pricing.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Personalized pricing</Term> (or surveillance
                pricing) charges different prices to different consumers at the
                exact same moment for the identical product, based on each
                individual&apos;s estimated willingness to pay derived from
                behavioral, geographic, or device data.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-4">
              <SameMoment />
            </Plate>
            <Ruled className="mt-auto">
              <P>
                Both techniques rely on predictive algorithms, but they carry very
                different ethical, perceptual, and regulatory risks: dynamic pricing
                reflects aggregate scarcity, whereas{" "}
                <Term>personalized pricing targets individual consumer characteristics</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Algorithmic Price Discrimination and Consumer Welfare [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Algorithmic Price Discrimination and Consumer Welfare" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Economics classifies price discrimination into three degrees
                according to how finely a seller segments the market to capture
                willingness to pay.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Machine learning and digital tracking allow firms to approximate{" "}
                <Term>theoretical first-degree price discrimination</Term>{" "}
                far more closely than was ever possible in brick-and-mortar
                retail.
              </p>
            </Ruled>
          </div>
          <Plate>
            <SieveStack />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          First-, Second-, and Third-Degree Price Discrimination [exercise]
          ================================================================ */}
      <Slide
        id="first-second-and-third-degree-price-discrimination"
        border
        className="!py-8"
        exercise={exercise["first-second-and-third-degree-price-discrimination"]}
      >
        <SlideHeading className="!mb-5">First-, Second-, and Third-Degree Price Discrimination</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>First-degree (perfect) price discrimination</Term>{" "}
              charges each individual consumer their exact maximum willingness to
              pay for each unit, transferring the entire consumer surplus to the
              seller.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Second-degree price discrimination</Term> offers a
              menu of product versions, quantities, or service tiers (such as
              economy versus business class, or freemium versus enterprise
              software) and lets consumers self-select based on their preferences.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Third-degree price discrimination</Term> charges
              different prices to observable demographic or situational segments,
              such as student, senior, or regional discounts.
            </P>
          </Ruled>
        </div>
        <div className="mt-4 grid w-full gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Plate>
            <SurplusCapture />
          </Plate>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Behavioral surveillance pricing</Term> blurs the
                line between third-degree and first-degree discrimination by
                combining hundreds of observed and inferred variables (browsing
                history, loyalty status, battery level, or device model) to
                estimate{" "}
                <Term>an individual-specific reservation price</Term>.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <ReservationEstimate />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Welfare Effects of Granular Price Discrimination [no-exercise]
          ================================================================ */}
      <Slide id="welfare-effects-of-granular-price-discrimination" border className="!py-8">
        <SlideHeading className="!mb-5">Welfare Effects of Granular Price Discrimination</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                In economic theory, the aggregate welfare effect of price
                discrimination is ambiguous and depends on whether total market
                output expands.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Price discrimination can improve social welfare when lower
                personalized prices allow lower-income or price-sensitive
                consumers to buy a product they would otherwise be priced out of,
                while higher-income consumers pay more.
              </P>
            </Ruled>
            <Ruled>
              <P>
                However, algorithmic price discrimination reduces consumer welfare
                when it operates primarily as{" "}
                <Term>a surplus-extraction mechanism under fixed supply</Term>,
                or when it charges higher prices to captive, urgent, or digitally
                unsophisticated buyers who fail to comparison-shop.
              </P>
            </Ruled>
          </div>
          <Plate>
            <OutputExpansion />
          </Plate>
        </div>
        <div className="mt-5 w-full border-t border-[var(--rule)] pt-5">
          <P className="!max-w-none">
            When willingness-to-pay predictions rely on proxies correlated with
            protected attributes or neighborhood disadvantage, personalized pricing
            can result in lower-income or minority households paying more for
            essential financial, insurance, or retail goods.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Search Steering and Price Discrimination by Proxy [no-exercise]
          ================================================================ */}
      <Slide id="search-steering-and-price-discrimination-by-proxy" border className="!py-8">
        <SlideHeading className="!mb-5">Search Steering and Price Discrimination by Proxy</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Because quoting two shoppers different prices for the exact same
              item on the same URL invites public backlash if discovered, many
              platforms implement price segmentation through personalized search
              steering rather than direct price alteration.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In <Term>search steering</Term>, every shopper sees the
              same price on a given product page, but{" "}
              <Term>
                the ranking algorithm places higher-priced, higher-margin products
                at the top of the search results for shoppers predicted to be
                price-insensitive
              </Term>{" "}
              (Hannak et al., 2014).
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <SteeredResults />
          </Plate>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                For example, early empirical audits of travel platforms documented
                that users browsing on certain operating systems or arriving from
                specific referral channels were systematically steered toward
                costlier hotel rooms.
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                <Term>Personalized discount targeting</Term> achieves the
                same mathematical price dispersion as personalized surcharges by
                holding the public list price high and silently issuing targeted
                digital coupons only to shoppers predicted to abandon their carts.
              </P>
            </Ruled>
            <Plate className="mt-auto !p-2">
              <CouponDispersion />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Consumer Fairness Perceptions and Dual Entitlement [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Consumer Fairness Perceptions and Dual Entitlement" />
        <div className="mt-8 w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
            <Ruled>
              <p className={BIG}>
                A pricing algorithm that is profitable in a static optimization
                model can{" "}
                <Term>destroy brand equity</Term> if consumers
                perceive its rules as exploitative.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Behavioral economics explains why consumers accept some price
                variations as legitimate while judging others as unfair.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Dual Entitlement and Reference Transactions [no-exercise]
          ================================================================ */}
      <Slide id="dual-entitlement-and-reference-transactions" border className="!py-8">
        <SlideHeading className="!mb-5">Dual Entitlement and Reference Transactions</SlideHeading>
        <Ruled className="mb-5 w-full">
          <P className="!max-w-none">
            Formulated by Kahneman, Knetsch, and Thaler (1986), the principle of{" "}
            <Term>dual entitlement</Term> states that consumers evaluate
            the fairness of a price against a reference transaction: consumers
            believe they are entitled to the terms of the reference price, and
            firms are entitled to their reference profit.
          </P>
        </Ruled>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Under dual entitlement, consumers generally accept a price increase
                as fair when it passes through a genuine increase in the
                seller&apos;s input costs, because the firm is protecting its
                reference profit rather than exploiting the buyer.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Conversely,{" "}
                <Term>
                  consumers judge a price increase as unfair when the firm raises
                  prices purely to capitalize on a sudden spike in buyer need or
                  scarcity
                </Term>{" "}
                (such as doubling the price of snow shovels during a blizzard or
                bottled water during an emergency) without a corresponding rise in
                unit cost.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DualEntitlement />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Why Personalized Pricing Triggers Moral Outrage and Trust Erosion [exercise]
          ================================================================ */}
      <Slide
        id="why-personalized-pricing-triggers-moral-outrage-and-trust-erosion"
        border
        className="!py-8"
        exercise={exercise["why-personalized-pricing-triggers-moral-outrage-and-trust-erosion"]}
      >
        <SlideHeading className="!mb-5">Why Personalized Pricing Triggers Moral Outrage and Trust Erosion</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {(
            [
              [
                "inequity",
                <>
                  <Term>Horizontal inequity</Term> occurs when a shopper
                  discovers that another peer paid a lower price for the identical
                  item at the same time, violating the social norm of equal
                  treatment in public retail markets.
                </>,
              ],
              [
                "betrayal",
                <>
                  <Term>Perceived privacy betrayal</Term> occurs when
                  consumers realize that their own past loyalty, search urgency, or
                  personal data were used against them to calculate a higher price
                  rather than to reward their relationship.
                </>,
              ],
              [
                "vulnerability",
                <>
                  <Term>Vulnerability exploitation</Term> occurs when
                  dynamic or personalized pricing extracts a premium from acute
                  distress, such as surge pricing for rides away from a transit
                  shutdown or higher medical-supply prices for anxious shoppers.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="flex min-w-0 flex-col">
              <Ruled>
                <p className={BIG}>{text}</p>
              </Ruled>
            </li>
          ))}
        </ol>
        <div className="mt-5 grid w-full items-center gap-6 border-t border-[var(--rule)] pt-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <p className={BIG}>
            Empirical studies show that discovering opaque personalized pricing
            triggers immediate anger, negative word of mouth, cart abandonment,
            and{" "}
            <Term>
              a lasting drop in brand trust that outweighs short-term margin gains
            </Term>
            .
          </p>
          <Plate className="!p-2">
            <TrustLedger />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Framing and Transparency in Algorithmic Pricing [no-exercise]
          ================================================================ */}
      <Slide id="framing-and-transparency-in-algorithmic-pricing" border className="!py-8">
        <SlideHeading className="!mb-5">Framing and Transparency in Algorithmic Pricing</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Prospect theory</Term> (Kahneman &amp; Tversky,
                1979) shows that framing a price difference as a discount below a
                standard reference price is judged significantly fairer than
                framing the identical price difference as a surcharge above a low
                baseline.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <Frames />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                Furthermore, <Term>verifiable eligibility rules</Term>{" "}
                (such as a published student discount, an off-peak matinee rate,
                or a loyalty tier with transparent thresholds) preserve fairness
                perceptions because any consumer can understand the rule and see
                how to qualify.
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                <Term>
                  Opaque algorithmic scores that silently alter prices without
                  disclosed criteria
                </Term>{" "}
                violate both procedural fairness and consumer autonomy.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <RuleVsScore />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Surge Pricing During an Emergency
          ================================================================ */}
      <Slide id="discussion-surge-pricing-during-an-emergency" border className="!py-8">
        <SlideHeading>Discussion: Surge Pricing During an Emergency</SlideHeading>
        <Discussion
          scenario={"During a sudden severe rainstorm and municipal subway outage, a ride-hailing platform's automated pricing algorithm increases fares by 350 percent across the affected downtown core. The company's economics team defends the algorithm by arguing that higher prices incentivize more drivers to enter the zone and allocate scarce rides to passengers with the highest urgency."}
          question={"Analyze this defense using dual entitlement theory, welfare economics, and algorithmic governance, and propose how the platform's pricing algorithm should be constrained during civic emergencies."}
        />
      </Slide>

      {/* ================================================================
          Part 3: Tacit Algorithmic Collusion in Automated Markets [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Tacit Algorithmic Collusion in Automated Markets" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Beyond how a single firm prices to its customers, algorithmic
              governance must address what happens when competing firms in an
              oligopoly delegate their pricing decisions to autonomous learning
              algorithms.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Recent economic and computational research demonstrates that pricing
              algorithms can learn to sustain{" "}
              <Term>collusive, supra-competitive prices</Term>{" "}
              without ever being programmed to collude or exchanging a single
              message.
            </p>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-6 max-w-[880px]">
          <FacingMachines />
        </Plate>
      </Slide>

      {/* ================================================================
          Explicit Cartels Versus Tacit Coordination [no-exercise]
          ================================================================ */}
      <Slide id="explicit-cartels-versus-tacit-coordination" border className="!py-8">
        <SlideHeading className="!mb-5">Explicit Cartels Versus Tacit Coordination</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <p className={BIG}>
                Under competition and antitrust law (such as Section 1 of the US
                Sherman Act and Section 45 of Canada&apos;s Competition Act), an{" "}
                <Term>explicit cartel</Term> in which competitors
                communicate to fix prices, rig bids, or divide markets is a per se
                unlawful criminal offense.
              </p>
            </Ruled>
            <Ruled className="mb-3">
              <p className={BIG}>
                <Term>Conscious parallelism</Term>, or tacit
                coordination, occurs in concentrated oligopolies when each firm
                independently observes its rivals&apos; public prices and
                recognizes that undercutting a rival will trigger a retaliatory
                price war that lowers profits for everyone.
              </p>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <p className={BIG}>
                Historically, sustaining tacit coordination among human managers
                was difficult because markets are noisy, demand fluctuates, and
                human decision makers are slow to distinguish a rival&apos;s
                cheating from a normal response to demand shocks.
              </p>
            </Ruled>
            <Ruled className="mb-3">
              <p className={BIG}>
                <Term>High-frequency pricing algorithms remove those frictions</Term>:
                they monitor rivals&apos; prices continuously, detect price cuts
                within seconds, and execute immediate, credible retaliation.
              </p>
            </Ruled>
            <Plate className="mt-auto">
              <DetectionLag />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          How Reinforcement-Learning Pricing Agents Learn to Collude [no-exercise]
          ================================================================ */}
      <Slide id="how-reinforcement-learning-pricing-agents-learn-to-collude" border className="!py-8">
        <SlideHeading className="!mb-5">How Reinforcement-Learning Pricing Agents Learn to Collude</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                In a landmark study published in the American Economic Review,
                Calvano, Calzolari, Denicolò, and Pastorello (2020) placed
                independent <Term>Q-learning</Term> pricing algorithms
                in a simulated repeated Bertrand oligopoly where each algorithm
                sought only to maximize its own firm&apos;s discounted cumulative
                profit.
              </P>
            </Ruled>
            <Ruled>
              <P>
                The algorithms had no prior knowledge of the market structure,
                could not communicate with one another, and were given no
                instructions to cooperate.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Across thousands of simulations, the reinforcement-learning agents
                consistently learned to charge supra-competitive prices well above
                the static Nash equilibrium, capturing a large fraction of the
                monopoly profit gap.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                Crucially, the researchers proved that the elevated prices were not
                the result of naive learning mistakes:{" "}
                <Term>
                  when the researchers manually forced one algorithm to cut its
                  price for a single period, the rival algorithm immediately
                  punished the deviation with a temporary price war
                </Term>{" "}
                before both algorithms gradually returned to the high collusive
                price (Calvano et al., 2020).
              </P>
            </Ruled>
            <Plate className="mb-3">
              <ForcedCut />
            </Plate>
            <Ruled className="mt-auto">
              <P>
                The algorithms had autonomously discovered the classic
                reward-and-punishment enforcement mechanism of an economic cartel
                purely through trial-and-error reinforcement learning.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Four Pathways to Algorithmic Price Coordination [exercise]
          ================================================================ */}
      <Slide
        id="four-pathways-to-algorithmic-price-coordination"
        border
        className="!py-8"
        exercise={exercise["four-pathways-to-algorithmic-price-coordination"]}
      >
        <SlideHeading className="!mb-4">Four Pathways to Algorithmic Price Coordination</SlideHeading>
        <Statement className="mb-5 !max-w-none !text-[clamp(1.05rem,1.5vw,1.3rem)]">
          Legal scholars Ariel Ezrachi and Maurice Stucke (2016) classify
          algorithmic collusion into four distinct governance scenarios based on
          how humans and algorithms interact.
        </Statement>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
          {(
            [
              [
                "messenger",
                <>
                  <Term>Messenger</Term> occurs when human executives
                  explicitly agree to fix prices and merely use software algorithms
                  as the operational tool to monitor compliance and update prices.
                  This is a traditional illegal cartel.
                </>,
              ],
              [
                "hub",
                <>
                  <Term>Hub-and-Spoke</Term> occurs when multiple
                  competing firms (the spokes) all adopt the same third-party
                  pricing algorithm or vendor (the hub), pooling confidential data
                  or delegating pricing to a single shared optimization engine that
                  coordinates prices across competitors instead of letting them
                  compete.
                </>,
              ],
              [
                "predictable",
                <>
                  <Term>Predictable Agent</Term> occurs when each firm
                  unilaterally deploys its own rule-based pricing algorithm (such as
                  automated price-matching plus a margin floor) designed to react
                  predictably and transparently to rivals&apos; moves, dampening
                  incentives to discount.
                </>,
              ],
              [
                "autonomous",
                <>
                  <Term>Autonomous Machine</Term> occurs when each firm
                  independently deploys a self-learning reinforcement or foundation
                  model given only the goal &quot;maximize long-term profit,&quot;
                  and the models autonomously learn tacit punishment-and-reward
                  collusion without human instruction or shared code.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="flex min-w-0 flex-col">
              <Ruled className="mb-3">
                <P>{text}</P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <Pathway kind={kind} />
              </Plate>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Part 4: Self-Preferencing, Gatekeeper Power, and Selling to Buying Bots [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Self-Preferencing, Gatekeeper Power, and Selling to Buying Bots" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Competition risks in digital markets also arise vertically when{" "}
              <Term>
                a dominant digital platform acts simultaneously as the marketplace
                referee and as a competing merchant
              </Term>
              , and when seller algorithms interact with consumer shopping agents.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Dual-Role Gatekeepers and Algorithmic Self-Preferencing [exercise]
          ================================================================ */}
      <Slide
        id="dual-role-gatekeepers-and-algorithmic-self-preferencing"
        border
        className="!py-8"
        exercise={exercise["dual-role-gatekeepers-and-algorithmic-self-preferencing"]}
      >
        <SlideHeading className="!mb-5">Dual-Role Gatekeepers and Algorithmic Self-Preferencing</SlideHeading>
        <Ruled className="mb-5 w-full">
          <P className="!max-w-none">
            Many dominant e-commerce, app-store, and search platforms operate as{" "}
            <Term>dual-role gatekeepers</Term>: they run the marketplace
            infrastructure on which third-party merchants depend while also selling
            their own first-party or private-label products in the same categories.
          </P>
        </Ruled>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col">
            <div className="mb-3 grid gap-x-6 gap-y-3 md:grid-cols-2">
              <Ruled>
                <P>
                  <Term>Algorithmic self-preferencing</Term> occurs
                  when the platform designs its search ranking, recommendation
                  assistant, or &quot;Buy Box&quot; algorithm to favor its own
                  first-party products or logistics services over superior or
                  lower-priced third-party offerings.
                </P>
              </Ruled>
              <Ruled>
                <P>
                  <Term>Algorithmic tying and buy-box conditioning</Term>{" "}
                  occur when a platform makes top ranking or default assistant
                  selection contingent on a third-party seller purchasing the
                  platform&apos;s own fulfillment, payment, or advertising services.
                </P>
              </Ruled>
            </div>
            <Plate className="mt-auto">
              <BuyBox />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Data appropriation</Term> occurs when the
                platform&apos;s retail arm accesses non-public, granular transaction
                and clickstream data generated by third-party sellers on the
                marketplace to identify profitable niche products, replicate them
                as private-label goods, and undercut the original sellers.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <DataAppropriation />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          When Pricing Algorithms Meet AI Shopping Agents [no-exercise]
          ================================================================ */}
      <Slide id="when-pricing-algorithms-meet-ai-shopping-agents" border className="!py-8">
        <SlideHeading className="!mb-5">When Pricing Algorithms Meet AI Shopping Agents</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                As consumers adopt autonomous AI shopping agents (Weeks 7 and 8),
                retail markets transition toward algorithm-versus-algorithm
                exchange in which pricing bots face buying bots.
              </P>
            </Ruled>
            <Ruled>
              <P>
                On the one hand, well-configured AI shopping agents can intensify
                price competition by inspecting more listings than humans (Wadi
                &amp; Ma, 2026a), calculating exact unit prices when specifications
                are accessible (Wadi &amp; Ma, 2026b), and bypassing brand inertia.
              </P>
            </Ruled>
            <Ruled>
              <P>
                On the other hand,{" "}
                <Term>
                  seller pricing algorithms can exploit the systematic behavioral
                  vulnerabilities of AI shopping agents
                </Term>
                : setting high arbitrary reference prices to trigger LLM anchoring
                bias (Wadi &amp; Fredette, 2025), using just-below prices and
                promotional badges while burying unit weights behind costly tool
                calls (Wadi &amp; Ma, 2026b), or purchasing platform-attributed
                sponsorship tags that attenuate the agent&apos;s skepticism (Wadi
                &amp; Ma, 2026c).
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-4">
              <BotMeetsBot />
            </Plate>
            <Statement className="mt-auto !max-w-none border-t border-[var(--rule-2)] pt-4 !text-[clamp(1.1rem,1.6vw,1.4rem)]">
              Fair competition in agentic markets therefore requires governing both
              sides of the automated interface.
            </Statement>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Antitrust Enforcement and Auditing Pricing Algorithms [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Antitrust Enforcement and Auditing Pricing Algorithms" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Competition authorities worldwide, including the US Department of
              Justice, the Federal Trade Commission, the Canadian Competition
              Bureau, and the European Commission, have made{" "}
              <Term>
                algorithmic pricing and gatekeeper self-preferencing top
                enforcement priorities
              </Term>
              .
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Liability Gap in Competition Law [no-exercise]
          ================================================================ */}
      <Slide id="the-liability-gap-in-competition-law" border className="!py-8">
        <SlideHeading className="!mb-5">The Liability Gap in Competition Law</SlideHeading>
        <div className="w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
            <Ruled>
              <p className={BIG}>
                Classical antitrust statutes prohibit &quot;agreements,&quot;
                &quot;conspiracies,&quot; or &quot;concerted practices&quot; in
                restraint of trade, which courts have historically interpreted as
                requiring evidence of communication or a conscious meeting of the
                minds between competitors.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                While Messenger and Hub-and-Spoke arrangements (such as competitors
                feeding non-public data into a shared rental-housing or hotel
                pricing vendor) are actively prosecuted as unlawful coordination,{" "}
                <Term>
                  pure Autonomous Machine tacit collusion challenges traditional
                  evidentiary standards
                </Term>{" "}
                because no human communication or shared vendor exists.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Legal and economic scholars therefore propose shifting regulatory
                scrutiny from searching for smoke-filled-room communications to
                auditing the algorithms themselves: prohibiting reward functions or
                state spaces that condition on rivals&apos; real-time price changes
                solely to punish discounting, and holding firms strictly liable for
                the collusive strategies their deployed agents learn.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Six Steps of an Algorithmic Pricing and Competition Audit [exercise]
          ================================================================ */}
      <Slide
        id="six-steps-of-an-algorithmic-pricing-and-competition-audit"
        border
        className="!py-8"
        exercise={exercise["six-steps-of-an-algorithmic-pricing-and-competition-audit"]}
      >
        <SlideHeading className="!mb-5">Six Steps of an Algorithmic Pricing and Competition Audit</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 1 is mapping all inputs to the pricing model, verifying that the algorithm does not ingest non-public competitor data or share a common third-party optimization hub with horizontal rivals.",
            "Step 2 is auditing personalized price dispersion across demographic segments and geographic proxies to ensure that price variations do not impose disparate impact on protected or vulnerable groups.",
            "Step 3 is evaluating price presentation and search steering against dual-entitlement and dark-pattern standards, verifying that discounts, reference prices, and dynamic surge rules are transparent and verifiable.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <p className={BIG}>{step}</p>
              </Ruled>
            </li>
          ))}
        </ol>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 4 is conducting counterfactual impulse-response tests on reinforcement-learning pricing models in a sandbox environment: forcing a simulated competitor price cut and inspecting whether the firm's algorithm responds with a retaliatory punishment-and-return cycle (Calvano et al., 2020).",
            "Step 5 is auditing marketplace ranking and Buy Box algorithms for self-preferencing, testing whether first-party private-label products receive higher placement or recommendation share than identically rated and priced third-party listings.",
            "Step 6 is implementing hard algorithmic guardrails, including emergency surge caps, human-on-the-loop circuit breakers, and Chinese walls separating marketplace seller data from first-party retail teams.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <p className={BIG}>{step}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Governance Guardrails for Ethical and Compliant Pricing [exercise]
          ================================================================ */}
      <Slide
        id="governance-guardrails-for-ethical-and-compliant-pricing"
        border
        className="!py-8"
        exercise={exercise["governance-guardrails-for-ethical-and-compliant-pricing"]}
      >
        <SlideHeading className="!mb-5">Governance Guardrails for Ethical and Compliant Pricing</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
          {(
            [
              [
                "cap",
                <>
                  <Term>Emergency and vulnerability price caps</Term> set
                  hard upper bounds on dynamic surge multipliers during declared
                  emergencies, natural disasters, or acute public disruptions.
                </>,
              ],
              [
                "framing",
                <>
                  <Term>Transparent discount framing</Term> replaces
                  covert personalized list-price inflation with published base
                  prices and clearly stated, non-discriminatory eligibility rules
                  for loyalty or promotional discounts.
                </>,
              ],
              [
                "reward",
                <>
                  <Term>Collusion-resistant reward design</Term> restricts
                  reinforcement-learning pricing agents from conditioning
                  multi-period punishment policies on individual rivals&apos;
                  high-frequency price deviations.
                </>,
              ],
              [
                "firewall",
                <>
                  <Term>Firewall and ranking neutrality mandates</Term>{" "}
                  prohibit dual-role platforms from using non-public third-party
                  seller data for private-label development and require identical
                  ranking weights for first-party and third-party goods.
                </>,
              ],
            ] as const
          ).map(([kind, text], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1} className="flex h-full flex-col">
                <Ruled className="mb-3">
                  <p className={BIG}>{text}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: The Shared Rental Pricing Algorithm
          ================================================================ */}
      <Slide id="discussion-the-shared-rental-pricing-algorithm" border className="!py-8">
        <SlideHeading>Discussion: The Shared Rental Pricing Algorithm</SlideHeading>
        <Discussion
          scenario={"Twelve competing property-management companies that control 70 percent of the apartment buildings in a metropolitan city license the same cloud-based revenue-management software. Every night, each landlord uploads its private lease renewal rates, vacancy counts, and applicant traffic to the vendor's model, which returns recommended daily rents for every unit. Public records show that after adopting the software, landlords left more units vacant during slow months while average rents across the city rose 18 percent above historical trends."}
          question={"Using Ezrachi and Stucke's four pathways and competition governance principles, analyze whether this arrangement constitutes unlawful coordination and how an auditor would test the software."}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Dynamic pricing varies prices over time based on aggregate market supply and demand, whereas personalized (surveillance) pricing charges different prices to different individuals at the same moment based on estimated willingness to pay.",
            "Granular behavioral telemetry pushes digital pricing toward first-degree price discrimination and search steering, which can extract consumer surplus and penalize vulnerable or captive segments.",
            "Under Kahneman, Knetsch, and Thaler's (1986) dual entitlement principle, consumers accept cost-justified price increases but judge opaque personalized pricing and emergency surge pricing as unfair violations of reference transactions.",
            "Independent reinforcement-learning pricing agents in repeated oligopoly games can autonomously learn to charge supra-competitive prices sustained by retaliatory price-war punishments without communicating (Calvano et al., 2020).",
            "Ezrachi and Stucke (2016) distinguish four pathways to algorithmic price coordination: Messenger, Hub-and-Spoke (shared third-party vendor), Predictable Agent, and Autonomous Machine learning.",
            "Dual-role gatekeeper platforms face vertical governance risks of algorithmic self-preferencing, third-party seller data appropriation, and Buy Box tying.",
            "Enterprise pricing audits combine disparate-impact dispersion checks, sandbox impulse-response tests for retaliatory punishment cycles, emergency surge caps, and strict separation from competitor data hubs.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <P>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
