/* ==========================================================================
   Week 09 plates: Regression and Marketing Response Models.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.

   Data: the plates on correlation, least squares, fit, multicollinearity,
   omitted variables, marketing mix and overfitting run on made-up data. The
   two AI-agent plates use Wadi & Ma (2026b), Table W2 (cent-to-dollar
   ratios, Study 1 baseline) and Wadi & Ma (2026c),
   Tables 7 and 8 (moderated mediation, Study 1).
   ========================================================================== */

import React, { useState } from "react";
import {
  Frame,
  Key,
  Note,
  Display,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER3,
  COUNTER_TINT,
  head,
  headAlong,
  r2,
  seeded,
  PlateButton,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1, Store1 } from "../_visuals/objects";
import { Tag, Megaphone, Television, MonitorPlay, Browser, ShareNetwork, Envelope, MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";

/* --------------------------------------------------------------------------
   Shared helpers
   -------------------------------------------------------------------------- */

/** Standard normal draws from a seeded stream (Box-Muller). */
function normals(seed: number, n: number) {
  const rnd = seeded(seed);
  return Array.from({ length: n }, () => {
    const u = Math.max(rnd(), 1e-9);
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  });
}

const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;

/** Centre and scale a series to mean 0 and SD 1. */
function standardize(v: number[]) {
  const m = mean(v);
  const sd = Math.sqrt(mean(v.map((x) => (x - m) ** 2)));
  return v.map((x) => (x - m) / sd);
}

/**
 * Pointer handlers for a drag inside a plate: `onPoint` receives the pointer
 * in the plate's own viewBox units. Attach to the element students grab.
 */
function dragHandlers(onPoint: (x: number, y: number) => void) {
  const at = (e: React.PointerEvent<SVGElement>) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    onPoint(p.x, p.y);
  };
  return {
    onPointerDown: (e: React.PointerEvent<SVGElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      at(e);
    },
    onPointerMove: (e: React.PointerEvent<SVGElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) at(e);
    },
  };
}

const minus = (s: string) => s.replace("-", "−");
const fmt = (v: number, d = 2) => minus(v.toFixed(d));
const signed = (v: number, d = 2) => (v > 0 ? "+" : "") + fmt(v, d);

/* --------------------------------------------------------------------------
   Correlation
   -------------------------------------------------------------------------- */

/** Thirty stores: price and residual scores, centred, scaled and made orthogonal, so r is exact. */
const STORES_N = 30;
const STORE_X = standardize(normals(91, STORES_N));
const STORE_E = (() => {
  const e = standardize(normals(17, STORES_N));
  const b = mean(e.map((v, i) => v * STORE_X[i]));
  return standardize(e.map((v, i) => v - b * STORE_X[i]));
})();

/** Shelf heights from floor to top shelf, mirrored so the linear correlation is exactly zero. */
const SHELF = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1];
const SHELF_NOISE = [0.05, -0.06, 0.04, 0.07, -0.03, 0.02, -0.05, 0.03, -0.04, 0.06, 0.01];

/**
 * Correlation: thirty stores' price against weekly unit sales. Students drag
 * the marker along the r scale from −1 to +1 and watch the cloud of stores
 * tighten into a line or dissolve into a blob. −0.6 is the starting state.
 * Beside it, stores whose units rise and then fall with shelf height, a
 * strong relationship whose r is 0.00.
 */
export function CorrelationStrength() {
  const [r, setR] = useState(-0.6);
  const set = (v: number) => setR(Math.max(-1, Math.min(1, Math.round(v * 10) / 10)));

  // left panel: price against weekly units
  const L = 64;
  const R = 420;
  const T = 56;
  const B = 236;
  const X = (z: number) => r2(L + 18 + ((z + 2.4) / 4.8) * (R - L - 36));
  const Y = (z: number) => r2(B - 14 - ((z + 2.6) / 5.2) * (B - T - 28));
  const s = Math.sqrt(Math.max(0, 1 - r * r));

  // the r scale
  const sx0 = 84;
  const sx1 = 400;
  const sy = 304;
  const SX = (v: number) => r2(sx0 + ((v + 1) / 2) * (sx1 - sx0));

  // right panel: units by shelf height
  const L2 = 488;
  const R2 = 700;
  const X2 = (h: number) => r2(L2 + 22 + ((h + 1) / 2) * (R2 - L2 - 44));
  const Y2 = (u: number) => r2(B - 18 - u * (B - T - 50));

  return (
    <Frame
      width={720}
      height={350}
      label={`Thirty stores plotted by price and weekly unit sales with a correlation of r = ${fmt(r, 1)}${
        r === 0 ? ", no linear relationship" : Math.abs(r) === 1 ? `, a perfect ${r < 0 ? "negative" : "positive"} relationship` : ""
      }. A scale from −1 to +1 can be dragged to change r. Beside it, stores whose weekly units rise and then fall with shelf height: a strong nonlinear relationship with r = 0.00`}
    >
      <Key x={L} y={22}>WEEKLY UNITS BY PRICE</Key>
      <Display x={R} y={50} anchor="end" size={26} fill={SIGNAL}>{`r = ${fmt(r, 2)}`}</Display>

      {/* axes */}
      <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={R} y={B + 18} anchor="end" size={10}>PRICE</Key>
      <g transform={`translate(${L - 12} ${T}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" size={10}>UNITS</Key>
      </g>

      {STORE_X.map((x, i) => (
        <Store1 key={i} cx={X(x)} cy={Y(r * x + s * STORE_E[i])} k={0.62} />
      ))}

      {/* the r scale, the thing students drag */}
      <g className="cursor-ew-resize touch-none select-none" {...dragHandlers((x) => set(-1 + ((x - sx0) / (sx1 - sx0)) * 2))}>
        <rect x={sx0 - 16} y={sy - 18} width={sx1 - sx0 + 32} height={36} fill="transparent" />
        <line x1={sx0} y1={sy} x2={sx1} y2={sy} stroke={INK} strokeWidth={1.25} />
        {[-1, -0.5, 0, 0.5, 1].map((v) => (
          <line key={v} x1={SX(v)} y1={sy} x2={SX(v)} y2={sy + (v % 1 === 0 ? 7 : 5)} stroke={INK} strokeWidth={1.25} />
        ))}
        <g
          role="slider"
          tabIndex={0}
          aria-label="Correlation coefficient r"
          aria-valuemin={-1}
          aria-valuemax={1}
          aria-valuenow={r}
          className="outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") set(r + 0.1);
            else if (e.key === "ArrowLeft" || e.key === "ArrowDown") set(r - 0.1);
            else return;
            e.preventDefault();
          }}
        >
          <rect x={r2(SX(r) - 17)} y={sy - 9} width={34} height={18} rx={9} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
          <path d={`M${r2(SX(r) - 4)} ${sy - 4}L${r2(SX(r) - 10)} ${sy}L${r2(SX(r) - 4)} ${sy + 4}Z`} fill={SIGNAL} />
          <path d={`M${r2(SX(r) + 4)} ${sy - 4}L${r2(SX(r) + 10)} ${sy}L${r2(SX(r) + 4)} ${sy + 4}Z`} fill={SIGNAL} />
        </g>
      </g>
      <Display x={sx0 - 30} y={sy + 6} anchor="middle" size={20} fill={SIGNAL}>r</Display>
      <Key x={sx0} y={sy - 16} anchor="middle" size={10}>{"\u22121"}</Key>
      <Key x={SX(0)} y={sy - 16} anchor="middle" size={10}>0</Key>
      <Key x={sx1} y={sy - 16} anchor="middle" size={10}>+1</Key>
      <Key x={sx0 - 12} y={sy + 22} size={9}>PERFECT</Key>
      <Key x={sx0 - 12} y={sy + 34} size={9}>NEGATIVE</Key>
      <Key x={SX(0)} y={sy + 22} anchor="middle" size={9}>NO LINEAR</Key>
      <Key x={SX(0)} y={sy + 34} anchor="middle" size={9}>RELATIONSHIP</Key>
      <Key x={sx1 + 12} y={sy + 22} anchor="end" size={9}>PERFECT</Key>
      <Key x={sx1 + 12} y={sy + 34} anchor="end" size={9}>POSITIVE</Key>

      {/* right panel: rises, then falls */}
      <line x1={452} y1={14} x2={452} y2={336} stroke={RULE} strokeWidth={1} />
      <Key x={L2} y={22}>WEEKLY UNITS BY SHELF HEIGHT</Key>
      <Display x={R2} y={50} anchor="end" size={26}>r = 0.00</Display>
      <line x1={L2} y1={B} x2={R2} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R2, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L2} y1={B} x2={L2} y2={T - 6} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L2, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={R2} y={B + 18} anchor="end" size={10}>SHELF HEIGHT</Key>
      <g transform={`translate(${L2 - 12} ${T}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" size={10}>UNITS</Key>
      </g>
      {SHELF.map((h, i) => (
        <Store1 key={i} cx={X2(h)} cy={Y2(1 - h * h + SHELF_NOISE[i])} k={0.62} />
      ))}
      <Key x={r2((L2 + R2) / 2)} y={sy - 4} anchor="middle" size={9.5}>STRONG NONLINEAR</Key>
      <Key x={r2((L2 + R2) / 2)} y={sy + 11} anchor="middle" size={9.5}>RELATIONSHIP</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Simple and Multiple Regression
   -------------------------------------------------------------------------- */

/** Ten stores: advertising (thousands of dollars) and weekly sales (hundreds of units). */
const ADS = [2, 4, 5, 7, 9, 11, 13, 15, 17, 19];
const ADS_SALES = [52, 49, 62, 58, 72, 66, 80, 74, 89, 84];

function olsFit(x: number[], y: number[]) {
  const mx = mean(x);
  const my = mean(y);
  const b = x.reduce((acc, xi, i) => acc + (xi - mx) * (y[i] - my), 0) / x.reduce((acc, xi) => acc + (xi - mx) ** 2, 0);
  return { a: my - b * mx, b };
}
const ADS_OLS = olsFit(ADS, ADS_SALES);
const sse = (a: number, b: number) => ADS.reduce((acc, x, i) => acc + (ADS_SALES[i] - (a + b * x)) ** 2, 0);
const ADS_MIN = sse(ADS_OLS.a, ADS_OLS.b);

/**
 * Ordinary least squares: ten stores' advertising and weekly sales with a
 * line through them. Each store's difference from the line is drawn as a
 * square, and the bar adds the squares up. Students drag either end of the
 * line. Any move away from the least squares line makes the total grow.
 */
export function LeastSquares() {
  const xa = 0;
  const xb = 21;
  const [ends, setEnds] = useState({ ya: ADS_OLS.a + ADS_OLS.b * xa, yb: ADS_OLS.a + ADS_OLS.b * xb });
  const b = (ends.yb - ends.ya) / (xb - xa);
  const a = ends.ya - b * xa;
  const total = sse(a, b);
  const atMin = total - ADS_MIN < 0.01 * ADS_MIN;

  const L = 60;
  const R = 470;
  const T = 30;
  const B = 290;
  const X = (v: number) => r2(L + 6 + (v / 21) * (R - L - 16));
  const Y = (v: number) => r2(B - ((v - 36) / 66) * (B - T));
  const V = (py: number) => 36 + ((B - py) / (B - T)) * 66;
  const k = (B - T) / 66;
  // each end moves up to 14 units either side of the least squares line, so every square stays on the plate
  const home = { ya: ADS_OLS.a + ADS_OLS.b * xa, yb: ADS_OLS.a + ADS_OLS.b * xb };
  const clamp = (which: "ya" | "yb", v: number) => Math.max(home[which] - 14, Math.min(home[which] + 14, Math.round(v * 2) / 2));
  const setEnd = (which: "ya" | "yb", v: number) => setEnds((e) => ({ ...e, [which]: clamp(which, v) }));

  const tone = atMin ? SIGNAL : INK;
  const barMax = 6 * ADS_MIN;
  const bx0 = L;
  const bx1 = 490;
  const BX = (v: number) => r2(bx0 + (Math.min(v, barMax) / barMax) * (bx1 - bx0));
  // bars past 6× the minimum are capped. The number then sits at the cap

  const handle = (which: "ya" | "yb", xv: number) => {
    const cy = Y(ends[which]);
    return (
      <g
        className="cursor-ns-resize touch-none select-none"
        {...dragHandlers((_, y) => setEnd(which, V(y)))}
      >
        <rect x={X(xv) - 16} y={T - 10} width={32} height={B - T + 10} fill="transparent" />
        <g
          role="slider"
          tabIndex={0}
          aria-label={which === "ya" ? "Left end of the line" : "Right end of the line"}
          aria-valuemin={r2(home[which] - 14)}
          aria-valuemax={r2(home[which] + 14)}
          aria-valuenow={r2(ends[which])}
          className="outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowRight") setEnd(which, ends[which] + 1);
            else if (e.key === "ArrowDown" || e.key === "ArrowLeft") setEnd(which, ends[which] - 1);
            else return;
            e.preventDefault();
          }}
        >
          <rect x={X(xv) - 9} y={r2(cy - 17)} width={18} height={34} rx={9} fill={PAPER} stroke={tone} strokeWidth={2} />
          <path d={`M${X(xv) - 4} ${r2(cy - 4)}L${X(xv)} ${r2(cy - 10)}L${X(xv) + 4} ${r2(cy - 4)}Z`} fill={tone} />
          <path d={`M${X(xv) - 4} ${r2(cy + 4)}L${X(xv)} ${r2(cy + 10)}L${X(xv) + 4} ${r2(cy + 4)}Z`} fill={tone} />
        </g>
      </g>
    );
  };

  return (
    <Frame
      width={560}
      height={410}
      label={`Ten stores plotted by advertising and weekly sales, with a line Sales = ${a.toFixed(1)} ${b < 0 ? "−" : "+"} ${Math.abs(b).toFixed(2)} × Advertising. Each store's difference from the line is drawn as a square. The squares sum to ${Math.round(total)}${
        atMin ? ", the minimum: this is the least squares line" : `, against a minimum of ${Math.round(ADS_MIN)} for the least squares line`
      }. Either end of the line can be dragged`}
    >
      <Key x={L} y={16}>WEEKLY SALES BY ADVERTISING</Key>

      {/* axes */}
      <line x1={L} y1={B} x2={R + 10} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R + 10, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L} y1={B} x2={L} y2={T - 4} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L, T - 4, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={R + 10} y={B + 18} anchor="end" size={10}>ADVERTISING</Key>
      <g transform={`translate(${L - 12} ${T + 2}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" size={10}>SALES</Key>
      </g>

      {/* the squared differences */}
      {ADS.map((x, i) => {
        const py = Y(ADS_SALES[i]);
        const ly = Y(a + b * x);
        const side = r2(Math.abs(ADS_SALES[i] - (a + b * x)) * k);
        return (
          <rect key={i} x={X(x)} y={r2(Math.min(py, ly))} width={side} height={side} fill={PAPER3} stroke={INK3} strokeWidth={1} />
        );
      })}

      {/* the line */}
      <line x1={X(xa)} y1={Y(ends.ya)} x2={X(xb)} y2={Y(ends.yb)} stroke={tone} strokeWidth={2} />
      {ADS.map((x, i) => (
        <Store1 key={i} cx={X(x)} cy={Y(ADS_SALES[i])} k={0.7} />
      ))}
      {handle("ya", xa)}
      {handle("yb", xb)}

      {/* the equation and the sum of squares */}
      <Key x={L} y={B + 40} fill={tone} size={11}>
        {`SALES = ${a.toFixed(1)} ${b < 0 ? "\u2212" : "+"} ${Math.abs(b).toFixed(2)} \u00d7 ADVERTISING`}
      </Key>
      <Key x={L} y={B + 66} size={10}>SUM OF SQUARED DIFFERENCES</Key>
      <rect x={bx0} y={B + 76} width={r2(BX(total) - bx0)} height={12} fill={atMin ? SIGNAL : PAPER3} stroke={atMin ? SIGNAL : INK3} strokeWidth={1} />
      <Key x={r2(Math.min(BX(total) + 8, 500))} y={B + 86} size={10} fill={tone}>{Math.round(total).toLocaleString("en-US")}</Key>
      <line x1={BX(ADS_MIN)} y1={B + 72} x2={BX(ADS_MIN)} y2={B + 98} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={BX(ADS_MIN)} y={B + 112} anchor="middle" size={9.5} fill={SIGNAL}>MINIMUM</Key>
      {atMin ? (
        <Key x={540} y={B + 40} anchor="end" size={10} fill={SIGNAL}>ORDINARY LEAST SQUARES</Key>
      ) : null}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Interpreting Regression Coefficients
   -------------------------------------------------------------------------- */

const UNIT_VIEWS = [
  { id: "estimated", label: "As estimated" },
  { id: "cents", label: "Price in cents" },
  { id: "standardized", label: "Standardized" },
] as const;
type UnitView = (typeof UNIT_VIEWS)[number]["id"];

/** Across the stores: SD of price $0.50, of advertising $20,000, of weekly sales 1,000 units. */
const COEFS: Record<UnitView, { price: number; ads: number; priceUnit: string; adsUnit: string }> = {
  estimated: { price: -800, ads: 25, priceUnit: "UNITS PER $1 OF PRICE", adsUnit: "UNITS PER $1,000 OF ADVERTISING" },
  cents: { price: -8, ads: 25, priceUnit: "UNITS PER 1\u00a2 OF PRICE", adsUnit: "UNITS PER $1,000 OF ADVERTISING" },
  standardized: { price: -0.4, ads: 0.5, priceUnit: "SD OF SALES PER SD OF PRICE", adsUnit: "SD OF SALES PER SD OF ADVERTISING" },
};

/**
 * Standardized coefficients: the two coefficients of the sales model drawn
 * as bars from zero. As estimated, price dwarfs advertising. Restating price
 * in cents shrinks its bar a hundredfold without changing anything about the
 * stores. In standard deviation units, advertising carries the larger effect.
 */
export function CoefficientUnits() {
  const [view, setView] = useState<UnitView>("estimated");
  const c = COEFS[view];
  const max = Math.max(Math.abs(c.price), Math.abs(c.ads));
  const zero = 300;
  const span = 196;
  const W = (v: number) => r2((Math.abs(v) / max) * span);
  const std = view === "standardized";
  const tone = std ? SIGNAL : INK;
  const fmtC = (v: number) => (std ? signed(v, 2) : (v > 0 ? "+" : "\u2212") + Math.abs(v).toLocaleString("en-US"));
  const rows = [
    { y: 70, v: c.price, unit: c.priceUnit, Icon: Tag, aria: "price" },
    { y: 176, v: c.ads, unit: c.adsUnit, Icon: Megaphone, aria: "advertising" },
  ];

  return (
    <div>
      <Frame
        width={600}
        height={274}
        label={`The coefficients of price and advertising in the weekly sales model drawn as bars from zero, ${
          view === "estimated" ? "as estimated: −800 units per dollar of price and +25 units per thousand dollars of advertising" : view === "cents" ? "with price restated in cents: −8 units per cent and +25 units per thousand dollars of advertising" : "standardized: −0.40 standard deviations of sales per standard deviation of price and +0.50 per standard deviation of advertising"
        }`}
      >
        <line x1={zero} y1={34} x2={zero} y2={232} stroke={INK} strokeWidth={1.25} />
        <Key x={zero} y={22} anchor="middle" size={10}>0</Key>
        {rows.map((r) => {
          const w = W(r.v);
          const x = r.v < 0 ? zero - w : zero;
          return (
            <g key={r.aria}>
              <r.Icon x={r.v < 0 ? zero + 18 : zero - 50} y={r.y + 6} size={32} weight="regular" color={INK} />
              <rect x={r2(x)} y={r.y} width={w} height={44} fill={tone} />
              <Display x={r.v < 0 ? r2(x - 10) : r2(x + w + 10)} y={r.y + 32} anchor={r.v < 0 ? "end" : "start"} size={26} fill={tone}>
                {fmtC(r.v)}
              </Display>
              <Key x={r.v < 0 ? r2(zero - 4) : r2(zero + 4)} y={r.y + 64} anchor={r.v < 0 ? "end" : "start"} size={9.5}>
                {r.unit}
              </Key>
            </g>
          );
        })}
        {std ? (
          <Key x={300} y={266} anchor="middle" size={9}>SD OF PRICE $0.50 | SD OF ADVERTISING $20,000 | SD OF SALES 1,000 UNITS</Key>
        ) : null}
      </Frame>
      <Segmented label="Coefficients" options={[...UNIT_VIEWS]} value={view} onChange={setView} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Model Fit and Diagnostics
   -------------------------------------------------------------------------- */

/** OLS coefficients of y on the columns, intercept first, by Gauss-Jordan elimination. */
function olsCoefs(cols: number[][], y: number[]) {
  const X = y.map((_, i) => [1, ...cols.map((c) => c[i])]);
  const p = X[0].length;
  const A = Array.from({ length: p }, (_, r) => [
    ...Array.from({ length: p }, (_, c) => X.reduce((acc, row) => acc + row[r] * row[c], 0)),
    X.reduce((acc, row, i) => acc + row[r] * y[i], 0),
  ]);
  for (let c = 0; c < p; c++) {
    let piv = c;
    for (let r = c + 1; r < p; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r;
    [A[c], A[piv]] = [A[piv], A[c]];
    for (let r = 0; r < p; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k <= p; k++) A[r][k] -= f * A[c][k];
    }
  }
  return A.map((row, i) => row[p] / row[i]);
}

/** R² of an OLS fit of y on the columns (with an intercept). */
function rSquared(cols: number[][], y: number[]) {
  const b = olsCoefs(cols, y);
  const my = mean(y);
  const ssr = y.reduce((acc, yi, i) => acc + (yi - b[0] - cols.reduce((s2, c, j) => s2 + c[i] * b[j + 1], 0)) ** 2, 0);
  const sst = y.reduce((acc, yi) => acc + (yi - my) ** 2, 0);
  return 1 - ssr / sst;
}

/** Forty weeks: sales on price and advertising, then up to ten columns of pure noise. */
const FIT_N = 40;
const FIT_MAX = 10;
const FIT_STEPS = (() => {
  const price = normals(5, FIT_N);
  const ads = normals(6, FIT_N);
  const e = normals(7, FIT_N);
  const y = price.map((v, i) => -0.6 * v + 0.5 * ads[i] + 0.75 * e[i]);
  const cols = [price, ads];
  return Array.from({ length: FIT_MAX + 1 }, (_, j) => {
    if (j > 0) cols.push(normals(540 + j, FIT_N));
    const k = cols.length;
    const r2v = rSquared(cols, y);
    return { k, r2: r2v, adj: 1 - ((1 - r2v) * (FIT_N - 1)) / (FIT_N - k - 1) };
  });
})();

/**
 * Adjusted R²: a model of forty weeks of sales on price and advertising.
 * Each press adds a column of random numbers to the model. R² rises with
 * every one. Adjusted R² falls, since the added variables explain nothing.
 */
export function AddedVariables() {
  const [added, setAdded] = useState(0);
  const shown = FIT_STEPS.slice(0, added + 1);
  const now = FIT_STEPS[added];

  const L = 56;
  const R = 420;
  const T = 30;
  const B = 196;
  const X = (k: number) => r2(L + 16 + ((k - 2) / FIT_MAX) * (R - L - 32));
  const Y = (v: number) => r2(B - ((v - 0.42) / 0.22) * (B - T));
  const line = (key: "r2" | "adj") => shown.map((st, i) => `${i === 0 ? "M" : "L"}${X(st.k)} ${Y(st[key])}`).join("");

  return (
    <div>
      <Frame
        width={540}
        height={236}
        label={`R² and adjusted R² of a model of forty weeks of sales with ${now.k} independent variables: price, advertising${
          added ? ` and ${added} variable${added > 1 ? "s" : ""} of random numbers` : ""
        }. R² is ${now.r2.toFixed(3)} and adjusted R² is ${now.adj.toFixed(3)}`}
      >
        <Key x={L} y={16}>MODEL OF 40 WEEKS OF SALES</Key>
        <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0.45, 0.5, 0.55, 0.6].map((v) => (
          <g key={v}>
            <line x1={L - 4} y1={Y(v)} x2={L} y2={Y(v)} stroke={INK} strokeWidth={1.25} />
            <Key x={L - 8} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{v.toFixed(2)}</Key>
          </g>
        ))}
        {Array.from({ length: FIT_MAX + 1 }, (_, j) => (
          <Key key={j} x={X(j + 2)} y={B + 16} anchor="middle" size={9.5} fill={j <= added ? INK2 : RULE2}>{j + 2}</Key>
        ))}
        <Key x={R} y={B + 30} anchor="end" size={9.5}>INDEPENDENT VARIABLES</Key>

        <path d={line("r2")} fill="none" stroke={INK} strokeWidth={1.75} />
        <path d={line("adj")} fill="none" stroke={SIGNAL} strokeWidth={2} />
        {shown.map((st, i) => (
          <g key={i}>
            <circle cx={X(st.k)} cy={Y(st.r2)} r={3.5} fill={i === 0 ? INK : PAPER} stroke={INK} strokeWidth={1.25} />
            <circle cx={X(st.k)} cy={Y(st.adj)} r={3.5} fill={i === 0 ? SIGNAL : PAPER} stroke={SIGNAL} strokeWidth={1.25} />
          </g>
        ))}
        <Key x={r2(X(now.k) + 10)} y={r2(Y(now.r2) + (now.k === 2 ? -4 : 4))} size={10}>{`R\u00b2 ${now.r2.toFixed(3)}`}</Key>
        <Key x={r2(X(now.k) + 10)} y={r2(Y(now.adj) + (now.k === 2 ? 10 : 4))} size={10} fill={SIGNAL}>{`ADJUSTED R\u00b2 ${now.adj.toFixed(3)}`}</Key>
      </Frame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1">
        <PlateButton onClick={() => setAdded((a) => Math.min(FIT_MAX, a + 1))}>Add a variable of random numbers</PlateButton>
        <PlateButton onClick={() => setAdded(0)}>Start over</PlateButton>
      </div>
    </div>
  );
}

/** Residuals for four panels: none, curved, fanning, and running in waves over time. */
const RESID = (() => {
  const z = normals(23, 24);
  const xs = Array.from({ length: 24 }, (_, i) => (i + 0.5) / 24);
  return {
    none: xs.map((x, i) => [x, 0.42 * z[i]]),
    curve: xs.map((x, i) => [x, 2.4 * (x - 0.5) ** 2 * 4 - 0.8 + 0.16 * z[i]]),
    fan: xs.map((x, i) => [x, (0.06 + 0.88 * x) * (i % 2 ? 1 : -1) * Math.min(1, 0.35 + 0.45 * Math.abs(z[i]))]),
    waves: xs.map((x, i) => [x, 0.75 * Math.sin(x * 2 * Math.PI * 1.5) + 0.12 * z[i]]),
  } as Record<string, number[][]>;
})();

/**
 * Residual plots: residuals against predicted values (or, for dependence,
 * against the order of the weeks). With no pattern they scatter evenly
 * around zero. A curve, a fan and long runs above and below zero each name
 * a problem the residuals reveal.
 */
export function ResidualPatterns() {
  const panels = [
    { id: "none", key: ["NO PATTERN"], x: "PREDICTED", tone: INK3 },
    { id: "curve", key: ["NONLINEAR", "RELATIONSHIP"], x: "PREDICTED", tone: INK },
    { id: "fan", key: ["UNEQUAL", "VARIANCE"], x: "PREDICTED", tone: INK },
    { id: "waves", key: ["DEPENDENCE BETWEEN", "OBSERVATIONS"], x: "WEEK", tone: INK },
  ];
  const w = 176;
  const h = 100;
  return (
    <Frame
      width={400}
      height={330}
      label="Four residual plots. With no pattern, residuals scatter evenly around zero. A curved band indicates a nonlinear relationship. A fan that widens indicates unequal variance. Long runs above and below zero across weeks indicate dependence between observations"
    >
      <Key x={12} y={14} size={10}>RESIDUALS</Key>
      {panels.map((p, k) => {
        const x0 = 12 + (k % 2) * (w + 24);
        const top = 28 + Math.floor(k / 2) * 154;
        const mid = top + h / 2;
        const X = (v: number) => r2(x0 + 6 + v * (w - 12));
        const Y = (v: number) => r2(mid - v * (h / 2 - 6));
        return (
          <g key={p.id}>
            <rect x={x0} y={top} width={w} height={h} fill="none" stroke={RULE2} strokeWidth={1} />
            <line x1={x0} y1={mid} x2={x0 + w} y2={mid} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
            {RESID[p.id].map(([xv, yv], i) => (
              <circle key={i} cx={X(xv)} cy={Y(Math.max(-1, Math.min(1, yv)))} r={2.8} fill={p.tone} />
            ))}
            <Key x={x0 + w} y={top + h + 13} anchor="end" size={8.5} fill={INK3}>{p.x}</Key>
            {p.key.map((line, j) => (
              <Key key={j} x={x0} y={top + h + 13 + j * 13} size={9.5} fill={p.id === "none" ? INK3 : INK}>{line}</Key>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Multicollinearity
   -------------------------------------------------------------------------- */

/** Twenty re-estimations of the same model on new samples: the draws behind each pair of coefficients. */
const COL_Z1 = standardize(normals(31, 20));
const COL_Z2 = standardize(normals(47, 20));
const TV_TRUE = 2;
const VIDEO_TRUE = 1.5;

/**
 * Multicollinearity: the same sales model estimated on twenty samples,
 * each estimate of the television and online video coefficients a dot.
 * Students raise the correlation between the two expenditures. The dots
 * spread, the variance inflation factor climbs past 5 and 10, and some
 * estimates take the implausible negative sign.
 */
export function CollinearEstimates() {
  const [rho100, setRho100] = useState(0);
  const rho = rho100 / 100;
  const k = Math.sqrt(1 - rho * rho);
  const se = 0.4 / k;
  const vif = 1 / (1 - rho * rho);
  const tv = COL_Z1.map((z) => TV_TRUE + se * z);
  const video = COL_Z1.map((z, i) => VIDEO_TRUE + se * (-rho * z + k * COL_Z2[i]));
  const wrong = tv.filter((v) => v < 0).length + video.filter((v) => v < 0).length;

  const x0 = 96;
  const x1 = 580;
  const lo = -3;
  const hi = 6;
  const X = (v: number) => r2(x0 + ((Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * (x1 - x0));
  const rows = [
    { key: "TV", v: tv, truth: TV_TRUE, y: 70, Icon: Television },
    { key: "ONLINE VIDEO", v: video, truth: VIDEO_TRUE, y: 150, Icon: MonitorPlay },
  ];
  const jitter = [0, -8, 8, -4, 4, -12, 12, 0, -8, 8, -4, 4, -12, 12, 0, -8, 8, -4, 4, 0];

  // VIF meter
  const m0 = 96;
  const m1 = 420;
  const vmax = 20;
  const MX = (v: number) => r2(m0 + ((Math.min(v, vmax) - 1) / (vmax - 1)) * (m1 - m0));

  return (
    <div>
      <Frame
        width={600}
        height={292}
        label={`Coefficients of television and online video expenditure estimated on twenty samples, when the two expenditures correlate at ${rho.toFixed(2)}. The variance inflation factor is ${vif.toFixed(1)}. ${
          wrong ? `${wrong} of the 40 estimates take a negative sign` : "every estimate has the expected positive sign"
        }`}
      >
        <Key x={20} y={22}>COEFFICIENT ESTIMATED ON 20 SAMPLES</Key>
        <Key x={580} y={22} anchor="end">{`SPEND CORRELATION r = ${rho.toFixed(2)}`}</Key>
        <rect x={x0} y={36} width={r2(X(0) - x0)} height={150} fill={COUNTER_TINT} />
        <line x1={X(0)} y1={36} x2={X(0)} y2={190} stroke={INK3} strokeWidth={1} />
        <Key x={X(0)} y={204} anchor="middle" size={9.5}>0</Key>
        {[-2, 2, 4].map((v) => (
          <Key key={v} x={X(v)} y={204} anchor="middle" size={9.5} fill={INK3}>{minus(String(v))}</Key>
        ))}
        <Key x={r2((x0 + X(0)) / 2)} y={182} anchor="middle" size={9} fill={COUNTER}>IMPLAUSIBLE SIGN</Key>
        {rows.map((r) => (
          <g key={r.key}>
            <r.Icon x={20} y={r.y - 16} size={30} weight="regular" color={INK} />
            <Key x={r2(X(0) + 8)} y={r.y - 26} size={9}>{r.key}</Key>
            <line x1={x0} y1={r.y} x2={x1} y2={r.y} stroke={RULE2} strokeWidth={1} />
            <line x1={X(r.truth)} y1={r.y - 24} x2={X(r.truth)} y2={r.y + 24} stroke={INK} strokeWidth={1.5} />
            {r.v.map((v, i) => (
              <circle key={i} cx={X(v)} cy={r.y + jitter[i]} r={4} fill={v < 0 ? COUNTER : PAPER} stroke={v < 0 ? COUNTER : INK} strokeWidth={1.25} />
            ))}
          </g>
        ))}
        <Key x={X(TV_TRUE)} y={40} anchor="middle" size={9}>TRUE EFFECT</Key>

        {/* VIF meter */}
        <Key x={20} y={250} size={10}>VIF</Key>
        <line x1={m0} y1={246} x2={m1} y2={246} stroke={INK} strokeWidth={1.25} />
        <rect x={MX(5)} y={240} width={r2(MX(10) - MX(5))} height={12} fill={PAPER3} />
        <rect x={MX(10)} y={240} width={r2(m1 - MX(10))} height={12} fill={COUNTER_TINT} />
        {[1, 5, 10, 20].map((v) => (
          <g key={v}>
            <line x1={MX(v)} y1={240} x2={MX(v)} y2={252} stroke={INK} strokeWidth={1.25} />
            <Key x={MX(v)} y={268} anchor="middle" size={9.5}>{v === 20 ? "20+" : String(v)}</Key>
          </g>
        ))}
        <path d={`M${MX(vif)} 238L${r2(MX(vif) - 6)} 228H${r2(MX(vif) + 6)}Z`} fill={SIGNAL} />
        <Display x={580} y={256} anchor="end" size={26} fill={SIGNAL}>{vif.toFixed(1)}</Display>
        <Key x={580} y={280} anchor="end" size={9} fill={vif > 10 ? COUNTER : INK3}>
          {vif > 10 ? "ABOVE 10" : vif > 5 ? "ABOVE 5" : "BELOW 5"}
        </Key>
      </Frame>
      <Slider
        label="Correlation of TV and online video spend"
        value={rho100}
        min={0}
        max={97}
        onChange={setRho100}
        showValue={false}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Omitted Variables and Reverse Causality
   -------------------------------------------------------------------------- */

/** A year of weeks: advertising rises before holidays, and holidays raise sales by themselves. */
const WEEKS = (() => {
  const z1 = normals(61, 52);
  const z2 = normals(62, 52);
  const holiday = Array.from({ length: 52 }, (_, i) => (i % 5 === 2 ? 1 : 0));
  const ads = holiday.map((h, i) => r2((h ? 17 : 10) + 1.8 * z1[i]));
  const sales = ads.map((a, i) => r2(300 + 4 * a + 60 * holiday[i] + 9 * z2[i]));
  return { holiday, ads, sales };
})();
const HOL_OMIT = olsCoefs([WEEKS.ads], WEEKS.sales);
const HOL_WITH = olsCoefs([WEEKS.ads, WEEKS.holiday], WEEKS.sales);

/**
 * Omitted variable bias: a year of weekly sales against advertising. With
 * advertising alone, the line credits it with the holiday lift as well.
 * Adding the holiday variable separates holiday weeks from the others, and
 * the advertising coefficient falls to the slope within each group.
 */
export function OmittedHoliday() {
  const [on, setOn] = useState<"holiday"[]>([]);
  const withHol = on.includes("holiday");
  const slope = withHol ? HOL_WITH[1] : HOL_OMIT[1];

  const L = 60;
  const R = 446;
  const T = 40;
  const B = 250;
  const X = (v: number) => r2(L + 10 + ((v - 4) / 20) * (R - L - 20));
  const Y = (v: number) => r2(B - 8 - ((v - 310) / 160) * (B - T - 16));
  const seg = (a: number, b: number, x0: number, x1: number) => `M${X(x0)} ${Y(a + b * x0)}L${X(x1)} ${Y(a + b * x1)}`;

  return (
    <div>
      <Frame
        width={600}
        height={286}
        label={`Fifty-two weeks of sales plotted against advertising. One week in five is a holiday week with more advertising and higher sales. ${
          withHol
            ? `With a holiday variable in the model, holiday weeks are marked and the advertising coefficient is ${slope.toFixed(1)} units per thousand dollars`
            : `With advertising alone, the coefficient is ${slope.toFixed(1)} units per thousand dollars, which includes the holiday lift`
        }`}
      >
        <Key x={L} y={22}>WEEKLY SALES BY ADVERTISING</Key>
        <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={R} y={B + 18} anchor="end" size={10}>ADVERTISING</Key>
        <g transform={`translate(${L - 12} ${T}) rotate(-90)`}>
          <Key x={0} y={0} anchor="end" size={10}>SALES</Key>
        </g>

        {withHol ? (
          <g>
            <path d={seg(HOL_WITH[0], HOL_WITH[1], 4, 15)} stroke={INK} strokeWidth={2} fill="none" />
            <path d={seg(HOL_WITH[0] + HOL_WITH[2], HOL_WITH[1], 12, 21)} stroke={COUNTER} strokeWidth={2} fill="none" />
            <Key x={r2(X(21) + 6)} y={r2(Y(HOL_WITH[0] + HOL_WITH[2] + HOL_WITH[1] * 21) + 4)} size={9.5} fill={COUNTER}>HOLIDAY</Key>
            <Key x={r2(X(15) + 6)} y={r2(Y(HOL_WITH[0] + HOL_WITH[1] * 15) + 4)} size={9.5}>OTHER WEEKS</Key>
          </g>
        ) : (
          <path d={seg(HOL_OMIT[0], HOL_OMIT[1], 7.5, 21)} stroke={INK} strokeWidth={2} fill="none" />
        )}
        {WEEKS.ads.map((a, i) => {
          const hol = withHol && WEEKS.holiday[i] === 1;
          return <circle key={i} cx={X(a)} cy={Y(WEEKS.sales[i])} r={3.6} fill={hol ? COUNTER : PAPER} stroke={hol ? COUNTER : INK} strokeWidth={1.25} />;
        })}

        <line x1={466} y1={36} x2={466} y2={270} stroke={RULE} strokeWidth={1} />
        <Key x={482} y={60} size={9.5}>ADVERTISING</Key>
        <Key x={482} y={74} size={9.5}>COEFFICIENT</Key>
        <Display x={482} y={112} size={34} fill={SIGNAL}>{`+${slope.toFixed(1)}`}</Display>
        <Key x={482} y={134} size={9}>UNITS PER $1,000</Key>
        {!withHol ? (
          <>
            <Key x={482} y={176} size={9} fill={COUNTER}>INCLUDES THE</Key>
            <Key x={482} y={189} size={9} fill={COUNTER}>HOLIDAY LIFT</Key>
          </>
        ) : null}
      </Frame>
      <Toggles
        label="Model includes"
        options={[{ id: "holiday", label: "Holiday variable" }]}
        value={on}
        onChange={setOn}
        allowNone
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 3: Logistic Regression
   -------------------------------------------------------------------------- */

/** Pages viewed by twenty-one visitors, and whether each one purchased (spaced so the fitted line clears every glyph). */
const VISITS = [
  ...[1, 2, 6, 7, 8, 9, 10, 11, 12, 14, 16].map((x) => [x, 0]),
  ...[9, 13, 14, 15, 16, 17, 18, 19, 27, 28].map((x) => [x, 1]),
];
const VISIT_FIT = olsCoefs([VISITS.map((v) => v[0])], VISITS.map((v) => v[1]));

/**
 * Linear regression on a binary outcome: visitors who bought sit at 1, the
 * rest at 0. The straight line fitted to them predicts probabilities below
 * zero for the lightest browsers and above one for the heaviest.
 */
export function LinearProbability() {
  const L = 70;
  const R = 520;
  const X = (v: number) => r2(L + 10 + (v / 30) * (R - L - 20));
  const Y = (p: number) => r2(214 - p * 150);
  const [a, b] = VISIT_FIT;
  const xLo = 0;
  const xHi = 30;
  const pAt = (x: number) => a + b * x;
  const zero = (0 - a) / b;
  const one = (1 - a) / b;
  return (
    <Frame
      width={560}
      height={290}
      label={`Twenty-one visitors plotted by pages viewed: those who purchased at a probability of 1, the rest at 0. A straight line fitted to them predicts probabilities below zero under about ${Math.round(zero)} pages and above one beyond about ${Math.round(one)} pages`}
    >

      <line x1={L} y1={Y(0)} x2={R} y2={Y(0)} stroke={INK} strokeWidth={1.25} />
      <line x1={L} y1={Y(1)} x2={R} y2={Y(1)} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={L} y1={262} x2={L} y2={14} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L, 14, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={L - 10} y={r2(Y(1) + 4)} anchor="end" size={10}>1</Key>
      <Key x={L - 10} y={r2(Y(0) + 4)} anchor="end" size={10}>0</Key>
      <g transform={`translate(${L - 30} ${Y(0.5)}) rotate(-90)`}>
        <Key x={0} y={0} anchor="middle" size={10}>PROBABILITY OF PURCHASE</Key>
      </g>
      <Key x={R} y={282} anchor="end" size={10}>PAGES VIEWED</Key>

      {VISITS.map(([x, y], i) => (
        <Person1 key={i} x={X(x)} y={r2(Y(y) - 1)} k={0.48} fill={y ? INK : PAPER} />
      ))}
      <path d={`M${X(zero)} ${Y(0)}L${X(one)} ${Y(1)}`} stroke={INK} strokeWidth={2} />
      <path d={`M${X(xLo)} ${Y(pAt(xLo))}L${X(zero)} ${Y(0)}`} stroke={COUNTER} strokeWidth={3} />
      <path d={`M${X(one)} ${Y(1)}L${X(xHi)} ${Y(pAt(xHi))}`} stroke={COUNTER} strokeWidth={3} />
      <Key x={X(26)} y={r2(Y(pAt(26)) - 10)} anchor="end" size={9.5} fill={COUNTER}>ABOVE ONE</Key>
      <Key x={r2(X(xLo) + 18)} y={r2(Y(pAt(xLo)) + 6)} size={9.5} fill={COUNTER}>BELOW ZERO</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   The Logistic Regression Model
   -------------------------------------------------------------------------- */

/**
 * Log odds and probability: on the left, the model as a straight line in
 * the log odds of purchase against pages viewed. On the right, the same
 * model as a probability. Students drag either end of the straight line.
 * However steep or high they make it, the probability curve bends into an
 * S and stays between zero and one.
 */
export function LogOddsCurve() {
  const xa = 0;
  const xb = 30;
  const [ends, setEnds] = useState({ ya: -3, yb: 3 });
  const b = (ends.yb - ends.ya) / (xb - xa);
  const a = ends.ya;
  const clamp = (v: number) => Math.max(-6, Math.min(6, Math.round(v * 4) / 4));
  const setEnd = (which: "ya" | "yb", v: number) => setEnds((e) => ({ ...e, [which]: clamp(v) }));

  const T = 40;
  const B = 260;
  // left: log odds
  const L1 = 60;
  const R1 = 330;
  const X1 = (v: number) => r2(L1 + 14 + (v / 30) * (R1 - L1 - 28));
  const Y1 = (v: number) => r2((T + B) / 2 - (v / 6.6) * ((B - T) / 2));
  const V1 = (py: number) => (((T + B) / 2 - py) / ((B - T) / 2)) * 6.6;
  // right: probability
  const L2 = 420;
  const R2 = 690;
  const X2 = (v: number) => r2(L2 + 14 + (v / 30) * (R2 - L2 - 28));
  const Y2 = (p: number) => r2(B - 14 - p * (B - T - 28));
  const prob = (x: number) => 1 / (1 + Math.exp(-(a + b * x)));
  const pct = (p: number) => (p > 0.99 ? "OVER 99%" : p < 0.01 ? "UNDER 1%" : `${Math.round(p * 100)}%`);
  const curve = Array.from({ length: 61 }, (_, i) => {
    const x = i / 2;
    return `${i === 0 ? "M" : "L"}${X2(x)} ${Y2(prob(x))}`;
  }).join("");

  const handle = (which: "ya" | "yb", xv: number) => {
    const cy = Y1(ends[which]);
    return (
      <g className="cursor-ns-resize touch-none select-none" {...dragHandlers((_, y) => setEnd(which, V1(y)))}>
        <rect x={X1(xv) - 16} y={T - 6} width={32} height={B - T + 12} fill="transparent" />
        <g
          role="slider"
          tabIndex={0}
          aria-label={which === "ya" ? "Left end of the log odds line" : "Right end of the log odds line"}
          aria-valuemin={-6}
          aria-valuemax={6}
          aria-valuenow={r2(ends[which])}
          className="outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowRight") setEnd(which, ends[which] + 0.5);
            else if (e.key === "ArrowDown" || e.key === "ArrowLeft") setEnd(which, ends[which] - 0.5);
            else return;
            e.preventDefault();
          }}
        >
          <rect x={X1(xv) - 9} y={r2(cy - 17)} width={18} height={34} rx={9} fill={PAPER} stroke={INK} strokeWidth={2} />
          <path d={`M${X1(xv) - 4} ${r2(cy - 4)}L${X1(xv)} ${r2(cy - 10)}L${X1(xv) + 4} ${r2(cy - 4)}Z`} fill={INK} />
          <path d={`M${X1(xv) - 4} ${r2(cy + 4)}L${X1(xv)} ${r2(cy + 10)}L${X1(xv) + 4} ${r2(cy + 4)}Z`} fill={INK} />
        </g>
      </g>
    );
  };

  return (
    <Frame
      width={720}
      height={316}
      label={`The model drawn twice. In log odds, a straight line from ${fmt(ends.ya, 2)} at 0 pages to ${fmt(ends.yb, 2)} at 30 pages. Either end can be dragged. In probability, the same model is an S-shaped curve from ${pct(prob(0)).toLowerCase()} to ${pct(prob(30)).toLowerCase()}, always between zero and one`}
    >
      {/* left: log odds */}
      <Key x={L1} y={20}>LOG ODDS OF PURCHASE</Key>
      <line x1={L1} y1={B} x2={L1} y2={T - 12} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L1, T - 12, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L1} y1={Y1(0)} x2={R1} y2={Y1(0)} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R1, Y1(0), 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[-6, -3, 3, 6].map((v) => (
        <g key={v}>
          <line x1={L1 - 4} y1={Y1(v)} x2={L1} y2={Y1(v)} stroke={INK} strokeWidth={1.25} />
          <Key x={L1 - 8} y={r2(Y1(v) + 3.5)} anchor="end" size={9.5}>{v > 0 ? `+${v}` : minus(String(v))}</Key>
        </g>
      ))}
      <Key x={L1 - 8} y={r2(Y1(0) + 3.5)} anchor="end" size={9.5}>0</Key>
      <Key x={R1} y={B + 22} anchor="end" size={10}>PAGES VIEWED</Key>
      <line x1={X1(xa)} y1={Y1(ends.ya)} x2={X1(xb)} y2={Y1(ends.yb)} stroke={INK} strokeWidth={2} />
      {handle("ya", xa)}
      {handle("yb", xb)}
      <Key x={L1} y={B + 46} size={10}>{`LOG ODDS = ${fmt(a, 2)} ${b < 0 ? "\u2212" : "+"} ${Math.abs(b).toFixed(2)} \u00d7 PAGES`}</Key>

      {/* the mapping */}
      <path d={`M344 ${(T + B) / 2}H376`} stroke={INK3} strokeWidth={1.25} />
      <path d={head.right(376, (T + B) / 2, 7)} fill="none" stroke={INK3} strokeWidth={1.25} />

      {/* right: probability */}
      <Key x={L2} y={20}>PROBABILITY OF PURCHASE</Key>
      <line x1={L2} y1={B} x2={L2} y2={T - 12} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L2, T - 12, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L2} y1={B} x2={R2} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R2, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L2} y1={Y2(1)} x2={R2 - 10} y2={Y2(1)} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={L2} y1={Y2(0)} x2={R2 - 10} y2={Y2(0)} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <Key x={L2 - 8} y={r2(Y2(1) + 3.5)} anchor="end" size={9.5}>1</Key>
      <Key x={L2 - 8} y={r2(Y2(0.5) + 3.5)} anchor="end" size={9.5}>0.5</Key>
      <Key x={L2 - 8} y={r2(Y2(0) + 3.5)} anchor="end" size={9.5}>0</Key>
      <line x1={L2 - 4} y1={Y2(0.5)} x2={L2} y2={Y2(0.5)} stroke={INK} strokeWidth={1.25} />
      <Key x={R2} y={B + 22} anchor="end" size={10}>PAGES VIEWED</Key>
      <path d={curve} fill="none" stroke={SIGNAL} strokeWidth={2.25} />
      <Key x={L2} y={B + 46} size={10} fill={SIGNAL}>{`FROM ${pct(prob(0))} TO ${pct(prob(30))}`}</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Interpreting Logistic Regression
   -------------------------------------------------------------------------- */

/**
 * The same odds ratio, different changes in probability: a hundred customers
 * without the email and a hundred with it, buyers filled. Students set the
 * probability of purchase without the email. The odds ratio of 1.5 adds
 * about 4 buyers at 10 percent, 10 at 50 percent and 3 at 90 percent.
 */
export function OddsToProbability() {
  const [base, setBase] = useState(10);
  const p0 = base / 100;
  const odds0 = p0 / (1 - p0);
  const odds1 = odds0 * 1.5;
  const p1 = odds1 / (1 + odds1);
  const n0 = Math.round(p0 * 100);
  const n1 = Math.round(p1 * 100);
  const gain = (p1 - p0) * 100;

  const cols = 20;
  const dx = 13.5;
  const dy = 23;
  const grid = (y0: number, buyers: number, extra: number) =>
    Array.from({ length: 100 }, (_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const fill = i < buyers - extra ? COUNTER : i < buyers ? SIGNAL : PAPER;
      const stroke = i < buyers - extra ? COUNTER : i < buyers ? SIGNAL : INK3;
      return <Person1 key={i} x={r2(28 + c * dx)} y={r2(y0 + r * dy)} k={0.55} fill={fill} stroke={stroke} width={1.1} />;
    });

  return (
    <div>
      <Frame
        width={600}
        height={300}
        label={`A hundred customers without the email and a hundred with it. Without the email, ${n0} buy (odds ${odds0.toFixed(2)}). With an odds ratio of 1.5, the odds become ${odds1.toFixed(2)} and ${n1} buy, a change of ${gain.toFixed(1)} percentage points`}
      >
        <Key x={20} y={18}>WITHOUT THE EMAIL</Key>
        {grid(48, n0, 0)}
        <Key x={20} y={160}>WITH THE EMAIL</Key>
        {grid(190, n1, n1 - n0)}

        <line x1={316} y1={10} x2={316} y2={290} stroke={RULE} strokeWidth={1} />
        <Key x={334} y={34} size={9.5}>PROBABILITY</Key>
        <Display x={334} y={64} size={26} fill={COUNTER}>{`${(p0 * 100).toFixed(0)}%`}</Display>
        <Key x={334} y={84} size={9.5}>{`ODDS ${odds0.toFixed(2)}`}</Key>

        <Key x={334} y={176} size={9.5}>PROBABILITY</Key>
        <Display x={334} y={206} size={26} fill={INK}>{`${(p1 * 100).toFixed(1)}%`}</Display>
        <Key x={334} y={226} size={9.5}>{`ODDS ${odds0.toFixed(2)} \u00d7 1.5 = ${odds1.toFixed(2)}`}</Key>

        <Key x={512} y={34} size={9.5}>ODDS RATIO</Key>
        <Display x={512} y={64} size={26}>1.5</Display>
        <Key x={512} y={176} size={9.5} fill={SIGNAL}>CHANGE</Key>
        <Display x={512} y={206} size={26} fill={SIGNAL}>{`+${gain.toFixed(1)}`}</Display>
        <Key x={512} y={226} size={9.5} fill={SIGNAL}>POINTS</Key>
      </Frame>
      <Slider label="Purchase probability without the email (%)" value={base} min={1} max={95} onChange={setBase} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Marketing Mix Modeling
   -------------------------------------------------------------------------- */

/** 104 weeks of sales, built from a base with seasonality and three media channels (thousands of units). */
const MIX = (() => {
  const W = 104;
  const z = normals(71, W);
  const weeks = Array.from({ length: W }, (_, t) => t);
  const season = weeks.map((t) => 40 + 50 * Math.max(0, Math.sin(((t % 52) - 34) / 18 * Math.PI)) + 10 * Math.sin((t / 52) * 2 * Math.PI));
  const flights = [[6, 10], [30, 35], [46, 50], [58, 62], [82, 87], [96, 101]];
  const tv: number[] = [];
  weeks.forEach((t) => {
    const on = flights.some(([a, b]) => t >= a && t < b) ? 1 : 0;
    tv.push((t ? 0.6 * tv[t - 1] : 0) + on * 48);
  });
  const search = weeks.map((t) => 44 + 10 * Math.sin((t / 52) * 2 * Math.PI + 1) + 0.25 * tv[t]);
  const social = weeks.map((t) => 26 + 6 * Math.sin((t / 13) * Math.PI));
  const layers = [
    { id: "base", key: "BASE", v: season.map((v) => 150 + v), fill: PAPER3 },
    { id: "tv", key: "TELEVISION", v: tv, fill: "rgba(44, 74, 140, 0.62)" },
    { id: "search", key: "SEARCH", v: search, fill: "rgba(44, 74, 140, 0.38)" },
    { id: "social", key: "SOCIAL MEDIA", v: social, fill: "rgba(44, 74, 140, 0.18)" },
  ];
  const total = weeks.map((t) => layers.reduce((acc, l) => acc + l.v[t], 0));
  const actual = total.map((v, t) => v + 8 * z[t]);
  return { W, layers, actual };
})();

/**
 * Marketing mix modeling: two years of weekly sales decomposed into the base
 * (with seasonality) and the contributions of television, search and social
 * media, with each channel's return per dollar beside its band. The thin
 * line is the sales the firm observed.
 */
export function MixDecomposition() {
  const L = 54;
  const R = 590;
  const T = 30;
  const B = 266;
  const X = (t: number) => r2(L + (t / (MIX.W - 1)) * (R - L));
  const Y = (v: number) => r2(B - (v / 500) * (B - T));
  const cum = MIX.layers.map((_, j) => Array.from({ length: MIX.W }, (_, t) => MIX.layers.slice(0, j + 1).reduce((acc, l) => acc + l.v[t], 0)));
  const band = (j: number) => {
    const top = cum[j].map((v, t) => `${t === 0 ? "M" : "L"}${X(t)} ${Y(v)}`).join("");
    const bottom = (j === 0 ? Array(MIX.W).fill(0) : cum[j - 1]).map((v: number, t: number) => `L${X(t)} ${Y(v)}`).reverse().join("");
    return `${top}${bottom}Z`;
  };
  const actual = MIX.actual.map((v, t) => `${t === 0 ? "M" : "L"}${X(t)} ${Y(v)}`).join("");
  const roi: Record<string, string> = { tv: "$1.40", search: "$2.10", social: "$0.70" };
  const at = 99;
  // labels at the right, top to bottom, at least 34 units apart
  const ids = ["social", "search", "tv"] as const;
  const mids = ids.map((id) => {
    const j = MIX.layers.findIndex((l) => l.id === id);
    return Y((cum[j][at] + cum[j - 1][at]) / 2);
  });
  const ys: number[] = [];
  mids.forEach((m, i) => ys.push(i === 0 ? Math.min(m, 70) : Math.max(m, ys[i - 1] + 34)));

  return (
    <Frame
      width={720}
      height={300}
      label="Two years of weekly sales decomposed by a marketing mix model into stacked contributions: the base with seasonality, television, search and social media, with the observed sales drawn as a line over them. Estimated return per dollar: television $1.40, search $2.10, social media $0.70"
    >
      <Key x={L} y={18}>WEEKLY SALES, DECOMPOSED</Key>
      {MIX.layers.map((l, j) => (
        <path key={l.id} d={band(j)} fill={l.fill} />
      ))}
      <path d={actual} fill="none" stroke={INK} strokeWidth={1.1} />
      <line x1={L} y1={B} x2={R + 8} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R + 8, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={X(52)} y1={B} x2={X(52)} y2={B + 6} stroke={INK} strokeWidth={1.25} />
      <Key x={r2((L + X(52)) / 2)} y={B + 20} anchor="middle" size={9.5}>YEAR 1</Key>
      <Key x={r2((X(52) + R) / 2)} y={B + 20} anchor="middle" size={9.5}>YEAR 2</Key>
      <Key x={r2(X(70))} y={r2(Y(cum[0][70] / 2) + 4)} anchor="middle" size={9.5}>BASE AND SEASONALITY</Key>

      <Key x={R + 30} y={36} size={9}>RETURN PER $1</Key>
      {ids.map((id, i) => {
        const j = MIX.layers.findIndex((l) => l.id === id);
        return (
          <g key={id}>
            <path d={`M${X(at)} ${mids[i]}H${R + 14}L${R + 24} ${r2(ys[i])}`} fill="none" stroke={INK3} strokeWidth={1} />
            <Key x={R + 30} y={r2(ys[i] - 2)} size={9}>{MIX.layers[j].key}</Key>
            <Key x={R + 30} y={r2(ys[i] + 12)} size={10.5} fill={SIGNAL}>{roi[id]}</Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Carryover and Diminishing Returns
   -------------------------------------------------------------------------- */

/**
 * Adstock: one week of advertising and its effect on sales in that week and
 * the five that follow, at a decay rate of 0.5. Each bar is half the one
 * before it.
 */
export function AdstockDecay() {
  const weeks = 6;
  const x0 = 40;
  const w = 56;
  const gap = 18;
  const base = 150;
  const H = 96;
  return (
    <Frame
      width={480}
      height={204}
      label="One week of advertising and its effect on sales in that week and the five that follow, at a decay rate of 0.5: 100, 50, 25, 13, 6 and 3 percent of the first week's effect"
    >
      <Megaphone x={x0 + w / 2 - 15} y={4} size={30} weight="regular" color={INK} />
      <Key x={x0 + w + 12} y={24} size={9.5}>ADVERTISING IN WEEK 1 ONLY</Key>
      <g transform={`translate(22 ${base}) rotate(-90)`}>
        <Key x={0} y={0} size={9}>EFFECT ON SALES</Key>
      </g>
      <Key x={460} y={24} anchor="end" size={10} fill={SIGNAL}>DECAY RATE 0.5</Key>
      {Array.from({ length: weeks }, (_, i) => {
        const v = 0.5 ** i;
        const x = x0 + i * (w + gap);
        const h = r2(v * H);
        return (
          <g key={i}>
            <rect x={x} y={r2(base - h)} width={w} height={h} fill={i === 0 ? INK : SIGNAL} />
            <Key x={x + w / 2} y={r2(base - h - 6)} anchor="middle" size={10} fill={i === 0 ? INK : SIGNAL}>{`${Math.round(v * 100)}%`}</Key>
            <Key x={x + w / 2} y={base + 18} anchor="middle" size={9.5}>{`WEEK ${i + 1}`}</Key>
          </g>
        );
      })}
      <line x1={x0 - 10} y1={base} x2={x0 + weeks * (w + gap)} y2={base} stroke={INK} strokeWidth={1.25} />
      <path d={`M${x0 + w + gap} ${base + 26}v5H${x0 + weeks * (w + gap) - gap}v-5`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={r2((x0 + w + gap + x0 + weeks * (w + gap) - gap) / 2)} y={base + 46} anchor="middle" size={9.5} fill={SIGNAL}>
        CARRYOVER
      </Key>
    </Frame>
  );
}

/** Response curves (thousands of dollars of sales against thousands spent): sales = A(1 − e^(−spend/k)). */
const CURVES = {
  tv: { A: 3000, k: 600, key: "TELEVISION" },
  search: { A: 1400, k: 150, key: "SEARCH" },
};
const BUDGET = 1000;
const resp = (c: { A: number; k: number }, x: number) => c.A * (1 - Math.exp(-x / c.k));
const marg = (c: { A: number; k: number }, x: number) => (c.A / c.k) * Math.exp(-x / c.k);
const totalAt = (share: number) => resp(CURVES.tv, BUDGET * (1 - share)) + resp(CURVES.search, BUDGET * share);

/**
 * Marginal and average return: a budget of $1 million split between two
 * channels with diminishing returns. Students move the split. Each channel
 * shows its average return (the dashed line from the origin) and its
 * marginal return (the tangent). Total sales peak where the two marginal
 * returns are equal, not where the average return is highest.
 */
export function BudgetSplit() {
  const [pct, setPct] = useState(40);
  const share = pct / 100;
  const spend = { tv: BUDGET * (1 - share), search: BUDGET * share };
  const total = totalAt(share);

  const L = 56;
  const R = 370;
  const T = 30;
  const B = 250;
  const X = (v: number) => r2(L + (v / BUDGET) * (R - L));
  const Y = (v: number) => r2(B - (v / 3200) * (B - T));
  const path = (c: { A: number; k: number }) =>
    Array.from({ length: 51 }, (_, i) => `${i === 0 ? "M" : "L"}${X((i / 50) * BUDGET)} ${Y(resp(c, (i / 50) * BUDGET))}`).join("");

  const rows = (["tv", "search"] as const).map((id) => {
    const c = CURVES[id];
    const x = spend[id];
    const y = resp(c, x);
    return { id, c, x, y, avg: x > 0 ? y / x : 0, m: marg(c, x) };
  });

  // total sales against the share given to search
  const mx0 = 420;
  const mx1 = 620;
  const my0 = 296;
  const my1 = 214;
  const MX = (sh: number) => r2(mx0 + sh * (mx1 - mx0));
  const MY = (v: number) => r2(my0 - ((v - 1300) / 2100) * (my0 - my1));
  const totalPath = Array.from({ length: 41 }, (_, i) => `${i === 0 ? "M" : "L"}${MX(i / 40)} ${MY(totalAt(i / 40))}`).join("");

  return (
    <div>
      <Frame
        width={640}
        height={322}
        label={`A $1 million budget split ${100 - pct}% to television and ${pct}% to search. Television: average return $${rows[0].avg.toFixed(2)}, marginal return $${rows[0].m.toFixed(2)} per dollar. Search: average return $${rows[1].avg.toFixed(2)}, marginal return $${rows[1].m.toFixed(2)}. Total sales $${Math.round(total).toLocaleString("en-US")} thousand, highest when the two marginal returns are equal`}
      >
        <Key x={L} y={18}>SALES BY EXPENDITURE</Key>
        <line x1={L} y1={B} x2={R + 8} y2={B} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(R + 8, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 500, 1000].map((v) => (
          <Key key={v} x={X(v)} y={B + 16} anchor="middle" size={9.5}>{v === 0 ? "$0" : v === 500 ? "$0.5M" : "$1M"}</Key>
        ))}
        <Key x={R + 8} y={B + 32} anchor="end" size={9.5}>EXPENDITURE</Key>
        {[1000, 2000, 3000].map((v) => (
          <Key key={v} x={L - 8} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{`$${v / 1000}M`}</Key>
        ))}

        {rows.map((r) => (
          <g key={r.id}>
            <path d={path(r.c)} fill="none" stroke={INK} strokeWidth={1.5} />
            <Key x={R + 4} y={r2(Y(resp(r.c, BUDGET)) - 8)} anchor="end" size={9.5}>{r.c.key}</Key>
            {r.x > 0 ? (
              <line x1={X(0)} y1={Y(0)} x2={X(r.x)} y2={Y(r.y)} stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />
            ) : null}
            <line
              x1={X(Math.max(0, r.x - 130))}
              y1={Y(r.y - r.m * (r.x - Math.max(0, r.x - 130)))}
              x2={X(Math.min(BUDGET, r.x + 130))}
              y2={Y(r.y + r.m * (Math.min(BUDGET, r.x + 130) - r.x))}
              stroke={SIGNAL}
              strokeWidth={2}
            />
            <circle cx={X(r.x)} cy={Y(r.y)} r={5} fill={SIGNAL} stroke={PAPER} strokeWidth={1.5} />
          </g>
        ))}

        {/* the returns, channel by channel */}
        <line x1={400} y1={10} x2={400} y2={312} stroke={RULE} strokeWidth={1} />
        <line x1={430} y1={20} x2={452} y2={20} stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />
        <line x1={542} y1={20} x2={562} y2={20} stroke={SIGNAL} strokeWidth={2} />
        <Key x={500} y={24} anchor="end" size={9}>AVERAGE</Key>
        <Key x={620} y={24} anchor="end" size={9} fill={SIGNAL}>MARGINAL</Key>
        <Key x={500} y={36} anchor="end" size={9}>RETURN</Key>
        <Key x={620} y={36} anchor="end" size={9} fill={SIGNAL}>RETURN</Key>
        {rows.map((r, i) => (
          <g key={r.id}>
            <Key x={420} y={64 + i * 60} size={9.5}>{`${r.c.key} | $${Math.round(r.x)}K`}</Key>
            <Display x={500} y={92 + i * 60} anchor="end" size={22}>{`$${r.avg.toFixed(2)}`}</Display>
            <Display x={620} y={92 + i * 60} anchor="end" size={22} fill={SIGNAL}>{`$${r.m.toFixed(2)}`}</Display>
          </g>
        ))}

        <Key x={420} y={194} size={9.5}>TOTAL SALES</Key>
        <Display x={620} y={198} anchor="end" size={22}>{`$${(total / 1000).toFixed(2)}M`}</Display>
        <path d={totalPath} fill="none" stroke={INK3} strokeWidth={1.25} />
        <line x1={mx0} y1={my0} x2={mx1} y2={my0} stroke={INK} strokeWidth={1} />
        <circle cx={MX(share)} cy={MY(total)} r={4.5} fill={SIGNAL} />
        <Key x={mx0} y={my0 + 14} size={8.5}>ALL TV</Key>
        <Key x={mx1} y={my0 + 14} anchor="end" size={8.5}>ALL SEARCH</Key>
      </Frame>
      <Slider label="Share of the budget to search (%)" value={pct} min={0} max={100} step={5} onChange={setPct} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Attribution
   -------------------------------------------------------------------------- */

const CHANNELS = {
  display: { key: "DISPLAY", Icon: Browser },
  social: { key: "SOCIAL", Icon: ShareNetwork },
  email: { key: "EMAIL", Icon: Envelope },
  search: { key: "SEARCH", Icon: MagnifyingGlass },
} as const;
type Channel = keyof typeof CHANNELS;

/** Four customers' paths to purchase, in order. */
const PATHS: Channel[][] = [
  ["display", "social", "search"],
  ["social", "email", "search"],
  ["display", "search"],
  ["display", "social", "email", "search"],
];

const RULES = [
  { id: "last", label: "Last click" },
  { id: "first", label: "First click" },
  { id: "linear", label: "Linear" },
  { id: "decay", label: "Time decay" },
] as const;
type RuleId = (typeof RULES)[number]["id"];

/** Credit for each touchpoint in a path of n under a rule. Time decay halves the credit at each step back. */
function credits(n: number, rule: RuleId) {
  if (rule === "last") return Array.from({ length: n }, (_, i) => (i === n - 1 ? 1 : 0));
  if (rule === "first") return Array.from({ length: n }, (_, i) => (i === 0 ? 1 : 0));
  if (rule === "linear") return Array.from({ length: n }, () => 1 / n);
  const w = Array.from({ length: n }, (_, i) => 0.5 ** (n - 1 - i));
  const sum = w.reduce((a, b) => a + b, 0);
  return w.map((v) => v / sum);
}

/**
 * Attribution rules: four customers' paths to purchase, each touchpoint with
 * a bar for the credit it receives. Students switch the rule. The credit
 * moves along the paths, and the channel totals at the right change which
 * channel appears to drive conversions.
 */
export function AttributionRules() {
  const [rule, setRule] = useState<RuleId>("last");
  const ids = Object.keys(CHANNELS) as Channel[];
  const totals = Object.fromEntries(ids.map((id) => [id, 0])) as Record<Channel, number>;
  const perPath = PATHS.map((path) => {
    const c = credits(path.length, rule);
    path.forEach((ch, i) => (totals[ch] += c[i]));
    return c;
  });
  const top = Math.max(...ids.map((id) => totals[id]));

  const rowH = 66;
  const y0 = 46;
  const step = 70;
  const x0 = 34;

  return (
    <div>
      <Frame
        width={640}
        height={318}
        label={`Four customers' paths to purchase credited by ${RULES.find((r) => r.id === rule)!.label.toLowerCase()} attribution. Credit across the four conversions: ${ids
          .map((id) => `${CHANNELS[id].key.toLowerCase()} ${totals[id].toFixed(2)}`)
          .join(", ")}`}
      >
        <Key x={20} y={20}>FOUR PATHS TO PURCHASE</Key>
        {PATHS.map((path, r) => {
          const cy = y0 + r * rowH + 14;
          const end = x0 + path.length * step;
          return (
            <g key={r}>
              <line x1={x0 + 17} y1={cy} x2={end - 18} y2={cy} stroke={RULE2} strokeWidth={1.25} />
              {path.map((ch, i) => {
                const { Icon } = CHANNELS[ch];
                const cx = x0 + i * step;
                const w = r2(perPath[r][i] * 52);
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r={17} fill={PAPER} stroke={INK3} strokeWidth={1} />
                    <Icon x={cx - 12} y={cy - 12} size={24} weight="regular" color={INK} />
                    <rect x={cx - 26} y={cy + 23} width={52} height={7} fill={PAPER3} />
                    {w > 0 ? <rect x={cx - 26} y={cy + 23} width={w} height={7} fill={SIGNAL} /> : null}
                  </g>
                );
              })}
              <ShoppingCart x={end - 14} y={cy - 14} size={28} weight="regular" color={INK} />
            </g>
          );
        })}

        <line x1={372} y1={10} x2={372} y2={308} stroke={RULE} strokeWidth={1} />
        <Key x={392} y={20}>CREDIT FOR 4 CONVERSIONS</Key>
        {ids.map((id, i) => {
          const cy = 66 + i * 62;
          const { Icon } = CHANNELS[id];
          const w = r2((totals[id] / 4) * 150);
          const lead = Math.abs(totals[id] - top) < 1e-9;
          return (
            <g key={id}>
              <Icon x={392} y={cy - 13} size={26} weight="regular" color={INK} />
              <Key x={426} y={cy - 8} size={9}>{CHANNELS[id].key}</Key>
              <rect x={426} y={cy} width={150} height={12} fill={PAPER3} />
              {w > 0 ? <rect x={426} y={cy} width={w} height={12} fill={lead ? SIGNAL : INK} /> : null}
              <Key x={586} y={cy + 10} size={10.5} fill={lead ? SIGNAL : INK}>{totals[id].toFixed(2)}</Key>
            </g>
          );
        })}
      </Frame>
      <Segmented label="Rule" options={[...RULES]} value={rule} onChange={setRule} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Marketing Mix Modeling and Attribution Compared
   -------------------------------------------------------------------------- */

/**
 * Brand search and incrementality: twenty purchases that followed a click on
 * an advertisement for the brand's own name. Last-click attribution credits
 * all twenty to the advertisement. A holdout test that withholds the
 * advertisement finds that seventeen of the purchases occur anyway.
 */
export function BrandSearchHoldout() {
  const n = 20;
  const incremental = [4, 11, 17];
  const dx = 25;
  const x0 = 34;
  return (
    <Frame
      width={560}
      height={236}
      label="Twenty purchases that followed a click on a search advertisement for the brand's own name. Last-click attribution credits all twenty to the advertisement. A holdout test finds that seventeen would have occurred without it, so three are incremental"
    >
      <MagnifyingGlass x={x0 - 18} y={10} size={26} weight="regular" color={INK} />
      <Key x={x0 + 16} y={28}>LAST-CLICK ATTRIBUTION</Key>
      {Array.from({ length: n }, (_, i) => (
        <Person1 key={i} x={x0 + i * dx} y={84} k={0.95} fill={COUNTER} stroke={COUNTER} />
      ))}
      <Key x={x0 - 10} y={106} size={10} fill={COUNTER}>20 PURCHASES CREDITED TO BRAND SEARCH</Key>

      <line x1={16} y1={124} x2={544} y2={124} stroke={RULE} strokeWidth={1} />
      <Key x={x0 - 10} y={146}>HOLDOUT TEST</Key>
      {Array.from({ length: n }, (_, i) => {
        const inc = incremental.includes(i);
        return <Person1 key={i} x={x0 + i * dx} y={202} k={0.95} fill={inc ? SIGNAL : PAPER} stroke={inc ? SIGNAL : INK3} />;
      })}
      <Key x={x0 - 10} y={224} size={10} fill={SIGNAL}>3 INCREMENTAL</Key>
      <Key x={540} y={224} anchor="end" size={10} fill={INK3}>17 WOULD HAVE OCCURRED WITHOUT THE AD</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Explanatory and Predictive Models
   -------------------------------------------------------------------------- */

/** Fourteen weeks to estimate on and fourteen held out, from the same curved relationship plus noise. */
const OVER = (() => {
  const truth = (x: number) => 0.2 + 0.9 * x - 0.7 * x * x;
  const rnd = seeded(34);
  const z = normals(35, 40);
  const xt = Array.from({ length: 14 }, (_, i) => -1 + (2 * (i + 0.2 + 0.6 * rnd())) / 14);
  const xh = Array.from({ length: 14 }, (_, i) => -1 + (2 * (i + 0.2 + 0.6 * rnd())) / 14);
  const yt = xt.map((x, i) => truth(x) + 0.22 * z[i]);
  const yh = xh.map((x, i) => truth(x) + 0.22 * z[i + 14]);
  const fits = Array.from({ length: 10 }, (_, j) => {
    const d = j + 1;
    const b = olsCoefs(Array.from({ length: d }, (_, k) => xt.map((x) => x ** (k + 1))), yt);
    const predict = (x: number) => b.reduce((acc, c, k) => acc + c * x ** k, 0);
    const rmse = (xs: number[], ys: number[]) => Math.sqrt(mean(xs.map((x, i) => (ys[i] - predict(x)) ** 2)));
    return { predict, train: rmse(xt, yt), hold: rmse(xh, yh) };
  });
  return { xt, yt, xh, yh, fits };
})();

/**
 * Overfitting: a model estimated on fourteen weeks (filled) and checked on
 * fourteen held-out weeks (open). As students raise the model's flexibility,
 * the curve bends to pass through the estimation data and its error there
 * keeps falling. The error on the holdout data falls once and then climbs.
 */
export function Overfitting() {
  const [d, setD] = useState(2);
  const fit = OVER.fits[d - 1];

  const L = 40;
  const R = 330;
  const T = 34;
  const B = 254;
  const X = (v: number) => r2(L + 8 + ((v + 1) / 2) * (R - L - 16));
  const Y = (v: number) => r2(B - 10 - ((v + 2.1) / 3) * (B - T - 20));
  const curve = Array.from({ length: 121 }, (_, i) => {
    const x = -1 + (2 * i) / 120;
    return `${i === 0 ? "M" : "L"}${X(x)} ${Y(Math.max(-2.4, Math.min(1.2, fit.predict(x))))}`;
  }).join("");

  // error by flexibility
  const eL = 420;
  const eR = 620;
  const eT = 50;
  const eB = 230;
  const EX = (k: number) => r2(eL + 10 + ((k - 1) / 9) * (eR - eL - 20));
  const EY = (v: number) => r2(eB - (Math.min(v, 0.9) / 0.9) * (eB - eT));
  const line = (key: "train" | "hold") => OVER.fits.map((f, i) => `${i === 0 ? "M" : "L"}${EX(i + 1)} ${EY(f[key])}`).join("");

  return (
    <div>
      <Frame
        width={640}
        height={300}
        label={`A model with flexibility ${d} of 10 fitted to fourteen weeks of estimation data and checked on fourteen held-out weeks. Error on the estimation data ${fit.train.toFixed(2)}. Error on the holdout data ${fit.hold.toFixed(2)}. Estimation error falls as flexibility rises, while holdout error is lowest at flexibility 2 and rises after it`}
      >
        <defs>
          <clipPath id="over-clip">
            <rect x={L} y={T} width={R - L} height={B - T} />
          </clipPath>
        </defs>
        <Key x={L} y={20}>WEEKLY SALES</Key>
        <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <path d={curve} fill="none" stroke={INK} strokeWidth={2} clipPath="url(#over-clip)" />
        {OVER.xh.map((x, i) => (
          <circle key={`h${i}`} cx={X(x)} cy={Y(OVER.yh[i])} r={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
        ))}
        {OVER.xt.map((x, i) => (
          <circle key={`t${i}`} cx={X(x)} cy={Y(OVER.yt[i])} r={4} fill={INK} />
        ))}
        <circle cx={L + 8} cy={B + 22} r={4} fill={INK} />
        <Key x={L + 18} y={B + 26} size={9}>ESTIMATION DATA</Key>
        <circle cx={L + 160} cy={B + 22} r={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
        <Key x={L + 170} y={B + 26} size={9} fill={SIGNAL}>HOLDOUT DATA</Key>

        <line x1={372} y1={10} x2={372} y2={290} stroke={RULE} strokeWidth={1} />
        <Key x={eL - 20} y={20}>PREDICTION ERROR</Key>
        <line x1={eL} y1={eB} x2={eR} y2={eB} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(eR, eB, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={eL} y1={eB} x2={eL} y2={eT - 8} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(eL, eT - 8, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={eR} y={eB + 18} anchor="end" size={9.5}>FLEXIBILITY</Key>
        <path d={line("train")} fill="none" stroke={INK} strokeWidth={1.5} />
        <path d={line("hold")} fill="none" stroke={SIGNAL} strokeWidth={2} />
        <line x1={EX(d)} y1={eT - 4} x2={EX(d)} y2={eB} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
        <circle cx={EX(d)} cy={EY(fit.train)} r={4.5} fill={INK} />
        <circle cx={EX(d)} cy={EY(fit.hold)} r={4.5} fill={SIGNAL} />
        <Key x={EX(10)} y={r2(EY(OVER.fits[9].train) - 8)} anchor="end" size={9}>ESTIMATION</Key>
        <Key x={r2(EX(10) - 6)} y={r2(EY(OVER.fits[9].hold) - 2)} anchor="end" size={9} fill={SIGNAL}>HOLDOUT</Key>
        <Key x={eL - 20} y={262} size={9.5}>{`ESTIMATION ${fit.train.toFixed(2)}`}</Key>
        <Display x={eL - 20} y={290} size={20} fill={SIGNAL}>{`Holdout ${fit.hold.toFixed(2)}`}</Display>
      </Frame>
      <Slider label="Model flexibility" value={d} min={1} max={10} onChange={setD} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Machine Learning Models
   -------------------------------------------------------------------------- */

/** Forty stores: weekly units hold up to a price near $4.50 and fall away above it. */
const TREE = (() => {
  const rnd = seeded(83);
  const z = normals(84, 40);
  const price = Array.from({ length: 40 }, (_, i) => 3 + (3 * (i + rnd())) / 40);
  const units = price.map((p, i) => 820 - 15 * (p - 3) - 420 / (1 + Math.exp(-(p - 4.75) * 9)) + 35 * z[i]);
  const line = olsCoefs([price], units);
  // a tree ensemble's fit: averages of nearby stores in narrow price bands, smoothed across overlapping trees
  const edges = Array.from({ length: 13 }, (_, i) => 3 + i * 0.25);
  const steps = edges.slice(0, -1).map((lo, i) => {
    const hi = edges[i + 1];
    const near = units.filter((_, j) => price[j] >= lo - 0.2 && price[j] < hi + 0.2);
    return { lo, hi, v: mean(near) };
  });
  return { price, units, line, steps };
})();

/**
 * A tree ensemble against linear regression: forty stores whose weekly units
 * hold steady and then fall once the price passes about $4.50. The straight
 * line summarizes them with one slope. The ensemble follows the bend without
 * being told where it is, and has no coefficient to report.
 */
export function TreeVersusLine() {
  const L = 60;
  const R = 470;
  const T = 30;
  const B = 240;
  const X = (p: number) => r2(L + 10 + ((p - 3) / 3) * (R - L - 20));
  const Y = (u: number) => r2(B - 10 - ((u - 260) / 660) * (B - T - 10));
  const [a, b] = TREE.line;
  const steps = TREE.steps.map((st, i) => `${i === 0 ? "M" : "L"}${X(st.lo)} ${Y(st.v)}H${X(st.hi)}`).join("");
  return (
    <Frame
      width={600}
      height={280}
      label={`Forty stores' weekly units by price: steady up to about $4.50, then falling. Linear regression fits one straight line with a slope of ${Math.round(b)} units per dollar. A tree ensemble fits a stepped curve that follows the bend, without a coefficient`}
    >
      <Key x={L} y={18}>WEEKLY UNITS BY PRICE</Key>
      <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[3, 4, 5, 6].map((p) => (
        <Key key={p} x={X(p)} y={B + 16} anchor="middle" size={9.5}>{`$${p}.00`}</Key>
      ))}
      <g transform={`translate(${L - 12} ${T}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" size={10}>UNITS</Key>
      </g>
      {TREE.price.map((p, i) => (
        <Store1 key={i} cx={X(p)} cy={Y(TREE.units[i])} k={0.6} stroke={INK3} />
      ))}
      <line x1={X(3)} y1={Y(a + b * 3)} x2={X(6)} y2={Y(a + b * 6)} stroke={INK} strokeWidth={2} />
      <path d={steps} fill="none" stroke={SIGNAL} strokeWidth={2.5} />

      <line x1={490} y1={30} x2={490} y2={262} stroke={RULE} strokeWidth={1} />
      <line x1={504} y1={62} x2={530} y2={62} stroke={INK} strokeWidth={2} />
      <Key x={504} y={84} size={9}>LINEAR</Key>
      <Key x={504} y={96} size={9}>REGRESSION</Key>
      <Display x={504} y={126} size={20}>{minus(String(Math.round(b)))}</Display>
      <Key x={504} y={142} size={9}>UNITS PER $1</Key>
      <path d="M504 178h9v-8h9v-8h8" fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={504} y={198} size={9} fill={SIGNAL}>TREE</Key>
      <Key x={504} y={210} size={9} fill={SIGNAL}>ENSEMBLE</Key>
      <Key x={504} y={236} size={9} fill={SIGNAL}>NO COEFFICIENT</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Limitations of Machine Learning Models
   -------------------------------------------------------------------------- */

const IMPORTANCE = [
  { key: "DISCOUNT RECEIVED", v: 0.34, lead: true },
  { key: "PAST PURCHASES", v: 0.27, lead: false },
  { key: "MONTHS AS A CUSTOMER", v: 0.18, lead: false },
  { key: "EMAILS OPENED", v: 0.12, lead: false },
  { key: "REGION", v: 0.05, lead: false },
];

/**
 * Variable importance is not an effect: a purchase model's importance chart
 * ranks "discount received" first. In the historical data, the discounts
 * went to the most loyal customers, so the variable carries their loyalty.
 */
export function DiscountImportance() {
  const bx = 190;
  const bw = 360;
  return (
    <Frame
      width={600}
      height={300}
      label="A purchase model's variable importance: discount received 0.34, past purchases 0.27, months as a customer 0.18, emails opened 0.12, region 0.05. Below, sixteen customers from the historical data: the discounts went to the six most loyal"
    >
      <Key x={20} y={20}>VARIABLE IMPORTANCE</Key>
      {IMPORTANCE.map((r, i) => {
        const y = 40 + i * 26;
        return (
          <g key={r.key}>
            <Key x={bx - 10} y={y + 12} anchor="end" size={9.5} fill={r.lead ? COUNTER : INK}>{r.key}</Key>
            <rect x={bx} y={y} width={r2((r.v / 0.34) * bw * 0.9)} height={16} fill={r.lead ? COUNTER : INK} />
            <Key x={r2(bx + (r.v / 0.34) * bw * 0.9 + 8)} y={y + 12} size={9.5} fill={r.lead ? COUNTER : INK3}>{r.v.toFixed(2)}</Key>
          </g>
        );
      })}

      <line x1={20} y1={180} x2={580} y2={180} stroke={RULE} strokeWidth={1} />
      <Key x={20} y={200}>WHO RECEIVED DISCOUNTS</Key>
      {Array.from({ length: 16 }, (_, i) => {
        const loyal = i < 6;
        const x = 40 + i * 34 + (loyal ? 0 : 20);
        return (
          <g key={i}>
            {loyal ? <Tag x={x - 11} y={208} size={22} weight="regular" color={INK} /> : null}
            <Person1 x={x} y={266} k={0.9} fill={loyal ? COUNTER : PAPER} stroke={loyal ? COUNTER : INK3} />
          </g>
        );
      })}
      <path d="M28 276v6H222v-6" fill="none" stroke={COUNTER} strokeWidth={1.25} />
      <Key x={125} y={296} anchor="middle" size={9.5} fill={COUNTER}>MOST LOYAL CUSTOMERS</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Estimating How AI Agents Weight Attributes
   -------------------------------------------------------------------------- */

/**
 * Wadi & Ma (2026b), Table W2: ratio of the cent to the whole-dollar price
 * coefficient from a conditional logit per model, 1,014 choice sets each,
 * with exact (Fieller) 95% confidence intervals. The normative optimizer's
 * own estimate is shown for reference.
 */
const CENT_RATIO = [
  { key: "Flash Lite", r: 0.84, lo: 0.58, hi: 1.11 },
  { key: "Flash", r: 0.55, lo: 0.19, hi: 0.9 },
  { key: "Pro", r: 1.02, lo: 0.83, hi: 1.22 },
  { key: "Sonnet", r: 1.12, lo: 0.94, hi: 1.28 },
  { key: "Opus", r: 0.81, lo: 0.45, hi: 1.17 },
  { key: "Luna", r: 1.11, lo: 0.94, hi: 1.28 },
  { key: "Terra", r: 1.11, lo: 0.94, hi: 1.27 },
  { key: "Sol", r: 1.11, lo: 0.94, hi: 1.27 },
];
const CENT_NORMATIVE = { r: 1.11, lo: 0.94, hi: 1.27 };

/**
 * The cent-to-dollar ratio for eight AI agents choosing coffee: each estimate
 * with its 95% confidence interval against the normative value of 1. Seven
 * intervals include 1. Flash's lies below it, where cents are discounted.
 */
export function CentDollarRatio() {
  const lx = 196;
  const rx = 540;
  const X = (v: number) => r2(lx + (v / 1.4) * (rx - lx));
  const top = 58;
  const step = 27;
  const rowY = (i: number) => top + i * step;
  const bottom = rowY(CENT_RATIO.length) + 2;
  return (
    <Frame
      width={600}
      height={346}
      label={`Ratio of the cent to the whole-dollar price coefficient for eight AI agents, with 95% confidence intervals, against the normative value of 1: ${CENT_RATIO.map(
        (m) => `${m.key} ${m.r.toFixed(2)} [${m.lo.toFixed(2)}, ${m.hi.toFixed(2)}]`,
      ).join(". ")}. Seven intervals include 1. Flash's lies below 1. The normative optimizer's own estimate is 1.11 [0.94, 1.27]`}
    >
      <Key x={20} y={20}>CENT COEFFICIENT ÷ DOLLAR COEFFICIENT</Key>
      <rect x={lx} y={34} width={r2(X(1) - lx)} height={bottom + 30 - 34} fill={COUNTER_TINT} />
      <Key x={lx + 8} y={48} size={9} fill={COUNTER}>CENTS DISCOUNTED</Key>
      <line x1={X(1)} y1={34} x2={X(1)} y2={bottom + 30} stroke={INK} strokeWidth={1.5} />
      <Key x={r2(X(1) + 6)} y={48} size={9}>NORMATIVE VALUE 1</Key>

      {CENT_RATIO.map((m, i) => {
        const y = rowY(i) + 14;
        const in1 = m.lo <= 1 && m.hi >= 1;
        const tone = in1 ? SIGNAL : COUNTER;
        return (
          <g key={m.key}>
            <AiMark1 cx={34} cy={y} s={13} fill={INK} />
            <Note x={48} y={y + 4.5} size={13}>{m.key}</Note>
            <line x1={X(m.lo)} y1={y} x2={X(m.hi)} y2={y} stroke={tone} strokeWidth={2} />
            <line x1={X(m.lo)} y1={y - 5} x2={X(m.lo)} y2={y + 5} stroke={tone} strokeWidth={1.5} />
            <line x1={X(m.hi)} y1={y - 5} x2={X(m.hi)} y2={y + 5} stroke={tone} strokeWidth={1.5} />
            <circle cx={X(m.r)} cy={y} r={5} fill={tone} />
            <Key x={584} y={y + 4} anchor="end" size={10} fill={tone}>{m.r.toFixed(2)}</Key>
          </g>
        );
      })}

      <line x1={20} y1={bottom + 6} x2={580} y2={bottom + 6} stroke={RULE} strokeWidth={1} />
      {(() => {
        const y = bottom + 22;
        const m = CENT_NORMATIVE;
        return (
          <g>
            <Note x={48} y={y + 4.5} size={12} fill={INK3}>Normative optimizer</Note>
            <line x1={X(m.lo)} y1={y} x2={X(m.hi)} y2={y} stroke={INK3} strokeWidth={2} />
            <line x1={X(m.lo)} y1={y - 5} x2={X(m.lo)} y2={y + 5} stroke={INK3} strokeWidth={1.5} />
            <line x1={X(m.hi)} y1={y - 5} x2={X(m.hi)} y2={y + 5} stroke={INK3} strokeWidth={1.5} />
            <circle cx={X(m.r)} cy={y} r={5} fill={INK3} />
            <Key x={584} y={y + 4} anchor="end" size={10}>{m.r.toFixed(2)}</Key>
          </g>
        );
      })()}

      <line x1={lx} y1={bottom + 38} x2={rx} y2={bottom + 38} stroke={INK} strokeWidth={1.25} />
      {[0, 0.5, 1, 1.4].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={bottom + 38} x2={X(v)} y2={bottom + 43} stroke={INK} strokeWidth={1.25} />
          <Key x={X(v)} y={bottom + 56} anchor="middle" size={9.5}>{v.toFixed(v === 0 || v === 1 ? 0 : 1)}</Key>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Mediation Analysis
   -------------------------------------------------------------------------- */

/**
 * Wadi & Ma (2026c), Study 1, Tables 7 and 8 (N = 2,000, PROCESS Model 8):
 * the a path (sponsorship → skepticism) for each principal, the b path
 * (skepticism → choice, log odds), the conditional indirect effect a × b and
 * the conditional direct effect of sponsorship on choice.
 */
const MEDIATION = {
  traveler: { a: 4.46, b: -1.365, ab: -6.087, direct: -3.502, directSig: true },
  platform: { a: 3.04, b: -1.365, ab: -4.15, direct: 0.053, directSig: false },
};
const PRINCIPALS = [
  { id: "traveler", label: "The traveler" },
  { id: "platform", label: "The platform" },
] as const;
type PrincipalId = (typeof PRINCIPALS)[number]["id"];

/**
 * Mediation of a sponsorship label through skepticism: the label raises the
 * skepticism an agent expresses (a), skepticism lowers its choice of the
 * listing (b), and the product a × b is the indirect effect. Students switch
 * whom the agent is told it serves. The a path and the indirect effect
 * weaken when it serves the platform.
 */
export function SkepticismMediation() {
  const [who, setWho] = useState<PrincipalId>("traveler");
  const m = MEDIATION[who];

  const box = (cx: number, cy: number, lines: string[], tone = INK) => (
    <g>
      <rect x={cx - 78} y={cy - 26} width={156} height={52} rx={3} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {lines.map((l, i) => (
        <Key key={i} x={cx} y={r2(cy + 4 - ((lines.length - 1) * 13) / 2 + i * 13)} anchor="middle" size={9.5} fill={tone}>{l}</Key>
      ))}
    </g>
  );
  const X0 = { x: 100, y: 196 };
  const M0 = { x: 310, y: 62 };
  const Y0 = { x: 520, y: 196 };
  const arrow = (x1: number, y1: number, x2: number, y2: number, w: number, tone: string, dash?: string) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={w} strokeDasharray={dash} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1, 9 + w)} fill="none" stroke={tone} strokeWidth={1.75} />
    </g>
  );

  return (
    <div>
      <Frame
        width={620}
        height={318}
        label={`Mediation when the agent is told it serves ${who === "traveler" ? "the traveler" : "the platform"}: the sponsorship label raises skepticism by ${m.a.toFixed(2)} points (a). Each point of skepticism changes the log odds of choosing the listing by ${fmt(m.b, 3)} (b). The indirect effect a × b is ${fmt(m.ab, 2)}. The direct effect is ${fmt(m.direct, 2)}${m.directSig ? "" : ", not significant"}`}
      >
        {box(X0.x, X0.y, ["SPONSORSHIP", "LABEL"])}
        <g>
          <rect x={M0.x - 78} y={M0.y - 26} width={156} height={52} rx={3} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          <AiMark1 cx={M0.x - 56} cy={M0.y} s={18} fill={SIGNAL} />
          <Key x={M0.x + 10} y={M0.y - 2} anchor="middle" size={9.5} fill={SIGNAL}>SKEPTICISM IN</Key>
          <Key x={M0.x + 10} y={M0.y + 11} anchor="middle" size={9.5} fill={SIGNAL}>THE TRACE</Key>
        </g>
        {box(Y0.x, Y0.y, ["CHOICE OF THE", "SPONSORED LISTING"])}

        {arrow(X0.x + 30, X0.y - 28, M0.x - 70, M0.y + 28, r2(1 + m.a * 0.9), SIGNAL)}
        {arrow(M0.x + 70, M0.y + 28, Y0.x - 30, Y0.y - 28, r2(1 + Math.abs(m.b) * 0.9), SIGNAL)}
        {arrow(X0.x + 80, X0.y, Y0.x - 92, Y0.y, r2(1 + Math.abs(m.direct) * 0.9), INK, m.directSig ? undefined : "5 4")}

        <Key x={150} y={84} anchor="end" size={10} fill={SIGNAL}>a</Key>
        <Display x={150} y={110} anchor="end" size={22} fill={SIGNAL}>{`+${m.a.toFixed(2)}`}</Display>
        <Key x={470} y={84} size={10} fill={SIGNAL}>b</Key>
        <Display x={470} y={110} size={22} fill={SIGNAL}>{fmt(m.b, 3)}</Display>
        <Key x={310} y={218} anchor="middle" size={9.5}>DIRECT EFFECT</Key>
        <Key x={310} y={186} anchor="middle" size={11}>{`${fmt(m.direct, 2)}${m.directSig ? "" : ", NOT SIGNIFICANT"}`}</Key>

        <line x1={20} y1={244} x2={600} y2={244} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={270} size={10} fill={SIGNAL}>INDIRECT EFFECT a × b</Key>
        <Display x={20} y={302} size={30} fill={SIGNAL}>{fmt(m.ab, 2)}</Display>
        <Key x={130} y={298} size={9.5}>LOG ODDS</Key>
        <Key x={600} y={270} anchor="end" size={9.5} fill={INK3}>{`TRAVELER ${fmt(MEDIATION.traveler.ab, 2)} | PLATFORM ${fmt(MEDIATION.platform.ab, 2)}`}</Key>
        <Key x={600} y={298} anchor="end" size={9} fill={INK3}>N = 2,000 SESSIONS</Key>
      </Frame>
      <Segmented label="The agent is told it serves" options={[...PRINCIPALS]} value={who} onChange={setWho} />
    </div>
  );
}
