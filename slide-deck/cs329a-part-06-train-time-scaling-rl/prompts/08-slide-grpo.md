# Slide 8: GRPO Uses Relative Group Feedback

## Production method
Rendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.

## Style
Aged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.

## On-slide content
- Stage: relative group feedback
- Headline: GRPO Uses Relative Group Feedback
- Subtitle: Sample a group, normalize rewards within it, and update the policy without a separately learned critic.
- Supporting labels: prompt; group samples; relative advantage; policy update
- Lecture evidence: CS329A Part 6, 43:49-47:46
- Primary-paper basis: DeepSeekMath, arXiv:2402.03300

## Visual direction
A compact GRPO lane contrasts group-normalized rewards with a crossed-out standalone critic lane.

## Teaching objective
Explain the operational distinction between GRPO and a critic-based PPO stack.

## Speaker notes
Lecture 43:49-47:46; DeepSeekMath, arXiv:2402.03300. GRPO estimates a relative baseline from rewards within a sampled group, reducing the need for a separate value model. The signal depends on useful reward variation inside the group.
