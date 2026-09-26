---
topic: Regression and Marketing Response Models
lecturer: "Davood Wadi, PhD"
course: Marketing Research & Analytics
week: week9
---

## Title Slide
- Week 09
- Marketing response models estimate how sales and other outcomes respond to the actions of the firm.

## Marketing Response Models [no-exercise]
- A marketing response model describes the relationship between an outcome, such as sales, market share, or conversion, and the variables that influence it, such as price, advertising, and promotion.
- Response models inform decisions on pricing, on the size of the marketing budget, and on its allocation across channels.
- Regression analysis is the principal method by which response models are estimated.
- The week proceeds from correlation to linear and logistic regression, and then to their application in marketing mix modeling and attribution.

## Part 1: Correlation [no-exercise]
- Tests of group differences, introduced in Week 7, compare outcomes across categories.
- Correlation and regression examine relationships between quantitative variables.
- The scatter plot, introduced in Week 6, is the first step in examining such a relationship.

## Correlation [exercise]
- The Pearson correlation coefficient, r, measures the strength and direction of the linear relationship between two interval or ratio variables.
- It ranges from −1, a perfect negative relationship, through 0, no linear relationship, to +1, a perfect positive relationship.
- For example, a correlation of −0.6 between price and weekly unit sales across stores indicates a moderately strong negative relationship: stores with higher prices tend to sell fewer units.
- A correlation near zero does not exclude a strong nonlinear relationship, such as a response that rises and then falls.
- A correlation does not establish causation, for the reasons introduced in Week 8.

## Part 2: Linear Regression [no-exercise]
- Regression analysis estimates the relationship between a dependent variable and one or more independent variables.
- Unlike correlation, regression distinguishes the variable to be explained from the variables used to explain it.
- It also estimates the expected change in the dependent variable associated with a change in each independent variable.

## Simple and Multiple Regression [no-exercise]
- Simple linear regression estimates the relationship between a dependent variable and a single independent variable, in the form Y = a + bX + e.
- The intercept, a, is the expected value of Y when X is zero. The slope, b, is the expected change in Y associated with a one-unit increase in X. The error term, e, represents the variation in Y not explained by X.
- The coefficients are estimated by ordinary least squares, which selects the line that minimizes the sum of the squared differences between the observed and the predicted values.
- Multiple regression includes two or more independent variables, in the form Y = a + b1X1 + b2X2 + … + e.
- Each coefficient in a multiple regression is a partial coefficient: the expected change in Y associated with a one-unit increase in that variable, holding the other independent variables constant.

## Interpreting Regression Coefficients [exercise]
- A model of weekly unit sales across stores is estimated as: Sales = 12,000 − 800 × Price + 25 × Advertising, where price is measured in dollars and advertising in thousands of dollars.
- The coefficient of price indicates that a one-dollar increase in price is associated with 800 fewer units sold per week, holding advertising constant.
- The coefficient of advertising indicates that an additional thousand dollars of advertising is associated with 25 additional units sold per week, holding price constant.
- Each coefficient is tested against the null hypothesis that its true value is zero, with the t-test and p-value procedures introduced in Week 7.
- Nominal independent variables, such as region, are included as dummy variables coded 1 or 0, and their coefficients are interpreted relative to a reference category.
- Standardized coefficients express each effect in standard deviation units, which allows the relative importance of variables measured in different units to be compared.

## Model Fit and Diagnostics [no-exercise]
- The coefficient of determination, R², is the proportion of the variation in the dependent variable explained by the independent variables.
- Adjusted R² corrects for the number of independent variables, since R² increases whenever a variable is added, even a variable without explanatory value.
- The F test assesses whether the independent variables, taken together, explain a significant proportion of the variation in the dependent variable.
- The residuals, which are the differences between observed and predicted values, are examined for patterns that indicate a nonlinear relationship, unequal variance, or dependence between observations.
- A high R² does not establish that the model is correctly specified, and a low R² does not prevent individual coefficients from being meaningful.

## Multicollinearity [no-exercise]
- Multicollinearity occurs when two or more independent variables are highly correlated with each other.
- For example, television and online video expenditure may rise and fall together because both are set in the same annual budget.
- Under multicollinearity, the effects of the correlated variables cannot be reliably separated. Their coefficients have large standard errors, may change substantially when variables are added or removed, and may take implausible signs.
- The variance inflation factor, VIF, measures the extent of multicollinearity for each variable. Values above 5 or 10 are conventionally treated as problematic.
- Remedies include combining the correlated variables, removing one of them, or obtaining data in which they vary independently, for example through an experiment.

## Omitted Variables and Reverse Causality [exercise]
- Regression coefficients estimated from observational data describe associations, not causal effects, unless further conditions are met.
- Omitted variable bias occurs when a variable that affects the dependent variable and is correlated with an independent variable is excluded from the model. For example, if advertising increases before holidays, and holidays also increase sales, a model without a holiday variable overstates the effect of advertising.
- Reverse causality occurs when the dependent variable influences the independent variable. For example, a firm that increases its advertising budget in regions where sales are already growing produces a positive association that does not reflect the effect of advertising.
- Both problems are reduced by including the relevant control variables, by using data from experiments, and by applying the quasi-experimental designs introduced in Week 8.

## Part 3: Logistic Regression [no-exercise]
- Many marketing outcomes are binary: a customer purchases or does not, clicks or does not, renews or cancels a subscription.
- Linear regression is unsuitable for binary outcomes, since it can produce predicted probabilities below zero or above one.
- Logistic regression is the standard method for modeling binary outcomes.

## The Logistic Regression Model [no-exercise]
- Logistic regression models the probability of an outcome, such as purchase, as a function of the independent variables.
- The model is linear in the log odds of the outcome, where the odds are the probability of the outcome divided by the probability of its absence.
- The predicted probability follows an S-shaped curve and always lies between zero and one.
- The coefficients are estimated by maximum likelihood rather than by ordinary least squares.
- Model fit is assessed with measures such as pseudo-R² and the accuracy of predictions, which are examined further in Week 11.

## Interpreting Logistic Regression [exercise]
- Each coefficient represents the change in the log odds of the outcome associated with a one-unit increase in the independent variable, holding the others constant.
- The exponentiated coefficient is the odds ratio. An odds ratio greater than one indicates that the variable increases the odds of the outcome, and an odds ratio less than one indicates that it decreases them.
- For example, an odds ratio of 1.5 for receiving a promotional email indicates that the odds of purchase are 50 percent higher for customers who received the email, holding other variables constant.
- An increase in the odds is not an equal increase in the probability. If the probability of purchase without the email is 10 percent, an odds ratio of 1.5 corresponds to a probability of approximately 14 percent.
- Results are therefore commonly reported as predicted probabilities for representative customers, which decision makers interpret more readily than odds ratios.

## Part 4: Marketing Mix Modeling and Attribution [no-exercise]
- Firms allocate their marketing budgets across many channels, including television, search, social media, and promotions.
- Marketing mix modeling and attribution are two approaches to estimating the contribution of each channel.
- They differ in the data they use, the level at which they operate, and the questions they can answer.

## Marketing Mix Modeling [no-exercise]
- Marketing mix modeling is the application of regression to aggregate time-series data, such as weekly sales over two or three years.
- The independent variables include expenditure in each marketing channel, price, promotions, distribution, seasonality, and external factors such as economic conditions and competitor activity.
- The model estimates the contribution of each channel to sales and its return on investment.
- Because it uses aggregate data, marketing mix modeling includes offline channels such as television and print, and does not depend on tracking individual consumers.
- It requires several years of data with sufficient variation in expenditure, and it is subject to the problems of multicollinearity, omitted variables, and reverse causality introduced in this week.

## Carryover and Diminishing Returns [no-exercise]
- Advertising affects sales not only in the period in which it appears but also in later periods. This carryover effect, often called adstock, is modeled with a decay rate.
- For example, a decay rate of 0.5 indicates that half of the effect of this week's advertising carries over to the following week.
- Advertising is also subject to diminishing returns: each additional dollar produces a smaller increase in sales than the previous one.
- Response curves in marketing mix models are therefore nonlinear, rising steeply at low levels of expenditure and flattening at high levels.
- Budget allocation depends on the marginal return of each channel, the return on the next dollar spent, and not on its average return.

## Attribution [no-exercise]
- Attribution assigns credit for a conversion to the touchpoints in an individual customer's path to purchase, such as a display advertisement, a social media post, and a search advertisement.
- Last-click attribution assigns all credit to the final touchpoint before conversion. First-click attribution assigns all credit to the first.
- Linear attribution divides credit equally among all touchpoints. Time-decay attribution assigns more credit to touchpoints closer to the conversion.
- Data-driven attribution estimates the credit for each touchpoint statistically, by comparing the paths of customers who converted with those of customers who did not.
- Attribution operates at the level of individual customers and provides results quickly, but it depends on the tracking of individuals across channels.

## Marketing Mix Modeling and Attribution Compared [exercise]
- Attribution assigns credit to touchpoints that preceded a conversion, but it does not establish whether the conversion would have occurred without them.
- Attribution tends to assign disproportionate credit to channels close to the purchase, such as search advertisements for the brand's own name, which often reach consumers who have already decided to buy.
- Attribution cannot observe offline channels, and its coverage has declined with the restrictions on third-party data introduced in Week 2.
- Marketing mix modeling covers all channels, including offline channels, but provides estimates at an aggregate level and with less frequency.
- Neither approach establishes causal effects on its own. Both are validated with incrementality experiments, such as holdout tests and geographic experiments, which apply the experimental designs introduced in Week 8.

## Discussion: The Search Budget
- Discussion: A retailer's last-click attribution report assigns 60 percent of online sales to search advertising, and the chief marketing officer proposes to move the television budget into search. Which limitations of attribution bear on this proposal, and which evidence should be obtained before the budget is reallocated?

## Part 5: Explanation and Prediction [no-exercise]
- Regression models serve two distinct purposes: to explain and to predict.
- The purpose determines how a model is built, how it is evaluated, and what it can be used for.
- Machine learning methods have increased the accuracy of prediction, at a cost to the interpretability of the models.

## Explanatory and Predictive Models [no-exercise]
- An explanatory model estimates the effect of specific variables on an outcome, and is evaluated by the validity and precision of its coefficients.
- A predictive model forecasts the outcome for new cases, and is evaluated by the accuracy of its predictions on data not used to estimate it, known as holdout data.
- A model can predict accurately without estimating causal effects correctly. A model can also estimate a causal effect correctly while predicting individual outcomes poorly.
- Overfitting occurs when a model reproduces the random variation in the data used to estimate it, so that it performs well on those data and poorly on new data.

## Machine Learning Models [no-exercise]
- Machine learning models, such as tree-based ensembles and neural networks, estimate the relationship between the independent variables and the outcome from the data, without a functional form specified in advance.
- They capture nonlinear relationships and interactions among variables without these being specified by the analyst.
- With large datasets and many independent variables, they frequently predict more accurately than linear or logistic regression.
- They do not produce coefficients that express the effect of each variable in interpretable units.
- These models are examined further in Week 11, in the context of customer analytics.

## Limitations of Machine Learning Models [no-exercise]
- Measures of variable importance describe the extent to which a model's predictions depend on each variable, not the effect that changing the variable would have on the outcome.
- A model may achieve accurate predictions through variables that are correlated with the outcome but not causally related to it.
- For example, a model may predict that customers who receive discounts are more likely to purchase because discounts were previously offered to the most loyal customers. The prediction does not establish that offering discounts to other customers would increase their purchases.
- Predictive accuracy on historical data does not ensure accuracy when conditions change, as when the firm changes its pricing or a new competitor enters the market.
- AI assistants can generate the code for both regression and machine learning models; the procedures for verifying AI-assisted analysis introduced in Week 6 apply to that code.

## Selecting a Modeling Approach [exercise]
- Linear or logistic regression is appropriate when the decision requires an interpretable estimate of the effect of specific variables, such as the effect of price on unit sales.
- A machine learning model is appropriate when the decision requires accurate predictions for individual cases, such as which customers are most likely to cancel a subscription.
- An experiment or a quasi-experiment is required when the decision depends on the causal effect of an action the firm has not previously taken, or has taken only for selected customers.
- Many decisions combine the approaches: a predictive model identifies the customers at risk, and an experiment estimates the effect of an intervention on those customers.

## Discussion: Accuracy or Understanding?
- Discussion: A data science team presents a machine learning model that predicts weekly sales more accurately than the firm's marketing mix model, and proposes to use it to set next year's advertising budget. What can the new model contribute to the budget decision, and what can it not contribute?

## Key Takeaways
- Correlation measures the strength and direction of a linear relationship; regression estimates the expected change in an outcome associated with each independent variable.
- Multiple regression coefficients are partial effects, interpreted holding the other variables constant, and are assessed together with model fit and diagnostics.
- Multicollinearity, omitted variables, and reverse causality limit the causal interpretation of regression estimated from observational data.
- Logistic regression models binary outcomes, and its coefficients are interpreted as odds ratios and predicted probabilities.
- Marketing mix modeling estimates channel contributions from aggregate data, attribution assigns credit to individual touchpoints, and both are validated with incrementality experiments.
- Machine learning models frequently predict more accurately than regression, but they do not estimate the effect of marketing actions, and prediction does not establish causation.
