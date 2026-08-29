# Slide 11: DAPO Stabilizes RL With Four Coupled Controls

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: DAPO stabilization
- Headline: DAPO Stabilizes RL With Four Coupled Controls
- Subtitle: Clip-Higher, dynamic sampling, token-level loss, and overlong reward shaping form one cumulative recipe.
- Supporting labels: Clip-Higher; dynamic sampling; token loss; overlong shaping
- Lecture evidence: CS329A Part 6, 53:05-61:49
- Primary-paper basis: DAPO, arXiv:2503.14476

## Visual direction
Four control modules stabilize a training loop beside a bounded setup-specific 30 -> 50 result card.

## Teaching objective
Explain DAPO as a coupled recipe and bound its reported gain to the paper's setup.

## Speaker notes
Lecture 53:05-61:49; DAPO, arXiv:2503.14476. The paper's cumulative ablation moves from about 30 to 50 AIME 2024 average@32 using a Qwen2.5-32B base model. This is setup-specific and does not establish a universal threshold or isolated effect for any single control.
