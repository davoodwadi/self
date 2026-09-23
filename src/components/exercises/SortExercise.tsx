"use client";

import React, { useMemo, useState } from "react";
import { seededShuffle, type SortExercise as SortData } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { Card, Explanation, ExerciseHeader, Status, TextButton } from "./parts";

const COLS: Record<number, string> = { 2: "sm:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 xl:grid-cols-4" };

/**
 * Sort into bins, with feedback on every move. Tap a card, then tap a group:
 * the right group locks the card in with a tick and its explanation; a wrong
 * group marks the card and leaves it selected in its slot, without giving the
 * answer away, so the student can try another group. Every card keeps its
 * slot in the pile, so nothing above or below it moves.
 */
export default function SortExercise({
  data,
  art,
}: {
  data: SortData;
  /** Optional drawings from the course, keyed by card id. */
  art?: Record<string, React.ReactNode>;
}) {
  const deck = useMemo(() => seededShuffle(data.cards, data.slide_id), [data]);
  /** card id → bin, only ever the right bin */
  const [placed, setPlaced] = useState<Record<string, string | undefined>>({});
  const [selected, setSelected] = useState<string | null>(null);
  /** the last move, for the status line and the mark on a missed card */
  const [last, setLast] = useState<{ card: string; bin: string; right: boolean } | null>(null);
  /** cards that went to a wrong group at least once */
  const [missed, setMissed] = useState<Record<string, true>>({});

  const done = deck.every((c) => placed[c.id]);
  const firstTry = data.cards.filter((c) => !missed[c.id]).length;
  const binLabel = (id: string) => data.bins.find((b) => b.id === id)?.label ?? id;
  const selectedText = data.cards.find((c) => c.id === selected)?.text;

  const pick = (id: string) => {
    // a card just sent to the wrong group stays selected, ready for another try
    const retrying = last && !last.right && last.card === id;
    setSelected((s) => (s === id && !retrying ? null : id));
    setLast(null);
  };

  const place = (bin: string) => {
    if (!selected) return;
    const card = data.cards.find((c) => c.id === selected);
    if (!card) return;
    if (card.bin === bin) {
      setPlaced((p) => ({ ...p, [card.id]: bin }));
      setSelected(null);
      setLast({ card: card.id, bin, right: true });
    } else {
      setMissed((m) => ({ ...m, [card.id]: true }));
      setLast({ card: card.id, bin, right: false });
    }
  };

  const reset = () => {
    setPlaced({});
    setSelected(null);
    setLast(null);
    setMissed({});
  };

  const cardBody = (c: SortData["cards"][number]) => (
    <>
      {art?.[c.id] ? <span className="mb-2 block">{art[c.id]}</span> : null}
      {c.text}
    </>
  );

  return (
    <div className="w-full">
      <ExerciseHeader kind="Sort into groups" prompt={data.prompt} />

      {/* the pile: every card keeps its slot, so taking one out never reflows the rest */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Cards to sort">
        {deck.map((c) =>
          placed[c.id] ? (
            <li key={c.id} className="relative min-w-0" aria-hidden>
              <div className="invisible">
                <Card>{cardBody(c)}</Card>
              </div>
              <div className="absolute inset-0 border border-dashed border-[var(--rule-2)]" />
            </li>
          ) : (
            <li key={c.id} className="min-w-0">
              <Card
                state={last && !last.right && last.card === c.id ? "wrong" : selected === c.id ? "selected" : "idle"}
                pressed={selected === c.id}
                onClick={() => pick(c.id)}
                label={last && !last.right && last.card === c.id ? `${c.text} (not ${binLabel(last.bin)}; still selected, try another group)` : undefined}
              >
                {cardBody(c)}
              </Card>
            </li>
          ),
        )}
      </ul>

      {/* the bins */}
      <div className={cn("mt-8 grid gap-5", COLS[data.bins.length] ?? "md:grid-cols-3")}>
        {data.bins.map((b) => {
          const inBin = deck.filter((c) => placed[c.id] === b.id);
          return (
            <div
              key={b.id}
              onClick={() => place(b.id)}
              className={cn(
                "min-w-0 border-t-2 pt-3 pb-4 transition-colors",
                selected ? "cursor-pointer border-[var(--signal)] bg-[var(--signal-tint)]/40" : "border-[var(--ink)]",
              )}
            >
              <button
                type="button"
                disabled={!selected}
                onClick={(e) => {
                  e.stopPropagation();
                  place(b.id);
                }}
                className={cn("type-label mb-3 block w-full px-2 text-left", selected ? "cursor-pointer !text-[var(--signal)]" : "!text-[var(--ink)]")}
                aria-label={selected ? `Put “${selectedText}” in ${b.label}` : b.label}
              >
                {b.label}
              </button>
              {inBin.length === 0 ? (
                <div
                  aria-hidden
                  className={cn(
                    "mx-2 h-14 border border-dashed",
                    selected ? "border-[var(--signal)]" : "border-[var(--rule-2)]",
                  )}
                />
              ) : null}
              <ul className="grid gap-2 px-2">
                {inBin.map((c) => (
                  <li key={c.id} className="min-w-0" onClick={(e) => e.stopPropagation()}>
                    <Card state="right" disabled>
                      {cardBody(c)}
                    </Card>
                    {c.explanation ? <Explanation right>{c.explanation}</Explanation> : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <Status>
        {done
          ? `All sorted. ${firstTry} of ${data.cards.length} right on the first try.`
          : last && !last.right
            ? `Not ${binLabel(last.bin)}. Try another group.`
            : last?.right
              ? `Yes, ${binLabel(last.bin)}. Tap the next card.`
              : selected
                ? "Now tap the group it belongs to."
                : "Tap a card, then tap the group it belongs to."}
      </Status>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <TextButton onClick={reset}>Start over</TextButton>
      </div>
    </div>
  );
}
