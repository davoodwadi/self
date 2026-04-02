"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { CourseCard } from "../_components/CourseCard";
import { Footer } from "../_components/Footer";

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
          opacity: 0,
          filter: "blur(10px)",
        },
        {
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
            A hands-on course on the use-cases of the latest AI technology in
            business landscape.
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
            <CourseCard
              href="/courses/01-introduction"
              label="Week 01"
              title="Introduction"
              description="A recap of fundamentals of AI"
              isLocked
            />

            <CourseCard
              label="Week 02"
              title="AI Strategy & Architecture"
              description="Building the foundation for enterprise AI adoption."
              isLocked
            />

            <CourseCard
              href="/courses/06-introduction-to-deep-learning"
              label="Week 06"
              title="Introduction to Deep Learning"
              description="A gentle introduction to deep learning"
              variant="gold"
              isLocked
            />

            <CourseCard
              href="/courses/07-edii"
              label="Week 07"
              title="EDII in AI"
              description="Equity, Diversity, Inclusion, and Indigeneity. The ethical and operational risks of algorithmic bias."
              variant="crimson"
            />

            <CourseCard
              href="/courses/08-sustainability"
              label="Week 08"
              title="Sustainability in AI"
              description="How to create sustainable AI models. How to use AI to create a sustainable future."
              variant="gold"
            />

            <CourseCard
              href="/courses/09-product-development"
              label="Week 09"
              title="AI in Product Development"
              description="Latest agentic AI tools for product development."
              variant="gold"
            />

            <CourseCard
              href="/courses/agentic-ai"
              label="New Paradigm"
              title="Agentic AI and Vibe Coding"
              description="Moving away from manual syntax to autonomous agents and orchestration."
              variant="crimson"
            />
          </div>
        </main>
      </section>

      <Footer />
    </div>
  );
}
