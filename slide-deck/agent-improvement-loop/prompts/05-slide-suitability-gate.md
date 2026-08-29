# Slide 5: Use the Four-Question Gate

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- Evidence map: Independent teaching framework
- This is an independent teaching companion, not a reproduction of a paper figure.

## On-slide content
- Stage: design decision
- Headline: Use the Four-Question Gate
- Subtitle: Specification, verification, repairability, and boundedness come before iteration.
- Class time: 3 min

## Teaching objective
Give students a preflight decision for whether an agent loop is appropriate.

## Accessibility description
Four labeled gates lead either to a bounded loop or human-led assistance. Labels repeat all color-coded meaning.

## Speaker notes (3 min)
Before building the loop, ask four questions. Can the desired result be specified? Can quality be checked independently of the draft's confidence? Can a detected defect be repaired safely? Can attempts, cost, data exposure, and authority be bounded? If specification or verification is weak, the agent may assist exploration but should not certify completion. If repairability or boundedness is weak, narrow the task and keep a person in control. This gate prevents us from treating every difficult problem as a request for more autonomous retries.
