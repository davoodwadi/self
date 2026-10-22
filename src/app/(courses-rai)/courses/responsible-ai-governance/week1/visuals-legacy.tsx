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
   WEEK 01 PLATES — 3D ARCHITECTURAL & TECHNICAL ILLUSTRATION
   --------------------------------------------------------------------------
   Varied 3D axonometric instruments, exploded cutaways, tactile documents,
   quantitative sculptures, and selective spatial scenes in the cool-mineral
   palette (`PAL`).
   ========================================================================== */

/**
 * Slide 2 — Why Market Algorithms Require Governance:
 * Macro 3D instrument comparison (no tabletop slab):
 * Left: a single precision hand-stamp / nib marking one 3D case card at a time.
 * Right: a translucent 3D automated stamping press drum (GlassCube manifold)
 * simultaneously stamping an entire array of 8 angled market-segment cards.
 */
export function IsoScalingRule() {
  const [mode, setMode] = useState<"biased" | "audited">("biased");
  const biased = mode === "biased";

  const cards = [
    { x: 356, y: 154, affected: true },
    { x: 438, y: 154, affected: true },
    { x: 520, y: 154, affected: true },
    { x: 602, y: 154, affected: true },
    { x: 684, y: 154, affected: false },
  ];

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`3D technical comparison of human versus algorithmic scale: on the left, a manual brass-style hand stamp marks a single ledger card one decision at a time; on the right, a translucent 3D automated manifold press simultaneously stamps an entire row of consumer ledger cards with ${biased ? "a biased rule that scales rejection across the market segment" : "an audited rule that verifies compliance across every card"}.`}
      >
        {/* Left: Manual single-case hand stamp & single ledger card */}
        <Key x={132} y={24} anchor="middle" fill={PAL.ink3}>
          ONE DECISION AT A TIME
        </Key>

        {/* Plinth for single ledger card */}
        <IsoBlock
          x={56}
          y={176}
          w={116}
          d={38}
          h={18}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        {/* Single angled 3D case card on the plinth */}
        <IsoBlock
          x={78}
          y={156}
          w={72}
          d={24}
          h={8}
          topFill={PAL.paper}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        <line x1="94" y1="142" x2="136" y2="142" stroke={PAL.ink2} strokeWidth="1.8" />
        <line x1="98" y1="136" x2="128" y2="136" stroke={PAL.counter} strokeWidth="2" />

        {/* 3D manual hand-stamp suspended above the single card */}
        <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
          {/* Stamp base pad (top face spans y=94.64 to y=104, center at x=122.5, y=99.3) */}
          <IsoBlock
            x={98}
            y={114}
            w={36}
            d={18}
            h={10}
            topFill={PAL.slabTop}
            leftFill={PAL.ink2}
            rightFill={PAL.ink}
          />
          {/* Turned handle shaft rising from the center of the top face */}
          <rect x="116.5" y="70" width="12" height="29" fill={PAL.slabLeft} />
          <ellipse cx="122.5" cy="68" rx="14" ry="7.5" fill={PAL.ink2} />
          <line x1="122.5" y1="117" x2="122.5" y2="132" stroke={PAL.ink3} strokeWidth="1.4" strokeDasharray="3 3" />
        </g>

        {/* Vertical divider rule */}
        <line
          x1="248"
          y1="20"
          x2="248"
          y2="196"
          stroke={PAL.rule}
          strokeWidth="1.4"
          strokeDasharray="5 4"
        />

        {/* Right: High-speed translucent algorithmic manifold press */}
        <Key
          x={534}
          y={24}
          anchor="middle"
          fill={biased ? PAL.signal : PAL.counter}
        >
          {biased
            ? "1,000 DECISIONS / SEC · BIASED RULE SCALES INSTANTLY"
            : "1,000 DECISIONS / SEC · VERIFIED RULE ACROSS SEGMENT"}
        </Key>

        {/* Continuous 3D conveyor bed holding the market segment's cards */}
        <IsoBlock
          x={328}
          y={178}
          w={416}
          d={38}
          h={16}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />

        {/* Array of 5 angled 3D customer ledger cards along the conveyor */}
        {cards.map((c, idx) => {
          const harmed = biased && c.affected;
          return (
            <g key={c.x}>
              <IsoBlock
                x={c.x}
                y={c.y}
                w={58}
                d={24}
                h={10}
                topFill={harmed ? PAL.signalLight : PAL.counterLight}
                leftFill={harmed ? PAL.signal : PAL.counter}
                rightFill={harmed ? PAL.signalMid : PAL.counterMid}
              />
              {/* Stamped mark on top face of each card */}
              <line
                x1={c.x + 16}
                y1={c.y - 16}
                x2={c.x + 48}
                y2={c.y - 16}
                stroke={harmed ? PAL.signal : PAL.counter}
                strokeWidth="2.2"
              />
              <text
                x={c.x + 29}
                y={196}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fill={harmed ? PAL.signal : PAL.counter}
              >
                {harmed ? `DENY #${idx + 1}` : `PASS #${idx + 1}`}
              </text>
            </g>
          );
        })}

        {/* Translucent 3D algorithmic manifold beam spanning above the entire conveyor */}
        <GlassCube
          x={338}
          y={104}
          w={396}
          d={30}
          h={44}
          outside={
            <g>
              {/* Synchronized vertical stamping pistons emerging from bottom ports */}
              {cards.map((c) => {
                const px = c.x + 29;
                const harmed = biased && c.affected;
                const color = harmed ? PAL.signal : PAL.counter;
                return (
                  <g key={c.x}>
                    <ellipse cx={px} cy="104" rx="5" ry="2.6" fill={PAL.ink} />
                    <line x1={px} y1="104" x2={px} y2="126" stroke={color} strokeWidth="2.8" />
                    <rect
                      x={px - 10}
                      y="124"
                      width="20"
                      height="6"
                      fill={harmed ? PAL.signalLight : PAL.counterLight}
                      stroke={color}
                      strokeWidth="1.4"
                    />
                  </g>
                );
              })}
            </g>
          }
        >
          {/* Internal master decision shaft & rule cams inside the wide GlassCube */}
          <line
            x1="362"
            y1="76"
            x2="728"
            y2="76"
            stroke={biased ? PAL.signal : PAL.counter}
            strokeWidth="3"
          />
          {cards.map((c) => {
            const cx = c.x + 29;
            const harmed = biased && c.affected;
            const color = harmed ? PAL.signal : PAL.counter;
            return (
              <g key={c.x}>
                <circle
                  cx={cx}
                  cy="76"
                  r="10"
                  fill={harmed ? PAL.signalLight : PAL.counterLight}
                  stroke={color}
                  strokeWidth="1.6"
                />
                <circle cx={cx} cy="76" r="3.2" fill={color} />
              </g>
            );
          })}
        </GlassCube>
      </Frame>
      <Segmented
        label="Internal decision rule"
        options={[
          { id: "biased", label: "Biased rule (scales error)" },
          { id: "audited", label: "Verified rule (compliant)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Slide 3A — Governance Authority:
 * Macro 3D instrument & document plate (no tabletop slab):
 * Left: a thick 3D Audit Evidence Dossier with tabbed sheets and a verdigris
 * verification seal.
 * Right: a translucent 3D model conduit governed by a heavy 3-position
 * mechanical shut-off valve (APPROVE · RESTRICT · HALT) coupled to the dossier.
 */
export function IsoGovernanceAuthority() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D close-up of an audit evidence dossier interlocked with a mechanical model shut-off valve: a thick tabbed dossier on the left feeds a verdigris linkage bar into a three-position rotary valve (Approve, Restrict, Halt) mounted atop a translucent glass model conduit."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.counter}>
        EVIDENCE DOSSIER &amp; HALT AUTHORITY
      </Key>

      {/* Left: 3D Stacked Audit Evidence Dossier with spine and tabs */}
      <g>
        {/* Bottom binder board */}
        <IsoBlock
          x={32}
          y={166}
          w={104}
          d={48}
          h={14}
          topFill={PAL.slabTop}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        {/* Stepped paper sheets inside dossier */}
        <IsoBlock
          x={38}
          y={152}
          w={92}
          d={40}
          h={10}
          topFill={PAL.paper}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        {/* Index tabs protruding from the right edge of the sheets */}
        <polygon
          points="158.8,131.2 170,123.4 170,117.4 158.8,125.2"
          fill={PAL.counterLight}
          stroke={PAL.ink}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <polygon
          points="151.6,136.4 162.8,128.6 162.8,122.6 151.6,130.4"
          fill={PAL.signalLight}
          stroke={PAL.ink}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Top cover sheet with audit lines and verdigris seal */}
        <line x1="58" y1="132" x2="112" y2="132" stroke={PAL.ink} strokeWidth="2" />
        <line x1="64" y1="125" x2="118" y2="125" stroke={PAL.ink3} strokeWidth="1.6" />
        <line x1="70" y1="118" x2="108" y2="118" stroke={PAL.ink3} strokeWidth="1.6" />
        <ellipse
          cx="118"
          cy="134"
          rx="10"
          ry="6"
          fill={PAL.counterLight}
          stroke={PAL.counter}
          strokeWidth="1.6"
        />
        <ellipse cx="118" cy="134" rx="4" ry="2.4" fill={PAL.counter} />
        <Key x={86} y={190} anchor="middle" fill={PAL.ink2} size={9.5}>
          AUDIT EVIDENCE
        </Key>
      </g>

      {/* Mechanical coupling shaft from Evidence Dossier right face into Shut-Off Valve */}
      <ellipse cx="146" cy="146" rx="3.5" ry="5" fill={PAL.counter} />
      <line x1="146" y1="146" x2="220" y2="146" stroke={PAL.counter} strokeWidth="3" />
      <polygon points="226,146 217,141 217,151" fill={PAL.counter} />

      {/* Right: Translucent glass model conduit with 3D rotary shut-off gate valve */}
      <GlassCube
        x={230}
        y={166}
        w={106}
        d={48}
        h={62}
        outside={
          <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
            {/* Heavy 3D valve collar & rotary T-handle mounted on top of the glass conduit */}
            <ellipse cx="300" cy="90" rx="22" ry="9" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
            <rect x="294" y="58" width="12" height="32" fill={PAL.counter} />
            {/* Crossbar of the shut-off valve wheel/lever */}
            <IsoBlock
              x={264}
              y={60}
              w={72}
              d={14}
              h={9}
              topFill={PAL.counterLight}
              leftFill={PAL.counter}
              rightFill={PAL.counterMid}
            />
            <Key x={304} y={190} anchor="middle" fill={PAL.counter} size={9.5}>
              APPROVE · RESTRICT · HALT
            </Key>
          </g>
        }
      >
        {/* Internal gate blade & flow gear inside the glass conduit */}
        <circle cx="272" cy="126" r="14" fill={PAL.paper} stroke={PAL.ink2} strokeWidth="1.6" />
        <circle cx="272" cy="126" r="4" fill={PAL.ink2} />
        {/* Verdigris shut-off gate blade descending inside the glass chamber */}
        <polygon
          points="296,92 316,78 316,138 296,152"
          fill={PAL.counterLight}
          stroke={PAL.counter}
          strokeWidth="1.8"
        />
      </GlassCube>
    </Frame>
  );
}

/**
 * Slide 3B — Ethics Washing:
 * 3D architectural cutaway of a paper-thin "OUR VALUES" billboard facade
 * propped up by rear struts, while directly behind it an unmonitored glass AI
 * engine runs a red siphon pipe that extracts consumer coins untouched.
 */
export function IsoEthicsWashing() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D architectural cutaway of ethics washing: in the foreground stands a paper-thin billboard facade inscribed OUR VALUES propped up by diagonal rear struts, while behind it an unmonitored glass AI engine drives a red siphon pipeline that extracts a stack of consumer coins without any connection to the facade."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.signal}>
        ETHICS WASHING · UNCOUPLED FACADE
      </Key>

      {/* Rear: Unmonitored AI engine + active red siphon pipe running behind the facade */}
      <GlassCube
        x={204}
        y={136}
        w={60}
        d={36}
        h={54}
        outside={
          <g>
            {/* Port flange mounted flush on the outer right edge (x = 204 + 60 + 25.92 = 289.92) */}
            <ellipse cx="289.92" cy="92" rx="3.5" ry="5.5" fill={PAL.ink} />
            <path
              d="M 289.92 92 L 346 92 L 346 124"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon points="346,132 340,122 352,122" fill={PAL.signal} />
          </g>
        }
      >
        <circle cx="244" cy="98" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <line x1="235" y1="104" x2="253" y2="92" stroke={PAL.signal} strokeWidth="2.4" />
        <circle cx="244" cy="98" r="4" fill={PAL.signal} />
        {/* Internal shaft seen through the translucent glass up to the outer right wall */}
        <line x1="257" y1="96" x2="289.92" y2="92" stroke={PAL.signal} strokeWidth="3.2" />
      </GlassCube>

      {/* Extracted consumer coins at the end of the siphon pipe */}
      <IsoCoinStack x={346} y={168} n={5} signal />

      {/* Foreground left: Paper-thin ceremonial billboard facade with visible rear A-frame prop struts */}
      <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
        {/* Paper-thin billboard wall (d=8, right bevel reaches x=145.76) */}
        <IsoBlock
          x={36}
          y={166}
          w={104}
          d={8}
          h={76}
          topFill={PAL.slabTop}
          leftFill={PAL.paper}
          rightFill={PAL.slabRight}
        />
        {/* Visible rear A-frame prop strut braced behind the thin facade */}
        <line x1="145.76" y1="102" x2="182" y2="152" stroke={PAL.ink2} strokeWidth="2.4" />
        <line x1="145.76" y1="152" x2="182" y2="152" stroke={PAL.ink3} strokeWidth="1.8" strokeDasharray="3 3" />
        <polygon points="178,152 186,152 186,156 178,156" fill={PAL.ink2} />
      </g>

      {/* Aspirational text painted on the front of the false facade */}
      <text
        x="88"
        y="112"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.1em"
        fill={PAL.ink2}
      >
        OUR VALUES
      </text>
      <line x1="56" y1="124" x2="120" y2="124" stroke={PAL.rule} strokeWidth="1.8" />
      <line x1="62" y1="133" x2="114" y2="133" stroke={PAL.rule} strokeWidth="1.8" />
      <line x1="68" y1="142" x2="108" y2="142" stroke={PAL.rule} strokeWidth="1.8" />

      <Key x={94} y={190} anchor="middle" fill={PAL.ink3} size={9.5}>
        FALSE FRONT (NO LINK)
      </Key>
      <Key x={282} y={190} anchor="middle" fill={PAL.signal} size={9.5}>
        UNALTERED EXTRACTION
      </Key>
    </Frame>
  );
}

/**
 * Slide 4 — Part 1: Ethical Frameworks for Automated Decisions:
 * A 3D Tri-Optic Inspection Assembly (no tabletop slab): three optical
 * inspection instruments examine the same central translucent AI model core
 * and reach conflicting verdicts:
 * 1. Consequentialism (left): measures net aggregate welfare (+18% surplus -> PASS)
 * 2. Deontology (top-right): detects a breached consumer right (DUTY BREACH -> HALT)
 * 3. Virtue Ethics (bottom-right): tests institutional character via a plumb line (OFF-PLUMB -> REJECT)
 */
export function IsoThreeLenses() {
  return (
    <Frame
      width={800}
      height={210}
      label="3D tri-optic inspection diagram: a central translucent glass AI cube is examined through three optical lenses that reach conflicting verdicts—on the left, a consequentialist lens measures net aggregate surplus (+18% pass); on the top right, a deontological lens flags a rights breach (halt); on the bottom right, a virtue-ethics plumb gauge detects crooked institutional character (reject)."
    >
      {/* Left Instrument: 1 · Consequentialism (Aggregate Outcomes Lens) */}
      <Key x={144} y={24} anchor="middle" fill={PAL.counter}>
        1 · CONSEQUENTIALISM (OUTCOMES)
      </Key>
      <IsoBlock
        x={44}
        y={166}
        w={184}
        d={22}
        h={86}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Mini 3D net-welfare bar comparison on the instrument face */}
      <rect x="64" y="102" width="20" height="46" fill={PAL.counter} stroke={PAL.ink} strokeWidth="1.3" />
      <rect x="92" y="130" width="20" height="18" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.3" />
      <text x="168" y="116" textAnchor="middle" fontSize="11" fontWeight="700" fill={PAL.counter}>
        NET +18%
      </text>
      <text x="168" y="136" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.counter}>
        VERDICT: PASS
      </text>

      {/* Optical lens & sightline 1 aiming into the left face of the central cube */}
      <g stroke={PAL.ink} strokeWidth="1.4">
        <line x1="250" y1="116" x2="336" y2="116" stroke={PAL.counter} strokeWidth="2" strokeDasharray="4 3" />
        <ellipse cx="290" cy="116" rx="7" ry="14" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.8" />
        <polygon points="340,116 332,112 332,120" fill={PAL.counter} />
      </g>

      {/* Central Translucent AI System under 3-lens inspection */}
      <Key x={396} y={24} anchor="middle" fill={PAL.ink}>
        DEPLOYED MODEL CORE
      </Key>
      <GlassCube x={346} y={162} w={74} d={46} h={74}>
        {/* Inside the cube: both a green rising welfare curve AND a red coercive cam */}
        <path
          d="M 360 136 Q 378 122 392 96 T 418 78"
          fill="none"
          stroke={PAL.counter}
          strokeWidth="2.6"
        />
        <circle cx="396" cy="118" r="14" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <line x1="386" y1="124" x2="406" y2="112" stroke={PAL.signal} strokeWidth="2.6" />
        <circle cx="396" cy="118" r="4" fill={PAL.signal} />
      </GlassCube>

      {/* Optical lens 2 (upper right) & Deontology Instrument */}
      <g stroke={PAL.ink} strokeWidth="1.4">
        <line x1="458" y1="84" x2="522" y2="66" stroke={PAL.signal} strokeWidth="2" strokeDasharray="4 3" />
        <ellipse cx="490" cy="75" rx="6.5" ry="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <polygon points="526,65 517,63 519,71" fill={PAL.signal} />
      </g>
      <Key x={642} y={22} anchor="middle" fill={PAL.signal}>
        2 · DEONTOLOGY (RIGHTS &amp; DUTIES)
      </Key>
      <IsoBlock
        x={532}
        y={94}
        w={204}
        d={18}
        h={48}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Shield/boundary line breached indicator */}
      <rect x="554" y="54" width="10" height="30" fill={PAL.counter} stroke={PAL.ink} strokeWidth="1.2" />
      <line x1="544" y1="69" x2="574" y2="69" stroke={PAL.signal} strokeWidth="2.8" />
      <text x="652" y="66" textAnchor="middle" fontSize="10" fontWeight="700" fill={PAL.signal}>
        RIGHTS BREACH
      </text>
      <text x="652" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.signal}>
        VERDICT: HALT
      </text>

      {/* Optical lens 3 (lower right) & Virtue Ethics Instrument */}
      <g stroke={PAL.ink} strokeWidth="1.4">
        <line x1="458" y1="132" x2="522" y2="164" stroke={PAL.signal} strokeWidth="2" strokeDasharray="4 3" />
        <ellipse cx="490" cy="148" rx="6.5" ry="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <polygon points="526,166 519,159 516,166" fill={PAL.signal} />
      </g>
      <Key x={642} y={124} anchor="middle" fill={PAL.ink2}>
        3 · VIRTUE ETHICS (CHARACTER)
      </Key>
      <IsoBlock
        x={532}
        y={196}
        w={204}
        d={18}
        h={48}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Plumb line deflected off vertical */}
      <line x1="558" y1="154" x2="558" y2="188" stroke={PAL.ink3} strokeWidth="1.2" strokeDasharray="2 2" />
      <line x1="558" y1="154" x2="572" y2="182" stroke={PAL.signal} strokeWidth="2" />
      <circle cx="572" cy="184" r="4.2" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.2" />
      <text x="654" y="168" textAnchor="middle" fontSize="10" fontWeight="700" fill={PAL.signal}>
        LOOPHOLE HABIT
      </text>
      <text x="654" y="184" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.signal}>
        VERDICT: REJECT
      </text>
    </Frame>
  );
}

/**
 * Slide 5 — Consequentialism and Market Welfare:
 * Interactive 3D quantitative welfare distribution & objective-function chart
 * (no tabletop slab, no people):
 * Left: 3D Objective Function block optimizing average surplus.
 * Right: 3D zero-welfare datum plane where "By segment" reveals three majority
 * strata rising above the plane in verdigris while the excluded minority
 * stratum plunges below the datum plane in red; "Aggregate" pools them into a
 * single tall verdigris average bar that hides the minority harm.
 */
export function IsoWelfareTradeoff() {
  const [view, setView] = useState<"segment" | "aggregate">("segment");
  const showSegment = view === "segment";

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`3D quantitative welfare chart of consequentialist optimization: on the left, an objective-function curve reaches a maximum; on the right, ${showSegment ? "three majority segment columns rise above the zero-welfare datum plane in verdigris while the excluded minority segment column plunges below the datum plane in red" : "all segments are pooled into a single tall verdigris average-surplus column that masks the harmed minority group"}.`}
      >
        {/* Left: 3D Objective Function Plinth */}
        <Key x={136} y={24} anchor="middle" fill={PAL.ink2}>
          OBJECTIVE FUNCTION
        </Key>
        <IsoBlock
          x={48}
          y={172}
          w={156}
          d={28}
          h={96}
          topFill={PAL.slabTop}
          leftFill={PAL.paper}
          rightFill={PAL.slabLeft}
        />
        {/* Axes & rising optimization curve on front face */}
        <line x1="68" y1="154" x2="184" y2="154" stroke={PAL.ink3} strokeWidth="1.3" />
        <line x1="68" y1="154" x2="68" y2="92" stroke={PAL.ink3} strokeWidth="1.3" />
        <path
          d="M 72 148 Q 108 142 132 114 T 178 96"
          fill="none"
          stroke={PAL.counter}
          strokeWidth="2.6"
        />
        <circle cx="178" cy="96" r="4.2" fill={PAL.counter} />
        <text x="126" y="192" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.ink3}>
          MAXIMIZE MEAN SURPLUS
        </text>

        {/* Connector arrow from Objective Function to Welfare Distribution */}
        <line x1="232" y1="126" x2="278" y2="126" stroke={PAL.ink2} strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="284,126 276,122 276,130" fill={PAL.ink2} />

        {/* Negative column rendered BEFORE the datum beam so it hangs cleanly underneath it */}
        {showSegment ? (
          <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
            <polygon points="618,184 686,184 686,132 618,132" fill={PAL.signal} />
            <polygon points="686,184 704.72,170.48 704.72,118.48 686,132" fill={PAL.signalMid} />
          </g>
        ) : (
          <rect
            x="618"
            y="132"
            width="68"
            height="52"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />
        )}

        {/* Right: 3D Zero-Welfare Datum Beam (front bottom y=132, front top y=124) */}
        <IsoBlock
          x={296}
          y={132}
          w={436}
          d={26}
          h={8}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        <text x="772" y="114" textAnchor="end" fontSize="9" fontWeight="700" fill={PAL.ink3}>
          0 DATUM
        </text>

        {showSegment ? (
          <>
            <Key x={442} y={24} anchor="middle" fill={PAL.counter}>
              MAJORITY SEGMENTS (+SURPLUS)
            </Key>
            {[
              { x: 320, h: 52, label: "SEG A (+19%)" },
              { x: 410, h: 62, label: "SEG B (+22%)" },
              { x: 500, h: 46, label: "SEG C (+16%)" },
            ].map((b) => (
              <g key={b.x}>
                <IsoBlock
                  x={b.x}
                  y={124}
                  w={56}
                  d={26}
                  h={b.h}
                  topFill={PAL.counterLight}
                  leftFill={PAL.counter}
                  rightFill={PAL.counterMid}
                />
                <text
                  x={b.x + 28}
                  y={152}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill={PAL.counter}
                >
                  {b.label}
                </text>
              </g>
            ))}

            {/* Labels for Minority segment column plunging below the datum beam */}
            <Key x={662} y={24} anchor="middle" fill={PAL.signal}>
              EXCLUDED MINORITY (−HARM)
            </Key>
            <text
              x="652"
              y="162"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={PAL.paper}
            >
              −42%
            </text>
            <text
              x="652"
              y="202"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={PAL.signal}
            >
              NO CREDIT OFFER
            </text>
          </>
        ) : (
          <>
            <Key x={524} y={24} anchor="middle" fill={PAL.counter}>
              POOLED AGGREGATE METRIC · +14% NET SURPLUS (MINORITY HARM MASKED)
            </Key>
            <IsoBlock
              x={388}
              y={124}
              w={216}
              d={26}
              h={68}
              topFill={PAL.counterLight}
              leftFill={PAL.counter}
              rightFill={PAL.counterMid}
            />
            <text
              x="496"
              y="94"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={PAL.paper}
            >
              +14% MEAN SURPLUS
            </text>
            <text
              x="652"
              y="162"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              fill={PAL.signal}
            >
              MASKED
            </text>
          </>
        )}
      </Frame>
      <Segmented
        label="Evaluation lens"
        options={[
          { id: "segment", label: "By segment (reveals excluded minority)" },
          { id: "aggregate", label: "Aggregate average only (masks harm)" },
        ]}
        value={view}
        onChange={setView}
      />
    </div>
  );
}

/**
 * Slide 6 — Deontology, Rights, and Duties:
 * Macro 3D mechanical hard-stop interlock (no tabletop slab, no people):
 * Left: a fabricated 5-star review card & conversion profit stack driving a
 * red coercive spring-plunger.
 * Center: a heavy 3D verdigris Deontological Constraint Deadbolt dropped into
 * a lock channel, physically arresting the coercive plunger regardless of profit.
 * Right: an uncoerced 3D Informed-Consent Disclosure & Autonomous Choice dial.
 */
export function IsoDeontologicalDuty() {
  return (
    <Frame
      width={800}
      height={215}
      label="3D mechanical interlock diagram of deontological duty: on the left, a fabricated 5-star review block and conversion coin stack drive a red coercive plunger; in the center, a heavy verdigris deontological deadbolt drops into a lock channel to halt the coercion regardless of profit; on the right stands an uncoerced informed-consent ledger and autonomous choice dial."
    >
      {/* Left: Manipulative interface + fabricated review + conversion profit */}
      <Key x={188} y={24} anchor="middle" fill={PAL.signal}>
        FABRICATED REVIEW &amp; COERCIVE BAIT
      </Key>

      {/* Conversion profit coins generated by manipulation */}
      <IsoCoinStack x={74} y={168} n={7} />
      <text x="74" y="188" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink3}>
        +PROFIT
      </text>

      {/* 3D Manipulative Interface / Fake Review Block */}
      <IsoBlock
        x={124}
        y={168}
        w={136}
        d={26}
        h={78}
        topFill={PAL.signalLight}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
        stroke={PAL.signal}
      />
      <text
        x="192"
        y="114"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
        fill={PAL.signal}
      >
        FAKE 5★ REVIEW
      </text>
      <line x1="146" y1="128" x2="238" y2="128" stroke={PAL.signal} strokeWidth="2" />
      <line x1="154" y1="138" x2="230" y2="138" stroke={PAL.ink3} strokeWidth="1.6" />
      <text x="192" y="154" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink2}>
        HIDDEN COERCION
      </text>

      {/* Spring-loaded red coercive plunger rod pushing right, stopped dead against the bolt */}
      <g stroke={PAL.signal} strokeWidth="2.4" fill="none">
        <line x1="278.72" y1="122" x2="376" y2="122" strokeWidth="4" />
        {/* Coil spring loops around the shaft */}
        <path d="M 294 114 L 302 130 L 312 114 L 322 130 L 332 114 L 342 130" strokeWidth="1.8" />
        {/* Flat impact head slamming into the verdigris deadbolt */}
        <rect x="372" y="108" width="8" height="28" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.4" />
      </g>

      {/* Center: Heavy 3D Deontological Hard-Stop Deadbolt */}
      <Key x={400} y={24} anchor="middle" fill={PAL.counter} size={9.5}>
        INVIOLABLE CONSTRAINT
      </Key>
      {/* Heavy vertical verdigris deadbolt arresting the coercive plunger */}
      <IsoBlock
        x={380}
        y={176}
        w={44}
        d={30}
        h={112}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text
        x="402"
        y="116"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fill={PAL.paper}
      >
        HARD
      </text>
      <text
        x="402"
        y="130"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fill={PAL.paper}
      >
        STOP
      </text>

      {/* Right: Protected Informed-Consent Tablet & Autonomous Decision Dial */}
      <Key x={636} y={24} anchor="middle" fill={PAL.counter} size={9.5}>
        INFORMED CONSENT &amp; AUTONOMY
      </Key>
      <IsoBlock
        x={504}
        y={176}
        w={216}
        d={28}
        h={88}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Clear disclosure checklist on left half of tablet */}
      <line x1="528" y1="110" x2="602" y2="110" stroke={PAL.counter} strokeWidth="2.2" />
      <line x1="528" y1="124" x2="594" y2="124" stroke={PAL.ink2} strokeWidth="1.8" />
      <line x1="528" y1="138" x2="586" y2="138" stroke={PAL.ink3} strokeWidth="1.6" />
      <text x="564" y="160" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        TRUE DISCLOSURE
      </text>

      {/* Uncoerced autonomous rotary selector dial on right half of tablet */}
      <circle cx="668" cy="122" r="20" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.8" />
      <line x1="668" y1="122" x2="679" y2="108" stroke={PAL.ink} strokeWidth="2.4" />
      <circle cx="668" cy="122" r="3.8" fill={PAL.ink} />
      <text x="668" y="160" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink2}>
        BUYER AUTONOMY
      </text>
    </Frame>
  );
}

/**
 * Slide 7 — Virtue Ethics and Institutional Character:
 * 3D architectural masonry cross-section (no tabletop slab, no people):
 * Left: Loophole compliance — two separated regulation blocks leave an
 * unaddressed gap ("loophole"), and an AI module is engineered to thread a
 * red extraction hook right through that gap.
 * Right: Institutional character — two solid masonry piers bridged by a
 * verdigris Keystone and true vertical plumb-bob (Honesty, Trust, Care) that
 * governs ambiguous spaces before regulations even close them.
 */
export function IsoVirtueCharacter() {
  return (
    <Frame
      width={800}
      height={215}
      label="3D architectural masonry comparison: on the left, a glass AI module threads a red hook through a narrow loophole gap between two regulation blocks to extract coins; on the right, two masonry piers are bridged by a solid verdigris keystone and central plumb-bob representing institutional trustworthiness, honesty, and care."
    >
      {/* Left: Exploiting a regulatory loophole gap */}
      <Key x={196} y={24} anchor="middle" fill={PAL.signal}>
        LETTER OF THE LAW · EXPLOITING LOOPHOLES
      </Key>

      {/* Glass AI module engineered to aim at the gap */}
      <GlassCube
        x={48}
        y={164}
        w={64}
        d={38}
        h={68}
        outside={
          <g>
            <ellipse cx="139.36" cy="110" rx="3.5" ry="5.5" fill={PAL.ink} />
            {/* Red hook threading straight through the open loophole gap (y=110) */}
            <line x1="139.36" y1="110" x2="294" y2="110" stroke={PAL.signal} strokeWidth="3.4" />
            <path
              d="M 294 110 C 306 110, 306 124, 294 124"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.8"
            />
          </g>
        }
      >
        <circle cx="90" cy="116" r="14" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <circle cx="90" cy="116" r="4" fill={PAL.signal} />
        <line x1="104" y1="114" x2="139.36" y2="110" stroke={PAL.signal} strokeWidth="2.8" />
      </GlassCube>

      {/* Split regulation wall with a wide daylight loophole gap (y=92 to y=126.5) */}
      <IsoBlock
        x={188}
        y={176}
        w={54}
        d={26}
        h={36}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoBlock
        x={188}
        y={92}
        w={54}
        d={26}
        h={34}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <text x="215" y="79" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        RULE A
      </text>
      <text x="215" y="162" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        RULE B
      </text>
      <text x="215" y="196" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.signal}>
        LOOPHOLE GAP
      </text>

      {/* Extracted customer coins on the far side of the loophole */}
      <IsoCoinStack x={324} y={168} n={5} signal />

      {/* Center vertical divider */}
      <line
        x1="392"
        y1="20"
        x2="392"
        y2="196"
        stroke={PAL.rule}
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />

      {/* Right: Institutional Character — Keystone Arch & Plumb Line */}
      <Key x={596} y={24} anchor="middle" fill={PAL.counter}>
        INSTITUTIONAL CHARACTER · TRUST, HONESTY &amp; CARE
      </Key>

      {/* Left & Right load-bearing masonry piers */}
      <IsoBlock
        x={456}
        y={176}
        w={56}
        d={30}
        h={74}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <IsoBlock
        x={644}
        y={176}
        w={56}
        d={30}
        h={74}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />

      {/* Spanning Verdigris Keystone Lintel bridging the ambiguous space */}
      <IsoBlock
        x={444}
        y={102}
        w={268}
        d={30}
        h={30}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text
        x="578"
        y="91"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.08em"
        fill={PAL.paper}
      >
        ETHICAL ENGINEERING NORMS
      </text>

      {/* True vertical plumb-bob suspended in the center of the arch */}
      <g stroke={PAL.ink} strokeWidth="1.4">
        <line x1="578" y1="102" x2="578" y2="144" stroke={PAL.counter} strokeWidth="2" />
        <polygon
          points="570,144 586,144 578,162"
          fill={PAL.counter}
          stroke={PAL.ink}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <line x1="554" y1="170" x2="602" y2="170" stroke={PAL.counter} strokeWidth="2" />
      </g>
      <text x="578" y="196" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        TRUE PLUMB IN AMBIGUOUS CASES
      </text>
    </Frame>
  );
}

/**
 * Slide 9 — Part 2: Stakeholders and Accountability Across the AI Value Chain:
 * A 3D Vertical Exploded System Assembly (no tabletop slab, no people):
 * Three floating 3D horizontal strata separated along four dashed vertical
 * alignment pins:
 * - Bottom stratum: 01 Foundation Model Weights & Pre-Training Corpus
 * - Middle stratum: 02 Deploying Firm Prompt & Workflow Configuration
 * - Top stratum: 03 Marketplace Interface & Consumer Decision Output
 * A red fault seam propagates vertically through all three separated layers.
 */
export function IsoFragmentedChain() {
  return (
    <Frame
      width={800}
      height={210}
      label="3D exploded vertical assembly of the AI value chain: three horizontal 3D system strata—foundation model weights at the bottom, deploying firm configuration in the middle, and marketplace interface at the top—float apart along dashed alignment pins, showing a red fault seam propagating upward through all three layers."
    >
      {/* Left labels for each exploded layer */}
      <Key x={248} y={64} anchor="end" fill={PAL.signal} size={9.5}>
        03 · MARKETPLACE INTERFACE
      </Key>
      <Key x={248} y={122} anchor="end" fill={PAL.counter} size={9.5}>
        02 · DEPLOYER WORKFLOW
      </Key>
      <Key x={248} y={180} anchor="end" fill={PAL.ink2} size={9.5}>
        01 · FOUNDATION WEIGHTS
      </Key>

      {/* Four vertical dashed explode-alignment axes */}
      <g stroke={PAL.ink3} strokeWidth="1.3" strokeDasharray="3 3">
        <line x1="278" y1="68" x2="278" y2="180" />
        <line x1="504" y1="68" x2="504" y2="180" />
        <line x1="316" y1="42" x2="316" y2="154" />
        <line x1="542" y1="42" x2="542" y2="154" />
      </g>

      {/* Layer 1 (Bottom): Foundation Model Weights Slab */}
      <IsoBlock
        x={264}
        y={194}
        w={256}
        d={48}
        h={16}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      {/* Latent bias/fault node embedded in Layer 1 top face */}
      <ellipse cx="448" cy="166" rx="16" ry="6" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
      <circle cx="448" cy="166" r="3.5" fill={PAL.signal} />

      {/* Vertical fault propagation vector from Layer 1 to Layer 2 */}
      <line x1="448" y1="160" x2="448" y2="128" stroke={PAL.signal} strokeWidth="2.4" strokeDasharray="3 2" />

      {/* Layer 2 (Middle): Deploying Firm Fine-Tuning & Prompt Gasket */}
      <IsoBlock
        x={264}
        y={136}
        w={256}
        d={48}
        h={14}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <ellipse cx="448" cy="110" rx="16" ry="6" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
      <circle cx="448" cy="110" r="3.5" fill={PAL.signal} />

      {/* Vertical fault propagation vector from Layer 2 to Layer 3 */}
      <line x1="448" y1="104" x2="448" y2="72" stroke={PAL.signal} strokeWidth="2.4" strokeDasharray="3 2" />

      {/* Layer 3 (Top): Translucent Glass Marketplace & Consumer Decision Layer */}
      <GlassCube
        x={264}
        y={78}
        w={256}
        d={48}
        h={14}
        outside={
          <g>
            {/* Fault node emerging on top face of Layer 3 (top face spans y=39.04..64) */}
            <ellipse cx="448" cy="52" rx="18" ry="6.5" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
            <circle cx="448" cy="52" r="4.5" fill={PAL.signal} />
          </g>
        }
      >
        <line x1="304" y1="52" x2="404" y2="52" stroke={PAL.ink2} strokeWidth="2" />
      </GlassCube>

      {/* Right callout bracket showing fragmented vs assigned stage-by-stage accountability */}
      <g stroke={PAL.signal} strokeWidth="1.8" fill="none">
        <path d="M 564 50 H 582 V 172 H 564" />
        <line x1="564" y1="110" x2="582" y2="110" />
      </g>
      <Key x={596} y={98} anchor="start" fill={PAL.signal}>
        SHARED CAUSAL PATH
      </Key>
      <Key x={596} y={118} anchor="start" fill={PAL.ink2} size={9.5}>
        REQUIRES STAGE-BY-STAGE
      </Key>
      <Key x={596} y={134} anchor="start" fill={PAL.ink2} size={9.5}>
        GOVERNANCE ASSIGNMENTS
      </Key>
    </Frame>
  );
}

/**
 * Slide 10 — The AI Value Chain in Commercial Markets:
 * Interactive 3D Five-Module Value-Chain Conduit (no tabletop slab, no people):
 * Five distinct 3D engineering modules coupled in sequence:
 * (01) Pre-trained Weight Drum & API Flange,
 * (02) Deployer Prompt & Fine-Tuning Cartridge,
 * (03) Platform Ranking & Ad-Auction Sieve (GlassCube),
 * (04) Consumer Price & Eligibility Decision Tray,
 * (05) Regulator & Auditor Statutory Inspection Scope overhanging the chain.
 */
export function IsoValueChainFiveActors() {
  const [stage, setStage] = useState<"all" | "1" | "2" | "3" | "4" | "5">("all");
  const isLit = (s: "1" | "2" | "3" | "4" | "5") => stage === "all" || stage === s;

  return (
    <div>
      <Frame
        width={800}
        height={210}
        label="3D five-module value-chain conduit: (01) foundation developer weight cylinder and API flange, (02) deploying firm prompt and workflow cartridge, (03) digital platform ranking and auction glass cube, (04) consumer price and eligibility decision tray, and (05) regulator statutory audit scope with an inspection feedback loop."
      >
        {/* Stage 1: Foundation model developer — 3D Weight Drum & API Flange */}
        <g opacity={isLit("1") ? 1 : 0.35}>
          <Key x={98} y={32} anchor="middle" fill={stage === "1" ? PAL.signal : PAL.ink2} size={9.5}>
            01 · DEVELOPER
          </Key>
          <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
            <path d="M 52 96 V 162 A 38 12 0 0 0 128 162 V 96 Z" fill={PAL.slabLeft} />
            <ellipse cx="90" cy="96" rx="38" ry="12" fill={PAL.slabTop} />
            <ellipse cx="90" cy="96" rx="18" ry="5.5" fill={PAL.paper} />
          </g>
          <text x="90" y="132" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink}>
            WEIGHTS
          </text>
          <text x="90" y="146" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
            &amp; API
          </text>
          <line x1="132" y1="128" x2="174" y2="128" stroke={PAL.ink2} strokeWidth="2.4" />
          <polygon points="180,128 172,124 172,132" fill={PAL.ink2} />
        </g>

        {/* Stage 2: Downstream deploying firm — 3D Prompt & Workflow Cartridge */}
        <g opacity={isLit("2") ? 1 : 0.35}>
          <Key x={236} y={32} anchor="middle" fill={stage === "2" ? PAL.signal : PAL.ink2} size={9.5}>
            02 · DEPLOYER
          </Key>
          <IsoBlock
            x={186}
            y={166}
            w={82}
            d={26}
            h={64}
            topFill={PAL.slabTop}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <line x1="202" y1="120" x2="252" y2="120" stroke={PAL.ink} strokeWidth="2" />
          <line x1="202" y1="132" x2="244" y2="132" stroke={PAL.counter} strokeWidth="2" />
          <text x="227" y="152" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
            FINE-TUNE
          </text>
          <line x1="292" y1="128" x2="330" y2="128" stroke={PAL.ink2} strokeWidth="2.4" />
          <polygon points="336,128 328,124 328,132" fill={PAL.ink2} />
        </g>

        {/* Stage 3: Digital platform marketplace — Translucent Ranking & Auction Cube */}
        <g opacity={isLit("3") ? 1 : 0.35}>
          <Key x={392} y={32} anchor="middle" fill={stage === "3" ? PAL.signal : PAL.ink2} size={9.5}>
            03 · PLATFORM
          </Key>
          <GlassCube
            x={342}
            y={166}
            w={74}
            d={36}
            h={64}
            outside={
              <g>
                <ellipse cx="441.92" cy="128" rx="3.5" ry="5" fill={PAL.ink} />
                <line x1="441.92" y1="128" x2="480" y2="128" stroke={PAL.signal} strokeWidth="2.4" />
                <polygon points="486,128 478,124 478,132" fill={PAL.signal} />
              </g>
            }
          >
            {/* Ranked auction slots inside platform cube */}
            <rect x="358" y="114" width="38" height="8" fill={PAL.signal} />
            <rect x="358" y="128" width="28" height="8" fill={PAL.ink2} />
            <rect x="358" y="142" width="20" height="8" fill={PAL.ink3} />
          </GlassCube>
        </g>

        {/* Stage 4: Consumers and bystanders — Downstream Outcome Ledger & Coin Stack */}
        <g opacity={isLit("4") ? 1 : 0.35}>
          <Key x={542} y={32} anchor="middle" fill={PAL.signal} size={9.5}>
            04 · CONSUMER
          </Key>
          <IsoBlock
            x={492}
            y={166}
            w={82}
            d={26}
            h={54}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <text x="533" y="134" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            PRICE &amp;
          </text>
          <text x="533" y="148" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            ACCESS
          </text>
          <line x1="598" y1="128" x2="634" y2="128" stroke={PAL.counter} strokeWidth="2.2" strokeDasharray="4 3" />
          <polygon points="640,128 632,124 632,132" fill={PAL.counter} />
        </g>

        {/* Stage 5: Regulators, auditors, civil society — Statutory Audit Monument & Feedback Arch */}
        <g opacity={isLit("5") ? 1 : 0.35}>
          <Key x={696} y={32} anchor="middle" fill={PAL.counter} size={9.5}>
            05 · REGULATOR
          </Key>
          <IsoBlock
            x={646}
            y={166}
            w={82}
            d={26}
            h={68}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <text x="687" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            STATUTORY
          </text>
          <text x="687" y="142" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            ENFORCEMENT
          </text>
          {/* Bottom regulatory feedback loop returning across the value chain */}
          <path
            d="M 687 172 L 687 194 L 227 194 L 227 174"
            fill="none"
            stroke={PAL.counter}
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <polygon points="227,168 223,176 231,176" fill={PAL.counter} />
        </g>
      </Frame>
      <Segmented
        label="Inspect value-chain actor"
        options={[
          { id: "all", label: "All 5 actors" },
          { id: "1", label: "01 Developer" },
          { id: "2", label: "02 Deploying firm" },
          { id: "3", label: "03 Platform" },
          { id: "4", label: "04 Consumer" },
          { id: "5", label: "05 Regulator" },
        ]}
        value={stage}
        onChange={setStage}
      />
    </div>
  );
}

/**
 * Slide 11 — The Problem of Many Hands:
 * Interactive diorama showing mutual finger-pointing between the Foundation
 * Model Developer and the Deploying Retailer, resolved by assigning legal and
 * managerial liability to the Deploying Firm that faces the customer.
 */
export function IsoManyHands() {
  const [mode, setMode] = useState<"blame" | "accountable">("blame");
  const blame = mode === "blame";

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Isometric tabletop diorama of the problem of many hands: on the left stands the model developer with a pre-trained glass cube; in the center stands the deploying retailer with its prompt station; on the right stands the harmed consumer. ${blame ? "Red arrows point in opposite directions as developer and retailer blame each other." : "A verdigris accountability boundary locks onto the deploying retailer that faces the customer in the market."}`}
      >
        <IsoBase w={800} />

        {/* Left: Model Developer + Pre-trained GlassCube */}
        <Key x={156} y={26} anchor="middle" fill={PAL.ink3}>
          MODEL DEVELOPER
        </Key>
        <IsoPerson
          x={92}
          y={148}
          scale={0.88}
          coat={PAL.ink2}
          coatShade={PAL.ink}
          skin={PAL.skin1}
          reach
        />
        <GlassCube
          x={142}
          y={148}
          w={56}
          d={40}
          h={56}
          outside={
            <g>
              <ellipse cx="226.8" cy="108" rx="3.5" ry="5.5" fill={PAL.ink} />
              <line x1="226.8" y1="108" x2="342" y2="108" stroke={PAL.ink3} strokeWidth="1.8" strokeDasharray="4 3" />
            </g>
          }
        >
          <circle cx="178" cy="110" r="12" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
          <circle cx="178" cy="110" r="4" fill={PAL.ink} />
          <line x1="190" y1="110" x2="226.8" y2="108" stroke={PAL.ink2} strokeWidth="2" />
        </GlassCube>

        {/* Center: Deploying Retailer + Customer-Facing System */}
        <Key
          x={418}
          y={26}
          anchor="middle"
          fill={blame ? PAL.ink3 : PAL.counter}
        >
          {blame ? "DEPLOYING RETAILER" : "DEPLOYING RETAILER · LIABLE TO CUSTOMER"}
        </Key>

        {!blame && (
          <polygon
            points="324,158 368,126 520,126 476,158"
            fill={PAL.counterLight}
            stroke={PAL.counter}
            strokeWidth="2.2"
          />
        )}

        <IsoBlock
          x={352}
          y={148}
          w={56}
          d={34}
          h={44}
          topFill={blame ? PAL.paper : PAL.counterLight}
          leftFill={blame ? PAL.slabLeft : PAL.counter}
          rightFill={blame ? PAL.slabRight : PAL.counterMid}
        />
        <IsoPerson
          x={468}
          y={148}
          scale={0.88}
          flip
          coat={blame ? PAL.ink2 : PAL.counter}
          coatShade={blame ? PAL.ink : PAL.counterMid}
          skin={PAL.skin2}
          reach
        />

        {/* Mutual blame arrows vs Resolved accountability link */}
        {blame ? (
          <g>
            {/* Developer blames Retailer's prompt (top arrow, clear of cube back-right x=226.8) */}
            <path
              d="M 236 52 L 352 52"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.2"
            />
            <polygon points="358,52 350,48 350,56" fill={PAL.signal} />
            <Key x={296} y={43} anchor="middle" fill={PAL.signal} size={9.5}>
              &ldquo;RETAILER PROMPT&rdquo;
            </Key>

            {/* Retailer blames Developer's weights (lower arrow, clear of cube) */}
            <path
              d="M 358 68 L 242 68"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.2"
            />
            <polygon points="236,68 244,64 244,72" fill={PAL.signal} />
            <Key x={296} y={82} anchor="middle" fill={PAL.signal} size={9.5}>
              &ldquo;MODEL WEIGHTS&rdquo;
            </Key>
          </g>
        ) : (
          <g>
            {/* Accountable remedy line from Deploying Retailer to Consumer */}
            <path
              d="M 468 58 L 642 58"
              fill="none"
              stroke={PAL.counter}
              strokeWidth="2.4"
            />
            <polygon points="648,58 640,54 640,62" fill={PAL.counter} />
            <Key x={556} y={48} anchor="middle" fill={PAL.counter} size={9.5}>
              DIRECT MARKET ACCOUNTABILITY
            </Key>
          </g>
        )}

        {/* Line from Deploying Retailer to Market Outcome */}
        <line x1="492" y1="126" x2="580" y2="126" stroke={PAL.signal} strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="586,126 578,122 578,130" fill={PAL.signal} />

        {/* Right: Biased output & Harmed Consumer */}
        <Key x={644} y={26} anchor="middle" fill={PAL.signal}>
          BIASED OUTCOME
        </Key>
        <IsoBlock
          x={588}
          y={150}
          w={30}
          d={24}
          h={34}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />
        <IsoPerson
          x={678}
          y={148}
          scale={0.88}
          flip
          coat={PAL.signal}
          coatShade={PAL.signalMid}
          skin={PAL.skin3}
        />
      </Frame>
      <Segmented
        label="Governance state"
        options={[
          { id: "blame", label: "Problem of many hands (mutual blame)" },
          { id: "accountable", label: "Accountable governance (deployer liable)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Slide 12 — Allocating Accountability Across Stakeholders:
 * Four 3D tactile governance artifacts (no tabletop slab, no people):
 * (1) Model Developer: 3D tabbed Model Documentation Dossier disclosing data limits & failure modes.
 * (2) Deploying Firm: 3D Task-Validation & Segment-Monitoring Console.
 * (3) Platform: 3D Search-Ranking Slate with explicit SPONSORED badge.
 * (4) Auditor & Ethics Board: 3D Conflict-of-Interest Firewall & Verification Stamp.
 */
export function IsoAccountabilityDossiers() {
  return (
    <Frame
      width={800}
      height={205}
      label="Four 3D governance artifacts for stakeholder accountability: (1) a developer model-documentation binder disclosing data limits and failure modes, (2) a deploying firm task-validation and segment-monitoring gauge, (3) a platform ranking slate with a clear SPONSORED disclosure tag, and (4) an independent auditor stamp separated by a conflict-of-interest firewall."
    >
      {/* 1. Foundation model developer: 3D Model Card & Failure-Mode Dossier */}
      <Key x={114} y={24} anchor="middle" fill={PAL.ink2} size={9.5}>
        01 · MODEL DOCUMENTATION
      </Key>
      <IsoBlock
        x={48}
        y={168}
        w={116}
        d={28}
        h={84}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Binder spine & disclosed failure-mode callout */}
      <rect x="48" y="84" width="12" height="84" fill={PAL.ink2} stroke={PAL.ink} strokeWidth="1.3" />
      <text x="112" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink}>
        DATA LIMITS
      </text>
      <line x1="74" y1="116" x2="148" y2="116" stroke={PAL.ink3} strokeWidth="1.6" />
      <rect x="72" y="128" width="78" height="24" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.4" />
      <text x="111" y="144" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
        FAILURE MODES
      </text>

      {/* 2. Deploying firm: 3D Task Validation & Segment Monitoring Console */}
      <Key x={306} y={24} anchor="middle" fill={PAL.signal} size={9.5}>
        02 · TASK &amp; SEGMENT VALIDATION
      </Key>
      <IsoBlock
        x={236}
        y={168}
        w={120}
        d={28}
        h={84}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Segment outcome bars + human oversight indicator */}
      <rect x="256" y="114" width="18" height="36" fill={PAL.counter} stroke={PAL.ink} strokeWidth="1.2" />
      <rect x="282" y="118" width="18" height="32" fill={PAL.counter} stroke={PAL.ink} strokeWidth="1.2" />
      <circle cx="328" cy="126" r="14" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
      <path d="M 323 126 L 327 130 L 334 122" fill="none" stroke={PAL.counter} strokeWidth="2" />
      <text x="296" y="104" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        SEGMENT PARITY
      </text>

      {/* 3. Platform: 3D Marketplace Ranking & Sponsorship Disclosure Slate */}
      <Key x={498} y={24} anchor="middle" fill={PAL.ink2} size={9.5}>
        03 · CLEAR AD DISCLOSURE
      </Key>
      <IsoBlock
        x={428}
        y={168}
        w={120}
        d={28}
        h={84}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <rect x="444" y="96" width="88" height="22" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.5" />
      <text
        x="488"
        y="111"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="0.08em"
        fill={PAL.counter}
      >
        SPONSORED TAG
      </text>
      <rect x="444" y="126" width="88" height="14" fill={PAL.slabTop} stroke={PAL.ink3} strokeWidth="1.2" />
      <rect x="444" y="146" width="88" height="14" fill={PAL.slabTop} stroke={PAL.ink3} strokeWidth="1.2" />

      {/* 4. Auditor & ethics board: 3D Conflict-of-Interest Firewall & Seal */}
      <Key x={686} y={24} anchor="middle" fill={PAL.counter} size={9.5}>
        04 · INDEPENDENT AUDIT
      </Key>
      {/* Conflict-of-interest firewall wall */}
      <IsoBlock
        x={612}
        y={168}
        w={22}
        d={32}
        h={92}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      {/* Independent audit report & stamp block */}
      <IsoBlock
        x={660}
        y={168}
        w={84}
        d={28}
        h={74}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <circle cx="702" cy="122" r="14" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
      <circle cx="702" cy="122" r="5" fill={PAL.counter} />
      <text x="702" y="154" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.counter}>
        VERIFIED
      </text>
    </Frame>
  );
}

/**
 * Slide 13 — Discussion: When a Pricing Model Discriminates:
 * 3D Claim-Narrative Dossiers & NLP Disparity Columns (no tabletop slab, no people):
 * Left: two identical 3D claim folders with identical 3-coin loss stacks
 * (Native vs Non-Native narrative).
 * Center: licensed third-party LLM summarizer GlassCube.
 * Right: 1x vs 2x fraud-flag rate columns.
 */
export function IsoInsuranceClaims() {
  return (
    <Frame
      width={400}
      height={215}
      label="3D diagram of insurance claim screening disparity: on the left, two identical claim folders with matching 3-coin loss stacks (native and non-native English narratives) enter a licensed third-party glass AI cube, which outputs a 2x red fraud-investigation column for non-native claims versus a 1x baseline column."
    >
      <Key x={86} y={24} anchor="middle" fill={PAL.ink2} size={9.5}>
        IDENTICAL LOSS CLAIMS
      </Key>

      {/* Upper dossier: Native speaker claim + 3-coin loss stack */}
      <IsoBlock
        x={28}
        y={104}
        w={78}
        d={18}
        h={32}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <text x="67" y="92" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.counter}>
        NATIVE
      </text>
      <IsoCoinStack x={134} y={102} n={3} />

      {/* Lower dossier: Non-native speaker claim + identical 3-coin loss stack */}
      <IsoBlock
        x={28}
        y={172}
        w={78}
        d={18}
        h={32}
        topFill={PAL.signalLight}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
        stroke={PAL.signal}
      />
      <text x="67" y="160" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
        NON-NATIVE
      </text>
      <IsoCoinStack x={134} y={170} n={3} />

      {/* Feed arrows into 3rd-party foundation model cube */}
      <line x1="150" y1="92" x2="174" y2="108" stroke={PAL.counter} strokeWidth="1.8" />
      <line x1="150" y1="158" x2="174" y2="138" stroke={PAL.signal} strokeWidth="1.8" />

      {/* Center: Licensed 3rd-party foundation model GlassCube */}
      <GlassCube
        x={178}
        y={162}
        w={58}
        d={36}
        h={64}
        outside={
          <g>
            <ellipse cx="261.92" cy="118" rx="3.5" ry="5" fill={PAL.ink} />
            <line x1="261.92" y1="118" x2="284" y2="118" stroke={PAL.ink2} strokeWidth="2.2" />
          </g>
        }
      >
        <line x1="192" y1="112" x2="224" y2="112" stroke={PAL.ink} strokeWidth="2" />
        <line x1="192" y1="122" x2="220" y2="122" stroke={PAL.signal} strokeWidth="2.2" />
        <line x1="192" y1="132" x2="216" y2="132" stroke={PAL.ink3} strokeWidth="1.6" />
        <line x1="224" y1="120" x2="261.92" y2="118" stroke={PAL.ink2} strokeWidth="2" />
      </GlassCube>
      <text x="214" y="186" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink3}>
        3RD-PARTY LLM
      </text>

      <Key x={324} y={24} anchor="middle" fill={PAL.signal} size={9}>
        FRAUD FLAG RATE
      </Key>

      {/* 1x baseline flag column */}
      <IsoBlock
        x={290}
        y={170}
        w={28}
        d={22}
        h={38}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <Key x={310} y={112} anchor="middle" fill={PAL.counter} size={10.5}>
        1×
      </Key>

      {/* 2x non-native flag column (twice the height) */}
      <IsoBlock
        x={338}
        y={170}
        w={28}
        d={22}
        h={76}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <Key x={358} y={74} anchor="middle" fill={PAL.signal} size={10.5}>
        2×
      </Key>
    </Frame>
  );
}

/**
 * Slide 14 — Part 3: The Governance Gap Between Benchmarks and Markets:
 * 3D Bell-Jar Leaderboard Trophy vs Fractured Market Bridge Span (no tabletop slab):
 * Left: a 96.4% #1 leaderboard trophy pedestal sheltered inside a static glass
 * bell jar.
 * Right: the same model block placed as a load-bearing bridge span across a
 * real-world market chasm, fracturing under real market stresses.
 */
export function IsoBenchmarkGap() {
  return (
    <Frame
      width={800}
      height={215}
      label="3D architectural comparison of the benchmark-to-market governance gap: on the left, a model block rests atop a 96% first-place leaderboard podium sheltered inside a static glass bell jar; on the right, the same model block spans a real-world market chasm and cracks under live market stress."
    >
      {/* Left: Sheltered Static Leaderboard Podium & Translucent Bell Jar */}
      <Key x={188} y={24} anchor="middle" fill={PAL.counter}>
        STATIC LEADERBOARD · SHELTERED LAB TEST
      </Key>

      {/* Stepped 3D podium base */}
      <IsoBlock
        x={76}
        y={178}
        w={196}
        d={36}
        h={18}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoBlock
        x={116}
        y={160}
        w={116}
        d={30}
        h={36}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="174" y="147" textAnchor="middle" fontSize="12" fontWeight="700" fill={PAL.paper}>
        RANK #1 · 96%
      </text>

      {/* Model core sitting on the #1 podium inside a protective translucent bell jar */}
      <IsoBlock
        x={156}
        y={114}
        w={48}
        d={20}
        h={24}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <g stroke={PAL.ink} strokeWidth="1.4">
        <path
          d="M 126 116 V 76 A 58 32 0 0 1 242 76 V 116"
          fill={PAL.paper}
          fillOpacity="0.42"
        />
        <ellipse cx="184" cy="116" rx="58" ry="8" fill="none" stroke={PAL.ink3} strokeDasharray="4 3" />
        <circle cx="184" cy="40" r="4.5" fill={PAL.slabLeft} />
      </g>

      {/* Center vertical divider */}
      <line
        x1="376"
        y1="20"
        x2="376"
        y2="196"
        stroke={PAL.rule}
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />

      {/* Right: Real Market Deployment — Bridge Span Fracturing Over a Chasm */}
      <Key x={586} y={24} anchor="middle" fill={PAL.signal}>
        LIVE MARKET DEPLOYMENT · STRUCTURAL FAILURE
      </Key>

      {/* Left & Right chasm abutments */}
      <IsoBlock
        x={428}
        y={184}
        w={68}
        d={34}
        h={64}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoBlock
        x={664}
        y={184}
        w={68}
        d={34}
        h={64}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />

      {/* Model block used as a bridge beam across the chasm (x=472..688) */}
      <IsoBlock
        x={472}
        y={120}
        w={216}
        d={30}
        h={26}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />

      {/* Jagged structural fracture splitting the bridge beam in the center */}
      <path
        d="M 584 78 L 576 96 L 588 106 L 578 120"
        fill="none"
        stroke={PAL.ink}
        strokeWidth="2.6"
      />

      {/* Live market load arrows pressing down on the span */}
      <g stroke={PAL.signal} strokeWidth="2.2">
        <line x1="532" y1="48" x2="532" y2="74" />
        <polygon points="532,80 527,71 537,71" fill={PAL.signal} stroke="none" />
        <line x1="636" y1="48" x2="636" y2="74" />
        <polygon points="636,80 631,71 641,71" fill={PAL.signal} stroke="none" />
      </g>
      <text x="532" y="42" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
        BIAS &amp; FRAMING
      </text>
      <text x="636" y="42" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
        STRATEGIC SHIFT
      </text>

      <text x="580" y="168" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.signal}>
        UNVERIFIED IN REAL MARKETS
      </text>
    </Frame>
  );
}

/**
 * Slide 15 — Technical Benchmarks Versus Market Behavior:
 * Interactive 3D Stochastic Pin-Cascade (Galton Board) & Histogram Bins
 * (Wadi & Fredette, 2025) — no tabletop slab, no people:
 * Left: a 3D Prompt Hopper feeding a translucent Galton pin-cascade with a
 * tilting framing vane.
 * Right: a 3D three-bin histogram rack where repeated runs build up a
 * probability distribution that reverses when framing shifts.
 */
export function IsoProbabilisticRuns() {
  const [runs, setRuns] = useState(24);
  const [framing, setFraming] = useState<"standard" | "shifted">("standard");

  // Deterministic shares for the two framings so server and client match.
  const shares = framing === "standard" ? [0.58, 0.27, 0.15] : [0.18, 0.24, 0.58];
  const counts = [
    Math.max(runs === 1 ? (framing === "standard" ? 1 : 0) : Math.round(runs * shares[0]), 0),
    runs === 1 ? 0 : Math.round(runs * shares[1]),
    0,
  ];
  counts[2] = Math.max(0, runs - counts[0] - counts[1]);

  const slots = [
    { x: 372, label: "BRAND A · SLOT 1", count: counts[0], highlight: framing === "standard" },
    { x: 508, label: "BRAND B · SLOT 2", count: counts[1], highlight: false },
    { x: 644, label: "BRAND C · SLOT 3", count: counts[2], highlight: framing === "shifted" },
  ];

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`3D stochastic Galton pin-cascade and histogram across ${runs} repeated LLM runs under ${framing} framing: a prompt hopper feeds a translucent pin-cascade with a framing baffle on the left, distributing choices into three 3D brand histogram bins on the right (${counts[0]}, ${counts[1]}, and ${counts[2]} selections).`}
      >
        <Key x={756} y={204} anchor="end" fill={PAL.ink3} size={9}>
          SIMULATED · REPEATED PROMPT RUNS
        </Key>

        {/* Left: 3D Prompt Hopper & Translucent Stochastic Galton Cascade */}
        <Key x={156} y={24} anchor="middle" fill={PAL.ink2}>
          STOCHASTIC SAMPLING &amp; FRAMING BAFFLE
        </Key>

        {/* Translucent Galton Pin-Board Chamber */}
        <GlassCube
          x={84}
          y={178}
          w={128}
          d={34}
          h={94}
          outside={
            <g>
              {/* Top prompt hopper mounted ON TOP of the glass chamber's roof */}
              <IsoBlock
                x={116}
                y={76}
                w={68}
                d={20}
                h={22}
                topFill={PAL.slabTop}
                leftFill={PAL.paper}
                rightFill={PAL.slabLeft}
              />
              <text x="150" y="68" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink}>
                {`PROMPT × ${runs}`}
              </text>

              <ellipse cx="236.48" cy="136" rx="3.5" ry="5.5" fill={PAL.ink} />
              <line
                x1="236.48"
                y1="136"
                x2="314"
                y2="136"
                stroke={PAL.signal}
                strokeWidth="2.4"
                strokeDasharray="4 3"
              />
              <polygon points="320,136 312,132 312,140" fill={PAL.signal} />
            </g>
          }
        >
          {/* Tilting framing baffle vane at top of cascade */}
          <line
            x1="148"
            y1="96"
            x2={framing === "standard" ? 130 : 166}
            y2="114"
            stroke={PAL.signal}
            strokeWidth="3.2"
          />
          <circle cx="148" cy="96" r="4" fill={PAL.signal} />
          {/* 3 rows of Galton deflection pegs inside glass chamber */}
          {[124, 148, 172].map((px) => (
            <circle key={`r1-${px}`} cx={px} cy="126" r="3" fill={PAL.ink2} />
          ))}
          {[112, 136, 160, 184].map((px) => (
            <circle key={`r2-${px}`} cx={px} cy="144" r="3" fill={PAL.ink2} />
          ))}
          {[124, 148, 172].map((px) => (
            <circle key={`r3-${px}`} cx={px} cy="160" r="3" fill={PAL.ink2} />
          ))}
        </GlassCube>

        {/* Right: 3D Histogram Base Plinth & Three Brand Bins */}
        <IsoBlock
          x={336}
          y={178}
          w={404}
          d={34}
          h={14}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />

        {slots.map((slot) => {
          const barH = Math.max(12, Math.round(slot.count * 3.1));
          const topY = r2(164 - barH - 24 * 0.52);
          return (
            <g key={slot.label}>
              <Key
                x={slot.x + 28}
                y={24}
                anchor="middle"
                fill={slot.highlight ? PAL.signal : PAL.ink2}
                size={9.5}
              >
                {slot.label}
              </Key>
              <IsoBlock
                x={slot.x}
                y={164}
                w={46}
                d={24}
                h={barH}
                topFill={slot.highlight ? PAL.signalLight : PAL.counterLight}
                leftFill={slot.highlight ? PAL.signal : PAL.counter}
                rightFill={slot.highlight ? PAL.signalMid : PAL.counterMid}
              />
              <Key
                x={slot.x + 28}
                y={r2(topY - 8)}
                anchor="middle"
                fill={slot.highlight ? PAL.signal : PAL.counter}
                size={10.5}
              >
                {`${slot.count} / ${runs}`}
              </Key>
            </g>
          );
        })}
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider
          label="Repeated runs"
          value={runs}
          min={1}
          max={30}
          step={1}
          onChange={setRuns}
        />
        <Segmented
          label="Framing"
          options={[
            { id: "standard", label: "Framing A (Slot 1 favored)" },
            { id: "shifted", label: "Framing B (choice reverses)" },
          ]}
          value={framing}
          onChange={setFraming}
        />
      </div>
    </div>
  );
}

/**
 * Slide 16 — Why Benchmark Accuracy Fails as a Governance Standard:
 * Interactive 4-Station 3D Diagnostic Bench (no tabletop slab, no people):
 * (1) Construct Mismatch: square TRIVIA peg failing to fit a round CREDIT socket.
 * (2) Single-Sample Fragility: 1 green N=1 bar masking 3 taller red failure bars behind a slit.
 * (3) Prompt Sensitivity: commercial system prompt flipping a dial from safe to biased.
 * (4) Benchmark Contamination: red siphon arch leaking TEST answers into the TRAIN drum.
 */
export function IsoBenchmarkFailures() {
  const [focus, setFocus] = useState<"all" | "1" | "2" | "3" | "4">("all");
  const lit = (id: "1" | "2" | "3" | "4") => focus === "all" || focus === id;

  return (
    <div>
      <Frame
        width={800}
        height={210}
        label="Four 3D diagnostic mechanisms showing why benchmark accuracy fails as a governance standard: (1) construct mismatch (square trivia block failing to fit a round credit socket), (2) single-sample fragility (one pass hiding a distribution of failures), (3) prompt sensitivity (commercial role flipping the gauge needle to biased), and (4) benchmark contamination (test answers leaking into the training drum)."
      >
        {/* 1. Construct mismatch: Square Trivia Peg vs Round Credit Socket */}
        <g opacity={lit("1") ? 1 : 0.35}>
          <Key x={116} y={24} anchor="middle" fill={focus === "1" ? PAL.signal : PAL.ink2} size={9.5}>
            1 · CONSTRUCT MISMATCH
          </Key>
          {/* Round Credit-Fairness socket cylinder */}
          <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
            <path d="M 62 128 V 172 A 48 14 0 0 0 158 172 V 128 Z" fill={PAL.slabLeft} />
            <ellipse cx="110" cy="128" rx="48" ry="14" fill={PAL.slabTop} />
            <ellipse cx="110" cy="128" rx="22" ry="7" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
          </g>
          <text x="110" y="160" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink}>
            CREDIT FAIRNESS
          </text>
          {/* Square Trivia Peg suspended above round hole (mismatch) */}
          <IsoBlock
            x={86}
            y={98}
            w={46}
            d={22}
            h={32}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <text x="109" y="86" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            TRIVIA
          </text>
        </g>

        {/* 2. Single-sample fragility: 1 tested green sample masking 3 taller red distribution bars */}
        <g opacity={lit("2") ? 1 : 0.35}>
          <Key x={308} y={24} anchor="middle" fill={focus === "2" ? PAL.signal : PAL.ink2} size={9.5}>
            2 · N=1 FRAGILITY
          </Key>
          <IsoBlock
            x={236}
            y={178}
            w={136}
            d={26}
            h={14}
            topFill={PAL.slabTop}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          {/* 1 tested sample in front (green) */}
          <IsoBlock
            x={248}
            y={164}
            w={24}
            d={18}
            h={34}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <text x="260" y="152" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.paper}>
            N=1
          </text>
          {/* Unsampled distribution draws in red beside it */}
          {[284, 314, 344].map((bx, i) => (
            <IsoBlock
              key={bx}
              x={bx}
              y={164}
              w={20}
              d={18}
              h={56 + (i % 2) * 14}
              topFill={PAL.signalLight}
              leftFill={PAL.signal}
              rightFill={PAL.signalMid}
            />
          ))}
          <text x="304" y="196" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
            HIDDEN VARIANCE
          </text>
        </g>

        {/* 3. Prompt & context sensitivity: Commercial Role Prompt flipping gauge needle */}
        <g opacity={lit("3") ? 1 : 0.35}>
          <Key x={502} y={24} anchor="middle" fill={focus === "3" ? PAL.signal : PAL.ink2} size={9.5}>
            3 · PROMPT SENSITIVITY
          </Key>
          <IsoBlock
            x={436}
            y={172}
            w={124}
            d={26}
            h={88}
            topFill={PAL.slabTop}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          {/* Half-circle gauge arc: left green (NEUTRAL), right red (ROLE PROMPT) */}
          <path d="M 464 134 A 34 34 0 0 1 532 134" fill="none" stroke={PAL.ink2} strokeWidth="2" />
          <circle cx="472" cy="112" r="4" fill={PAL.counter} />
          <circle cx="524" cy="112" r="4" fill={PAL.signal} />
          {/* Needle deflected hard right to red by commercial prompt */}
          <line x1="498" y1="134" x2="522" y2="112" stroke={PAL.signal} strokeWidth="2.8" />
          <circle cx="498" cy="134" r="4" fill={PAL.ink} />
          <text x="498" y="156" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
            ROLE PROMPT → BIASED
          </text>
        </g>

        {/* 4. Benchmark contamination: Red siphon leaking TEST into TRAIN */}
        <g opacity={lit("4") ? 1 : 0.35}>
          <Key x={688} y={24} anchor="middle" fill={focus === "4" ? PAL.signal : PAL.ink2} size={9.5}>
            4 · CONTAMINATION
          </Key>
          {/* Training corpus block */}
          <IsoBlock
            x={618}
            y={172}
            w={54}
            d={24}
            h={56}
            topFill={PAL.slabTop}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <text x="645" y="148" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
            TRAIN
          </text>
          {/* Test benchmark block */}
          <IsoBlock
            x={702}
            y={172}
            w={54}
            d={24}
            h={56}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <text x="729" y="148" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            TEST
          </text>
          {/* Leak siphon pipe from TEST top face back into TRAIN top face */}
          <path
            d="M 736 102 L 736 68 L 652 68 L 652 96"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <polygon points="652,102 647,93 657,93" fill={PAL.signal} />
          <text x="694" y="60" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
            TEST LEAK
          </text>
        </g>
      </Frame>
      <Segmented
        label="Failure mode"
        options={[
          { id: "all", label: "All 4 modes" },
          { id: "1", label: "1. Construct mismatch" },
          { id: "2", label: "2. Single-sample fragility" },
          { id: "3", label: "3. Prompt sensitivity" },
          { id: "4", label: "4. Contamination" },
        ]}
        value={focus}
        onChange={setFocus}
      />
    </div>
  );
}

/**
 * Slide 17 — The Six Stages of Algorithmic Governance:
 * Interactive 3D Six-Gate Lifecycle Conduit & Rollback Pipe (no tabletop slab, no people):
 * A continuous 3D pipeline channel with six distinct governance mechanisms:
 * (01) Risk-Tier Caliper, (02) Provenance Sieve Drum, (03) Behavioral Audit
 * Glass Chamber, (04) Oversight & Recourse Gate Valve, (05) Launch Sign-Off
 * Seal Stamp, and (06) Live Drift Seismograph with an overhead Rollback Return Pipe.
 */
export function IsoSixStages() {
  const [stage, setStage] = useState<"all" | "1" | "2" | "3" | "4" | "5" | "6">("all");
  const lit = (s: "1" | "2" | "3" | "4" | "5" | "6") => stage === "all" || stage === s;

  return (
    <div>
      <Frame
        width={800}
        height={205}
        label="3D six-gate algorithmic governance lifecycle conduit: (01) risk-tier scoping block, (02) data provenance sieve cylinder, (03) pre-deployment behavioral auditing glass chamber, (04) oversight and recourse gate valve, (05) launch authorization seal stamp, and (06) post-deployment drift monitor with an overhead rollback return pipe to Stage 03."
      >
        {/* Continuous 3D lifecycle conduit rail linking all 6 gates */}
        <IsoBlock
          x={44}
          y={180}
          w={696}
          d={24}
          h={12}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />

        {/* Stage 1: Scoping & Risk Classification — 3D Risk-Tier Gauge */}
        <g opacity={lit("1") ? 1 : 0.35}>
          <Key x={88} y={24} anchor="middle" fill={stage === "1" ? PAL.signal : PAL.ink2} size={9.5}>
            01 · SCOPING
          </Key>
          <IsoBlock
            x={56}
            y={168}
            w={62}
            d={20}
            h={48}
            topFill={PAL.slabTop}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <rect x="66" y="130" width="42" height="10" fill={PAL.signal} />
          <rect x="66" y="144" width="42" height="10" fill={PAL.counter} />
          <text x="87" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.ink3}>
            RISK TIER
          </text>
        </g>

        {/* Stage 2: Data & Provenance Review — 3D Filter Sieve Cylinder */}
        <g opacity={lit("2") ? 1 : 0.35}>
          <Key x={204} y={24} anchor="middle" fill={stage === "2" ? PAL.signal : PAL.ink2} size={9.5}>
            02 · DATA
          </Key>
          <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
            <path d="M 172 118 V 166 A 30 9 0 0 0 232 166 V 118 Z" fill={PAL.slabLeft} />
            <ellipse cx="202" cy="118" rx="30" ry="9" fill={PAL.slabTop} />
            <line x1="184" y1="138" x2="220" y2="138" stroke={PAL.counter} strokeWidth="2" strokeDasharray="3 2" />
            <line x1="184" y1="150" x2="220" y2="150" stroke={PAL.counter} strokeWidth="2" strokeDasharray="3 2" />
          </g>
          <text x="202" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.ink3}>
            PROVENANCE
          </text>
        </g>

        {/* Stage 3: Pre-Deployment Behavioral Auditing — Translucent Stress-Test Chamber */}
        <g opacity={lit("3") ? 1 : 0.35}>
          <Key x={320} y={24} anchor="middle" fill={PAL.signal} size={9.5}>
            03 · AUDIT
          </Key>
          <GlassCube x={284} y={168} w={58} d={22} h={56}>
            <circle cx="318" cy="134" r="12" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
            <circle cx="318" cy="134" r="4" fill={PAL.signal} />
          </GlassCube>
          <text x="316" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.signal}>
            STRESS TEST
          </text>
        </g>

        {/* Stage 4: Oversight & Disclosure Design — 3D Gate Valve */}
        <g opacity={lit("4") ? 1 : 0.35}>
          <Key x={436} y={24} anchor="middle" fill={stage === "4" ? PAL.counter : PAL.ink2} size={9.5}>
            04 · OVERSIGHT
          </Key>
          <IsoBlock
            x={408}
            y={168}
            w={46}
            d={22}
            h={62}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <text x="431" y="142" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.paper}>
            GATE
          </text>
          <text x="431" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.ink3}>
            RECOURSE
          </text>
        </g>

        {/* Stage 5: Authorization & Launch Sign-Off — 3D Official Sign-Off Stamp */}
        <g opacity={lit("5") ? 1 : 0.35}>
          <Key x={552} y={24} anchor="middle" fill={PAL.counter} size={9.5}>
            05 · SIGN-OFF
          </Key>
          <IsoBlock
            x={518}
            y={168}
            w={62}
            d={20}
            h={38}
            topFill={PAL.slabTop}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          {/* Stamp handle & pad */}
          <rect x="543" y="102" width="12" height="18" fill={PAL.counter} stroke={PAL.ink} strokeWidth="1.3" />
          <ellipse cx="549" cy="100" rx="12" ry="6" fill={PAL.counterMid} stroke={PAL.ink} strokeWidth="1.3" />
          <circle cx="549" cy="148" r="8" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.5" />
          <text x="549" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.counter}>
            LAUNCH SEAL
          </text>
        </g>

        {/* Stage 6: Post-Deployment Monitoring & Incident Rollback */}
        <g opacity={lit("6") ? 1 : 0.35}>
          <Key x={682} y={24} anchor="middle" fill={stage === "6" ? PAL.signal : PAL.ink2} size={9.5}>
            06 · MONITOR
          </Key>
          <IsoBlock
            x={644}
            y={168}
            w={74}
            d={20}
            h={52}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          {/* Drift seismograph trace */}
          <path
            d="M 654 146 L 666 146 L 674 130 L 682 156 L 692 128 L 706 146"
            fill="none"
            stroke={PAL.paper}
            strokeWidth="2"
          />
          <text x="681" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.signal}>
            DRIFT &amp; ROLLBACK
          </text>

          {/* Overhead Rollback Return Pipe from Stage 6 back to Stage 3 Audit */}
          <path
            d="M 688 104 L 688 62 L 320 62 L 320 94"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="2.2"
            strokeDasharray="5 3"
          />
          <polygon points="320,100 315,91 325,91" fill={PAL.signal} />
          <Key x={504} y={54} anchor="middle" fill={PAL.signal} size={9}>
            ROLLBACK PROTOCOL ON THRESHOLD BREACH
          </Key>
        </g>
      </Frame>
      <Segmented
        label="Governance stage"
        options={[
          { id: "all", label: "All 6 stages" },
          { id: "1", label: "01 Scoping" },
          { id: "2", label: "02 Data" },
          { id: "3", label: "03 Audit" },
          { id: "4", label: "04 Oversight" },
          { id: "5", label: "05 Sign-off" },
          { id: "6", label: "06 Monitor" },
        ]}
        value={stage}
        onChange={setStage}
      />
    </div>
  );
}

/**
 * Slide 18 — Part 4: Human Oversight and Decision Regimes:
 * Macro 3D Shared-Authority Control Console & Cognitive Bandwidth Meter
 * (no tabletop slab, no people):
 * A three-bay 3D control console coupling (1) Algorithmic Score Dial,
 * (2) Human Cognitive Bandwidth Gauge (showing safe capacity vs overload), and
 * (3) Manual Override & Release Lever.
 */
export function IsoSharedAuthority() {
  return (
    <Frame
      width={800}
      height={210}
      label="3D shared-authority control console with three coupled bays: on the left, an algorithmic recommendation dial; in the center, a cognitive bandwidth gauge marking the boundary between effective human review and cognitive overload; on the right, a human override and release lever."
    >
      {/* Main 3D angled control console housing */}
      <IsoBlock
        x={76}
        y={180}
        w={624}
        d={36}
        h={96}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />

      {/* Bay 1 (Left): Algorithmic Recommendation Dial */}
      <Key x={188} y={24} anchor="middle" fill={PAL.ink2}>
        1 · ALGORITHMIC INPUT
      </Key>
      <circle cx="188" cy="126" r="26" fill={PAL.slabTop} stroke={PAL.ink} strokeWidth="1.6" />
      <path d="M 170 136 A 20 20 0 1 1 206 136" fill="none" stroke={PAL.ink2} strokeWidth="2" />
      <line x1="188" y1="126" x2="202" y2="110" stroke={PAL.ink} strokeWidth="2.6" />
      <circle cx="188" cy="126" r="4" fill={PAL.ink} />
      <text x="188" y="168" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink2}>
        MODEL SCORE STREAM
      </text>

      {/* Internal coupling line from Bay 1 to Bay 2 */}
      <line x1="224" y1="126" x2="292" y2="126" stroke={PAL.ink3} strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="298,126 290,122 290,130" fill={PAL.ink3} />

      {/* Bay 2 (Center): Cognitive Bandwidth & Attention Meter */}
      <Key x={400} y={24} anchor="middle" fill={PAL.signal}>
        2 · COGNITIVE LIMITS OF HUMAN REVIEW
      </Key>
      <rect x="308" y="102" width="176" height="44" fill={PAL.slabTop} stroke={PAL.ink} strokeWidth="1.4" />
      {/* Green safe cognitive capacity zone vs Red overload zone */}
      <rect x="314" y="108" width="98" height="32" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.4" />
      <text x="363" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        SAFE BANDWIDTH
      </text>
      <rect x="416" y="108" width="62" height="32" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.4" />
      <text x="447" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.signal}>
        OVERLOAD
      </text>
      <text x="396" y="168" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink2}>
        TIME · VOLUME · CONTEXT
      </text>

      {/* Coupling line from Bay 2 to Bay 3 */}
      <line x1="494" y1="126" x2="554" y2="126" stroke={PAL.counter} strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="560,126 552,122 552,130" fill={PAL.counter} />

      {/* Bay 3 (Right): Human Authority & Override Gate Lever */}
      <Key x={616} y={24} anchor="middle" fill={PAL.counter}>
        3 · HUMAN AUTHORITY
      </Key>
      <rect x="572" y="104" width="84" height="42" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.5" />
      {/* 3D Lever slot & handle */}
      <rect x="608" y="110" width="12" height="30" fill={PAL.ink} />
      <IsoBlock
        x={592}
        y={122}
        w={44}
        d={12}
        h={10}
        topFill={PAL.paper}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="614" y="168" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        APPROVE / OVERRIDE
      </text>
    </Frame>
  );
}

/**
 * Slide 19A — Human-in-the-Loop Regime:
 * Macro 3D Single-Case Escapement Gate & Manual Key-Switch (no tabletop slab, no people):
 * Each individual scored case dossier halts at a locked verdigris manual
 * approval gate until the human sign-off lever releases it.
 */
export function IsoInTheLoop() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D mechanical diagram of a human-in-the-loop regime: an algorithmic score card stops at a locked verdigris manual approval gate with a sign-off lever that must be engaged before the single case can advance to execution."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.counter}>
        CASE-BY-CASE MANUAL APPROVAL GATE
      </Key>

      {/* Continuous track bed */}
      <IsoBlock
        x={36}
        y={174}
        w={312}
        d={28}
        h={14}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />

      {/* Left: Single scored case dossier waiting at the gate */}
      <IsoBlock
        x={54}
        y={160}
        w={84}
        d={22}
        h={36}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <text x="96" y="138" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink}>
        CASE #104
      </text>
      <text x="96" y="152" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        AI SCORE
      </text>

      {/* Center: Verdigris Manual Escapement Gate & Sign-Off Lever */}
      <IsoBlock
        x={178}
        y={160}
        w={34}
        d={26}
        h={74}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      {/* Manual rotary release lever mounted on top of the gate */}
      <rect x="191" y="54" width="8" height="22" fill={PAL.ink} />
      <ellipse cx="195" cy="52" rx="14" ry="6" fill={PAL.counter} stroke={PAL.ink} strokeWidth="1.4" />
      <text x="195" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        HOLD
      </text>

      {/* Dashed release arrow through gate to approved execution tray */}
      <line x1="234" y1="138" x2="266" y2="138" stroke={PAL.counter} strokeWidth="2.2" strokeDasharray="4 3" />
      <polygon points="272,138 264,134 264,142" fill={PAL.counter} />

      {/* Right: Approved single-case execution block */}
      <IsoBlock
        x={278}
        y={160}
        w={64}
        d={22}
        h={36}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="310" y="146" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        APPROVED
      </text>

      <text x="200" y="196" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        NO ACTION WITHOUT INDIVIDUAL SIGN-OFF
      </text>
    </Frame>
  );
}

/**
 * Slide 19B — Human-on-the-Loop Regime:
 * Macro 3D High-Speed Conveyor & Overhead Emergency Cutoff Plunger (no tabletop slab, no people):
 * Automated transaction blocks stream continuously along the lower channel while
 * an overhead monitoring dashboard holds a red cutoff plunger poised above the stream.
 */
export function IsoOnTheLoop() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D mechanical diagram of a human-on-the-loop regime: automated transaction blocks stream continuously along a lower conveyor channel while an overhead monitoring dashboard bridge holds an emergency cutoff plunger poised above the stream."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.ink2}>
        REAL-TIME STREAM · DASHBOARD OVERRIDE
      </Key>

      {/* Lower high-speed conveyor bed */}
      <IsoBlock
        x={36}
        y={174}
        w={312}
        d={28}
        h={14}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />

      {/* Continuous stream of 4 real-time decision tiles moving along the conveyor */}
      {[56, 128, 200, 272].map((bx, i) => (
        <IsoBlock
          key={bx}
          x={bx}
          y={160}
          w={46}
          d={18}
          h={18}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
      ))}

      {/* Overhead Monitoring Dashboard Bridge & Emergency Cutoff Plunger */}
      <IsoBlock
        x={108}
        y={96}
        w={176}
        d={24}
        h={38}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      {/* Live telemetry trace on dashboard face */}
      <path
        d="M 124 80 L 146 80 L 156 68 L 168 84 L 184 74 L 214 74"
        fill="none"
        stroke={PAL.counter}
        strokeWidth="2"
      />
      <text x="252" y="81" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.signal}>
        OVERRIDE
      </text>

      {/* Vertical emergency cutoff guillotine blade poised between dashboard and stream */}
      <line x1="204" y1="96" x2="204" y2="118" stroke={PAL.signal} strokeWidth="3.2" />
      <rect x="186" y="116" width="36" height="8" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.3" />

      <text x="200" y="196" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink2}>
        AUTO-EXECUTION WITH LIVE SHUTDOWN AUTHORITY
      </text>
    </Frame>
  );
}

/**
 * Slide 19C — Fully Autonomous Regime:
 * Macro 3D Autonomous Rotor Bounded by Constraint Guardrails & Post-Hoc Log
 * (no tabletop slab, no people):
 * A translucent autonomous AI chamber operates continuously between two solid
 * verdigris constraint walls while logging actions to a periodic post-hoc audit ledger.
 */
export function IsoAutonomous() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D mechanical diagram of a fully autonomous regime: a translucent glass AI chamber operates continuously between two solid verdigris pre-programmed constraint guardrails while outputting records to a post-hoc audit ledger on the right."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.signal}>
        BOUNDED BY CONSTRAINTS · POST-HOC AUDIT
      </Key>

      {/* Left pre-programmed constraint guardrail */}
      <IsoBlock
        x={44}
        y={168}
        w={24}
        d={28}
        h={74}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      {/* Central Autonomous AI Rotor Chamber */}
      <GlassCube x={96} y={168} w={84} d={34} h={74}>
        {/* Dual spinning autonomous rings inside glass chamber */}
        <circle cx="150" cy="120" r="22" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <circle cx="150" cy="120" r="11" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.5" />
        <circle cx="150" cy="120" r="3.8" fill={PAL.signal} />
      </GlassCube>

      {/* Right pre-programmed constraint guardrail */}
      <IsoBlock
        x={216}
        y={168}
        w={24}
        d={28}
        h={74}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      {/* Dashed periodic log feed to Post-Hoc Audit Ledger */}
      <line x1="262" y1="126" x2="286" y2="126" stroke={PAL.ink2} strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="292,126 284,122 284,130" fill={PAL.ink2} />

      {/* Right: Periodic Post-Hoc Audit Ledger */}
      <IsoBlock
        x={296}
        y={168}
        w={58}
        d={22}
        h={58}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <line x1="308" y1="126" x2="342" y2="126" stroke={PAL.ink} strokeWidth="1.8" />
      <line x1="308" y1="136" x2="338" y2="136" stroke={PAL.ink3} strokeWidth="1.6" />
      <text x="325" y="154" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.ink2}>
        AUDIT LOG
      </text>

      <text x="200" y="196" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink2}>
        NO LIVE HUMAN IN LOOP · GUARDRAILS + PERIODIC AUDIT
      </text>
    </Frame>
  );
}

/**
 * Slide 20 — Failure Modes of Human Oversight:
 * Interactive 3D Rubber-Stamp Hopper Overflow & Moral Crumple-Zone Accordion
 * (no tabletop slab, no people):
 * Left: Slider-driven 3D case backlog column & rubber-stamp piston showing how
 * high caseloads turn review into automatic rubber-stamping.
 * Right: A massive 3D automated system block crushing a buckling red accordion
 * spring ("Moral Crumple Zone") that absorbs institutional blame.
 */
export function IsoOversightFailures() {
  const [casesPerHour, setCasesPerHour] = useState(100);
  const overloaded = casesPerHour > 30;
  const stackHeight = Math.min(72, Math.max(18, Math.round(casesPerHour * 0.56)));

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`3D mechanical diagram of human oversight failures: on the left, ${casesPerHour} cases per hour ${overloaded ? "pile into a towering backlog beneath a blind rubber-stamp piston" : "sit at a manageable height for careful inspection"}; on the right, a massive automated system block crushes a small red accordion spring representing the low-authority operator in a moral crumple zone.`}
      >
        {/* Left: Rubber-stamping & Automation bias under caseload pressure */}
        <Key
          x={196}
          y={24}
          anchor="middle"
          fill={overloaded ? PAL.signal : PAL.counter}
        >
          {overloaded
            ? `RUBBER-STAMPING · ${casesPerHour} CASES / HR OVERLOAD`
            : `CAREFUL INSPECTION · ${casesPerHour} CASES / HR`}
        </Key>

        {/* Base tray for case queue & stamp */}
        <IsoBlock
          x={48}
          y={178}
          w={288}
          d={30}
          h={14}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />

        {/* Growing 3D case backlog stack */}
        <IsoBlock
          x={72}
          y={164}
          w={78}
          d={24}
          h={stackHeight}
          topFill={overloaded ? PAL.signalLight : PAL.counterLight}
          leftFill={overloaded ? PAL.signal : PAL.counter}
          rightFill={overloaded ? PAL.signalMid : PAL.counterMid}
        />
        <text x="111" y="152" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
          {`${casesPerHour}/HR`}
        </text>

        {/* Rubber-stamp piston & uninspected case card on the right of the tray */}
        <IsoBlock
          x={204}
          y={164}
          w={96}
          d={22}
          h={18}
          topFill={overloaded ? PAL.signalLight : PAL.counterLight}
          leftFill={PAL.paper}
          rightFill={PAL.slabLeft}
          stroke={overloaded ? PAL.signal : PAL.counter}
        />
        <text
          x="252"
          y="158"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="700"
          fill={overloaded ? PAL.signal : PAL.counter}
        >
          {overloaded ? "UNCHECKED PASS" : "VERIFIED CASE"}
        </text>

        {/* 3D Rubber Stamp above the card */}
        <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
          <IsoBlock
            x={228}
            y={overloaded ? 132 : 114}
            w={48}
            d={18}
            h={12}
            topFill={PAL.slabTop}
            leftFill={overloaded ? PAL.signal : PAL.ink2}
            rightFill={PAL.ink}
          />
          <rect
            x="248"
            y={overloaded ? 88 : 70}
            width="12"
            height="24"
            fill={PAL.slabLeft}
          />
          <ellipse
            cx="254"
            cy={overloaded ? 86 : 68}
            rx="14"
            ry="7"
            fill={overloaded ? PAL.signal : PAL.ink2}
          />
        </g>

        {/* Center vertical divider */}
        <line
          x1="392"
          y1="20"
          x2="392"
          y2="196"
          stroke={PAL.rule}
          strokeWidth="1.4"
          strokeDasharray="5 4"
        />

        {/* Right: Moral Crumple Zone — Massive System Crushing a Low-Authority Buffer Spring */}
        <Key x={596} y={24} anchor="middle" fill={PAL.signal}>
          MORAL CRUMPLE ZONE · ABSORBING SYSTEM BLAME
        </Key>

        {/* Heavy upper Automated System Block */}
        <IsoBlock
          x={468}
          y={114}
          w={236}
          d={34}
          h={48}
          topFill={PAL.slabTop}
          leftFill={PAL.ink2}
          rightFill={PAL.ink}
        />
        <text x="586" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill={PAL.paper}>
          COMPLEX AUTOMATED SYSTEM FAILURE
        </text>

        {/* Downward blame force arrows */}
        <line x1="516" y1="118" x2="516" y2="146" stroke={PAL.signal} strokeWidth="2.6" />
        <polygon points="516,152 511,144 521,144" fill={PAL.signal} />
        <line x1="656" y1="118" x2="656" y2="146" stroke={PAL.signal} strokeWidth="2.6" />
        <polygon points="656,152 651,144 661,144" fill={PAL.signal} />

        {/* Buckling red accordion crumple-zone spring underneath the heavy system */}
        <path
          d="M 556 114 L 616 122 L 552 132 L 620 142 L 556 152 L 616 162"
          fill="none"
          stroke={PAL.signal}
          strokeWidth="3.6"
          strokeLinejoin="round"
        />

        {/* Bottom anvil base */}
        <IsoBlock
          x={468}
          y={178}
          w={236}
          d={34}
          h={16}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />
        <text x="586" y="174" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
          LOW-AUTHORITY HUMAN OPERATOR BEARS BLAME
        </text>
      </Frame>
      <Slider
        label="Reviewer caseload (cases / hr)"
        value={casesPerHour}
        min={10}
        max={120}
        step={10}
        onChange={setCasesPerHour}
      />
    </div>
  );
}

/**
 * Slide 21 — Matching Oversight Regimes to Decision Risk:
 * Interactive 3D Stepped Risk-Regime Matrix (no tabletop slab, no people):
 * Plots three 3D stepped governance regimes along Severity/Irreversibility (vertical)
 * and Decision Speed/Velocity (horizontal):
 * (1) Tall step: High-Stakes / Irreversible (Mortgage, Employment) -> Human-in-the-Loop + Recourse
 * (2) Mid step: Medium-Stakes / High-Frequency (Transactions, Inventory) -> Human-on-the-Loop + Circuit Breaker
 * (3) Low step: Low-Stakes / Reversible / High-Velocity (Web Carousel) -> Autonomous + Periodic Audit
 */
export function IsoDecisionRiskRegimes() {
  const [tier, setTier] = useState<"all" | "high" | "medium" | "low">("all");
  const lit = (t: "high" | "medium" | "low") => tier === "all" || tier === t;

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label="3D stepped risk-regime matrix plotting severity and irreversibility against decision velocity: on the left, a tall red column for high-stakes irreversible decisions (mortgage, employment) requires human-in-the-loop review and recourse; in the center, a medium column for high-frequency transactions uses human-on-the-loop monitoring and circuit breakers; on the right, a low column for reversible webpage carousels runs autonomously under periodic statistical auditing."
      >
        {/* 3D Vertical Axis (Harm Severity & Irreversibility) and Horizontal Axis (Decision Velocity) */}
        <g stroke={PAL.ink2} strokeWidth="1.6">
          <line x1="68" y1="180" x2="68" y2="36" />
          <polygon points="68,30 63,39 73,39" fill={PAL.ink2} stroke="none" />
          <line x1="68" y1="180" x2="748" y2="180" />
          <polygon points="754,180 745,175 745,185" fill={PAL.ink2} stroke="none" />
        </g>
        <Key x={78} y={40} anchor="start" fill={PAL.ink2} size={9.5}>
          HARM SEVERITY &amp; IRREVERSIBILITY
        </Key>
        <Key x={740} y={198} anchor="end" fill={PAL.ink2} size={9.5}>
          DECISION SPEED / VELOCITY →
        </Key>

        {/* Tier 1: High stakes, low frequency, irreversible */}
        <g opacity={lit("high") ? 1 : 0.35}>
          <Key x={196} y={58} anchor="middle" fill={PAL.signal} size={9.5}>
            HIGH STAKES · IRREVERSIBLE
          </Key>
          <IsoBlock
            x={116}
            y={180}
            w={148}
            d={28}
            h={96}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <text x="190" y="112" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
            MORTGAGE / HIRING
          </text>
          <rect x="136" y="124" width="108" height="22" fill={PAL.counter} stroke={PAL.paper} strokeWidth="1.2" />
          <text x="190" y="139" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            HUMAN-IN-THE-LOOP
          </text>
          <text x="190" y="164" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            + FORMAL RECOURSE
          </text>
        </g>

        {/* Tier 2: Medium stakes, high frequency */}
        <g opacity={lit("medium") ? 1 : 0.35}>
          <Key x={418} y={88} anchor="middle" fill={PAL.counter} size={9.5}>
            MEDIUM STAKES · HIGH FREQUENCY
          </Key>
          <IsoBlock
            x={338}
            y={180}
            w={148}
            d={28}
            h={66}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <text x="412" y="136" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.paper}>
            FRAUD / INVENTORY
          </text>
          <text x="412" y="152" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            HUMAN-ON-THE-LOOP
          </text>
          <text x="412" y="168" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.counterLight}>
            + CIRCUIT BREAKERS
          </text>
        </g>

        {/* Tier 3: Low stakes, high velocity, reversible */}
        <g opacity={lit("low") ? 1 : 0.35}>
          <Key x={638} y={118} anchor="middle" fill={PAL.ink2} size={9.5}>
            LOW STAKES · REVERSIBLE
          </Key>
          <IsoBlock
            x={558}
            y={180}
            w={148}
            d={28}
            h={38}
            topFill={PAL.slabTop}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <text x="632" y="158" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.ink}>
            WEBPAGE CAROUSEL
          </text>
          <text x="632" y="172" textAnchor="middle" fontSize="8" fontWeight="700" fill={PAL.ink2}>
            AUTONOMOUS + AUDIT
          </text>
        </g>
      </Frame>
      <Segmented
        label="Inspect risk regime"
        options={[
          { id: "all", label: "All 3 tiers" },
          { id: "high", label: "High stakes (in-the-loop)" },
          { id: "medium", label: "Medium stakes (on-the-loop)" },
          { id: "low", label: "Low stakes (autonomous)" },
        ]}
        value={tier}
        onChange={setTier}
      />
    </div>
  );
}

/**
 * Slide 22 — Part 5: Delegated Consumption and Agent-Mediated Markets:
 * A human consumer on the left delegates search and purchase to a verdigris
 * surrogate GlassCube, which negotiates directly across the tabletop with a
 * seller's commercial GlassCube on the right.
 */
export function IsoDelegatedExchange() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama of agent-mediated exchange: a consumer on the left delegates a shopping goal to a surrogate glass AI cube, which interacts across the center of the board with a seller's commercial glass AI cube."
    >
      <IsoBase w={800} />

      <Key x={196} y={28} anchor="middle" fill={PAL.counter}>
        CONSUMER &amp; SURROGATE AI AGENT
      </Key>
      <IsoPerson
        x={96}
        y={148}
        scale={0.92}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />
      <line x1="138" y1="108" x2="208" y2="108" stroke={PAL.counter} strokeWidth="2.2" strokeDasharray="4 3" />
      <polygon points="214,108 206,104 206,112" fill={PAL.counter} />

      <GlassCube
        x={222}
        y={148}
        w={58}
        d={42}
        h={58}
        outside={
          <g>
            <ellipse cx="310.24" cy="108" rx="3.5" ry="5.5" fill={PAL.ink} />
            <line x1="310.24" y1="108" x2="478" y2="108" stroke={PAL.ink} strokeWidth="2.4" />
            <polygon points="484,108 476,104 476,112" fill={PAL.ink} />
          </g>
        }
      >
        <circle cx="258" cy="108" r="13" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="258" cy="108" r="4.5" fill={PAL.counter} />
        <line x1="271" y1="108" x2="310.24" y2="108" stroke={PAL.ink} strokeWidth="2.2" />
      </GlassCube>

      <Key x={392} y={88} anchor="middle" fill={PAL.ink2} size={9.5}>
        AGENT-MEDIATED EXCHANGE
      </Key>

      <Key x={596} y={28} anchor="middle" fill={PAL.signal}>
        MARKETER &amp; PLATFORM AI
      </Key>
      <GlassCube x={492} y={148} w={58} d={42} h={58}>
        <circle cx="528" cy="108" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="528" cy="108" r="4.5" fill={PAL.signal} />
      </GlassCube>

      <IsoCoinStack x={606} y={148} n={4} signal />
      <IsoPerson
        x={682}
        y={148}
        scale={0.92}
        flip
        coat={PAL.ink2}
        coatShade={PAL.ink}
        skin={PAL.skin2}
      />
    </Frame>
  );
}

/**
 * Slide 23 — The AI Agent as a Surrogate Consumer:
 * 3D Optical Scanner Head & Search-Results Page Slab (no tabletop slab, no people):
 * Left: a 3D Consumer Goal Cartridge inserted into a translucent AI Surrogate
 * Scanner Lens.
 * Right: a 3D Search Results Page slab with three raised listing cards
 * (Sponsored $290, Organic $210, Listing 3 $245) being parsed by the agent's
 * optical scan beams.
 */
export function IsoSurrogateConsumer() {
  return (
    <Frame
      width={800}
      height={215}
      label="3D optical scanner diagram of the AI agent as a surrogate consumer: on the left, a consumer goal cartridge feeds into a translucent glass AI scanner head, which projects optical scan beams onto a 3D search-results page slab on the right containing a sponsored slot ($290), an organic match ($210), and a third listing ($245)."
    >
      {/* Left: Consumer Goal Cartridge + AI Surrogate Optical Scanner */}
      <Key x={164} y={24} anchor="middle" fill={PAL.counter}>
        DELEGATED GOAL &amp; SURROGATE AI SCANNER
      </Key>

      {/* Consumer Goal Cartridge */}
      <IsoBlock
        x={48}
        y={156}
        w={86}
        d={24}
        h={54}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <text x="91" y="126" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.counter}>
        USER GOAL
      </text>
      <line x1="64" y1="138" x2="118" y2="138" stroke={PAL.counter} strokeWidth="2" />
      <line x1="154" y1="126" x2="182" y2="126" stroke={PAL.counter} strokeWidth="2.4" />
      <polygon points="188,126 180,122 180,130" fill={PAL.counter} />

      {/* Translucent AI Surrogate Scanner Head elevated to scan down onto the top of each listing */}
      <GlassCube
        x={192}
        y={144}
        w={78}
        d={36}
        h={74}
        outside={
          <g>
            {/* Optical lens flange mounted on outer right wall (192 + 78 + 25.92 = 295.92, y=74) */}
            <ellipse cx="295.92" cy="74" rx="5" ry="11" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.8" />
            {/* Three optical scan rays arching above the listings to land on each top face (y=92) */}
            <line x1="301" y1="78" x2="442" y2="92" stroke={PAL.signal} strokeWidth="2" strokeDasharray="4 3" />
            <line x1="301" y1="74" x2="562" y2="88" stroke={PAL.counter} strokeWidth="2.2" />
            <line x1="301" y1="70" x2="682" y2="88" stroke={PAL.ink3} strokeWidth="1.8" strokeDasharray="4 3" />
          </g>
        }
      >
        <circle cx="242" cy="96" r="16" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.8" />
        <circle cx="242" cy="96" r="5" fill={PAL.counter} />
        <line x1="258" y1="92" x2="295.92" y2="74" stroke={PAL.counter} strokeWidth="2.4" />
      </GlassCube>

      {/* Right: 3D Search Results Page Slab & Three Raised Product Listing Cards */}
      <Key x={566} y={24} anchor="middle" fill={PAL.signal}>
        SEARCH RESULTS PAGE · FRAMING &amp; SPONSORSHIP TAGS
      </Key>

      {/* Search Results Page Base Slab */}
      <IsoBlock
        x={368}
        y={180}
        w={368}
        d={34}
        h={16}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />

      {/* Listing 1: Sponsored slot */}
      <IsoBlock
        x={392}
        y={164}
        w={86}
        d={24}
        h={64}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <text x="435" y="124" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        SPONSORED
      </text>
      <text x="435" y="144" textAnchor="middle" fontSize="11" fontWeight="700" fill={PAL.paper}>
        $290
      </text>

      {/* Listing 2: Organic best match */}
      <IsoBlock
        x={512}
        y={164}
        w={86}
        d={24}
        h={64}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="555" y="124" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        ORGANIC
      </text>
      <text x="555" y="144" textAnchor="middle" fontSize="11" fontWeight="700" fill={PAL.paper}>
        $210
      </text>

      {/* Listing 3: Alternative listing */}
      <IsoBlock
        x={632}
        y={164}
        w={86}
        d={24}
        h={64}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <text x="675" y="124" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        LISTING 3
      </text>
      <text x="675" y="144" textAnchor="middle" fontSize="11" fontWeight="700" fill={PAL.ink}>
        $245
      </text>
    </Frame>
  );
}

/**
 * Slide 24 — Dual Agency and Governance Risks in Agentic Commerce:
 * Interactive 3D Agent Decision Compass & Competing Pull Mechanisms
 * (no tabletop slab, no people):
 * Left: Consumer Fiduciary Anchor (verdigris).
 * Center: 3D Agent Decision Compass Gimbal whose needle is deflected right.
 * Right: Dynamic 3D mechanism for each of the 4 governance risks:
 * (1) Ad-revenue electromagnet (Wadi & Ma, 2026c),
 * (2) Slot #1 position-bias weight (Wadi & Ma, 2026a, 2026b),
 * (3) Adversarial storefront prompt-injection hook,
 * (4) Three-way liability ambiguity split (Consumer / Platform / Developer).
 */
export function IsoDualAgencyRisks() {
  const [risk, setRisk] = useState<"conflict" | "position" | "adversarial" | "liability">("conflict");

  const headline = {
    conflict: "PRINCIPAL-AGENT CONFLICT · PLATFORM AD REVENUE VS CONSUMER DUTY",
    position: "POSITION & HEURISTIC BIAS · AGENT LOCKS ONTO SLOT #1",
    adversarial: "ADVERSARIAL STOREFRONT · HIDDEN PROMPT HIJACKS AGENT",
    liability: "LIABILITY AMBIGUITY · WHO BEARS THE UNAUTHORIZED LOSS?",
  }[risk];

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`3D mechanical compass diagram of governance risks in agentic commerce (${risk}): on the left stands a verdigris consumer fiduciary anchor; in the center sits a 3D shopping-agent compass gimbal whose needle is deflected rightward by ${risk === "conflict" ? "a platform ad-revenue magnet and coin stack" : risk === "position" ? "an overweighted Slot #1 ranking block" : risk === "adversarial" ? "a hidden prompt-injection hook embedded in a storefront listing" : "an unassigned loss split across consumer, platform, and developer"}.`}
      >
        <Key x={400} y={22} anchor="middle" fill={PAL.signal}>
          {headline}
        </Key>

        {/* Left: Consumer Fiduciary Duty Anchor */}
        <Key x={136} y={46} anchor="middle" fill={PAL.counter} size={9.5}>
          {risk === "liability" ? "CONSUMER (?)" : "CONSUMER FIDUCIARY GOAL"}
        </Key>
        <IsoBlock
          x={56}
          y={172}
          w={144}
          d={28}
          h={78}
          topFill={PAL.counterLight}
          leftFill={PAL.counter}
          rightFill={PAL.counterMid}
        />
        <text x="128" y="126" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
          BUYER UTILITY
        </text>
        <text x="128" y="144" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.counterLight}>
          TRUE PREFERENCE
        </text>

        {/* Dashed green fiduciary alignment line (broken by the rightward pull) */}
        <line
          x1="224"
          y1="126"
          x2="296"
          y2="126"
          stroke={PAL.counter}
          strokeWidth="2.2"
          strokeDasharray="4 4"
        />

        {/* Center: 3D Agent Decision Compass Gimbal mounted on a pedestal */}
        <Key x={392} y={46} anchor="middle" fill={PAL.ink2} size={9.5}>
          {risk === "liability" ? "PLATFORM AGENT (?)" : "AGENT DECISION COMPASS"}
        </Key>
        <IsoBlock
          x={312}
          y={180}
          w={148}
          d={26}
          h={18}
          topFill={PAL.slabTop}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        {/* 3D Compass Gimbal Ring & Deflected Needle */}
        <g stroke={PAL.ink} strokeWidth="1.5">
          <rect x="388" y="130" width="12" height="24" fill={PAL.slabLeft} />
          <ellipse cx="394" cy="106" rx="54" ry="26" fill={PAL.paper} />
          <ellipse cx="394" cy="106" rx="40" ry="18" fill={PAL.slabTop} stroke={PAL.ink3} strokeDasharray="3 2" />
          {/* Ghost green needle pointing left toward Consumer Goal */}
          <line x1="394" y1="106" x2="356" y2="106" stroke={PAL.counter} strokeWidth="2" strokeDasharray="3 2" />
          {/* Active red needle pulled hard right toward commercial distortion */}
          <line x1="394" y1="106" x2="438" y2="106" stroke={PAL.signal} strokeWidth="3.6" />
          <polygon points="444,106 434,101 434,111" fill={PAL.signal} stroke="none" />
          <circle cx="394" cy="106" r="5" fill={PAL.ink} />
        </g>

        {/* Pull / Hijack coupling between Center Compass and Right Distortion */}
        {risk === "adversarial" ? (
          <g>
            <line x1="544" y1="106" x2="458" y2="106" stroke={PAL.signal} strokeWidth="3" />
            <path d="M 458 106 C 448 106, 448 96, 458 96" fill="none" stroke={PAL.signal} strokeWidth="2.6" />
          </g>
        ) : (
          <g>
            <line x1="454" y1="106" x2="536" y2="106" stroke={PAL.signal} strokeWidth="2.6" strokeDasharray="5 3" />
            <polygon points="542,106 534,102 534,110" fill={PAL.signal} />
          </g>
        )}

        {/* Right: Specific 3D Risk Mechanism */}
        <Key x={644} y={46} anchor="middle" fill={PAL.signal} size={9.5}>
          {risk === "conflict" && "AD-FUNDED PROMOTED SLOT"}
          {risk === "position" && "SLOT #1 POSITION GRAVITY"}
          {risk === "adversarial" && "TROJAN STOREFRONT PROMPT"}
          {risk === "liability" && "DEVELOPER / SELLER (?)"}
        </Key>

        <IsoBlock
          x={548}
          y={172}
          w={132}
          d={28}
          h={78}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />
        <text x="614" y="122" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
          {risk === "conflict" && "SPONSORED AD"}
          {risk === "position" && "RANK #1 BIAS"}
          {risk === "adversarial" && "HIDDEN INJECT"}
          {risk === "liability" && "UNASSIGNED LOSS"}
        </text>
        <text x="614" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.signalLight}>
          {risk === "conflict" && "PLATFORM FEE"}
          {risk === "position" && "SHORTCUT SCAN"}
          {risk === "adversarial" && "HIJACKS EVAL"}
          {risk === "liability" && "WHO PAYS?"}
        </text>

        <IsoCoinStack x={728} y={168} n={5} signal />
      </Frame>
      <Segmented
        label="Agentic governance risk"
        options={[
          { id: "conflict", label: "1. Principal-agent conflict" },
          { id: "position", label: "2. Position bias" },
          { id: "adversarial", label: "3. Adversarial storefront" },
          { id: "liability", label: "4. Liability ambiguity" },
        ]}
        value={risk}
        onChange={setRisk}
      />
    </div>
  );
}

/**
 * Slide 25 — Discussion: The Autonomous Travel Agent:
 * 3D Hotel Acoustic & Sponsorship Comparison (no tabletop slab, no people):
 * Left: #1 Ranked Sponsored Hotel (`IsoHouse`) radiating red noise waves with a
 * NON-REFUNDABLE lock tag, selected by the platform agent's red pointer.
 * Right: Quiet 4-Star Hotel (`$230`) bypassed by the agent.
 */
export function IsoTravelAgentHotel() {
  return (
    <Frame
      width={400}
      height={215}
      label="3D architectural comparison of the autonomous travel agent case: on the left, a first-ranked sponsored hotel radiates red noise arcs and carries a non-refundable tag selected by the agent; on the right stands a quiet $230 four-star hotel bypassed by the agent."
    >
      <Key x={200} y={22} anchor="middle" fill={PAL.signal} size={9}>
        SPONSORED NOISY HOTEL VS QUIET MATCH
      </Key>

      {/* Left: #1 Ranked Sponsored Noisy Hotel selected by the agent */}
      <IsoHouse x={62} y={168} rate="#1 AD" penalized />

      {/* Red acoustic soundwaves radiating from the noisy hotel */}
      <g fill="none" stroke={PAL.signal} strokeWidth="2" strokeLinecap="round">
        <path d="M 46 126 Q 36 138 46 150" />
        <path d="M 36 120 Q 22 138 36 156" />
        <path d="M 162 118 Q 172 130 162 142" />
      </g>
      <text x="98" y="192" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.signal}>
        NOISY · NON-REFUNDABLE
      </text>

      {/* Bypass dashed arrow from Slot #1 past Slot #2 */}
      <path
        d="M 156 64 L 288 64"
        fill="none"
        stroke={PAL.ink3}
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      <text x="222" y="56" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink3}>
        BYPASSED
      </text>

      {/* Right: Quiet 4-Star Hotel under $250 (Organic match) */}
      <IsoBlock
        x={252}
        y={168}
        w={82}
        d={28}
        h={74}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="293" y="122" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
        QUIET 4★
      </text>
      <text x="293" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill={PAL.paper}>
        $230
      </text>
      <text x="298" y="192" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        TRUE GOAL MATCH
      </text>
    </Frame>
  );
}

/* ==========================================================================
   REFERENCE PLATES FROM WEEK 01 SLIDE 8
   ========================================================================== */

export function IsoConsequentialism() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D asymmetric balance scale of consequentialist evaluation: a heavy central mineral fulcrum supports a tilted beam where two tall verdigris benefit coin stacks weigh down the left pan while a red harmed-segment weight is lifted on the right pan."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.ink2}>
        NET BENEFITS VS HARMS
      </Key>

      {/* Central 3D fulcrum pedestal */}
      <IsoBlock
        x={168}
        y={188}
        w={56}
        d={22}
        h={14}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      {/* Triangular fulcrum knife-edge */}
      <polygon
        points="180,174 212,174 196,138"
        fill={PAL.slabLeft}
        stroke={PAL.ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <polygon
        points="212,174 224,164 196,138"
        fill={PAL.slabRight}
        stroke={PAL.ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Tilted 3D Roberval balance beam (below the pans so weights never cross the beam) */}
      <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
        {/* Main tilted beam */}
        <polygon points="88,162 308,130 308,138 88,170" fill={PAL.ink2} />
        <circle cx="196" cy="150" r="5" fill={PAL.paper} />

        {/* Left vertical riser & pan platform (above the left end of beam at y=150) */}
        <rect x="88" y="148" width="12" height="16" fill={PAL.slabLeft} />
        <ellipse cx="94" cy="148" rx="46" ry="10" fill={PAL.slabTop} />

        {/* Right vertical riser & pan platform (above the right end of beam at y=118) */}
        <rect x="298" y="116" width="12" height="16" fill={PAL.slabLeft} />
        <ellipse cx="304" cy="116" rx="42" ry="9" fill={PAL.slabTop} />
      </g>

      {/* Left pan: Heavy aggregate benefit coin stacks sitting cleanly on top of left pan */}
      <IsoCoinStack x={78} y={148} n={5} />
      <IsoCoinStack x={108} y={148} n={6} />
      <text x="94" y="190" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.counter}>
        +AGGREGATE BENEFIT
      </text>

      {/* Right pan: Concentrated minority harm block sitting cleanly on top of right pan */}
      <IsoBlock
        x={284}
        y={114}
        w={36}
        d={20}
        h={28}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <text x="304" y="158" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.signal}>
        GROUP HARM
      </text>
    </Frame>
  );
}

export function IsoDeontology() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D close-up of deontological evaluation: on the left, a translucent glass AI module drives two red extraction rams; in the center, a heavy verdigris rights-and-duties tablet blocks both rams completely, protecting an autonomous consent dossier on the right."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.counter}>
        INVIOLABLE RIGHTS &amp; FIDUCIARY DUTY
      </Key>

      {/* Left: Translucent AI module driving two red extraction rams */}
      <GlassCube
        x={38}
        y={166}
        w={58}
        d={36}
        h={64}
        outside={
          <g>
            <ellipse cx="121.92" cy="108" rx="3.5" ry="5" fill={PAL.ink} />
            <ellipse cx="121.92" cy="132" rx="3.5" ry="5" fill={PAL.ink} />
            <line x1="121.92" y1="108" x2="184" y2="108" stroke={PAL.signal} strokeWidth="3.5" />
            <line x1="121.92" y1="132" x2="184" y2="132" stroke={PAL.signal} strokeWidth="3.5" />
            <rect x="180" y="101" width="6" height="14" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.2" />
            <rect x="180" y="125" width="6" height="14" fill={PAL.signal} stroke={PAL.ink} strokeWidth="1.2" />
          </g>
        }
      >
        <circle cx="78" cy="120" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="78" cy="120" r="4" fill={PAL.signal} />
        <line x1="91" y1="115" x2="121.92" y2="108" stroke={PAL.signal} strokeWidth="2.4" />
        <line x1="91" y1="125" x2="121.92" y2="132" stroke={PAL.signal} strokeWidth="2.4" />
      </GlassCube>

      {/* Center: Monumental 3D Verdigris Rights & Duties Tablet */}
      <IsoBlock
        x={190}
        y={174}
        w={36}
        d={34}
        h={98}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <line x1="198" y1="102" x2="218" y2="102" stroke={PAL.paper} strokeWidth="2" />
      <line x1="198" y1="114" x2="218" y2="114" stroke={PAL.paper} strokeWidth="2" />
      <line x1="198" y1="126" x2="218" y2="126" stroke={PAL.paper} strokeWidth="2" />

      {/* Right: Untouched Consumer Right / Contractual Duty Ledger */}
      <IsoBlock
        x={276}
        y={166}
        w={78}
        d={28}
        h={62}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <circle cx="315" cy="128" r="12" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
      <path d="M 310 128 L 314 132 L 321 124" fill="none" stroke={PAL.counter} strokeWidth="2.2" />
      <text x="315" y="154" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.counter}>
        RIGHT INTACT
      </text>

      <text x="108" y="190" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.signal}>
        COERCIVE EXTRACTION
      </text>
      <text x="315" y="190" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.counter}>
        PROTECTED PERSON
      </text>
    </Frame>
  );
}

export function IsoVirtueEthics() {
  return (
    <Frame
      width={400}
      height={210}
      label="3D architectural plumb-line gauge of virtue ethics: a central verdigris plumb-bob hangs inside an institutional arch frame aligned with a target mark for honesty and care, resisting a red magnetic pull toward loophole opportunism on the left."
    >
      <Key x={200} y={24} anchor="middle" fill={PAL.ink2}>
        INSTITUTIONAL CHARACTER &amp; HABITS
      </Key>

      {/* Base datum block with alignment target */}
      <IsoBlock
        x={124}
        y={176}
        w={152}
        d={28}
        h={16}
        topFill={PAL.slabTop}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <ellipse cx="210" cy="152" rx="14" ry="5.5" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
      <circle cx="210" cy="152" r="3" fill={PAL.counter} />

      {/* Left & Right structural columns + Top arch header */}
      <IsoBlock
        x={128}
        y={160}
        w={24}
        d={22}
        h={84}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <IsoBlock
        x={248}
        y={160}
        w={24}
        d={22}
        h={84}
        topFill={PAL.slabTop}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <IsoBlock
        x={120}
        y={76}
        w={160}
        d={24}
        h={20}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="200" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill={PAL.paper}>
        STEWARDSHIP ARCH
      </text>

      {/* Central true-vertical plumb cord and verdigris plumb-bob */}
      <line x1="210" y1="76" x2="210" y2="118" stroke={PAL.counter} strokeWidth="2.2" />
      <polygon
        points="198,118 222,118 210,142"
        fill={PAL.counter}
        stroke={PAL.ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Side temptation / loophole magnet on the left failing to deflect the true plumb */}
      <IsoBlock
        x={38}
        y={142}
        w={54}
        d={20}
        h={36}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <text x="65" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        LOOPHOLE
      </text>
      <line x1="106" y1="122" x2="124" y2="122" stroke={PAL.signal} strokeWidth="1.8" strokeDasharray="3 3" />

      <text x="210" y="192" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.counter}>
        TRUSTWORTHINESS · HONESTY · CARE
      </text>
    </Frame>
  );
}

export function IsoLoanWide() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama: two identical 3D houses sit on either side of a painted postal-code line on the model board. The left house has a 6.2% sign; the right house has an 11.8% sign feeding coins into a bank stack while an auditor halts it."
    >
      <IsoBase w={800} />

      <IsoHouse x={96} y={144} rate="6.2%" />
      <IsoPerson x={198} y={146} scale={0.86} coat={PAL.counter} coatShade={PAL.counterMid} skin={PAL.skin1} />

      <line
        x1="248"
        y1="156"
        x2="328"
        y2="104"
        stroke={PAL.signal}
        strokeWidth="2.2"
        strokeDasharray="6 4"
      />
      <text x="236" y="148" textAnchor="end" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" fill={PAL.ink3}>
        POSTAL A
      </text>
      <text x="292" y="148" textAnchor="start" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" fill={PAL.signal}>
        POSTAL B
      </text>

      <IsoHouse x={346} y={144} rate="11.8%" penalized />
      <IsoPerson x={448} y={146} scale={0.86} coat={PAL.ink2} coatShade={PAL.ink} skin={PAL.skin2} />

      <path
        d="M 424 32 C 494 14, 566 36, 598 96"
        fill="none"
        stroke={PAL.signal}
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <polygon points="598,96 591,89 598,86" fill={PAL.signal} />

      <IsoCoinStack x={572} y={142} n={4} />
      <IsoCoinStack x={598} y={142} n={6} signal />

      <IsoPerson
        x={682}
        y={146}
        scale={0.94}
        flip
        coat={PAL.ink}
        coatShade={PAL.ink2}
        skin={PAL.skin1}
        reach
      />
    </Frame>
  );
}
