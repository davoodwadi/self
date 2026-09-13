"use client";

import { useEffect, useRef } from "react";

// ============================================================================
// ContourField — atmosphere behind the hero title. Faint contour lines of a
// slowly drifting surface, like a survey map seen through haze. It is texture
// only and carries no data, so it has no caption.
//
// Canvas 2D, no WebGL. Draws at ~30 fps, stops while the hero is off screen or
// the tab is hidden, and draws a single still frame under
// prefers-reduced-motion.
// ============================================================================

type Well = {
  /** Centre, as fractions of width (x) and height (y). */
  x: number;
  y: number;
  /** Spread, in units of height. */
  s: number;
  /** Depth: negative is a basin, positive a hill. */
  a: number;
  /** Drift amplitude and angular speed of the centre. */
  ox: number;
  oy: number;
  w: number;
  p: number;
};

// The busiest contours sit up and to the right, away from the title card.
const WELLS: Well[] = [
  { x: 0.7, y: 0.36, s: 0.2, a: -1.0, ox: 0.05, oy: 0.05, w: 0.9, p: 0 },
  { x: 0.9, y: 0.74, s: 0.15, a: -0.7, ox: 0.04, oy: 0.04, w: 1.3, p: 1.7 },
  { x: 0.34, y: 0.22, s: 0.17, a: -0.5, ox: 0.05, oy: 0.03, w: 1.1, p: 3.1 },
  { x: 0.52, y: 0.66, s: 0.2, a: 0.85, ox: 0.04, oy: 0.05, w: 0.7, p: 4.2 },
  { x: 0.14, y: 0.56, s: 0.24, a: 0.55, ox: 0.03, oy: 0.04, w: 1.0, p: 2.4 },
  { x: 0.86, y: 0.1, s: 0.13, a: 0.6, ox: 0.03, oy: 0.03, w: 1.2, p: 5.5 },
];

const LEVEL_MIN = -1.2;
const LEVEL_STEP = 0.075;
const LEVEL_COUNT = 30;
/** Every fourth level is drawn heavier, like the index contours on a survey map. */
const INDEX_EVERY = 4;

const CONTOUR = "rgba(239, 233, 221, 0.075)";
const CONTOUR_INDEX = "rgba(239, 233, 221, 0.19)";

const FIELD_SPEED = 0.09;
const FRAME_MS = 1000 / 30;

// Marching squares. Corners: TL=1 TR=2 BR=4 BL=8. Edges: 0 top, 1 right,
// 2 bottom, 3 left. The two saddle cases (5, 10) are resolved per cell.
const SEGMENTS: readonly (readonly [number, number] | null)[] = [
  null, [3, 0], [0, 1], [3, 1], [1, 2], null, [0, 2], [3, 2],
  [2, 3], [0, 2], null, [1, 2], [3, 1], [0, 1], [3, 0], null,
];
const SADDLE_A = [[0, 1], [2, 3]] as const;
const SADDLE_B = [[3, 0], [1, 2]] as const;

const point = [0, 0];

function edgePoint(
  edge: number,
  a: number,
  b: number,
  c: number,
  d: number,
  level: number,
  x0: number,
  y0: number,
  cell: number,
) {
  switch (edge) {
    case 0:
      point[0] = x0 + (cell * (level - a)) / (b - a);
      point[1] = y0;
      break;
    case 1:
      point[0] = x0 + cell;
      point[1] = y0 + (cell * (level - b)) / (c - b);
      break;
    case 2:
      point[0] = x0 + (cell * (level - d)) / (c - d);
      point[1] = y0 + cell;
      break;
    default:
      point[0] = x0;
      point[1] = y0 + (cell * (level - a)) / (d - a);
  }
}

export function ContourField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let cell = 13;
    let cols = 0;
    let rows = 0;
    let values = new Float32Array(0);

    // Field coordinates are in units of canvas height: X = px / h, Y = py / h.
    const cx = new Float64Array(WELLS.length);
    const cy = new Float64Array(WELLS.length);
    const k = new Float64Array(WELLS.length);
    let fieldTime = 0;

    const setField = (t: number) => {
      const aspect = width / height;
      fieldTime = t;
      for (let i = 0; i < WELLS.length; i++) {
        const w = WELLS[i];
        cx[i] = (w.x + w.ox * Math.sin(t * w.w + w.p)) * aspect;
        cy[i] = w.y + w.oy * Math.cos(t * w.w * 0.8 + w.p);
        k[i] = 1 / (2 * w.s * w.s);
      }
    };

    const field = (X: number, Y: number) => {
      let v =
        0.07 *
        Math.sin(3.1 * X + 0.6 * fieldTime) *
        Math.sin(2.4 * Y - 0.45 * fieldTime);
      for (let i = 0; i < WELLS.length; i++) {
        const dx = X - cx[i];
        const dy = Y - cy[i];
        v += WELLS[i].a * Math.exp(-(dx * dx + dy * dy) * k[i]);
      }
      return v;
    };

    const drawContours = () => {
      const stride = cols + 1;
      const inv = 1 / height;
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          values[j * stride + i] = field(i * cell * inv, j * cell * inv);
        }
      }

      const minor = new Path2D();
      const major = new Path2D();

      for (let j = 0; j < rows; j++) {
        const y0 = j * cell;
        for (let i = 0; i < cols; i++) {
          const a = values[j * stride + i];
          const b = values[j * stride + i + 1];
          const c = values[(j + 1) * stride + i + 1];
          const d = values[(j + 1) * stride + i];
          const lo = Math.min(a, b, c, d);
          const hi = Math.max(a, b, c, d);
          const from = Math.max(0, Math.ceil((lo - LEVEL_MIN) / LEVEL_STEP));
          const to = Math.min(
            LEVEL_COUNT - 1,
            Math.floor((hi - LEVEL_MIN) / LEVEL_STEP),
          );
          if (from > to) continue;

          const x0 = i * cell;
          for (let lv = from; lv <= to; lv++) {
            const L = LEVEL_MIN + lv * LEVEL_STEP;
            const kase =
              (a >= L ? 1 : 0) |
              (b >= L ? 2 : 0) |
              (c >= L ? 4 : 0) |
              (d >= L ? 8 : 0);
            if (kase === 0 || kase === 15) continue;

            const path = lv % INDEX_EVERY === 0 ? major : minor;
            const pairs =
              kase === 5 || kase === 10
                ? (kase === 5) === (a + b + c + d) / 4 >= L
                  ? SADDLE_A
                  : SADDLE_B
                : [SEGMENTS[kase]!];

            for (const [e0, e1] of pairs) {
              edgePoint(e0, a, b, c, d, L, x0, y0, cell);
              path.moveTo(point[0], point[1]);
              edgePoint(e1, a, b, c, d, L, x0, y0, cell);
              path.lineTo(point[0], point[1]);
            }
          }
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = CONTOUR;
      ctx.stroke(minor);
      ctx.strokeStyle = CONTOUR_INDEX;
      ctx.stroke(major);
    };

    let elapsed = 0;

    const render = () => {
      setField(elapsed * FIELD_SPEED);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      drawContours();
    };

    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!last) last = now;
      const dt = now - last;
      if (dt < FRAME_MS) return;
      last = now;
      elapsed += Math.min(dt, 250) / 1000;
      render();
    };

    const start = () => {
      if (raf || reduced) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    let onScreen = true;
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const small = width < 700;
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      cell = small ? 11 : 13;
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      values = new Float32Array((cols + 1) * (rows + 1));
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      sync();
    });
    visibility.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 block h-full w-full ${className}`}
    />
  );
}
