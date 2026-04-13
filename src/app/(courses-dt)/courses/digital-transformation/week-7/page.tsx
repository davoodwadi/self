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

import blockchainHeroImage from "./1600X900-How-does-blockchain-work.jpg"
import smartContractImage from "./smart-contract.png"
import amazonSupplyChainImage from "./Supply_Chain_Amazon.png"
import realEstateImage from "./bitpanda-academy-intermediate-11-smart-contract-infographic.png"
import financialServicesImage from "./29gGZPAEJWVqocEKPFA6GWtrOuR4Hj6tNhzPr4UoK.jpeg"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Blockchain" },
  { id: "ch2", label: "Smart Contracts" },
  { id: "ch3", label: "Business Use Cases" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek7() {
  return (
    <main className="theme-crimson-noir relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
      <ProgressBar />
      <FloatingNav sections={SECTIONS} />

      <Hero
        category="WEEK 07 — DIGITAL TRANSFORMATION"
        title="Blockchain Technology"
        subtitle="Exploring Blockchain, Smart Contracts, and Business Applications"
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Understanding Blockchain"
        description="A digital system that records information securely, transparently, and in a way that's difficult to alter."
        altBg={true}
      />

      <ZigzagContent
        label="CORE PRINCIPLE"
        title="What is Blockchain?"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Blockchain is a digital system that records information securely, transparently, and in a way that is difficult to alter. It ensures the integrity of digital transactions without relying on central intermediaries.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: blockchainHeroImage
          },
          {
            type: "insight",
            label: "KEY INSIGHT",
            content: "Blockchain eliminates the need for intermediaries, providing a clear and tamper-proof record of all activities while reducing fraud and increasing efficiency."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Decentralized", description: "No single point of control; data is distributed across a network, contrasting heavily with traditional cloud computing." },
          { number: "02", title: "Immutable", description: "Transactions are permanent and cannot be altered once they are recorded on the blockchain." },
          { number: "03", title: "Consensus", description: "All parties in the network must agree on the validity of transactions before they are added to the chain." },
          { number: "04", title: "Programmable", description: "Smart contracts can settle transactions based on complex, pre-defined situations automatically." }
        ]}
        altBg={true}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Smart Contracts"
        description="Self-executing programs that automate agreements and transactions."
        altBg={false}
      />

      <ZigzagContent
        label="TECHNOLOGY HIGHLIGHT"
        title="Automating Agreements"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                A smart contract is a self-executing program containing the terms of an agreement written directly into lines of code. They are stored and replicated on a blockchain network such as Ethereum or Solana.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: smartContractImage
          },
          {
            type: "text",
            content: (
              <p>
                By utilizing the immutability and programmability of the blockchain, smart contracts automate execution. This removes the need for traditional intermediaries, such as lawyers or brokers, thereby reducing costs and transaction times.
              </p>
            )
          }
        ]}
      />

      <CinematicQuote
        quote="What if you could eliminate the need for intermediaries in your business dealings? How would that change the way you operate?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="Business Use Cases"
        description="Applying blockchain and smart contracts in supply chain, real estate, and financial services."
        altBg={true}
      />

      <ZigzagContent
        label="CASE STUDY"
        title="Supply Chain & Amazon"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Traditional supply chains face issues with tracking inefficiencies, manual documentation, and a lack of transparency. By integrating smart contracts with IoT sensors, companies can automate payments upon delivery confirmation and monitor shipments in real-time.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: amazonSupplyChainImage
          },
          {
            type: "insight",
            label: "AMAZON'S IMPLEMENTATION",
            content: "Amazon utilizes smart contracts and IoT to monitor shipments. Upon delivery, the smart contract automatically releases payment to the supplier, ensuring an immutable record."
          }
        ]}
      />

      <ZigzagContent
        label="INDUSTRY APPLICATION"
        title="Real Estate & NFTs"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                In real estate, smart contracts provide a verifiable certificate of ownership and automate dispute resolution. Non-Fungible Tokens (NFTs) serve as a verifiable digital certificate for both tangible and digital assets.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: realEstateImage
          },
          {
            type: "text",
            content: (
              <p>
                Traditional contracts require trust in brokers and attorneys and can take months to process. Smart contracts eliminate intermediaries, drastically lower costs, and complete transactions in minutes with high data security.
              </p>
            )
          }
        ]}
      />

      <ZigzagContent
        label="INDUSTRY APPLICATION"
        title="Financial Services"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Financial services use smart contracts to automate loan disbursements or insurance claims based on predefined conditions like credit scores or document verification, circumventing costly and lengthy manual processes.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: financialServicesImage
          },
          {
            type: "insight",
            label: "LOAN APPROVAL",
            content: "A customer submits a loan application, and the smart contract verifies their identity and credit score. If criteria are met, funds are disbursed automatically, reducing processing time from days to minutes."
          }
        ]}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Blockchain is a decentralized and immutable system that revolutionizes how we manage digital transactions. Through the implementation of smart contracts, businesses can automate complex agreements and eliminate intermediaries."
        takeaways={[
          "Blockchain ensures security, transparency, and efficiency.",
          "Smart contracts are self-executing programs that automate transactions.",
          "Applications include supply chain management, real estate, and financial services.",
          "By removing intermediaries, organizations save time and reduce costs."
        ]}
      />
    </main>
  )
}
