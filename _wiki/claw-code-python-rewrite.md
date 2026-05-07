---
title: "Claw Code — Clean-Room Python Rewrite of Claude Code's Agent Harness"
date: 2026-03-31
category: Claude Code Workflows
redirect_from:
  - "/wiki/claude code/claw-code-python-rewrite/"
tags: [claude-code, harness-engineering, python, open-source, agents, reverse-engineering, oh-my-codex, rust]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Cheat Sheet & Everything-Claude-Code — Complete Reference Kit", "The Five Levels of Claude Code — From Prompting to Orchestration", "Claude Code Source Analysis — What Makes It Work & How to Actually Learn From It"]
icon: "🦞"
image: "/assets/images/claw-code-python-rewrite.png"
---

At 4 AM on March 31, 2026, the Claude Code source was exposed. Within hours, **Claw Code** emerged — a clean-room Python rewrite of Claude Code's agent harness architecture, built entirely through AI-assisted orchestration. It hit **50K GitHub stars in 2 hours**, making it the fastest repo in history to reach that milestone.

*Source: [GitHub — instructkr/claw-code](https://github.com/instructkr/claw-code) | [Wall Street Journal: "The Trillion Dollar Race to Automate Our Entire Lives"](https://lnkd.in/gs9td3qd) (March 21, 2026)*

## What Happened

The Claude Code source code was exposed publicly. Instead of just archiving the leaked code, developer **Sigrid Jin** ([@instructkr](https://github.com/instructkr)) — one of the most active Claude Code power users, having consumed **25 billion tokens** — chose to study the harness architecture and port the core patterns to Python from scratch.

The key distinction: **this is not a copy of proprietary source**. It's a clean-room reimplementation that captures the architectural patterns — tool wiring, agent orchestration, runtime context management — without copying Anthropic's code.

## How It Was Built

The entire rewrite was orchestrated using [oh-my-codex (OmX)](https://github.com/Yeachan-Heo/oh-my-codex), a workflow layer on top of OpenAI's Codex:

| OmX Mode | How It Was Used |
|----------|----------------|
| `$team` mode | Parallel code review and architectural feedback |
| `$ralph` mode | Persistent execution loops with architect-level verification |
| Codex-driven | Turned the `src/` tree into a Python-first porting workspace |

From reading the original harness structure to producing a working Python tree with tests — all driven through OmX orchestration in a single session.

## Repository Structure

```
claw-code/
├── src/                     # Python porting workspace
│   ├── main.py              # CLI entrypoint
│   ├── commands.py           # Command port metadata
│   ├── tools.py              # Tool port metadata
│   ├── models.py             # Dataclasses for subsystems/modules
│   ├── query_engine.py       # Porting summary renderer
│   ├── port_manifest.py      # Workspace structure summary
│   └── task.py               # Task management
├── tests/                    # Python verification
└── dev/rust                  # Rust port (in progress)
```

## What It Reveals About Claude Code's Architecture

The porting process surfaces the internal structure of Claude Code's agent harness:

- **Subsystem decomposition** — How Claude Code splits into modules (commands, tools, models, tasks)
- **Command/tool inventory** — The full set of built-in capabilities
- **Agent workflow patterns** — How tasks are routed, orchestrated, and verified
- **Runtime context management** — How the harness manages state across sessions

This is essentially a **study guide for harness engineering** — understanding the patterns matters more than the specific implementation.

## Quickstart

```bash
# Render porting summary
python3 -m src.main summary

# Print workspace manifest
python3 -m src.main manifest

# List subsystems
python3 -m src.main subsystems --limit 16

# Run tests
python3 -m unittest discover -s tests -v

# Inspect command/tool inventories
python3 -m src.main commands --limit 10
python3 -m src.main tools --limit 10
```

## Current Status

| Aspect | Status |
|--------|--------|
| Python workspace | Functional — mirrors root-entry file surface, subsystem names, command/tool inventories |
| Runtime equivalence | Not yet — fewer executable runtime slices than original TypeScript |
| Rust port | In progress on `dev/rust` branch — faster, memory-safe harness runtime |
| Legal position | Clean-room reimplementation, not a code copy. Essay on legal/ethical questions included in repo |

## The Creator

Sigrid Jin was featured in the **Wall Street Journal** (March 21, 2026) as one of the most dedicated Claude Code power users:

> "AI startup worker Sigrid Jin single-handedly used 25 billion Claude Code tokens last year... Jin flew to San Francisco in February for Claude Code's first birthday party."

He noted that different tools have different strengths: "Codex is better at reasoning, while Claude Code generates cleaner, more shareable code."

## Why This Matters

1. **Harness > Model** — The value isn't in Claude's weights, it's in how the harness orchestrates tools, manages context, and enforces quality. Now that architecture is open for study.
2. **AI building AI tools** — The entire rewrite was done through AI orchestration (OmX + Codex), demonstrating that agent systems can now reverse-engineer and reimplement other agent systems.
3. **Community velocity** — 50K stars in 2 hours signals massive demand for open, inspectable agent infrastructure.

## How LearnAI Team Could Use This

- Study the Claw Code architecture as a teaching resource for agent orchestration patterns.
- Compare Claude Code (TypeScript) and Claw Code (Python) implementations to understand framework design tradeoffs.
- Use as a base for building custom agent harnesses for research or course-specific workflows.

## Real-World Use Cases

- Agent framework education: students trace how a tool call flows through the harness.
- Prototyping custom agent loops with Python instead of TypeScript.
- Open-source harness experimentation: fork and modify without Claude Code's binary constraints.
- Runtime architecture comparison exercises in systems design courses.

<!-- REVIEW-TODO: [source_links] WSJ citation uses LinkedIn short URL (lnkd.in) — replace with direct WSJ article URL or archived citation -->
