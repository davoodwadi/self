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
    <div className="min-h-screen bg-transparent selection:bg-accent-500 selection:text-white relative">
      <main>
        {/* 1. Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative px-6 pt-20"
        >
          <div className="max-w-5xl mx-auto text-center z-10">
            <div className="inline-block mb-4 px-3 py-1 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-400 text-xs font-semibold tracking-widest uppercase fade-up">
              Academic & Technologist
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight gradient-text fade-up">
              Davood Wadi
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 font-light mb-10 max-w-3xl mx-auto leading-relaxed fade-up">
              Bridging{" "}
              <span className="text-white font-medium">Academic Rigor</span>,{" "}
              <span className="text-accent-400 font-medium">AI Innovation</span>
              , and{" "}
              <span className="text-white font-medium">Market Strategy</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up">
              <a
                href="#expertise"
                className="px-8 py-4 bg-white text-dark-900 font-medium rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                Explore Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-gray-600 text-white font-medium rounded-full hover:border-gray-400 hover:bg-white/5 transition-all"
              >
                Let's Connect
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce fade-up">
            <a
              href="#about"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </a>
          </div>
        </section>

        {/* 2. About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center py-24 px-6 md:py-32 relative"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/3 fade-up">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-accent-500/20 p-2 relative mx-auto group">
                  <div className="absolute inset-0 rounded-full bg-accent-500/20 blur-xl group-hover:bg-accent-500/30 transition-all duration-500"></div>
                  <img
                    src="/portrait.png"
                    alt="Davood Wadi"
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 relative z-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 fade-up">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 border-b border-gray-800 pb-4">
                  The Intersection of{" "}
                  <span className="gradient-text-accent">
                    Thought &amp; Action
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                  I am an academic and technologist specializing in the
                  intersection of artificial intelligence, machine learning, and
                  quantitative marketing. My academic journey culminated in a
                  Ph.D. in Marketing with a specialization in Artificial
                  Intelligence from HEC Montréal, where my research received
                  honors including the IVADO PhD Excellence Scholarship and a
                  finalist position for the Best Thesis Award.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  By demystifying AI capabilities, I help organizations craft
                  future-proof strategies while contributing to the foundational
                  science through rigorous peer-reviewed research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Domains of Expertise */}
        <section
          id="expertise"
          className="min-h-screen flex items-center justify-center py-24 px-6 bg-dark-800/30 border-y border-white/5 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                Domains of Expertise
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-light">
                A trifecta of skills driving innovation and strategic growth in
                academic and commercial environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Academic */}
              <div className="glass-card rounded-2xl p-8">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Academic Researcher
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed font-light">
                  Executing rigorous, peer-reviewed research analyzing LLM
                  behavioral traits and applying quantitative methodologies to
                  marketing strategy.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 font-light">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Conference Proceedings (EMNLP)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Scientific Peer Reviewer
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Curriculum Development
                  </li>
                </ul>
              </div>

              {/* AI Science */}
              <div className="glass-card rounded-2xl p-8">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  AI Scientist
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed font-light">
                  Developing robust models encompassing Generative frameworks,
                  Monte-Carlo sampling, and deep evaluation techniques of
                  foundational language architectures.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 font-light">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    LLM Evaluation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Monte-Carlo Sampling
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Gradient Descent Optimization
                  </li>
                </ul>
              </div>

              {/* Marketing */}
              <div className="glass-card rounded-2xl p-8">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Marketing Strategist
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed font-light">
                  Translating complex capabilities into real-world business
                  advantages. Architecting data-driven consumer behavior
                  strategies leveraging neural inputs.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 font-light">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    AI Adoption Strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Predictive Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{" "}
                    Consumer Modeling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Selected Publications & Service */}
        <section
          id="publications"
          className="min-h-screen flex items-center justify-center py-24 px-6 relative"
        >
          <div className="max-w-6xl mx-auto w-full space-y-20">
            {/* Publications Sub-section */}
            <div>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 fade-up">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                    Selected Research
                  </h2>
                  <p className="text-gray-400 font-light">
                    Recent papers and journal articles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-xl flex flex-col justify-between group fade-up">
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-gray-300">
                        EMNLP
                      </span>
                      <span className="text-xs text-gray-500">2025</span>
                    </div>
                    <a
                      href="https://aclanthology.org/2025.findings-emnlp.500/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                    >
                      <span className="sr-only">Read paper</span>
                    </a>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-400 transition-colors">
                      A Monte-Carlo Sampling Framework For Reliable Evaluation
                      of Large Language Models Using Behavioral Analysis
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-light relative z-0">
                      Findings of the Association for Computational Linguistics.
                      We introduce a robust statistical approach for estimating
                      LLM consistency when generating complex behavioral
                      outputs, shifting from point-estimate evaluations to
                      dynamic sampling landscapes.
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-auto pt-4 border-t border-white/5 relative z-0">
                    Wadi, D., Fredette, M.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col justify-between group fade-up">
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-gray-300">
                        JECR
                      </span>
                      <span className="text-xs text-gray-500">2026</span>
                    </div>
                    <a
                      href="http://www.jecr.org/sites/default/files/2026vol27no2_Paper1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                    >
                      <span className="sr-only">Read paper</span>
                    </a>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-400 transition-colors">
                      The interplay of altruism and financial incentives:
                      Maximizing online reviews through effective messaging
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-light relative z-0">
                      Journal of Electronic Commerce Research, Volume 27, Issue
                      2. Investigating consumer motivations in digital
                      ecosystems by pitting inherent psychological drivers
                      against monetary incentives, optimizing conversion
                      strategies.
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-auto pt-4 border-t border-white/5 relative z-0">
                    Wadi, D., Legoux, R., Fredette, M., Sénécal, S.
                  </p>
                </div>
              </div>
            </div>

            {/* Courses & Service Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="fade-up">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                  Projects &amp; Courses
                </h2>
                <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent-500 block">
                        Featured Course
                      </span>
                      <BookOpen size={20} className="text-accent-400" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold tracking-tight mb-4 text-white">
                      Applications of AI in Business
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                      A comprehensive curriculum designed to bridge the gap
                      between technical AI implementation and strategic business
                      value. Covering generative models, predictive analytics,
                      and ethical deployment strategies.
                    </p>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent-500 hover:text-accent-400 transition-colors"
                    >
                      View Curriculum{" "}
                      <span className="group-hover:translate-x-1 transition-transform inline-flex">
                        <MoveRight size={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="fade-up">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                  Academic Service
                </h2>
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <div className="font-semibold text-white mb-2">
                      Peer Reviewer
                    </div>
                    <ul className="text-sm text-gray-400 font-light space-y-2">
                      <li>
                        <span className="text-accent-400 font-medium">
                          ICML 2025
                        </span>{" "}
                        — Gradient Descent Optimization
                      </li>
                      <li>
                        <span className="text-accent-400 font-medium">
                          AISTATS 2025
                        </span>
                      </li>
                      <li>
                        <span className="text-accent-400 font-medium">
                          NeurIPS 2024 &amp; 2022
                        </span>{" "}
                        — GD, LLMs, Vector Symbolic Architecture
                      </li>
                    </ul>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <div className="font-semibold text-white mb-1">
                      Ethics Board Member
                    </div>
                    <div className="text-sm text-gray-400 font-light">
                      Member of REB ethics board, overseeing research compliance
                      and data integrity protocols.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">
                      Curriculum Designer
                    </div>
                    <div className="text-sm text-gray-400 font-light">
                      Master of Financial Technology academic tract.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center py-24 px-6 md:py-32 bg-dark-800/50 border-y border-white/5 relative"
        >
          <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/2 fade-up">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Let's Connect
              </h2>
              <p className="text-gray-400 mb-8 font-light leading-relaxed">
                Whether you're interested in academic collaboration, consulting
                insights tailored to market nuances, or speaking engagements,
                I'm continuously open to exploring new frontiers.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:davood.wadi@hec.ca"
                  className="flex items-center gap-4 p-4 glass-card rounded-lg hover:bg-white/5 transition-all"
                >
                  <svg
                    className="w-6 h-6 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <div>
                    <h4 className="text-white font-medium text-sm">Email</h4>
                    <p className="text-gray-500 text-xs">davood.wadi@hec.ca</p>
                  </div>
                </a>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://ca.linkedin.com/in/davoodwadi"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-400 transition-all"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-400 transition-all"
                  >
                    <span className="sr-only">Google Scholar</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 2.735c.152.086.331.135.516.135h1.293l-1.5 8.183h13.7l-1.5-8.183h1.293c.185 0 .364-.049.516-.135L24 9.5 12 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 fade-up">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-gray-500 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-500 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-500 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors resize-none"
                    placeholder="How can we collaborate?"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full py-4 bg-white text-dark-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center px-6">
        <p className="text-gray-600 text-sm font-light">
          &copy; {new Date().getFullYear()} Davood Wadi.
        </p>
      </footer>
    </div>
  );
}
