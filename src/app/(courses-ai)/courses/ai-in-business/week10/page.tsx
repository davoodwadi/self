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
  ArchitectureMatrix,
  CrossoverLab,
  DecarbApps,
  DualSides,
  EfficientPipeline,
  EmissionsLab,
  FourPillars,
  GridLoop,
  JevonsLab,
  LifespanLab,
  RoutingLab,
  ScopeMap,
  ShiftLab,
  WaterLoop,
} from "./visuals";

// ============================================================================
// WEEK 10: SUSTAINABILITY AND THE FUTURE OF AI
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const A = "text-[var(--accent)]";
const STACK = "space-y-4";
const GRID3 = "mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10";
const GRID2 = "mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14";
const CLOSE = `${LEAD} mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`;
const FIG = "mt-8 w-full max-w-5xl";

/** A numbered list of sentences in a hairline grid. */
function Numbered({ items, cols = "md:grid-cols-2" }: { items: React.ReactNode[]; cols?: string }) {
  return (
    <ol className={`mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 ${cols}`}>
      {items.map((line, i) => (
        <li key={i} className="grid grid-cols-[2rem_1fr] border-b border-[var(--ink)]/10 py-4">
          <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
            {i + 1}
          </span>
          <p className="font-sans text-base leading-[1.55] text-[var(--ink)] md:text-[1.0625rem]">{line}</p>
        </li>
      ))}
    </ol>
  );
}

export default function Week10Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 10</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            Sustainability and the Future of AI
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Sustainable AI leadership requires accounting for the physical energy, water, and hardware
            footprint of compute, engineering leaner inference pipelines, and aligning technical capability
            with long-term governance and stewardship.
          </p>
        </div>
      </Slide>

      {/* The Physical Materiality of Cloud and AI Compute */}
      <Slide id="materiality" border align="left">
        <Head1>The Physical Materiality of Cloud and AI Compute</Head1>
        <p className={`${DISPLAY} mt-8 max-w-5xl`}>
          Everyday metaphors such as &quot;the cloud&quot; and &quot;virtual assistants&quot; make artificial
          intelligence sound weightless and detached from the physical environment.
        </p>
        <div className={`${RULED} grid gap-8 md:grid-cols-3 md:gap-10`}>
          <p className={BODY}>
            In reality, every model training run and every API prompt executes inside{" "}
            <span className={T}>industrial data centers</span> filled with thousands of high-wattage server
            racks, substations, and cooling towers.
          </p>
          <p className={BODY}>
            Rapid growth in foundation models and agentic workflows has turned electricity generation, grid
            transmission capacity, and municipal cooling water into binding operational constraints.
          </p>
          <p className={BODY}>
            Corporate sustainability mandates and financial disclosure rules increasingly require enterprises
            to measure and report the environmental footprint of their digital infrastructure.
          </p>
        </div>
        <Verdict>
          Managing AI responsibly therefore requires understanding both its{" "}
          <span className={A}>physical resource consumption</span> and its potential to accelerate
          environmental solutions.
        </Verdict>
      </Slide>

      {/* The Dual Relationship Between AI and Sustainability */}
      <Slide id="dual-relationship" border align="left" exercise={exercise["dual-relationship"]}>
        <Head1>The Dual Relationship Between AI and Sustainability</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          The relationship between artificial intelligence and environmental sustainability has two distinct
          sides that managers must evaluate separately.
        </p>
        <div className={FIG}>
          <DualSides />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            The first side is the <span className={T}>sustainability of AI</span> (often called Green AI):
            measuring and reducing the electricity, carbon emissions, water, and hardware waste generated by
            building and running models.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            The second side is <span className={T}>AI for sustainability</span>: applying machine learning,
            computer vision, and mathematical optimization to reduce emissions in energy grids, transportation,
            buildings, and manufacturing.
          </p>
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Treating these two sides as interchangeable leads to flawed accounting, because an inefficient
            internal chatbot does not become green simply because another industry uses AI for solar
            forecasting.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Sound corporate stewardship minimizes the direct footprint of every enterprise AI workload while
            targeting <span className={A}>high-impact operational problems</span> where better predictions
            materially cut physical waste.
          </p>
        </div>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="The Operational Cost of Training and Inference"
        lines={[
          "Running artificial intelligence models consumes electricity to power processors and water to dissipate the resulting heat.",
          "Understanding how resource demand splits between one-time model training and continuous daily inference clarifies where enterprise engineering choices have the greatest impact.",
        ]}
      />

      {/* Training Energy Versus Lifetime Inference Energy */}
      <Slide id="training-inference" border align="left" exercise={exercise["training-inference"]}>
        <Head1>Training Energy Versus Lifetime Inference Energy</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          The operational energy lifecycle of a machine learning model consists of two phases:{" "}
          <span className={T}>training</span> (learning model weights from data) and{" "}
          <span className={T}>inference</span> (generating predictions or responses in production).
        </p>
        <div className={FIG}>
          <CrossoverLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Training a large frontier foundation model is compute-intensive, consuming tens of gigawatt-hours
            of electricity across thousands of graphics processing units (GPUs) over several months.
          </p>
          <p className={BODY}>
            However, once a model is deployed to millions of users or embedded inside automated enterprise
            workflows, inference runs continuously billions of times.
          </p>
          <p className={BODY}>
            Across a popular model&apos;s commercial lifetime, cumulative electricity consumed by inference
            typically accounts for <span className={A}>70 to 90 percent</span> of total operational energy
            demand.
          </p>
        </div>
        <p className={CLOSE}>
          Furthermore, energy per query varies by orders of magnitude across model types: scoring a tabular
          row takes a tiny fraction of a watt-hour, whereas generating an image or a long reasoning chain
          consumes thousands of times more energy.
        </p>
      </Slide>

      {/* Grid Carbon Intensity and Power Usage Effectiveness */}
      <Slide id="carbon-pue" border align="left">
        <Head1>Grid Carbon Intensity and Power Usage Effectiveness</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          The greenhouse gas emissions produced by running an AI workload depend not only on how much
          electricity the processors use, but also on data center efficiency and where the electricity is
          generated.
        </p>
        <div className={FIG}>
          <EmissionsLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Power Usage Effectiveness (PUE)</span> is the ratio of total energy entering a
            data center facility to the energy consumed directly by the computing equipment inside it.
          </p>
          <p className={BODY}>
            An ideal PUE is 1.0, whereas a typical hyperscale data center operates near 1.10 to 1.20, meaning
            an extra 10 to 20 percent of electricity goes to cooling fans, chillers, and power conversion.
          </p>
          <p className={BODY}>
            <span className={T}>Grid carbon intensity</span> measures the grams of carbon dioxide equivalent
            (gCO<sub>2</sub>e) emitted per kilowatt-hour (kWh) of electricity generated on a regional power
            grid.
          </p>
        </div>
        <p className={CLOSE}>
          Running the exact same model training job in a region powered by hydroelectricity or nuclear energy
          emits <span className={A}>a small fraction of the carbon</span> produced by running it on a coal- or
          gas-heavy grid.
        </p>
      </Slide>

      {/* Data Center Cooling and Water Consumption */}
      <Slide id="cooling-water" border align="left">
        <Head1>Data Center Cooling and Water Consumption</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Almost all electrical energy entering an AI accelerator chip is converted into heat that must be
            removed continuously to prevent hardware failure.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Many large data centers dissipate heat through evaporative cooling towers, which evaporate clean
            water into the atmosphere to chill the liquid circulating through server racks.
          </p>
        </div>
        <div className={FIG}>
          <WaterLoop />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Environmental accounting distinguishes between <span className={T}>water withdrawal</span> (total
            water drawn from a local watershed) and <span className={A}>water consumption</span> (evaporated
            water that is not returned to the local water supply).
          </p>
          <p className={BODY}>
            AI workloads also drive indirect off-site water consumption because thermoelectric coal, gas, and
            nuclear power plants evaporate water to spin steam turbines when generating the data center&apos;s
            electricity.
          </p>
          <p className={BODY}>
            Siting data centers involves a sharp geographic trade-off: arid desert regions offer abundant solar
            energy with low carbon intensity, but face severe municipal and agricultural water scarcity.
          </p>
        </div>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Hardware Lifecycles and Embodied Emissions"
        lines={[
          "The environmental footprint of artificial intelligence begins in mines, chemical refineries, and semiconductor fabrication plants long before a server is plugged into an electrical outlet.",
          "Complete lifecycle assessment accounts for embodied hardware carbon, critical mineral supply chains, and electronic waste alongside operational electricity.",
        ]}
      />

      {/* Embodied Carbon Versus Operational Carbon */}
      <Slide id="embodied-operational" border align="left" exercise={exercise["embodied-operational"]}>
        <Head1>Embodied Carbon Versus Operational Carbon</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Embodied carbon</span> is the sum of all greenhouse gas emissions released
            during the extraction of raw materials, semiconductor manufacturing, assembly, and transport of
            computing hardware before use.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Operational carbon</span> is the ongoing emissions released from generating the
            electricity that powers and cools the hardware during its working life.
          </p>
        </div>
        <div className={FIG}>
          <LifespanLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Manufacturing advanced AI accelerators, high-bandwidth memory, and solid-state drives requires
            ultra-pure silicon wafers, high-temperature cleanrooms, and fluorinated etching gases with high
            global-warming potential.
          </p>
          <p className={BODY}>
            As cloud operators procure more renewable electricity to lower their operational carbon, upfront
            embodied carbon accounts for a steadily growing share of a server&apos;s total lifecycle emissions.
          </p>
          <p className={BODY}>
            Retiring functional AI servers after only two or three years to install the newest GPU generation{" "}
            <span className={A}>sharply increases annualized embodied emissions</span> per unit of compute.
          </p>
        </div>
      </Slide>

      {/* Semiconductor Supply Chains, Critical Minerals, and E-Waste */}
      <Slide id="supply-chains" border align="left">
        <Head1>Semiconductor Supply Chains, Critical Minerals, and E-Waste</Head1>
        <div className={PAIR}>
          <p className={LEAD}>
            Modern AI infrastructure depends on a concentrated global supply chain of critical minerals,
            including high-purity silicon, copper, cobalt, palladium, tantalum, and rare-earth elements.
          </p>
          <p className={`${LEAD} ${COL_RULE}`}>
            Semiconductor fabrication facilities (fabs) also consume millions of gallons of ultra-pure
            deionized water daily to rinse microscopic circuits on silicon wafers.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            Because specialized AI chip architectures evolve rapidly, data centers face pressure to replace
            accelerator racks every three to five years, generating specialized electronic waste (e-waste).
          </p>
          <p className={BODY}>
            <span className={T}>Circular hardware practices</span> cascade older generation GPUs from frontier
            training clusters down to lower-intensity enterprise inference and batch analytics before certified
            mineral recycling.
          </p>
        </div>
        <Verdict>
          Extending the useful lifespan of hardware by even one or two years is{" "}
          <span className={A}>one of the most effective levers</span> for reducing embodied environmental
          impact.
        </Verdict>
      </Slide>

      {/* Scope 1, 2, and 3 Emissions Reporting for Enterprise AI */}
      <Slide id="scope-emissions" border align="left">
        <Head1>Scope 1, 2, and 3 Emissions Reporting for Enterprise AI</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Corporate climate disclosures follow the Greenhouse Gas (GHG) Protocol, which divides an
          organization&apos;s emissions into Scope 1, Scope 2, and Scope 3.
        </p>
        <div className={FIG}>
          <ScopeMap />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Scope 1</span> covers direct emissions from company-owned facilities, such as
            testing diesel backup generators at an on-premise data center.
          </p>
          <p className={BODY}>
            <span className={T}>Scope 2</span> covers indirect emissions from purchased electricity, steam, and
            cooling used to run hardware that the company owns or controls directly.
          </p>
          <p className={BODY}>
            <span className={T}>Scope 3</span> covers all other indirect value-chain emissions, including the
            embodied carbon of purchased servers and the electricity consumed by third-party cloud providers and
            SaaS AI vendors.
          </p>
        </div>
        <p className={CLOSE}>
          Because most enterprises access foundation models through external cloud APIs, their AI carbon
          footprint sits <span className={A}>largely inside Scope 3</span>, requiring cloud vendors to report
          auditable per-customer compute emissions.
        </p>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Green AI Practices and Efficient Engineering"
        lines={[
          "Unlike many environmental initiatives that require paying a financial premium to reduce emissions, Green AI engineering directly lowers cloud computing bills and improves application speed.",
          "Right-sizing models, compressing weights, caching repeated queries, and scheduling batch jobs on clean grids align financial return on investment with environmental stewardship.",
        ]}
      />

      {/* Red AI Versus Green AI: Right-Sizing the Model to the Task */}
      <Slide id="right-sizing" border align="left" exercise={exercise["right-sizing"]}>
        <Head1>Red AI Versus Green AI: Right-Sizing the Model to the Task</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Computer scientists distinguish between <span className={T}>Red AI</span>, which chases marginal
          benchmark gains by scaling model size and compute regardless of cost, and{" "}
          <span className={T}>Green AI</span>, which treats efficiency as a primary evaluation metric.
        </p>
        <div className={GRID2}>
          <p className={BODY}>
            A pervasive source of waste in enterprise AI is deploying a massive, general-purpose frontier
            language model to perform narrow, repetitive tasks.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Calling a 100-billion-parameter reasoning model to predict customer churn from a table or classify
            support tickets into five folders consumes up to a hundred times more energy than necessary.
          </p>
        </div>
        <div className={FIG}>
          <RoutingLab />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Right-sizing</span> matches the model class to the complexity of the task:
            using tabular gradient-boosted trees for structured scoring, compact small language models (SLMs)
            for routine extraction, and frontier models only for hard synthesis.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={A}>Tiered model routing</span> cascades requests so a lightweight classifier
            handles the easy 80 percent of traffic and escalates only ambiguous queries to a larger model,
            cutting both energy and API spend.
          </p>
        </div>
      </Slide>

      {/* Model Distillation, Quantization, and Semantic Caching */}
      <Slide id="distillation-caching" border align="left" exercise={exercise["distillation-caching"]}>
        <Head1>Model Distillation, Quantization, and Semantic Caching</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Engineering teams use three practical techniques to cut the energy and memory required for every
          production inference call: distillation, quantization, and caching.
        </p>
        <div className={FIG}>
          <EfficientPipeline />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Knowledge distillation</span> uses a large, accurate teacher model to label
            domain examples and trains a much smaller student model to reproduce that behavior at a fraction of
            the compute cost.
          </p>
          <p className={BODY}>
            <span className={T}>Quantization</span> reduces the numerical precision of a model&apos;s weights,
            such as converting 16-bit floating-point numbers into 8-bit or 4-bit integers, shrinking memory
            bandwidth and energy per token with minimal accuracy loss.
          </p>
          <p className={BODY}>
            <span className={T}>Prompt caching</span> and <span className={T}>semantic caching</span> store the
            computed representations of long system instructions and previously answered customer questions.
          </p>
        </div>
        <p className={CLOSE}>
          When thousands of users ask variations of the same policy or product question, semantic caching
          returns the <span className={A}>verified answer from fast memory</span> rather than running the
          neural network repeatedly.
        </p>
      </Slide>

      {/* Carbon-Aware Spatiotemporal Workload Scheduling */}
      <Slide id="carbon-aware" border align="left">
        <Head1>Carbon-Aware Spatiotemporal Workload Scheduling</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Not every enterprise AI workload has the same latency requirement: live customer chat must respond
            in under a second, whereas nightly model retraining or document indexing can wait several hours.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Carbon-aware scheduling</span> exploits the fact that electrical grid carbon
            intensity varies across both time of day and geographic region.
          </p>
        </div>
        <div className={FIG}>
          <ShiftLab />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Temporal shifting</span> delays flexible batch jobs, such as fine-tuning runs,
            large-scale batch scoring, and evaluation suites, by a few hours so they execute during midday solar
            peaks or overnight wind surpluses.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Spatial shifting</span> routes location-independent training and batch
            processing workloads to cloud data centers situated on low-carbon hydro, nuclear, or wind-heavy
            electrical grids.
          </p>
        </div>
        <p className={CLOSE}>
          Cloud orchestration schedulers can automate both shifts using real-time grid emissions APIs, cutting
          operational carbon by <span className={A}>20 to 50 percent</span> with zero change to model code.
        </p>
      </Slide>

      {/* Discussion: Designing a Low-Carbon Architecture for a Global Retail Bank */}
      <Slide id="discussion-bank" border align="left">
        <Head1>Discussion: Designing a Low-Carbon Architecture for a Global Retail Bank</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A global retail bank handles 20 million customer service
          messages per month. Currently, every incoming message, including simple account-balance inquiries,
          branch-hour lookups, FAQ questions, and complex mortgage restructuring requests, is sent to a single
          frontier reasoning model hosted in a coal-heavy, water-stressed cloud region. How should the
          engineering and sustainability teams redesign this system using model right-sizing, semantic
          caching, quantization, and carbon-aware scheduling to cut both monthly cloud spend and environmental
          footprint?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="AI for Climate Mitigation and Decarbonization"
        lines={[
          "Beyond reducing its own compute footprint, artificial intelligence serves as a high-leverage analytical tool for decarbonizing physical industries, energy infrastructure, and supply chains.",
          "Evaluating AI-for-sustainability projects requires distinguishing genuine physical emissions reductions from rebound effects and unverified greenwashing claims.",
        ]}
      />

      {/* Renewable Grid Integration and Building Energy Optimization */}
      <Slide id="grid-buildings" border align="left">
        <Head1>Renewable Grid Integration and Building Energy Optimization</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Transitioning electrical grids from fossil fuels to wind and solar power creates a forecasting
          challenge because weather-driven generation fluctuates minute by minute while grid supply must match
          demand continuously.
        </p>
        <div className={FIG}>
          <GridLoop />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Multi-horizon machine learning models combine satellite cloud imagery, numerical weather data, and
            smart-meter telemetry to forecast regional solar and wind generation hours ahead.
          </p>
          <p className={BODY}>
            Accurate renewable forecasts allow grid operators to charge and discharge grid-scale batteries
            precisely, reducing the need to keep fossil-fuel peaker plants idling as spinning reserve.
          </p>
          <p className={BODY}>
            On the demand side, predictive and reinforcement learning controllers optimize heating,
            ventilation, and air conditioning (HVAC) systems in commercial buildings and industrial cooling
            plants.
          </p>
        </div>
        <p className={CLOSE}>
          Pre-cooling buildings when clean renewable electricity is abundant and trimming thermal waste
          regularly reduces commercial building energy consumption by{" "}
          <span className={A}>10 to 25 percent</span>.
        </p>
      </Slide>

      {/* Decarbonizing Supply Chains, Logistics, and Materials Discovery */}
      <Slide id="decarbonizing" border align="left">
        <Head1>Decarbonizing Supply Chains, Logistics, and Materials Discovery</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Many of the operational AI applications studied in Week 6 generate direct environmental benefits by
            eliminating physical waste in manufacturing and transportation.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Probabilistic demand sensing and censored-demand correction reduce overproduction and food
            spoilage, preventing the embedded carbon of manufacturing and refrigerating goods that end up in
            landfills.
          </p>
        </div>
        <div className={FIG}>
          <DecarbApps />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Dynamic vehicle routing and freight consolidation increase truck load factors and reduce empty
            backhaul miles, cutting diesel fuel consumption across logistics fleets.
          </p>
          <p className={BODY}>
            In environmental monitoring, computer vision models applied to satellite and aerial spectroscopy
            detect invisible fugitive methane leaks from oil and gas pipelines and track illegal deforestation
            across agricultural supply chains.
          </p>
          <p className={BODY}>
            In materials science, graph neural networks screen millions of candidate chemical structures in
            simulation to accelerate the discovery of low-carbon cement binders, solar photovoltaics, and
            battery electrolytes.
          </p>
        </div>
      </Slide>

      {/* Jevons Paradox, Rebound Effects, and Greenwashing Risks */}
      <Slide id="jevons" border align="left" exercise={exercise["jevons"]}>
        <Head1>Jevons Paradox, Rebound Effects, and Greenwashing Risks</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          In resource economics, <span className={T}>Jevons paradox</span> (or the rebound effect) observes that
          when technological progress improves the efficiency with which a resource is used, total consumption
          of that resource often rises rather than falls.
        </p>
        <div className={FIG}>
          <JevonsLab />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            As hardware and quantization cut the energy and dollar cost per token by half, organizations do not
            simply pocket the savings on existing workloads.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Instead, lower unit costs induce firms to embed continuous background agents, automated
            summarization, and synthetic media generation into every software interaction, expanding total
            compute volume faster than per-token efficiency improves.
          </p>
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Managers must also guard against <span className={T}>corporate AI greenwashing</span>: marketing an
            AI initiative as environmentally beneficial without accounting for its full Scope 2 and Scope 3
            compute emissions.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Credible sustainability accounting compares the{" "}
            <span className={A}>verified physical emissions avoided</span> by an AI application directly against
            the lifecycle compute and hardware emissions required to build and run it.
          </p>
        </div>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Synthesizing the Ten Weeks: Leading AI in Business"
        lines={[
          "Over ten weeks, this course has progressed from the mathematical foundations of machine learning and language models to functional business applications, corporate strategy, EDII governance, and environmental sustainability.",
          "Bringing these perspectives together equips leaders to evaluate any future artificial intelligence technology with analytical rigor and institutional judgment.",
        ]}
      />

      {/* The Four Pillars of Enterprise AI Leadership */}
      <Slide id="four-pillars" border align="left">
        <Head1>The Four Pillars of Enterprise AI Leadership</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Every consequential AI decision in an organization rests on four integrated pillars developed across
          this course.
        </p>
        <div className={FIG}>
          <FourPillars />
        </div>
        <div className="mt-6 grid w-full max-w-6xl gap-6 md:grid-cols-4 md:gap-8">
          <p className={BODY}>
            <span className={T}>Pillar 1</span> is Technical Fit (Weeks 1 and 2): understanding how predictive
            models, deep neural networks, retrieval-grounded language models, and tool-using agents work and
            where each fails.
          </p>
          <p className={BODY}>
            <span className={T}>Pillar 2</span> is Functional and Strategic Value (Weeks 3 through 8):
            embedding models into marketing, finance, HR, operations, and product workflows backed by
            proprietary outcome data and controlled ROI experiments.
          </p>
          <p className={BODY}>
            <span className={T}>Pillar 3</span> is Ethical and EDII Governance (Week 9): auditing systems for
            historical and measurement bias, upholding Indigenous data sovereignty (OCAP), and enforcing
            human-in-the-loop checkpoints and customer recourse.
          </p>
          <p className={BODY}>
            <span className={`${T} ${A}`}>Pillar 4</span> is Environmental Stewardship (Week 10): right-sizing
            models, compressing inference pipelines, and managing the energy, water, and hardware lifecycle of
            enterprise compute.
          </p>
        </div>
      </Slide>

      {/* Matching the Right AI Architecture to the Business Problem */}
      <Slide id="architecture" border align="left" exercise={exercise["architecture"]}>
        <Head1>Matching the Right AI Architecture to the Business Problem</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          A recurring lesson of this course is <span className={A}>architectural discipline</span>: starting
          from the business decision and its constraints rather than from the newest model release.
        </p>
        <div className={FIG}>
          <ArchitectureMatrix />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            When rules and formulas are deterministic and known in advance, standard software and mathematical
            optimization remain faster, cheaper, and completely verifiable.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            When the task estimates a probability or quantity from structured records under tight latency or
            legal explainability, calibrated tabular models paired with economic thresholds outperform large
            language models.
          </p>
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            When the task synthesizes unstructured documents or drafts text grounded in firm policies,
            retrieval-augmented generation with strict citation checks and schema validation is the right
            architecture.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            When a system invokes external software tools to execute multi-step workflows, narrow agent
            permissions, sandboxed execution, and human-in-the-loop sign-off on irreversible actions are
            mandatory.
          </p>
        </div>
      </Slide>

      {/* The Enduring Role of Human Judgment and Institutional Leadership */}
      <Slide id="human-judgment" border align="left">
        <Head1>The Enduring Role of Human Judgment and Institutional Leadership</Head1>
        <div className={PAIR}>
          <p className={BODY}>
            We began in Week 1 by separating a decision into <span className={T}>prediction</span> (estimating
            unknown facts from data) and <span className={T}>judgment</span> (assigning values, ethics, and
            error costs to outcomes).
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            As artificial intelligence makes prediction, pattern recognition, and draft generation abundant and
            inexpensive, the strategic value of informed human judgment increases rather than disappears.
          </p>
        </div>
        <p className={`${DISPLAY} mt-10 max-w-5xl`}>
          An algorithm can estimate the probability that a borrower defaults, a customer cancels, or a machine
          bearing fails, but it cannot decide what level of risk, fairness trade-off, or environmental impact an
          institution should stand for.
        </p>
        <p className={`${BODY} mt-8 max-w-4xl border-t border-[var(--ink)]/10 pt-6`}>
          Nor can a model trained on past data recognize on its own when a macroeconomic regime shift,
          regulatory reform, or social change has rendered historical patterns obsolete.
        </p>
        <Verdict>
          The responsibility of business leaders is to pair technical fluency with{" "}
          <span className={A}>institutional stewardship</span>: designing organizations where intelligent
          systems amplify human capability, accountability, and long-term value.
        </Verdict>
      </Slide>

      {/* Discussion: Comprehensive Executive Review of an Enterprise AI Proposal */}
      <Slide id="discussion-review" border align="left">
        <Head1>Discussion: Comprehensive Executive Review of an Enterprise AI Proposal</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>You serve on the executive investment committee of a
          national Canadian grocery and pharmacy retailer. A division vice president requests 12 million dollars
          to deploy an always-on autonomous AI platform that (1) sets personalized item prices for each shopper
          in the mobile app based on predicted willingness to pay, (2) uses a frontier language model to answer
          customer pharmacy questions, (3) automatically negotiates and cancels contracts with small regional
          farmers, and (4) ranks warehouse workers weekly for shift termination. Conduct a four-pillar review
          across technical architecture, strategic ROI, EDII and legal governance, and compute sustainability,
          stating which components you would approve, redesign, or reject outright.
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <Numbered
          items={[
            "Artificial intelligence relies on physical infrastructure that consumes substantial electricity, cooling water, and critical minerals across data centers and semiconductor supply chains.",
            "For widely deployed models, lifetime production inference consumes far more total energy than initial training, while short hardware refresh cycles increase Scope 3 embodied carbon and e-waste.",
            "Green AI practices, including right-sizing models to the task, model routing, knowledge distillation, weight quantization, semantic caching, and carbon-aware scheduling, reduce both environmental impact and cloud inference costs.",
            "AI supports corporate decarbonization in renewable grid balancing, commercial HVAC control, logistics routing, and methane detection, but leaders must account for Jevons paradox rebound effects and avoid unverified greenwashing claims.",
            "Effective AI leadership synthesizes four pillars across every deployment: technical fit, experimental and strategic ROI, EDII and OCAP governance, and environmental stewardship.",
            "Across every business function, machines supply scalable predictions and candidate actions, while human leaders remain accountable for problem formulation, ethical boundaries, and high-stakes judgment.",
          ]}
        />
      </Slide>
    </SlideDeck>
  );
}
