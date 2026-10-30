"use client";

import React, { useState } from "react";
import { ProgressBar } from "@/components/presentation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import exercisesData from "./exercises.json";

import {
  DECK_THEME,
  DeckNav,
  PosterHero,
  ChapterBand,
  Slide,
  Row,
  PlateWell,
  DiscussionList,
  Summary,
} from "../_visuals/kit";
import {
  HeroBlockchainLedger,
  BlockchainPillarsInteractive,
  BlockchainFeaturesInteractive,
  SmartContractMechanismInteractive,
  SmartContractUseCasesInteractive,
  SupplyChainComparisonInteractive,
  AmazonSupplyChainInteractive,
  NftOverviewInteractive,
  RealEstateComparisonPlate,
  FinancialServicesInteractive,
  BankLoanSimulatorInteractive,
  LegalContractsInteractive,
  VotingSystemsInteractive,
  IpManagementInteractive,
  OtherUseCasesInteractive,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Blockchain" },
  { id: "ch2", label: "Smart Contracts" },
  { id: "ch3", label: "Supply Chain" },
  { id: "ch4", label: "Real Estate & NFTs" },
  { id: "ch5", label: "Finance & Legal" },
  { id: "ch6", label: "Voting, IP & More" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy in upright sans-serif. */
const BODY_BASE =
  "font-sans leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const BODY = `${BODY_BASE} text-base md:text-[1.0625rem]`;
const LIST =
  "list-none flex flex-col gap-1.5 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";
const SUBLIST =
  "list-none flex flex-col gap-1 mt-1.5 pl-4 [&>li]:flex [&>li]:gap-2.5 [&>li]:before:content-['-'] [&>li]:before:shrink-0";

function Bullets({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`${LIST} ${className}`}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Dashes({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={SUBLIST}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DigitalTransformationWeek7() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activeScIssue, setActiveScIssue] = useState(0);
  const [activeAmazonStep, setActiveAmazonStep] = useState(0);
  const [activeNft, setActiveNft] = useState(0);
  const [activeReRow, setActiveReRow] = useState(0);
  const [activeFinTab, setActiveFinTab] = useState(0);
  const [activeLegalTab, setActiveLegalTab] = useState(0);
  const [activeVotingTab, setActiveVotingTab] = useState(0);
  const [activeIpTab, setActiveIpTab] = useState(0);
  const [activeOtherTab, setActiveOtherTab] = useState(0);

  return (
    <main className="relative w-full overflow-x-hidden min-h-screen font-sans" style={DECK_THEME}>
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 text-[var(--ink-3)] hover:text-[var(--dt-signal)] transition-colors duration-200"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="Week 07: Digital Transformation"
        title="Blockchain Technology"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Blockchain definition",
          "Smart Contracts",
          "Business use cases of blockchain and smart contracts",
        ]}
        plate={<HeroBlockchainLedger />}
      />

      {/* ================================================================
          CHAPTER 1: BLOCKCHAIN
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Blockchain" />

      <DiscussionList
        id="discussion-questions"
        questions={[
          "How can we ensure that our digital transactions are secure and that the products we buy are genuine?",
          "What are some situations where having a shared, unalterable record would be beneficial?",
          "What if you could eliminate the need for intermediaries in your business dealings? How would that change the way you operate?",
          "How can we ensure that all parties involved in a transaction agree on the details and that there's no dispute later on?",
        ]}
      />

      <Slide id="blockchain-and-why-it-matters" label="CORE CONCEPT" title="Blockchain & Why Does Blockchain Matter?">
        <div className={`${BODY} text-lg border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
          <p>Blockchain is a digital system that records information</p>
          <Dashes
            items={[
              <>
                securely,
              </>,
              <>
                transparently,
              </>,
              <>
                in a way that&apos;s difficult to alter.
              </>,
            ]}
          />
        </div>
        <PlateWell>
          <BlockchainPillarsInteractive active={activePillar} onSelect={setActivePillar} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            <>
              <strong>Security</strong>: Ensures the integrity and security of digital transactions.
            </>,
            <>
              <strong>Transparency</strong>: Provides a clear and tamper-proof record of all activities.
            </>,
            <>
              <strong>Efficiency</strong>: Streamlines processes by eliminating intermediaries and reducing fraud.
            </>,
          ].map((item, i) => {
            const isLit = i === activePillar;
            return (
              <div
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 text-xl transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="features-of-blockchain"
        label="ARCHITECTURE"
        title="Features of Blockchain"
        exercise={exercise["features-of-blockchain"]}
      >
        <PlateWell>
          <BlockchainFeaturesInteractive active={activeFeature} onSelect={setActiveFeature} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            <div key="decentralized">
              <p className="text-xl">
                <strong>Decentralized</strong>: No single point of control. Data is distributed across a network.
              </p>
              <Dashes items={[<>Contrast with cloud computing</>]} />
            </div>,
            <p key="immutable" className="text-xl">
              <strong>Immutable</strong>: Transactions are permanent and cannot be altered.
            </p>,
            <p key="consensus" className="text-xl">
              <strong>Consensus</strong>: All parties agree on the validity of transactions.
            </p>,
            <p key="programmable" className="text-xl">
              <strong>Programmable</strong>: Smart contracts can settle transactions based on complex situations.
            </p>,
          ].map((item, i) => {
            const isLit = i === activeFeature;
            return (
              <div
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 2: SMART CONTRACTS
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Smart Contracts" />

      <Slide id="smart-contracts" label="AUTOMATED AGREEMENTS" title="Smart Contracts">
        <div className={`${BODY} text-lg grid md:grid-cols-2 lg:grid-cols-4 gap-5`}>
          <p className="border-t border-[var(--dt-ink)]/15 pt-4">
            A smart contract is a self-executing program
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-4">
            Contains the terms of an agreement written directly into lines of code.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-4">
            It is stored and replicated on a blockchain.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-4">
            Solana, Ethereum, etc.
          </p>
        </div>
        <PlateWell>
          <SmartContractMechanismInteractive />
        </PlateWell>
      </Slide>

      <Slide id="question-smart-contract-use-cases" label="QUESTION" title="Question">
        <p className="font-sans font-bold text-xl md:text-2xl">
          Come up with a use case for the immutability and programmability of smart contracts
        </p>
        <PlateWell>
          <SmartContractUseCasesInteractive active={activeUseCase} onSelect={setActiveUseCase} />
        </PlateWell>
        <ol className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-3`}>
          {[
            <>Deed management (e.g. real estate, tangible good, digital goods)</>,
            <>Legal contracts</>,
            <>Voting Systems</>,
            <>Intellectual Property Management</>,
            <>Crowdfunding</>,
            <>Insurance</>,
            <>Education</>,
          ].map((item, i) => {
            const isLit = i === activeUseCase;
            return (
              <li
                key={i}
                onClick={() => setActiveUseCase(i)}
                className={`cursor-pointer border-t-2 pt-3 flex items-baseline gap-2.5 transition-colors ${
                  isLit ? "border-[var(--dt-signal)] font-sans font-bold" : "border-[var(--dt-ink)]"
                }`}
              >
                <span className="font-sans text-sm shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          CHAPTER 3: SUPPLY CHAIN MANAGEMENT
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Supply Chain Management" />

      <Slide
        id="smart-contracts-in-supply-chain-management"
        label="SUPPLY CHAIN"
        title="Smart Contracts in Supply Chain Management"
      >
        <PlateWell>
          <SupplyChainComparisonInteractive active={activeScIssue} onSelect={setActiveScIssue} />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-2 gap-6 md:gap-10`}>
          <div className="border-t-2 border-[var(--counter)] pt-4">
            <p className="font-sans font-bold text-xl mb-2">Traditional Issues in Supply Chain Management</p>
            <Dashes
              items={[
                <>
                  Inefficiencies in tracking and monitoring shipments.
                </>,
                <>
                  Lack of transparency leading to mistrust between suppliers and buyers.
                </>,
                <>
                  <strong>Manual</strong> processes causing delays in payments and documentation.
                </>,
              ]}
            />
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-4 grid">
            {[
              <p key="auto" className="text-lg">
                <strong>Automation</strong>: Automatically trigger actions like payments upon delivery confirmation.
              </p>,
              <p key="trans" className="text-lg">
                <strong>Transparency</strong>: Provide real-time tracking and monitoring of shipments.
              </p>,
              <p key="trust" className="text-lg">
                <strong>Trust</strong>: Ensure all parties adhere to agreed terms without intermediaries.
              </p>,
            ].map((item, i) => {
              const isLit = i === activeScIssue;
              return (
                <div
                  key={i}
                  aria-hidden={!isLit}
                  className={`col-start-1 row-start-1 transition-opacity duration-200 ${
                    isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </Slide>

      <Slide
        id="case-study-amazon"
        label="CASE STUDY"
        title="Case Study: Amazon"
        exercise={exercise["case-study-amazon"]}
      >
        <div className={`${BODY} grid md:grid-cols-2 gap-6 border-b border-[var(--dt-ink)]/15 pb-4`}>
          <div className="border-l-2 border-[var(--dt-ink)]/25 pl-4">
            <p className="font-sans font-bold">Background:</p>
            <Dashes
              items={[
                <>
                  Amazon faces delivery delays and payment issues in their supply chain, affecting supplier
                  relationships and cash flow.
                </>,
              ]}
            />
          </div>
          <div className="border-l-2 border-[var(--dt-ink)]/25 pl-4">
            <p>
              <strong>Implementation</strong>: Integrating smart contracts with IoT sensors to monitor shipments and
              automate payments.
            </p>
          </div>
        </div>
        <PlateWell>
          <AmazonSupplyChainInteractive active={activeAmazonStep} onSelect={setActiveAmazonStep} />
        </PlateWell>
        <div className={BODY}>
          <p className="font-sans font-bold text-lg mb-2">Process:</p>
          <div className="grid gap-4">
            {[
              <>
                <strong>Order Placement</strong>: Buyer places an order, triggering a smart contract.
              </>,
              <>
                <strong>Shipment Tracking</strong>: IoT sensors monitor the shipment and update the blockchain.
              </>,
              <>
                <strong>Delivery Confirmation</strong>: Upon delivery, the smart contract releases payment to the
                supplier.
              </>,
              <>
                <strong>Documentation</strong>: All transactions and terms are recorded immutably on the blockchain.
              </>,
              <>
                <strong>Post-purchase Services</strong>: Product support, returns, etc.
              </>,
            ].map((item, i) => {
              const isLit = i === activeAmazonStep;
              return (
                <div
                  key={i}
                  aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-3 text-xl transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 4: REAL ESTATE & NFTS
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Real Estate & NFTs" />

      <Slide id="nfts" label="DIGITAL OWNERSHIP" title="NFTs">
        <Row cols="lg:grid-cols-[1.15fr_1fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.28rem] flex flex-col gap-4`}>
            {[
              <>Non-Fungible Tokens</>,
              <>Popularity and adoption surged in 2021 with celebrity adoption</>,
              <>Used for status signaling</>,
              <>Verifiable certificate of ownership</>,
            ].map((item, i) => {
              const rowIdx = i === 0 ? 0 : i - 1;
              const isLit = rowIdx === activeNft;
              return (
                <p
                  key={i}
                  onClick={() => setActiveNft(rowIdx)}
                  className={`cursor-pointer border-t-2 pt-3 transition-colors ${
                    isLit ? "border-[var(--dt-signal)] font-sans font-bold" : "border-[var(--dt-ink)]"
                  }`}
                >
                  {item}
                </p>
              );
            })}
          </div>
          <PlateWell>
            <NftOverviewInteractive active={activeNft} onSelect={setActiveNft} />
          </PlateWell>
        </Row>
      </Slide>

      <DiscussionList
        id="smart-contracts-in-real-estate-questions"
        questions={[
          "If you own a house, how do you prove to others that you are the owner?",
          "What if somebody forged a deed? What resort do you have?",
          "What are some of the challenges when you wish to sell your house?",
        ]}
      />

      <Slide
        id="smart-contracts-in-real-estate"
        label="REAL ESTATE"
        title="Smart Contracts in Real Estate"
        exercise={exercise["smart-contracts-in-real-estate"]}
      >
        <Row cols="lg:grid-cols-[1.45fr_1fr]">
          <div className="font-sans text-sm md:text-[0.95rem] leading-[1.45] [&_strong]:font-sans [&_strong]:font-bold">
            <table className="w-full border-collapse border border-[var(--dt-ink)]/15">
              <thead>
                <tr className="bg-[var(--dt-ink)] text-[var(--dt-white)] text-left">
                  <th className="p-2.5 font-sans font-bold">
                    Feature
                  </th>
                  <th className="p-2.5 font-sans font-bold">
                    Traditional Contracts
                  </th>
                  <th className="p-2.5 font-sans font-bold">
                    Smart Contracts
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Execution",
                    trad: "Manually executed. Signed on paper or digital formats.",
                    smart: "Automatically executed when predefined conditions are met.",
                  },
                  {
                    feature: "Trust Requirement",
                    trad: "Requires trust in intermediaries (e.g., brokers, attorneys).",
                    smart: "Trust is minimized. Relies on blockchain technology for security.",
                  },
                  {
                    feature: "Involvement of Intermediaries",
                    trad: "Often requires multiple intermediaries (lawyers, notaries).",
                    smart: "Reduces or eliminates need for intermediaries, speeding up processes.",
                  },
                  {
                    feature: "Timeframe for Transactions",
                    trad: "Can take weeks or months to complete due to manual processing.",
                    smart: "Can be completed in minutes to hours through automation.",
                  },
                  {
                    feature: "Cost",
                    trad: "Often associated with higher costs due to intermediary fees.",
                    smart: "Lowers costs by minimizing fees related to third parties.",
                  },
                  {
                    feature: "Dispute Resolution",
                    trad: "Generally requires legal action or mediation in case of disputes.",
                    smart: "Built-in mechanisms can provide automated dispute resolution.",
                  },
                  {
                    feature: "Data Security",
                    trad: "Vulnerable to forgery and data manipulation.",
                    smart: "High security with immutable records on the blockchain.",
                  },
                ].map((r, i) => {
                  const isLit = i === activeReRow;
                  return (
                    <tr
                      key={r.feature}
                      onClick={() => setActiveReRow(i)}
                      className={`border-t border-[var(--dt-ink)]/15 cursor-pointer transition-colors ${
                        isLit ? "bg-[var(--paper-2)]" : ""
                      }`}
                    >
                      <td className="p-2.5 font-sans font-bold">
                        <strong>{r.feature}</strong>
                      </td>
                      <td className="p-2.5">{r.trad}</td>
                      <td className="p-2.5">{r.smart}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <PlateWell>
            <RealEstateComparisonPlate active={activeReRow} onSelect={setActiveReRow} />
          </PlateWell>
        </Row>
      </Slide>

      {/* ================================================================
          CHAPTER 5: FINANCIAL SERVICES & LEGAL CONTRACTS
          ================================================================ */}
      <ChapterBand id="ch5" number="05" title="Financial Services & Legal Contracts" />

      <DiscussionList
        id="smart-contracts-in-financial-services-questions"
        questions={[
          "Imagine you are planning on buying a home. To secure the funds, you explore different mortgage options. What challenges you might face when researching the best mortgage option?",
          "As a car owner, you have car insurance. If a collision occurs, what are the steps necessary to receive compensation? How can these steps be simplified using blockchain?",
        ]}
      />

      <Slide
        id="smart-contracts-in-financial-services"
        label="FINANCIAL SERVICES"
        title="Smart Contracts in Financial Services"
      >
        <p className={`${BODY} text-lg border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
          Automate loan disbursements or insurance claims based on predefined conditions.
        </p>
        <PlateWell>
          <FinancialServicesInteractive active={activeFinTab} onSelect={setActiveFinTab} />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-2 gap-6 md:gap-10`}>
          <div
            onClick={() => setActiveFinTab(0)}
            className={`cursor-pointer border-t-2 pt-4 transition-colors ${
              activeFinTab === 0 ? "border-[var(--counter)]" : "border-[var(--dt-ink)]"
            }`}
          >
            <p className="font-sans font-bold text-xl mb-2">Issues of Traditional Systems</p>
            <Dashes
              items={[
                <>Costly processes due to manual interventions.</>,
                <>Lengthy processing times lead to frustrations among customers.</>,
              ]}
            />
          </div>
          <div
            onClick={() => setActiveFinTab(activeFinTab === 2 ? 2 : 1)}
            className={`cursor-pointer border-t-2 pt-4 transition-colors ${
              activeFinTab >= 1 ? "border-[var(--dt-signal)]" : "border-[var(--dt-ink)]"
            }`}
          >
            <p className="font-sans font-bold text-xl mb-2">Automate Processes:</p>
            <Dashes
              items={[
                <>
                  Loan disbursements triggered by conditions such as credit score or{" "}
                  document verification.
                </>,
                <>
                  Insurance claims paid automatically upon verification of required conditions.
                </>,
                <>
                  Enhance Transparency: All parties have access to the same information,{" "}
                  reducing disputes.
                </>,
              ]}
            />
          </div>
        </div>
      </Slide>

      <Slide
        id="bank-loan-approval-process"
        label="CASE EXAMPLE"
        title="Smart Contracts in Financial Services: Loan Approval"
        exercise={exercise["bank-loan-approval-process"]}
      >
        <Row cols="lg:grid-cols-[1.15fr_1fr]">
          <div className={`${BODY} flex flex-col gap-5`}>
            <p className="text-xl border-l-2 border-[var(--dt-ink)]/25 pl-4">
              A bank uses smart contracts to streamline the loan approval process.
            </p>
            <div className="border-t border-[var(--dt-ink)]/15 pt-4">
              <p className="font-sans font-bold text-xl mb-2">Process:</p>
              <Dashes
                items={[
                  <>Customer submits loan application.</>,
                  <>Smart contract verifies identity, credit score, and other conditions.</>,
                  <>Automatic loan disbursement upon confirmation.</>,
                ]}
              />
            </div>
            <div className="border-t border-[var(--dt-ink)]/15 pt-4">
              <p className="font-sans font-bold text-xl mb-2">Outcomes:</p>
              <Dashes
                items={[
                  <>Reduced processing time from days to minutes.</>,
                  <>Lower operational costs and less human error.</>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <BankLoanSimulatorInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <DiscussionList
        id="smart-contracts-in-legal-contracts-questions"
        questions={[
          "You want to create a website for your new startup. You are no software engineer, so you decide to hire a web developer.",
          "How can you create a contract that you and the web dev both agree on?",
          "When the web dev delivers your website, what potential issues can arise?",
          "How can you dispute and resolve those issues?",
        ]}
      />

      <Slide
        id="smart-contracts-in-legal-contracts"
        label="LEGAL CONTRACTS"
        title="Smart Contracts in Legal Contracts"
        exercise={exercise["smart-contracts-in-legal-contracts"]}
      >
        <p className={`${BODY} text-lg border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
          Automate the enforcement of contract terms, reducing the need for legal intervention.
        </p>
        <PlateWell>
          <LegalContractsInteractive active={activeLegalTab} onSelect={setActiveLegalTab} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            {
              key: "pair-1",
              tradHead: "Complexity and Length:",
              tradBody: "Traditional contracts often include lengthy, convoluted terms open to interpretation.",
              smartHead: "Automated Transactions:",
              smartBody: "Once predefined conditions are met, the contract executes automatically.",
            },
            {
              key: "pair-2",
              tradHead: "Need for Legal Intervention:",
              tradBody:
                "Many agreements require court involvement for enforcement, resulting in high costs and significant delays.",
              smartHead: "Examples of Conditions:",
              smartBody: "Payment terms met, delivery confirmation, performance milestones reached, etc.",
            },
            {
              key: "pair-3",
              tradHead: "Disputes and Misinterpretations:",
              tradBody:
                "Ambiguity leads to disputes between parties, often necessitating extensive legal processes.",
              smartHead: "Built-in Mechanisms:",
              smartBody: "Automatically resolve disputes through defined algorithms without needing to resort to courts.",
            },
          ].map((p, i) => {
            const isLit = i === activeLegalTab;
            return (
              <div
                key={p.key}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 grid md:grid-cols-2 gap-6 md:gap-10 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div className="border-l-2 border-[var(--counter)]/60 pl-4">
                  <p className="font-sans font-bold text-xl mb-1">{p.tradHead}</p>
                  <Dashes items={[<>{p.tradBody}</>]} />
                </div>
                <div className="border-l-2 border-[var(--dt-signal)]/60 pl-4">
                  <p className="font-sans font-bold text-xl mb-1">{p.smartHead}</p>
                  <Dashes items={[<>{p.smartBody}</>]} />
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 6: VOTING, INTELLECTUAL PROPERTY & OTHER USE CASES
          ================================================================ */}
      <ChapterBand id="ch6" number="06" title="Voting, Intellectual Property & Other Use Cases" />

      <DiscussionList
        id="smart-contracts-in-voting-systems-questions"
        questions={[
          "What are the issues the in the traditional voting systems?",
          "How are these issues usually resolved?",
          "What steps can be taken to mitigate these issues?",
        ]}
      />

      <Slide
        id="smart-contracts-in-voting-systems"
        label="VOTING SYSTEMS"
        title="Smart Contracts in Voting Systems"
        exercise={exercise["smart-contracts-in-voting-systems"]}
      >
        <p className={`${BODY} text-lg border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
          Ensure transparent and tamper-proof vote counting.
        </p>
        <PlateWell>
          <VotingSystemsInteractive active={activeVotingTab} onSelect={setActiveVotingTab} />
        </PlateWell>
        <div className={`${BODY} grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-8`}>
          <div className="border-t-2 border-[var(--counter)] pt-3">
            <p className="font-sans font-bold text-lg mb-1.5">The Challenge in Traditional Voting Systems</p>
            <Dashes
              items={[
                <>
                  Vulnerability to Fraud: Traditional voting methods are susceptible to{" "}
                  ballot tampering, miscounts, and fraud.
                </>,
                <>
                  Lack of Transparency: Voters and stakeholders often lack visibility into the vote counting process,
                  undermining trust.
                </>,
                <>
                  Complexity and Inefficiency: Manual counting processes can lead to errors and{" "}
                  delays in results.
                </>,
                <>Post-Election Disputes: Controversies arise from ambiguous voting procedures and results.</>,
              ]}
            />
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3 grid">
            {[
              <p key="immutable" className="text-lg">
                <strong>Immutable Ledger</strong>: Central feature that ensures all votes are recorded and cannot be
                altered once submitted.
              </p>,
              <p key="decentralization" className="text-lg">
                <strong>Decentralization</strong>: Distributes data across multiple nodes, reducing the risk of
                centralized attacks.
              </p>,
              <p key="automated" className="text-lg">
                <strong>Automated Vote Counting</strong>: Smart contracts automatically tally votes once submitted,
                enabling real-time results.
              </p>,
              <p key="transparent" className="text-lg">
                <strong>Transparent Validation</strong>: Each vote can be tracked and verified by all stakeholders,
                ensuring transparency.
              </p>,
              <div key="condition" className="text-lg">
                <p>
                  <strong>Condition-Based Execution</strong>:
                </p>
                <Dashes
                  items={[
                    <>Smart contracts can enforce voting rules and requirements, such as eligibility verification.</>,
                  ]}
                />
              </div>,
            ].map((item, i) => {
              const isLit = i === activeVotingTab;
              return (
                <div
                  key={i}
                  aria-hidden={!isLit}
                  className={`col-start-1 row-start-1 transition-opacity duration-200 ${
                    isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </Slide>

      <DiscussionList
        id="smart-contracts-in-intellectual-property-management-questions"
        questions={[
          "Imagine you invented a new machine. What are some of the barriers for registering a patent?",
          "When you upload original content on YouTube, how can you ensure nobody else would steal your content and reupload it?",
        ]}
      />

      <Slide
        id="smart-contracts-in-intellectual-property-management"
        label="INTELLECTUAL PROPERTY"
        title="Smart Contracts in Intellectual Property Management"
      >
        <p className={`${BODY} text-lg border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
          Automate licensing and tracking of intellectual property usage.
        </p>
        <PlateWell>
          <IpManagementInteractive active={activeIpTab} onSelect={setActiveIpTab} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            <div key="barriers" className="grid md:grid-cols-3 gap-5">
              <div className="border-l-2 border-[var(--counter)]/60 pl-4">
                <p className="font-sans font-bold">Complexity of Contracts:</p>
                <Dashes items={[<>Licensing agreements often involve complicated terms and conditions.</>]} />
              </div>
              <div className="border-l-2 border-[var(--counter)]/60 pl-4">
                <p className="font-sans font-bold">Infringement Risks:</p>
                <Dashes items={[<>Difficulty in monitoring unauthorized use or infringement of IP rights.</>]} />
              </div>
              <div className="border-l-2 border-[var(--counter)]/60 pl-4">
                <p className="font-sans font-bold">Inefficiency in Enforcement:</p>
                <Dashes items={[<>Time-consuming legal processes to enforce rights and collect royalties.</>]} />
              </div>
            </div>,
            <p key="coded" className="text-xl">
              Self-executing contracts with the terms directly coded, automatically enforced when conditions are met.
            </p>,
            <div key="first" className="grid md:grid-cols-2 gap-6 text-xl">
              <p className="border-l-2 border-[var(--dt-signal)]/60 pl-4">
                Immutable records of ownership and rights.
              </p>
              <p className="border-l-2 border-[var(--dt-signal)]/60 pl-4">
                Who created in IP-protected content first.
              </p>
            </div>,
            <p key="royalties" className="text-xl">
              Automated enforcement of terms, such as licensing and royalties.
            </p>,
          ].map((item, i) => {
            const isLit = i === activeIpTab;
            return (
              <div
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="other-use-cases-of-smart-contracts"
        label="APPLICATIONS"
        title="Other Use Cases of Smart Contracts"
        exercise={exercise["other-use-cases-of-smart-contracts"]}
      >
        <PlateWell>
          <OtherUseCasesInteractive active={activeOtherTab} onSelect={setActiveOtherTab} />
        </PlateWell>
        <div className={`${BODY} grid gap-4`}>
          {[
            <div key="crowdfunding" className="text-xl">
              <p>
                Crowdfunding
              </p>
              <Dashes items={[<>Automatically release funds to projects upon reaching specified milestones.</>]} />
            </div>,
            <div key="charity" className="text-xl">
              <p>
                Donations and Charity
              </p>
              <Dashes
                items={[
                  <>
                    Disaster management: People send funds (Bitcoin) to organizers. Organizers use smart contracts and
                    blockchain to track the purchases made using funds ensuring transparency.
                  </>,
                ]}
              />
            </div>,
            <div key="education" className="text-xl">
              <p>
                Education
              </p>
              <Dashes items={[<>Automatically issue certificates upon course completion.</>]} />
            </div>,
          ].map((item, i) => {
            const isLit = i === activeOtherTab;
            return (
              <div
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t border-[var(--dt-ink)]/15 pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Slide>

      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "What are Blockchains?",
          "What are Smart Contracts?",
          "What business sectors can benefit from blockchains and smart contracts?",
        ]}
      />
    </main>
  );
}

