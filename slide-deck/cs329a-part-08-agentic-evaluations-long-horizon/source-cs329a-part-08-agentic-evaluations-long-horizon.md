# Stanford CS329A Part 8: Agentic Evaluations and Long-Horizon Tasks

Primary source: [official Part 8 video](https://www.youtube.com/watch?v=8JAqLnTaZu4)

- Course: [Stanford CS329A, Self-Improving AI Agents, Autumn 2025](https://cs329a.stanford.edu/)
- Video duration: `1:15:17`
- Evidence collected: complete native-caption transcript and 18 inspected visual cues
- Frozen evidence report: `slide-deck/cs329a-series/research/part-08-agentic-evaluations-long-horizon.md`
- Accessed: 2026-08-29
- Scope: human-time horizons, economically valuable deliverables, and evidence-grounded research synthesis
- Production rule: primary-paper revisions control current claims; lecture-time numbers remain labeled as lecture snapshots

## Core Thesis

No single benchmark certifies an agent. Task duration, economic value, and evidence quality measure different failure surfaces.

```text
                 agent output
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
 human-time       workplace      evidence
  horizon          value          quality
        |             |             |
        +-------------+-------------+
                      |
             deployment judgment
```

## Lecture Map

### 1. Evaluation Needs More Than Saturated Benchmarks (00:00-04:32)

The lecture separates capability from economic impact. A benchmark score can improve while leaving unclear whether an agent completes longer work, produces useful deliverables, or supports its claims.

### 2. Human-Calibrated Time Horizons (04:32-27:21)

The METR work estimates a model's success as a function of the time a skilled human needs for the task. A 50% time horizon is the fitted human duration where model success is 50%; an 80% horizon asks a stricter reliability question.

Current arXiv v4 reports a Claude 3.7 Sonnet 50% horizon around 50 minutes and an approximate seven-month historical doubling trend. The paper explicitly discusses external-validity limits. A horizon is not the longest lucky success and does not imply that every shorter task is reliable.

Observed failure categories include planning/tool-choice errors, incorrect reasoning, premature abandonment, and repeated failed actions.

### 3. GDPval and Economically Valuable Deliverables (27:21-51:34)

GDPval covers 44 occupations across nine high-GDP U.S. sectors. Experienced professionals create tasks and reference deliverables, and experts compare outputs pairwise. The paper reports roughly linear improvement across the model snapshot and says leading systems approach experts in aggregate deliverable quality.

The benchmark supplies rich task context and focuses on predominantly digital work. It does not establish autonomous occupation-level performance or job replacement. Performance varies by occupation, modality, duration, scaffolding, and context.

### 4. DeepScholar-Bench and Evidence Quality (51:34-61:03)

DeepScholar-Bench evaluates related-work synthesis on three dimensions:

1. knowledge synthesis;
2. retrieval quality;
3. verifiability.

Coherent prose can still miss foundational papers, key facts, or claim-level support. Oracle-source experiments separate retrieval failure from reading and synthesis failure.

### 5. Required Version Boundary

The lecture slide recorded in Autumn 2025 states that no evaluated system exceeded `19%` across all metrics. Current arXiv `v2`, revised 2026-02-09, states that no system surpasses a `31% geometric mean` across all metrics.

These values belong to different revisions and may use different system sets or aggregation details. They are **not directly comparable**, must not be graphed as a time trend, and do not show a 12-point improvement claim.

### 6. Evaluation Portfolio (61:03-75:17)

The lecture closes by combining the three views. Longer task duration does not imply useful or well-supported output. Economic value does not imply autonomous workflow execution. Polished synthesis does not imply comprehensive retrieval or citation support.

## Durable Mental Model

For an agent deployment claim, ask:

1. What task distribution is measured?
2. What success threshold is fitted or judged?
3. What context and scaffolding are supplied?
4. What dimensions are absent from the benchmark?
5. What version and metric definition produced each number?

## Primary References

1. Stanford, [CS329A course schedule](https://cs329a.stanford.edu/), accessed 2026-08-29.
2. Stanford Online, [Part 8 official video](https://www.youtube.com/watch?v=8JAqLnTaZu4), accessed 2026-08-29.
3. Thomas Kwa et al., [Measuring AI Ability to Complete Long Software Tasks](https://arxiv.org/abs/2503.14499v4), arXiv v4, revised 2026-07-10.
4. Tejal Patwardhan et al., [GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks](https://arxiv.org/abs/2510.04374v1), arXiv v1, 2025-10-05.
5. Liana Patel et al., [DeepScholar-Bench](https://arxiv.org/abs/2508.20033v2), arXiv v2, revised 2026-02-09.
