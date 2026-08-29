# Slide 5: One Early Error Can Contaminate the Whole Trajectory

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or assigned-paper figures.

## Style
Aged-cream academic technical briefing matched to the CS329A Part 2 deck: faint engineering grid, crisp 2px vector diagrams, near-black type, teal observations, cobalt reasoning/code, warm-brown human specification, maroon constraints, 8px card corners, no gradients or decorative imagery.

## On-slide content
- Stage: trajectory risk
- Headline: One Early Error Can Contaminate the Whole Trajectory
- Subtitle: Longer loops create more chances to recover and more chances to compound a mistake.
- Supporting labels: Bad observation; Wrong state; Risky action; Backtrack
- Evidence: CS329A Part 4, 18:37-27:32 + arXiv:2210.03629

## Visual direction
A six-step trajectory turns red after a misleading observation; a dashed recovery branch restores an earlier state.

## Teaching objective
Show how retrieval and reasoning failures propagate across a trajectory.

## Speaker notes
ReAct reduces some hallucination failures in the reported tasks, but it adds search and reasoning-over-observation failures. An early bad observation can contaminate later state and action. Backtracking only helps when the system can identify a state worth restoring.
