---
topic: "Foundations of AI and Machine Learning in Business"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week1"
---

## Title Slide
- Week 1
- Artificial intelligence reduces uncertainty in business decisions by learning statistical patterns from historical data.

## The Role of AI in Business Decisions [no-exercise]
- Managerial decisions are made under uncertainty.
- A lender who reviews a loan application does not know in advance whether the borrower will default.
- A retailer who orders seasonal inventory does not know in advance how many units each store will sell.
- Artificial intelligence reduces this uncertainty by estimating unknown outcomes from historical records.
- The value of an AI system depends on whether its predictions improve the decisions of the organization.

## Prediction Versus Judgment [exercise]
[figure: operational decision flow from historical records to model prediction, managerial judgment, action, and outcome feedback]
- A decision can be separated into two components: prediction and judgment.
- Prediction is the estimation of an unknown fact or future event from available data.
- Judgment is the assignment of value to the possible outcomes of an action, including the cost of each type of error.
- Machine learning systems perform prediction at scale.
- Managers supply the judgment that determines which action to take when a prediction is given.

## Part 1: From Explicit Rules to Statistical Learning [no-exercise]
- Computers can process business data in two ways: by following explicit rules written by programmers, or by learning patterns from examples.
- Distinguishing the two approaches clarifies which business tasks are suited to machine learning and which are better served by standard software.

## Rule-Based Software Versus Machine Learning [exercise]
[figure: contrasting pipeline of rule-based software (inputs plus explicit rules producing an output) and machine learning (inputs plus historical outcomes training a model)]
- In rule-based software, a programmer states the exact conditions that determine the output.
- Payroll calculation, tax withholding, and inventory accounting operate on explicit rules because the governing formulas are known in advance.
- Rule-based software fails when the relationship between inputs and outcomes is too complex to state as a list of rules, as in credit fraud detection or speech recognition.
- In machine learning, the system is given historical examples of inputs and their known outcomes, and estimates the relationship between them from the data.

## Formulating a Prediction Problem [no-exercise]
[figure: customer churn data table separating historical input features from the target outcome column]
- Applying machine learning to a business problem requires specifying three elements: the unit of observation, the features, and the target.
- The unit of observation is the entity being evaluated, such as a customer, a transaction, or a shipment.
- The features are the measured attributes of that observation that are known before the decision is made, such as past purchase frequency or transaction amount.
- The target is the outcome to be predicted, such as whether a subscriber cancels within 90 days.
- If a feature contains information recorded only after the outcome has occurred, the model will appear accurate during testing but fail when deployed. This error is known as data leakage.

## Error Asymmetry and Decision Thresholds [exercise]
[figure: interactive credit-scoring distributions for repaid and defaulted loans showing how the decision threshold changes false positives, false negatives, and expected profit]
- A classification model typically outputs a probability, such as a 0.25 probability that a transaction is fraudulent.
- Acting on that probability requires choosing a threshold above which the transaction is declined.
- Declining a legitimate transaction is a false positive. It costs the firm the margin on the sale and inconveniences the customer.
- Approving a fraudulent transaction is a false negative. It costs the firm the full value of the loss.
- Because the two errors have different financial consequences, the optimal threshold is an economic decision rather than a purely statistical one.

## Part 2: The Three Learning Paradigms [no-exercise]
- Machine learning methods are classified into three paradigms according to the data used to train them: supervised learning, unsupervised learning, and reinforcement learning.
- Each paradigm addresses a distinct class of managerial problems and requires different data infrastructure.

## Supervised Learning: Regression and Classification [exercise]
[figure: side-by-side comparison of regression (predicting continuous house sale price from floor area) and classification (separating legitimate from fraudulent transactions)]
- Supervised learning estimates a function that maps input features to a known target using labeled historical records.
- When the target is a continuous number, the task is regression.
- Estimating next week's unit demand at a distribution center or the market value of a commercial property is a regression problem.
- When the target is a discrete category, the task is classification.
- Determining whether an invoice is fraudulent or which subscription tier a customer will select is a classification problem.

## Unsupervised Learning: Clustering and Anomaly Detection [no-exercise]
[figure: scatter plot of purchase frequency versus average order value grouping unlabeled customer records into three behavioral segments]
- Unsupervised learning identifies structure in datasets that contain input features but no recorded target outcome.
- Clustering groups observations that share similar characteristics.
- Retailers use clustering to segment customers by purchasing behavior when no predefined segment labels exist.
- Anomaly detection identifies observations that differ markedly from the typical pattern in the data.
- Operations teams use anomaly detection to flag unusual network traffic or abnormal equipment sensor readings before a failure occurs.

## Reinforcement Learning: Sequential Decisions [no-exercise]
[figure: feedback loop between an agent selecting an action in an environment and receiving an updated state and reward]
- Reinforcement learning addresses problems in which an agent makes a sequence of decisions over time and receives a numerical reward after each step.
- Each action alters the state of the environment and therefore affects the options available in future steps.
- Dynamic airline pricing, warehouse robot routing, and automated bidding in digital advertising are sequential decision problems.
- Because learning by trial and error in a live market can produce costly mistakes, reinforcement learning systems are usually trained in simulation before deployment.

## Selecting a Learning Paradigm [exercise]
- The choice among supervised, unsupervised, and reinforcement learning depends on the decision problem and the available data.
- Supervised learning is appropriate when the firm has a well-defined target outcome and reliable historical records of that outcome.
- Unsupervised learning is appropriate when the firm seeks to discover groupings or unusual cases in unlabeled records.
- Reinforcement learning is appropriate when decisions are sequential, actions affect future states, and performance can be measured by a cumulative reward.

## Discussion: Customer Returns in Online Retail
- Discussion: An online apparel retailer experiences a 20 percent return rate, with each returned item costing 14 dollars in shipping and restocking. How could the retailer use (a) supervised learning, (b) unsupervised learning, and (c) reinforcement learning to reduce return costs? Which approach should management implement first, and what data would it require?

## Part 3: Generalization and Model Evaluation [no-exercise]
- A model that reproduces historical data accurately does not necessarily predict future outcomes well.
- Evaluating a model requires testing its performance on data that were not used to build it.

## Underfitting, Overfitting, and Generalization [exercise]
[figure: interactive curve-fitting comparison across underfit, balanced, and overfit models showing training error versus held-out test error]
- Generalization is the ability of a model to predict accurately on new observations not seen during training.
- Underfitting occurs when a model is too simple to capture the underlying pattern in the data, resulting in poor performance on both training and new data.
- Overfitting occurs when a model is so complex that it fits random noise in the training sample along with the true signal.
- An overfitted model shows high accuracy on the data used to train it, but poor accuracy when applied to new customers or future periods.
- To detect overfitting, historical data are divided into a training set used to estimate the model and a held-out test set used only to evaluate its generalization.

## Distribution Shift and Model Drift [no-exercise]
[figure: timeline of model prediction error remaining stable during the training period, rising after a market change, and recovering after retraining]
- Evaluation on a held-out test set assumes that future conditions will resemble the historical period from which the data were drawn.
- In business settings, customer behavior, prices, competitor actions, and macroeconomic conditions change over time.
- Model drift is the degradation of a model's predictive accuracy as the deployment environment diverges from the training data.
- Demand forecasting models trained on pre-2020 retail sales failed during the pandemic because purchasing patterns changed abruptly.
- Deployed models therefore require ongoing monitoring of prediction error and periodic retraining on recent data.

## Part 4: Deep Learning and Unstructured Data [no-exercise]
- Traditional machine learning methods are designed for structured data organized in tables of numbers and categories.
- A large share of organizational information consists of unstructured data, including text, images, audio, and video, which require a different modeling approach.

## Structured Versus Unstructured Data [no-exercise]
[figure: structured database table feeding a tabular model contrasted with call audio, product images, and text documents feeding a deep neural network]
- Structured data are recorded in tabular rows and columns where each variable has a defined meaning and unit, such as account balance, tenure, or unit price.
- Unstructured data do not have predefined tabular features. A document is a sequence of words, an audio recording is a sound wave, and a photograph is a grid of pixel values.
- Traditional statistical models work well on structured tables because the relevant variables have already been defined and measured.
- Analyzing unstructured data requires extracting meaningful features from raw text, sound, or pixels before a prediction can be made.

## Neural Networks and Representation Learning [no-exercise]
[figure: four-stage neural network inspecting a product image, progressing from raw pixels to edges, object parts, and defect classification]
- An artificial neural network processes inputs through a series of layers, each computing weighted combinations of the values from the preceding layer.
- Deep learning refers to neural networks with many intermediate layers between the raw input and the final output.
- Rather than relying on human analysts to define features by hand, a deep network learns useful representations directly from the raw data during training.
- In an image inspection system, early layers detect simple edges and shading, intermediate layers combine those edges into component shapes, and the final layer classifies whether the part is defective.

## Compute, Data, and Scale in Deep Learning [no-exercise]
- The mathematical principles of neural networks were developed decades ago, but early networks were limited by small datasets and slow processors.
- Recent advances in deep learning resulted from three developments: large digital datasets, parallel graphics processing units (GPUs) capable of fast matrix computation, and new network architectures such as the Transformer.
- These developments made it possible to train large foundation models on broad collections of text, code, and images, and then adapt a single pre-trained model to many different business tasks.

## Part 5: Predictive AI and Generative AI [no-exercise]
- Organizations now deploy two broad classes of AI systems: predictive models and generative models.
- Understanding the distinction between them is essential for selecting the right tool for a given workflow.

## Predictive AI Versus Generative AI [exercise]
[figure: predictive AI mapping customer records to a single churn probability versus generative AI mapping a prompt to a drafted customer email]
- Predictive AI maps input data to a specific score, category, or numerical forecast.
- Credit scoring, demand forecasting, churn prediction, and fraud detection are predictive tasks.
- Generative AI learns the structure of text, code, images, or audio in order to produce new content in response to a prompt.
- Drafting customer correspondence, summarizing legal contracts, and generating software code are generative tasks.
- Many business workflows combine both: a predictive model identifies which customers are at high risk of canceling, and a generative model drafts the retention message for review.

## Cost, Latency, and Verification Trade-Offs [no-exercise]
- Predictive models trained on tabular data are inexpensive to run, return predictions in milliseconds, and produce consistent outputs for a given input.
- Large generative models require substantially more computing power, take longer to respond, and cost more per query.
- Generative models can also produce fluent outputs that contain factual errors or fabricated references, a failure mode known as hallucination.
- Sound system design uses tabular predictive models for structured scoring tasks and reserves generative models for tasks that require language comprehension, synthesis, or content creation.

## Course Overview: Ten Weeks of AI in Business [no-exercise]
- Weeks 1 and 2 establish the technical foundations: machine learning and deep learning in Week 1, followed by large language models, prompting, retrieval-augmented generation, and AI agents in Week 2.
- Weeks 3 through 7 examine applications across core business functions: marketing and consumer behavior (Week 3), finance (Week 4), human resources (Week 5), operations and supply chain (Week 6), and product development (Week 7).
- Week 8 addresses corporate AI strategy, competitive advantage, build-versus-buy decisions, and the evaluation of return on investment.
- Weeks 9 and 10 examine governance and societal impact: Equity, Diversity, Inclusion, and Indigeneity (EDII) and algorithmic fairness in Week 9, and environmental sustainability in Week 10.

## Discussion: Designing an Insurance Claims Workflow
- Discussion: An auto insurance company wants to use AI across four steps of its claims process: (1) inspecting photographs of vehicle damage, (2) estimating the dollar cost of repairs, (3) flagging claims for potential fraud, and (4) drafting the coverage explanation letter sent to the policyholder. For each step, state whether the task calls for structured predictive modeling, deep computer vision, or generative AI, and identify where human review is required.

## Key Takeaways
- Artificial intelligence supports managerial decision-making under uncertainty by supplying predictions from data, while managers supply judgment regarding values and error costs.
- Rule-based software executes explicit human-written rules, whereas machine learning estimates relationships from historical examples.
- Supervised learning predicts known targets, unsupervised learning identifies structure in unlabeled data, and reinforcement learning optimizes sequential decisions through rewards.
- Models must be evaluated on their ability to generalize to unseen data rather than their fit to training data, and must be monitored after deployment for model drift.
- Deep learning uses multi-layer neural networks to learn representations directly from unstructured text, images, and audio.
- Predictive AI estimates scores and categories, whereas generative AI produces new content. Effective business workflows match each model class to the cost, speed, and verification requirements of the task.
