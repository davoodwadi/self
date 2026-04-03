"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Map background strings from frontmatter to actual React components
const backgrounds: Record<string, React.FC> = {
  introduction: IntroductionBackground,
  marketing: IntroductionBackground,
  edii: EDIITreeBackground,
  agentic: AgenticAITreeBackground,
  sustainability: SustainabilityBackground,
  "product-development": ProductDevelopmentBackground,
  operations: OperationsBackground,
  strategy: StrategyBackground,
  // More backgrounds can be added here
};

export function BackgroundManager({
  type,
  onReady,
}: {
  type?: string;
  onReady?: () => void;
}) {
  if (!type) {
    if (onReady) onReady();
    return null;
  }
  const BgComponent = backgrounds[type];
  if (!BgComponent) {
    console.warn(`Background type "${type}" not found.`);
    if (onReady) onReady();
    return null;
  }
  // @ts-ignore
  return <BgComponent onReady={onReady} />;
}

// === Specific Background Implementations below === //

function createSoftParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(80, 80, 0, 80, 80, 80);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.92)");
  gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.44)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.08)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function IntroductionBackground({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = window.innerWidth < 900 ? 48 : 44;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const particleTexture = createSoftParticleTexture();
    if (!particleTexture) {
      if (onReady) onReady();
      return;
    }

    const fieldGroup = new THREE.Group();
    scene.add(fieldGroup);

    const compactView = window.innerWidth < 900;

    // Keep the center comparatively open so title and slide copy stay readable.
    const clusterAnchors = [
      new THREE.Vector3(-18, 10, -12),
      new THREE.Vector3(0, -12, -8),
      new THREE.Vector3(18, 7, -10),
    ];

    const pickClusterAnchor = () => {
      const roll = Math.random();
      if (roll < 0.34) return clusterAnchors[0];
      if (roll < 0.67) return clusterAnchors[1];
      return clusterAnchors[2];
    };

    const createParticleLayer = ({
      count,
      spreadX,
      spreadY,
      spreadZ,
      color,
      size,
      opacity,
    }: {
      count: number;
      spreadX: number;
      spreadY: number;
      spreadZ: number;
      color: number;
      size: number;
      opacity: number;
    }) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let index = 0; index < count; index += 1) {
        const anchor = pickClusterAnchor();
        const offset = index * 3;
        positions[offset] =
          anchor.x + (Math.random() + Math.random() - 1) * spreadX;
        positions[offset + 1] =
          anchor.y + (Math.random() + Math.random() - 1) * spreadY;
        positions[offset + 2] =
          anchor.z + (Math.random() + Math.random() - 1) * spreadZ;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const material = new THREE.PointsMaterial({
        map: particleTexture,
        color,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        depthTest: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      fieldGroup.add(points);

      return { geometry, material, points };
    };

    const particleLayers = [
      createParticleLayer({
        count: compactView ? 44 : 58,
        spreadX: 16,
        spreadY: 12,
        spreadZ: 11,
        color: 0xe5d7c8,
        size: compactView ? 2.35 : 2.85,
        opacity: 0.18,
      }),
      createParticleLayer({
        count: compactView ? 52 : 72,
        spreadX: 13,
        spreadY: 8,
        spreadZ: 13,
        color: 0x8c7349,
        size: compactView ? 1.2 : 1.45,
        opacity: 0.12,
      }),
      createParticleLayer({
        count: compactView ? 22 : 30,
        spreadX: 9,
        spreadY: 6,
        spreadZ: 14,
        color: 0x8b0000,
        size: compactView ? 0.64 : 0.82,
        opacity: 0.08,
      }),
    ];

    // Large soft sprites create the paper-like atmospheric blooms.
    const bloomDescriptors = [
      {
        color: 0xf0e3d6,
        opacity: 0.22,
        scale: compactView ? 28 : 36,
        position: new THREE.Vector3(-21, 12, -22),
        driftX: 1.6,
        driftY: 0.8,
        speed: 0.18,
        phase: 0.2,
      },
      {
        color: 0xd5c3aa,
        opacity: 0.18,
        scale: compactView ? 24 : 32,
        position: new THREE.Vector3(0, -14, -24),
        driftX: 1.2,
        driftY: 1.0,
        speed: 0.22,
        phase: 1.4,
      },
      {
        color: 0xcfaa86,
        opacity: 0.13,
        scale: compactView ? 22 : 28,
        position: new THREE.Vector3(20, 8, -20),
        driftX: 1.4,
        driftY: 0.7,
        speed: 0.16,
        phase: 2.1,
      },
      {
        color: 0x8b0000,
        opacity: 0.06,
        scale: compactView ? 18 : 24,
        position: new THREE.Vector3(14, -2, -18),
        driftX: 1.1,
        driftY: 0.65,
        speed: 0.12,
        phase: 2.8,
      },
    ];

    const blooms = bloomDescriptors.map((descriptor) => {
      const material = new THREE.SpriteMaterial({
        map: particleTexture,
        color: descriptor.color,
        transparent: true,
        opacity: descriptor.opacity,
        depthWrite: false,
        depthTest: false,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.copy(descriptor.position);
      sprite.scale.set(descriptor.scale, descriptor.scale, 1);
      fieldGroup.add(sprite);

      return {
        ...descriptor,
        material,
        sprite,
        basePosition: descriptor.position.clone(),
      };
    });

    const clock = new THREE.Clock();
    const motionState = { scroll: 0 };
    let animationFrameId = 0;

    const scrollTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.to(motionState, {
          scroll: self.progress,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      fieldGroup.rotation.y =
        -0.12 + Math.sin(elapsed * 0.12) * 0.03 + motionState.scroll * 0.2;
      fieldGroup.rotation.z =
        -0.03 + Math.cos(elapsed * 0.16) * 0.025 + motionState.scroll * 0.08;
      fieldGroup.position.y =
        Math.sin(elapsed * 0.22) * 1.1 - motionState.scroll * 1.8;

      particleLayers[0].points.rotation.y = elapsed * 0.02;
      particleLayers[1].points.rotation.y = -elapsed * 0.025;
      particleLayers[2].points.rotation.y = elapsed * 0.03;
      particleLayers[1].points.rotation.z = Math.sin(elapsed * 0.18) * 0.02;
      particleLayers[2].points.rotation.x = Math.cos(elapsed * 0.2) * 0.015;

      blooms.forEach((bloom) => {
        bloom.sprite.position.x =
          bloom.basePosition.x +
          Math.sin(elapsed * bloom.speed + bloom.phase) * bloom.driftX;
        bloom.sprite.position.y =
          bloom.basePosition.y +
          Math.cos(elapsed * (bloom.speed * 0.85) + bloom.phase) * bloom.driftY;
      });

      const targetCameraZ = compactView
        ? 48 - motionState.scroll * 1.4
        : 44 - motionState.scroll * 1.8;
      const targetCameraX = Math.sin(elapsed * 0.18) * 1.6;
      const targetCameraY = Math.cos(elapsed * 0.14) * 0.8;

      camera.position.x += (targetCameraX - camera.position.x) * 0.03;
      camera.position.y += (targetCameraY - camera.position.y) * 0.03;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = window.innerWidth < 900 ? 48 : 44;
    };

    window.addEventListener("resize", handleResize);
    const readyTimer = window.setTimeout(() => {
      if (onReady) onReady();
    }, 50);

    return () => {
      window.clearTimeout(readyTimer);
      cancelAnimationFrame(animationFrameId);
      scrollTrigger.kill();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particleTexture.dispose();
      particleLayers.forEach((layer) => {
        layer.geometry.dispose();
        layer.material.dispose();
      });
      blooms.forEach((bloom) => {
        bloom.material.dispose();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

function SustainabilityBackground({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = React.useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import FOG to avoid SSR and module resolution issues
    let currentEffect: any = null;

    const loadVanta = async () => {
      try {
        // Ensure THREE is globally available for Vanta
        if (typeof window !== "undefined") {
          // @ts-ignore
          window.THREE = THREE;
        }

        // @ts-ignore
        const FOG =
          (await import("vanta/dist/vanta.fog.min")).default ||
          (await import("vanta/dist/vanta.fog.min"));

        currentEffect = FOG({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x86efac, // Light green
          midtoneColor: 0x4ade80, // Brighter green
          lowlightColor: 0x22c55e, // Deeper green
          baseColor: 0xffffff, // Pure white background
          blurFactor: 0.9, // Higher blur to make fog smoother
          zoom: 1.0,
          speed: 0.8,
        });
        setVantaEffect(currentEffect);
        if (onReady) onReady();
      } catch (error) {
        console.error("Error initializing Vanta FOG:", error);
        if (onReady) onReady();
      }
    };

    loadVanta();

    return () => {
      if (currentEffect && currentEffect.destroy) {
        currentEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
    />
  );
}

function EDIITreeBackground({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

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

    // Create a Simple Seesaw Scale symbolizing Equality
    const scaleGroup = new THREE.Group();
    scaleGroup.scale.set(2, 2, 2);

    // Shared material for the scale
    const scaleMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Subtle Gold
      wireframe: false,
      transparent: true,
      opacity: 0.15, // lowered slightly since it is solid now
    });

    // 1. Center Triangle Pivot (Fulcrum)
    const fulcrumGeometry = new THREE.ConeGeometry(3, 3, 3);
    const fulcrum = new THREE.Mesh(fulcrumGeometry, scaleMaterial);
    fulcrum.position.y = -1.5;
    // Rotate so a flat face is parallel to the beam. For a 3-sided cone,
    // the vertices are at 0, 120, 240 degrees. To have a flat face facing front,
    // we need to rotate it by -Math.PI / 2 (or Math.PI / 2 depending on the look).
    fulcrum.rotation.y = -Math.PI / 2;
    scaleGroup.add(fulcrum);

    // 2. Top Balance Beam (Seesaw Plank)
    const beamGeometry = new THREE.BoxGeometry(20, 0.5, 3);
    const beam = new THREE.Mesh(beamGeometry, scaleMaterial);
    beam.position.y = 0;

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

      const time = Date.now() * 0.0005;
      beamGroup.rotation.z = Math.sin(time) * 0.15;
      scaleGroup.rotation.y = Math.sin(time * 0.5) * 0.2;

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
      },
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Give it a tiny delay to ensure the canvas is painted
    setTimeout(() => {
      if (onReady) onReady();
    }, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      renderer.dispose();
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

function ProductDevelopmentBackground({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = React.useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let currentEffect: any = null;

    const loadVanta = async () => {
      try {
        // Ensure THREE is globally available for Vanta
        if (typeof window !== "undefined") {
          // @ts-ignore
          window.THREE = THREE;
        }

        // We use DOTS for Product Development to symbolize technical precision, grid-systems, and structure
        // @ts-ignore
        const DOTS =
          (await import("vanta/dist/vanta.dots.min")).default ||
          (await import("vanta/dist/vanta.dots.min"));

        currentEffect = DOTS({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0d9488,
          color2: 0xfffce1,
          backgroundColor: 0xfffce1,
          size: 2.5,
          spacing: 35.0,
          showLines: true,
        });
        setVantaEffect(currentEffect);
        if (onReady) onReady();
      } catch (error) {
        console.error("Error initializing Vanta DOTS:", error);
        if (onReady) onReady();
      }
    };

    loadVanta();

    return () => {
      if (currentEffect && currentEffect.destroy) {
        currentEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

function AgenticAITreeBackground({ onReady }: { onReady?: () => void }) {
  return <EDIITreeBackground onReady={onReady} />; // Reuse tree
}

function OperationsBackground({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleTexture = createSoftParticleTexture();
    if (!particleTexture) {
      if (onReady) onReady();
      return;
    }

    // Nodes (Locations)
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color("#8c7349"); // champagne
    const accentColor = new THREE.Color("#8B0000"); // crimson

    for (let i = 0; i < particleCount; i++) {
      const radius = 30 + Math.random() * 20;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixRatio = Math.random();
      const finalColor = baseColor
        .clone()
        .lerp(accentColor, mixRatio > 0.8 ? 1 : 0);

      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Edges (Supply Routes)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#a52a2a",
      transparent: true,
      opacity: 0.01,
      blending: THREE.AdditiveBlending,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = [];

    // Connect nodes if they are close
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 15) {
          linesPositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          );
        }
      }
    }

    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linesPositions, 3),
    );
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    const group = new THREE.Group();
    group.add(particles);
    group.add(lines);
    scene.add(group);

    // Initial positioning to avoid layout shift pop
    group.position.y = -20;
    group.rotation.x = Math.PI / 6;

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.000001;
      group.rotation.y = time * 0.0005;

      const positionsAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const iy = i * 3 + 1;
        // Subtle pulsing
        positionsAttr.array[iy] += Math.sin(time * 5 + i) * 0.002;
      }
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    if (onReady) {
      // Small delay to ensure canvas is painted before revealing
      setTimeout(onReady, 50);
    }
    render();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // GSAP Scroll Animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        // Rotate globe as user scrolls
        gsap.to(group.rotation, {
          y: time * 0.5 + self.progress * Math.PI,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scrollTrigger.kill();
      geometry.dispose();
      material.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [onReady]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

// --- Strategy Background ---
function StrategyBackground({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 20;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Floating data particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 50;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 60;
      particlePos[i * 3 + 1] = Math.random() * 15 - 2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3),
    );
    const texture = createSoftParticleTexture();
    const particleMat = new THREE.PointsMaterial({
      color: 0x990000,
      size: 0.5,
      map: texture,
      transparent: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animationFrame: number;
    let time = 0;
    const animate = () => {
      time += 0.0001; // slower rotation
      particles.rotation.y = time * 0.05;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const y = positions[i * 3 + 1];
        if (y > 15) {
          positions[i * 3 + 1] = -2;
        } else {
          positions[i * 3 + 1] += 0.005; // slower upward floating
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    if (onReady) {
      setTimeout(onReady, 100);
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
