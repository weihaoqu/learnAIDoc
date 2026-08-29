---
title: "Stanford CS329A Part 3 — Robust Verification"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, verification, outcome-reward-model, process-reward-model, math-shepherd, weaver, reward-hacking]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 2 — Test-Time Compute Scaling", "Stanford CS329A Part 4 — Learning from Feedback with Tools and Code", "CS329A Agent-System Literacy — The Next Layer of AI Education", "AI Ethics in College: Stop Asking \"Did Students Use AI?\" Ask Whether They Learned"]
icon: "🔎"
image: "/assets/images/cs329a-robust-verification.png"
---

A generator may produce a correct answer somewhere in a large candidate set while a noisy selector still returns the wrong one. Stanford CS329A Part 3 explains why verification is not a final checkbox after generation. It is a learned, fallible control system with its own supervision, calibration, dependence, distribution-shift, and compute problems.

This teaching companion is grounded in the complete public lecture caption stream, 26 inspected visual checkpoints, and four assigned primary papers. The 12-slide sequence condenses that evidence into a classroom narrative. The diagnostic framework and student assignment are teaching syntheses, not direct claims from Stanford.

*Primary sources: [course site](https://cs329a.stanford.edu/) | [Part 3 video](https://www.youtube.com/watch?v=p7TdPUcPoik) | [official playlist](https://www.youtube.com/playlist?list=PLangBM27OtEA)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-03-robust-verification.pdf](/learnAIDoc/assets/decks/cs329a-part-03-robust-verification/cs329a-part-03-robust-verification.pdf) | Best for reading and classroom sharing. |
| PPTX | [cs329a-part-03-robust-verification.pptx](/learnAIDoc/assets/decks/cs329a-part-03-robust-verification/cs329a-part-03-robust-verification.pptx) | Image-based slides with speaker notes. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-03-robust-verification/contact-sheet.png) | Quick visual overview. |

![CS329A Part 3 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-03-robust-verification/contact-sheet.png)

## The Core Problem

Part 2 established that more inference compute can raise candidate coverage. Part 3 asks what happens after generation.

```text
generator produces candidates
          |
          v
  correct answer exists?
          |
          v
noisy verifier scores candidates
          |
          v
one selected answer reaches the user
```

The verifier can fail even when the generator succeeds.

Four failure modes organize the lecture:

| Failure mode | Question |
|---|---|
| Coverage failure | Did the generator produce any correct candidate? |
| Discrimination failure | Can the verifier separate correct from plausible wrong candidates? |
| Shift failure | Does calibration survive outside the verifier's training distribution? |
| Proxy failure | Does optimizing the score improve correctness or only the proxy? |

## 1. Outcome Verification

[Training Verifiers to Solve Math Word Problems](https://arxiv.org/abs/2110.14168) provides the first pipeline.

```text
question
   -> generator creates many complete solutions
   -> label each by final-answer correctness
   -> train a verifier to estimate correctness
   -> generate new candidates
   -> return the highest-scoring candidate
```

An outcome verifier is useful because the generator can remain relatively general while the verifier specializes in ranking solutions for a task.

The important boundary is:

```text
verifier score = learned evidence for ranking
verifier score != proof of truth
```

The model architecture and benchmark are historical. The lecture uses GSM8K, a dataset of grade-school math word problems with multi-step natural-language solutions. Results from that setup should not become a fixed modern rule for generator and verifier sizing.

## 2. Why More Candidates Can Hurt Selection

Adding candidates creates two simultaneous effects:

1. a greater chance that at least one candidate is correct;
2. a greater chance that at least one wrong candidate receives an extreme false-positive score.

```text
small N
  one correct candidate competes with a few wrong candidates

large N
  one correct candidate competes with many opportunities for verifier error
```

The lecture shows selected-answer accuracy rising and then declining after roughly 400 candidates in one displayed experiment. The number is not a recommended universal budget. The mechanism is the lesson: selecting the maximum of noisy scores can become less reliable as the candidate pool grows.

Coverage can rise while selected-answer accuracy falls.

## 3. Outcome Versus Process Reward Models

[Let's Verify Step by Step](https://arxiv.org/abs/2305.20050) adds process supervision.

| Model | What receives a score | Main strength | Main limitation |
|---|---|---|---|
| Outcome reward model (ORM) | Completed solution or final result | Cheap, simple final supervision | Weak credit assignment; wrong reasoning can reach a correct result. |
| Process reward model (PRM) | Intermediate reasoning steps | Localizes errors and guides search | Requires a step rubric and much richer annotation. |

The same trajectory looks different under the two evaluators:

```text
ORM
step 1 -> step 2 -> step 3 -> answer -> final score

PRM
step 1     step 2     step 3     answer
 0.9        0.3        0.8        0.7
```

The process signal reveals where the chain became questionable. That improves credit assignment, but the score still reflects an annotation policy.

## 4. Process Labels Encode a Rubric

Human annotators judge intermediate steps according to a task-specific correctness rubric, including whether each step is mathematically valid and useful for reaching the solution.

Those labels can make reasoning more inspectable. They can also penalize valid shortcuts, unfamiliar methods, or reasoning styles that depart from the endorsed rubric.

The correct educational conclusion is not “PRMs reveal true reasoning.” It is:

```text
process supervision provides denser evidence,
but the evidence inherits human definitions of acceptable process
```

The paper's small fresh STEM evaluation supports moderate transfer to nearby reasoning tasks. It does not establish broad generalization to open-ended writing, student essays, policy, or social judgment.

## 5. Active Learning and PRM800K

PRM800K uses active learning to concentrate annotation on informative mistakes rather than sample uniformly.

```text
uniform labeling
  annotate examples across the full space

active selection
  target uncertainty + convincing wrong solutions
```

The paper estimates improved annotation efficiency in its setup. That result needs two qualifications:

1. active selection changes the training distribution;
2. a process-step annotation has a different cost from a final outcome label.

Matching raw label counts is therefore not enough for a fair ORM-versus-PRM cost comparison.

## 6. Automatic Process Labels with Math-Shepherd

[Math-Shepherd](https://arxiv.org/abs/2312.08935) trades human annotation for rollout compute.

From a partial reasoning prefix, sample continuations and check whether they reach the correct final answer.

```text
hard label = 1 if any sampled continuation succeeds

soft label = successful continuations / all sampled continuations
```

This label estimates the prefix's potential under a particular rollout policy and budget.

It creates two memorable failures:

| Failure | What happens |
|---|---|
| Rare valid path missed | A good prefix is labeled bad because finite rollouts never discover its successful continuation. |
| Wrong step luckily repaired | A bad prefix is labeled good because a later continuation accidentally reaches the correct answer. |

So a rollout label mixes at least three things:

- prefix quality;
- rollout-policy capability;
- sampling luck.

## 7. Verification Can Feed Training

Math-Shepherd uses its learned PRM in two places:

```text
                         -> inference-time reranking
process reward model ---|
                         -> PPO-style policy updates
```

At inference, the PRM helps select among candidates. During training, it becomes a reward for changing the generator.

This introduces a new risk. When the reward model is incomplete, the policy may discover behaviors that raise the verifier score without improving the intended objective.

```text
optimize proxy score
        |
        +--> real correctness improves
        |
        +--> reward hacking: proxy improves, goal does not
```

## 8. Ensembles of Weak Verifiers

[Shrinking the Generation-Verification Gap with Weak Verifiers](https://arxiv.org/abs/2506.18203) introduces Weaver.

Here, **weak** means imperfect, not deliberately poor. Weaver combines heterogeneous reward models and language-model judges.

```text
heterogeneous verifier scores
          |
          v
normalize to a common scale
          |
          v
filter low-quality sources
          |
          v
estimate reliability and weight evidence
          |
          v
select one candidate
```

Simple voting is not enough. Adding more verifiers does not improve monotonically because components differ in quality and bias.

## 9. Complementary Error Versus Shared Blind Spots

The value of an ensemble comes from error diversity.

```text
complementary errors
  verifier A catches what B misses
  verifier B catches what C misses
  disagreement carries information

correlated blind spot
  A, B, and C make the same systematic mistake
  agreement repeats error rather than adding evidence
```

Ten verifiers with one shared failure may behave like the same verifier repeated ten times. Weighting cannot create independent evidence that does not exist.

Weak-supervision aggregation therefore depends on:

- verifier quality;
- error dependence;
- score normalization;
- low-quality filtering;
- assumptions or estimates about source reliability.

An ensemble also cannot recover a correct answer the generator never produced.

## 10. Distilling Verification

Weaver also distills the larger verifier ensemble into a smaller cross-encoder to reduce serving cost.

Distillation changes the cost location:

```text
expensive ensemble supervision during training
                  |
                  v
smaller verifier model during repeated inference
```

Lower serving cost does not erase the training and data-generation cost. It amortizes that cost across future requests.

The recorded lecture and the current arXiv revision report different exact headline figures. This post therefore avoids a version-unstable percentage claim and points readers to the cited paper version for current numbers.

## The Verification Budget

Verification design allocates compute across several axes:

| Budget axis | What it changes | Failure if overused alone |
|---|---|---|
| Candidate count | Coverage | More false-positive opportunities. |
| Generator strength | Candidate quality | Higher generation cost; still needs checking. |
| Verifier strength | Discrimination | Can remain biased or miscalibrated. |
| Verifier count | Evidence diversity | Shared blind spots and aggregation cost. |
| Distillation | Serving efficiency | Can compress ensemble mistakes too. |

The metric should be end-to-end selected-answer accuracy, not just oracle coverage or verifier score.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | A generator is only as useful as its selector. |
| 2 | Build the generate-label-train-rerank loop. |
| 3 | See why false-positive opportunities grow with N. |
| 4 | Separate outcome from process scores. |
| 5 | Treat process labels as rubric-dependent. |
| 6 | Use active learning to target informative mistakes. |
| 7 | Derive hard and soft rollout labels. |
| 8 | Identify rollout-policy blind spots. |
| 9 | Feed verification to reranking and training. |
| 10 | Normalize, filter, weight, and select with Weaver. |
| 11 | Distinguish complementary error from shared blind spots. |
| 12 | Design a budgeted end-to-end verification system. |

## Teaching Questions

1. Why can `pass@k` rise while selected-answer accuracy falls?
2. When does maximizing a noisy verifier score become dangerous?
3. What information does a process label add beyond a final-answer label?
4. Which valid reasoning shortcut might a rigid process rubric reject?
5. Why are ORM and PRM label counts not directly cost-comparable?
6. Is a Math-Shepherd rollout label measuring truth, search potential, or both?
7. How can a wrong step receive a positive automatic process label?
8. How could PPO against a PRM produce reward hacking?
9. What does Weaver still need despite being weakly supervised?
10. What happens if every verifier shares the same blind spot?
11. When does distillation reduce serving cost without reducing training cost?
12. What evidence would be required before using a math-trained PRM to grade student essays?

## Homework: Design a Verifier for a Student-AI Assignment

Choose one assignment in programming, research writing, data analysis, or another university course.

Define:

| Component | Your design |
|---|---|
| Candidate generator | What work does the student or AI produce? |
| Outcome evidence | What final result can be checked? |
| Process evidence | What steps, prompts, drafts, or reasoning can be inspected? |
| Known blind spot | What important failure can the verifier miss? |
| Human-review gate | When must a teacher or peer intervene? |
| Distribution-shift test | How will you know the verifier no longer generalizes? |
| Appeal path | What evidence can a student provide if the verifier is wrong? |

Conclude with two statements:

```text
This verifier can reject: ____________________
This verifier cannot prove: __________________
```

## Four Assigned Papers

1. Karl Cobbe et al. (2021), [Training Verifiers to Solve Math Word Problems](https://arxiv.org/abs/2110.14168), arXiv:2110.14168.
2. Hunter Lightman et al. (2023), [Let's Verify Step by Step](https://arxiv.org/abs/2305.20050), arXiv:2305.20050.
3. Peiyi Wang et al. (2023), [Math-Shepherd: Verify and Reinforce LLMs Step-by-step without Human Annotations](https://arxiv.org/abs/2312.08935), arXiv:2312.08935.
4. Jon Saad-Falcon et al. (2025), [Shrinking the Generation-Verification Gap with Weak Verifiers](https://arxiv.org/abs/2506.18203), arXiv:2506.18203.

## Source Versus Teaching Synthesis

Directly sourced:

- outcome and process verifier definitions;
- historical selection reversal under large candidate pools;
- PRM800K active selection;
- Math-Shepherd rollout labeling and PRM use;
- Weaver's weighted aggregation and distillation;
- lecture caveats and open questions.

Teaching synthesis:

- the four-failure-mode diagnostic;
- the budget table;
- the student-assignment verifier homework;
- the phrase “noisy control system” as the organizing model.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 1 — From Scaling to Self-Improving Agents](/learnAIDoc/wiki/cs329a-part-01-course-overview/)
- [Stanford CS329A Part 2 — Test-Time Compute Scaling](/learnAIDoc/wiki/cs329a-part-02-test-time-compute-scaling/)
- [Stanford CS329A Part 4 — Learning from Feedback with Tools and Code](/learnAIDoc/wiki/cs329a-part-04-learning-feedback-tools-code/)
- [CS329A Agent-System Literacy — The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [AI Ethics in College: Stop Asking "Did Students Use AI?" Ask Whether They Learned](/learnAIDoc/wiki/ai-ethics-college-policy/)
