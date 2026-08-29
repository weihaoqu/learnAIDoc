# Slide Deck Outline

**Topic**: Stanford CS329A Part 2 - Test-Time Compute Scaling
**Style**: intuition-machine
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-28

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Academic technical briefing style with an aged-paper surface, crisp vector system diagrams, compact explanatory cards, and narrative headlines. Every slide visualizes one causal relationship and marks evidence or assumptions directly beside it.

Background:
  Texture: subtle warm paper grain with a faint engineering grid
  Base Color: Aged Cream (#F5F0E6)

Typography:
  Headlines: bold geometric sans-serif with stable line lengths
  Body: clean sans-serif at presentation-readable sizes
  Data labels: monospace for equations, budgets, and system states

Color Palette:
  Primary Text: Near Black (#1A1A1A)
  Background: Aged Cream (#F5F0E6)
  Generation: Cobalt (#2563EB)
  Verification: Teal (#2F7373)
  Constraints: Maroon (#722F37)
  Budget: Warm Brown (#8B7355)
  Risk: Red (#B42318)

Visual Elements:
  - original candidate fans, gates, trees, operator graphs, and budget routes
  - timestamp and paper evidence tags
  - adjacent assumption and caveat boxes
  - subtle schematic grid with no decorative imagery

Density Guidelines:
  - one teachable claim per slide
  - two to four support labels
  - one dominant diagram or comparison
  - no logos, slide numbers, or copied lecture frames

Style Rules:
  Do: use narrative headlines, exact metric names, visible assumptions, and original diagrams.
  Don't: imply coverage is returned accuracy, universalize benchmark results, or treat a reward model as ground truth.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 12
**Type**: Cover
**Filename**: 01-slide-cover.png
**Headline**: More Inference Compute Creates Options, Not Guarantees
**Sub-headline**: Stanford CS329A Part 2 - test-time scaling as a generation, allocation, and verification problem
**Visual**: A fixed model fans into candidates; a verifier gate returns one answer.
**Evidence**: Lecture 01:11-15:34

---

## Slide 2 of 12
**Type**: Content
**Filename**: 02-slide-compute-frontiers.png
**Headline**: Test-Time Scaling Searches Without Changing the Weights
**Body**: Pretraining changes broad capability; post-training shapes behavior; test-time compute spends a per-request budget on search, revision, tools, and selection.
**Visual**: Three-stage compute map with a lock on model weights at inference.
**Evidence**: Lecture 00:05-01:11; Snell et al. 2024, arXiv:2408.03314

---

## Slide 3 of 12
**Type**: Content
**Filename**: 03-slide-repeated-sampling.png
**Headline**: Repeated Sampling Buys More Chances
**Body**: One fixed model generates many candidates; an oracle verifier measures coverage; a deployable selector must choose what to return.
**Visual**: Candidate fan-out and two different gates.
**Evidence**: Lecture 01:29-03:36; Brown et al. 2024, arXiv:2407.21787

---

## Slide 4 of 12
**Type**: Content
**Filename**: 04-slide-coverage-reliability.png
**Headline**: A Correct Candidate Can Exist and Still Never Reach the User
**Body**: Coverage asks whether any candidate is correct; returned reliability asks whether the selected candidate is correct.
**Visual**: Candidate set containing a green answer while a red wrong answer is selected.
**Evidence**: Lecture 01:29-03:36 and 12:20-26:55

---

## Slide 5 of 12
**Type**: Content
**Filename**: 05-slide-per-problem-law.png
**Headline**: One Problem Has an Exponential Failure Curve
**Body**: `pass@k = 1 - (1-p)^k`; independence and constant `p` are assumptions, not deployment facts.
**Visual**: Formula, shrinking failure bars, and assumption tags.
**Evidence**: Lecture 05:27-07:33; Schaeffer et al. 2025, arXiv:2502.17578

---

## Slide 6 of 12
**Type**: Content
**Filename**: 06-slide-heavy-tail.png
**Headline**: A Few Extremely Hard Problems Bend the Benchmark Curve
**Body**: Per-problem exponential scaling and aggregate power-law behavior can coexist under a heavy-tailed distribution of single-attempt success probabilities.
**Visual**: Easy-problem mass plus a long hard-problem tail feeding an aggregate curve.
**Evidence**: Lecture 07:33-11:20; Schaeffer et al. 2025, arXiv:2502.17578

---

## Slide 7 of 12
**Type**: Content
**Filename**: 07-slide-verification-gap.png
**Headline**: Generation Scales Only as Far as Verification Can Follow
**Body**: Executable tests can reject candidates that violate specified checks; proof assistants can check formalized proofs. Open-ended domains lack complete executable checks.
**Visual**: Domain verification ladder and widening generator-verifier gap.
**Evidence**: Lecture 12:20-26:55; Brown et al. 2024, arXiv:2407.21787

---

## Slide 8 of 12
**Type**: Content
**Filename**: 08-slide-parallel-sequential.png
**Headline**: The Same Budget Can Explore Breadth or Refine Depth
**Body**: Parallel sampling explores multiple stochastic candidates, often with correlated failures; sequential revision improves a path using feedback.
**Visual**: Equal token budget split into a broad fan and a deep chain.
**Evidence**: Lecture 26:55-30:30

---

## Slide 9 of 12
**Type**: Content
**Filename**: 09-slide-orm-prm.png
**Headline**: Outcome Scores Choose Finishes; Process Scores Shape the Route
**Body**: ORMs score final answers; PRMs score intermediate steps and can guide beam search. Neither is ground truth by default.
**Visual**: Final-only scorecard versus step-scored reasoning tree.
**Evidence**: Lecture 30:30-34:40; Snell et al. 2024, arXiv:2408.03314

---

## Slide 10 of 12
**Type**: Content
**Filename**: 10-slide-difficulty-routing.png
**Headline**: Compute Allocation Should Change With Estimated Difficulty
**Body**: Easy, medium, and hard tasks can favor different strategies; one uniform best-of-N policy wastes budget.
**Visual**: Difficulty router sending tasks to different search mixes.
**Evidence**: Lecture 34:40-45:47; Snell et al. 2024, arXiv:2408.03314

---

## Slide 11 of 12
**Type**: Content
**Filename**: 11-slide-archon.png
**Headline**: Archon Searches Over Inference Architectures, Not Just Answers
**Body**: Given benchmarks, models, operators, and a budget, architecture search composes generators, critics, rankers, fusers, and verifiers.
**Visual**: Operator library, search controller, and selected inference graph.
**Evidence**: Lecture 45:47-61:22; Saad-Falcon et al. 2024, arXiv:2409.15254

---

## Slide 12 of 12
**Type**: Back Cover
**Filename**: 12-slide-diagnostic.png
**Headline**: Before Buying More Inference, Find the Bottleneck
**Body**: What creates diversity? How is budget allocated? What verifies success? When does the system stop?
**Visual**: Four-question diagnostic around a bounded compute meter; bridge to Part 3, Robust Verification.
**Evidence**: Whole-lecture synthesis
