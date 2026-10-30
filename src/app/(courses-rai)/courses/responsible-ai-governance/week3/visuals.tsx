"use client";

import React, { useState } from "react";
import { CENTRE_DASH, FigureName, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, PlateButton, Segmented, Slider, Toggles, r2, seeded, stip } from "../_visuals/kit";
import { Coins, Figure, Gear, Sheet, SmallModel, Tag, cross, headAlongPath, star, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 3 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in Caslon italic and one examiner's red for the finding. The week's cast:
   the model is a housing with two weight gears (as in Week 1). The cultural
   default it carries is a knife-and-fork place setting. See the course
   CLAUDE.md.
   ========================================================================== */

const ink = { stroke: PAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: PAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/** Caslon numerals or a quantity on a plate. */
function Num({ x, y, children, size = 14, anchor = "middle", fill = PAT.ink, italic = false }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; fill?: string; italic?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-heading)" fontSize={size} fontStyle={italic ? "italic" : undefined} fill={fill} style={{ fontVariantNumeric: "lining-nums" }}>
      {children}
    </text>
  );
}

/** The week's cultural default: a dinner plate with a fork at its left and a knife at its right, seen from above. */
function PlaceSetting({ cx, cy, s = 1, stroke = PAT.ink }: { cx: number; cy: number; s?: number; stroke?: string }) {
  const o = { stroke, strokeWidth: LINE.outline / s, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <circle r={13} {...o} fill={PAT.paper} />
      <circle r={8.5} {...o} strokeWidth={LINE.hair / s} />
      {/* fork */}
      <path d="M-21 -11V-5Q-21 -2 -19 -2Q-17 -2 -17 -5V-11M-19 -11V-5M-19 -2V13" {...o} />
      {/* knife */}
      <path d="M19 13V-11Q22 -6 21 1H19" {...o} />
    </g>
  );
}

/** Chopsticks laid on a bowl, seen from above: a local norm the default replaces. */
function Chopsticks({ cx, cy, s = 1, stroke = PAT.ink }: { cx: number; cy: number; s?: number; stroke?: string }) {
  const o = { stroke, strokeWidth: LINE.outline / s, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <circle r={11} {...o} fill={PAT.paper} />
      <circle r={6} {...o} strokeWidth={LINE.hair / s} />
      <path d="M-4 -17L20 9M-8 -15L17 11" {...o} />
    </g>
  );
}

/* --------------------------------------------------------------------------
   02. Culture Inside Foundation Models
   -------------------------------------------------------------------------- */

/**
 * The model as a projector: its housing carries one place setting (red, the
 * default encoded in its weights) and projects it through a lens onto three
 * screens in three markets, each of which shows knife and fork.
 */
export function DefaultProjector() {
  const id = "w3-proj";
  const lens = { x: 172, y: 146 };
  const sw = 122;
  const sh = 74;
  const screens = [
    { x: 300, y: 18, name: "JAPAN" },
    { x: 330, y: 110, name: "INDIA" },
    { x: 300, y: 202, name: "ETHIOPIA" },
  ];
  return (
    <Frame
      width={560}
      height={290}
      label="Patent drawing: the model, a housing with two weight gears, carries one knife-and-fork place setting drawn in red on its front face. Through a lens on its side it projects that same setting onto three screens, one each in Japan, India and Ethiopia. Every screen shows a knife-and-fork dinner."
    >
      <PatentDefs id={id} />
      {/* beams: a cone from the lens to each screen */}
      {screens.map((s) => (
        <g key={s.name}>
          <line x1={lens.x + 20} y1={lens.y - 7} x2={s.x - 2} y2={s.y + 3} {...hair} strokeDasharray="5 3" />
          <line x1={lens.x + 20} y1={lens.y + 7} x2={s.x - 2} y2={s.y + sh - 3} {...hair} strokeDasharray="5 3" />
        </g>
      ))}
      {/* the model, its weight gears above the default it encodes */}
      <ObliqueBox id={id} x={24} y={84} w={126} h={124} dx={14} dy={9} />
      <Gear cx={66} cy={118} r={17} n={10} />
      <Gear cx={106} cy={130} r={13} n={8} phase={0.25} />
      <PlaceSetting cx={87} cy={178} s={1.1} stroke={PAT.signal} />
      {/* lens barrel on the side face */}
      <path d={`M${lens.x - 8} ${lens.y - 13}H${lens.x + 16}V${lens.y + 13}H${lens.x - 8}`} fill={stip(id, "light")} {...ink} />
      <ellipse cx={lens.x + 16} cy={lens.y} rx={6} ry={13} fill={PAT.paper} {...ink} />
      {/* screens */}
      {screens.map((s) => (
        <g key={s.name}>
          <ObliqueBox id={id} x={s.x} y={s.y} w={sw} h={sh} dx={6} dy={4} />
          <rect x={s.x + 6} y={s.y + 6} width={sw - 12} height={sh - 12} fill="none" {...hair} />
          <PlaceSetting cx={r2(s.x + sw / 2)} cy={r2(s.y + sh / 2)} s={1.25} />
          <PatentKey x={s.x + sw + 16} y={r2(s.y + sh / 2 + 4)} anchor="start" size={12}>
            {s.name}
          </PatentKey>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Plates still to draw
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   03. Why Cultural Alignment Matters for Global Marketing
   -------------------------------------------------------------------------- */

/**
 * A campaign poster standing upright: (x, y) is its front face's top-left.
 * "hero" shows one figure celebrating alone (an individualist appeal).
 * "family" shows a family together (a collectivist one).
 */
function Poster({ id, x, y, kind, red = false, w = 58, h = 74 }: { id: string; x: number; y: number; kind: "hero" | "family"; red?: boolean; w?: number; h?: number }) {
  const c = red ? PAT.signal : PAT.ink;
  const g = y + h - 9;
  const cx = r2(x + w / 2);
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={5} dy={3} stroke={c} />
      <line x1={x + 5} y1={g} x2={x + w - 5} y2={g} {...hair} stroke={c} />
      {kind === "hero" ? (
        <Figure id={id} x={cx} y={g} s={0.62} arm="lift" coat={red ? "signal" : "light"} stroke={c} />
      ) : (
        <g>
          <Figure id={id} x={r2(cx - 16)} y={g} s={0.5} arm="reach" />
          <Figure id={id} x={r2(cx + 16)} y={g} s={0.5} arm="reach" flip coat="dense" />
          <Figure id={id} x={cx} y={g} s={0.32} coat="paper" />
        </g>
      )}
    </g>
  );
}

/**
 * Three ways a campaign reaches three markets. Global standardization: one
 * master poster copied to all three. Local adaptation: a local team in each
 * market makes its own (the second and third markets show families). The
 * delegated model: the model sends its one default poster, a lone figure
 * celebrating, to all three. In the two family markets it is red.
 */
export function DelegatedAdaptation() {
  const id = "w3-deleg";
  const pw = 58;
  const gap = 18;
  const top = 112;
  const row = (x0: number, kinds: ("hero" | "family")[], red: boolean[]) =>
    kinds.map((k, i) => <Poster key={i} id={id} x={x0 + i * (pw + gap)} y={top} kind={k} red={red[i]} />);
  const drops = (sx: number, sy: number, x0: number) =>
    [0, 1, 2].map((i) => {
      const tx = r2(x0 + i * (pw + gap) + pw / 2);
      return <line key={i} x1={sx} y1={sy} x2={tx} y2={top - 8} {...hair} strokeDasharray={CENTRE_DASH} />;
    });
  const xs = [28, 290, 552];
  const mid = (x0: number) => r2(x0 + (3 * pw + 2 * gap) / 2);
  return (
    <Frame
      width={800}
      height={236}
      label="Patent drawing in three figures, each sending a campaign to the same three markets as three posters. Global standardization: one master poster showing a lone figure celebrating is copied to all three markets. Local adaptation: a local team in each market makes its own poster. The first shows a lone figure, the second and third show a family together. Delegated to a model: the model sends its one default poster, the lone celebrating figure, to all three markets. In the second and third markets, where the local teams chose families, the poster is red."
    >
      <PatentDefs id={id} />
      {/* standardization: one master poster copied */}
      <Poster id={id} x={r2(mid(xs[0]) - 29)} y={8} kind="hero" />
      {drops(mid(xs[0]), 86, xs[0])}
      {row(xs[0], ["hero", "hero", "hero"], [false, false, false])}

      {/* local adaptation: a team in each market */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Figure id={id} x={r2(xs[1] + i * (pw + gap) + pw / 2)} y={94} s={0.82} coat="paper" />
          <line x1={r2(xs[1] + i * (pw + gap) + 12)} y1={95} x2={r2(xs[1] + i * (pw + gap) + pw - 12)} y2={95} {...hair} />
        </g>
      ))}
      {row(xs[1], ["hero", "family", "family"], [false, false, false])}

      {/* delegated to the model */}
      <ObliqueBox id={id} x={r2(mid(xs[2]) - 34)} y={20} w={68} h={58} dx={12} dy={8} />
      <Gear cx={r2(mid(xs[2]) - 12)} cy={44} r={11} n={9} />
      <Gear cx={r2(mid(xs[2]) + 13)} cy={58} r={9} n={8} phase={0.25} />
      {drops(mid(xs[2]), 86, xs[2])}
      {row(xs[2], ["hero", "hero", "hero"], [false, true, true])}

      <line x1={272} y1={14} x2={272} y2={206} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      <line x1={534} y1={14} x2={534} y2={206} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      <FigureName x={mid(xs[0])} y={226} size={13}>
        global standardization
      </FigureName>
      <FigureName x={mid(xs[1])} y={226} size={13}>
        local adaptation
      </FigureName>
      <FigureName x={mid(xs[2])} y={226} size={13}>
        cultural adaptation delegated to the model
      </FigureName>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   04. Part 1: Training Corpora and Cultural Hegemony
   -------------------------------------------------------------------------- */

/** A printed card standing upright with a line of text on it: a prompt. (x, y) is its top-left. */
function PromptCard({ id, x, y, text, w = 150, h = 44, lang }: { id: string; x: number; y: number; text: string; w?: number; h?: number; lang?: string }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={6} dy={4} />
      <text x={r2(x + w / 2)} y={r2(y + h / 2 + 5)} textAnchor="middle" fontFamily="var(--font-heading)" fontStyle="italic" fontSize={13} fill={PAT.ink} lang={lang}>
        {text}
      </text>
    </g>
  );
}

/**
 * One model, two prompts: "a family eating dinner" in English and the same
 * request translated into Japanese. Both come out as the same knife-and-fork
 * dinner. The translated one is red.
 */
export function TranslatedPrompt() {
  const id = "w3-transl";
  const rows = [
    { y: 30, text: "a family eating dinner", lang: "en", red: false },
    { y: 150, text: "家族の夕食", lang: "ja", red: true },
  ];
  const mx = 240;
  const my = 82;
  return (
    <Frame
      width={520}
      height={252}
      label="Patent drawing: two prompt cards enter one model, a housing with two weight gears. The upper card reads 'a family eating dinner' in English. The lower card is the same request translated into Japanese. Each comes out as a picture of a dinner table. Both pictures show the same knife-and-fork place setting, and the one made from the Japanese prompt is red."
    >
      <PatentDefs id={id} />
      {rows.map((r) => (
        <g key={r.lang}>
          <PromptCard id={id} x={10} y={r.y} text={r.text} lang={r.lang} w={172} />
          <line x1={194} y1={r.y + 22} x2={mx - 4} y2={r.lang === "en" ? my + 22 : my + 70} {...hair} strokeDasharray={CENTRE_DASH} />
          <line x1={mx + 104} y1={r.lang === "en" ? my + 22 : my + 70} x2={382} y2={r.y + 34} {...hair} strokeDasharray={CENTRE_DASH} />
          {/* the generated picture */}
          <ObliqueBox id={id} x={386} y={r.y} w={112} h={70} dx={6} dy={4} stroke={r.red ? PAT.signal : PAT.ink} />
          <rect x={392} y={r.y + 6} width={100} height={58} fill="none" {...hair} stroke={r.red ? PAT.signal : PAT.ink} />
          <PlaceSetting cx={442} cy={r.y + 35} s={1.25} stroke={r.red ? PAT.signal : PAT.ink} />
        </g>
      ))}
      <ObliqueBox id={id} x={mx} y={my} w={90} h={92} dx={14} dy={9} />
      <Gear cx={mx + 34} cy={my + 34} r={15} n={10} />
      <Gear cx={mx + 62} cy={my + 60} r={12} n={8} phase={0.25} />
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   05. How Pre-Training Corpora Shape Default Worldviews
   -------------------------------------------------------------------------- */

/**
 * The ten most used content languages of the web, in order: share of
 * websites (W3Techs content-language survey, 2024, approximate) and native
 * speakers in millions (Ethnologue, 2023, approximate). World population
 * about 8,100 million.
 */
const WEB_LANGUAGES = [
  { name: "English", web: 49.4, speakers: 380 },
  { name: "Spanish", web: 6.0, speakers: 485 },
  { name: "German", web: 5.6, speakers: 76 },
  { name: "Japanese", web: 4.9, speakers: 123 },
  { name: "French", web: 4.4, speakers: 74 },
  { name: "Russian", web: 4.0, speakers: 145 },
  { name: "Portuguese", web: 3.7, speakers: 236 },
  { name: "Italian", web: 2.4, speakers: 64 },
  { name: "Dutch", web: 1.9, speakers: 24 },
  { name: "Polish", web: 1.7, speakers: 40 },
];
const WORLD_MILLIONS = 8100;

/**
 * Web text against the world's people, each drawn as a hundred: a 10 × 10
 * stack of pages and a 10 × 10 crowd. The slider counts in the high-resource
 * languages one at a time, English first. Their pages and their native
 * speakers turn red. Web text climbs past four in five pages while the
 * people stay near one in five.
 */
export function CorpusVsSpeakers() {
  const [n, setN] = useState(10);
  const id = "w3-corpus";
  const langs = WEB_LANGUAGES.slice(0, n);
  const web = langs.reduce((a, l) => a + l.web, 0);
  const people = (langs.reduce((a, l) => a + l.speakers, 0) / WORLD_MILLIONS) * 100;
  const webCells = Math.round(web);
  const peopleCells = Math.round(people);
  const cw = 21;
  const ch = 23;
  const g1 = 26;
  const g2 = 314;
  const gy = 40;
  return (
    <div>
      <Frame
        width={560}
        height={318}
        label={`Patent drawing of two hundreds. Left, web text: a 10 by 10 stack of pages, of which ${webCells} are red, the share of websites written in ${n === 1 ? "English" : `English and ${n - 1} other high-resource languages`}. Right, the world's people: a 10 by 10 crowd, of which ${peopleCells} are red, the share who are native speakers of those languages.`}
      >
        <PatentDefs id={id} />
        <PatentKey x={g1 + 5 * cw} y={22} size={12}>
          WEB TEXT
        </PatentKey>
        <PatentKey x={g2 + 5 * cw} y={22} size={12}>
          NATIVE SPEAKERS
        </PatentKey>
        {Array.from({ length: 100 }, (_, i) => {
          const c = i % 10;
          const r = Math.floor(i / 10);
          const on = i < webCells;
          const x = g1 + c * cw;
          const y = gy + r * ch;
          const col = on ? PAT.signal : PAT.ink;
          return (
            <g key={i}>
              <path d={`M${x + 3} ${y + 2}H${x + 13}L${x + 17} ${y + 6}V${y + 20}H${x + 3}Z`} fill={on ? stip(id, "signal") : PAT.paper} stroke={col} strokeWidth={LINE.hair} strokeLinejoin="round" />
              <path d={`M${x + 13} ${y + 2}V${y + 6}H${x + 17}`} fill="none" stroke={col} strokeWidth={LINE.hair} strokeLinejoin="round" />
            </g>
          );
        })}
        {Array.from({ length: 100 }, (_, i) => {
          const c = i % 10;
          const r = Math.floor(i / 10);
          const on = i < peopleCells;
          const x = g2 + c * cw + 10;
          const y = gy + r * ch;
          const col = on ? PAT.signal : PAT.ink;
          const fill = on ? stip(id, "signal") : PAT.paper;
          return (
            <g key={i} stroke={col} strokeWidth={LINE.hair} strokeLinejoin="round">
              <circle cx={x} cy={y + 6} r={3.6} fill={fill} />
              <path d={`M${x - 6.5} ${y + 20}V${y + 15.5}Q${x - 6.5} ${y + 10.8} ${x} ${y + 10.8}Q${x + 6.5} ${y + 10.8} ${x + 6.5} ${y + 15.5}V${y + 20}Z`} fill={fill} />
            </g>
          );
        })}
        <Num x={g1 + 5 * cw} y={300} size={24} fill={PAT.signal}>
          {`${Math.round(web)}%`}
        </Num>
        <Num x={g2 + 5 * cw} y={300} size={24} fill={PAT.signal}>
          {`${Math.round(people)}%`}
        </Num>
        <line x1={280} y1={44} x2={280} y2={300} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      </Frame>
      <Slider
        label="High-resource languages"
        value={n}
        min={1}
        max={10}
        onChange={setN}
        formatValue={(v) => (v === 1 ? "English" : `English + ${v - 1}`)}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   06. WEIRD Alignment and Value Homogenization
   -------------------------------------------------------------------------- */

const pdf = (x: number, m: number, sd: number) => Math.exp(-0.5 * ((x - m) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));

/**
 * Values as a pile of sand on a rule running from collectivist to
 * individualist. The world's population is a broad, low stippled pile centred
 * toward the collectivist side. WEIRD societies sit in its individualist
 * tail. The model's answers are a red curve already leaning that way. The
 * slider sets the share of annotators drawn from one cultural group: as it
 * rises, the red curve slides into the WEIRD tail and narrows to a spike.
 */
export function ValueNarrowing() {
  const [share, setShare] = useState(100);
  const id = "w3-weird";
  const x0 = 40;
  const x1 = 520;
  const base = 214;
  const k = 45 / pdf(0.42, 0.42, 0.16);
  const px = (t: number) => r2(x0 + t * (x1 - x0));
  const f = share / 100;
  const m = 0.64 + 0.17 * f;
  const sd = 0.15 - 0.1 * f;
  const curve = (fn: (t: number) => number) =>
    Array.from({ length: 121 }, (_, i) => {
      const t = i / 120;
      return `${i === 0 ? "M" : "L"}${px(t)} ${r2(base - fn(t) * k)}`;
    }).join("");
  const world = curve((t) => pdf(t, 0.42, 0.16));
  const model = curve((t) => pdf(t, m, sd));
  const peakY = r2(base - pdf(m, m, sd) * k);
  return (
    <div>
      <Frame
        width={560}
        height={282}
        label={`Patent drawing: a rule runs from collectivist at the left to individualist at the right. The world population's values form a broad, low stippled pile centred toward the collectivist side. WEIRD societies are bracketed in its individualist tail. The model's answers form a red curve. With ${share}% of annotators from one cultural group, the red curve is centred in the ${m > 0.72 ? "WEIRD tail" : "individualist half"} and is ${sd < 0.08 ? "a narrow spike" : "still fairly wide"}.`}
      >
        <PatentDefs id={id} />
        <path d={`${world}V${base}H${x0}Z`} fill={stip(id, "light")} stroke="none" />
        <path d={world} fill="none" {...ink} />
        <path d={model} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" />
        {/* the rule */}
        <ObliqueBox id={id} x={x0} y={base} w={x1 - x0} h={8} dx={12} dy={7} />
        <PatentKey x={x0} y={base + 58} anchor="start" size={11.5}>
          ← COLLECTIVIST
        </PatentKey>
        <PatentKey x={x1} y={base + 58} anchor="end" size={11.5}>
          INDIVIDUALIST →
        </PatentKey>
        {/* WEIRD bracket under the tail */}
        <path d={`M${px(0.72)} ${base + 16}V${base + 22}H${px(0.92)}V${base + 16}`} fill="none" {...hair} />
        <PatentKey x={px(0.82)} y={base + 37} size={11.5}>
          WEIRD
        </PatentKey>
        <PatentKey x={px(0.3)} y={base - 58} size={11.5}>
          GLOBAL POPULATION
        </PatentKey>
        <PatentKey x={r2(Math.min(px(m) + 14, x1 - 40))} y={r2(Math.max(peakY - 8, 22))} anchor="start" size={11.5} fill={PAT.signal}>
          MODEL
        </PatentKey>
      </Frame>
      <Slider label="Annotators from a single cultural group" value={share} min={0} max={100} step={10} onChange={setShare} formatValue={(v) => `${v}%`} />
    </div>
  );
}
/* --------------------------------------------------------------------------
   07. Tokenization and Multilingual Disparities
   -------------------------------------------------------------------------- */

type TokLang = "en" | "sw" | "am";

/**
 * One sentence ("The parcel will arrive tomorrow morning.") as a tokenizer
 * might cut it in English, Swahili (a lower-resource language) and Amharic (a
 * non-Latin script, cut into UTF-8 byte tokens, shown as hex). Counts are illustrative of the 2 to 4× range: 7, 14, 28.
 */
const TOKENS: Record<TokLang, { sentence: string; tokens: string[] }> = {
  en: { sentence: "The parcel will arrive tomorrow morning.", tokens: ["The", "parcel", "will", "arrive", "tomorrow", "morning", "."] },
  sw: { sentence: "Kifurushi kitafika kesho asubuhi.", tokens: ["K", "if", "ur", "ushi", "kit", "af", "ika", "k", "esho", "as", "ub", "uh", "i", "."] },
  am: {
    sentence: "ጭነቱ ነገ ጠዋት ይደርሳል።",
    tokens: ["e18c", "ad", "e1", "8a90", "e189", "b1", "e18a", "90", "e18c", "88", "e1", "8ca0", "e18b", "8b", "e189", "b5", "e18b", "ad", "e1", "8bb0", "e188", "ad", "e188", "b3", "e1", "888d", "e18d", "a2"],
  },
};
const WINDOW = 56;

/**
 * The tokenizer as a composing stick. The chosen language's sentence is set
 * as type slugs, one per token: seven whole words in English, fourteen
 * fragments in Swahili, twenty-eight byte slugs in Amharic. Below, a fixed
 * context window holds as many copies of the sentence as fit (8, 4, 2), and
 * a coin stack gives the cost per sentence (2, 4, 8 coins).
 */
export function TokenStick() {
  const [lang, setLang] = useState<TokLang>("en");
  const id = "w3-tok";
  const { sentence, tokens } = TOKENS[lang];
  const n = tokens.length;
  const fits = WINDOW / n;
  const ratio = n / 7;
  const red = lang !== "en";
  const col = red ? PAT.signal : PAT.ink;
  // slugs: width by text, wrapping after 14 slugs
  const slugW = (t: string) => (lang === "en" ? Math.max(28, t.length * 7.4 + 12) : 34);
  const slugs = tokens.map((t, i) => {
    const start = i < 14 ? 0 : 14;
    const x = r2(30 + tokens.slice(start, i).reduce((a, u) => a + slugW(u) + 4, 0));
    return { t, x, w: slugW(t), line: i < 14 ? 0 : 1 };
  });
  const sx0 = 30;
  const sx1 = 590;
  const unit = (sx1 - sx0) / WINDOW;
  const sy = 156;
  return (
    <div>
      <Frame
        width={800}
        height={226}
        label={`Patent drawing of a tokenizer as a composing stick. The sentence '${sentence}' is set as ${n} type slugs, one per token${lang === "en" ? ", each a whole word" : lang === "sw" ? ", mostly short word fragments" : ", each one or two UTF-8 bytes"}. Below, a context window of fixed length holds ${fits} copies of the sentence. A coin stack shows the cost per sentence: ${n / 3.5} coins, ${ratio.toFixed(1)} times English.`}
      >
        <PatentDefs id={id} />
        <text x={30} y={22} fontFamily="var(--font-heading)" fontStyle="italic" fontSize={15} fill={PAT.ink} lang={lang}>
          {sentence}
        </text>
        {slugs.map((sl, i) => {
          const y = 44 + sl.line * 40;
          return (
            <g key={i}>
              <ObliqueBox id={id} x={sl.x} y={y} w={sl.w} h={26} dx={4} dy={3} stroke={col} />
              <text x={r2(sl.x + sl.w / 2)} y={y + 17.5} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={lang === "en" ? 12.5 : 11.5} fill={col}>
                {sl.t}
              </text>
            </g>
          );
        })}
        <Num x={700} y={74} size={34} fill={col}>
          {n}
        </Num>
        <PatentKey x={700} y={96} size={11.5}>
          TOKENS
        </PatentKey>
        {/* the context window: a fixed tray holding whole copies of the sentence */}
        <ObliqueBox id={id} x={sx0 - 6} y={sy} w={sx1 - sx0 + 12} h={30} dx={12} dy={8} />
        {Array.from({ length: fits }, (_, k) => (
          <rect
            key={k}
            x={r2(sx0 + k * n * unit + 1)}
            y={sy + 5}
            width={r2(n * unit - 2)}
            height={20}
            fill={k % 2 === 0 ? stip(id, red ? "signal" : "light") : PAT.paper}
            stroke={col}
            strokeWidth={LINE.hair}
          />
        ))}
        <PatentKey x={sx0 - 6} y={sy + 52} anchor="start" size={11.5}>
          CONTEXT WINDOW
        </PatentKey>
        <Num x={sx1 + 6} y={sy + 52} anchor="end" size={14} fill={col}>
          {`${fits} ${fits === 1 ? "sentence" : "sentences"}`}
        </Num>
        {/* cost per sentence */}
        {Array.from({ length: n / 3.5 }, (_, k) => (
          <g key={k}>
            <path d={`M${686} ${r2(sy + 30 - k * 6)}A16 5 0 0 0 ${718} ${r2(sy + 30 - k * 6)}V${r2(sy + 24 - k * 6)}A16 5 0 0 1 ${686} ${r2(sy + 24 - k * 6)}Z`} fill={PAT.paper} stroke={col} strokeWidth={LINE.outline} />
            <ellipse cx={702} cy={r2(sy + 24 - k * 6)} rx={16} ry={5} fill={k === n / 3.5 - 1 ? stip(id, red ? "signal" : "light") : PAT.paper} stroke={col} strokeWidth={LINE.outline} />
          </g>
        ))}
        <PatentKey x={702} y={sy + 52} size={11.5}>
          {`COST ×${ratio.toFixed(0)}`}
        </PatentKey>
      </Frame>
      <Segmented<TokLang>
        label="Language"
        options={[
          { id: "en", label: "English" },
          { id: "sw", label: "Swahili" },
          { id: "am", label: "Amharic" },
        ]}
        value={lang}
        onChange={setLang}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   08. Tracing Cultural Bias to the Model Lifecycle
   -------------------------------------------------------------------------- */

/**
 * The model's lifecycle as an exploded stack of four trays along one centre
 * line, numbered as on the slide, bottom to top: 1 the pre-training corpus
 * (one tall stack of pages beside three short ones), 2 the tokenizer (one
 * whole slug beside a run of fragments), 3 post-training alignment (a single
 * rater's stamp over its print), 4 deployment (an English system prompt card
 * and its word-for-word copy). The part where bias enters is red on each.
 */
export function LifecycleExploded() {
  const id = "w3-life";
  const tx = 92;
  const tw = 230;
  const td = 46;
  const tsk = 56;
  const ys = [372, 280, 188, 96];
  return (
    <Frame
      width={400}
      height={392}
      label="Patent drawing: the model lifecycle as four trays pulled apart along one vertical centre line and numbered from the bottom. 1, the pre-training corpus: one tall red stack of pages beside three short stacks. 2, the tokenizer: one whole type slug beside a run of short red fragments. 3, post-training alignment: one rater's stamp lifted over the red print it has made. 4, deployment: an English system prompt card and its word-for-word copy, the copy in red."
    >
      <PatentDefs id={id} />
      {/* centre line through the stack, drawn in the gaps */}
      {ys.slice(1).map((y, i) => (
        <g key={i}>
          <line x1={tx} y1={y + 8} x2={tx} y2={ys[i] - 2} {...hair} strokeDasharray={CENTRE_DASH} />
          <line x1={tx + tw + tsk} y1={r2(y - td + 8)} x2={tx + tw + tsk} y2={r2(ys[i] - td - 2)} {...hair} strokeDasharray={CENTRE_DASH} />
        </g>
      ))}
      {ys.map((y, i) => (
        <g key={i}>
          <Sheet id={id} x={tx} y={y} w={tw} d={td} sk={tsk} t={5} />
          <Num x={36} y={r2(y - td / 2 + 6)} size={18} italic>
            {i + 1}
          </Num>
          <line x1={46} y1={r2(y - td / 2)} x2={r2(tx + tsk / 2 - 3)} y2={r2(y - td / 2)} {...hair} />
        </g>
      ))}

      {/* 1. corpus: one tall stack of pages, three short */}
      {[0, 1, 2, 3].map((k) => {
        const h = k === 0 ? 50 : 8;
        const x = 150 + k * 40;
        const y = ys[0] - 14 - (k % 2) * 6;
        return <ObliqueBox key={k} id={id} x={x} y={y - h} w={26} h={h} dx={8} dy={5} stroke={k === 0 ? PAT.signal : PAT.ink} side={k === 0 ? stip(id, "signal") : undefined} />;
      })}

      {/* 2. tokenizer: one whole slug, then a run of fragments */}
      <ObliqueBox id={id} x={146} y={ys[1] - 40} w={46} h={18} dx={5} dy={3} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <ObliqueBox key={k} id={id} x={202 + k * 17} y={ys[1] - 40} w={12} h={18} dx={5} dy={3} stroke={PAT.signal} side={stip(id, "signal")} />
      ))}

      {/* 3. alignment: one rater's stamp over its print */}
      <path d={`M190 ${ys[2] - 22}L198 ${ys[2] - 30}H246L238 ${ys[2] - 22}Z`} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
      <line x1={220} y1={ys[2] - 40} x2={220} y2={ys[2] - 32} {...hair} strokeDasharray="3 2" />
      <ObliqueBox id={id} x={200} y={ys[2] - 52} w={40} h={10} dx={6} dy={4} />
      <ObliqueBox id={id} x={214} y={ys[2] - 76} w={12} h={24} dx={4} dy={3} />
      <ellipse cx={222} cy={ys[2] - 80} rx={11} ry={4} fill={stip(id, "light")} {...ink} />

      {/* 4. deployment: the English system prompt and its word-for-word copy */}
      <ObliqueBox id={id} x={150} y={ys[3] - 54} w={56} h={34} dx={5} dy={3} />
      {[8, 15, 22].map((d) => (
        <line key={d} x1={156} y1={ys[3] - 54 + d} x2={d === 22 ? 186 : 198} y2={ys[3] - 54 + d} {...hair} />
      ))}
      <line x1={214} y1={ys[3] - 37} x2={232} y2={ys[3] - 37} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(236, ys[3] - 37, 1, 0, 6)} fill="none" {...hair} />
      <ObliqueBox id={id} x={240} y={ys[3] - 54} w={56} h={34} dx={5} dy={3} stroke={PAT.signal} />
      {[8, 15, 22].map((d) => (
        <line key={d} x1={246} y1={ys[3] - 54 + d} x2={d === 22 ? 276 : 288} y2={ys[3] - 54 + d} stroke={PAT.signal} strokeWidth={LINE.hair} />
      ))}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   09. Part 2: Representational Harms
   -------------------------------------------------------------------------- */

/** A picture frame standing upright, (x, y) its front face's top-left, with an inner mat line. */
function PictureFrame({ id, x, y, w, h, stroke = PAT.ink }: { id: string; x: number; y: number; w: number; h: number; stroke?: string }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={6} dy={4} stroke={stroke} />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} fill="none" stroke={stroke} strokeWidth={LINE.hair} />
    </g>
  );
}

/** A figure's outline in dashed red: someone left out of the picture. */
function Erased({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline / s} strokeDasharray={`${3 / s} ${2.5 / s}`} strokeLinejoin="round">
      <circle cx={1} cy={-74} r={7} />
      <path d="M-11 -64Q0 -68 11 -64L10 -34H9L8 0H1L0 -30L-1 0H-8L-9 -34H-10Z" />
    </g>
  );
}

/**
 * Two harms side by side. Allocative: at a counter, one customer receives a
 * stack of coins. The protected-group customer's place on the counter is
 * empty (red). Representational: a generated group portrait in which one
 * person is missing, a dashed red outline.
 */
export function TwoHarms() {
  const id = "w3-harms";
  return (
    <Frame
      width={800}
      height={212}
      label="Patent drawing in two figures. Allocative harm: two customers stand at a counter. A stack of coins sits before one, while the place before the other, a protected-group customer in a dense coat, is empty and outlined in red. Representational harm: a generated group portrait in a frame shows three people standing, and a fourth place in the row holds only a dashed red outline of a person left out of the picture."
    >
      <PatentDefs id={id} />
      {/* allocative: the counter */}
      <Figure id={id} x={128} y={146} s={1.15} arm="reach" />
      <Figure id={id} x={258} y={146} s={1.15} arm="reach" coat="dense" />
      <ObliqueBox id={id} x={84} y={130} w={262} h={46} dx={20} dy={12} />
      <Coins id={id} cx={186} y={126} n={5} rx={15} ry={5} />
      <ellipse cx={316} cy={126} rx={15} ry={5} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeDasharray="4 3" />
      <line x1={400} y1={14} x2={400} y2={186} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {/* representational: the generated portrait */}
      <PictureFrame id={id} x={478} y={24} w={256} h={150} />
      <line x1={490} y1={156} x2={722} y2={156} {...hair} />
      <Figure id={id} x={528} y={155} s={1.2} coat="paper" />
      <Figure id={id} x={584} y={155} s={1.2} coat="light" />
      <Erased x={640} y={155} s={1.2} />
      <Figure id={id} x={696} y={155} s={1.2} coat="paper" flip />
      <FigureName x={220} y={204} size={13}>
        allocative harm
      </FigureName>
      <FigureName x={606} y={204} size={13}>
        representational harm
      </FigureName>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   10. Allocative Versus Representational Harms
   -------------------------------------------------------------------------- */

/** A briefcase held at (x, y), its handle on top. */
function Briefcase({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={PAT.ink} strokeWidth={LINE.outline / s} strokeLinejoin="round" fill={PAT.paper}>
      <rect x={-8} y={0} width={16} height={11} />
      <path d="M-3 0V-3H3V0" fill="none" />
    </g>
  );
}

/**
 * Representational harm feeding back into allocative harm. Left: a pile of
 * generated pictures of "an executive", every one a man in a light coat with a
 * briefcase. A centre line arcs over time to the right: a hiring gate whose
 * boom has let two light-coated applicants through and stops the dense-coated
 * applicant (red) before it.
 */
export function RepresentationFeedback() {
  const id = "w3-loop";
  const pics = [
    { x: 20, y: 96 },
    { x: 46, y: 80 },
    { x: 72, y: 64 },
  ];
  const g = 222;
  return (
    <Frame
      width={520}
      height={262}
      label="Patent drawing: on the left, a pile of three generated pictures of an executive, each showing the same figure in a light coat carrying a briefcase. A dashed centre line arcs over the top to the right, to a hiring gate. Two applicants in light coats have passed through the gate. An applicant in a dense coat, drawn in red, is stopped before the lowered boom."
    >
      <PatentDefs id={id} />
      {pics.map((p, i) => (
        <g key={i}>
          <PictureFrame id={id} x={p.x} y={p.y} w={110} h={130} />
          <line x1={p.x + 12} y1={p.y + 112} x2={p.x + 98} y2={p.y + 112} {...hair} />
          <Figure id={id} x={p.x + 55} y={p.y + 111} s={1.05} arm="down" coat="paper" />
          <Briefcase x={p.x + 70} y={p.y + 74} s={1.05} />
        </g>
      ))}
      {/* over time: an arc from the pictures to the gate */}
      <path d="M140 58Q250 2 340 112" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(340, 112, 0.55, 1, 8)} fill="none" {...hair} />
      <PatentKey x={244} y={20} size={11.5}>
        OVER TIME
      </PatentKey>
      {/* the hiring gate */}
      <line x1={232} y1={g + 1} x2={508} y2={g + 1} {...hair} />
      <Figure id={id} x={252} y={g} s={1.05} coat="signal" stroke={PAT.signal} />
      <ObliqueBox id={id} x={276} y={g - 52} w={52} h={7} dx={6} dy={4} />
      <ObliqueBox id={id} x={328} y={g - 84} w={14} h={84} dx={8} dy={5} />
      <Figure id={id} x={420} y={g} s={1.05} coat="paper" />
      <Figure id={id} x={474} y={g} s={1.05} coat="paper" flip />
      <PatentKey x={136} y={254} size={11.5}>
        REPRESENTATIONAL
      </PatentKey>
      <PatentKey x={392} y={254} size={11.5}>
        ALLOCATIVE
      </PatentKey>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   11. Stereotyping, Erasure, and Markedness
   -------------------------------------------------------------------------- */

/** A small apron worn at the waist of a figure standing at (x, y), scale s. */
function Apron({ x, y, s = 1, stroke = PAT.ink }: { x: number; y: number; s?: number; stroke?: string }) {
  return <path d={`M${r2(x - 7 * s)} ${r2(y - 46 * s)}H${r2(x + 7 * s)}L${r2(x + 8 * s)} ${r2(y - 24 * s)}H${r2(x - 8 * s)}Z`} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.hair} strokeLinejoin="round" />;
}

/**
 * Three figures. Stereotyping: a batch of four pictures for "executive", all
 * light-coated figures with briefcases, above four for "service worker", all
 * dense-coated figures in aprons (red). Cultural erasure: a strip of everyday
 * dinners, three knife-and-fork, and a fourth frame for a chopsticks meal that
 * is only a dashed red outline. Markedness: "a family eating dinner" needs no
 * qualifier and yields knife and fork. Chopsticks appear only when "in Japan"
 * (red) is spelled out.
 */
export function StereotypeErasureMarkedness() {
  const id = "w3-sem";
  const fw = 44;
  const fh = 56;
  const tiny = (x: number, y: number, red = false, dashed = false) => (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={fw} h={fh} dx={4} dy={3} stroke={red ? PAT.signal : PAT.ink} />
      {dashed ? null : <line x1={x + 5} y1={y + fh - 6} x2={x + fw - 5} y2={y + fh - 6} {...hair} stroke={red ? PAT.signal : PAT.ink} />}
    </g>
  );
  return (
    <Frame
      width={800}
      height={236}
      label="Patent drawing in three figures. Stereotyping: four generated pictures for the prompt executive all show a light-coated figure with a briefcase. Four for service worker all show a dense-coated figure in an apron, drawn in red. Cultural erasure: a strip of four everyday dinner scenes, three with knife and fork, the fourth a dashed red empty frame where a chopsticks meal would be. Markedness: the prompt 'a family eating dinner' yields a knife-and-fork dinner, while chopsticks appear only for the prompt 'a family eating dinner in Japan', its qualifier in red."
    >
      <PatentDefs id={id} />
      {/* stereotyping */}
      {[0, 1].map((row) => (
        <g key={row}>
          <PatentKey x={18} y={row === 0 ? 22 : 118} anchor="start" size={11}>
            {row === 0 ? "EXECUTIVE" : "SERVICE WORKER"}
          </PatentKey>
          {[0, 1, 2, 3].map((k) => {
            const x = 18 + k * (fw + 12);
            const y = row === 0 ? 34 : 130;
            const fx = r2(x + fw / 2);
            const fy = y + fh - 6;
            const red = row === 1;
            return (
              <g key={k}>
                {tiny(x, y, red)}
                <Figure id={id} x={fx} y={fy} s={0.52} coat={red ? "signal" : "paper"} stroke={red ? PAT.signal : PAT.ink} />
                {red ? <Apron x={fx} y={fy} s={0.52} stroke={PAT.signal} /> : <Briefcase x={r2(fx + 9)} y={r2(fy - 20)} s={0.6} />}
              </g>
            );
          })}
        </g>
      ))}
      <line x1={262} y1={14} x2={262} y2={202} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* cultural erasure: a strip of everyday dinners, one tradition missing */}
      {[0, 1, 2, 3].map((k) => {
        const x = 286 + (k % 2) * 112;
        const y = k < 2 ? 34 : 122;
        const missing = k === 3;
        return (
          <g key={k}>
            {missing ? (
              <g>
                <rect x={x} y={y} width={92} height={70} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} strokeDasharray="5 3" />
                <g strokeDasharray="3 2">
                  <Chopsticks cx={x + 46} cy={y + 36} s={1.3} stroke={PAT.signal} />
                </g>
              </g>
            ) : (
              <g>
                <ObliqueBox id={id} x={x} y={y} w={92} h={70} dx={5} dy={3} />
                <PlaceSetting cx={x + 46} cy={y + 35} s={1.2} />
              </g>
            )}
          </g>
        );
      })}
      <line x1={530} y1={14} x2={530} y2={202} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* markedness */}
      {[
        { y: 34, red: false },
        { y: 122, red: true },
      ].map((r) => (
        <g key={r.y}>
          <ObliqueBox id={id} x={546} y={r.y + 8} w={166} h={30} dx={5} dy={3} />
          <text x={553} y={r.y + 27} fontFamily="var(--font-heading)" fontStyle="italic" fontSize={10.5} fill={PAT.ink}>
            a family eating dinner
            {r.red ? <tspan fill={PAT.signal}> in Japan</tspan> : null}
          </text>
          <line x1={717} y1={r.y + 23} x2={727} y2={r.y + 23} {...hair} strokeDasharray="3 2" />
          <ObliqueBox id={id} x={730} y={r.y - 4} w={54} h={54} dx={5} dy={3} />
          {r.red ? <Chopsticks cx={757} cy={r.y + 23} s={1.05} /> : <PlaceSetting cx={757} cy={r.y + 23} s={0.95} />}
        </g>
      ))}
      <FigureName x={130} y={226} size={13}>
        stereotyping
      </FigureName>
      <FigureName x={396} y={226} size={13}>
        cultural erasure
      </FigureName>
      <FigureName x={665} y={226} size={13}>
        markedness
      </FigureName>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   12. Sentiment and Portrayal Disparities
   -------------------------------------------------------------------------- */

/** A smartphone standing upright, (x, y) its front face's top-left. */
function Phone({ id, x, y, w, h, stroke = PAT.ink }: { id: string; x: number; y: number; w: number; h: number; stroke?: string }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={4} dy={3} stroke={stroke} />
      <rect x={x + 3} y={y + 6} width={w - 6} height={h - 14} fill="none" stroke={stroke} strokeWidth={LINE.hair} />
      <circle cx={r2(x + w / 2)} cy={y + h - 4} r={1.6} fill="none" stroke={stroke} strokeWidth={LINE.hair} />
    </g>
  );
}

/** A warmth gauge: a half dial with its needle at `v` (0 cold … 1 warm). */
function Gauge({ cx, cy, r, v, red = false }: { cx: number; cy: number; r: number; v: number; red?: boolean }) {
  const c = red ? PAT.signal : PAT.ink;
  const a = Math.PI * (1 - v);
  return (
    <g>
      <path d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}Z`} fill={PAT.paper} {...ink} />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const ta = Math.PI * (1 - t);
        return <line key={t} x1={r2(cx + Math.cos(ta) * (r - 2))} y1={r2(cy - Math.sin(ta) * (r - 2))} x2={r2(cx + Math.cos(ta) * (r - 7))} y2={r2(cy - Math.sin(ta) * (r - 7))} {...hair} />;
      })}
      <line x1={cx} y1={cy} x2={r2(cx + Math.cos(a) * (r - 6))} y2={r2(cy - Math.sin(a) * (r - 6))} stroke={c} strokeWidth={LINE.bold} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={2.2} fill={c} />
    </g>
  );
}

/**
 * Four small figures, one under each disparity on the slide, each comparing
 * the output for two prompts that differ in one word. status: the ad for one
 * group shows the flagship phone, the other's the budget phone (red). tone:
 * the warmth gauge for the minority dialect reads lower (red). exotic: the
 * same café prompt with a country qualifier comes back as a thatched hut (red).
 * persona: three distinct voices go into the model and come out as one
 * identical corporate line (red).
 */
export function PortrayalDisparities({ kind }: { kind: "status" | "tone" | "exotic" | "persona" }) {
  const id = `w3-port-${kind}`;
  const labels = {
    status: "Patent drawing: the ad generated for group A shows a large flagship phone with a $1,199 tag. The ad for group B shows a small budget phone with a $149 tag, in red.",
    tone: "Patent drawing: two warmth gauges. The description of a majority-group customer reads warm. The description of a minority-group customer reads markedly colder, its needle in red.",
    exotic: "Patent drawing: the prompt 'a café' yields a modern café with a wide window and a table. The same prompt with a country qualifier yields a thatched hut, drawn in red.",
    persona: "Patent drawing: three distinct voices, a zig-zag line, a wavy line and a dotted line, enter the model. Three identical straight lines come out, in red.",
  };
  const key = (x: number, t: string, fill: string = PAT.ink) => (
    <PatentKey x={x} y={142} size={10} fill={fill}>
      {t}
    </PatentKey>
  );
  return (
    <Frame width={220} height={150} label={labels[kind]}>
      <PatentDefs id={id} />
      {kind === "persona" ? null : <line x1={110} y1={10} x2={110} y2={126} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />}
      {kind === "status" ? (
        <g>
          <Phone id={id} x={36} y={22} w={40} h={78} />
          <Tag cx={62} cy={116} text="$1,199" w={52} size={11} />
          <Phone id={id} x={152} y={56} w={24} h={44} stroke={PAT.signal} />
          <Tag cx={170} cy={116} text="$149" w={40} size={11} red />
          {key(56, "GROUP A")}
          {key(166, "GROUP B", PAT.signal)}
        </g>
      ) : null}
      {kind === "tone" ? (
        <g>
          <Gauge cx={55} cy={92} r={38} v={0.8} />
          <Gauge cx={165} cy={92} r={38} v={0.3} red />
          <PatentKey x={55} y={112} size={9}>
            WARMTH
          </PatentKey>
          <PatentKey x={165} y={112} size={9}>
            WARMTH
          </PatentKey>
          {key(55, "MAJORITY")}
          {key(165, "MINORITY", PAT.signal)}
        </g>
      ) : null}
      {kind === "exotic" ? (
        <g>
          {/* modern café */}
          <line x1={14} y1={110} x2={98} y2={110} {...hair} />
          <ObliqueBox id={id} x={20} y={44} w={66} h={66} dx={8} dy={5} />
          <rect x={27} y={56} width={52} height={28} fill="none" {...hair} />
          <line x1={53} y1={56} x2={53} y2={84} {...hair} />
          <path d="M30 100H48M39 100V110M58 100H76M67 100V110" fill="none" {...hair} />
          {/* thatched hut */}
          <line x1={124} y1={110} x2={208} y2={110} stroke={PAT.signal} strokeWidth={LINE.hair} />
          <path d="M136 110V78H192V110Z" fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
          <path d="M128 80L164 42L200 80Z" fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
          {[0, 1, 2, 3, 4].map((k) => (
            <line key={k} x1={r2(140 + k * 12)} y1={80} x2={r2(152 + k * 6)} y2={58} stroke={PAT.signal} strokeWidth={LINE.hair} />
          ))}
          <path d="M157 110V90H171V110" fill="none" stroke={PAT.signal} strokeWidth={LINE.hair} />
          {key(55, "A CAFÉ")}
          {key(165, "+ COUNTRY", PAT.signal)}
        </g>
      ) : null}
      {kind === "persona" ? (
        <g>
          <path d="M12 40L18 32L24 40L30 32L36 40L42 32L48 40L54 32L60 40" fill="none" {...ink} />
          <path d="M12 70Q18 60 24 70T36 70T48 70T60 70" fill="none" {...ink} />
          <path d="M12 100H60" fill="none" {...ink} strokeDasharray="1 4" strokeWidth={1.6} />
          <ObliqueBox id={id} x={72} y={44} w={56} h={52} dx={10} dy={6} />
          <Gear cx={92} cy={62} r={9} n={8} />
          <Gear cx={110} cy={78} r={7} n={7} phase={0.25} />
          {[40, 70, 100].map((y) => (
            <path key={y} d={`M152 ${y}H206`} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
          ))}
          {key(36, "VOICES")}
          {key(180, "REGISTER", PAT.signal)}
        </g>
      ) : null}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   13. Discussion: The Global Campaign Generator
   -------------------------------------------------------------------------- */

const CLASH = [2, 6, 9, 13, 15, 18];

/**
 * One prompt template with a slot for the country name feeds twenty holiday
 * posters, one per country, every one the same lone figure celebrating. Six
 * of them, where local teams objected, are red and carry a thatched folk roof
 * behind the figure.
 */
export function CampaignTemplate() {
  const id = "w3-campaign";
  const pw = 46;
  const ph = 50;
  const gx = 14;
  const gy = 12;
  const x0 = 57;
  const y0 = 98;
  return (
    <Frame
      width={400}
      height={344}
      label="Patent drawing: a prompt template card reads 'a holiday campaign for' followed by an empty slot for the country name. A centre line runs down to twenty posters in four rows of five, one per country. Every poster shows the same lone figure celebrating. Six of the posters are red and show a small thatched folk hut beside the figure."
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={58} y={20} w={270} h={42} dx={8} dy={5} />
      <text x={74} y={46} fontFamily="var(--font-heading)" fontStyle="italic" fontSize={14} fill={PAT.ink}>
        a holiday campaign for
      </text>
      <rect x={238} y={30} width={78} height={22} fill="none" {...ink} strokeDasharray="4 3" />
      <line x1={196} y1={66} x2={196} y2={84} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={`M${x0} 92V86H${x0 + 5 * pw + 4 * gx}V92`} fill="none" {...hair} />
      {Array.from({ length: 20 }, (_, i) => {
        const x = x0 + (i % 5) * (pw + gx);
        const y = y0 + Math.floor(i / 5) * (ph + gy);
        const red = CLASH.includes(i);
        const c = red ? PAT.signal : PAT.ink;
        const cx = r2(x + pw / 2);
        return (
          <g key={i}>
            <ObliqueBox id={id} x={x} y={y} w={pw} h={ph} dx={4} dy={3} stroke={c} />
            {red ? (
              <g stroke={c} strokeWidth={LINE.hair} strokeLinejoin="round">
                <path d={`M${x + 7} ${y + ph - 6}V${y + 30}H${x + 19}V${y + ph - 6}`} fill={PAT.paper} />
                <path d={`M${x + 4} ${y + 31}L${x + 13} ${y + 19}L${x + 22} ${y + 31}Z`} fill={stip(id, "signal")} />
              </g>
            ) : null}
            <line x1={x + 5} y1={y + ph - 6} x2={x + pw - 5} y2={y + ph - 6} stroke={c} strokeWidth={LINE.hair} />
            <Figure id={id} x={red ? x + 32 : cx} y={y + ph - 6} s={0.4} arm="lift" coat={red ? "signal" : "paper"} stroke={c} />
          </g>
        );
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   14. Part 3: Consumer Ethnocentrism and In-Group Bias
   -------------------------------------------------------------------------- */

/**
 * Part 3: a patent section of the model. The housing's front face is broken
 * away (a zig-zag break line) to show, behind the weight gears, a gauge whose
 * needle (red) leans from FOREIGN toward DOMESTIC. Nothing on the closed part
 * of the housing shows it.
 */
export function LatentAttitude() {
  const id = "w3-latent";
  const x = 70;
  const y = 54;
  const w = 340;
  const h = 210;
  // the break: an opening on the front face with zig-zag edges
  const zig = (pts: [number, number][]) => pts.map(([a, b], i) => `${i === 0 ? "M" : "L"}${a} ${b}`).join("") + "Z";
  const hole = zig([
    [120, 84], [150, 92], [176, 78], [208, 90], [236, 76], [270, 88], [300, 76], [330, 90], [376, 82],
    [366, 116], [380, 146], [364, 178], [378, 212], [360, 244],
    [320, 236], [290, 248], [254, 234], [220, 246], [184, 232], [150, 244], [112, 236],
    [124, 204], [108, 172], [124, 140], [108, 110],
  ]);
  const gx = 244;
  const gy = 190;
  const gr = 88;
  const needle = (-90 - 52) * (Math.PI / 180);
  return (
    <Frame
      width={480}
      height={292}
      label="Patent drawing in section: the model's housing with part of its front face broken away along a zig-zag line. Inside, behind two weight gears, a semicircular gauge runs from foreign at the right to domestic at the left. Its red needle leans well toward domestic. The closed part of the housing shows nothing of it."
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={26} dy={16} />
      {/* the opening: interior shadow, then the mechanism */}
      <path d={hole} fill={stip(id, "light")} stroke="none" />
      <rect x={gx - gr - 14} y={gy} width={2 * gr + 28} height={28} fill={PAT.paper} {...ink} />
      <path d={`M${gx - gr} ${gy}A${gr} ${gr} 0 0 1 ${gx + gr} ${gy}Z`} fill={PAT.paper} {...ink} />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI - (i / 8) * Math.PI;
        return <line key={i} x1={r2(gx + Math.cos(a) * (gr - 3))} y1={r2(gy - Math.sin(a) * (gr - 3))} x2={r2(gx + Math.cos(a) * (gr - (i % 4 === 0 ? 14 : 9)))} y2={r2(gy - Math.sin(a) * (gr - (i % 4 === 0 ? 14 : 9)))} {...hair} />;
      })}
      <PatentKey x={gx - gr - 7} y={gy + 19} anchor="start" size={11}>
        DOMESTIC
      </PatentKey>
      <PatentKey x={gx + gr + 8} y={gy + 19} anchor="end" size={11}>
        FOREIGN
      </PatentKey>
      <line x1={gx} y1={gy} x2={r2(gx + Math.cos(needle) * (gr - 18))} y2={r2(gy + Math.sin(needle) * (gr - 18))} stroke={PAT.signal} strokeWidth={LINE.bold * 1.4} strokeLinecap="round" />
      <circle cx={gx} cy={gy} r={4} fill={PAT.signal} />
      <Gear cx={150} cy={118} r={16} n={10} />
      <Gear cx={340} cy={118} r={13} n={8} phase={0.25} />
      {/* the break line itself */}
      <path d={hole} fill="none" {...ink} />
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   15. Country-of-Origin Effects and Consumer Ethnocentrism
   -------------------------------------------------------------------------- */

/** A row of `n` of five stars, left end at (x, y). */
function Stars({ x, y, n, size = 6, stroke = PAT.ink }: { x: number; y: number; n: number; size?: number; stroke?: string }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={star(x + k * size * 2.3, y, size)} fill={k < n ? (stroke === PAT.ink ? PAT.ink : stroke) : PAT.paper} stroke={stroke} strokeWidth={LINE.hair} strokeLinejoin="round" />
      ))}
    </g>
  );
}

/**
 * Two figures. Consumer ethnocentrism: a shopper takes the domestic product
 * ($40, three stars) and leaves the imported one on the counter although it
 * is cheaper ($32) and rated higher (five stars). The passed-over import is
 * red. CETSCALE: a questionnaire of seventeen rows, each with seven boxes
 * numbered 1 to 7 and one answer ringed.
 */
export function OriginAndScale() {
  const id = "w3-cet";
  const answers = [6, 5, 7, 6, 6, 5, 7, 6, 4, 6, 7, 5, 6, 6, 7, 5, 6];
  const fx = 520;
  const fy = 22;
  const rowH = 9.8;
  return (
    <Frame
      width={800}
      height={242}
      label="Patent drawing in two figures. Consumer ethnocentrism: two boxed products stand on a counter, one labelled domestic, priced $40 and rated three stars, the other labelled imported, priced $32 and rated five stars. A shopper reaches out holding a domestic box. The imported box, drawn in red, is left behind. CETSCALE: a questionnaire with seventeen rows, each a line of statement and seven boxes numbered 1 to 7, with one answer ringed in every row."
    >
      <PatentDefs id={id} />
      {/* consumer ethnocentrism */}
      <ObliqueBox id={id} x={110} y={160} w={290} h={36} dx={18} dy={11} />
      <ObliqueBox id={id} x={140} y={92} w={86} h={68} dx={14} dy={9} />
      <PatentKey x={183} y={130} size={10}>
        DOMESTIC
      </PatentKey>
      <Tag cx={186} cy={66} text="$40" w={42} size={12} />
      <Stars x={162} y={40} n={3} size={5.5} />
      <ObliqueBox id={id} x={266} y={92} w={86} h={68} dx={14} dy={9} stroke={PAT.signal} />
      <PatentKey x={309} y={130} size={10} fill={PAT.signal}>
        IMPORTED
      </PatentKey>
      <Tag cx={312} cy={66} text="$32" w={42} size={12} red />
      <Stars x={288} y={40} n={5} size={5.5} stroke={PAT.signal} />
      <Figure id={id} x={64} y={196} s={1.45} arm="reach" />
      <ObliqueBox id={id} x={94} y={100} w={30} h={30} dx={7} dy={4} />
      <line x1={460} y1={14} x2={460} y2={204} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {/* the CETSCALE form */}
      <ObliqueBox id={id} x={fx} y={fy} w={250} h={194} dx={8} dy={5} />
      {[1, 2, 3, 4, 5, 6, 7].map((k) => (
        <Num key={k} x={r2(fx + 128 + (k - 1) * 16)} y={fy + 13} size={9}>
          {k}
        </Num>
      ))}
      {answers.map((a, r) => {
        const y = r2(fy + 22 + r * rowH);
        return (
          <g key={r}>
            <line x1={fx + 10} y1={y} x2={fx + 108} y2={y} {...hair} />
            {[1, 2, 3, 4, 5, 6, 7].map((k) => (
              <rect key={k} x={r2(fx + 124 + (k - 1) * 16)} y={r2(y - 3.5)} width={7} height={7} fill={PAT.paper} {...hair} />
            ))}
            <circle cx={r2(fx + 127.5 + (a - 1) * 16)} cy={y} r={4.4} fill="none" {...ink} />
          </g>
        );
      })}
      <FigureName x={245} y={234} size={13}>
        consumer ethnocentrism
      </FigureName>
      <FigureName x={649} y={234} size={13}>
        CETSCALE
      </FigureName>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   16. Measuring LLM Ethnocentrism With the CETSCALE
   -------------------------------------------------------------------------- */

/** One model's next-token probabilities over 1 to 7 for one CETSCALE item (illustrative, low consensus). */
const ITEM_PMF = [0.1, 0.04, 0.03, 0.05, 0.12, 0.3, 0.36];
const ITEM_MEAN = ITEM_PMF.reduce((a, p, i) => a + p * (i + 1), 0);

/** Draw `n` answers from ITEM_PMF with a seeded stream starting at `from`. */
function drawAnswers(from: number, n: number) {
  const rnd = seeded(12);
  for (let i = 0; i < from; i++) rnd();
  return Array.from({ length: n }, () => {
    const u = rnd();
    let c = 0;
    for (let k = 0; k < 7; k++) {
      c += ITEM_PMF[k];
      if (u < c) return k + 1;
    }
    return 7;
  });
}

/**
 * Exact distribution against sampled completions. Above: the model's exact
 * next-token probabilities over the seven scale points, read once, with its
 * mean marked. Below: single completions, one chip per answer, stacked under
 * the digit the model happened to write. Each press samples more. The
 * sampled mean (red) wanders around the exact mean and settles only slowly.
 */
export function ExactDistribution() {
  const [n, setN] = useState(5);
  const id = "w3-pmf";
  const answers = drawAnswers(0, n);
  const counts = [1, 2, 3, 4, 5, 6, 7].map((k) => answers.filter((a) => a === k).length);
  const mean = answers.reduce((a, b) => a + b, 0) / Math.max(1, answers.length);
  const xAt = (v: number) => r2(110 + (v - 1) * 60);
  const base = 150;
  const chipH = Math.min(7, 82 / Math.max(1, ...counts));
  return (
    <div>
      <Frame
        width={560}
        height={318}
        label={`Patent drawing of one CETSCALE item. Above, the model's exact next-token probabilities over the scale points 1 to 7, drawn as columns: ${ITEM_PMF.map((p, i) => `${i + 1}: ${Math.round(p * 100)}%`).join(", ")}. Exact mean ${ITEM_MEAN.toFixed(2)}. Below, ${n} sampled single completions stacked as chips under the digit written: ${counts.map((c, i) => `${i + 1}: ${c}`).join(", ")}. Sampled mean ${mean.toFixed(2)}, in red.`}
      >
        <PatentDefs id={id} />
        <PatentKey x={24} y={22} anchor="start" size={11}>
          EXACT DISTRIBUTION
        </PatentKey>
        {ITEM_PMF.map((p, i) => {
          const h = r2(p * 290);
          return (
            <g key={i}>
              <ObliqueBox id={id} x={xAt(i + 1) - 17} y={r2(base - h)} w={34} h={h} dx={8} dy={5} />
              <Num x={xAt(i + 1)} y={r2(base - h - 10)} size={11}>
                {`${Math.round(p * 100)}%`}
              </Num>
            </g>
          );
        })}
        {/* the scale */}
        <line x1={80} y1={base + 0.5} x2={496} y2={base + 0.5} {...ink} />
        {[1, 2, 3, 4, 5, 6, 7].map((k) => (
          <Num key={k} x={xAt(k)} y={base + 17} size={13}>
            {k}
          </Num>
        ))}
        {/* means on the scale */}
        <line x1={80} y1={base + 30} x2={496} y2={base + 30} {...hair} strokeDasharray="2 3" />
        <path d={`M${xAt(ITEM_MEAN)} ${base + 30}l-5 -8h10Z`} fill={PAT.ink} />
        <path d={`M${xAt(mean)} ${base + 30}l-5 8h10Z`} fill={PAT.signal} />
        <Num x={540} y={base + 26} anchor="end" size={12}>
          {ITEM_MEAN.toFixed(2)}
        </Num>
        <Num x={540} y={base + 42} anchor="end" size={12} fill={PAT.signal}>
          {mean.toFixed(2)}
        </Num>
        {/* sampled completions */}
        <line x1={80} y1={284.5} x2={496} y2={284.5} {...hair} />
        <PatentKey x={24} y={308} anchor="start" size={11}>
          {`SAMPLED COMPLETIONS | ${n}`}
        </PatentKey>
        {counts.map((c, i) =>
          chipH >= 3 ? (
            Array.from({ length: c }, (_, j) => (
              <rect key={`${i}-${j}`} x={xAt(i + 1) - 15} y={r2(284 - (j + 1) * chipH)} width={30} height={r2(chipH - 1.5)} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.hair} />
            ))
          ) : (
            <rect key={i} x={xAt(i + 1) - 15} y={r2(284 - c * chipH)} width={30} height={r2(c * chipH)} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.hair} />
          ),
        )}
      </Frame>
      <div className="mt-2.5 flex flex-wrap gap-2 px-1">
        <PlateButton onClick={() => setN((v) => Math.min(v + 1, 400))}>Sample one completion</PlateButton>
        <PlateButton onClick={() => setN((v) => Math.min(v + 20, 400))}>Sample 20 more</PlateButton>
        <PlateButton onClick={() => setN(5)}>Start over</PlateButton>
      </div>
    </div>
  );
}
/* --------------------------------------------------------------------------
   17. Baseline Ethnocentrism and Asymmetric In-Group Favoritism
   -------------------------------------------------------------------------- */

/**
 * Wadi, Ghodrat & Philp (2026): CETSCALE (17 to 119) in a fully crossed design
 * of five models × four target countries. Grand mean, model and target main
 * effects (Table 2) and model × target interactions (Figure 5). A cell is
 * GRAND + model + target + pair. Human benchmarks: Shimp & Sharma (1987).
 */
const COO_GRAND = 66.25;
const COO_MODELS = [
  { name: "Aya Expanse 32B", home: "CA", effect: 21.19 },
  { name: "Llama 3.3 70B", home: "US", effect: 0.31 },
  { name: "Ministral 14B", home: "FR", effect: 5.11 },
  { name: "Gemma 3 27B", home: "US", effect: -11.99 },
  { name: "Qwen3 80B", home: "CN", effect: -14.63 },
];
type Target = "US" | "CA" | "CN" | "FR";
/** Target main effect and the pairing with each model, in COO_MODELS order (Aya, Llama, Ministral, Gemma, Qwen). */
const COO_TARGETS: Record<Target, { name: string; effect: number; pair: number[] }> = {
  US: { name: "United States", effect: 2.84, pair: [-1.18, 2.59, -4.0, 3.21, -0.61] },
  CA: { name: "Canada", effect: 4.62, pair: [-3.77, 5.2, -2.99, 2.14, -0.57] },
  CN: { name: "China", effect: -6.46, pair: [5.35, -4.29, 4.54, -5.4, -0.2] },
  FR: { name: "France", effect: -1.0, pair: [-0.39, -3.5, 2.45, 0.05, 1.39] },
};
const cooScore = (mi: number, t: Target) => COO_GRAND + COO_MODELS[mi].effect + COO_TARGETS[t].effect + COO_TARGETS[t].pair[mi];
const HUMANS = [
  { name: "LOS ANGELES", mean: 56.62 },
  { name: "DENVER", mean: 57.84 },
  { name: "CAROLINAS", mean: 61.28 },
  { name: "DETROIT", mean: 68.58 },
];

/**
 * Five models' expected CETSCALE scores read on parallel slide tracks over
 * one scale (40 to 100), against the band of recorded human populations
 * (Los Angeles 56.6 to Detroit 68.6). Choosing the target country slides the
 * markers: models past the most ethnocentric human population are red.
 */
export function EthnocentrismRuler() {
  const [t, setT] = useState<Target>("US");
  const id = "w3-ruler";
  const x0 = 210;
  const x1 = 770;
  const lo = 40;
  const hi = 100;
  const xAt = (v: number) => r2(x0 + ((v - lo) / (hi - lo)) * (x1 - x0));
  const top = 48;
  const rowH = 30;
  const band = [xAt(HUMANS[0].mean), xAt(HUMANS[3].mean)];
  const bottom = top + 5 * rowH;
  return (
    <div>
      <Frame
        width={800}
        height={top + 5 * rowH + 24}
        label={`Patent drawing: five language models' expected CETSCALE scores when the statements concern ${COO_TARGETS[t].name}, read on parallel tracks over a scale from 40 to 100, against a band of recorded human populations from Los Angeles (56.6) to Detroit (68.6): ${COO_MODELS.map((m, i) => `${m.name} (${m.home}) ${cooScore(i, t).toFixed(1)}`).join(", ")}. Models scoring above Detroit are red. Data: Wadi, Ghodrat and Philp (2026). Human benchmarks Shimp and Sharma (1987).`}
      >
        <PatentDefs id={id} />
        {/* the human band */}
        <rect x={band[0]} y={top - 6} width={r2(band[1] - band[0])} height={bottom - top + 2} fill={stip(id, "light")} stroke="none" />
        {[band[0], band[1]].map((x) => (
          <line key={x} x1={x} y1={top - 6} x2={x} y2={bottom - 4} {...hair} />
        ))}
        <PatentKey x={band[0] - 6} y={top - 12} anchor="end" size={10.5}>
          LOS ANGELES
        </PatentKey>
        <PatentKey x={band[1] + 6} y={top - 12} anchor="start" size={10.5}>
          DETROIT
        </PatentKey>
        <PatentKey x={r2((band[0] + band[1]) / 2)} y={top - 28} size={10.5}>
          HUMAN POPULATIONS
        </PatentKey>
        {/* the scale */}
        {[40, 50, 60, 70, 80, 90, 100].map((v) => (
          <g key={v}>
            <line x1={xAt(v)} y1={bottom - 2} x2={xAt(v)} y2={bottom + 3} {...hair} />
            <Num x={xAt(v)} y={bottom + 16} size={12}>
              {v}
            </Num>
          </g>
        ))}
        <line x1={x0} y1={bottom - 2} x2={x1} y2={bottom - 2} {...ink} />
        {/* one track per model */}
        {COO_MODELS.map((m, i) => {
          const y = top + i * rowH + 14;
          const v = cooScore(i, t);
          const red = v > HUMANS[3].mean;
          const c = red ? PAT.signal : PAT.ink;
          return (
            <g key={m.name}>
              <text x={20} y={y + 4} fontFamily="var(--font-heading)" fontSize={13} fill={PAT.ink}>
                {m.name}
              </text>
              <PatentKey x={172} y={y + 4} anchor="start" size={10}>
                {m.home}
              </PatentKey>
              <line x1={x0} y1={y} x2={x1} y2={y} {...hair} />
              <g style={{ transform: `translateX(${xAt(v)}px)`, transition: "transform 450ms ease" }}>
                <path d={`M0 ${y - 7}L7 ${y}L0 ${y + 7}L-7 ${y}Z`} fill={red ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={LINE.outline} strokeLinejoin="round" />
                <rect x={10} y={y - 8} width={34} height={16} fill={PAT.paper} />
                <Num x={13} y={y + 4.5} anchor="start" size={13} fill={c}>
                  {v.toFixed(1)}
                </Num>
              </g>
            </g>
          );
        })}
      </Frame>
      <Segmented<Target>
        label="Target country"
        options={[
          { id: "US", label: "United States" },
          { id: "CA", label: "Canada" },
          { id: "CN", label: "China" },
          { id: "FR", label: "France" },
        ]}
        value={t}
        onChange={setT}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   18. Part 4: Country-of-Origin Bias in AI Product Recommendations
   -------------------------------------------------------------------------- */


/**
 * The model in three commercial roles, each figure a model feeding its
 * output: a conversational search engine's list of four results (the last
 * one red), a procurement assistant's purchase order (one supplier line
 * struck out in red), a shopping agent's cart holding two boxes while a
 * third, red, is left on the floor.
 */
export function ShoppingRoles() {
  const id = "w3-roles";
  const my = 70;
  return (
    <Frame
      width={800}
      height={212}
      label="Patent drawing in three figures, each a model housing with two weight gears feeding its output. Conversational search engine: a panel of four results, the fourth drawn in red. Procurement assistant: a purchase order with four supplier lines, three ticked and one struck out in red. Consumer shopping agent: a shopping cart holding two boxes while a third box, drawn in red, is left on the floor beside it."
    >
      <PatentDefs id={id} />
      {[18, 288, 556].map((x) => (
        <g key={x}>
          <SmallModel id={id} x={x} y={my} />
          <line x1={x + 66} y1={my + 25} x2={x + 84} y2={my + 25} {...hair} strokeDasharray={CENTRE_DASH} />
          <path d={headAlongPath(x + 88, my + 25, 1, 0, 6)} fill="none" {...hair} />
        </g>
      ))}

      {/* search engine: four results */}
      <ObliqueBox id={id} x={110} y={30} w={130} h={142} dx={8} dy={5} />
      {[0, 1, 2, 3].map((k) => {
        const y = 42 + k * 32;
        const red = k === 3;
        const c = red ? PAT.signal : PAT.ink;
        return (
          <g key={k}>
            <rect x={120} y={y} width={22} height={22} fill={red ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={LINE.hair} />
            <line x1={150} y1={y + 6} x2={228} y2={y + 6} stroke={c} strokeWidth={LINE.outline} />
            <line x1={150} y1={y + 15} x2={210} y2={y + 15} stroke={c} strokeWidth={LINE.hair} />
          </g>
        );
      })}
      <line x1={268} y1={14} x2={268} y2={184} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* procurement assistant: a purchase order */}
      <ObliqueBox id={id} x={380} y={30} w={130} h={142} dx={8} dy={5} />
      <line x1={392} y1={46} x2={450} y2={46} {...ink} />
      {[0, 1, 2, 3].map((k) => {
        const y = 72 + k * 24;
        const red = k === 2;
        return (
          <g key={k}>
            <line x1={392} y1={y} x2={472} y2={y} stroke={red ? PAT.signal : PAT.ink} strokeWidth={LINE.hair} />
            {red ? (
              <g>
                <line x1={388} y1={y - 3} x2={476} y2={y - 3} stroke={PAT.signal} strokeWidth={LINE.bold} />
                <path d={cross(492, y - 3, 4)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
              </g>
            ) : (
              <path d={tick(492, y - 3, 5)} fill="none" {...ink} />
            )}
          </g>
        );
      })}
      <line x1={536} y1={14} x2={536} y2={184} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* shopping agent: a cart */}
      <line x1={648} y1={172} x2={790} y2={172} {...hair} />
      <path d="M650 70H662L672 138H752L762 92H668" fill="none" {...ink} strokeWidth={LINE.bold} />
      <ObliqueBox id={id} x={682} y={104} w={26} h={30} dx={6} dy={4} />
      <ObliqueBox id={id} x={714} y={112} w={30} h={22} dx={6} dy={4} />
      <circle cx={682} cy={160} r={8} fill={PAT.paper} {...ink} />
      <circle cx={744} cy={160} r={8} fill={PAT.paper} {...ink} />
      <line x1={672} y1={138} x2={682} y2={152} {...ink} />
      <line x1={752} y1={138} x2={744} y2={152} {...ink} />
      <ObliqueBox id={id} x={764} y={142} w={24} h={30} dx={5} dy={3} stroke={PAT.signal} side={stip(id, "signal")} />
      <FigureName x={140} y={204} size={12.5}>
        conversational search engine
      </FigureName>
      <FigureName x={410} y={204} size={12.5}>
        procurement assistant
      </FigureName>
      <FigureName x={680} y={204} size={12.5}>
        consumer shopping agent
      </FigureName>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   19. Separating Model Main Effects, Target Effects, and Origin Interactions
   -------------------------------------------------------------------------- */

const TARGET_ORDER: Target[] = ["US", "CA", "CN", "FR"];
const MODEL_SHORT = ["Aya Expanse", "Llama 3.3", "Ministral", "Gemma 3", "Qwen3"];

/**
 * One cell of the 5 × 4 audit pulled apart (real data, as slide 17). Above,
 * the grid of expected scores, the chosen cell outlined. Below, a scale on
 * which the cell is built in four moves: the grand mean, then the model's main
 * effect, then the target country's main effect, then the interaction (red),
 * which lands on the cell's score.
 */
export function EffectDecomposition() {
  const [mi, setMi] = useState(1);
  const [t, setT] = useState<Target>("CN");
  const id = "w3-decomp";
  const gx = 150;
  const gy = 40;
  const cw = 64;
  const ch = 22;
  const m = COO_MODELS[mi].effect;
  const te = COO_TARGETS[t].effect;
  const pair = COO_TARGETS[t].pair[mi];
  const steps = [
    { key: "GRAND MEAN", from: COO_GRAND, to: COO_GRAND },
    { key: "MODEL", from: COO_GRAND, to: COO_GRAND + m },
    { key: "TARGET COUNTRY", from: COO_GRAND + m, to: COO_GRAND + m + te },
    { key: "INTERACTION", from: COO_GRAND + m + te, to: COO_GRAND + m + te + pair },
  ];
  const sx0 = 170;
  const sx1 = 500;
  const xAt = (v: number) => r2(sx0 + ((v - 40) / 60) * (sx1 - sx0));
  const ry = 212;
  const rh = 30;
  const fmt = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}`;
  return (
    <div>
      <Frame
        width={560}
        height={362}
        label={`Patent drawing: a grid of expected CETSCALE scores for five models and four target countries (Wadi, Ghodrat and Philp, 2026), with ${COO_MODELS[mi].name} and ${COO_TARGETS[t].name} outlined. Below, the cell is built on a scale from 40 to 100: grand mean ${COO_GRAND.toFixed(1)}, model main effect ${fmt(m)}, target-country main effect ${fmt(te)}, and interaction ${fmt(pair)} in red, landing on ${cooScore(mi, t).toFixed(1)}.`}
      >
        <PatentDefs id={id} />
        {/* the grid */}
        {TARGET_ORDER.map((tt, j) => (
          <PatentKey key={tt} x={r2(gx + j * cw + cw / 2)} y={gy - 10} size={11}>
            {tt}
          </PatentKey>
        ))}
        {COO_MODELS.map((mm, i) => (
          <g key={mm.name}>
            <text x={20} y={gy + i * ch + 15} fontFamily="var(--font-heading)" fontSize={12.5} fill={PAT.ink}>
              {MODEL_SHORT[i]}
            </text>
            <PatentKey x={118} y={gy + i * ch + 15} anchor="start" size={9.5}>
              {mm.home}
            </PatentKey>
            {TARGET_ORDER.map((tt, j) => {
              const on = i === mi && tt === t;
              return (
                <g key={tt} onClick={() => { setMi(i); setT(tt); }} style={{ cursor: "pointer" }}>
                  <rect x={gx + j * cw} y={gy + i * ch} width={cw} height={ch} fill={PAT.paper} stroke={PAT.ink} strokeWidth={on ? LINE.bold * 1.6 : LINE.hair} />
                  <Num x={r2(gx + j * cw + cw / 2)} y={gy + i * ch + 15} size={12}>
                    {cooScore(i, tt).toFixed(1)}
                  </Num>
                </g>
              );
            })}
          </g>
        ))}
        {/* the scale */}
        {[40, 50, 60, 70, 80, 90, 100].map((v) => (
          <g key={v}>
            <line x1={xAt(v)} y1={ry - 26} x2={xAt(v)} y2={ry + 4 * rh - 6} {...hair} strokeDasharray="1 4" />
            <Num x={xAt(v)} y={ry - 32} size={11}>
              {v}
            </Num>
          </g>
        ))}
        {steps.map((st, k) => {
          const y = ry + k * rh;
          const red = k === 3;
          const c = red ? PAT.signal : PAT.ink;
          const a = xAt(st.from);
          const b = xAt(st.to);
          const dir = b >= a ? 1 : -1;
          return (
            <g key={st.key}>
              <PatentKey x={20} y={y + 4} anchor="start" size={10} fill={c}>
                {st.key}
              </PatentKey>
              {k === 0 ? (
                <circle cx={a} cy={y} r={4} fill={PAT.ink} />
              ) : (
                <g>
                  <line x1={a} y1={y - 8} x2={a} y2={y + 8} {...hair} />
                  {Math.abs(b - a) > 2 ? (
                    <>
                      <line x1={a} y1={y} x2={b} y2={y} stroke={c} strokeWidth={LINE.bold * 1.4} strokeLinecap="round" />
                      <path d={headAlongPath(b, y, dir, 0, 8)} fill="none" stroke={c} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ) : (
                    <circle cx={b} cy={y} r={2.5} fill={c} />
                  )}
                </g>
              )}
              <Num x={548} y={y + 4.5} anchor="end" size={13} fill={c}>
                {k === 0 ? COO_GRAND.toFixed(1) : fmt(st.to - st.from)}
              </Num>
            </g>
          );
        })}
        <line x1={sx0 - 10} y1={ry + 4 * rh - 12} x2={548} y2={ry + 4 * rh - 12} {...ink} />
        <PatentKey x={20} y={ry + 4 * rh + 8} anchor="start" size={10}>
          SCORE
        </PatentKey>
        <path d={`M${xAt(steps[3].to)} ${ry + 4 * rh - 8}l-5 9h10Z`} fill={PAT.ink} />
        <Num x={548} y={ry + 4 * rh + 9} anchor="end" size={15}>
          {cooScore(mi, t).toFixed(1)}
        </Num>
      </Frame>
      <Segmented
        label="Model"
        options={MODEL_SHORT.map((n, i) => ({ id: String(i), label: n }))}
        value={String(mi)}
        onChange={(v) => setMi(Number(v))}
      />
      <Segmented<Target>
        label="Target country"
        options={TARGET_ORDER.map((tt) => ({ id: tt, label: COO_TARGETS[tt].name }))}
        value={t}
        onChange={setT}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   20. How Origin Bias Distorts AI-Mediated Brand Consideration Sets
   -------------------------------------------------------------------------- */

/** An open laptop in oblique projection: (x, y) is the front-left corner of its base. `mark` is set on the lid. */
function Laptop({ id, x, y, w = 70, mark, stroke = PAT.ink }: { id: string; x: number; y: number; w?: number; mark?: string; stroke?: string }) {
  const o = { stroke, strokeWidth: LINE.outline, strokeLinejoin: "round" as const };
  const sh = r2(w * 0.62);
  return (
    <g>
      {/* lid */}
      <path d={`M${r2(x + 8)} ${r2(y - 7)}V${r2(y - 7 - sh)}H${r2(x + 8 + w)}V${r2(y - 7)}Z`} fill={PAT.paper} {...o} />
      <rect x={r2(x + 12)} y={r2(y - 3 - sh)} width={r2(w - 8)} height={r2(sh - 8)} fill="none" stroke={stroke} strokeWidth={LINE.hair} />
      {mark ? (
        <PatentKey x={r2(x + 8 + w / 2)} y={r2(y - 7 - sh / 2 + 4)} size={11} fill={stroke}>
          {mark}
        </PatentKey>
      ) : null}
      {/* base */}
      <path d={`M${x} ${y}L${r2(x + 8)} ${r2(y - 7)}H${r2(x + 8 + w)}L${r2(x + w)} ${y}Z`} fill={stip(id, "light")} {...o} />
      <path d={`M${x} ${y}V${y + 3}H${r2(x + w)}L${r2(x + w + 8)} ${r2(y - 4)}V${r2(y - 7)}L${r2(x + w)} ${y}Z`} fill={stip(id, "dense")} {...o} />
    </g>
  );
}

type Assistant = "na" | "eu" | "as";
const BRANDS = ["US", "CA", "KR", "CN", "DE", "FR"];
/** Illustrative shortlists: the China-origin brand is left out by every assistant. The rest shift with the assistant's region. */
const SHORTLISTS: Record<Assistant, string[]> = {
  na: ["US", "CA", "DE"],
  eu: ["FR", "DE", "US"],
  as: ["KR", "US", "FR"],
};

/**
 * Six laptops with matched specifications and ratings, each from a brand of
 * a different origin, go into the assistant. Three come out as the
 * consumer's shortlist. Switching the assistant's region reshuffles the
 * shortlist, but the China-origin laptop (red) never makes it.
 */
export function ShortlistByAssistant() {
  const [a, setA] = useState<Assistant>("na");
  const id = "w3-short";
  const lx = (i: number) => 40 + i * 124;
  const picks = SHORTLISTS[a];
  const regionName = { na: "North American", eu: "European", as: "Asian" }[a];
  return (
    <div>
      <Frame
        width={800}
        height={254}
        label={`Patent drawing: six laptops with the same specifications and the same four-star rating, from brands of US, Canadian, Korean, Chinese, German and French origin, feed a ${regionName} model, which returns a shortlist of three: ${picks.join(", ")}. The Chinese-origin laptop, drawn in red, is not on the shortlist.`}
      >
        <PatentDefs id={id} />
        {BRANDS.map((b, i) => {
          const red = b === "CN";
          const c = red ? PAT.signal : PAT.ink;
          return (
            <g key={b}>
              <Laptop id={id} x={lx(i)} y={66} mark={b} stroke={c} />
              {[0, 1, 2, 3, 4].map((k) => (
                <path key={k} d={star(lx(i) + 16 + k * 11, 84, 4.4)} fill={k < 4 ? c : PAT.paper} stroke={c} strokeWidth={LINE.hair} strokeLinejoin="round" />
              ))}
              <line x1={lx(i) + 40} y1={94} x2={r2(370 + i * 12)} y2={114} {...hair} strokeDasharray={CENTRE_DASH} />
            </g>
          );
        })}
        <SmallModel id={id} x={366} y={120} w={60} h={50} />
        {[0, 1, 2].map((k) => (
          <line key={k} x1={r2(384 + k * 12)} y1={173} x2={r2(282 + k * 120)} y2={180} {...hair} strokeDasharray={CENTRE_DASH} />
        ))}
        {/* the shortlist tray */}
        <ObliqueBox id={id} x={222} y={236} w={380} h={12} dx={14} dy={8} />
        {picks.map((b, k) => (
          <Laptop key={b + k} id={id} x={r2(238 + k * 126)} y={232} mark={b} />
        ))}
      </Frame>
      <Segmented<Assistant>
        label="Assistant"
        options={[
          { id: "na", label: "North American model" },
          { id: "eu", label: "European model" },
          { id: "as", label: "Asian model" },
        ]}
        value={a}
        onChange={setA}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   21. Implicit Origin Cues in Brand Names and Storefronts
   -------------------------------------------------------------------------- */

type Cue = "brand" | "founder" | "domain" | "currency" | "hq";
/** Illustrative evidence each cue adds (log-odds) toward one inferred origin. With none, about 1 in 10. */
const CUE_WEIGHT: Record<Cue, number> = { brand: 1.5, founder: 1.7, domain: 2.6, currency: 2.1, hq: 2.3 };

/**
 * A supplier's listing card carries no "Made in" line. Each switch keeps or
 * neutralizes one cue on the card: brand name, founder name, web domain,
 * currency, headquarters city. A gauge beside it reads how surely the model
 * infers one national origin. Past even odds a red risk-review stamp lands on
 * the card.
 */
export function OriginCues() {
  const [cues, setCues] = useState<Cue[]>(["brand", "founder", "domain", "currency", "hq"]);
  const id = "w3-cues";
  const on = (c: Cue) => cues.includes(c);
  const logit = -2.2 + cues.reduce((a, c) => a + CUE_WEIGHT[c], 0);
  const p = 1 / (1 + Math.exp(-logit));
  const flagged = p > 0.5;
  const cx = 20;
  const cy = 36;
  const field = (y: number, text: string, size = 13, italic = false) => (
    <text x={cx + 18} y={y} fontFamily="var(--font-heading)" fontSize={size} fontStyle={italic ? "italic" : undefined} fill={PAT.ink}>
      {text}
    </text>
  );
  const gx = 470;
  const gTop = 52;
  const gBot = 252;
  const gy = r2(gBot - p * (gBot - gTop));
  return (
    <div>
      <Frame
        width={560}
        height={292}
        label={`Patent drawing: a supplier listing card with no made-in line. Cues shown: ${cues.length ? cues.join(", ") : "none"}. A vertical gauge beside it reads how surely the model infers one national origin: ${Math.round(p * 100)}%.${flagged ? " Past even odds, a red risk-review stamp lies across the card." : ""}`}
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={cx} y={cy} w={360} h={232} dx={10} dy={6} />
        {field(cy + 36, on("brand") ? "Hanbit Electronics" : "Supplier A", 19)}
        {field(cy + 58, on("founder") ? "Founded by Kim Min-jun" : "Founded 2009", 12.5, true)}
        {[84, 98, 112].map((d) => (
          <line key={d} x1={cx + 18} y1={cy + d} x2={cx + (d === 112 ? 230 : 330)} y2={cy + d} {...hair} />
        ))}
        <line x1={cx + 18} y1={cy + 128} x2={cx + 342} y2={cy + 128} {...hair} strokeDasharray="2 3" />
        {field(cy + 154, on("currency") ? "₩1,450,000 per unit" : "$1,090 per unit", 14)}
        {field(cy + 180, on("hq") ? "Headquarters: Daejeon" : "Headquarters: on request", 12.5)}
        {field(cy + 206, on("domain") ? "hanbit-elec.co.kr" : "supplier-a.com", 12.5, true)}
        {flagged ? (
          <g transform={`rotate(-10 ${cx + 268} ${cy + 46})`}>
            <rect x={cx + 196} y={cy + 26} width={146} height={40} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.bold * 1.4} />
            <rect x={cx + 200} y={cy + 30} width={138} height={32} fill="none" stroke={PAT.signal} strokeWidth={LINE.hair} />
            <PatentKey x={cx + 269} y={cy + 51} size={12} fill={PAT.signal}>
              RISK REVIEW
            </PatentKey>
          </g>
        ) : null}
        {/* the gauge: how surely one origin is inferred */}
        <ObliqueBox id={id} x={gx - 9} y={gTop} w={18} h={gBot - gTop} dx={7} dy={4} />
        <rect x={gx - 9} y={gy} width={18} height={r2(gBot - gy)} fill={stip(id, flagged ? "signal" : "light")} stroke={flagged ? PAT.signal : PAT.ink} strokeWidth={LINE.hair} />
        {[0, 50, 100].map((v) => {
          const y = r2(gBot - (v / 100) * (gBot - gTop));
          return (
            <g key={v}>
              <line x1={gx - 15} y1={y} x2={gx - 9} y2={y} {...hair} />
              <Num x={gx - 20} y={y + 4} anchor="end" size={11}>
                {`${v}%`}
              </Num>
            </g>
          );
        })}
        <Num x={gx + 24} y={gy + 6} anchor="start" size={20} fill={flagged ? PAT.signal : PAT.ink}>
          {`${Math.round(p * 100)}%`}
        </Num>
        <PatentKey x={gx + 4} y={282} size={10.5}>
          ORIGIN INFERRED
        </PatentKey>
      </Frame>
      <Toggles<Cue>
        label="Cues"
        options={[
          { id: "brand", label: "Brand name" },
          { id: "founder", label: "Founder name" },
          { id: "domain", label: "Domain" },
          { id: "currency", label: "Currency" },
          { id: "hq", label: "Headquarters" },
        ]}
        value={cues}
        onChange={setCues}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   22. Part 5: Auditing and Mitigating Cultural Bias
   -------------------------------------------------------------------------- */

/**
 * Part 5: the model in section, like strata. A thin surface coat (a prompt
 * edit, with a disclaimer note lying on top) sits over a thick band of
 * post-training alignment and a deeper band of pre-training weights. A red
 * seam of bias runs through both deep bands and never reaches the coat.
 */
export function DeepBias() {
  const id = "w3-deep";
  const x = 170;
  const y = 40;
  const w = 270;
  const coat = 8;
  const al = 64;
  const wt = 112;
  const h = coat + al + wt;
  const yA = y + coat;
  const yW = yA + al;
  return (
    <Frame
      width={480}
      height={240}
      label="Patent drawing in section: the model as a block of strata. A thin surface coat on top is the prompt edit, with a disclaimer note lying on the top face. Below it, a thick band of post-training alignment, and below that a deeper band of pre-training weights. A red seam of bias runs down through both deep bands and stops short of the surface coat."
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={36} dy={22} />
      {/* strata on the section face */}
      <rect x={x} y={yA} width={w} height={al} fill={stip(id, "light")} stroke="none" />
      <line x1={x} y1={yA} x2={x + w} y2={yA} {...ink} />
      <line x1={x} y1={yW} x2={x + w} y2={yW} {...ink} />
      {[yW + 22, yW + 46, yW + 70, yW + 94].map((yy) => (
        <path key={yy} d={`M${x} ${yy}Q${x + w * 0.3} ${yy - 5} ${x + w * 0.55} ${yy}T${x + w} ${yy}`} fill="none" {...hair} />
      ))}
      {/* the bias seam */}
      <path
        d={`M${x + 120} ${yA + 12}C${x + 150} ${yA + 40} ${x + 96} ${yW + 10} ${x + 132} ${yW + 40}S${x + 116} ${yW + 88} ${x + 150} ${y + h - 6}L${x + 170} ${y + h - 6}C${x + 140} ${yW + 80} ${x + 156} ${yW + 40} ${x + 128} ${yW + 6}S${x + 164} ${yA + 34} ${x + 134} ${yA + 12}Z`}
        fill={stip(id, "signal")}
        stroke={PAT.signal}
        strokeWidth={LINE.outline}
        strokeLinejoin="round"
      />
      {/* the disclaimer note lying on top */}
      <path d={`M${x + 150} ${y - 4}L${x + 168} ${y - 18}H${x + 236}L${x + 218} ${y - 4}Z`} fill={PAT.paper} {...ink} />
      {[0, 1].map((k) => (
        <line key={k} x1={r2(x + 172 - k * 6)} y1={r2(y - 13 + k * 5)} x2={r2(x + 222 - k * 6)} y2={r2(y - 13 + k * 5)} {...hair} />
      ))}
      {/* keys, left of the section with leaders to each stratum */}
      {[
        { y: r2(y + coat / 2), t: ["PROMPT EDIT"] },
        { y: r2(yA + al / 2), t: ["POST-TRAINING", "ALIGNMENT"] },
        { y: r2(yW + wt / 2), t: ["PRE-TRAINING", "WEIGHTS"] },
      ].map((k) => (
        <g key={k.t[0]}>
          {k.t.map((line, j) => (
            <PatentKey key={line} x={x - 14} y={r2(k.y + 4 + (j - (k.t.length - 1) / 2) * 15)} anchor="end" size={10.5}>
              {line}
            </PatentKey>
          ))}
          <line x1={x - 10} y1={k.y} x2={x - 2} y2={k.y} {...hair} />
        </g>
      ))}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   23. Why Surface Prompting Fails to Eliminate Latent Cultural Bias
   -------------------------------------------------------------------------- */

type Guard = "neutral" | "filter";

/** A card standing upright with up to two lines of italic text: a request or a reply. */
function TextCard({ id, x, y, w, h, lines, stroke = PAT.ink, size = 11.5 }: { id: string; x: number; y: number; w: number; h: number; lines: string[]; stroke?: string; size?: number }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={5} dy={3} stroke={stroke} />
      {lines.map((l, i) => (
        <text key={i} x={x + 10} y={r2(y + h / 2 + 4 + (i - (lines.length - 1) / 2) * 15)} fontFamily="var(--font-heading)" fontStyle="italic" fontSize={size} fill={stroke}>
          {l}
        </text>
      ))}
    </g>
  );
}

/**
 * Three tasks for the same model. Explicit surface expression: asked whether
 * every country's products are equally good, it leans domestic until the
 * neutrality instruction is on. Latent probability shift: in a tie-break
 * between two matched products, product A wins 62 of 100 shortlists however
 * the switches are set (red). Cultural erasure: a benign request about a
 * Diwali family dinner is answered, until the aggressive filter refuses it.
 */
export function SurfacePrompt() {
  const [guards, setGuards] = useState<Guard[]>([]);
  const id = "w3-surface";
  const neutral = guards.includes("neutral");
  const filter = guards.includes("filter");
  const down = (x: number, y0: number, y1: number) => (
    <g>
      <line x1={x} y1={y0} x2={x} y2={y1 - 2} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(x, y1, 0, 1, 6)} fill="none" {...hair} />
    </g>
  );
  const box = (x: number) => (
    <g>
      <ObliqueBox id={id} x={x} y={40} w={56} h={46} dx={10} dy={6} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={star(x + 10 + k * 11, 98, 4.2)} fill={PAT.ink} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
      ))}
      <path d={star(x + 54, 98, 4.2)} fill={PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
    </g>
  );
  const barTop = 132;
  const barBot = 212;
  const bar = (x: number, v: number, red: boolean) => {
    const h = r2(((barBot - barTop) * v) / 70);
    return (
      <g>
        <rect x={x} y={r2(barBot - h)} width={40} height={h} fill={red ? stip(id, "signal") : stip(id, "light")} stroke={red ? PAT.signal : PAT.ink} strokeWidth={LINE.outline} />
        <Num x={x + 20} y={r2(barBot - h - 6)} size={14} fill={red ? PAT.signal : PAT.ink}>
          {v}
        </Num>
      </g>
    );
  };
  return (
    <div>
      <Frame
        width={800}
        height={262}
        label={`Patent drawing in three figures. Explicit surface expression: asked whether products from every country are equally good, the model ${neutral ? "replies that all countries make good products" : "replies that domestic brands are usually more reliable"}. Latent probability shift: two matched products, A and B, with the same four-star rating. Product A wins 62 of 100 tie-breaks and B 38, in red, whatever the instructions. Cultural erasure: asked for recipes for a Diwali family dinner, the model ${filter ? "refuses, in red" : "answers"}. Neutrality instruction ${neutral ? "on" : "off"}. Aggressive safety filter ${filter ? "on" : "off"}.`}
      >
        <PatentDefs id={id} />
        {/* explicit surface expression */}
        <TextCard id={id} x={14} y={30} w={226} h={46} lines={["Are products from every country", "equally good?"]} />
        {down(124, 84, 120)}
        <TextCard
          id={id}
          x={14}
          y={124}
          w={226}
          h={46}
          lines={neutral ? ["All countries make", "good products."] : ["Domestic brands are usually", "more reliable."]}
        />
        <line x1={266} y1={14} x2={266} y2={222} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
        {/* latent probability shift */}
        {box(300)}
        {box(424)}
        <PatentKey x={328} y={70} size={13}>
          A
        </PatentKey>
        <PatentKey x={452} y={70} size={13}>
          B
        </PatentKey>
        <line x1={292} y1={barBot + 0.5} x2={500} y2={barBot + 0.5} {...ink} />
        {bar(308, 62, true)}
        {bar(432, 38, false)}
        <PatentKey x={400} y={228} size={10}>
          TIE-BREAKS WON OF 100
        </PatentKey>
        <line x1={534} y1={14} x2={534} y2={222} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
        {/* cultural erasure */}
        <TextCard id={id} x={556} y={30} w={226} h={46} lines={["Recipes for a Diwali", "family dinner, please."]} />
        {down(666, 84, 120)}
        {filter ? (
          <TextCard id={id} x={556} y={124} w={226} h={46} lines={["I can't help with requests", "about ethnic groups."]} stroke={PAT.signal} />
        ) : (
          <g>
            <ObliqueBox id={id} x={556} y={124} w={226} h={46} dx={5} dy={3} />
            {[136, 146, 156].map((yy) => (
              <line key={yy} x1={566} y1={yy} x2={yy === 156 ? 700 : 760} y2={yy} {...hair} />
            ))}
          </g>
        )}
        <FigureName x={127} y={256} size={13}>
          explicit surface expression
        </FigureName>
        <FigureName x={400} y={256} size={13}>
          latent probability shift
        </FigureName>
        <FigureName x={669} y={256} size={13}>
          cultural erasure
        </FigureName>
      </Frame>
      <Toggles<Guard>
        label="Guardrails"
        options={[
          { id: "neutral", label: "Treat all countries equally" },
          { id: "filter", label: "Aggressive safety filter" },
        ]}
        value={guards}
        onChange={setGuards}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   24. Mitigation Strategies Across the Deployment Stack
   -------------------------------------------------------------------------- */

/** A hand stamp standing on its pad: handle, block and a face of the given shape. */
function Stamp({ id, cx, y, face }: { id: string; cx: number; y: number; face: "circle" | "square" | "triangle" | "diamond" }) {
  const f = {
    circle: <circle cx={cx} cy={y + 10} r={6} fill="none" {...hair} />,
    square: <rect x={cx - 6} y={y + 4} width={12} height={12} fill="none" {...hair} />,
    triangle: <path d={`M${cx} ${y + 3}L${cx + 7} ${y + 16}H${cx - 7}Z`} fill="none" {...hair} />,
    diamond: <path d={`M${cx} ${y + 3}L${cx + 7} ${y + 10}L${cx} ${y + 17}L${cx - 7} ${y + 10}Z`} fill="none" {...hair} />,
  }[face];
  return (
    <g>
      <ellipse cx={cx} cy={y - 34} rx={8} ry={3} fill={stip(id, "light")} {...ink} />
      <path d={`M${cx - 8} ${y - 34}V${y - 20}A8 3 0 0 0 ${cx + 8} ${y - 20}V${y - 34}`} fill={PAT.paper} {...ink} />
      <ObliqueBox id={id} x={cx - 14} y={y - 18} w={28} h={14} dx={5} dy={3} />
      <path d={`M${cx - 14} ${y - 4}H${cx + 14}`} {...ink} />
      {f}
    </g>
  );
}

/**
 * Four mitigation instruments, one per layer of the stack. Corpus curation:
 * three locally authored pages, each different, go into the training tray.
 * A stack of identical machine-translated copies (red) is set aside.
 * Pluralistic RLHF: four raters' stamps of four different faces replace one.
 * Attribute blinding: the origin column of a bid comparison table is
 * redacted. Distributional calibration: a dial whose measured origin penalty
 * (red needle) is corrected back to zero (ink needle).
 */
export function MitigationStack() {
  const id = "w3-mitig";
  return (
    <Frame
      width={800}
      height={210}
      label="Patent drawing in four figures. Corpus curation: three locally authored pages, each with different lines, lie in a training tray, while a stack of identical machine-translated copies, in red, is set aside. Pluralistic RLHF: four raters' stamps standing in a row, each with a different face. Attribute blinding: a bid comparison table of four suppliers whose origin column is covered by redaction bars. Distributional calibration: a dial with a red needle at the measured origin penalty and an ink needle corrected back to zero."
    >
      <PatentDefs id={id} />
      {/* corpus curation */}
      <ObliqueBox id={id} x={16} y={150} w={120} h={14} dx={14} dy={8} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <path d={`M${30 + k * 36} ${146}L${36 + k * 36} ${118}H${60 + k * 36}L${54 + k * 36} ${146}Z`} fill={PAT.paper} {...ink} />
          {[0, 1, 2].map((j) => (
            <line key={j} x1={r2(36 + k * 36 + j * 1.2)} y1={126 + j * 7} x2={r2(36 + k * 36 + j * 1.2 + (k === 0 ? 16 : k === 1 ? 12 + j * 3 : 18 - j * 4))} y2={126 + j * 7} {...hair} />
          ))}
        </g>
      ))}
      {[0, 1, 2, 3].map((k) => (
        <ObliqueBox key={k} id={id} x={156} y={156 - k * 9} w={30} h={6} dx={8} dy={5} stroke={PAT.signal} top={k === 3 ? stip(id, "signal") : PAT.paper} side={stip(id, "signal")} />
      ))}
      <path d={cross(175, 108, 6)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <line x1={206} y1={14} x2={204} y2={178} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* pluralistic RLHF */}
      {(["circle", "square", "triangle", "diamond"] as const).map((f, k) => (
        <Stamp key={f} id={id} cx={232 + k * 40} y={122} face={f} />
      ))}
      <line x1={212} y1={146} x2={392} y2={146} {...hair} />
      {(["circle", "square", "triangle", "diamond"] as const).map((f, k) => {
        const cx = 232 + k * 40;
        const y = 156;
        return {
          circle: <circle key={f} cx={cx} cy={y} r={6} fill="none" {...ink} />,
          square: <rect key={f} x={cx - 6} y={y - 6} width={12} height={12} fill="none" {...ink} />,
          triangle: <path key={f} d={`M${cx} ${y - 7}L${cx + 7} ${y + 6}H${cx - 7}Z`} fill="none" {...ink} />,
          diamond: <path key={f} d={`M${cx} ${y - 7}L${cx + 7} ${y}L${cx} ${y + 7}L${cx - 7} ${y}Z`} fill="none" {...ink} />,
        }[f];
      })}
      <line x1={404} y1={14} x2={404} y2={178} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* attribute blinding: a bid comparison table */}
      <ObliqueBox id={id} x={420} y={40} w={164} h={126} dx={8} dy={5} />
      {[0, 1, 2, 3].map((k) => {
        const y = 66 + k * 24;
        return (
          <g key={k}>
            <line x1={428} y1={y - 10} x2={576} y2={y - 10} {...hair} />
            <line x1={432} y1={y + 2} x2={468} y2={y + 2} {...hair} />
            <rect x={480} y={y - 6} width={44} height={13} fill={stip(id, "dense")} stroke={PAT.ink} strokeWidth={LINE.hair} />
            <Num x={562} y={y + 6} anchor="end" size={11}>
              {["$41", "$39", "$44", "$40"][k]}
            </Num>
          </g>
        );
      })}
      <line x1={600} y1={14} x2={600} y2={178} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* distributional calibration: a dial */}
      <circle cx={700} cy={104} r={58} fill={PAT.paper} {...ink} />
      {Array.from({ length: 11 }, (_, k) => {
        const a = ((-75 + k * 15 - 90) * Math.PI) / 180;
        return <line key={k} x1={r2(700 + Math.cos(a) * 54)} y1={r2(104 + Math.sin(a) * 54)} x2={r2(700 + Math.cos(a) * (k === 5 ? 44 : 48))} y2={r2(104 + Math.sin(a) * (k === 5 ? 44 : 48))} {...hair} />;
      })}
      <Num x={700} y={38} size={13}>
        0
      </Num>
      {(() => {
        const a = ((-48 - 90) * Math.PI) / 180;
        return <line x1={700} y1={104} x2={r2(700 + Math.cos(a) * 44)} y2={r2(104 + Math.sin(a) * 44)} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" strokeDasharray="4 3" />;
      })()}
      <line x1={700} y1={104} x2={700} y2={58} stroke={PAT.ink} strokeWidth={LINE.bold * 1.3} strokeLinecap="round" />
      <path d="M672 64A44 44 0 0 1 694 60" fill="none" {...hair} />
      <path d={headAlongPath(694, 60, 1, -0.1, 6)} fill="none" {...hair} />
      <circle cx={700} cy={104} r={3} fill={PAT.ink} />
      <FigureName x={104} y={200} size={12.5}>
        corpus curation
      </FigureName>
      <FigureName x={304} y={200} size={12.5}>
        pluralistic RLHF
      </FigureName>
      <FigureName x={502} y={200} size={12.5}>
        attribute blinding
      </FigureName>
      <FigureName x={700} y={200} size={12.5}>
        distributional calibration
      </FigureName>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   25. Auditing Global Brand Visibility Across Multilingual Models
   -------------------------------------------------------------------------- */

/**
 * Step 3's checks on the CETSCALE audit (Wadi, Ghodrat & Philp, 2026):
 * probability mass falling outside the valid digits 1 to 7 (failure rate, mean
 * across items) and ordinal consensus (Cns, averaged over the four target
 * countries, read from the paper's consensus figure).
 */
const CHECKS = [
  { name: "Aya Expanse", fail: "0.6%", cns: 0.93 },
  { name: "Gemma 3", fail: "< 0.1%", cns: 0.95 },
  { name: "Llama 3.3", fail: "< 0.1%", cns: 0.91 },
  { name: "Ministral", fail: "0.2%", cns: 0.66 },
  { name: "Qwen3", fail: "< 0.1%", cns: 0.91 },
];

/**
 * Step 3 as an inspection sheet: for each model, the failure rate (mass off
 * the valid digits) and a consensus bar from 0 to 1. Ministral's consensus,
 * about 0.66 against 0.9 and above for the rest, is red.
 */
export function AuditChecks() {
  const id = "w3-checks";
  const x = 16;
  const y = 30;
  const bx = 214;
  const bw = 110;
  return (
    <Frame
      width={400}
      height={262}
      label={`Patent drawing of an inspection sheet for step 3 of the audit, one row per model, from Wadi, Ghodrat and Philp (2026): ${CHECKS.map((c) => `${c.name}, failure rate ${c.fail}, consensus ${c.cns.toFixed(2)}`).join(". ")}. Ministral's consensus bar is red.`}
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={x} y={y} w={364} h={220} dx={8} dy={5} />
      <PatentKey x={146} y={y + 24} size={10}>
        FAILURE RATE
      </PatentKey>
      <PatentKey x={r2(bx + bw / 2 + 16)} y={y + 24} size={10}>
        CONSENSUS
      </PatentKey>
      <line x1={x + 10} y1={y + 34} x2={x + 354} y2={y + 34} {...ink} />
      {CHECKS.map((c, i) => {
        const ry = y + 62 + i * 34;
        const red = c.cns < 0.8;
        const col = red ? PAT.signal : PAT.ink;
        return (
          <g key={c.name}>
            <text x={x + 12} y={ry + 4} fontFamily="var(--font-heading)" fontSize={13} fill={PAT.ink}>
              {c.name}
            </text>
            <Num x={146} y={ry + 4} size={13}>
              {c.fail}
            </Num>
            <rect x={bx} y={ry - 6} width={bw} height={12} fill={PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} />
            <rect x={bx} y={ry - 6} width={r2(bw * c.cns)} height={12} fill={stip(id, red ? "signal" : "light")} stroke={col} strokeWidth={LINE.outline} />
            <Num x={bx + bw + 6} y={ry + 4} anchor="start" size={12} fill={col}>
              {c.cns.toFixed(2)}
            </Num>
            {i < CHECKS.length - 1 ? <line x1={x + 10} y1={ry + 17} x2={x + 354} y2={ry + 17} {...hair} /> : null}
          </g>
        );
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   26. Discussion: Cross-Border Shopping Assistants
   -------------------------------------------------------------------------- */

/**
 * Two laptops with identical specifications, ratings and price, one from a
 * US brand and one from a South Korean brand. Under each, a stack of
 * recommendations from the US-developed assistant: 100 for the US laptop,
 * 60 for the Korean one (red), 40 percent fewer.
 */
export function MatchedLaptops() {
  const id = "w3-laptops";
  const cols = [
    { x: 54, mark: "US", n: 100, red: false },
    { x: 234, mark: "KR", n: 60, red: true },
  ];
  const base = 286;
  return (
    <Frame
      width={400}
      height={312}
      label="Patent drawing: two laptops with identical specifications, the same four-star rating and the same $1,149 price tag, one from a US brand and one from a South Korean brand. Under each, a stack of recommendations from a US-developed assistant: 100 for the US laptop and 60, in red, for the Korean laptop, 40 percent fewer."
    >
      <PatentDefs id={id} />
      {cols.map((c) => {
        const col = c.red ? PAT.signal : PAT.ink;
        const h = c.n * 1.05;
        return (
          <g key={c.mark}>
            <Laptop id={id} x={c.x} y={76} w={96} mark={c.mark} />
            {[0, 1, 2, 3, 4].map((k) => (
              <path key={k} d={star(c.x + 26 + k * 12, 96, 4.6)} fill={k < 4 ? PAT.ink : PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
            ))}
            <Tag cx={c.x + 60} cy={122} text="$1,149" w={58} size={12} />
            <ObliqueBox id={id} x={c.x + 26} y={r2(base - h)} w={60} h={r2(h)} dx={12} dy={7} stroke={col} front={c.red ? PAT.paper : PAT.paper} side={c.red ? stip(id, "signal") : undefined} top={c.red ? stip(id, "signal") : undefined} />
            <Num x={c.x + 56} y={r2(base - h - 14)} size={18} fill={col}>
              {c.n}
            </Num>
          </g>
        );
      })}
      <line x1={30} y1={base + 0.5} x2={370} y2={base + 0.5} {...ink} />
      <PatentKey x={200} y={base + 20} size={10.5}>
        RECOMMENDATIONS
      </PatentKey>
    </Frame>
  );
}
