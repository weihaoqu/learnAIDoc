# Deck Analysis and Full Claim Ledger

## Configuration

- Topic: Stanford CS329A Part 9, Future Research Areas
- Style reference: Part 2 `intuition-machine` vector deck
- Audience: Q and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9
- Production: original local SVG diagrams; no copied course figures or logos

## Message Hierarchy

**Core message:** A self-improving agent is a coupled learning-and-serving system, not a self-training trick.

**Supporting ideas:**

1. Diverse roles can resist measured homogenization, but shared origins still create correlated errors.
2. Verification must inspect process as well as outcomes, yet every verifier moves rather than removes the trust boundary.
3. Self-generated curricula work most cleanly where feedback is cheap and objective.
4. Efficiency and routing determine which capabilities can operate continuously in practice.

## Full Claim-Evidence Ledger

| ID | Slide | Claim | Evidence | Status | Boundary |
|---|---:|---|---|---|---|
| P9-01 | 1 | The lecture frames self-improvement across learning algorithms, verification, environments, and infrastructure. | Lecture `00:00-06:51`, `65:23-67:42` | observed | Course synthesis, not one paper's experiment. |
| P9-02 | 2 | Single-model iterative fine-tuning can lose measured reasoning-chain diversity in the evaluated settings. | Lecture `06:51-09:55`; Multiagent FT v2 | sourced | Not every synthetic-data loop collapses. |
| P9-03 | 3 | Independently specialized generator and critic roles interact through debate, summarization, and voting. | Lecture `09:55-12:37`; Multiagent FT v2 | sourced | Agent means a model role in a training workflow. |
| P9-04 | 4 | Multiagent fine-tuning preserves more proxy-measured diversity over rounds than the compared single-agent baseline. | Lecture `12:37-14:47`; Multiagent FT v2 | sourced | Likelihood and embedding measures are incomplete proxies. |
| P9-05 | 5 | A correct final answer can accompany invalid intermediate proof reasoning. | Lecture `14:47-18:03`; DeepSeekMath-V2 v1 | sourced premise | Strongest for proof-style tasks. |
| P9-06 | 6 | DeepSeekMath-V2 uses a verifier, meta-verifier, and iterative generator-verifier improvement. | Lecture `18:03-22:35`; DeepSeekMath-V2 v1 | sourced | Meta-verification reduces but does not end recursive trust. |
| P9-07 | 7 | Absolute Zero proposes and solves tasks without an external task dataset in its self-play loop. | Lecture `22:35-25:45`; Absolute Zero v3 | sourced | The base model is pretrained; zero data is not zero prior knowledge. |
| P9-08 | 8 | Deduction, abduction, and induction tasks receive executable validity and answer checks. | Lecture `25:45-29:16`; Absolute Zero v3 | sourced | Program semantics provide unusually cheap verification. |
| P9-09 | 8 | Learnability reward and validated-task buffers create an evolving curriculum. | Lecture `27:40-33:07`; Absolute Zero v3 | sourced | Difficulty estimates and buffers can inherit solver bias. |
| P9-10 | 9 | Learned rewards can extend beyond executable domains but create misspecification and reward-hacking risk. | Lecture `33:07-39:59` | observed direction | Open direction, not a resolved method. |
| P9-11 | 10 | IPW is average task accuracy divided by average power in the study. | Lecture `42:03-46:27`; IPW v5 | sourced | Metric depends on task, hardware, and measurement boundary. |
| P9-12 | 10 | Current v5's summary reports 20+ local models, eight hardware accelerators, and one million single-turn queries. | IPW v5 abstract and HTML lines 98-101 | sourced | Methods span local, workstation, and datacenter tiers; summary count is not an exhaustive backend inventory. |
| P9-13 | 10 | Current v5 reports 88.7% best-of-local routing coverage, a separate 23.2%-to-71.3% longitudinal win/tie-rate statistic, and 5.3x IPW improvement from 2023 to 2025. | IPW v5 HTML lines 82, 102, 187-193 | sourced | The 88.7% pooled-routing result and 71.3% longitudinal capability statistic have different constructions; historical, not forecast. |
| P9-14 | 10 | Local accelerators show at least 1.4x lower IPW than cloud accelerators running identical models. | IPW v5 abstract | sourced | Lower IPW means less intelligence per watt; hardware/workload specific. |
| P9-15 | 11 | Local/cloud routing is a multi-objective systems problem across capability, privacy, latency, energy, and cost. | Lecture `48:51-57:00`; IPW v5 | synthesis | Not a demonstrated universal optimum. |
| P9-16 | 12 | Future research should co-design diversity, verification, curriculum, adaptation, and infrastructure. | Lecture `51:53-67:42`; all papers | synthesis | Integration agenda, not an evaluated complete stack. |

## Source Corrections Applied

- The frozen report's abbreviated DeepSeekMath-V2 author list did not match the current primary record. The package uses Zhihong Shao, Yuxiang Luo, Chengda Lu, Z. Z. Ren, Jiewen Hu, Tian Ye, Zhibin Gou, Shirong Ma, and Xiaokang Zhang.
- The current IPW record is v5, revised 2026-08-07. The package uses its abstract's `at least 1.4x lower IPW` comparison and does not repeat an unverified lecture-only `1.4-7.4x` range.

## Visual System

| Concept | Original diagram |
|---|---|
| Coupled stack | five monitored layers around an improvement loop |
| Diversity collapse | many paths narrowing into one repeated trace |
| Multiagent roles | specialized generator/critic society with aggregation |
| Diversity metrics | accuracy curve beside two proxy-diversity curves |
| Invalid proof | correct endpoint reached through a broken step |
| Recursive checking | generator, verifier, and meta-verifier cycle |
| Proposer-solver | one model split into task and solution roles |
| Curriculum | learnability frontier between trivial and impossible |
| Verification boundary | spectrum from unit tests to contested judgment |
| IPW | accuracy-over-power fraction with denominator boundaries |
| Routing | local/cloud decision matrix |
| Agenda | five-question research audit loop |

## Accessibility and Verification Targets

- Body type target: at least 21 px at 1600x900.
- Every empirical number carries a paper version or study-scope cue.
- Color is reinforced by labels and geometry.
- PNG, SVG, PPTX, and PDF use the same rendered 1600x900 frames.

## Verification Record

- Verified 2026-08-29: 12 numbered PNGs, 12 SVGs, and 12 slide prompts.
- `pdfinfo` reports 12 pages at 1600 x 900 points.
- PPTX archive inspection reports 12 slides and 12 speaker-note parts.
- All 12 outline filenames resolve to generated PNGs, and the wiki's PPTX, PDF, contact-sheet, and cover paths exist.
- The PDF cover was rasterized with `pdftoppm`; the contact sheet and full-resolution Slides 4, 8, and 10 were visually inspected.
- The frozen transcript and 25-cue report remains inspectable at `slide-deck/cs329a-series/research/part-09-future-research-areas.md`.
