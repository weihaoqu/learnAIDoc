# Deck Analysis and Evidence Ledger

## Configuration

- Style: `intuition-machine`
- Audience: Q and technically curious learners
- Language: English
- Slides: 12 at 16:9
- Production: original vector diagrams; no copied Stanford frames

## Core Message

Verification is a noisy control system: more candidates help only when the verifier's discrimination, calibration, and independence improve with the search space.

## Supporting Ideas

1. Outcome verifiers rank complete candidates but can accumulate false positives as N grows.
2. Process supervision improves credit assignment while encoding an annotation rubric.
3. Rollout-derived labels trade human annotation for compute and policy-dependent noise.
4. Weighted verifier ensembles exploit complementary errors but fail under shared blind spots.
5. Verification must be evaluated as an end-to-end selected-answer system.

## Claim Ledger

| Slide | Claim | Evidence | Type | Confidence |
|---|---|---|---|---|
| 1 | Candidate generation is useful only through a selector that recognizes success | Lecture 00:09-00:52; 14:19-18:24 | sourced synthesis | high |
| 2 | Outcome-verifier pipeline: generate, label, train, rerank | Lecture 03:18-07:57; Cobbe et al. 2021, arXiv:2110.14168 | sourced | high |
| 3 | Selected-answer accuracy can decline as N grows under an imperfect verifier | Lecture 14:19-18:24; Cobbe et al. 2021 | sourced | high for displayed setup |
| 4 | ORM scores completed trajectories; PRM scores intermediate steps | Lecture 21:17-25:06; Lightman et al. 2023, arXiv:2305.20050 | sourced | high |
| 5 | Human process labels provide a rubric, not objective truth | Lecture 25:06-28:32; 31:43-37:51 | sourced interpretation | high |
| 6 | PRM800K uses active learning to target informative mistakes | Lecture 26:11-30:14; Lightman et al. 2023 | sourced | high; setup-specific efficiency |
| 7 | Math-Shepherd labels prefixes through continuation rollouts | Lecture 37:51-40:42; Wang et al. 2023, arXiv:2312.08935 | sourced | high |
| 8 | Rollout labels inherit rollout-policy and finite-budget failures | Lecture 40:42-43:27; Wang et al. 2023 | sourced | high |
| 9 | A PRM can rerank at inference and reward PPO-style updates | Lecture 43:27-47:41; Wang et al. 2023 | sourced | high; reward-hacking caveat |
| 10 | Weaver normalizes, filters, weights, and aggregates heterogeneous verifiers | Lecture 51:51-57:36; Saad-Falcon et al. 2025, arXiv:2506.18203 | sourced | high |
| 11 | Weak-supervision aggregation depends on verifier quality and dependence assumptions | Lecture 57:36-60:07; Saad-Falcon et al. 2025 | sourced | high |
| 12 | Verification should be budgeted across candidate count, generator, verifier strength/count, and distillation | Lecture 60:07-68:13 | sourced synthesis | high |

## Claim Calibrations

- Coverage and selected-answer accuracy are different metrics.
- The roughly 400-candidate peak is historical and setup-specific.
- Passing a verifier is not equivalent to correctness.
- PRM/ORM label counts are not directly cost-comparable because step labels and active selection differ.
- The small out-of-distribution STEM evaluation supports moderate nearby-domain transfer, not universal generalization.
- Math-Shepherd labels depend on rollout count and rollout-policy capability.
- Reward optimization can amplify verifier misspecification.
- Weaver cannot recover a correct answer absent from the candidate set.
- Correlated or below-random verifier signals can undermine weak-supervision estimates.
- Current Weaver arXiv v3 exact figures differ from the recorded lecture; no version-unstable number appears as a general claim in the deck.

## Visual Plan

| Concept | Visual |
|---|---|
| Coverage versus selection | rising coverage and peaking selector curve |
| Outcome verifier | generate-label-train-rerank pipeline |
| False-positive extreme | many wrong candidates competing with one correct candidate |
| ORM versus PRM | terminal score versus step scores |
| Rubric | correctness, relevance, sufficiency lenses |
| Active learning | dense boundary sampling versus uniform labels |
| Rollout label | prefix branching to successful/failed continuations |
| Rollout failure | rare-valid and lucky-repair counterexamples |
| Rerank and RL | PRM feeding selector and PPO loop |
| Weaver | normalize-filter-weight-select pipeline |
| Dependence | complementary versus correlated verifier errors |
| System budget | four dials around selected-answer accuracy |
