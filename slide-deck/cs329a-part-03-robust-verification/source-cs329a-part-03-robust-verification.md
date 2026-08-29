# Stanford CS329A Part 3: Robust Verification

Primary source: [Stanford CS329A Self-Improving AI Agents | Part 3 | Robust Verification](https://www.youtube.com/watch?v=p7TdPUcPoik)

- Video duration: 1:12:58
- Evidence: complete caption stream from 00:09 through 1:12:50 plus 26 inspected full-resolution cue frames
- Scope: outcome verifiers, human process supervision, automatic process labels, and ensembles of weak verifiers

## Core Thesis

A generator may produce a correct candidate somewhere in a large sample set, but a deployed agent succeeds only when its verifier can recognize that candidate without being fooled by increasingly extreme false positives.

```text
candidate coverage
       |
       v
noisy verification
       |
       v
selected-answer accuracy
```

Robust verification is therefore a systems problem involving supervision, calibration, dependence, distribution shift, and compute allocation.

## Lecture Progression

### 1. Outcome Verification (01:15-21:17)

[Training Verifiers to Solve Math Word Problems](https://arxiv.org/abs/2110.14168) trains a model to score whether a complete generated solution is correct. At inference, a generator produces many candidates, the verifier scores them, and the highest-scoring candidate is returned.

The displayed selection curve improves and then declines after roughly 400 candidates in that historical setup. More candidates increase both the chance of a correct solution and the chance that some wrong solution receives an extreme false-positive score. The observed peak is setup-specific, not a universal sample budget.

### 2. Human Process Supervision (21:17-37:51)

[Let's Verify Step by Step](https://arxiv.org/abs/2305.20050) contrasts:

- an outcome reward model (ORM), which scores a complete solution;
- a process reward model (PRM), which scores intermediate reasoning steps.

Step labels provide finer credit assignment and can expose a wrong chain that accidentally reaches the correct final answer. The PRM800K work uses active learning to target informative and convincing mistakes.

Process labels are not objective truth. Human annotators encode a rubric for correctness, relevance, and sufficient justification. Valid shortcuts or alternative reasoning styles may be penalized.

### 3. Automatic Process Supervision (37:51-51:51)

[Math-Shepherd](https://arxiv.org/abs/2312.08935) replaces human step annotation with rollouts. From a reasoning prefix, sample continuations and observe whether they reach the correct final answer.

```text
hard label = 1 if any continuation succeeds, else 0
soft label = successful continuations / all continuations
```

This trades human annotation cost for generation compute. A good prefix can be mislabeled when the rollout policy fails to complete it. A wrong step can be labeled good if later sampling accidentally repairs it.

The learned PRM is used for both inference-time reranking and PPO-style reinforcement learning. Optimizing a generator against an imperfect reward model introduces reward-hacking risk.

### 4. Weighted Weak-Verifier Ensembles (51:51-66:37)

[Shrinking the Generation-Verification Gap with Weak Verifiers](https://arxiv.org/abs/2506.18203) introduces Weaver. Here, weak means imperfect, not intentionally poor.

Weaver combines heterogeneous reward models and language-model judges through a pipeline:

```text
normalize scores -> filter poor verifiers -> estimate reliability
                 -> weight signals -> select candidate
```

Naively adding more verifiers does not improve monotonically. Verifiers differ in quality and may share correlated blind spots. Reliability estimation needs assumptions, quality gates, and some development labels.

The paper also distills the ensemble into a smaller cross-encoder to reduce inference cost. The recorded lecture and current paper revision use different exact headline figures, so this teaching package focuses on the mechanism and cites the paper version beside any exact number.

### 5. Recap and Open Questions (66:37-1:12:50)

The lecture closes by connecting verification to code tests, reasoning-model trajectories, training data, and generator diversity. It raises an unresolved question: should generation and verification come from similar model families or diverse ones?

It also warns that sharpening a generator toward one answer may reduce useful solution diversity. That is a research concern raised in discussion, not a demonstrated result across the four papers.

## Durable Mental Model

Verification has four distinct failure modes:

1. **Coverage failure:** the generator never produces a correct candidate.
2. **Discrimination failure:** the verifier cannot separate correct from plausible wrong candidates.
3. **Shift failure:** a verifier that worked in training becomes miscalibrated in deployment.
4. **Proxy failure:** optimizing the verifier score improves the proxy rather than actual correctness.

## Primary References

- [Official course site](https://cs329a.stanford.edu/)
- [Part 3 video](https://www.youtube.com/watch?v=p7TdPUcPoik)
- Karl Cobbe et al. (2021), [Training Verifiers to Solve Math Word Problems](https://arxiv.org/abs/2110.14168)
- Hunter Lightman et al. (2023), [Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
- Peiyi Wang et al. (2023), [Math-Shepherd](https://arxiv.org/abs/2312.08935)
- Jon Saad-Falcon et al. (2025), [Shrinking the Generation-Verification Gap with Weak Verifiers](https://arxiv.org/abs/2506.18203)
