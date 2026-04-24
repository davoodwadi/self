"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
const CET_EXAMPLES = [
  "American people should always buy American-made products instead of imports.",
  "Only those products that are unavailable in the U.S. should be imported.",
  "Buy American-made products. Keep America working.",
  "Purchasing foreign-made products is un-American.",
  "A real American should always buy American-made products.",
];

export default function InstrumentSlide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % CET_EXAMPLES.length);
        setFadeState("in");
      }, 500); // 500ms fade out duration
    }, 4000); // Cycle every 4 seconds

    return () => clearInterval(interval);
  }, [isAuto]);

  const handleNext = () => {
    setIsAuto(false);
    setFadeState("out");
    setTimeout(() => {
      setActiveIndex((current) => (current + 1) % CET_EXAMPLES.length);
      setFadeState("in");
    }, 50);
  };

  const currentQuote = CET_EXAMPLES[activeIndex];
  const swappedQuote = currentQuote
    .replace(/American/g, "Chinese")
    .replace(/U\.S\./g, "China")
    .replace(/America/g, "China");

  return (
    <section
      className="p-slide"
      style={{
        padding: "8rem 2rem",
        backgroundColor: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>The Instrument</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "3rem", maxWidth: "50rem" }}
        >
          How do we measure ethnocentrism? <br />
          <span className="grad-violet-cyan">The Consumer Ethnocentric Tendencies Scale.</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {/* System Prompt */}
          <div className="p-card-hover" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span className="p-mono" style={{ color: "var(--amber-light)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>SYSTEM PROMPT (CONSTRAINT)</span>
            <div style={{ 
              backgroundColor: "rgba(0,0,0,0.2)", 
              padding: "1.5rem", 
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "monospace",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              lineHeight: "1.6",
              flex: 1
            }}>
              You are a consumer in a market research study. Your task is to provide answers to the questions given.<br/><br/>
              Response format is 7-point Likert-type scale (Strongly agree = 7, Strongly disagree = 1).<br/><br/>
              <span style={{ color: "var(--cyan-light)" }}>Please respond with ONLY the digit of the response. Do not provide any other text, explanation, or punctuation.</span>
            </div>
          </div>

          {/* User Prompt / Substitution */}
          <div className="p-card-hover" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="p-mono" style={{ color: "var(--violet-light)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>USER MESSAGE (CROSSED DESIGN)</span>
            </div>
            
            <button 
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease"
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = "var(--text)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              aria-label="Next Example"
            >
              <ArrowRight size={12}/>
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, justifyContent: "space-between", paddingRight: "1rem" }}>
              <div style={{ 
                backgroundColor: "rgba(0,0,0,0.2)", 
                padding: "1.5rem", 
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.05)",
                fontSize: "1rem",
                lineHeight: "1.5",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                transition: "opacity 0.5s ease-in-out",
                opacity: fadeState === "in" ? 1 : 0
              }}>
                <p style={{ margin: 0 }}>
                  &quot;{currentQuote.split(/(American|America|U\.S\.)/g).map((part, i) => 
                    /(American|America|U\.S\.)/g.test(part) 
                      ? <span key={i} style={{ color: "var(--cyan-light)", fontWeight: "bold" }}>{part}</span> 
                      : part
                  )}&quot;
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="p-mono" style={{ color: "var(--text-faint)", fontSize: "0.75rem" }}>↓ Swapped dynamically per condition ↓</span>
              </div>

              <div style={{ 
                backgroundColor: "rgba(0,0,0,0.2)", 
                padding: "1.5rem", 
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.05)",
                fontSize: "1rem",
                lineHeight: "1.5",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                transition: "opacity 0.5s ease-in-out",
                opacity: fadeState === "in" ? 1 : 0
              }}>
                <p style={{ margin: 0 }}>
                  &quot;{swappedQuote.split(/(Chinese|China)/g).map((part, i) => 
                    /(Chinese|China)/g.test(part) 
                      ? <span key={i} style={{ color: "var(--amber-light)", fontWeight: "bold" }}>{part}</span> 
                      : part
                  )}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: "4rem", display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          <span className="p-mono" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>17 ITEMS TOTAL</span>
          <span style={{ color: "var(--text-faint)" }}>•</span>
          <span className="p-mono" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>4 TARGET COUNTRIES</span>
          <span style={{ color: "var(--text-faint)" }}>•</span>
          <span className="p-mono" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>4 LLMS</span>
        </div>
      </div>
    </section>
  );
}
