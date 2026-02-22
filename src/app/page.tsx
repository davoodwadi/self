"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Cinematic Animations Setup
    let ctx = gsap.context(() => {
      gsap.fromTo(".hero-text", 
        {
          y: 40,
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      gsap.fromTo(".course-card", 
        {
          y: 60,
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }, containerRef);

    // 2. Three.js Cinematic Background
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0015);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Abstract geometric structure for the landing page (Network of AI nodes)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x6366f1, // Indigo
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Large wireframe sphere (The "Globe" or "AI Brain")
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4f46e5, 
      wireframe: true,
      transparent: true,
      opacity: 0.05
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

    document.addEventListener('mousemove', onDocumentMouseMove);

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
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-neutral-950 text-white selection:bg-indigo-500 selection:text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* 3D Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Overlay gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/80 to-neutral-950 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-8 py-16 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <header className="max-w-4xl text-center mb-24 mt-12">
          <h2 className="hero-text inline-block px-4 py-1.5 mb-6 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-md bg-indigo-500/10">
            BUSI 654
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            Applications of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">AI</span> in Business
          </h1>
          <p className="hero-text text-neutral-400 text-xl lg:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between technical capability and strategic executive value.
          </p>
          
          <div className="hero-text inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-transform hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black border border-indigo-500/50 text-lg">
              DW
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-neutral-100 tracking-wide">Dr. Davood Wadi</p>
              <p className="text-sm text-indigo-400/80 font-medium tracking-widest uppercase">Lead Lecturer</p>
            </div>
          </div>
        </header>

        {/* Course Modules Grid */}
        <main className="w-full">
          <div className="flex items-center gap-4 mb-8 hero-text">
            <h2 className="text-2xl font-bold tracking-tight text-white">Course Modules</h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Week 1 */}
            <Link href="/01-introduction" className="course-card block group">
              <div className="relative bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-neutral-800/80 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-500"></div>
                <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 block">Week 01</span>
                <h3 className="text-2xl font-black text-neutral-100 mb-4 group-hover:text-white transition-colors">Introduction</h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">
                  Navigating the Business Landscape of Artificial Intelligence. From problem definitions to strategic ROI.
                </p>
                <div className="mt-8 flex items-center text-indigo-400 text-sm font-bold tracking-wide uppercase group-hover:text-indigo-300 transition-colors">
                  View Deck <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Week 7 */}
            <Link href="/07-edii" className="course-card block group">
              <div className="relative bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:bg-neutral-800/80 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/50 transition-all duration-500"></div>
                <span className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-3 block">Week 07</span>
                <h3 className="text-2xl font-black text-neutral-100 mb-4 group-hover:text-white transition-colors">EDII in AI</h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">
                  Equity, Diversity, Inclusion, and Indigeneity. Navigating the ethical and operational risks of algorithmic bias.
                </p>
                <div className="mt-8 flex items-center text-purple-400 text-sm font-bold tracking-wide uppercase group-hover:text-purple-300 transition-colors">
                  View Deck <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Locked Module Placeholder */}
            <div className="course-card block opacity-40">
              <div className="relative bg-neutral-900/40 backdrop-blur-md border border-neutral-800/50 rounded-2xl p-8 h-full">
                <span className="text-neutral-500 font-bold tracking-widest uppercase text-xs mb-3 block">Week 02</span>
                <h3 className="text-xl font-black text-neutral-500 mb-4">AI Strategy & Architecture</h3>
                <div className="mt-8 flex items-center text-neutral-600 text-sm font-bold tracking-wide uppercase">
                  Locked
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
