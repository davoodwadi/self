import React from "react";

/* --------------------------------------------------------------------------
   Paper 1, the stimulus with full information, drawn plainly: two packages
   standing on a shelf line, each printed with its own line from slides.md,
   so the price and weight appear once, on the package. Coffee A carries the
   just-below price ($4.99 for 10 oz). Coffee B is the normatively optimal
   choice ($5.00 for 11 oz).
   -------------------------------------------------------------------------- */

const COFFEES = [
  { name: "Coffee A:", offer: "$4.99 for 10 oz", note: "(just-below price)" },
  {
    name: "Coffee B:",
    offer: "$5.00 for 11 oz",
    note: "(normatively optimal choice)",
  },
];

export function CoffeeShelf() {
  return (
    <figure
      className="w-full"
      aria-label="Two coffee packages on a shelf. Coffee A: $4.99 for 10 oz (just-below price). Coffee B: $5.00 for 11 oz (normatively optimal choice)."
    >
      <ul className="grid grid-cols-2 gap-8 border-b-2 border-[var(--ink)] px-6">
        {COFFEES.map((c) => (
          <li
            key={c.name}
            className="flex min-h-[13rem] flex-col items-center justify-center gap-1 border-2 border-b-0 border-[var(--ink)] px-3 text-center"
          >
            <strong className="text-[1.3rem] font-semibold text-[var(--ink)]">
              {c.name}
            </strong>{" "}
            <span className="text-[1.3rem] text-[var(--ink)]">{c.offer}</span>{" "}
            <span className="text-[1.05rem] text-[var(--ink-2)]">{c.note}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
