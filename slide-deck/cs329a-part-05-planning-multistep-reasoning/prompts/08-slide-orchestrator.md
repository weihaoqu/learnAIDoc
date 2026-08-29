# Slide 8: Parallel Execution Needs an Orchestrator

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt search/generation, teal verified or dependency-safe flow, warm-brown runtime/budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: parallel runtime
- Headline: Parallel Execution Needs an Orchestrator
- Subtitle: The model emits tagged branches; a runtime launches, synchronizes, and rejoins them.
- Supporting labels: planner tags; executors; barrier; replan
- Lecture evidence: CS329A Part 5, 31:03-36:30
- Primary-paper basis: SPRINT, arXiv:2506.05745

## Visual direction
A planner fans into three executor lanes, converges at a synchronization barrier, and loops back for replanning.

## Teaching objective
Locate concurrency in the external runtime rather than the autoregressive decoder.

## Speaker notes
Lecture 31:03-36:30; SPRINT, arXiv:2506.05745. The decoder remains autoregressive. An external orchestrator interprets tags, launches independent executors, waits at barriers, merges results, and returns context for replanning.
