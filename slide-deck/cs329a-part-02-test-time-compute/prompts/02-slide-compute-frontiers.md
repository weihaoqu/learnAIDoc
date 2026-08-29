# Slide 2: Test-Time Scaling Searches Without Changing the Weights

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames or logos.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, teal verification, cobalt generation, warm-brown budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: where compute lives
- Headline: Test-Time Scaling Searches Without Changing the Weights
- Subtitle: Training changes the model; inference spends a recurring per-request budget.
- Supporting labels: Pretraining; Post-training; Test time
- Evidence: CS329A Part 2, 00:05-01:11 + arXiv:2408.03314

## Visual direction
Three connected compute stages with the test-time model visibly locked.

## Teaching objective
Distinguish pretraining, post-training, and test-time compute.

## Speaker notes
Pretraining builds broad capability. Post-training shapes behavior. Test-time scaling keeps the weights fixed and spends compute on the current task. Training cost can be amortized; inference cost recurs per request.
