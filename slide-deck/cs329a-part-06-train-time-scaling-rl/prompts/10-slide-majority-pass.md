# Slide 10: Majority@k and Pass@k Measure Different Things

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: evaluation semantics
- Headline: Majority@k and Pass@k Measure Different Things
- Subtitle: One rewards consensus around the modal answer; the other asks whether any sampled candidate succeeds.
- Supporting labels: consensus; coverage; aggregation; oracle selection
- Lecture evidence: CS329A Part 6, 52:17-53:05 / 63:12-65:11
- Primary-paper basis: Lecture metric comparison; DeepSeekMath context

## Visual direction
The same candidate set feeds a voting box and an any-success oracle, producing different outcomes.

## Teaching objective
Prevent interchangeable use of majority@k and pass@k.

## Speaker notes
Lecture 52:17-53:05 and 63:12-65:11; DeepSeekMath, arXiv:2402.03300, provides the surrounding RL context. Majority@k aggregates samples by vote and can fail when a correct answer is rare. Pass@k measures whether at least one sampled candidate succeeds and assumes an oracle-like checker can identify it. They answer different evaluation questions.
