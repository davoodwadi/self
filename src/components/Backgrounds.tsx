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
  edii: EDIITreeBackground,
  // More backgrounds can be added here
};

export function BackgroundManager({ type }: { type?: string }) {
  if (!type) return null;
  const BgComponent = backgrounds[type];
  if (!BgComponent) {
    console.warn(`Background type "${type}" not found.`);
    return null;
  }
  return <BgComponent />;
}

// === Specific Background Implementations below === //

function EDIITreeBackground() {
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
    const fulcrumGeometry = new THREE.ConeGeometry(3, 6, 3);
    const fulcrum = new THREE.Mesh(fulcrumGeometry, scaleMaterial);
    fulcrum.position.y = -3;
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
