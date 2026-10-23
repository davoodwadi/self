/* ==========================================================================
   Digital Transformation — objects (Flat Silhouette)
   --------------------------------------------------------------------------
   The course's fixed cast, built on ./kit:
     · Shop     — the business
     · Doc      — information (a paper page)
     · Person   — every human (bust in profile)
     · Coins    — revenue (SIGNAL: what is gained)
   ========================================================================== */

import React from "react";
import { CREAM, INK, SKIN, SIGNAL, r2, Solid, Plate } from "./kit";

/* -- cast: Shop (160 × 150, origin top-left) ------------------------------ */

const SHOP_SIGN = "M 0 0 H 160 V 26 H 0 Z";
const SHOP_AWNING = (() => {
  // straight top edge, six scallops along the bottom
  const n = 6;
  const left = -8;
  const width = 176;
  const step = width / n;
  let d = `M ${left} 34 H ${left + width} V 50`;
  for (let i = n - 1; i >= 0; i--) {
    const x0 = r2(left + step * i);
    d += ` A ${r2(step / 2)} ${r2(step / 2)} 0 0 1 ${x0} 50`;
  }
  return d + " Z";
})();
const SHOP_BODY = "M 6 70 H 154 V 150 H 136 V 90 H 102 V 150 H 6 Z";
const SHOP_HOLES = "M 22 88 H 84 V 124 H 22 Z";
const SHOP_OUTER = `${SHOP_SIGN} ${SHOP_AWNING} ${SHOP_BODY}`;

export function Shop({
  x,
  y,
  k = 1,
  tone,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Solid outer={SHOP_OUTER} holes={SHOP_HOLES} tone={tone} />
    </g>
  );
}

/* -- cast: Doc (90 × 116, origin top-left) -------------------------------- */

const DOC_SHEET = "M 0 0 H 56 V 34 H 90 V 116 H 0 Z";
const DOC_FOLD = "M 62 0 L 90 28 H 62 Z";
const DOC_LINES =
  "M 14 48 H 76 V 55 H 14 Z M 14 64 H 76 V 71 H 14 Z M 14 80 H 76 V 87 H 14 Z M 14 96 H 52 V 103 H 14 Z";

export function Doc({
  x,
  y,
  k = 1,
  tone,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Solid outer={`${DOC_SHEET} ${DOC_FOLD}`} holes={DOC_LINES} tone={tone} />
    </g>
  );
}

/* -- cast: Coins (stack of n, bottom-centre at x, y) ---------------------- */

export function Coins({ x, y, n = 4 }: { x: number; y: number; n?: number }) {
  const w = 46;
  const t = 11;
  const gap = 3;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={x - w / 2}
          y={y - (i + 1) * (t + gap) + gap}
          width={w}
          height={t}
          rx={5.5}
          fill={SIGNAL}
        />
      ))}
      <ellipse cx={x} cy={y - n * (t + gap) - 5} rx={w / 2} ry={8} fill={SIGNAL} />
    </g>
  );
}

/* -- cast: Person (bust in profile, facing right; 100 tall, bottom-centre) -- */

export type Hair =
  | "bob"
  | "crop"
  | "bun"
  | "afro"
  | "ponytail"
  | "wavy"
  | "pompadour"
  | "hijab"
  | "bald"
  | "cap"
  | "hardhat";

export type Profile = "classic" | "soft" | "angular" | "noble";
export type Beard = "none" | "beard" | "goatee" | "mustache";
export type Glasses = boolean | "round" | "square";
export type Collar = "crew" | "lapel" | "shirt" | "turtleneck" | "vneck" | "lanyard";

const PROFILE_PATH: Record<Profile, string> = {
  classic:
    "M -8 60 V 46 C -20 42 -24 32 -22 24 C -20 12 -10 7 2 7 C 14 7 22 15 22 25 L 22 29 L 28 37 L 22 39 L 22 43 C 22 47 18 49 14 49 L 7 49 V 60 Z",
  soft:
    "M -8 60 V 46 C -20 42 -24 32 -22 24 C -20 12 -10 7 2 7 C 14 7 22 15 22 25 L 22 29.5 L 27 36.2 C 27 37.8 24.5 38.6 22 38.8 L 22 42.5 C 22 46.5 18 48.8 13.5 48.8 L 7 48.8 V 60 Z",
  angular:
    "M -8 60 V 46 C -20 42 -24 32 -22 24 C -20 12 -10 7 2 7 C 14 7 22 15 22 25 L 22 28 L 29 37.2 L 22.5 39.2 L 22.5 44.5 C 22.5 48.8 19.5 50.2 14.5 50.2 L 7 49.5 V 60 Z",
  noble:
    "M -8 60 V 46 C -20 42 -24 32 -22 24 C -20 12 -10 7 2 7 C 14 7 22 15 22 25 L 22 27.5 L 28.4 36.5 L 22 38.8 L 22 43.5 C 22 47.5 18.5 49.5 14 49.5 L 7 49 V 60 Z",
};

const DEFAULT_LOOK_BY_HAIR: Record<
  Hair,
  { profile: Profile; collar: Collar; beard: Beard; glasses: Glasses }
> = {
  bob: { profile: "soft", collar: "vneck", beard: "none", glasses: false },
  crop: { profile: "angular", collar: "shirt", beard: "none", glasses: false },
  bun: { profile: "classic", collar: "crew", beard: "none", glasses: false },
  afro: { profile: "soft", collar: "turtleneck", beard: "none", glasses: false },
  ponytail: { profile: "classic", collar: "lanyard", beard: "none", glasses: false },
  wavy: { profile: "noble", collar: "vneck", beard: "none", glasses: false },
  pompadour: { profile: "angular", collar: "lapel", beard: "none", glasses: false },
  hijab: { profile: "soft", collar: "crew", beard: "none", glasses: false },
  bald: { profile: "noble", collar: "lapel", beard: "beard", glasses: "round" },
  cap: { profile: "classic", collar: "shirt", beard: "none", glasses: false },
  hardhat: { profile: "angular", collar: "lanyard", beard: "mustache", glasses: false },
};

export interface PersonPreset {
  hair: Hair;
  profile: Profile;
  collar: Collar;
  beard: Beard;
  glasses: Glasses;
}

export const PERSON_CAST: readonly PersonPreset[] = [
  { hair: "bob", profile: "soft", collar: "vneck", beard: "none", glasses: false },
  { hair: "crop", profile: "angular", collar: "shirt", beard: "none", glasses: false },
  { hair: "bun", profile: "classic", collar: "turtleneck", beard: "none", glasses: "round" },
  { hair: "pompadour", profile: "noble", collar: "lapel", beard: "none", glasses: false },
  { hair: "afro", profile: "soft", collar: "crew", beard: "none", glasses: false },
  { hair: "bald", profile: "angular", collar: "shirt", beard: "beard", glasses: "square" },
  { hair: "hijab", profile: "classic", collar: "crew", beard: "none", glasses: false },
  { hair: "ponytail", profile: "soft", collar: "lanyard", beard: "none", glasses: false },
  { hair: "crop", profile: "noble", collar: "turtleneck", beard: "goatee", glasses: "round" },
  { hair: "wavy", profile: "classic", collar: "vneck", beard: "none", glasses: "square" },
  { hair: "cap", profile: "angular", collar: "shirt", beard: "mustache", glasses: false },
  { hair: "hardhat", profile: "classic", collar: "lanyard", beard: "none", glasses: false },
];

function HairSilhouette({ hair }: { hair: Hair }) {
  switch (hair) {
    case "bob":
      return (
        <path
          d="M -25 52 C -30 30 -22 7 -2 4 C 12 2 23 10 24 22 C 16 19 9 21 5 26 C 1 34 -1 45 -3 54 Z"
          fill={INK}
        />
      );
    case "crop":
      return (
        <path
          d="M -23 41 C -27 20 -14 3 3 3 C 16 3 24 10 25 21 C 16 17 6 18 2 23 L 2 33 L -2 33 L -3 27 C -8 29 -11 35 -11 43 C -16 45 -21 44 -23 41 Z"
          fill={INK}
        />
      );
    case "bun":
      return (
        <g>
          <path
            d="M -21 43 C -26 24 -14 4 2 4 C 15 4 23 11 23.5 21 C 14 18 6 20 0 26 C -6 31 -8 37 -9 44 C -14 46 -18 45 -21 43 Z M -36.5 12 A 10.5 10.5 0 1 1 -15.5 12 A 10.5 10.5 0 1 1 -36.5 12 Z"
            fill={INK}
          />
          <path
            d="M -21.5 5.5 C -17.5 9.5 -17.5 15.5 -21.5 19.5"
            fill="none"
            stroke={CREAM}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      );
    case "afro":
      return (
        <path
          d="M -21 45 C -36 40 -40 20 -30 4 C -19 -8 5 -9 18 0 C 28 7 29 17 24 22 C 15 18 6 19 1 25 L 1 33 L -3 33 L -4 28 C -9 31 -11 38 -11 45 Z"
          fill={INK}
        />
      );
    case "ponytail":
      return (
        <g>
          <path
            d="M -21 42 C -26 22 -13 4 3 4 C 16 4 24 11 24.5 21 C 15 18 6 19 0 25 C -6 30 -9 36 -10 43 C -15 45 -18 44 -21 42 Z"
            fill={INK}
          />
          <path
            d="M -22 17 C -33 16 -40 26 -38 41 C -37 48 -33 53 -27 56 C -27 47 -25 38 -20 32 C -18 28 -18 21 -22 17 Z"
            fill={INK}
          />
          <path
            d="M -21 16.5 L -18.5 30.5"
            stroke={CREAM}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </g>
      );
    case "wavy":
      return (
        <g>
          <path
            d="M -25 63 C -31 52 -27 40 -29 28 C -31 14 -17 2 1 3 C 15 3 23 11 24 22 C 15 19 8 21 4 27 C 0 35 0 46 -4 56 C -8 62 -17 65 -25 63 Z"
            fill={INK}
          />
          <path
            d="M -25 63 C -17 65 -8 62 -4 56"
            fill="none"
            stroke={CREAM}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      );
    case "pompadour":
      return (
        <path
          d="M -22 42 C -26 22 -14 5 2 4 C 12 3 24 1 29 10 C 31 15 28 21 23 22 C 14 18 6 19 2 24 L 2 33 L -2 33 L -3 27 C -8 30 -11 36 -11 43 C -16 45 -20 44 -22 42 Z"
          fill={INK}
        />
      );
    case "hijab":
      return (
        <g>
          <path
            d="M -24 65 C -29 45 -28 20 -18 7 C -9 -1 9 0 19 8 C 23 12 24 18 23 23 C 15 20 7 24 5 33 C 3 42 7 49 16 49.5 C 19 54 20 61 18 67 C 5 73 -13 72 -24 65 Z"
            fill={INK}
          />
          <path
            d="M -24 65 C -13 72 5 73 18 67"
            fill="none"
            stroke={CREAM}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </g>
      );
    case "bald":
      return (
        <g>
          <path
            d="M -22 41 C -25 32 -23 23 -16 21 C -12 20 -8 23 -6 27 C -9 31 -10 36 -10 43 C -15 45 -19 44 -22 41 Z"
            fill={INK}
          />
          <path
            d="M -1.5 28 C -5.5 26.5 -6.5 34.5 -1.5 35.5"
            fill="none"
            stroke={INK}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </g>
      );
    case "cap":
      return (
        <g>
          <path
            d="M -22 41 C -26 20 -13 3 3 3 C 16 3 23 10 24 19 L 15 20 C 10 21 5 23 2 26 L 2 33 L -2 33 L -3 27 C -8 29 -11 35 -11 42 C -16 44 -20 43 -22 41 Z"
            fill={INK}
          />
          <path
            d="M 16 14.5 C 27 14.5 35 16.5 35 20 C 29 21.2 21 20.8 14 19.2 Z"
            fill={INK}
          />
          <path
            d="M -21 19 Q 2 16.5 23.5 18.8"
            fill="none"
            stroke={CREAM}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </g>
      );
    case "hardhat":
      return (
        <g>
          <path
            d="M -22 41 C -25 32 -23 20 -18 17 L -4 17 C -8 25 -10 34 -10 42 C -15 44 -19 43 -22 41 Z"
            fill={INK}
          />
          <path
            d="M -23 20 C -23 6 -12 0 1 0 C 14 0 24 6 25 19 L 32 19.5 V 22.5 H -25 V 20 Z M -7 1 L -5 -3.5 H 8 L 10 1 Z"
            fill={INK}
          />
          <path
            d="M -25 22.5 H 32"
            stroke={CREAM}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      );
  }
}

function BeardSilhouette({ beard }: { beard: Beard }) {
  switch (beard) {
    case "none":
      return null;
    case "beard":
      return (
        <path
          d="M 2 33 H 6.2 L 9.2 42 L 16.5 41.2 L 17.5 38.8 L 22.8 39.2 L 22.8 41.8 L 18.5 42 L 18.5 44.2 L 23 44.5 C 23.2 49.8 19.2 52.2 13 51.8 L 6 50.2 L 2 44.5 Z"
          fill={INK}
        />
      );
    case "goatee":
      return (
        <path
          d="M 15.5 39.8 C 17.5 38 22 38 24.2 40.2 L 23.5 41.8 L 18.5 41.4 Z M 18 44.8 L 23.2 44.8 C 23.8 49.2 20.5 52 15 51.5 L 14 49.2 C 17 49.2 18 47.2 18 44.8 Z"
          fill={INK}
        />
      );
    case "mustache":
      return (
        <path
          d="M 15 40 C 17 38 22 38 24.5 40.5 C 24.5 42 22 42.4 19.5 41.9 C 17 41.4 15 41.4 15 40 Z"
          fill={INK}
        />
      );
  }
}

function GlassesSilhouette({ glasses }: { glasses: Glasses }) {
  if (!glasses) return null;
  if (glasses === "square") {
    return (
      <g>
        <path d="M 9.5 25.5 L -2 24.8" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M 20.5 25.5 H 23.8" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
        <rect
          x={9.5}
          y={23}
          width={11}
          height={8.2}
          rx={1.5}
          fill={SKIN}
          stroke={INK}
          strokeWidth={1.8}
        />
        <path d="M 11.5 27.3 Q 15 24.8 18.5 27.3 Q 15 29.5 11.5 27.3 Z" fill={INK} />
      </g>
    );
  }
  return (
    <g>
      <path d="M 9.8 26.5 L -2 25.5" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M 20.2 26.5 H 23.5" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={15} cy={27.3} r={5.2} fill={SKIN} stroke={INK} strokeWidth={1.8} />
      <path d="M 11.5 27.3 Q 15 24.8 18.5 27.3 Q 15 29.5 11.5 27.3 Z" fill={INK} />
    </g>
  );
}

function CollarSilhouette({
  collar,
  gap,
  k,
}: {
  collar: Collar;
  gap?: boolean;
  k: number;
}) {
  const baseBody = "M -40 100 C -40 76 -28 62 -8 60 H 8 C 28 62 40 76 40 100 Z";
  return (
    <g>
      <path
        d={baseBody}
        fill={INK}
        stroke={gap ? CREAM : undefined}
        strokeWidth={gap ? r2(3 / k) : undefined}
      />
      {collar === "crew" && (
        <path
          d="M -9 63.5 Q 0 68.5 9 63.5"
          fill="none"
          stroke={CREAM}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      )}
      {collar === "vneck" && (
        <g>
          <path d="M -5 58 L 4 70.5 L 7 58 Z" fill={SKIN} />
          <path
            d="M -5 60 L 4 70.5 L 7.2 60"
            fill="none"
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </g>
      )}
      {collar === "turtleneck" && (
        <g>
          <path d="M -8.8 60.5 V 53.5 H 7.8 V 60.5 Z" fill={INK} />
          <path
            d="M -9.5 61.5 Q 0 64.5 9.5 61.5"
            fill="none"
            stroke={CREAM}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </g>
      )}
      {collar === "shirt" && (
        <g>
          <path d="M -2 60 L 4.5 68.5 L 8 60 Z" fill={CREAM} />
          <path
            d="M -8.5 61.5 L -2.5 67.5 L 3 64"
            fill="none"
            stroke={CREAM}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={5} cy={74} r={1.6} fill={CREAM} />
          <circle cx={5} cy={83} r={1.6} fill={CREAM} />
        </g>
      )}
      {collar === "lapel" && (
        <g>
          <path d="M -3.5 60 L 3.5 81 L 7.8 60 Z" fill={CREAM} />
          <path d="M 1 60 L 4.2 60 L 5.2 75.5 L 3.2 80 L 1.2 75.5 Z" fill={INK} />
          <path
            d="M -8.5 61 L -11 71 L -5.5 73 L 2.5 83"
            fill="none"
            stroke={CREAM}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {collar === "lanyard" && (
        <g>
          <path
            d="M -6.5 60.5 L 3.5 77.5 L 8.5 60.5"
            fill="none"
            stroke={CREAM}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={-0.5} y={77.5} width={8.5} height={11.5} rx={1.5} fill={CREAM} />
          <line x1={1.5} y1={82} x2={6} y2={82} stroke={INK} strokeWidth={1.4} />
          <line x1={1.5} y1={85.5} x2={5} y2={85.5} stroke={INK} strokeWidth={1.4} />
        </g>
      )}
    </g>
  );
}

export function Person({
  x,
  y,
  k = 1,
  hair = "bob",
  profile,
  collar,
  beard,
  glasses,
  variant,
  flip,
  gap,
}: {
  x: number;
  y: number;
  k?: number;
  hair?: Hair;
  profile?: Profile;
  collar?: Collar;
  beard?: Beard;
  glasses?: Glasses;
  /** Optional 0..11 preset index from PERSON_CAST */
  variant?: number;
  flip?: boolean;
  /** a thin cream gap around the body, for a figure standing in front of another */
  gap?: boolean;
}) {
  const preset =
    variant !== undefined
      ? PERSON_CAST[((variant % PERSON_CAST.length) + PERSON_CAST.length) % PERSON_CAST.length]
      : undefined;
  const resolvedHair = preset ? (hair !== "bob" ? hair : preset.hair) : hair;
  const defaults = DEFAULT_LOOK_BY_HAIR[resolvedHair];
  const resolvedProfile = profile ?? preset?.profile ?? defaults.profile;
  const resolvedCollar = collar ?? preset?.collar ?? defaults.collar;
  const resolvedBeard = beard ?? preset?.beard ?? defaults.beard;
  const resolvedGlasses = glasses ?? preset?.glasses ?? defaults.glasses;

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`}>
      <path
        d={PROFILE_PATH[resolvedProfile]}
        fill={SKIN}
        stroke={INK}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {!resolvedGlasses && (
        <path d="M 10 27.5 Q 14 24.5 18 27.5 Q 14 30 10 27.5 Z" fill={INK} />
      )}
      <GlassesSilhouette glasses={resolvedGlasses} />
      <BeardSilhouette beard={resolvedBeard} />
      <CollarSilhouette collar={resolvedCollar} gap={gap} k={k} />
      <HairSilhouette hair={resolvedHair} />
    </g>
  );
}

/* ==========================================================================
   Class discussion — two people face each other
   ========================================================================== */

export function Conversation({
  left = 0,
  right = 1,
}: {
  left?: number;
  right?: number;
} = {}) {
  return (
    <Plate
      h={246}
      title="Two people in profile face each other, each with a speech bubble, in conversation"
    >
      <ellipse cx={164} cy={36} rx={32} ry={21} fill={INK} />
      <path d="M 160 54 L 172 80 L 176 52 Z" fill={INK} />
      <ellipse cx={236} cy={56} rx={32} ry={21} fill={INK} />
      <path d="M 224 72 L 222 96 L 238 75 Z" fill={INK} />
      <Person x={128} y={86} k={1.4} variant={left} />
      <Person x={272} y={86} k={1.4} variant={right} flip />
    </Plate>
  );
}


