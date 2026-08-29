# Slide Deck Outline

**Topic**: Stanford CS329A Part 3 - Robust Verification
**Style**: intuition-machine
**Audience**: learners
**Language**: English
**Slide Count**: 12
**Generated**: 2026-08-29

<STYLE_INSTRUCTIONS>
Academic technical briefing on aged cream paper with faint engineering grid, original vector control diagrams, narrative headlines, visible source tags, and adjacent caveats. Near-black text; cobalt generation; teal verification; maroon failure; brown supervision budget. One dominant system relationship per slide. No copied lecture frames, logos, gradients, or photorealism.
</STYLE_INSTRUCTIONS>

## Slide 1 of 12
**Filename**: 01-slide-cover.png
**Headline**: A Generator Is Only as Useful as Its Selector
**Body**: Candidate coverage may rise while selected-answer accuracy stays flat or falls.
**Evidence**: Lecture 00:09-00:52 and 14:19-18:24

## Slide 2 of 12
**Filename**: 02-slide-verifier-loop.png
**Headline**: The Basic Verifier Loop Learns to Rerank Completed Solutions
**Body**: Generate candidates, label final correctness, train a scalar verifier, and return the highest-scoring candidate.
**Evidence**: Lecture 03:18-07:57; Cobbe et al. 2021, arXiv:2110.14168

## Slide 3 of 12
**Filename**: 03-slide-false-positive-extremes.png
**Headline**: More Candidates Create More False-Positive Opportunities
**Body**: The maximum noisy score becomes less trustworthy as N grows unless verifier precision scales too.
**Caveat**: The displayed peak near 400 is experiment-specific.
**Evidence**: Lecture 14:19-18:24

## Slide 4 of 12
**Filename**: 04-slide-orm-prm.png
**Headline**: Outcome Scores Judge the Finish; Process Scores Judge the Route
**Body**: ORMs score completed trajectories; PRMs score intermediate steps and improve credit assignment.
**Evidence**: Lecture 21:17-25:06; Lightman et al. 2023, arXiv:2305.20050

## Slide 5 of 12
**Filename**: 05-slide-process-rubric.png
**Headline**: Process Labels Are Richer, but They Encode a Rubric
**Body**: Human labels judge correctness, relevance, and sufficient justification; valid shortcuts can be penalized.
**Evidence**: Lecture 25:06-28:32 and 31:43-37:51

## Slide 6 of 12
**Filename**: 06-slide-active-learning.png
**Headline**: PRM800K Targets Informative Mistakes Instead of Labeling Uniformly
**Body**: Active learning surfaces uncertain steps and convincing wrong solutions near the decision boundary.
**Evidence**: Lecture 26:11-30:14; Lightman et al. 2023, arXiv:2305.20050

## Slide 7 of 12
**Filename**: 07-slide-rollout-labels.png
**Headline**: Automatic Process Labels Trade Human Cost for Rollout Compute
**Body**: Hard label = any successful continuation; soft label = successful continuation fraction.
**Evidence**: Lecture 37:51-40:42; Wang et al. 2023, arXiv:2312.08935

## Slide 8 of 12
**Filename**: 08-slide-rollout-failures.png
**Headline**: Rollout Labels Inherit the Search Policy's Blind Spots
**Body**: A rare valid prefix can look bad when rollouts miss it; a wrong step can look good after a lucky repair.
**Evidence**: Lecture 40:42-43:27

## Slide 9 of 12
**Filename**: 09-slide-rerank-rl.png
**Headline**: Verification Can Select Outputs and Train the Generator
**Body**: A PRM can rerank candidates at inference and provide reward for PPO-style policy updates.
**Caveat**: Optimizing an imperfect verifier introduces reward-hacking risk.
**Evidence**: Lecture 43:27-47:41; Wang et al. 2023, arXiv:2312.08935

## Slide 10 of 12
**Filename**: 10-slide-weaver.png
**Headline**: Diversity Across Verifiers Is Useful Only After Weighting and Filtering
**Body**: Weaver normalizes heterogeneous scores, removes low-quality verifiers, estimates reliability, and selects by weighted evidence.
**Evidence**: Lecture 51:51-57:36; Saad-Falcon et al. 2025, arXiv:2506.18203

## Slide 11 of 12
**Filename**: 11-slide-dependence.png
**Headline**: Shared Blind Spots Can Defeat an Entire Verifier Ensemble
**Body**: Complementary errors add evidence; correlated errors repeat the same mistake. Weak supervision needs assumptions and quality gates.
**Evidence**: Lecture 57:36-60:07; Saad-Falcon et al. 2025, arXiv:2506.18203

## Slide 12 of 12
**Filename**: 12-slide-budget-system.png
**Headline**: Design Verification as a Budgeted End-to-End System
**Body**: Allocate across candidate count, generator strength, verifier strength/count, and distillation; evaluate selected-answer accuracy, calibration, transfer, and cost.
**Evidence**: Lecture 60:07-68:13
