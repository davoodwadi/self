"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { SlideDeck, Slide } from "@/components/SlideDeck";
import {
  HeroHeader,
  SectionHeader,
  ContentCard,
  DiscussionCard,
  StrategyRow,
} from "@/components/SlideComponents";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Extract the Three.js Background Component
function EDIITreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    // Removed fog to let the CSS theme background show cleanly

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x8b0000,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
    });
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // Create a Simple Seesaw Scale symbolizing Equality
    const scaleGroup = new THREE.Group();

    // Shared material for the scale
    const scaleMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Subtle Gold
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // 1. Center Triangle Pivot (Fulcrum)
    const fulcrumGeometry = new THREE.ConeGeometry(3, 6, 4);
    const fulcrum = new THREE.Mesh(fulcrumGeometry, scaleMaterial);
    fulcrum.position.y = -3;
    fulcrum.rotation.y = Math.PI / 4; // Rotate so a flat face is parallel to the beam
    scaleGroup.add(fulcrum);

    // 2. Top Balance Beam (Seesaw Plank)
    const beamGeometry = new THREE.BoxGeometry(20, 0.5, 3);
    const beam = new THREE.Mesh(beamGeometry, scaleMaterial);
    beam.position.y = 0;

    // Group the beam so it can rotate around the fulcrum point
    const beamGroup = new THREE.Group();
    beamGroup.position.y = 0;
    beamGroup.add(beam);
    scaleGroup.add(beamGroup);

    // 3. Weights (Left and Right Blocks)
    const weightGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);

    const leftWeight = new THREE.Mesh(weightGeometry, scaleMaterial);
    leftWeight.position.set(-8, 1.5, 0);
    beamGroup.add(leftWeight);

    const rightWeight = new THREE.Mesh(weightGeometry, scaleMaterial);
    rightWeight.position.set(8, 1.5, 0);
    beamGroup.add(rightWeight);

    scaleGroup.position.y = -5;
    scene.add(scaleGroup);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.01;
      mouseY = (event.clientY - windowHalfY) * 0.01;
    };

    document.addEventListener("mousemove", onDocumentMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      // Add a slight balancing wobble to the beam (seesaw motion)
      const time = Date.now() * 0.001;
      beamGroup.rotation.z = Math.sin(time) * 0.15;
      scaleGroup.rotation.y = Math.sin(time * 0.5) * 0.2; // Gentle overall rotation

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.to(scaleGroup.rotation, {
          y: self.progress * Math.PI * 2,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(particlesMesh.position, {
          y: self.progress * 20,
          ease: "none",
          overwrite: "auto",
        });
      },
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      fulcrumGeometry.dispose();
      beamGeometry.dispose();
      weightGeometry.dispose();
      scaleMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function Week7EDII() {
  return (
    <SlideDeck background={<EDIITreeBackground />}>
      {/* Title Slide */}
      <Slide border={false}>
        <HeroHeader
          tag="Week 07"
          title="EDII in"
          highlight="AI"
          subtitle={
            <>
              Equity, Diversity, Inclusion, and Indigeneity. <br />
              Navigating the ethical and operational risks of algorithmic bias.
            </>
          }
        />
      </Slide>

      {/* Section 1: The Problem */}
      <Slide>
        <SectionHeader
          title="The Problem:"
          highlight="AI as a Mirror of Society"
        />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="gsap-reveal text-lg text-[var(--charcoal-light)] space-y-6 font-light leading-relaxed">
            <p>
              Artificial Intelligence does not exist in a vacuum; it learns from
              historical data. When that data contains societal biases,
              prejudices, and systemic inequalities, AI systems not only
              replicate but often amplify these flaws at scale.
            </p>
            <p>
              For business leaders, deploying biased AI isn't just an ethical
              failure—it's a massive operational and reputational risk.
            </p>
          </div>
          <DiscussionCard
            prompt={
              <>
                Can you think of a time a brand suffered a major PR crisis due
                to an automated system or algorithm making a biased decision?{" "}
                <br />
                <br />
                How did it impact their bottom line?
              </>
            }
          />
        </div>
      </Slide>

      {/* Section 2: Technical Concept */}
      <Slide>
        <SectionHeader
          title="How Algorithms Learn Bias"
          subtitle="The technical mechanics of inequity."
        />
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ContentCard
            number="01"
            title="Training Data Bias"
            description="If a hiring algorithm trains on 10 years of resumes where 80% of successes were male, it learns male = success."
          />
          <ContentCard
            number="02"
            title="Algorithmic Bias"
            description="Weightings optimized for overall accuracy often ignore edge cases and perform poorly for minority groups."
          />
          <ContentCard
            number="03"
            title="Feedback Loops"
            description="Predictive policing algorithms send more police, causing more arrests, feeding data back to justify more police."
          />
        </div>

        <DiscussionCard
          title="Measuring Fairness (Simplified)"
          prompt={
            <>
              <div className="space-y-4 text-[var(--charcoal-light)] font-light text-base mb-6">
                <p>
                  <strong className="text-[var(--charcoal)]">
                    Demographic Parity:
                  </strong>{" "}
                  Does the algorithm produce the same positive outcome rate
                  across all groups?
                </p>
                <p>
                  <strong className="text-[var(--charcoal)]">
                    Equal Opportunity:
                  </strong>{" "}
                  Are the true positive rates equal? (Highly qualified
                  candidates from any background have the exact same chance).
                </p>
              </div>
              <p className="border-t border-[var(--charcoal)]/10 pt-6">
                If an AI model achieves 99% overall accuracy, but has a 40%
                error rate for a specific minority demographic, is the model
                "ready for deployment"? Who makes that call in your
                organization?
              </p>
            </>
          }
          className="bg-[var(--surface)] border-[var(--charcoal)]/10 shadow-sm"
        />
      </Slide>

      {/* Section 3: Business Impact */}
      <Slide>
        <h2 className="gsap-reveal text-4xl md:text-6xl font-bold tracking-tight mb-16 text-center text-[var(--charcoal)] font-serif">
          The Business Impact & ROI
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <ContentCard
            title="The Cost of Bias"
            className="bg-[var(--surface)] border-t-[var(--crimson-light)]"
            description={
              <ul className="space-y-4 text-[var(--charcoal-light)] font-light list-disc pl-5 mt-4">
                <li>Regulatory fines (e.g., EU AI Act strictures).</li>
                <li>Costly class-action lawsuits.</li>
                <li>Irreparable loss of customer trust and PR crises.</li>
                <li>
                  A discriminatory algorithm is fundamentally a broken product.
                </li>
              </ul>
            }
          />
          <ContentCard
            title="The ROI of Inclusion"
            className="bg-[var(--surface)] border-t-[var(--gold)]"
            description={
              <ul className="space-y-4 text-[var(--charcoal-light)] font-light list-disc pl-5 mt-4">
                <li>
                  Diverse datasets create robust, globally applicable models.
                </li>
                <li>Inclusive AI captures unserved and emerging markets.</li>
                <li>
                  Enhances brand equity and secures long-term enterprise trust.
                </li>
                <li>
                  Audited models are less brittle in real-world deployments.
                </li>
              </ul>
            }
          />
        </div>
        <DiscussionCard
          title="Strategic Discussion"
          prompt="How would you measure the ROI of investing in an AI Ethics and Diversity board for a mid-sized tech company? What specific KPIs would you track?"
          className="mt-16 text-center mx-auto max-w-3xl"
        />
      </Slide>

      {/* Section 4: Indigeneity */}
      <Slide>
        <div className="gsap-reveal max-w-4xl">
          <SectionHeader
            title="Indigeneity & Data Sovereignty"
            subtitle="A critical, often overlooked pillar of EDII is Indigeneity, particularly concerning data rights. Data is not just 'fuel' for AI; it represents people, cultures, and sovereign rights."
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ContentCard
            title="Data Colonialism"
            description="The extraction, processing, and monetization of data from Indigenous communities without explicit consent, compensation, or benefit returning to those communities."
          />
          <ContentCard
            title="OCAP® Principles"
            className="bg-[var(--surface)] border-t-[var(--crimson-light)]"
            description={
              <p className="text-[var(--charcoal-light)] font-light mt-2">
                First Nations principles asserting control over data collection
                and usage:
                <br />
                <br />
                <strong className="text-[var(--crimson)] font-bold">
                  Ownership
                </strong>{" "}
                •{" "}
                <strong className="text-[var(--crimson)] font-bold">
                  Control
                </strong>{" "}
                •{" "}
                <strong className="text-[var(--crimson)] font-bold">
                  Access
                </strong>{" "}
                •{" "}
                <strong className="text-[var(--crimson)] font-bold">
                  Possession
                </strong>
              </p>
            }
          />
        </div>
        <DiscussionCard prompt="If your company wants to train an LLM on historical cultural texts, including Indigenous knowledge, how do you navigate the tension between 'data scraping' for innovation versus respecting Data Sovereignty?" />
      </Slide>

      {/* Section 5: Mitigation */}
      <Slide>
        <SectionHeader
          title="Mitigation Strategies"
          highlight="For Business Leaders"
        />
        <div className="space-y-4 mb-16 mt-8">
          <StrategyRow
            number="01"
            title="Mandate Diverse Teams"
            description="Diversity in the engineering room leads to diversity in thought, catching critical edge cases before products ship."
          />
          <StrategyRow
            number="02"
            title="Implement AI Audits"
            description="Third-party algorithmic auditing should become as standardized and expected as financial auditing."
          />
          <StrategyRow
            number="03"
            title="Human-in-the-Loop (HITL)"
            description="High-stakes automated decisions (loans, HR hiring, healthcare triage) must always have a human override pathway."
          />
          <StrategyRow
            number="04"
            title="Transparent Governance"
            description="Establish clear, enforceable ethical guidelines, transparent reporting, and executive accountability structures."
          />
        </div>
        <DiscussionCard
          title="Final Scenario"
          prompt='As a future business leader, what is the very first question you will ask a vendor selling you a "proprietary, black box" AI solution for your HR department?'
          className="bg-[var(--surface)] border-[var(--crimson)] shadow-[0_10px_40px_rgba(139,0,0,0.05)]"
        />
      </Slide>
    </SlideDeck>
  );
}
