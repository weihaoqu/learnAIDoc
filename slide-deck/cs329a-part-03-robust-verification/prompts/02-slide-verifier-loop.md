# Slide 2: The Basic Verifier Loop Learns to Rerank Completed Solutions

## Production
Original 1600x900 local SVG rendered to PNG. Do not reproduce Stanford frames or logos.

## Style
Aged-cream technical briefing, faint grid, crisp vector control diagrams, cobalt generation, teal verification, maroon failure, brown supervision, no gradients.

## Content
- Stage: outcome verifier
- Headline: The Basic Verifier Loop Learns to Rerank Completed Solutions
- Subtitle: Generate, label, train a scalar verifier, then return the highest-scoring candidate.
- Evidence: CS329A Part 3, 03:18-07:57 + arXiv:2110.14168

## Visual
Five-stage pipeline: question, generator, labeled candidates, verifier training, reranked output.

## Objective
Explain the generate-label-train-rerank loop.

## Speaker notes
Candidates are labeled by final correctness. A verifier specializes in ranking while the generator remains general. Passing the verifier is still not proof of correctness.
