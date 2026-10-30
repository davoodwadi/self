---
topic: "AI in Operations and Supply Chain"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week6"
---

## Title Slide
- Week 6
- Artificial intelligence improves operational efficiency by coupling probabilistic forecasts and sensor diagnostics with mathematical optimization and human-governed execution.

## Physical Operations Under Uncertainty [no-exercise]
- Operations and supply chain management govern how firms source raw materials, manufacture goods, position inventory, and deliver finished products to customers.
- Unlike digital advertising or web personalization, physical operations require committing factory capacity and inventory weeks or months before actual consumer demand is known.
- Operational mistakes carry high physical inertia: excess seasonal inventory ties up working capital in warehouses, while an unscheduled machine breakdown halts downstream assembly lines.
- Supply networks also span multiple independent companies across continents, exposing everyday execution to weather disruptions, port congestion, and supplier delays.
- Artificial intelligence creates operational value by reducing uncertainty in demand, lead times, and equipment health before irreversible physical commitments are made.

## Coupling Machine Learning Prediction with Mathematical Optimization [exercise]
[figure: two-stage operational decision pipeline where machine learning estimates demand and lead-time distributions and mathematical optimization selects inventory and routing actions under capacity constraints]
- Operational decision systems typically combine two distinct analytical disciplines: machine learning for prediction and mathematical optimization for prescription.
- Machine learning models estimate uncertain quantities from data, such as next week's store demand, a supplier's delivery transit time, or a turbine's failure probability.
- Mathematical optimization takes those predictions as inputs and computes the specific order quantities, production schedules, or truck routes that minimize cost or maximize service.
- Optimization solvers explicitly enforce hard physical constraints that neural networks cannot guarantee on their own, such as truck weight limits, warehouse shelf capacity, and shift labor rules.
- Confusing prediction with optimization leads to flawed system design: an accurate demand forecast generates zero savings unless paired with a replenishment policy that acts on it.

## Part 1: Multi-Horizon Demand Forecasting and the Bullwhip Effect [no-exercise]
- Every supply chain action, from raw-material purchasing to store shelf replenishment, begins with an estimate of future customer demand.
- Modern machine learning replaces isolated single-product extrapolations with probabilistic, multi-horizon forecasts that incorporate external market signals and dampen upstream order volatility.

## Point Forecasts Versus Probabilistic Quantile Forecasts [exercise]
[figure: comparison of a single deterministic point forecast with a probabilistic fan chart displaying the 10th, 50th, and 90th demand percentiles across a twelve-week planning horizon]
- A point forecast outputs a single number representing the expected average demand for a product in a future time period.
- Planning operations from a point forecast alone is perilous because two products with the same average demand of 100 units per week can have vastly different volatility.
- A probabilistic forecast estimates the full probability distribution or specific quantiles of future demand, such as the 10th, 50th, and 90th percentiles.
- If the 90th percentile of weekly demand is 145 units, holding 145 units in stock covers demand in 90 percent of weeks and leaves only a 10 percent stockout risk.
- Multi-horizon forecasting models generate probabilistic estimates across multiple time windows simultaneously, aligning daily store replenishment with quarterly manufacturing capacity plans.

## Demand Sensing and External Covariates [no-exercise]
[figure: demand-sensing architecture combining historical point-of-sale series with real-time promotional calendars, weather forecasts, and local event signals across thousands of SKUs]
- Traditional statistical forecasting methods estimate future sales of a Stock Keeping Unit (SKU) using only that single item's historical sales series.
- Single-series models react slowly to sudden market changes and cannot forecast newly launched products that lack sales history.
- Demand sensing uses global machine learning models trained simultaneously across tens of thousands of SKUs alongside external covariates.
- External covariates include planned price promotions, local weather forecasts, holiday calendar shifts, web search trends, and in-store foot traffic.
- By learning shared patterns across product attributes, a global model can forecast demand for a new winter jacket from the historical behavior of similar jackets during cold snaps.

## The Bullwhip Effect and Information Sharing [no-exercise]
[figure: supply chain order variance diagram showing small retail consumer demand fluctuations amplifying into large swings across wholesaler, manufacturer, and raw-material supplier tiers]
- The bullwhip effect is the phenomenon in which small fluctuations in final consumer demand trigger progressively larger swings in order quantities at each upstream stage of a supply chain.
- While retail consumers may buy diaper packs or packaged foods at a steady weekly rate, the raw-material supplier four tiers upstream often experiences boom-and-bust order waves.
- This amplification occurs because each supply chain tier updates its own demand forecast solely from the orders placed by its immediate downstream customer, batches orders to save freight costs, and over-orders during perceived shortages.
- When an upstream manufacturer mistakes a temporary retail promotion or panic order for a permanent demand shift, it overbuilds inventory that must later be liquidated.
- Sharing real-time point-of-sale data across supply chain partners and driving replenishment from a unified downstream demand forecast significantly dampens the bullwhip effect.

## Part 2: Inventory Optimization and Warehouse Robotics [no-exercise]
- Holding inventory buffers an organization against uncertain demand and unreliable supplier delivery times, but ties up capital and incurs storage, obsolescence, and spoilage costs.
- Machine learning and robotics improve how firms set safety stock targets across distribution networks and how physical orders are picked and packed inside fulfillment centers.

## Asymmetric Inventory Costs and the Newsvendor Trade-Off [exercise]
[figure: interactive newsvendor cost distribution showing how the optimal inventory order quantile shifts upward when underage stockout cost exceeds overage holding and spoilage cost]
- Every inventory replenishment decision balances two asymmetric errors: ordering too much (overage) versus ordering too little (underage).
- The overage cost ($C_o$) is the financial loss of ordering one unit that remains unsold, including storage cost, spoilage, or clearance markdowns.
- The underage cost ($C_u$) is the financial loss of falling one unit short of customer demand, including lost profit margin and the risk that the disappointed shopper switches to a competitor.
- In operations management, the newsvendor model shows that the cost-minimizing order quantity sits at the critical fractile of the demand distribution: $\frac{C_u}{C_u + C_o}$.
- When stocking out of a high-margin medical device costs four times as much as holding an extra unit in storage ($C_u = 400$, $C_o = 100$), the firm should stock to the 80th percentile of predicted demand ($\frac{400}{400 + 100} = 0.80$).

## Censored Demand and Multi-Echelon Replenishment [no-exercise]
[figure: time-series chart contrasting recorded point-of-sale transactions that drop to zero during a shelf stockout with the true uncensored customer demand curve]
- A pervasive data trap in retail forecasting is censored demand: cash registers record units sold, not the number of customers who wanted to buy the product.
- When a store shelf runs out of an item at noon on Saturday, recorded sales for the rest of the weekend drop to zero even though customer demand is at its peak.
- If a machine learning model is trained directly on raw sales logs without adjusting for stockout periods, it underestimates true demand and recommends smaller future orders, locking the item into chronic stockouts.
- Correcting for censored demand requires combining inventory timestamp logs with sales records to impute lost sales during out-of-stock intervals before training the forecast.
- Multi-echelon inventory optimization then uses these uncensored demand distributions and supplier lead-time predictions to pool safety stock across central warehouses, regional depots, and retail stores.

## Warehouse Robotics and Human-Robot Fulfillment [no-exercise]
[figure: goods-to-person fulfillment center layout where autonomous mobile robots transport storage pods to stationary human picking and packing stations]
- Order fulfillment inside traditional warehouses is labor-intensive, with workers spending over half their shift walking miles of aisles to locate items.
- Modern fulfillment centers deploy goods-to-person robotics, in which fleets of autonomous mobile robots lift shelving pods and bring them directly to stationary human work cells.
- Machine learning coordinates the warehouse at three levels: slotting algorithms place frequently co-purchased items on the same pods, multi-agent path planning routes hundreds of robots without gridlock, and computer vision guides robotic arms to grasp irregular packages.
- Rather than eliminating human warehouse workers, the most reliable fulfillment architectures pair mobile robots for heavy transport with human dexterity for handling fragile, deformable, or multi-item orders.
- Continuous telemetry from scanners and robot fleet controllers feeds back into labor scheduling and packaging selection models to prevent packing-station bottlenecks.

## Part 3: Dynamic Routing, Last-Mile Delivery, and Disruption Sensing [no-exercise]
- Moving physical goods across oceans, highways, and city streets exposes logistics networks to traffic congestion, weather events, and geopolitical disruptions.
- Operations teams combine travel-time prediction, combinatorial routing solvers, and natural language processing to keep freight moving and detect bottlenecks early.

## The Vehicle Routing Problem and Last-Mile Logistics [exercise]
[figure: comparison of static morning delivery routes versus dynamic afternoon re-routing around a highway closure while respecting customer delivery time windows]
- Last-mile delivery, the final leg from a local distribution depot to the customer's doorstep, frequently accounts for more than 50 percent of total parcel shipping cost.
- Assigning packages to delivery vans and sequencing the stops is known as the vehicle routing problem (VRP), a combinatorial optimization problem whose possible route combinations grow exponentially with the number of stops.
- A routing solver is only as realistic as its input parameters: if it assumes constant driving speeds and uniform two-minute drop-offs, drivers will miss customer time windows in dense urban traffic.
- Logistics platforms use machine learning models trained on historical GPS traces, weather, and building types to predict segment driving times and service durations at each address.
- Dynamic routing systems re-solve the optimization problem throughout the day as new pickup requests arrive or traffic accidents alter predicted travel times.

## Supply Chain Visibility and Unstructured Disruption Sensing [no-exercise]
[figure: multi-tier supply chain dependency graph linking a manufacturer to tier-1, tier-2, and tier-3 suppliers alongside NLP risk alerts from port congestion, weather, and news feeds]
- Most manufacturers have direct contractual visibility only into their tier-1 suppliers, the vendors from whom they purchase assemblies directly.
- In practice, severe production halts often originate at tier-2 or tier-3 suppliers that provide specialized chemical resins, sub-components, or raw minerals to several tier-1 vendors simultaneously.
- Supply chain visibility platforms use entity resolution and graph machine learning over shipping bills of lading, customs records, and corporate disclosures to map hidden multi-tier dependencies.
- Natural language processing models continuously scan global local-language news, port satellite feeds, weather advisories, and supplier financial filings to detect factory fires, labor strikes, or canal blockages.
- Early disruption sensing gives procurement teams days or weeks of lead time to secure alternative freight capacity or reallocate inventory before tier-1 deliveries stop.

## Digital Twins and Stress-Testing Operational Networks [no-exercise]
- A supply chain digital twin is a virtual simulation model of an enterprise's end-to-end physical network, including factories, supplier lead times, warehouse capacities, and transportation lanes.
- Because experimenting directly on a live factory or distribution network is slow and risky, operations leaders use the digital twin as a safe testing environment.
- Planners run Monte Carlo simulations inside the digital twin to test how a two-week port closure, a supplier bankruptcy, or a 40 percent regional demand surge cascades through inventory buffers.
- Digital twins also serve as training environments for reinforcement learning policies that learn how to ration scarce inventory or expedite shipments across competing facilities.
- Comparing simulated network behavior against actual operational outcomes highlights single points of failure and guides long-term investments in dual-sourcing or buffer capacity.

## Discussion: Redesigning Perishable Inventory Replenishment at a Grocery Chain
- Discussion: A regional supermarket chain suffers from both high Monday spoilage write-offs on fresh strawberries and frequent Saturday afternoon stockouts. Currently, department managers place orders manually using the prior week's total cash-register sales, without adjusting for weekend stockout hours, local weather forecasts, or competitor promotions. How should the operations analytics team correct the historical data for censored demand, determine the optimal order quantile using the newsvendor framework, and design the workflow between the automated ordering engine and store managers?

## Part 4: Computer Vision and Predictive Maintenance [no-exercise]
- Inside manufacturing plants, energy grids, and aviation fleets, unexpected equipment failure and undetected product defects carry massive financial and safety costs.
- Deep learning on industrial sensor streams and high-speed cameras allows engineers to predict mechanical wear before breakdown and inspect quality at line speed.

## Reactive, Preventive, and Predictive Maintenance [exercise]
[figure: timeline comparison of reactive run-to-failure maintenance, fixed-interval preventive maintenance, and sensor-driven predictive maintenance estimating remaining useful life]
- Industrial organizations manage equipment reliability through three main paradigms: reactive maintenance, preventive maintenance, and predictive maintenance.
- Reactive maintenance runs a machine until it breaks, which maximizes part lifespan but causes expensive unplanned line stoppages, collateral equipment damage, and safety hazards.
- Preventive maintenance replaces components on a fixed schedule of calendar days or operating hours regardless of actual wear, preventing many breakdowns but discarding parts that still have substantial life left.
- Predictive maintenance uses real-time sensor data and machine learning models to estimate the current health of each specific machine and its remaining useful life (RUL).
- By scheduling maintenance during planned shift changeovers shortly before estimated failure, predictive maintenance reduces both emergency downtime and unnecessary part replacement.

## Sensor Fusion and Anomaly Detection on Industrial Equipment [no-exercise]
[figure: multi-sensor industrial monitoring pipeline combining vibration frequency spectra, acoustic signals, and thermal readings into an equipment health degradation curve]
- Industrial assets such as CNC milling machines, wind turbines, and compressor pumps are instrumented with sensors measuring vibration, acoustic emissions, motor current, pressure, and temperature.
- Sensor fusion combines these multiple physical data streams into a unified representation so subtle mechanical degradation can be distinguished from normal load changes.
- Because catastrophic equipment failures are rare in well-maintained factories, engineers rarely have enough labeled failure examples to train a purely supervised classifier from scratch.
- Predictive maintenance pipelines therefore combine unsupervised anomaly detection on normal operating baselines with physics-informed features, such as bearing vibration harmonic frequencies.
- When sensor readings diverge persistently from the normal operating manifold, the system alerts maintenance engineers and identifies the specific subsystem showing abnormal wear.

## Computer Vision for Automated Quality Inspection [exercise]
[figure: high-speed assembly line computer vision system detecting microscopic surface cracks and solder defects on printed circuit boards using edge-computing hardware]
- Manual visual inspection on high-speed manufacturing lines is slow, subject to human eye fatigue, and inconsistent across shifts and plants.
- Deep computer vision models inspect thousands of manufactured units per minute, detecting microscopic solder bridges on circuit boards, hairline cracks in metal castings, or foreign particles in pharmaceutical vials.
- Training an industrial defect detector requires addressing severe class imbalance, often by synthesizing defect images or training unsupervised visual anomaly models on abundant images of defect-free parts.
- Unlike cloud-based marketing models, factory vision systems run on edge computing hardware installed directly beside the conveyor belt.
- Edge deployment ensures that every frame is processed within a few milliseconds to trigger a mechanical reject gate, and keeps the production line running even if external internet connectivity fails.

## Part 5: Autonomous Procurement Agents and Human Oversight [no-exercise]
- Language models and agentic workflows are increasingly deployed in procurement and supply chain execution to process unstructured vendor documents and coordinate routine orders.
- Because supply chain execution commits real company cash and physical capacity, autonomous agents require strict financial boundaries and systemic safeguards.

## Agentic Workflows in Procurement and Supplier Coordination [no-exercise]
[figure: autonomous procurement workflow showing an agent reconciling purchase orders, packing slips, and supplier invoices while escalating contract exceptions to a human buyer]
- Procurement and logistics specialists spend a large portion of their workday reconciling unstructured documents: supplier quotes, emailed shipping notices, PDF packing slips, and commercial invoices.
- Retrieval-augmented language models extract line-item quantities, unit prices, and delivery terms from varied vendor document formats into the firm's enterprise resource planning (ERP) system.
- Autonomous procurement agents automate three-way matching by verifying that the supplier's invoice matches both the original purchase order and the warehouse receiving log before scheduling payment.
- In tail-spend procurement, which covers low-dollar, standardized operating supplies such as packaging tape or office maintenance parts, agents can request quotes from approved catalogs and draft purchase orders automatically.
- Automating routine document reconciliation and tail-spend tracking frees human buyers to focus on strategic supplier negotiations, quality audits, and long-term capacity partnerships.

## Algorithmic Coupling and Automated Ordering Spirals [exercise]
[figure: feedback loop showing how autonomous replenishment agents across multiple retailers reacting to the same shortage signal can trigger an artificial hoarding spike and supplier capacity freeze]
- Granting autonomous agents direct authority to place purchase orders introduces a systemic operational hazard known as algorithmic coupling.
- Suppose several retailers use automated replenishment agents programmed to increase safety stock orders whenever a supplier's quoted lead time lengthens by more than two days.
- If a minor port delay lengthens lead times slightly, all downstream agents simultaneously submit surge orders to protect their service levels, instantly exhausting the supplier's available capacity.
- The resulting spike in supplier backlogs causes the agents to perceive an even larger shortage, triggering a high-speed, automated bullwhip spiral and spot-price inflation.
- Preventing automated ordering spirals requires hard deterministic guardrails outside the model, including maximum daily order-quantity caps, price-variance ceilings, and rate limiters on automated reorder adjustments.

## Human-in-the-Loop Governance in Supply Chain Execution [no-exercise]
- Effective supply chain governance assigns clear decision rights between autonomous software and human operations leaders based on financial exposure and reversibility.
- Routine actions within pre-negotiated contract bounds, such as issuing standard replenishment releases, updating shipment tracking statuses, and clearing matched invoices, can execute autonomously with audit logging.
- High-stakes or irreversible actions require mandatory human-in-the-loop approval: qualifying a new supplier, authorizing costly air-freight expediting, waiving quality inspection tolerances, or signing multi-year volume commitments.
- Operational user interfaces must display the model's underlying uncertainty intervals and constraint assumptions rather than presenting a single opaque order number.
- When an unmodeled event occurs, such as a sudden regulatory tariff or a localized natural disaster, planners must be able to override automated forecasts and impose manual allocation rules immediately.

## Discussion: Managing a Semiconductor Component Shortage with AI
- Discussion: An industrial equipment manufacturer uses a machine learning demand forecast, an automated ERP replenishment agent, and an NLP supply chain disruption monitor. On Monday morning, the disruption monitor flags a chemical fire at a tier-2 specialty microcontroller plant overseas, and the replenishment agent proposes tripling spot-market broker orders at a 45 percent price premium across twelve product lines. Which steps of this response should execute automatically versus pause for human sign-off, what verification is required before buying from spot brokers, and how should the firm use its digital twin to allocate existing inventory across customer orders?

## Key Takeaways
- Operational AI couples machine learning prediction (estimating uncertain demand, lead times, and equipment health) with mathematical optimization that enforces hard physical and capacity constraints.
- Multi-horizon probabilistic forecasts estimate demand quantiles rather than averages alone, while downstream data sharing and demand sensing dampen the bullwhip effect across supply chain tiers.
- Inventory replenishment uses the newsvendor critical fractile to balance asymmetric stockout and overage costs, and must correct historical sales records for censored demand during stockouts.
- In logistics, machine learning travel-time predictions feed dynamic vehicle routing solvers, while NLP and graph models map multi-tier supplier dependencies to sense disruptions early.
- Sensor fusion and edge computer vision enable predictive maintenance and high-speed quality control, reducing unplanned factory downtime and catching defects in milliseconds.
- Autonomous procurement agents streamline document reconciliation and routine tail-spend ordering, but require hard quantity caps, price ceilings, and human-in-the-loop approval to prevent automated ordering spirals.
