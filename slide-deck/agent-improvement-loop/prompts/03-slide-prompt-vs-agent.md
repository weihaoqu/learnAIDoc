# Slide 3: A Prompt Is Not Yet an Agent

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- Evidence map: Teaching synthesis; state depends on implementation
- This is an independent teaching companion, not a reproduction of a paper figure.

## On-slide content
- Stage: system distinction
- Headline: A Prompt Is Not Yet an Agent
- Subtitle: An improvement system adds state, tools, feedback, control, and handoff.
- Class time: 2 min

## Teaching objective
Define the system properties that turn a request into a bounded agent loop.

## Accessibility description
One-shot prompt flow beside a multi-step agent system with optional task state. Labels repeat all color-coded meaning.

## Speaker notes (2 min)
A prompt requests behavior within an interaction. An agent system may preserve task or session state across steps through files, traces, orchestration, tool context, or memory. It can take actions, observe results, and follow software-owned stopping and handoff rules. State is not automatic, and persistence across sessions is a separate design choice. The benefit is not autonomy by itself. The benefit is that the system can collect better evidence, connect feedback to a specific defect, and control what happens next.
