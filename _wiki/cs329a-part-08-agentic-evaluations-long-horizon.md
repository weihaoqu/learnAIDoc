---
title: "Stanford CS329A Part 8 — Agentic Evaluations and Long-Horizon Tasks"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, evaluation, long-horizon, metr, gdpval, deepscholar, research-synthesis]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 7 — Self-Improvement and Deep Research Agents", "Stanford CS329A Part 9 — Future Research Areas"]
icon: "📏"
image: "/assets/images/cs329a-part-08-agentic-evaluations-long-horizon.png"
---

How capable is an AI agent? Stanford CS329A Part 8 shows why one leaderboard cannot answer that question. Human-time horizons, professional deliverable quality, and evidence-grounded research synthesis expose different strengths and different failure modes.

This teaching companion uses the complete official-video transcript, 18 inspected visual cues, and pinned primary-paper revisions. The DeepScholar-Bench figures are versioned explicitly because the Autumn 2025 lecture and the current 2026 paper revision report different aggregates.

*Source: [CS329A course site](https://cs329a.stanford.edu/) | [official Part 8 video](https://www.youtube.com/watch?v=8JAqLnTaZu4) | [METR v4](https://arxiv.org/abs/2503.14499v4) | [GDPval v1](https://arxiv.org/abs/2510.04374v1) | [DeepScholar-Bench v2](https://arxiv.org/abs/2508.20033v2)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-08-agentic-evaluations-long-horizon.pdf](/learnAIDoc/assets/decks/cs329a-part-08-agentic-evaluations-long-horizon/cs329a-part-08-agentic-evaluations-long-horizon.pdf) | Best for reading and teaching. |
| PPTX | [cs329a-part-08-agentic-evaluations-long-horizon.pptx](/learnAIDoc/assets/decks/cs329a-part-08-agentic-evaluations-long-horizon/cs329a-part-08-agentic-evaluations-long-horizon.pptx) | Image-based slides with speaker notes. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-08-agentic-evaluations-long-horizon/contact-sheet.png) | Quick visual overview. |

![CS329A Part 8 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-08-agentic-evaluations-long-horizon/contact-sheet.png)

## The Core Idea

```text
                 agent capability claim
                         |
       +-----------------+-----------------+
       |                 |                 |
       v                 v                 v
  task duration     deliverable value    evidence quality
       |                 |                 |
       +-----------------+-----------------+
                         |
                 deployment decision
```

Each branch has a different unit, protocol, and blind spot. Combining them is a teaching recommendation, not a metric proposed by one paper.

## 1. Time Horizons Measure a Reliability Boundary

The METR work starts with tasks timed on skilled humans. Agent success is measured across those tasks, then fit against human completion time.

```text
agent success
100% |\
     | \
 50% |--X  <- 50% horizon
     |    \
  0% +-----\------------ human completion time
```

The `50% time horizon` is the fitted duration where model success reaches 50%. It is not the longest task an agent completed once.

The choice of threshold matters:

| Threshold | Question | Deployment interpretation |
|---|---|---|
| 50% | Where does the model succeed half the time? | Useful for tracking frontier movement; weak for unattended reliability. |
| 80% | Where does the model succeed four times out of five? | Stricter but still leaves material failure risk. |

METR v4, revised 2026-07-10, reports a Claude 3.7 Sonnet 50% horizon around 50 minutes and an approximate seven-month historical doubling trend since 2019. The paper explicitly discusses external-validity limits. Its fitted trend must not be treated as an unconditional forecast of workplace automation.

## 2. Long Tasks Fail Through Trajectories

The lecture's failure analysis includes:

- poor planning or tool choice;
- incorrect reasoning or mental models;
- premature task abandonment;
- repeated failed actions.

These failures compound over time. A final pass/fail score does not show whether the system chose the wrong tool early, entered a loop, or abandoned a recoverable path.

Human time is also an imperfect difficulty proxy. Estimates depend on expertise, familiarity, tools, instructions, and repository context.

## 3. GDPval Measures Professional Deliverables

GDPval changes the target from duration to economically valuable output.

```text
professional task brief + reference context
                    |
              model deliverable
                    |
       pairwise expert comparison
                    |
            preference judgment
```

The benchmark covers 44 occupations across nine high-GDP U.S. sectors. The lecture describes 1,320 tasks and a 220-task open gold subset; the paper releases the 220-task subset.

The paper reports roughly linear improvement across its compared model snapshot and says leading systems approach experts in aggregate deliverable quality. That does **not** mean:

- parity on every task or occupation;
- autonomous discovery and execution of an entire workflow;
- job replacement;
- equal performance without supplied context or scaffolding.

Performance varies with occupation, modality, task duration, context, reasoning effort, and scaffolding. Aggregate near-parity can hide important weak areas.

## 4. Research Synthesis Needs Three Scores

DeepScholar-Bench evaluates a live related-work task.

| Dimension | Main question | Example failure |
|---|---|---|
| Knowledge synthesis | Is the report coherent and does it cover key facts? | Polished prose misses a central result. |
| Retrieval quality | Did it find relevant and important prior work? | Found recent papers but missed the foundational source. |
| Verifiability | Do citations support claims, and are claims cited? | Citation is relevant to the topic but not to the stated claim. |

An oracle-source experiment can provide the target references. If performance remains weak, the bottleneck is no longer only retrieval; evidence extraction and synthesis also matter.

## 5. The DeepScholar Version Boundary

This discrepancy must remain visible:

| Snapshot | Exact statement used here | Interpretation |
|---|---|---|
| Autumn 2025 lecture slide | No evaluated system exceeded `19%` across the lecture aggregate. | Lecture-time result tied to that presentation/version. |
| arXiv v2, revised 2026-02-09 | No system surpasses a `31% geometric mean` across all metrics. | Current v2 abstract statement. |

**Do not subtract or connect these numbers.** The paper revision, evaluated systems, or aggregation details may differ. They are not directly comparable, are not a time trend, and do not establish a 12-point improvement.

The stable conclusion across both snapshots is narrower: the benchmark remains far from saturated, and no system simultaneously solves synthesis, retrieval, and verifiability.

## 6. Build an Evaluation Portfolio

For a deployment claim, record the protocol before the score:

| Audit field | Question |
|---|---|
| Task distribution | What work is included and excluded? |
| Threshold | Is success measured at 50%, 80%, expert preference, or another criterion? |
| Context | What instructions, references, tools, and scaffolding are supplied? |
| Evidence | Who or what judges correctness and utility? |
| Version | Which paper/benchmark revision and model snapshot produced the number? |
| Blind spot | What deployment behavior remains untested? |

Long duration does not guarantee useful output. Useful deliverables do not establish autonomous work. Fluent research prose does not guarantee source coverage or support.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | One benchmark cannot certify an agent. |
| 2 | Duration, value, and evidence are independent axes. |
| 3 | A time horizon is a fitted reliability boundary. |
| 4 | The chosen success threshold changes the horizon. |
| 5 | The seven-month trend is historical and conditional. |
| 6 | Long tasks fail through trajectories. |
| 7 | GDPval evaluates professional deliverables. |
| 8 | GDPval samples work, not whole occupations. |
| 9 | Aggregate near-parity hides heterogeneity. |
| 10 | Research synthesis needs three scores. |
| 11 | 19% and 31% are separate version snapshots. |
| 12 | Match claims to an evaluation portfolio. |

## Homework: Evaluate a University Research Agent

Design three tasks for an AI research assistant:

1. a multi-step task with a skilled-human time estimate;
2. an economically or academically valuable deliverable judged pairwise;
3. a cited related-work synthesis graded for synthesis, retrieval, and verifiability.

For each task, state the threshold, supplied context, judge, expected failure mode, and blind spot. Conclude what evidence would be necessary before allowing unattended use.

## Source Versus Teaching Synthesis

Directly sourced:

- METR's human-calibrated time-horizon method, historical fit, and failure analysis;
- GDPval's occupational coverage, task construction, pairwise expert evaluation, and aggregate findings;
- DeepScholar-Bench's three dimensions and version-specific aggregate statements;
- the lecture's cross-benchmark discussion.

Teaching synthesis:

- the three-axis evaluation portfolio;
- the deployment audit table;
- the university research-agent homework;
- the rule that every slide should expose distribution, threshold, context, version, and blind spot.

## References

1. [Stanford CS329A course site](https://cs329a.stanford.edu/).
2. [Official Part 8 video](https://www.youtube.com/watch?v=8JAqLnTaZu4).
3. Thomas Kwa et al., [Measuring AI Ability to Complete Long Software Tasks](https://arxiv.org/abs/2503.14499v4), v4, 2026.
4. Tejal Patwardhan et al., [GDPval](https://arxiv.org/abs/2510.04374v1), v1, 2025.
5. Liana Patel et al., [DeepScholar-Bench](https://arxiv.org/abs/2508.20033v2), v2, 2026.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 7 — Self-Improvement and Deep Research Agents](/learnAIDoc/wiki/cs329a-part-07-self-improvement-deep-research/)
- [Stanford CS329A Part 9 — Future Research Areas](/learnAIDoc/wiki/cs329a-part-09-future-research-areas/)
