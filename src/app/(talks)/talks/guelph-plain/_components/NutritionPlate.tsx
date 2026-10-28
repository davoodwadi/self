"use client";

import { useState } from "react";
import { Plate } from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";
import { Choice } from "./Plates";
import { KlChart, type KlGroup } from "./Bars";

/*
 * Paper 4, out-of-domain test (decision-models-finetuning, code/Grummon.ipynb):
 * the Grummon et al. (2025) front-of-package nutrition label RCT, 6 trial arms
 * by 21 survey items, at the k = 1 subpopulation level. Mean KL divergence
 * from the human response distributions, off-the-shelf vs. fine-tuned on ISSP.
 * "Unseen" keeps only persona attributes absent from ISSP training (e.g. SNAP,
 * Nutrition Facts use, online grocery share, health literacy).
 */
const SETS: Record<"all" | "unseen", { groups: KlGroup[]; uniform: number }> = {
  all: {
    groups: [
      { size: "Kev 0.8B", off: 0.6633, ft: 0.6231 },
      { size: "Kev 4B", off: 0.6495, ft: 0.5225 },
      { size: "Kev 9B", off: 0.4783, ft: 0.4385 },
    ],
    uniform: 0.7061,
  },
  unseen: {
    groups: [
      { size: "Kev 0.8B", off: 0.6805, ft: 0.6203 },
      { size: "Kev 4B", off: 0.6642, ft: 0.5135 },
      { size: "Kev 9B", off: 0.5082, ft: 0.4351 },
    ],
    uniform: 0.7007,
  },
};

export function NutritionPlate() {
  const [set, setSet] = useState<"all" | "unseen">("all");
  const d = SETS[set];
  return (
    <Plate>
      <KlChart
        groups={d.groups}
        uniform={d.uniform}
        max={0.75}
        measure="KL divergence, nutrition label RCT"
        label={`KL divergence from human subpopulation response distributions in the Grummon et al. (2025) nutrition label RCT, ${
          set === "all" ? "all persona attributes" : "persona attributes absent from training"
        }: ${d.groups.map((g) => `${g.size} ${g.off.toFixed(2)} off-the-shelf, ${g.ft.toFixed(2)} fine-tuned`).join(", ")}. Uniform baseline ${d.uniform.toFixed(2)}.`}
      />
      <Choice
        label="Persona attributes"
        value={set}
        onChange={setSet}
        options={[
          { id: "all", label: "All" },
          { id: "unseen", label: "Absent from training" },
        ]}
      />
    </Plate>
  );
}
