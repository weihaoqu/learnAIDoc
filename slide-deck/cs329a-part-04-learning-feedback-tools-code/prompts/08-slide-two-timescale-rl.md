# Slide 8: Credit Assignment Spans Tokens and Turns

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or assigned-paper figures.

## Style
Aged-cream academic technical briefing matched to the CS329A Part 2 deck: faint engineering grid, crisp 2px vector diagrams, near-black type, teal observations, cobalt reasoning/code, warm-brown human specification, maroon constraints, 8px card corners, no gradients or decorative imagery.

## On-slide content
- Stage: credit assignment
- Headline: Credit Assignment Spans Tokens and Turns
- Subtitle: Code is emitted token by token; execution feedback arrives after a complete attempt.
- Supporting labels: Token policy; Turn boundary; Execution; Delayed reward
- Evidence: CS329A Part 4, 31:57-34:36 + arXiv:2410.02089

## Visual direction
Three token ribbons sit inside turn cards; execution pulses arrive between turns and a delayed reward closes the episode.

## Teaching objective
Explain RLEF's nested token-level and turn-level time scales.

## Speaker notes
A response contains many token decisions, but execution feedback appears only after an attempt. The learner must propagate delayed evidence across the trajectory. A passing terminal reward remains weak process supervision because it does not identify every necessary implementation choice.
