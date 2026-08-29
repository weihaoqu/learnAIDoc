# Engineering Agent Improvement Loops

## Teaching thesis

Do not teach students to revise until a model says 95. Teach them to design a bounded agent feedback loop that revises until externally checkable criteria pass, or hands the task to a human when evidence or authority runs out.

## Learning outcomes

Students will be able to:

1. Distinguish a self-refinement prompt from an agent improvement system.
2. Decide whether a task is suitable using specification, verification, repairability, and boundedness.
3. Design a contract-attempt-verify-diagnose-revise-stop-handoff loop.
4. Match verifiers to likely defects.
5. Compare single-pass, self-scored, and evidence-verified workflows.
6. Explain why improvement in presentation is not proof of correctness.

## Research basis

- Self-Refine: same-model feedback and iterative revision can improve some preference and constrained-generation tasks, but reasoning gains were small and external feedback helped more.
- Reflexion: textual lessons based on task feedback can persist across later trials through memory.
- CRITIC: external tools can provide stronger correction signals for factual and computational work.
- Large Language Models Cannot Self-Correct Reasoning Yet: intrinsic reconsideration without external feedback can fail or degrade reasoning.

Primary links:

- https://arxiv.org/abs/2303.17651
- https://arxiv.org/abs/2303.11366
- https://arxiv.org/abs/2305.11738
- https://arxiv.org/abs/2310.01798

## Core workflow

```text
contract -> attempt -> verify -> diagnose -> revise
              ^                              |
              |--------- bounded retry ------|
                            |
                       stop / handoff
```

## Four-question suitability gate

1. Can the desired result be specified?
2. Can quality be checked independently?
3. Can detected defects be repaired safely?
4. Can cost, data exposure, attempts, and authority be bounded?

## Worked case

Create eight slides from one lecture. Require source fidelity, coherent flow, citations, readable text, and no overflow. Verify with a source-to-slide map, link checks, dimensions, and rendered-slide inspection. Allow two revision cycles. The student approves the final educational interpretation.

## Comparative lab

Run the same prepared task under three conditions:

- A: single-pass answer
- B: self-score and revise until 95
- C: evidence-verified bounded agent loop

Compare correctness, rubric coverage, unsupported claims, introduced defects, iterations, time/cost, and human preference. Do not assume Condition C must win.

## Class timing

- Slides 1-10: 28 minutes
- Slide 11 comparative lab: 22 minutes
- Slide 12 assessment and reflection: 7 minutes
- Slide 13 closing checklist: 3 minutes

## Accessibility

- Minimum core body text target: 22 px at 1600x900.
- High-contrast dark text on light backgrounds.
- Meaning is not encoded by color alone; labels accompany every status and path.
- Speaker notes describe each key diagram.
- PDF and PPTX accompany the slide images.

## Evidence boundary

The deck is an independent teaching synthesis. Paper findings are labeled as reported evidence. Classroom workflows, timing, suitability gates, and verifier ladder are teaching synthesis rather than claims taken directly from one paper.
