"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { AtomsVsBoxes, PickupAccuracy, RegionalNodes, LastMileRoute, FreeShipThreshold, ReturnRates, ReturnLeniency, ReverseCost, SupportTriage, AgentDeliveryCheck } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";
const SPLIT = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12";
const TWO = "grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10";

export default function Week10Page() {
  return (
    <SlideDeck label="Week 10">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 10: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">Omnichannel Retailing, Fulfillment, and Reverse Logistics</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          A digital order is only a promise until physical fulfillment, last-mile delivery, and reverse logistics complete the customer experience.
        </p>
      </Slide>

      <Slide id="where-digital-atoms-meet-physical-boxes" border className="!py-8">
        <SlideHeading>Where Digital Atoms Meet Physical Boxes</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>In pure digital services (such as streaming video or cloud software), fulfilling an order requires only provisioning a database credential at near-zero marginal cost.</P></Ruled>
            <Ruled><P>In physical e-commerce, clicking the checkout button initiates an expensive chain of warehouse picking, protective packing, parcel carrier sorting, last-mile van delivery, and potential return processing.</P></Ruled>
            <Ruled><P>Logistics and fulfillment are not merely back-office cost centers. Delivery speed, shipping fees, and return convenience sit directly on the Product Detail Page and heavily drive upfront conversion rates.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><AtomsVsBoxes /></Plate>
            <Ruled><P>Conversely, promising fast, free delivery and unconditional free returns without the underlying inventory and warehouse economics can bankrupt a high-growth e-commerce brand.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Omnichannel Retailing and Information Systems Integration" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}><Term>Multichannel retailing</Term> occurs when a company operates a website and physical stores as separate silos with separate inventory pools, separate accounting ledgers, and non-transferable returns.</p></Ruled>
          <Ruled><p className={BIG}><Term>Omnichannel retailing</Term> unifies digital and physical touchpoints around a single view of inventory and a single view of the customer.</p></Ruled>
        </div>
      </Slide>

      <Slide id="bopis-ship-from-store-and-real-time-inventory-visibility" border className="!py-8" exercise={exercise["bopis-ship-from-store-and-real-time-inventory-visibility"]}>
        <SlideHeading>BOPIS, Ship-from-Store, and Real-Time Inventory Visibility</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Buy-Online-Pick-Up-in-Store (BOPIS)</Term>, including curbside pickup, allows a shopper to lock in stock and pay online while picking up the item at a local store within hours, eliminating last-mile parcel shipping fees for the retailer and generating incremental in-store impulse purchases when the customer walks inside.</P></Ruled>
            <Ruled><P><Term>Ship-from-Store (SFS)</Term> turns physical retail locations into micro-fulfillment nodes, allowing the Order Management System (OMS) to fulfill an online order from a store five miles away from the buyer rather than a central warehouse two thousand miles away.</P></Ruled>
            <Ruled><P><Term>Endless-aisle kiosks</Term> inside physical stores allow sales associates to order out-of-stock sizes or colors from the central warehouse for direct home delivery before the shopper walks out empty-handed.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><PickupAccuracy /></Plate>
            <Ruled><P>Every omnichannel fulfillment model depends on <Term>real-time inventory accuracy</Term> across the OMS and Point-of-Sale (POS) systems. If store inventory records lag or ignore theft and shelf misplacement, a store will accept a BOPIS order for an item that is not actually on the shelf, causing a high-friction cancellation.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="showrooming-webrooming-and-channel-incentive-alignment" border className="!py-8" exercise={exercise["showrooming-webrooming-and-channel-incentive-alignment"]}>
        <SlideHeading>Showrooming, Webrooming, and Channel Incentive Alignment</SlideHeading>
        <ol className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2 [&_p]:!text-[1.2rem]">
          <li className="min-w-0"><Numbered n={1}><Ruled><P><Term>Showrooming</Term> occurs when a shopper visits a physical retail store to inspect, touch, or try on a product in person, and then pulls out a smartphone to buy the exact item at a lower price from an online-only competitor.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={2}><Ruled><P><Term>Webrooming</Term> (or reverse showrooming) occurs when a shopper researches specifications, reads online reviews, and checks local store stock online before visiting the physical store to complete the purchase immediately and avoid shipping delays.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={3}><Ruled><P>Traditional retail commission rules often sabotage omnichannel integration, because store managers resist fulfilling ship-from-store orders or accepting online returns if online orders count only toward the e-commerce department&apos;s revenue while online returns are deducted from the physical store&apos;s daily sales.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={4}><Ruled><P>Omnichannel retailers <Term>align incentives</Term> by crediting physical stores for digital sales fulfilled, initiated, or influenced within their geographic zip-code catchment area.</P></Ruled></Numbered></li>
        </ol>
      </Slide>

      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="E-Commerce Fulfillment and Last-Mile Economics" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Traditional retail logistics shipped uniform pallets of cases on full tractor-trailers from a factory distribution center to fifty retail loading docks once a week.</p></Ruled>
          <Ruled><p className={BIG}>E-commerce fulfillment must pick <Term>individual units (&quot;eaches&quot;)</Term>, pack millions of custom single-item boxes, and deliver them to millions of individual residential doorsteps.</p></Ruled>
        </div>
      </Slide>

      <Slide id="warehouse-automation-zone-skipping-and-the-last-mile-bottleneck" border className="!py-6" exercise={exercise["warehouse-automation-zone-skipping-and-the-last-mile-bottleneck"]}>
        <SlideHeading className="!mb-5">Warehouse Automation, Zone Skipping, and the Last-Mile Bottleneck</SlideHeading>
        <div className={TWO}>
          <div className="grid content-start gap-3">
            <Ruled><P>Inside an e-commerce <Term>fulfillment center (FC)</Term>, labor and walking time dominate unit handling costs, driving the adoption of goods-to-person autonomous mobile robots, automated storage and retrieval systems, and algorithmic slotting that places frequently co-ordered items in adjacent bins.</P></Ruled>
            <Ruled><P>Splitting inventory across multiple <Term>regional fulfillment nodes</Term> places stock closer to population centers, reducing transit zones and enabling one- or two-day ground delivery without expensive air freight.</P></Ruled>
            <Plate><RegionalNodes /></Plate>
          </div>
          <div className="grid content-start gap-3">
            <Ruled><P>The <Term>&quot;last mile&quot;</Term> (the final leg from the local parcel sorting depot to the customer&apos;s front door) typically accounts for more than 50 percent of total shipping cost because residential stops have low drop density, traffic delays, and failed first-attempt deliveries.</P></Ruled>
            <Plate><LastMileRoute /></Plate>
            <Ruled><P><Term>Third-Party Logistics (3PL)</Term> providers and marketplace fulfillment networks (such as Fulfillment by Amazon or Shopify Fulfillment Network) allow smaller brands to rent distributed warehouse scale and negotiated carrier rates without building their own warehouses.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="designing-shipping-fee-structures-on-the-storefront" border className="!py-8">
        <SlideHeading>Designing Shipping Fee Structures on the Storefront</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Unconditional free shipping</Term> on every order maximizes conversion rate, but destroys contribution margin on low-priced single items where the parcel carrier fee exceeds the product&apos;s gross profit.</P></Ruled>
            <Ruled><P><Term>Flat-rate or tiered shipping</Term> passes part of the carrier cost to the buyer, but creates cart abandonment when small baskets face high proportional fees.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><FreeShipThreshold /></Plate>
            <Ruled><P><Term>Contingent free-shipping thresholds</Term> (e.g., &quot;Free shipping on orders over $75&quot;) set roughly 15 to 25 percent above the store&apos;s baseline Average Order Value simultaneously protect shipping margin and induce shoppers to add an extra unit to their cart.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Reverse Logistics and the E-Commerce Returns Problem" />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-5">
            <Ruled><P>In physical brick-and-mortar retail, roughly 8 to 10 percent of purchased items are returned to the store.</P></Ruled>
            <Ruled><P>In e-commerce, average return rates reach 18 to 25 percent across categories, and frequently exceed 30 to 40 percent in fashion apparel and footwear.</P></Ruled>
            <Ruled><P>Managing <Term>reverse logistics</Term> is therefore a first-order determinant of whether an online retailer is profitable.</P></Ruled>
          </div>
          <Plate><ReturnRates /></Plate>
        </div>
      </Slide>

      <Slide id="return-policy-leniency-bracketing-and-reverse-logistics-costs" border className="!py-6" exercise={exercise["return-policy-leniency-bracketing-and-reverse-logistics-costs"]}>
        <SlideHeading className="!mb-5">Return Policy Leniency, Bracketing, and Reverse Logistics Costs</SlideHeading>
        <div className={TWO}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Return policy leniency</Term> operates on two fronts, namely reducing upfront purchase risk (increasing gross conversion and initial orders) while simultaneously increasing moral hazard and return volume (increasing reverse shipping, inspection, and liquidation costs).</P></Ruled>
            <Plate><ReturnLeniency /></Plate>
            <Ruled><P><Term>Bracketing</Term> occurs when an uncertain online shopper intentionally orders three sizes or colors of the same garment with the premeditated plan to keep one and return the other two for free.</P></Ruled>
          </div>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Wardrobing</Term> (or opportunistic renting) occurs when a buyer purchases a special-occasion garment, camera, or tool, uses it once with the tags hidden, and returns it for a full refund.</P></Ruled>
            <Ruled><P>Unlike forward logistics, which moves standardized new boxes out of a warehouse in bulk, reverse logistics requires receiving individual customer parcels, opening and inspecting each item by hand, grading its condition, steam-cleaning or repackaging it, and writing off items that can no longer be sold as new.</P></Ruled>
            <Plate><ReverseCost /></Plate>
            <Ruled><P>When return shipping, labor inspection, and inventory depreciation are combined, processing a single e-commerce return often costs the merchant 20 to 65 percent of the item&apos;s original retail price.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="curbing-preventable-returns-and-orchestrating-recommerce" border className="!py-8">
        <SlideHeading>Curbing Preventable Returns and Orchestrating Recommerce</SlideHeading>
        <ol className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2 [&_p]:!text-[1.2rem]">
          <li className="min-w-0"><Numbered n={1}><Ruled><P>The most profitable way to cut returns is <Term>before the order is placed</Term>, by providing accurate garment measurements, customer fit-feedback widgets (&quot;Runs small, size up&quot;), virtual try-on tools, and honest high-resolution imagery.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={2}><Ruled><P>At the point of return initiation, digitized <Term>return portals</Term> encourage instant size exchanges or bonus store credit (e.g., &quot;Get 110% value if you exchange for another item today&quot;) rather than a cash refund.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={3}><Ruled><P>Many retailers now <Term>segment return privileges</Term> using CRM history, offering free doorstep returns to profitable loyal customers while charging a modest return-label fee for serial bracketed returners or keeping-the-item refunds (&quot;returnless refunds&quot;) when an inexpensive item costs more to ship back than its salvage value.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={4}><Ruled><P>Open-box, refurbished, and <Term>recommerce storefronts</Term> create a dedicated secondary channel to recover margin on returned goods without diluting the primary new-product channel.</P></Ruled></Numbered></li>
        </ol>
      </Slide>

      <Slide id="discussion-solving-the-38-percent-apparel-return-rate" border className="!py-8">
        <SlideHeading>Discussion: Solving the 38 Percent Apparel Return Rate</SlideHeading>
        <Discussion
          scenario={"An online contemporary apparel brand offers free shipping and free 60-day returns on all orders. While gross revenue grew 50 percent this year, net profit turned negative because 38 percent of all shipped units are returned, and 30 percent of returned garments arrive wrinkled or out of season and must be liquidated below cost."}
          question={"Diagnose the behavioral and operational drivers of this return crisis, and design a combination of storefront PDP improvements, return-portal incentives, and policy segmentation to restore profitability without crashing conversion."}
        />
      </Slide>

      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Post-Purchase Experience and Proactive Customer Care" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>The time between clicking &quot;Place Order&quot; and opening the delivered box is a period of <Term>heightened buyer anxiety</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Withholding shipment updates during transit generates &quot;Where Is My Order?&quot; (WISMO) support tickets that overwhelm customer service teams and erode repeat purchase intent.</p></Ruled>
        </div>
      </Slide>

      <Slide id="order-tracking-delivery-transparency-and-ai-customer-service-triage" border className="!py-8" exercise={exercise["order-tracking-delivery-transparency-and-ai-customer-service-triage"]}>
        <SlideHeading>Order Tracking, Delivery Transparency, and AI Customer Service Triage</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Branded <Term>order-tracking pages</Term> and proactive event notifications (order confirmed, shipped, out for delivery, and delivered, plus immediate alerts if a weather delay occurs) reduce WISMO inquiries and turn tracking check-ins into high-engagement brand impressions.</P></Ruled>
            <Ruled><P>In customer support operations, <Term>conversational AI agents</Term> integrated directly with the Order Management System (OMS) and Return Management System (RMS) can resolve routine transactional requests (checking tracking status, updating a delivery address before dispatch, or generating a return QR code) autonomously in seconds.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><SupportTriage /></Plate>
            <Ruled><P>Effective support architecture uses <Term>confidence-based human-in-the-loop escalation</Term>, routing complex, emotional, or high-lifetime-value customer issues (such as a damaged wedding gift or a lost high-value parcel) immediately to an empowered human representative with the full conversation transcript attached.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Fulfillment and Logistics in Agent-Mediated Commerce" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>When an autonomous AI shopping agent compares offers across competing merchants, delivery speed, shipping fees, and return terms become <Term>hard mathematical constraints</Term> rather than fine print buried in a footer.</p></Ruled>
          <Ruled><p className={BIG}>Machine-readable logistics metadata therefore directly determines whether a merchant wins or loses agentic orders.</p></Ruled>
        </div>
      </Slide>

      <Slide id="machine-readable-delivery-promises-and-post-purchase-agent-protocols" border className="!py-8">
        <SlideHeading>Machine-Readable Delivery Promises and Post-Purchase Agent Protocols</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>A human shopper might tolerate a vague banner reading &quot;Fast Standard Shipping (Usually 3 to 7 Business Days),&quot; whereas an AI agent instructed to &quot;Order a birthday gift that arrives in Toronto by Friday&quot; requires a deterministic, guaranteed delivery-by date exposed in structured offer markup (<code className="rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]">shippingDetails</code> and <code className="rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]">hasMerchantReturnPolicy</code> in Schema.org).</P></Ruled>
            <Ruled><P>Merchants that expose real-time zip-code delivery cutoffs, exact shipping costs, and structured return-window schemas via API or JSON-LD allow AI shopping agents to verify feasibility without failing the constraint check.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><AgentDeliveryCheck /></Plate>
            <Ruled><P>Post-purchase, machine-readable <Term>order status webhooks</Term> and standardized tracking schemas allow the consumer&apos;s personal AI assistant to monitor parcel arrivals, verify that refunds settled, and initiate authorized exchanges on the buyer&apos;s behalf.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-when-the-ai-agent-cancels-the-order-over-shipping-ambiguity" border className="!py-8">
        <SlideHeading>Discussion: When the AI Agent Cancels the Order Over Shipping Ambiguity</SlideHeading>
        <Discussion
          scenario={"During the December holiday rush, a specialty toy retailer has inventory in stock and can deliver within two days to local metro areas, but its product pages list only a generic \"Standard Ground Shipping\" note without a machine-readable delivery date estimate until the final checkout screen. Competing marketplace listings expose exact \"Arrives before December 24\" timestamps in their structured product metadata."}
          question={"Explain how both human last-minute shoppers and autonomous AI shopping agents will react to this information gap, and how connecting the OMS to the storefront's structured data layer fixes it."}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Physical e-commerce profitability depends on integrating front-end marketing promises with back-end warehouse fulfillment, last-mile carrier networks, and reverse logistics.",
            "Omnichannel retailing unifies digital and physical channels through BOPIS, ship-from-store, and endless-aisle inventory, requiring real-time OMS accuracy and aligned store incentives to turn showrooming and webrooming into an advantage.",
            "Last-mile residential delivery accounts for over half of shipping costs, leading merchants to pair regional inventory distribution or 3PL networks with carefully calibrated free-shipping basket thresholds.",
            "E-commerce return rates (often 20 to 40 percent) and behaviors like bracketing impose severe reverse-logistics handling and depreciation costs, which firms manage through better pre-purchase sizing data, exchange-first return portals, and recommerce channels.",
            "Proactive shipment tracking and OMS-integrated AI customer service agents reduce post-purchase anxiety and WISMO support costs while escalating complex cases to humans.",
            "In agentic commerce, exposing exact delivery dates, shipping fees, and return rules in structured machine-readable schemas is essential to pass an AI shopping agent's hard constraint filters.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
