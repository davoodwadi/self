large language models have been shown to display cognitive biases.

A large number of human cognitive biases have been replicated in LLMs.

One example anchoring bias has been replicated in LLMs.

Give example of anchoring bias replication:

Anchoring bias in LLMs prompt that induces anchoring bias:anchoring-literature.png


Cognitive biases in LLMs have been attributed to the biases present in the training data.

The common belief for the existence of these biases is that because the training data is human generated, it contains cognitive biases that LLMs learn and replicate.

Here's a highly cited quote for this:
"...the clichés and biases exhibited by LLMs, emphasizing that the presence of these biases is not due to the models’ mental capacities but due to the data they are trained on." 
Macmillan-Scott, O., & Musolesi, M. (2024). (Ir) rationality and cognitive biases in large language models. Royal Society open science, 11(6).



Moreover, it has been shown that larger LLMs and newer LLMs show stronger cognitive biases.

While we expect newer and larger LLMs to be more intelligent, this creates a paradox.

In this research we go beyond demonstrating various biases of the LLMs by showing the process through which LLMs make seemingly biased decisions.
We challenge the assumption that cognitive biases are due to the training data. We find strong evidence that these are actually resource rational mechanisms through which the LLM balances the limited computation cost with the available information.


In jams_manuscript.qmd we have the full paper.

framework: mediation2-no-prompt.drawio.png


Go through Study 2.1: shows the bias
description of Tool-Lab paradigm.
Study 2.2: shows the process is resource rationality

Then say for contextual validity and generalisability, we test another common type of bias:
discount framing.
Study 3.1: shows evidence of the bias
Study 3.2: shows the process is resource rationality

The key driving point is similar to how with humans we had the theory of pure rationality, which was replaced by bounded rationality, and now the state-of-the-art theory is resource rationality,
We argue the same for large language models. We say large language models are resource rational and evidences of bounded rationality that we see is because they are optimizing a utility function whose objective is to maximize the value while minimizing the cost. This leads to cognitive biases.
We find evidence through tool control experiments for resource rationality.


# Why this matters
1. Seemingly suboptimal behavior of LLMs are actually quite rational. We only have to account for their resource constraints.
2. Evaluation of LLMs using different benchmarks. Look at the correct versus incorrect answers, which lacks nuance.
We have seen recent acknowledgement of this limitation by open AI.
Their new model, GPT 5.5, is advertised as being more efficient, solving the same task using fewer tokens: 
GPT 5.5-Artificial Analysis Intelligence Index.png

The issue is, there's no systematic evaluation method to measure the optimality of the planning of LLMs.

We introduce Tool-Lab.
It is inspired by MouseLab MDP (Callaway et al. 2022).
Callaway, F., Van Opheusden, B., Gul, S., Das, P., Krueger, P. M., Griffiths, T. L., & Lieder, F. (2022). Rational use of cognitive resources in human planning. Nature human behaviour, 6(8), 1112-1125.

MouseLab MDP uses information retrieval pattern of humans to understand how efficient their planning is.
Research has shown human planning closely resembles an optimal decision making, even under tight constraints.

Using Tool-Lab, We propose that the planning of LLMs can be similarly measured and compared against optimal planning strategies.

This provides us an evaluation framework where we can see not just whether the LLM makes the correct decision or not, but how efficient it is in making that decision.

Given that a large number of problems can be formulated as a Markov decision process,
We can turn a lot of problems into an MDP, compute the optimal solution to that MDP, and then use reinforcement learning to train the model to call the optimal sequence of tools To solve the task efficiently.

We can also introduce the tool costs that can help augmenting resource rationality of LLMs.
In other words, this would help the model solve the task given the constraints and we can then manipulate the constraints and have the LLM adapt to the constraint decision-making process.

