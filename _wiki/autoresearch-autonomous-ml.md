---
title: "Autoresearch: 100 Autonomous ML Experiments Overnight"
date: 2026-03-12
category: AI
tags: [autoresearch, machine-learning, claude-code, karpathy, automation, research]
related: ["Claude Code /loop: Scheduled Prompts on Autopilot", "How Anthropic Teams Use Claude Code"]
icon: "🔬"
image: "/assets/images/autoresearch.png"
---

Autoresearch lets an AI agent run autonomous ML experiments while you sleep. You write instructions in a `program.md` file, and the agent modifies training code, runs 5-minute experiments, measures results, and keeps only the improvements — automatically. Expect ~12 experiments/hour, or ~100 overnight.

*Sources: [karpathy/autoresearch on GitHub](https://github.com/karpathy/autoresearch) | [autoresearch skill on LobeHub](https://lobehub.com/skills/jonmumm-skills-autoresearch) | [Deep dive by Ken Huang](https://kenhuangus.substack.com/p/exploring-andrej-karpathys-autoresearch)*

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

## Use Cases

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

## Who Made This

Open-sourced in March 2026 by **Andrej Karpathy** (former Tesla AI Director and OpenAI co-founder). The project's vision: frontier AI research will increasingly be conducted by "autonomous swarms of AI agents" rather than individual human researchers.
