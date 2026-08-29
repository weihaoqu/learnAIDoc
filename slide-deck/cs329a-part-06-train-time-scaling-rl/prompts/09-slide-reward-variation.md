# Slide 9: No Reward Variation Means No Relative Signal

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: signal geometry
- Headline: No Reward Variation Means No Relative Signal
- Subtitle: All-wrong and all-correct groups collapse the within-group advantage; mixed groups carry the update signal.
- Supporting labels: all wrong; mixed; all correct; dynamic sampling
- Lecture evidence: CS329A Part 6, 47:46-52:17 / 55:21-57:32
- Primary-paper basis: DeepSeekMath; DAPO, arXiv:2503.14476

## Visual direction
Three reward groups show zero, nonzero, and zero centered advantages; only the mixed group emits a learning signal.

## Teaching objective
Show why reward diversity is load-bearing for group-relative optimization.

## Speaker notes
Lecture 47:46-52:17 and 55:21-57:32; DeepSeekMath, arXiv:2402.03300, and DAPO, arXiv:2503.14476. If every sample receives the same reward, normalized relative advantages collapse. DAPO's dynamic sampling filters prompts without useful variation, which changes the effective training distribution and should not be treated as a neutral preprocessing step.
