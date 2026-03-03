"use client";

import { useEffect, useRef } from "react";

/**
 * AcademicBackground
 *
 * A refined, subtle background that evokes the feel of ink on parchment.
 * Uses slowly drifting, organic noise-like shapes with gentle gradients
 * instead of the cliché particle-network effect.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    // Simple 2D noise-like function using sin combinations
    const noise = (x: number, y: number, t: number): number => {
      return (
        (Math.sin(x * 0.01 + t * 0.2) * Math.cos(y * 0.012 + t * 0.15) * 0.5 +
          Math.sin(x * 0.005 - t * 0.1 + y * 0.008) * 0.3 +
          Math.cos(x * 0.008 + y * 0.006 + t * 0.05) * 0.2) *
          0.5 +
        0.5
      );
    };

    // Draw soft, organic luminous shapes
    const drawAmbientField = () => {
      if (!ctx) return;

      // Very subtle base wash
      ctx.fillStyle = "rgba(10, 10, 10, 0.03)";
      ctx.fillRect(0, 0, width, height);

      // Draw several drifting, soft elliptical glows
      const shapes = [
        {
          // Top-right subtle glow
          cx: width * 0.65 + Math.sin(time * 0.08) * 40,
          cy: height * 0.25 + Math.cos(time * 0.06) * 30,
          rx: width * 0.3,
          ry: height * 0.25,
          color: [22, 40, 70], // deep midnight blue
          alpha: 0.03,
        },
        {
          // Bottom-left cool accent
          cx: width * 0.35 + Math.cos(time * 0.05) * 35,
          cy: height * 0.65 + Math.sin(time * 0.07) * 25,
          rx: width * 0.28,
          ry: height * 0.3,
          color: [18, 32, 55], // darker navy
          alpha: 0.025,
        },
        {
          // Center subtle warmth
          cx: width * 0.5 + Math.sin(time * 0.03) * 20,
          cy: height * 0.45 + Math.cos(time * 0.04) * 15,
          rx: width * 0.35,
          ry: height * 0.35,
          color: [20, 28, 45], // slate-navy
          alpha: 0.02,
        },
      ];

      for (const shape of shapes) {
        const gradient = ctx.createRadialGradient(
          shape.cx,
          shape.cy,
          0,
          shape.cx,
          shape.cy,
          Math.max(shape.rx, shape.ry),
        );
        gradient.addColorStop(
          0,
          `rgba(${shape.color.join(",")}, ${shape.alpha})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${shape.color.join(",")}, ${shape.alpha * 0.4})`,
        );
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(shape.cx, shape.cy, shape.rx, shape.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw gentle grain texture overlay (sparse, slow-moving specks)
    const drawGrain = () => {
      if (!ctx) return;

      // Sparse specks that feel like paper grain / distant stars
      const speckCount = Math.floor((width * height) / 8000);
      for (let i = 0; i < speckCount; i++) {
        const x =
          noise(i * 73.1, i * 31.7, time * 0.02) * width * 1.2 - width * 0.1;
        const y =
          noise(i * 47.3, i * 91.1, time * 0.015) * height * 1.2 - height * 0.1;
        const brightness = noise(i * 13.7, i * 67.3, time * 0.03);

        if (brightness > 0.65) {
          const alpha = (brightness - 0.65) * 0.15;
          const radius = brightness * 1.2;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 200, 230, ${alpha})`;
          ctx.fill();
        }
      }
    };

    // Draw very faint ruled-line hints (like faded notebook lines)
    const drawSubtleLines = () => {
      if (!ctx) return;

      const lineSpacing = 120;
      const lineCount = Math.ceil(height / lineSpacing);

      for (let i = 0; i < lineCount; i++) {
        const y = i * lineSpacing + 60;
        const waveOffset = Math.sin(time * 0.03 + i * 0.5) * 2;

        ctx.beginPath();
        ctx.moveTo(0, y + waveOffset);

        // Slight wave to make it organic
        for (let x = 0; x < width; x += 50) {
          const yOff = Math.sin(x * 0.003 + time * 0.02 + i) * 1.5;
          ctx.lineTo(x, y + waveOffset + yOff);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, 0.012)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx) return;

      // Full clear each frame
      ctx.clearRect(0, 0, width, height);

      drawAmbientField();
      drawSubtleLines();
      drawGrain();

      time += 0.016;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);

    resize();
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
      className="fixed top-0 left-0 w-full h-full -z-[1] opacity-70 pointer-events-none"
    />
  );
}
