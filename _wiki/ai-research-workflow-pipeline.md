---
title: "AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record"
date: 2026-04-24
category: AI
tags: [research-workflow, claude-code, codex, feynman, autoresearch, peer-review, research-methodology, scheduled-agents]
related: ["AutoResearch: Autonomous ML Experiment Paradigm", "Feynman AI Research Agent", "Karpathy End of Coding", "Codex + Claude Code Research Tutorial"]
icon: "🔬"
image: "/assets/images/ai-research-workflow-pipeline.png"
---

A 7-stage pipeline for AI-assisted academic research that uses Claude, Codex, Feynman skills, autoresearch, and scheduled agents — each at the right moment. Distilled from a real research session where the JUDGE stage (hostile peer review) caught a fundamentally wrong research direction in 4 minutes, saving weeks of wasted work.

*Source: [Karpathy AutoResearch](https://weihaoqu.github.io/learnAIDoc/wiki/autoresearch-autonomous-ml/) | [Feynman AI Research Agent](https://weihaoqu.github.io/learnAIDoc/wiki/feynman-ai-research-agent/) | [Down Sensitivity in DP](https://differentialprivacy.org/down-sensitivity/)*

## The Pipeline

```
FORMULATE → FIND → JUDGE → VERIFY → EXECUTE → MONITOR → RECORD
```

Most researchers go Find → Execute. The critical insight: **never skip JUDGE**. Running a hostile peer review before committing to a direction is the single highest-ROI step in the entire workflow.

| Stage | Purpose | Tool | Time |
|---|---|---|---|
| **FORMULATE** | Crisp hypothesis + falsification criteria | Thinking | 15 min |
| **FIND** | Survey landscape | `/feynman:literature-review`, `/query-kb`, WebFetch | 30-60 min |
| **JUDGE** | Kill bad ideas | `/feynman:peer-review`, `/feynman:source-comparison` | 15 min |
| **VERIFY** | Independent second opinion | Codex rescue + non-LLM check | 10 min |
| **EXECUTE** | Do the work | Autoresearch, direct coding | Variable |
| **MONITOR** | Track progress | Scheduled agents, `/feynman:watch` | Ongoing |
| **RECORD** | Prevent context drift | Research state file | 10 min/stage |

## Stage 0: FORMULATE — Before Anything Else

Write four things before touching any tool:

1. **Hypothesis:** One sentence. "We want to prove X" or "We want to build Y."
2. **Success criteria:** What does "done" look like?
3. **Falsification criteria:** What would make you STOP or PIVOT?
4. **Cost of being wrong:** Hours? Days? Weeks?

The cost estimate gates how thorough later stages need to be. A 2-week wrong direction demands heavy JUDGE + VERIFY. A 2-hour experiment can skip straight to EXECUTE.

**Rule:** If you can't write the hypothesis in one sentence, you're not ready for Stage 1.

## Stage 1: FIND — What's Out There

Run 2-3 search agents in parallel to cover different angles:

```
Agent 1: /feynman:literature-review "topic keywords"
Agent 2: /feynman:deep-research "specific technical question"
Agent 3: WebFetch on known reference URLs
```

Always check your own knowledge base first (`/query-kb`) before searching externally. Don't over-research — 30-60 minutes is enough to have a plan worth critiquing.

## Stage 2: JUDGE — The Critical Step

**This is where the workflow earns its keep.** Run three review agents in parallel:

| Agent | Role | Prompt Pattern |
|---|---|---|
| **Reviewer #2** | Hostile peer review | "Critique this plan. Find reasons to reject." |
| **Tool Comparison** | Approach alternatives | "Compare approach A vs B vs C for this problem." |
| **Deep Dive** | Feasibility of hardest part | "Is the hardest component actually achievable?" |

**Rules:**
- **Mandatory** if cost of wrong direction > 1 day
- **Optional** for small, reversible tasks
- The peer review agent must be HOSTILE — polite reviews don't catch real problems

### What JUDGE Catches

In our FormalDP project, Reviewer #2 said:

> "You're verifying things that are trivially true by hand. Histogram sensitivity = 1 is a one-sentence observation. You're spending more effort convincing the solver than convincing a human."

Cost of this critique: 4 minutes. Savings: potentially weeks of encoding work on the wrong targets. The project completely pivoted based on this feedback.

## Stage 3: VERIFY — Independent Second Opinion

After revising based on JUDGE, get a second AI model to independently assess:

```
Codex rescue → "Review these three framings. Which do you endorse?"
```

**Improved consensus rule:** ~~"If both agree, proceed"~~ → **"If both agree AND at least one non-LLM check passes, proceed."**

Non-LLM checks include: proof sketch, counterexample search, baseline run, cited primary source. Two AI models agreeing reduces bias but doesn't eliminate correlated errors.

## Stage 4: EXECUTE — Now Start Building

Autoresearch works when you have:
- **Measurable output** (sat/unsat, accuracy, test pass/fail)
- **Modifiable input** (code, encodings, configs)
- **Clear objective** (improve metric)

The loop: `modify → measure → keep/discard`. ~12 experiments/hour.

**Critical rule:** Autoresearch is an EXECUTION tool, not an IDEA tool. It optimizes within a direction — it doesn't choose the direction. That's FORMULATE + JUDGE.

## Stage 5: MONITOR — Keep the Project Alive

| Scale | When | Setup |
|---|---|---|
| **Light** (default) | Most projects | 1 daily briefing agent |
| **Medium** | Active projects | + event-triggered workers |
| **Heavy** | Paper races, overnight experiments | 2-4 agents with different schedules |

Each agent must have a **verification requirement** — cross-reference findings, mark unverified claims. Don't create monitoring overhead that exceeds the value of monitoring.

## Stage 6: RECORD — Don't Lose Context

Maintain a research state file updated at each JUDGE or VERIFY stage:

```markdown
## Claims
| Claim | Evidence | Status |
|---|---|---|
| "X has sensitivity ≤ 2" | Proven (sat,47) | Verified |
| "POPL is feasible venue" | Codex rejected | Rejected |

## Rejected Alternatives
- Tried approach A, rejected because [reason]

## Next Falsification Step
- Run counterexample search on assumption Y
```

Distinguish "proven," "observed," and "guessed." Record rejected alternatives — future-you will wonder why you didn't try X.

## Workflow Profiles

### Theory-Heavy (proofs, formalizations)

```
FORMULATE → FIND → JUDGE(heavy) → VERIFY(heavy) → EXECUTE(light) → RECORD
```

Emphasize JUDGE. Key risk: weeks on a trivially true result. MONITOR is low cadence.

### Empirical-Heavy (ML experiments, benchmarks)

```
FORMULATE → FIND → EXPLORE(bounded) → JUDGE → VERIFY → EXECUTE(heavy) → MONITOR(heavy)
```

Add early EXPLORE (bounded autoresearch for baselines). Key risk: evaluation leakage.

### Engineering-Heavy (systems, tools)

```
FORMULATE → FIND(light) → JUDGE(light) → EXECUTE(heavy) → MONITOR(heavy) → RECORD
```

Compress FIND. Key risk: integration failures, not literature gaps.

## Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| Skip JUDGE, go to EXECUTE | Waste weeks on wrong target | Hostile review for high-cost decisions |
| "Both AIs agree = truth" | Correlated errors | Add non-LLM check |
| 4 agents for slow project | Alert fatigue | Scale monitoring to volatility |
| Autoresearch for ideation | Hill-climbing on bad metrics | Use for execution only |
| Never record rejections | Forget why you didn't try X | Update state file each stage |

## The Origin Story

This workflow was distilled from the FormalDP project — an attempt to formally verify differential privacy sensitivity properties using PCSAT/CHC solvers. The original plan targeted 5 "easy" properties (histogram, clipped sum sensitivity bounds). Three parallel review agents — peer review, tool comparison, and encoding research — ran in the background for ~15 minutes total. The peer review agent's critique ("you're verifying trivially true things") completely reframed the project from "verify easy lemmas" to "introduce a new CHC encoding pattern for the delete metric." Codex independently confirmed this pivot and proposed an additional research framing (proof-producing certification) that neither Claude nor the human had considered.

Total time spent on JUDGE + VERIFY: ~30 minutes. Value: avoided weeks pursuing the wrong research direction, and discovered a stronger contribution.
