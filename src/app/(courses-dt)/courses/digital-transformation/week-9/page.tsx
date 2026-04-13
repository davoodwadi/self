import React from "react"
import {
  ProgressBar,
  FloatingNav,
  Hero,
  ChapterHeader,
  ZigzagContent,
  ConceptCardsZigzag,
  CinematicQuote,
  Conclusion
} from "@/components/presentation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import img1759 from "./1794_Morgenstern_Bauernhof_anagoria.jpg"
import img1890 from "./One Room Schoolhouse.jpg"
import img1932 from "./medium-sized-jpeg-27.jpg"
import img2006 from "./180719111041-02-file-2000s-restricted.jpg"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "1st Revolution" },
  { id: "ch2", label: "2nd Revolution" },
  { id: "ch3", label: "3rd Revolution" },
  { id: "ch4", label: "Industry 4.0" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek9() {
  return (
    <main className="theme-obsidian-gold relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
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
        category="WEEK 09 — DIGITAL TRANSFORMATION"
        title="Industry 4.0"
        subtitle="From the First Industrial Revolution to the Digital Age"
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="The First Industrial Revolution"
        description="The transition from agrarian societies to mechanized production powered by steam."
        altBg={true}
      />

      <ZigzagContent
        label="MECHANIZATION & STEAM"
        title="The Dawn of Industry"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Place yourself in 1759 Canada. As an individual, what jobs are available to you? Which career path would you choose in a pre-industrial society where human and animal labor dominate?
              </p>
            )
          },
          {
            type: "image",
            imageUrl: img1759
          },
          {
            type: "text",
            content: (
              <p>
                The First Industrial Revolution (18th-19th Century) introduced the mechanization of production. The development of the steam engine revolutionized transportation and manufacturing, while large-scale centralized factories replaced small cottage industries.
              </p>
            )
          },
          {
            type: "insight",
            label: "KEY COMPONENTS",
            content: "The textile industry boom, driven by inventions like the spinning jenny, was supported by exponential growth in ironworks and coal mining, and faster movement of goods via railroads and canals."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Urbanization", description: "People moved en masse to cities for factory jobs, leading to unprecedented rapid urban growth and new societal structures." },
          { number: "02", title: "Rise of the Working Class", description: "A new class of industrial workers emerged, often working in harsh conditions that eventually led to labor movements." },
          { number: "03", title: "Increased Trade", description: "Widespread availability of manufactured goods improved standards of living for some, alongside faster mobility via railways." },
          { number: "04", title: "Environmental Effects", description: "The heavy reliance on coal and iron resulted in increased pollution and widespread deforestation due to industrial activity." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="It is 1890. The Industrial Revolution has just happened. How would you transition from your current job to a new one? Which career path would you take?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="The Second Industrial Revolution"
        description="Mass production, widespread electrification, and the birth of modern transportation."
        altBg={true}
      />

      <ZigzagContent
        label="MASS PRODUCTION"
        title="Electrification & Assembly Lines"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "image",
            imageUrl: img1890
          },
          {
            type: "text",
            content: (
              <p>
                The Second Industrial Revolution brought mass production and the assembly line. Standardized processes made products cheaper, while Henry Ford’s assembly line in 1913 revolutionized automobile production, drastically reducing costs and assembly time.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Widespread electrification replaced steam as the primary power source, leading to new industries and consumer products. It enabled efficient lighting, factory machinery, and communication systems that operated around the clock.
              </p>
            )
          },
          {
            type: "insight",
            label: "MATERIALS & CHEMICALS",
            content: "Innovations in steel production (the Bessemer Process) led to skyscrapers and modern railroads, while advances in the chemical industry paved the way for modern medicine, fertilizers, and synthetic materials."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { number: "01", title: "Electric Light Bulb", description: "Invented by Thomas Edison in 1879, it enabled night-time work, extended productivity, and fundamentally changed human sleep patterns." },
          { number: "02", title: "Internal Combustion Engine", description: "Powered automobiles and transformed transportation, leading to modern commercial travel and the decline of horse-drawn transit." },
          { number: "03", title: "Radio Waves", description: "Guglielmo Marconi transmitted the first wireless communication in 1895, setting the stage for global broadcasting." },
          { number: "04", title: "Global Communication", description: "Samuel Morse's telegraph and Alexander Graham Bell's telephone accelerated global communication, shrinking the world." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="It is 1932. How is your job impacted now? In what aspects has it improved? In what aspects has it worsened?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="The Third Industrial Revolution"
        description="The digital revolution, computing, and the creation of the world wide web."
        altBg={true}
      />

      <ZigzagContent
        label="DIGITAL COMPUTING"
        title="The Information Age"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "image",
            imageUrl: img1932
          },
          {
            type: "text",
            content: (
              <p>
                The Third Industrial Revolution (1960s-Present) leverages digital computing, automation, and the internet to transform industries. The invention of the transistor (1947) and microprocessor (1971) enabled the development of personal computers.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Industries began integrating robots and automated systems for manufacturing, reducing human labor while increasing efficiency. The invention of the internet (1969) and World Wide Web (1990) fundamentally transformed how businesses and people interact globally.
              </p>
            )
          },
          {
            type: "insight",
            label: "INNOVATION REPLACES INVENTION",
            content: "We shifted from creating entirely new physical tools to innovating on top of digital platforms, utilizing Big Data, Artificial Intelligence, and Renewable Energy for smarter decision-making."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Personal Computers", description: "The 1970s and 1980s enabled businesses and individuals to access computing power, democratizing technology processing." },
          { number: "02", title: "The Internet", description: "The 1990s onward changed communication, commerce, and social interactions, connecting the entire globe instantaneously." },
          { number: "03", title: "Mobile Technology", description: "The 2000s saw smartphones and wireless networks revolutionize accessibility, putting the internet in everyone's pocket." },
          { number: "04", title: "E-Commerce", description: "Platforms like Amazon and Alibaba transformed global trade, allowing digital storefronts to reach worldwide audiences." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="It is 2006. How would your job adapt to the Third Industrial Revolution?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 4 */}
      <ChapterHeader
        id="ch4"
        number="04"
        title="The Fourth Industrial Revolution"
        description="Industry 4.0: Blurring the lines between physical, digital, and biological spheres."
        altBg={true}
      />

      <ZigzagContent
        label="INDUSTRY 4.0"
        title="Cyber-Physical Systems"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "image",
            imageUrl: img2006
          },
          {
            type: "text",
            content: (
              <p>
                The Fourth Industrial Revolution is characterized by Artificial Intelligence, Machine Learning, and the Internet of Things (IoT). Smart factories now use machines that self-diagnose issues and optimize operations autonomously without human intervention.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Big Data and Cloud Computing enable real-time supply chain optimization. Blockchain and decentralized technologies provide immutable tracking, while Advanced Robotics and Biotechnology are driving human-machine integration to unprecedented levels.
              </p>
            )
          },
          {
            type: "insight",
            label: "ETHICAL CHALLENGES",
            content: "As AI and automation replace millions of jobs, we face critical challenges regarding cybersecurity, data privacy, algorithmic bias, and the urgent need for workforce reskilling."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Hyper-Personalization", description: "AI enables better customization of products and services for individual consumers at scale, from content recommendations to medicine." },
          { number: "02", title: "Smart Cities", description: "Urban management improves with IoT-enabled infrastructure and digital governance, optimizing traffic, energy use, and public safety." },
          { number: "03", title: "New Business Models", description: "Growth of platform economies like Uber and subscription-based services like Netflix have fundamentally changed how value is delivered." },
          { number: "04", title: "Quantum Computing", description: "Next-generation computational power combined with 5G networks will enable breakthroughs in cryptography, material science, and AI diagnostics." }
        ]}
        altBg={true}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="The industrial revolutions have progressively transformed human labor and society. From steam and mechanization in the 18th century, to electricity and mass production, then digital computing, and now AI and IoT in Industry 4.0. Each phase brought profound societal shifts, unlocking new capabilities while raising complex challenges in ethics, privacy, and workforce disruption."
        takeaways={[
          "The First Revolution mechanized production using water and steam power.",
          "The Second Revolution created mass production powered by electricity.",
          "The Third Revolution automated production using electronics and IT.",
          "The Fourth Revolution integrates physical, digital, and biological systems through AI and IoT."
        ]}
      />
    </main>
  )
}
