1. You wrote a prompt and tested it once. It worked fine, so you deployed it to production. What's the main risk with this approach?

- Users will provide unexpected inputs that break it
- The prompt will become too expensive
- The prompt will work too slowly
- Other developers won't understand it

The main risk with this approach is Users will provide unexpected inputs that break it.

Why this is the primary risk:
Lack of Edge-Case Testing: Testing a prompt only once means it has only been validated against a single ideal input ("happy path"). LLMs are non-deterministic and highly sensitive to phrasing variations, formatting, tone, length, and unexpected user intent.

Prompt Fragility: Real-world users present edge cases, typos, incomplete information, ambiguous queries, and potential prompt injection attacks that a single test run will fail to catch.

Best Practice
Before deploying to production, prompts should be evaluated against a comprehensive test suite (evals) containing diverse, realistic, and adversarial inputs to ensure consistent and reliable performance across different scenarios.

2. You need test cases for your prompt evaluation. You have two options: write them by hand or use Claude to generate them. Which model should you use for generation?

- The most expensive model available
- Multiple models combined
- A faster model like Haiku
- The same model you're testing

the correct answer is: a faster model like Haiku

When using LLMs to generate synthetic test cases for prompt evaluation, you should use The most expensive model available (or the highest-capability model, e.g., Claude 3.5 Sonnet or Claude 3 Opus).Why the most capable model is best for test case generation:Superior Edge-Case Coverage: Generating realistic, subtle, and diverse test cases (including adversarial inputs, typos, and edge cases) requires high reasoning capability. Lower-tier or faster models often produce repetitive or overly simplistic examples.Higher Data Quality: The evaluation dataset sets the benchmark for your system. Using a less capable model introduces noise or weak test cases that won't accurately stress-test your production prompt.Cost Efficiency at Scale: Test case generation is usually a one-time or low-frequency batch task, so spending slightly more for maximum quality on the evaluation dataset yields massive returns in reliability.

3. You're running a prompt evaluation workflow. You've used Claude to generate some responses. What's the next step?

- Deploy to production
- Rewrite the original prompt
- Create more test questions
- Feed the responses through a grader

The next step is Feed the responses through a grader (often referred to as an "LLM-as-a-Judge" or evaluation script).Why this is the correct next step:Automation & Objectivity: Once you run your test cases through the model and gather the output responses, you need a systematic way to evaluate their quality against defined criteria (e.g., accuracy, formatting, safety, tone).Evaluation Cycle: The prompt engineering pipeline follows a clear loop:Generate test cases $\rightarrow$ Run prompt to get responses $\rightarrow$ Grade/Score responses $\rightarrow$ Analyze results $\rightarrow$ Iterate/Rewrite prompt (if necessary) $\rightarrow$ Deploy.Jumping directly to rewriting the prompt or deploying without scoring first would mean making decisions without data!

4. You want to measure how well your prompts actually work in practice. Which approach should you focus on?

- Using more examples
- Prompt engineering techniques
- Writing longer prompts
- Prompt evaluation methods

Prompt evaluation methods.

Why this is the right focus:
Measurement vs. Iteration: Techniques like prompt engineering, adding examples (few-shot prompting), and writing detailed prompts are methods to improve or modify a prompt, but they do not measure how well it actually works.

Systematic Measurement: Prompt evaluation methods (such as building evaluation datasets, using LLM-as-a-judge, establishing metrics like accuracy/relevance/format adherence, and running regression tests) are the only way to objectively quantify performance, track improvements over time, and know if a change actually helped or hurt in practice.

5. You're using a model grader to evaluate responses. To get better scores than just middle-range numbers, what should you ask for alongside the score?

- Just the numerical score
- Comparison to other responses
- Strengths, weaknesses, and reasoning
- A longer explanation

The correct answer is Strengths, weaknesses, and reasoning.Why this works:Forces Chain-of-Thought (CoT) Reasoning: Asking the grading model to articulate why an answer is good or bad forces it to evaluate specific criteria (e.g., accuracy, tone, completeness) before settling on a score. This reduces "evaluator bias" and avoids lazy default scoring.Breaks Central Tendency Bias: LLMs naturally suffer from central tendency bias—defaulting to middle scores like $3/5$ or $7/10$ when unsure. Requiring explicit strengths and weaknesses forces the model to identify specific pros and cons, leading to clearer differentiation and more extreme, accurate scores ($1$s and $5$s where appropriate).Actionable Feedback: Knowing why a prompt failed provides clear direction on how to iterate and fix it, which a raw numerical score or long unstructured narrative cannot offer alone.

6. Which type of grader uses another AI model to assess the quality of outputs?

- Model grader
- Human grader
- Syntax grader
- Code grader

The correct answer is Model grader.

Why this is the correct answer:
Model grader: Also commonly referred to as "LLM-as-a-Judge," this approach uses a separate, capable AI model (such as GPT-4 or Claude 3.5 Sonnet) programmed with an evaluation prompt to inspect, grade, and score the test outputs based on set criteria.

Human grader: Relies on human annotators or domain experts to manually review and score outputs.

Syntax / Code grader: Uses traditional programmatic scripts or parsers to check for structural compliance (e.g., verifying valid JSON, regular expression pattern matching, or passing automated code unit tests).