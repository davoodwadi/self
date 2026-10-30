"use client";

import React from "react";
import { SlideDeck, Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  BODY,
  COL_RULE,
  DISPLAY,
  Discussion1,
  Head1,
  LEAD,
  MICRO,
  PAIR,
  PartPlate1,
  RULED,
  Verdict,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  BullwhipLab,
  CensoredDemand,
  CouplingLab,
  CvInspection,
  DemandSensing,
  GoodsToPerson,
  MaintenanceTimelines,
  MultiTierGraph,
  NewsvendorLab,
  PredictOptimize,
  QuantileFan,
  SensorFusion,
  ThreeWayMatch,
  VrpRoutes,
} from "./visuals";

// ============================================================================
// WEEK 6: AI IN OPERATIONS AND SUPPLY CHAIN
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const STACK = "space-y-4";
const SUB = `${BODY} border-t border-[var(--ink)]/10 pt-4`;
const GRID3 = "mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10";
const GRID2 = "mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14";
const SIDE = "mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12";

/** A cost symbol from content.md, C with its subscript. */
const Cs = ({ s }: { s: string }) => (
  <span className="whitespace-nowrap italic">
    C<sub className="not-italic">{s}</sub>
  </span>
);

export default function Week6Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 6</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            AI in Operations and Supply Chain
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Artificial intelligence improves operational efficiency by coupling probabilistic forecasts and
            sensor diagnostics with mathematical optimization and human-governed execution.
          </p>
        </div>
      </Slide>

      {/* Physical Operations Under Uncertainty */}
      <Slide id="physical-operations" border align="left">
        <Head1>Physical Operations Under Uncertainty</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Operations and supply chain management govern how firms source raw materials, manufacture goods,
          position inventory, and deliver finished products to customers.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Unlike digital advertising or web personalization, physical operations require committing
              factory capacity and inventory weeks or months before actual consumer demand is known.
            </p>
            <p className={BODY}>
              Operational mistakes carry <span className={T}>high physical inertia</span>: excess seasonal
              inventory ties up working capital in warehouses, while an unscheduled machine breakdown halts
              downstream assembly lines.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Supply networks also span multiple independent companies across continents, exposing everyday
            execution to weather disruptions, port congestion, and supplier delays.
          </p>
        </div>
        <Verdict>
          Artificial intelligence creates operational value by reducing uncertainty in demand, lead times,
          and equipment health{" "}
          <span className="text-[var(--accent)]">before irreversible physical commitments are made</span>.
        </Verdict>
      </Slide>

      {/* Coupling Machine Learning Prediction with Mathematical Optimization */}
      <Slide id="predict-optimize" border align="left" exercise={exercise["predict-optimize"]}>
        <Head1>Coupling Machine Learning Prediction with Mathematical Optimization</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Operational decision systems typically combine two distinct analytical disciplines: machine
          learning for prediction and mathematical optimization for prescription.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <PredictOptimize />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Machine learning</span> models estimate uncertain quantities from data, such
            as next week&apos;s store demand, a supplier&apos;s delivery transit time, or a turbine&apos;s
            failure probability.
          </p>
          <p className={BODY}>
            <span className={T}>Mathematical optimization</span> takes those predictions as inputs and
            computes the specific order quantities, production schedules, or truck routes that minimize cost
            or maximize service.
          </p>
          <p className={BODY}>
            Optimization solvers explicitly enforce hard physical constraints that neural networks cannot
            guarantee on their own, such as truck weight limits, warehouse shelf capacity, and shift labor
            rules.
          </p>
        </div>
        <p className={`${LEAD} mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Confusing prediction with optimization leads to flawed system design: an accurate demand forecast
          generates <span className="text-[var(--accent)]">zero savings</span> unless paired with a
          replenishment policy that acts on it.
        </p>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="Multi-Horizon Demand Forecasting and the Bullwhip Effect"
        lines={[
          "Every supply chain action, from raw-material purchasing to store shelf replenishment, begins with an estimate of future customer demand.",
          "Modern machine learning replaces isolated single-product extrapolations with probabilistic, multi-horizon forecasts that incorporate external market signals and dampen upstream order volatility.",
        ]}
      />

      {/* Point Forecasts Versus Probabilistic Quantile Forecasts */}
      <Slide id="quantile-forecasts" border align="left" exercise={exercise["quantile-forecasts"]}>
        <Head1>Point Forecasts Versus Probabilistic Quantile Forecasts</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            A <span className={T}>point forecast</span> outputs a single number representing the expected
            average demand for a product in a future time period.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Planning operations from a point forecast alone is perilous because two products with the same
            average demand of 100 units per week can have vastly different volatility.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <QuantileFan />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            A <span className={T}>probabilistic forecast</span> estimates the full probability distribution
            or specific quantiles of future demand, such as the 10th, 50th, and 90th percentiles.
          </p>
          <p className={BODY}>
            If the 90th percentile of weekly demand is 145 units, holding{" "}
            <span className="text-[var(--accent)]">145 units</span> in stock covers demand in 90 percent of
            weeks and leaves only a 10 percent stockout risk.
          </p>
          <p className={BODY}>
            <span className={T}>Multi-horizon forecasting</span> models generate probabilistic estimates
            across multiple time windows simultaneously, aligning daily store replenishment with quarterly
            manufacturing capacity plans.
          </p>
        </div>
      </Slide>

      {/* Demand Sensing and External Covariates */}
      <Slide id="demand-sensing" border align="left">
        <Head1>Demand Sensing and External Covariates</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Traditional statistical forecasting methods estimate future sales of a Stock Keeping Unit (SKU)
            using only that single item&apos;s historical sales series.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Single-series models react slowly to sudden market changes and cannot forecast newly launched
            products that lack sales history.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <DemandSensing />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Demand sensing</span> uses global machine learning models trained
            simultaneously across tens of thousands of SKUs alongside external covariates.
          </p>
          <p className={BODY}>
            <span className={T}>External covariates</span> include planned price promotions, local weather
            forecasts, holiday calendar shifts, web search trends, and in-store foot traffic.
          </p>
          <p className={BODY}>
            By learning shared patterns across product attributes, a global model can forecast demand for a{" "}
            <span className="text-[var(--accent)]">new winter jacket</span> from the historical behavior of
            similar jackets during cold snaps.
          </p>
        </div>
      </Slide>

      {/* The Bullwhip Effect and Information Sharing */}
      <Slide id="bullwhip" border align="left">
        <Head1>The Bullwhip Effect and Information Sharing</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            The <span className={T}>bullwhip effect</span> is the phenomenon in which small fluctuations in
            final consumer demand trigger progressively larger swings in order quantities at each upstream
            stage of a supply chain.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            While retail consumers may buy diaper packs or packaged foods at a steady weekly rate, the
            raw-material supplier four tiers upstream often experiences boom-and-bust order waves.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <BullwhipLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            This amplification occurs because each supply chain tier updates its own demand forecast solely
            from the orders placed by its immediate downstream customer, batches orders to save freight
            costs, and over-orders during perceived shortages.
          </p>
          <p className={BODY}>
            When an upstream manufacturer mistakes a temporary retail promotion or panic order for a
            permanent demand shift, it overbuilds inventory that must later be liquidated.
          </p>
          <p className={BODY}>
            Sharing real-time{" "}
            <span className="text-[var(--accent)]">point-of-sale data</span> across supply chain partners
            and driving replenishment from a unified downstream demand forecast significantly dampens the
            bullwhip effect.
          </p>
        </div>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Inventory Optimization and Warehouse Robotics"
        lines={[
          "Holding inventory buffers an organization against uncertain demand and unreliable supplier delivery times, but ties up capital and incurs storage, obsolescence, and spoilage costs.",
          "Machine learning and robotics improve how firms set safety stock targets across distribution networks and how physical orders are picked and packed inside fulfillment centers.",
        ]}
      />

      {/* Asymmetric Inventory Costs and the Newsvendor Trade-Off */}
      <Slide id="newsvendor" border align="left" exercise={exercise["newsvendor"]}>
        <Head1>Asymmetric Inventory Costs and the Newsvendor Trade-Off</Head1>
        <div className={SIDE}>
          <div className={STACK}>
            <p className={BODY}>
              Every inventory replenishment decision balances two asymmetric errors: ordering too much
              (overage) versus ordering too little (underage).
            </p>
            <p className={BODY}>
              The <span className={T}>overage cost</span> (<Cs s="o" />) is the financial loss of ordering
              one unit that remains unsold, including storage cost, spoilage, or clearance markdowns.
            </p>
            <p className={BODY}>
              The <span className={T}>underage cost</span> (<Cs s="u" />) is the financial loss of falling
              one unit short of customer demand, including lost profit margin and the risk that the
              disappointed shopper switches to a competitor.
            </p>
            <p className={SUB}>
              In operations management, the newsvendor model shows that the cost-minimizing order quantity
              sits at the <span className={T}>critical fractile</span> of the demand distribution:{" "}
              <span className="whitespace-nowrap">
                <Cs s="u" /> / (<Cs s="u" /> + <Cs s="o" />)
              </span>
              .
            </p>
          </div>
          <NewsvendorLab />
        </div>
        <p className={`${LEAD} mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          When stocking out of a high-margin medical device costs four times as much as holding an extra
          unit in storage (<Cs s="u" /> = 400, <Cs s="o" /> = 100), the firm should stock to the{" "}
          <span className="text-[var(--accent)]">80th percentile</span> of predicted demand (
          <span className="whitespace-nowrap">400 / (400 + 100) = 0.80</span>).
        </p>
      </Slide>

      {/* Censored Demand and Multi-Echelon Replenishment */}
      <Slide id="censored-demand" border align="left">
        <Head1>Censored Demand and Multi-Echelon Replenishment</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            A pervasive data trap in retail forecasting is <span className={T}>censored demand</span>: cash
            registers record units sold, not the number of customers who wanted to buy the product.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            When a store shelf runs out of an item at noon on Saturday, recorded sales for the rest of the
            weekend drop to zero even though customer demand is at its peak.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CensoredDemand />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            If a machine learning model is trained directly on raw sales logs without adjusting for stockout
            periods, it underestimates true demand and recommends smaller future orders, locking the item
            into <span className="text-[var(--accent)]">chronic stockouts</span>.
          </p>
          <p className={BODY}>
            Correcting for censored demand requires combining inventory timestamp logs with sales records to
            impute lost sales during out-of-stock intervals before training the forecast.
          </p>
          <p className={BODY}>
            <span className={T}>Multi-echelon inventory optimization</span> then uses these uncensored
            demand distributions and supplier lead-time predictions to pool safety stock across central
            warehouses, regional depots, and retail stores.
          </p>
        </div>
      </Slide>

      {/* Warehouse Robotics and Human-Robot Fulfillment */}
      <Slide id="warehouse-robotics" border align="left">
        <Head1>Warehouse Robotics and Human-Robot Fulfillment</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Order fulfillment inside traditional warehouses is labor-intensive, with workers spending over
            half their shift walking miles of aisles to locate items.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Modern fulfillment centers deploy <span className={T}>goods-to-person robotics</span>, in which
            fleets of autonomous mobile robots lift shelving pods and bring them directly to stationary human
            work cells.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <GoodsToPerson />
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl`}>
          Machine learning coordinates the warehouse at three levels: slotting algorithms place frequently
          co-purchased items on the same pods, multi-agent path planning routes hundreds of robots without
          gridlock, and computer vision guides robotic arms to grasp irregular packages.
        </p>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Rather than eliminating human warehouse workers, the most reliable fulfillment architectures pair
            mobile robots for heavy transport with{" "}
            <span className="text-[var(--accent)]">human dexterity</span> for handling fragile, deformable,
            or multi-item orders.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Continuous telemetry from scanners and robot fleet controllers feeds back into labor scheduling
            and packaging selection models to prevent packing-station bottlenecks.
          </p>
        </div>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Dynamic Routing, Last-Mile Delivery, and Disruption Sensing"
        lines={[
          "Moving physical goods across oceans, highways, and city streets exposes logistics networks to traffic congestion, weather events, and geopolitical disruptions.",
          "Operations teams combine travel-time prediction, combinatorial routing solvers, and natural language processing to keep freight moving and detect bottlenecks early.",
        ]}
      />

      {/* The Vehicle Routing Problem and Last-Mile Logistics */}
      <Slide id="vehicle-routing" border align="left" exercise={exercise["vehicle-routing"]}>
        <Head1>The Vehicle Routing Problem and Last-Mile Logistics</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Last-mile delivery</span>, the final leg from a local distribution depot to
            the customer&apos;s doorstep, frequently accounts for more than 50 percent of total parcel
            shipping cost.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Assigning packages to delivery vans and sequencing the stops is known as the{" "}
            <span className={T}>vehicle routing problem (VRP)</span>, a combinatorial optimization problem
            whose possible route combinations grow exponentially with the number of stops.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <VrpRoutes />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            A routing solver is only as realistic as its input parameters: if it assumes constant driving
            speeds and uniform two-minute drop-offs, drivers will miss customer time windows in dense urban
            traffic.
          </p>
          <p className={BODY}>
            Logistics platforms use machine learning models trained on historical GPS traces, weather, and
            building types to predict segment driving times and service durations at each address.
          </p>
          <p className={BODY}>
            <span className="text-[var(--accent)]">Dynamic routing</span> systems re-solve the optimization
            problem throughout the day as new pickup requests arrive or traffic accidents alter predicted
            travel times.
          </p>
        </div>
      </Slide>

      {/* Supply Chain Visibility and Unstructured Disruption Sensing */}
      <Slide id="disruption-sensing" border align="left">
        <Head1>Supply Chain Visibility and Unstructured Disruption Sensing</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Most manufacturers have direct contractual visibility only into their{" "}
            <span className={T}>tier-1 suppliers</span>, the vendors from whom they purchase assemblies
            directly.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In practice, severe production halts often originate at tier-2 or tier-3 suppliers that provide
            specialized chemical resins, sub-components, or raw minerals to several tier-1 vendors
            simultaneously.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <MultiTierGraph />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Supply chain visibility platforms use entity resolution and graph machine learning over shipping
            bills of lading, customs records, and corporate disclosures to map hidden multi-tier
            dependencies.
          </p>
          <p className={BODY}>
            Natural language processing models continuously scan global local-language news, port satellite
            feeds, weather advisories, and supplier financial filings to detect factory fires, labor strikes,
            or canal blockages.
          </p>
          <p className={BODY}>
            Early disruption sensing gives procurement teams{" "}
            <span className="text-[var(--accent)]">days or weeks of lead time</span> to secure alternative
            freight capacity or reallocate inventory before tier-1 deliveries stop.
          </p>
        </div>
      </Slide>

      {/* Digital Twins and Stress-Testing Operational Networks */}
      <Slide id="digital-twins" border align="left">
        <Head1>Digital Twins and Stress-Testing Operational Networks</Head1>
        <p className={`${DISPLAY} mt-8 max-w-4xl`}>
          A supply chain <span className="text-[var(--accent)]">digital twin</span> is a virtual simulation
          model of an enterprise&apos;s end-to-end physical network, including factories, supplier lead
          times, warehouse capacities, and transportation lanes.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Because experimenting directly on a live factory or distribution network is slow and risky,
              operations leaders use the digital twin as a safe testing environment.
            </p>
            <p className={BODY}>
              Planners run <span className={T}>Monte Carlo simulations</span> inside the digital twin to test
              how a two-week port closure, a supplier bankruptcy, or a 40 percent regional demand surge
              cascades through inventory buffers.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Digital twins also serve as training environments for reinforcement learning policies that learn
            how to ration scarce inventory or expedite shipments across competing facilities.
          </p>
        </div>
        <Verdict>
          Comparing simulated network behavior against actual operational outcomes highlights single points
          of failure and guides long-term investments in dual-sourcing or buffer capacity.
        </Verdict>
      </Slide>

      {/* Discussion: Redesigning Perishable Inventory Replenishment at a Grocery Chain */}
      <Slide id="discussion-grocery" border align="left">
        <Head1>Discussion: Redesigning Perishable Inventory Replenishment at a Grocery Chain</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A regional supermarket chain suffers from both high
          Monday spoilage write-offs on fresh strawberries and frequent Saturday afternoon stockouts.
          Currently, department managers place orders manually using the prior week&apos;s total
          cash-register sales, without adjusting for weekend stockout hours, local weather forecasts, or
          competitor promotions. How should the operations analytics team correct the historical data for
          censored demand, determine the optimal order quantile using the newsvendor framework, and design
          the workflow between the automated ordering engine and store managers?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Computer Vision and Predictive Maintenance"
        lines={[
          "Inside manufacturing plants, energy grids, and aviation fleets, unexpected equipment failure and undetected product defects carry massive financial and safety costs.",
          "Deep learning on industrial sensor streams and high-speed cameras allows engineers to predict mechanical wear before breakdown and inspect quality at line speed.",
        ]}
      />

      {/* Reactive, Preventive, and Predictive Maintenance */}
      <Slide id="maintenance" border align="left" exercise={exercise["maintenance"]}>
        <Head1>Reactive, Preventive, and Predictive Maintenance</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Industrial organizations manage equipment reliability through three main paradigms: reactive
          maintenance, preventive maintenance, and predictive maintenance.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <MaintenanceTimelines />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Reactive maintenance</span> runs a machine until it breaks, which maximizes
            part lifespan but causes expensive unplanned line stoppages, collateral equipment damage, and
            safety hazards.
          </p>
          <p className={BODY}>
            <span className={T}>Preventive maintenance</span> replaces components on a fixed schedule of
            calendar days or operating hours regardless of actual wear, preventing many breakdowns but
            discarding parts that still have substantial life left.
          </p>
          <p className={BODY}>
            <span className={T}>Predictive maintenance</span> uses real-time sensor data and machine learning
            models to estimate the current health of each specific machine and its remaining useful life
            (RUL).
          </p>
        </div>
        <p className={`${LEAD} mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          By scheduling maintenance during planned shift changeovers shortly before estimated failure,
          predictive maintenance reduces{" "}
          <span className="text-[var(--accent)]">both emergency downtime and unnecessary part replacement</span>.
        </p>
      </Slide>

      {/* Sensor Fusion and Anomaly Detection on Industrial Equipment */}
      <Slide id="sensor-fusion" border align="left">
        <Head1>Sensor Fusion and Anomaly Detection on Industrial Equipment</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Industrial assets such as CNC milling machines, wind turbines, and compressor pumps are
            instrumented with sensors measuring vibration, acoustic emissions, motor current, pressure, and
            temperature.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Sensor fusion</span> combines these multiple physical data streams into a
            unified representation so subtle mechanical degradation can be distinguished from normal load
            changes.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <SensorFusion />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Because catastrophic equipment failures are rare in well-maintained factories, engineers rarely
            have enough labeled failure examples to train a purely supervised classifier from scratch.
          </p>
          <p className={BODY}>
            Predictive maintenance pipelines therefore combine{" "}
            <span className={T}>unsupervised anomaly detection</span> on normal operating baselines with
            physics-informed features, such as bearing vibration harmonic frequencies.
          </p>
          <p className={BODY}>
            When sensor readings diverge persistently from the normal operating manifold, the system alerts
            maintenance engineers and identifies the{" "}
            <span className="text-[var(--accent)]">specific subsystem showing abnormal wear</span>.
          </p>
        </div>
      </Slide>

      {/* Computer Vision for Automated Quality Inspection */}
      <Slide id="quality-inspection" border align="left" exercise={exercise["quality-inspection"]}>
        <Head1>Computer Vision for Automated Quality Inspection</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Manual visual inspection on high-speed manufacturing lines is slow, subject to human eye fatigue,
            and inconsistent across shifts and plants.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Deep computer vision models inspect thousands of manufactured units per minute, detecting
            microscopic solder bridges on circuit boards, hairline cracks in metal castings, or foreign
            particles in pharmaceutical vials.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CvInspection />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Training an industrial defect detector requires addressing severe{" "}
            <span className={T}>class imbalance</span>, often by synthesizing defect images or training
            unsupervised visual anomaly models on abundant images of defect-free parts.
          </p>
          <p className={BODY}>
            Unlike cloud-based marketing models, factory vision systems run on{" "}
            <span className={T}>edge computing</span> hardware installed directly beside the conveyor belt.
          </p>
          <p className={BODY}>
            Edge deployment ensures that every frame is processed within{" "}
            <span className="text-[var(--accent)]">a few milliseconds</span> to trigger a mechanical reject
            gate, and keeps the production line running even if external internet connectivity fails.
          </p>
        </div>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Autonomous Procurement Agents and Human Oversight"
        lines={[
          "Language models and agentic workflows are increasingly deployed in procurement and supply chain execution to process unstructured vendor documents and coordinate routine orders.",
          "Because supply chain execution commits real company cash and physical capacity, autonomous agents require strict financial boundaries and systemic safeguards.",
        ]}
      />

      {/* Agentic Workflows in Procurement and Supplier Coordination */}
      <Slide id="procurement-agents" border align="left">
        <Head1>Agentic Workflows in Procurement and Supplier Coordination</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Procurement and logistics specialists spend a large portion of their workday reconciling
            unstructured documents: supplier quotes, emailed shipping notices, PDF packing slips, and
            commercial invoices.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Retrieval-augmented language models extract line-item quantities, unit prices, and delivery terms
            from varied vendor document formats into the firm&apos;s enterprise resource planning (ERP)
            system.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <ThreeWayMatch />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Autonomous procurement agents automate <span className={T}>three-way matching</span> by verifying
            that the supplier&apos;s invoice matches both the original purchase order and the warehouse
            receiving log before scheduling payment.
          </p>
          <p className={BODY}>
            In <span className={T}>tail-spend procurement</span>, which covers low-dollar, standardized
            operating supplies such as packaging tape or office maintenance parts, agents can request quotes
            from approved catalogs and draft purchase orders automatically.
          </p>
          <p className={BODY}>
            Automating routine document reconciliation and tail-spend tracking frees human buyers to focus on{" "}
            <span className="text-[var(--accent)]">strategic supplier negotiations</span>, quality audits,
            and long-term capacity partnerships.
          </p>
        </div>
      </Slide>

      {/* Algorithmic Coupling and Automated Ordering Spirals */}
      <Slide id="algorithmic-coupling" border align="left" exercise={exercise["algorithmic-coupling"]}>
        <Head1>Algorithmic Coupling and Automated Ordering Spirals</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Granting autonomous agents direct authority to place purchase orders introduces a systemic
            operational hazard known as <span className={T}>algorithmic coupling</span>.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Suppose several retailers use automated replenishment agents programmed to increase safety stock
            orders whenever a supplier&apos;s quoted lead time lengthens by more than two days.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CouplingLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            If a minor port delay lengthens lead times slightly, all downstream agents simultaneously submit
            surge orders to protect their service levels, instantly exhausting the supplier&apos;s available
            capacity.
          </p>
          <p className={BODY}>
            The resulting spike in supplier backlogs causes the agents to perceive an even larger shortage,
            triggering a high-speed, automated bullwhip spiral and spot-price inflation.
          </p>
          <p className={BODY}>
            Preventing automated ordering spirals requires{" "}
            <span className="text-[var(--accent)]">hard deterministic guardrails outside the model</span>,
            including maximum daily order-quantity caps, price-variance ceilings, and rate limiters on
            automated reorder adjustments.
          </p>
        </div>
      </Slide>

      {/* Human-in-the-Loop Governance in Supply Chain Execution */}
      <Slide id="human-in-the-loop" border align="left">
        <Head1>Human-in-the-Loop Governance in Supply Chain Execution</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Effective supply chain governance assigns clear decision rights between autonomous software and
          human operations leaders based on financial exposure and reversibility.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>Routine actions</span> within pre-negotiated contract bounds, such as
            issuing standard replenishment releases, updating shipment tracking statuses, and clearing
            matched invoices, can execute autonomously with audit logging.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>High-stakes or irreversible actions</span> require mandatory
            human-in-the-loop approval: qualifying a new supplier, authorizing costly air-freight expediting,
            waiving quality inspection tolerances, or signing multi-year volume commitments.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            Operational user interfaces must display the model&apos;s underlying{" "}
            <span className="text-[var(--accent)]">uncertainty intervals</span> and constraint assumptions
            rather than presenting a single opaque order number.
          </p>
          <p className={BODY}>
            When an unmodeled event occurs, such as a sudden regulatory tariff or a localized natural
            disaster, planners must be able to override automated forecasts and impose manual allocation
            rules immediately.
          </p>
        </div>
      </Slide>

      {/* Discussion: Managing a Semiconductor Component Shortage with AI */}
      <Slide id="discussion-semiconductor" border align="left">
        <Head1>Discussion: Managing a Semiconductor Component Shortage with AI</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>An industrial equipment manufacturer uses a machine
          learning demand forecast, an automated ERP replenishment agent, and an NLP supply chain disruption
          monitor. On Monday morning, the disruption monitor flags a chemical fire at a tier-2 specialty
          microcontroller plant overseas, and the replenishment agent proposes tripling spot-market broker
          orders at a 45 percent price premium across twelve product lines. Which steps of this response
          should execute automatically versus pause for human sign-off, what verification is required before
          buying from spot brokers, and how should the firm use its digital twin to allocate existing
          inventory across customer orders?
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <ol className="mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            "Operational AI couples machine learning prediction (estimating uncertain demand, lead times, and equipment health) with mathematical optimization that enforces hard physical and capacity constraints.",
            "Multi-horizon probabilistic forecasts estimate demand quantiles rather than averages alone, while downstream data sharing and demand sensing dampen the bullwhip effect across supply chain tiers.",
            "Inventory replenishment uses the newsvendor critical fractile to balance asymmetric stockout and overage costs, and must correct historical sales records for censored demand during stockouts.",
            "In logistics, machine learning travel-time predictions feed dynamic vehicle routing solvers, while NLP and graph models map multi-tier supplier dependencies to sense disruptions early.",
            "Sensor fusion and edge computer vision enable predictive maintenance and high-speed quality control, reducing unplanned factory downtime and catching defects in milliseconds.",
            "Autonomous procurement agents streamline document reconciliation and routine tail-spend ordering, but require hard quantity caps, price ceilings, and human-in-the-loop approval to prevent automated ordering spirals.",
          ].map((line, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] border-b border-[var(--ink)]/10 py-4">
              <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
                {i + 1}
              </span>
              <p className="font-sans text-base leading-[1.55] text-[var(--ink)] md:text-[1.0625rem]">
                {line}
              </p>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
