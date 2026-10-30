"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Lead, Term, Ruled, SlideHeading, Numbered, PartHead, Prompt } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AddOneAtATime,
  AgentShare,
  ArchitectureChange,
  CheckoutRun,
  ColdStartSeed,
  ConstraintFilter,
  DirectLedger,
  DoubleMarkup,
  Flywheel,
  FourQuestions,
  FourScenarios,
  FunnelStages,
  InspectionsReal,
  Leakage,
  LeakyFunnel,
  MultiHoming,
  OneVsThree,
  OwnListingRank,
  RecordCabinet,
  RetailMediaLoop,
  RevenueDrivers,
  ScreenAssumption,
  SidesDiagram,
  SystemsOfRecord,
  ThreeRoutes,
  TrafficTimesStore,
  TrailBrand,
  TwoPages,
  TwoReaders,
  WeeksVsMilliseconds,
} from "./visuals";

// ============================================================================
// WEEK 1: DIGITAL BUSINESS MODELS AND E-COMMERCE ARCHITECTURE
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and which catalogue plate
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week1Page() {
  return (
    <SlideDeck label="Week 1">
      {/* ================================================================
          01. Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 1: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">Digital Business Models and E-Commerce Architecture</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[50ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.3rem,2.1vw,1.8rem)]">
          Digital marketing and e-commerce unite{" "}
          <span className="text-[var(--signal)]">demand generation with the information systems</span> that
          catalog, rank, price, and fulfill every transaction across human and agent-mediated markets.
        </p>
      </Slide>

      {/* ================================================================
          02. Why Digital Marketing and E-Commerce Are Inseparable [no-exercise]
          ================================================================ */}
      <Slide id="why-digital-marketing-and-e-commerce-are-inseparable" border className="!py-8">
        <SlideHeading>Why Digital Marketing and E-Commerce Are Inseparable</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                In physical retail, advertising and store operations often functioned as separate departments
                because weeks could pass between a television commercial and a trip to the store.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In digital commerce, an advertisement, a search result, a product page, and a payment terminal are
                connected by milliseconds and a shared data layer.
              </P>
            </Ruled>
            <Plate>
              <WeeksVsMilliseconds />
            </Plate>
            <Ruled weight="thin">
              <P>
                Furthermore, the software architecture of the store directly determines what marketers can test,
                personalize, and measure.
              </P>
            </Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                A marketing campaign that drives paid traffic to a slow, poorly structured storefront{" "}
                <Term tone="signal">wastes acquisition spend</Term>, while a well-engineered storefront without
                discoverability attracts no buyers.
              </P>
            </Ruled>
            <Plate>
              <TrafficTimesStore />
            </Plate>
            <Ruled weight="thin">
              <P>
                Studying digital marketing alongside e-commerce information systems therefore connects how firms
                attract attention with how their platforms convert that attention into revenue.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          03. Defining Digital Marketing and E-Commerce [no-exercise]
          ================================================================ */}
      <Slide id="defining-digital-marketing-and-e-commerce" border className="!py-8">
        <SlideHeading>Defining Digital Marketing and E-Commerce</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term tone="ink">Digital marketing</Term> is the use of networked digital channels, algorithms, and
              customer data to acquire, engage, and retain buyers in measurable ways.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Electronic commerce (e-commerce)</Term> is the execution of commercial transactions,
              including product discovery, ordering, payment, and fulfillment orchestration, over digital networks.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <TwoPages />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Whereas digital marketing governs the flow of attention and persuasion into the storefront, e-commerce
              governs the transactional and operational infrastructure that completes the exchange.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Every design decision in an online store, such as page latency, catalog schema, or checkout friction,{" "}
              <Term tone="signal">simultaneously acts as an information systems decision and a marketing conversion
              lever</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          04. Part 1: Digital Commerce Models [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Digital Commerce Models" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Online businesses organize exchange through distinct commercial models that differ in{" "}
                <Term tone="signal">who sells, who buys, who owns the inventory, and how revenue is earned</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Choosing a business model defines the firm&apos;s customer acquisition economics, its technology
                requirements, and its control over the buyer relationship.
              </p>
            </Ruled>
          </div>
          <Plate>
            <FourQuestions />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          05. B2C, B2B, and Direct-to-Consumer (D2C) Commerce [no-exercise]
          ================================================================ */}
      <Slide id="b2c-b2b-and-direct-to-consumer-d2c-commerce" border className="!py-8">
        <SlideHeading>B2C, B2B, and Direct-to-Consumer (D2C) Commerce</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Business-to-consumer (B2C)</Term> e-commerce sells finished goods or digital services
              directly to individual shoppers through online retailers, category specialists, or digital
              storefronts.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Business-to-business (B2B)</Term> e-commerce handles transactions between
              organizations, such as wholesale supply portals, negotiated contract catalogs, and automated
              procurement systems.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Direct-to-consumer (D2C)</Term> commerce occurs when a manufacturer bypasses
              traditional wholesale and retail intermediaries to sell its own brand directly to end consumers online.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <ThreeRoutes />
        </Plate>
        <div className="mt-5 grid w-full items-center gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-10">
          <Ruled>
            <P>
              Selling direct gives a manufacturer first-party customer data, control over brand presentation, and
              higher gross margins per unit, but{" "}
              <Term tone="signal">requires the firm to fund its own customer acquisition and single-item
              fulfillment</Term>.
            </P>
          </Ruled>
          <Plate>
            <DirectLedger />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          06. First-Party Retailers Versus Two-Sided Marketplaces [no-exercise]
          ================================================================ */}
      <Slide id="first-party-retailers-versus-two-sided-marketplaces" border className="!py-8">
        <SlideHeading>First-Party Retailers Versus Two-Sided Marketplaces</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                A <Term tone="ink">first-party (1P) online retailer</Term> takes wholesale title to inventory, holds
                stock in its own fulfillment network, sets the retail price, and sells to the shopper as the merchant
                of record.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A <Term tone="ink">third-party (3P) two-sided marketplace</Term> does not own the goods it lists.
                Instead, it provides the discovery, ranking, checkout, and trust infrastructure that connects
                independent sellers with buyers.
              </P>
            </Ruled>
            <Plate>
              <OneVsThree />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Hybrid platforms</Term> combine both models within the same storefront, operating as
                a first-party retailer in high-velocity categories while hosting third-party merchants to expand
                assortment breadth.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Managing a hybrid platform creates{" "}
                <Term tone="signal">structural tension</Term> whenever the platform&apos;s own private-label or
                first-party inventory competes for rank position against third-party sellers on the same results
                page.
              </P>
            </Ruled>
            <Plate>
              <OwnListingRank />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          07. Revenue Models in Digital Commerce [exercise]
          ================================================================ */}
      <Slide
        id="revenue-models-in-digital-commerce"
        border
        className="!py-8"
        exercise={exercise["revenue-models-in-digital-commerce"]}
      >
        <SlideHeading>Revenue Models in Digital Commerce</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="grid gap-4">
            <li>
              <Ruled weight="thin">
                <P>
                  Under a <Term tone="ink">retail markup model</Term>, a first-party merchant buys or manufactures
                  goods at cost and earns the gross margin between unit cost and retail selling price.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  Under a <Term tone="ink">commission or take-rate model</Term>, a two-sided marketplace charges
                  third-party sellers a percentage of gross merchandise value (GMV) for each completed transaction,
                  often paired with listing or fulfillment fees.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  Under a <Term tone="ink">subscription or membership model</Term>, the firm charges recurring monthly
                  or annual fees for continuous access to products, replenishables, or delivery benefits,{" "}
                  <Term tone="signal">shifting focus from single orders to retention</Term>.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  Under a <Term tone="ink">retail media model</Term>, a retailer or marketplace monetizes its shopper
                  traffic by selling sponsored search placements and display impressions to brands inside the shopping
                  funnel.
                </P>
              </Ruled>
            </li>
          </ol>
          <Plate>
            <RevenueDrivers />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          08. Matching Commercial Scenarios to Digital Business Models [exercise]
          ================================================================ */}
      <Slide
        id="matching-commercial-scenarios-to-digital-business-models"
        border
        className="!py-8"
        exercise={exercise["matching-commercial-scenarios-to-digital-business-models"]}
      >
        <SlideHeading>Matching Commercial Scenarios to Digital Business Models</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          <Ruled weight="thin">
            <P>
              A footwear manufacturer that launches its own web store to capture buyer email addresses and test new
              designs without sharing margins with department stores operates a{" "}
              <Term tone="ink">direct-to-consumer (D2C) model</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              An industrial fastener distributor whose portal integrates with factory enterprise resource planning
              (ERP) systems for bulk reorders under negotiated credit terms operates a{" "}
              <Term tone="ink">B2B e-commerce model</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              A platform that connects thousands of independent craft sellers with shoppers and collects a 6.5
              percent transaction fee without holding inventory operates a{" "}
              <Term tone="ink">two-sided 3P marketplace model</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              A grocery app that sells ad slots at the top of its &quot;sparkling water&quot; search results to
              beverage brands on a cost-per-click basis operates a{" "}
              <Term tone="ink">retail media revenue model</Term>.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <FourScenarios />
        </Plate>
      </Slide>

      {/* ================================================================
          09. Part 2: Multi-Sided Platform Economics [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Multi-Sided Platform Economics" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <AddOneAtATime />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Two-sided marketplaces do not scale like traditional retailers that add one warehouse or store at a
                time.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Their growth and defensibility are governed by{" "}
                <Term tone="signal">network effects</Term>, switching costs, and the rules by which the platform
                matches supply with demand.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          10. Same-Side and Cross-Side Network Effects [no-exercise]
          ================================================================ */}
      <Slide id="same-side-and-cross-side-network-effects" border className="!py-8">
        <SlideHeading>Same-Side and Cross-Side Network Effects</SlideHeading>
        <Lead className="!max-w-none">
          A <Term tone="ink">network effect</Term> exists when the value of a platform to a user depends on the number
          of other users participating on the platform.
        </Lead>
        <div className="mt-6 grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Same-side (or direct) network effects</Term> occur when users on one side of the
                market directly benefit from or compete with more users on that same side, as when additional shopper
                reviews help other shoppers or when additional sellers intensify price competition.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Cross-side (or indirect) network effects</Term> occur when growth on one side of the
                market makes the platform more valuable to the other side, as when more buyers attract more merchants
                and a wider merchant assortment attracts more buyers.
              </P>
            </Ruled>
            <Plate>
              <SidesDiagram />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                Positive cross-side network effects create a self-reinforcing flywheel, but they{" "}
                <Term tone="signal">can also run in reverse</Term> if falling buyer traffic causes merchants to
                abandon the marketplace.
              </P>
            </Ruled>
            <Plate>
              <Flywheel />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          11. The Cold-Start Problem, Multi-Homing, and Disintermediation [exercise]
          ================================================================ */}
      <Slide
        id="the-cold-start-problem-multi-homing-and-disintermediation"
        border
        className="!py-8"
        exercise={exercise["the-cold-start-problem-multi-homing-and-disintermediation"]}
      >
        <SlideHeading>The Cold-Start Problem, Multi-Homing, and Disintermediation</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                The <Term tone="ink">cold-start (or chicken-and-egg) problem</Term> arises at launch because buyers
                will not visit a marketplace without listings, and sellers will not list inventory on a marketplace
                without buyers.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Platforms overcome the cold-start problem by{" "}
                <Term tone="signal">seeding one side first</Term>, such as operating as a first-party retailer
                before opening to third-party sellers, or subsidizing marquee sellers with zero-commission periods.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ColdStartSeed />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="grid content-start gap-3">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Multi-homing</Term> occurs when buyers or sellers participate on several competing
                platforms simultaneously, such as a merchant listing the same catalog on multiple marketplaces, which
                weakens any single platform&apos;s pricing power.
              </P>
            </Ruled>
            <Plate>
              <MultiHoming />
            </Plate>
          </div>
          <div className="grid content-start gap-3">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Platform leakage (or disintermediation)</Term> occurs when buyers and sellers use the
                marketplace to discover each other once and then move repeat transactions off-platform to avoid
                paying the take rate.
              </P>
            </Ruled>
            <Plate>
              <Leakage />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          12. Why Retail Media Networks Emerged Inside Marketplaces [no-exercise]
          ================================================================ */}
      <Slide id="why-retail-media-networks-emerged-inside-marketplaces" border className="!py-8">
        <SlideHeading>Why Retail Media Networks Emerged Inside Marketplaces</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              As third-party marketplaces grew to host millions of competing stock-keeping units (SKUs), organic
              shelf space on the first page of search results became scarce.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              At the same time, privacy regulations and the deprecation of third-party tracking cookies reduced the
              accuracy of advertising on external social and display networks.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <RetailMediaLoop />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Retailers and marketplaces realized that their own search queries and purchase logs constitute{" "}
              <Term tone="signal">closed-loop, first-party intent data</Term> captured at the exact moment a shopper
              is ready to buy.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              By building <Term tone="ink">retail media networks</Term> that auction sponsored slots alongside organic
              search results, platforms added a high-margin advertising revenue stream on top of low-margin retail
              operations.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          13. Part 3: The E-Commerce Information Systems Stack [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="The E-Commerce Information Systems Stack" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Behind every digital storefront sits an information systems architecture that manages product
                catalogs, inventory counts, pricing rules, shopping carts, and payments.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                <Term tone="signal">How these systems are coupled</Term> determines how rapidly a marketing team can
                launch new channels, run experiments, and adapt to new interfaces.
              </p>
            </Ruled>
          </div>
          <Plate>
            <RecordCabinet />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14. Monolithic Suites Versus Headless and Composable Commerce [exercise]
          ================================================================ */}
      <Slide
        id="monolithic-suites-versus-headless-and-composable-commerce"
        border
        className="!py-6"
        exercise={exercise["monolithic-suites-versus-headless-and-composable-commerce"]}
      >
        <SlideHeading>Monolithic Suites Versus Headless and Composable Commerce</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-10">
          <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
            <Ruled weight="thin">
              <P>
                In a <Term tone="ink">monolithic e-commerce architecture</Term>, the customer-facing presentation layer
                (the front-end storefront) and the back-end commerce engine (catalog, cart, checkout, and order logic)
                are tightly coupled inside a single software application.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Monolithic platforms simplify initial setup for standard web stores, but any change to the user
                interface requires modifying and redeploying the underlying back-end system.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In a <Term tone="ink">headless commerce architecture</Term>, the front-end presentation layer (the
                &quot;head&quot;) is decoupled from the back-end commerce engine, and the two communicate exclusively
                through application programming interfaces (APIs).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Composable commerce</Term> extends headless principles by assembling best-of-breed
                microservices, such as a dedicated search engine, a separate content management system, and a
                specialized payment service, orchestrated through APIs.
              </P>
            </Ruled>
            <Ruled className="md:col-span-2">
              <P>
                Decoupling the presentation layer allows a firm to serve a web browser, a native mobile app, an in-store
                kiosk, a social commerce checkout, and an AI shopping agent{" "}
                <Term tone="signal">from the same back-end commerce APIs</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ArchitectureChange />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          15. Core Systems of Record in E-Commerce [no-exercise]
          ================================================================ */}
      <Slide id="core-systems-of-record-in-e-commerce" border className="!py-8">
        <SlideHeading>Core Systems of Record in E-Commerce</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  A <Term tone="ink">Product Information Management (PIM)</Term> system serves as the central
                  repository for structured product attributes, descriptions, media assets, and taxonomy mappings
                  across all sales channels.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  An <Term tone="ink">Order Management System (OMS)</Term> tracks inventory availability across
                  warehouses and physical stores, routes orders to the optimal fulfillment node, and manages split
                  shipments and returns.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled weight="thin">
                <P>
                  An <Term tone="ink">Enterprise Resource Planning (ERP)</Term> system records the firm&apos;s
                  financial ledger, procurement orders, supplier payables, and physical inventory valuation.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  A <Term tone="ink">Customer Data Platform (CDP)</Term> and{" "}
                  <Term tone="ink">Customer Relationship Management (CRM)</Term> system unify behavioral events and
                  transaction histories into persistent customer profiles for segmentation and lifecycle messaging.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-5">
          <SystemsOfRecord />
        </Plate>
      </Slide>

      {/* ================================================================
          16. APIs, Checkout Orchestration, and Payment Gateways [exercise]
          ================================================================ */}
      <Slide
        id="apis-checkout-orchestration-and-payment-gateways"
        border
        className="!py-8"
        exercise={exercise["apis-checkout-orchestration-and-payment-gateways"]}
      >
        <SlideHeading>APIs, Checkout Orchestration, and Payment Gateways</SlideHeading>
        <Lead className="!max-w-none">
          When a shopper clicks the buy button,{" "}
          <Term tone="signal">the storefront does not move money directly</Term>. It initiates a sequence of
          synchronous API calls across specialized financial and operational services.
        </Lead>
        <ol className="mt-5 grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          <li className="min-w-0">
            <Ruled weight="thin">
              <P>
                Step 1 is <Term tone="ink">inventory reservation and tax calculation</Term>, in which the commerce
                engine verifies stock availability in the OMS and queries a tax engine for jurisdiction-specific
                duties and sales tax.
              </P>
            </Ruled>
          </li>
          <li className="min-w-0">
            <Ruled weight="thin">
              <P>
                Step 2 is <Term tone="ink">payment tokenization</Term>, in which the payment gateway replaces
                sensitive card or wallet credentials with a cryptographic token so raw card numbers never touch the
                merchant&apos;s servers.
              </P>
            </Ruled>
          </li>
          <li className="min-w-0">
            <Ruled weight="thin">
              <P>
                Step 3 is <Term tone="ink">fraud screening and authorization</Term>, in which a risk model evaluates
                transaction velocity and device signals before requesting a funds hold from the issuing bank via the
                card network.
              </P>
            </Ruled>
          </li>
          <li className="min-w-0">
            <Ruled weight="thin">
              <P>
                Step 4 is <Term tone="ink">order commit and capture</Term>, in which the confirmed order is written to
                the OMS for warehouse pick-and-pack and the authorized funds are captured for settlement.
              </P>
            </Ruled>
          </li>
        </ol>
        <Plate className="mx-auto mt-4 max-w-[940px]">
          <CheckoutRun />
        </Plate>
      </Slide>

      {/* ================================================================
          17. Discussion: Monolithic or Headless?
          ================================================================ */}
      <Slide id="discussion-monolithic-or-headless" border className="!py-8">
        <SlideHeading>Monolithic or Headless?</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A mid-sized outdoor apparel brand currently runs on an all-in-one monolithic e-commerce template. The
            marketing director wants to launch an interactive trail-gear configurator on mobile, sell directly inside
            short-form video apps, and expose a real-time catalog feed to conversational AI shopping assistants, but
            the engineering team warns that the current template cannot support custom API endpoints. What are the
            marketing and information systems trade-offs of migrating to a headless composable architecture versus
            staying on the monolithic platform?
          </Prompt>
          <Plate>
            <TrailBrand />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          18. Part 4: The Digital Customer Funnel and Channel Strategy [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="The Digital Customer Funnel and Channel Strategy" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Technology infrastructure creates value only when it moves buyers efficiently from initial awareness to
                repeat purchase.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Marketers model this progression as a funnel and{" "}
                <Term tone="signal">track conversion losses at every handoff</Term> between channels and systems.
              </p>
            </Ruled>
          </div>
          <Plate>
            <LeakyFunnel />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          19. Stages of the Digital Commerce Funnel [exercise]
          ================================================================ */}
      <Slide
        id="stages-of-the-digital-commerce-funnel"
        border
        className="!py-8"
        exercise={exercise["stages-of-the-digital-commerce-funnel"]}
      >
        <SlideHeading>Stages of the Digital Commerce Funnel</SlideHeading>
        <FunnelStagesBlock />
      </Slide>

      {/* ================================================================
          20. Channel Conflict and Omnichannel Integration [no-exercise]
          ================================================================ */}
      <Slide id="channel-conflict-and-omnichannel-integration" border className="!py-8">
        <SlideHeading>Channel Conflict and Omnichannel Integration</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                When a brand adds a direct-to-consumer web store alongside existing wholesale retail partners, it
                risks <Term tone="ink">channel conflict</Term> if retail partners view the brand&apos;s own website as
                undercutting their floor traffic and margins.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Double marginalization</Term> arises in indirect wholesale channels when both the
                manufacturer and the independent retailer add their own markups,{" "}
                <Term tone="signal">resulting in a higher final price</Term> than an integrated direct channel would
                set.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Firms mitigate channel conflict through minimum advertised price (MAP) policies, channel-exclusive
                product bundles, or routing online orders to local retail partners for fulfillment.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                True <Term tone="ink">omnichannel integration</Term> unifies inventory, pricing, and loyalty records
                across physical stores and digital channels so a customer can research online, pick up in store, or
                return an online parcel at a retail counter.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DoubleMarkup />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          21. Part 5: From Web Browsers to Autonomous Shopping Agents [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="From Web Browsers to Autonomous Shopping Agents" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <ScreenAssumption />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                For three decades, e-commerce storefronts were designed around a single assumption, namely that a
                human shopper sits behind a screen, visually scans pages, clicks links, and types credit card details
                into a form.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Large language models and tool-using AI agents break that assumption by acting as{" "}
                <Term tone="signal">autonomous intermediaries</Term> between the consumer and the storefront.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          22. The AI Shopping Agent as a Surrogate Consumer [no-exercise]
          ================================================================ */}
      <Slide id="the-ai-shopping-agent-as-a-surrogate-consumer" border className="!py-8">
        <SlideHeading>The AI Shopping Agent as a Surrogate Consumer</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              An <Term tone="ink">AI shopping agent</Term> is a software system built on a foundation model that
              accepts a natural-language goal from a consumer, queries search engines or commerce APIs, evaluates
              candidate products, and recommends or executes a purchase.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In consumer behavior theory, the agent functions as a <Term tone="ink">surrogate consumer</Term> to whom
              the human principal delegates information search, attribute comparison, and transaction execution.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Whereas a human shopper experiences a storefront through visual typography, color contrast, and
                photography, an AI agent experiences the storefront as{" "}
                <Term tone="signal">tokens of text, HTML structure, JSON schemas, and ranked API responses</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Consequently, digital marketing expands from business-to-consumer (B2C) communication to{" "}
                <Term tone="ink">business-to-agent (B2A) optimization</Term>, where product data must be legible and
                verifiable to machine readers.
              </P>
            </Ruled>
          </div>
          <Plate>
            <TwoReaders />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          23. How Agentic Commerce Reshapes the Digital Funnel [exercise]
          ================================================================ */}
      <Slide
        id="how-agentic-commerce-reshapes-the-digital-funnel"
        border
        className="!py-8"
        exercise={exercise["how-agentic-commerce-reshapes-the-digital-funnel"]}
      >
        <SlideHeading>How Agentic Commerce Reshapes the Digital Funnel</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                In <Term tone="ink">discovery</Term>, consumers increasingly state multi-constraint goals in a
                conversational interface (e.g., a quiet espresso machine under 400 dollars with a stainless-steel
                boiler) instead of typing short keywords into a search bar.
              </P>
            </Ruled>
            <Plate>
              <ConstraintFilter />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                In <Term tone="ink">evaluation</Term>, the AI agent reads product specifications, shipping cutoffs, and
                aggregated customer reviews across multiple merchants in parallel,{" "}
                <Term tone="signal">compressing the consideration set before the human sees a single webpage</Term>{" "}
                (Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
            <Plate>
              <InspectionsReal />
            </Plate>
          </div>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P>
              In <Term tone="ink">ranking and retail media</Term>, position effects and sponsored placements now act
              on the agent&apos;s information acquisition process rather than on human eye movements alone (Wadi
              &amp; Ma, 2026b, 2026c).
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In <Term tone="ink">checkout</Term>, headless APIs and agent payment protocols allow an authenticated
              agent to verify stock, apply promotional codes, and complete payment using delegated credentials
              without rendering a graphical checkout page.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          24. Discussion: Designing for Two Audiences at Once
          ================================================================ */}
      <Slide id="discussion-designing-for-two-audiences-at-once" border className="!py-8">
        <SlideHeading>Designing for Two Audiences at Once</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A consumer electronics retailer notices that 18 percent of its product page traffic now originates from
            automated AI shopping assistants fetching product specifications on behalf of users. The retailer&apos;s
            current pages rely heavily on lifestyle photography, promotional countdown banners, and specification
            tables embedded inside flat image files. How will an AI shopping agent perceive this storefront compared
            with a human shopper, and what changes to both marketing content and information systems architecture
            should the retailer prioritize?
          </Prompt>
          <Plate>
            <AgentShare />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          25. Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Digital marketing and e-commerce operate as a single socio-technical system in which customer acquisition channels and storefront software architecture jointly determine conversion and profitability.",
            "Digital commerce business models span B2C, B2B, D2C, first-party (1P) retail, and third-party (3P) two-sided marketplaces, monetized through retail markups, take-rate commissions, subscriptions, and retail media networks.",
            "Two-sided marketplaces scale through cross-side network effects between buyers and sellers, while managing cold-start chicken-and-egg problems, multi-homing, and off-platform leakage.",
            "Decoupling the front-end presentation layer from back-end systems of record (PIM, OMS, ERP, and CDP) via headless and composable APIs enables firms to serve web, mobile, social, and agentic touchpoints from a unified commerce core.",
            "The digital commerce funnel tracks shoppers across acquisition, activation, conversion, fulfillment, and retention, requiring careful coordination across direct and retail channels.",
            "As consumers delegate search, evaluation, and checkout to AI shopping agents, firms must design storefronts, structured catalogs, and APIs for both human eyes and autonomous machine intermediaries.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
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

/** The five funnel stages: each sentence stands over its own panel of the strip. */
function FunnelStagesBlock() {
  const stages = [
    <>
      <Term tone="ink">Acquisition</Term> brings prospective shoppers to the storefront through organic search, paid
      search, programmatic display, social media, creator partnerships, or referral links.
    </>,
    <>
      <Term tone="ink">Activation and engagement</Term> occur when a visitor lands on the storefront, navigates the
      category taxonomy, queries the internal search engine, and inspects product detail pages.
    </>,
    <>
      <Term tone="ink">Conversion</Term> occurs when the shopper adds items to the cart, initiates checkout, completes
      shipping and payment steps, and submits a confirmed order.
    </>,
    <>
      <Term tone="ink">Fulfillment and post-purchase experience</Term> span order confirmation, warehouse dispatch,
      last-mile delivery speed, unboxing, and customer support.
    </>,
    <>
      <Term tone="ink">Retention and advocacy</Term> occur when satisfied buyers write online reviews, subscribe to
      replenishment flows, and{" "}
      <Term tone="signal">return for repeat purchases without requiring another paid acquisition click</Term>.
    </>,
  ];
  return (
    <div className="w-full">
      <ol className="grid w-full gap-x-5 gap-y-4 md:grid-cols-3 xl:grid-cols-5">
        {stages.map((s, i) => (
          <li key={i} className="min-w-0">
            <Numbered n={i + 1}>
              <Ruled weight="thin">
                <P className="!text-[1rem]">{s}</P>
              </Ruled>
            </Numbered>
          </li>
        ))}
      </ol>
      <Plate className="mt-4">
        <FunnelStages />
      </Plate>
    </div>
  );
}
