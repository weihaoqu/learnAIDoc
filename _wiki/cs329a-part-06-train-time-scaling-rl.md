---
title: "Stanford CS329A Part 6 — Train-Time Scaling and Scaling RL"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, train-time-scaling, reinforcement-learning, star, deepseekmath, grpo, dapo, verification]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 5 — Planning and Multi-Step Reasoning", "Stanford CS329A Part 7 — Self-Improvement and Deep Research Agents", "CS329A Agent-System Literacy — The Next Layer of AI Education"]
icon: "🧪"
image: "/assets/images/cs329a-part-06-train-time-scaling-rl.png"
---

Generating more model outputs is not yet self-improvement. A train-time scaling loop must evaluate those outputs, turn feedback into a learning signal, update the model, and then show that later behavior improved. Stanford CS329A Part 6 explains that loop through STaR, DeepSeekMath with GRPO, and DAPO.

This page is a teaching companion to the complete 1:12:38 lecture session from October 10, 2025. The front-matter date is this wiki entry's publication date. The page combines the complete manual-caption transcript, 29 inspected visual cues, the official course schedule, and the three primary papers.

One source correction is load-bearing: an early lecture slide labels DeepSeekMath-RL 7B's **51.7%** result as AIME. The [DeepSeekMath paper](https://arxiv.org/abs/2402.03300) reports **51.7% on MATH**, and **60.9% on MATH with self-consistency over 64 samples**. This page follows the primary paper. DAPO's separate AIME 2024 result is labeled with its own model and evaluation setup.

*Primary sources: [official course site](https://cs329a.stanford.edu/) | [Part 6 video](https://www.youtube.com/watch?v=yVnmHSAy3ck) | [STaR](https://arxiv.org/abs/2203.14465) | [DeepSeekMath](https://arxiv.org/abs/2402.03300) | [DAPO](https://arxiv.org/abs/2503.14476)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-06-train-time-scaling-rl.pdf](/learnAIDoc/assets/decks/cs329a-part-06-train-time-scaling-rl/cs329a-part-06-train-time-scaling-rl.pdf) | Best for reading and classroom sharing. |
| PPTX | [cs329a-part-06-train-time-scaling-rl.pptx](/learnAIDoc/assets/decks/cs329a-part-06-train-time-scaling-rl/cs329a-part-06-train-time-scaling-rl.pptx) | Image-based slides with prompt and speaker-note provenance. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-06-train-time-scaling-rl/contact-sheet.png) | Quick visual overview. |

![CS329A Part 6 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-06-train-time-scaling-rl/contact-sheet.png)

## The Core Loop

Train-time self-improvement is a closed system:

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

Every credible claim needs four answers:

1. What behavior was sampled?
2. What verifier distinguished better from worse?
3. What signal reached the optimizer?
4. What evidence shows that the update improved the intended behavior rather than the metric alone?

If one answer is missing, "self-improvement" is underspecified.

## 1. Keep Four Compute Regimes Separate

| Regime | When compute is spent | What changes |
|---|---|---|
| Pretraining | Before task-specific deployment | Broad weights and representations |
| Supervised fine-tuning | Before deployment | Behavior learned from demonstrations |
| Test-time scaling | During a request | Candidate generation or search with fixed weights |
| Train-time self-improvement | During iterative post-training | Weights updated from generated, verified experience |

Test-time search can improve an answer without changing the model. Train-time scaling changes the distribution that will generate later answers. These are different mechanisms and require different evaluation.

A full-system result also cannot be attributed automatically to the last training stage. DeepSeekMath combines model initialization, continued pretraining data, SFT, and RL.

## 2. Verifiability Is the Feedback Bottleneck

Mathematics is attractive for self-training because many final answers can be checked mechanically. That produces frequent outcome feedback without requiring a human to label every generation.

But the verifier's boundary is narrow:

```text
rationale + final answer -> answer checker -> pass / fail
       |
       +-> rationale faithfulness remains unverified
       +-> safe behavior remains unverified
       +-> tool-path validity remains unverified
```

A correct answer can hide an invalid derivation. A coding test can miss a vulnerability. A citation checker can reward a correctly formatted but unsupported reference. The policy learns what the verifier rewards, including its blind spots.

## 3. STaR Bootstraps Rationales

[STaR: Bootstrapping Reasoning With Reasoning](https://arxiv.org/abs/2203.14465) starts with a small rationale demonstration set and a larger answer-labeled dataset.

```text
generate a rationale
        |
        v
does it yield the correct answer?
   |                         |
  yes                       no
   |                         |
retain it          show the answer and rationalize
   |                         |
   +-----------+-------------+
               v
          fine-tune
               |
               +----------> repeat
```

Correct-answer rationales enter the training set directly. Failed examples receive a second attempt conditioned on the known answer. If that rationalized attempt succeeds, it can also enter the training set.

This converts answer labels into rationale data, but the answer checker does not independently validate each reasoning step.

## 4. Rationalization Helps and Can Mislead

An answer hint can recover examples that ordinary sampling missed. It can also invite a plausible post-hoc explanation.

| Interpretation | What the answer hint did | Remaining evidence need |
|---|---|---|
| Useful recovery | Helped the model reconstruct a valid path | Check intermediate steps or compare with an independent derivation |
| Post-hoc story | Made a fluent path fit the known answer | Process validation, not final-answer validation alone |
| Shortcut | Exposed answer features that disappear at deployment | Evaluate again without the hint |

The durable lesson is not that rationalization is invalid. It is that correctness and faithfulness are different claims.

## 5. Self-Training Has a Support Boundary

The lecture raises a capability-ceiling hypothesis: self-training can make useful behavior already reachable under sampling more frequent and consistent. It does not guarantee discovery of a genuinely absent or out-of-distribution strategy.

```text
before: useful strategy appears rarely
after:  useful strategy appears often

unknown: did the update create a new strategy,
         or only increase one already in support?
```

This is a diagnostic hypothesis, not a universal impossibility theorem. Test it with support-sensitive evidence:

- pass@k across multiple sampling budgets;
- performance under distribution shift;
- strategy diversity rather than answer frequency alone;
- transfer to tasks that require a new representation or tool;
- controlled comparison against additional data, search, or curriculum.

## 6. DeepSeekMath Is a Full Stack

[DeepSeekMath](https://arxiv.org/abs/2402.03300) is not "GRPO applied to a generic language model." Its reported system combines:

```text
DeepSeek-Coder initialization
        -> 120B math-related web tokens
        -> supervised fine-tuning
        -> GRPO reinforcement learning
```

The primary paper reports:

| Metric | Reported result | Evidence boundary |
|---|---:|---|
| MATH | 51.7% | DeepSeekMath paper; this is not an AIME result |
| MATH self-consistency@64 | 60.9% | Aggregation over 64 samples |

These results describe the full training stack. They do not isolate a causal gain from GRPO alone.

## 7. GRPO Uses Relative Group Feedback

PPO-style training commonly includes a policy, reference model, reward model or rule, and a learned critic. GRPO removes the separately trained critic and estimates a relative baseline from a group of outputs sampled for one prompt.

```text
prompt
  -> sample outputs o1 ... oG
  -> assign rewards r1 ... rG
  -> center or normalize rewards within the group
  -> update the policy using relative advantages
```

The core comparison is within the sampled group. This reduces the critic-related memory burden described by the paper, but it does not remove dependence on a trustworthy reward function.

## 8. Relative Learning Needs Reward Variation

Suppose four outputs receive rewards:

```text
all wrong:   [0, 0, 0, 0] -> no within-group distinction
mixed:       [0, 1, 0, 1] -> useful relative distinction
all correct: [1, 1, 1, 1] -> no within-group distinction
```

When every reward is identical, centered relative advantages collapse. Generation compute was spent, but the group offers no comparative update signal.

DAPO's dynamic sampling keeps groups with mixed outcomes to increase signal density. This is not neutral preprocessing: it changes the effective training distribution by downweighting tasks that are currently too easy or too hard.

## 9. Majority@k Is Not Pass@k

| Metric | Question | Selection assumption |
|---|---|---|
| Majority@k | Which answer wins the vote among k samples? | Aggregation can identify the modal answer |
| Pass@k | Did any of the k samples succeed? | An oracle-like checker can identify a successful candidate |

Consider `[A, A, A, B, C*, D]`, where `C*` is the only correct answer. Majority@6 returns `A` and fails. Pass@6 succeeds because `C*` exists in the candidate set.

A higher majority score can mean that an existing successful behavior became more consistent. It does not, by itself, establish that the model acquired a new solution mode. This is a useful diagnostic distinction, not a universal theorem about all RL runs.

## 10. DAPO Stabilizes Large-Scale RL

[DAPO](https://arxiv.org/abs/2503.14476) combines four controls:

| Control | Intended role | Boundary to audit |
|---|---|---|
| Clip-Higher | Give selected positive updates more room and preserve exploration | More exploration can also amplify reward errors |
| Dynamic sampling | Retain groups with useful reward variation | Changes the training distribution |
| Token-level policy-gradient loss | Change how long and short responses weight updates | Can alter incentives for response length |
| Soft overlong punishment | Smooth the approach to the context boundary | May still penalize legitimately long reasoning |

The paper's cumulative recipe moves from about **30 to 50 on AIME 2024 average@32** using a **Qwen2.5-32B base model**. That number is separate from DeepSeekMath's MATH result. It is a setup-specific cumulative result, not a universal threshold and not an isolated effect of any single control.

## 11. Monitor the System, Not Loss Alone

Useful operational signals include:

- task reward and held-out correctness;
- response length and truncation rate;
- token entropy and semantic diversity;
- fraction of all-correct, mixed, and all-wrong groups;
- pass@k and majority@k at fixed sampling budgets;
- verifier disagreement and suspected reward hacking.

Exact entropy or length thresholds depend on model, tokenizer, task, decoding policy, and infrastructure. A number copied from one lecture slide is not a universal operating target.

## 12. Choose by Signal, Not Fashion

| Situation | Candidate method | Main risk |
|---|---|---|
| Few rationale examples, many answer-labeled tasks, modest infrastructure | STaR | Invalid rationalization and support ceiling |
| Verifiable online sampling, capable base model, critic memory is costly | GRPO | Identical-reward groups and reward hacking |
| Large GRPO run with entropy, length, or weak-batch-signal failures | DAPO | Distribution shift and interacting controls |
| Weak, noisy, or hackable verifier | Redesign before scaling | False progress becomes training data |

Use four gates before scaling a loop:

```text
1. VERIFIER:  Is the intended target actually checkable?
2. SUPPORT:   Can the current policy discover useful candidates?
3. VARIATION: Do sampled groups contain comparative signal?
4. UPDATE:    Can optimization improve behavior without collapse?
```

A failed gate is an engineering result. Add supervision, change the curriculum, widen exploration, repair the verifier, or stop the loop.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | Train-time scaling closes a sample, verify, learn, update loop. |
| 2 | Four compute regimes spend compute at different stages. |
| 3 | Outcome verifiability does not certify the process. |
| 4 | STaR bootstraps rationale data. |
| 5 | Rationalization can recover paths or produce post-hoc stories. |
| 6 | Self-training amplifies reachable behavior; support expansion needs evidence. |
| 7 | DeepSeekMath is a full stack, and 51.7% is a MATH result. |
| 8 | GRPO uses group-relative feedback without a separate critic. |
| 9 | Mixed-reward groups carry relative signal. |
| 10 | Majority@k and pass@k measure different properties. |
| 11 | DAPO couples four stabilization controls. |
| 12 | Diagnose verifier, support, variation, and update before scaling. |

## Teaching Questions

1. What must happen between model generation and a defensible claim of self-improvement?
2. Why is test-time search not train-time scaling?
3. What does a final-answer checker certify, and what does it miss?
4. Which STaR examples enter the training set directly?
5. How can answer-conditioned rationalization create a post-hoc story?
6. What experiment would distinguish consistency gain from strategy-support expansion?
7. Why can the DeepSeekMath result not be attributed to GRPO alone?
8. Which component does GRPO avoid relative to a critic-based PPO stack?
9. Why do all-correct and all-wrong groups carry no relative signal?
10. Give a candidate set where majority@k fails but pass@k succeeds.
11. Which DAPO control changes the effective task distribution?
12. When should a team stop rather than scale a self-improvement loop?

## Homework: Design and Audit a University Self-Improvement Loop

Choose one university task: algebra tutoring, code feedback, citation checking, assignment planning, or another instructor-approved task.

Produce these deliverables:

| Deliverable | Required content |
|---|---|
| Sampled behavior | Exact model output or trajectory generated during training |
| Outcome verifier | What it certifies, its false positives, and its false negatives |
| Process check | One intermediate behavior to inspect and what the check misses |
| Method decision | STaR, GRPO, DAPO, another method, or no training loop |
| Support test | Metric or experiment that distinguishes consistency from a new strategy |
| Signal audit | Expected all-correct, mixed, and all-wrong group rates |
| Monitoring plan | Reward, held-out result, entropy, length, pass@k, majority@k |
| Red-team case | One way the model could exploit the verifier |
| Stop rule | Evidence that pauses training or blocks deployment |

Conclude with a one-page argument answering: **What evidence would show that students learn better, rather than that the agent only scores better?**

## Official Reading Set

1. Eric Zelikman et al., [STaR: Bootstrapping Reasoning With Reasoning](https://arxiv.org/abs/2203.14465), arXiv:2203.14465.
2. Zhihong Shao et al., [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300), arXiv:2402.03300.
3. Qiying Yu et al., [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476), arXiv:2503.14476.

## Source Versus Teaching Synthesis

Directly sourced from the lecture and primary papers:

- the train-time feedback-loop framing;
- the STaR generation, filtering, rationalization, fine-tuning, and iteration procedure;
- DeepSeekMath's model/data/SFT/GRPO stack and MATH metrics;
- GRPO's group-relative baseline and lack of a separately trained critic;
- DAPO's Clip-Higher, dynamic sampling, token-level loss, soft overlong punishment, and setup-specific cumulative result;
- the lecture's majority@k versus pass@k distinction and discussion of capability ceilings.

Teaching synthesis in this page:

- the four-regime comparison table;
- the verifier, support, variation, update diagnostic;
- the university examples and monitoring checklist;
- the support-sensitive capability tests;
- the homework and stop-rule framing.

The capability-ceiling and majority-versus-pass arguments are presented as diagnostics to test, not settled universal laws.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 5 — Planning and Multi-Step Reasoning](/learnAIDoc/wiki/cs329a-part-05-planning-multistep-reasoning/)
- [Stanford CS329A Part 7 — Self-Improvement and Deep Research Agents](/learnAIDoc/wiki/cs329a-part-07-self-improvement-deep-research/)
- [CS329A Agent-System Literacy — The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [Stanford CS329A Part 2 — Test-Time Compute Scaling](/learnAIDoc/wiki/cs329a-part-02-test-time-compute-scaling/)
