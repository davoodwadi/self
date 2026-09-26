---
topic: Text Analytics, AI-Driven Insights, and Reporting
lecturer: "Davood Wadi, PhD"
course: Marketing Research & Analytics
week: week12
---

## Title Slide
- Week 12
- Research informs decisions only when its findings are valid, obtained lawfully, and communicated in a form that decision makers can act upon.

## Part 1: Text as Research Data [no-exercise]
- A large proportion of the information available about customers exists as text rather than numbers.
- Advances in language models have made the systematic analysis of such text feasible at large scale.
- This week examines text as a source of research data, the methods by which it is analyzed, the protection of the people who produce it, and the communication of findings.

## User-Generated Content [no-exercise]
- User-generated content is material created and published by consumers, such as online reviews, social media posts, and forum discussions.
- Firms also hold large volumes of text from their own channels, such as customer service transcripts, chat logs, and open-ended survey responses.
- Such text is unsolicited, expressed in consumers' own language, available in large volumes, and generated continuously.
- It extends the netnographic approach introduced in Week 3 from the close reading of a few communities to the systematic analysis of many thousands of texts.

## Social Listening [no-exercise]
- Social listening is the systematic monitoring and analysis of online conversations about a brand, its competitors, and its category.
- Share of voice is the proportion of conversations in a category that mention a particular brand.
- Social listening tracks changes in the volume and sentiment of conversations over time, identifies emerging issues, and provides early warning of potential crises.
- Data are typically collected through the access that platforms provide to their content, and the extent of that access varies across platforms and has been restricted on several of them.

## Limitations of User-Generated Content [exercise]
- The authors of online content are self-selected. They are not a probability sample of customers, and the findings cannot be projected to the customer base with a known precision, as introduced in Week 5.
- Consumers with extreme experiences are more likely to post than those with moderate experiences, so that ratings are concentrated at the highest and lowest values.
- The users of each platform differ demographically from the population, and from the users of other platforms.
- Fake reviews and automated accounts, including accounts that use language models to generate text, distort the content.
- The visibility of content is determined by platform algorithms, so that the content collected may not represent all the content published.
- Findings from user-generated content are therefore compared with evidence from surveys and customer records before they inform decisions.

## Part 2: Methods of Text Analytics [no-exercise]
- Text analytics is the use of computational methods to extract structured information from unstructured text.
- Its principal methods are sentiment analysis, topic modeling, and text classification.
- Large language models are now used for all three tasks, frequently without training on labeled examples.

## Sentiment Analysis [no-exercise]
- Sentiment analysis assigns a polarity, positive, negative, or neutral, and sometimes an intensity, to a text.
- Lexicon-based methods score texts according to lists of words associated with positive and negative sentiment.
- Machine learning methods are trained on texts whose sentiment has been coded by people, and large language models can classify sentiment from instructions alone.
- Aspect-based sentiment analysis identifies the sentiment expressed toward each attribute mentioned in a text. A review of a phone may be positive about the battery and negative about the camera.
- Sentiment analysis is complicated by sarcasm, negation, and domain-specific meaning. "Unpredictable" is favorable in a review of a film and unfavorable in a review of a car's steering.

## Topic Modeling [no-exercise]
- Topic modeling identifies the themes present in a large collection of texts, without categories specified in advance.
- Latent Dirichlet allocation, LDA, the most established method, represents each text as a mixture of topics and each topic as a distribution over words.
- The analyst interprets and labels each topic by examining its most probable words and a sample of the texts in which it is prominent.
- Methods based on the embeddings introduced in Week 10 cluster texts by meaning, and frequently produce more coherent topics for short texts such as social media posts.
- The number of topics is chosen by the analyst, and the interpretation of each topic is a judgment that is documented.

## Text Classification With Large Language Models [no-exercise]
- Text classification assigns each text to one or more predefined categories, such as the type of complaint expressed.
- In zero-shot classification, categories are assigned by a large language model on the basis of written instructions alone. In few-shot classification, the instructions include a small number of coded examples.
- Classification with a language model is the application of a codebook, introduced in Week 3, to texts at large scale.
- Language models can also extract specific information from texts, such as the product mentioned, the problem described, and the resolution requested.
- The classifications can vary with the wording of the instructions and between versions of the model, and are therefore validated before use.

## Selecting a Text Analytics Method [exercise]
- Sentiment analysis is appropriate when the decision requires the overall favorability of the conversation, such as the trend in sentiment toward a brand after a campaign.
- Aspect-based sentiment analysis is appropriate when the decision concerns specific product attributes, such as which features of a product generate complaints.
- Topic modeling is appropriate when the relevant themes are not known in advance, as in exploratory analysis of reasons for cancellation.
- Text classification is appropriate when the categories are known in advance and each text must be assigned to them, as in the routing of customer service messages.

## Validating Text Analytics [exercise]
- The analyst first draws a random sample of texts from the collection.
- Two or more people then code the sample independently, and their agreement is measured, as introduced in Week 3.
- The automated method then codes the same sample.
- The analyst then compares the automated coding with the human coding, reporting precision and recall for each category, as introduced in Week 11.
- The analyst then examines whether accuracy differs across products, customer groups, or languages.
- Finally, the analyst repeats the validation periodically, since the language of consumers and the behavior of the model change over time.

## Discussion: Ten Thousand Reviews
- Discussion: A hotel chain holds 10,000 online reviews from the past year and seeks to identify the causes of declining ratings. Which text analytics methods are appropriate, how should their results be validated, and which limitations of review data should qualify the conclusions?

## Part 3: Privacy and Data Protection [no-exercise]
- Every week of this course has involved data that describe people.
- Data protection law governs the collection, use, and storage of personal data in many jurisdictions.
- The obligations to respondents introduced in Week 1 are particularly relevant to text data and to AI tools.

## Principles of Data Protection [no-exercise]
- Lawfulness: personal data are processed only on a legal basis, such as the informed consent of the individual.
- Purpose limitation: data collected for one purpose are not used for an incompatible purpose without a further legal basis.
- Data minimization: only the personal data necessary for the purpose are collected.
- Storage limitation: personal data are retained only as long as the purpose requires.
- Security: personal data are protected against unauthorized access and loss.
- Individual rights: individuals may access the data held about them, request their correction or deletion, and object to certain uses, including some forms of automated decision-making.

## Privacy in Text and Social Data [exercise]
- Content that is publicly accessible is not necessarily free to use for any purpose. Its use is limited by platform terms, by law, and by the reasonable expectations of its authors.
- Texts frequently contain personal information, such as names, locations, and health conditions, that the author did not intend to be analyzed.
- Removing names does not anonymize a text. A verbatim quotation from a public post can be located with a search engine, which identifies its author.
- Quotations used in reports are therefore paraphrased or used with permission when their authors could be identified.
- Combinations of characteristics that are individually harmless, such as postal code, age, and occupation, can identify an individual.
- Special categories of data, such as health, religion, and sexual orientation, require additional protection.

## Privacy and AI Tools [no-exercise]
- Submitting data to an external AI service is a form of processing, and in many cases a transfer of data to a third party.
- The terms of the service determine whether submitted data are retained, and whether they are used to train future models.
- Personal data are therefore removed or replaced before submission where the analysis permits it.
- Many organizations provide AI tools under contracts that exclude the retention of data and its use for training, or operate models within their own infrastructure.
- As introduced in Week 1, the use of respondents' data in an AI tool falls within the scope of the consent they gave.

## Part 4: Communicating Findings [no-exercise]
- The value of research is realized only when its findings inform a decision.
- The final step of the research process, introduced in Week 1, is the preparation and presentation of the report.
- A report is written for the decision maker, and its structure follows the decision rather than the sequence of the analysis.

## The Research Report [no-exercise]
- The executive summary states the problem, the principal findings, the conclusions, and the recommendations, and is intelligible without the rest of the report.
- The background section restates the management decision problem and the marketing research problem.
- The method section describes the research design, the sample, the measures, and the analysis, in sufficient detail for the reader to evaluate the findings.
- The findings section presents the results, organized by research question.
- The limitations section states the constraints on the conclusions, such as the sample, the response rate, the measures, and the methods of analysis.
- The conclusions and recommendations section interprets the findings in relation to the decision and proposes a course of action.

## Findings, Conclusions, and Recommendations [exercise]
- A finding states what the data show: "42 percent of customers who cancelled cited the price increase as their main reason."
- A conclusion interprets the findings in relation to the research problem: "The price increase is the principal cause of the rise in cancellations among long-standing customers."
- A recommendation proposes an action on the basis of the conclusions: "Offer long-standing customers a loyalty rate for twelve months, and test its effect on cancellations in a randomized experiment before extending it."
- Each recommendation is supported by conclusions, and each conclusion by findings.
- The report distinguishes the three clearly, so that the decision maker can assess the strength of the evidence behind each recommendation.

## Data Storytelling [no-exercise]
- Data storytelling is the organization of findings into a coherent argument that leads from the decision to the evidence and to the recommended action.
- The presentation begins with the answer to the decision maker's question, and then presents the evidence that supports it.
- Each chart communicates one finding, as introduced in Week 6, and its title states that finding.
- Uncertainty is stated explicitly, for example through confidence intervals, as introduced in Week 7.
- Causal language is used only when the research design supports a causal conclusion, as introduced in Week 8.
- A persuasive presentation remains faithful to the evidence. Findings that do not support the recommendation are reported together with those that do.

## Reporting the Use of AI [no-exercise]
- The report states where AI tools were used in the research, for example in drafting the questionnaire, moderating interviews, coding responses, or analyzing data.
- It describes how the output of each tool was verified, such as the agreement between AI coding and human coding.
- It states whether any synthetic respondents or simulated subjects were used, and for what purpose.
- It states the limitations that the use of AI introduces into the conclusions.
- Disclosure allows decision makers to evaluate the evidence, and allows other researchers to reproduce the work.

## Part 5: The Insights Function in an AI-Enabled Organization [no-exercise]
- The insights function is the part of the organization responsible for marketing research and analytics.
- AI tools have changed the cost and speed of nearly every step of the research process covered in this course.
- The final part of the course considers how the function, and the role of the researcher, is changing as a result.

## How AI Is Changing the Insights Function [no-exercise]
- Tasks that previously required days, such as drafting questionnaires, coding open-ended responses, and producing descriptive reports, can now be completed in hours.
- Managers increasingly conduct surveys, analyses, and experiments themselves through self-service platforms and AI assistants.
- Continuous streams of data, such as social listening, customer records, and ongoing experiments, supplement discrete research projects.
- Synthetic respondents and simulated subjects are offered as alternatives to research with real people, with the limitations examined in Weeks 5 and 8.
- As the volume of research output increases, the ability to distinguish valid evidence from plausible but unfounded output becomes more valuable.

## The Role of the Researcher [no-exercise]
- The researcher defines the problem, since no tool can determine which question a decision requires.
- The researcher selects the research design and determines at which steps AI is appropriate.
- The researcher verifies the output of AI tools against sources, human judgments, and empirical data.
- The researcher integrates evidence from surveys, experiments, customer data, and text into a coherent assessment.
- The researcher ensures that research is conducted lawfully and ethically, and that the people who provide data are protected.
- The researcher remains accountable for every finding in the report, as introduced in Week 1.

## Discussion: The Insights Team of the Future
- Discussion: A chief executive proposes to reduce the firm's insights team to two people, and to rely on AI tools and self-service platforms for all other research. Which research activities could such an arrangement perform adequately, which would be at risk, and how should the insights function be organized to use AI tools while maintaining the validity of its evidence?

## The Course in Review [no-exercise]
- Marketing research provides evidence that reduces uncertainty in managerial decisions, beginning with the precise definition of the research problem.
- The research design determines which conclusions the evidence can support: exploratory research clarifies, descriptive research describes, and causal research tests the effect of an action.
- Valid evidence depends on sound measurement, appropriate samples, and careful data preparation.
- Statistical analysis, from hypothesis tests to regression and multivariate methods, quantifies the evidence and its uncertainty.
- Customer analytics and predictive models inform decisions about individual customers, subject to evaluation, fairness, and explanation.
- AI tools accelerate every step of the research process, and the researcher's responsibility to verify their output increases accordingly.

## Key Takeaways
- User-generated content provides large volumes of unsolicited evidence, but its authors are self-selected and its findings cannot be projected to the customer base.
- Sentiment analysis, topic modeling, and text classification extract structured information from text, and large language models are now used for all three.
- Automated text analysis is validated against human coding, with precision and recall reported for each category.
- Data protection requires a legal basis, limited purposes, minimal data, and respect for individual rights, including when data are submitted to AI tools.
- A research report distinguishes findings, conclusions, and recommendations, states its limitations, and discloses the use of AI.
- The researcher's role in an AI-enabled organization centers on problem definition, research design, verification, integration, and accountability.
