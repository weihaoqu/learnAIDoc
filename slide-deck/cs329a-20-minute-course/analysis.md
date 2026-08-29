# Deck Analysis

## Topic

Stanford CS329A, Self-Improving AI Agents, compressed into a coherent 20-minute teaching overview.

## Audience

University educators and technically curious learners who understand large language models but may not know reinforcement learning or agent evaluation in depth.

## Core Message

An agent improves only when generation, action, feedback, verification, persistence, and resource allocation work as a trustworthy system.

## Supporting Ideas

1. More inference compute improves coverage only when selection can identify useful candidates.
2. Feedback is evidence under a specification, not automatic ground truth.
3. Tools and planning turn answers into trajectories whose dependencies and failure modes matter.
4. Correction within a run is different from learning that persists across runs.
5. Long-horizon evaluation must measure outcome quality, process reliability, recovery, and cost.

## Audience Decision

After the deck, the learner should be able to inspect an agent proposal using four questions:

- What generates useful alternatives?
- What verifies progress?
- What persists?
- Where is the budget spent?

## Visual Opportunities

- One bounded improvement loop for the complete course
- Side-by-side comparison of a model call and an improving agent system
- Candidate generation and verifier selection funnel
- False acceptance and false rejection using a code-test example
- Task dependency graph with a critical path
- Within-run correction versus across-run learning
- Long-horizon evaluation dashboard
- Four-question design checklist

## Confirmed Production Choices

- Style: restrained academic and technical briefing, consistent with the detailed CS329A decks
- Audience: intermediate learners and university educators
- Language: English
- Slide count: 10
- Duration: exactly 20 minutes by planned speaker-note timing
- Outline: approved by Q on 2026-08-29
- Prompt review: skipped for speed after outline approval
- Claim calibration: every slide identifies teaching synthesis or an open research question; lecture evidence is named separately in its source map
