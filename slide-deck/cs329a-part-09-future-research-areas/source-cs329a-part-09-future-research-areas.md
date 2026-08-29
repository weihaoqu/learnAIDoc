# Stanford CS329A Part 9: Future Research Areas

Primary source: [official Part 9 video](https://www.youtube.com/watch?v=AyO6wyu4DEg)

- Course: [Stanford CS329A, Self-Improving AI Agents, Autumn 2025](https://cs329a.stanford.edu/)
- Video duration: `1:07:42`
- Evidence collected: complete native-caption transcript and 25 inspected visual cues
- Frozen evidence report: `slide-deck/cs329a-series/research/part-09-future-research-areas.md`
- Runtime verification date: 2026-08-29; source pages below embed their own revision dates
- Official schedule: `Future Research Areas`; no assigned readings are listed for this session
- Production rule: current primary-paper records govern paper claims; the lecture governs the research-agenda narrative

## Core Thesis

Self-improvement is not one algorithm. It is a coupled system whose progress is limited by diversity, verification, curriculum quality, continual adaptation, and infrastructure efficiency.

```text
diverse proposals -> verification -> learnable tasks -> adaptation
        ^                                                |
        +-------- environment + efficient serving <------+
```

## Lecture Map

### 1. The Coupled System (00:00-06:51)

The lecture recaps agents as workflows that plan, act, observe feedback, and stop. Four future bottlenecks emerge: diverse training data, robust and meta-level verification, self-selected curricula, and intelligence efficiency.

### 2. Multiagent Finetuning (06:51-14:47)

Single-model iterative self-training can plateau in the evaluated settings as generated reasoning becomes less diverse. Multiagent Finetuning starts roles from one base model, then independently specializes them through interaction data. Debate, critique, summarization, and voting preserve measured reasoning-chain diversity over more rounds than the compared single-agent baseline.

Current paper record: [arXiv:2501.05707v2](https://arxiv.org/abs/2501.05707v2), revised 2025-03-03, ICLR 2025.

### 3. Self-Verifiable Mathematical Reasoning (14:47-22:35)

A correct mathematical answer can hide invalid intermediate reasoning. DeepSeekMath-V2 trains a verifier to identify proof issues, uses a meta-verifier to assess verifier feedback, and improves generator and verifier iteratively with scaled verification. This addresses proof-style tasks; it does not solve verification in open-ended domains.

Current paper record: [arXiv:2511.22570v1](https://arxiv.org/abs/2511.22570v1), submitted 2025-11-27.

### 4. Absolute Zero (22:35-33:07)

Absolute Zero removes an external task dataset from its self-play loop. A pretrained model proposes program-grounded tasks and learns to solve them. Deduction, abduction, and induction provide task families; executable checks and a learnability reward favor valid tasks that are neither trivial nor impossible. Validated tasks enter evolving buffers.

Current paper record: [arXiv:2505.03335v3](https://arxiv.org/abs/2505.03335v3), revised 2025-10-16.

### 5. Verification Boundary (33:07-39:59)

The discussion tests transfer to science, design, chip simulation, and creativity. Learned rewards may extend feedback beyond executable domains, but they also introduce misspecification and reward-hacking risk.

### 6. Intelligence per Watt (39:59-51:53)

The study defines intelligence per watt as average task accuracy divided by average power. Current v5's summary reports more than 20 local language models, eight hardware accelerators spanning local and cloud comparisons, and one million real-world single-turn chat and reasoning queries. It reports `88.7%` overall coverage for best-of-local routing across the model pool, a separate longitudinal win/tie-rate statistic rising from `23.2%` in 2023 to `71.3%` in 2025, a `5.3x` improvement in IPW over that period, and at least `1.4x` lower IPW for local accelerators than cloud accelerators running identical models.

Current paper record: [arXiv:2511.07885v5](https://arxiv.org/abs/2511.07885v5), revised 2026-08-07.

### 7. Systems Agenda and Q&A (51:53-67:42)

Future systems connect pretraining, online or continual learning, and test-time experience. They need local/cloud routing, efficient kernels, granular metrics, and a deliberate choice between memory updates and weight updates.

## Durable Mental Model

For any self-improvement claim, ask:

1. What produces genuinely different experience?
2. What verifies success, and who checks the verifier?
3. What makes the next task learnable rather than merely hard?
4. What changes: context, memory, or model weights?
5. What capability is delivered per unit of latency, energy, and cost?

## Primary References

1. Stanford, [CS329A course schedule](https://cs329a.stanford.edu/), accessed 2026-08-29.
2. Stanford Online, [Part 9 official video](https://www.youtube.com/watch?v=AyO6wyu4DEg), accessed 2026-08-29.
3. Vighnesh Subramaniam et al., [Multiagent Finetuning](https://arxiv.org/abs/2501.05707v2), v2, 2025.
4. Zhihong Shao et al., [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570v1), v1, 2025.
5. Andrew Zhao et al., [Absolute Zero](https://arxiv.org/abs/2505.03335v3), v3, 2025.
6. Jon Saad-Falcon et al., [Intelligence per Watt](https://arxiv.org/abs/2511.07885v5), v5, 2026.

## Primary-Record Verification Capture

| Work | Captured primary metadata | Direct record |
|---|---|---|
| Multiagent Finetuning | arXiv v2; last revised 2025-03-03; record says ICLR 2025 | [abstract](https://arxiv.org/abs/2501.05707v2) |
| DeepSeekMath-V2 | arXiv v1; submitted 2025-11-27; nine authors headed by Zhihong Shao | [abstract](https://arxiv.org/abs/2511.22570v1) |
| Absolute Zero | arXiv v3; last revised 2025-10-16 | [abstract](https://arxiv.org/abs/2505.03335v3) |
| Intelligence per Watt | arXiv v5; revised 2026-08-07; HTML header carries `arXiv:2511.07885v5` | [abstract](https://arxiv.org/abs/2511.07885v5) and [full HTML](https://arxiv.org/html/2511.07885v5) |
| CS329A session | Official schedule labels the final session `Future Research Areas` and lists no assigned readings in that row | [course schedule](https://cs329a.stanford.edu/) |

The IPW summary count is reported as eight accelerators. Its methods enumerate hardware across local, workstation, and datacenter tiers and discuss additional appendix configurations; this companion uses the summary count rather than presenting it as an exhaustive backend inventory.
