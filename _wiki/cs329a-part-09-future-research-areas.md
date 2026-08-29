---
title: "Stanford CS329A Part 9 — Future Research Areas"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, self-improvement, verification, curriculum, efficiency, continual-learning]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 8 — Agentic Evaluations and Long-Horizon Tasks"]
icon: "🔬"
image: "/assets/images/cs329a-part-09-future-research-areas.png"
---

What stops an AI agent from improving forever? Stanford CS329A Part 9 argues that the bottleneck is not one missing algorithm. Self-improvement is a coupled system: it needs diverse experience, trustworthy feedback, a learnable curriculum, durable adaptation, and infrastructure that can deliver capability efficiently.

This teaching companion uses the full official-video transcript, 25 inspected visual cues, and primary-paper revisions verified against their direct records on the workspace runtime date, 2026-08-29. The official schedule lists no assigned papers for this session; the four works below are the primary studies treated in this companion and identified from the lecture.

*Source: [CS329A course site](https://cs329a.stanford.edu/) | [official Part 9 video](https://www.youtube.com/watch?v=AyO6wyu4DEg) | [Multiagent Finetuning v2](https://arxiv.org/abs/2501.05707v2) | [DeepSeekMath-V2 v1](https://arxiv.org/abs/2511.22570v1) | [Absolute Zero v3](https://arxiv.org/abs/2505.03335v3) | [Intelligence per Watt v5](https://arxiv.org/abs/2511.07885v5)*

## Download the Slides

- [PowerPoint deck](/assets/decks/cs329a-part-09-future-research-areas/cs329a-part-09-future-research-areas.pptx)
- [PDF deck](/assets/decks/cs329a-part-09-future-research-areas/cs329a-part-09-future-research-areas.pdf)
- [12-slide contact sheet](/assets/decks/cs329a-part-09-future-research-areas/contact-sheet.png)

## The Core Model

```text
different experience
        |
        v
candidate behavior -> trustworthy verification -> learning update
        ^                                         |
        +---- learnable tasks + environment <-----+
                              |
                     efficient infrastructure
```

The loop only improves when every arrow carries useful information. More generated data is not enough if it is redundant. More feedback is not enough if the verifier is wrong. More difficult tasks are not enough if they cannot be solved or checked. More capable models are not enough if serving them is too slow or expensive.

## 1. Diversity Is a Training Resource

### The failure

Single-model self-training can narrow its reasoning patterns over rounds in the settings evaluated by Multiagent Finetuning. Ten outputs may look different on the surface while sharing the same hidden assumptions and failure modes.

### The proposed direction

Multiagent Finetuning begins with roles derived from the same base model, then independently specializes them using interaction data. Generators propose solutions; critics inspect them; debate and summarization exchange information; voting aggregates outputs.

The paper reports better preservation of likelihood- and embedding-based diversity over iterative rounds than its compared single-agent baseline. Those are useful proxies, not proof of complete semantic coverage or independent errors.

## 2. Correct Answers Do Not Certify Reasoning

A proof can land on the right answer through an invalid step. Final-answer rewards miss this failure.

DeepSeekMath-V2 trains a verifier to identify proof issues and a meta-verifier to assess whether verifier feedback is itself valid. Generator and verifier improve iteratively as scaled verification labels harder proofs.

```text
generator -> proof -> verifier -> issue report
    ^                              |
    |                         meta-verifier
    +------- harder examples <-----+
```

This does not end recursive trust. It moves the boundary outward and makes the feedback process more inspectable. The evidence is strongest for mathematical proof, where rigor has a clearer target than in social or creative tasks.

## 3. A Model Can Help Build Its Curriculum

Absolute Zero joins two roles in one pretrained model:

- **proposer:** creates program-grounded reasoning tasks;
- **solver:** attempts those tasks;
- **executor:** validates the task and checks the answer.

Its task families include deduction, abduction, and induction. A learnability reward favors valid tasks near the frontier between trivial and impossible. Validated tasks enter buffers that condition future proposals.

"Zero data" has a specific boundary: no external task dataset is used in this self-play loop. The model is pretrained, and program execution supplies substantial structure and objective feedback.

## 4. Verification Defines the Transfer Boundary

| Domain | Feedback | Main limitation |
|---|---|---|
| Unit-tested code | Fast executable check | Tests may be incomplete. |
| Formal proof | Proof or learned verifier | Verifier errors and specification gaps. |
| Simulation | Instrumented but model-dependent | Simulator validity. |
| Experiment | Slow physical evidence | Cost, noise, and delayed feedback. |
| Writing or design | Learned or human judgment | Contested objectives and reward hacking. |

Learned reward models can reach beyond executable domains, but they increase the risk that the system optimizes a proxy rather than the intended quality.

## 5. Intelligence Must Be Delivered Efficiently

The current `Intelligence per Watt` v5 defines:

```text
intelligence per watt = average task accuracy / average power draw
```

Its study summary covers more than 20 local language models, eight hardware accelerators spanning local and cloud comparisons, and one million real-world single-turn chat and reasoning queries. The current paper reports:

- best-of-local routing across 20+ models reaches `88.7%` overall coverage on the study distribution;
- a separate longitudinal win/tie-rate statistic rises from `23.2%` in 2023 to `71.3%` in 2025;
- local IPW improved `5.3x` from 2023 to 2025;
- local accelerators have at least `1.4x lower IPW` than cloud accelerators running identical models.

The denominator matters. The `88.7%` result pools complementary strengths through best-of-local routing; `71.3%` is a differently constructed longitudinal capability statistic. They are not competing estimates of one denominator. Neither describes every user request. The workload is primarily single-turn chat and reasoning, not long-horizon multimodal tool use. The historical improvement is not a forecast. Lower local IPW in the same-model comparison means less intelligence delivered per watt, despite the opportunity to move suitable requests local.

## 6. Local, Cloud, or Hybrid Is a Routing Decision

| Objective | Local may help | Cloud may help |
|---|---|---|
| Capability | Small, bounded tasks | Frontier and specialized models |
| Privacy | Data can remain on device | Central policy and auditing |
| Latency | No network round trip | Faster high-end accelerators |
| Energy | Avoid network and idle infrastructure in some cases | Higher accelerator efficiency in reported comparisons |
| Cost | Reuse owned hardware | Elastic capacity and utilization |

No column wins universally. A robust router states its objectives, measures the full system boundary, and abstains when neither path meets the requirement.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---:|---|
| 1 | Locate five bottlenecks in one coupled stack. |
| 2 | Show how repeated self-training can narrow measured diversity. |
| 3 | Specialize generator and critic roles. |
| 4 | Keep accuracy and diversity proxies separate. |
| 5 | Expose a correct endpoint with an invalid proof. |
| 6 | Add a verifier and a meta-verifier without claiming certainty. |
| 7 | Let a pretrained model propose and solve tasks. |
| 8 | Keep curriculum tasks valid and learnable. |
| 9 | Map the boundary from executable to contested feedback. |
| 10 | Divide bounded task accuracy by bounded power measurement. |
| 11 | Treat local/cloud placement as multi-objective routing. |
| 12 | Audit the complete research loop. |

## Homework: Design a University Study Agent

Design a study assistant that improves from student interactions without replacing student thinking.

1. Define at least two generator or critic roles and test whether their errors are correlated.
2. Define outcome and process verification. Construct a correct answer supported by invalid reasoning.
3. Define a task proposer and reject trivial, impossible, unsafe, and coverage-narrowing tasks.
4. Choose what persists in memory and what, if anything, changes model weights.
5. Define a local/cloud router across accuracy, privacy, latency, energy, and cost.
6. State one falsification test for each layer.

Submit a one-page system diagram, a claim-evidence table, three adversarial traces, and a 500-word argument identifying the limiting layer.

## Source Versus Teaching Synthesis

**Directly sourced:**

- the lecture sequence and timestamped mechanisms;
- the paper architectures and versioned abstract claims;
- the diversity proxies, verifier hierarchy, proposer-solver loop, and IPW definition;
- current paper revision dates and current IPW v5 scope.

**Teaching synthesis:**

- treating the four works as one five-layer stack;
- the five-question audit;
- the verification spectrum;
- the university study-agent homework;
- the local/cloud routing matrix.

The four papers do not evaluate one integrated self-improving system. The stack is a research-program interpretation, not a reported experimental result.

## References

1. [Stanford CS329A course site](https://cs329a.stanford.edu/).
2. [Official Part 9 video](https://www.youtube.com/watch?v=AyO6wyu4DEg).
3. Vighnesh Subramaniam et al., [Multiagent Finetuning](https://arxiv.org/abs/2501.05707v2), v2, 2025.
4. Zhihong Shao et al., [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570v1), v1, 2025.
5. Andrew Zhao et al., [Absolute Zero](https://arxiv.org/abs/2505.03335v3), v3, 2025.
6. Jon Saad-Falcon et al., [Intelligence per Watt](https://arxiv.org/abs/2511.07885v5), v5, 2026.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 8 — Agentic Evaluations and Long-Horizon Tasks](/learnAIDoc/wiki/cs329a-part-08-agentic-evaluations-long-horizon/)
