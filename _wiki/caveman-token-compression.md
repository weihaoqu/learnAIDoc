---
title: "Caveman — Token Compression for AI Coding Agents"
date: 2026-04-26
category: Tools
tags: [token-optimization, claude-code, codex, cursor, prompt-compression, cost-saving, skills]
related: ["Claude Code Token Costs: The Hidden Tax and How rtk Cuts It by 80%", "Claude Code Skills: Resources & Repos", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure"]
icon: "🪨"
image: "/assets/images/caveman-token-compression.png"
---

Caveman is a skill/plugin that makes AI coding agents talk like a caveman — cutting 65% of output tokens on average (range: 22-87% by task) while maintaining technical accuracy. It strips articles, filler words, and pleasantries from agent responses without touching code generation, tool calls, or internal reasoning. With ~46.8k GitHub stars, it's become one of the most popular Claude Code skills in the ecosystem.

*Source: [GitHub - JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | [Brevity Constraints Reverse Performance Hierarchies in Language Models](https://arxiv.org/abs/2604.00025) | [Caveman Tutorial](https://www.mayhemcode.com/2026/04/caveman-claude-code-how-to-save-tokens.html)*

## What It Does

Caveman targets the "conversational fluff" that AI agents produce — the phrases that burn tokens but add zero value:

```
Before: "The reason your component re-renders is because
         you're creating a new object reference each render cycle..."

After:  "Inline obj prop → new ref → re-render. useMemo."
```

Three things it strips first:
1. **Articles** — a, an, the
2. **Filler words** — just, basically, really, simply
3. **Pleasantries** — "Sure!", "I'd be happy to", "Let me explain"

## Six Compression Modes

Caveman offers three base levels, each with a Wenyan (文言文) variant that applies classical Chinese information density as a compression template:

| Mode | Style | Use Case |
|------|-------|----------|
| **Lite** | Remove fluff, keep grammar | Professional but concise |
| **Full** (default) | Fragments, caveman mode | Daily coding — max efficiency |
| **Ultra** | Telegram style, extreme compression | When every token counts |
| **Wenyan-Lite** | Classical Chinese density + grammar | Concise with literary compression |
| **Wenyan** | Classical Chinese density + fragments | Balanced density mode |
| **Wenyan-Ultra** | Maximum classical Chinese compression | Extreme density — "此非戏言，确实有效" |

## Real Benchmark Data

Tested across 10 diverse coding tasks with actual API token counts:

| Task | Normal Tokens | Caveman Tokens | Savings |
|------|--------------|----------------|---------|
| React re-render bug explanation | 1,180 | 159 | 87% |
| Auth middleware token expiry fix | 704 | 121 | 83% |
| PostgreSQL connection pool setup | 2,347 | 380 | 84% |
| **Average across 10 tasks** | **1,214** | **294** | **65%** |

Range: 22%–87% depending on task verbosity. Explanatory tasks save more; code-heavy tasks save less.

**Input compression** via the `caveman-compress` companion skill reduces CLAUDE.md and context files by ~46%, meaning every session starts with fewer tokens loaded.

## The Science: Brevity Actually Improves Accuracy

A March 2026 arxiv paper, *"Brevity Constraints Reverse Performance Hierarchies in Language Models,"* provides surprising evidence that Caveman's approach isn't just cheaper — it's better:

```
Study: 31 models × 1,485 benchmark problems

Key findings:
├── Larger models underperform smaller ones by up to 28.4pp on ~7.7% of problems
├── Root cause: "spontaneous scale-dependent verbosity"
│   └── Bigger models over-elaborate, hedge, and introduce reasoning errors
└── Applying brevity constraints: large model accuracy jumped +26pp
```

The mechanism: large models "think out loud" too much, adding unnecessary qualifications and tangential reasoning that introduces errors. Forcing conciseness cuts off this failure mode.

## Installation

Supports Claude Code, Codex, Gemini CLI, Cursor, Windsurf, Cline, Copilot, and more:

```bash
# Claude Code (two-step install)
claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman

# Codex / Cursor / Windsurf / Cline / Copilot
npx skills add JuliusBrussee/caveman

# Gemini CLI (auto-activates via context files)
# See repo README for platform-specific setup
```

Claude Code users get auto-activation via hooks — install once, active permanently.

## The Caveman Ecosystem

Caveman is part of a three-project toolkit:

| Project | Purpose | What It Compresses |
|---------|---------|-------------------|
| **caveman** | Output compression | What the agent *says* |
| **cavemem** | Cross-agent persistent memory | What the agent *remembers* (local SQLite + MCP) |
| **cavekit** | Spec-driven autonomous build loops | How the agent *works* |

Companion skills included:
- **caveman-commit** — Terse Conventional Commits (≤50 chars)
- **caveman-review** — One-line PR review comments with location + issue
- **caveman-compress** — Rewrites CLAUDE.md/context files to caveman-speak (~46% input savings)
- **caveman-help** — Quick reference for all modes and commands

## Who Should Use This

Caveman is for **experienced developers** who don't need explanations — they already know what `useMemo` does and just want the agent to get to the point. If you're learning a new codebase or framework, the verbose explanations are valuable and you should keep them.

The sweet spot: developers hitting Claude Code usage limits or paying for API tokens directly.

## How LearnAI Team Could Use This

- **Reduce costs** on long coding sessions — especially relevant for skill development and plugin building
- **Speed up agent responses** by ~3x — less text to generate means faster turnaround
- **Experiment with compression levels** — the eval harness in the repo lets you measure your own savings
- **Study the brevity-accuracy tradeoff** — the linked arxiv paper is highly relevant to prompt engineering research

## Real-World Use Cases

- **High-volume API users** — Teams running Claude Code across multiple developers can cut token bills significantly
- **CI/CD pipelines** — Automated coding agents in pipelines benefit from speed and cost reduction
- **Token-limited plans** — Users on Claude Pro/Max hitting daily limits stretch their quota further
- **Research** — The eval framework provides a template for measuring prompt engineering interventions
