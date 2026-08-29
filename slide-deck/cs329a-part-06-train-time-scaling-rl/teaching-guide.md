# Teaching Guide: CS329A Part 6 - Train-Time Scaling and Scaling RL

Use this guide with the 12-slide deck. The goal is not to memorize one post-training recipe. Learners should be able to locate the generated data, verifier, learning signal, parameter update, and failure mode in any self-improvement claim.

## Slide 1: Close the Loop

Train-time scaling differs from merely generating more answers. Model outputs are evaluated and converted into updates that change later output distributions.

**Checkpoint:** Where must evidence enter before “the model improved itself” is a defensible claim?

## Slide 2: Four Compute Regimes

Pretraining builds broad representations. SFT imitates demonstrations. Test-time search spends compute with fixed weights. Train-time self-improvement generates feedback-bearing data and updates weights.

Do not attribute a full-stack result to the final stage without an ablation.

## Slide 3: Verification Is Partial

Math is attractive because final answers are often checkable. A correct answer does not prove a valid rationale, safe tool behavior, or understanding. Outcome verification and process verification certify different things.

## Slide 4: The STaR Loop

STaR generates rationales, keeps those that yield correct answers, rationalizes failures while shown the answer, fine-tunes, and repeats.

**Checkpoint:** Which dataset supplies answers, and which examples supply rationales?

## Slide 5: Rationalization Risk

The answer hint can help the model find a useful route. It can also create a fluent post-hoc explanation. STaR's final-answer filter does not independently validate every intermediate step.

**Exercise:** Construct a correct-answer but invalid-rationale example.

## Slide 6: Capability Ceiling Is a Diagnostic

Self-training can raise the frequency of useful behavior already reachable under sampling. It does not guarantee that a genuinely absent strategy or robust out-of-distribution method will appear.

This is a hypothesis to test with support-sensitive metrics, not a universal theorem.

## Slide 7: DeepSeekMath Is a Full Stack

The system combines code-model initialization, 120B math-related web tokens, SFT, and GRPO. The primary paper reports 51.7% on MATH and 60.9% on MATH with 64-sample self-consistency.

**Source-audit lesson:** the lecture slide's 51.7% AIME label conflicts with the primary paper and must not be repeated.

## Slide 8: GRPO Without a Critic

PPO commonly trains a separate critic. GRPO samples several outputs, scores them, and uses a normalized group-relative baseline instead. This removes the critic but does not remove the need for reward variation or a trustworthy verifier.

## Slide 9: Mixed Groups Carry Signal

If all outputs are wrong, their normalized relative rewards are identical. The same is true if all are correct. Mixed groups identify better and worse behavior within the group.

Dynamic sampling improves signal density by retaining mixed groups. It also changes the training distribution.

## Slide 10: Majority and Pass Measure Different Things

Majority@k asks which answer wins aggregation. Pass@k asks whether at least one candidate succeeds. A model can become more consistent around an existing solution mode while pass@k stays flat.

**Checkpoint:** Which metric would better detect a genuinely new successful strategy?

## Slide 11: Four DAPO Controls

- Clip-Higher gives selected positive updates more room.
- Dynamic sampling retains mixed-reward groups.
- Token-level loss changes how response length weights updates.
- Soft overlong punishment smooths the context-limit boundary.

The reported 30 to 50 AIME 2024 average@32 progression is cumulative and specific to the paper's Qwen2.5-32B base-model setup. The controls interact.

## Slide 12: Choose by Signal

Use STaR when rationales are scarce but answer labels and modest fine-tuning are available. Use GRPO when online samples are verifiable and critic memory matters. Use DAPO when scaling GRPO exposes entropy, length, or weak-batch-signal failures.

If the verifier is noisy or hackable, none of these methods is trustworthy yet.

## Short Homework

Design a self-improvement loop for one university task, such as algebra tutoring, code feedback, or citation checking.

1. Specify the model output being sampled.
2. Define the outcome verifier and its false positives.
3. Define one process check and its false positives.
4. Choose STaR, GRPO, DAPO, or no training loop.
5. State the metric that distinguishes consistency gains from new support.
6. Define monitoring for reward, entropy, response length, and informative-group rate.
7. Name one way the model could hack the verifier.

Conclude what evidence would justify deployment and what observation would stop training.
