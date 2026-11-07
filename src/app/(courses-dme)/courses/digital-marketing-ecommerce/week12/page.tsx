"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { CookieBanners, ConsentRouting, RetentionPurge, ReplicaLaunch, AgentGate, DelegationMandate, AgentShare, AuditSampling, TwelveWeeks } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";
const SPLIT = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12";
const TWO = "grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10";

function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>;
}

function PartSlide({ id, n, title, lines }: { id: string; n: number; title: string; lines: React.ReactNode[] }) {
  return (
    <Slide id={id} border className="!py-8">
      <PartHead n={n} title={title} />
      <div className="mt-7 grid w-full max-w-[64rem] gap-6">
        {lines.map((l, i) => (
          <Ruled key={i}><p className={BIG}>{l}</p></Ruled>
        ))}
      </div>
    </Slide>
  );
}

export default function Week12Page() {
  return (
    <SlideDeck label="Week 12">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 12: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">Privacy, Platform Governance, and the Future of Agentic Commerce</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Privacy law, platform competition rules, and autonomous AI agents are reshaping digital commerce around verifiable consent, open protocols, and business-to-agent strategy.
        </p>
      </Slide>

      <Slide id="the-structural-transformation-of-digital-markets" border className="!py-8">
        <SlideHeading>The Structural Transformation of Digital Markets</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 [&_p]:!text-[1.2rem]">
          <Ruled><P>For its first quarter-century, commercial growth on the web relied on two permissive defaults, namely frictionless cross-site surveillance of human clicks and self-regulated platform marketplaces.</P></Ruled>
          <Ruled><P>Today, both defaults have ended, as comprehensive data privacy statutes and digital competition laws enforce strict boundaries on how customer data are collected and how dominant platforms rank products.</P></Ruled>
          <Ruled><P>Simultaneously, the interface of commerce is undergoing its most profound shift since the mobile smartphone, moving from human-operated web browsers to autonomous AI agents that search, negotiate, and transact on the buyer&apos;s behalf.</P></Ruled>
          <Ruled><P>This final week synthesizes how privacy governance, marketplace regulation, and <Term>business-to-agent (B2A)</Term> architecture define the next era of digital marketing and e-commerce.</P></Ruled>
        </div>
      </Slide>

      <PartSlide
        id="part-1"
        n={1}
        title="Privacy Regulation and Consent Architectures"
        lines={[
          <>Personal data in CRM systems, CDPs, and ad networks are not unregulated corporate property. They are subject to <Term>statutory rights</Term> held by the individuals those records describe.</>,
          "Operating an e-commerce store across jurisdictions requires translating legal privacy principles into concrete software and data-pipeline rules.",
        ]}
      />

      <Slide id="gdpr-ccpa-cpra-pipeda-and-quebec-law-25" border className="!py-8" exercise={exercise["gdpr-ccpa-cpra-pipeda-and-quebec-law-25"]}>
        <SlideHeading>GDPR, CCPA/CPRA, PIPEDA, and Quebec Law 25</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>The European Union&apos;s <Term>General Data Protection Regulation (GDPR)</Term> establishes an opt-in regime requiring a valid legal basis (such as freely given, specific, informed, and unambiguous consent) before non-essential tracking cookies or marketing profiles can be activated, backed by fines of up to 4 percent of global annual turnover.</P></Ruled>
            <Ruled><P>California&apos;s <Term>Consumer Privacy Act and Privacy Rights Act (CCPA/CPRA)</Term> establish consumer rights to know what data are collected, to request deletion, and to opt out of the &quot;sale or sharing&quot; of personal information for cross-context behavioral advertising, including honoring browser-level Global Privacy Control (GPC) signals.</P></Ruled>
            <Ruled><P>In Canada, the federal <Term>Personal Information Protection and Electronic Documents Act (PIPEDA)</Term>, Canada&apos;s Anti-Spam Legislation (CASL), and Quebec&apos;s Law 25 enforce meaningful consent, mandatory privacy impact assessments, strict opt-in rules for commercial electronic messages, and default privacy-by-design settings.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CookieBanners /></Plate>
            <Ruled><P>Across all of these frameworks, <Term>dark patterns</Term> on cookie banners (such as making &quot;Accept All&quot; a bright green button while hiding &quot;Reject Non-Essential&quot; behind multiple grey sub-menus) are increasingly prosecuted as unlawful consent manipulation.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="consent-management-platforms-cmps-and-data-minimization" border className="!py-6">
        <SlideHeading className="!mb-5">Consent Management Platforms (CMPs) and Data Minimization</SlideHeading>
        <div className={TWO}>
          <div className="grid content-start gap-3">
            <Ruled><P>A <Term>Consent Management Platform (CMP)</Term> is the technical gatekeeper on a storefront that displays jurisdiction-appropriate privacy notices, records the user&apos;s granular consent choices, and blocks analytics and advertising tags from firing until affirmative permission is granted.</P></Ruled>
            <Plate><ConsentRouting /></Plate>
            <Ruled><P>In modern tag management architectures, <Term>consent state</Term> is passed downstream with every server-side event so the CDP and ad platforms automatically suppress unconsented profiling.</P></Ruled>
          </div>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Data minimization and purpose limitation</Term> require e-commerce firms to collect only the customer attributes genuinely needed for the stated service and to purge or anonymize personal records once their retention purpose expires, reducing both regulatory liability and data-breach exposure.</P></Ruled>
            <Plate><RetentionPurge /></Plate>
          </div>
        </div>
      </Slide>

      <PartSlide
        id="part-2"
        n={2}
        title="Platform Governance, Gatekeepers, and Fair Competition"
        lines={[
          <>When a single e-commerce marketplace or search ecosystem mediates a large share of transactions in an economy, it acts not merely as a market participant, but as the <Term>private regulator</Term> of that market.</>,
          "Dual-role platforms that simultaneously operate the marketplace referee system and sell their own competing first-party products face structural conflicts of interest.",
        ]}
      />

      <Slide id="self-preferencing-seller-data-appropriation-and-gatekeeper-regulation" border className="!py-8" exercise={exercise["self-preferencing-seller-data-appropriation-and-gatekeeper-regulation"]}>
        <SlideHeading>Self-Preferencing, Seller Data Appropriation, and Gatekeeper Regulation</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Self-preferencing</Term> occurs when a dominant platform manipulates its search ranking, recommendation carousels, or Buy Box eligibility rules to favor its own private-label goods or first-party services over competing third-party sellers.</P></Ruled>
            <Ruled><P><Term>Seller data appropriation</Term> occurs when a marketplace inspects non-public transaction, pricing, and search-query data generated by independent third-party merchants to identify profitable niche products and launch competing private-label replicas.</P></Ruled>
            <Ruled><P><Term>Tying and anti-steering rules</Term> occur when a platform conditions organic search visibility on a seller purchasing the platform&apos;s own fulfillment or advertising services, or prohibits merchants from informing customers about lower prices available on the merchant&apos;s own Direct-to-Consumer website.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><ReplicaLaunch /></Plate>
            <Ruled><P>Regulatory frameworks such as the European Union&apos;s Digital Markets Act (DMA) and Digital Services Act (DSA), alongside antitrust enforcement in North America, designate dominant platforms as <Term>gatekeepers</Term>, prohibiting self-preferencing and misuse of third-party seller data while mandating algorithmic ranking transparency.</P></Ruled>
          </div>
        </div>
      </Slide>

      <PartSlide
        id="part-3"
        n={3}
        title="Business-to-Agent (B2A) Commerce Architecture"
        lines={[
          "Throughout this course, the lectures have traced how AI shopping agents interact with each layer of digital marketing, from storefront markup and search answers to rankings, reviews, pricing, and delivery promises.",
          <>As agentic commerce matures, leading merchants are moving from passively allowing bots to scrape HTML pages to building dedicated <Term>Business-to-Agent (B2A)</Term> commercial interfaces.</>,
        ]}
      />

      <Slide id="authenticated-delegation-agent-apis-and-machine-to-machine-checkout" border className="!py-6" exercise={exercise["authenticated-delegation-agent-apis-and-machine-to-machine-checkout"]}>
        <SlideHeading className="!mb-5">Authenticated Delegation, Agent APIs, and Machine-to-Machine Checkout</SlideHeading>
        <div className={TWO}>
          <div className="grid content-start gap-3">
            <Ruled><P>In early web scraping, automated bots impersonated human browsers, creating security friction with anti-bot firewalls (CAPTCHAs) that could not distinguish a malicious credential-stuffing bot from a legitimate customer&apos;s shopping assistant.</P></Ruled>
            <Plate><AgentGate /></Plate>
            <Ruled><P><Term>Authenticated agent delegation</Term> protocols resolve this tension by issuing cryptographic tokens that prove an AI agent is acting on behalf of a verified human principal with bounded authority (e.g., authorized to spend up to $150 on household staples at approved merchants).</P></Ruled>
          </div>
          <div className="grid content-start gap-3">
            <Ruled><P>Dedicated <Term>catalog and negotiation APIs</Term> (including emerging standards such as <C>llms.txt</C>, structured Model Context Protocol endpoints, and real-time merchant feeds) allow AI agents to query live inventory, exact unit prices, compatibility constraints, and bundled discounts without parsing heavy visual web templates.</P></Ruled>
            <Ruled><P><Term>Delegated payment credentials</Term> (such as single-use virtual card tokens generated by payment networks specifically for an approved agent transaction) enable secure, auditable machine-to-machine checkout with clear liability rules.</P></Ruled>
            <Plate><DelegationMandate /></Plate>
          </div>
        </div>
      </Slide>

      <Slide id="how-marketing-strategy-shifts-in-a-b2a-world" border className="!py-8">
        <SlideHeading>How Marketing Strategy Shifts in a B2A World</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>When a human shops directly, brand equity works partly through emotional advertising, visual packaging, and <Term>habitual inertia</Term> that discourages comparison shopping.</P></Ruled>
            <Ruled><P>When an AI agent shops on the human&apos;s behalf, comparison across ten merchants takes milliseconds, stripping away pure search-friction advantages and forcing brands to compete on verifiable product performance, transparent landed pricing, authentic review consensus, and reliable fulfillment.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><AgentShare /></Plate>
            <Ruled><P><Term>Brand building remains vital</Term> in B2A markets for two reasons, namely that consumers frequently specify trusted brands directly inside their delegation prompts (&quot;Buy me Sony or Bose noise-canceling headphones&quot;), and foundation models rely on authoritative external brand reputation across the web when constructing candidate shortlists.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-designing-a-b2a-strategy-for-a-mid-sized-brand" border className="!py-8">
        <SlideHeading>Discussion: Designing a B2A Strategy for a Mid-Sized Brand</SlideHeading>
        <Discussion
          scenario={"Suppose you are the Chief Digital Officer of a mid-sized kitchen appliance manufacturer. Over the next three years, industry forecasts project that 30 percent of category discovery and product comparison will be conducted by consumers' personal AI agents rather than human browser sessions."}
          question={"How would you reallocate your budget across paid search, traditional display ads, structured product data engineering, review verification, and authorized agent checkout APIs to win in a Business-to-Agent market?"}
        />
      </Slide>

      <PartSlide
        id="part-4"
        n={4}
        title="Auditing Storefronts and Marketing Algorithms"
        lines={[
          "Because both merchant algorithms (pricing, personalization, CRM triggers) and buyer-side AI agents operate stochastically at scale, managers cannot rely on intuition or single-prompt spot checks to verify system behavior.",
          <>Pre-deployment and continuous <Term>behavioral auditing</Term> closes the governance loop.</>,
        ]}
      />

      <Slide id="behavioral-auditing-of-digital-marketing-and-agentic-systems" border className="!py-8" exercise={exercise["behavioral-auditing-of-digital-marketing-and-agentic-systems"]}>
        <SlideHeading>Behavioral Auditing of Digital Marketing and Agentic Systems</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Auditing merchant-side algorithms</Term> tests whether ad delivery, dynamic pricing, and CRM targeting exhibit disparate impact across demographic groups, engage in tacit price coordination, or deploy deceptive dark patterns.</P></Ruled>
            <Ruled><P>Auditing how external AI answer engines and shopping agents represent the firm&apos;s brand requires <Term>repeated Monte-Carlo sampling</Term> and controlled factorial experiments across prompts, roles, and ranking contexts, because a single LLM response is a noisy draw from a probability distribution rather than a stable measurement (Wadi &amp; Fredette, 2025).</P></Ruled>
            <Ruled><P>By systematically varying product rank position, sponsorship labels, price framing, and attribute placement in controlled sandbox storefronts, marketers and regulators can quantify position bias, sponsorship penalties, and information acquisition failures in AI shopping agents (Wadi &amp; Ma, 2026a, 2026b, 2026c).</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><AuditSampling /></Plate>
            <Ruled><P><Term>Continuous monitoring dashboards</Term> track both human conversion metrics and agentic retrieval share, alerting teams when catalog schema errors or model updates shift how AI assistants recommend the brand.</P></Ruled>
          </div>
        </div>
      </Slide>

      <PartSlide
        id="part-5"
        n={5}
        title="Course Synthesis and the Integrated Digital Commerce System"
        lines={[
          <>Across twelve weeks, the course has examined digital marketing and e-commerce as an integrated <Term>socio-technical system</Term> combining marketing science and information systems engineering.</>,
          "Every layer of the system depends on the integrity of the layers beneath it.",
        ]}
      />

      <Slide id="connecting-the-twelve-weeks-of-digital-marketing-and-e-commerce" border className="!py-6">
        <SlideHeading className="!mb-5">Connecting the Twelve Weeks of Digital Marketing and E-Commerce</SlideHeading>
        <Plate className="mx-auto max-w-[54rem]"><TwelveWeeks /></Plate>
        <div className="mt-5 grid w-full gap-x-10 gap-y-3 md:grid-cols-2">
          <div className="contents">
            <Ruled><P><Term>Foundation and Storefront</Term> (Weeks 1 and 2) establish the business model (1P, 3P marketplace, D2C), the headless API and PIM/OMS stack, and the dual-audience storefront designed for human conversion and low-cost machine readability.</P></Ruled>
            <Ruled><P><Term>Discovery and Acquisition Channels</Term> (Weeks 3, 4, 5, and 6) govern how buyers and agents find products across organic and paid search (SEO/SEM/GEO), marketplace recommenders and retail media rankings, programmatic RTB ad exchanges, and algorithmic social feeds and creator partnerships.</P></Ruled>
            <Ruled><P><Term>Relationship, Trust, and Commercial Levers</Term> (Weeks 7, 8, and 9) convert one-time buyers into long-term equity through CDP/CRM lifecycle automation, scientifically designed online review solicitation and incentive programs, and disciplined pricing and promotional framing.</P></Ruled>
            <Ruled><P><Term>Operations, Measurement, and Governance</Term> (Weeks 10, 11, and 12) ground digital promises in omnichannel fulfillment and reverse logistics, evaluate performance through unit economics (CAC, CLV, contribution margin) and causal incrementality experiments, and govern the ecosystem under privacy law, fair platform competition, and Business-to-Agent readiness.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-building-a-resilient-digital-commerce-organization" border className="!py-8">
        <SlideHeading>Discussion: Building a Resilient Digital Commerce Organization</SlideHeading>
        <Discussion
          scenario={"Looking back across the entire course, consider an e-commerce company that excels at short-term paid acquisition hacks (aggressive retargeting, countdown dark patterns, sitewide discount codes, and incentivized 5-star reviews) versus a company that invests in headless structured data, incremental lift testing, authentic post-purchase lifecycle flows, and transparent unit economics."}
          question={"Why might the first company grow faster in its first six months, and why does the second architecture win over a five-year horizon across both human shoppers and AI shopping agents?"}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Privacy regulations (GDPR, CCPA/CPRA, PIPEDA, CASL, and Quebec Law 25) require verifiable consent, honest Consent Management Platform (CMP) interfaces, server-side consent propagation, and data minimization.",
            "Platform competition laws (such as the Digital Markets Act) constrain gatekeeper self-preferencing, seller data appropriation, and anti-steering rules on dual-role marketplaces.",
            "Business-to-Agent (B2A) commerce replaces adversarial bot scraping with authenticated agent delegation, machine-readable catalog and constraint APIs, and tokenized agent payment rails.",
            "In agent-mediated markets, brands win by combining strong consumer brand pull in delegation prompts with verifiable product specifications, transparent all-in pricing, and authentic review consensus.",
            "Statistically grounded behavioral audits using repeated sampling and factorial experiments allow firms to measure both internal algorithmic fairness and external AI agent recommendation behavior (Wadi & Fredette, 2025, Wadi & Ma, 2026a, 2026b, 2026c).",
            "Sustainable advantage in digital marketing and e-commerce comes from uniting marketing strategy with information systems architecture across acquisition, conversion, retention, fulfillment, and governance.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
