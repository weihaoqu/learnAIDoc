# Slide 6: A Sequential Trace Can Hide a Dependency DAG

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt search/generation, teal verified or dependency-safe flow, warm-brown runtime/budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: dependency discovery
- Headline: A Sequential Trace Can Hide a Dependency DAG
- Subtitle: Token order is not always dependency order; independent work can execute concurrently.
- Supporting labels: linear trace; dependency edges; parallel width; join
- Lecture evidence: CS329A Part 5, 23:29-29:20
- Primary-paper basis: SPRINT, arXiv:2506.05745

## Visual direction
A six-step linear chain unfolds into two independent branches that rejoin before the answer.

## Teaching objective
Transform a sequential trace into a dependency graph and identify the critical path.

## Speaker notes
Lecture 23:29-29:20; SPRINT, arXiv:2506.05745. A written trace is sequential, but some subproblems are independent. Parallel execution is valid only after true dependencies are explicit.
