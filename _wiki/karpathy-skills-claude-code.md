---
title: "Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits"
date: 2026-04-13
category: Claude Code
tags: [claude-code, karpathy, claude-md, guidelines, coding-quality, best-practices, open-source, skill]
related: ["Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "🧹"
image: "/assets/images/karpathy-skills-claude-code.png"
---

Andrej Karpathy identified three ways LLMs fail at coding: they **assume silently** (guess what you mean and barrel forward), **overcomplicate** (1000 lines when 100 would do), and **cause collateral damage** (touch code you didn't ask them to). **andrej-karpathy-skills** distills these observations into four CLAUDE.md rules that fix the behavior directly. 23k stars, one file, instant improvement.

*Source: [GitHub — forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) (23.3k stars) | [Karpathy's original observations](https://x.com/karpathy)*

## The Four Rules

### 1. Think Before Coding
> Don't assume. Don't hide confusion. Surface tradeoffs.

- State assumptions explicitly. If uncertain, **ask**.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. **Push back** when warranted.

### 2. Simplicity First
> Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked
- No abstractions for single-use code
- No error handling for impossible scenarios
- If 200 lines could be 50, **rewrite it**

Test: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes
> Touch only what you must. Clean up only your own mess.

- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- Only remove imports/variables that **your changes** made unused

Test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution
> Define success criteria. Loop until verified.

Transform vague tasks into testable goals:
- "Add validation" → Write tests for invalid inputs, then make them pass
- "Fix the bug" → Write a test that reproduces it, then make it pass
- "Refactor X" → Ensure tests pass before and after

## What Problem Each Rule Solves

| Karpathy Observation | Rule | Fix |
|---------------------|------|-----|
| Models assume silently, don't seek clarification | Think Before Coding | Force explicit assumptions, ask before guessing |
| Models don't push back when they should | Think Before Coding | "Push back when warranted" |
| Overcomplicated code, bloated abstractions | Simplicity First | Hard cap: no speculative features |
| Models "improve" code they weren't asked to touch | Surgical Changes | Every changed line traces to the request |
| Vague goals lead to wrong implementations | Goal-Driven Execution | Convert to verifiable tests first |

## Installation

```bash
# As a Claude Code plugin (recommended)
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills

# Or manual — new project
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md

# Append to existing CLAUDE.md
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

## Real Results

- Users report **fewer unnecessary diff changes** and simpler initial implementations
- Clarifying questions come *before* implementation rather than after mistakes
- Shopify CEO Tobi Lutke reportedly used the Karpathy approach on Shopify's templating engine → **53% faster rendering from 93 automated commits**

## How LearnAI Team Could Use This

- **Student coding with AI** — Install as default CLAUDE.md for student projects. Prevents the #1 student complaint: "Claude wrote 500 lines of code I didn't ask for and broke my existing code."
- **Teaching code review** — The four rules are a checklist for code review: Did the AI assume? Did it overcomplicate? Did it touch unrelated code? Did it verify?
- **Research tool development** — When using Claude Code for research prototypes, Surgical Changes prevents unintended modifications to working code.
- **CLAUDE.md curriculum** — Use as a teaching example of how to write effective AI instructions. Compare with Q's own CLAUDE.md to show different approaches to the same problems.

## Real-World Use Cases

1. **Enterprise Claude Code deployments** — Teams install this as the base CLAUDE.md for all projects, ensuring consistent AI behavior across the organization.
2. **Code review automation** — The four rules become the review checklist for AI-generated PRs.
3. **Junior developer guardrails** — New developers using AI get protection against the most common failure modes without needing to learn them the hard way.
4. **Open-source contributions** — Maintainers add this to `.claude/CLAUDE.md` so AI-generated PRs follow project conventions and don't include drive-by refactors.

## Tradeoff

The README is honest: **these guidelines bias toward caution over speed**. For trivial tasks (typo fixes, obvious one-liners), the full rigor is overkill. The value is preventing costly errors in substantial work.
