# Slide 9: Critical Path Is Not Total Work

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt search/generation, teal verified or dependency-safe flow, warm-brown runtime/budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: parallelism accounting
- Headline: Critical Path Is Not Total Work
- Subtitle: Sequential depth can fall while total tokens, overhead, and straggler latency remain.
- Supporting labels: critical path; total work; overhead; straggler
- Lecture evidence: CS329A Part 5, 33:00-49:46
- Primary-paper basis: SPRINT, arXiv:2506.05745

## Visual direction
The same task blocks appear in a total-work ledger and a DAG with only the critical chain highlighted.

## Teaching objective
Separate sequential-token savings from total compute and measured wall-clock latency.

## Speaker notes
Lecture 33:00-49:46; SPRINT, arXiv:2506.05745. SPRINT targets the dependency-constrained critical path. Total generated work need not fall. Scheduling, narrow graphs, synchronization, and stragglers can erase gains; short tasks can regress.
