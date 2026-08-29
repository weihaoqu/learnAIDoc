# Slide 4: More Attempts Help Only When Selection Works

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity. No copied Stanford frames, figures, logos, or paper graphics.

## Style
Aged cream academic briefing, subtle engineering grid, near-black type, cobalt generation, teal verification, green persistence, warm-brown budget, maroon constraints, red risks, no gradients.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- This deck is an independent teaching companion.
- Evidence map: CS329A Part 2: Test-Time Compute Scaling

## On-slide content
- Stage: test-time compute
- Headline: More Attempts Help Only When Selection Works
- Subtitle: Test-time compute expands candidate coverage; a verifier must still return the useful answer.
- Planned speaking time: 2:00

## Visual direction
Candidate fan-out feeding a verifier gate, with separate coverage and selected-answer outcomes.

## Teaching objective
Separate candidate coverage from returned-answer reliability.

## Speaker notes (2:00)
Test-time compute asks how a fixed model can spend more computation on one problem. The simplest method is repeated sampling: generate several candidates instead of one. Search methods add structure by expanding, scoring, and revisiting partial solutions. This can improve coverage, meaning that at least one correct or useful candidate appears in the set. But the deployed system must still select and return that candidate. These are two different measurements. Pass-at-k asks whether success exists somewhere among k attempts. Returned-answer reliability asks whether the verifier or selection rule actually chooses it. Consider five proposed fixes for a program. One is correct, so coverage looks good. If the test suite misses an edge case and ranks a superficially clean but wrong patch first, the user still receives the wrong answer. More sampling has increased opportunity without guaranteeing reliability. Compute allocation also should depend on difficulty. Easy problems may need one attempt; hard problems may justify search, stronger verification, or human review. The practical lesson is to report generation and selection separately. When someone says that more inference compute improved performance, ask how candidates were generated, how they were selected, and whether the result survives changes in the verifier or task distribution.
