---
topic: Hypothesis Testing and Group Differences
lecturer: "Davood Wadi, PhD"
course: Marketing Research & Analytics
week: week7
---

## Title Slide
- Week 07
- Hypothesis testing assesses whether a difference observed in a sample is likely to exist in the population.

## From Sample to Population [no-exercise]
- A difference between two groups in a sample does not necessarily indicate a difference in the population.
- Samples vary by chance, so that two samples drawn from the same population produce different results.
- A population parameter is a characteristic of the population, such as the true mean satisfaction of all customers. A sample statistic is the corresponding value calculated from a sample.
- Statistical inference is the procedure by which conclusions about population parameters are drawn from sample statistics.
- Hypothesis testing is the form of inference that assesses whether an observed difference or association can reasonably be attributed to chance.

## Null and Alternative Hypotheses [no-exercise]
- The null hypothesis, denoted H0, states that there is no difference or no association in the population.
- The alternative hypothesis, denoted H1, states that a difference or association exists.
- For example, H0 states that loyalty program members and nonmembers have the same mean monthly spending. H1 states that their mean monthly spending differs.
- The test assesses the evidence against the null hypothesis. The null hypothesis is either rejected or not rejected; it is never proven true.
- A two-tailed test examines a difference in either direction. A one-tailed test examines a difference in a direction specified in advance, such as members spending more than nonmembers.

## The Hypothesis Testing Procedure [exercise]
- The researcher first formulates the null and alternative hypotheses.
- The researcher then selects the appropriate statistical test.
- The researcher then specifies the significance level, conventionally 0.05.
- The researcher then collects the data and calculates the test statistic.
- The researcher then determines the p-value associated with the test statistic.
- The researcher then compares the p-value with the significance level, and rejects the null hypothesis if the p-value is smaller.
- Finally, the researcher states the conclusion in terms of the marketing research problem.

## The p-Value and the Significance Level [no-exercise]
- The p-value is the probability of obtaining a result at least as extreme as the one observed, assuming that the null hypothesis is true.
- A small p-value indicates that the observed result would be unlikely if the null hypothesis were true.
- The significance level, denoted alpha, is the threshold below which the p-value leads to the rejection of the null hypothesis.
- The p-value is not the probability that the null hypothesis is true, and it is not the probability that the result occurred by chance.
- A p-value of 0.04 and a p-value of 0.06 represent very similar strength of evidence, although only the first falls below the conventional threshold.

## Type I and Type II Errors [exercise]
- A Type I error occurs when the null hypothesis is rejected although it is true, so that a difference is reported that does not exist in the population.
- When the null hypothesis is true, the probability of a Type I error equals the significance level.
- A Type II error occurs when the null hypothesis is not rejected although it is false, so that a real difference is not detected.
- The power of a test is the probability of correctly rejecting a false null hypothesis. Power increases with the sample size and with the size of the true difference.
- For example, concluding that a new advertisement increases purchase intention when it does not is a Type I error, and may lead the firm to spend its budget on an ineffective campaign. Failing to detect a real improvement is a Type II error, and may lead the firm to abandon an effective campaign.
- For a given sample size, reducing the probability of one type of error increases the probability of the other.

## Part 2: Tests of Group Differences [no-exercise]
- The appropriate test depends on the level of measurement of the variables, the number of groups compared, and whether the groups consist of different or the same respondents.
- Tests of means are used for interval and ratio variables.
- Tests of frequencies are used for nominal variables.

## The Independent-Samples t-Test [no-exercise]
- The independent-samples t-test compares the means of an interval or ratio variable between two groups of different respondents.
- For example, it tests whether the mean monthly spending of loyalty program members differs from that of nonmembers.
- The test statistic, t, is the difference between the two sample means divided by the standard error of that difference.
- A larger difference between the means, less variation within the groups, and larger samples each produce a larger value of t and a smaller p-value.

## The Paired-Samples t-Test [no-exercise]
- The paired-samples t-test compares two means obtained from the same respondents.
- It is used when respondents are measured twice, as in ratings of a brand before and after exposure to an advertisement.
- It is also used when the same respondents rate two objects, as in ratings of two package designs.
- Because the comparison is made within each respondent, the test removes variation between respondents and detects smaller differences than the independent-samples test.

## Analysis of Variance [no-exercise]
- One-way analysis of variance, known as ANOVA, compares the means of an interval or ratio variable across three or more groups.
- For example, it tests whether mean satisfaction differs among customers who shop online, in store, and through a mobile application.
- The F statistic compares the variation between the group means with the variation within the groups.
- A significant F statistic indicates that at least one group mean differs from the others, but not which one.
- Post hoc tests then identify which pairs of groups differ, while controlling the overall probability of a Type I error.

## The Chi-Square Test [no-exercise]
- The chi-square test assesses whether two nominal variables in a cross-tabulation, introduced in Week 6, are associated in the population.
- It compares the observed frequency in each cell with the frequency expected if the two variables were unrelated.
- For example, it tests whether preferred shopping channel is associated with age group.
- The larger the discrepancies between observed and expected frequencies, the larger the chi-square statistic and the smaller the p-value.
- The test requires an adequate expected frequency in each cell, conventionally at least five.

## Selecting a Test [exercise]
- To compare the means of two groups of different respondents, the independent-samples t-test is used.
- To compare two means obtained from the same respondents, the paired-samples t-test is used.
- To compare the means of three or more groups, analysis of variance is used.
- To assess the association between two nominal variables, the chi-square test is used.

## Discussion: Testing a Loyalty Program
- Discussion: A grocery chain reports that members of its loyalty program spend on average 18 percent more per month than nonmembers, and the difference is statistically significant. Which hypotheses were tested, which test was appropriate, and does the result establish that the program increases spending?

## Part 3: Statistical and Practical Significance [no-exercise]
- A statistically significant result indicates that the observed difference would be unlikely if no difference existed in the population.
- It does not indicate that the difference is large or that it matters for the decision.
- Researchers therefore report the size of the difference in addition to its statistical significance.

## Statistical Versus Practical Significance [no-exercise]
- With a sufficiently large sample, very small differences become statistically significant.
- For example, in a test with two million website visitors divided equally between two versions of a page, a conversion rate of 3.05 percent for one version and 3.00 percent for the other is statistically significant at the 0.05 level.
- Practical significance is the extent to which a difference is large enough to affect a marketing decision.
- Whether a difference is practically significant depends on the costs and benefits of acting on it, such as the cost of implementing the new page relative to the additional revenue it produces.
- Conversely, a large and practically important difference may fail to reach statistical significance in a small sample.

## Effect Size [exercise]
- An effect size measures the magnitude of a difference or association, independently of the sample size.
- For a difference between two means, Cohen's d is the difference between the means divided by their pooled standard deviation.
- Values of d of approximately 0.2, 0.5, and 0.8 are conventionally described as small, medium, and large, although the importance of an effect depends on the context.
- For differences between proportions, the effect size can be expressed as the difference in percentage points or as the ratio between the proportions.
- Effect sizes allow findings to be compared across studies with different sample sizes.

## Confidence Intervals [no-exercise]
- A confidence interval reports a range of plausible values for a population parameter, such as a difference between two means.
- A 95 percent confidence interval for a difference in mean spending of 8 to 22 dollars indicates both the likely size of the difference and the uncertainty of the estimate.
- If a 95 percent confidence interval for a difference excludes zero, the difference is statistically significant at the 0.05 level.
- Confidence intervals are therefore more informative than p-values alone, and are reported together with them.

## Part 4: Research Integrity [no-exercise]
- The validity of hypothesis testing depends on how the tests are conducted and reported.
- A number of published findings in psychology and consumer research have failed to replicate when other researchers repeated the studies.
- Among the causes identified are analytical practices that increase the probability of Type I errors.

## Questionable Research Practices [no-exercise]
- p-Hacking is the practice of analyzing the data in several ways and reporting only the analyses that produce statistically significant results.
- Examples include removing outliers only after examining the results, testing many outcome variables and reporting only the significant ones, and adding respondents until the result becomes significant.
- Selective reporting of subgroups is the practice of testing the effect in many segments and presenting only the segments in which it is significant.
- HARKing, or hypothesizing after the results are known, is the practice of presenting a hypothesis formulated after examining the data as if it had been formulated in advance.
- Each practice increases the probability of reporting a difference that does not exist in the population.

## Multiple Comparisons [no-exercise]
- Each test conducted at a significance level of 0.05 has a five percent probability of producing a Type I error when the null hypothesis is true.
- When many tests are conducted, the probability that at least one produces a Type I error increases rapidly.
- With 20 independent tests of true null hypotheses, the probability of at least one statistically significant result is approximately 64 percent.
- The Bonferroni correction divides the significance level by the number of tests, so that 20 tests are each conducted at a level of 0.0025.
- Reports that present many significance tests, such as comparisons across numerous customer segments, state how many tests were conducted and whether a correction was applied.

## Preregistration and Reproducible Analysis [exercise]
- Preregistration is the documentation of the hypotheses, sample size, exclusion criteria, and analysis plan before the data are collected.
- It distinguishes confirmatory analyses, which test hypotheses specified in advance, from exploratory analyses, which generate hypotheses for future testing.
- In commercial research, the equivalent practice is an analysis plan agreed with the client before data collection.
- Reproducible analysis is conducted with documented code, so that another analyst can obtain the same results from the same data.
- Complete reporting states every test conducted, including those that did not produce significant results.

## Discussion: Twenty Segments
- Discussion: An analyst tests whether a new loyalty offer increased spending in each of 20 customer segments and finds a statistically significant increase in one segment. The marketing director proposes to extend the offer to that segment immediately. How should this result be interpreted, and what further evidence should be obtained before the decision is taken?

## Key Takeaways
- Hypothesis testing assesses whether a sample result provides sufficient evidence against the null hypothesis of no difference or no association.
- The p-value is the probability of a result at least as extreme as the one observed if the null hypothesis were true, and not the probability that the null hypothesis is true.
- Type I errors report differences that do not exist; Type II errors fail to detect differences that do exist.
- The t-test compares two means, analysis of variance compares three or more means, and the chi-square test assesses the association between two nominal variables.
- Statistical significance does not establish practical significance, and effect sizes and confidence intervals are reported together with p-values.
- p-Hacking, selective reporting, and uncorrected multiple comparisons increase false findings, while preregistration and reproducible analysis protect against them.
