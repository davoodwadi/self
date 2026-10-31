"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Big,
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
  CsrPyramid,
  DarkPatternsComparison,
  PestleHub,
  ValueDeliveryNetwork,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 2: THE MARKETING ENVIRONMENT AND ETHICS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week2() {
  return (
    <SlideDeck label="Week 2">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">Week 2</p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">The Marketing Environment and Ethics</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Marketing strategy operates within a dynamic{" "}
              <Tint>microenvironment and macroenvironment</Tint>, requiring
              organizations to adapt to external forces, uphold corporate social
              responsibility, and maintain ethical standards toward both
              consumers and their AI agents.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining the Marketing Environment
          ================================================================ */}
      <Slide className={TIGHT} id="defining-the-marketing-environment" border>
        <SlideHeading>Defining the Marketing Environment</SlideHeading>
        <Statement>
          A company&apos;s <Term>marketing environment</Term> consists of the
          actors and forces outside marketing that affect marketing
          management&apos;s ability to build and maintain successful
          relationships with target customers.
        </Statement>
        <Lead className="mt-6">
          The environment is divided into two concentric layers: the{" "}
          <Term>microenvironment</Term> close to the firm and the broader
          societal <Term>macroenvironment</Term>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Environmental forces continuously create new market opportunities
              while rendering established products, channels, and business
              models obsolete.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Rather than treating external change as uncontrollable fate,
              marketers use <Term>marketing research</Term> and{" "}
              <Term>marketing intelligence</Term> to monitor trends early and
              adapt strategy proactively.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Environmental Scanning: Reactive Versus Proactive Adaptation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="environmental-scanning-reactive-versus-proactive-adaptation"
        border
      >
        <SlideHeading>
          Environmental Scanning: Reactive Versus Proactive Adaptation
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Firms differ in how they respond to shifts in their external
              marketing environment.
            </Statement>
            <Ruled>
              <P>
                Organizations can also shape parts of their environment through{" "}
                <Term>public relations</Term>,{" "}
                <Term>industry standard-setting</Term>, and{" "}
                <Term>sustainable innovation</Term>.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                <Term>Passive or reactive firms</Term> wait until a regulatory
                change, demographic shift, or new technology erodes sales before
                adjusting their offerings.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Proactive firms</Term> conduct systematic{" "}
                <Term>environmental scanning</Term> to detect early signals of
                change and redesign their product portfolios ahead of
                competitors.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Actors in the Microenvironment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-actors-in-the-microenvironment"
        border
      >
        <PartHead n={1} title="Actors in the Microenvironment" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            The <Term>microenvironment</Term> consists of the actors close to
            the company that directly affect its ability to serve its customers
            and deliver value.
          </Statement>
          <Ruled>
            <Lead>
              Delivering customer value requires coordinating internal company
              departments with external partners, while monitoring competitors
              and publics.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Internal Departments and the Value Delivery Network
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="internal-departments-and-the-value-delivery-network"
        border
      >
        <SlideHeading>
          Internal Departments and the Value Delivery Network
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-[1.35fr_1fr] md:gap-12">
          <Lead>
            In designing marketing plans, <Term>marketing management</Term>{" "}
            takes other company groups into account, including top management,
            finance, research and development, purchasing, operations, and
            accounting.
          </Lead>
          <Ruled>
            <Statement>
              All of these interrelated internal groups form the{" "}
              <Term>internal environment</Term>.
            </Statement>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <ValueDeliveryNetwork />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Under the <Term>marketing concept</Term>, every department from
              engineering to billing must &quot;think consumer&quot; and work in
              harmony to deliver promised customer value.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If manufacturing cuts material quality to lower unit costs or
              accounting delays customer refunds, the marketing promise fails
              regardless of advertising quality.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Suppliers and Marketing Intermediaries
          ================================================================ */}
      <Slide className={TIGHT} id="suppliers-and-marketing-intermediaries" border>
        <SlideHeading>Suppliers and Marketing Intermediaries</SlideHeading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Suppliers</Term> form an essential link in the
              company&apos;s overall customer{" "}
              <Term>value delivery network</Term> by providing the resources
              needed by the company to produce its goods and services.
            </Statement>
            <Ruled>
              <P>
                Marketing managers must watch supply availability and costs
                closely: supply shortages, labor strikes, or shipping delays can
                cost sales in the short run and damage customer goodwill in the
                long run.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Marketing intermediaries</Term> are firms that help the
              company to promote, sell, and distribute its goods to final
              buyers.
            </Statement>
            <Ruled>
              <P>
                Intermediaries include <Term>resellers</Term> (wholesalers and
                retailers), <Term>physical distribution firms</Term>{" "}
                (warehousing and freight operators),{" "}
                <Term>marketing services agencies</Term> (research and
                advertising firms), and <Term>financial intermediaries</Term>{" "}
                (banks, credit companies, and insurers).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Competitors, Publics, and Customer Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="competitors-publics-and-customer-markets"
        border
        exercise={exercise["competitors-publics-and-customer-markets"]}
      >
        <SlideHeading>Competitors, Publics, and Customer Markets</SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The marketing concept states that, to be successful, a company
              must provide greater customer value and satisfaction than its{" "}
              <Term>competitors</Term> do, adapting its strategy to the size and
              industry position of rival firms.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              A <Term>public</Term> is any group that has an actual or potential
              interest in or impact on an organization&apos;s ability to achieve
              its objectives, including financial, media, government,
              citizen-action, local, general, and internal publics.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The company may target any of five types of{" "}
              <Term>customer markets</Term>: <Term>consumer markets</Term>{" "}
              (individuals and households), <Term>business markets</Term> (firms
              buying for further processing), <Term>reseller markets</Term>,{" "}
              <Term>government markets</Term>, and{" "}
              <Term>international markets</Term>.
            </P>
          </Numbered>
        </ol>
        <Ruled className="mt-8 w-full">
          <Statement>
            Each actor in the microenvironment can either strengthen or
            bottleneck the firm&apos;s <Term>value proposition</Term> before it
            reaches the end buyer.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 2: The Macroenvironment and the PESTLE Framework
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-the-macroenvironment-and-the-pestle-framework"
        border
      >
        <PartHead
          n={2}
          title="The Macroenvironment and the PESTLE Framework"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            The company and all actors in its microenvironment operate within a
            larger <Term>macroenvironment</Term> of broad societal forces that
            shape opportunities and pose threats.
          </Statement>
          <Ruled>
            <Lead>
              Marketers analyze these macro-level forces systematically using
              the <Term>PESTLE framework</Term>: Political, Economic, Social,
              Technological, Legal, and Environmental factors.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Political and Economic Forces
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="political-and-economic-forces"
        border
        exercise={exercise["political-and-economic-forces"]}
      >
        <SlideHeading>Political and Economic Forces</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                <Term>Political forces</Term> encompass government stability,
                trade policy, taxation, public infrastructure spending, and
                advocacy groups that influence or restrict business operations.
              </P>
              <P className="mt-3">
                A sudden change in <Term>import tariffs</Term> or domestic
                industrial subsidies can alter the cost structure of an entire
                supply chain overnight.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Economic forces</Term> consist of macroeconomic factors
                that affect consumer <Term>purchasing power</Term> and spending
                patterns, including inflation, interest rates, unemployment, and
                income distribution.
              </P>
              <P className="mt-3">
                During periods of high inflation and rising interest rates,
                consumers postpone discretionary durable purchases and shift
                toward value-oriented store brands.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <PestleHub />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Social and Technological Forces
          ================================================================ */}
      <Slide className={TIGHT} id="social-and-technological-forces" border>
        <SlideHeading>Social and Technological Forces</SlideHeading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead>
              <Term>Social (and demographic) forces</Term> include population
              age structure, household composition, geographic migration,
              educational attainment, and cultural values.
            </Lead>
            <Ruled>
              <P>
                <Term>Core cultural values</Term> persist across generations,
                whereas <Term>secondary cultural beliefs</Term>, such as
                attitudes toward remote work, wellness, or convenience foods,
                shift more rapidly.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Lead>
              <Term>Technological forces</Term> are the most dramatic shapers of
              business destiny, creating entirely new product categories while
              making older technologies obsolete.
            </Lead>
            <Ruled>
              <P>
                Advances in cloud computing, mobile payment networks,
                biotechnology, and artificial intelligence open new ways to
                create and deliver customer value.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Legal and Environmental Forces
          ================================================================ */}
      <Slide className={TIGHT} id="legal-and-environmental-forces" border>
        <SlideHeading>Legal and Environmental Forces</SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Legal forces</Term> consist of specific statutes and
              regulatory agencies that protect companies from unfair
              competition, protect consumers from deception or harm, and
              safeguard society&apos;s broader interests.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers must comply with laws governing{" "}
              <Term>product safety</Term>, <Term>truth in advertising</Term>,
              packaging labels, <Term>antitrust competition</Term>, and{" "}
              <Term>data privacy</Term> across every jurisdiction they serve.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Environmental forces</Term> involve the natural resources
              required as inputs by marketers or affected by marketing and
              manufacturing activities.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Growing shortages of raw materials, rising energy costs, pollution
              limits, and climate policy make{" "}
              <Term>environmental stewardship</Term> a core operational
              requirement.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: Corporate Social Responsibility and Sustainability
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-corporate-social-responsibility-and-sustainability"
        border
      >
        <PartHead
          n={3}
          title="Corporate Social Responsibility and Sustainability"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Lead>
            Beyond obeying statutory laws, organizations face strong
            expectations from consumers, employees, and investors to act as
            accountable stewards of society.
          </Lead>
          <Ruled>
            <Statement>
              <Term>Corporate Social Responsibility (CSR)</Term> integrates
              social and environmental accountability directly into the
              firm&apos;s business model.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Four Pillars of Corporate Social Responsibility
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-four-pillars-of-corporate-social-responsibility"
        border
        exercise={
          exercise["the-four-pillars-of-corporate-social-responsibility"]
        }
      >
        <SlideHeading>
          The Four Pillars of Corporate Social Responsibility
        </SlideHeading>
        <Lead>
          Archie Carroll&apos;s framework organizes{" "}
          <Term>Corporate Social Responsibility</Term> into four distinct layers
          of obligation (Carroll, 1991).
        </Lead>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <CsrPyramid />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Numbered n={1}>
            <P>
              <Term>Economic responsibility</Term> is the foundational
              obligation to produce goods and services that society wants and to
              sell them at a profit that sustains the enterprise.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Legal responsibility</Term> is the obligation to obey
              codified laws and regulations, which represent society&apos;s
              baseline rules of fair operations.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Ethical responsibility</Term> is the obligation to do what
              is right, just, and fair, and to avoid harm even when a
              questionable practice is not explicitly prohibited by law.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              <Term>Philanthropic responsibility</Term> involves voluntary
              corporate contributions of financial, technical, or human
              resources to improve community well-being and quality of life.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Sustainable Marketing and the Trap of Greenwashing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sustainable-marketing-and-the-trap-of-greenwashing"
        border
        exercise={exercise["sustainable-marketing-and-the-trap-of-greenwashing"]}
      >
        <SlideHeading>
          Sustainable Marketing and the Trap of Greenwashing
        </SlideHeading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Sustainable marketing</Term> calls for socially and
              environmentally responsible actions that meet the current needs of
              consumers and businesses while preserving or enhancing the ability
              of future generations to meet their own needs.
            </Statement>
            <Ruled>
              <P>
                Firms practicing genuine sustainability redesign products to use
                recycled inputs, reduce packaging waste, lower carbon emissions
                in logistics, and support fair labor standards.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Greenwashing</Term> occurs when an organization spends more
              time and money claiming to be environmentally friendly through
              marketing communications than actually reducing its environmental
              impact.
            </Statement>
            <Ruled>
              <P>
                Vague, unverified labels such as &quot;eco-friendly&quot; or
                &quot;all-natural&quot; on unchanged products mislead buyers,
                trigger regulatory enforcement, and permanently erode{" "}
                <Term>brand trust</Term> when exposed.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Strategic Business Case for Authentic CSR
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-strategic-business-case-for-authentic-csr"
        border
      >
        <SlideHeading>The Strategic Business Case for Authentic CSR</SlideHeading>
        <Statement>
          Authentic <Term>Corporate Social Responsibility</Term> is not merely a
          compliance cost or charitable expense, but a source of durable{" "}
          <Term>competitive advantage</Term>.
        </Statement>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              Consumers increasingly evaluate a company&apos;s labor,
              environmental, and governance record when choosing between
              competing brands of comparable price and quality.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Strong CSR commitments improve employee recruitment, morale, and
              retention, reducing costly workforce turnover across retail and
              corporate operations.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Proactive resource efficiency</Term>, such as designing
              lighter packaging, reducing warehouse energy consumption, and
              eliminating toxic inputs, simultaneously lowers operating costs
              and mitigates regulatory and reputational risk.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Navigating PESTLE Shocks and CSR Commitments
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-navigating-pestle-shocks-and-csr-commitments"
        border
      >
        <SlideHeading kicker="Discussion:">
          Navigating PESTLE Shocks and CSR Commitments
        </SlideHeading>
        <Prompt>
          A specialty chocolate manufacturer sources cocoa from West Africa and
          markets its bars in North America on a pledge of 100 percent
          living-income farmer pay and deforestation-free supply chains. When
          extreme weather reduces the regional cocoa harvest and triples raw
          bean prices, which PESTLE forces are interacting, and how should the
          brand adjust its pricing, product sizing, and communications without
          abandoning its CSR commitments or crossing into deceptive practices?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 4: Ethical Considerations in Marketing Practice
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-ethical-considerations-in-marketing-practice"
        border
      >
        <PartHead
          n={4}
          title="Ethical Considerations in Marketing Practice"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Conscientious marketers face moral dilemmas across every element of
            the <Term>marketing mix</Term>, because actions that boost
            short-term sales can harm consumers and competitors.
          </Statement>
          <Ruled>
            <Lead>
              Establishing explicit{" "}
              <Term>corporate marketing ethics policies</Term> guides managers
              on product safety, pricing transparency, distribution fairness,
              and truthful promotion.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Deceptive Pricing, Promotion, and Packaging
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="deceptive-pricing-promotion-and-packaging"
        border
        exercise={exercise["deceptive-pricing-promotion-and-packaging"]}
      >
        <SlideHeading>Deceptive Pricing, Promotion, and Packaging</SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Deceptive pricing</Term> includes falsely advertising
              &quot;factory&quot; or &quot;wholesale&quot; prices, claiming a
              large discount from a fabricated reference price, or concealing
              mandatory fees until checkout.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Deceptive promotion</Term> misrepresents a product&apos;s
              features, ingredients, or performance, or uses{" "}
              <Term>bait-and-switch tactics</Term> that lure shoppers with an
              unavailable bargain to upsell a costlier item.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Deceptive packaging</Term> exaggerates package contents
              through oversized non-functional containers (
              <Term>slack fill</Term>), misleading imagery, or subtle reductions
              in net weight without disclosing the unit price change.
            </P>
          </Numbered>
        </ol>
        <Ruled className="mt-8 w-full">
          <Lead>
            Regulatory bodies such as the{" "}
            <Term>Federal Trade Commission</Term> in the United States and the{" "}
            <Term>Competition Bureau</Term> in Canada prosecute deceptive
            practices because they distort fair market exchange and injure
            consumers.
          </Lead>
        </Ruled>
      </Slide>

      {/* ================================================================
          High-Pressure Selling and Planned Obsolescence
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="high-pressure-selling-and-planned-obsolescence"
        border
      >
        <SlideHeading>
          High-Pressure Selling and Planned Obsolescence
        </SlideHeading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>High-pressure selling</Term> uses psychological
              manipulation, artificial urgency, or scripted intimidation to
              persuade people to buy goods they had no intention or need of
              buying.
            </Statement>
            <Ruled>
              <P>
                Although aggressive tactics may close an immediate transaction,
                they generate severe <Term>buyer&apos;s remorse</Term>, product
                returns, and negative word of mouth that destroy long-term
                customer relationships.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Planned obsolescence</Term> is the deliberate practice of
              causing products to become out of date or non-functional before
              they genuinely need replacement.
            </Statement>
            <Ruled>
              <P>
                It takes three forms: <Term>physical obsolescence</Term> (using
                fragile components or non-replaceable batteries),{" "}
                <Term>style obsolescence</Term> (continually altering
                superficial appearance), and{" "}
                <Term>functional obsolescence</Term> (withholding ready features
                for future models).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Competing Philosophies of Marketing Ethics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="competing-philosophies-of-marketing-ethics"
        border
      >
        <SlideHeading>Competing Philosophies of Marketing Ethics</SlideHeading>
        <Lead>
          Organizations resolve grey-area ethical decisions under one of two
          contrasting management philosophies.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Numbered n={1}>
            <P>
              The first philosophy holds that ethics should be determined by the{" "}
              <Term>free market</Term> and the <Term>legal system</Term>: under
              this view, if a practice is legal and profitable, a company can
              pursue it in good conscience.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The second philosophy places <Term>moral responsibility</Term>{" "}
              directly on individual companies and managers to uphold consumer
              welfare and fairness, independent of what the law or competitors
              permit.
            </P>
          </Numbered>
        </ol>
        <Ruled className="mt-8 w-full">
          <Statement>
            Under this enlightened view, companies adopt written{" "}
            <Term>codes of marketing ethics</Term>, appoint{" "}
            <Term>ethics officers</Term>, and audit their campaigns against
            long-run consumer well-being.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 5: Artificial Intelligence in the Marketing Environment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-artificial-intelligence-in-the-marketing-environment"
        border
      >
        <PartHead
          n={5}
          title="Artificial Intelligence in the Marketing Environment"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            <Term>Artificial intelligence</Term> illustrates how a single
            breakthrough simultaneously reshapes technological, legal, and
            social forces in the macroenvironment while raising new ethical
            questions.
          </Statement>
          <Ruled>
            <Lead>
              As consumers delegate search and purchasing to{" "}
              <Term>AI agents</Term>, deceptive practices once aimed at human
              eyes are now adapted to manipulate software agents.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          AI as a Technological, Legal, and Social Force
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="ai-as-a-technological-legal-and-social-force"
        border
        exercise={exercise["ai-as-a-technological-legal-and-social-force"]}
      >
        <SlideHeading>
          AI as a Technological, Legal, and Social Force
        </SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-3">
          <Ruled>
            <P>
              As a <Term>technological force</Term>, large language models and{" "}
              <Term>autonomous AI agents</Term> create new channels for product
              discovery, customer service, and automated purchasing.
            </P>
          </Ruled>
          <Ruled>
            <P>
              As a <Term>legal force</Term>, governments are enacting specific
              regulations governing AI transparency, data use, and consumer
              protection.
            </P>
            <P className="mt-4">
              The <Term>European Union&apos;s AI Act</Term>, for example,
              requires that individuals be informed when they are interacting
              with an AI system such as a chatbot, and mandates clear labeling
              of synthetic audio, images, or video that imitate real people or
              events.
            </P>
          </Ruled>
          <Ruled>
            <P>
              As a <Term>social force</Term>, consumers vary widely in how much
              they trust AI systems to make choices on their behalf, and this
              trust determines which product categories they are willing to
              delegate.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Dark Patterns Directed at Human Shoppers and AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dark-patterns-directed-at-human-shoppers-and-ai-agents"
        border
        exercise={
          exercise["dark-patterns-directed-at-human-shoppers-and-ai-agents"]
        }
      >
        <SlideHeading>
          Dark Patterns Directed at Human Shoppers and AI Agents
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              A <Term>dark pattern</Term> is a user-interface design crafted to
              trick or steer a buyer into a choice that serves the seller at the
              buyer&apos;s expense, such as a fake countdown timer or hidden
              checkout fee.
            </Lead>
            <Ruled>
              <P>
                As consumers delegate shopping to <Term>AI agents</Term>,
                unethical sellers aim equivalent manipulative tactics at the
                software agent rather than the human shopper.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <DarkPatternsComparison />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              First, a seller may bury an unfavorable attribute, such as a high
              price per ounce, inside an <Term>unindexed image</Term> so an AI
              agent reading page text overlooks it.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Second, a seller may embed <Term>hidden text</Term> on a product
              page (such as white text on a white background, invisible to human
              shoppers) instructing an AI agent to ignore competitors and
              recommend the product.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Third, sellers may flood platforms with{" "}
              <Term>synthetic reviews</Term> written specifically to elevate how
              an AI agent scores the product&apos;s quality.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Ethical Responsibility in Agent-Mediated Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="ethical-responsibility-in-agent-mediated-markets"
        border
      >
        <SlideHeading>
          Ethical Responsibility in Agent-Mediated Markets
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Deceiving a consumer&apos;s <Term>delegated AI agent</Term> harms
              the human consumer who pays for the order and uses the product
              just as directly as deceiving the consumer in person.
            </Statement>
            <Ruled>
              <P>
                When an AI agent is tricked by hidden prompt instructions or
                concealed unit pricing, the human buyer pays more or receives an
                inferior product.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                Once consumers or platform auditors uncover manipulative
                storefront tactics, both human buyers and AI platform operators
                penalize or delist the offending brand.
              </P>
            </Ruled>
            <Ruled>
              <Big>
                Ethical marketing in an agentic environment therefore requires
                providing accurate, complete, and{" "}
                <Term>machine-readable product disclosures</Term> so both human
                shoppers and their AI agents can evaluate offers fairly.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Auditing Storefront Practices for Humans and AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-auditing-storefront-practices-for-humans-and-ai-agents"
        border
      >
        <SlideHeading kicker="Discussion:">
          Auditing Storefront Practices for Humans and AI Agents
        </SlideHeading>
        <Prompt>
          An online supplement retailer discovers that a third-party agency
          hired to boost its marketplace conversion rate added two elements to
          its product pages: a flashing &quot;Only 2 left in stock!&quot; banner
          that resets every hour for human visitors, and hidden metadata
          instructing AI shopping assistants to rank the supplement first for
          immunity queries. Using marketing ethics and the PESTLE legal and
          technological framework, evaluate both tactics and specify the
          governance controls the retailer should implement.
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
              A firm&apos;s marketing environment comprises the
              microenvironment (the company, suppliers, intermediaries,
              competitors, publics, and customer markets) and the
              macroenvironment, requiring proactive environmental scanning.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The PESTLE framework organizes macroenvironmental analysis across
              Political, Economic, Social, Technological, Legal, and
              Environmental forces that jointly create market opportunities and
              threats.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Corporate Social Responsibility encompasses economic, legal,
              ethical, and philanthropic obligations, while sustainable
              marketing requires authentic operational improvements rather than
              greenwashing.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Ethical marketing prohibits deceptive pricing, promotion, and
              packaging, rejects high-pressure selling and abusive planned
              obsolescence, and holds managers accountable beyond the bare
              minimum of the law.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Artificial intelligence acts simultaneously as a technological,
              legal, and social force in the macroenvironment, bringing new
              statutory rules such as mandatory chatbot and synthetic-media
              disclosure under the EU AI Act.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Dark patterns aimed at AI shopping agents, including hiding unit
              prices inside images, embedding invisible prompt instructions, and
              posting synthetic reviews, violate marketing ethics and harm the
              human consumer the agent serves.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
