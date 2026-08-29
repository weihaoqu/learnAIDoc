# Slide 7: Correction Within a Run Is Not Durable Learning

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity. No copied Stanford frames, figures, logos, or paper graphics.

## Style
Aged cream academic briefing, subtle engineering grid, near-black type, cobalt generation, teal verification, green persistence, warm-brown budget, maroon constraints, red risks, no gradients.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- This deck is an independent teaching companion.
- Evidence map: CS329A Part 6: Train-Time Scaling and Reinforcement Learning

## On-slide content
- Stage: two timescales
- Headline: Correction Within a Run Is Not Durable Learning
- Subtitle: Search fixes the current trajectory; learning changes what happens next time.
- Planned speaking time: 2:15

## Visual direction
Two lanes comparing retry/context correction with memory, data, policy, or weight updates across runs.

## Teaching objective
Contrast test-time correction with changes that persist across runs.

## Speaker notes (2:15)
This slide gives the distinction most likely to be lost in casual discussions of self-improvement. On the top path, the agent fails, receives feedback, revises its context or plan, and succeeds within the same run. That is useful correction. When the session ends, the system may forget the lesson. On the bottom path, selected experience changes a durable component: model weights, a memory store, training data, a tool, a workflow policy, or an approved artifact. The next run begins differently. That is persistent learning, although each mechanism has different guarantees. Reinforcement learning and self-training use rewards or verified trajectories to update behavior, but they inherit verifier weaknesses. Memory can preserve useful facts while also preserving errors or sensitive information. Updating tools or prompts may improve the system without changing model weights. Therefore, do not use “learning” as a vague synonym for “the second answer was better.” Specify what changed, how it was selected, how long it persists, and whether performance transfers to new tasks. A clean experiment compares future runs with and without the update under the same evaluation. If the system only repaired the present trajectory, call it within-run improvement. If behavior reliably changes later, identify the durable mechanism and its boundary.
