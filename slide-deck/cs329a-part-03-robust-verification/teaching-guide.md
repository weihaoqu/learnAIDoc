# Teaching Guide: CS329A Part 3 - Robust Verification

## Learning Goal

Q should be able to identify whether an agent has a coverage problem, a verifier-discrimination problem, a distribution-shift problem, or a proxy-optimization problem.

## Slide 1: Generator and Selector

Repeated sampling expands the candidate set. Robust verification determines whether that latent capability becomes a correct returned answer.

**Checkpoint:** Why can pass@k rise while selected-answer accuracy falls?

## Slide 2: Outcome-Verifier Loop

Generate many complete solutions, label them by final correctness, train a scalar verifier, and rerank new candidates. This preserves a general generator while specializing the evaluator.

## Slide 3: False-Positive Extremes

More candidates create more chances for both a true solution and an extreme verifier mistake. Selecting the maximum noisy score can eventually hurt.

**Challenge:** Construct a toy candidate set where adding wrong candidates makes the selected result worse.

## Slide 4: ORM and PRM

An ORM scores a completed trajectory. A PRM scores intermediate steps, giving finer credit assignment and exposing wrong reasoning that reaches a correct answer by luck.

## Slide 5: Process Rubric

Step labels reflect an annotation policy: Is the step correct, relevant, and sufficiently justified? This can make reasoning more inspectable while penalizing valid shortcuts or unfamiliar methods.

**Prompt:** What valid student reasoning style might a rigid process rubric reject?

## Slide 6: Active Learning

PRM800K targets informative examples such as uncertain steps and convincing wrong solutions. This can improve annotation efficiency but changes the training distribution and complicates cost comparisons with ORM labels.

## Slide 7: Rollout Labels

Math-Shepherd estimates whether a reasoning prefix can still reach the correct final answer. The hard label asks whether any continuation succeeds; the soft label uses the success frequency.

## Slide 8: Rollout Failures

The label reflects both prefix quality and rollout-policy capability. A good but rare path may receive no success signal; a wrong step may be rescued later.

**Checkpoint:** Is a rollout label measuring truth, search potential, or both?

## Slide 9: Reranking and RL

A PRM can rank candidates at inference and reward policy updates during training. When the proxy is incomplete, training may discover ways to raise the score without improving correctness.

## Slide 10: Weaver

Weaver combines heterogeneous LM judges and reward models. It normalizes scores, filters poor verifiers, estimates reliability, and uses weighted evidence. Weak means imperfect, not useless.

## Slide 11: Dependence

Ten verifiers with one shared blind spot can behave like one verifier repeated ten times. Ensemble value comes from complementary error, not component count alone.

**Challenge:** What would weighting accomplish if every verifier shares the same failure?

## Slide 12: Budgeted System

Evaluate the entire pipeline:

1. candidate coverage;
2. selected-answer accuracy;
3. calibration under distribution shift;
4. inference cost and latency;
5. transfer beyond the training benchmark.

Bridge to Part 4: feedback becomes useful for improvement only when tools and code make outcomes observable enough to learn from.

## Homework

Design a verifier for one student-AI assignment. Define the candidate generator, outcome evidence, process evidence, known blind spot, appeal or human-review gate, and a test for distribution shift. Explain what the verifier can reject and what it cannot prove.
