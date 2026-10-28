"use client";

import React from "react";
import { CoffeeBean } from "@phosphor-icons/react";
import {
  Frame,
  Plate,
  INK,
  RULE2,
  PAPER,
  PAPER3,
  SIGNAL,
  SERIF,
  r2,
} from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";

/* --------------------------------------------------------------------------
   Paper 1, the stimulus with full information: two bags of coffee on a
   shelf, the weight printed on each bag and the price on its shelf tag.
   Coffee A carries the just-below price ($4.99 for 10 oz). Coffee B is the
   normatively optimal choice ($5.00 for 11 oz), marked in the accent.
   -------------------------------------------------------------------------- */

const COFFEES = [
  { id: "A", cx: 120, oz: "10 oz", price: "$4.99", best: false },
  { id: "B", cx: 280, oz: "11 oz", price: "$5.00", best: true },
];

/** A stand-up coffee pouch standing on the shelf at (cx, base). */
function Pouch({ cx, base, oz }: { cx: number; base: number; oz: string }) {
  const w = 96;
  const h = 132;
  const x0 = r2(cx - w / 2);
  const x1 = r2(cx + w / 2);
  const top = base - h;
  return (
    <g>
      <path
        d={`M${x0 + 4} ${top + 14}L${x0} ${base - 6}Q${x0} ${base} ${x0 + 6} ${base}H${x1 - 6}Q${x1} ${base} ${x1} ${base - 6}L${x1 - 4} ${top + 14}Z`}
        fill={PAPER3}
        stroke={INK}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect
        x={x0 + 4}
        y={top}
        width={w - 8}
        height={14}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.5}
      />
      <line
        x1={x0 + 10}
        y1={top + 7}
        x2={x1 - 10}
        y2={top + 7}
        stroke={RULE2}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <rect
        x={x0 + 14}
        y={top + 40}
        width={w - 28}
        height={70}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.25}
      />
      <CoffeeBean
        x={cx - 15}
        y={top + 46}
        size={30}
        weight="regular"
        color={INK}
      />
      <text
        x={cx}
        y={top + 100}
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize={17}
        fill={INK}
      >
        {oz}
      </text>
    </g>
  );
}

/** A shelf-edge price tag, centred at cx and hanging from the shelf at y. */
function ShelfTag({
  cx,
  y,
  price,
  color,
}: {
  cx: number;
  y: number;
  price: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={cx - 34}
        y={y}
        width={68}
        height={30}
        fill={PAPER}
        stroke={color}
        strokeWidth={color === INK ? 1.25 : 2}
      />
      <text
        x={cx}
        y={y + 21}
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize={18}
        fill={color}
      >
        {price}
      </text>
    </g>
  );
}

export function CoffeeShelf() {
  const shelf = 152;
  return (
    <Plate>
      <Frame
        width={400}
        height={200}
        label="Two bags of coffee on a shelf. Coffee A weighs 10 oz and its shelf tag reads $4.99. Coffee B weighs 11 oz and its shelf tag reads $5.00, marked as the better buy per ounce."
      >
        {COFFEES.map((c) => (
          <Pouch key={c.id} cx={c.cx} base={shelf} oz={c.oz} />
        ))}
        <line
          x1={24}
          y1={shelf}
          x2={376}
          y2={shelf}
          stroke={INK}
          strokeWidth={2}
        />
        <rect
          x={24}
          y={shelf}
          width={352}
          height={8}
          fill={PAPER3}
          stroke={INK}
          strokeWidth={1.25}
        />
        {COFFEES.map((c) => (
          <ShelfTag
            key={c.id}
            cx={c.cx}
            y={shelf + 12}
            price={c.price}
            color={c.best ? SIGNAL : INK}
          />
        ))}
      </Frame>
    </Plate>
  );
}
