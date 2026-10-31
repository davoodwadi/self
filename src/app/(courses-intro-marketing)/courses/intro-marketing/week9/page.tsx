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
  AgenticCommerceChannel,
  ChannelLevelsDiagram,
  ConventionalVsVms,
  LogisticsFlows,
  NineVsSixTransactions,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 9: SUPPLY CHAIN AND DISTRIBUTION CHANNELS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week9() {
  return (
    <SlideDeck label="Week 9">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">Week 9</p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Supply Chain and Distribution Channels (The Third P)
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Marketing channels and supply chain networks bridge the gap
              between producers and final buyers, and autonomous{" "}
              <Tint>AI shopping agents</Tint> now act as a new digital
              intermediary that reshapes channel power and disintermediation.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Value Delivery Network and Marketing Channels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-value-delivery-network-and-marketing-channels"
        border
      >
        <SlideHeading>
          The Value Delivery Network and Marketing Channels
        </SlideHeading>
        <Lead>
          Few producers sell their goods directly to final users: instead, most
          work with a network of partners to bring their offerings to market.
        </Lead>
        <Statement className="mt-6">
          A <Term>value delivery network</Term> is composed of the company,
          suppliers, distributors, and, ultimately, customers who partner with
          each other to improve the performance of the entire system in
          delivering customer value.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Within that network, a <Term>marketing channel</Term> (or{" "}
              <Term>distribution channel</Term>) is a set of interdependent
              organizations that help make a product or service available for
              use or consumption by the consumer or business user.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              A company&apos;s <Term>channel decisions</Term> directly affect
              every other marketing decision, from pricing and sales force
              structure to brand positioning, and often involve long-term
              contractual commitments.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How Channel Intermediaries Add Value
          ================================================================ */}
      <Slide className={TIGHT} id="how-channel-intermediaries-add-value" border>
        <SlideHeading>How Channel Intermediaries Add Value</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P>
              Producers give up some control over how and to whom their products
              are sold when they use <Term>intermediaries</Term>, yet they rely
              on intermediaries because channel partners add efficiency and
              assortment value that a producer cannot easily match alone.
            </P>
            <Ruled>
              <P>
                Through their <Term>contacts</Term>, <Term>experience</Term>,{" "}
                <Term>specialization</Term>, and <Term>scale of operation</Term>,
                intermediaries usually offer the firm more than it can achieve
                on its own by reducing the number of channel transactions
                required between producers and consumers.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <NineVsSixTransactions />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Producers make <Term>narrow assortments</Term> of products in
              large quantities, whereas consumers want{" "}
              <Term>broad assortments</Term> of products in small quantities.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing channel members buy large quantities from many producers
              and break them down into the smaller quantities and broader
              assortments wanted by consumers, bridging the major{" "}
              <Term>time</Term>, <Term>place</Term>, and{" "}
              <Term>possession gaps</Term> that separate goods from those who
              use them.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Functions and Structure of Marketing Channels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-functions-and-structure-of-marketing-channels"
        border
      >
        <PartHead
          n={1}
          title="Functions and Structure of Marketing Channels"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Members of the marketing channel perform <Term>key functions</Term>{" "}
            that move goods from producers to consumers and determine the length
            and breadth of the <Term>channel structure</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Analyzing these functions clarifies that eliminating an
              intermediary does not eliminate the work that the intermediary
              performs.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Eight Key Functions Performed by Channel Members
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="eight-key-functions-performed-by-channel-members"
        border
        exercise={exercise["eight-key-functions-performed-by-channel-members"]}
      >
        <SlideHeading>
          Eight Key Functions Performed by Channel Members
        </SlideHeading>
        <Lead>
          Members of the marketing channel perform{" "}
          <Term>eight key functions</Term>: the first five help to complete
          transactions, and the last three help to fulfill the completed
          transactions.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Numbered n={1}>
            <P>
              The <Term>transaction-completing functions</Term> are{" "}
              <Term>information</Term> (gathering and distributing information
              about consumers, producers, and channel actors),{" "}
              <Term>promotion</Term> (developing and spreading persuasive
              communications about an offer), <Term>contact</Term> (finding and
              engaging prospective buyers), <Term>matching</Term> (shaping and
              fitting the offer to the buyer&apos;s needs, including grading,
              assembling, and packaging), and <Term>negotiation</Term> (reaching
              an agreement on price and other terms of the offer so that
              ownership or possession can be transferred).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The <Term>transaction-fulfilling functions</Term> are{" "}
              <Term>physical distribution</Term> (transporting and storing
              goods), <Term>financing</Term> (acquiring and using funds to cover
              the costs of the channel work), and <Term>risk taking</Term>{" "}
              (assuming the risks of carrying out the channel work).
            </P>
          </Numbered>
        </ol>
        <Ruled className="mt-8 w-full">
          <Big>
            In dividing up the work of the channel, the various functions should
            be assigned to the channel members who can add the most value for
            the cost.
          </Big>
        </Ruled>
      </Slide>

      {/* ================================================================
          Direct and Indirect Marketing Channel Levels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="direct-and-indirect-marketing-channel-levels"
        border
        exercise={exercise["direct-and-indirect-marketing-channel-levels"]}
      >
        <SlideHeading>
          Direct and Indirect Marketing Channel Levels
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              Each layer of marketing intermediaries that performs some work in
              bringing the product and its ownership closer to the final buyer
              is a <Term>channel level</Term>.
            </Statement>
            <Ruled>
              <P>
                Because both the producer and the final consumer perform some
                work, they are part of every channel, and the number of
                intermediary levels indicates the{" "}
                <Term>length of a channel</Term>.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ChannelLevelsDiagram />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              A <Term>direct marketing channel</Term> has no intermediary
              levels: the company sells directly to consumers, as when a bakery
              sells bread in its own shop or an apparel brand sells exclusively
              through its own website.
            </P>
          </Ruled>
          <Ruled>
            <P>
              An <Term>indirect marketing channel</Term> contains one or more
              intermediary levels, such as a manufacturer selling to a
              wholesaler who sells to a retailer who sells to the consumer,
              where more levels expand geographic reach but reduce the
              producer&apos;s direct control.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Channel Intensity: Intensive, Selective, and Exclusive Distribution
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="channel-intensity-intensive-selective-and-exclusive-distribution"
        border
      >
        <SlideHeading>
          Channel Intensity: Intensive, Selective, and Exclusive Distribution
        </SlideHeading>
        <Lead>
          Companies must also decide on the number of channel members to use at
          each level across three <Term>distribution strategies</Term>:
          intensive, exclusive, and selective distribution.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Intensive distribution</Term> stocks the product in as many
              outlets as possible so that convenience goods (such as toothpaste,
              soft drinks, and snacks) are available wherever and whenever
              consumers want them.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Exclusive distribution</Term> gives a limited number of
              dealers the exclusive right to distribute the company&apos;s
              products in their territories, often used for luxury automobiles
              or prestige apparel to enhance brand image and secure strong
              dealer support.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Selective distribution</Term> lies between intensive and
              exclusive distribution, using more than one, but fewer than all,
              of the intermediaries willing to carry the company&apos;s products
              (common for appliances, televisions, and fine furniture).
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 2: Channel Behavior, Organization, and Conflict
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-channel-behavior-organization-and-conflict"
        border
      >
        <PartHead
          n={2}
          title="Channel Behavior, Organization, and Conflict"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Marketing channels are not merely economic pipelines, but{" "}
            <Term>complex behavioral systems</Term> in which people and
            companies interact to accomplish individual, company, and channel
            goals.
          </Statement>
          <Ruled>
            <Lead>
              Managing <Term>channel conflict</Term> and designing vertical,
              horizontal, or multichannel systems allow channel partners to
              operate as a coordinated unit.
            </Lead>
          </Ruled>
        </div>
      </Slide>
      {/* ================================================================
          Channel Cooperation and Channel Conflict
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="channel-cooperation-and-channel-conflict"
        border
        exercise={exercise["channel-cooperation-and-channel-conflict"]}
      >
        <SlideHeading>Channel Cooperation and Channel Conflict</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Ideally, because the success of individual channel members depends
              on overall channel success, all channel firms should work together
              smoothly and accept their <Term>specialized roles</Term>.
            </Statement>
            <Ruled>
              <Lead>
                However, individual channel members rarely take such a broad
                view, and disagreements over goals, roles, and rewards generate{" "}
                <Term>channel conflict</Term>.
              </Lead>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                <Term>Horizontal conflict</Term> occurs among firms at the same
                level of the channel, such as two franchised car dealers of the
                same automaker in the same city complaining that the other
                prices too aggressively or poaches territory customers.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Vertical conflict</Term>, which is even more common,
                occurs between different levels of the same channel, such as
                when a footwear manufacturer opens a direct-to-consumer online
                store that undercuts the retail shoe chains carrying its brand.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Conventional Versus Vertical Marketing Systems (VMS)
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="conventional-versus-vertical-marketing-systems-vms"
        border
        exercise={exercise["conventional-versus-vertical-marketing-systems-vms"]}
      >
        <SlideHeading>
          Conventional Versus Vertical Marketing Systems (VMS)
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              A <Term>conventional distribution channel</Term> consists of one
              or more independent producers, wholesalers, and retailers, each a
              separate business seeking to maximize its own profits, even at the
              expense of profits for the system as a whole.
            </P>
          </Ruled>
          <Ruled>
            <P>
              By contrast, a <Term>Vertical Marketing System</Term> (VMS)
              consists of producers, wholesalers, and retailers acting as a
              unified system in which one channel member owns the others, has
              contracts with them, or wields so much power that they all
              cooperate.
            </P>
          </Ruled>
        </div>
        <div className="my-6 w-full max-w-4xl">
          <Plate wide>
            <ConventionalVsVms />
          </Plate>
        </div>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              A <Term>corporate VMS</Term> combines successive stages of
              production and distribution under single ownership (such as
              eyewear giant EssilorLuxottica designing frames, manufacturing
              lenses, and operating Sunglass Hut and LensCrafters stores).
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>contractual VMS</Term> consists of independent firms at
              different levels of production and distribution who join together
              through contracts (most notably franchise organizations), while an{" "}
              <Term>administered VMS</Term> coordinates successive stages
              through the size and power of one dominant party (such as Walmart
              or Procter &amp; Gamble).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Horizontal Systems, Multichannel Distribution, and Disintermediation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="horizontal-systems-multichannel-distribution-and-disintermediation"
        border
        exercise={
          exercise[
            "horizontal-systems-multichannel-distribution-and-disintermediation"
          ]
        }
      >
        <SlideHeading>
          Horizontal Systems, Multichannel Distribution, and Disintermediation
        </SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              A <Term>horizontal marketing system</Term> is a channel
              arrangement in which two or more companies at one level join
              together to follow a new marketing opportunity, such as a coffee
              chain operating kiosks inside a national bookstore or grocery
              chain.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>multichannel distribution system</Term> (or{" "}
              <Term>hybrid marketing channel</Term>) occurs when a single firm
              sets up two or more marketing channels to reach one or more
              customer segments, expanding market coverage while increasing the
              risk of channel conflict.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Disintermediation</Term> occurs when product and service
              producers cut out intermediaries and go directly to final buyers,
              or when radically new types of channel intermediaries displace
              traditional ones.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Online streaming displaced physical video rental stores, and
              digital travel portals displaced neighborhood ticket agencies,
              forcing incumbent channel members to innovate or exit.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Resolving Vertical Channel Conflict in a Direct-to-Consumer Launch
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-resolving-vertical-channel-conflict-in-a-direct-to-consumer-launch"
        border
      >
        <SlideHeading kicker="Discussion:">
          Resolving Vertical Channel Conflict in a Direct-to-Consumer Launch
        </SlideHeading>
        <Prompt>
          A mid-sized kitchen appliance manufacturer currently sells 85 percent
          of its blenders through three national department-store chains.
          Management wants to launch a direct-to-consumer website offering
          custom color options and a 10 percent starter discount to capture
          first-party customer data. Using vertical channel conflict,
          multichannel distribution systems, and pricing consistency, analyze
          how the retail chains are likely to react and design a channel
          strategy that avoids retail delisting.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Retailing and Wholesaling
          ================================================================ */}
      <Slide className={TIGHT} id="part-3-retailing-and-wholesaling" border>
        <PartHead n={3} title="Retailing and Wholesaling" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            The two primary <Term>resellers</Term> in consumer and industrial
            channels are <Term>retailers</Term> and <Term>wholesalers</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Understanding how retailers classify their store formats and how
              wholesalers create efficiency explains the downstream mechanics of
              product placement.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Retailing Classifications and Omnichannel Shopper Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="retailing-classifications-and-omnichannel-shopper-marketing"
        border
      >
        <SlideHeading>
          Retailing Classifications and Omnichannel Shopper Marketing
        </SlideHeading>
        <Statement>
          <Term>Retailing</Term> includes all the activities involved in selling
          goods or services directly to final consumers for their personal,
          nonbusiness use.
        </Statement>
        <Ruled className="mt-6 w-full">
          <P>
            Retail stores are classified along four dimensions: the{" "}
            <Term>amount of service</Term> they offer (self-service,
            limited-service, or full-service), the breadth and depth of their{" "}
            <Term>product lines</Term> (specialty stores, department stores,
            supermarkets, convenience stores, and superstores), the{" "}
            <Term>relative prices</Term> they charge (discount stores, off-price
            retailers, and factory outlets), and how they are{" "}
            <Term>organized</Term> (corporate chains, voluntary chains, and
            franchises).
          </P>
        </Ruled>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Shopper marketing</Term> focuses the entire marketing
              process, from product and brand development to logistics,
              promotion, and merchandising, toward turning shoppers into buyers
              as they approach the point of sale, whether in a physical aisle or
              on a digital screen.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because modern buyers move seamlessly across web, mobile, and
              physical stores, <Term>omni-channel retailing</Term> integrates all
              channels into a single unified shopping experience, such as buying
              online and picking up in store.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Retailer Marketing Decisions
          ================================================================ */}
      <Slide className={TIGHT} id="retailer-marketing-decisions" border>
        <SlideHeading>Retailer Marketing Decisions</SlideHeading>
        <Lead>
          Like manufacturers, retailers must make strategic decisions regarding{" "}
          <Term>segmentation and targeting</Term>, store differentiation and
          positioning, and the <Term>retail marketing mix</Term>.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              First, retailers must define their <Term>target markets</Term> and
              decide how they will position themselves in these markets: a
              retailer cannot make consistent decisions about product
              assortment, services, pricing, advertising, or store decor until
              it defines its target customers and position.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Second, retailers manage three major product variables:{" "}
              <Term>product assortment</Term> (differentiating the retailer
              while matching target shoppers&apos; expectations),{" "}
              <Term>services mix</Term> (home delivery, alterations, or personal
              shopping), and <Term>store atmosphere</Term> (the physical layout,
              lighting, scent, and sound that shape the customer&apos;s
              experience).
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Third, retailers align their <Term>price policy</Term>{" "}
              (high-markup lower-volume versus low-markup higher-volume),
              promotional tools, and <Term>location choices</Term> (central
              business districts, shopping centers, or strip malls) with that
              positioning.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          The Role and Types of Wholesalers
          ================================================================ */}
      <Slide className={TIGHT} id="the-role-and-types-of-wholesalers" border>
        <SlideHeading>The Role and Types of Wholesalers</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Wholesaling</Term> includes all the activities involved in
              selling goods and services to those buying for resale or business
              use.
            </Statement>
            <Ruled>
              <P>
                Wholesalers add value by performing channel functions more
                efficiently than a manufacturer can alone: they sell and promote
                to many small business customers, buy and build assortments,{" "}
                <Term>break bulk</Term> (breaking large carload lots into small
                crates), warehouse inventory, finance buyers and suppliers, bear
                risk by taking title, and provide market information.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                <Term>Merchant wholesalers</Term> are independently owned
                businesses that take title to the merchandise they handle,
                operating as either <Term>full-service wholesalers</Term> or{" "}
                <Term>limited-service wholesalers</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Brokers and agents</Term> do not take title to goods and
                earn a commission for bringing buyers and sellers together,
                while manufacturers&apos; and retailers&apos; branches and
                offices conduct wholesaling operations directly without
                independent wholesalers.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Marketing Logistics and Supply Chain Management
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-marketing-logistics-and-supply-chain-management"
        border
      >
        <PartHead
          n={4}
          title="Marketing Logistics and Supply Chain Management"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Even the best channel strategy fails if physical products do not
            arrive intact, on time, and at an acceptable cost.
          </Statement>
          <Ruled>
            <Lead>
              <Term>Marketing logistics</Term> and{" "}
              <Term>supply chain management</Term> coordinate the physical flow
              of materials, final goods, and information from point of origin to
              point of consumption.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Objectives and Direction of Marketing Logistics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="objectives-and-direction-of-marketing-logistics"
        border
      >
        <SlideHeading>
          Objectives and Direction of Marketing Logistics
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P>
              <Term>Marketing logistics</Term> (also called{" "}
              <Term>physical distribution</Term>) involves planning,
              implementing, and controlling the physical flow of materials,
              final goods, and related information from points of origin to
              points of consumption to meet customer requirements at a profit.
            </P>
            <Ruled>
              <P>
                <Term>Outbound logistics</Term> moves products from the factory
                to resellers and ultimately to customers, while{" "}
                <Term>inbound logistics</Term> moves products and materials from
                suppliers to the factory.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <LogisticsFlows />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Reverse logistics</Term> reuses, recycles, refurbishes, or
              disposes of broken, unwanted, or excess products returned by
              consumers or resellers.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              The goal of marketing logistics is to provide a{" "}
              <Term>targeted level</Term> of customer service at the{" "}
              <Term>least total system cost</Term>, rather than minimizing the
              cost of any single logistics function in isolation.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Major Logistics Functions: Warehousing, Inventory, and Transportation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="major-logistics-functions-warehousing-inventory-and-transportation"
        border
        exercise={
          exercise[
            "major-logistics-functions-warehousing-inventory-and-transportation"
          ]
        }
      >
        <SlideHeading>
          Major Logistics Functions: Warehousing, Inventory, and Transportation
        </SlideHeading>
        <Lead>
          Given a set of logistics objectives, the company designs a logistics
          system that minimizes the cost of attaining these objectives across
          four major functions: <Term>warehousing</Term>,{" "}
          <Term>inventory management</Term>, <Term>transportation</Term>, and{" "}
          <Term>logistics information management</Term>.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Warehousing</Term> bridges the gap between production cycles
              and consumption cycles using either{" "}
              <Term>storage warehouses</Term> (which store goods for moderate to
              long periods) or <Term>automated distribution centers</Term>{" "}
              (which are designed to move goods rapidly rather than just store
              them).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Inventory management</Term> balances the risk of
              out-of-stock customer dissatisfaction against the high carrying
              costs and obsolescence risks of holding excessive stock, often
              using <Term>just-in-time</Term> (JIT) logistics systems.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Transportation choices</Term> across trucks, railroads,
              water carriers, pipelines, air freight, and the internet (for
              digital products) directly affect product pricing, delivery speed,
              and the condition of goods on arrival, often combining modes
              through <Term>intermodal transportation</Term>.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Integrated Supply Chain Management and Third-Party Logistics (3PL)
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="integrated-supply-chain-management-and-third-party-logistics-3pl"
        border
      >
        <SlideHeading>
          Integrated Supply Chain Management and Third-Party Logistics (3PL)
        </SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Integrated logistics management</Term> recognizes that
              providing better customer service and trimming distribution costs
              require teamwork, both inside the company (through
              cross-functional logistics committees) and among all the marketing
              channel organizations.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Channel members link their logistics operations through shared{" "}
              <Term>electronic data interchange</Term> (EDI),{" "}
              <Term>vendor-managed inventory</Term> (VMI), and continuous
              inventory replenishment systems.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Most companies also outsource some or all of their logistics
              functions to <Term>third-party logistics</Term> (3PL) providers
              (such as UPS Supply Chain Solutions, DHL, or Ryder).
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Third-party logistics providers bring specialized distribution
              expertise, multi-client <Term>scale economies</Term>, and global
              customs knowledge, freeing the manufacturer to focus on its core
              product and marketing strengths.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Agentic Commerce: The AI Agent as a Channel Intermediary
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-agentic-commerce-the-ai-agent-as-a-channel-intermediary"
        border
      >
        <PartHead
          n={5}
          title="Agentic Commerce: The AI Agent as a Channel Intermediary"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Digital commerce is undergoing a new wave of{" "}
            <Term>disintermediation</Term> and <Term>re-intermediation</Term> as
            consumers delegate product search, comparison, and purchasing to{" "}
            <Term>AI shopping agents</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Viewing the AI agent through the lens of marketing channel theory
              reveals which channel functions it performs and how it shifts{" "}
              <Term>channel power</Term>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The AI Shopping Agent as a New Channel Intermediary
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-ai-shopping-agent-as-a-new-channel-intermediary"
        border
        exercise={
          exercise["the-ai-shopping-agent-as-a-new-channel-intermediary"]
        }
      >
        <SlideHeading>
          The AI Shopping Agent as a New Channel Intermediary
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              <Term>Agentic commerce</Term> is buying and selling in which an
              autonomous <Term>AI agent</Term> searches, compares, and purchases
              goods or services on a buyer&apos;s behalf.
            </Statement>
            <Ruled>
              <P>
                Evaluated against the eight classic channel functions, the AI
                shopping agent performs four core transaction-completing
                functions directly: <Term>information</Term> (gathering product
                specs, prices, and reviews across the market),{" "}
                <Term>contact</Term> (interfacing with seller APIs and
                catalogs), <Term>matching</Term> (filtering and ranking
                assortments to fit the consumer&apos;s stated constraints), and{" "}
                <Term>negotiation</Term> or checkout execution.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <AgenticCommerceChannel />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Because the AI agent inserts a new{" "}
              <Term>software intermediary layer</Term> that can bypass
              traditional retail storefronts or comparison sites, agentic
              commerce is a contemporary form of channel disintermediation and
              re-intermediation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, the AI agent does not take{" "}
              <Term>physical possession</Term> or title, so physical
              distribution, warehousing, and reverse logistics still depend on
              underlying fulfillment networks.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Position Effects and Channel Strategy in Agentic Commerce
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="position-effects-and-channel-strategy-in-agentic-commerce"
        border
      >
        <SlideHeading>
          Position Effects and Channel Strategy in Agentic Commerce
        </SlideHeading>
        <Lead>
          When an <Term>AI shopping agent</Term> acts as the intermediary
          between the buyer and the market, the agent&apos;s ranking and
          selection behavior determines which producers make the sale.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Empirical audits and experiments on AI shopping agents show that
              agents exhibit strong <Term>position effects</Term>: an
              option&apos;s physical rank position in a search results list
              significantly influences whether the AI agent selects it, even
              when objective product attributes are held constant (Wadi &amp;
              Ma, 2026a).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Furthermore, large technology platforms that host consumer AI
              assistants can gain substantial channel power as{" "}
              <Term>administered gatekeepers</Term> if their agents control
              which sellers are queried first.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Producers and retailers must therefore decide whether to
              distribute through platform-owned AI shopping ecosystems, deploy
              their own brand-specific shopping assistants, or expose
              standardized <Term>machine-readable catalog feeds</Term> and{" "}
              <Term>checkout APIs</Term> so any independent AI agent can
              transact with them directly.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing a Channel Strategy for Agentic Commerce
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-channel-strategy-for-agentic-commerce"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Channel Strategy for Agentic Commerce
        </SlideHeading>
        <Prompt>
          A specialty luggage brand currently sells 60 percent of its suitcases
          through an online marketplace aggregator and 40 percent through its
          own direct-to-consumer website. As consumers increasingly ask AI
          shopping agents to &quot;buy a carry-on suitcase with a lifetime
          warranty under 250 dollars,&quot; how does the AI agent alter the
          channel power between the brand and the marketplace aggregator, how do
          list position effects (Wadi &amp; Ma, 2026a) affect the brand&apos;s
          visibility, and what technical and channel steps should the brand take
          so AI agents can buy from its direct store?
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
              Marketing channels are sets of interdependent organizations within
              a broader value delivery network that bridge time, place, and
              possession gaps by reducing transaction complexity and matching
              assortments to buyer needs.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Channel members perform eight functions (information, promotion,
              contact, matching, negotiation, physical distribution, financing,
              and risk taking) across direct (zero-level) and indirect (one- or
              multi-level) channels using intensive, selective, or exclusive
              distribution.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Channel conflict divides into horizontal conflict (at the same
              level) and vertical conflict (across levels), while Vertical
              Marketing Systems (corporate, contractual, and administered VMS),
              horizontal systems, and multichannel networks coordinate channel
              behavior.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Retailers are classified by service level, product line breadth
              and depth, relative price, and organizational form, while merchant
              wholesalers, brokers, and agents create upstream efficiency
              through bulk-breaking, assortment building, and inventory holding.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Marketing logistics coordinates inbound, outbound, and reverse
              flows across warehousing, inventory management, transportation,
              and logistics information, frequently leveraging third-party
              logistics (3PL) partners.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              In agentic commerce, the AI shopping agent acts as a new digital
              intermediary that performs information, contact, matching, and
              checkout functions, exhibits list position effects when evaluating
              ranked results (Wadi &amp; Ma, 2026a), and requires producers to
              make their catalogs and checkout systems accessible to automated
              agents.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
