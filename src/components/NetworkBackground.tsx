"use client";

import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticle = () => {
      const p = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        },
        draw() {
          if (!ctx) return;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(96, 165, 250, 0.5)"; // accent-400
          ctx.fill();
        },
      };
      return p;
    };

    type Particle = ReturnType<typeof createParticle>;

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const drawConnections = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 150)})`; // accent-500
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Initialize
    resize();
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="network-canvas"
      className="fixed top-0 left-0 w-full h-full -z-[1] opacity-60 pointer-events-none"
    />
  );
}
