# Tool-Lab for an NLP Reading Group

## Core framing

Tool-Lab should be presented as a process-level evaluation framework for LLM agents.

The central claim is not just that LLMs display human-like cognitive biases. The stronger claim for an NLP audience is that these behaviors can be studied as policies in a constrained sequential decision problem. Tool-Lab lets us observe how an LLM gathers information, spends tool calls, trades off costs against expected value, and decides when to stop searching.

In this framing, the marketing setting is the controlled testbed. Coffee choices, prices, discounts, and product attributes are useful because they create simple decision environments with known ground truth. But the broader contribution is methodological:

> Tool-Lab turns LLM evaluation from final-answer scoring into process-level evaluation of tool-use policies under resource constraints.

## Audience assumption

The NLP Reading Group may not have much background in marketing, consumer behavior, or pricing psychology. The talk should therefore avoid leading with the marketing theory.

Instead, lead with questions that are already central to NLP and agentic AI:

- How should we evaluate tool-using LLMs?
- When is an LLM's short or incomplete search a failure, and when is it rational cost control?
- Can we compare an LLM's tool-use trajectory to an optimal planning policy?
- Can we use this environment to train better tool-use behavior with reinforcement learning?

The marketing examples should be introduced as clean, interpretable environments where the answer is mathematically knowable and the model's information search can be observed.

## Proposed narrative structure

### 1. Start with the evaluation gap

Most LLM evaluations focus on final outputs:

- Was the answer correct?
- Did the model choose the better option?
- Did a human evaluator prefer the response?
- Did the model pass the benchmark item?

This is increasingly incomplete for agentic LLMs. Modern models solve tasks by planning, calling tools, producing reasoning tokens, searching over hidden information, and deciding when to stop.

So the evaluation question should shift from:

> Did the model get the answer right?

to:

> Did the model use the right amount of computation and information to get the answer?

This sets up Tool-Lab as an evaluation framework for process quality.

### 2. Introduce cognitive biases as the motivating puzzle

LLMs have been shown to display many human-like cognitive biases, including anchoring, framing effects, and price-related heuristics.

The standard explanation is that these biases are inherited from human-generated training data. Because the training data contains biased human judgments, the model learns and reproduces those biases.

Tool-Lab asks a different question:

> Are these biases static artifacts of training data, or are they adaptive shortcuts that emerge when the model is solving a task under resource constraints?

This reframes bias as a window into the model's decision policy.

### 3. Explain resource rationality

The conceptual bridge is resource rationality.

Classical rationality assumes the agent should always choose the objectively best option. Bounded rationality says agents use shortcuts because they have limited computational capacity. Resource rationality goes one step further: a shortcut can itself be rational when computation, information, time, or money is costly.

For LLMs, the relevant resources are concrete:

- tool calls
- reasoning tokens
- latency
- context budget
- API cost
- search depth
- external information access

The key argument is:

> LLMs may appear biased because they are optimizing net utility, not raw answer accuracy.

In other words, a model may trade off better decisions against the cost of acquiring information needed to make those decisions.

### 4. Introduce Tool-Lab

Tool-Lab is a controlled environment for observing LLM information search.

The model is given a decision task. Product attributes are hidden. The model can reveal each attribute only by calling a tool such as `inspect_cell`. Each tool call can be free or costly. At any point, the model can stop searching and submit a final decision.

This creates an observable trace:

- which information the model requests
- in what order it requests information
- how much cost it incurs
- when it stops searching
- whether the final decision is optimal

The trace matters because two models can produce the same final answer through very different processes. One may compute the correct answer efficiently. Another may over-search, under-search, or rely on a heuristic that happened to work.

### 5. Formalize Tool-Lab as an MDP

For an NLP audience, this should be the technical center of the talk.

Tool-Lab can be represented as a Markov decision process:

- **State:** the information revealed so far, the remaining hidden attributes, cumulative cost, and current task context.
- **Actions:** inspect a hidden cell, call another tool, or submit a final answer.
- **Transition:** a tool call reveals information and updates the state.
- **Cost:** each action may consume money, tokens, latency, or another resource.
- **Reward:** final task utility minus the cost of information acquisition.
- **Policy:** the LLM's sequence of tool calls and stopping decisions.
- **Optimal policy:** the strategy that maximizes expected reward under the task constraints.

This makes Tool-Lab more than an experimental interface. It becomes a way to compare LLM behavior against optimal or boundedly optimal planning strategies.

The central evaluation metric becomes:

> How close is the LLM's tool-use policy to the optimal policy for this constrained decision problem?

### 6. Present the empirical studies as demonstrations

The studies can then be presented as evidence that Tool-Lab reveals process-level mechanisms behind biased outputs.

#### Study 2.1: LLMs show a price-truncation bias

LLMs prefer options with lower whole-dollar prices even when another option has better economic value.

For the NLP audience, the point is simple:

> The final output shows a systematic deviation from mathematical optimality.

#### Study 2.2: Tool-Lab reveals the process

When the relevant price and weight information is hidden behind tool calls, Tool-Lab shows whether the model actually gathers the information needed to compute the optimal choice.

Under high tool costs, larger models strategically truncate information search. They may skip precise attributes such as cents or weight, then fall back on a simpler price heuristic.

The key message:

> The biased output is mediated by the model's information-search policy.

#### Study 3.1: LLMs respond to discount framing

LLMs can prefer products with salient discounts even when the discounted product is not the best value.

For the NLP audience, this is another example of final-output bias in a controlled environment.

#### Study 3.2: Tool-Lab again identifies the mechanism

When evaluating discounts requires acquiring list price, discount percentage, and weight, the model must decide whether the expected benefit of deeper search is worth the tool cost.

Tool-Lab makes it possible to observe whether the model computes true value or relies on the discount cue as a shortcut.

The key message:

> Tool-Lab can distinguish a capability failure from a cost-sensitive search strategy.

### 7. Position the contribution

For this audience, the contributions should be stated in NLP terms.

First, Tool-Lab is an evaluation framework for agentic LLMs. It measures not just final accuracy, but the efficiency and adaptiveness of the process used to reach the answer.

Second, Tool-Lab provides diagnostic value. It can distinguish between different failure modes:

- the model does not know what information is relevant
- the model knows what is relevant but chooses not to acquire it
- the model acquires the right information but fails to integrate it
- the model makes a resource-rational tradeoff that sacrifices accuracy to reduce cost

Third, Tool-Lab creates a training environment. Because the task can be represented as an MDP, we can compute or approximate optimal policies and use them to train LLM agents.

### 8. Emphasize the reinforcement learning angle

The most forward-looking part of the talk should connect Tool-Lab to reinforcement learning.

If many LLM tasks can be represented as constrained sequential decision problems, then Tool-Lab can support training objectives such as:

- reward models that score both final answers and process efficiency
- reinforcement learning over tool-use policies
- imitation learning from optimal or near-optimal policies
- cost-aware tool-use training
- adaptive policies that change behavior as resource constraints change

The important point is that the optimal behavior is not always "call every tool." If tools are costly, the optimal policy may stop early, inspect only high-value attributes, or use a heuristic when the value of additional information is too low.

So Tool-Lab can train models to answer a more realistic question:

> Given the task, uncertainty, and resource constraints, what is the optimal next action?

### 9. End with the broader research agenda

The closing should move from the specific studies to the general agenda.

Many real LLM tasks involve sequential information acquisition:

- web search
- retrieval-augmented generation
- code debugging
- database querying
- medical or legal information gathering
- multi-step tool use
- interactive decision support

In these settings, final answer accuracy is not enough. We need to know whether the model planned well, searched efficiently, and adapted to the cost structure of the environment.

Tool-Lab provides a way to study that problem in a controlled setting.

## Suggested talk title

**Tool-Lab: Evaluating LLM Tool Use as Resource-Rational Planning**

Alternative titles:

- **From Answer Accuracy to Policy Optimality**
- **Evaluating LLM Agents Through Cost-Aware Tool Use**
- **Are LLM Biases Failures, or Resource-Rational Shortcuts?**
- **Tool-Lab: An MDP Framework for Evaluating and Training LLM Agents**

## One-sentence pitch

Tool-Lab is a process-level evaluation framework that treats LLM tool use as a constrained sequential decision problem, allowing us to compare model behavior against optimal policies and train more resource-rational agents.

## Recommended slide arc

1. Final-answer benchmarks are insufficient for tool-using LLMs.
2. Agentic LLMs must decide what information to acquire, when to stop, and how much cost to incur.
3. Cognitive biases provide a useful puzzle: are they inherited defects or adaptive shortcuts?
4. Resource rationality gives the theoretical lens.
5. Tool-Lab makes the model's information-search process observable.
6. Tool-Lab can be formalized as an MDP.
7. Study 2.1: LLMs show price-truncation bias.
8. Study 2.2: Tool-Lab shows that search truncation mediates the bias.
9. Study 3.1: LLMs show discount-framing bias.
10. Study 3.2: Tool-Lab shows when discount cues become cost-saving heuristics.
11. Implication for evaluation: score policy quality, not just final answers.
12. Implication for training: use MDPs, optimal policies, and RL to improve tool-use behavior.
13. Broader agenda: cost-aware, process-level evaluation for LLM agents.

## What to de-emphasize for this audience

The marketing paper's consumer and pricing details should remain in the background.

De-emphasize:

- detailed pricing psychology
- the principal-agent triad
- marketing strategy implications
- consumer welfare framing
- fine distinctions between specific promotional mechanisms

Keep:

- simple product-choice examples
- hidden information
- tool calls
- cost manipulation
- optimal vs. observed search policies
- resource-rational explanation
- MDP and RL implications

## Suggested closing

Tool-Lab shifts the evaluation target for LLM agents.

The question is no longer only:

> Did the model get the right answer?

The better question is:

> Did the model follow an efficient policy for acquiring information and making a decision under resource constraints?

That shift matters because future LLM systems will not only generate answers. They will plan, search, call tools, spend money, consume tokens, and act under uncertainty. Tool-Lab gives us a controlled way to evaluate and train that behavior.
