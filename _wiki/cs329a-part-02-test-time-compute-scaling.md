---
title: "Stanford CS329A Part 2 — Test-Time Compute Scaling"
date: 2026-08-28
category: Learning Resources
tags: [cs329a, ai-agents, test-time-compute, inference-scaling, verification, repeated-sampling, reward-models, archon]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 1 — From Scaling to Self-Improving Agents", "Stanford CS329A Part 3 — Robust Verification", "CS329A Agent-System Literacy — The Next Layer of AI Education", "Harness / Loop / Graph Engineering — Environment, Feedback, Flow", "What is Agentic Engineering? A Teaching Primer"]
icon: "🧭"
image: "/assets/images/cs329a-test-time-compute-scaling.png"
---

More inference compute can give a fixed model more chances to find a good solution. It does **not** automatically make the answer returned to the user more reliable. Stanford CS329A Part 2 is useful because it separates candidate generation from the harder system questions: where to spend a finite budget, how to verify candidates, and when to stop.

This page is a detailed teaching companion to the public lecture. It combines the lecture transcript, visual inspection of 22 conceptual checkpoints, and the four primary papers assigned on the course page. The 12-slide teaching sequence condenses those 22 inspection checkpoints into a classroom narrative. Statements labeled as a **teaching synthesis** are instructional interpretations rather than direct claims from the lecturer.

*Primary sources: [official course site](https://cs329a.stanford.edu/) | [Part 2 video](https://www.youtube.com/watch?v=-Ggc37xLj_Y) | [official playlist](https://www.youtube.com/playlist?list=PLangBM27OtEA)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-02-test-time-compute.pdf](/learnAIDoc/assets/decks/cs329a-part-02-test-time-compute/cs329a-part-02-test-time-compute.pdf) | Best for reading and classroom sharing. |
| PPTX | [cs329a-part-02-test-time-compute.pptx](/learnAIDoc/assets/decks/cs329a-part-02-test-time-compute/cs329a-part-02-test-time-compute.pptx) | Image-based slides with speaker notes; text and diagrams are not individually editable. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-02-test-time-compute/contact-sheet.png) | Quick visual overview. |

![CS329A Part 2 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-02-test-time-compute/contact-sheet.png)

## The Core Idea

The lecture can be reduced to one system diagram:

```text
fixed model + inference budget
            |
            v
 generate / revise / search
            |
            v
 candidate coverage
            |
      verifier or selector
            |
            v
 returned-answer reliability
```

More compute changes the candidate set. Whether that improves the deployed answer depends on the rest of the pipeline.

The four questions to ask are:

1. What creates useful candidate diversity?
2. How is the finite budget allocated?
3. What evidence verifies success?
4. What stopping rule controls cost and latency?

## 1. What Test-Time Compute Means

It helps to locate test-time scaling beside the other compute frontiers.

| Frontier | What changes | When cost is paid | Main question |
|---|---|---|---|
| Pretraining | Broad model capability and weights | Before deployment | What patterns can the model represent? |
| Post-training | Behavior, instruction following, and preferences | Before deployment | How should the model respond? |
| Test-time scaling | Search, sampling, revision, tools, and selection with fixed weights | During each request | Which candidate should the system return? |

The model weights remain fixed during the task. The system spends more inference compute by generating more candidates, reasoning for longer, revising a path, calling tools, or combining several models and evaluators.

This cost distinction matters. Pretraining cost can be amortized across many requests. Test-time compute is paid again for each request, so a FLOPs-matched research comparison is not automatically a deployment-cost conclusion.

## 2. Repeated Sampling Buys More Chances

Repeated sampling is the simplest strategy:

```text
                 candidate 1
               /
fixed model -> candidate 2 -> verifier -> selected answer
               \
                 candidate k
```

For one problem with single-attempt success probability `p`, an idealized independent-attempt model gives:

```text
failure after k attempts = (1 - p)^k
pass@k                   = 1 - (1 - p)^k
```

This formula is useful intuition, but its assumptions must remain visible:

- every attempt has the same success probability;
- attempts are independent;
- correctness can be recognized.

Real samples from the same model and prompt often make correlated mistakes. Ten candidates may contain far less than ten independent chances.

The assigned paper [Large Language Monkeys: Scaling Inference Compute with Repeated Sampling](https://arxiv.org/abs/2407.21787) reports that coverage can continue improving over large sample ranges on selected tasks. Its central qualification is equally important: when automatic verification is unavailable, majority voting and learned selectors can plateau while oracle coverage continues to rise.

## 3. Coverage Is Not Returned Reliability

This is the most important distinction in the lecture.

```text
coverage / pass@k
    = did any candidate solve the problem?

returned-answer reliability
    = did the deployed system return a correct answer?
```

Suppose a model generates 100 candidates. One is correct, but the selector ranks a polished wrong answer first.

| Metric | Result |
|---|---|
| Candidate coverage | Improved: the correct answer exists in the set. |
| Returned-answer reliability | Did not improve: the user still receives a wrong answer. |

This prevents a common benchmark-to-product error. A large oracle `pass@k` result measures latent candidate coverage under a known evaluator. It is not equivalent to a production system that can reliably identify the correct candidate.

## 4. Why Aggregate Scaling Can Look Like a Power Law

The paper [How Do Large Language Monkeys Get Their Power (Laws)?](https://arxiv.org/abs/2502.17578) resolves an apparent puzzle.

For a fixed problem, the independence model predicts exponential failure decay. Across a benchmark, however, average failure can look power-law scaled. Both can be true when problem-level success probabilities vary heavily across the benchmark, leaving a long tail of hard problems.

```text
many easier problems
    -> leave the failure pool quickly

rare, extremely hard problems
    -> remain unsolved and dominate the average

result
    -> aggregate curve can look much slower than each fixed-problem curve
```

The long tail bends the benchmark curve. That does not mean every individual problem follows a power law.

## 5. Verification Determines Whether Scaling Is Usable

Repeated sampling becomes operationally useful when the system can recognize success.

| Domain | Available evidence | Important limitation |
|---|---|---|
| Code | Unit tests, type checks, runtime checks | Passing specified tests does not prove general correctness. |
| Formal proofs | Proof assistant | Only checks a formalized claim and proof in the system. |
| Mathematics | Exact answer, symbolic rules, formalization | Informal reasoning may remain difficult to check. |
| Writing and policy | Rubrics, citations, human review | Quality and truth are partly open-ended. |
| Science | Experiments, data, expert review | Checks can be expensive, slow, or incomplete. |

The phrase **generation-verification gap** names the asymmetry: producing plausible candidates can be cheap, while determining which candidate is actually correct may be expensive or unresolved.

More samples can make the selector's job harder. A weak evaluator may favor confidently written errors, reward superficial features, or fail outside its training distribution.

## 6. Breadth Versus Depth

A fixed inference budget can be spent in different ways.

```text
PARALLEL SAMPLING                 SEQUENTIAL REVISION

      -> candidate A                  draft
model -> candidate B                    |
      -> candidate C                 feedback
      -> candidate D                    |
                                      revise

multiple stochastic paths           repair one path
often correlated failures           depends on useful feedback
```

Parallel sampling explores breadth. Sequential revision explores depth. Neither is universally better.

The useful mix depends on:

- the base model's probability of reaching a promising path;
- how correlated the candidate failures are;
- whether feedback identifies the real error;
- problem difficulty;
- latency and token budget.

## 7. Outcome and Process Reward Models

The lecture distinguishes two learned evaluators.

| Evaluator | What it scores | How it guides search |
|---|---|---|
| Outcome reward model (ORM) | The final answer | Rank complete candidates or select best-of-N. |
| Process reward model (PRM) | Intermediate reasoning steps | Prune weak branches and retain promising paths during search. |

A process reward model can guide beam search:

```text
start
  +-- step A: 0.2  -> prune
  +-- step B: 0.8  -> expand
  |      +-- step B1: 0.6
  |      +-- step B2: 0.9 -> retain
  +-- step C: 0.4  -> prune
```

The score is learned evidence, not ground truth. A PRM can confidently reward a bad step, especially outside its training distribution.

## 8. Compute-Optimal Means Setup-Optimal

[Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314) studies adaptive allocation based on estimated problem difficulty.

The main teaching idea is not that one search strategy always wins. It is the opposite:

```text
same model + same budget + different problem difficulty
    -> different useful allocations of parallel search and revision
```

An easy problem may need only a short correction. A medium problem may benefit from a mixed strategy. An extremely hard problem may gain little from additional search if the base model almost never reaches a viable path.

“Compute-optimal” therefore means optimal within the experimental frame:

- chosen base model;
- chosen verifier or reward model;
- chosen search methods;
- estimated difficulty;
- fixed budget and benchmark.

It is not a universal routing law.

## 9. Archon Searches Over Inference Architectures

[Archon](https://arxiv.org/abs/2409.15254) raises the optimization unit from one candidate to an entire inference architecture.

Inputs include:

- target benchmark;
- token or compute budget;
- available language models;
- an operator library.

Operators can include:

| Operator | Role |
|---|---|
| Generator | Produce candidate answers. |
| Fuser | Combine useful parts of several candidates. |
| Critic | Identify weaknesses or contradictions. |
| Ranker | Order candidates. |
| Verifier | Test a candidate against evidence or rules. |
| Unit-test generator or evaluator | Generate task-specific tests or execute code checks. |

An architecture-search procedure composes these operators into a graph tailored to the benchmark and budget.

```text
operator library + models + budget + benchmark
                     |
                     v
              architecture search
                     |
                     v
       generate -> rank -> fuse -> critique -> verify
```

The result is specific to the benchmark, operator set, models, search procedure, and paper revision. The course video and the inspected arXiv revision use different headline result framing, so this post does not use one average percentage as a general superiority claim.

The official implementation is available at [ScalingIntelligence/Archon](https://github.com/ScalingIntelligence/Archon).

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | More inference creates options, not guarantees. |
| 2 | Test-time scaling searches with fixed weights. |
| 3 | Repeated sampling buys more chances. |
| 4 | Coverage and returned reliability are different metrics. |
| 5 | The pass@k formula needs visible assumptions. |
| 6 | A heavy tail explains aggregate scaling behavior. |
| 7 | Verification quality is domain-dependent. |
| 8 | One budget can buy breadth or depth. |
| 9 | ORMs score finishes; PRMs shape routes. |
| 10 | Allocation should respond to estimated difficulty. |
| 11 | Archon searches over inference architectures. |
| 12 | Diagnose diversity, allocation, verification, and stopping. |

## Teaching Questions

Use these checkpoints after the deck.

1. A model generates 100 answers and one is correct, but its selector misses it. Which metric improved?
2. Why are ten samples from one model not necessarily ten independent chances?
3. What can a unit test reject, and what can it not prove?
4. Why might a very hard problem receive less test-time compute in a compute-optimal policy?
5. When is sequential revision better than parallel sampling?
6. What can make a process reward model dangerous?
7. Which part of Archon is optimized for the benchmark rather than universally optimal?

## Homework: Design Two Equal-Budget Systems

Choose one task from university teaching, research writing, data analysis, or coding.

Design two systems with the same token budget:

| Requirement | System A | System B |
|---|---|---|
| Strategy | Parallel sampling | Sequential revision |
| Candidate generator | Specify | Specify |
| Verifier | Specify | Specify |
| Stopping rule | Specify | Specify |
| Likely correlated failure | Explain | Explain |
| Privacy exposure | Explain | Explain |
| Expected latency | Estimate comparatively | Estimate comparatively |

Conclude which system you would deploy. Name the evidence that would cause you to reverse your decision.

## Four Assigned Papers

1. Bradley Brown et al. (2024), [Large Language Monkeys: Scaling Inference Compute with Repeated Sampling](https://arxiv.org/abs/2407.21787), arXiv:2407.21787.
2. Charlie Snell et al. (2024), [Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314), arXiv:2408.03314.
3. Jon Saad-Falcon et al. (2024; revised 2025), [Archon: An Architecture Search Framework for Inference-Time Techniques](https://arxiv.org/abs/2409.15254), arXiv:2409.15254.
4. Rylan Schaeffer et al. (2025), [How Do Large Language Monkeys Get Their Power (Laws)?](https://arxiv.org/abs/2502.17578), arXiv:2502.17578.

## Source Versus Teaching Synthesis

Directly sourced from the lecture and papers:

- repeated sampling and coverage;
- per-problem pass@k behavior;
- heavy-tailed aggregate explanation;
- parallel and sequential test-time strategies;
- outcome and process reward models;
- adaptive compute allocation;
- Archon's operator and architecture-search framework.

Teaching synthesis in this page:

- the four-question diagnostic;
- the phrase “options, not guarantees” as the organizing headline;
- the university homework and classroom examples;
- the deployment distinction between recurring inference cost and amortized training cost.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 1 — From Scaling to Self-Improving Agents](/learnAIDoc/wiki/cs329a-part-01-course-overview/)
- [Stanford CS329A Part 3 — Robust Verification](/learnAIDoc/wiki/cs329a-part-03-robust-verification/)
- [CS329A Agent-System Literacy — The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [Harness / Loop / Graph Engineering — Environment, Feedback, Flow](/learnAIDoc/wiki/harness-loop-graph-engineering/)
- [What is Agentic Engineering? A Teaching Primer](/learnAIDoc/wiki/what-is-agentic-engineering/)
