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
   WEEK 01 PLATES — ISOMETRIC TABLETOP DIORAMA
   --------------------------------------------------------------------------
   Every plate is a 3D axonometric tabletop scale model on `IsoBase`.
   AI systems and decision rules live inside translucent `GlassCube`s.
   ========================================================================== */

/**
 * Slide 2 — Why Market Algorithms Require Governance:
 * Left side of the board: one human clerk at a desk handles one applicant at a time.
 * Right side of the board: a GlassCube executes the same decision rule across an
 * entire market segment simultaneously. Interactive toggle switches the internal
 * rule between a biased rule (scaling a barrier across the whole segment at once)
 * and an audited rule.
 */
export function IsoScalingRule() {
  const [mode, setMode] = useState<"biased" | "audited">("biased");
  const biased = mode === "biased";

  const segmentApplicants = [
    { x: 476, y: 146, skin: PAL.skin3, affected: true },
    { x: 554, y: 138, skin: PAL.skin2, affected: true },
    { x: 632, y: 146, skin: PAL.skin3, affected: true },
    { x: 710, y: 138, skin: PAL.skin1, affected: false },
  ];

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama comparing human and algorithmic scale: on the left, one clerk at a desk reviews one applicant; on the right, a translucent glass AI cube applies ${biased ? "a biased decision rule that simultaneously raises red barriers across an entire market segment" : "a verified decision rule that approves applicants across the board"}.`}
      >
        <IsoBase w={800} />

        {/* Left scene: 1 human clerk + desk + 1 applicant */}
        <Key x={144} y={28} anchor="middle" fill={PAL.ink3}>
          ONE DECISION AT A TIME
        </Key>
        <IsoPerson
          x={84}
          y={146}
          scale={0.86}
          coat={PAL.ink2}
          coatShade={PAL.ink}
          skin={PAL.skin1}
          reach
        />
        <IsoBlock
          x={120}
          y={150}
          w={34}
          d={24}
          h={32}
          topFill={PAL.paper}
          leftFill={PAL.slabLeft}
          rightFill={PAL.slabRight}
        />
        <IsoPerson
          x={198}
          y={146}
          scale={0.86}
          flip
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin2}
        />

        {/* Divider line scored into the tabletop */}
        <line
          x1={236}
          y1={156}
          x2={316}
          y2={104}
          stroke={PAL.ink3}
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />

        {/* Right scene: GlassCube scaling one decision rule across a whole segment */}
        <Key
          x={526}
          y={28}
          anchor="middle"
          fill={biased ? PAL.signal : PAL.counter}
        >
          {biased ? "1,000 DECISIONS / SEC · BIASED RULE SCALES" : "1,000 DECISIONS / SEC · AUDITED RULE"}
        </Key>

        <GlassCube
          x={312}
          y={148}
          w={62}
          d={44}
          h={62}
          outside={
            <g>
              {/* Exit port on right glass face */}
              <ellipse cx="390" cy="105" rx="4.5" ry="6.5" fill={PAL.ink} />
              {/* Overhead manifold rail routed cleanly above all figures */}
              <path
                d="M 390 105 L 414 105 L 414 48 L 682 48"
                fill="none"
                stroke={biased ? PAL.signal : PAL.counter}
                strokeWidth="2.2"
              />
              {/* Vertical drop lines down to each gate block (clear of every figure) */}
              {segmentApplicants.map((p) => {
                const gx = p.x - 24;
                const blocked = biased && p.affected;
                const gateTopY = p.y - (blocked ? 36 : 16) - 6;
                return (
                  <g key={p.x}>
                    <line
                      x1={gx}
                      y1={48}
                      x2={gx}
                      y2={gateTopY - 6}
                      stroke={blocked ? PAL.signal : PAL.counter}
                      strokeWidth="1.8"
                    />
                    <polygon
                      points={`${gx},${gateTopY} ${gx - 3.5},${gateTopY - 7} ${gx + 3.5},${gateTopY - 7}`}
                      fill={blocked ? PAL.signal : PAL.counter}
                    />
                  </g>
                );
              })}
            </g>
          }
        >
          {/* Internal decision rule mechanism inside the GlassCube */}
          <circle
            cx="354"
            cy="105"
            r="15"
            fill={biased ? PAL.signalLight : PAL.counterLight}
            stroke={biased ? PAL.signal : PAL.counter}
            strokeWidth="1.8"
          />
          <line
            x1="343"
            y1={biased ? 113 : 105}
            x2="365"
            y2={biased ? 97 : 105}
            stroke={biased ? PAL.signal : PAL.counter}
            strokeWidth="3"
          />
          <circle cx="354" cy="105" r="4" fill={biased ? PAL.signal : PAL.counter} />
        </GlassCube>

        {/* Segment applicants spaced cleanly across the board */}
        {segmentApplicants.map((p) => {
          const blocked = biased && p.affected;
          return (
            <g key={p.x}>
              <IsoBlock
                x={p.x - 32}
                y={p.y + 2}
                w={12}
                d={16}
                h={blocked ? 36 : 12}
                topFill={blocked ? PAL.signalLight : PAL.counterLight}
                leftFill={blocked ? PAL.signal : PAL.counter}
                rightFill={blocked ? PAL.signalMid : PAL.counterMid}
              />
              <IsoPerson
                x={p.x}
                y={p.y}
                scale={0.78}
                flip
                coat={blocked ? PAL.signal : PAL.counter}
                coatShade={blocked ? PAL.signalMid : PAL.counterMid}
                skin={p.skin}
              />
            </g>
          );
        })}
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
 * Governance specifies who has the authority to approve, restrict, or halt a
 * model and on the basis of what evidence.
 */
export function IsoGovernanceAuthority() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama: a translucent glass AI cube on the left connects to a verdigris shut-off gate operated by a governance auditor standing beside an evidence pedestal, protecting the consumer on the right."
    >
      <IsoBase />
      <Key x={200} y={26} anchor="middle" fill={PAL.counter}>
        EVIDENCE DOSSIER &amp; HALT AUTHORITY
      </Key>

      <GlassCube
        x={44}
        y={146}
        w={56}
        d={40}
        h={56}
        outside={
          <g>
            <ellipse cx="114" cy="106" rx="4" ry="6" fill={PAL.ink} />
            <line x1="114" y1="106" x2="156" y2="106" stroke={PAL.counter} strokeWidth="3" />
          </g>
        }
      >
        <circle cx="82" cy="106" r="13" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="82" cy="106" r="4.5" fill={PAL.counter} />
      </GlassCube>

      {/* Governance gate wall */}
      <IsoBlock
        x={158}
        y={150}
        w={16}
        d={38}
        h={74}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      {/* Governance officer with hand on gate & evidence pedestal */}
      <IsoPerson
        x={226}
        y={148}
        scale={0.88}
        coat={PAL.ink}
        coatShade={PAL.ink2}
        skin={PAL.skin2}
        reach
      />
      <IsoBlock
        x={258}
        y={152}
        w={32}
        d={22}
        h={34}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      {/* Evidence pages stacked on pedestal */}
      <line x1="264" y1="126" x2="282" y2="126" stroke={PAL.counter} strokeWidth="2" />
      <line x1="264" y1="132" x2="280" y2="132" stroke={PAL.ink3} strokeWidth="1.6" />

      {/* Protected consumer on the right */}
      <IsoPerson
        x={338}
        y={146}
        scale={0.88}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
      />
    </Frame>
  );
}

/**
 * Slide 3B — Ethics Washing:
 * An aspirational "PRINCIPLES" facade stands in front while an unmonitored
 * GlassCube reaches over it with a red extraction claw to take coins from a consumer.
 */
export function IsoEthicsWashing() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama illustrating ethics washing: a thin decorative facade labelled PRINCIPLES stands in front while an unmonitored glass AI cube reaches over it with a red claw to extract coins from a customer."
    >
      <IsoBase />
      <Key x={200} y={26} anchor="middle" fill={PAL.signal}>
        ETHICS WASHING · ASPIRATIONAL FACADE
      </Key>

      {/* Unchecked GlassCube on the left */}
      <GlassCube
        x={44}
        y={146}
        w={56}
        d={40}
        h={56}
        outside={
          <g>
            <ellipse cx="114" cy="104" rx="4" ry="6" fill={PAL.ink} />
            {/* Red extraction arm exits past the right edge (x=128.8) to x=140 before rising over the facade */}
            <path
              d="M 114 104 L 140 104 L 140 52 L 284 52 L 284 110"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.8"
            />
            <path
              d="M 277 106 L 284 116 L 291 106"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.4"
            />
          </g>
        }
      >
        <circle cx="82" cy="106" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="82" cy="106" r="4.5" fill={PAL.signal} />
      </GlassCube>

      {/* Thin aspirational facade block in the middle */}
      <IsoBlock
        x={152}
        y={152}
        w={86}
        d={12}
        h={58}
        topFill={PAL.paper}
        leftFill={PAL.paper}
        rightFill={PAL.slabRight}
      />
      <text
        x="195"
        y="120"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="0.1em"
        fill={PAL.ink3}
      >
        OUR VALUES
      </text>
      <line x1="168" y1="128" x2="222" y2="128" stroke={PAL.rule} strokeWidth="1.6" />
      <line x1="174" y1="135" x2="216" y2="135" stroke={PAL.rule} strokeWidth="1.6" />

      {/* Customer and extracted coin stack on the right */}
      <IsoCoinStack x={284} y={146} n={4} signal />
      <IsoPerson
        x={338}
        y={146}
        scale={0.88}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />
    </Frame>
  );
}

/**
 * Slide 4 — Part 1: Ethical Frameworks for Automated Decisions:
 * One GlassCube in the center of the board examined simultaneously through
 * three architectural stations: Outcomes (coin stacks on pedestal), Rights &
 * Duties (verdigris shield wall), and Institutional Character (steward + pillar).
 */
export function IsoThreeLenses() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama: a central glass AI cube is examined from three stations on the board: aggregate coin stacks on the left for consequentialism, a verdigris rights shield wall in the middle-right for deontology, and an institutional steward beside a pillar on the far right for virtue ethics."
    >
      <IsoBase w={800} />

      {/* Station 1 (Left): Consequentialism — aggregate outcomes */}
      <Key x={156} y={32} anchor="middle" fill={PAL.ink2}>
        1 · OUTCOMES
      </Key>
      <IsoBlock
        x={96}
        y={150}
        w={96}
        d={28}
        h={18}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoCoinStack x={128} y={128} n={5} />
      <IsoCoinStack x={164} y={128} n={2} signal />
      <line
        x1={216}
        y1={116}
        x2={318}
        y2={116}
        stroke={PAL.ink2}
        strokeWidth="1.8"
        strokeDasharray="4 3"
      />
      <polygon points="318,116 310,112 310,120" fill={PAL.ink2} />

      {/* Central AI system under evaluation */}
      <GlassCube
        x={330}
        y={148}
        w={68}
        d={48}
        h={66}
        outside={
          <g>
            <ellipse cx="415" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />
            <line x1="415" y1="106" x2="492" y2="106" stroke={PAL.signal} strokeWidth="3.2" />
            <path d="M 486 99 L 496 104 M 486 113 L 496 108" fill="none" stroke={PAL.signal} strokeWidth="2.4" />
          </g>
        }
      >
        <circle cx="378" cy="104" r="16" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <line x1="366" y1="110" x2="390" y2="98" stroke={PAL.ink} strokeWidth="2.4" />
        <circle cx="378" cy="104" r="4.5" fill={PAL.signal} />
      </GlassCube>

      {/* Station 2 (Right-center): Deontology — inviolable rights shield wall */}
      <Key x={522} y={32} anchor="middle" fill={PAL.counter}>
        2 · RIGHTS &amp; DUTIES
      </Key>
      <IsoBlock
        x={500}
        y={152}
        w={18}
        d={40}
        h={78}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      {/* Station 3 (Far right): Virtue Ethics — institutional character & steward */}
      <Key x={662} y={32} anchor="middle" fill={PAL.ink2}>
        3 · CHARACTER
      </Key>
      <IsoBlock
        x={608}
        y={150}
        w={28}
        d={26}
        h={46}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={692}
        y={148}
        scale={0.92}
        flip
        coat={PAL.ink}
        coatShade={PAL.ink2}
        skin={PAL.skin2}
        reach
      />
    </Frame>
  );
}

/**
 * Slide 5 — Consequentialism and Market Welfare:
 * Interactive diorama showing how an objective-function optimizer in a GlassCube
 * raises total consumer surplus on average while excluding a minority segment
 * from credit offers.
 */
export function IsoWelfareTradeoff() {
  const [view, setView] = useState<"segment" | "aggregate">("segment");
  const showSegment = view === "segment";

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Isometric tabletop diorama of consequentialist welfare optimization: a glass AI cube optimizes an objective function on the left; ${showSegment ? "disaggregated across the board, three majority shoppers receive tall verdigris coin stacks while a minority applicant on the right is locked behind a red credit-exclusion barrier" : "in the aggregate view, all outcomes are pooled into a single tall verdigris surplus column that hides the excluded minority group"}.`}
      >
        <IsoBase w={800} />

        {/* Left: GlassCube optimizing objective function */}
        <Key x={120} y={30} anchor="middle" fill={PAL.ink3}>
          OBJECTIVE FUNCTION
        </Key>
        <GlassCube
          x={68}
          y={148}
          w={64}
          d={46}
          h={64}
          outside={
            <g>
              <ellipse cx="148" cy="105" rx="4.5" ry="6.5" fill={PAL.ink} />
              <line x1="148" y1="105" x2="212" y2="105" stroke={PAL.counter} strokeWidth="2.6" />
              <polygon points="218,105 210,101 210,109" fill={PAL.counter} />
            </g>
          }
        >
          {/* Rising optimization curve inside the cube */}
          <path
            d="M 84 124 Q 98 114 106 96 T 122 82"
            fill="none"
            stroke={PAL.counter}
            strokeWidth="2.4"
          />
          <circle cx="122" cy="82" r="4" fill={PAL.counter} />
        </GlassCube>

        {showSegment ? (
          <>
            <Key x={364} y={30} anchor="middle" fill={PAL.counter}>
              MAJORITY SEGMENT · +SURPLUS
            </Key>
            {[256, 348, 440].map((px, i) => (
              <g key={px}>
                <IsoPerson
                  x={px}
                  y={146 - i * 3}
                  scale={0.88}
                  coat={PAL.counter}
                  coatShade={PAL.counterMid}
                  skin={i === 1 ? PAL.skin2 : PAL.skin1}
                />
                <IsoCoinStack x={px + 28} y={150 - i * 3} n={4 + (i % 2)} />
              </g>
            ))}

            {/* Credit exclusion wall locking out minority segment */}
            <Key x={644} y={30} anchor="middle" fill={PAL.signal}>
              EXCLUDED SEGMENT · NO CREDIT OFFER
            </Key>
            <IsoBlock
              x={548}
              y={152}
              w={18}
              d={42}
              h={76}
              topFill={PAL.signalLight}
              leftFill={PAL.signal}
              rightFill={PAL.signalMid}
            />
            <IsoPerson
              x={678}
              y={148}
              scale={0.9}
              flip
              coat={PAL.signal}
              coatShade={PAL.signalMid}
              skin={PAL.skin3}
            />
          </>
        ) : (
          <>
            <Key x={450} y={30} anchor="middle" fill={PAL.counter}>
              POOLED AGGREGATE METRIC · +14% AVERAGE SURPLUS (HARM HIDDEN)
            </Key>
            <IsoBlock
              x={348}
              y={152}
              w={164}
              d={44}
              h={24}
              topFill={PAL.paper}
              leftFill={PAL.slabLeft}
              rightFill={PAL.slabRight}
            />
            <IsoCoinStack x={392} y={124} n={6} />
            <IsoCoinStack x={430} y={124} n={7} />
            <IsoCoinStack x={468} y={124} n={6} />
            <IsoPerson
              x={590}
              y={146}
              scale={0.9}
              flip
              coat={PAL.counter}
              coatShade={PAL.counterMid}
              skin={PAL.skin1}
            />
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
 * A GlassCube generates high conversion coins using a fabricated review /
 * manipulative interface, but a solid verdigris deontological constraint wall
 * blocks the coercion and protects the autonomous consumer on the right.
 */
export function IsoDeontologicalDuty() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama: on the left, a glass AI cube drives high conversion coins via a manipulative interface board labelled FAKE 5-STAR, but a solid verdigris deontological constraint wall blocks the red coercive arm so the autonomous consumer on the right makes an informed choice."
    >
      <IsoBase w={800} />

      <Key x={196} y={30} anchor="middle" fill={PAL.signal}>
        MANIPULATIVE INTERFACE
      </Key>

      <GlassCube
        x={64}
        y={148}
        w={64}
        d={46}
        h={64}
        outside={
          <g>
            <ellipse cx="144" cy="104" rx="4.5" ry="6.5" fill={PAL.ink} />
            <path
              d="M 144 104 L 166 104 L 166 54 L 288 54 L 288 86"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.6"
            />
          </g>
        }
      >
        <circle cx="104" cy="104" r="14" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
        <circle cx="104" cy="104" r="4.5" fill={PAL.signal} />
      </GlassCube>

      {/* Conversion profit stack next to the cube */}
      <IsoCoinStack x={198} y={148} n={6} />

      {/* Fabricated product review / manipulative interface block */}
      <IsoBlock
        x={248}
        y={150}
        w={84}
        d={14}
        h={56}
        topFill={PAL.signalLight}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
        stroke={PAL.signal}
      />
      <text
        x="290"
        y="116"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.08em"
        fill={PAL.signal}
      >
        FAKE 5★
      </text>
      <line x1="264" y1="126" x2="316" y2="126" stroke={PAL.signal} strokeWidth="1.8" />
      <line x1="268" y1="134" x2="312" y2="134" stroke={PAL.ink3} strokeWidth="1.4" />

      {/* Red coercive claw extending from manipulative board, stopped by the deontological wall */}
      <line x1="342" y1="114" x2="412" y2="114" stroke={PAL.signal} strokeWidth="3.2" />
      <path d="M 406 107 L 416 112 M 406 121 L 416 116" fill="none" stroke={PAL.signal} strokeWidth="2.4" />

      {/* Inviolable deontological constraint wall */}
      <Key x={568} y={30} anchor="middle" fill={PAL.counter}>
        INVIOLABLE DUTY · INFORMED CONSENT
      </Key>
      <IsoBlock
        x={420}
        y={152}
        w={20}
        d={44}
        h={82}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      {/* Transparent disclosure pedestal and autonomous consumer */}
      <IsoBlock
        x={536}
        y={150}
        w={54}
        d={24}
        h={36}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <line x1="548" y1="126" x2="578" y2="126" stroke={PAL.counter} strokeWidth="2" />
      <line x1="548" y1="133" x2="574" y2="133" stroke={PAL.ink3} strokeWidth="1.6" />

      <IsoPerson
        x={658}
        y={148}
        scale={0.94}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
      />
    </Frame>
  );
}

/**
 * Slide 7 — Virtue Ethics and Institutional Character:
 * Left side of the board: a firm designs its GlassCube assistant to thread a
 * red hook through a narrow gap ("loophole") in a regulation wall.
 * Right side of the board: a trustworthy institution configures its GlassCube
 * transparently and meets the customer in an open handshake across a counter.
 */
export function IsoVirtueCharacter() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama contrasting loophole compliance with institutional character: on the left, a glass AI cube threads a red hook through a narrow loophole gap in a regulation wall to hook a shopper's coins; on the right, a trustworthy institution with a calibrated glass cube greets the customer openly across a counter."
    >
      <IsoBase w={800} />

      {/* Left scene: exploiting a regulatory loophole */}
      <Key x={200} y={28} anchor="middle" fill={PAL.signal}>
        EXPLOITING DISCLOSURE LOOPHOLES
      </Key>

      {/* Split regulation wall with a clear daylight loophole gap (y=88..116) */}
      <IsoBlock
        x={178}
        y={152}
        w={18}
        d={28}
        h={20}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoBlock
        x={178}
        y={84}
        w={18}
        d={28}
        h={22}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />

      <GlassCube
        x={58}
        y={148}
        w={58}
        d={42}
        h={58}
        outside={
          <g>
            <ellipse cx="131" cy="100" rx="4" ry="6" fill={PAL.ink} />
            {/* Red hook threading straight through the daylight loophole gap (y=100) */}
            <line x1="131" y1="100" x2="246" y2="100" stroke={PAL.signal} strokeWidth="3" />
            <path
              d="M 246 100 C 256 100, 256 112, 246 112"
              fill="none"
              stroke={PAL.signal}
              strokeWidth="2.6"
            />
          </g>
        }
      >
        <circle cx="96" cy="108" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="96" cy="108" r="4.5" fill={PAL.signal} />
      </GlassCube>

      <IsoCoinStack x={262} y={148} n={4} signal />
      <IsoPerson
        x={322}
        y={146}
        scale={0.88}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />

      {/* Tabletop divider */}
      <line
        x1={372}
        y1={156}
        x2={452}
        y2={104}
        stroke={PAL.ink3}
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />

      {/* Right scene: institutional trustworthiness, honesty, and care */}
      <Key x={596} y={28} anchor="middle" fill={PAL.counter}>
        INSTITUTIONAL TRUSTWORTHINESS &amp; CARE
      </Key>

      <GlassCube
        x={458}
        y={148}
        w={58}
        d={42}
        h={58}
      >
        <circle cx="496" cy="108" r="13" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="496" cy="108" r="4.5" fill={PAL.counter} />
      </GlassCube>

      <IsoPerson
        x={566}
        y={146}
        scale={0.88}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin2}
        reach
      />
      <IsoBlock
        x={608}
        y={150}
        w={42}
        d={26}
        h={34}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={698}
        y={146}
        scale={0.88}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />
    </Frame>
  );
}

/**
 * Slide 9 — Part 2: Stakeholders and Accountability Across the AI Value Chain:
 * Three distinct organizational stations on the board (Model Developer,
 * Deploying Firm, Marketplace & Consumer) linked by a governance accountability rail.
 */
export function IsoFragmentedChain() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama showing three separate organizations contributing to one consumer decision across the board: a foundation model developer cube on the left, a deploying firm configuration station in the center, and a marketplace podium facing a consumer on the right."
    >
      <IsoBase w={800} />

      <Key x={152} y={30} anchor="middle" fill={PAL.ink3}>
        MODEL DEVELOPER
      </Key>
      <GlassCube
        x={108}
        y={148}
        w={58}
        d={42}
        h={58}
        outside={
          <g>
            <ellipse cx="181" cy="108" rx="4" ry="6" fill={PAL.ink} />
            <line x1="181" y1="108" x2="316" y2="108" stroke={PAL.ink2} strokeWidth="2.2" strokeDasharray="5 4" />
            <polygon points="322,108 314,104 314,112" fill={PAL.ink2} />
          </g>
        }
      >
        <circle cx="146" cy="108" r="12" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
        <circle cx="146" cy="108" r="4" fill={PAL.ink} />
      </GlassCube>

      <Key x={378} y={30} anchor="middle" fill={PAL.counter}>
        DEPLOYING FIRM
      </Key>
      <GlassCube
        x={334}
        y={148}
        w={58}
        d={42}
        h={58}
        outside={
          <g>
            <ellipse cx="407" cy="108" rx="4" ry="6" fill={PAL.ink} />
            <line x1="407" y1="108" x2="532" y2="108" stroke={PAL.signal} strokeWidth="2.4" />
            <polygon points="538,108 530,104 530,112" fill={PAL.signal} />
          </g>
        }
      >
        <rect x="352" y="96" width="24" height="24" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
      </GlassCube>

      <Key x={614} y={30} anchor="middle" fill={PAL.signal}>
        MARKET DECISION &amp; CONSUMER
      </Key>
      <IsoBlock
        x={548}
        y={150}
        w={48}
        d={28}
        h={42}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={674}
        y={148}
        scale={0.92}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin2}
      />
    </Frame>
  );
}

/**
 * Slide 10 — The AI Value Chain in Commercial Markets:
 * Interactive 800-unit diorama showing all five value-chain actors across the
 * 3D board: (1) Developer GlassCube, (2) Deploying Firm counter, (3) Digital
 * Platform ranking GlassCube, (4) Consumer & Bystander, and (5) Regulator / Auditor.
 */
export function IsoValueChainFiveActors() {
  const [stage, setStage] = useState<"all" | "1" | "2" | "3" | "4" | "5">("all");
  const isLit = (s: "1" | "2" | "3" | "4" | "5") => stage === "all" || stage === s;

  return (
    <div>
      <Frame
        width={800}
        height={210}
        label="Isometric tabletop diorama of the five-stage commercial AI value chain: foundation model developer glass cube, downstream deploying firm counter, digital platform marketplace cube, consumer and bystander, and regulator and auditor oversight podium."
      >
        <IsoBase w={800} />

        {/* Stage 1: Foundation model developer */}
        <g opacity={isLit("1") ? 1 : 0.38}>
          <Key x={110} y={28} anchor="middle" fill={stage === "1" ? PAL.signal : PAL.ink2}>
            01 · DEVELOPER
          </Key>
          <GlassCube
            x={68}
            y={148}
            w={54}
            d={38}
            h={54}
            outside={
              <g>
                <ellipse cx="136" cy="110" rx="3.8" ry="5.5" fill={PAL.ink} />
                <line x1="136" y1="110" x2="198" y2="110" stroke={PAL.ink2} strokeWidth="2" />
                <polygon points="204,110 196,106 196,114" fill={PAL.ink2} />
              </g>
            }
          >
            <circle cx="104" cy="110" r="12" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
            <circle cx="104" cy="110" r="4" fill={PAL.ink} />
          </GlassCube>
        </g>

        {/* Stage 2: Downstream deploying firm */}
        <g opacity={isLit("2") ? 1 : 0.38}>
          <Key x={246} y={28} anchor="middle" fill={stage === "2" ? PAL.signal : PAL.ink2}>
            02 · DEPLOYER
          </Key>
          <IsoBlock
            x={210}
            y={148}
            w={52}
            d={34}
            h={44}
            topFill={PAL.paper}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          <line x1="222" y1="120" x2="250" y2="120" stroke={PAL.ink} strokeWidth="2" />
          <line x1="222" y1="128" x2="244" y2="128" stroke={PAL.ink3} strokeWidth="1.6" />
          <line x1="286" y1="110" x2="332" y2="110" stroke={PAL.ink2} strokeWidth="2" />
          <polygon points="338,110 330,106 330,114" fill={PAL.ink2} />
        </g>

        {/* Stage 3: Digital platform marketplace */}
        <g opacity={isLit("3") ? 1 : 0.38}>
          <Key x={384} y={28} anchor="middle" fill={stage === "3" ? PAL.signal : PAL.ink2}>
            03 · PLATFORM
          </Key>
          <GlassCube
            x={344}
            y={148}
            w={54}
            d={38}
            h={54}
            outside={
              <g>
                <ellipse cx="412" cy="110" rx="3.8" ry="5.5" fill={PAL.ink} />
                <line x1="412" y1="110" x2="474" y2="110" stroke={PAL.signal} strokeWidth="2.2" />
                <polygon points="480,110 472,106 472,114" fill={PAL.signal} />
              </g>
            }
          >
            {/* Ranking bars inside platform cube */}
            <rect x="358" y="102" width="22" height="6" fill={PAL.signal} />
            <rect x="358" y="112" width="16" height="6" fill={PAL.ink2} />
            <rect x="358" y="122" width="12" height="6" fill={PAL.ink3} />
          </GlassCube>
        </g>

        {/* Stage 4: Consumers and bystanders */}
        <g opacity={isLit("4") ? 1 : 0.38}>
          <Key x={534} y={28} anchor="middle" fill={PAL.signal}>
            04 · CONSUMER
          </Key>
          <IsoCoinStack x={498} y={148} n={3} signal />
          <IsoPerson
            x={548}
            y={148}
            scale={0.84}
            flip
            coat={PAL.signal}
            coatShade={PAL.signalMid}
            skin={PAL.skin3}
          />
        </g>

        {/* Stage 5: Regulators, auditors, civil society */}
        <g opacity={isLit("5") ? 1 : 0.38}>
          <Key x={676} y={28} anchor="middle" fill={PAL.counter}>
            05 · REGULATOR
          </Key>
          <IsoBlock
            x={626}
            y={150}
            w={26}
            d={28}
            h={48}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <IsoPerson
            x={698}
            y={148}
            scale={0.86}
            flip
            coat={PAL.counter}
            coatShade={PAL.counterMid}
            skin={PAL.skin1}
            reach
          />
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
              <ellipse cx="212" cy="110" rx="4" ry="5.5" fill={PAL.ink} />
              <line x1="212" y1="110" x2="342" y2="110" stroke={PAL.ink3} strokeWidth="1.8" strokeDasharray="4 3" />
            </g>
          }
        >
          <circle cx="178" cy="110" r="12" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
          <circle cx="178" cy="110" r="4" fill={PAL.ink} />
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
 * Four governance stations across the 800-unit board:
 * (1) Developer with GlassCube + Model Documentation dossier,
 * (2) Deploying Firm with task-validation & oversight desk,
 * (3) Platform with clear SPONSORED disclosure podium,
 * (4) Independent Auditor separated by a conflict-of-interest wall.
 */
export function IsoAccountabilityDossiers() {
  return (
    <Frame
      width={800}
      height={205}
      label="Isometric tabletop diorama showing four stakeholder accountability stations: model developer cube with documentation block, deploying firm human oversight desk, platform ranking podium with clear SPONSORED disclosure, and independent auditor separated by a conflict-of-interest wall."
    >
      <IsoBase w={800} />

      {/* 1. Foundation model developer: model documentation */}
      <Key x={136} y={28} anchor="middle" fill={PAL.ink2}>
        MODEL DOCS
      </Key>
      <GlassCube x={72} y={148} w={50} d={36} h={50}>
        <circle cx="104" cy="112" r="11" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.5" />
        <circle cx="104" cy="112" r="3.5" fill={PAL.ink} />
      </GlassCube>
      <IsoBlock
        x={152}
        y={150}
        w={34}
        d={22}
        h={40}
        topFill={PAL.paper}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <line x1="160" y1="122" x2="178" y2="122" stroke={PAL.ink} strokeWidth="1.8" />
      <line x1="160" y1="129" x2="176" y2="129" stroke={PAL.ink3} strokeWidth="1.5" />
      <line x1="160" y1="136" x2="174" y2="136" stroke={PAL.signal} strokeWidth="1.8" />

      {/* 2. Deploying firm: task validation & human oversight */}
      <Key x={312} y={28} anchor="middle" fill={PAL.signal}>
        TASK VALIDATION
      </Key>
      <IsoPerson
        x={266}
        y={148}
        scale={0.84}
        coat={PAL.ink}
        coatShade={PAL.ink2}
        skin={PAL.skin1}
        reach
      />
      <IsoBlock
        x={304}
        y={150}
        w={52}
        d={26}
        h={36}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <line x1="316" y1="126" x2="344" y2="126" stroke={PAL.counter} strokeWidth="2.2" />
      <line x1="316" y1="134" x2="338" y2="134" stroke={PAL.counter} strokeWidth="2.2" />

      {/* 3. Platform: auction rules & sponsorship disclosure */}
      <Key x={486} y={28} anchor="middle" fill={PAL.ink2}>
        CLEAR DISCLOSURE
      </Key>
      <IsoBlock
        x={442}
        y={150}
        w={72}
        d={28}
        h={46}
        topFill={PAL.paper}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <text
        x="478"
        y="122"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="0.08em"
        fill={PAL.counter}
      >
        SPONSORED
      </text>
      <line x1="456" y1="132" x2="500" y2="132" stroke={PAL.ink2} strokeWidth="1.8" />
      <line x1="456" y1="139" x2="492" y2="139" stroke={PAL.ink3} strokeWidth="1.4" />

      {/* 4. Auditor & ethics board: independent verification */}
      <Key x={664} y={28} anchor="middle" fill={PAL.counter}>
        INDEPENDENT AUDIT
      </Key>
      <IsoBlock
        x={596}
        y={150}
        w={14}
        d={36}
        h={64}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoBlock
        x={638}
        y={150}
        w={30}
        d={22}
        h={34}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={706}
        y={148}
        scale={0.86}
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
 * Slide 13 — Discussion: When a Pricing Model Discriminates:
 * Two policyholders with identical loss profiles submit claim narratives into
 * a licensed third-party GlassCube; non-native claims are flagged at twice the
 * rate (2x red column) of native claims (1x verdigris column).
 */
export function IsoInsuranceClaims() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama of insurance claim screening: two claimants with identical loss coin stacks submit narratives into a third-party glass AI cube, which outputs a 2x fraud investigation flag column in red for non-native speakers compared with 1x for native speakers."
    >
      <IsoBase />
      <Key x={100} y={26} anchor="middle" fill={PAL.ink3}>
        IDENTICAL LOSS
      </Key>

      {/* Native speaker + identical 3-coin loss stack */}
      <IsoPerson
        x={60}
        y={148}
        scale={0.82}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
      />
      <IsoCoinStack x={86} y={150} n={3} />

      {/* Non-native speaker + identical 3-coin loss stack */}
      <IsoPerson
        x={124}
        y={142}
        scale={0.82}
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />
      <IsoCoinStack x={150} y={144} n={3} />

      {/* Licensed 3rd-party foundation model GlassCube */}
      <GlassCube
        x={186}
        y={148}
        w={56}
        d={40}
        h={56}
        outside={
          <g>
            <ellipse cx="256" cy="108" rx="4" ry="5.5" fill={PAL.ink} />
            <line x1="256" y1="108" x2="280" y2="108" stroke={PAL.ink2} strokeWidth="2" />
          </g>
        }
      >
        <line x1="200" y1="104" x2="228" y2="104" stroke={PAL.ink} strokeWidth="2" />
        <line x1="200" y1="112" x2="224" y2="112" stroke={PAL.signal} strokeWidth="2" />
        <line x1="200" y1="120" x2="220" y2="120" stroke={PAL.ink3} strokeWidth="1.6" />
      </GlassCube>

      <Key x={318} y={26} anchor="middle" fill={PAL.signal}>
        FRAUD FLAGS (1× VS 2×)
      </Key>

      {/* 1x baseline flag column */}
      <IsoBlock
        x={284}
        y={150}
        w={22}
        d={22}
        h={30}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <Key x={302} y={96} anchor="middle" fill={PAL.counter} size={10.5}>
        1×
      </Key>

      {/* 2x non-native flag column */}
      <IsoBlock
        x={326}
        y={150}
        w={22}
        d={22}
        h={60}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <Key x={344} y={66} anchor="middle" fill={PAL.signal} size={10.5}>
        2×
      </Key>
    </Frame>
  );
}

/**
 * Slide 14 — Part 3: The Governance Gap Between Benchmarks and Markets:
 * Left side of the board: a GlassCube sits atop a #1 (96%) leaderboard podium.
 * Right side of the board: the same GlassCube deployed in a real market
 * imposes a red barrier against a consumer.
 */
export function IsoBenchmarkGap() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama of the governance gap between benchmarks and markets: on the left, a glass AI cube stands atop a 96% first-place leaderboard podium; on the right, the same glass cube deployed in a commercial market raises a red barrier against a shopper."
    >
      <IsoBase w={800} />

      {/* Left: Public leaderboard stepped podium */}
      <Key x={196} y={26} anchor="middle" fill={PAL.counter}>
        LEADERBOARD RANK #1 · 96% SCORE
      </Key>
      <IsoBlock
        x={108}
        y={152}
        w={116}
        d={38}
        h={16}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoBlock
        x={136}
        y={136}
        w={60}
        d={34}
        h={34}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text
        x="166"
        y="124"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={PAL.paper}
      >
        96%
      </text>

      <GlassCube x={140} y={102} w={52} d={32} h={46}>
        <circle cx="172" cy="70" r="10" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="172" cy="70" r="3.5" fill={PAL.counter} />
      </GlassCube>

      {/* Tabletop gap line */}
      <line
        x1={342}
        y1={156}
        x2={422}
        y2={104}
        stroke={PAL.ink3}
        strokeWidth="1.6"
        strokeDasharray="5 4"
      />

      {/* Right: Real market deployment */}
      <Key x={578} y={26} anchor="middle" fill={PAL.signal}>
        MARKET DEPLOYMENT · UNVERIFIED BEHAVIOR
      </Key>
      <GlassCube
        x={448}
        y={148}
        w={58}
        d={42}
        h={58}
        outside={
          <g>
            <ellipse cx="521" cy="108" rx="4" ry="6" fill={PAL.ink} />
            <line x1="521" y1="108" x2="578" y2="108" stroke={PAL.signal} strokeWidth="3.2" />
            <path d="M 572 101 L 582 106 M 572 115 L 582 110" fill="none" stroke={PAL.signal} strokeWidth="2.4" />
          </g>
        }
      >
        <circle cx="486" cy="108" r="13" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="486" cy="108" r="4.5" fill={PAL.signal} />
      </GlassCube>

      <IsoBlock
        x={588}
        y={150}
        w={18}
        d={36}
        h={62}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <IsoPerson
        x={682}
        y={148}
        scale={0.9}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />
    </Frame>
  );
}

/**
 * Slide 15 — Technical Benchmarks Versus Market Behavior:
 * Interactive diorama (Wadi & Fredette, 2025): the same prompt fed into a
 * probabilistic GlassCube yields a distribution of choices across repeated runs,
 * and a small change in framing reverses the modal recommendation.
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
    { x: 356, label: "BRAND A · SLOT 1", count: counts[0], highlight: framing === "standard" },
    { x: 492, label: "BRAND B · SLOT 2", count: counts[1], highlight: false },
    { x: 628, label: "BRAND C · SLOT 3", count: counts[2], highlight: framing === "shifted" },
  ];

  return (
    <div>
      <Frame
        width={800}
        height={220}
        label={`Isometric tabletop diorama of probabilistic LLM recommendations across ${runs} repeated runs under ${framing} framing: a prompt block feeds a glass AI cube on the left, which distributes choices across three brand pedestals on the right (${counts[0]}, ${counts[1]}, and ${counts[2]} selections).`}
      >
        <IsoBase w={800} />

        <Key x={754} y={198} anchor="end" fill={PAL.ink3} size={9.5}>
          SIMULATED · REPEATED PROMPT RUNS
        </Key>

        {/* Prompt input block on the left */}
        <Key x={106} y={32} anchor="middle" fill={PAL.ink2}>
          SAME PROMPT
        </Key>
        <IsoBlock
          x={76}
          y={148}
          w={48}
          d={26}
          h={38}
          topFill={PAL.paper}
          leftFill={PAL.paper}
          rightFill={PAL.slabLeft}
        />
        <line x1="86" y1="122" x2="114" y2="122" stroke={PAL.ink} strokeWidth="1.8" />
        <line x1="86" y1="130" x2="110" y2="130" stroke={PAL.ink3} strokeWidth="1.5" />
        <line x1="146" y1="120" x2="174" y2="120" stroke={PAL.ink2} strokeWidth="2" />
        <polygon points="180,120 172,116 172,124" fill={PAL.ink2} />

        {/* Probabilistic LLM GlassCube */}
        <GlassCube
          x={186}
          y={148}
          w={62}
          d={44}
          h={62}
          outside={
            <g>
              <ellipse cx="264" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />
              <path
                d="M 264 106 L 314 106"
                fill="none"
                stroke={PAL.signal}
                strokeWidth="2.4"
                strokeDasharray="4 3"
              />
              <polygon points="320,106 312,102 312,110" fill={PAL.signal} />
            </g>
          }
        >
          {/* Stochastic spinner / distribution inside the cube */}
          <circle cx="228" cy="106" r="15" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
          <line
            x1="228"
            y1="106"
            x2={framing === "standard" ? 218 : 238}
            y2="95"
            stroke={PAL.signal}
            strokeWidth="2.4"
          />
          <circle cx="228" cy="106" r="3.5" fill={PAL.signal} />
        </GlassCube>

        {/* Three recommendation pedestals on the right */}
        {slots.map((slot) => {
          const barH = Math.max(12, Math.round(slot.count * 2.8));
          const topY = r2(150 - barH - 26 * 0.52);
          return (
            <g key={slot.label}>
              <Key
                x={slot.x + 28}
                y={30}
                anchor="middle"
                fill={slot.highlight ? PAL.signal : PAL.ink3}
                size={9.5}
              >
                {slot.label}
              </Key>
              <IsoBlock
                x={slot.x}
                y={150}
                w={38}
                d={26}
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
 * Interactive 800-unit diorama with four stations illustrating construct
 * mismatch, single-sample fragility, prompt/context sensitivity, and
 * benchmark contamination.
 */
export function IsoBenchmarkFailures() {
  const [focus, setFocus] = useState<"all" | "1" | "2" | "3" | "4">("all");
  const lit = (id: "1" | "2" | "3" | "4") => focus === "all" || focus === id;

  return (
    <div>
      <Frame
        width={800}
        height={210}
        label="Isometric tabletop diorama showing four benchmark failure modes across the board: construct mismatch (trivia vs credit), single-sample fragility (1 pass hiding repeated fails), prompt sensitivity (commercial role flipping behavior), and benchmark contamination (test key leaked into training data)."
      >
        <IsoBase w={800} />

        {/* 1. Construct mismatch */}
        <g opacity={lit("1") ? 1 : 0.35}>
          <Key x={128} y={28} anchor="middle" fill={focus === "1" ? PAL.signal : PAL.ink2}>
            1 · CONSTRUCT MISMATCH
          </Key>
          <IsoBlock
            x={72}
            y={150}
            w={42}
            d={24}
            h={38}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <text x="93" y="135" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
            TRIVIA
          </text>
          <IsoBlock
            x={136}
            y={150}
            w={42}
            d={24}
            h={38}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <text x="157" y="135" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
            CREDIT
          </text>
        </g>

        {/* 2. Single-sample fragility */}
        <g opacity={lit("2") ? 1 : 0.35}>
          <Key x={312} y={28} anchor="middle" fill={focus === "2" ? PAL.signal : PAL.ink2}>
            2 · N=1 FRAGILITY
          </Key>
          {/* 1 tested sample in front (green) */}
          <IsoBlock
            x={248}
            y={150}
            w={22}
            d={18}
            h={32}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          {/* Unsampled distribution draws in red beside it */}
          {[290, 326, 362].map((bx, i) => (
            <IsoBlock
              key={bx}
              x={bx}
              y={150}
              w={18}
              d={16}
              h={38 + (i % 2) * 10}
              topFill={PAL.signalLight}
              leftFill={PAL.signal}
              rightFill={PAL.signalMid}
            />
          ))}
        </g>

        {/* 3. Prompt & context sensitivity */}
        <g opacity={lit("3") ? 1 : 0.35}>
          <Key x={494} y={28} anchor="middle" fill={focus === "3" ? PAL.signal : PAL.ink2}>
            3 · PROMPT SENSITIVITY
          </Key>
          <IsoBlock
            x={426}
            y={148}
            w={30}
            d={18}
            h={32}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <GlassCube x={488} y={148} w={52} d={36} h={52}>
            <circle cx="520" cy="112" r="12" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
            <line x1="511" y1="118" x2="529" y2="106" stroke={PAL.signal} strokeWidth="2.5" />
          </GlassCube>
        </g>

        {/* 4. Benchmark contamination */}
        <g opacity={lit("4") ? 1 : 0.35}>
          <Key x={668} y={28} anchor="middle" fill={focus === "4" ? PAL.signal : PAL.ink2}>
            4 · CONTAMINATION
          </Key>
          {/* Training corpus block */}
          <IsoBlock
            x={612}
            y={150}
            w={42}
            d={24}
            h={40}
            topFill={PAL.paper}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          <text x="633" y="134" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
            TRAIN
          </text>
          {/* Test benchmark block */}
          <IsoBlock
            x={682}
            y={150}
            w={42}
            d={24}
            h={40}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <text x="703" y="134" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            TEST
          </text>
          {/* Leak arch from TEST back into TRAIN */}
          <path
            d="M 706 94 L 706 68 L 636 68 L 636 90"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="2.2"
          />
          <polygon points="636,96 632,88 640,88" fill={PAL.signal} />
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
 * Interactive 800-unit diorama with six sequential governance stations across
 * the board (01 Scoping, 02 Data, 03 Audit GlassCube, 04 Oversight Gate,
 * 05 Sign-Off Authority, 06 Live Monitoring & Rollback).
 */
export function IsoSixStages() {
  const [stage, setStage] = useState<"all" | "1" | "2" | "3" | "4" | "5" | "6">("all");
  const lit = (s: "1" | "2" | "3" | "4" | "5" | "6") => stage === "all" || stage === s;

  return (
    <div>
      <Frame
        width={800}
        height={205}
        label="Isometric tabletop diorama of the six stages of algorithmic governance arranged left to right across the board: Stage 1 scoping, Stage 2 data review, Stage 3 behavioral auditing glass cube, Stage 4 human oversight gate, Stage 5 launch sign-off authority, and Stage 6 post-deployment monitoring with a rollback loop."
      >
        <IsoBase w={800} />

        {/* Stage 1: Scoping & Risk Classification */}
        <g opacity={lit("1") ? 1 : 0.35}>
          <Key x={96} y={26} anchor="middle" fill={stage === "1" ? PAL.signal : PAL.ink2} size={9.5}>
            01 · SCOPING
          </Key>
          <IsoBlock
            x={68}
            y={150}
            w={44}
            d={26}
            h={32}
            topFill={PAL.paper}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          <text x="90" y="138" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
            TIER
          </text>
        </g>

        {/* Stage 2: Data & Provenance Review */}
        <g opacity={lit("2") ? 1 : 0.35}>
          <Key x={198} y={26} anchor="middle" fill={stage === "2" ? PAL.signal : PAL.ink2} size={9.5}>
            02 · DATA
          </Key>
          <IsoBlock
            x={170}
            y={150}
            w={44}
            d={26}
            h={40}
            topFill={PAL.paper}
            leftFill={PAL.paper}
            rightFill={PAL.slabLeft}
          />
          <line x1="180" y1="124" x2="204" y2="124" stroke={PAL.counter} strokeWidth="2" />
          <line x1="180" y1="132" x2="200" y2="132" stroke={PAL.ink3} strokeWidth="1.6" />
        </g>

        {/* Stage 3: Pre-Deployment Behavioral Auditing */}
        <g opacity={lit("3") ? 1 : 0.35}>
          <Key x={306} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
            03 · AUDIT
          </Key>
          <GlassCube x={274} y={150} w={50} d={34} h={50}>
            <circle cx="305" cy="114" r="11" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
            <circle cx="305" cy="114" r="3.5" fill={PAL.signal} />
          </GlassCube>
        </g>

        {/* Stage 4: Oversight & Disclosure Design */}
        <g opacity={lit("4") ? 1 : 0.35}>
          <Key x={412} y={26} anchor="middle" fill={stage === "4" ? PAL.counter : PAL.ink2} size={9.5}>
            04 · OVERSIGHT
          </Key>
          <IsoBlock
            x={392}
            y={150}
            w={20}
            d={32}
            h={56}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
        </g>

        {/* Stage 5: Authorization & Launch Sign-Off */}
        <g opacity={lit("5") ? 1 : 0.35}>
          <Key x={524} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
            05 · SIGN-OFF
          </Key>
          <IsoBlock
            x={478}
            y={150}
            w={40}
            d={24}
            h={34}
            topFill={PAL.paper}
            leftFill={PAL.slabLeft}
            rightFill={PAL.slabRight}
          />
          <IsoPerson
            x={556}
            y={148}
            scale={0.82}
            flip
            coat={PAL.counter}
            coatShade={PAL.counterMid}
            skin={PAL.skin1}
            reach
          />
        </g>

        {/* Stage 6: Post-Deployment Monitoring & Rollback */}
        <g opacity={lit("6") ? 1 : 0.35}>
          <Key x={662} y={26} anchor="middle" fill={stage === "6" ? PAL.signal : PAL.ink2} size={9.5}>
            06 · MONITOR
          </Key>
          <IsoBlock
            x={624}
            y={150}
            w={54}
            d={28}
            h={42}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <text x="651" y="133" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
            DRIFT
          </text>
          {/* Rollback protocol arch from Stage 6 back to Stage 3 Audit */}
          <path
            d="M 658 90 L 658 52 L 308 52 L 308 78"
            fill="none"
            stroke={PAL.signal}
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <polygon points="308,84 304,76 312,76" fill={PAL.signal} />
          <Key x={484} y={44} anchor="middle" fill={PAL.signal} size={9}>
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
 * An algorithmic GlassCube on the left and a human reviewer in the center share
 * a control desk that governs decisions reaching the consumer on the right.
 */
export function IsoSharedAuthority() {
  return (
    <Frame
      width={800}
      height={210}
      label="Isometric tabletop diorama of shared decision authority: a glass AI cube on the left feeds recommendations to a central oversight console where a human reviewer controls the release gate before the decision reaches the consumer on the right."
    >
      <IsoBase w={800} />

      <Key x={156} y={28} anchor="middle" fill={PAL.ink2}>
        ALGORITHMIC RECOMMENDATION
      </Key>
      <GlassCube
        x={108}
        y={148}
        w={62}
        d={44}
        h={62}
        outside={
          <g>
            <ellipse cx="186" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />
            <line x1="186" y1="106" x2="326" y2="106" stroke={PAL.ink2} strokeWidth="2.4" />
            <polygon points="332,106 324,102 324,110" fill={PAL.ink2} />
          </g>
        }
      >
        <circle cx="150" cy="106" r="14" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
        <circle cx="150" cy="106" r="4.5" fill={PAL.ink} />
      </GlassCube>

      <Key x={412} y={28} anchor="middle" fill={PAL.counter}>
        SHARED AUTHORITY &amp; COGNITIVE DESIGN
      </Key>
      <IsoBlock
        x={340}
        y={150}
        w={78}
        d={30}
        h={40}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoPerson
        x={476}
        y={148}
        scale={0.92}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />

      <line x1="504" y1="120" x2="624" y2="120" stroke={PAL.counter} strokeWidth="2.2" strokeDasharray="5 4" />
      <polygon points="630,120 622,116 622,124" fill={PAL.counter} />

      <Key x={668} y={28} anchor="middle" fill={PAL.ink2}>
        MARKET ACTION
      </Key>
      <IsoPerson
        x={678}
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
 * Slide 19A — Human-in-the-Loop Regime:
 * The GlassCube generates a score, and a human reviewer at the gate must
 * approve each individual case before action reaches the applicant.
 */
export function IsoInTheLoop() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama of human-in-the-loop oversight: a glass AI cube outputs a single recommendation to a review gate where a human officer actively inspects and approves the individual case before it reaches the applicant."
    >
      <IsoBase />
      <Key x={200} y={26} anchor="middle" fill={PAL.counter}>
        CASE-BY-CASE HUMAN SIGN-OFF
      </Key>

      <GlassCube
        x={44}
        y={148}
        w={54}
        d={38}
        h={54}
        outside={
          <g>
            <ellipse cx="112" cy="110" rx="4" ry="5.5" fill={PAL.ink} />
            <line x1="112" y1="110" x2="148" y2="110" stroke={PAL.ink2} strokeWidth="2.2" />
          </g>
        }
      >
        <circle cx="80" cy="110" r="12" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="80" cy="110" r="4" fill={PAL.counter} />
      </GlassCube>

      <IsoBlock
        x={152}
        y={150}
        w={36}
        d={26}
        h={44}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <IsoPerson
        x={236}
        y={148}
        scale={0.88}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />

      <line x1="258" y1="122" x2="296" y2="122" stroke={PAL.counter} strokeWidth="2" />
      <polygon points="302,122 294,118 294,126" fill={PAL.counter} />

      <IsoPerson
        x={338}
        y={148}
        scale={0.88}
        flip
        coat={PAL.ink2}
        coatShade={PAL.ink}
        skin={PAL.skin2}
      />
    </Frame>
  );
}

/**
 * Slide 19B — Human-on-the-Loop Regime:
 * The GlassCube streams real-time decisions along the board while a human
 * operator on an elevated monitoring platform watches a dashboard with an
 * override cutoff lever.
 */
export function IsoOnTheLoop() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama of human-on-the-loop oversight: a glass AI cube streams real-time decisions across the front of the board while a human operator on a raised observation deck monitors a dashboard and holds an override cutoff plunger above the stream."
    >
      <IsoBase />
      <Key x={200} y={26} anchor="middle" fill={PAL.ink2}>
        REAL-TIME STREAM · DASHBOARD OVERRIDE
      </Key>

      <GlassCube
        x={44}
        y={146}
        w={54}
        d={38}
        h={54}
        outside={
          <g>
            <ellipse cx="112" cy="120" rx="4" ry="5.5" fill={PAL.ink} />
            <path
              d="M 112 120 L 136 120 L 136 146 L 298 146"
              fill="none"
              stroke={PAL.counter}
              strokeWidth="2.4"
              strokeDasharray="6 4"
            />
            <polygon points="304,146 296,142 296,150" fill={PAL.counter} />
          </g>
        }
      >
        <circle cx="80" cy="108" r="12" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
        <circle cx="80" cy="108" r="4" fill={PAL.ink} />
      </GlassCube>

      {/* Elevated monitoring deck well above the y=146 stream */}
      <IsoBlock
        x={162}
        y={128}
        w={76}
        d={22}
        h={18}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={222}
        y={108}
        scale={0.74}
        flip
        coat={PAL.ink}
        coatShade={PAL.ink2}
        skin={PAL.skin2}
        reach
      />
      {/* Vertical cutoff plunger poised above the stream */}
      <line x1="182" y1="128" x2="182" y2="140" stroke={PAL.signal} strokeWidth="2.6" />
      <line x1="176" y1="140" x2="188" y2="140" stroke={PAL.signal} strokeWidth="2.6" />

      <IsoCoinStack x={328} y={148} n={4} />
    </Frame>
  );
}

/**
 * Slide 19C — Fully Autonomous Regime:
 * The GlassCube initiates and completes actions automatically between
 * pre-programmed constraint posts, with periodic post-hoc auditing on the side.
 */
export function IsoAutonomous() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama of a fully autonomous regime: a glass AI cube framed between two verdigris pre-programmed constraint posts executes transactions automatically into a market stack, while an auditor on the far right inspects a post-hoc log block."
    >
      <IsoBase />
      <Key x={200} y={26} anchor="middle" fill={PAL.signal}>
        BOUNDED BY CONSTRAINTS · POST-HOC AUDIT
      </Key>

      {/* Left pre-programmed constraint curb */}
      <IsoBlock
        x={40}
        y={150}
        w={12}
        d={22}
        h={20}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      <GlassCube
        x={68}
        y={148}
        w={52}
        d={36}
        h={52}
        outside={
          <g>
            <ellipse cx="133" cy="102" rx="4" ry="5.5" fill={PAL.ink} />
            <line x1="133" y1="102" x2="206" y2="102" stroke={PAL.signal} strokeWidth="2.4" />
            <polygon points="212,102 204,98 204,106" fill={PAL.signal} />
          </g>
        }
      >
        <circle cx="102" cy="110" r="11" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="102" cy="110" r="3.8" fill={PAL.signal} />
      </GlassCube>

      {/* Right pre-programmed constraint curb (top-back y=118.5, well below y=102 line) */}
      <IsoBlock
        x={156}
        y={150}
        w={12}
        d={22}
        h={20}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      {/* Completed market actions */}
      <IsoCoinStack x={232} y={148} n={5} />

      {/* Periodic post-hoc audit log & auditor on the right */}
      <IsoBlock
        x={278}
        y={150}
        w={28}
        d={20}
        h={32}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={344}
        y={148}
        scale={0.84}
        flip
        coat={PAL.ink2}
        coatShade={PAL.ink}
        skin={PAL.skin3}
        reach
      />
    </Frame>
  );
}

/**
 * Slide 20 — Failure Modes of Human Oversight:
 * Interactive 800-unit diorama:
 * Left side: Queue overload & rubber-stamping (slider controls cases/hour;
 * high load overwhelms the reviewer and lets red fault blocks slip through).
 * Right side: Moral crumple zone (the complex GlassCube system deflects blame
 * onto a low-authority human operator in the front).
 */
export function IsoOversightFailures() {
  const [casesPerHour, setCasesPerHour] = useState(100);
  const overloaded = casesPerHour > 30;
  const stackHeight = Math.min(54, Math.max(14, Math.round(casesPerHour * 0.44)));

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Isometric tabletop diorama of human oversight failure modes: on the left, ${casesPerHour} cases per hour ${overloaded ? "pile up into a tall stack that overwhelms the reviewer into rubber-stamping errors" : "allow the reviewer to inspect and catch faulty recommendations"}; on the right, a complex glass AI cube deflects system-failure blame onto a low-authority operator in a moral crumple zone.`}
      >
        <IsoBase w={800} />

        {/* Left scene: Automation bias & Rubber-stamping */}
        <Key
          x={210}
          y={28}
          anchor="middle"
          fill={overloaded ? PAL.signal : PAL.counter}
        >
          {overloaded
            ? `RUBBER-STAMPING · ${casesPerHour} CASES / HR OVERLOAD`
            : `EFFECTIVE REVIEW · ${casesPerHour} CASES / HR`}
        </Key>

        <GlassCube
          x={64}
          y={148}
          w={54}
          d={38}
          h={54}
          outside={
            <g>
              <ellipse cx="132" cy="110" rx="4" ry="5.5" fill={PAL.ink} />
              <line x1="132" y1="110" x2="188" y2="110" stroke={PAL.ink2} strokeWidth="2.2" />
              <polygon points="194,110 186,106 186,114" fill={PAL.ink2} />
            </g>
          }
        >
          <circle cx="98" cy="110" r="11" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.6" />
          <circle cx="98" cy="110" r="3.5" fill={PAL.ink} />
        </GlassCube>

        {/* Reviewer desk + case backlog column */}
        <IsoBlock
          x={202}
          y={150}
          w={44}
          d={24}
          h={stackHeight}
          topFill={overloaded ? PAL.signalLight : PAL.counterLight}
          leftFill={overloaded ? PAL.signal : PAL.counter}
          rightFill={overloaded ? PAL.signalMid : PAL.counterMid}
        />

        <IsoPerson
          x={318}
          y={148}
          scale={0.86}
          flip
          coat={overloaded ? PAL.ink2 : PAL.counter}
          coatShade={overloaded ? PAL.ink : PAL.counterMid}
          skin={PAL.skin1}
          reach
        />

        {/* Tabletop divider */}
        <line
          x1={374}
          y1={156}
          x2={454}
          y2={104}
          stroke={PAL.ink3}
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />

        {/* Right scene: Moral crumple zone */}
        <Key x={596} y={28} anchor="middle" fill={PAL.signal}>
          MORAL CRUMPLE ZONE · ABSORBING BLAME
        </Key>

        <GlassCube x={476} y={148} w={62} d={44} h={62}>
          <circle cx="518" cy="106" r="14" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
          <circle cx="518" cy="106" r="4.5" fill={PAL.signal} />
        </GlassCube>

        {/* Blame deflection arc from above the system onto the low-authority operator */}
        <path
          d="M 520 52 L 664 52 L 664 62"
          fill="none"
          stroke={PAL.signal}
          strokeWidth="2.4"
        />
        <polygon points="664,68 660,60 668,60" fill={PAL.signal} />

        {/* Low-authority operator standing on red blame pad */}
        <polygon
          points="622,154 648,136 706,136 680,154"
          fill={PAL.signalLight}
          stroke={PAL.signal}
          strokeWidth="1.8"
        />
        <IsoPerson
          x={666}
          y={148}
          scale={0.84}
          flip
          coat={PAL.signal}
          coatShade={PAL.signalMid}
          skin={PAL.skin3}
        />
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
 * Interactive 800-unit diorama showing the three decision-risk tiers across
 * the board: (1) High-stakes mortgage house + Human-in-the-loop review,
 * (2) Medium-stakes transaction stream + Human-on-the-loop circuit breaker,
 * (3) Low-stakes webpage carousel blocks + Autonomous GlassCube.
 */
export function IsoDecisionRiskRegimes() {
  const [tier, setTier] = useState<"all" | "high" | "medium" | "low">("all");
  const lit = (t: "high" | "medium" | "low") => tier === "all" || tier === t;

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label="Isometric tabletop diorama matching oversight regimes to decision risk across three stations: high-stakes irreversible mortgage decisions with a human-in-the-loop gate on the left, medium-stakes transaction monitoring with a circuit breaker in the center, and low-stakes reversible carousel reordering under autonomous operation on the right."
      >
        <IsoBase w={800} />

        {/* Tier 1: High stakes, low frequency (Mortgage + Human-in-the-loop) */}
        <g opacity={lit("high") ? 1 : 0.35}>
          <Key x={164} y={26} anchor="middle" fill={PAL.signal} size={9.5}>
            HIGH STAKES · HUMAN-IN-THE-LOOP
          </Key>
          <IsoHouse x={72} y={148} />
          <IsoBlock
            x={182}
            y={150}
            w={16}
            d={32}
            h={58}
            topFill={PAL.counterLight}
            leftFill={PAL.counter}
            rightFill={PAL.counterMid}
          />
          <IsoPerson
            x={244}
            y={148}
            scale={0.84}
            flip
            coat={PAL.counter}
            coatShade={PAL.counterMid}
            skin={PAL.skin1}
            reach
          />
        </g>

        {/* Tier 2: Medium stakes, high frequency (Transactions + Circuit breaker) */}
        <g opacity={lit("medium") ? 1 : 0.35}>
          <Key x={412} y={26} anchor="middle" fill={PAL.counter} size={9.5}>
            MEDIUM STAKES · CIRCUIT BREAKER
          </Key>
          <GlassCube
            x={312}
            y={148}
            w={52}
            d={36}
            h={52}
            outside={
              <g>
                <ellipse cx="377" cy="110" rx="3.8" ry="5.5" fill={PAL.ink} />
                <line x1="377" y1="110" x2="416" y2="110" stroke={PAL.counter} strokeWidth="2.2" />
              </g>
            }
          >
            <circle cx="346" cy="110" r="11" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
            <circle cx="346" cy="110" r="3.5" fill={PAL.counter} />
          </GlassCube>
          <IsoBlock
            x={420}
            y={150}
            w={26}
            d={24}
            h={42}
            topFill={PAL.signalLight}
            leftFill={PAL.signal}
            rightFill={PAL.signalMid}
          />
          <IsoPerson
            x={494}
            y={148}
            scale={0.84}
            flip
            coat={PAL.ink}
            coatShade={PAL.ink2}
            skin={PAL.skin2}
            reach
          />
        </g>

        {/* Tier 3: Low stakes, high velocity (Webpage carousel + Autonomous) */}
        <g opacity={lit("low") ? 1 : 0.35}>
          <Key x={648} y={26} anchor="middle" fill={PAL.ink2} size={9.5}>
            LOW STAKES · AUTONOMOUS
          </Key>
          {[562, 598, 634].map((bx, i) => (
            <IsoBlock
              key={bx}
              x={bx}
              y={150}
              w={18}
              d={16}
              h={26 + (i % 2) * 8}
              topFill={PAL.paper}
              leftFill={PAL.slabLeft}
              rightFill={PAL.slabRight}
            />
          ))}
          <GlassCube x={678} y={148} w={50} d={34} h={50}>
            <circle cx="710" cy="114" r="10" fill={PAL.paper} stroke={PAL.ink} strokeWidth="1.5" />
            <circle cx="710" cy="114" r="3.5" fill={PAL.ink} />
          </GlassCube>
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
            <ellipse cx="295" cy="108" rx="4" ry="5.5" fill={PAL.ink} />
            <line x1="295" y1="108" x2="478" y2="108" stroke={PAL.ink} strokeWidth="2.4" />
            <polygon points="484,108 476,104 476,112" fill={PAL.ink} />
          </g>
        }
      >
        <circle cx="258" cy="108" r="13" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="258" cy="108" r="4.5" fill={PAL.counter} />
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
 * The human shopper hands a goal block to a surrogate GlassCube, which scans
 * three 3D search-result listings (sponsored placement, price framing, organic
 * attributes) on the marketplace shelf.
 */
export function IsoSurrogateConsumer() {
  return (
    <Frame
      width={800}
      height={215}
      label="Isometric tabletop diorama of the AI agent as a surrogate consumer: a shopper on the left hands a goal block to a glass AI cube, which scans three 3D product listing blocks on the marketplace shelf showing a sponsored ad tag and framed prices."
    >
      <IsoBase w={800} />

      <Key x={144} y={28} anchor="middle" fill={PAL.counter}>
        DELEGATED GOAL
      </Key>
      <IsoPerson
        x={88}
        y={148}
        scale={0.9}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />
      <IsoBlock
        x={154}
        y={150}
        w={40}
        d={22}
        h={34}
        topFill={PAL.paper}
        leftFill={PAL.paper}
        rightFill={PAL.slabLeft}
      />
      <text x="174" y="136" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        GOAL
      </text>

      <Key x={302} y={28} anchor="middle" fill={PAL.counter}>
        SURROGATE CONSUMER AI
      </Key>
      <GlassCube
        x={256}
        y={148}
        w={62}
        d={44}
        h={62}
        outside={
          <g>
            <ellipse cx="334" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />
            {/* Scanning lines to the search-results listings */}
            <line
              x1="334"
              y1="104"
              x2="442"
              y2="118"
              stroke={PAL.counter}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <polygon points="448,118 440,114 440,122" fill={PAL.counter} />
          </g>
        }
      >
        <circle cx="298" cy="106" r="14" fill={PAL.counterLight} stroke={PAL.counter} strokeWidth="1.6" />
        <circle cx="298" cy="106" r="4.5" fill={PAL.counter} />
      </GlassCube>

      <Key x={580} y={28} anchor="middle" fill={PAL.signal}>
        SEARCH RESULTS · PRICE FRAMING · SPONSORSHIP
      </Key>

      {/* Listing 1: Sponsored slot */}
      <IsoBlock
        x={454}
        y={150}
        w={58}
        d={26}
        h={48}
        topFill={PAL.signalLight}
        leftFill={PAL.signal}
        rightFill={PAL.signalMid}
      />
      <text x="483" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        SPONSORED
      </text>
      <text x="483" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill={PAL.paper}>
        $290
      </text>

      {/* Listing 2: Organic best match */}
      <IsoBlock
        x={548}
        y={150}
        w={58}
        d={26}
        h={48}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="577" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        ORGANIC
      </text>
      <text x="577" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill={PAL.paper}>
        $210
      </text>

      {/* Listing 3: Alternative listing */}
      <IsoBlock
        x={642}
        y={150}
        w={58}
        d={26}
        h={48}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <text x="671" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.ink2}>
        LISTING 3
      </text>
      <text x="671" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill={PAL.ink}>
        $245
      </text>
    </Frame>
  );
}

/**
 * Slide 24 — Dual Agency and Governance Risks in Agentic Commerce:
 * Interactive 800-unit diorama illustrating the four governance risks in
 * agent-mediated commerce: (1) Principal-agent conflict (Wadi & Ma, 2026c),
 * (2) Heuristic and position bias (Wadi & Ma, 2026a, 2026b),
 * (3) Adversarial storefront manipulation, and (4) Liability ambiguity.
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
        label={`Isometric tabletop diorama of governance risks in agentic commerce (${risk}): a consumer on the left delegates to a central shopping-assistant glass AI cube, while on the right a platform ad-revenue stack and seller storefront pull or hijack the agent's selection.`}
      >
        <IsoBase w={800} />

        <Key x={400} y={22} anchor="middle" fill={PAL.signal}>
          {headline}
        </Key>

        {/* Left: Consumer principal */}
        <Key x={118} y={44} anchor="middle" fill={PAL.counter} size={9.5}>
          {risk === "liability" ? "CONSUMER (?)" : "CONSUMER PRINCIPAL"}
        </Key>
        <IsoPerson
          x={96}
          y={148}
          scale={0.9}
          coat={PAL.counter}
          coatShade={PAL.counterMid}
          skin={PAL.skin1}
          reach
        />
        <line
          x1="142"
          y1="108"
          x2="288"
          y2="108"
          stroke={PAL.counter}
          strokeWidth="2.2"
          strokeDasharray="5 4"
        />
        <polygon points="294,108 286,104 286,112" fill={PAL.counter} />

        {/* Center: Shopping Assistant GlassCube */}
        <Key x={346} y={44} anchor="middle" fill={PAL.ink2} size={9.5}>
          {risk === "liability" ? "PLATFORM AGENT (?)" : "SHOPPING AGENT"}
        </Key>
        <GlassCube
          x={304}
          y={148}
          w={64}
          d={46}
          h={64}
          outside={
            <g>
              <ellipse cx="384" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />
              {risk === "adversarial" ? (
                <>
                  {/* Seller hidden instruction hook reaching into the agent */}
                  <line x1="496" y1="106" x2="394" y2="106" stroke={PAL.signal} strokeWidth="2.8" />
                  <polygon points="388,106 396,102 396,110" fill={PAL.signal} />
                </>
              ) : (
                <>
                  <line x1="384" y1="106" x2="494" y2="106" stroke={PAL.signal} strokeWidth="2.8" />
                  <polygon points="500,106 492,102 492,110" fill={PAL.signal} />
                </>
              )}
            </g>
          }
        >
          <circle cx="348" cy="106" r="15" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.8" />
          <line x1="336" y1="112" x2="360" y2="100" stroke={PAL.signal} strokeWidth="2.6" />
          <circle cx="348" cy="106" r="4" fill={PAL.signal} />
        </GlassCube>

        {/* Right: Storefront listing, Platform Ad Coins, and Seller */}
        <Key x={596} y={44} anchor="middle" fill={PAL.signal} size={9.5}>
          {risk === "conflict" && "PROMOTED SLOT + AD REVENUE"}
          {risk === "position" && "SLOT #1 OVERWEIGHTED"}
          {risk === "adversarial" && "HIDDEN PROMPT IN LISTING"}
          {risk === "liability" && "DEVELOPER / SELLER (?)"}
        </Key>

        <IsoBlock
          x={506}
          y={150}
          w={62}
          d={26}
          h={48}
          topFill={PAL.signalLight}
          leftFill={PAL.signal}
          rightFill={PAL.signalMid}
        />
        <text x="537" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
          {risk === "adversarial" ? "INJECT" : "SLOT #1"}
        </text>
        <text x="537" y="136" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PAL.paper}>
          {risk === "liability" ? "LOSS" : "AD $$$"}
        </text>

        <IsoCoinStack x={618} y={148} n={5} signal />

        <IsoPerson
          x={692}
          y={148}
          scale={0.9}
          flip
          coat={PAL.ink2}
          coatShade={PAL.ink}
          skin={PAL.skin2}
          behindBack={risk === "adversarial"}
        />
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
 * A traveler on the left instructs the booking platform's GlassCube assistant
 * to book a quiet hotel under $250; the assistant locks onto the #1 sponsored
 * noisy hotel in red while bypassing the quiet verdigris option on the right.
 */
export function IsoTravelAgentHotel() {
  return (
    <Frame
      width={400}
      height={215}
      label="Isometric tabletop diorama of the autonomous travel agent case: a traveler on the left instructs a booking platform glass AI cube, which selects a red first-ranked sponsored noisy hotel while bypassing a quiet hotel block on the right."
    >
      <IsoBase />

      <Key x={106} y={24} anchor="middle" fill={PAL.counter} size={9.5}>
        QUIET · &lt;$250
      </Key>

      <IsoPerson
        x={52}
        y={148}
        scale={0.82}
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
        reach
      />

      <GlassCube
        x={108}
        y={148}
        w={52}
        d={36}
        h={52}
        outside={
          <g>
            <ellipse cx="173" cy="112" rx="4" ry="5.5" fill={PAL.ink} />
            <line x1="173" y1="112" x2="206" y2="112" stroke={PAL.signal} strokeWidth="2.8" />
            <polygon points="212,112 204,108 204,116" fill={PAL.signal} />
          </g>
        }
      >
        <circle cx="142" cy="112" r="11" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="142" cy="112" r="3.5" fill={PAL.signal} />
      </GlassCube>

      {/* #1 Ranked Sponsored Noisy Hotel selected by the agent */}
      <IsoHouse x={212} y={148} rate="#1 AD" penalized />

      {/* Quiet alternative hotel on the far right (clear of IsoHouse right edge x=300.8) */}
      <IsoBlock
        x={316}
        y={148}
        w={38}
        d={22}
        h={52}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />
      <text x="335" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        QUIET
      </text>
      <text x="335" y="135" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={PAL.paper}>
        $230
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
      label="Isometric tabletop diorama: on the left side of the board, three customers stand with stacks of coins; on the right side, an iron barrier gate locks out one minority customer in red."
    >
      <IsoBase />
      {[72, 134, 196].map((px, i) => (
        <g key={px}>
          <IsoPerson
            x={px}
            y={144 - i * 4}
            scale={0.92}
            coat={PAL.counter}
            coatShade={PAL.counterMid}
            skin={i === 1 ? PAL.skin2 : PAL.skin1}
          />
          <IsoCoinStack x={px + 22} y={150 - i * 4} n={3 + (i % 2)} />
        </g>
      ))}
      <g stroke={PAL.ink} strokeWidth="1.6">
        <line x1="252" y1="156" x2="292" y2="118" stroke={PAL.signal} strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => {
          const gx = 254 + i * 9;
          const gy = 154 - i * 9;
          return <line key={i} x1={gx} y1={gy} x2={gx} y2={gy - 58} stroke={PAL.ink} strokeWidth="2.2" />;
        })}
        <line x1="252" y1="100" x2="292" y2="62" stroke={PAL.ink} strokeWidth="2.5" />
        <line x1="252" y1="128" x2="292" y2="90" stroke={PAL.ink} strokeWidth="2" />
      </g>
      <IsoPerson
        x={326}
        y={146}
        scale={0.92}
        flip
        coat={PAL.signal}
        coatShade={PAL.signalMid}
        skin={PAL.skin3}
      />
    </Frame>
  );
}

export function IsoDeontology() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama: a translucent glass AI cube on the left extends a red mechanical claw toward a citizen, but a solid 3D verdigris shield wall blocks it at the boundary."
    >
      <IsoBase />
      <GlassCube
        x={56}
        y={146}
        w={60}
        d={44}
        h={60}
        outside={
          <g>
            <ellipse cx="132" cy="106" rx="4.5" ry="6.5" fill={PAL.ink} />
            <line x1="132" y1="106" x2="188" y2="106" stroke={PAL.signal} strokeWidth="3.5" />
            <path d="M 184 98 L 196 103 M 184 114 L 196 109" fill="none" stroke={PAL.signal} strokeWidth="2.5" />
          </g>
        }
      >
        <circle cx="96" cy="106" r="14" fill={PAL.signalLight} stroke={PAL.signal} strokeWidth="1.6" />
        <circle cx="96" cy="106" r="5" fill={PAL.signal} />
      </GlassCube>

      <IsoBlock
        x={198}
        y={152}
        w={18}
        d={42}
        h={86}
        topFill={PAL.counterLight}
        leftFill={PAL.counter}
        rightFill={PAL.counterMid}
      />

      <IsoPerson
        x={306}
        y={146}
        scale={0.98}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin1}
      />
    </Frame>
  );
}

export function IsoVirtueEthics() {
  return (
    <Frame
      width={400}
      height={210}
      label="Isometric tabletop diorama: two figures meet across a counter; the seller on the left reaches out for a polite handshake in front while hiding a red hook behind their back."
    >
      <IsoBase />
      <IsoPerson
        x={126}
        y={146}
        scale={1}
        coat={PAL.ink2}
        coatShade={PAL.ink}
        skin={PAL.skin1}
        reach
        behindBack
      />
      <IsoBlock
        x={178}
        y={152}
        w={44}
        d={28}
        h={38}
        topFill={PAL.paper}
        leftFill={PAL.slabLeft}
        rightFill={PAL.slabRight}
      />
      <IsoPerson
        x={278}
        y={146}
        scale={1}
        flip
        coat={PAL.counter}
        coatShade={PAL.counterMid}
        skin={PAL.skin2}
        reach
      />
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
