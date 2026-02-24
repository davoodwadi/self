"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Briefcase, GraduationCap, Library, LineChart, MoveRight, Network } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DavoodWadiPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Custom ease for cinematic feel
      const cinematicEase = "power3.out";

      // 1. Hero Entrance Animations
      gsap.from(".hero-fade-up", {
        y: 40,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Scroll Triggered Section Animations
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: cinematicEase,
        });
      });
      
      // 3. Staggered List Items (Education, Experience)
      const listContainers = gsap.utils.toArray<HTMLElement>(".stagger-list");
      listContainers.forEach((container) => {
        const items = container.querySelectorAll(".stagger-item");
        gsap.from(items, {
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--surface)] selection:bg-[var(--crimson)] selection:text-white">
      {/* Decorative Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--crimson)] to-[var(--crimson-light)]"></div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-24 md:space-y-40">
        
        {/* HERO SECTION */}
        <section className="space-y-8 pt-10 md:pt-20">
          <div className="space-y-4">
            <h1 className="hero-fade-up text-5xl md:text-7xl tracking-tight text-[var(--charcoal)] leading-tight">
              Davood Wadi
            </h1>
            <p className="hero-fade-up text-lg md:text-2xl font-light text-[var(--charcoal-light)] tracking-wide max-w-2xl border-l-2 border-[var(--crimson)] pl-6 py-2">
              Bridging cutting-edge artificial intelligence research with strategic business applications.
            </p>
          </div>
          
        </section>

        {/* ABOUT / BIOGRAPHY */}
        <section id="about" className="reveal-section space-y-8 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-[var(--border)] opacity-50 hidden md:block"></div>
          <div className="flex items-center gap-4">

            <h2 className="text-3xl md:text-4xl">About</h2>
          </div>
          <div className="prose prose-lg text-[var(--charcoal-light)] max-w-none space-y-6 font-sans leading-relaxed font-light">
            <p>
              I am an academic and technologist specializing in the intersection of artificial intelligence, machine learning, and quantitative marketing. My academic journey culminated in a Ph.D. in Marketing with a specialization in Artificial Intelligence from HEC Montréal, where my research received honors including the IVADO PhD Excellence Scholarship and a finalist position for the Best Thesis Award.
            </p>
            <p>
              My active research agenda investigates the reliable evaluation of Large Language Models and the intersection of human behavior with financial incentives in digital commerce. Methodologically, I focus on advancing deep learning techniques, specifically around gradient descent optimization and behavioral analysis architectures. My work is published in leading academic journals and presented at premier machine learning conferences, including findings in the ACL Anthology and the Journal of Electronic Commerce Research.
            </p>
            <p>
              Beyond research, I am dedicated to bridging technical complexity with business strategy through education and service. I designed the curriculum for the Master of Financial Technology program, equipping the next generation of leaders with rigorous AI literacy. I actively contribute to the scientific community as a peer reviewer for top tier conferences such as ICML, NeurIPS, and AISTATS, while also upholding research integrity as a member of the REB ethics board.
            </p>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="reveal-section space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl">Education & Awards</h2>
          </div>
          <div className="stagger-list space-y-8">
            <div className="stagger-item group border-l-2 border-transparent hover:border-[var(--crimson)] pl-4 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-[var(--charcoal)]">Ph.D. in Marketing</h3>
              <p className="text-[var(--crimson-light)] font-medium mt-1">Specialization in Artificial Intelligence</p>
              <p className="text-sm text-[var(--charcoal-light)] mt-2 font-light">
                HEC Montréal <span className="mx-2 opacity-50">•</span> 2023
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--charcoal-light)] font-light list-disc list-inside marker:text-[var(--crimson)]">
                <li>Best 2023 Ph.D. Thesis Award Finalist</li>
                <li>IVADO PhD Excellence Scholarship</li>
                <li>IVADO Scientist in Residence Scholarship</li>
                <li>2019 Saskatchewan Innovation & Opportunity Scholarship</li>
              </ul>
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section className="reveal-section space-y-8">
          <div className="flex items-center gap-4">

            <h2 className="text-3xl md:text-4xl">Selected Research</h2>
          </div>
          <div className="stagger-list grid gap-6">
            <article className="stagger-item group relative p-6 bg-[var(--background)] border border-[var(--border)] rounded-sm hover:border-[var(--crimson)] transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--crimson)]">Conference Proceedings</span>
              <h3 className="text-lg font-semibold mt-2 mb-3 text-[var(--charcoal)] leading-snug group-hover:text-[var(--crimson)] transition-colors">
                <a href="https://aclanthology.org/2025.findings-emnlp.500/" target="_blank" rel="noopener noreferrer" className="absolute inset-0"></a>
                A Monte-Carlo Sampling Framework For Reliable Evaluation of Large Language Models Using Behavioral Analysis
              </h3>
              <p className="text-sm text-[var(--charcoal-light)] mb-4 font-light">
                Findings of the Association for Computational Linguistics: EMNLP 2025
              </p>
              <p className="text-xs text-[var(--charcoal-light)] italic">Wadi, D., Fredette, M. (2025)</p>
            </article>
            <article className="stagger-item group relative p-6 bg-[var(--background)] border border-[var(--border)] rounded-sm hover:border-[var(--crimson)] transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--crimson)]">Journal Article</span>
              <h3 className="text-lg font-semibold mt-2 mb-3 text-[var(--charcoal)] leading-snug group-hover:text-[var(--crimson)] transition-colors">
                <a href="http://www.jecr.org/sites/default/files/2026vol27no2_Paper1.pdf" target="_blank" rel="noopener noreferrer" className="absolute inset-0"></a>
                The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging
              </h3>
              <p className="text-sm text-[var(--charcoal-light)] mb-4 font-light">
                Journal of Electronic Commerce Research, Volume 27, Issue 2
              </p>
              <p className="text-xs text-[var(--charcoal-light)] italic">Wadi, D., Legoux, R., Fredette, M., Sénécal, S. (2026)</p>
            </article>
          </div>
        </section>

        {/* PROJECTS / EXPERTISE */}
        <section className="reveal-section space-y-8">
          <div className="flex items-center gap-4">
            
            <h2 className="text-3xl md:text-4xl">Projects & Courses</h2>
          </div>
          
          <div className="group relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--background)] hover:border-[var(--crimson)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--crimson)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--crimson)]">Featured Course</span>
                <BookOpen size={20} className="text-[var(--crimson-light)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--charcoal)]">Applications of AI in Business</h3>
              <p className="text-[var(--charcoal-light)] font-light leading-relaxed mb-6 max-w-2xl">
                A comprehensive curriculum designed to bridge the gap between technical AI implementation and strategic business value. Covering generative models, predictive analytics, and ethical deployment strategies.
              </p>
              <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-[var(--crimson)] hover:text-[var(--crimson-light)] transition-colors">
                View Curriculum <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICE */}
        <section className="reveal-section space-y-8">
          <div className="flex items-center gap-4">
            
            <h2 className="text-3xl md:text-4xl">Service & Advisory</h2>
          </div>

          <div className="stagger-list space-y-6">
            <div className="stagger-item flex flex-col md:flex-row gap-4 md:items-baseline border-b border-[var(--border)] pb-6">
              <div className="md:w-1/3 font-semibold text-[var(--charcoal)]">Ethics Board Member</div>
              <div className="md:w-2/3 text-[var(--charcoal-light)] font-light">
                Member of REB ethics board, overseeing research compliance.
              </div>
            </div>
            <div className="stagger-item flex flex-col md:flex-row gap-4 md:items-baseline border-b border-[var(--border)] pb-6">
              <div className="md:w-1/3 font-semibold text-[var(--charcoal)]">Curriculum Designer</div>
              <div className="md:w-2/3 text-[var(--charcoal-light)] font-light">
                Master of Financial Technology
              </div>
            </div>
            <div className="stagger-item flex flex-col md:flex-row gap-4 md:items-baseline border-b border-[var(--border)] pb-6">
              <div className="md:w-1/3 font-semibold text-[var(--charcoal)]">Reviewer <span className="text-xs ml-2 opacity-50 font-normal">Feb 2025</span></div>
              <div className="md:w-2/3 text-[var(--charcoal-light)] font-light">
                International Conference Machine Learning (ICML) 2025 <br/>
                <span className="text-sm opacity-75">Focus: Gradient Descent Optimization</span>
              </div>
            </div>
            <div className="stagger-item flex flex-col md:flex-row gap-4 md:items-baseline border-b border-[var(--border)] pb-6">
              <div className="md:w-1/3 font-semibold text-[var(--charcoal)]">Reviewer <span className="text-xs ml-2 opacity-50 font-normal">Nov 2024</span></div>
              <div className="md:w-2/3 text-[var(--charcoal-light)] font-light">
                28th International Conference on Artificial Intelligence and Statistics (AISTATS 2025)
              </div>
            </div>
            <div className="stagger-item flex flex-col md:flex-row gap-4 md:items-baseline border-b border-[var(--border)] pb-6">
              <div className="md:w-1/3 font-semibold text-[var(--charcoal)]">Reviewer <span className="text-xs ml-2 opacity-50 font-normal">Jul 2024</span></div>
              <div className="md:w-2/3 text-[var(--charcoal-light)] font-light">
                NeurIPS 2024 <br/>
                <span className="text-sm opacity-75">Focus: Gradient Descent Optimization, LLM, Vector Symbolic Architecture</span>
              </div>
            </div>
            <div className="stagger-item flex flex-col md:flex-row gap-4 md:items-baseline">
              <div className="md:w-1/3 font-semibold text-[var(--charcoal)]">Reviewer <span className="text-xs ml-2 opacity-50 font-normal">Jul 2022</span></div>
              <div className="md:w-2/3 text-[var(--charcoal-light)] font-light">
                NeurIPS 2022 <br/>
                <span className="text-sm opacity-75">Focus: Gradient Descent Optimization</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] bg-[var(--background)] mt-24">
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-xl font-bold text-[var(--charcoal)]">Davood Wadi</h2>
          </div>
          <div className="flex gap-6 text-sm text-[var(--charcoal-light)] font-light">
            <a href="https://ca.linkedin.com/in/davoodwadi" className="hover:text-[var(--crimson)] transition-colors">LinkedIn</a>
            <a href="https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ" className="hover:text-[var(--crimson)] transition-colors">Google Scholar</a>
            <a href="davood.wadi@hec.ca" className="hover:text-[var(--crimson)] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
