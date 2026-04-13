"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

// Animations
export const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  },
  slideRight: {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  },
  scaleFade: {
    hidden: { opacity: 0, scale: 1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  }
}

// 1. Progress Bar
export const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] z-[9999] origin-left"
      style={{
        background: 'linear-gradient(to right, var(--accent2), var(--accent1), var(--highlight))',
        scaleX: scrollYProgress,
        width: '100%'
      }}
    />
  )
}

// 2. Floating Navigation
export const FloatingNav = ({ sections }: { sections: { id: string, label: string }[] }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(sections[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center justify-end"
          aria-label={sec.label}
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-label whitespace-nowrap bg-background px-2 py-1 rounded">
            {sec.label}
          </span>
          <div
            className={`rounded-full transition-all duration-300 ${
              activeId === sec.id
                ? "w-2.5 h-2.5 bg-accent1 shadow-[0_0_10px_var(--glow)]"
                : "w-1.5 h-1.5 bg-border hover:bg-text-muted"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

// 3. Hero Section
export const Hero = ({ category, title, subtitle, author, date, institution }: any) => {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-center px-8 md:px-16 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, var(--accent2), transparent 70%)' }} />
      
      <div className="max-w-[var(--container)] mx-auto w-full z-10">
        <motion.p variants={animations.fadeUp} initial="hidden" animate="visible" className="text-label mb-6">
          {category}
        </motion.p>
        
        <h1 className="text-display mb-8">
          <span style={{ backgroundImage: 'linear-gradient(135deg, var(--text-primary) 60%, var(--highlight))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {title}
          </span>
        </h1>
        
        <motion.p variants={animations.fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.8 }} className="text-h2 mb-12 max-w-3xl text-text-secondary">
          {subtitle}
        </motion.p>
        
        <motion.div variants={animations.fadeUp} initial="hidden" animate="visible" transition={{ delay: 1.2 }} className="text-body text-text-muted flex items-center gap-4">
          <span>{author}</span>
          <span>&middot;</span>
          <span>{date}</span>
          <span>&middot;</span>
          <span>{institution}</span>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-sm"
      >
        <span>scroll to explore</span>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// 4. Chapter Header
export const ChapterHeader = ({ id, number, title, description, altBg = false }: any) => {
  return (
    <section id={id} className={`relative py-[var(--section-py)] px-8 md:px-16 ${altBg ? 'bg-background-alt' : 'bg-background'} min-h-screen flex flex-col justify-center`}>
      <div className="max-w-[var(--container)] w-full mx-auto relative">
        <div className="absolute top-0 right-0 text-[8rem] leading-none font-heading font-light opacity-10 text-accent1 select-none">
          {number}
        </div>
        
        <motion.div variants={animations.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
          <p className="text-label mb-4">CHAPTER {number}</p>
          <div className="h-[1px] w-full bg-gradient-to-r from-accent1 to-transparent mb-8 opacity-50" />
          <h2 className="text-h1 mb-6">{title}</h2>
          <p className="text-body max-w-2xl">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}

// 5. Zigzag Content Block
export const ZigzagContent = ({ id, label, title, segments, startRight = false, altBg = false }: any) => {
  return (
    <section id={id} className={`py-[var(--section-py)] px-8 md:px-16 ${altBg ? 'bg-background-alt' : 'bg-background'} overflow-hidden min-h-screen flex flex-col justify-center`}>
      <div className="max-w-[var(--container)] w-full mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-label mb-4">{label}</p>
          <h3 className="text-h1">{title}</h3>
        </div>
        
        <div className="flex flex-col relative w-full pt-12 gap-12 md:gap-16">
          {segments.map((seg: any, idx: number) => {
            const isRight = idx % 2 !== 0; // Force all zigzags to start from left
            return (
              <motion.div 
                key={idx}
                variants={isRight ? animations.slideRight : animations.slideLeft} 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
                className={`w-full ${seg.type === 'image' ? 'md:w-[85%]' : 'md:w-[85%]'} flex flex-col ${isRight ? 'self-end' : 'self-start'} relative`}
                style={{ zIndex: 10 + idx }}
              >
                 {seg.type === 'text' && (
                   <div className="text-body space-y-4 bg-card/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-border shadow-2xl">
                     {seg.content}
                   </div>
                 )}
                 {seg.type === 'image' && (
                   <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
                     {seg.imageUrl ? (
                       <Image src={seg.imageUrl} alt={title || "Visual content"} fill className="object-contain p-4" />
                     ) : (
                       <div className="w-full h-full bg-card/50 flex items-center justify-center text-text-muted">Visual Content</div>
                     )}
                   </div>
                 )}
                 {seg.type === 'insight' && (
                   <div className="p-8 md:p-12 bg-card/90 backdrop-blur-md rounded-2xl border border-border border-l-[4px] border-l-accent1 shadow-2xl">
                     <p className="text-label mb-4">{seg.label || "KEY INSIGHT"}</p>
                     <div className="text-body m-0">{seg.content}</div>
                   </div>
                 )}
              </motion.div>
            ) 
          })}
        </div>
      </div>
    </section>
  )
}

// 6. Concept Cards Zigzag
export const ConceptCardsZigzag = ({ cards, id, startRight = true, altBg = false }: any) => {
  return (
    <section id={id} className={`py-[var(--section-py)] px-8 md:px-16 ${altBg ? 'bg-background-alt' : 'bg-background'} min-h-screen flex flex-col justify-center overflow-hidden`}>
      <div className="max-w-[var(--container)] w-full mx-auto">
        <div className="flex flex-col relative w-full pt-12 gap-12 md:gap-16">
          {cards.map((card: any, idx: number) => {
            const isRight = idx % 2 !== 0; // Force all zigzags to start from left
            return (
              <motion.div 
                key={idx} 
                variants={isRight ? animations.slideRight : animations.slideLeft}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
                className={`group bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12 hover:border-accent1 hover:shadow-[0_0_20px_var(--glow)] transition-[border-color,box-shadow] duration-300 w-full md:w-[75%] flex flex-col ${isRight ? 'self-end' : 'self-start'} relative shadow-2xl`}
                style={{ zIndex: 10 + idx }}
              >
                <div className="w-12 h-12 rounded-full bg-accent1/15 flex items-center justify-center text-accent1 font-heading text-xl mb-6">
                  {card.number || (idx + 1)}
                </div>
                <h4 className="text-h2 text-xl mb-4">{card.title}</h4>
                <p className="text-body text-sm mb-0">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// 7. Cinematic Quote
export const CinematicQuote = ({ quote, author, altBg = true }: any) => {
  return (
    <section className={`relative py-[var(--section-py-lg)] px-8 md:px-16 ${altBg ? 'bg-background-alt' : 'bg-background'} overflow-hidden min-h-screen flex flex-col justify-center`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-[var(--container-narrow)] w-full mx-auto relative z-10 text-center">
        <span className="absolute -top-16 -left-8 text-[12rem] font-heading opacity-5 text-accent1 leading-none select-none">"</span>
        <motion.p variants={animations.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-quote mb-12 relative z-10">
          {quote}
        </motion.p>
        <motion.div variants={animations.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center">
          <div className="w-16 h-px bg-accent1 mb-4" />
          <p className="text-label">{author}</p>
        </motion.div>
      </div>
    </section>
  )
}

// 8. Conclusion Section
export const Conclusion = ({ title, summary, takeaways, id }: any) => {
  return (
    <section id={id} className="py-[var(--section-py)] px-8 md:px-16 bg-background-alt relative min-h-screen flex flex-col justify-center">
      <div className="max-w-[var(--container-narrow)] w-full mx-auto">
        <p className="text-label mb-4">CONCLUSION</p>
        <h2 className="text-h1 mb-8">{title}</h2>
        <p className="text-body mb-12">{summary}</p>
        
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h4 className="text-label mb-6">KEY TAKEAWAYS</h4>
          <ul className="space-y-4">
            {takeaways.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-4 text-body pl-4 border-l-2 border-accent1">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// 9. Data Block (Simple Diagram container for now)
export const DataBlock = ({ id, title, label, children, altBg = false }: any) => {
    return (
      <section id={id} className={`py-[var(--section-py)] px-8 md:px-16 ${altBg ? 'bg-background-alt' : 'bg-background'} overflow-hidden min-h-screen flex flex-col justify-center`}>
        <div className="max-w-[var(--container)] w-full mx-auto">
          <p className="text-label mb-4">{label}</p>
          <h3 className="text-h1 mb-12">{title}</h3>
          
          <motion.div variants={animations.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-8 shadow-lg">
             {children}
          </motion.div>
        </div>
      </section>
    )
}
