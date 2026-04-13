import React from "react"
import {
  ProgressBar,
  FloatingNav,
  Hero,
  ChapterHeader,
  ZigzagContent,
  ConceptCardsZigzag,
  CinematicQuote,
  Conclusion,
  DataBlock
} from "@/components/presentation"

import bakeryImage from "./Italian-Centre-Shop-Bakery-scaled-ezgif.com-webp-to-jpg-converter-1024x768.jpg"
import cloudComputingImage from "./Cloud_computing.svg.png"
import serviceModelsImage from "./cloud-service-models-iaas-paas-saas-stackscale.jpg"
import healthGuardImage from "./resp-feature.jpg"
import edgeFogCloudImage from "./cloud-fog-edge.png"
import edgeWorksImage from "./How-Edge-Computing-Works-in-Simple-Terms.png"
import factoryImage from "./navvis-factory-planning2-image1.webp"
import fogImage from "./images.jpeg"
import Image from "next/image"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Cloud Computing" },
  { id: "ch2", label: "Service Models" },
  { id: "ch3", label: "Edge Computing" },
  { id: "ch4", label: "Fog Computing" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek5() {
  return (
    <main className="theme-aurora-violet relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
      <ProgressBar />
      <FloatingNav sections={SECTIONS} />
      {/* Navigation */}
      <Link
        href="/courses/digital-transformation"
        className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 text-[var(--charcoal-light)] hover:text-[var(--crimson)] hover:border-[var(--crimson)] hover:bg-[var(--crimson)]/5 transition-colors duration-300 group "
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <Hero
        category="WEEK 05 — DIGITAL TRANSFORMATION"
        title="Cloud, Fog, and Edge Computing"
        subtitle="Understanding modern computing infrastructures and service models"
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Introduction to Cloud Computing"
        description="The foundational infrastructure delivering on-demand computing services over the internet."
        altBg={true}
      />

      <ZigzagContent
        label="CASE STUDY"
        title="The Growing Pains of FreshBake Bakery"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                FreshBake Bakery is a rapidly expanding business with 10 physical stores. They host their website, inventory system, and loyalty program on an aging on-premise server, leading to crashes during peak holiday seasons and delayed inventory updates.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: bakeryImage
          },
          {
            type: "insight",
            label: "BUSINESS CHALLENGE",
            content: "The owner wants to scale operations, improve customer experience, and reduce IT maintenance costs but lacks technical expertise. How can digital infrastructure transformation help?"
          }
        ]}
      />

      <ZigzagContent
        label="CORE PRINCIPLE"
        title="What is Cloud Computing?"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Cloud computing delivers on-demand computing services—including storage, software, and processing power—over the internet. Instead of owning physical servers, companies rent resources from providers like AWS, Microsoft Azure, or Google Cloud.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: cloudComputingImage
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { number: "01", title: "Scalability", description: "Resources can be scaled up or down based on demand, enabling e-commerce platforms to handle traffic spikes during sales easily." },
          { number: "02", title: "Cost-Effectiveness", description: "Reduces capital expenses by eliminating in-house hardware. Operates on a pay-as-you-go model where you only pay for what you use." },
          { number: "03", title: "Accessibility & Global Reach", description: "Services are accessible from anywhere. Cloud data centers allow companies to operate globally with low latency and enhanced collaboration." },
          { number: "04", title: "Flexibility & Innovation", description: "Supports rapid deployment of applications and services, fostering continuous innovation and adaptability to market changes." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="How has Netflix leveraged cloud computing to transform its global streaming service in terms of scalability and customer experience?"
        author="Class Discussion"
        altBg={true}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Cloud Service Models"
        description="Exploring the three primary models of cloud services: IaaS, PaaS, and SaaS."
        altBg={false}
      />

      <ZigzagContent
        label="THEORETICAL FRAMEWORK"
        title="IaaS, PaaS, and SaaS"
        startRight={false}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Cloud computing is generally categorized into three service models, each offering varying levels of control, flexibility, and management for businesses.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: serviceModelsImage
          },
          {
            type: "text",
            content: (
              <p>
                Infrastructure as a Service (IaaS) provides virtualized computing resources, Platform as a Service (PaaS) offers tools for developers, and Software as a Service (SaaS) delivers fully functional applications.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { number: "1", title: "IaaS (Infrastructure as a Service)", description: "Provides virtual servers and storage. Example: AWS EC2 allows businesses like Airbnb to scale server capacity during peak travel seasons and reduce costs." },
          { number: "2", title: "PaaS (Platform as a Service)", description: "Enables developers to build and deploy without managing infrastructure. Example: Google App Engine allowed Snapchat to deploy quickly and focus on app development." },
          { number: "3", title: "SaaS (Software as a Service)", description: "Delivers complete applications over the web. Example: Salesforce CRM helps Coca-Cola manage sales globally with real-time access and collaboration." }
        ]}
        altBg={false}
      />

      <ZigzagContent
        label="CRITICAL ANALYSIS"
        title="Risks and Challenges"
        startRight={false}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                While cloud computing offers immense benefits, it also introduces significant challenges such as security concerns involving data breaches, and the potential for operations disruption due to provider outages.
              </p>
            )
          },
          {
            type: "insight",
            label: "KEY COMPONENT",
            content: "Cost management is a hidden challenge. Poorly managed usage can lead to unexpected, spiraling expenses if resources are not closely monitored."
          }
        ]}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="Edge Computing"
        description="Processing data closer to the source to reduce latency and bandwidth usage."
        altBg={true}
      />

      <ZigzagContent
        label="CASE STUDY"
        title="The Real-Time Dilemma at HealthGuard"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                HealthGuard Hospital uses IoT wearables to monitor patient vital signs. Sending all data to a centralized cloud server causes critical alert delays during emergencies, network congestion, sky-high bandwidth costs, and security concerns.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: healthGuardImage
          },
          {
            type: "text",
            content: (
              <p>
                They need a solution that improves response times, reduces costs, and ensures reliable care without compromising patient privacy or relying entirely on a distant cloud server.
              </p>
            )
          }
        ]}
      />

      <ZigzagContent
        label="CORE PRINCIPLE"
        title="Bringing Computation to the Edge"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Edge computing processes data close to its source, such as on IoT devices or local servers, rather than sending everything to centralized data centers. This localized approach is critical for time-sensitive applications.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: edgeWorksImage
          },
          {
            type: "insight",
            label: "WALMART USE CASE",
            content: "Walmart uses IoT sensors and edge computing to monitor inventory in real-time, optimize energy usage for refrigeration, and process customer data locally."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { title: "Low Latency", description: "Critical for real-time operations like autonomous vehicles and industrial automation where milliseconds matter." },
          { title: "Bandwidth Optimization", description: "Sending less data to the cloud saves significant transmission costs and reduces internet congestion." },
          { title: "Reliability", description: "Systems can continue to function and make decisions even with limited or complete loss of internet connectivity." }
        ]}
        altBg={true}
      />

      <DataBlock label="ARCHITECTURE" title="Cloud vs Edge vs Fog" altBg={true}>
        <div className="flex justify-center mb-12">
          <Image src={edgeFogCloudImage} alt="Cloud, Fog, and Edge comparison" className="max-w-full h-auto rounded-xl object-contain p-4 max-h-[60vh]" />
        </div>
      </DataBlock>

      {/* CHAPTER 4 */}
      <ChapterHeader
        id="ch4"
        number="04"
        title="Fog Computing"
        description="The decentralized intermediate layer bridging the gap between Edge and Cloud."
        altBg={false}
      />

      <ZigzagContent
        label="SCENARIO"
        title="Running a Modern Factory"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Imagine a factory with dozens of machines operating simultaneously. Each machine produces continuous sensor data about its speed, components, and output.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: factoryImage
          },
          {
            type: "text",
            content: (
              <p>
                This massive volume of data needs to be analyzed in real time to derive key business insights without overwhelming external networks or relying purely on isolated device-level processing.
              </p>
            )
          }
        ]}
      />

      <ZigzagContent
        label="CORE PRINCIPLE"
        title="The Intermediate Layer"
        startRight={false}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Fog computing is a decentralized model that extends cloud computing by bringing data processing closer to the network edge. It acts as a bridge, enabling efficient and scalable data processing across distributed systems.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: fogImage
          },
          {
            type: "insight",
            label: "SMART CITIES (CISCO)",
            content: "Cisco enables smart cities to use fog computing for managing traffic lights based on real-time conditions and processing surveillance data locally for faster threat detection."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { title: "Intermediate Layer", description: "Sits between edge devices and the cloud, handling data locally on routers and gateways while connecting to the cloud for heavy analysis." },
          { title: "Distributed Processing", description: "Data is processed across multiple fog nodes within the local network rather than a centralized location." },
          { title: "Scalable Real-Time Support", description: "Handles massive volumes of IoT data without overwhelming the cloud, perfect for smart cities and industrial IoT applications." }
        ]}
        altBg={false}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Modern digital transformation requires choosing the right computing infrastructure. Cloud computing offers scalable, cost-effective centralized resources through IaaS, PaaS, and SaaS models. Edge computing brings processing directly to the data source for zero-latency, real-time decision making. Fog computing serves as the crucial decentralized bridge, distributing processing across local networks to balance load and capabilities."
        takeaways={[
          "Cloud computing (IaaS, PaaS, SaaS) trades control for scalable, on-demand resources.",
          "Edge computing reduces latency and bandwidth usage by processing data locally.",
          "Fog computing provides an intermediate, decentralized processing layer.",
          "Selecting the right model depends on the organization's need for real-time processing versus centralized analytics."
        ]}
      />
    </main>
  )
}
