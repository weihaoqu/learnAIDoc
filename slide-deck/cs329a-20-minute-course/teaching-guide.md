# CS329A Self-Improving AI Agents: 20-Minute Teaching Guide

## Learning Outcome

After twenty minutes, the learner should be able to inspect a self-improving-agent claim using four questions:

1. What generates useful alternatives?
2. What verifies progress?
3. What persists after the current run?
4. Where is the budget spent?

The complete delivery script is embedded in the PPTX speaker notes and preserved in `prompts/`.

## Timing

| Time | Slide | Teaching move |
|---:|---|---|
| `00:00-00:45` | 1. Self-Improving AI Agents in 20 Minutes | Establish the four-question promise. |
| `00:45-02:30` | 2. Model vs. System | Separate model capability from system improvement. |
| `02:30-05:00` | 3. Teaching Loop | Build the complete system map and two timescales. |
| `05:00-07:00` | 4. Test-Time Compute | Separate candidate coverage from answer selection. |
| `07:00-09:15` | 5. Verification | Use the code-test example to expose verifier blind spots. |
| `09:15-11:30` | 6. Tools and Planning | Move from one answer to a dependency-aware trajectory. |
| `11:30-13:45` | 7. Persistence | Contrast within-run correction with across-run learning. |
| `13:45-15:45` | 8. Long-Horizon Evaluation | Evaluate artifact, process, recovery, evidence, and cost. |
| `15:45-17:45` | 9. Research Frontier | Present diversity, meta-verification, curriculum, and efficiency as coupled open problems. |
| `17:45-20:00` | 10. Design Checklist | Transfer the framework to a student research assistant. |

Total planned duration: `20:00`.

## Three Required Distinctions

### 1. Model Capability vs. System Improvement

A model can become stronger without the surrounding workflow learning. An agent system can improve its workflow, memory, tools, or selection without changing model weights.

### 2. Coverage vs. Returned-Answer Reliability

Generating a correct candidate somewhere in a set is not the same as identifying and returning it.

### 3. Correction vs. Learning

```text
within-run correction: retry, revise, search, or backtrack
across-run learning: change memory, data, tools, policy, artifacts, or weights
```

## Two-Minute Transfer Exercise

Choose an education, research, or coding agent. Complete four sentences:

- It generates alternatives by ...
- It verifies progress using ... and this verifier may miss ...
- It preserves ... across runs, but must not preserve ...
- It spends compute, human attention, and risk on ...

Then write one improvement claim that a comparison could disprove.

## Source Calibration

- `TEACHING SYNTHESIS` is this companion's organizing abstraction; the source map names the detailed lecture evidence used on each slide.
- `OPEN RESEARCH QUESTION` identifies an unresolved direction rather than a demonstrated general capability.

Use the [course companion hub](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/) to open the nine detailed lessons, official videos, papers, homework, and longer teaching decks.
