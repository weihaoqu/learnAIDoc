# Deck Analysis and Evidence Ledger

## Configuration

- Topic: Stanford CS329A Part 2, Test-Time Compute Scaling
- Style: `intuition-machine`
- Audience: Q and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9
- Production: original local vector diagrams; no copied Stanford slide imagery

## Message Hierarchy

**Core message:** More inference compute creates options; allocation and verification determine whether those options become reliable output.

**Supporting ideas:**

1. Repeated sampling increases candidate coverage under favorable conditions.
2. Coverage is not the same as returned-answer reliability.
3. Aggregate scaling curves reflect the distribution of problem difficulty.
4. Parallel search, sequential revision, and reward models spend compute differently.
5. Inference architectures can be optimized, but only for specified tasks, operators, and budgets.

**Learner action:** Diagnose a test-time scaling proposal by locating its generator, budget policy, verifier, and stopping rule.

## Claims Ledger

| Slide | Claim | Evidence | Type | Confidence |
|---|---|---|---|---|
| 1 | Extra inference compute is useful only through a generate-select loop | Lecture 01:11-02:35; 12:20-15:34 | synthesis | high |
| 2 | Test-time scaling searches with fixed weights, unlike training-time scaling | Lecture 00:05-01:11; Snell et al. 2024, *Scaling LLM Test-Time Compute Optimally*, arXiv:2408.03314 | sourced synthesis | high |
| 3 | Repeated sampling fans one model into many candidates and then needs a verifier | Lecture 01:29-03:36; Brown et al. 2024, *Large Language Monkeys*, arXiv:2407.21787 | sourced | high |
| 4 | Coverage can rise without equivalent deployed reliability | Lecture 01:29-03:36; 12:20-26:55; Brown et al. 2024, arXiv:2407.21787 | sourced interpretation | high |
| 5 | `1-(1-p)^k` is a per-problem independence model | Lecture 05:27-07:33; Schaeffer et al. 2025, *How Do Large Language Monkeys Get Their Power (Laws)?*, arXiv:2502.17578 | sourced | high, assumptions visible |
| 6 | Heavy-tailed problem difficulty can produce aggregate power-law behavior | Lecture 07:33-11:20; Schaeffer et al. 2025, arXiv:2502.17578 | sourced | high for studied setups |
| 7 | Verification cost and quality are domain-dependent | Lecture 12:20-26:55; Brown et al. 2024, arXiv:2407.21787 | sourced | high |
| 8 | Parallel sampling and sequential revision are different budget allocations | Lecture 26:55-30:30 | sourced | high |
| 9 | ORMs score outcomes; PRMs score intermediate steps and can guide search | Lecture 30:30-34:40; Snell et al. 2024, *Scaling LLM Test-Time Compute Optimally*, arXiv:2408.03314 | sourced | high; generalization caveat |
| 10 | The best allocation varies with estimated difficulty and setup | Lecture 34:40-45:47; Snell et al. 2024, arXiv:2408.03314 | sourced | high within experiment, not universal |
| 11 | Archon searches compositions of models and inference operators | Lecture 45:47-61:22; Saad-Falcon et al. 2024, *Archon*, arXiv:2409.15254 | sourced | high |
| 12 | Generator, allocation, verifier, and stopping rule form a useful diagnostic | whole-lecture synthesis | deck interpretation | high as framework |

## Claim Calibrations

- Coverage is an oracle-style measurement when evaluation can inspect all candidates; it is not automatically deployable accuracy.
- The formula `1-(1-p)^k` assumes attempts with constant success probability and independence. Model samples can be correlated.
- The Large Language Monkeys benchmark figures are task, model, budget, and verifier specific.
- The heavy-tail explanation describes aggregate benchmark behavior; it does not make each problem power-law scaled.
- Process reward models are learned and can be wrong, especially outside their training distribution.
- “Compute optimal” means optimal under an estimated difficulty model, chosen methods, and budget in a particular experiment.
- Test-time compute is a recurring per-request cost; pretraining cost is amortized. FLOPs matching does not settle deployment economics.
- Archon results depend on benchmark, available models, operators, search procedure, and budget. The lecture and current arXiv revision report different headline averages, so the deck omits a universal percentage claim.

## Visual Opportunity Map

| Concept | Visual treatment |
|---|---|
| Training versus inference | three compute frontiers with fixed-weight lock |
| Repeated sampling | one-to-many fan-out through selector |
| Coverage versus reliability | candidate field with correct-but-unselected answer |
| Probability model | failure decay curve plus assumptions |
| Heavy tail | distribution of easy and rare hard tasks |
| Verifier gap | domain ladder from executable to judgment-heavy |
| Parallel versus sequential | side-by-side budget maps |
| ORM versus PRM | final-score versus step-score diagrams |
| Difficulty-aware allocation | compute routing matrix |
| Archon | modular operator graph and search loop |

## Accessibility and Export Checks

- Body type target: at least 21 px at 1600x900.
- High-contrast text on aged cream.
- Color is always reinforced by labels.
- Every sourced slide has a lecture timestamp and/or a full citation key traceable to the primary-reference list.
- Each slide has one dominant diagram.
- PNG, PPTX, and PDF must retain identical framing.
