---
title: "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era"
date: 2026-03-22
category: Industry & Trends
redirect_from:
  - "/wiki/ai research/karpathy-end-of-coding/"
tags: [karpathy, coding-agents, autoresearch, microgpt, education, ai-education, skill-issue, ai-workflow, no-priors]
related: ["Autoresearch: 100 Autonomous ML Experiments Overnight", "Gstack — Garry Tan's AI Software Factory for Claude Code", "Claude Code Tips & Context Engineering — From 45 Tips to Six-Layer Architecture", "TensorTonic — Learn Machine Learning by Implementing 200+ Algorithms from Scratch", "Frustration Shifts Upward — How AI Coding Changes What's Hard"]
icon: "🧪"
image: "/assets/images/karpathy-end-of-coding.png"
---

Andrej Karpathy's [No Priors podcast](https://www.youtube.com/watch?v=kwSVtQ7dziU) appearance (March 2026) is a landmark conversation about the phase shift in software engineering. Since December 2024, Karpathy hasn't typed a line of code — he directs agents for 16 hours a day. His core claim: when agents fail, it's a **skill issue**, not a capability issue. The models are good enough. You just haven't learned to use them yet.

*Source: [No Priors Podcast - YouTube](https://www.youtube.com/watch?v=kwSVtQ7dziU) | [NextBigFuture Summary](https://www.nextbigfuture.com/2026/03/andrej-karpathy-on-code-agents-autoresearch-and-the-self-improvement-loopy-era-of-ai.html) | [Glen Rhodes Analysis](https://glenrhodes.com/andrej-karpathys-no-priors-podcast-take-on-the-phase-shift-in-engineering-and-second-order-effects-of-coding-agents/) | [Fortune: Why Everyone Is Talking About AutoResearch](https://fortune.com/2026/03/17/andrej-karpathy-loop-autonomous-ai-agents-future/)*

## "Everything Is Skill Issue"

The most provocative claim in the interview: when coding agents don't work, it's almost always the human's fault.

> "I think everything, even if it doesn't work, to a large extent you feel like it's skill issue. It's not that the capability is not there. It's that you just haven't found a way to string it together."

What Karpathy means by "skill":
- Writing better instructions in CLAUDE.md / agents config
- Setting up proper memory and context management
- Parallelizing agents across repos and branches
- Working in **macro actions** (features, not lines of code)
- Reviewing agent output efficiently

This isn't just Karpathy's personal experience. He references [Peter Steinberg's setup](https://x.com/karpathy/status/2004607146781278521) — multiple Codex agents on screen, each taking ~20 minutes on a task, the human rotating between them giving work and reviewing output.

## The New Workflow: Macro Actions

```
OLD: Write code line by line → test → debug → commit
NEW: Delegate feature to Agent 1
     Delegate unrelated feature to Agent 2
     Agent 3 does research
     Agent 4 writes a plan
     You review their work → approve/redirect
     Repeat in 20-minute cycles
```

Key metrics shifted:
- **Before:** GPU utilization (are my training runs using all the compute?)
- **Now:** Token throughput (am I maximizing my subscription across all agents?)

Karpathy compares it to his PhD days feeling nervous when GPUs were idle — now he feels nervous when he has unused API credits.

## AutoResearch: AI Agents Running Science

[AutoResearch](https://github.com/karpathy/autoresearch) is Karpathy's project where coding agents autonomously run ML experiments:

- **700 experiments in 2 days** on a single GPU
- **20 training optimizations discovered** automatically
- Agents edit `train.py`, try ideas (including novel architecture tweaks like reordering QK Norm and RoPE), learn from failures, continue
- No human in the loop during experiment cycles

The bigger vision: a **SETI-at-Home for AI research** — distributed human judgment and compute applied to problems no single lab can fully explore. Agents as research collaborators, not just code writers.

See also: [Autoresearch wiki entry](/learnAIDoc/wiki/ai/autoresearch-autonomous-ml/) for technical setup details.

## MicroGPT: 243 Lines of Pure Python

[MicroGPT](http://karpathy.github.io/2026/02/12/microgpt/) (February 2026) — a complete GPT trained from scratch in 243 lines of pure Python using only basic math. No PyTorch.

Why it matters:
- **Successor to [nanoGPT](https://github.com/karpathy/nanoGPT)** and [llm.c](https://github.com/karpathy/llm.c)
- Designed so both **humans and future AI agents** can understand the algorithm
- Demystifies what's actually happening inside a transformer
- Educational tool for anyone learning ML from first principles

## The Loopy Era: Self-Improving Agents

Karpathy's term for the current period: the **"loopy era"** — where agents run in continuous improvement loops:

1. Agent designs an experiment
2. Agent runs the experiment
3. Agent analyzes results
4. Agent designs better experiment based on what it learned
5. Repeat without human intervention

This is recursive self-improvement at the research level — not the existential risk sci-fi version, but the practical "agents getting better at training models" version.

## On Education in the Agent Era

Karpathy's perspective directly relevant to AI education:

| Old Model | New Model |
|---|---|
| Learn to write code | Learn to direct agents effectively |
| Typing speed matters | Instruction quality matters |
| Individual contributor | Agent orchestrator |
| GPU utilization focus | Token throughput focus |
| Manual coding skills | "Macro action" thinking |

Key quotes:
- Manual coding skills are **"atrophying"** — but understanding still matters as a multiplier
- Technical expertise is still the **difference between 1x and 10x** with agents
- The contribution humans make is increasingly **"sparse and rare"** — but each contribution matters more
- MicroGPT exists specifically so people can **understand the algorithm** even as they stop writing it by hand

## Implications for AI Education

Karpathy's interview is arguably the strongest case yet for rethinking how we teach computer science. If the person who built Tesla's Autopilot and co-founded OpenAI says he hasn't typed code since December 2024, the curriculum has to change.

### What CS Education Gets Wrong Now

Most CS programs still optimize for **code production** — syntax, data structures, algorithms implemented by hand. These remain valuable as mental models, but the daily work of a software engineer has shifted to **agent orchestration**. We're training students for a job that already looks different from what we're teaching.

### What Should Change

| Current Curriculum | What Karpathy's Era Demands |
|---|---|
| Write a sorting algorithm by hand | Understand sorting well enough to verify an agent's implementation |
| Debug line by line in a debugger | Review agent-generated code for correctness and security |
| One project, one person, one repo | Orchestrate 5-10 parallel agent tasks across branches |
| Learn one language deeply | Write effective instructions in natural language (CLAUDE.md, prompts) |
| Submit code as homework | Submit working features with tests, documentation, and clean PRs |
| Final exam tests memorization | Evaluate ability to decompose problems into agent-sized tasks |

### Concrete Course Module Ideas

1. **Agent Orchestration Lab** — Students run 3-5 parallel Claude Code sessions on a multi-feature project. Graded on output quality, not hours spent typing. Teaches macro-action thinking and review skills.

2. **AutoResearch Project** — Students use [AutoResearch](https://github.com/karpathy/autoresearch) or similar tools to run autonomous experiments on a small ML problem. Teaches scientific method + agent supervision. A single student with a single GPU can run 700 experiments in a weekend.

3. **"Skill Issue" Workshop** — When an agent fails, students must diagnose why: bad instructions? wrong context? missing memory? This teaches the debugging-the-human-AI-interface skill that Karpathy identifies as the bottleneck.

4. **MicroGPT Deep Dive** — Use [MicroGPT](http://karpathy.github.io/2026/02/12/microgpt/) (243 lines, no PyTorch) as a teaching tool. Students read every line, understand the math, then use agents to extend it. Proves that understanding still matters even when you stop writing code by hand.

5. **Code Review as Core Skill** — Instead of writing code from scratch, students review agent-generated PRs. Catches bugs, security issues, architectural problems. This is the actual job now.

### The "Sparse and Rare" Contribution Model

Karpathy says human contributions to code are becoming "sparse and rare" — but each contribution matters more. This maps to a shift in what we assess:

- **Old:** Can the student produce correct code? (quantity)
- **New:** Can the student make the right decision at the right moment? (judgment)

The student who understands architecture well enough to catch an agent's wrong abstraction is more valuable than the student who can implement a binary tree from memory. Both skills matter, but the weight has shifted.

### Connection to LAI Research

This directly supports the LAI thesis: AI education should teach students to **learn with AI**, not just use it as a tool. Karpathy's "skill issue" framing validates this — the gap between effective and ineffective AI users is exactly the kind of educational intervention LAI can measure and improve.

Key research questions this raises:
- How do we assess "agent orchestration skill" in a course setting?
- Does deep algorithmic understanding (MicroGPT-style) improve agent orchestration effectiveness?
- What's the learning curve for "macro action" thinking — and can it be taught faster?
- How does parallel agent management correlate with existing problem decomposition skills?

## Why This Matters for Students

This podcast is essential viewing for anyone studying CS or AI. Here's what students should take away:

**1. The skill gap is real and learnable.** Karpathy — one of the best ML engineers alive — says he's still learning to use agents effectively. Students starting now aren't behind; they're learning the right skills at the right time.

**2. Understanding > typing.** MicroGPT proves that Karpathy still values deep understanding of algorithms, even as he stops writing them manually. Students should learn fundamentals (data structures, algorithms, architecture) because that knowledge is what makes agent orchestration effective.

**3. The new engineering is orchestration.** Running 10 parallel agent sessions, writing good CLAUDE.md files, reviewing agent output, designing macro actions — these are the new engineering skills. Courses should teach this explicitly.

**4. Research is democratizing.** AutoResearch shows that a single person with a single GPU can run 700 experiments in 2 days. Students can do real ML research without massive compute budgets.

**5. "Skill issue" is empowering.** If the models are capable enough and the bottleneck is human skill, then getting better actually works. Every improvement in how you use agents directly translates to output.

## Further Reading

- [Full Podcast on YouTube](https://www.youtube.com/watch?v=kwSVtQ7dziU)
- [AutoResearch GitHub](https://github.com/karpathy/autoresearch)
- [MicroGPT Blog Post](http://karpathy.github.io/2026/02/12/microgpt/)
- [Podcast Transcript](https://podscripts.co/podcasts/no-priors-artificial-intelligence-technology-startups/andrej-karpathy-on-code-agents-autoresearch-and-the-loopy-era-of-ai)
- [Karpathy's "I've never felt this much behind" post](https://x.com/karpathy/status/2004607146781278521)
- [Blockchain News: 10 Key Insights](https://blockchain.news/ainews/karpathy-on-coding-agents-autoresearch-and-open-vs-closed-models-10-key-insights-and-2026-ai-market-analysis)

## How LearnAI Team Could Use This

- Add agent orchestration labs where students manage multiple coding agents across branches.
- Use AutoResearch-style assignments to teach experiment design, measurement, and review.
- Teach prompt, memory, and CLAUDE.md design as explicit engineering skills.
- Assess students on reviewing agent-generated PRs, not only writing code manually.

## Real-World Use Cases

1. Software teams use multiple coding agents to implement, test, and document features in parallel.
2. ML researchers run autonomous experiment loops to search for training improvements.
3. CS instructors redesign assignments around agent supervision and code review.
4. Students use MicroGPT-style examples to understand model internals before extending them with agents.
