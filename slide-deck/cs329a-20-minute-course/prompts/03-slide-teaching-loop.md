# Slide 3: One Teaching Loop Connects the Course

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity. No copied Stanford frames, figures, logos, or paper graphics.

## Style
Aged cream academic briefing, subtle engineering grid, near-black type, cobalt generation, teal verification, green persistence, warm-brown budget, maroon constraints, red risks, no gradients.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- This deck is an independent teaching companion.
- Evidence map: Whole-series synthesis across Parts 1-9

## On-slide content
- Stage: course map
- Headline: One Teaching Loop Connects the Course
- Subtitle: Generate, plan, act, observe, verify, and learn under a budget.
- Planned speaking time: 2:30

## Visual direction
Linear agent loop with retry and durable-learning branches plus a budget boundary.

## Teaching objective
Teach the loop while preserving its status as an abstraction.

## Speaker notes (2:30)
Here is the map for the complete course. First, the system generates candidate actions, answers, plans, or hypotheses. Second, it spends inference-time compute on search or planning. Third, it acts through a tool or environment. Fourth, it observes what happened. Fifth, it verifies whether the observation is evidence of progress. Finally, it may learn by updating memory, data, tools, artifacts, a policy, or model weights. Notice two return paths. Verification can send the current run backward for another attempt. Durable learning can change what the system does in a later run. Those are different timescales. Also notice the budget around the loop. Sampling one hundred answers, running tools, calling human reviewers, and retraining a model all consume different resources and create different risks. This loop is deliberately broad. Not every method in CS329A uses every stage, and Stanford does not present this exact diagram as the single canonical architecture. Its purpose is diagnostic. If someone says an agent improved, locate the change in the loop. Did generation become more diverse? Did planning allocate compute better? Did a verifier become more accurate? Did the system merely retry, or did something durable change? The rest of this deck examines the loop from left to right, then asks how to evaluate the whole system.
