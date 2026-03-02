"use client";

import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  Row,
  Column,
  DiscussionCard,
  AnimatedList,
  ListItem,
  Citation,
  CitationProvider,
  Card,
  ContentTitle,
  ContentDescription,
  Metric,
  Callout,
  Quote,
  PieChart,
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
import {
  getCitation,
  getCitations,
  getCitationUrls,
} from "./deepResearchCitations";
import {
  circularEconomyFlow,
  compressionFlow,
  hardwareLifecycleFlow,
  redGreenFlow,
} from "./flowcharts";

import FlowRenderer from "../../_components/FlowRenderer";

export default function CourseName() {
  return (
    <CitationProvider value={{ getCitation, getCitations, getCitationUrls }}>
      <SlideDeck background={<BackgroundManager type="sustainability" />}>
        {/* Title Slide */}
        <Slide className="flex flex-col items-center justify-center text-center">
          <Title>The Dual Nature of Artificial Intelligence</Title>
          <Subtitle variant="hero">
            Environmental Costs and Sustainable Solutions
          </Subtitle>
          <AnimatedList className="mt-12 text-xl space-y-6">
            <ListItem>
              Exploring the complex relationship between AI and environmental
              sustainability
            </ListItem>
            <ListItem>From carbon footprints to climate solutions</ListItem>
            <ListItem>Strategies for a sustainable AI ecosystem</ListItem>
          </AnimatedList>
        </Slide>

        {/* The AI Sustainability Paradox */}
        <Slide>
          <Tag>Context</Tag>
          <Heading>
            The AI <Highlight>Sustainability Paradox</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <Card>
                <ContentTitle>Dual Impact</ContentTitle>
                <ContentDescription>
                  AI acts as both a climate savior and a significant
                  environmental burden <Citation ids={[1, 2]} />.
                </ContentDescription>
              </Card>
              <Card>
                <ContentTitle>Resource Intensity</ContentTitle>
                <ContentDescription>
                  Advanced models optimize energy grids but consume vast
                  resources <Citation ids={[23, 24]} />.
                </ContentDescription>
              </Card>
              <Callout title="Critical Pivot Point" variant="secondary">
                The industry faces a critical pivot point between "Red AI" and
                "Green AI" <Citation ids={[29, 30]} />.
              </Callout>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How can we reconcile these opposing forces in the era of
                Generative AI?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Part 1: The Environmental Footprint */}
        <Slide className="flex flex-col items-center justify-center text-center">
          <Tag>Part 1</Tag>
          <Heading>
            The <Highlight>Environmental</Highlight> Footprint
          </Heading>
          <AnimatedList className="mt-12 text-xl space-y-6">
            <ListItem>
              Analyzing the hidden costs of computational power
            </ListItem>
            <ListItem>Beyond carbon: Water, hardware, and waste</ListItem>
            <ListItem>The shift from training to inference impact</ListItem>
          </AnimatedList>
        </Slide>

        {/* The Hidden Cost of Compute */}
        <Slide>
          <Tag>Carbon Footprint</Tag>
          <Heading>
            The Hidden Cost of <Highlight>Compute</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <Row gap="small">
                <Metric value="550+" label="Tons CO2e (GPT-3)" />
                <Metric value=">50%" label="Operational Carbon" />
              </Row>
              <AnimatedList className="mt-8">
                <ListItem>
                  Operational carbon splits into training and inference
                  emissions.
                </ListItem>
                <ListItem>
                  Training a model like GPT-3 emitted over 550 metric tons of
                  CO2e <Citation ids={[2, 3]} />.
                </ListItem>
                <ListItem>
                  Newer models likely exceed these figures by orders of
                  magnitude.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Why is transparency regarding training data becoming a rarity?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Inference: The Sleeping Giant */}
        <Slide>
          <Tag>The Sleeping Giant</Tag>
          <Heading>
            Inference: The <Highlight>Majority</Highlight> Impact
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <PieChart
                title="AI Lifecycle Emissions"
                data={[
                  { label: "Inference", value: 80 },
                  { label: "Training", value: 20 },
                ]}
                caption="Inference dominates the lifecycle emissions of deployed models"
              />
              <AnimatedList className="mt-8">
                <ListItem>
                  Inference constitutes the majority of lifecycle emissions for
                  deployed models <Citation ids={[1, 2]} />.
                </ListItem>
                <ListItem>
                  Energy-intensive models consume over 29 Wh per long prompt{" "}
                  <Citation ids={[1]} />.
                </ListItem>
                <ListItem>
                  Efficient models can operate at approximately 0.4 Wh per
                  prompt <Citation ids={[1]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How does the aggregate impact of billions of daily queries
                change our sustainability strategy?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Case Study: Google's 2025 Report */}
        <Slide>
          <Tag>Case Study</Tag>
          <Heading>
            Google's 2025 <Highlight>Report</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Metric value="0.24 Wh" label="Energy / Prompt" />
                <Metric value="0.03 g" label="CO2e / Prompt" />
              </div>
              <AnimatedList>
                <ListItem>
                  Median Gemini App text prompt consumes 0.24 Wh of energy{" "}
                  <Citation ids={[4, 5]} />.
                </ListItem>
                <ListItem>
                  Emissions per prompt are roughly 0.03 grams of CO2e{" "}
                  <Citation ids={[4, 5]} />.
                </ListItem>
                <ListItem>
                  Comparable to running a 60W light bulb for about 14 seconds.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Is per-query efficiency enough to offset the explosive growth in
                total usage?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Water Consumption: A Critical Metric */}
        <Slide>
          <Tag>Resource Usage</Tag>
          <Heading>
            Water Consumption: A <Highlight>Critical</Highlight> Metric
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <Row gap="small">
                <Metric value="700k L" label="Freshwater (GPT-3 Training)" />
                <Metric value="6.6B m³" label="Global Demand (2027)" />
              </Row>
              <AnimatedList className="mt-8">
                <ListItem>
                  Data centers require massive cooling systems to maintain
                  operation.
                </ListItem>
                <ListItem>
                  Early estimates: GPT-3 training consumed ~700,000 liters of
                  freshwater <Citation ids={[1, 6]} />.
                </ListItem>
                <ListItem>
                  Global AI water demand could reach 6.6 billion cubic meters by
                  2027 <Citation ids={[1, 6]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                What are the ethical implications of data centers in
                water-scarce regions?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* The Bottles of Water Debate */}
        <Slide>
          <Tag>Measurements</Tag>
          <Heading>
            The "Bottles of Water" <Highlight>Debate</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Studies debate the metric of "bottles of water per
                  conversation" <Citation ids={[7, 8]} />.
                </ListItem>
                <ListItem>
                  Google reports 0.26 mL (five drops) per median query due to
                  efficiency <Citation ids={[4, 5]} />.
                </ListItem>
                <ListItem>
                  Efficiency gains fight against the sheer scale of deployment.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How do we effectively communicate water impact to end-users?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Hardware Lifecycle and Embodied Carbon */}
        <Slide>
          <Tag>Hardware</Tag>
          <Heading>
            Hardware Lifecycle and <Highlight>Embodied</Highlight> Carbon
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
                <FlowRenderer {...hardwareLifecycleFlow} />
              </div>
              <AnimatedList className="mt-8">
                <ListItem>
                  "Embodied footprint" includes extraction, manufacturing, and
                  disposal.
                </ListItem>
                <ListItem>
                  Manufacturing AI accelerators is chemically intensive and
                  energy-demanding <Citation ids={[11, 12]} />.
                </ListItem>
                <ListItem>
                  2025 LCA shows efficiency gains can improve Compute Carbon
                  Intensity by 3x <Citation ids={[11]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Should hardware longevity be prioritized over peak performance?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* The E-Waste Challenge */}
        <Slide>
          <Tag>Hardware Lifecycle</Tag>
          <Heading>
            The <Highlight>E-Waste</Highlight> Challenge
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="mb-8">
                <Metric value="62M" label="Tonnes Global E-Waste (2022)" />
              </div>
              <AnimatedList>
                <ListItem>
                  AI hardware becomes obsolete faster than general-purpose
                  servers <Citation ids={[13, 15]} />.
                </ListItem>
                <ListItem>
                  Global e-waste reached 62 million tonnes in 2022{" "}
                  <Citation ids={[16]} />.
                </ListItem>
                <ListItem>
                  Specialized chips contain hazardous materials and rare earth
                  elements <Citation ids={[16, 17]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                What policy mechanisms could enforce better recycling rates for
                AI hardware?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Data Center Innovation */}
        <Slide>
          <Tag>Optimization</Tag>
          <Heading>
            Data Center <Highlight>Innovation</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Shift toward liquid cooling: Direct-to-chip or immersion
                  cooling <Citation ids={[5]} />.
                </ListItem>
                <ListItem>
                  DeepMind-style optimization reduces cooling energy by up to
                  40% <Citation ids={[18]} />.
                </ListItem>
                <ListItem>
                  Balancing Water Usage Effectiveness (WUE) against Power Usage
                  Effectiveness (PUE).
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Can data centers ever become truly "net-positive" for their
                local environments?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Part 2: AI for Climate Mitigation */}
        <Slide className="flex flex-col items-center justify-center text-center">
          <Tag>Part 2</Tag>
          <Heading>
            AI for Climate <Highlight>Mitigation</Highlight>
          </Heading>
          <AnimatedList className="mt-12 text-xl space-y-6">
            <ListItem>Leveraging pattern recognition for the planet</ListItem>
            <ListItem>Weather forecasting and disaster warning</ListItem>
            <ListItem>Optimizing renewable energy systems</ListItem>
          </AnimatedList>
        </Slide>

        {/* Revolutionizing Weather Prediction */}
        <Slide>
          <Tag>Weather Prediction</Tag>
          <Heading>
            Revolutionizing <Highlight>Weather</Highlight> Prediction
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <Row gap="small">
                <Metric value="10 Days" label="Advance Forecasting" />
                <Metric value="0.25°" label="High Resolution" />
              </Row>
              <AnimatedList className="mt-8">
                <ListItem>
                  AI outperforms traditional Numerical Weather Prediction (NWP)
                  in speed and efficiency.
                </ListItem>
                <ListItem>
                  GraphCast: Predicts weather 10 days in advance with high
                  accuracy <Citation ids={[19]} />.
                </ListItem>
                <ListItem>
                  Operates at 0.25-degree resolution using Graph Neural Networks{" "}
                  <Citation ids={[19]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How does faster disaster prediction translate to tangible lives
                saved?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* FourCastNet and Geometric ML */}
        <Slide>
          <Tag>Advanced Architecture</Tag>
          <Heading>
            FourCastNet and <Highlight>Geometric</Highlight> ML
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  NVIDIA's FourCastNet v3 uses Spherical Fourier Neural
                  Operators <Citation ids={[20, 21]} />.
                </ListItem>
                <ListItem>
                  Enables rapid ensemble forecasting to predict extreme weather
                  probabilities <Citation ids={[21]} />.
                </ListItem>
                <ListItem>
                  Democratizes forecasting: Runs on a few GPUs instead of
                  supercomputers <Citation ids={[22]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                What new applications emerge when weather forecasting becomes
                accessible to smaller organizations?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Optimizing Renewable Energy */}
        <Slide>
          <Tag>Energy Management</Tag>
          <Heading>
            Optimizing <Highlight>Renewable</Highlight> Energy
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Integrating variable sources like wind and solar into the
                  grid.
                </ListItem>
                <ListItem>
                  AI predicts solar irradiance and wind speeds with high
                  precision <Citation ids={[23]} />.
                </ListItem>
                <ListItem>
                  Reinforcement Learning manages Hybrid Energy Storage Systems
                  (HESS) <Citation ids={[23, 24]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Can AI be the key factor that allows grids to run on 100%
                renewable energy?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Precision Agriculture */}
        <Slide>
          <Tag>AgriTech</Tag>
          <Heading>
            Precision <Highlight>Agriculture</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Maximizing yield while minimizing chemical inputs and water
                  usage.
                </ListItem>
                <ListItem>
                  Analysis of satellite imagery and soil sensors for Variable
                  Rate Technology <Citation ids={[26, 28]} />.
                </ListItem>
                <ListItem>
                  Smart irrigation systems optimize water delivery in real-time{" "}
                  <Citation ids={[27]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How can we ensure smallholder farmers have access to these
                advanced tools?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Part 3: The Shift to Green AI */}
        <Slide className="flex flex-col items-center justify-center text-center">
          <Tag>Part 3</Tag>
          <Heading>
            The Shift to <Highlight>Green</Highlight> AI
          </Heading>
          <AnimatedList className="mt-12 text-xl space-y-6">
            <ListItem>Prioritizing efficiency alongside accuracy</ListItem>
            <ListItem>Architectural innovations and model compression</ListItem>
            <ListItem>The rise of Small Language Models</ListItem>
          </AnimatedList>
        </Slide>

        {/* Red AI vs. Green AI */}
        <Slide>
          <Tag>Red vs Green AI</Tag>
          <Heading>
            <Highlight>Red</Highlight> AI vs. <Highlight>Green</Highlight> AI
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="w-full h-[320px] sm:h-[360px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
                <FlowRenderer {...redGreenFlow} />
              </div>
              <p className="mt-4 text-center text-sm text-[var(--charcoal-light)]/70 italic">
                Contrasting development philosophies
              </p>
              <AnimatedList className="mt-8">
                <ListItem>
                  Red AI: Buying performance with massive computational cost{" "}
                  <Citation ids={[29, 30]} />.
                </ListItem>
                <ListItem>
                  Green AI: Treating carbon efficiency as a primary evaluation
                  metric.
                </ListItem>
                <ListItem>
                  Decoupling AI progress from exponential resource consumption.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                What cultural shifts in research are needed to value efficiency
                as much as accuracy?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Model Compression Techniques */}
        <Slide>
          <Tag>Optimization</Tag>
          <Heading>
            Model <Highlight>Compression</Highlight> Techniques
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="w-full h-[340px] sm:h-[380px] md:h-[420px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
                <FlowRenderer {...compressionFlow} />
              </div>
              <p className="mt-4 text-center text-sm text-[var(--charcoal-light)]/70 italic">
                Techniques to reduce model size and energy consumption
              </p>
              <AnimatedList className="mt-8">
                <ListItem>
                  Quantization: Reducing precision (e.g., 32-bit to 4-bit) to
                  save energy.
                </ListItem>
                <ListItem>
                  Pruning: Removing redundant weights to create sparse models.
                </ListItem>
                <ListItem>
                  Knowledge Distillation: Training small student models from
                  large teachers <Citation ids={[31, 32]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Is there a "minimum viable precision" for most business
                applications?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Small Language Models (SLMs) */}
        <Slide>
          <Tag>Architectures</Tag>
          <Heading>
            Small Language <Highlight>Models</Highlight> (SLMs)
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="mb-8">
                <Metric value="28%" label="Global AI Energy Savings (2025)" />
              </div>
              <AnimatedList>
                <ListItem>
                  The "Small is Sufficient" trend: Using task-specific models{" "}
                  <Citation ids={[34]} />.
                </ListItem>
                <ListItem>
                  Adoption could save roughly 28% of global AI electricity by
                  2025 <Citation ids={[34]} />.
                </ListItem>
                <ListItem>
                  Avoiding the use of massive generalist models for simple
                  queries.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Why do organizations still default to the largest available
                models?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Neuromorphic Computing */}
        <Slide>
          <Tag>Hardware Innovation</Tag>
          <Heading>
            <Highlight>Neuromorphic</Highlight> Computing
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Hardware inspired by the human brain's architecture.
                </ListItem>
                <ListItem>
                  Spiking Neural Networks (SNNs): Neurons only consume energy
                  when active <Citation ids={[35, 36]} />.
                </ListItem>
                <ListItem>
                  Eliminates the energy cost of moving data between memory and
                  processors.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How close are we to seeing neuromorphic chips in consumer
                devices?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Neuromorphic Efficiency Gains */}
        <Slide>
          <Tag>Efficiency</Tag>
          <Heading>
            Neuromorphic <Highlight>Efficiency</Highlight> Gains
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <div className="mb-8">
                <Metric value="1000x" label="Potential Efficiency Gain" />
              </div>
              <AnimatedList>
                <ListItem>
                  Intel Loihi 2 and BrainChip Akida showing commercial viability{" "}
                  <Citation ids={[36, 37]} />.
                </ListItem>
                <ListItem>
                  Potential for 100x to 1000x efficiency gains in specific tasks{" "}
                  <Citation ids={[36, 38]} />.
                </ListItem>
                <ListItem>
                  Ideal for edge AI and sensory processing applications.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Will neuromorphic computing replace or augment traditional GPU
                architectures?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Part 4: Circular Economy & Policy */}
        <Slide className="flex flex-col items-center justify-center text-center">
          <Tag>Part 4</Tag>
          <Heading>
            Circular Economy & <Highlight>Policy</Highlight>
          </Heading>
          <AnimatedList className="mt-12 text-xl space-y-6">
            <ListItem>Closing the loop on waste</ListItem>
            <ListItem>Biodiversity monitoring</ListItem>
            <ListItem>The emerging regulatory landscape</ListItem>
          </AnimatedList>
        </Slide>

        {/* AI and the Circular Economy */}
        <Slide>
          <Tag>Sustainability</Tag>
          <Heading>
            AI and the <Highlight>Circular</Highlight> Economy
          </Heading>
          <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
            <FlowRenderer {...circularEconomyFlow} />
          </div>
          <p className="mt-4 text-center text-sm text-[var(--charcoal-light)]/70 italic">
            Closing the loop with AI
          </p>
          <Row gap="large" className="mt-8">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Treating waste as a resource through better sorting and
                  logistics.
                </ListItem>
                <ListItem>
                  AI robotics sort waste streams with high speed and accuracy{" "}
                  <Citation ids={[40, 41]} />.
                </ListItem>
                <ListItem>
                  Digital Waste Passports track recovery of valuable materials{" "}
                  <Citation ids={[42]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How can AI incentivize consumers to participate more effectively
                in recycling?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Biodiversity Monitoring */}
        <Slide>
          <Tag>Ecology</Tag>
          <Heading>
            Biodiversity <Highlight>Monitoring</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Passive Acoustic Monitoring (PAM) tracks species via
                  soundscapes <Citation ids={[44, 45]} />.
                </ListItem>
                <ListItem>
                  Computer vision identifies species in real-time via camera
                  traps <Citation ids={[44, 46]} />.
                </ListItem>
                <ListItem>
                  Non-invasive methods for tracking elusive or endangered
                  species.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Can global biodiversity data be standardized to drive
                international policy?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* The EU AI Act: Article 40 */}
        <Slide>
          <Tag>Regulation</Tag>
          <Heading>
            The EU AI Act: <Highlight>Article 40</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Mandates transparency regarding "AI systems resource
                  performance" <Citation ids={[48, 49]} />.
                </ListItem>
                <ListItem>
                  General-Purpose AI providers must publish energy consumption
                  data <Citation ids={[50, 51]} />.
                </ListItem>
                <ListItem>
                  Applies to models trained with more than 10^23 FLOPs{" "}
                  <Citation ids={[50]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Will the EU's regulations become the de facto global standard
                for AI sustainability?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* ISO Standards and Frameworks */}
        <Slide>
          <Tag>Standards</Tag>
          <Heading>
            ISO Standards and <Highlight>Frameworks</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  ISO/IEC 42001: Management system standard including
                  sustainability <Citation ids={[53]} />.
                </ListItem>
                <ListItem>
                  ISO/IEC TR 20226: Focuses on energy, water, and e-waste
                  aspects <Citation ids={[54, 55]} />.
                </ListItem>
                <ListItem>
                  Moving from voluntary "greenwashing" to rigorous compliance.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How can organizations prepare for these upcoming reporting
                requirements?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Measurement Tools */}
        <Slide>
          <Tag>Tracking</Tag>
          <Heading>
            <Highlight>Measurement</Highlight> Tools
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Software tools like CodeCarbon and Green Algorithms estimate
                  emissions <Citation ids={[3, 56]} />.
                </ListItem>
                <ListItem>
                  Compute Carbon Intensity (CCI) quantifies carbon per unit of
                  work <Citation ids={[11]} />.
                </ListItem>
                <ListItem>
                  Tools may underestimate true usage by missing overheads like
                  cooling <Citation ids={[56]} />.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                What is the margin of error we should accept in carbon
                accounting tools?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Actionable Insights: Developers */}
        <Slide>
          <Tag>Action Plan</Tag>
          <Heading>
            Actionable Insights: <Highlight>Developers</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Integrate carbon tracking into CI/CD pipelines.
                </ListItem>
                <ListItem>
                  Default to Small Language Models (SLMs) where possible.
                </ListItem>
                <ListItem>
                  Schedule training runs for times with low grid carbon
                  intensity.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                How can individual developers influence organizational choice of
                models?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Actionable Insights: Organizations */}
        <Slide>
          <Tag>Strategy</Tag>
          <Heading>
            Actionable Insights: <Highlight>Organizations</Highlight>
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Require Life Cycle Assessments (LCA) from hardware vendors.
                </ListItem>
                <ListItem>
                  Prioritize data centers with water-free or recycled water
                  cooling.
                </ListItem>
                <ListItem>
                  Align reporting with EU AI Act and ISO standards immediately.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                What are the risks of ignoring the environmental component of
                ESG goals?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Future Directions */}
        <Slide>
          <Tag>Looking Ahead</Tag>
          <Heading>
            <Highlight>Future</Highlight> Directions
          </Heading>
          <Row gap="large">
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  Standardizing water reporting to prevent "water washing".
                </ListItem>
                <ListItem>
                  Hardware-software co-design for neuromorphic architectures.
                </ListItem>
                <ListItem>
                  Mitigating Jevons Paradox: Efficiency leading to increased
                  total consumption.
                </ListItem>
              </AnimatedList>
            </Column>
            <Column spanRatio="1/3">
              <DiscussionCard title="Group Discussion">
                Can we innovate fast enough to outpace the environmental damage
                of scaling?
              </DiscussionCard>
            </Column>
          </Row>
        </Slide>

        {/* Conclusion */}
        <Slide className="flex flex-col items-center justify-center text-center">
          <Tag>Summary</Tag>
          <Heading>Conclusion</Heading>
          <AnimatedList className="mt-8 text-xl space-y-6">
            <ListItem>
              AI is a powerful tool with a heavy environmental price tag
            </ListItem>
            <ListItem>
              The shift to inference dominance demands new efficiency strategies
            </ListItem>
            <ListItem>
              Regulation and standards are transforming the industry
            </ListItem>
            <ListItem>
              Sustainable AI is not just an option, it is a license to operate.
            </ListItem>
          </AnimatedList>
        </Slide>
      </SlideDeck>
    </CitationProvider>
  );
}
