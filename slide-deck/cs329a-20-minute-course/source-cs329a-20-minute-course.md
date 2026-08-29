# Stanford CS329A: Self-Improving AI Agents in 20 Minutes

Primary course source: [Stanford CS329A, Self-Improving AI Agents](https://cs329a.stanford.edu/)

Official public lecture playlist: [Stanford Online CS329A](https://www.youtube.com/playlist?list=PLangBM27OtEA)

This deck is an independent educational companion. It compresses nine public lectures into one teaching model; it is not an official Stanford summary and does not claim that the course presents one canonical agent architecture.

## Teaching Thesis

A self-improving agent is not merely a stronger model. It is a system that can generate alternatives, spend compute on search and planning, act in an environment, observe feedback, verify progress, and preserve selected improvements.

```text
                         fixed model                         updated system
                            |                                     ^
                            v                                     |
task -> generate -> search / plan -> act -> observe -> verify -> learn
          |             |                 |          |          |
          |             |                 |          |          +-- training, memory,
          |             |                 |          |              tools, artifacts
          |             |                 +-- environment and tool feedback
          |             +-- inference-time compute and workflow structure
          +-- model capability and candidate diversity
```

This loop is teaching synthesis. It organizes the recurring ideas across the public lecture sequence but should not be attributed to Stanford as a quoted framework.

## Four Questions

1. **Generation:** Where do useful alternatives come from?
2. **Verification:** What evidence distinguishes progress from a plausible mistake?
3. **Persistence:** What survives after the current run?
4. **Budget:** Where should the system spend compute, time, human attention, and risk?

## Ten-Slide Narrative

1. Establish the twenty-minute promise.
2. Separate model capability from system improvement.
3. Introduce the bounded teaching loop.
4. Explain test-time search, sampling, and selection.
5. Treat verification as imperfect evidence.
6. Show how tools and planning create trajectories and dependencies.
7. Contrast within-run correction with durable learning.
8. Explain why long-horizon tasks expose evaluation limits.
9. Map current research frontiers and unresolved boundaries.
10. Apply the four-question checklist to an education or research agent.

## Source Map

| Deck slide | Primary detailed lesson |
|---|---|
| 1-3 | [Part 1: Course Overview](/learnAIDoc/wiki/cs329a-part-01-course-overview/) |
| 4 | [Part 2: Test-Time Compute Scaling](/learnAIDoc/wiki/cs329a-part-02-test-time-compute-scaling/) |
| 5 | [Part 3: Robust Verification](/learnAIDoc/wiki/cs329a-part-03-robust-verification/) and [Part 4: Feedback with Tools and Code](/learnAIDoc/wiki/cs329a-part-04-learning-feedback-tools-code/) |
| 6 | [Part 4](/learnAIDoc/wiki/cs329a-part-04-learning-feedback-tools-code/) and [Part 5: Planning](/learnAIDoc/wiki/cs329a-part-05-planning-multistep-reasoning/) |
| 7 | [Part 6: Train-Time Scaling and RL](/learnAIDoc/wiki/cs329a-part-06-train-time-scaling-rl/) |
| 8 | [Part 7: Deep Research](/learnAIDoc/wiki/cs329a-part-07-self-improvement-deep-research/) and [Part 8: Agentic Evaluation](/learnAIDoc/wiki/cs329a-part-08-agentic-evaluations-long-horizon/) |
| 9 | [Part 9: Future Research Areas](/learnAIDoc/wiki/cs329a-part-09-future-research-areas/) |
| 10 | Whole-series teaching synthesis |

## Boundary Conditions

- More attempts do not guarantee a better returned answer.
- Feedback is not ground truth.
- Correction is not necessarily learning.
- More agent autonomy increases the need for authorization, observability, and recovery.
- Component improvement does not prove system-level recursive self-improvement.
