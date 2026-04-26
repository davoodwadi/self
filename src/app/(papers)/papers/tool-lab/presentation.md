# Tool-Lab Interactive Presentation Outline

Audience: NLP Reading Group, University of British Columbia

Format: Next.js interactive web presentation, similar to the `every-token-counts` route. Each slide should be implemented as a full-viewport or near full-viewport section with clear navigation, figure-forward layouts, and optional interactive controls where they help explain tool-use trajectories.

Core positioning:

> Tool-Lab is a process-level evaluation framework for LLM agents. It treats tool use as a constrained sequential decision problem, allowing us to evaluate and train models based on the quality of their information-search policies, not only their final answers.

## Global Design Notes

- Use the marketing experiments as clean, controlled environments, not as the main intellectual frame.
- Keep the NLP framing visible throughout: tool use, planning, MDPs, policy optimality, cost-aware evaluation, reinforcement learning.
- Prefer diagrams and stepwise interactive reveals over dense text.
- Use actual paper assets where available, and create new diagrams later under `/public/papers/tool-lab/`.
- Suggested route: `src/app/(papers)/papers/tool-lab/page.tsx`.
- Suggested asset directory: `/public/papers/tool-lab/`.

## Existing Assets

- `/papers/tool-lab/anchoring-literature.png`
  - Use in the early motivation section as an example of prior work showing cognitive biases in LLMs.
- `/papers/tool-lab/mediation2-no-prompt.drawio.png`
  - Use when introducing the paper's empirical mechanism: model size, tool cost, information search, and choice optimality.
- `/papers/tool-lab/GPT 5.5-Artificial Analysis Intelligence Index.png`
  - Use in the "why this matters" section to connect the talk to current model evaluation trends around efficiency and token use.

## Proposed New Assets To Create Later

- `/papers/tool-lab/tool-lab-mdp-diagram.png`
  - Diagram mapping Tool-Lab onto MDP components: state, action, transition, reward, policy.
- `/papers/tool-lab/tool-lab-interface-schematic.png`
  - Schematic of a hidden product-attribute table with `inspect_cell` and `submit_choice` tools.
- `/papers/tool-lab/tool-trace-example.png`
  - Example trajectory showing an LLM inspecting cells, accumulating cost, then submitting a choice.
- `/papers/tool-lab/final-answer-vs-process.png`
  - Diagram contrasting benchmark evaluation with Tool-Lab process evaluation.
- `/papers/tool-lab/optimal-policy-comparison.png`
  - Figure comparing three policies: exhaustive search, heuristic shortcut, and optimal cost-aware search.
- `/papers/tool-lab/study-22-choice-results.png`
  - Result figure for Study 2.2, showing choice optimality by model size and tool cost.
- `/papers/tool-lab/study-22-search-results.png`
  - Result figure for Study 2.2, showing inspected attributes or search depth by model size and tool cost.
- `/papers/tool-lab/study-32-choice-results.png`
  - Result figure for Study 3.2, showing optimal, discounted, and cheapest choices across conditions.
- `/papers/tool-lab/study-32-search-results.png`
  - Result figure for Study 3.2, showing whether models inspect list price, discount percentage, and weight.
- `/papers/tool-lab/rl-training-loop.png`
  - Diagram showing Tool-Lab as an environment for training policies with RL or imitation learning.

## Slide 1: Hero

Suggested component: `HeroSlide`

Title:

**Tool-Lab**

Subtitle:

**Evaluating LLM Tool Use as Resource-Rational Planning**

Main message:

LLM agents should be evaluated not only by whether they get the answer right, but by whether they acquire information efficiently under resource constraints.

Visual:

Create a simple full-bleed abstract interface visual: hidden grid cells, a tool-call trace, and a final decision. Avoid making it look like a marketing dashboard.

Speaker note:

Open by saying this talk uses a marketing paper as the empirical source, but the method is aimed at a broader NLP problem: how to evaluate tool-using LLMs.

## Slide 2: The Evaluation Gap

Suggested component: `EvaluationGapSlide`

Title:

**Final Answers Are Not Enough**

Main message:

Most LLM benchmarks score final outputs, but agentic models also choose what information to gather, what tools to call, how long to reason, and when to stop.

Content:

- Standard evaluation: answer correctness, preference score, benchmark pass rate.
- Missing evaluation layer: process quality, search efficiency, cost sensitivity.
- Core question: did the model follow a good policy?

Visual:

Use `/papers/tool-lab/final-answer-vs-process.png`.

Figure description:

A two-column diagram. Left column shows a benchmark item flowing directly into "Correct / Incorrect." Right column shows an agent trajectory: state, tool call, observation, cumulative cost, final answer, and policy score.

Interaction:

Optional toggle between "final-answer view" and "process view."

## Slide 3: Why This Matters Now

Suggested component: `EfficiencyMotivationSlide`

Title:

**Efficiency Is Becoming A Model Capability**

Main message:

Recent model discussions increasingly emphasize doing the same task with fewer tokens, lower latency, or lower cost. But we lack systematic tools for evaluating whether a model's planning process is actually efficient.

Visual:

Use existing asset:

`/papers/tool-lab/GPT 5.5-Artificial Analysis Intelligence Index.png`

Figure description:

Use the image as an example of the broader industry trend toward evaluating model efficiency. Add a small caption: "The evaluation target is shifting from raw capability to capability per unit cost."

Speaker note:

Do not make the slide depend on the specific model claim. Use it as evidence that efficiency has become part of how people talk about LLM capability.

## Slide 4: The Puzzle

Suggested component: `BiasPuzzleSlide`

Title:

**When LLMs Look Biased**

Main message:

LLMs display human-like cognitive biases. The usual explanation is that they inherit these biases from human-generated training data. Tool-Lab asks whether some of these behaviors are instead cost-sensitive shortcuts.

Content:

- Prior work: LLMs show anchoring, framing effects, and other cognitive biases.
- Common explanation: biased human data produces biased model behavior.
- Alternative explanation: under constraints, heuristics can be resource-rational.

Visual:

Use existing asset:

`/papers/tool-lab/anchoring-literature.png`

Figure description:

Show a prior anchoring-bias prompt or result as a concrete example of the literature. Place it next to a question: "Artifact of training data, or adaptive shortcut under constraints?"

## Slide 5: From Bounded Rationality To Resource Rationality

Suggested component: `ResourceRationalitySlide`

Title:

**Bias Can Be A Cost-Saving Policy**

Main message:

Resource rationality says agents should maximize expected utility net of computation, information, time, and monetary costs.

Content:

- Classical rationality: choose the objectively best option.
- Bounded rationality: agents use shortcuts because they are limited.
- Resource rationality: shortcuts can be optimal when exact computation is costly.

LLM resources:

- tool calls
- reasoning tokens
- latency
- API cost
- context budget
- search depth

Visual:

Create `/papers/tool-lab/resource-rationality-curve.png`.

Figure description:

Line or curve showing expected decision value increasing with more information, while cost also increases. The optimal stopping point occurs where marginal value of information no longer exceeds marginal cost.

Interaction:

Optional slider for tool cost. As cost increases, the optimal stopping point moves earlier.

## Slide 6: Tool-Lab In One Screen

Suggested component: `ToolLabInterfaceSlide`

Title:

**Tool-Lab Makes Search Observable**

Main message:

Tool-Lab hides task-relevant information behind explicit tool calls, so we can observe the model's information-acquisition process.

Content:

- The model sees alternatives and hidden attributes.
- It can call `inspect_cell` to reveal one cell.
- Each tool call can carry a cost.
- It can call `submit_choice` at any point.
- We record the full sequence of tool calls and the final decision.

Visual:

Use `/papers/tool-lab/tool-lab-interface-schematic.png`.

Figure description:

A table with rows as alternatives and columns as attributes. Some cells are hidden. A side panel shows available tools: `inspect_cell(option_id, attribute_id)` and `submit_choice(option_id)`. A bottom strip shows cumulative tool cost.

Interaction:

Make cells clickable in the web version. Clicking a cell reveals an example value and increases cumulative cost.

## Slide 7: A Trace, Not Just An Answer

Suggested component: `TraceSlide`

Title:

**The Unit Of Analysis Is The Trajectory**

Main message:

Two models can choose the same final answer but follow very different policies.

Content:

Example trajectory:

1. Inspect price dollars for Coffee A.
2. Inspect price dollars for Coffee B.
3. Inspect weight for Coffee B.
4. Stop search.
5. Submit Coffee B.

Evaluation questions:

- Did the model inspect relevant attributes?
- Did it inspect them in a sensible order?
- Did it stop too early or too late?
- Did the final choice justify the incurred cost?

Visual:

Use `/papers/tool-lab/tool-trace-example.png`.

Figure description:

Timeline of tool calls with observations and cumulative cost. End with final decision and net utility.

Interaction:

Animated stepper through the trajectory.

## Slide 8: Tool-Lab As An MDP

Suggested component: `MDPSlide`

Title:

**A Sequential Decision Problem**

Main message:

Tool-Lab can be formalized as a Markov decision process, making LLM tool use comparable to optimal planning policies.

Content:

- State: revealed cells, hidden cells, cumulative cost, task context.
- Actions: inspect a cell, call a tool, submit a final answer.
- Transition: revealed information updates the state.
- Cost: tool cost, token cost, latency, or computation cost.
- Reward: final task utility minus acquisition cost.
- Policy: the model's tool-use and stopping strategy.

Visual:

Use `/papers/tool-lab/tool-lab-mdp-diagram.png`.

Figure description:

MDP loop: state to action to observation to updated state, with cost attached to actions and reward attached to final submission. Include an LLM policy box choosing actions.

## Slide 9: What An Optimal Policy Gives Us

Suggested component: `OptimalPolicySlide`

Title:

**From Accuracy To Policy Optimality**

Main message:

Once a task is represented as an MDP, we can compare the LLM's observed policy against exhaustive search, heuristic search, and the optimal cost-aware policy.

Content:

- Exhaustive policy: inspect everything, often too expensive.
- Heuristic policy: inspect little, often fast but brittle.
- Optimal policy: inspect information only when expected value exceeds cost.

Visual:

Use `/papers/tool-lab/optimal-policy-comparison.png`.

Figure description:

Three side-by-side trajectories over the same hidden table. Show total tool cost, choice quality, and net reward for each policy.

Table:

Create a compact comparison table:

| Policy | Tool Cost | Accuracy | Net Reward | Interpretation |
| --- | --- | --- | --- | --- |
| Exhaustive | High | High | Medium | Accurate but inefficient |
| Heuristic | Low | Variable | Low or high | Cheap but risky |
| Optimal | Moderate | High enough | Highest | Cost-aware planning |

## Slide 10: Marketing As A Controlled Testbed

Suggested component: `ControlledTestbedSlide`

Title:

**Why Product Choice?**

Main message:

The marketing examples are useful because they give us decision tasks with hidden attributes, known utility functions, interpretable heuristics, and controllable information costs.

Content:

- Prices, discounts, and weights create simple utility calculations.
- Hidden attributes force information acquisition.
- Tool costs let us manipulate resource constraints.
- Ground truth is known, so we can score both final choice and search process.

Visual:

Create `/papers/tool-lab/coffee-task-schematic.png`.

Figure description:

Show two or three coffee alternatives with hidden attributes. Reveal the true utility calculation in a side panel after a click.

Speaker note:

Say explicitly that the point is not coffee. Coffee is a compact environment for studying planning under uncertainty.

## Slide 11: Study Roadmap

Suggested component: `StudyRoadmapSlide`

Title:

**Two Biases, Same Mechanism**

Main message:

The empirical studies use two marketing biases to test whether final-output biases are mediated by information-search policies.

Content:

- Study 2.1: price-truncation bias in final choices.
- Study 2.2: Tool-Lab test of search truncation under tool costs.
- Study 3.1: discount-framing bias in final choices.
- Study 3.2: Tool-Lab test of discount cue reliance under tool costs.

Visual:

Create `/papers/tool-lab/study-roadmap.png`.

Figure description:

A four-node sequence. Each pair follows the same logic: first show the output bias, then use Tool-Lab to reveal the process.

## Slide 12: Study 2.1, Price-Truncation Bias

Suggested component: `PriceBiasSlide`

Title:

**Output Bias: The Lower Dollar Looks Better**

Main message:

LLMs can prefer an option with a lower whole-dollar price even when another option has better economic value.

Content:

Example:

- Coffee A: lower visible dollar amount.
- Coffee B: slightly higher visible dollar amount, but better value after weight and cents are considered.

Main takeaway:

The final decision can deviate from mathematical optimality.

Visual:

Create `/papers/tool-lab/study-21-price-bias.png`.

Figure description:

Show two products side by side. Highlight the misleading whole-dollar cue on one product and the true value calculation on the other.

Table:

Create a small stimulus table:

| Option | Price Dollars | Price Cents | Weight | True Value |
| --- | ---: | ---: | ---: | ---: |
| Coffee A | 4 | 99 | 10 oz | Lower |
| Coffee B | 5 | 00 | 11 oz | Higher |

## Slide 13: Study 2.2, Tool-Lab Design

Suggested component: `PriceToolLabDesignSlide`

Title:

**Process Test: Hide The Information**

Main message:

Study 2.2 tests whether the price-truncation bias emerges because models choose not to acquire costly information.

Content:

- Attributes are hidden behind `inspect_cell`.
- Price is partitioned into `price_dollars` and `price_cents`.
- Weight is also hidden.
- Tool cost is manipulated: free vs. costly.
- Models must decide when enough information has been acquired.

Visual:

Create `/papers/tool-lab/study-22-hidden-table.png`.

Figure description:

Hidden matrix showing Coffee A and Coffee B against `price_dollars`, `price_cents`, `weight`, and noise attributes. Add cost badges for `$0` and `$10` conditions.

Interaction:

Let the audience reveal cells and see how many cells are required to identify the true best option.

## Slide 14: Study 2.2, Results

Suggested component: `PriceToolLabResultsSlide`

Title:

**Tool Cost Changes The Search Policy**

Main message:

Under high tool costs, larger models strategically truncate information search. This reduces information acquisition and can produce heuristic choices.

Visuals:

Use or create:

- `/papers/tool-lab/study-22-choice-results.png`
- `/papers/tool-lab/study-22-search-results.png`

Figure descriptions:

Choice result figure:

Bar chart or dot plot showing choice optimality by model size and tool cost.

Search result figure:

Grouped bar chart showing how often models inspect critical attributes such as `price_cents` and `weight`.

Table:

Optional compact result table:

| Model | Tool Cost | Search Depth | Critical Info Inspected | Optimal Choice Rate |
| --- | ---: | ---: | ---: | ---: |
| Gemini Flash Lite | 0 | TBD | TBD | TBD |
| Gemini Flash Lite | 10 | TBD | TBD | TBD |
| Gemini Pro | 0 | TBD | TBD | TBD |
| Gemini Pro | 10 | TBD | TBD | TBD |

Speaker note:

The important result is the mediation logic: tool cost changes information search, and information search changes final choice.

## Slide 15: Mechanism Diagram

Suggested component: `MechanismSlide`

Title:

**Bias Is Mediated By Search**

Main message:

Tool-Lab lets us test whether final-output bias is explained by the model's information-acquisition process.

Visual:

Use existing asset:

`/papers/tool-lab/mediation2-no-prompt.drawio.png`

Figure description:

Conceptual mediation diagram linking model size, resource constraints, information search, and choice optimality. Use callouts to translate marketing variables into NLP terms:

- model size = planning and reasoning capacity
- tool cost = resource constraint
- information search = tool-use policy
- choice optimality = task reward

Interaction:

Optional hover labels explaining each path in NLP language.

## Slide 16: Study 3.1, Discount-Framing Bias

Suggested component: `DiscountBiasSlide`

Title:

**Output Bias: The Discount Cue Looks Valuable**

Main message:

LLMs can favor a salient discount even when the discounted option is not the best economic value.

Content:

- Discount framing creates a strong semantic cue.
- True value requires integrating list price, discount percentage, and weight.
- Final-output evaluation shows the model may select the discounted but suboptimal option.

Visual:

Create `/papers/tool-lab/study-31-discount-bias.png`.

Figure description:

Three coffee alternatives. One has the cheapest list price, one has a salient 20 percent discount, and one has the best true value. Highlight how semantic salience competes with mathematical value.

## Slide 17: Study 3.2, Tool-Lab Design

Suggested component: `DiscountToolLabDesignSlide`

Title:

**More Attributes, More Planning Pressure**

Main message:

Discount evaluation requires a deeper information search because the model must acquire and integrate multiple attributes.

Content:

Critical attributes:

- `list_price`
- `discount_percentage`
- `weight`

Experimental factors:

- model size
- tool cost
- prompt objective: "best deal" vs. explicit value function

Visual:

Create `/papers/tool-lab/study-32-hidden-table.png`.

Figure description:

Hidden three-option table with the critical attributes visually grouped as a computation chain: list price and discount produce net price, then net price and weight produce unit value.

Interaction:

Add a "compute value" animation after the needed cells are revealed.

## Slide 18: Study 3.2, Results

Suggested component: `DiscountToolLabResultsSlide`

Title:

**Discounts Become Shortcuts Under Constraint**

Main message:

Tool-Lab reveals whether the model actually computes value or uses the discount cue as a shortcut.

Visuals:

Use or create:

- `/papers/tool-lab/study-32-choice-results.png`
- `/papers/tool-lab/study-32-search-results.png`

Figure descriptions:

Choice result figure:

Stacked bar chart showing optimal, discounted, and cheapest choices by model, tool cost, and prompt objective.

Search result figure:

Heatmap showing inspection rates for `list_price`, `discount_percentage`, and `weight` across conditions.

Table:

Optional result table:

| Model | Tool Cost | Prompt | Optimal Choice | Discounted Choice | Full Info Search |
| --- | ---: | --- | ---: | ---: | ---: |
| Gemini Flash Lite | 0 | Best deal | TBD | TBD | TBD |
| Gemini Flash Lite | 10 | Best deal | TBD | TBD | TBD |
| Gemini Pro | 0 | Value function | TBD | TBD | TBD |
| Gemini Pro | 10 | Value function | TBD | TBD | TBD |

## Slide 19: Capability Failure Or Rational Tradeoff?

Suggested component: `FailureModesSlide`

Title:

**Tool-Lab Separates Failure Modes**

Main message:

Final-answer evaluation often collapses distinct mechanisms. Tool-Lab can diagnose why an LLM succeeded or failed.

Content:

Failure modes:

- The model does not know which information matters.
- The model knows what matters but does not acquire it.
- The model acquires the information but fails to integrate it.
- The model rationally stops because the expected value of more information is too low.

Visual:

Create `/papers/tool-lab/failure-mode-tree.png`.

Figure description:

Decision tree for diagnosing an incorrect answer from the trace. Branches ask: Did it inspect relevant attributes? Did it compute correctly? Was the cost high enough to justify stopping?

Interaction:

Click through example traces and classify each failure mode.

## Slide 20: Evaluation Metrics

Suggested component: `MetricsSlide`

Title:

**What We Can Measure**

Main message:

Tool-Lab enables metrics for process quality, not only final task success.

Content:

Candidate metrics:

- final choice optimality
- cumulative tool cost
- net reward
- number of inspected cells
- critical information acquisition rate
- stopping time
- search order
- regret relative to optimal policy
- policy distance from an oracle or computed policy

Visual:

Create `/papers/tool-lab/metrics-dashboard.png`.

Figure description:

Compact metric panel for one model trace. Show final answer score, process cost, net utility, and regret relative to optimal.

Table:

| Metric | What It Captures | Why It Matters |
| --- | --- | --- |
| Accuracy | Final outcome | Standard benchmark score |
| Tool cost | Resource expenditure | Efficiency |
| Net reward | Accuracy minus cost | Resource rationality |
| Search depth | Amount of information acquired | Planning behavior |
| Regret | Gap from optimal policy | Policy quality |

## Slide 21: Training Implication

Suggested component: `TrainingSlide`

Title:

**Tool-Lab As A Training Environment**

Main message:

If Tool-Lab is an MDP, it can support reinforcement learning, imitation learning, and reward shaping for better tool-use policies.

Content:

Training possibilities:

- compute or approximate optimal policies for controlled tasks
- train models to imitate optimal search trajectories
- reward final answers and efficient information acquisition
- penalize unnecessary tool calls
- adapt policies to different resource constraints

Visual:

Use `/papers/tool-lab/rl-training-loop.png`.

Figure description:

Loop showing LLM policy interacting with Tool-Lab environment. The environment returns observations, costs, final reward, and trace-level feedback. A trainer updates the policy based on net reward or imitation targets.

Speaker note:

Emphasize that the optimal behavior is not always to call every tool. The model should learn when additional information is worth the cost.

## Slide 22: Generalization Beyond Marketing

Suggested component: `GeneralizationSlide`

Title:

**Many LLM Tasks Are Tool-Lab Problems**

Main message:

The same framework applies to any task where an LLM must acquire information sequentially under cost or uncertainty.

Examples:

- retrieval-augmented generation
- web search
- code debugging
- database querying
- legal or medical information gathering
- multi-step workflow automation
- interactive decision support

Visual:

Create `/papers/tool-lab/generalization-map.png`.

Figure description:

Central Tool-Lab MDP diagram with spokes to different agentic LLM domains. Each spoke shows hidden state, tool action, cost, and final task reward.

## Slide 23: Open Questions For NLP

Suggested component: `OpenQuestionsSlide`

Title:

**Open Questions**

Main message:

Tool-Lab opens several NLP research questions around tool-use evaluation, optimal stopping, and cost-aware reasoning.

Discussion prompts:

- How should we define optimal policies when the utility function is only partially known?
- Should tool-use benchmarks reward process efficiency even when final answers are correct?
- Can models learn transferable search policies across tasks?
- How do token-level reasoning costs relate to explicit tool-call costs?
- What forms of RL are most appropriate for training cost-aware tool use?

Visual:

No heavy figure needed. Use a structured discussion layout with five compact prompts.

Interaction:

Optional audience poll: "Which cost should evaluation include first: tool calls, tokens, latency, or money?"

## Slide 24: Closing

Suggested component: `ClosingSlide`

Title:

**From Answer Accuracy To Policy Optimality**

Main message:

Tool-Lab shifts the evaluation target for LLM agents from final answers to the quality of the policy used to acquire information and make decisions under constraints.

Closing statement:

Future LLM systems will not only generate answers. They will search, call tools, spend tokens, incur latency, and act under uncertainty. Tool-Lab gives us a controlled way to evaluate and train that behavior.

Visual:

Reuse a simplified version of `/papers/tool-lab/tool-lab-mdp-diagram.png`, ending on the phrase:

**Evaluate the policy, not just the answer.**

## Optional Appendix Slides

### Appendix A: Full Study Design Table

Suggested component: `StudyDesignTableSlide`

Purpose:

Show all experimental factors for the Tool-Lab studies.

Table:

| Study | Bias / Task | Models | Tool Cost | Prompt Condition | Main Outcome |
| --- | --- | --- | --- | --- | --- |
| 2.1 | Price truncation | Gemini models | None | Standard choice | Final bias |
| 2.2 | Price truncation | Gemini models | 0 vs. 10 | Standard Tool-Lab | Search and choice |
| 3.1 | Discount framing | Gemini models | None | Standard choice | Final bias |
| 3.2 | Discount framing | Gemini models | 0 vs. 10 | Deal vs. value function | Search and choice |

### Appendix B: Prompt And Tool Schema

Suggested component: `PromptSchemaSlide`

Purpose:

Show the exact Tool-Lab system prompt and tool schema in a readable code panel.

Visual:

Code block with:

```text
You are a subject in a Tool-Lab decision experiment.
You can use the available tools to gather information or make a decision.
At any point you can record your final decision by calling submit_choice.
You cannot call tools concurrently.
Each time you can call ONLY one tool maximum.
You may reveal any cell with inspect_cell.
```

Also show simplified function signatures:

```ts
inspect_cell(option_id, attribute_id)
submit_choice(option_id)
```

### Appendix C: Optimal Policy Computation

Suggested component: `OptimalPolicyComputationSlide`

Purpose:

Give the technical audience more detail about how an optimal policy could be computed.

Content:

- Define finite state space from revealed or hidden cells.
- Define action set as possible inspections plus submission choices.
- Define reward as task utility minus cumulative cost.
- Use dynamic programming, value iteration, or simulation-based approximation depending on state size.
- Compare observed LLM trajectories against the optimal policy.

Visual:

Create `/papers/tool-lab/value-iteration-schematic.png`.

Figure description:

Small state tree showing inspect actions and submit actions, with values propagated backward from terminal choices.

### Appendix D: Relation To MouseLab MDP

Suggested component: `MouseLabConnectionSlide`

Purpose:

Explain the conceptual inspiration from MouseLab MDP.

Content:

- MouseLab MDP studies human information acquisition during planning.
- Tool-Lab adapts this idea to tool-calling LLM agents.
- The key shared idea is that information search itself is observable behavior.

Visual:

Create `/papers/tool-lab/mouselab-to-toollab.png`.

Figure description:

Side-by-side comparison: human reveals information in MouseLab MDP; LLM reveals information through tool calls in Tool-Lab.

## Implementation Checklist

- Create `page.tsx` route for Tool-Lab interactive presentation.
- Create `_components/` directory under `src/app/(papers)/papers/tool-lab/`.
- Implement shared layout components: navigation, slide shell, figure card, code panel, metric panel.
- Start with static slides, then add interactivity to the Tool-Lab table and trajectory slides.
- Use existing assets first:
  - anchoring literature image
  - mediation diagram
  - GPT 5.5 efficiency image
- Create new assets as needed in `/public/papers/tool-lab/`.
- Keep citations and detailed paper tables in appendix slides unless needed for the main story.
