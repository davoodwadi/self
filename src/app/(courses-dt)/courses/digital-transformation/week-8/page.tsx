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

import pilotImage from "./5761.png"
import arvrImage from "./What-is-The-Future-of-Augmented-Reality-In-Our-Everyday-Life.jpg"
import swipeVsSweep from "./swipe vs sweep.png"
import darkSoulsImage from "./DARK-SOULS™-REMASTERED-5.png"
import progressBarsImage from "./progressBars.png"
import msFlightSim from "./97706ebe-894a-47d5-9720-ad1e18092076.jpg"
import guitarHero from "./sddefault.jpg"
import zombiesRun from "./Capture.png"
import militaryController from "./8218300.png"
import packbotController from "./1000w_q95.png"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Immersive Tech" },
  { id: "ch2", label: "Gamification" },
  { id: "ch3", label: "Cases & Ethics" }, 
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek8() {
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
        category="WEEK 08 — DIGITAL TRANSFORMATION"
        title="Immersive Technologies & Gamification"
        subtitle="Exploring AR, VR, Game Mechanics, and Their Ethical Implications in Business"
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Immersive Technologies"
        description="An overview of digital tools that simulate realistic environments and blend digital content with the physical world."
        altBg={true}
      />

      <ZigzagContent
        label="THEORETICAL FRAMEWORK"
        title="Simulating Reality"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "insight",
            label: "THE 10,000 HOUR PROBLEM",
            content: "Consider the challenge of becoming a pilot. Achieving proficiency requires immense time and resources, often cited as 10,000 hours of practice. How can technology accelerate this intensive learning process?"
          },
          {
            type: "image",
            imageUrl: pilotImage
          },
          {
            type: "text",
            content: (
              <p>
                Immersive technologies constitute a suite of digital tools and methodologies designed to create or augment user experiences. They achieve this by simulating realistic environments and facilitating interaction with virtual elements.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: arvrImage
          },
          {
            type: "text",
            content: (
              <p>
                By seamlessly blending digital content with the physical world, these technologies offer unprecedented opportunities for training, visualization, and consumer engagement.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Virtual Reality (VR)", description: "Utilizes headsets to create a fully computer-generated environment. Users are completely immersed in a virtual world through visual, auditory, and occasionally haptic feedback." },
          { number: "02", title: "Augmented Reality (AR)", description: "Overlays digital information or objects onto the real world. Enhances perception of surroundings, allowing interaction with both virtual and physical elements via devices like smartphones or smart glasses." }
        ]}
        altBg={true}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Principles of Gamification"
        description="The strategic application of game-design elements and mechanics within non-game contexts to drive behavior."
        altBg={false}
      />

      <ZigzagContent
        label="BEHAVIORAL DESIGN"
        title="Motivating Action"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Gamification leverages inherent human tendencies toward play, achievement, and social interaction. Its primary objective is to engage and motivate individuals to achieve specific goals, enhancing the overall user experience.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: swipeVsSweep
          },
          {
            type: "insight",
            label: "REFLECTION QUESTION",
            content: "Why are individuals more willing to endlessly swipe their phone screens than to sweep their floors? Gamification transforms mundane tasks to feel inherently more enjoyable and rewarding."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { title: "Points", description: "Earned for completing tasks or reaching milestones. They serve as a quantifiable, measurable form of progress and achievement." },
          { title: "Badges", description: "Visual representations of accomplishments. They provide immediate recognition and motivate continued participation." },
          { title: "Leaderboards", description: "Rank participants based on performance. Fosters healthy competition by tapping into the human desire for social comparison and status." },
          { title: "Challenges & Quests", description: "Structures standard tasks as adventures, creating engagement by motivating users to overcome obstacles and unlock rewards." },
          { title: "Levels & Progression", description: "Advancing through levels provides users with a distinct, sustained sense of progression over time." }
        ]}
        altBg={false}
      />

      <ZigzagContent
        label="PROGRESSION MECHANICS"
        title="Designing the Experience"
        startRight={false}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                The distinction between a challenging game and a tedious chore often lies in the design of progression. Immediate, clear feedback transforms frustration into engagement.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: darkSoulsImage
          },
          {
            type: "text",
            content: (
              <p>
                The design and implementation of progress indicators, such as progress bars, fundamentally influence user perception of advancement. A well-structured progression system provides continuous, measurable motivation.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: progressBarsImage
          }
        ]}
      />

      <CinematicQuote
        quote="Consider the structure of a two-year academic program. Does it provide sufficient feedback to foster a genuine sense of progression? How might gamification enhance the student journey?"
        author="Academic Reflection"
        altBg={false}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="Business Cases & Ethical Concerns"
        description="Analyzing successful implementations of gamification and confronting the ethical challenges of manipulative design."
        altBg={true}
      />

      <ZigzagContent
        label="CASE STUDIES"
        title="Simulators and Audio Adventures"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Microsoft Flight Simulator represents a pinnacle of immersive technology, utilizing realistic graphics, dynamic weather, and VR support to create virtual cockpit experiences that rival professional aviation training.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: msFlightSim
          },
          {
            type: "text",
            content: (
              <p>
                Conversely, Guitar Hero demonstrated how gamification can overcome the steep learning curve of musical instruments, turning repetitive practice into immediate, rewarding progression.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: guitarHero
          }
        ]}
      />

      <DataBlock label="INNOVATIVE APPLICATION" title="Zombies, Run!" altBg={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <Image src={zombiesRun} alt="Zombies Run App Interface" className="w-full h-auto rounded-xl object-contain shadow-2xl" />
          <div className="bg-card/80 backdrop-blur-md p-8 rounded-xl shadow-xl border border-border">
            <h3 className="text-h2 mb-4">Fitness Meets Narrative</h3>
            <p className="text-body text-text-secondary">
              This application successfully gamifies physical exercise by turning a standard jog into an immersive audio adventure. Users must physically accelerate to escape virtual threats, effectively blending intrinsic health goals with engaging extrinsic narrative mechanics.
            </p>
          </div>
        </div>
      </DataBlock>

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { title: "Overjustification Effect", description: "Relying too heavily on extrinsic rewards can undermine intrinsic motivation, leading users to engage only for the reward rather than for personal growth." },
          { title: "Excessive Freedom", description: "Providing an open-world experience without clear objectives or structure can paradoxically lead to user boredom and decreased engagement." }
        ]}
        altBg={true}
      />

      <ZigzagContent
        label="CRITICAL ANALYSIS"
        title="Ethical Implications"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                The integration of gaming interfaces into high-stakes environments raises significant ethical concerns. The military has increasingly adopted commercial gaming controllers, such as those from Xbox, to operate advanced weapon systems and robotics.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: militaryController
          },
          {
            type: "insight",
            label: "THE GAMING GENERATION",
            content: "Utilizing familiar interfaces like PlayStation or Xbox controllers acts as a natural transition for younger operators. It capitalizes on thousands of hours of prior gaming experience to accelerate military training."
          },
          {
            type: "image",
            imageUrl: packbotController
          }
        ]}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Immersive technologies like Augmented Reality and Virtual Reality are redefining how organizations train personnel and engage users by blending digital content with physical environments. Simultaneously, gamification leverages our inherent psychological drives for achievement and progression to motivate behavior. However, the application of these powerful tools must be carefully balanced to avoid undermining intrinsic motivation and must be critically evaluated when deployed in high-stakes or ethically sensitive contexts."
        takeaways={[
          "AR and VR create realistic simulations that accelerate complex learning processes.",
          "Gamification transforms non-game contexts using points, badges, and structured challenges.",
          "Effective progression design mitigates frustration and maintains long-term engagement.",
          "Over-reliance on extrinsic rewards can trigger the overjustification effect.",
          "Familiar gaming interfaces are increasingly co-opted for high-stakes real-world applications."
        ]}
      />
    </main>
  )
}
