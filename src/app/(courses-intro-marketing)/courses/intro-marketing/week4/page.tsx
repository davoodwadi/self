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
  AiBuyingCenter,
  BuyingSituations,
  KamProgression,
  MarketSplitLane,
  RadiatingRoles,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 4: BUSINESS-TO-BUSINESS (B2B) MARKETING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week4() {
  return (
    <SlideDeck label="Week 4">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 4
          </p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">Business-to-Business (B2B) Marketing</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Business-to-business marketing addresses how{" "}
              <Tint>organizations purchase goods and services</Tint> through
              multi-role buying centers, structured procurement stages, and
              long-term key account partnerships that increasingly incorporate
              automated AI sourcing agents.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Scope and Economic Scale of B2B Markets
          ================================================================ */}
      <Slide className={TIGHT} id="scope-and-economic-scale-of-b2b-markets" border>
        <SlideHeading>Scope and Economic Scale of B2B Markets</SlideHeading>
        <Statement>
          <Term>Business buyer behavior</Term> refers to the purchasing behavior
          of organizations that acquire goods and services for use in the
          production of other products and services that are sold, rented, or
          supplied to others.
        </Statement>
        <Lead className="mt-6">
          It also includes the behavior of{" "}
          <Term>retailing and wholesaling firms</Term> that acquire goods for the
          purpose of reselling or renting them to others at a profit.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Although consumer brands are more visible to the general public,
              total dollar volume in B2B transactions far exceeds consumer
              market volume because many raw-material, component, and wholesale
              transactions occur upstream of a single retail sale.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Producing and selling a single pair of running shoes to a consumer
              requires{" "}
              <Tint>
                prior B2B transactions for synthetic textiles, molded rubber
                soles, factory machinery, packaging cartons, freight logistics,
                and retail display fixtures
              </Tint>
              .
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Categories of Organizational Buyers
          ================================================================ */}
      <Slide className={TIGHT} id="categories-of-organizational-buyers" border>
        <SlideHeading>Categories of Organizational Buyers</SlideHeading>
        <Lead>
          Organizational markets comprise three distinct institutional
          categories: <Term>commercial enterprises</Term>,{" "}
          <Term>institutional buyers</Term>, and <Term>government bodies</Term>.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Commercial enterprises</Term> purchase raw materials,
              manufactured components, capital equipment, and business services
              to produce their own commercial outputs or run daily operations.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Institutional markets</Term> consist of schools, hospitals,
              nursing homes, and non-profit organizations that provide goods and
              services to people in their care, often operating under strict
              budgets and captive patronage.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Government markets</Term> consist of federal, provincial or
              state, and municipal agencies that purchase or rent goods for
              public functions, typically requiring public tenders, open
              bidding, and strict regulatory compliance.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 1: Characteristics of Business Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-characteristics-of-business-markets"
        border
      >
        <PartHead n={1} title="Characteristics of Business Markets" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Business markets differ systematically from consumer markets in{" "}
            <Tint>
              market structure, demand behavior, buying unit composition, and
              decision complexity
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Recognizing these structural differences explains why B2B
              marketing programs emphasize technical documentation, total cost
              of ownership, and consultative selling.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Market Structure and Derived Demand
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="market-structure-and-derived-demand"
        border
        exercise={exercise["market-structure-and-derived-demand"]}
      >
        <SlideHeading>Market Structure and Derived Demand</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              A business marketer normally deals with{" "}
              <Tint>far fewer but much larger buyers</Tint> than a consumer
              marketer does, and those buyers are often geographically
              concentrated in industrial clusters.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Business demand is <Term>derived demand</Term>: it ultimately
              derives from the demand for consumer goods and services
              downstream.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <MarketSplitLane />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              If household demand for residential solar panels declines,
              commercial demand for photovoltaic silicon wafers, aluminum
              mounting racks, and inverter microchips declines proportionally.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because derived demand originates with end consumers, B2B
              marketers sometimes advertise directly to final consumers (as
              Intel did with &quot;Intel Inside&quot;) to pull demand through
              the supply chain.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Inelastic and Fluctuating Demand
          ================================================================ */}
      <Slide className={TIGHT} id="inelastic-and-fluctuating-demand" border>
        <SlideHeading>Inelastic and Fluctuating Demand</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Many business markets exhibit{" "}
              <Term>price-inelastic demand</Term> in the short run, meaning
              total industry demand for a component responds weakly to moderate
              price changes.
            </Statement>
            <Ruled>
              <P>
                An appliance manufacturer will not double its purchases of steel
                hinges simply because hinge prices fall by ten percent, nor can
                it immediately redesign its washing machines if hinge prices
                rise.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                At the same time, demand for any single supplier&apos;s hinges
                remains <Term>highly price-elastic</Term> if competing suppliers
                offer identical specifications.
              </P>
            </Ruled>
            <Ruled>
              <Big>
                Business markets also experience{" "}
                <Term>fluctuating demand</Term> (the{" "}
                <Term>acceleration principle</Term>), in which a ten percent
                rise in consumer retail demand can cause a much larger surge in
                orders for new factory machinery and tooling.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Nature of the Buying Unit and Decision Complexity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="nature-of-the-buying-unit-and-decision-complexity"
        border
      >
        <SlideHeading>
          Nature of the Buying Unit and Decision Complexity
        </SlideHeading>
        <Statement>
          Compared with consumer purchases, a business purchase usually involves
          more <Term>decision participants</Term> and a more professional,
          formalized purchasing effort.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Major B2B purchases are governed by committees of technical
              experts, financial analysts, and senior executives who evaluate
              detailed economic and engineering justifications.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because purchasing decisions are complex and high in financial and
              operational risk, the buying cycle from initial inquiry to signed
              contract can span months or years.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In many B2B industries, buyers and sellers become{" "}
              <Tint>closely interdependent</Tint>, co-developing custom product
              specifications and integrating inventory systems.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Buying Situations and the Organizational Buying Center
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-buying-situations-and-the-organizational-buying-center"
        border
      >
        <PartHead
          n={2}
          title="Buying Situations and the Organizational Buying Center"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Organizational purchases vary in complexity depending on whether the
            firm is{" "}
            <Tint>
              repeating a routine order, modifying an existing contract, or
              buying a solution for the first time
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Across these buying situations, decision authority is distributed
              across the roles of the organizational buying center.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Three Types of Business Buying Situations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="three-types-of-business-buying-situations"
        border
        exercise={exercise["three-types-of-business-buying-situations"]}
      >
        <SlideHeading>Three Types of Business Buying Situations</SlideHeading>
        <ol className="grid w-full gap-6 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              In a <Term>straight rebuy</Term>, the buyer routinely reorders
              something without any modifications, such as replenishing office
              paper, standard fasteners, or maintenance lubricants from an
              approved supplier list.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              In a <Term>modified rebuy</Term>, the buyer wants to modify
              product specifications, prices, delivery terms, or suppliers,
              giving &quot;in&quot; suppliers an incentive to protect the
              account and &quot;out&quot; suppliers an opening to pitch a
              better offer.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              In a <Term>new task</Term> situation, a company buys a product or
              service for the first time, such as adopting a cloud enterprise
              resource planning system or building a new assembly line.
            </P>
          </Numbered>
        </ol>
        <div className="mt-6 w-full">
          <Plate wide>
            <BuyingSituations />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              The greater the cost and risk of the new task, the larger the
              number of decision participants and the more extensive their
              information search.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Many new-task buyers prefer <Term>systems selling</Term> (or{" "}
              <Term>solutions selling</Term>), purchasing a complete turnkey
              package of interlocked products and services from a single prime
              contractor rather than assembling separate parts.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Roles Within the Organizational Buying Center
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="roles-within-the-organizational-buying-center"
        border
        exercise={exercise["roles-within-the-organizational-buying-center"]}
      >
        <SlideHeading>
          Roles Within the Organizational Buying Center
        </SlideHeading>
        <Lead>
          The decision-making unit of a buying organization is called its{" "}
          <Term>buying center</Term>: all the individuals and units that play a
          role in the business purchase decision-making process.
        </Lead>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                <Term>Users</Term> are the members of the organization who will
                actually use the purchased product or service, often initiating
                the buying proposal and helping define functional
                specifications.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Influencers</Term> affect the buying decision by helping
                define technical specifications and providing information for
                evaluating alternatives, such as in-house engineers or external
                IT consultants.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Buyers</Term> have formal organizational authority to
                select the supplier and arrange terms of purchase, although they
                may be overridden by senior management on major capital
                expenditures.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <RadiatingRoles />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Deciders, Gatekeepers, and Dynamic Membership
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="deciders-gatekeepers-and-dynamic-membership"
        border
      >
        <SlideHeading>
          Deciders, Gatekeepers, and Dynamic Membership
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Deciders</Term> have formal or informal power to select or
              approve the final suppliers, often remaining behind the scenes in
              routine purchases while stepping forward in high-stakes contracts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Gatekeepers</Term> control the flow of information to others
              in the buying center, such as procurement assistants who screen
              vendor calls or technical staff who choose which supplier
              brochures reach department heads.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              The buying center is{" "}
              <Tint>
                not a fixed and formally identified unit on the organizational
                chart
              </Tint>
              : its membership and size shift with each product category and
              buying situation.
            </Big>
          </Ruled>
          <Ruled>
            <P>
              A single individual may occupy multiple roles in a small firm
              (acting as user, buyer, and decider), whereas a large corporation
              may assign dozens of specialists to a single role.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Mapping the Buying Center for a Hospital Equipment Purchase
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-mapping-the-buying-center-for-a-hospital-equipment-purchase"
        border
      >
        <SlideHeading kicker="Discussion:">
          Mapping the Buying Center for a Hospital Equipment Purchase
        </SlideHeading>
        <Prompt>
          A medical-device manufacturer is selling a 500,000-dollar automated
          diagnostic imaging system to a regional hospital network in a new-task
          buying situation. Identify which hospital personnel occupy the user,
          influencer, buyer, decider, and gatekeeper roles, and explain how the
          value proposition and evidence presented to the chief radiologist
          should differ from the proposal presented to the chief financial
          officer.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: The Business Buying Decision Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-the-business-buying-decision-process"
        border
      >
        <PartHead n={3} title="The Business Buying Decision Process" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Business buyers move through an{" "}
            <Tint>eight-stage procurement process</Tint> when confronting a
            new-task buying situation, while skipping or automating stages in
            modified or straight rebuys.
          </Statement>
          <Ruled>
            <Lead>
              Understanding how specifications are written and how proposals are
              scored determines whether a supplier wins the contract.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Problem Recognition to Product Specification
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="problem-recognition-to-product-specification"
        border
        exercise={exercise["problem-recognition-to-product-specification"]}
      >
        <SlideHeading>
          Problem Recognition to Product Specification
        </SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              Stage 1 is <Term>problem recognition</Term>, which occurs when
              someone in the company recognizes a problem or need that can be
              met by acquiring a specific good or service, triggered internally
              (a machine breakdown or new product launch) or externally (a trade
              show or sales call).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Stage 2 is <Term>general need description</Term>, in which the
              buyer prepares a summary describing the general characteristics
              and quantity of the needed item, such as durability, reliability,
              and output capacity.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Stage 3 is <Term>product specification</Term>, in which the buying
              organization decides on and specifies the best technical product
              characteristics for a needed item with the help of an engineering
              team.
            </P>
          </Numbered>
        </ol>
        <div className="mt-8 w-full">
          <Ruled>
            <Lead>
              Engineering teams frequently apply <Term>value analysis</Term>, an
              approach to cost reduction in which components are studied
              carefully to determine whether they can be redesigned,
              standardized, or made by less costly methods of production.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Supplier Search to Supplier Selection
          ================================================================ */}
      <Slide className={TIGHT} id="supplier-search-to-supplier-selection" border>
        <SlideHeading>Supplier Search to Supplier Selection</SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-3">
          <Numbered n={4}>
            <P>
              Stage 4 is <Term>supplier search</Term>, in which the buyer
              conducts a search to find the best vendors by reviewing trade
              directories, querying digital procurement portals, or requesting
              referrals from other firms.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Stage 5 is <Term>proposal solicitation</Term>, in which the buyer
              invites qualified suppliers to submit formal written proposals or
              deliver detailed technical and financial presentations.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Stage 6 is <Term>supplier selection</Term>, in which the buying
              center reviews proposals and selects one or more suppliers using a
              structured <Term>vendor scorecard</Term>.
            </P>
          </Numbered>
        </ol>
        <div className="mt-8 w-full">
          <Ruled>
            <Lead>
              Buying centers score candidate suppliers on product and service
              quality, on-time delivery record, ethical corporate behavior,
              honest communication, competitive total lifecycle cost, and repair
              and maintenance capability.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Order-Routine Specification and Performance Review
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="order-routine-specification-and-performance-review"
        border
      >
        <SlideHeading>
          Order-Routine Specification and Performance Review
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Numbered n={7}>
            <P>
              Stage 7 is <Term>order-routine specification</Term>, in which the
              buyer writes the final order with the chosen supplier, listing
              technical specifications, quantity needed, expected delivery
              schedule, return policies, and warranties.
            </P>
          </Numbered>
          <Ruled>
            <P>
              For recurring maintenance, repair, and operating items, buyers
              increasingly replace individual purchase orders with{" "}
              <Term>blanket contracts</Term> or{" "}
              <Term>vendor-managed inventory</Term>, in which the supplier
              monitors stock and replenishes automatically.
            </P>
          </Ruled>
          <Numbered n={8}>
            <P>
              Stage 8 is <Term>performance review</Term>, in which the buyer
              rates its satisfaction with the supplier&apos;s performance by
              polling internal users and auditing delivery and defect metrics.
            </P>
          </Numbered>
          <Ruled>
            <Big>
              Based on the performance review, the buying center decides whether
              to <Tint>continue, modify, or drop</Tint> the supplier
              arrangement.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Relationship Marketing and Key Account Management
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-relationship-marketing-and-key-account-management"
        border
      >
        <PartHead
          n={4}
          title="Relationship Marketing and Key Account Management"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Because B2B markets feature concentrated buyer bases and high
            switching costs,{" "}
            <Tint>retaining and growing existing accounts</Tint> is usually far
            more profitable than chasing one-off transactions.
          </Statement>
          <Ruled>
            <Lead>
              Relationship marketing and Key Account Management (KAM) structure
              how suppliers partner with their most strategic business
              customers.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Transaction Orientation Versus Relationship Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="transaction-orientation-versus-relationship-marketing"
        border
      >
        <SlideHeading>
          Transaction Orientation Versus Relationship Marketing
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Transactional marketing</Term> treats each order as an
              isolated negotiation in which the buyer and seller attempt to
              capture maximum immediate surplus at the other&apos;s expense.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Relationship marketing</Term> focuses on building long-term,
              mutually profitable partnerships with key customers, suppliers,
              and distributors by delivering consistent value over time.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In B2B relationship marketing, trust, reliability, and operational
              integration act as <Term>strong competitive moats</Term> that
              prevent rivals from poaching accounts with minor price discounts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Suppliers calculate <Term>customer lifetime value</Term> at the
              organizational level, recognizing that a five-year enterprise
              contract generates recurring maintenance, upgrade, and expansion
              revenues.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Key Account Management (KAM)
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="key-account-management-kam"
        border
        exercise={exercise["key-account-management-kam"]}
      >
        <SlideHeading>Key Account Management (KAM)</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              In many B2B firms, a small fraction of business customers (often
              following the <Term>Pareto pattern</Term> in which roughly 20
              percent of accounts generate 80 percent of revenue) accounts for
              the majority of sales and profit.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Key Account Management (KAM)</Term> is the systematic
              process of assigning dedicated cross-functional teams to build
              deep, long-term relationships with the company&apos;s most
              valuable organizational customers.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <KamProgression />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Rather than pitching off-the-shelf catalog items, a key account
              team embeds engineers, logistics specialists, and account
              directors to co-design customized solutions and align supply
              schedules.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Dedicated key account programs coordinate service across all
              global branches of the client organization through a{" "}
              <Term>single point of accountability</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Benefits and Risks of Strategic B2B Partnerships
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="benefits-and-risks-of-strategic-b2b-partnerships"
        border
      >
        <SlideHeading>
          Benefits and Risks of Strategic B2B Partnerships
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Collaborative B2B partnerships generate substantial mutual
              benefits: higher account retention, joint product innovation,
              shared demand forecasting, and lower inventory holding costs
              across the supply chain.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Satisfied key accounts also provide credible industry references
              and case studies that help the supplier win new business clients.
            </P>
          </Ruled>
          <Ruled>
            <P>
              At the same time, over-reliance on a single dominant key account
              exposes a supplier to severe <Term>concentration risk</Term> if
              that client demands steep price concessions, experiences financial
              distress, or switches to a competitor.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Prudent B2B suppliers balance{" "}
              <Tint>deep investment in current key accounts</Tint> with ongoing
              business development to diversify their client portfolio.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: AI Agents in Organizational Buying
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-ai-agents-in-organizational-buying"
        border
      >
        <PartHead n={5} title="AI Agents in Organizational Buying" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Organizations are deploying <Term>AI procurement agents</Term> and
            e-procurement systems to automate routine reordering, screen vendor
            catalogs, and compare supplier bids.
          </Statement>
          <Ruled>
            <Lead>
              Examining which buying center roles AI agents assume shows how B2B
              suppliers must adapt both their digital data and their human
              relationship strategies.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          E-Procurement and Digital B2B Marketplaces
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="e-procurement-and-digital-b2b-marketplaces"
        border
      >
        <SlideHeading>E-Procurement and Digital B2B Marketplaces</SlideHeading>
        <Statement>
          <Term>E-procurement</Term> refers to purchasing through electronic
          connections between buyers and sellers, including reverse auctions,
          trading exchanges, company buying sites, and extranet links.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Enterprise resource planning (ERP)</Term> and e-procurement
              portals connect a manufacturer&apos;s production schedule directly
              to approved suppliers&apos; inventory systems, cutting
              order-processing costs and fulfillment lead times.
            </P>
          </Ruled>
          <Ruled>
            <P>
              While early e-procurement systems followed rigid software rules to
              reorder identical part numbers, modern procurement platforms embed{" "}
              <Term>large language models</Term> that can read unstructured
              requests, vendor proposals, and compliance certificates.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Digital procurement frees human purchasing officers from routine
              paperwork so they can focus on strategic supplier negotiations and
              complex new-task projects.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Automated Sourcing and AI Roles in the Buying Center
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="automated-sourcing-and-ai-roles-in-the-buying-center"
        border
        exercise={exercise["automated-sourcing-and-ai-roles-in-the-buying-center"]}
      >
        <SlideHeading>
          Automated Sourcing and AI Roles in the Buying Center
        </SlideHeading>
        <Lead>
          As enterprises integrate large language models into their procurement
          software, AI agents take on distinct roles inside the organizational
          buying center depending on the buying situation.
        </Lead>
        <div className="mt-5 w-full">
          <Plate wide>
            <AiBuyingCenter />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              In a straight rebuy, an automated procurement agent monitors
              inventory levels and reorders standard maintenance and operating
              supplies automatically within pre-approved contract rules, acting
              directly as the <Term>buyer</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In supplier search and proposal screening, an AI agent that parses
              hundreds of vendor catalogs and passes only a compliant shortlist
              to human procurement officers acts as a <Term>gatekeeper</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When an AI agent compares complex technical specification sheets,
              calculates total cost of ownership across bids, and scores vendor
              reliability, it acts as an <Term>influencer</Term> shaping the
              buying center&apos;s evaluation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In high-risk modified rebuys and new-task purchases, human
              executives and committee members remain the final{" "}
              <Term>deciders</Term> because strategic, legal, and operational
              accountability rests with people.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Marketing to Both Procurement Agents and Human Decision Makers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="marketing-to-both-procurement-agents-and-human-decision-makers"
        border
        exercise={
          exercise[
            "marketing-to-both-procurement-agents-and-human-decision-makers"
          ]
        }
      >
        <SlideHeading>
          Marketing to Both Procurement Agents and Human Decision Makers
        </SlideHeading>
        <Statement>
          When organizational buyers use AI agents as gatekeepers and
          influencers, a B2B supplier can be{" "}
          <Tint>
            eliminated before a human account executive ever gets a meeting
          </Tint>
          .
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              To pass automated screening, B2B suppliers must publish{" "}
              <Term>machine-readable technical specifications</Term>,
              transparent volume pricing tiers, verified compliance
              certifications (such as ISO or SOC 2 standards), and on-time
              delivery metrics.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Vague corporate brochures or unindexed PDF catalogs that require a
              phone call to obtain basic compatibility facts risk being skipped
              by an AI sourcing agent under time or lookup constraints.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Once the supplier enters the shortlist, human salespeople and key
              account managers remain indispensable for building interpersonal
              trust, negotiating custom contract terms, and guiding complex
              organizational change.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Adapting B2B Sales Strategy for AI Procurement Gatekeepers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-adapting-b2b-sales-strategy-for-ai-procurement-gatekeepers"
        border
      >
        <SlideHeading kicker="Discussion:">
          Adapting B2B Sales Strategy for AI Procurement Gatekeepers
        </SlideHeading>
        <Prompt>
          A mid-sized industrial sensor manufacturer has historically relied on
          trade shows and personal relationships with factory floor engineers to
          win contracts, keeping its technical tolerances and volume pricing
          confidential until a sales representative visits the client. Now,
          major automotive clients use AI procurement agents to screen global
          supplier databases and generate a three-vendor shortlist before
          inviting bids. How must the manufacturer restructure its digital
          catalog, pricing transparency, and sales force workflow to survive
          automated gatekeeping while protecting its key account relationships?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Numbered n={1}>
            <P>
              B2B marketing encompasses commercial enterprises, institutions,
              and government bodies whose total transaction volume exceeds B2C
              retail volume because multiple industrial exchanges precede every
              finished consumer product.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Compared with consumer markets, business markets feature fewer and
              larger buyers, derived demand that originates in consumer demand,
              short-run price inelasticity, and fluctuating demand driven by the
              acceleration effect.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Business purchases divide into straight rebuys, modified rebuys,
              and new-task situations, with systems selling addressing complex
              turnkey requirements.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              The organizational buying center is a dynamic decision unit
              comprising five roles: users, influencers, buyers, deciders, and
              gatekeepers.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              New-task business buying progresses through eight procurement
              stages from problem recognition and value-analysis product
              specification to proposal solicitation, supplier selection, and
              performance review.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Relationship marketing and Key Account Management (KAM) shift B2B
              strategy from isolated transactions to long-term cross-functional
              partnerships that maximize organizational lifetime value.
            </P>
          </Numbered>
          <Numbered n={7}>
            <P>
              AI procurement agents now act as buyers in straight rebuys,
              gatekeepers in supplier screening, and influencers in bid
              comparison, requiring B2B suppliers to pair machine-readable
              technical and pricing disclosures with high-trust human key
              account management.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
