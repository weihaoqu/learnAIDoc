# Stanford CS329A Part 6: Train-Time Scaling and Scaling RL

Primary source: [Stanford CS329A Self-Improving AI Agents | Part 6 | Train Time Scaling/Scaling RL](https://www.youtube.com/watch?v=yVnmHSAy3ck)

- Course: Stanford CS329A, Self-Improving AI Agents
- Session: Train Time Scaling/Scaling RL, October 10, 2025
- Video duration: 1:12:38
- Evidence collected: complete manual-caption transcript plus 29 inspected visual cues
- Production basis: `slide-deck/cs329a-series/research/part-06-train-time-scaling-rl.md`
- Primary readings: STaR, DeepSeekMath, and DAPO

## Source-Correction Policy

The lecture's slide near 01:15 labels `DeepSeekMath-RL 7B: 51.7%` as an AIME result. The primary DeepSeekMath paper reports **51.7% on the MATH benchmark** and **60.9% on MATH with self-consistency over 64 samples**. A later slide near 28:30 visually places that metric inside the STaR discussion.

This production follows the primary paper:

- it never states `51.7% on AIME` as fact;
- any use of `51.7%` is labeled `MATH` and attributed to DeepSeekMath;
- the lecture-slide mismatch is taught as a source-audit example;
- DAPO's AIME 2024 average@32 result is kept separate and labeled with its model/setup.

## Core Thesis

Train-time scaling closes a feedback loop that changes model weights:

```text
sample model outputs
        |
        v
verify or score
        |
        v
construct learning signal
        |
        v
update model parameters
        |
        +----------> sample again
```

The loop succeeds only when the verifier provides useful signal and the starting model can sometimes produce behavior worth reinforcing.

## 1. Four Compute Regimes

| Regime | When compute is spent | What changes |
|---|---|---|
| Pretraining | Before task-specific deployment | Broad model weights and representations |
| Supervised fine-tuning | Before deployment | Behavior through labeled demonstrations |
| Test-time scaling | During a request | Candidate generation/search with fixed weights |
| Train-time self-improvement | During iterative post-training | Weights using model-generated, verified feedback |

Conflating these regimes creates bad causal claims. A result from a full training stack cannot be attributed automatically to the final RL algorithm.

## 2. STaR: Bootstrap Rationales (16:08-40:53)

[STaR: Bootstrapping Reasoning With Reasoning](https://arxiv.org/abs/2203.14465) uses a small set of rationale examples and a larger answer-labeled dataset:

```text
generate rationales
      |
      v
retain those yielding correct answers
      |
      v
rationalize failures with the answer hint
      |
      v
fine-tune on successful rationales
      |
      +----------> repeat
```

Answer correctness is a useful filter, not a rationale verifier. A correct final answer can accompany an invalid explanation. Rationalization can generate a plausible post-hoc route rather than a faithful or valid derivation.

STaR also depends on the base model being able to produce or reconstruct useful paths. Iterative self-training can plateau.

## 3. DeepSeekMath and GRPO (40:53-53:05)

DeepSeekMath is a full stack:

```text
DeepSeek-Coder base
      -> 120B math-related web tokens
      -> supervised training
      -> GRPO reinforcement learning
```

The primary paper reports 51.7% on MATH and 60.9% on MATH with 64-sample self-consistency. These numbers describe the resulting DeepSeekMath system, not an isolated causal effect of GRPO.

GRPO samples a group of outputs and normalizes rewards relative to that group. It avoids training a separate critic, reducing the paper's PPO memory burden. If every output receives the same reward, the within-group relative advantage carries no discrimination signal.

## 4. Majority@k Versus Pass@k

- **Majority@k** measures the answer selected by voting or aggregation among `k` candidates.
- **Pass@k** asks whether at least one of `k` candidates succeeds.

Improving majority performance can mean that an existing successful behavior became more frequent. It does not by itself prove the model acquired a new solution strategy. The lecture presents this as a diagnostic distinction, not a universal theorem.

## 5. DAPO Stabilizers (53:05-61:49)

[DAPO](https://arxiv.org/abs/2503.14476) addresses instability in large-scale group-relative RL:

1. **Clip-Higher:** asymmetric clipping gives selected positive updates more room.
2. **Dynamic sampling:** retain groups with mixed rewards so an update has relative signal.
3. **Token-level policy-gradient loss:** changes response-length weighting.
4. **Soft overlong punishment:** penalizes the approach to a hard context boundary gradually.

The paper reports a cumulative move from 30 for naive GRPO to 50 for full DAPO on AIME 2024 average@32 using a Qwen2.5-32B base model. The components interact; these values are not universal increments.

Operational monitoring should include reward, response length, entropy, and the fraction of informative groups. Exact lecture thresholds are implementation-specific.

## Durable Diagnostic

| Situation | Candidate method | Main risk |
|---|---|---|
| Few rationale examples, many answer-labeled tasks, modest infrastructure | STaR | Invalid rationalization and capability ceiling |
| Verifiable online sampling, strong base model, critic memory is costly | GRPO | Weak signal in identical-reward groups |
| Large-scale GRPO with entropy, length, or batch-signal instability | DAPO | Distribution shift and interacting controls |
| Weak or hackable verifier | None is trustworthy yet | Reward hacking and false progress |

## Primary References

- [Official course website](https://cs329a.stanford.edu/)
- [Official Part 6 lecture video](https://www.youtube.com/watch?v=yVnmHSAy3ck)
- Eric Zelikman et al., [STaR: Bootstrapping Reasoning With Reasoning](https://arxiv.org/abs/2203.14465)
- Zhihong Shao et al., [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300)
- Qiying Yu et al., [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476)
