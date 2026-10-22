"use client";

import React, { useState } from "react";
import {
  Frame,
  Key,
  PAL,
  Segmented,
  Slider,
  r2,
} from "../_visuals/kit";
import {
  GlassCube,
  IsoBase,
  IsoBlock,
  IsoCoinStack,
  IsoHouse,
  IsoPerson,
} from "../_visuals/objects";

/* ==========================================================================
   WEEK 02 PLATES — ISOMETRIC TABLETOP DIORAMA
   --------------------------------------------------------------------------
   Hand-crafted 3D axonometric tabletop scale models on `IsoBase`.
   Each plate uses bespoke 3D architectural instruments, mechanisms, and
   sculpted forms rather than repeating generic blocks.
   ========================================================================== */

/**
 * Helper: 3D Isometric Cylinder (for reservoirs, calibration tubes, gauges, pegs)
 */
function IsoCylinder({
  cx,
  y,
  rx = 16,
  ry = 6.5,
  h = 40,
  sideFill = PAL.slabLeft,
  topFill = PAL.paper,
  stroke = PAL.ink,
}: {
  cx: number;
  y: number;
  rx?: number;
  ry?: number;
  h?: number;
  sideFill?: string;
  topFill?: string;
  stroke?: string;
}) {
  const topY = r2(y - h);
  return (
    <g stroke={stroke} strokeWidth="1.4" strokeLinejoin="round">
      <path
        d={`M ${r2(cx - rx)} ${topY} V ${r2(y)} A ${rx} ${ry} 0 0 0 ${r2(cx + rx)} ${r2(y)} V ${topY} Z`}
        fill={sideFill}
      />
      <ellipse cx={r2(cx)} cy={topY} rx={rx} ry={ry} fill={topFill} />
    </g>
  );
}

/**
 * Slide 2 — From Statistical Patterns to Market Discrimination:
 * A 3D bifurcating sorting chute diorama on an 800-unit tabletop.
 * Shows how a predictive model inside a GlassCube separates customers into
 * high-P and low-P tracks, and how proxy features + historical inequities turn
 * statistical sorting into systematic group exclusion even when demographic
 * attributes are excluded.
 */
export function IsoStatisticalToMarketSorting() {
  const [mode, setMode] = useState<"statistical" | "proxy">("proxy");
  const isProxy = mode === "proxy";

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of statistical sorting versus market discrimination: on the left, applicants and an input feature pedestal feed into a glass AI cube; inside the cube, a probability threshold gauge splits decisions along an upper verdigris approval rail and a lower denial rail. ${isProxy ? "Under historical inequities and proxy inputs, the model systematically routes the protected group behind a red denial barrier." : "Under unbiased statistical separation, applicants from both groups are sorted by individual probability onto the upper and lower rails."}`}
      >
        <IsoBase w={800} />

        {/* Left: Applicant profiles & input feature pedestal */}
        <Key x={148} y={28} anchor="middle" fill={PAL.ink3} size={9.5}>
          {isProxy ? "NO RACE/AGE · PROXY INPUTS" : "APPLICANT PROFILES"}
        </Key>

        <IsoPerson
          x={86}
          y={146}
          scale={0.82}
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
        />
        <IsoPerson
          x={138}
          y={146}
          scale={0.82}
          coat={isProxy ? PAL.signal : PAL.counter}
          coatShade={isProxy ? PAL.signalMid : PAL.counterMid}
          skin={PAL.skin3}
        />

        {/* Input feature pedestal feeding into the GlassCube */}
        <IsoBlock
          x={178}
          y={148}
          w={44}
          d={26}
          h={36}
          topFill={isProxy ? PAL.signalLight : PAL.paper}
          leftFill={isProxy ? PAL.paper : PAL.paper}
          rightFill={isProxy ? PAL.signalMid : PAL.slabLeft}
          stroke={isProxy ? PAL.signal : PAL.ink}
        />
        <line
          x1="188"
          y1="124"
          x2="212"
          y2="124"
          stroke={isProxy ? PAL.signal : PAL.counter}
          strokeWidth="2.2"
        />
        <line
          x1="188"
          y1="132"
          x2="208"
          y2="132"
          stroke={isProxy ? PAL.signal : PAL.ink3}
          strokeWidth="1.8"
        />

        {/* Input conduit from pedestal into GlassCube */}
        <line
          x1="241"
          y1="116"
          x2="262"
          y2="116"
          stroke={isProxy ? PAL.signal : PAL.ink2}
          strokeWidth="2.2"
        />
        <polygon
          points="268,116 260,112 260,120"
          fill={isProxy ? PAL.signal : PAL.ink2}
        />

        {/* Center: GlassCube P(Y = 1) Sorter */}
        <Key x={316} y={28} anchor="middle" fill={PAL.ink2} size={9.5}>
          P(Y = 1) THRESHOLD SORTER
        </Key>

        <GlassCube
          x={268}
          y={148}
          w={64}
          d={44}
          h={64}
          outside={
            <g>
              {/* Exit port on right glass face */}
              <ellipse cx="348" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />

              {/* Upper rail: High P(Y = 1) -> straight into Approval terrace */}
              <line
                x1="348"
                y1="103"
                x2="450"
                y2="103"
                stroke={PAL.counter}
                strokeWidth="2.6"
              />
              <polygon points="456,103 448,99 448,107" fill={PAL.counter} />

              {/* Lower rail: Low P(Y = 1) -> down into Denial barrier */}
              <path
                d="M 348 109 L 386 109 L 386 138 L 450 138"
                fill="none"
                stroke={isProxy ? PAL.signal : PAL.ink2}
                strokeWidth="2.6"
              />
              <polygon
                points="456,138 448,134 448,142"
                fill={isProxy ? PAL.signal : PAL.ink2}
              />
            </g>
          }
        >
          {/* Probability gauge & diverter needle inside the GlassCube */}
          <circle
            cx="312"
            cy="108"
            r="15"
            fill={isProxy ? PAL.signalLight : PAL.counterLight}
            stroke={isProxy ? PAL.signal : PAL.counter}
            strokeWidth="1.8"
          />
          <line
            x1="300"
            y1={isProxy ? 102 : 114}
            x2="324"
            y2={isProxy ? 116 : 102}
            stroke={isProxy ? PAL.signal : PAL.counter}
            strokeWidth="2.8"
          />
          <circle cx="312" cy="108" r="4" fill={PAL.ink} />
        </GlassCube>

        {/* Right-Back: Elevated High-Probability Approval Terrace */}
        <Key x={576} y={24} anchor="middle" fill={PAL.counter} size={9.5}>
          HIGH P(Y = 1) · APPROVED SEGMENT
        </Key>
        <IsoBlock
          x={456}
          y={116}
          w={188}
          d={28}
          h={20}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <IsoPerson
          x={504}
          y={88}
          scale={0.68}
          flip
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
        />
        <IsoCoinStack x={534} y={90} n={4} />
        <IsoPerson
          x={586}
          y={88}
          scale={0.68}
          flip
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={isProxy ? PAL.skin2 : PAL.skin3}
        />
        <IsoCoinStack x={616} y={90} n={4} />

        {/* Right-Front: Low-Probability Denial Track */}
        <IsoBlock
          x={456}
          y={152}
          w={16}
          d={24}
          h={30}
          topFill={isProxy ? PAL.signalLight : PAL.paper}
          leftFill={isProxy ? PAL.signal : PAL.slabLeft}
          rightFill={isProxy ? PAL.signalMid : PAL.slabRight}
        />

        {isProxy ? (
          <>
            {[524, 582, 640].map((px, i) => (
              <IsoPerson
                key={px}
                x={px}
                y={150}
                scale={0.72}
                flip
                coat={PAL.signal}
                coatShade={PAL.signalMid}
                skin={i === 1 ? PAL.skin2 : PAL.skin3}
              />
            ))}
          </>
        ) : (
          <>
            <IsoPerson
              x={536}
              y={150}
              scale={0.72}
              flip
              coat={PAL.ink2}
              coatShade={PAL.ink}
              skin={PAL.skin1}
            />
            <IsoPerson
              x={606}
              y={150}
              scale={0.72}
              flip
              coat={PAL.ink2}
              coatShade={PAL.ink}
              skin={PAL.skin3}
            />
          </>
        )}

        <Key
          x={576}
          y={196}
          anchor="middle"
          fill={isProxy ? PAL.signal : PAL.ink3}
          size={9}
        >
          {isProxy
            ? "LOW P(Y = 1) · SYSTEMATIC PROTECTED-GROUP EXCLUSION"
            : "LOW P(Y = 1) · INDIVIDUAL STATISTICAL SEPARATION"}
        </Key>
      </Frame>
      <Segmented
        label="Pipeline regime"
        options={[
          { id: "statistical", label: "Statistical separation (unbiased)" },
          { id: "proxy", label: "Historical inequities & proxies (market discrimination)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Slide 3A — Disparate Treatment vs Disparate Impact & Unawareness:
 * On the left of the 400-unit board, an explicit signpost & turnstile bar
 * intentionally blocks an applicant (disparate treatment). On the right, the
 * demographic column is dropped into a 3D disposal slot (fairness through
 * unawareness), yet a facially neutral GlassCube still drops a heavy red
 * portcullis gate on the protected group (disparate impact).
 */
export function IsoTreatmentVsImpact() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama contrasting disparate treatment and disparate impact: on the left, an explicit rule barrier directly blocks a protected applicant; on the right, a facially neutral glass AI cube still drives a solid 3D red barrier wall against the protected group."
    >
      <IsoBase />

      {/* Left zone: Disparate Treatment (explicit barrier rule) */}
      <Key x={96} y={24} anchor="middle" fill={PAL.ink2} size={9.5}>
        DISPARATE TREATMENT
      </Key>

      {/* Explicit rule barrier block with X mark on front face */}
      <IsoBlock
        x={48}
        y={148}
        w={26}
        d={28}
        h={54}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <line x1="55" y1="112" x2="67" y2="124" stroke={PAL.paper} strokeWidth="2.2" />
      <line x1="67" y1="112" x2="55" y2="124" stroke={PAL.paper} strokeWidth="2.2" />

      <IsoPerson
        x={116}
        y={146}
        scale={0.78}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />

      {/* Tabletop divider */}
      <line
        x1={146}
        y1={162}
        x2={206}
        y2={112}
        stroke={PAL.ink3}
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />

      {/* Right zone: Fairness Through Unawareness -> Disparate Impact */}
      <Key x={268} y={24} anchor="middle" fill={PAL.signal} size={9.5}>
        UNAWARENESS · DISPARATE IMPACT
      </Key>

      {/* Facially neutral GlassCube */}
      <GlassCube
        x={190}
        y={146}
        w={48}
        d={34}
        h={48}
        outside={
          <g>
            <ellipse cx="250" cy="112" rx="3.5" ry="5" fill={PAL.ink} />
            <line x1="250" y1="112" x2="274" y2="112" stroke={PAL.signal} strokeWidth="2.8" />
          </g>
        }
      >
        {/* Neutral balance ring inside cube */}
        <circle cx="222" cy="112" r="10" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
        <line x1="215" y1="112" x2="229" y2="112" stroke={PAL.ink} strokeWidth="2" />
      </GlassCube>

      {/* Solid 3D red barrier wall driven by the neutral cube */}
      <IsoBlock
        x={274}
        y={148}
        w={16}
        d={28}
        h={52}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />

      <IsoPerson
        x={322}
        y={142}
        scale={0.78}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin2}
      />
    </Frame>
  );
}
/**
 * Slide 3B — The Four-Fifths (80%) Rule Caliper Instrument:
 * Interactive 400-unit diorama with two 3D cylindrical selection-rate towers
 * emerging from a GlassCube and a horizontal 80% regulatory caliper bar.
 */
export function IsoFourFifthsRule() {
  const [rateB, setRateB] = useState(30);
  const rateA = 50;
  const ratio = rateB / rateA;
  const adverse = ratio < 0.8;

  const hA = Math.round(rateA * 1.36); // 68
  const hThreshold = Math.round(rateA * 0.8 * 1.36); // 54
  const hB = Math.round(rateB * 1.36);
  const yBase = 148;
  const yThresh = yBase - hThreshold; // 94
  const yTopB = yBase - hB;

  return (
    <div>
      <Frame
        width={400}
        height={200}
        label={`Isometric tabletop diorama of the four-fifths rule: a glass AI cube feeds two 3D cylindrical selection towers on the board. Group A stands at 50% selection rate, projecting an 80% caliper arm at 40%; Group B stands at ${rateB}% (ratio ${ratio.toFixed(2)}), ${adverse ? "falling below the four-fifths bar and triggering a red adverse impact signal" : "meeting the four-fifths benchmark in verdigris"}.`}
      >
        <IsoBase />

        <Key
          x={200}
          y={22}
          anchor="middle"
          fill={adverse ? PAL.signal : PAL.counter}
          size={9.5}
        >
          {adverse
            ? `RATIO ${ratio.toFixed(2)} < 0.80 · ADVERSE IMPACT SIGNAL`
            : `RATIO ${ratio.toFixed(2)} ≥ 0.80 · MEETS 4/5 BENCHMARK`}
        </Key>

        {/* Scoring GlassCube on the left */}
        <GlassCube
          x={44}
          y={148}
          w={48}
          d={34}
          h={48}
          outside={
            <g>
              <ellipse cx="104" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
              <line x1="104" y1="114" x2="152" y2="114" stroke={PAL.ink2} strokeWidth="2" />
            </g>
          }
        >
          <circle cx="76" cy="114" r="10" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.5" />
          <circle cx="76" cy="114" r="3.5" fill={PAL.ink} />
        </GlassCube>

        {/* Group A Cylindrical Selection Tower (50% reference) */}
        <IsoCylinder
          cx={172}
          y={yBase}
          rx={20}
          ry={7.5}
          h={hA}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={172} y={48} anchor="middle" fill={PAL.counter} size={9.5}>
          GROUP A · 50%
        </Key>

        {/* Group B Cylindrical Selection Tower (interactive) */}
        <IsoCylinder
          cx={308}
          y={yBase}
          rx={20}
          ry={7.5}
          h={hB}
          sideFill={adverse ? PAL.signal : PAL.counter}
          topFill={adverse ? PAL.signalLight : PAL.counterLight}
        />
        <Key
          x={308}
          y={48}
          anchor="middle"
          fill={adverse ? PAL.signal : PAL.counter}
          size={9.5}
        >
          {`GROUP B · ${rateB}%`}
        </Key>

        {/* 4/5 (80%) Benchmark Line from Group A's 80% mark to Group B */}
        <line
          x1={186}
          y1={yThresh}
          x2={194}
          y2={yThresh}
          stroke={PAL.ink}
          strokeWidth="2.2"
        />
        <line
          x1={194}
          y1={yThresh}
          x2={adverse ? 336 : 288}
          y2={yThresh}
          stroke={adverse ? PAL.signal : PAL.counter}
          strokeWidth="2.2"
          strokeDasharray="5 3"
        />
        <Key
          x={240}
          y={r2(yThresh - 7)}
          anchor="middle"
          fill={adverse ? PAL.signal : PAL.counter}
          size={8.5}
        >
          4/5 = 40%
        </Key>

        {/* Vertical gap caliper arrow when Group B is below the 4/5 bar */}
        {adverse && yTopB > yThresh + 4 && (
          <g>
            <line
              x1={336}
              y1={yThresh}
              x2={336}
              y2={yTopB}
              stroke={PAL.signal}
              strokeWidth="2"
            />
            <line x1={331} y1={yThresh} x2={341} y2={yThresh} stroke={PAL.signal} strokeWidth="1.8" />
            <line x1={331} y1={yTopB} x2={341} y2={yTopB} stroke={PAL.signal} strokeWidth="1.8" />
          </g>
        )}
      </Frame>
      <Slider
        label="Group B selection rate"
        value={rateB}
        min={15}
        max={50}
        step={5}
        onChange={setRateB}
        formatValue={(v) => `${v}% (${(v / rateA).toFixed(2)})`}
      />
    </div>
  );
}
/**
 * Slide 4 — Part 1: Sources of Algorithmic Bias Across the Pipeline:
 * Interactive 800-unit diorama with four distinct 3D architectural pipeline
 * instruments linked by isometric conduits: (1) Stepped Historical Archive,
 * (2) Tilted Proxy Balance Scale, (3) Model Specification GlassCube with
 * internal plane, and (4) Market Deployment Gate with a feedback return arch.
 */
export function IsoPipelineBiasStages() {
  const [stage, setStage] = useState<"all" | "data" | "measurement" | "model" | "deployment">("all");
  const lit = (s: "data" | "measurement" | "model" | "deployment") => stage === "all" || stage === s;

  const remedyLabel = {
    all: "FOUR PIPELINE ENTRY STAGES · EACH REQUIRES A DISTINCT REMEDY",
    data: "STAGE 01 · DATA GENERATION -> REBALANCE SAMPLING & AUDIT HISTORICAL LABELS",
    measurement: "STAGE 02 · MEASUREMENT -> VALIDATE CONSTRUCT PROXIES ACROSS GROUPS",
    model: "STAGE 03 · MODEL SPECIFICATION -> DECOUPLE POOLED SLOPES & ADD CONSTRAINTS",
    deployment: "STAGE 04 · MARKET DEPLOYMENT -> BLOCK PROXY RECONSTRUCTION & FEEDBACK LOOPS",
  }[stage];

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label="Isometric tabletop diorama of the four stages where algorithmic bias enters a commercial pipeline: Stage 1 stepped data archive, Stage 2 tilted measurement balance scale, Stage 3 model specification glass cube with an internal regression plane, and Stage 4 market deployment gate with a feedback return pipe."
      >
        <IsoBase w={800} />

        <Key
          x={400}
          y={22}
          anchor="middle"
          fill={stage === "all" ? PAL.ink2 : PAL.signal}
          size={9.5}
        >
          {remedyLabel}
        </Key>

        {/* Stage 1: Data Generation (Uneven Sample Cylinders) */}
        <g opacity={lit("data") ? 1 : 0.35}>
          <Key x={114} y={46} anchor="middle" fill={stage === "data" ? PAL.signal : PAL.ink2} size={9}>
            01 · DATA GENERATION
          </Key>
          <IsoCylinder
            cx={90}
            y={148}
            rx={16}
            ry={6}
            h={48}
            sideFill={PAL.counter}
            topFill={PAL.counterLight}
          />
          <IsoCylinder
            cx={136}
            y={148}
            rx={16}
            ry={6}
            h={18}
            sideFill={PAL.signal}
            topFill={PAL.signalLight}
          />
          {/* Conduit connected from Stage 1 to Stage 2 plinth */}
          <line x1="152" y1="138" x2="248" y2="138" stroke={PAL.ink2} strokeWidth="2.2" />
          <polygon points="254,138 246,134 246,142" fill={PAL.ink2} />
        </g>

        {/* Stage 2: Measurement (3D Balance Scale Mounted on Plinth) */}
        <g opacity={lit("measurement") ? 1 : 0.35}>
          <Key x={288} y={46} anchor="middle" fill={stage === "measurement" ? PAL.signal : PAL.ink2} size={9}>
            02 · MEASUREMENT
          </Key>
          {/* 3D Fulcrum plinth */}
          <IsoBlock
            x={254}
            y={148}
            w={48}
            d={24}
            h={32}
            topFill={PAL.paper}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          {/* Vertical post rising from center of plinth top face to pivot */}
          <line x1="287" y1="110" x2="287" y2="88" stroke={PAL.ink} strokeWidth="2.4" />
          {/* Tilted proxy balance beam & pans */}
          <line x1="248" y1="96" x2="326" y2="80" stroke={PAL.signal} strokeWidth="2.6" />
          <circle cx="287" cy="88" r="3.8" fill={PAL.ink} />
          {/* Left pan */}
          <line x1="248" y1="96" x2="248" y2="112" stroke={PAL.ink} strokeWidth="1.4" />
          <ellipse cx="248" cy="114" rx="12" ry="4.2" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.4" />
          {/* Right pan */}
          <line x1="326" y1="80" x2="326" y2="96" stroke={PAL.ink} strokeWidth="1.4" />
          <ellipse cx="326" cy="98" rx="12" ry="4.2" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.4" />

          {/* Conduit connected from Stage 2 plinth to Stage 3 GlassCube */}
          <line x1="319" y1="120" x2="412" y2="120" stroke={PAL.ink2} strokeWidth="2.2" />
          <polygon points="418,120 410,116 410,124" fill={PAL.ink2} />
        </g>

        {/* Stage 3: Model Specification (GlassCube with internal fit mechanism) */}
        <g opacity={lit("model") ? 1 : 0.35}>
          <Key x={464} y={46} anchor="middle" fill={stage === "model" ? PAL.signal : PAL.ink2} size={9}>
            03 · MODEL FIT
          </Key>
          <GlassCube
            x={418}
            y={148}
            w={60}
            d={42}
            h={60}
            outside={
              <g>
                <ellipse cx="493" cy="110" rx="4" ry="5.5" fill={PAL.ink} />
                <line x1="493" y1="110" x2="572" y2="110" stroke={PAL.signal} strokeWidth="2.4" />
                <polygon points="578,110 570,106 570,114" fill={PAL.signal} />
              </g>
            }
          >
            {/* Internal model fit gauge & slope line */}
            <circle
              cx="458"
              cy="110"
              r="15"
              fill={PAL.signalLight}
              stroke={PAL.signal}
              strokeWidth="1.6"
            />
            <line x1="445" y1="118" x2="471" y2="102" stroke={PAL.counter} strokeWidth="2.4" />
            <circle cx="452" cy="114" r="3" fill={PAL.counter} />
            <circle cx="464" cy="118" r="3" fill={PAL.signal} />
          </GlassCube>
        </g>

        {/* Stage 4: Market Deployment & Feedback Return Loop */}
        <g opacity={lit("deployment") ? 1 : 0.35}>
          <Key x={644} y={46} anchor="middle" fill={stage === "deployment" ? PAL.signal : PAL.ink2} size={9}>
            04 · DEPLOYMENT
          </Key>
          <IsoBlock
            x={578}
            y={148}
            w={20}
            d={32}
            h={52}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <IsoPerson
            x={658}
            y={148}
            scale={0.82}
            flip
            coat={PAL.signal}
            coatShade={PAL.signalMid}
            skin={PAL.skin3}
          />
          {/* Feedback loop return conduit below the front bevel back to Stage 1 */}
          <path
            d="M 588 170 L 588 184 L 112 184 L 112 170"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <polygon points="112,170 108,178 116,178" fill={PAL.signal} />
          <Key x={350} y={200} anchor="middle" fill={PAL.signal} size={8.5}>
            SELECTIVE OBSERVATION FEEDBACK LOOP TO TRAINING DATA
          </Key>
        </g>
      </Frame>
      <Segmented
        label="Pipeline stage"
        options={[
          { id: "all", label: "All 4 stages" },
          { id: "data", label: "01 Data generation" },
          { id: "measurement", label: "02 Measurement" },
          { id: "model", label: "03 Model specification" },
          { id: "deployment", label: "04 Market deployment" },
        ]}
        value={stage}
        onChange={setStage}
      />
    </div>
  );
}
/**
 * Slide 5A — Historical Bias (10-Year Executive Promotion Staircase):
 * On the left of the 400-unit board sits a 3-step promotion staircase shaped
 * by past exclusion; a hiring GlassCube traces that historical step profile
 * and stamps a red career-pattern penalty against a female applicant on the right.
 */
export function IsoHistoricalBias() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama of historical bias in hiring: on the left, a 3D two-tier executive promotion podium from the past ten years elevates one group; a hiring glass AI cube replicates that historical step profile inside its mechanism and raises a red barrier against a current female applicant on the right."
    >
      <IsoBase />

      <Key x={102} y={24} anchor="middle" fill={PAL.ink2} size={9.5}>
        10-YR PROMOTION HISTORY
      </Key>

      {/* Seamless 2-tier stacked historical promotion podium */}
      <IsoBlock
        x={44}
        y={148}
        w={76}
        d={26}
        h={18}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoBlock
        x={68}
        y={130}
        w={52}
        d={26}
        h={28}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      {/* Historical promoted executive atop the upper tier */}
      <IsoPerson
        x={102}
        y={95}
        scale={0.58}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
      />

      {/* Trace arrow connected from podium right face into GlassCube */}
      <line
        x1={139}
        y1={112}
        x2={176}
        y2={112}
        stroke={PAL.signal}
        strokeWidth="2.2"
        strokeDasharray="4 3"
      />
      <polygon points="182,112 174,108 174,116" fill={PAL.signal} />

      <Key x={268} y={24} anchor="middle" fill={PAL.signal} size={9.5}>
        REPLICATED AS TARGET RULE
      </Key>

      {/* Hiring model GlassCube with internal step template */}
      <GlassCube
        x={182}
        y={146}
        w={52}
        d={36}
        h={52}
        outside={
          <g>
            <ellipse cx="247" cy="112" rx="3.8" ry="5.5" fill={PAL.ink} />
            <line x1="247" y1="112" x2="274" y2="112" stroke={PAL.signal} strokeWidth="2.8" />
          </g>
        }
      >
        <circle
          cx="216"
          cy="112"
          r="13"
          fill={PAL.signalLight}
          stroke={PAL.signal}
          strokeWidth="1.6"
        />
        <path
          d="M 207 118 H 216 V 106 H 225"
          fill="none"
          stroke={PAL.signal}
          strokeWidth="2.4"
        />
      </GlassCube>

      {/* Penalized career-pattern barrier on the right */}
      <IsoBlock
        x={274}
        y={148}
        w={16}
        d={28}
        h={48}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <IsoPerson
        x={322}
        y={142}
        scale={0.78}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin2}
      />
    </Frame>
  );
}
/**
 * Slide 5B — Representation Bias (Capture Dome & Error-Rate Cylinders):
 * Interactive 400-unit diorama where a slider adjusts the underrepresented
 * group's share in the training sample (5% to 50%), showing how undersampling
 * produces a tall red error-rate cylinder when deployed to that group.
 */
export function IsoRepresentationBias() {
  const [sampleShare, setSampleShare] = useState(10);
  const majError = 4;
  const minError = Math.round(4 + (50 - sampleShare) * 0.72);
  const highGap = minError > 12;

  const hTrainMin = Math.max(8, Math.round(sampleShare * 0.92));
  const hMaj = Math.max(10, Math.round(majError * 1.6));
  const hMin = Math.max(10, Math.round(minError * 1.6));

  return (
    <div>
      <Frame
        width={400}
        height={215}
        label={`Isometric tabletop diorama of representation bias in a voice and facial analysis system: on the left, two training sample cylinders show the majority group and ${sampleShare}% from the underrepresented group; in the center, a glass AI cube processes speech and face signals; on the right, deployed error-rate cylinders show ${majError}% error for the majority group versus ${minError}% error for the underrepresented group.`}
      >
        <IsoBase />

        <Key x={95} y={24} anchor="middle" fill={PAL.ink2} size={9.5}>
          {`TRAINING SAMPLE (${sampleShare}%)`}
        </Key>

        {/* Majority Training Cylinder */}
        <IsoCylinder
          cx={74}
          y={146}
          rx={15}
          ry={5.5}
          h={46}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        {/* Underrepresented Training Cylinder */}
        <IsoCylinder
          cx={116}
          y={146}
          rx={15}
          ry={5.5}
          h={hTrainMin}
          sideFill={highGap ? PAL.signal : PAL.counter}
          topFill={highGap ? PAL.signalLight : PAL.counterLight}
        />

        {/* Sample feed conduit connected from cylinder wall into GlassCube */}
        <line x1="131" y1="134" x2="156" y2="134" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="162,134 154,130 154,138" fill={PAL.ink2} />

        {/* Voice/Facial Analysis GlassCube */}
        <GlassCube
          x={162}
          y={146}
          w={50}
          d={34}
          h={50}
          outside={
            <g>
              <ellipse cx="224" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
              <path
                d="M 224 114 L 242 114 L 242 138 L 252 138"
                fill="none"
                stroke={PAL.ink2}
                strokeWidth="2.2"
              />
              <polygon points="258,138 250,134 250,142" fill={PAL.ink2} />
            </g>
          }
        >
          {/* Acoustic waveform bars inside the cube */}
          <circle
            cx="194"
            cy="112"
            r="14"
            fill={PAL.paper}
            stroke={PAL.ink}
            strokeWidth="1.5"
          />
          <line x1="186" y1="117" x2="186" y2="107" stroke={PAL.counter} strokeWidth="2.2" />
          <line x1="191" y1="120" x2="191" y2="104" stroke={PAL.counter} strokeWidth="2.2" />
          <line x1="197" y1="118" x2="197" y2="106" stroke={highGap ? PAL.signal : PAL.counter} strokeWidth="2.2" />
          <line x1="202" y1="115" x2="202" y2="109" stroke={highGap ? PAL.signal : PAL.counter} strokeWidth="2.2" />
        </GlassCube>

        <Key
          x={295}
          y={24}
          anchor="middle"
          fill={highGap ? PAL.signal : PAL.counter}
          size={9.5}
        >
          DEPLOYED ERROR RATES
        </Key>

        {/* Majority Group Error Cylinder (squarely on board) */}
        <IsoCylinder
          cx={273}
          y={144}
          rx={15}
          ry={5.5}
          h={hMaj}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={273} y={56} anchor="middle" fill={PAL.counter} size={9}>
          {`${majError}%`}
        </Key>
        <Key x={273} y={192} anchor="middle" fill={PAL.counter} size={8.5}>
          MAJ
        </Key>

        {/* Underrepresented Group Error Cylinder (squarely on board) */}
        <IsoCylinder
          cx={317}
          y={144}
          rx={15}
          ry={5.5}
          h={hMin}
          sideFill={highGap ? PAL.signal : PAL.counter}
          topFill={highGap ? PAL.signalLight : PAL.counterLight}
        />
        <Key
          x={317}
          y={56}
          anchor="middle"
          fill={highGap ? PAL.signal : PAL.counter}
          size={9}
        >
          {`${minError}%`}
        </Key>
        <Key
          x={317}
          y={192}
          anchor="middle"
          fill={highGap ? PAL.signal : PAL.counter}
          size={8.5}
        >
          MIN
        </Key>
      </Frame>
      <Slider
        label="Underrepresented group in training data"
        value={sampleShare}
        min={5}
        max={50}
        step={5}
        onChange={setSampleShare}
        formatValue={(v) => `${v}%`}
      />
    </div>
  );
}
/**
 * Slide 6A — Measurement Bias (Flawed Proxy vs True Construct):
 * Interactive 400-unit diorama switching between the two canonical examples:
 * (1) Healthcare expenditure proxy underestimating illness for lower-income patients,
 * and (2) Arrest records confounding behavior with policing intensity across neighborhoods.
 */
export function IsoMeasurementBias() {
  const [example, setExample] = useState<"healthcare" | "policing">("healthcare");
  const isHealth = example === "healthcare";

  return (
    <div>
      <Frame
        width={400}
        height={215}
        label={`Isometric tabletop diorama of measurement bias (${example}): ${isHealth ? "two patients with identical illness severity stand on the left, but unequal past healthcare spending (1 coin vs 4 coins) feeds into a glass AI cube, which underestimates need for the lower-income patient" : "two neighborhood buildings have identical underlying behavior, but a spotlight concentrates patrols on Neighborhood B, inflating arrest logs fed into the glass AI cube"}.`}
      >
        <IsoBase />

        {isHealth ? (
          <>
            <Key x={98} y={22} anchor="middle" fill={PAL.counter} size={9}>
              EQUAL ILLNESS · UNEQUAL SPEND
            </Key>

            {/* Patient A (higher income, 4 coins spent) */}
            <IsoPerson
              x={52}
              y={144}
              scale={0.74}
              coat={PAL.counter}
              coatShade={PAL.counterMid}
              skin={PAL.skin1}
            />
            <IsoCoinStack x={80} y={146} n={4} />

            {/* Patient B (lower income, equal sickness, only 1 coin spent) */}
            <IsoPerson
              x={116}
              y={146}
              scale={0.74}
              coat={PAL.signal}
              coatShade={PAL.signalMid}
              skin={PAL.skin3}
            />
            <IsoCoinStack x={144} y={148} n={1} signal />

            {/* Connected proxy intake conduit from 1-coin stack into GlassCube */}
            <path
              d="M 155 144 L 176 144 L 176 120 L 194 120"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            <polygon points="200,120 192,116 192,124" fill={PAL.signal} />

            <Key x={288} y={22} anchor="middle" fill={PAL.signal} size={9}>
              SPEND PROXY != NEED
            </Key>

            <GlassCube
              x={200}
              y={146}
              w={50}
              d={34}
              h={50}
              outside={
                <g>
                  <ellipse cx="262" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
                  <path
                    d="M 262 114 L 282 114 L 282 136 L 296 136"
                    fill="none"
                    stroke={PAL.signal}
                    strokeWidth="2.4"
                  />
                  <polygon points="302,136 294,132 294,140" fill={PAL.signal} />
                </g>
              }
            >
              {/* Medical cross inside the cube */}
              <path
                d="M 222 102 H 230 V 108 H 236 V 116 H 230 V 122 H 222 V 116 H 216 V 108 H 222 Z"
                fill={PAL.signalLight}
                stroke={PAL.signal}
                strokeWidth="1.4"
              />
            </GlassCube>

            {/* Underestimated need column on the right (squarely on board) */}
            <IsoCylinder
              cx={318}
              y={144}
              rx={16}
              ry={6}
              h={18}
              sideFill={PAL.signal}
              topFill={PAL.signalLight}
            />
            <Key x={318} y={84} anchor="middle" fill={PAL.signal} size={8.5}>
              LOW RANK
            </Key>
          </>
        ) : (
          <>
            <Key x={102} y={22} anchor="middle" fill={PAL.signal} size={9}>
              UNEQUAL PATROL INTENSITY
            </Key>

            {/* Neighborhood A building vs Neighborhood B building under heavy patrol spotlight */}
            <IsoBlock
              x={46}
              y={146}
              w={38}
              d={24}
              h={38}
              topFill={PAL.counterLight}
              leftFill={PAL.counter}
              rightFill={PAL.counterMid}
            />
            <IsoBlock
              x={114}
              y={146}
              w={38}
              d={24}
              h={38}
              topFill={PAL.signalLight}
              leftFill={PAL.signal}
              rightFill={PAL.signalMid}
            />

            {/* Overhead patrol spotlight cone shining on Neighborhood B */}
            <polygon
              points="142,42 114,90 170,90"
              fill={PAL.signalLight}
              fillOpacity="0.55"
              stroke={PAL.signal}
              strokeWidth="1.3"
              strokeDasharray="3 3"
            />
            <circle cx="142" cy="42" r="4.5" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.3" />

            {/* Connected intake conduit from Neighborhood B into GlassCube */}
            <line x1="169" y1="120" x2="194" y2="120" stroke={PAL.signal} strokeWidth="2.2" />
            <polygon points="200,120 192,116 192,124" fill={PAL.signal} />

            <Key x={288} y={22} anchor="middle" fill={PAL.signal} size={9}>
              ARREST PROXY != OFFENSES
            </Key>

            <GlassCube
              x={200}
              y={146}
              w={50}
              d={34}
              h={50}
              outside={
                <g>
                  <ellipse cx="262" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
                  <line x1="262" y1="114" x2="302" y2="114" stroke={PAL.signal} strokeWidth="2.4" />
                </g>
              }
            >
              <circle cx="232" cy="112" r="11" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.5" />
              <circle cx="232" cy="112" r="3.5" fill={PAL.signal} />
            </GlassCube>

            {/* Inflated risk cylinder for Neighborhood B (squarely on board) */}
            <IsoCylinder
              cx={318}
              y={144}
              rx={16}
              ry={6}
              h={54}
              sideFill={PAL.signal}
              topFill={PAL.signalLight}
            />
            <Key x={318} y={70} anchor="middle" fill={PAL.signal} size={8.5}>
              HIGH RISK
            </Key>
          </>
        )}
      </Frame>
      <Segmented
        label="Measurement proxy case"
        options={[
          { id: "healthcare", label: "Healthcare spend proxy" },
          { id: "policing", label: "Arrest records proxy" },
        ]}
        value={example}
        onChange={setExample}
      />
    </div>
  );
}
/**
 * Slide 6B — Aggregation Bias (3D Regression Plane Chamber):
 * Interactive 400-unit diorama with a wide translucent GlassCube coordinate
 * chamber containing two population pin clouds with distinct conditional slopes.
 * Toggles between a single pooled plane (fitting majority well, minority poorly)
 * and separate group-specific functional surfaces.
 */
export function IsoAggregationBias() {
  const [fit, setFit] = useState<"pooled" | "specific">("pooled");
  const isPooled = fit === "pooled";

  const groupA = [
    { x: 162, yTrue: 124 },
    { x: 184, yTrue: 111 },
    { x: 206, yTrue: 98 },
  ];

  const groupB = [
    { x: 162, yTrue: 98, yPooled: 124 },
    { x: 184, yTrue: 111, yPooled: 111 },
    { x: 206, yTrue: 124, yPooled: 98 },
  ];

  return (
    <div>
      <Frame
        width={400}
        height={200}
        label={`Isometric tabletop diorama of aggregation bias: on the left stand two distinct populations; in the center, a glass AI cube fits ${isPooled ? "a single pooled slope that matches the majority group pins closely while missing the minority group's opposite slope, resulting in poor minority fit on the right" : "two separate group-specific slopes that fit both populations accurately"}.`}
      >
        <IsoBase />

        <Key
          x={200}
          y={22}
          anchor="middle"
          fill={isPooled ? PAL.signal : PAL.counter}
          size={9.5}
        >
          {isPooled
            ? "POOLED MODEL · FITS MAJORITY, MISSES MINORITY"
            : "SEPARATE INTERACTIONS · FITS BOTH POPULATIONS"}
        </Key>

        {/* Left: Two distinct populations entering the model */}
        <IsoPerson
          x={58}
          y={144}
          scale={0.74}
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
        />
        <IsoPerson
          x={102}
          y={146}
          scale={0.74}
          coat={isPooled ? PAL.signal : PAL.counter}
          coatShade={isPooled ? PAL.signalMid : PAL.counterMid}
          skin={PAL.skin3}
        />
        <line x1="118" y1="120" x2="142" y2="120" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="148,120 140,116 140,124" fill={PAL.ink2} />

        {/* Center: GlassCube showing pooled vs group-specific regression slopes */}
        <GlassCube
          x={148}
          y={146}
          w={72}
          d={38}
          h={58}
          outside={
            <g>
              <ellipse cx="234" cy="114" rx="3.8" ry="5.5" fill={PAL.ink} />
              <path
                d="M 234 114 L 248 114 L 248 134 L 254 134"
                fill="none"
                stroke={PAL.ink2}
                strokeWidth="2.2"
              />
              <polygon points="260,134 252,130 252,138" fill={PAL.ink2} />
            </g>
          }
        >
          {/* Majority rising slope */}
          <line x1="158" y1="126" x2="210" y2="96" stroke={PAL.counter} strokeWidth="2.6" />

          {isPooled ? (
            <>
              {/* Red vertical error residuals where minority slope diverges from pooled line */}
              {groupB.map((pt) => (
                <line
                  key={pt.x}
                  x1={pt.x}
                  y1={pt.yTrue}
                  x2={pt.x}
                  y2={pt.yPooled}
                  stroke={PAL.signal}
                  strokeWidth="2"
                  strokeDasharray="3 2"
                />
              ))}
            </>
          ) : (
            /* Group-specific downward slope for Group B */
            <line x1="158" y1="96" x2="210" y2="126" stroke={PAL.counter} strokeWidth="2.6" />
          )}

          {/* Group A pins */}
          {groupA.map((pt) => (
            <circle
              key={`a-${pt.x}`}
              cx={pt.x}
              cy={pt.yTrue}
              r="3.8"
              fill={PAL.counter}
              stroke={PAL.ink}
              strokeWidth="1.2"
            />
          ))}

          {/* Group B pins */}
          {groupB.map((pt) => (
            <circle
              key={`b-${pt.x}`}
              cx={pt.x}
              cy={pt.yTrue}
              r="3.8"
              fill={isPooled ? PAL.signal : PAL.counter}
              stroke={PAL.ink}
              strokeWidth="1.2"
            />
          ))}
        </GlassCube>

        {/* Right: Majority vs Minority Fit Cylinders (squarely on board) */}
        <IsoCylinder
          cx={275}
          y={144}
          rx={15}
          ry={5.5}
          h={46}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={275} y={76} anchor="middle" fill={PAL.counter} size={8.5}>
          MAJ FIT
        </Key>

        <IsoCylinder
          cx={318}
          y={144}
          rx={15}
          ry={5.5}
          h={isPooled ? 16 : 46}
          sideFill={isPooled ? PAL.signal : PAL.counter}
          topFill={isPooled ? PAL.signalLight : PAL.counterLight}
        />
        <Key
          x={318}
          y={76}
          anchor="middle"
          fill={isPooled ? PAL.signal : PAL.counter}
          size={8.5}
        >
          MIN FIT
        </Key>
      </Frame>
      <Segmented
        label="Model specification"
        options={[
          { id: "pooled", label: "Single pooled model" },
          { id: "specific", label: "Group-specific interactions" },
        ]}
        value={fit}
        onChange={setFit}
      />
    </div>
  );
}
/**
 * Slide 7A — Proxy Variables Reconstructing Protected Attributes:
 * Four neutral behavioral tokens on the left (Postal tile, Mobile device,
 * Browser globe, Shopping clock) converge into a 3D optical prism inside a
 * GlassCube, which reconstructs the deleted demographic attribute on the right.
 */
export function IsoProxyReconstruction() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama of proxy reconstruction: on the left, three neutral behavioral proxy cylinders sit on an input table and feed into a glass AI cube, which combines them to reconstruct the protected demographic attribute on the right."
    >
      <IsoBase />

      <Key x={106} y={22} anchor="middle" fill={PAL.ink2} size={9}>
        NEUTRAL PROXY FEATURES
      </Key>

      {/* 3D Input Table holding three neutral proxy feature cylinders */}
      <IsoBlock
        x={52}
        y={148}
        w={96}
        d={28}
        h={16}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      {[74, 104, 134].map((cx) => (
        <IsoCylinder
          key={cx}
          cx={cx}
          y={126}
          rx={10}
          ry={3.8}
          h={22}
          sideFill={PAL.slabLeft}
          topFill={PAL.paper}
        />
      ))}

      {/* Connected conduit from proxy table into GlassCube */}
      <line x1="168" y1="112" x2="184" y2="112" stroke={PAL.ink2} strokeWidth="2.2" />
      <polygon points="190,112 182,108 182,116" fill={PAL.ink2} />

      <Key x={274} y={22} anchor="middle" fill={PAL.signal} size={9}>
        RECONSTRUCTED ATTRIBUTE
      </Key>

      {/* GlassCube combining neutral proxies to reconstruct demographic group */}
      <GlassCube
        x={190}
        y={146}
        w={52}
        d={36}
        h={52}
        outside={
          <g>
            <ellipse cx="255" cy="112" rx="3.8" ry="5.5" fill={PAL.ink} />
            <line x1="255" y1="112" x2="288" y2="112" stroke={PAL.signal} strokeWidth="2.6" />
            <polygon points="294,112 286,108 286,116" fill={PAL.signal} />
          </g>
        }
      >
        {/* Three neutral feature rays converging into a red reconstructed node inside the cube */}
        <line x1="194" y1="102" x2="222" y2="112" stroke={PAL.ink2} strokeWidth="1.8" />
        <line x1="194" y1="112" x2="222" y2="112" stroke={PAL.ink2} strokeWidth="1.8" />
        <line x1="194" y1="122" x2="222" y2="112" stroke={PAL.ink2} strokeWidth="1.8" />
        <circle
          cx="224"
          cy="112"
          r="9"
          fill={PAL.signalLight}
          stroke={PAL.signal}
          strokeWidth="1.6"
        />
        <circle cx="224" cy="112" r="3.5" fill={PAL.signal} />
      </GlassCube>

      {/* Reconstructed Protected Group Figure on red target pad (squarely on board) */}
      <polygon
        points="286,150 304,136 342,136 324,150"
        fill={PAL.signalLight}
        stroke={PAL.signal}
        strokeWidth="1.6"
      />
      <IsoPerson
        x={316}
        y={144}
        scale={0.78}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />
    </Frame>
  );
}
/**
 * Slide 7B — Runaway Feedback Loops in Neighborhood Lending:
 * Interactive 400-unit diorama where stepping through retraining cycles 1..5
 * shows how denying loans to a neighborhood prevents observing its creditworthy
 * repayments, ratcheting the denial wall higher each cycle.
 */
export function IsoFeedbackLoop() {
  const [cycle, setCycle] = useState(3);
  const gateH = 20 + cycle * 7; // 27..55
  const observedStacks = Math.min(6, 2 + cycle);

  return (
    <div>
      <Frame
        width={400}
        height={215}
        label={`Isometric tabletop diorama of a runaway feedback loop in retraining cycle ${cycle}: a credit glass AI cube on the left approves loans to the approved neighborhood and collects ${observedStacks} observed repayment coins to retrain, while blocking the denied neighborhood behind a red barrier wall so its repayment data remain unobserved.`}
      >
        <IsoBase />

        <Key x={200} y={22} anchor="middle" fill={PAL.signal} size={9}>
          {`CYCLE ${cycle} · UNOBSERVED REPAYMENT LOCKS IN BIAS`}
        </Key>

        {/* Overhead return loop from Observed Repayments back into GlassCube */}
        <path
          d="M 204 96 L 204 46 L 80 46 L 80 76"
          fill="none"
          stroke={PAL.counter}
          strokeWidth="2"
          strokeDasharray="5 3"
        />
        <polygon points="80,82 76,74 84,74" fill={PAL.counter} />
        <Key x={152} y={38} anchor="middle" fill={PAL.counter} size={8}>
          OBSERVED REPAYMENTS RETRAIN MODEL
        </Key>

        {/* Credit Scoring GlassCube on the left (squarely on board) */}
        <GlassCube
          x={48}
          y={146}
          w={48}
          d={32}
          h={48}
          outside={
            <g>
              <ellipse cx="108" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
              {/* Upper approval line connected to Approved Neighborhood block */}
              <line x1="108" y1="112" x2="132" y2="112" stroke={PAL.counter} strokeWidth="2.4" />
              {/* Lower denial line routed along the front floor and into the Denial Wall */}
              <path
                d="M 108 118 L 118 118 L 118 152 L 228 152 L 228 134 L 240 134"
                fill="none"
                stroke={PAL.signal}
                strokeWidth="2.4"
              />
            </g>
          }
        >
          {/* Circular cycle wheel inside the cube */}
          <circle cx="80" cy="112" r="11" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
          <path d="M 74 106 A 7 7 0 1 1 72 116" fill="none" stroke={PAL.ink} strokeWidth="1.8" />
        </GlassCube>

        {/* Center: Approved Neighborhood Building + Observed Repayment Coin Stack */}
        <IsoBlock
          x={132}
          y={144}
          w={38}
          d={24}
          h={38}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <IsoCoinStack x={204} y={146} n={observedStacks} />

        {/* Right: Ratcheting Denial Wall + Denied Neighborhood Building (squarely on board) */}
        <IsoBlock
          x={240}
          y={148}
          w={14}
          d={22}
          h={gateH}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />
        <IsoBlock
          x={276}
          y={144}
          w={38}
          d={24}
          h={38}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />

        <Key x={286} y={196} anchor="middle" fill={PAL.signal} size={8.5}>
          REPAYMENT NEVER OBSERVED
        </Key>
      </Frame>
      <Slider
        label="Retraining cycle"
        value={cycle}
        min={1}
        max={5}
        step={1}
        onChange={setCycle}
        formatValue={(v) => `Cycle ${v}`}
      />
    </div>
  );
}
/**
 * Slide 8 — Identifying Sources of Bias in Commercial Pipelines:
 * Four-station 3D Diagnostic Laboratory Bench across the 800-unit board:
 * (1) Historical Bias: large sample cylinder paired with a skewed historical stamp;
 * (2) Representation Bias: full majority cylinder vs empty omitted-segment cylinder;
 * (3) Measurement Bias: true construct cylinder distorted through a proxy lens;
 * (4) Aggregation Bias: GlassCube forcing one flat plane across two distinct slopes.
 */
export function IsoDiagnosticBench() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama with four diagnostic stations for identifying pipeline bias: Station 1 historical bias (skewed past label podium despite large sample cylinder), Station 2 representation bias (undersampled segment cylinder), Station 3 measurement bias (tilted proxy beam distorting true construct), and Station 4 aggregation bias (single pooled line missing distinct group slopes inside a glass cube)."
    >
      <IsoBase w={800} />

      {/* Station 1: Historical Bias */}
      <Key x={128} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
        01 · HISTORICAL LABELS
      </Key>
      {/* Large sample cylinder */}
      <IsoCylinder
        cx={86}
        y={148}
        rx={16}
        ry={6}
        h={44}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      {/* Seamless 2-tier stacked historical label podium */}
      <IsoBlock
        x={116}
        y={148}
        w={48}
        d={22}
        h={16}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <IsoBlock
        x={138}
        y={132}
        w={26}
        d={22}
        h={24}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />

      {/* Station 2: Representation Bias */}
      <Key x={304} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
        02 · REPRESENTATION GAP
      </Key>
      <IsoCylinder
        cx={274}
        y={148}
        rx={18}
        ry={6.5}
        h={50}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <IsoCylinder
        cx={332}
        y={148}
        rx={18}
        ry={6.5}
        h={14}
        sideFill={PAL.signal}
        topFill={PAL.signalLight}
      />
      <line
        x1={292}
        y1={98}
        x2={350}
        y2={98}
        stroke={PAL.signal}
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Station 3: Measurement Bias */}
      <Key x={488} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
        03 · FLAWED PROXY
      </Key>
      {/* True construct cylinder */}
      <IsoCylinder
        cx={442}
        y={148}
        rx={15}
        ry={5.5}
        h={44}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      {/* Fulcrum plinth & tilted proxy beam connecting true construct to distorted proxy cylinder */}
      <IsoBlock
        x={472}
        y={148}
        w={28}
        d={20}
        h={26}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <line x1="493" y1="117" x2="493" y2="96" stroke={PAL.ink} strokeWidth="2.2" />
      <line x1="457" y1="88" x2="519" y2="104" stroke={PAL.signal} strokeWidth="2.4" />
      <circle cx="493" cy="96" r="3.5" fill={PAL.ink} />
      {/* Distorted low proxy reading cylinder */}
      <IsoCylinder
        cx={534}
        y={148}
        rx={15}
        ry={5.5}
        h={18}
        sideFill={PAL.signal}
        topFill={PAL.signalLight}
      />

      {/* Station 4: Aggregation Bias */}
      <Key x={666} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
        04 · POOLED MODEL
      </Key>
      <GlassCube x={614} y={148} w={76} d={38} h={58}>
        {/* Two distinct group slopes + single horizontal red pooled line inside front face */}
        <line x1="626" y1="132" x2="678" y2="98" stroke={PAL.counter} strokeWidth="2.4" />
        <line x1="626" y1="98" x2="678" y2="132" stroke={PAL.ink3} strokeWidth="2" strokeDasharray="3 2" />
        <line x1="624" y1="115" x2="680" y2="115" stroke={PAL.signal} strokeWidth="2.6" />
        <circle cx="634" cy="103" r="3.2" fill={PAL.signal} />
        <circle cx="670" cy="127" r="3.2" fill={PAL.signal} />
      </GlassCube>
    </Frame>
  );
}
/**
 * Slide 9 — Part 2: Group Fairness Criteria (Three Families Triptych):
 * 800-unit diorama showing the three conditioning families of group fairness:
 * (1) Independence P(D = 1 | A): equal output selection cylinders across groups;
 * (2) Separation P(D = 1 | Y, A): conditioning on a raised true-outcome Y = 1 platform;
 * (3) Sufficiency P(Y = 1 | S, A): conditioning on a score pedestal S = s with equal true repayment stacks.
 */
export function IsoThreeFairnessFamilies() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama of the three group fairness families: Independence on the left (equal selection cylinders across groups), Separation in the center (conditioning on a raised true-outcome Y = 1 terrace), and Sufficiency on the right (conditioning on a score pedestal S = s supporting equal repayment coin stacks)."
    >
      <IsoBase w={800} />

      {/* Family 1: Independence P(D = 1 | A) */}
      <Key x={156} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
        1 · INDEPENDENCE P(D = 1 | A)
      </Key>
      <GlassCube
        x={72}
        y={148}
        w={48}
        d={32}
        h={48}
        outside={
          <g>
            <ellipse cx="132" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
            <line x1="132" y1="114" x2="167" y2="114" stroke={PAL.counter} strokeWidth="2.4" />
          </g>
        }
      >
        <circle cx="104" cy="114" r="10" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.5" />
      </GlassCube>
      <IsoCylinder
        cx={182}
        y={148}
        rx={15}
        ry={5.5}
        h={44}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <IsoCylinder
        cx={226}
        y={148}
        rx={15}
        ry={5.5}
        h={44}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      {/* Level parity yoke across both selection cylinders */}
      <line x1="166" y1="96" x2="242" y2="96" stroke={PAL.counter} strokeWidth="2.4" />

      {/* Family 2: Separation P(D = 1 | Y, A) */}
      <Key x={392} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
        2 · SEPARATION P(D = 1 | Y, A)
      </Key>
      {/* Pre-sorted True Outcome Y = 1 raised plinth */}
      <IsoBlock
        x={298}
        y={150}
        w={60}
        d={26}
        h={28}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <text x="328" y="140" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        TRUE Y
      </text>
      <line x1="376" y1="124" x2="400" y2="124" stroke={PAL.signal} strokeWidth="2.2" />
      <polygon points="406,124 398,120 398,128" fill={PAL.signal} />
      <GlassCube x={406} y={148} w={54} d={34} h={50}>
        {/* Twin equal error-rate rings centered inside front face (x=406..460) */}
        <circle cx="424" cy="116" r="7.5" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.5" />
        <circle cx="444" cy="116" r="7.5" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.5" />
      </GlassCube>

      {/* Family 3: Sufficiency P(Y = 1 | S, A) */}
      <Key x={638} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
        3 · SUFFICIENCY P(Y = 1 | S, A)
      </Key>
      <GlassCube
        x={540}
        y={148}
        w={48}
        d={32}
        h={48}
        outside={
          <g>
            <ellipse cx="600" cy="114" rx="3.5" ry="5" fill={PAL.ink} />
            <path
              d="M 600 114 L 614 114 L 614 138 L 626 138"
              fill="none"
              stroke={PAL.ink2}
              strokeWidth="2.2"
            />
            <polygon points="632,138 624,134 624,142" fill={PAL.ink2} />
          </g>
        }
      >
        <circle cx="572" cy="114" r="10" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.5" />
      </GlassCube>
      {/* Score S = s plinth supporting equal true-repayment coin stacks */}
      <IsoBlock
        x={632}
        y={150}
        w={82}
        d={28}
        h={20}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <text x="673" y="144" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        SCORE S = s
      </text>
      <IsoCoinStack x={658} y={124} n={4} />
      <IsoCoinStack x={694} y={124} n={4} />
    </Frame>
  );
}
/**
 * Slide 10 — Confusion Matrices Across Demographic Groups:
 * Interactive 800-unit 3D Confusion Matrix Sorting Vault.
 * A slider moves the score cutoff threshold on S, dynamically resizing the four
 * 3D quadrant cylinders (TP, FN, FP, TN) and updating P(D=1), TPR, FPR, and PPV,
 * while a segmented control highlights what applicants (Y=1 row) vs lenders (D=1 col) care about.
 */
export function IsoConfusionMatrix3D() {
  const [cutoff, setCutoff] = useState(55);
  const [lens, setLens] = useState<"all" | "applicant" | "lender">("all");

  // Realistic monotone response to cutoff (30..80) on 100 applicants (60 Y=1, 40 Y=0)
  const t = (cutoff - 30) / 50; // 0..1
  const tp = Math.round(56 - t * 28); // 56..28 out of 60
  const fn = 60 - tp; // 4..32
  const fp = Math.round(24 - t * 20); // 24..4 out of 40
  const tn = 40 - fp; // 16..36

  const selRate = Math.round(tp + fp); // out of 100
  const tpr = Math.round((tp / 60) * 100);
  const fpr = Math.round((fp / 40) * 100);
  const ppv = Math.round((tp / Math.max(1, tp + fp)) * 100);

  const cells = [
    {
      id: "tp",
      cx: 248,
      y: 146,
      count: tp,
      label: `TP (${tp})`,
      sub: "Y=1, D=1",
      side: PAL.counter,
      top: PAL.counterLight,
      lit: lens === "all" || lens === "applicant" || lens === "lender",
    },
    {
      id: "fn",
      cx: 334,
      y: 146,
      count: fn,
      label: `FN (${fn})`,
      sub: "Y=1, D=0",
      side: PAL.signal,
      top: PAL.signalLight,
      lit: lens === "all" || lens === "applicant",
    },
    {
      id: "fp",
      cx: 420,
      y: 146,
      count: fp,
      label: `FP (${fp})`,
      sub: "Y=0, D=1",
      side: PAL.signal,
      top: PAL.signalLight,
      lit: lens === "all" || lens === "lender",
    },
    {
      id: "tn",
      cx: 506,
      y: 146,
      count: tn,
      label: `TN (${tn})`,
      sub: "Y=0, D=0",
      side: PAL.slabLeft,
      top: PAL.paper,
      lit: lens === "all",
    },
  ];

  const cutterY = r2(132 - (cutoff - 30) * 0.65);

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of a 3D confusion matrix at score cutoff ${cutoff}: a glass AI cube on the left applies the cutoff threshold to sort 100 applicants into four 3D cylindrical cells (TP=${tp}, FN=${fn}, FP=${fp}, TN=${tn}), with a live metric scoreboard on the right showing selection rate ${selRate}%, TPR ${tpr}%, FPR ${fpr}%, and PPV ${ppv}%.`}
      >
        <IsoBase w={800} />

        {/* Left: Score S & Cutoff Threshold GlassCube */}
        <Key x={118} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
          {`SCORE S >= ${cutoff} CUTOFF`}
        </Key>
        <GlassCube
          x={68}
          y={148}
          w={58}
          d={40}
          h={58}
          outside={
            <g>
              <ellipse cx="140" cy="114" rx="4" ry="5.5" fill={PAL.ink} />
              <line x1="140" y1="114" x2="222" y2="114" stroke={PAL.ink2} strokeWidth="2.2" />
              <polygon points="228,114 220,110 220,118" fill={PAL.ink2} />
            </g>
          }
        >
          {/* Vertical score column & movable cutoff gate inside cube */}
          <rect x="92" y="96" width="14" height="42" fill={PAL.counterLight} stroke={PAL.ink} strokeWidth="1.3" />
          <line x1="82" y1={cutterY} x2="116" y2={cutterY} stroke={PAL.signal} strokeWidth="2.6" />
        </GlassCube>

        {/* Center: 4 Confusion Matrix Cylinders */}
        <Key
          x={377}
          y={26}
          anchor="middle"
          fill={lens === "applicant" ? PAL.signal : lens === "lender" ? PAL.counter : PAL.ink2}
          size={9.5}
        >
          {lens === "applicant" && "APPLICANT FOCUS · QUALIFIED (Y = 1) REJECTED?"}
          {lens === "lender" && "LENDER FOCUS · DO APPROVED (D = 1) REPAY?"}
          {lens === "all" && "FOUR CONFUSION MATRIX CELLS FOR GROUP A"}
        </Key>

        {cells.map((c) => {
          const h = Math.max(10, Math.round(c.count * 1.15));
          return (
            <g key={c.id} opacity={c.lit ? 1 : 0.32}>
              <IsoCylinder
                cx={c.cx}
                y={c.y}
                rx={20}
                ry={7}
                h={h}
                sideFill={c.side}
                topFill={c.top}
              />
              <Key x={c.cx} y={58} anchor="middle" fill={PAL.ink} size={9.5}>
                {c.label}
              </Key>
              <Key x={c.cx} y={192} anchor="middle" fill={PAL.ink3} size={8.5}>
                {c.sub}
              </Key>
            </g>
          );
        })}

        {/* Right: 3D Metric Readout Monument (squarely on board) */}
        <Key x={630} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
          GROUP MATRIX RATES
        </Key>
        <IsoBlock
          x={556}
          y={144}
          w={128}
          d={26}
          h={68}
          topFill={PAL.paper}
          leftFill={PAL.paper}
          rightFill={PAL.slabLeft}
        />
        <text x="570" y="94" fontSize="9.5" fontWeight="700" fill={PAL.ink2}>
          {`P(D=1) = ${selRate}%`}
        </text>
        <text
          x="570"
          y="109"
          fontSize="9.5"
          fontWeight="700"
          fill={lens === "applicant" ? PAL.signal : PAL.counter}
        >
          {`TPR P(D=1|Y=1) = ${tpr}%`}
        </text>
        <text x="570" y="124" fontSize="9.5" fontWeight="700" fill={PAL.signal}>
          {`FPR P(D=1|Y=0) = ${fpr}%`}
        </text>
        <text
          x="570"
          y="139"
          fontSize="9.5"
          fontWeight="700"
          fill={lens === "lender" ? PAL.counter : PAL.ink}
        >
          {`PPV P(Y=1|D=1) = ${ppv}%`}
        </text>

        <Key x={754} y={198} anchor="end" fill={PAL.ink3} size={8.5}>
          N = 100
        </Key>
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider
          label="Score cutoff threshold S"
          value={cutoff}
          min={30}
          max={80}
          step={5}
          onChange={setCutoff}
          formatValue={(v) => `S >= ${v}`}
        />
        <Segmented
          label="Stakeholder view"
          options={[
            { id: "all", label: "All 4 cells" },
            { id: "applicant", label: "Applicant (TPR / FN)" },
            { id: "lender", label: "Lender (PPV / FP)" },
          ]}
          value={lens}
          onChange={setLens}
        />
      </div>
    </div>
  );
}
/**
 * Slide 11 — Independence: Demographic Parity (Equal-Quota Balance Yoke):
 * Interactive 800-unit diorama showing a rigid 30% = 30% approval yoke inside
 * and exiting a GlassCube. Toggling between equal and unequal underlying
 * qualification rates shows how enforcing strict demographic parity under
 * unequal base rates requires rejecting qualified candidates in one group or
 * approving unqualified candidates in the other.
 */
export function IsoDemographicParity() {
  const [rates, setRates] = useState<"unequal" | "equal">("unequal");
  const isUnequal = rates === "unequal";

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of demographic parity P(D = 1 | A = a) = P(D = 1 | A = b) = 30%: a central glass AI cube coupled to a rigid equal-quota yoke approves 30% of Group A and 30% of Group B. ${isUnequal ? "When underlying qualification rates differ, enforcing 30% = 30% blocks a qualified Group A applicant while approving a less-qualified Group B candidate." : "When underlying qualification rates are equal, both 30% approved pools consist of qualified candidates."}`}
      >
        <IsoBase w={800} />

        {/* Left: Applicant Pools for Group A & Group B */}
        <Key x={128} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
          {isUnequal ? "UNEQUAL BASE POOLS" : "EQUAL BASE POOLS"}
        </Key>

        {/* Group A Pool */}
        <IsoCylinder
          cx={92}
          y={144}
          rx={20}
          ry={7.5}
          h={52}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={92} y={68} anchor="middle" fill={PAL.counter} size={9}>
          GROUP A
        </Key>

        {/* Group B Pool */}
        <IsoCylinder
          cx={164}
          y={146}
          rx={20}
          ry={7.5}
          h={isUnequal ? 26 : 52}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={164} y={68} anchor="middle" fill={PAL.ink2} size={9}>
          GROUP B
        </Key>

        {/* Connected conduit from pools into GlassCube */}
        <line x1="184" y1="126" x2="236" y2="126" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="242,126 234,122 234,130" fill={PAL.ink2} />

        {/* Center: GlassCube with Rigid 30% = 30% Equal-Quota Yoke */}
        <Key x={288} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
          EQUAL-QUOTA YOKE · 30% = 30%
        </Key>
        <GlassCube
          x={242}
          y={148}
          w={62}
          d={42}
          h={60}
          outside={
            <g>
              <ellipse cx="319" cy="110" rx="4.5" ry="6.5" fill={PAL.ink} />
              <path
                d="M 319 110 L 356 110 L 356 130 L 386 130"
                fill="none"
                stroke={PAL.counter}
                strokeWidth="2.6"
              />
              <polygon points="392,130 384,126 384,134" fill={PAL.counter} />
            </g>
          }
        >
          {/* Rigid T-yoke centered cleanly inside the GlassCube front face */}
          <line x1="256" y1="108" x2="290" y2="108" stroke={PAL.counter} strokeWidth="3.2" />
          <line x1="273" y1="94" x2="273" y2="132" stroke={PAL.ink} strokeWidth="2.4" />
          <circle cx="256" cy="108" r="4.2" fill={PAL.counter} />
          <circle cx="290" cy="108" r="4.2" fill={PAL.counter} />
        </GlassCube>

        {/* Right: Equal 30% Approved Outputs + Trade-off under unequal base rates */}
        <Key
          x={534}
          y={26}
          anchor="middle"
          fill={isUnequal ? PAL.signal : PAL.counter}
          size={9.5}
        >
          {isUnequal
            ? "30% = 30% ENFORCED · QUALIFICATION TRADE-OFF"
            : "P(D = 1 | A) = P(D = 1 | B) = 30% APPROVED"}
        </Key>

        {/* Group A 30% Approved Pedestal */}
        <IsoBlock
          x={392}
          y={148}
          w={74}
          d={26}
          h={34}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <text x="429" y="135" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
          A: 30%
        </text>
        <IsoPerson
          x={434}
          y={106}
          scale={0.66}
          flip
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
        />

        {/* Group B 30% Approved Pedestal */}
        <IsoBlock
          x={504}
          y={148}
          w={74}
          d={26}
          h={34}
          topFill={isUnequal ? PAL.signalLight : PAL.counterLight}
          leftFill={isUnequal ? PAL.signal : PAL.counter}
          rightFill={isUnequal ? PAL.signalMid : PAL.counterMid}
        />
        <text x="541" y="135" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
          B: 30%
        </text>
        <IsoPerson
          x={546}
          y={106}
          scale={0.66}
          flip
          coat={isUnequal ? PAL.signal : PAL.counter}
          coatShade={isUnequal ? PAL.signalMid : PAL.counterMid}
          skin={PAL.skin3}
        />

        {/* When qualification rates differ: show qualified candidate rejected on board */}
        {isUnequal && (
          <g>
            <IsoBlock
              x={614}
              y={148}
              w={14}
              d={24}
              h={44}
              topFill={PAL.signalLight}
              leftFill={PAL.signal}
              rightFill={PAL.signalMid}
            />
            <IsoPerson
              x={664}
              y={144}
              scale={0.72}
              flip
              coat={PAL.signal}
              coatShade={PAL.signalMid}
              skin={PAL.skin2}
            />
            <Key x={534} y={196} anchor="middle" fill={PAL.signal} size={8.5}>
              APPROVES LESS-QUALIFIED IN B OR REJECTS QUALIFIED IN A
            </Key>
          </g>
        )}
      </Frame>
      <Segmented
        label="Underlying qualification rates"
        options={[
          { id: "unequal", label: "Unequal qualification rates (shows limitation)" },
          { id: "equal", label: "Equal qualification rates" },
        ]}
        value={rates}
        onChange={setRates}
      />
    </div>
  );
}
/**
 * Slide 12 — Separation: Equal Opportunity and Equalized Odds:
 * Interactive 800-unit diorama conditioning on true outcome Y (Y = 1 vs Y = 0).
 * Compares unconstrained error rates, Equal Opportunity (equal TPR among Y = 1),
 * and Equalized Odds (both equal TPR among Y = 1 and equal FPR among Y = 0).
 */
export function IsoSeparationBridge() {
  const [regime, setRegime] = useState<"equal-opportunity" | "equalized-odds" | "unconstrained">(
    "equal-opportunity"
  );

  const tprEqual = regime === "equal-opportunity" || regime === "equalized-odds";
  const fprEqual = regime === "equalized-odds";

  const tprA = 82;
  const tprB = tprEqual ? 82 : 54;
  const fprA = 18;
  const fprB = fprEqual ? 18 : 36;

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of separation criteria (${regime}): on the left, applicants are separated onto a true Y = 1 qualified terrace and a Y = 0 terrace before entering a glass AI cube; on the right, paired 3D cylinders compare Group A and Group B true positive rates (${tprA}% vs ${tprB}%) and false positive rates (${fprA}% vs ${fprB}%).`}
      >
        <IsoBase w={800} />

        {/* Left: Conditioning on True Outcome Y = 1 vs Y = 0 */}
        <Key x={152} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
          CONDITION ON TRUE OUTCOME Y
        </Key>

        {/* Left-1: Truly Qualified Y = 1 Terrace */}
        <IsoBlock
          x={64}
          y={146}
          w={76}
          d={24}
          h={28}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <text x="102" y="136" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
          TRUE Y = 1
        </text>
        <IsoPerson
          x={110}
          y={112}
          scale={0.58}
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
        />

        {/* Left-2: True Y = 0 Terrace (clear of Y = 1 right face) */}
        <IsoBlock
          x={162}
          y={146}
          w={68}
          d={24}
          h={20}
          topFill={PAL.paper}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        <text x="196" y="139" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
          TRUE Y = 0
        </text>

        {/* Connected conduit from conditioning terraces into GlassCube */}
        <line x1="247" y1="128" x2="266" y2="128" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="272,128 264,124 264,132" fill={PAL.ink2} />

        {/* Center: GlassCube evaluating P(D = 1 | Y, A) */}
        <GlassCube
          x={272}
          y={146}
          w={56}
          d={38}
          h={56}
          outside={
            <g>
              <ellipse cx="342" cy="112" rx="4" ry="5.5" fill={PAL.ink} />
              <line x1="342" y1="112" x2="404" y2="112" stroke={PAL.ink2} strokeWidth="2.2" />
              <polygon points="410,112 402,108 402,116" fill={PAL.ink2} />
            </g>
          }
        >
          <circle cx="306" cy="102" r="9" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.5" />
          <circle
            cx="306"
            cy="124"
            r="9"
            fill={fprEqual ? PAL.counterLight : PAL.signalLight}
            stroke={fprEqual ? PAL.counter : PAL.signal}
            strokeWidth="1.5"
          />
        </GlassCube>

        {/* Right Station 1: True Positive Rate P(D = 1 | Y = 1) */}
        <Key
          x={458}
          y={26}
          anchor="middle"
          fill={tprEqual ? PAL.counter : PAL.signal}
          size={9.5}
        >
          {`TPR: ${tprA}% VS ${tprB}%`}
        </Key>
        <IsoCylinder
          cx={428}
          y={144}
          rx={18}
          ry={6.5}
          h={Math.round(tprA * 0.72)}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <IsoCylinder
          cx={488}
          y={144}
          rx={18}
          ry={6.5}
          h={Math.round(tprB * 0.72)}
          sideFill={tprEqual ? PAL.counter : PAL.signal}
          topFill={tprEqual ? PAL.counterLight : PAL.signalLight}
        />
        {tprEqual && (
          <line x1="410" y1="77" x2="506" y2="77" stroke={PAL.counter} strokeWidth="2.4" />
        )}
        <Key x={428} y={192} anchor="middle" fill={PAL.counter} size={8.5}>
          GRP A
        </Key>
        <Key x={488} y={192} anchor="middle" fill={tprEqual ? PAL.counter : PAL.signal} size={8.5}>
          GRP B
        </Key>

        {/* Right Station 2: False Positive Rate P(D = 1 | Y = 0) */}
        <Key
          x={626}
          y={26}
          anchor="middle"
          fill={fprEqual ? PAL.counter : PAL.signal}
          size={9.5}
        >
          {`FPR: ${fprA}% VS ${fprB}%`}
        </Key>
        <IsoCylinder
          cx={596}
          y={144}
          rx={18}
          ry={6.5}
          h={Math.round(fprA * 0.9)}
          sideFill={fprEqual ? PAL.counter : PAL.ink2}
          topFill={fprEqual ? PAL.counterLight : PAL.paper}
        />
        <IsoCylinder
          cx={656}
          y={144}
          rx={18}
          ry={6.5}
          h={Math.round(fprB * 0.9)}
          sideFill={fprEqual ? PAL.counter : PAL.signal}
          topFill={fprEqual ? PAL.counterLight : PAL.signalLight}
        />
        {fprEqual && (
          <line x1="578" y1="120" x2="674" y2="120" stroke={PAL.counter} strokeWidth="2.4" />
        )}
        <Key x={596} y={192} anchor="middle" fill={PAL.ink2} size={8.5}>
          GRP A
        </Key>
        <Key x={656} y={192} anchor="middle" fill={fprEqual ? PAL.counter : PAL.signal} size={8.5}>
          GRP B
        </Key>
      </Frame>
      <Segmented
        label="Separation standard"
        options={[
          { id: "equal-opportunity", label: "Equal opportunity (equal TPR)" },
          { id: "equalized-odds", label: "Equalized odds (equal TPR & FPR)" },
          { id: "unconstrained", label: "Unconstrained (TPR & FPR gaps)" },
        ]}
        value={regime}
        onChange={setRegime}
      />
    </div>
  );
}
/**
 * Slide 13 — Sufficiency: Predictive Parity and Calibration:
 * Interactive 800-unit diorama with four 3D Score Bins (S = 0.25, 0.50, 0.75, 0.90)
 * emerging from a GlassCube and divided by a uniform cutoff gate at S >= 0.60.
 * Toggles between calibrated within groups (identical P(Y=1|S=s) at every score bin)
 * and miscalibrated (where a single cutoff judges Group B by a stricter standard).
 */
export function IsoCalibrationTower() {
  const [mode, setMode] = useState<"calibrated" | "miscalibrated">("calibrated");
  const isCal = mode === "calibrated";

  const bins = [
    { x: 208, sLabel: "S = 0.25", hA: 18, hB: isCal ? 18 : 30 },
    { x: 326, sLabel: "S = 0.50", hA: 34, hB: isCal ? 34 : 50 },
    { x: 474, sLabel: "S = 0.75", hA: 50, hB: isCal ? 50 : 62 },
    { x: 592, sLabel: "S = 0.90", hA: 62, hB: isCal ? 62 : 70 },
  ];

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of group calibration across four score bins (S = 0.25, 0.50, 0.75, 0.90) with a uniform cutoff gate at S >= 0.60: ${isCal ? "at every score level s, Group A and Group B cylinders reach identical actual repayment heights P(Y = 1 | S = s)" : "when miscalibrated, Group B has higher true repayment at each score level, so a single cutoff at S >= 0.60 judges Group B by a stricter standard"}.`}
      >
        <IsoBase w={800} />

        <Key
          x={400}
          y={22}
          anchor="middle"
          fill={isCal ? PAL.counter : PAL.signal}
          size={9.5}
        >
          {isCal
            ? "CALIBRATED WITHIN GROUPS · P(Y=1 | S=s, A) = P(Y=1 | S=s, B) AT EVERY SCORE"
            : "MISCALIBRATED · SCORE S=0.50 IN GROUP B REPAYS AT 72% YET FALLS BELOW CUTOFF"}
        </Key>

        {/* Left: Risk Score Generator GlassCube */}
        <GlassCube
          x={68}
          y={148}
          w={56}
          d={38}
          h={56}
          outside={
            <g>
              <ellipse cx="138" cy="112" rx="4" ry="5.5" fill={PAL.ink} />
              <path
                d="M 138 112 L 174 112 L 174 142 L 202 142"
                fill="none"
                stroke={PAL.ink2}
                strokeWidth="2.2"
              />
              <polygon points="208,142 200,138 200,146" fill={PAL.ink2} />
            </g>
          }
        >
          <circle cx="102" cy="112" r="12" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.5" />
          <text x="102" y="116" textAnchor="middle" fontSize="11" fontWeight="700" fill={PAL.ink} stroke="none">
            S
          </text>
        </GlassCube>

        {/* Uniform Cutoff Gate between S=0.50 and S=0.75 */}
        <line
          x1={445}
          y1={46}
          x2={445}
          y2={154}
          stroke={PAL.ink}
          strokeWidth="2.2"
          strokeDasharray="5 3"
        />
        <Key x={445} y={40} anchor="middle" fill={PAL.ink2} size={8.5}>
          SINGLE CUTOFF
        </Key>

        {/* Four Score Bins across the tabletop (squarely on board) */}
        {bins.map((b) => {
          const mismatch = !isCal && b.sLabel === "S = 0.50";
          return (
            <g key={b.sLabel}>
              {/* Score bin base pad */}
              <IsoBlock
                x={b.x}
                y={148}
                w={74}
                d={22}
                h={10}
                topFill={PAL.paper}
                leftFill={PAL.slabLeft}
                rightFill={PAL.slabRight}
              />
              {/* Group A cylinder */}
              <IsoCylinder
                cx={b.x + 22}
                y={136}
                rx={12}
                ry={4.5}
                h={b.hA}
                sideFill={PAL.counter}
                topFill={PAL.counterLight}
              />
              {/* Group B cylinder */}
              <IsoCylinder
                cx={b.x + 54}
                y={136}
                rx={12}
                ry={4.5}
                h={b.hB}
                sideFill={mismatch ? PAL.signal : isCal ? PAL.counter : PAL.signalMid}
                topFill={mismatch ? PAL.signalLight : isCal ? PAL.counterLight : PAL.signalLight}
              />
              {/* Level bar when calibrated */}
              {isCal && (
                <line
                  x1={b.x + 12}
                  y1={r2(136 - b.hA - 6)}
                  x2={b.x + 64}
                  y2={r2(136 - b.hB - 6)}
                  stroke={PAL.counter}
                  strokeWidth="2"
                />
              )}
              <Key
                x={b.x + 38}
                y={192}
                anchor="middle"
                fill={mismatch ? PAL.signal : PAL.ink2}
                size={8.5}
              >
                {b.sLabel}
              </Key>
            </g>
          );
        })}
      </Frame>
      <Segmented
        label="Score calibration state"
        options={[
          { id: "calibrated", label: "Calibrated within groups (equal P(Y=1|S=s))" },
          { id: "miscalibrated", label: "Miscalibrated score (unequal meaning at S=s)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}
/**
 * Slide 14 — Selecting a Group Fairness Criterion:
 * Four domain vignettes across the 800-unit board:
 * (1) Demographic Parity: Elevated awareness billboard arch projecting equal reach;
 * (2) Equal Opportunity: Small-business loan doorway open to qualified borrowers;
 * (3) Equalized Odds: Dual-arm risk scale balancing TPR and FPR;
 * (4) Calibration: GlassCube with a calibrated numeric risk dial under one cutoff.
 */
export function IsoCriterionSelector() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama matching four group fairness criteria to their market contexts: Station 1 equal outreach cylinders on a podium for demographic parity, Station 2 qualified applicant and loan approval pedestal for equal opportunity, Station 3 dual-pan balance scale for equalized odds (TPR and FPR), and Station 4 calibrated score dial inside a glass cube for predictive parity and calibration."
    >
      <IsoBase w={800} />

      {/* 1. Demographic Parity: Equal Outreach Cylinders on Podium */}
      <Key x={124} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
        01 · DEMOGRAPHIC PARITY
      </Key>
      <IsoBlock
        x={74}
        y={148}
        w={86}
        d={24}
        h={16}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoCylinder
        cx={102}
        y={126}
        rx={13}
        ry={4.8}
        h={32}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <IsoCylinder
        cx={142}
        y={126}
        rx={13}
        ry={4.8}
        h={32}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <line x1="88" y1="86" x2="156" y2="86" stroke={PAL.counter} strokeWidth="2.4" />

      {/* 2. Equal Opportunity: Qualified Applicant & Loan Approval Pedestal */}
      <Key x={312} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
        02 · EQUAL OPPORTUNITY
      </Key>
      <IsoPerson
        x={256}
        y={146}
        scale={0.78}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin3}
      />
      <IsoCoinStack x={286} y={148} n={3} />
      <IsoBlock
        x={314}
        y={148}
        w={48}
        d={24}
        h={44}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <line x1="326" y1="120" x2="350" y2="120" stroke={PAL.paper} strokeWidth="2.2" />
      <line x1="326" y1="128" x2="346" y2="128" stroke={PAL.paper} strokeWidth="1.8" />

      {/* 3. Equalized Odds: Grounded Dual-Pan Balance Scale for TPR & FPR */}
      <Key x={506} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
        03 · EQUALIZED ODDS
      </Key>
      <IsoBlock
        x={486}
        y={148}
        w={28}
        d={20}
        h={28}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      {/* Post rising from plinth top face to pivot */}
      <line x1="507" y1="115" x2="507" y2="94" stroke={PAL.ink} strokeWidth="2.4" />
      {/* Balanced twin beam for TPR & FPR with connected suspension rods */}
      <line x1="462" y1="94" x2="552" y2="94" stroke={PAL.ink} strokeWidth="2.6" />
      <circle cx="507" cy="94" r="3.8" fill={PAL.signal} />
      <line x1="462" y1="94" x2="462" y2="112" stroke={PAL.ink} strokeWidth="1.5" />
      <ellipse cx="462" cy="114" rx="13" ry="4.5" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.5" />
      <line x1="552" y1="94" x2="552" y2="112" stroke={PAL.ink} strokeWidth="1.5" />
      <ellipse cx="552" cy="114" rx="13" ry="4.5" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.5" />
      <Key x={462} y={84} anchor="middle" fill={PAL.counter} size={8}>
        TPR
      </Key>
      <Key x={552} y={84} anchor="middle" fill={PAL.signal} size={8}>
        FPR
      </Key>

      {/* 4. Calibration & Predictive Parity: GlassCube with Calibrated Score Dial */}
      <Key x={674} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
        04 · CALIBRATION
      </Key>
      <GlassCube x={628} y={148} w={68} d={42} h={58}>
        {/* Semicircular calibrated risk gauge inside glass cube */}
        <path
          d="M 644 124 A 22 22 0 0 1 688 124"
          fill={PAL.paper}
          stroke={PAL.ink}
          strokeWidth="1.6"
        />
        <line x1="666" y1="124" x2="666" y2="100" stroke={PAL.counter} strokeWidth="2.4" />
        <circle cx="666" cy="124" r="3.5" fill={PAL.ink} />
      </GlassCube>
    </Frame>
  );
}
/**
 * Slide 15 — Part 3: Individual and Counterfactual Fairness:
 * Left side of the 800-unit board: Group Average Illusion, where two members
 * of the same group receive arbitrary opposite outcomes (100% vs 0%) yet average
 * to 50%. Right side: Individual & Causal Evaluation, where a GlassCube applies
 * a direct caliper to the individual consumer's profile and causal path.
 */
export function IsoGroupAverageVsIndividual() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama contrasting group averages with individual fairness: on the left, an overhead averaging bar reads 50% GROUP AVERAGE even though two equally qualified group members receive arbitrary opposite outcomes; on the right, a glass AI cube evaluates the individual consumer directly with a precision caliper."
    >
      <IsoBase w={800} />

      {/* Left scene: Group Average Illusion hiding arbitrary individual treatment */}
      <Key x={198} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
        GROUP AVERAGE = 50% · ARBITRARY INDIVIDUAL TREATMENT
      </Key>

      {/* Overhead group-averaging bracket */}
      <line x1="96" y1="48" x2="292" y2="48" stroke={PAL.ink2} strokeWidth="2.2" />
      <line x1="96" y1="48" x2="96" y2="56" stroke={PAL.ink2} strokeWidth="2" />
      <line x1="292" y1="48" x2="292" y2="56" stroke={PAL.ink2} strokeWidth="2" />

      {/* Arbitrary Winner on tall pedestal */}
      <IsoBlock
        x={76}
        y={150}
        w={52}
        d={26}
        h={36}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoPerson
        x={106}
        y={106}
        scale={0.56}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin3}
      />

      {/* Arbitrary Loser from the same group blocked at floor level */}
      <IsoBlock
        x={216}
        y={150}
        w={16}
        d={28}
        h={44}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <IsoPerson
        x={276}
        y={148}
        scale={0.78}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />

      {/* Tabletop divider */}
      <line
        x1={356}
        y1={156}
        x2={436}
        y2={104}
        stroke={PAL.ink3}
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />

      {/* Right scene: Individual and Causal Evaluation */}
      <Key x={588} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
        INDIVIDUAL &amp; CAUSAL EVALUATION
      </Key>

      <GlassCube
        x={456}
        y={146}
        w={58}
        d={40}
        h={58}
        outside={
          <g>
            <ellipse cx="528" cy="112" rx="4" ry="5.5" fill={PAL.ink} />
            <path
              d="M 528 112 L 546 112 L 546 134 L 560 134"
              fill="none"
              stroke={PAL.counter}
              strokeWidth="2.4"
            />
            <polygon points="566,134 558,130 558,138" fill={PAL.counter} />
          </g>
        }
      >
        <circle cx="492" cy="110" r="12" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="492" cy="110" r="4" fill={PAL.counter} />
      </GlassCube>

      {/* Two similar individuals receiving matched verdigris pedestals (non-overlapping, squarely on board) */}
      <IsoBlock
        x={566}
        y={146}
        w={36}
        d={22}
        h={24}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoPerson
        x={588}
        y={114}
        scale={0.62}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin2}
      />

      <IsoBlock
        x={628}
        y={146}
        w={36}
        d={22}
        h={24}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoPerson
        x={650}
        y={114}
        scale={0.62}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin3}
      />

      {/* Level individual-similarity caliper bar above the two matched individuals */}
      <line x1="588" y1="48" x2="650" y2="48" stroke={PAL.counter} strokeWidth="2.2" />
      <line x1="588" y1="48" x2="588" y2="55" stroke={PAL.counter} strokeWidth="2" />
      <line x1="650" y1="48" x2="650" y2="55" stroke={PAL.counter} strokeWidth="2" />
    </Frame>
  );
}
/**
 * Slide 16 — Individual Fairness: Treating Similar People Similarly:
 * Interactive 800-unit diorama with a 3D task-similarity caliper on the left,
 * a pantograph linkage inside a central GlassCube, and two output probability
 * cylinders on the right. Toggles between individual fairness (bounded output
 * distance) and tokenism (arbitrary selection of group members).
 */
export function IsoIndividualSimilarity() {
  const [mode, setMode] = useState<"fair" | "tokenism">("fair");
  const isFair = mode === "fair";

  const out1 = isFair ? 52 : 16;
  const out2 = isFair ? 50 : 58;

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of individual fairness (${mode}): on the left, two task-similar individuals stand with identical qualification stacks separated by a small task-distance ruler d(x1, x2); a central glass AI cube with a pantograph linkage maps them to output probability cylinders on the right (${isFair ? "closely matched heights satisfying the Lipschitz bound" : "widely divergent heights illustrating tokenism"}).`}
      >
        <IsoBase w={800} />

        {/* Left: Task-similar individuals x1 and x2 with small task distance d(x1, x2) */}
        <Key x={142} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
          SIMILAR PROFILES d(x1, x2)
        </Key>

        <IsoPerson
          x={92}
          y={146}
          scale={0.82}
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
        />
        <IsoCoinStack x={122} y={148} n={4} />

        <IsoPerson
          x={182}
          y={146}
          scale={0.82}
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin3}
        />
        <IsoCoinStack x={212} y={148} n={4} />

        {/* Overhead caliper ruler between x1 and x2 */}
        <line x1="92" y1="52" x2="182" y2="52" stroke={PAL.counter} strokeWidth="2.2" />
        <line x1="92" y1="52" x2="92" y2="59" stroke={PAL.counter} strokeWidth="2" />
        <line x1="182" y1="52" x2="182" y2="59" stroke={PAL.counter} strokeWidth="2" />
        <Key x={148} y={194} anchor="middle" fill={PAL.counter} size={8.5}>
          SMALL TASK DISTANCE d(x1, x2)
        </Key>

        {/* Connected conduit from profiles into GlassCube */}
        <line x1="232" y1="124" x2="294" y2="124" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="300,124 292,120 292,128" fill={PAL.ink2} />

        {/* Center: GlassCube with 3D Pantograph / Distance Constraint */}
        <Key x={352} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
          SIMILARITY METRIC &amp; BOUND
        </Key>
        <GlassCube
          x={300}
          y={148}
          w={64}
          d={44}
          h={62}
          outside={
            <g>
              <ellipse cx="380" cy="112" rx="4.5" ry="6.5" fill={PAL.ink} />
              <line
                x1="380"
                y1="112"
                x2="500"
                y2="112"
                stroke={isFair ? PAL.counter : PAL.signal}
                strokeWidth="2.4"
              />
              <polygon
                points="506,112 498,108 498,116"
                fill={isFair ? PAL.counter : PAL.signal}
              />
            </g>
          }
        >
          {/* Scissor pantograph diamond centered inside the GlassCube front face */}
          <polygon
            points="314,114 332,98 350,114 332,130"
            fill="none"
            stroke={isFair ? PAL.counter : PAL.signal}
            strokeWidth="2"
          />
          <circle cx="314" cy="114" r="3" fill={PAL.ink} />
          <circle cx="350" cy="114" r="3" fill={PAL.ink} />
        </GlassCube>

        {/* Right: Output Probability Cylinders f(x1) and f(x2) */}
        <Key
          x={582}
          y={26}
          anchor="middle"
          fill={isFair ? PAL.counter : PAL.signal}
          size={9.5}
        >
          {isFair
            ? "SMALL OUTPUT DISTANCE |f(x1) - f(x2)|"
            : "TOKENISM · ARBITRARY SELECTION GAP"}
        </Key>

        <IsoCylinder
          cx={528}
          y={146}
          rx={22}
          ry={7.5}
          h={out1}
          sideFill={isFair ? PAL.counter : PAL.signal}
          topFill={isFair ? PAL.counterLight : PAL.signalLight}
        />
        <Key x={528} y={56} anchor="middle" fill={isFair ? PAL.counter : PAL.signal} size={9}>
          {isFair ? "f(x1) = 78%" : "f(x1) = 22%"}
        </Key>

        <IsoCylinder
          cx={636}
          y={146}
          rx={22}
          ry={7.5}
          h={out2}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={636} y={56} anchor="middle" fill={PAL.counter} size={9}>
          {isFair ? "f(x2) = 76%" : "f(x2) = 80%"}
        </Key>

        {/* Output difference caliper bar */}
        <line
          x1={528}
          y1={r2(146 - out1 - 10)}
          x2={636}
          y2={r2(146 - out2 - 10)}
          stroke={isFair ? PAL.counter : PAL.signal}
          strokeWidth="2.4"
          strokeDasharray={isFair ? undefined : "4 3"}
        />

        <Key x={582} y={194} anchor="middle" fill={isFair ? PAL.counter : PAL.signal} size={8.5}>
          {isFair
            ? "SIMILAR PEOPLE TREATED SIMILARLY"
            : "VIOLATES INDIVIDUAL FAIRNESS"}
        </Key>
      </Frame>
      <Segmented
        label="Individual evaluation"
        options={[
          { id: "fair", label: "Individually fair (bounded distance)" },
          { id: "tokenism", label: "Tokenism (arbitrary selection)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}
/**
 * Slide 17 — Counterfactual Fairness and Causal Pathways:
 * Interactive 800-unit 3D Causal Graph Relay Board:
 * Protected Attribute (A / A') -> Neighborhood School Mediator (M) -> Test Score (X) -> GlassCube -> Prediction (D).
 * Compares Unadjusted, Fairness Through Unawareness (cuts direct A link but leaves M -> X mediator active),
 * and Counterfactual Fairness (adjusts for downstream effect of A on mediator M so A and A' yield identical predictions).
 */
export function IsoCausalPathwayTable() {
  const [regime, setRegime] = useState<"unawareness" | "counterfactual" | "unadjusted">(
    "counterfactual"
  );

  const isCF = regime === "counterfactual";
  const isUnaware = regime === "unawareness";

  const predActual = 48;
  const predCounter = isCF ? 48 : isUnaware ? 26 : 18;

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of a 3D causal graph for counterfactual fairness (${regime}): from left to right stand the protected attribute pedestal A, the neighborhood school mediator building M, the test score cylinder X, the glass AI cube, and paired actual vs counterfactual outcome cylinders on the right. ${isCF ? "Adjusting for the mediator pathway equalizes the prediction across actual A and counterfactual A'." : "Because the mediating pathway through school quality and test scores remains unadjusted, changing A to counterfactual A' alters the prediction."}`}
      >
        <IsoBase w={800} />

        <Key
          x={400}
          y={22}
          anchor="middle"
          fill={isCF ? PAL.counter : PAL.signal}
          size={9.5}
        >
          {regime === "counterfactual" &&
            "COUNTERFACTUAL FAIRNESS · MEDIATOR PATH ADJUSTED -> IDENTICAL PREDICTION UNDER A & A'"}
          {regime === "unawareness" &&
            "FAIRNESS THROUGH UNAWARENESS · DROPS COLUMN A, BUT MEDIATOR PATH A -> SCHOOL -> SCORE PERSISTS"}
          {regime === "unadjusted" &&
            "UNADJUSTED MODEL · BOTH DIRECT AND MEDIATED PATHWAYS TRANSMIT PROTECTED ATTRIBUTE A"}
        </Key>

        {/* Node 1: Protected Attribute A / A' Pedestal */}
        <Key x={92} y={42} anchor="middle" fill={PAL.ink2} size={8.5}>
          ATTRIBUTE A / A&apos;
        </Key>
        <IsoBlock
          x={64}
          y={146}
          w={46}
          d={26}
          h={38}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />
        <text x="87" y="131" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
          A / A&apos;
        </text>

        {/* Direct path A -> GlassCube (overhead arch, cut under unawareness & counterfactual) */}
        <path
          d="M 96 94 L 96 58 L 504 58 L 504 76"
          fill="none"
          stroke={regime === "unadjusted" ? PAL.signal : PAL.ink3}
          strokeWidth="1.8"
          strokeDasharray={regime === "unadjusted" ? undefined : "3 4"}
          opacity={regime === "unadjusted" ? 1 : 0.45}
        />
        {regime !== "unadjusted" && (
          <g stroke={PAL.signal} strokeWidth="2.2">
            <line x1="294" y1="52" x2="306" y2="64" />
            <line x1="306" y1="52" x2="294" y2="64" />
          </g>
        )}

        {/* Causal arrow A -> School Mediator M (connected end-to-end) */}
        <line x1="129" y1="124" x2="186" y2="124" stroke={PAL.signal} strokeWidth="2.4" />
        <polygon points="192,124 184,120 184,128" fill={PAL.signal} />

        {/* Node 2: Mediating Variable (Neighborhood School Quality M) */}
        <Key x={228} y={42} anchor="middle" fill={isCF ? PAL.counter : PAL.signal} size={8.5}>
          SCHOOL MEDIATOR M
        </Key>
        <IsoBlock
          x={192}
          y={146}
          w={54}
          d={26}
          h={42}
          topFill={isCF ? PAL.counterLight : PAL.signalLight}
          leftFill={isCF ? PAL.counter : PAL.signal}
          rightFill={isCF ? PAL.counterMid : PAL.signalMid}
        />
        <text x="219" y="129" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.paper}>
          SCHOOL M
        </text>

        {/* Causal arrow School M -> Test Score X (connected end-to-end) */}
        <line
          x1="265"
          y1="124"
          x2="334"
          y2="124"
          stroke={isCF ? PAL.counter : PAL.signal}
          strokeWidth="2.4"
        />
        <polygon
          points="340,124 332,120 332,128"
          fill={isCF ? PAL.counter : PAL.signal}
        />

        {/* Node 3: Downstream Feature (Test Score X) */}
        <Key x={358} y={42} anchor="middle" fill={isCF ? PAL.counter : PAL.signal} size={8.5}>
          {isCF ? "ADJUSTED SCORE X" : "BIASED SCORE X"}
        </Key>
        <IsoCylinder
          cx={358}
          y={146}
          rx={18}
          ry={6.5}
          h={isCF ? 42 : 26}
          sideFill={isCF ? PAL.counter : PAL.signal}
          topFill={isCF ? PAL.counterLight : PAL.signalLight}
        />

        {/* Arrow Test Score X -> GlassCube (connected end-to-end) */}
        <line
          x1="376"
          y1="128"
          x2="456"
          y2="128"
          stroke={isCF ? PAL.counter : PAL.signal}
          strokeWidth="2.4"
        />
        <polygon
          points="462,128 454,124 454,132"
          fill={isCF ? PAL.counter : PAL.signal}
        />

        {/* Node 4: Decision Model GlassCube */}
        <GlassCube
          x={462}
          y={146}
          w={56}
          d={38}
          h={56}
          outside={
            <g>
              <ellipse cx="532" cy="114" rx="4" ry="5.5" fill={PAL.ink} />
              <line
                x1="532"
                y1="114"
                x2="584"
                y2="114"
                stroke={isCF ? PAL.counter : PAL.signal}
                strokeWidth="2.4"
              />
              <polygon
                points="590,114 582,110 582,118"
                fill={isCF ? PAL.counter : PAL.signal}
              />
            </g>
          }
        >
          <circle
            cx="496"
            cy="112"
            r="12"
            fill={isCF ? PAL.counterLight : PAL.signalLight}
            stroke={isCF ? PAL.counter : PAL.signal}
            strokeWidth="1.6"
          />
          <circle cx="496" cy="112" r="4" fill={isCF ? PAL.counter : PAL.signal} />
        </GlassCube>

        {/* Node 5: Actual World A vs Counterfactual World A' Predictions (squarely on board) */}
        <Key
          x={636}
          y={42}
          anchor="middle"
          fill={isCF ? PAL.counter : PAL.signal}
          size={8.5}
        >
          ACTUAL A VS COUNTERFACTUAL A&apos;
        </Key>
        <IsoCylinder
          cx={608}
          y={144}
          rx={18}
          ry={6.5}
          h={predActual}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <IsoCylinder
          cx={664}
          y={144}
          rx={18}
          ry={6.5}
          h={predCounter}
          sideFill={isCF ? PAL.counter : PAL.signal}
          topFill={isCF ? PAL.counterLight : PAL.signalLight}
        />
        {isCF && (
          <line x1="590" y1="88" x2="682" y2="88" stroke={PAL.counter} strokeWidth="2.4" />
        )}
        <Key x={608} y={194} anchor="middle" fill={PAL.counter} size={8.5}>
          WORLD A
        </Key>
        <Key x={664} y={194} anchor="middle" fill={isCF ? PAL.counter : PAL.signal} size={8.5}>
          WORLD A&apos;
        </Key>
      </Frame>
      <Segmented
        label="Causal model regime"
        options={[
          { id: "counterfactual", label: "Counterfactual fairness (mediator adjusted)" },
          { id: "unawareness", label: "Fairness through unawareness (column dropped)" },
          { id: "unadjusted", label: "Unadjusted model" },
        ]}
        value={regime}
        onChange={setRegime}
      />
    </div>
  );
}
/**
 * Slide 18 — Part 4: The Fairness Impossibility Theorem and Managerial Trade-Offs:
 * 800-unit 3D Three-Way Tension Triad where a central GlassCube is linked by
 * rigid tie-rods to Independence, Separation, and Sufficiency anchor monuments;
 * locking any two criteria forces a red structural fracture on the third.
 */
export function IsoIncompatibleTriad() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama of the three-way fairness tension: a central glass AI cube connects via rigid mechanical tie-rods to three monuments on the board—Independence on the left, Separation in the back-right, and Sufficiency in the front-right—showing that locking two criteria in verdigris forces a red gap on the third."
    >
      <IsoBase w={800} />

      <Key x={400} y={24} anchor="middle" fill={PAL.signal} size={9.5}>
        MUTUAL INCOMPATIBILITY · CANNOT LOCK ALL THREE CRITERIA SIMULTANEOUSLY
      </Key>

      {/* Monument 1 (Left): Independence */}
      <Key x={136} y={46} anchor="middle" fill={PAL.counter} size={9}>
        1 · INDEPENDENCE
      </Key>
      <IsoCylinder
        cx={136}
        y={148}
        rx={24}
        ry={8.5}
        h={54}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <line x1="160" y1="114" x2="340" y2="114" stroke={PAL.counter} strokeWidth="3" />

      {/* Central GlassCube with 3-spoke tension hub */}
      <GlassCube
        x={340}
        y={148}
        w={64}
        d={44}
        h={62}
        outside={
          <g>
            <ellipse cx="420" cy="108" rx="4.5" ry="6.5" fill={PAL.ink} />
            {/* Locked green tie-rod connected to Separation monument */}
            <line x1="420" y1="104" x2="506" y2="104" stroke={PAL.counter} strokeWidth="3" />
            {/* Fractured red tie-rod routed past cube right face before stepping down to Sufficiency */}
            <path
              d="M 420 112 L 448 112 L 448 140 L 580 140"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="3"
            />
            <line x1="600" y1="140" x2="632" y2="140" stroke={PAL.signal} strokeWidth="3" />
            {/* Red break gap callout */}
            <line x1="580" y1="132" x2="580" y2="148" stroke={PAL.signal} strokeWidth="2.2" />
            <line x1="600" y1="132" x2="600" y2="148" stroke={PAL.signal} strokeWidth="2.2" />
          </g>
        }
      >
        {/* 3-spoke triangular linkage centered inside cube front face */}
        <polygon
          points="354,120 372,96 390,120"
          fill={PAL.signalLight}
          stroke={PAL.ink}
          strokeWidth="1.6"
        />
        <circle cx="372" cy="112" r="4" fill={PAL.signal} />
      </GlassCube>

      {/* Monument 2 (Back-Right): Separation */}
      <Key x={528} y={46} anchor="middle" fill={PAL.counter} size={9}>
        2 · SEPARATION
      </Key>
      <IsoCylinder
        cx={528}
        y={128}
        rx={22}
        ry={7.5}
        h={50}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />

      {/* Monument 3 (Front-Right): Sufficiency (pulled out of alignment) */}
      <Key x={654} y={46} anchor="middle" fill={PAL.signal} size={9}>
        3 · SUFFICIENCY (BROKEN)
      </Key>
      <IsoCylinder
        cx={654}
        y={148}
        rx={22}
        ry={7.5}
        h={52}
        sideFill={PAL.signal}
        topFill={PAL.signalLight}
      />
    </Frame>
  );
}
/**
 * Slide 19 — The Fairness Impossibility Theorem (Chouldechova / Kleinberg et al.):
 * Interactive 800-unit quantitative instrument where students vary Group B's
 * base rate P(Y = 1 | B) from 20% to 50% (against Group A's 50%) and switch
 * between Calibrated (Sufficiency), Equalized Odds (Separation), and Perfect
 * Predictor regimes, watching the exact Chouldechova identity force disparities
 * unless base rates are equal or errors are zero.
 */
export function IsoImpossibilityInstrument() {
  const [baseB, setBaseB] = useState(25);
  const [regime, setRegime] = useState<"calibrated" | "equalized-odds" | "perfect">("calibrated");

  const pA = 0.5;
  const pB = baseB / 100;
  const equalBase = baseB === 50;

  let tprA = 80;
  let fprA = 20;
  let tprB = 80;
  let fprB = 20;

  if (regime === "perfect") {
    tprA = 100;
    fprA = 0;
    tprB = 100;
    fprB = 0;
  } else if (regime === "calibrated") {
    // Enforce PPV_A = PPV_B = 80%. By Chouldechova's identity:
    // FPR_B / TPR_B = (pB / (1 - pB)) * ((1 - PPV) / PPV)
    const ratioB = (pB / (1 - pB)) * (0.2 / 0.8);
    tprB = Math.round(52 + ((baseB - 20) / 30) * 28); // 52% at pB=0.20 -> 80% at pB=0.50
    fprB = Math.max(2, Math.round(tprB * ratioB));
  } else {
    // Equalized odds: TPR_A = TPR_B = 80%, FPR_A = FPR_B = 20%
    tprB = 80;
    fprB = 20;
  }

  const selA = Math.round(pA * tprA + (1 - pA) * fprA);
  const selB = Math.round(pB * tprB + (1 - pB) * fprB);

  const ppvA = Math.round(((pA * tprA) / Math.max(0.01, pA * tprA + (1 - pA) * fprA)) * 100);
  const ppvB =
    regime === "calibrated" || regime === "perfect"
      ? ppvA
      : Math.round(((pB * tprB) / Math.max(0.01, pB * tprB + (1 - pB) * fprB)) * 100);

  const indEqual = Math.abs(selA - selB) <= 1;
  const sepEqual = Math.abs(tprA - tprB) <= 1 && Math.abs(fprA - fprB) <= 1;
  const sufEqual = Math.abs(ppvA - ppvB) <= 1;

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Interactive 3D tabletop instrument of the fairness impossibility theorem with Group A base rate 50% and Group B base rate ${baseB}% under the ${regime} regime: displays selection rates (${selA}% vs ${selB}%), true positive rates (${tprA}% vs ${tprB}%), and positive predictive values (${ppvA}% vs ${ppvB}%).`}
      >
        <IsoBase w={800} />

        <Key
          x={400}
          y={22}
          anchor="middle"
          fill={indEqual && sepEqual && sufEqual ? PAL.counter : PAL.signal}
          size={9.5}
        >
          {equalBase
            ? "DEGENERATE CASE · IDENTICAL BASE RATES (50% = 50%) ALLOW ALL THREE CRITERIA"
            : regime === "perfect"
              ? "DEGENERATE CASE · PERFECT PREDICTOR (ZERO ERRORS) SATISFIES SEPARATION & SUFFICIENCY"
              : regime === "calibrated"
                ? `CALIBRATED (PPV ${ppvA}% = ${ppvB}%) UNDER UNEQUAL BASE RATES -> VIOLATES EQUALIZED ODDS (TPR ${tprA}% VS ${tprB}%)`
                : `EQUALIZED ODDS (TPR ${tprA}% = ${tprB}%) UNDER UNEQUAL BASE RATES -> VIOLATES PREDICTIVE PARITY (PPV ${ppvA}% VS ${ppvB}%)`}
        </Key>

        {/* Left: Base Rate Reservoirs P(Y = 1) */}
        <Key x={124} y={44} anchor="middle" fill={PAL.ink2} size={9}>
          BASE RATES P(Y = 1)
        </Key>
        <IsoCylinder
          cx={92}
          y={146}
          rx={18}
          ry={6.5}
          h={50}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={92} y={192} anchor="middle" fill={PAL.counter} size={8.5}>
          A: 50%
        </Key>
        <IsoCylinder
          cx={156}
          y={146}
          rx={18}
          ry={6.5}
          h={baseB}
          sideFill={equalBase ? PAL.counter : PAL.ink2}
          topFill={equalBase ? PAL.counterLight : PAL.paper}
        />
        <Key x={156} y={192} anchor="middle" fill={PAL.ink2} size={8.5}>
          {`B: ${baseB}%`}
        </Key>

        {/* Connected conduit from base rate reservoirs into GlassCube */}
        <line x1="174" y1="132" x2="202" y2="132" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="208,132 200,128 200,136" fill={PAL.ink2} />

        {/* Center-Left: Predictor GlassCube */}
        <GlassCube
          x={208}
          y={146}
          w={54}
          d={36}
          h={54}
          outside={
            <g>
              <ellipse cx="275" cy="114" rx="3.8" ry="5.5" fill={PAL.ink} />
              <path
                d="M 275 114 L 302 114 L 302 132 L 323 132"
                fill="none"
                stroke={PAL.ink2}
                strokeWidth="2.2"
              />
              <polygon points="329,132 321,128 321,136" fill={PAL.ink2} />
            </g>
          }
        >
          <circle cx="242" cy="112" r="11" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
          <circle cx="242" cy="112" r="3.5" fill={PAL.ink} />
        </GlassCube>

        {/* Criterion 1: Independence P(D = 1) */}
        <Key
          x={365}
          y={44}
          anchor="middle"
          fill={indEqual ? PAL.counter : PAL.signal}
          size={8.5}
        >
          {`1 · P(D=1): ${selA}% VS ${selB}%`}
        </Key>
        <IsoCylinder
          cx={344}
          y={144}
          rx={15}
          ry={5.5}
          h={Math.round(selA * 0.65)}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <IsoCylinder
          cx={386}
          y={144}
          rx={15}
          ry={5.5}
          h={Math.round(selB * 0.65)}
          sideFill={indEqual ? PAL.counter : PAL.signal}
          topFill={indEqual ? PAL.counterLight : PAL.signalLight}
        />

        {/* Criterion 2: Separation (TPR) */}
        <Key
          x={505}
          y={44}
          anchor="middle"
          fill={sepEqual ? PAL.counter : PAL.signal}
          size={8.5}
        >
          {`2 · TPR: ${tprA}% VS ${tprB}%`}
        </Key>
        <IsoCylinder
          cx={484}
          y={144}
          rx={15}
          ry={5.5}
          h={Math.round(tprA * 0.65)}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <IsoCylinder
          cx={526}
          y={144}
          rx={15}
          ry={5.5}
          h={Math.round(tprB * 0.65)}
          sideFill={sepEqual ? PAL.counter : PAL.signal}
          topFill={sepEqual ? PAL.counterLight : PAL.signalLight}
        />

        {/* Criterion 3: Sufficiency (PPV) (squarely on board) */}
        <Key
          x={645}
          y={44}
          anchor="middle"
          fill={sufEqual ? PAL.counter : PAL.signal}
          size={8.5}
        >
          {`3 · PPV: ${ppvA}% VS ${ppvB}%`}
        </Key>
        <IsoCylinder
          cx={624}
          y={144}
          rx={15}
          ry={5.5}
          h={Math.round(ppvA * 0.65)}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <IsoCylinder
          cx={666}
          y={144}
          rx={15}
          ry={5.5}
          h={Math.round(ppvB * 0.65)}
          sideFill={sufEqual ? PAL.counter : PAL.signal}
          topFill={sufEqual ? PAL.counterLight : PAL.signalLight}
        />

        <Key x={754} y={198} anchor="end" fill={PAL.ink3} size={8.5}>
          CHOULDECHOVA IDENTITY
        </Key>
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider
          label="Group B base rate P(Y = 1 | B)"
          value={baseB}
          min={20}
          max={50}
          step={5}
          onChange={setBaseB}
          formatValue={(v) => `${v}% (vs A: 50%)`}
        />
        <Segmented
          label="Enforced criterion"
          options={[
            { id: "calibrated", label: "Calibrated (PPV equal)" },
            { id: "equalized-odds", label: "Equalized odds (TPR/FPR equal)" },
            { id: "perfect", label: "Perfect predictor (0 error)" },
          ]}
          value={regime}
          onChange={setRegime}
        />
      </div>
    </div>
  );
}
/**
 * Slide 20 — Managerial Trade-Offs in Credit, Hiring, and Ad Delivery:
 * Interactive 800-unit diorama with three sector stations across the board:
 * (1) Consumer Credit (Score 700 calibrated vault + false rejection barrier),
 * (2) Resume Screening (3D top-of-funnel hopper opening interview gates),
 * and (3) Medical Triage & Fraud (clinical cross + equalized-odds balance).
 */
export function IsoDomainTradeoffs() {
  const [domain, setDomain] = useState<"all" | "credit" | "hiring" | "triage">("all");
  const lit = (d: "credit" | "hiring" | "triage") => domain === "all" || domain === d;

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label="Isometric tabletop diorama of managerial fairness trade-offs across three domains: Consumer Credit on the left (calibrated Score 700 dial paired with a false-rejection barrier for creditworthy borrowers), Automated Resume Screening in the center (3D top-of-funnel intake opening interview gates under equal opportunity), and Medical Triage & Fraud on the right (equalized odds balancing missed diagnoses and false investigations)."
      >
        <IsoBase w={800} />

        {/* Domain 1: Consumer Credit (Calibration 700 vs False Rejection) */}
        <g opacity={lit("credit") ? 1 : 0.35}>
          <Key x={156} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
            01 · CREDIT · SCORE 700 CALIBRATED
          </Key>
          <IsoBlock
            x={72}
            y={148}
            w={62}
            d={28}
            h={46}
            topFill={PAL.paper}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <text x="103" y="120" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
            SCORE
          </text>
          <text x="103" y="135" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={PAL.counter}>
            700
          </text>
          {/* False rejection barrier blocking creditworthy borrower */}
          <IsoBlock
            x={160}
            y={148}
            w={14}
            d={24}
            h={44}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <IsoCoinStack x={198} y={148} n={3} />
          <IsoPerson
            x={236}
            y={146}
            scale={0.76}
            flip
            coat={PAL.signal}
            coatShade={PAL.signalMid}
            skin={PAL.skin3}
          />
        </g>

        {/* Domain 2: Automated Resume Screening (Top of Funnel Equal Opportunity) */}
        <g opacity={lit("hiring") ? 1 : 0.35}>
          <Key x={396} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
            02 · HIRING · TOP-OF-FUNNEL PARITY
          </Key>
          <GlassCube
            x={320}
            y={148}
            w={62}
            d={40}
            h={60}
            outside={
              <g>
                <ellipse cx="396" cy="112" rx="4" ry="5.5" fill={PAL.ink} />
                <line x1="396" y1="112" x2="424" y2="112" stroke={PAL.counter} strokeWidth="2.4" />
                <polygon points="430,112 422,108 422,116" fill={PAL.counter} />
              </g>
            }
          >
            {/* 3D Screening Funnel inside the GlassCube */}
            <polygon
              points="332,98 372,98 358,122 346,122"
              fill={PAL.counterLight}
              stroke={PAL.counter}
              strokeWidth="1.6"
            />
            <rect
              x="347"
              y="122"
              width="10"
              height="14"
              fill={PAL.counter}
              stroke={PAL.ink}
              strokeWidth="1.2"
            />
          </GlassCube>
          <IsoPerson
            x={462}
            y={146}
            scale={0.78}
            flip
            coat={PAL.counter}
            coatShade={PAL.counterMid}
            skin={PAL.skin2}
          />
        </g>

        {/* Domain 3: Medical Triage & Fraud Intervention (Equalized Odds) */}
        <g opacity={lit("triage") ? 1 : 0.35}>
          <Key x={618} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
            03 · TRIAGE &amp; FRAUD · EQUALIZED ODDS
          </Key>
          {/* Clinical/Triage Plinth with Cross */}
          <IsoBlock
            x={538}
            y={146}
            w={46}
            d={26}
            h={44}
            topFill={PAL.paper}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <path
            d="M 557 112 H 565 V 118 H 571 V 126 H 565 V 132 H 557 V 126 H 551 V 118 H 557 Z"
            fill={PAL.counter}
          />
          {/* Equalized TPR & FPR cylinders (squarely on board) */}
          <IsoCylinder
            cx={624}
            y={144}
            rx={15}
            ry={5.5}
            h={38}
            sideFill={PAL.counter}
            topFill={PAL.counterLight}
          />
          <IsoCylinder
            cx={664}
            y={144}
            rx={15}
            ry={5.5}
            h={38}
            sideFill={PAL.counter}
            topFill={PAL.counterLight}
          />
          <line x1="608" y1="98" x2="680" y2="98" stroke={PAL.counter} strokeWidth="2.2" />
        </g>
      </Frame>
      <Segmented
        label="Market domain"
        options={[
          { id: "all", label: "All 3 domains" },
          { id: "credit", label: "Consumer credit (Calibration)" },
          { id: "hiring", label: "Resume screening (Equal opportunity)" },
          { id: "triage", label: "Triage & fraud (Equalized odds)" },
        ]}
        value={domain}
        onChange={setDomain}
      />
    </div>
  );
}
/**
 * Slide 21 — Discussion: The Credit Scoring Trade-Off:
 * 400-unit diorama showing a calibrated bank GlassCube on the left and two
 * false-rejection cylinders on the right for creditworthy borrowers who would
 * have repaid: 18% false rejection for older borrowers vs 35% for young adults.
 */
export function IsoCreditAgeTradeoff() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama of the digital bank credit scoring trade-off: a calibrated glass AI cube on the left outputs identical default rates among approved borrowers, but on the right creditworthy young adults face a 35% false rejection cylinder in red compared with 18% for older borrowers."
    >
      <IsoBase />

      <Key x={92} y={24} anchor="middle" fill={PAL.counter} size={9}>
        CALIBRATED MODEL
      </Key>

      <GlassCube
        x={44}
        y={146}
        w={52}
        d={36}
        h={52}
        outside={
          <g>
            <ellipse cx="109" cy="114" rx="3.8" ry="5.5" fill={PAL.ink} />
            <path
              d="M 109 114 L 132 114 L 132 134 L 146 134"
              fill="none"
              stroke={PAL.ink2}
              strokeWidth="2.2"
            />
            <polygon points="152,134 144,130 144,138" fill={PAL.ink2} />
          </g>
        }
      >
        <path
          d="M 60 122 A 16 16 0 0 1 92 122"
          fill={PAL.counterLight}
          stroke={PAL.counter}
          strokeWidth="1.6"
        />
        <line x1="76" y1="122" x2="76" y2="104" stroke={PAL.counter} strokeWidth="2.2" />
      </GlassCube>

      <Key x={256} y={24} anchor="middle" fill={PAL.signal} size={9}>
        FALSE REJECTION OF CREDITWORTHY
      </Key>

      {/* Older borrowers: 18% false rejection cylinder + repayment coins */}
      <IsoCylinder
        cx={168}
        y={144}
        rx={16}
        ry={6}
        h={28}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <Key x={168} y={96} anchor="middle" fill={PAL.counter} size={9.5}>
        OLDER · 18%
      </Key>
      <IsoCoinStack x={200} y={146} n={3} />

      {/* Creditworthy young adults: 35% false rejection cylinder + figure (squarely on board) */}
      <IsoCylinder
        cx={254}
        y={144}
        rx={16}
        ry={6}
        h={56}
        sideFill={PAL.signal}
        topFill={PAL.signalLight}
      />
      <Key x={254} y={68} anchor="middle" fill={PAL.signal} size={9.5}>
        YOUNG · 35%
      </Key>
      <IsoCoinStack x={286} y={146} n={3} />
      <IsoPerson
        x={324}
        y={140}
        scale={0.76}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin2}
      />
    </Frame>
  );
}
/**
 * Slide 22 — Part 5: Auditing and Mitigating Disparate Impact in Marketing Pipelines:
 * 800-unit diorama where a human marketer submits a neutral brief on the left
 * into a central platform optimization GlassCube, which allocates exposure across
 * three 3D marketing channels on the right: Ad Delivery Billboard, Dynamic Pricing
 * Pedestal, and Personalized Feed Cards inspected by an auditor.
 */
export function IsoMarketingDeliveryOverview() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama of digital marketing pipelines: on the left, a marketer submits a neutral campaign brief to a platform optimization glass AI cube; on the right, the cube allocates exposure across three channels—an ad delivery billboard, a dynamic pricing pedestal, and personalized feed slots—monitored by an auditor."
    >
      <IsoBase w={800} />

      {/* Left: Human Marketer & Neutral Brief */}
      <Key x={128} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
        NEUTRAL CAMPAIGN BRIEF
      </Key>
      <IsoPerson
        x={82}
        y={148}
        scale={0.84}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />
      <IsoBlock
        x={138}
        y={150}
        w={44}
        d={24}
        h={34}
        topFill={PAL.paper}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <line x1="148" y1="126" x2="172" y2="126" stroke={PAL.counter} strokeWidth="2" />
      <line x1="148" y1="133" x2="168" y2="133" stroke={PAL.ink3} strokeWidth="1.6" />

      {/* Connected conduit from brief block into GlassCube */}
      <line x1="199" y1="120" x2="250" y2="120" stroke={PAL.ink2} strokeWidth="2.2" />
      <polygon points="256,120 248,116 248,124" fill={PAL.ink2} />

      {/* Center: Platform Optimization GlassCube */}
      <Key x={298} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
        PLATFORM OPTIMIZER
      </Key>
      <GlassCube
        x={256}
        y={148}
        w={60}
        d={42}
        h={60}
        outside={
          <g>
            <ellipse cx="331" cy="112" rx="4" ry="6" fill={PAL.ink} />
            <line x1="331" y1="112" x2="390" y2="112" stroke={PAL.signal} strokeWidth="2.4" />
            <polygon points="396,112 388,108 388,116" fill={PAL.signal} />
          </g>
        }
      >
        <circle cx="294" cy="110" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <line x1="285" y1="116" x2="303" y2="104" stroke={PAL.signal} strokeWidth="2.4" />
        <circle cx="294" cy="110" r="4" fill={PAL.signal} />
      </GlassCube>

      {/* Right Channel 1: Automated Ad Delivery Podium */}
      <Key x={436} y={26} anchor="middle" fill={PAL.signal} size={9}>
        1 · AD DELIVERY
      </Key>
      <IsoBlock
        x={396}
        y={148}
        w={64}
        d={24}
        h={44}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <line x1="410" y1="120" x2="446" y2="120" stroke={PAL.paper} strokeWidth="2.2" />
      <line x1="410" y1="129" x2="438" y2="129" stroke={PAL.paper} strokeWidth="1.8" />

      {/* Right Channel 2: Dynamic Pricing Coin Stacks */}
      <Key x={542} y={26} anchor="middle" fill={PAL.signal} size={9}>
        2 · DYNAMIC PRICING
      </Key>
      <IsoCoinStack x={522} y={146} n={3} />
      <IsoCoinStack x={560} y={146} n={6} signal />

      {/* Right Channel 3: Personalization & Audit (squarely on board) */}
      <Key x={658} y={26} anchor="middle" fill={PAL.counter} size={9}>
        3 · PERSONALIZATION
      </Key>
      <IsoBlock
        x={612}
        y={146}
        w={38}
        d={24}
        h={38}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoPerson
        x={682}
        y={142}
        scale={0.82}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin2}
        reach
      />
    </Frame>
  );
}
/**
 * Slide 23 — Bias in Ad Delivery and Algorithmic Targeting (Ali et al., 2019):
 * Interactive 800-unit Ad-Auction Bidding Arena.
 * A neutral STEM career ad enters the platform auction GlassCube alongside
 * competing retail bids for young women's attention (controlled by a slider).
 * Under cost-per-click optimization, higher competing retail bids shift STEM
 * ad impressions heavily toward men unless parity constraints are enforced.
 */
export function IsoAdAuctionSkew() {
  const [retailBids, setRetailBids] = useState(5);
  const [deliveryMode, setDeliveryMode] = useState<"unconstrained" | "constrained">("unconstrained");

  const isConstrained = deliveryMode === "constrained";
  const menShare = isConstrained ? 50 : Math.min(86, 46 + retailBids * 7);
  const womenShare = 100 - menShare;
  const skewed = menShare >= 65;

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of algorithmic ad delivery skew (Ali et al., 2019): on the left, a neutral STEM career ad and ${retailBids} competing retail bid coins enter a platform auction glass AI cube; on the right, impression cylinders show ${menShare}% of STEM ad impressions served to men and ${womenShare}% to women.`}
      >
        <IsoBase w={800} />

        <Key
          x={400}
          y={22}
          anchor="middle"
          fill={skewed ? PAL.signal : PAL.counter}
          size={9.5}
        >
          {isConstrained
            ? "PARITY-CONSTRAINED DELIVERY · EQUAL 50% / 50% STEM IMPRESSIONS DESPITE AUCTION COST"
            : `NEUTRAL TARGETING + RETAIL AUCTION BIDS (${retailBids}x) -> ${menShare}% STEM IMPRESSIONS SERVED TO MEN`}
        </Key>

        {/* Left: Neutral STEM Ad Brief + Competing Retail Bid Stack */}
        <Key x={148} y={44} anchor="middle" fill={PAL.ink2} size={9}>
          STEM AD + COMPETING RETAIL BIDS
        </Key>
        <IsoBlock
          x={68}
          y={148}
          w={66}
          d={26}
          h={40}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <text x="101" y="126" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
          STEM AD
        </text>
        <text x="101" y="138" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.paper}>
          NEUTRAL
        </text>

        {/* Competing retail bidder driving up CPM for young women */}
        <IsoCoinStack x={186} y={148} n={retailBids} signal />
        <Key x={186} y={192} anchor="middle" fill={PAL.signal} size={8.5}>
          RETAIL BIDS ON WOMEN
        </Key>

        {/* Connected conduit from auction inputs into GlassCube */}
        <line x1="204" y1="126" x2="290" y2="126" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="296,126 288,122 288,130" fill={PAL.ink2} />

        {/* Center: Platform Ad-Auction & Relevance GlassCube */}
        <Key x={346} y={44} anchor="middle" fill={PAL.ink2} size={9}>
          AUCTION &amp; CTR OPTIMIZER
        </Key>
        <GlassCube
          x={296}
          y={148}
          w={64}
          d={44}
          h={62}
          outside={
            <g>
              <ellipse cx="376" cy="112" rx="4.5" ry="6.5" fill={PAL.ink} />
              <line
                x1="376"
                y1="112"
                x2="500"
                y2="112"
                stroke={skewed ? PAL.signal : PAL.counter}
                strokeWidth="2.4"
              />
              <polygon
                points="506,112 498,108 498,116"
                fill={skewed ? PAL.signal : PAL.counter}
              />
            </g>
          }
        >
          {/* Circular auction dial & tilted cost-per-click vane inside cube */}
          <circle
            cx="332"
            cy="110"
            r="14"
            fill={skewed ? PAL.signalLight : PAL.counterLight}
            stroke={skewed ? PAL.signal : PAL.counter}
            strokeWidth="1.6"
          />
          <line
            x1="322"
            y1={skewed ? 116 : 110}
            x2="342"
            y2={skewed ? 104 : 110}
            stroke={skewed ? PAL.signal : PAL.counter}
            strokeWidth="2.8"
          />
          <circle cx="332" cy="110" r="3.8" fill={PAL.ink} />
        </GlassCube>

        {/* Right: Served Impression Cylinders (Men vs Women) */}
        <Key
          x={592}
          y={44}
          anchor="middle"
          fill={skewed ? PAL.signal : PAL.counter}
          size={9}
        >
          SERVED STEM AD IMPRESSIONS
        </Key>

        {/* Men Audience Impression Cylinder */}
        <IsoCylinder
          cx={528}
          y={148}
          rx={22}
          ry={7.5}
          h={Math.round(menShare * 0.72)}
          sideFill={skewed ? PAL.signal : PAL.counter}
          topFill={skewed ? PAL.signalLight : PAL.counterLight}
        />
        <Key
          x={528}
          y={68}
          anchor="middle"
          fill={skewed ? PAL.signal : PAL.counter}
          size={9.5}
        >
          {`MEN · ${menShare}%`}
        </Key>

        {/* Women Audience Impression Cylinder */}
        <IsoCylinder
          cx={644}
          y={148}
          rx={22}
          ry={7.5}
          h={Math.round(womenShare * 0.72)}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <Key x={644} y={68} anchor="middle" fill={PAL.counter} size={9.5}>
          {`WOMEN · ${womenShare}%`}
        </Key>

        <Key x={754} y={198} anchor="end" fill={PAL.ink3} size={8.5}>
          AUCTION DELIVERY
        </Key>
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider
          label="Competing retail bid pressure on women"
          value={retailBids}
          min={1}
          max={6}
          step={1}
          onChange={setRetailBids}
          formatValue={(v) => `${v}x bid`}
        />
        <Segmented
          label="Delivery algorithm"
          options={[
            { id: "unconstrained", label: "Unconstrained CPC optimizer" },
            { id: "constrained", label: "Parity-constrained delivery" },
          ]}
          value={deliveryMode}
          onChange={setDeliveryMode}
        />
      </div>
    </div>
  );
}
/**
 * Slide 24 — Pre-Processing, In-Processing, and Post-Processing Mitigation:
 * Interactive 800-unit diorama with the three mitigation points on the left/center
 * (1. Pre-processing data scale, 2. In-processing penalized GlassCube,
 * 3. Post-processing group threshold gates) and a 3D Accuracy–Fairness Pareto
 * Frontier plinth on the right where a slider moves the operating point along the curve.
 */
export function IsoMitigationFrontier() {
  const [lambda, setLambda] = useState(60);
  const t = lambda / 100; // 0..1

  // Concave Pareto frontier standing cleanly atop the plinth (x=542..668, y=64..112)
  const opX = r2(542 + t * 126);
  const opY = r2(64 + t * t * 48);

  const histAcc = (91 - t * t * 6.5).toFixed(1);
  const parityRatio = (0.58 + t * 0.38).toFixed(2);
  const passes = Number(parityRatio) >= 0.8;

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of bias mitigation stages and the accuracy-fairness frontier: from left to right stand pre-processing data reweighting, in-processing loss penalty inside a glass AI cube, post-processing group thresholds, and a 3D Pareto frontier plinth on the right where fairness constraint lambda=${lambda}% selects accuracy ${histAcc}% and four-fifths ratio ${parityRatio}.`}
      >
        <IsoBase w={800} />

        {/* 1. Pre-Processing: Data Reweighting Podium */}
        <Key x={122} y={26} anchor="middle" fill={PAL.counter} size={9}>
          1 · PRE-PROCESSING
        </Key>
        <IsoBlock
          x={74}
          y={148}
          w={84}
          d={24}
          h={16}
          topFill={PAL.paper}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        <IsoCylinder
          cx={102}
          y={126}
          rx={12}
          ry={4.5}
          h={28}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <IsoCylinder
          cx={140}
          y={126}
          rx={12}
          ry={4.5}
          h={28}
          sideFill={PAL.counter}
          topFill={PAL.counterLight}
        />
        <line x1="88" y1="90" x2="154" y2="90" stroke={PAL.counter} strokeWidth="2.4" />
        <Key x={122} y={192} anchor="middle" fill={PAL.ink3} size={8}>
          REWEIGHT DATA
        </Key>

        {/* Connected conduit from Pre-processing to In-processing */}
        <line x1="175" y1="126" x2="230" y2="126" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="236,126 228,122 228,130" fill={PAL.ink2} />

        {/* 2. In-Processing: Penalized Loss / Adversarial GlassCube */}
        <Key x={276} y={26} anchor="middle" fill={PAL.ink2} size={9}>
          2 · IN-PROCESSING
        </Key>
        <GlassCube
          x={236}
          y={148}
          w={56}
          d={38}
          h={56}
          outside={
            <g>
              <ellipse cx="306" cy="114" rx="4" ry="5.5" fill={PAL.ink} />
              <line x1="306" y1="114" x2="366" y2="114" stroke={PAL.ink2} strokeWidth="2.2" />
              <polygon points="372,114 364,110 364,118" fill={PAL.ink2} />
            </g>
          }
        >
          {/* Loss + fairness penalty clamp inside cube */}
          <rect
            x="250"
            y="102"
            width="28"
            height="22"
            fill={PAL.counterLight}
            stroke={PAL.counter}
            strokeWidth="1.6"
          />
          <text x="264" y="116" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink} stroke="none">
            +λ
          </text>
        </GlassCube>
        <Key x={276} y={192} anchor="middle" fill={PAL.ink3} size={8}>
          FAIRNESS LOSS PENALTY
        </Key>

        {/* 3. Post-Processing: Group-Specific Threshold Gates */}
        <Key x={412} y={26} anchor="middle" fill={PAL.counter} size={9}>
          3 · POST-PROCESSING
        </Key>
        <IsoBlock
          x={372}
          y={148}
          w={24}
          d={22}
          h={42}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <IsoBlock
          x={416}
          y={148}
          w={24}
          d={22}
          h={30}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <Key x={412} y={192} anchor="middle" fill={PAL.ink3} size={8}>
          GROUP THRESHOLDS
        </Key>

        {/* Connected conduit from Post-processing to Pareto Frontier plinth */}
        <line x1="456" y1="134" x2="498" y2="134" stroke={PAL.ink2} strokeWidth="2.2" />
        <polygon points="504,134 496,130 496,138" fill={PAL.ink2} />

        {/* Right: 3D Accuracy–Fairness Pareto Frontier Plinth (squarely on board) */}
        <Key
          x={604}
          y={26}
          anchor="middle"
          fill={passes ? PAL.counter : PAL.signal}
          size={9}
        >
          {`PARETO FRONTIER · ACC ${histAcc}% · 4/5 RATIO ${parityRatio}`}
        </Key>
        <IsoBlock
          x={504}
          y={144}
          w={178}
          d={28}
          h={16}
          topFill={PAL.paper}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        {/* 3D Axes & Pareto Frontier Curve standing atop the plinth */}
        <line x1="542" y1="114" x2="542" y2="54" stroke={PAL.ink} strokeWidth="1.6" />
        <line x1="542" y1="114" x2="676" y2="114" stroke={PAL.ink} strokeWidth="1.6" />
        <path
          d="M 542 64 Q 608 64 668 112"
          fill="none"
          stroke={PAL.ink}
          strokeWidth="2.4"
        />
        {/* Drop lines & Operating Point Beacon on the Frontier */}
        <line
          x1={opX}
          y1={opY}
          x2={opX}
          y2={114}
          stroke={passes ? PAL.counter : PAL.signal}
          strokeWidth="1.8"
          strokeDasharray="3 2"
        />
        <circle
          cx={opX}
          cy={opY}
          r="6"
          fill={passes ? PAL.counter : PAL.signal}
          stroke={PAL.paper}
          strokeWidth="1.6"
        />
        <Key x={604} y={192} anchor="middle" fill={PAL.ink3} size={8}>
          ACCURACY-FAIRNESS FRONTIER
        </Key>
      </Frame>
      <Slider
        label="Fairness constraint strength (operating point)"
        value={lambda}
        min={0}
        max={100}
        step={10}
        onChange={setLambda}
        formatValue={(v) => `λ = ${v}%`}
      />
    </div>
  );
}
/**
 * Slide 25 — Six Steps of a Disparate Impact Audit:
 * Interactive 800-unit diorama with six distinct 3D audit instruments across
 * the board: (1) Scope Charter Tablet, (2) Holdout Sample Cylinder,
 * (3) Baseline 4/5 Caliper Towers, (4) Pipeline Diagnostic GlassCube,
 * (5) Pareto Frontier Selector Plinth, and (6) Formal Audit Dossier & Drift Alert Loop.
 */
export function IsoSixStepAuditLoop() {
  const [step, setStep] = useState<"all" | "1" | "2" | "3" | "4" | "5" | "6">("all");
  const lit = (s: "1" | "2" | "3" | "4" | "5" | "6") => step === "all" || step === s;

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label="Isometric tabletop diorama of the six steps of a disparate impact audit: Step 1 scope charter tablet, Step 2 holdout audit sample cylinder, Step 3 baseline group metric towers, Step 4 pipeline stage diagnostic glass cube, Step 5 accuracy-fairness frontier selector, and Step 6 formal audit report with a continuous fairness-drift monitoring loop."
      >
        <IsoBase w={800} />

        {/* Step 1: Scope, Protected Groups & Fairness Criteria */}
        <g opacity={lit("1") ? 1 : 0.35}>
          <Key x={94} y={26} anchor="middle" fill={step === "1" ? PAL.signal : PAL.ink2} size={9}>
            01 · SCOPE
          </Key>
          <IsoBlock
            x={68}
            y={148}
            w={42}
            d={24}
            h={38}
            topFill={PAL.paper}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <line x1="76" y1="122" x2="100" y2="122" stroke={PAL.counter} strokeWidth="2" />
          <line x1="76" y1="130" x2="96" y2="130" stroke={PAL.ink3} strokeWidth="1.6" />
        </g>

        {/* Step 2: Representative Holdout Audit Dataset */}
        <g opacity={lit("2") ? 1 : 0.35}>
          <Key x={198} y={26} anchor="middle" fill={step === "2" ? PAL.signal : PAL.ink2} size={9}>
            02 · HOLDOUT
          </Key>
          <IsoCylinder
            cx={198}
            y={148}
            rx={20}
            ry={7}
            h={44}
            sideFill={PAL.counter}
            topFill={PAL.counterLight}
          />
        </g>

        {/* Step 3: Baseline Group Metrics (4/5 Ratio, TPR, FPR, Calibration) */}
        <g opacity={lit("3") ? 1 : 0.35}>
          <Key x={308} y={26} anchor="middle" fill={PAL.signal} size={9}>
            03 · METRICS
          </Key>
          <IsoCylinder
            cx={290}
            y={148}
            rx={13}
            ry={4.8}
            h={46}
            sideFill={PAL.counter}
            topFill={PAL.counterLight}
          />
          <IsoCylinder
            cx={326}
            y={148}
            rx={13}
            ry={4.8}
            h={26}
            sideFill={PAL.signal}
            topFill={PAL.signalLight}
          />
          <line x1="303" y1="110" x2="342" y2="110" stroke={PAL.signal} strokeWidth="2" strokeDasharray="3 2" />
        </g>

        {/* Step 4: Diagnose Pipeline Stage inside GlassCube */}
        <g opacity={lit("4") ? 1 : 0.35}>
          <Key x={426} y={26} anchor="middle" fill={step === "4" ? PAL.signal : PAL.ink2} size={9}>
            04 · DIAGNOSE
          </Key>
          <GlassCube x={392} y={148} w={50} d={34} h={50}>
            <circle cx="422" cy="112" r="10" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
            <line x1="429" y1="119" x2="437" y2="127" stroke={PAL.ink} strokeWidth="2.2" />
          </GlassCube>
        </g>

        {/* Step 5: Accuracy–Fairness Frontier Operating Point (grounded on plinth) */}
        <g opacity={lit("5") ? 1 : 0.35}>
          <Key x={542} y={26} anchor="middle" fill={PAL.counter} size={9}>
            05 · FRONTIER
          </Key>
          <IsoBlock
            x={498}
            y={148}
            w={68}
            d={24}
            h={16}
            topFill={PAL.paper}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          <line x1="514" y1="124" x2="514" y2="88" stroke={PAL.ink} strokeWidth="1.5" />
          <line x1="514" y1="124" x2="566" y2="124" stroke={PAL.ink} strokeWidth="1.5" />
          <path d="M 514 94 Q 542 94 562 122" fill="none" stroke={PAL.ink} strokeWidth="2.2" />
          <line x1="542" y1="102" x2="542" y2="124" stroke={PAL.counter} strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="542" cy="102" r="4.5" fill={PAL.counter} stroke={PAL.paper} strokeWidth="1.2" />
        </g>

        {/* Step 6: Audit Report & Continuous Production Drift Alerts (squarely on board) */}
        <g opacity={lit("6") ? 1 : 0.35}>
          <Key x={652} y={26} anchor="middle" fill={step === "6" ? PAL.signal : PAL.ink2} size={9}>
            06 · REPORT &amp; ALERT
          </Key>
          <IsoBlock
            x={608}
            y={146}
            w={42}
            d={24}
            h={42}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <IsoPerson
            x={680}
            y={142}
            scale={0.78}
            flip
            coat={PAL.counter}
            coatShade={PAL.counterMid}
            skin={PAL.skin1}
          />
          {/* Continuous drift alert arch back to Step 3 Metrics */}
          <path
            d="M 638 90 L 638 52 L 308 52 L 308 78"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <polygon points="308,84 304,76 312,76" fill={PAL.signal} />
          <Key x={474} y={44} anchor="middle" fill={PAL.signal} size={8.5}>
            CONTINUOUS PRODUCTION DRIFT ALERT
          </Key>
        </g>
      </Frame>
      <Segmented
        label="Audit step"
        options={[
          { id: "all", label: "All 6 steps" },
          { id: "1", label: "01 Scope" },
          { id: "2", label: "02 Holdout" },
          { id: "3", label: "03 Metrics" },
          { id: "4", label: "04 Diagnose" },
          { id: "5", label: "05 Frontier" },
          { id: "6", label: "06 Report & alert" },
        ]}
        value={step}
        onChange={setStep}
      />
    </div>
  );
}
/**
 * Slide 26 — Discussion: Neutral Targeting, Skewed Delivery:
 * 400-unit diorama of the university Master of Financial Technology recruitment
 * ad case: a neutral targeting brief (Age 21–40, Bachelor's) enters a social
 * media platform GlassCube, which routes 82% of impressions to men and 18% to women.
 */
export function IsoUniversityAdSkew() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama of the university recruitment ad case: on the left, a neutral targeting brief (Age 21 to 40, Bachelor's degree) feeds into a social media ad platform glass AI cube, which serves 82% of ad impressions to a tall red cylinder for men and only 18% to women on the right."
    >
      <IsoBase />

      <Key x={92} y={24} anchor="middle" fill={PAL.counter} size={9}>
        AGE 21-40 · BACHELOR&apos;S
      </Key>

      {/* University neutral recruitment brief block */}
      <IsoBlock
        x={44}
        y={146}
        w={62}
        d={22}
        h={42}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="75" y="122" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.paper}>
        FINTECH
      </text>
      <text x="75" y="134" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.paper}>
        AD BRIEF
      </text>

      {/* Connected conduit from brief into GlassCube */}
      <line x1="122" y1="120" x2="138" y2="120" stroke={PAL.ink2} strokeWidth="2.2" />
      <polygon points="144,120 136,116 136,124" fill={PAL.ink2} />

      {/* Social Media Ad Platform GlassCube */}
      <GlassCube
        x={144}
        y={146}
        w={52}
        d={36}
        h={52}
        outside={
          <g>
            <ellipse cx="209" cy="114" rx="3.8" ry="5.5" fill={PAL.ink} />
            <line x1="209" y1="114" x2="235" y2="114" stroke={PAL.signal} strokeWidth="2.4" />
          </g>
        }
      >
        <circle cx="176" cy="112" r="12" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.5" />
        <line x1="167" y1="118" x2="185" y2="106" stroke={PAL.signal} strokeWidth="2.6" />
        <circle cx="176" cy="112" r="3.5" fill={PAL.ink} />
      </GlassCube>

      <Key x={284} y={24} anchor="middle" fill={PAL.signal} size={9}>
        SERVED IMPRESSIONS
      </Key>

      {/* 82% Men Impressions Cylinder (squarely on board) */}
      <IsoCylinder
        cx={252}
        y={144}
        rx={17}
        ry={6}
        h={64}
        sideFill={PAL.signal}
        topFill={PAL.signalLight}
      />
      <Key x={252} y={60} anchor="middle" fill={PAL.signal} size={9}>
        MEN · 82%
      </Key>

      {/* 18% Women Impressions Cylinder (squarely on board) */}
      <IsoCylinder
        cx={314}
        y={144}
        rx={17}
        ry={6}
        h={16}
        sideFill={PAL.counter}
        topFill={PAL.counterLight}
      />
      <Key x={314} y={108} anchor="middle" fill={PAL.counter} size={9}>
        WOMEN · 18%
      </Key>
    </Frame>
  );
}
