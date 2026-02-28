"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // 1. Cinematic Animations Setup
    let ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        ".hero-text",
        {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.15,
        },
      );

      gsap.fromTo(
        ".course-card",
        {
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        },
      );

      // Smooth custom snapping via GSAP ScrollTrigger
      const sections = gsap.utils.toArray("section");

      // Apply smooth snap on desktop sizes to preserve native mobile feel,
      // but override CSS scroll snap which is too rigid.
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // By assigning the trigger to the container, we ensure GSAP knows
        // exactly what scroll area to measure for the snap.
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.8, max: 1.5 },
            delay: 0.1,
            ease: "power3.inOut",
          },
        });
      });
    }, containerRef);

    // 2. Three.js Cinematic Background
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    // Using cream background fog
    scene.fog = new THREE.FogExp2(0xf9f7f5, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Abstract geometric structure for the landing page (Network of AI nodes)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x8b0000, // Crimson Deep
      transparent: true,
      opacity: 0.2,
      blending: THREE.NormalBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // Large wireframe sphere (The "Globe" or "AI Brain")
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Subtle Gold
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.005;
      mouseY = (event.clientY - windowHalfY) * 0.005;
    };

    document.addEventListener("mousemove", onDocumentMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.0015;

      // Gentle floating
      sphere.position.y = Math.sin(Date.now() * 0.001) * 2;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-[var(--charcoal-light)] overflow-x-hidden"
    >
      {/* 3D Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Overlay gradient for legibility - tailored for light academic theme */}
      <div className="fixed inset-0 bg-gradient-to-b from-[var(--background)]/60 via-[var(--background)]/80 to-[var(--background)] z-0 pointer-events-none"></div>

      {/* Page 1: Hero Content */}
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-16 md:py-0">
        {/* Hero Section */}
        <header className="max-w-4xl text-center">
          <h1 className="hero-text text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 md:mb-8 leading-tight">
            Applications of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--crimson)] to-[var(--crimson-light)]">
              AI
            </span>{" "}
            in Business
          </h1>
          <p className="hero-text text-[var(--charcoal-light)] text-lg sm:text-xl lg:text-3xl font-light mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between technical capability and strategic
            executive value.
          </p>

          <div className="hero-text flex flex-col gap-4 items-center justify-between mt-8 md:mt-16 max-w-3xl mx-auto border-t border-b border-[var(--charcoal)]/10 py-6">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="text-[var(--crimson)] font-black text-lg sm:text-xl tracking-wider uppercase font-serif">
                BUSI 654
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center sm:text-right">
                <p className="text-sm font-semibold text-center text-[var(--charcoal)] tracking-widest uppercase mb-1">
                  Dr. Davood Wadi
                </p>
                <p className="text-xs text-[var(--charcoal-light)] text-center font-medium tracking-widest uppercase">
                  Lecturer
                </p>
              </div>
            </div>
          </div>
        </header>
      </section>

      {/* Page 2: Course Modules Row */}
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-24 md:py-16 bg-[var(--background)]/80 md:bg-[var(--background)]/30 backdrop-blur-sm">
        <main className="w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-8 hero-text">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--charcoal)]">
              Course Modules
            </h2>
            <div className="h-px bg-[var(--charcoal)]/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Week 1 */}
            <Link href="/courses/01-introduction" className="course-card block group">
              <div className="relative bg-[var(--background)] border-t-[4px] border-t-[var(--crimson)] p-8 h-full transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden">
                <span className="text-[var(--crimson)] font-bold tracking-widest uppercase text-xs mb-3 block">
                  Week 01
                </span>
                <h3 className="text-2xl font-black text-[var(--charcoal)] mb-4">
                  Introduction
                </h3>
                <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
                  Navigating the Business Landscape of Artificial Intelligence.
                  From problem definitions to strategic ROI.
                </p>
                <div className="inline-block px-8 py-3 bg-[var(--crimson)] text-[var(--surface)] font-semibold text-sm tracking-wide uppercase border border-[var(--crimson)] transition-all duration-300 group-hover:bg-[var(--charcoal)] group-hover:border-[var(--charcoal)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  View Deck
                </div>
              </div>
            </Link>

            {/* Week 6 */}
            <Link
              href="/courses/06-introduction-to-deep-learning"
              className="course-card block group"
            >
              <div className="relative bg-[var(--background)] border-t-[4px] border-t-[var(--gold)] p-8 h-full transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden">
                <span className="text-[var(--gold)] font-bold tracking-widest uppercase text-xs mb-3 block">
                  Week 06
                </span>
                <h3 className="text-2xl font-black text-[var(--charcoal)] mb-4">
                  Introduction to Deep Learning
                </h3>
                <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
                  A gentle introduction to deep learning
                </p>
                <div className="inline-block px-8 py-3 bg-[var(--gold)] text-[var(--charcoal)] font-semibold text-sm tracking-wide uppercase border border-[var(--gold)] transition-all duration-300 group-hover:bg-[var(--charcoal)] group-hover:text-[var(--surface)] group-hover:border-[var(--charcoal)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  View Deck
                </div>
              </div>
            </Link>

            {/* Week 7 */}
            <Link href="/courses/07-edii" className="course-card block group">
              <div className="relative bg-[var(--background)] border-t-[4px] border-t-[var(--gold)] p-8 h-full transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden">
                <span className="text-[var(--gold)] font-bold tracking-widest uppercase text-xs mb-3 block">
                  Week 07
                </span>
                <h3 className="text-2xl font-black text-[var(--charcoal)] mb-4">
                  EDII in AI
                </h3>
                <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
                  Equity, Diversity, Inclusion, and Indigeneity. Navigating the
                  ethical and operational risks of algorithmic bias.
                </p>
                <div className="inline-block px-8 py-3 bg-[var(--gold)] text-[var(--charcoal)] font-semibold text-sm tracking-wide uppercase border border-[var(--gold)] transition-all duration-300 group-hover:bg-[var(--charcoal)] group-hover:text-[var(--surface)] group-hover:border-[var(--charcoal)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  View Deck
                </div>
              </div>
            </Link>

            {/* Agentic AI */}
            <Link href="/courses/agentic-ai" className="course-card block group">
              <div className="relative bg-[var(--background)] border-t-[4px] border-t-[var(--gold)] p-8 h-full transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden">
                <span className="text-[var(--gold)] font-bold tracking-widest uppercase text-xs mb-3 block">
                  New Paradigm
                </span>
                <h3 className="text-2xl font-black text-[var(--charcoal)] mb-4">
                  Agentic AI and Vibe Coding
                </h3>
                <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
                  Moving away from manual syntax to autonomous agents and
                  orchestration.
                </p>
                <div className="inline-block px-8 py-3 bg-[var(--gold)] text-[var(--charcoal)] font-semibold text-sm tracking-wide uppercase border border-[var(--gold)] transition-all duration-300 group-hover:bg-[var(--charcoal)] group-hover:text-[var(--surface)] group-hover:border-[var(--charcoal)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  View Deck
                </div>
              </div>
            </Link>

            {/* Locked Module Placeholder */}
            <div className="course-card block opacity-50">
              <div className="relative bg-[var(--background)] border-t-[4px] border-t-[var(--charcoal-light)] p-8 h-full grayscale">
                <span className="text-[var(--charcoal-light)] font-bold tracking-widest uppercase text-xs mb-3 block">
                  Week 02
                </span>
                <h3 className="text-xl font-black text-[var(--charcoal-light)] mb-4">
                  AI Strategy & Architecture
                </h3>
                <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
                  Building the foundation for enterprise AI adoption.
                </p>
                <div className="inline-block px-8 py-3 bg-transparent text-[var(--charcoal-light)] font-semibold text-sm tracking-wide uppercase border border-[var(--charcoal-light)]">
                  Locked
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
