# Slide 10: SWiRL Learns at the Step Level

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt search/generation, teal verified or dependency-safe flow, warm-brown runtime/budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: SWiRL step learning
- Headline: SWiRL Learns at the Step Level
- Subtitle: Offline tool trajectories supply intermediate feedback without a live call in every rollout.
- Supporting labels: synthetic trajectory; stored observation; process judge; step-wise RL
- Lecture evidence: CS329A Part 5, 50:29-63:21
- Primary-paper basis: SWiRL, arXiv:2504.04736

## Visual direction
An offline collection lane feeds a step-wise RL loop through a stored-observation buffer.

## Teaching objective
Explain SWiRL's two-stage offline collection and step-wise RL pipeline.

## Speaker notes
Lecture 50:29-63:21; SWiRL, arXiv:2504.04736. Stage 1 builds and filters offline tool-use trajectories. Stage 2 proposes and judges the next action while reusing stored observations. This avoids live-tool instability but introduces stale or off-policy feedback risk.
