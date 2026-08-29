# Teaching Guide: CS329A Part 7 - Self-Improvement and Deep Research Agents

The goal is to understand search as a controlled system, not to memorize AlphaCode statistics. Use the deck to ask what is generated, what feedback is available, what gets selected, and when the loop stops.

## Slide 1: Search Is a System

More candidates create opportunities. They do not identify the useful candidate or guarantee that retrieved evidence is correct.

**Checkpoint:** Name the generator, feedback channel, selector, budget, and stopping rule in one search product you use.

## Slide 2: Why Contest Code Is Hard

Competitive programming combines language understanding, algorithm choice, implementation, and hidden-test performance. It is more structured than professional software engineering but harder than short autocomplete.

## Slide 3: AlphaCode's Candidate Pipeline

AlphaCode samples at enormous scale, rejects programs that fail public checks, clusters similar runtime behavior, and chooses a small submission set.

**Challenge:** Which stage increases coverage, and which stages improve selection?

## Slide 4: Coverage Versus Selection

`pass@k` can improve when one correct candidate appears anywhere. `10@k` asks whether the system can reduce a much larger pool to ten submissions. This is the same benchmark-to-product boundary seen in Part 2.

## Slide 5: Diminishing Useful Diversity

Sample count and useful diversity are not identical. Similar policies can repeat the same conceptual mistake in different syntax, while ranking cost grows with the pool.

## Slide 6: AlphaCode 2

AlphaCode 2 improves the candidate supply with a family of policies and improves selection with execution filtering, clustering, and a learned scorer. Each component is tied to competitive programming's feedback structure.

## Slide 7: Read the Denominator

The report's 43%, 25%, and 85th-percentile figures are meaningful only with their 77 selected problems, Codeforces setting, ten-submission limit, and million-candidate budget. The result is not a general coding-agent score.

## Slide 8: Adaptive Search

Flat sampling is only one allocation strategy. Difficult tasks may need decomposition, deeper search, backtracking, or a human decision. These are lecture discussion directions, not reported AlphaCode 2 ablations.

## Slide 9: Knowledge Gaps

A reasoning model can continue fluently after it stops knowing. The key failure occurs at the unsupported guess, not only at the final answer.

**Checkpoint:** What observable signal should trigger retrieval?

## Slide 10: Agentic Retrieval

Static RAG retrieves once. Agentic retrieval can search during the chain when a knowledge need becomes visible. This creates new control questions: query quality, source selection, loop cost, and stopping.

## Slide 11: Reason-in-Documents

Search-o1 reasons over retrieved documents and injects focused evidence into the main context. This can reduce context noise, but extraction can omit key evidence or preserve source errors.

## Slide 12: Five-Question Diagnostic

1. What creates diversity?
2. What feedback is observed?
3. How is a candidate selected?
4. What happens when feedback is wrong?
5. When does the system stop?

## Short Homework

Choose either a coding assignment or a literature-review task. Design a search agent with a fixed budget.

| Requirement | Your design |
|---|---|
| Candidate or query generator | Specify its diversity mechanism. |
| Feedback channel | Tests, sources, human review, or another signal. |
| Selector | Explain how it ranks candidates or evidence. |
| Failure mode | Describe a plausible false-positive feedback event. |
| Stopping rule | Specify cost, confidence, or coverage conditions. |
| Disclosure | State what the user should be told about uncertainty. |

Then explain which part is domain-specific and which part could transfer between code and research.
