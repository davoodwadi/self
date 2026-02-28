"use client";

import { useEffect } from "react";
import { BookOpen, MoveRight } from "lucide-react";
import Link from "next/link";

export default function DavoodWadiPortfolio() {
  useEffect(() => {
    // Intersection Observer for Fade-Up Animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-transparent selection:bg-accent-500 selection:text-white">
      {/* Decorative Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-accent-500 to-accent-400"></div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-24 md:space-y-40">
        {/* HERO SECTION */}
        <section className="space-y-8 pt-10 md:pt-20">
          <div className="space-y-4">
            <h1
              className="fade-up text-5xl md:text-7xl font-serif font-bold tracking-tight gradient-text leading-tight"
              style={{ transitionDelay: "100ms" }}
            >
              Davood Wadi
            </h1>
            <p
              className="fade-up text-lg md:text-2xl font-light text-gray-400 tracking-wide max-w-2xl border-l-2 border-accent-500 pl-6 py-2"
              style={{ transitionDelay: "200ms" }}
            >
              Bridging cutting-edge artificial intelligence research with
              strategic business applications.
            </p>
          </div>
        </section>

        {/* ABOUT / BIOGRAPHY */}
        <section id="about" className="space-y-8 relative fade-up">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-white/10 opacity-50 hidden md:block"></div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
              About
            </h2>
          </div>
          <div className="prose prose-lg text-gray-400 max-w-none space-y-6 font-sans leading-relaxed font-light">
            <p>
              I am an academic and technologist specializing in the intersection
              of artificial intelligence, machine learning, and quantitative
              marketing. My academic journey culminated in a Ph.D. in Marketing
              with a specialization in Artificial Intelligence from HEC
              Montréal, where my research received honors including the IVADO
              PhD Excellence Scholarship and a finalist position for the Best
              Thesis Award.
            </p>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="space-y-8 fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
              Education & Awards
            </h2>
          </div>
          <div className="space-y-8">
            <div className="group border-l-2 border-transparent hover:border-accent-500 pl-4 transition-colors duration-300">
              <h3 className="text-xl font-serif font-semibold tracking-tight text-white">
                Ph.D. in Marketing
              </h3>
              <p className="text-accent-400 font-medium mt-1">
                Specialization in Artificial Intelligence
              </p>
              <p className="text-sm text-gray-400 mt-2 font-light">
                HEC Montréal <span className="mx-2 opacity-50">•</span> 2023
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400 font-light list-disc list-inside marker:text-accent-500">
                <li>Best 2023 Ph.D. Thesis Award Finalist</li>
                <li>IVADO PhD Excellence Scholarship</li>
                <li>IVADO Scientist in Residence Scholarship</li>
                <li>2019 Saskatchewan Innovation & Opportunity Scholarship</li>
              </ul>
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="publications" className="space-y-8 fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
              Selected Research
            </h2>
          </div>
          <div className="grid gap-6">
            <article className="glass-card group relative p-6 rounded-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-500">
                Conference Proceedings
              </span>
              <h3 className="text-lg font-serif font-semibold tracking-tight mt-2 mb-3 text-white leading-snug group-hover:text-accent-500 transition-colors">
                <a
                  href="https://aclanthology.org/2025.findings-emnlp.500/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                ></a>
                A Monte-Carlo Sampling Framework For Reliable Evaluation of
                Large Language Models Using Behavioral Analysis
              </h3>
              <p className="text-sm text-gray-400 mb-4 font-light">
                Findings of the Association for Computational Linguistics: EMNLP
                2025
              </p>
              <p className="text-xs text-gray-400 italic">
                Wadi, D., Fredette, M. (2025)
              </p>
            </article>
            <article className="glass-card group relative p-6 rounded-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-500">
                Journal Article
              </span>
              <h3 className="text-lg font-serif font-semibold tracking-tight mt-2 mb-3 text-white leading-snug group-hover:text-accent-500 transition-colors">
                <a
                  href="http://www.jecr.org/sites/default/files/2026vol27no2_Paper1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                ></a>
                The interplay of altruism and financial incentives: Maximizing
                online reviews through effective messaging
              </h3>
              <p className="text-sm text-gray-400 mb-4 font-light">
                Journal of Electronic Commerce Research, Volume 27, Issue 2
              </p>
              <p className="text-xs text-gray-400 italic">
                Wadi, D., Legoux, R., Fredette, M., Sénécal, S. (2026)
              </p>
            </article>
          </div>
        </section>

        {/* PROJECTS / EXPERTISE */}
        <section id="expertise" className="space-y-8 fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
              Projects & Courses
            </h2>
          </div>

          <div className="glass-card group relative overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-accent-500">
                  Featured Course
                </span>
                <BookOpen size={20} className="text-accent-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold tracking-tight mb-4 text-white">
                Applications of AI in Business
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6 max-w-2xl">
                A comprehensive curriculum designed to bridge the gap between
                technical AI implementation and strategic business value.
                Covering generative models, predictive analytics, and ethical
                deployment strategies.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent-500 hover:text-accent-400 transition-colors"
              >
                View Curriculum <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICE */}
        <section className="space-y-8 fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
              Service & Advisory
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline border-b border-white/10 pb-6 fade-up">
              <div className="md:w-1/3 font-semibold text-white">
                Ethics Board Member
              </div>
              <div className="md:w-2/3 text-gray-400 font-light">
                Member of REB ethics board, overseeing research compliance.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline border-b border-white/10 pb-6 fade-up">
              <div className="md:w-1/3 font-semibold text-white">
                Curriculum Designer
              </div>
              <div className="md:w-2/3 text-gray-400 font-light">
                Master of Financial Technology
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline border-b border-white/10 pb-6 fade-up">
              <div className="md:w-1/3 font-semibold text-white">
                Reviewer{" "}
                <span className="text-xs ml-2 opacity-50 font-normal">
                  Feb 2025
                </span>
              </div>
              <div className="md:w-2/3 text-gray-400 font-light">
                International Conference Machine Learning (ICML) 2025 <br />
                <span className="text-sm opacity-75">
                  Focus: Gradient Descent Optimization
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline border-b border-white/10 pb-6 fade-up">
              <div className="md:w-1/3 font-semibold text-white">
                Reviewer{" "}
                <span className="text-xs ml-2 opacity-50 font-normal">
                  Nov 2024
                </span>
              </div>
              <div className="md:w-2/3 text-gray-400 font-light">
                28th International Conference on Artificial Intelligence and
                Statistics (AISTATS 2025)
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline border-b border-white/10 pb-6 fade-up">
              <div className="md:w-1/3 font-semibold text-white">
                Reviewer{" "}
                <span className="text-xs ml-2 opacity-50 font-normal">
                  Jul 2024
                </span>
              </div>
              <div className="md:w-2/3 text-gray-400 font-light">
                NeurIPS 2024 <br />
                <span className="text-sm opacity-75">
                  Focus: Gradient Descent Optimization, LLM, Vector Symbolic
                  Architecture
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline fade-up">
              <div className="md:w-1/3 font-semibold text-white">
                Reviewer{" "}
                <span className="text-xs ml-2 opacity-50 font-normal">
                  Jul 2022
                </span>
              </div>
              <div className="md:w-2/3 text-gray-400 font-light">
                NeurIPS 2022 <br />
                <span className="text-sm opacity-75">
                  Focus: Gradient Descent Optimization
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-white/10 bg-dark-800/80 backdrop-blur-md mt-24"
      >
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left fade-up">
            <h2 className="font-serif tracking-tight text-xl font-bold text-white">
              Davood Wadi
            </h2>
          </div>
          <div
            className="flex gap-6 text-sm text-gray-400 font-light fade-up"
            style={{ transitionDelay: "100ms" }}
          >
            <a
              href="https://ca.linkedin.com/in/davoodwadi"
              className="hover:text-accent-500 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ"
              className="hover:text-accent-500 transition-colors"
            >
              Google Scholar
            </a>
            <a
              href="mailto:davood.wadi@hec.ca"
              className="hover:text-accent-500 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
