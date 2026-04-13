"use client";

import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  ContentText,
  Row,
  Column,
  Card,
  ContentTitle,
  ContentDescription,
  DiscussionCard,
  Quote,
  AnimatedList,
  ListItem,
  Callout,
  MediaBlock,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses-ai)/_components/Backgrounds";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function CoursePage() {
  return (
    <SlideDeck background={<BackgroundManager type="operations" />}>
      {/* Title Slide */}
      <Slide>
        <Title>AI in Operations and Supply Chain</Title>
        <Subtitle variant="hero">
          Moving from reactive logistics to predictive network optimization.
        </Subtitle>
        <ContentText>
          Building resilient, efficient, and autonomous supply networks.
        </ContentText>
      </Slide>

      {/* Part 1: The Modern Supply Chain Context */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>The Modern Supply Chain Context</Heading>
        <AnimatedList>
          <ListItem>
            Exploring the foundations of global operational complexity.
          </ListItem>
          <ListItem>
            Identifying the limitations of traditional planning systems.
          </ListItem>
          <ListItem>
            Defining the role of artificial intelligence in physical logistics.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The Complexity of Global Operations [quiz] */}
      <Slide quizData={quizBySlideId["the-complexity-of-global-operations"]}>
        <Heading>
          The <Highlight>Complexity</Highlight> of Global Operations
        </Heading>
        <AnimatedList>
          <ListItem>
            Modern supply chains are highly interconnected networks spanning
            multiple continents and regulatory zones.
          </ListItem>
          <ListItem>
            Traditional spreadsheet-based planning cannot process the volume of
            variables required for global optimization.
          </ListItem>
          <ListItem>
            Disruptions cascade rapidly through the system due to lean inventory
            practices and just-in-time manufacturing.
          </ListItem>
          <ListItem>
            Machine learning provides the capability to model this complexity
            without relying on simplified assumptions.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* AI vs. Traditional Optimization */}
      <Slide>
        <Heading>AI vs. Traditional Optimization</Heading>
        <Row gap="large">
          <Column>
            <Card>
              <ContentTitle>Traditional Operations Research</ContentTitle>
              <ContentDescription>
                Relies on static constraints and linear programming models.
              </ContentDescription>
            </Card>
          </Column>
          <Column>
            <Card>
              <ContentTitle>AI & Deep Learning</ContentTitle>
              <ContentDescription>
                Continuously learns from new data, dynamically adjusting
                operational constraints in real time. Handles non-linear
                relationships that traditional statistical models often miss.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Shift from Reactive to Predictive */}
      <Slide>
        <Heading>The Shift from Reactive to Predictive</Heading>
        <AnimatedList>
          <ListItem>
            Historical supply chains focused on reacting quickly to disruptions
            after they occurred.
          </ListItem>
          <ListItem>
            Predictive models analyze leading indicators to forecast disruptions
            weeks before they impact operations.
          </ListItem>
          <ListItem>
            Operations teams are transitioning from crisis management to
            strategic scenario planning.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Data: The Core of Operations AI */}
      <Slide>
        <Heading>Data: The Core of Operations AI</Heading>
        <AnimatedList>
          <ListItem>
            Machine learning models require vast amounts of high-quality data to
            optimize supply chains effectively.
          </ListItem>
          <ListItem>
            Sources include IoT sensors, ERP systems, supplier portals, and
            external market signals.
          </ListItem>
          <ListItem>
            Data silos between different departments remain the primary barrier
            to successful AI implementation.
          </ListItem>
        </AnimatedList>
        <DiscussionCard title="Group Discussion">
          When supply chain partners refuse to share their operational data, how
          can a lead firm build accurate predictive models?
        </DiscussionCard>
      </Slide>

      {/* Part 2: Demand Sensing and Forecasting */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>Demand Sensing and Forecasting</Heading>
        <AnimatedList>
          <ListItem>Moving beyond historical sales averages.</ListItem>
          <ListItem>
            Incorporating external variables into demand models.
          </ListItem>
          <ListItem>
            Addressing systemic supply chain phenomena using algorithms.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Beyond Historical Averages [quiz] */}
      <Slide quizData={quizBySlideId["beyond-historical-averages"]}>
        <Heading>Beyond Historical Averages</Heading>
        <AnimatedList>
          <ListItem>
            Traditional forecasting relies heavily on historical sales data and
            seasonal trends.
          </ListItem>
          <ListItem>
            AI-driven demand sensing incorporates real-time signals like social
            media sentiment, weather forecasts, and economic indicators.
          </ListItem>
          <ListItem>
            Neural networks can detect subtle patterns in consumer behavior that
            indicate a shift in demand long before it hits the sales ledger.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Mitigating the Bullwhip Effect [quiz] */}
      <Slide quizData={quizBySlideId["mitigating-the-bullwhip-effect"]}>
        <Heading>
          Mitigating the <Highlight>Bullwhip Effect</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            The bullwhip effect occurs when small fluctuations in retail demand
            cause progressively larger fluctuations upstream.
          </ListItem>
          <ListItem>
            AI algorithms can share real-time demand signals across all tiers of
            the supply network simultaneously.
          </ListItem>
          <ListItem>
            Predictive analytics prevent manufacturers from overreacting to
            short-term spikes by separating noise from structural shifts.
          </ListItem>
        </AnimatedList>
        <DiscussionCard title="Group Discussion">
          How does algorithmic demand visibility reshape the balance of power
          between mega-retailers and tier-two suppliers?
        </DiscussionCard>
      </Slide>

      {/* Dynamic Inventory Optimization */}
      <Slide>
        <Heading>Dynamic Inventory Optimization</Heading>
        <AnimatedList>
          <ListItem>
            Maintaining static safety stock levels leads to either excess
            holding costs or stockouts.
          </ListItem>
          <ListItem>
            AI dynamically adjusts optimal inventory targets based on real-time
            demand probabilities and supplier lead times.
          </ListItem>
          <ListItem>
            Multi-echelon inventory optimization models balance stock levels
            across the entire distribution network simultaneously.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Deep Learning for Time-Series Data */}
      <Slide>
        <Heading>Deep Learning for Time-Series Data</Heading>
        <AnimatedList>
          <ListItem>
            Recurrent Neural Networks and Transformer architectures excel at
            predicting sequential time-series data.
          </ListItem>
          <ListItem>
            These models can forecast multiple related SKUs simultaneously,
            capturing cannibalization and halo effects between products.
          </ListItem>
          <ListItem>
            Advanced models automatically adjust their parameters when
            structural market breaks occur.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 3: Logistics and Network Optimization */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>Logistics and Network Optimization</Heading>
        <AnimatedList>
          <ListItem>
            Solving complex routing challenges at a massive scale.
          </ListItem>
          <ListItem>
            Utilizing real-time data for dynamic transport adaptability.
          </ListItem>
          <ListItem>
            The impact of predictive maintenance on fleet operations.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Solving Complex Routing at Scale [quiz] */}
      <Slide quizData={quizBySlideId["solving-complex-routing-at-scale"]}>
        <Heading>
          Solving Complex Routing at <Highlight>Scale</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            The Traveling Salesperson Problem becomes exponentially harder with
            thousands of deliveries and dynamic constraints.
          </ListItem>
          <ListItem>
            AI algorithms process traffic patterns, vehicle capacities, and
            delivery windows to generate optimal routes in seconds.
          </ListItem>
          <ListItem>
            Continuous re-optimization allows fleets to adapt to new orders or
            road closures while vehicles are already in transit.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Autonomous Vehicles and Last-Mile Delivery */}
      <Slide>
        <Heading>Autonomous Vehicles and Last-Mile Delivery</Heading>
        <AnimatedList>
          <ListItem>
            The "last mile" represents the most expensive and inefficient
            segment of the supply chain.
          </ListItem>
          <ListItem>
            Computer vision and reinforcement learning are enabling autonomous
            delivery drones and sidewalk robots.
          </ListItem>
          <ListItem>
            These technologies promise to reduce labor costs and enable
            hyper-local, continuous delivery networks.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Predictive Maintenance in Fleet Management [quiz] */}
      <Slide
        quizData={quizBySlideId["predictive-maintenance-in-fleet-management"]}
      >
        <Heading>Predictive Maintenance in Fleet Management</Heading>
        <AnimatedList>
          <ListItem>
            Traditional fleet maintenance relies on fixed schedules based on
            mileage or time.
          </ListItem>
          <ListItem>
            AI analyzes IoT sensor data from engines, brakes, and transmissions
            to predict component failures before they happen.
          </ListItem>
          <ListItem>
            This approach minimizes unplanned downtime and extends the
            operational lifespan of expensive capital assets.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 4: Intelligent Procurement */}
      <Slide>
        <Tag>Part 4</Tag>
        <Heading>Intelligent Procurement</Heading>
        <AnimatedList>
          <ListItem>
            Automating supplier evaluation and spend analysis.
          </ListItem>
          <ListItem>
            Enhancing visibility deep into the supplier network.
          </ListItem>
          <ListItem>Proactively managing global supply risks.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Proactive Supplier Risk Management [quiz] */}
      <Slide quizData={quizBySlideId["proactive-supplier-risk-management"]}>
        <Heading>
          Proactive Supplier <Highlight>Risk</Highlight> Management
        </Heading>
        <AnimatedList>
          <ListItem>
            Procurement teams traditionally assess supplier risk through annual
            audits and financial reviews.
          </ListItem>
          <ListItem>
            AI systems continuously monitor global news, geopolitical events,
            and financial filings to flag emerging supplier risks.
          </ListItem>
          <ListItem>
            Natural Language Processing extracts risk indicators from
            unstructured data sources across multiple languages.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* NLP for Contract and Spend Analysis */}
      <Slide>
        <Heading>NLP for Contract and Spend Analysis</Heading>
        <AnimatedList>
          <ListItem>
            Large organizations often have thousands of unstandardized supplier
            contracts spread across different regions.
          </ListItem>
          <ListItem>
            AI extracts key terms, compliance clauses, and pricing structures
            from PDF contracts automatically.
          </ListItem>
          <ListItem>
            Automated spend analysis categorizes purchasing data to identify
            maverick spend and consolidation opportunities.
          </ListItem>
        </AnimatedList>
        <DiscussionCard title="Group Discussion">
          If an AI flags a critical supplier as high risk based on unverified
          news sentiment, should procurement immediately halt orders?
        </DiscussionCard>
      </Slide>

      {/* Multi-Tier Supply Chain Visibility */}
      <Slide>
        <Heading>Multi-Tier Supply Chain Visibility</Heading>
        <AnimatedList>
          <ListItem>
            Most companies only have visibility into their direct tier-one
            suppliers.
          </ListItem>
          <ListItem>
            AI maps complex sub-tier supplier networks by analyzing shipping
            manifests, public records, and payment flows.
          </ListItem>
          <ListItem>
            Graph neural networks identify hidden choke points where multiple
            tier-one suppliers rely on the same tier-three component factory.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 5: Warehouse Automation and Vision */}
      <Slide>
        <Tag>Part 5</Tag>
        <Heading>Warehouse Automation and Vision</Heading>
        <AnimatedList>
          <ListItem>
            The transition to AI-powered distribution centers.
          </ListItem>
          <ListItem>
            Implementing computer vision for automated quality control.
          </ListItem>
          <ListItem>
            The synergy between human workers and collaborative robotics.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The AI-Powered Distribution Center */}
      <Slide>
        <Heading>The AI-Powered Distribution Center</Heading>
        <AnimatedList>
          <ListItem>
            Modern warehouses use AI to orchestrate the movement of goods,
            robots, and human workers simultaneously.
          </ListItem>
          <ListItem>
            Algorithms optimize slotting by predicting which products will be
            ordered together and placing them in proximity.
          </ListItem>
          <ListItem>
            Reinforcement learning models continuously refine warehouse layout
            rules based on evolving order profiles.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Computer Vision for Quality Control [quiz] */}
      <Slide quizData={quizBySlideId["computer-vision-for-quality-control"]}>
        <Heading>Computer Vision for Quality Control</Heading>
        <AnimatedList>
          <ListItem>
            Manual quality inspection is slow, expensive, and prone to human
            fatigue.
          </ListItem>
          <ListItem>
            Computer vision models inspect products moving on high-speed
            conveyors with sub-millimeter precision.
          </ListItem>
          <ListItem>
            These systems detect microscopic defects, verify labeling
            compliance, and ensure packaging integrity in milliseconds.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Collaborative Robotics and Human Synergy */}
      <Slide>
        <Heading>Collaborative Robotics and Human Synergy</Heading>
        <AnimatedList>
          <ListItem>
            Cobots are designed to work safely alongside human warehouse
            associates rather than replacing them entirely.
          </ListItem>
          <ListItem>
            AI coordinates the hand-off between autonomous mobile robots and
            human pickers to maximize throughput.
          </ListItem>
          <ListItem>
            Wearable devices and algorithmic task assignment reduce physical
            strain on workers while improving efficiency.
          </ListItem>
        </AnimatedList>
        <DiscussionCard title="Group Discussion">
          Does algorithmic task assignment turn human warehouse workers into
          mechanical extensions of the AI, and what are the ethical
          implications?
        </DiscussionCard>
      </Slide>

      {/* Digital Twins for Facility Layouts [quiz] */}
      <Slide quizData={quizBySlideId["digital-twins-for-facility-layouts"]}>
        <Heading>Digital Twins for Facility Layouts</Heading>
        <AnimatedList>
          <ListItem>
            A digital twin is a virtual simulation of a physical warehouse or
            factory.
          </ListItem>
          <ListItem>
            Operations managers use these AI-driven simulations to test new
            layouts and processes without disrupting actual operations.
          </ListItem>
          <ListItem>
            The twin ingests real-time IoT data to accurately mirror the current
            state and predict the impact of bottlenecks.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 6: Sustainability and Circularity */}
      <Slide>
        <Tag>Part 6</Tag>
        <Heading>Sustainability and Circularity</Heading>
        <AnimatedList>
          <ListItem>
            Leveraging algorithms to reduce the environmental impact of
            operations.
          </ListItem>
          <ListItem>Managing the complexities of reverse logistics.</ListItem>
          <ListItem>Driving the transition toward a circular economy.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Optimizing the Carbon Footprint */}
      <Slide>
        <Heading>Optimizing the Carbon Footprint</Heading>
        <AnimatedList>
          <ListItem>
            Supply chains account for the vast majority of a modern
            corporation's total carbon emissions.
          </ListItem>
          <ListItem>
            Route optimization algorithms explicitly minimize fuel consumption
            rather than just delivery time.
          </ListItem>
          <ListItem>
            AI models help procurement teams evaluate the carbon impact of
            different sourcing scenarios before making purchasing decisions.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* AI in Reverse Logistics and Returns [quiz] */}
      <Slide quizData={quizBySlideId["ai-in-reverse-logistics-and-returns"]}>
        <Heading>
          AI in <Highlight>Reverse Logistics</Highlight> and Returns
        </Heading>
        <AnimatedList>
          <ListItem>
            Processing product returns is a highly complex, labor-intensive
            operational challenge.
          </ListItem>
          <ListItem>
            Computer vision systems automatically assess the condition of
            returned goods to determine if they should be restocked,
            refurbished, or recycled.
          </ListItem>
          <ListItem>
            Predictive models anticipate return volumes based on product
            characteristics and seasonal trends, optimizing reverse network
            capacity.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Waste Reduction via Precision Forecasting */}
      <Slide>
        <Heading>Waste Reduction via Precision Forecasting</Heading>
        <AnimatedList>
          <ListItem>
            Overproduction in manufacturing leads to significant material waste
            and energy consumption.
          </ListItem>
          <ListItem>
            Precision demand forecasting directly reduces the amount of unsold
            inventory that ends up in landfills.
          </ListItem>
          <ListItem>
            In the food and beverage industry, AI tracking algorithms minimize
            spoilage by optimizing the flow of perishable goods.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 7: Risks and Implementation Strategies */}
      <Slide>
        <Tag>Part 7</Tag>
        <Heading>Risks and Implementation Strategies</Heading>
        <AnimatedList>
          <ListItem>
            Addressing the operational challenges of AI adoption.
          </ListItem>
          <ListItem>Overcoming data silos and legacy infrastructure.</ListItem>
          <ListItem>
            Navigating the cybersecurity landscape of connected networks.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The Black Box Problem in Operations [quiz] */}
      <Slide quizData={quizBySlideId["the-black-box-problem-in-operations"]}>
        <Heading>
          The <Highlight>Black Box</Highlight> Problem in Operations
        </Heading>
        <AnimatedList>
          <ListItem>
            Deep learning models often lack transparency in how they arrive at
            specific operational recommendations.
          </ListItem>
          <ListItem>
            Supply chain planners hesitate to execute multi-million dollar
            inventory decisions without understanding the underlying rationale.
          </ListItem>
          <ListItem>
            Explainable AI techniques are critical for building trust between
            human operators and algorithmic systems.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Overcoming Data Silos and Legacy Systems */}
      <Slide>
        <Heading>Overcoming Data Silos and Legacy Systems</Heading>
        <AnimatedList>
          <ListItem>
            Many organizations rely on decades-old ERP systems that cannot
            integrate easily with modern AI platforms.
          </ListItem>
          <ListItem>
            Master data management is a prerequisite for AI, requiring massive
            efforts to clean and standardize supply chain records.
          </ListItem>
          <ListItem>
            Successful implementations often require a middleware layer to
            bridge the gap between legacy databases and cloud-based AI.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Cybersecurity in Connected Networks */}
      <Slide>
        <Heading>Cybersecurity in Connected Networks</Heading>
        <AnimatedList>
          <ListItem>
            As supply chains become more interconnected and automated, their
            vulnerability to cyberattacks increases exponentially.
          </ListItem>
          <ListItem>
            AI systems are used to detect anomalous network traffic and prevent
            supply chain ransomware attacks.
          </ListItem>
          <ListItem>
            However, the AI models themselves can be targeted by adversarial
            attacks designed to manipulate forecasting or routing data.
          </ListItem>
        </AnimatedList>
        <DiscussionCard title="Group Discussion">
          Who is liable when a third-party AI optimization tool is breached,
          causing a systemic shutdown of your logistics network?
        </DiscussionCard>
      </Slide>

      {/* The Human-AI Transition in Operations */}
      <Slide>
        <Heading>The Human-AI Transition in Operations</Heading>
        <AnimatedList>
          <ListItem>
            The role of the supply chain professional is shifting from manual
            planner to algorithm manager.
          </ListItem>
          <ListItem>
            Organizations must invest heavily in upskilling their workforce to
            interpret AI outputs and manage exceptions.
          </ListItem>
          <ListItem>
            Change management is often a larger barrier to AI success than the
            underlying technology itself.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Conclusion: The Autonomous Supply Chain */}
      <Slide>
        <Heading>
          The <Highlight>Autonomous</Highlight> Supply Chain
        </Heading>
        <AnimatedList>
          <ListItem>
            The ultimate goal is a self-driving supply chain that can forecast,
            procure, manufacture, and deliver with minimal human intervention.
          </ListItem>
          <ListItem>
            While fully autonomous operations are years away, targeted AI
            deployments are already creating massive competitive advantages.
          </ListItem>
          <ListItem>
            Operations management is fundamentally transitioning from an
            execution discipline to a data science discipline.
          </ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
