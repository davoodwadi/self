import React from "react"
import {
  ProgressBar,
  FloatingNav,
  Hero,
  ChapterHeader,
  ZigzagContent,
  ConceptCardsZigzag,
  CinematicQuote,
  DataBlock,
  Conclusion
} from "@/components/presentation"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Threat Landscape" },
  { id: "ch2", label: "CRA Case Study" },
  { id: "ch3", label: "Ethics in AI" },
  { id: "ch4", label: "Social Issues" },
  { id: "conclusion", label: "Summary" }
] 

export default function DigitalTransformationWeek10() {
  return (
    <main className="theme-emerald-academy relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
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
        category="WEEK 10 — DIGITAL TRANSFORMATION"
        title="Cyber Security, Ethics and Social Issues"
        subtitle="Navigating the complex landscape of digital transformation risks, ethical AI, and environmental impacts."
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="The Evolving Threat Landscape"
        description="Analyzing cybersecurity risks and governance frameworks in digitally transformed businesses."
        altBg={true}
      />

      <ZigzagContent
        label="SECURITY RISKS"
        title="Expansion of the Attack Surface"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                The attack surface is rapidly expanding through IoT device manipulation, widespread cloud adoption, and remote work infrastructure. These fundamental shifts demand robust and adaptable governance frameworks.
              </p>
            )
          },
          {
            type: "insight",
            label: "ECONOMIC IMPACT",
            content: "Cybersecurity breaches affect far more than just IT infrastructure—they fundamentally damage business operations, economic stability, and organizational reputation."
          },
          {
            type: "text",
            content: (
              <p>
                Organizations face sophisticated cyber threats that specifically target critical infrastructure. The emergence of new attack vectors requires constant vigilance and proactive defense mechanisms.
              </p> 
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        cards={[
          { number: "01", title: "State-Sponsored Attacks", description: "Highly sophisticated, well-funded cyber operations conducted by nation-states targeting critical infrastructure and intellectual property." },
          { number: "02", title: "Ransomware", description: "Malicious software designed to block access to a computer system or data until a substantial sum of money is paid." },
          { number: "03", title: "Supply Chain Vulnerabilities", description: "Exploiting weaknesses in third-party software or hardware providers to compromise the broader target organization's network." }
        ]}
        altBg={true}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Case Study: CRA Data Leak"
        description="Analyzing the real-world impact of data breaches and the critical importance of privacy compliance."
        altBg={false}
      />

      <ZigzagContent
        label="REAL-WORLD IMPACT"
        title="The H&R Block Canada Breach"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Dating back to 2020, hackers obtained confidential data used by H&R Block Canada, leading to unauthorized access. Imposters successfully changed direct deposit information and stole over $6 million in fraudulent refunds.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                The Canadian Revenue Agency (CRA) confirmed that an internal error led to the exposure of over 30,000 Canadian taxpayers' personal information, including Social Insurance Numbers (SIN) and highly sensitive financial details.
              </p>
            )
          },
          {
            type: "insight",
            label: "THE PRIVACY ACT",
            content: "An investigation is ongoing. The Office of the Privacy Commissioner of Canada (OPC) is actively examining whether the CRA met its legal obligations under the Privacy Act."
          }
        ]}
      />

      <CinematicQuote
        quote="Research a recent cyber security breach. Who caused it? What vulnerability enabled it? How could it have been prevented?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="Ethics in Digital Transformation"
        description="Evaluating the ethical implications of emerging technologies and data-driven business models."
        altBg={true}
      />

      <ZigzagContent
        label="PRIVACY & AI"
        title="Data Minimization and Governance"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Modern digital business models often rely on extensive data collection. Privacy by design methodologies advocate for data minimization: instead of simply protecting collected data, avoid collecting unnecessary data altogether.
              </p>
            )
          },
          {
            type: "insight",
            label: "THE PRIVACY PARADOX",
            content: "Personalization requires personal data, but privacy demands minimal data collection. Finding the right balance between these competing needs is a critical ethical challenge."
          },
          {
            type: "text",
            content: (
              <p>
                Algorithm governance is essential for ethical AI. Models must demonstrate transparency and explainability, ensuring that automated decision-making processes are clear, unbiased, and subject to human oversight.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "1", title: "Social Bias", description: "AI systems replicating or amplifying existing social prejudices and historical inequalities present in the training data." },
          { number: "2", title: "Racial Bias", description: "Disproportionate outcomes or discriminatory patterns affecting specific racial groups due to unrepresentative datasets." },
          { number: "3", title: "Gender Bias", description: "Algorithms making skewed predictions or recommendations that unfairly target, stereotype, or exclude based on gender." },
          { number: "4", title: "Cognitive Bias", description: "Human cognitive flaws inadvertently embedded into the design or evaluation of AI models, leading to systematically flawed reasoning." }
        ]}
        altBg={true}
      />

      {/* CHAPTER 4 */}
      <ChapterHeader
        id="ch4"
        number="04"
        title="Social Issues & Sustainability"
        description="Addressing broader societal impacts, including misinformation, digital monopolies, and the carbon footprint of AI."
        altBg={false}
      />

      <ZigzagContent
        label="SOCIETAL IMPACT"
        title="Trust, Power, and the Environment"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                The era of Generative AI has brought unprecedented challenges regarding misinformation and synthetic media. Even professional reports sometimes hallucinate events, fundamentally complicating truth and digital information integrity.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Corporations face the difficult responsibility of content moderation, constantly balancing the urgent need to battle misinformation against the ethical risks of overreaching censorship.
              </p>
            )
          },
          {
            type: "insight",
            label: "DIGITAL MONOPOLIES",
            content: "Network effects create winner-takes-all dynamics. In 2024, hosting a website typically required relying on one of the top five cloud computing giants, raising concerns about centralization of power."
          }
        ]}
      />

      <DataBlock label="ENVIRONMENTAL SUSTAINABILITY" title="The Soaring Cost of AI Training" altBg={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-xl border border-border">
            <span className="text-display text-highlight mb-4">$930</span>
            <span className="text-label">Transformer Model (2017)</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-xl border border-border">
            <span className="text-display text-highlight mb-4">$78M+</span>
            <span className="text-label">GPT-4 Training (2023)</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-xl border border-border">
            <span className="text-display text-highlight mb-4">2x-3x</span>
            <span className="text-label">Annual Growth Factor</span>
          </div>
        </div>
        <p className="text-caption text-center max-w-3xl mx-auto">
          Training costs for frontier AI models are rising exponentially. GPT-3 (2020) cost approximately $2M-$4.6M, while Gemini Ultra (2023) ranged from $30M to $191M. If this trend continues, the largest training runs could exceed a billion dollars by 2027.
        </p>
      </DataBlock>

      {/* CONCLUSION & REFERENCES */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Digital transformation brings profound cybersecurity threats and significant ethical responsibilities. As AI and cloud technologies rapidly advance, organizations must actively address algorithmic bias, defend information integrity, and mitigate the escalating environmental impacts of computing."
        takeaways={[
          "Cybersecurity threats like ransomware and supply chain attacks have severe economic impacts.",
          "Ethical AI requires transparency, explainability, and the proactive elimination of algorithmic biases.",
          "The environmental footprint of AI models is growing exponentially, demanding sustainable computing practices.",
          "Digital monopolies and synthetic media pose significant new challenges to societal trust and information integrity."
        ]}
      />

    </main>
  )
}
