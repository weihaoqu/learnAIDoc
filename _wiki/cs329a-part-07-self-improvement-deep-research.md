---
title: "Stanford CS329A Part 7 — Self-Improvement and Deep Research Agents"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, alphacode, deep-research, agentic-search, retrieval, verification, code-generation]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 6 — Train-Time Scaling and Scaling RL", "Stanford CS329A Part 8 — Agentic Evaluations and Long-Horizon Tasks"]
icon: "🔎"
image: "/assets/images/cs329a-part-07-self-improvement-deep-research.png"
---

Stanford CS329A Part 7 connects two apparently different systems: competitive-programming agents that search over code and deep-research agents that search over evidence. The durable lesson is not simply to generate more. A useful search loop must create non-redundant options, obtain feedback, select under a budget, and know when to stop.

This teaching companion is based on the complete official-video transcript, 14 visually inspected cues, and the three primary course readings. Cross-paper connections are explicitly labeled as **teaching synthesis** rather than paper findings.

*Source: [CS329A course site](https://cs329a.stanford.edu/) | [official Part 7 video](https://www.youtube.com/watch?v=Uni9dqyuuDM) | [AlphaCode](https://arxiv.org/abs/2203.07814v1) | [AlphaCode 2 technical report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf) | [Search-o1](https://arxiv.org/abs/2501.05366)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-07-self-improvement-deep-research.pdf](/learnAIDoc/assets/decks/cs329a-part-07-self-improvement-deep-research/cs329a-part-07-self-improvement-deep-research.pdf) | Best for reading and teaching. |
| PPTX | [cs329a-part-07-self-improvement-deep-research.pptx](/learnAIDoc/assets/decks/cs329a-part-07-self-improvement-deep-research/cs329a-part-07-self-improvement-deep-research.pptx) | Image-based slides preserve the vector-rendered layout. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-07-self-improvement-deep-research/contact-sheet.png) | Quick visual overview. |

![CS329A Part 7 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-07-self-improvement-deep-research/contact-sheet.png)

## The Core Model

```text
generator
   |
   v
diverse candidates or queries
   |
   v
external feedback --------+
   |                       |
   +--> rank / select <----+
             |
       return or refine
             |
        stopping rule
```

This is a teaching abstraction. Running code against tests and retrieving documents provide different evidence with different failure modes.

## 1. AlphaCode Turns Code Generation Into Search

Competitive programming requires more than translating an instruction into syntax. A solver must:

1. interpret a long problem statement;
2. select an algorithm;
3. implement it correctly;
4. satisfy public examples and unseen tests.

AlphaCode uses a pipeline rather than one answer:

```text
training + problem
       |
large-scale code sampling
       |
execute public examples
       |
behavioral clustering
       |
small submission set
```

The 2022 paper reports an average top-54.3% rank in simulated Codeforces competitions with more than 5,000 participants. That statement belongs to those selected contests and that evaluation. It is not a claim that AlphaCode performs all professional software-engineering work.

## 2. `pass@k` and `10@k` Ask Different Questions

| Metric | Question | Main bottleneck |
|---|---|---|
| `pass@k` | Did any generated candidate succeed? | Candidate coverage |
| `10@k` | Can the system select ten useful submissions from a larger pool? | Selection quality |

A correct program can exist in a million-sample pool and still never be submitted. Coverage belongs to the set; practical reliability belongs to the generator, filters, clusters, scorer, and submission policy together.

## 3. AlphaCode 2 Improves Generation and Ranking

The AlphaCode 2 technical report describes five main components:

| Component | Role |
|---|---|
| Policy family | Produce more diverse code candidates. |
| Massive sampling | Search the model distribution. |
| Execution filtering | Remove candidates that fail public examples or compilation. |
| Behavioral clustering | Reduce redundant programs with similar runtime behavior. |
| Scoring model | Select one candidate from each retained cluster. |

The report states:

- 43% of 77 selected problems solved, versus 25% for AlphaCode;
- estimated average performance at the 85th percentile;
- up to one million candidates sampled per problem;
- at most ten submissions per problem.

Those denominators matter. The report demonstrates a strong competitive-programming system, not a cheap or general coding assistant.

## 4. Wider Search Is Not Always Better Search

As sample count rises, three bottlenecks can dominate:

1. **Redundancy:** many programs repeat the same strategy or mistake.
2. **Selection:** a scorer must identify correctness from a huge pool.
3. **Cost:** generation, execution, clustering, and reranking all consume resources.

The lecture discussion suggests difficulty-aware budgets, decomposition, tree search, backtracking, and human help for unfamiliar patterns. These are research directions discussed in class, not AlphaCode 2 results presented in the technical report.

## 5. Search-o1 Searches During Reasoning

A long reasoning chain may encounter a fact the model does not reliably know. If it guesses, later steps can remain fluent while inheriting the error.

Static retrieval and agentic retrieval differ in control:

| Static retrieval | Agentic retrieval |
|---|---|
| Retrieve once before generation. | Trigger search when a knowledge need appears. |
| Query is chosen before later reasoning. | Query can use the current reasoning state. |
| Fixed context package. | Recurrent search and context updates. |

Search-o1 inserts search actions into the reasoning process. The paper's **Reason-in-Documents** stage reads retrieved documents, extracts focused evidence, and returns that evidence to the main chain.

```text
reasoning state
     |
knowledge gap detected
     |
search -> documents -> focused evidence
     |                     |
     +------ resume <------+
```

This can reduce irrelevant context, but it does not guarantee that retrieval found the right sources or that the extraction preserved every important fact.

## 6. One Diagnostic Across Two Domains

Use five questions to audit either a coding-search or deep-research system:

| Question | Coding example | Research example |
|---|---|---|
| What creates diversity? | Policy family, sampling temperature | Query reformulation, source expansion |
| What feedback is available? | Compilation, public tests, runtime behavior | Documents, citations, claim support |
| How are candidates selected? | Clustering and scoring model | Relevance ranking and evidence synthesis |
| What if feedback is wrong? | Weak tests accept a faulty program | Misleading sources reinforce a false claim |
| When does search stop? | Submission and compute budget | Coverage, redundancy, latency, and review budget |

The shared questions are a teaching synthesis. Code tests are executable evidence; web documents remain claims that need provenance and interpretation.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | Search needs diversity, feedback, selection, and stopping. |
| 2 | Contest code is a full problem-solving chain. |
| 3 | AlphaCode searches a million-scale candidate space. |
| 4 | Coverage and small-set selection differ. |
| 5 | Useful diversity can flatten before compute does. |
| 6 | AlphaCode 2 improves candidates and ranking. |
| 7 | Results need their denominator. |
| 8 | Hard problems motivate adaptive search. |
| 9 | A knowledge gap can corrupt a reasoning chain. |
| 10 | Agentic retrieval searches during reasoning. |
| 11 | Reason-in-Documents compresses sources into evidence. |
| 12 | Audit the loop before trusting the answer. |

## Homework: Design a Bounded Search Agent

Choose one university task: a coding assignment, literature review, data-analysis report, or teaching-plan design.

Specify:

1. the candidate or query generator;
2. the mechanism that creates useful diversity;
3. the feedback source and its blind spots;
4. the selector or reranker;
5. one false-positive feedback event;
6. a stopping rule with cost and latency limits;
7. what uncertainty must be disclosed to the user.

Then identify which parts are mechanically verifiable and which still require teacher or expert judgment.

## Source Versus Teaching Synthesis

Directly sourced from the lecture and primary works:

- AlphaCode's training, sampling, filtering, clustering, and evaluation setup;
- the distinction between candidate coverage and small-set selection;
- AlphaCode 2's policy family, execution filtering, clustering, scoring model, and reported results;
- Search-o1's agentic retrieval and Reason-in-Documents mechanism;
- the lecture's discussion of adaptive search and calibration.

Teaching synthesis in this page:

- the five-question search diagnostic;
- the unified code-and-research loop;
- the university homework;
- the claim that feedback-channel design is the bridge between these examples.

## References

1. [Stanford CS329A course site](https://cs329a.stanford.edu/).
2. [Official Part 7 video](https://www.youtube.com/watch?v=Uni9dqyuuDM).
3. Yujia Li et al., [Competition-Level Code Generation with AlphaCode](https://arxiv.org/abs/2203.07814v1), 2022.
4. AlphaCode Team, Google DeepMind, [AlphaCode 2 Technical Report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf), 2023.
5. Xiaoxi Li et al., [Search-o1: Agentic Search-Enhanced Large Reasoning Models](https://arxiv.org/abs/2501.05366), 2025.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 6 — Train-Time Scaling and Scaling RL](/learnAIDoc/wiki/cs329a-part-06-train-time-scaling-rl/)
- [Stanford CS329A Part 8 — Agentic Evaluations and Long-Horizon Tasks](/learnAIDoc/wiki/cs329a-part-08-agentic-evaluations-long-horizon/)
