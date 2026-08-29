# Slide 7: SPRINT Compiles Demonstrations Into Parallel Stages

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt search/generation, teal verified or dependency-safe flow, warm-brown runtime/budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: SPRINT data compiler
- Headline: SPRINT Compiles Demonstrations Into Parallel Stages
- Subtitle: Decomposition and dependency labeling convert a trace into staged planner-executor training data.
- Supporting labels: decompose; label; infer DAG; pack stages; SFT
- Lecture evidence: CS329A Part 5, 27:13-31:03
- Primary-paper basis: SPRINT, arXiv:2506.05745

## Visual direction
A five-stage compiler pipeline with the dependency-inference stage highlighted as load-bearing.

## Teaching objective
Explain SPRINT's synthetic training-data transformation.

## Speaker notes
Lecture 27:13-31:03; SPRINT, arXiv:2506.05745. The pipeline decomposes a trace, labels planning versus execution, infers dependencies, packs independent work into stages, and fine-tunes. Dependency-label errors can teach invalid concurrency.
