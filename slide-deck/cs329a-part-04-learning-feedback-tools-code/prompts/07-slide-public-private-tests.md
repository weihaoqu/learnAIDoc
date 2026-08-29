# Slide 7: Public Tests Teach the Repair; Private Tests Guard the Reward

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or assigned-paper figures.

## Style
Aged-cream academic technical briefing matched to the CS329A Part 2 deck: faint engineering grid, crisp 2px vector diagrams, near-black type, teal observations, cobalt reasoning/code, warm-brown human specification, maroon constraints, 8px card corners, no gradients or decorative imagery.

## On-slide content
- Stage: test visibility
- Headline: Public Tests Teach the Repair; Private Tests Guard the Reward
- Subtitle: RLEF separates in-trajectory feedback from the terminal correctness signal.
- Supporting labels: Public feedback; Turn limit; Private tests; Terminal reward
- Evidence: CS329A Part 4, 30:02-34:36 + RLEF Sections 2.1-2.2

## Visual direction
A public feedback lane reaches the agent while a firewall hides private tests until a terminal reward gate.

## Teaching objective
Distinguish visible repair feedback from held-out terminal evaluation.

## Speaker notes
Public-test output enters the conversation. An episode ends when public tests pass or a turn limit is reached. The terminal scalar reward records whether all public and private tests pass. Separation reduces direct exposure; it does not prove absence of contamination or complete specification coverage.
