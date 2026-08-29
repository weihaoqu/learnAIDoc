# Slide 4: STaR Bootstraps Rationales

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: STaR bootstrapping
- Headline: STaR Bootstraps Rationales
- Subtitle: Keep correct-answer rationales, rationalize failures with an answer hint, fine-tune, and repeat.
- Supporting labels: generate; filter; rationalize; fine-tune
- Lecture evidence: CS329A Part 6, 16:08-27:17
- Primary-paper basis: STaR: Bootstrapping Reasoning With Reasoning, arXiv:2203.14465

## Visual direction
An outer training loop branches at a correctness filter into direct retention and answer-hint rationalization paths.

## Teaching objective
Explain the two paths through the STaR data-generation loop.

## Speaker notes
Lecture 16:08-27:17; STaR, arXiv:2203.14465. Correct-answer rationales enter the training set directly. Failed examples get another attempt conditioned on the known answer; successful rationalizations are added before fine-tuning and iteration.
