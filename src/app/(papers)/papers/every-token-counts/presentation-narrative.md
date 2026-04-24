Given the rise of AI models from various countries, specifically China, there's a growing concern among North American populations about the reliability of such models, especially when it comes to political biases and agenda.

A common question LLM users ask is "can I trust Chinese models?"

In this research, we explore ethnocentrism of large language models.

Ethnocentrism, also known as in-group bias, is a phenomenon where a particular group will favor its own country and would have a disregard for foreign countries.

Although the concept was developed for consumer behavior, ethnocentrism has been extended to political science, sociology, and psychology.

Prior LLM bias research has documented political leanings, cultural stereotypes, and Western-centric defaults in language models. However, these studies tend to focus on surface-level outputs -- asking models to generate text and then coding the result -- rather than measuring the underlying attitudinal structure systematically. This means we know bias exists, but we have limited ability to quantify it, compare it across models, or trace its sources.

To answer whether LLMs are ethnocentric in a rigorous, comparable way, we face three distinct methodological barriers.

Current evaluation of large language models mainly focuses on testing LLMs using vignettes, Which are short scenarios presented to LLMs and they are asked to make a decision based on the condition.
Although useful in showing evidence of a particular behavior, to systematically analyze behavior, we require fully crossed experiments that are carefully designed to separate influence of different factors and quantify their effect sizes.

Moreover, attitudes and beliefs are commonly measured through rating scales, the most popular one being Likert scales, which are ordinal variables. LLMs, however, produce next-token probabilities that are categorical.

Traditional measures such as entropy fail for ordinal variables because they do not account for the ranking of the different responses ("1" and "7" are treated the same).

A design choice that is popular in current evaluation of large language models is Monte Carlo sampling. LLMs are sampled multiple times with non-zero temperature, and the result of these samples are aggregated to measure LLM behavior.

This poses another limitation.

Sampling as a method has been borrowed from behavioral sciences for humans. In human behavioral sciences, since the underlying distribution of the population is unknown, we have no choice but to sample to approximate the population.
With LLMs on the other hand, the next token probability distribution is known.
Therefore, sampling is unnecessary and it also obscures the underlying exact distribution.

In this work we formulate a framework for behavioral evaluation of large language models using Likert scales.

We use the exact probability distribution to compute a measure of consensus. We also use an ANOVA style factorial decomposition to statistically test the effect size of different factors (e.g., country-of-origin, LLM size) in a fully crossed design.
A major distinguishing factor of this research is that we propagate the aleatoric uncertainty of next token probability throughout the analysis all the way to the factors. As a result, our framework does not suffer from epistemic uncertainties.


First, we formalize the experimental design.
To identify the effect of different factors (model country-of-origin or target country) on the behavior of LLMs, We assume a fully cross-factorial design where every level of each factor is crossed with every level of every other factor.

In our ethnocentric study, We cross each LLM tested against every target country.

Next, we present the Likert scale adapted to each Target Country to every LLM.
Liker scales are typically consisted of multiple items on a predefined scale (e.g., 1 to 7). 
For the CETScale, we have 17 items that measure ethnocentrism.

We collect next token probabilities from the LLMs, by asking them to produce a number on the allowed range.

We follow a three-layer process: Constraint, Consensus, and Construct layers.

Constraint Layer:

In layer 1, we identify those probabilities that contain the valid tokens (i.e., "1", "2", ..., "7").
This gives us a measure of task adherence of the LLMs.

We compute Failure rate, which measures the extent to which the LLM can adhere to the constraints in the prompt. Intuitively: if a model is asked to respond with a number from 1 to 7 but instead produces tokens like "strongly" or "agree", that response cannot be used -- it fails the constraint. Formally:

$$1-\sum_{t\in\mathcal{V}_{\mathrm{val}}}P_{\mathrm{raw}}(t\mid x)$$

We continue our analysis (Layer 2 and 3) on the renormalized distribution of tokens that adhere to the constraints.
This is similar to how behavioral scientists exclude participants that do not adhere to the task instructions.

Consensus Layer:
Next we measure the consensus of the LLM responses across the items in the scale. 
Traditional measures of dispersion such as entropy assume categorical values.
They are agnostic to the distances of responses.
To remedy this, we use a multidimensional consensus measure. Intuitively: if a model assigns most probability mass near one end of the scale and almost none at the other, that is high consensus -- a strong, clear attitude. If probability is spread across both ends, that is dissension -- the model is effectively conflicted. The formula captures this by penalizing spread in proportion to the ordinal distances between responses:

$$\mathrm{Cns}(\mathbf{Y}_{\boldsymbol{\lambda}})=1+\sum_{\mathbf{y}\in\mathcal{Y}^K}P(\mathbf{y})\log_2\!\left(1-\frac{\|\mathbf{y}-\boldsymbol{\mu}\|_2}{d_{\max}}\right)$$

This demonstrates the level of internal consistency -- or polarization -- a model has on our ethnocentrism scale.

Figure/table from paper showing consensus
\ref{tab:consensus-dissension-visual}

{fig:consensus-original-issue}

Construct Layer:

In the final layer we measure the construct of interest. Behavioral evaluation of LLMs are typically constrained to descriptive statistics. Although useful for demonstrating patterns, they lack the ability to test statistically significance and effect size of different factors.

To overcome this limitation we adapt Analysis of Variance (ANOVA) for the analysis of LLM behavior using exact probability distributions.

This allows us to systematically answer three critical questions: (1) whether the behavioral shift between conditions is statistically significant, (2) isolated from confounding variables, what the exact effect size and magnitude of that shift is, and (3) how experimental factors interact to jointly shape the model's behavior.

Measuring behavior of Human participants using Likert scales are typically done by aggregating the items through standard arithmetic means.
This aggregation collapses variability of each item's responses and gives a final value that masks the variability of those responses.

In our framework, we preserve those variabilities by taking the convolution of each item's probability distribution. This creates a composite latent score. 

We decompose this latent score based on each factor in our experiment and their interactions.

Using Hoeffding decomposition we decompose the composite Likert score into the grand mean, main effects, and interactions. Intuitively: this is the same logic as a two-way ANOVA in human studies -- we want to know how much of the total variation in ethnocentrism scores is explained by which model we used, which target country we used, and whether those two factors interact. The key difference here is that we work with exact probability distributions, not sampled data points. Formally:

$$\mathbb{E}[S_{\boldsymbol{\lambda}}]=\mathbb{E}[S_0]+\sum_{c \in \mathcal{C}} \mathbb{E}[E_c(\lambda_c)]+\sum_{|U| \ge 2} \mathbb{E}[E_U(\boldsymbol{\lambda}_U)]$$

This Hoeffding decomposition guarantees that the expected values of the derived probability distribution are equal to the fixed effect parameters in traditional human ANOVA experiments, which we prove in Theorem 1.

Grand mean shows the baseline behavior across all conditions.

Main effect (e.g., LLM country-of-origin) shows the effect size of a given factor.

Interactions show whether a particular factor shows different effect based on the levels of another factor.
Our research question requires analyzing an interaction between the country of origin of LLMs and the target country.
For instance, we need to see whether a Chinese model attitude towards American products is more negative than its attitude towards Chinese products.


Since we are working with actual probability distributions, we do not have the traditional p-values to test hypotheses. instead we use four key metrics:
1. Mean shift ($\mathbb{E}[E]$): is the expected value of the distribution which represents the effect size of the effect. 
2. Predictive Dispersion ($\mathrm{SD}(E)$): is the standard deviation of the effect distribution that captures the aleatoric uncertainty.
3. Discrete Probability of Direction ($\mathrm{dPD}$): measures the directionality of the effect. It tells us the probability that effect appear in the positive or the negative direction.
4. Signal-to-Noise Ratio ($\mathrm{SNR}$): Calculated as $|\mathbb{E}[E]|/\mathrm{SD}(E)$, shows us whether the effect is mainly due to the model's distribution uncertainty or is it consistent effect.

# Experiment:
Models tested (Factor 1):
1. Llama~3.3~70B and Gemma~3~27B (USA)
2. Qwen3~Next~80B (China)
3. Aya~Expanse~32B (Canada)
4. Ministral~14B (France)

Target country (Factor 2):
1. USA
2. China
3. Canada
4. France

Show user-message template with the diagram in the appendix. \ref{fig:prompt-setup}

# Results

**Step 1: Data quality -- Constraint and Consensus**

Before interpreting attitudes, we need to verify that the models were actually doing the task.

Most models adhere to the task constraints with low failure rates -- they reliably respond with a digit on the 1-7 scale. Ministral is the exception, showing small but consistent failure across conditions, which we carry forward as a caveat on its results.

figures/failure_rate.png

For consensus, all models except Ministral show high internal agreement: their responses cluster strongly on one end of the scale rather than spreading across it. This tells us we are not looking at random noise -- these models have clear, consistent attitudes. Ministral again stands out, showing conflicting internal responses that vary by target country, suggesting it does not form a stable attitudinal position.

figures/exp-cns.png

**Step 2: Calibrating against the human baseline**

Before we can say whether a model is ethnocentric, we need a reference point. We compare model CETScale scores to large-scale human survey data.

tab:cetscale-human-llm-comparison

The comparison is striking: most models score in the range of the most ethnocentric human populations ever recorded. To put that in concrete terms -- models are not sitting at a moderate or neutral position on this scale; they are at the extreme end of what we observe in humans.

**Step 3: Main effects and interactions**

With the baseline established, we can now look at what drives the variation.

We can also explore the raw probability distributions of each model across each target country condition.

fig:specific-pmf-2

Analyzing the main effect of the LLM factor, Aya-32B sits significantly above the baseline -- among the most ethnocentric of any model or human population tested. Qwen3-80B, by contrast, falls well below, aligning with the most liberal human populations.

\ref{tab:main-effects}

For target countries, the main effect is also pronounced: most models show lower favorability toward China as a target country -- and the effect holds even for the Chinese model, Qwen3-80B. This is arguably the most surprising finding in the paper.

The interaction tells the directional story: North American models favor North American target countries and are most averse to China. The effect is not symmetric -- Chinese models do not show a reciprocal in-group preference of comparable magnitude.

figures/interactions.png

# Implications: So, can you trust Chinese models?

The answer from our data is nuanced. Qwen3-80B is actually the least ethnocentric model in our experiment -- less biased toward any country than the North American or Canadian models tested. If anything, the in-group favoritism we observe is stronger in North American models than in the Chinese one.

But that does not mean LLMs are safe. The deeper finding is that all models, regardless of country-of-origin, are operating at the ethnocentric extreme of the human distribution. The question should not be "can I trust Chinese models?" -- it should be "can I trust LLMs at all for tasks where in-group bias matters?"

Our framework gives researchers and practitioners a principled tool to answer exactly that question -- with exact distributions, no sampling error, and full decomposition of which factors drive the bias.

