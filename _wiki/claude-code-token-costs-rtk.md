---
title: "Claude Code Token Costs: The Hidden Tax and How rtk Cuts It by 80%"
date: 2026-03-26
category: Claude Code
tags: [claude-code, tokens, costs, rtk, context-window, optimization, cli-proxy, billing]
related: ["Claude Code Context Management and CLAUDE.md Practices", "Claude Code Session Stats and Cost Tracking"]
icon: "💰"
image: "/assets/images/claude-code-token-costs-rtk.png"
---

Every bash command Claude Code runs has a hidden token cost. `git status` outputs ~3,000 tokens. `cargo test` can output 25,000 tokens. A typical medium project development cycle burns through **118,000 tokens** just on command output — and with a 1M context window, that cost compounds silently until your daily quota vanishes.

*Source: [Reddit — "Saying hey cost me 22% of my usage limits"](https://www.reddit.com/r/ClaudeAI/comments/1s3hh29/saying_hey_cost_me_22_of_my_usage_limits) | [GitHub — rtk-ai/rtk](https://github.com/rtk-ai/rtk) | [Kilo-Org Discussion — Saved 10M tokens (89%)](https://github.com/Kilo-Org/kilocode/discussions/5848)*

## The Problem: Token Billing is a Black Box

A user tracked [GitHub issue #16157](https://github.com/anthropics/claude-code/issues/16157) and found a striking case: **92% of tokens in a session came from cache reads**, actual output tokens were near zero, yet the API charged $1.50 — which counted as **$65 of usage** against their quota.

### Why This Happens

The 1M context window is an amplifier. Key pain points:

| Issue | What Happens |
|-------|-------------|
| **Cache reads count** | Every message includes full conversation history — cached tokens still count toward usage |
| **Silent retries** | When Claude encounters service instability, it silently retries requests, each retry re-reads the full context |
| **Overnight sessions** | One long session can eat your entire daily quota by morning |
| **No transparency** | Same operation might use 20% today, 89% tomorrow — no warning, no predictability |

### Quick Workarounds

- **`/compact`** — Compress context before it gets too large; don't wake old sessions, start fresh
- **`/cost` or `/stats`** — Monitor token consumption in real-time
- **Don't revive stale sessions** — Opening yesterday's conversation reloads the entire history

## The Solution: rtk — CLI Proxy That Saves 80% of Tokens

**[rtk](https://github.com/rtk-ai/rtk)** (Rust Token Killer) is a single Rust binary that sits between Claude Code and your shell commands. It intercepts command output, compresses it, and sends Claude only the essential information.

```
Before rtk:           After rtk:
git status → 3000 tokens    → 150 tokens (95% saved)
cargo test → 25000 tokens   → 2500 tokens (90% saved)
ls -la     → 800 tokens     → 150 tokens (82% saved)
─────────────────────────────────────────────────
Total: 118,000 tokens  →  23,900 tokens (80% saved)
```

### How rtk Works: 4-Step Compression

```
Raw command output
       │
       ▼
┌─────────────────────┐
│ 1. Smart Filtering   │  Remove comments, whitespace, boilerplate
├─────────────────────┤
│ 2. Grouping          │  Cluster similar items (e.g., files by directory)
├─────────────────────┤
│ 3. Truncation        │  Keep useful info, cut the rest
├─────────────────────┤
│ 4. Deduplication     │  Fold repeated log lines into one + count
└─────────────────────┘
       │
       ▼
Compressed output → Claude
```

### Setup: One Command

```bash
# Install on macOS
brew install rtk

# Then initialize globally
rtk init --global
```

After this, `git`, `cargo/npm test`, `docker`, `kubectl`, `eslint/ruff/pylint`, `jest/vitest/playwright`, `pip/pnpm` — all common dev commands are automatically intercepted. Claude sees only compressed versions, completely transparently.

### Real Savings: Why It Matters Beyond Cost

Token savings aren't just about money:

- **More context space** — Compressed outputs mean more room for code history, more context for better Agent decisions
- **Longer sessions** — Same conversation can stay productive longer before hitting limits
- **Better agent performance** — Less noise in context = more focused, accurate responses

### Limitations

| Works With | Doesn't Work With |
|-----------|-------------------|
| All Bash commands (git, npm, cargo, docker, kubectl, etc.) | Claude Code's built-in tools (Read, Grep, Glob) — these bypass the shell |
| Custom shell commands | Completely unknown/custom commands — rtk passes these through raw |

**Workaround for built-in tools:** Use shell equivalents explicitly — `cat/head/tail` instead of Read, `rg/grep` instead of Grep — when you want rtk compression. Or explicitly call `rtk read`.

### Supported Platforms

Claude Code, OpenCode, Gemini CLI — install is one command, config lives at `~/.config/rtk/config.toml`.
