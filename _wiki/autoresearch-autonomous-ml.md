---
title: "Autoresearch: 100 Autonomous ML Experiments Overnight"
date: 2026-03-12
category: AI for Research
redirect_from:
  - "/wiki/ai research/autoresearch-autonomous-ml/"
tags: [autoresearch, machine-learning, claude-code, karpathy, automation, research, optimization, skills]
related: ["Claude Code /loop: Scheduled Prompts on Autopilot", "How Anthropic Teams Use Claude Code", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era", "alphaXiv MCP — Semantic ArXiv Search Directly in Claude Code", "AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record", "Awesome-Auto-Research-Tools — A Curated Map of Automated-Science Projects", "Beyond /goal — The Orchestrator + Headless Pattern for Long-Running Claude Sessions"]
icon: "🔬"
image: "/assets/images/autoresearch.png"
---

Autoresearch lets an AI agent run autonomous ML experiments while you sleep. You write instructions in a `program.md` file, and the agent modifies training code, runs 5-minute experiments, measures results, and keeps only the improvements — automatically. Expect ~12 experiments/hour, or ~100 overnight.

*Sources: [karpathy/autoresearch on GitHub](https://github.com/karpathy/autoresearch) | [uditgoenka/autoresearch (general-purpose fork)](https://github.com/uditgoenka/autoresearch) | [autoresearch skill on LobeHub](https://lobehub.com/skills/jonmumm-skills-autoresearch) | [Deep dive by Ken Huang](https://kenhuangus.substack.com/p/exploring-andrej-karpathys-autoresearch) | [Ole Lehmann: AutoResearch for Skills](https://x.com/itsolelehmann/status/2033919415771713715)*

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│ program.md  │────▶│  AI Agent    │────▶│  train.py    │
│ (you write) │     │ (Claude/     │     │ (agent edits)│
│             │     │  Codex)      │     │              │
└─────────────┘     └──────┬───────┘     └──────┬───────┘
                           │                     │
                           │              ┌──────▼───────┐
                           │              │  5-min train  │
                           │              │  + validate   │
                           │              └──────┬───────┘
                           │                     │
                    ┌──────▼───────┐      ┌──────▼───────┐
                    │  Better?     │◀─────│  val_bpb     │
                    │  Yes → commit│      │  (lower=     │
                    │  No → revert │      │   better)    │
                    └──────────────┘      └──────────────┘
                           │
                    Loop repeats all night
```

The key insight: **you don't touch Python.** You "program" the agent by writing `program.md` — high-level instructions about what to explore. The agent does all the code modifications.

## The Three Files

| File | Who edits | Purpose |
|------|-----------|---------|
| `program.md` | **You** | Research direction, strategy, constraints for the agent |
| `train.py` | **Agent** | GPT model, optimizer, hyperparameters — everything is fair game |
| `prepare.py` | **Nobody** | Fixed constants, dataset prep, tokenizer — don't touch |

## Setup

### Requirements
- Single NVIDIA GPU (tested on H100) or Apple Silicon Mac (via MLX fork)
- Python 3.10+
- `uv` package manager

### Installation

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Clone the repo
git clone https://github.com/karpathy/autoresearch.git
cd autoresearch

# Install dependencies
uv sync

# Prepare data and tokenizer (~2 minutes, one-time)
uv run prepare.py

# Test with a single training run (~5 minutes)
uv run train.py
```

### Kick Off Experiments

Open Claude Code in the repo directory and say:

```
> Have a look at program.md and let's kick off a new experiment!
```

Claude reads your instructions, modifies `train.py`, runs training, evaluates the result, and loops.

## Writing program.md

This is where you guide the agent. Think of it as programming in English instead of Python:

```markdown
# Research Program

## Current Goal
Explore whether a mixture-of-experts architecture improves
val_bpb on our tiny language model.

## Constraints
- Keep total parameter count under 50M
- Each experiment must complete in the 5-minute window
- Don't change the tokenizer or dataset

## Strategy
1. Start with a simple 2-expert MoE layer replacing the FFN
2. If that helps, try 4 experts with top-2 routing
3. Experiment with expert capacity factor

## What NOT to do
- Don't increase context length (won't fit in 5 minutes)
- Don't try distributed training
```

## Real-World Use Cases

### Hyperparameter Search
Let the agent systematically explore learning rates, batch sizes, warmup schedules, and weight decay overnight.

### Architecture Prototyping
Test variations on attention mechanisms, FFN designs, normalization strategies, or positional encodings — all within 5-minute experiments.

### Overnight Exploration
Go to sleep with a research question, wake up with 100 data points and a clear winner committed to git.

### Reproducible Research
Every experiment is a git commit with the exact code that produced it. Failures are reverted. Your git log becomes your experiment log.

## Important Things to Know

### Fixed 5-Minute Budget
Every experiment runs for exactly 5 minutes regardless of hardware. This ensures fair comparison across architectural changes and enables ~12 experiments/hour.

### Git Is Your Lab Notebook
- **Improvement** → `git commit` (change is kept)
- **No improvement** → `git revert` (change is discarded)
- Your git history becomes a clean record of what worked

### You Program in Markdown, Not Python
The whole point is that you stay at the strategy level. Let the agent handle implementation details. If you find yourself editing `train.py` directly, you're doing it wrong.

### Works with Claude Code
The original project was designed for any LLM agent, but Claude Code is a natural fit — just open a session in the repo, point Claude to `program.md`, and let it run. Combine with `/loop` for extra automation.

### Community Forks
- **Apple Silicon (MLX):** [autoresearch-mlx](https://github.com/trevin-creator/autoresearch-mlx) — no PyTorch required
- **Multi-agent:** [autoautoresearch](https://github.com/ArmanJR/autoautoresearch) — parallel agent swarms

## Beyond ML: AutoResearch for General Software Engineering

Karpathy's AutoResearch was designed for ML experiments, but the core loop — **modify → verify → keep/discard → repeat** — works for anything that can be scored. [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) adapts this pattern to general software engineering tasks in Claude Code.

### The General-Purpose Loop

```
Define scoring criteria (3-6 yes/no rubric items)
     ↓
Agent makes a small change
     ↓
Agent tests the result against criteria
     ↓
Better? → keep. Worse? → discard.
     ↓
Repeat forever. Go to sleep.
```

The key: **you only need to define a scoring rubric**. Not code, not architecture — just a checklist of yes/no criteria. Say "run autoresearch on my landing page skill" and it runs the whole process.

### Real-World Results

| Use Case | Before | After | Rounds |
|---|---|---|---|
| [Page load speed](https://x.com/itsolelehmann/status/2033919415771713715) | 1,100ms | 67ms | 67 |
| Landing page copy accuracy | 56% | 92% | auto |
| Test coverage | 70% | 95% | auto |
| Bundle size | bloated | <200KB | auto |
| Lighthouse score | low | 90+ | auto |

### Applicable Scenarios

- **Performance optimization** — Lighthouse scores, page load times, Core Web Vitals
- **Bundle size reduction** — keep restructuring code until frontend bundle is under target
- **Code quality** — raise unit test coverage from 70% to 95%
- **CI/CD security** — add security scanning to pipeline, iterate until no vulnerabilities
- **Content optimization** — cold emails, newsletter headers, landing page copy
- **Claude Code Skills** — auto-optimize any skill with measurable scoring criteria

### How to Apply to Claude Skills

One practitioner turned this into a reusable pattern ([ref](https://x.com/itsolelehmann/status/2033919415771713715)):

1. Put the AutoResearch logic into a Claude Code skill
2. Point it at any other skill you want to optimize
3. Define 3-6 yes/no scoring criteria, e.g.:
   - Does the headline contain specific numbers or results?
   - Is the copy free of marketing buzzwords ("revolutionary", "synergy")?
   - Does the CTA directly address a pain point?
   - Is the opening sentence under 15 words?
4. Say: `run autoresearch on my landing page skill`
5. The agent loops: modify skill → test against criteria → keep/discard

The changelog becomes the most valuable output — it records what works and what doesn't for that specific skill. When better models come out, hand the changelog to the new agent and it continues optimizing from where the last one left off.

## How LearnAI Team Could Use This

This pattern teaches students a fundamental concept: **anything with a measurable outcome can be optimized automatically**. The human's job is defining what "good" means (the rubric), not doing the optimization manually. This connects directly to:

- [Formal verification](/learnAIDoc/wiki/claude-code-tips-engineering/) — defining correctness criteria, then automating verification
- [TDD](/learnAIDoc/wiki/karpathy-end-of-coding/) — tests as automated success criteria
- The [Claude Certified Architect](/learnAIDoc/wiki/claude-certified-architect/) exam's emphasis on verification loops

## Who Made This

Open-sourced in March 2026 by **Andrej Karpathy** (former Tesla AI Director and OpenAI co-founder). The project's vision: frontier AI research will increasingly be conducted by "autonomous swarms of AI agents" rather than individual human researchers.
