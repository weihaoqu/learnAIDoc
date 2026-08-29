# Slide Deck Outline

**Topic**: Stanford CS329A Part 6 - Train-Time Scaling and Scaling RL
**Style**: intuition-machine
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-29

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Academic technical briefing on aged paper, matching the Part 2 structural discipline while using original feedback-loop, rationale, reward-group, metric, and RL-control diagrams. Every slide distinguishes measured result, primary-source fact, lecture hypothesis, and teaching synthesis.

Background:
  Texture: subtle warm paper grain with a faint engineering grid
  Base Color: Aged Cream (#F5F0E6)

Typography:
  Headlines: bold geometric sans-serif with stable line lengths
  Body: clean sans-serif at presentation-readable sizes
  Data labels: monospace for model states, metrics, rewards, and evidence tags

Color Palette:
  Primary Text: Near Black (#171717)
  Background: Aged Cream (#F5F0E6)
  Generation / Sampling: Cobalt (#2563EB)
  Verification / Useful Signal: Teal (#2F7373)
  Training / Update: Warm Brown (#8B7355)
  Constraints / Source Conflict: Maroon (#722F37) and Red (#B42318)
  Success: Green (#16803C)

Visual Elements:
  - original feedback loops, filtering funnels, support maps, group-reward diagrams, and control systems
  - timestamp and primary-paper evidence tags
  - visible source-correction, diagnostic, and setup-specific boundaries
  - faint technical grid with no decorative imagery

Density Guidelines:
  - one teachable claim per slide
  - two to four support labels
  - one dominant diagram or comparison
  - no logos, slide numbers, or copied lecture imagery

Style Rules:
  Do: name the verifier, benchmark, group signal, and causal boundary.
  Don't: use the incorrect AIME label, validate a rationale from its answer alone, or universalize DAPO thresholds.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 12
**Type**: Cover
**Filename**: 01-slide-cover.png
**Headline**: Train-Time Scaling Closes the Feedback Loop
**Sub-headline**: Stanford CS329A Part 6 - generated data becomes useful only through verification and parameter updates
**Visual**: A circular sample, verify, learn, update loop wrapped around a model-weight core.
**Evidence**: Lecture 00:00-05:43; STaR, DeepSeekMath, DAPO

---

## Slide 2 of 12
**Type**: Content
**Filename**: 02-slide-compute-regimes.png
**Headline**: Keep Four Compute Regimes Separate
**Body**: Pretraining, supervised fine-tuning, test-time search, and train-time self-improvement spend compute at different points and change different things.
**Visual**: Four-stage lifecycle with weights-open or weights-locked markers.
**Evidence**: Lecture 03:07-07:40, 11:31-16:08

---

## Slide 3 of 12
**Type**: Content
**Filename**: 03-slide-verifiability.png
**Headline**: Verifiability Is the Feedback Bottleneck
**Body**: An answer checker can create scalable outcome signal without proving that the rationale, behavior, or tool use was valid.
**Visual**: A narrow outcome checker beside an opaque reasoning channel.
**Evidence**: Lecture 05:43-11:31; all three primary readings

---

## Slide 4 of 12
**Type**: Content
**Filename**: 04-slide-star-loop.png
**Headline**: STaR Bootstraps Rationales
**Body**: Generate rationales, retain correct-answer examples, rationalize failures with an answer hint, fine-tune, and repeat.
**Visual**: Iterative outer loop with two paths through a correctness filter.
**Evidence**: Lecture 16:08-27:17; STaR, arXiv:2203.14465

---

## Slide 5 of 12
**Type**: Content
**Filename**: 05-slide-rationalization.png
**Headline**: Rationalization Helps and Can Mislead
**Body**: An answer hint may recover a useful path or produce a plausible post-hoc explanation that was never validated.
**Visual**: Answer hint bridges a failed attempt to a rationale, with a broken-evidence warning.
**Evidence**: Lecture 17:53-25:13, 30:49-33:54; STaR, arXiv:2203.14465

---

## Slide 6 of 12
**Type**: Content
**Filename**: 06-slide-capability-ceiling.png
**Headline**: Self-Training Amplifies Reachable Behavior
**Body**: More consistent sampling can strengthen behavior already in support; genuinely absent or OOD strategies are not guaranteed to appear.
**Visual**: Before/after support distributions with a persistent unknown region.
**Evidence**: Lecture 37:34-40:53, 63:12-67:58; diagnostic synthesis

---

## Slide 7 of 12
**Type**: Content
**Filename**: 07-slide-deepseek-stack.png
**Headline**: DeepSeekMath Is a Full Training Stack
**Body**: Code initialization, 120B math-related tokens, SFT, and GRPO jointly precede the reported result.
**Visual**: Four-layer stack plus corrected source card: 51.7% MATH; 60.9% MATH SC@64.
**Evidence**: Lecture 40:53-46:25; DeepSeekMath, arXiv:2402.03300

---

## Slide 8 of 12
**Type**: Content
**Filename**: 08-slide-grpo.png
**Headline**: GRPO Uses Relative Group Feedback
**Body**: Sample a group, normalize rewards against the group, and update the policy without a separately trained critic.
**Visual**: PPO component stack contrasted with a group-relative baseline.
**Evidence**: Lecture 43:49-47:46; DeepSeekMath, arXiv:2402.03300

---

## Slide 9 of 12
**Type**: Content
**Filename**: 09-slide-reward-variation.png
**Headline**: Relative Learning Needs Reward Variation
**Body**: All-wrong and all-correct groups offer no within-group discrimination; mixed groups carry the useful relative signal.
**Visual**: Three groups with normalized advantage arrows and a distribution-shift warning.
**Evidence**: Lecture 47:46-52:17, 55:21-57:32; DeepSeekMath and DAPO

---

## Slide 10 of 12
**Type**: Content
**Filename**: 10-slide-majority-pass.png
**Headline**: Majority@k and Pass@k Measure Different Things
**Body**: One rewards consensus around the modal answer; the other asks whether any sampled candidate succeeds.
**Visual**: The same candidate set feeds a voting box and an any-success oracle.
**Evidence**: Lecture 52:17-53:05, 63:12-65:11; diagnostic hypothesis

---

## Slide 11 of 12
**Type**: Content
**Filename**: 11-slide-dapo-controls.png
**Headline**: DAPO Stabilizes RL With Four Coupled Controls
**Body**: Clip-Higher, dynamic sampling, token-level loss, and soft overlong punishment form one cumulative recipe.
**Visual**: Four control modules plus a setup-specific 30 -> 50 AIME24 average@32 result card for a Qwen2.5-32B base model.
**Evidence**: Lecture 53:05-61:49; DAPO, arXiv:2503.14476

---

## Slide 12 of 12
**Type**: Back Cover
**Filename**: 12-slide-signal-diagnostic.png
**Headline**: Diagnose the Signal Before Scaling the Loop
**Body**: Generated data helps only when the verifier, exploration support, reward variation, and update path are adequate.
**Visual**: A four-gate diagnostic terminating in scale or redesign.
**Evidence**: Lecture 61:49-72:34; whole-lecture teaching synthesis
