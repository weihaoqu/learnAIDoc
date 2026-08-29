# Slide 2: Keep Four Compute Regimes Separate

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: compute regimes
- Headline: Keep Four Compute Regimes Separate
- Subtitle: They spend compute at different moments, expose different supervision, and do not all change the weights.
- Supporting labels: pretraining; SFT; test-time search; train-time improvement
- Lecture evidence: CS329A Part 6, 03:07-07:40 / 11:31-16:08
- Primary-paper basis: Lecture taxonomy; STaR and DeepSeekMath examples

## Visual direction
Four lifecycle cards mark when compute is spent and whether weights are open or locked.

## Teaching objective
Distinguish pretraining, supervised fine-tuning, test-time search, and train-time self-improvement.

## Speaker notes
Lecture 03:07-07:40 and 11:31-16:08. Pretraining and SFT update parameters from external corpora or demonstrations. Test-time search spends inference compute while weights stay locked. Train-time self-improvement uses generated experience to update parameters.
