# Slide 9: Verification Can Select Outputs and Train the Generator

## Production
Original 1600x900 local SVG rendered to PNG. Do not reproduce Stanford frames or logos.

## Style
Aged-cream technical briefing, faint grid, crisp vector control diagrams, cobalt generation, teal verification, maroon failure, brown supervision, no gradients.

## Content
- Stage: verification feedback
- Headline: Verification Can Select Outputs and Train the Generator
- Subtitle: The same PRM can guide inference-time reranking and PPO-style policy updates.
- Evidence: CS329A Part 3, 43:27-47:41 + arXiv:2312.08935

## Visual
A central PRM sends one branch to a selector and another into an RL update loop.

## Objective
Connect verification at inference to training-time feedback.

## Speaker notes
A PRM can rank candidates and become a training reward. Optimizing an incomplete proxy introduces reward-hacking risk.
