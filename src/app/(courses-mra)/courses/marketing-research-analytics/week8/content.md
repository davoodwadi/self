---
topic: Experiments and A/B Testing
lecturer: "Davood Wadi, PhD"
course: Marketing Research & Analytics
week: week8
---

## Title Slide
- Week 08
- Experimentation is the principal method by which marketing research establishes cause and effect.

## Causality in Marketing Research [no-exercise]
- Many marketing decisions depend on a causal question, such as whether a price reduction increases sales or whether a new advertisement increases purchase intention.
- Descriptive research, introduced in Week 2, can establish that two variables are associated, but not that one causes the other.
- In the scientific sense, causality is probabilistic: a cause makes an effect more likely, but does not guarantee it.
- Marketing outcomes typically have several causes, so that research establishes whether a particular factor is one of them and estimates the size of its effect.

## Conditions for Causality [exercise]
- Three conditions must be satisfied before a causal inference can be drawn.
- Concomitant variation: the presumed cause and the presumed effect vary together, as when stores with more in-store promotion have higher sales.
- Time order: the cause occurs before or at the same time as the effect, and not after it.
- Elimination of other possible causes: other factors that could explain the effect are ruled out, such as the possibility that stores with more promotion are also located in busier areas.
- Satisfying all three conditions does not prove causality with certainty, but it provides strong evidence for it.

## Elements of an Experiment [no-exercise]
- In an experiment, the researcher manipulates one or more independent variables and measures their effect on one or more dependent variables, while controlling extraneous variables.
- Independent variables, also called treatments, are the variables manipulated by the researcher, such as price level or advertising message.
- Dependent variables are the outcomes measured, such as sales, click-through rate, or purchase intention.
- Test units are the entities exposed to the treatments, such as consumers, stores, or geographic regions.
- Extraneous variables are variables other than the treatments that could affect the dependent variable, such as the season or the characteristics of the test units.
- The treatment group receives the treatment, and the control group does not, or receives the current version.
- A manipulation check is a measure that verifies whether participants perceived the treatment as intended, such as asking participants which price they saw.

## Random Assignment [no-exercise]
- In random assignment, chance alone determines the group of each test unit, and each test unit has a known, planned probability of being assigned to each group, usually an equal one.
- Random assignment makes the groups equivalent, on average, on all characteristics, including characteristics that the researcher has not measured.
- A difference in the dependent variable between randomly assigned groups can therefore be attributed to the treatment, within the limits of sampling variation.
- Random assignment differs from the random sampling introduced in Week 5. Random sampling determines who is studied and supports generalization to the population. Random assignment determines who receives which treatment and supports causal inference.

## Part 2: Validity and Experimental Settings [no-exercise]
- An experiment is evaluated by two criteria: internal validity and external validity.
- Internal validity concerns whether the observed effect was caused by the treatment.
- External validity concerns whether the effect generalizes beyond the experiment.

## Threats to Internal Validity [exercise]
- History refers to external events that occur during the experiment and affect the dependent variable, such as a competitor's price reduction during a test of a new promotion.
- Maturation refers to changes within the test units over time, such as growing fatigue or familiarity with the product.
- Testing effects occur when an initial measurement influences later measurements, as when a pretest questionnaire draws respondents' attention to the advertisement being tested.
- Instrumentation refers to changes in the measurement procedure, such as a change in the definition of a conversion during the test.
- Selection bias occurs when the groups differ before the treatment, as when stores volunteer to take part in a test.
- Mortality, or attrition, occurs when test units leave the experiment at different rates across groups.
- Random assignment and a control group address most of these threats.

## External Validity [no-exercise]
- External validity is the extent to which the results of an experiment can be generalized to other people, settings, and times.
- Results obtained with student participants may not generalize to the consumers in the target market.
- Results obtained in an artificial setting may not generalize to the conditions under which consumers actually make decisions.
- Results obtained in one season or market may not hold in another.
- Measures taken to increase internal validity, such as tightly controlling the setting, often reduce external validity.

## Laboratory and Field Experiments [exercise]
- A laboratory experiment is conducted in an artificial environment constructed by the researcher, such as a simulated store or an online study with a panel of respondents.
- Laboratory experiments offer strong control over extraneous variables, and therefore high internal validity, at relatively low cost.
- A field experiment is conducted in a natural setting, such as actual stores, websites, or markets, often without participants being aware of the experiment.
- Field experiments conducted without participants' awareness raise the questions of informed consent and harm introduced in Week 1, and are subject to the same ethical standards as other research.
- Field experiments offer higher external validity, since behavior is observed under real conditions, but less control over extraneous variables.
- The two are frequently combined: a laboratory experiment identifies promising treatments, and a field experiment confirms their effect in the market.

## Experimental Designs [no-exercise]
- In a posttest-only control group design, test units are randomly assigned to a treatment group and a control group, and the dependent variable is measured once, after the treatment.
- In a pretest-posttest control group design, the dependent variable is also measured before the treatment, which allows change to be measured but introduces the possibility of testing effects.
- In a factorial design, two or more independent variables are manipulated simultaneously, and every combination of their levels is tested.
- For example, a two-by-two factorial design tests two price levels combined with two advertising messages, producing four treatment conditions.
- Factorial designs reveal interactions, in which the effect of one independent variable depends on the level of another, as when a quality-focused message is effective only at the higher price.

## Discussion: Testing a New Package
- Discussion: A beverage company must choose between two new package designs before a national launch. Should the choice be based on a laboratory experiment, a field experiment, or both? Which threats to internal and external validity would each design face?

## Part 3: A/B and Multivariate Testing [no-exercise]
- Digital channels allow firms to conduct field experiments continuously and at large scale.
- A/B testing is now the most widely used form of field experimentation in digital marketing.
- It applies the principles of experimental design introduced in this week to websites, applications, emails, and advertisements.

## A/B Testing [no-exercise]
- An A/B test is a randomized field experiment in which users are randomly assigned to one of two versions of a digital asset.
- Version A is usually the current version and serves as the control. Version B contains the change being tested.
- Each test has a primary metric, such as the conversion rate, the click-through rate, or the average order value, specified before the test begins.
- Because users are randomly assigned, a statistically significant difference in the primary metric can be attributed to the change.
- The difference is tested with the procedures introduced in Week 7.

## Designing an A/B Test [exercise]
- The analyst first states the hypothesis and specifies the primary metric.
- The analyst then determines the required sample size and duration, according to the smallest effect that would be of practical importance and the desired statistical power.
- The analyst then configures the random assignment of users to the two versions.
- The test then runs for the full planned duration, including at least one complete weekly cycle, without being stopped early.
- The analyst then tests the difference in the primary metric and reports the effect size and its confidence interval.
- Finally, the decision and its rationale are documented, including tests that produced no significant difference.

## Multivariate Testing [no-exercise]
- A multivariate test changes several elements of a page or message simultaneously and tests every combination of their versions.
- It is the digital application of the factorial design.
- For example, three headlines, two images, and two button labels produce twelve combinations.
- Multivariate testing reveals interactions among elements, which a sequence of separate A/B tests cannot reveal.
- Because traffic is divided among many combinations, multivariate tests require much larger samples than A/B tests.

## Common Errors in A/B Testing [no-exercise]
- Stopping a test as soon as the result becomes significant, known as peeking, increases the probability of a Type I error, in the same manner as the p-hacking practices introduced in Week 7.
- Examining many metrics and reporting the one that differs increases the probability of a false finding.
- A novelty effect occurs when users respond to a change because it is new, so that the effect declines over time.
- A sample ratio mismatch occurs when the numbers of users in the two groups differ substantially from the planned allocation, which indicates a fault in the random assignment.
- Tests that run for only a few days may not represent the behavior of users across the full weekly cycle.

## Part 4: Quasi-Experiments [no-exercise]
- Random assignment is not always possible.
- A firm may introduce a price change in one region only, renovate selected stores, or launch a national television campaign that reaches every consumer.
- In such cases, the researcher uses a quasi-experimental design, which applies experimental logic without full control over the assignment of treatments.

## Quasi-Experimental Designs [exercise]
- In a time series design, the dependent variable is measured repeatedly before and after the treatment, and a change in its level or trend at the time of the treatment is taken as evidence of an effect.
- In a nonequivalent control group design, the treatment group is compared with a group that did not receive the treatment but was not randomly assigned.
- In a difference-in-differences design, the change in the treatment group before and after the treatment is compared with the change in a control group over the same period.
- For example, a retailer introduces a loyalty program in Region A but not in Region B. Average weekly sales per store rise from 100,000 to 112,000 dollars in Region A and from 100,000 to 105,000 dollars in Region B over the same period.
- The estimated effect of the program is the difference between the two changes: 12,000 minus 5,000, or 7,000 dollars per store per week.

## Limitations of Quasi-Experiments [no-exercise]
- Because the groups are not randomly assigned, they may differ in ways that affect the dependent variable.
- The difference-in-differences design assumes that, without the treatment, both groups would have followed the same trend. This assumption is examined by comparing the trends of the two groups before the treatment.
- Events that affect only one group during the study period, such as the opening of a competitor's store in Region A, threaten the validity of the estimate.
- Quasi-experiments therefore provide weaker evidence of causality than randomized experiments, and their assumptions are stated in the report.

## Part 5: AI in Experimentation [no-exercise]
- AI is used in experimentation in two distinct ways.
- AI agents can serve as simulated subjects for piloting an experiment before it is conducted with real participants.
- Adaptive algorithms can allocate users among versions during a test, according to their performance.

## Piloting Experiments With Simulated Subjects [exercise]
- An AI agent is instructed to respond as a participant with a specified profile, and is presented with the experimental instructions, the stimuli, and the measures.
- Such pilots can reveal unclear instructions, stimuli that fail to convey the intended difference, and manipulation checks that do not work.
- Pilots with simulated subjects are fast and inexpensive, and can be repeated with many variations of the design.
- The responses of simulated subjects are not evidence of how consumers respond. They share the limitations of the synthetic respondents introduced in Week 5.
- The experimental materials may also reveal the hypothesis to the model, so that its responses conform to the expected result, which can exaggerate or distort treatment effects.
- A pilot with simulated subjects therefore precedes an experiment with real participants and does not replace it.

## Multi-Armed Bandits [no-exercise]
- A multi-armed bandit is an adaptive algorithm that allocates users among several versions during a test, according to their observed performance.
- As evidence accumulates, the algorithm directs more users to the versions that perform better and fewer to those that perform worse.
- The algorithm balances exploration, which gathers information about every version, with exploitation, which directs users to the version that currently appears best.
- Many advertising and personalization platforms use bandit algorithms to select among creative versions automatically.

## A/B Tests and Bandits Compared [exercise]
- A bandit reduces the number of users exposed to inferior versions during the test, and therefore reduces its cost.
- A bandit is appropriate when the objective is to maximize performance during a short period, as with the headline of a news article or a promotion that lasts a few days.
- A fixed A/B test is appropriate when the objective is an accurate estimate of the size of an effect, or an understanding of why one version performs better.
- Because a bandit allocates users unequally and changes the allocation over time, its results do not support the same statistical inferences as a fixed A/B test.
- A version selected by a bandit is the best performer on the platform's chosen metric, which may differ from the firm's broader objectives, such as brand building or long-term customer value.

## Discussion: The Platform Has Chosen
- Discussion: An advertising platform's bandit algorithm selects one of five creative versions after two days and allocates nearly all impressions to it. The brand manager proposes to use this version in the firm's national television campaign. What does the platform's result establish, what does it not establish, and which additional evidence should be obtained?

## Part 6: Experiments on AI Agents [no-exercise]
- AI agents are also the subject of experiments, when the research question concerns how the agents themselves search, evaluate, and choose.
- Such experiments apply the principles of experimental design introduced in this week to the instructions, information, and alternatives that agents receive.

## Controlled Experiments on AI Agents [exercise]
- When an AI agent is the subject of research rather than a proxy for consumers, its responses are direct evidence about the agent's behavior.
- The system prompt is the set of instructions given to an agent before the consumer's request, usually by the firm or the researcher that deploys it.
- The factors manipulated in such experiments include the system prompt, such as the party the agent is told it serves; the consumer's instruction, such as the specificity of the goal; the information environment, such as the cost of acquiring an attribute; and the attributes of the alternatives, such as a sponsorship label.
- Factorial designs cross these factors to estimate their main effects and interactions.
- In one study, a 2 × 2 design crossed the cost of inspecting an attribute ($0.00 vs. $10.00) with the specificity of the goal ("find the best deal" vs. "find the coffee with the lowest price per ounce"), across eight models and 100 sessions per condition, for 3,200 sessions in total (Wadi & Ma, 2026b).
- The order of alternatives and attributes is randomized across sessions, and the design is replicated across models, providers, and wordings of the prompt.

## Process Tracing With AI Agents [exercise]
- An information board is a process-tracing method in which product attributes are hidden in the cells of a matrix, and the participant opens cells one at a time before choosing (Payne, Bettman, & Johnson, 1993).
- A tool is a function that an AI agent can call to retrieve information or perform an action, such as looking up the price of a product.
- The same method can be applied to AI agents by placing each attribute behind a tool that the agent must call to reveal it, at a cost that the researcher sets (Wadi & Ma, 2026b).
- The record of tool calls shows which attributes the agent acquired, in which order, and which it omitted before choosing.
- Process tracing separates two sources of a poor choice: failure to acquire the necessary information and failure to use it correctly.
- In a validation study, seven of eight agents given a fixed set of attributes selected the alternative implied by those attributes in nearly all sessions, and no agent made an arithmetic error when asked to calculate unit prices. Most poor choices therefore arose from incomplete information acquisition (Wadi & Ma, 2026b).

## Key Takeaways
- Causal inference requires concomitant variation, time order, and the elimination of other possible causes.
- Random assignment makes treatment and control groups equivalent on average, and supports the attribution of differences to the treatment.
- Internal validity concerns whether the treatment caused the effect; external validity concerns whether the effect generalizes; laboratory and field experiments trade one against the other.
- A/B and multivariate tests are randomized field experiments that require a primary metric, a planned sample size and duration, and no early stopping.
- Quasi-experimental designs, such as difference-in-differences, estimate causal effects when randomization is not possible, under stated assumptions.
- AI agents can pilot experimental materials but cannot replace real participants, and bandit algorithms optimize performance during a test at the cost of precise estimates of effect size.
- Controlled experiments on AI agents manipulate prompts, roles, and information environments in factorial designs, and process tracing separates failures of information acquisition from failures of information use.
