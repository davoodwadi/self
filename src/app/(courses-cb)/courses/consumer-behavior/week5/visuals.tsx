/* ==========================================================================
   Consumer Behavior · Week 05 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates for the self-concept, personality and lifestyles.
   The drawing system (Frame, Key, Display, Person, the palette) comes from
   Week 01, the brand badge from Week 03 and the Ghost from Week 04, so the
   weeks read as one book.

   Fixed cast for this week:
     · Person: every human, and the actual self.
     · Ghost: a dashed outline of the Person, the ideal self.
     · BrandMark (Week 03): the brand. Given a Person body it becomes the
       brand as a person (BrandPerson), the week's picture of brand
       personality and anthropomorphism.

   INK is the neutral case, SIGNAL the self a consumer reaches for and the
   lit trait, COUNTER the brand. Labels reuse the words of the slide they
   sit on.
   ========================================================================== */

import React from "react";
import {
  Frame,
  Key,
  Person,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER2,
  SIGNAL_TINT,
  COUNTER_TINT,
} from "../week1/visuals";
import { BrandMark } from "../week3/visuals";
import {
  Arrow,
  CurveArrow,
  Heart,
  Star,
  Sparkle,
  Check,
  Cross,
  Thought,
  Gauge,
  Ghost,
  Bag,
  Phone,
  Car,
  Wallet,
  Magnifier,
  Trophy,
} from "../week4/visuals";

const PAPER3 = "var(--paper-3)";
const GREEN = "var(--affirm)";

const r2 = (n: number) => Math.round(n * 100) / 100;

/* -- the cast ------------------------------------------------------------ */

/** A shopping bag carrying the brand. (x, y) is the bag's centre. */
function BrandBag({ x, y, w = 40 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <Bag x={x} y={y} w={w} />
      <BrandMark x={x} y={r2(y + w * 0.04)} s={r2((w * 0.5) / 36)} />
    </g>
  );
}

/* ==========================================================================
   TITLE · a mirror that shows who they hope to become
   ========================================================================== */

export function MirrorSelf() {
  return (
    <Frame
      width={360}
      height={372}
      label="A person holding a shopping bag with the brand badge stands in front of a tall mirror. In the mirror, the reflection is a dashed outline of the same person, holding the same bag."
    >
      <line
        x1={16}
        y1={352}
        x2={344}
        y2={352}
        stroke={RULE2}
        strokeWidth={1.6}
      />
      {/* the mirror */}
      <line
        x1={216}
        y1={318}
        x2={198}
        y2={352}
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={304}
        y1={318}
        x2={322}
        y2={352}
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <ellipse
        cx={260}
        cy={184}
        rx={80}
        ry={150}
        fill={PAPER3}
        stroke={INK}
        strokeWidth={4}
      />
      <Ghost x={260} y={322} s={2.4} />
      <BrandBag x={220} y={270} w={38} />
      {/* the person */}
      <Person x={90} y={352} s={2.4} />
      <BrandBag x={130} y={300} w={38} />
    </Frame>
  );
}

/* ==========================================================================
   WHAT IS THE SELF-CONCEPT?
   ========================================================================== */

/** Five rating pips; the first `n` are filled. (x, y) is the first pip. */
function Pips({
  x,
  y,
  n,
  gap = 30,
  r = 9,
}: {
  x: number;
  y: number;
  n: number;
  gap?: number;
  r?: number;
}) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => (
        <circle
          key={i}
          cx={x + i * gap}
          cy={y}
          r={r}
          fill={i < n ? SIGNAL : PAPER}
          stroke={i < n ? SIGNAL : RULE2}
          strokeWidth={1.6}
        />
      ))}
    </g>
  );
}

/** The person's own judgements of themselves, held in a thought. */
export function SelfJudgement() {
  const rows = [
    { key: "APPEARANCE", n: 4 },
    { key: "INTELLECT", n: 3 },
    { key: "SKILLS", n: 4 },
    { key: "CHARACTER", n: 2 },
  ];
  return (
    <Frame
      height={300}
      label="A person thinks about themselves. Their thought bubble holds four self-ratings: appearance, intellect, skills and character, each scored with filled dots out of five."
    >
      <g fill={PAPER} stroke={INK} strokeWidth={1.8}>
        <ellipse cx={480} cy={150} rx={228} ry={118} />
        <circle cx={216} cy={134} r={11} />
        <circle cx={180} cy={128} r={6.5} />
      </g>
      {rows.map((row, i) => (
        <g key={row.key}>
          <Key x={340} y={r2(92 + i * 40 + 4)} fill={INK} size={12}>
            {row.key}
          </Key>
          <Pips x={520} y={92 + i * 40} n={row.n} />
        </g>
      ))}
      <Person x={110} y={284} s={2.4} />
    </Frame>
  );
}

/** A product box standing on (x, bottom). `kind` picks the familiar brand
 *  or an unknown new product; `chosen` outlines it in SIGNAL. */
function Product({
  x,
  bottom,
  kind,
  chosen = false,
  w = 60,
  h = 78,
}: {
  x: number;
  bottom: number;
  kind: "brand" | "new";
  chosen?: boolean;
  w?: number;
  h?: number;
}) {
  const top = bottom - h;
  return (
    <g>
      <rect
        x={r2(x - w / 2)}
        y={top}
        width={w}
        height={h}
        rx={4}
        fill={kind === "new" ? PAPER3 : PAPER}
        stroke={chosen ? SIGNAL : INK}
        strokeWidth={chosen ? 3 : 2}
      />
      {kind === "brand" ? (
        <BrandMark x={x} y={r2(top + h / 2)} s={r2((w * 0.55) / 36)} />
      ) : (
        <g>
          <circle cx={x} cy={r2(top + h / 2)} r={r2(w * 0.34)} fill={INK} />
          <text
            x={x}
            y={r2(top + h / 2 + 4)}
            textAnchor="middle"
            fontFamily="var(--font-label)"
            fontSize={11}
            fontWeight={700}
            letterSpacing="0.08em"
            fill={PAPER}
          >
            NEW
          </text>
        </g>
      )}
    </g>
  );
}

/** One shelf, two products; the buyer takes one. */
function EsteemChoice({
  pick,
  label,
}: {
  pick: "brand" | "new";
  label: string;
}) {
  const bx = 226;
  const nx = 326;
  const from = pick === "new" ? nx : bx;
  return (
    <Frame width={400} height={200} label={label}>
      <g transform="translate(0 -32)">
        <line
          x1={20}
          y1={206}
          x2={380}
          y2={206}
          stroke={RULE2}
          strokeWidth={1.6}
        />
        <Product x={bx} bottom={206} kind="brand" chosen={pick === "brand"} />
        <Product x={nx} bottom={206} kind="new" chosen={pick === "new"} />
        <CurveArrow
          x1={from}
          y1={122}
          cx={r2((from + 110) / 2)}
          cy={pick === "new" ? 8 : 40}
          x2={118}
          y2={100}
          stroke={SIGNAL}
          width={2.2}
        />
        <Person x={80} y={206} s={2.1} />
      </g>
    </Frame>
  );
}

export function HighEsteem() {
  return (
    <EsteemChoice
      pick="new"
      label="A person at a shelf with two products: the familiar brand and an unknown box marked new. An arrow runs from the new product to the person."
    />
  );
}

export function LowEsteem() {
  return (
    <EsteemChoice
      pick="brand"
      label="The same shelf with the familiar brand and an unknown box marked new. This time the arrow runs from the familiar brand to the person."
    />
  );
}

/* ==========================================================================
   THE ACTUAL SELF VERSUS THE IDEAL SELF
   ========================================================================== */

/** The actual self below, the ideal self above, the gap between them full of tension. */
export function ActualIdeal() {
  return (
    <Frame
      height={340}
      label="A person stands on a low level marked actual self. Higher up on the right, a dashed outline of the same person stands on a level marked ideal self. Between the two levels, a full tension gauge fills the gap."
    >
      <rect x={440} y={156} width={320} height={144} fill={SIGNAL_TINT} />
      <line x1={440} y1={156} x2={760} y2={156} stroke={SIGNAL} strokeWidth={2.4} />
      <line x1={40} y1={156} x2={440} y2={156} stroke={RULE2} strokeDasharray="3 5" />
      <line x1={40} y1={300} x2={440} y2={300} stroke={INK} strokeWidth={2.4} />
      <Key x={200} y={326} anchor="middle" fill={INK3}>
        ACTUAL SELF
      </Key>
      <Key x={600} y={186} anchor="middle" fill={SIGNAL}>
        IDEAL SELF
      </Key>
      <Person x={200} y={300} s={2} />
      <Ghost x={600} y={156} s={2} />
      <Gauge x={390} top={162} h={132} w={32} level={0.92} />
      <Key x={362} y={232} anchor="end" fill={SIGNAL}>
        TENSION
      </Key>
    </Frame>
  );
}

/** Products bought to bridge the gap: branded bags stacked into steps. */
export function BridgeGap() {
  const step = 48;
  const cols = [
    { x: 292, n: 1 },
    { x: 346, n: 2 },
    { x: 400, n: 3 },
  ];
  return (
    <Frame
      height={340}
      label="The actual self stands on the low level and the ideal self on the high level. Between them, shopping bags with the brand badge are stacked into three steps that climb from the low level to the high one."
    >
      <rect x={440} y={156} width={320} height={144} fill={SIGNAL_TINT} />
      <line x1={440} y1={156} x2={760} y2={156} stroke={SIGNAL} strokeWidth={2.4} />
      <line x1={40} y1={156} x2={440} y2={156} stroke={RULE2} strokeDasharray="3 5" />
      <line x1={40} y1={300} x2={440} y2={300} stroke={INK} strokeWidth={2.4} />
      <Key x={180} y={326} anchor="middle" fill={INK3}>
        ACTUAL SELF
      </Key>
      <Key x={600} y={186} anchor="middle" fill={SIGNAL}>
        IDEAL SELF
      </Key>
      {cols.map((c) =>
        Array.from({ length: c.n }, (_, i) => (
          <BrandBag key={`${c.x}-${i}`} x={c.x} y={r2(300 - step * i - step / 2)} w={46} />
        )),
      )}
      <Person x={180} y={300} s={2} />
      <Ghost x={600} y={156} s={2} />
    </Frame>
  );
}

/** An aspirational ad: with the product, the person becomes their ideal self. */
export function AspirationalAd() {
  return (
    <Frame
      width={400}
      height={272}
      label="A person looks up at a billboard. On the billboard, the same person holds a bag with the brand badge, and an arrow leads to a dashed outline of their ideal self."
    >
      <line x1={16} y1={256} x2={384} y2={256} stroke={RULE2} strokeWidth={1.6} />
      <line x1={180} y1={176} x2={180} y2={256} stroke={INK} strokeWidth={3} />
      <line x1={330} y1={176} x2={330} y2={256} stroke={INK} strokeWidth={3} />
      <rect x={112} y={18} width={272} height={158} rx={3} fill={PAPER} stroke={COUNTER} strokeWidth={3} />
      <Person x={158} y={156} s={1.45} />
      <BrandBag x={204} y={128} w={30} />
      <Arrow x1={230} y1={120} x2={290} y2={120} stroke={SIGNAL} width={2.2} />
      <Ghost x={328} y={156} s={1.45} />
      <Person x={56} y={256} s={1.7} />
    </Frame>
  );
}

/* ==========================================================================
   THE EXTENDED SELF: POSSESSIONS AS IDENTITY
   ========================================================================== */

/** A jewelled ring, centred on its band. */
function JewelRing({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={INK} strokeWidth={2.2} strokeLinejoin="round">
      <circle cx={x} cy={y + 6} r={13} fill="none" strokeWidth={4} />
      <path d={`M${x - 9} ${y - 12}L${x - 5} ${y - 18}H${x + 5}L${x + 9} ${y - 12}L${x} ${y - 4}Z`} fill={PAPER} />
    </g>
  );
}

/** A T-shirt, centred on (x, y). */
function Shirt({ x, y }: { x: number; y: number }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M-8 -20Q0 -14 8 -20L24 -12L18 0L12 -3V20H-12V-3L-18 0L-24 -12Z"
      fill={INK}
      strokeLinejoin="round"
    />
  );
}

/** A house; (x, y) is the middle of its base. */
function House({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 0V-26L0 -44L22 -26V0Z" fill={fill} />
      <rect x={-6} y={-16} width={12} height={16} fill={PAPER} />
    </g>
  );
}

/** A sofa, centred on its base at (x, y). */
function Sofa({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={INK}>
      <rect x={-26} y={-30} width={52} height={20} rx={5} />
      <rect x={-32} y={-18} width={12} height={18} rx={4} />
      <rect x={20} y={-18} width={12} height={18} rx={4} />
      <rect x={-22} y={-12} width={44} height={8} fill={PAPER} opacity={0.35} />
    </g>
  );
}

/** A small town skyline; (x, y) is the middle of its base. */
function Skyline({ x, y }: { x: number; y: number }) {
  const blocks = [
    [-30, 26],
    [-16, 46],
    [0, 34],
    [14, 56],
    [28, 30],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {blocks.map(([bx, h]) => (
        <rect key={bx} x={bx - 7} y={-h} width={14} height={h} fill={INK} />
      ))}
      {blocks.map(([bx, h]) =>
        Array.from({ length: Math.floor((h - 8) / 12) }, (_, i) => (
          <rect key={`${bx}-${i}`} x={bx - 2} y={-h + 6 + i * 12} width={4} height={4} fill={PAPER} />
        )),
      )}
    </g>
  );
}

/** A team pennant on its stick; (x, y) is the foot of the stick. */
function Pennant({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={-20} y1={0} x2={-20} y2={-60} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M-20 -60L28 -48L-20 -36Z" fill={INK} />
      <path d="M-20 -52L10 -48L-20 -44Z" fill={PAPER} />
    </g>
  );
}

/** A raised placard, the sign of a social movement; (x, y) is the foot of the stick. */
function Placard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={0} y2={-36} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <rect x={-26} y={-66} width={52} height={32} rx={2} fill={INK} />
      <line x1={-16} y1={-55} x2={16} y2={-55} stroke={PAPER} strokeWidth={3} strokeLinecap="round" />
      <line x1={-12} y1={-45} x2={12} y2={-45} stroke={PAPER} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

const RINGS = ["INDIVIDUAL", "FAMILY", "COMMUNITY", "GROUP"];

/** The self at the centre, possessions widening out to the group. */
export function ExtendedRings() {
  const cx = 400;
  const base = 392;
  const radii = [130, 210, 290, 370];
  /** A point in band `i` at `deg` degrees from the vertical. */
  const at = (i: number, deg: number) => {
    const r = i === 0 ? 84 : (radii[i - 1] + radii[i]) / 2;
    const a = (deg * Math.PI) / 180;
    return { x: r2(cx + r * Math.sin(a)), y: r2(base - r * Math.cos(a)) };
  };
  const p = (i: number, deg: number) => at(i, deg);
  return (
    <Frame
      height={404}
      label="A person stands at the centre of four widening half-rings marked individual, family, community and group. The inner ring holds a jewelled ring and a shirt; the next a house and a sofa; the next a neighborhood of houses and a town skyline; the outer ring a team pennant and a protest placard."
    >
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M${cx - r} ${base}A${r} ${r} 0 0 1 ${cx + r} ${base}`}
          fill="none"
          stroke={RULE2}
          strokeWidth={1.8}
        />
      ))}
      <line x1={16} y1={base} x2={784} y2={base} stroke={INK} strokeWidth={2} />
      {radii.map((r, i) => (
        <Key key={r} x={cx} y={base - r + 24} anchor="middle" fill={INK3}>
          {RINGS[i]}
        </Key>
      ))}
      <Person x={cx} y={base} s={1.35} />
      <JewelRing x={p(0, -58).x} y={p(0, -58).y} />
      <Shirt x={p(0, 58).x} y={p(0, 58).y} />
      <House x={p(1, -52).x} y={p(1, -52).y + 20} />
      <Sofa x={p(1, 52).x} y={p(1, 52).y + 14} />
      <g>
        <House x={p(2, -56).x - 26} y={p(2, -56).y + 18} s={0.62} />
        <House x={p(2, -56).x} y={p(2, -56).y + 18} s={0.62} />
        <House x={p(2, -56).x + 26} y={p(2, -56).y + 18} s={0.62} />
      </g>
      <Skyline x={p(2, 56).x} y={p(2, 56).y + 24} />
      <Pennant x={p(3, -54).x} y={p(3, -54).y + 30} />
      <Placard x={p(3, 54).x} y={p(3, 54).y + 30} />
    </Frame>
  );
}

/** The four half-rings in miniature, with one band lit. */
export function RingMark({ lit }: { lit: number }) {
  const radii = [10, 18, 26, 34];
  return (
    <svg viewBox="0 0 76 42" className="h-10 w-[4.5rem] shrink-0" aria-hidden>
      {[...radii].reverse().map((r) => {
        const i = radii.indexOf(r);
        return (
          <path
            key={r}
            d={`M${38 - r} 38A${r} ${r} 0 0 1 ${38 + r} 38Z`}
            fill={i === lit ? SIGNAL : PAPER}
            stroke={i === lit ? SIGNAL : RULE2}
            strokeWidth={1.4}
          />
        );
      })}
      {lit > 0 ? (
        <path
          d={`M${38 - radii[lit - 1]} 38A${radii[lit - 1]} ${radii[lit - 1]} 0 0 1 ${38 + radii[lit - 1]} 38Z`}
          fill={PAPER}
          stroke={RULE2}
          strokeWidth={1.4}
        />
      ) : null}
    </svg>
  );
}

/* ==========================================================================
   PERSONALITY TRAITS AND CONSUMER BEHAVIOR
   ========================================================================== */

/** First in line for something new. */
export function Innovativeness() {
  return (
    <Frame
      width={400}
      height={180}
      label="A queue of people waits at a stand holding a box marked new. The person at the front, highlighted, is closest to the new product."
    >
      <g transform="translate(0 -36)">
      <line x1={16} y1={200} x2={384} y2={200} stroke={RULE2} strokeWidth={1.6} />
      <rect x={300} y={150} width={70} height={50} fill={PAPER3} stroke={INK} strokeWidth={2} />
      <Product x={335} bottom={150} kind="new" w={52} h={66} />
      {[60, 120, 180].map((x) => (
        <Person key={x} x={x} y={200} s={1.45} fill={INK3} />
      ))}
      <Person x={248} y={200} s={1.45} fill={SIGNAL} />
      </g>
    </Frame>
  );
}

/** Worldly goods, owned for status. */
export function Materialism() {
  return (
    <Frame
      width={400}
      height={180}
      label="A person stands between a pile of shopping bags and a car, with a status star above their head."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <Car x={292} y={164} s={0.9} fill={INK2} />
      <Bag x={48} y={146} w={34} />
      <Bag x={88} y={146} w={34} />
      <Bag x={68} y={112} w={34} />
      <Person x={160} y={164} s={1.45} />
      <Star x={160} y={48} R={15} fill={SIGNAL} />
    </Frame>
  );
}

/** Reading every line of a detailed product description. */
export function NeedForCognition() {
  const lines = Array.from({ length: 10 }, (_, i) => i);
  return (
    <Frame
      width={400}
      height={180}
      label="A person studies a long product description sheet, line by line, through a magnifying glass. The product box with the brand badge stands beside the sheet."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <Person x={80} y={164} s={1.45} />
      <rect x={150} y={14} width={112} height={150} rx={3} fill={PAPER} stroke={INK} strokeWidth={2} />
      {lines.map((i) => (
        <line
          key={i}
          x1={164}
          y1={32 + i * 13}
          x2={i % 3 === 2 ? 220 : 248}
          y2={32 + i * 13}
          stroke={INK3}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      ))}
      <g fill="none" stroke={SIGNAL} strokeLinecap="round">
        <circle cx={214} cy={84} r={22} fill={SIGNAL_TINT} strokeWidth={2.8} />
        <line x1={198.4} y1={99.6} x2={184} y2={114} strokeWidth={5} />
      </g>
      <Product x={328} bottom={164} kind="brand" w={54} h={70} />
    </Frame>
  );
}

/** A piggy bank standing on (x, bottom). */
function PiggyBank({ x, bottom, fill = INK }: { x: number; bottom: number; fill?: string }) {
  const cy = bottom - 38;
  return (
    <g fill={fill}>
      <rect x={x - 26} y={cy + 14} width={12} height={24} rx={3} />
      <rect x={x + 14} y={cy + 14} width={12} height={24} rx={3} />
      <ellipse cx={x} cy={cy} rx={44} ry={30} />
      <rect x={x + 38} y={cy - 8} width={14} height={18} rx={4} />
      <path d={`M${x + 12} ${cy - 24}L${x + 24} ${cy - 40}L${x + 28} ${cy - 20}Z`} />
      <circle cx={x + 26} cy={cy - 8} r={3} fill={PAPER} />
      <line x1={x - 12} y1={cy - 22} x2={x + 6} y2={cy - 22} stroke={PAPER} strokeWidth={3.4} strokeLinecap="round" />
    </g>
  );
}

/** Careful spending: the coin is saved, the wasteful bag is refused. */
export function Frugality() {
  return (
    <Frame
      width={400}
      height={180}
      label="A person drops a coin into a piggy bank. A shopping bag beside them is crossed out."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <Person x={64} y={164} s={1.45} />
      <circle cx={122} cy={60} r={11} fill={SIGNAL} />
      <circle cx={122} cy={60} r={6} fill="none" stroke={PAPER} strokeWidth={1.6} />
      <CurveArrow x1={138} y1={56} cx={240} cy={20} x2={302} y2={96} stroke={SIGNAL} width={2.2} />
      <PiggyBank x={306} bottom={164} />
      <Bag x={176} y={144} w={36} stroke={INK3} />
      <Cross x={176} y={144} s={2.4} stroke={INK} />
    </Frame>
  );
}

/* ==========================================================================
   THE BIG FIVE PERSONALITY DIMENSIONS
   ========================================================================== */

/** Creativity: painting something new at an easel. */
export function Openness() {
  return (
    <Frame
      width={400}
      height={180}
      label="A person stands at an easel, painting a bright new picture on the canvas."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <line x1={250} y1={30} x2={214} y2={164} />
        <line x1={250} y1={30} x2={286} y2={164} />
        <line x1={250} y1={30} x2={250} y2={164} />
      </g>
      <rect x={186} y={26} width={128} height={96} rx={2} fill={PAPER} stroke={INK} strokeWidth={2.4} />
      <circle cx={236} cy={70} r={24} fill={SIGNAL} />
      <path d="M270 50Q290 62 280 80T296 104" fill="none" stroke={COUNTER} strokeWidth={7} strokeLinecap="round" />
      <path d="M204 108Q226 96 256 108" fill="none" stroke={INK2} strokeWidth={7} strokeLinecap="round" />
      {/* the brush */}
      <line x1={140} y1={112} x2={176} y2={92} stroke={INK} strokeWidth={3.4} strokeLinecap="round" />
      <ellipse cx={180} cy={89} rx={7} ry={4} transform="rotate(-30 180 89)" fill={SIGNAL} />
      {/* the palette */}
      <path d="M30 118Q24 94 50 90Q78 88 80 106Q82 116 70 114Q60 112 62 124Q62 136 46 134Q34 132 30 118Z" fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={44} cy={104} r={4.5} fill={SIGNAL} />
      <circle cx={60} cy={99} r={4.5} fill={INK2} />
      <circle cx={42} cy={121} r={4.5} fill={COUNTER} />
      <Person x={116} y={164} s={1.45} />
    </Frame>
  );
}

/** Organization: every item on the list is done. */
export function Conscientiousness() {
  const rows = [0, 1, 2, 3];
  return (
    <Frame
      width={400}
      height={180}
      label="A person stands beside a clipboard checklist on which every item is ticked."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <Person x={110} y={164} s={1.45} />
      <rect x={196} y={16} width={130} height={148} rx={6} fill={PAPER} stroke={INK} strokeWidth={2.4} />
      <rect x={236} y={8} width={50} height={16} rx={4} fill={INK} />
      {rows.map((i) => {
        const y = 50 + i * 28;
        return (
          <g key={i}>
            <rect x={212} y={y - 9} width={18} height={18} rx={3} fill="none" stroke={INK} strokeWidth={1.8} />
            <Check x={221} y={y} s={0.9} />
            <line x1={242} y1={y} x2={i % 2 ? 290 : 308} y2={y} stroke={INK3} strokeWidth={2.4} strokeLinecap="round" />
          </g>
        );
      })}
    </Frame>
  );
}

/** A speech bubble; (x, y) is its centre, the tail points to (tx, ty). */
function Speech({
  x,
  y,
  w = 56,
  h = 34,
  tx,
  ty,
  fill = SIGNAL,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tx: number;
  ty: number;
  fill?: string;
}) {
  const side = tx < x ? -1 : 1;
  const bx = r2(x + side * w * 0.12);
  return (
    <g>
      <rect x={r2(x - w / 2)} y={r2(y - h / 2)} width={w} height={h} rx={10} fill={fill} />
      <path d={`M${r2(bx - 7)} ${r2(y + h / 2 - 1)}L${tx} ${ty}L${r2(bx + 7)} ${r2(y + h / 2 - 1)}Z`} fill={fill} />
      <line x1={r2(x - w / 2 + 12)} y1={r2(y - 5)} x2={r2(x + w / 2 - 12)} y2={r2(y - 5)} stroke={PAPER} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={r2(x - w / 2 + 12)} y1={r2(y + 5)} x2={r2(x + w / 2 - 22)} y2={r2(y + 5)} stroke={PAPER} strokeWidth={2.6} strokeLinecap="round" />
    </g>
  );
}

/** Sociability: the one doing the talking in the middle of the group. */
export function Extraversion() {
  return (
    <Frame
      width={400}
      height={180}
      label="A person in the middle of a group talks with two lit speech bubbles, while four others listen around them."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      {[64, 120, 280, 336].map((x) => (
        <Person key={x} x={x} y={164} s={1.3} fill={INK3} />
      ))}
      <Person x={200} y={164} s={1.55} />
      <Speech x={146} y={36} tx={178} ty={70} />
      <Speech x={254} y={36} tx={222} ty={70} />
    </Frame>
  );
}

/** Cooperation: carrying the load together, warmly. */
export function Agreeableness() {
  return (
    <Frame
      width={400}
      height={180}
      label="Two people carry one long box together between them, with a heart above the box."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <Person x={118} y={164} s={1.55} />
      <Person x={282} y={164} s={1.55} />
      <rect x={140} y={96} width={120} height={34} rx={3} fill={PAPER3} stroke={INK} strokeWidth={2.2} />
      <line x1={140} y1={108} x2={260} y2={108} stroke={INK} strokeWidth={1.6} />
      <Heart x={200} y={56} s={1.5} />
    </Frame>
  );
}

/** Anxiety and mood swings: a storm over one person. */
export function Neuroticism() {
  return (
    <Frame
      width={400}
      height={180}
      label="A person stands under a dark storm cloud with a lightning bolt, while the sky around them stays clear."
    >
      <line x1={16} y1={164} x2={384} y2={164} stroke={RULE2} strokeWidth={1.6} />
      <g transform="translate(0 10)">
        <path
          d="M132 50Q120 30 144 26Q150 6 178 10Q196 -2 214 14Q236 4 250 22Q276 20 272 40Q286 50 266 56H144Q124 56 132 50Z"
          fill={INK2}
        />
        <path d="M206 58L194 76H206L198 92L222 70H210L218 58Z" fill={SIGNAL} />
      </g>
      <Person x={176} y={164} s={1.3} />
    </Frame>
  );
}

/* ==========================================================================
   Plates still to draw. Each is written, screenshotted and passed before the
   next one starts.
   ========================================================================== */

const Todo = () => null;
export const TailoredAds = Todo;
export const BrandTraits = Todo;
export const Sincerity = Todo;
export const Excitement = Todo;
export const Competence = Todo;
export const Sophistication = Todo;
export const Ruggedness = Todo;
export const FaceInObject = Todo;
export const Mascot = Todo;
export const BrandPartner = Todo;
export const Betrayal = Todo;
export const WhoWhy = Todo;
export const Activities = Todo;
export const Interests = Todo;
export const Opinions = Todo;
export const VALSMap = Todo;
export const VALSMark = (_: { lit: string[] }) => null;
export const YourPossession = Todo;
