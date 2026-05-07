---
title: "Claude Code Tips & Context Engineering — From 45 Tips to Six-Layer Architecture"
date: 2026-03-22
category: Claude Code Engineering
redirect_from:
  - "/wiki/claude code/claude-code-tips-engineering/"
tags: [claude-code, tips, context-management, skills, hooks, subagents, engineering-practices, prompt-caching]
related: ["Claude Code Power User Tips", "Claude Code: Isolate Heavy Tasks with context: fork", "Claude Code Plugins & Marketplace", "Claude Certified Architect — Anthropic's First Official AI Certification", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Boris Cherny on Claude Code — Origin Story, Product Philosophy & the End of Manual Coding"]
icon: "🧠"
image: "/assets/images/claude-code-tips-engineering.png"
---

Two essential resources for mastering Claude Code: a 45-tip practical guide (ykdojo) covering everything from custom status lines to containerized agents, and a deep engineering article (tw93) dissecting Claude Code's six-layer architecture, context management, and why most problems aren't about the model being dumb — they're about feeding it the wrong context.

*Source: [45 Claude Code Tips - ykdojo](https://github.com/ykdojo/claude-code-tips) | [Claude Code Architecture & Engineering - tw93](https://tw93.fun/2026-03-12/claude.html) | [BrightCoding: 45 Tricks for Terminal AI Mastery](https://www.blog.brightcoding.dev/2026/03/20/claude-code-tips-45-revolutionary-tricks-for-terminal-ai-mastery)*

## The Six-Layer Architecture (tw93)

Most people treat Claude Code as a chatbot. It's actually a six-layer system — and strengthening only one layer while ignoring others causes the system to fail:

| Layer | Role | What It Controls |
|---|---|---|
| `CLAUDE.md` / rules / memory | Long-term context | "What Claude is" — constraints, boundaries, project rules |
| `Tools` / `MCP` | Action capabilities | "What Claude can do" — read files, run commands, access APIs |
| `Skills` | On-demand workflows | "How Claude does it" — loaded only when needed |
| `Hooks` | Forced execution | Deterministic rules that don't depend on Claude's judgment |
| `Subagents` | Isolated workers | Separate context windows for contained tasks |
| `Verifiers` | Validation loop | Tests, lint, screenshots, CI — making output trustworthy |

```
Collect Context → Take Action → Verify Result → [Done or Loop Back]
      ↑                    ↓
  CLAUDE.md            Hooks / Permissions
  Skills               Tools / MCP
  Memory               Subagents
```

## Context Engineering — The Most Important Skill

The #1 insight from both resources: **context problems are usually noise, not capacity**. Your 200K window isn't all available:

```
200K Total Context
├── Fixed Overhead (~15-20K)
│   ├── System prompt: ~2K
│   ├── Skill descriptors: ~1-5K
│   ├── MCP tool definitions: ~10-20K  ← BIGGEST HIDDEN COST
│   └── LSP state: ~2-5K
├── Semi-fixed (~5-10K)
│   ├── CLAUDE.md: ~2-5K
│   └── Memory: ~1-2K
└── Dynamic (what you actually get: ~160-180K)
    ├── Conversation history
    ├── File contents
    └── Tool call results
```

**Eye-opener:** 5 MCP servers = ~25,000 tokens fixed overhead (12.5% of your context gone before you type anything).

### Context Best Practices

| Practice | Why |
|---|---|
| Keep CLAUDE.md short, hard, executable | Anthropic's own is ~2.5K tokens |
| Use `.claude/rules/` for path-specific rules | Don't bloat root CLAUDE.md |
| Write Compact Instructions in CLAUDE.md | Control what survives compression |
| Use `/clear` on task switch, `/compact` within a task | Fresh context > stale context |
| HANDOFF.md pattern for session transfers | Don't rely on auto-compression quality |
| Limit tool output with `\| head -30` or [RTK](https://github.com/rtk-ai/rtk) | Tool output is a hidden context killer |

## Top Practical Tips (from 45 Tips)

### For Beginners

| Tip | What It Does |
|---|---|
| **[Custom status line](https://github.com/ykdojo/claude-code-tips#tip-0-customize-your-status-line)** | Shows model, git branch, token usage at bottom of terminal |
| **[Voice input](https://github.com/ykdojo/claude-code-tips#tip-2-talk-to-claude-code-with-your-voice)** | 2-3x faster than typing — use [superwhisper](https://superwhisper.com/) or built-in voice mode |
| **[Break down problems](https://github.com/ykdojo/claude-code-tips#tip-3-break-down-large-problems-into-smaller-ones)** | A → A1 → A2 → A3 → B instead of A → B directly |
| **[Git & GitHub CLI](https://github.com/ykdojo/claude-code-tips#tip-4-using-git-and-github-cli-like-a-pro)** | Let Claude handle commits, branches, draft PRs |
| **[`/clear` and `/compact`](https://github.com/ykdojo/claude-code-tips#tip-8-proactively-compact-your-context)** | Fresh context performs better than long stale sessions |

### For Intermediate Users

| Tip | What It Does |
|---|---|
| **[HANDOFF.md pattern](https://github.com/ykdojo/claude-code-tips#tip-8-proactively-compact-your-context)** | Write progress doc before switching sessions — next agent reads only this |
| **[Plan Mode](https://github.com/ykdojo/claude-code-tips#tip-39-spend-some-time-planning-but-also-prototype-quickly)** | Separate exploration (read-only) from execution (changes) |
| **[Git worktrees](https://github.com/ykdojo/claude-code-tips#tip-16-git-worktrees-for-parallel-branch-work)** | Parallel branch work — different features, different directories |
| **[TDD with Claude](https://github.com/ykdojo/claude-code-tips#tip-34-write-lots-of-tests-and-use-tdd)** | Write tests first, then implementation — Claude excels at this |
| **[Containers](https://github.com/ykdojo/claude-code-tips#tip-21-containers-for-long-running-risky-tasks)** | Run risky/long tasks in Docker — safe sandbox for experiments |

### For Advanced Users

| Tip | What It Does |
|---|---|
| **[Slim system prompt](https://github.com/ykdojo/claude-code-tips#tip-15-slim-down-the-system-prompt)** | Cut system prompt by ~45% to free context for actual work |
| **[Subagents for isolation](https://tw93.fun/2026-03-12/claude.html)** | Exploration tasks in subagents keep main context clean |
| **[Hooks for governance](https://tw93.fun/2026-03-12/claude.html)** | Auto-format on edit, block protected files, notify on completion |
| **[Skill design patterns](https://tw93.fun/2026-03-12/claude.html)** | Checklist, workflow, and domain-expert types with supporting files |
| **[Prompt caching awareness](https://tw93.fun/2026-03-12/claude.html)** | Understand prefix-match caching to avoid breaking cache hits |
| **[dx plugin](https://github.com/ykdojo/claude-code-tips#tip-44-install-the-dx-plugin)** | Install with `claude plugin install dx@ykdojo` — adds /handoff, /clone, /gha |

## Three-Layer Governance: CLAUDE.md + Skills + Hooks

This pattern from tw93 is critical — using only one layer leaves gaps:

```
CLAUDE.md  →  "Commits must pass tests and lint"     (declaration)
     ↓
Skill      →  "Run tests in this order, read         (workflow)
               failures, fix, re-run"
     ↓
Hook       →  "After every Edit on *.rs,              (enforcement)
               run cargo check | head -30"
```

- **CLAUDE.md alone**: Claude often ignores rules
- **Hooks alone**: Can't handle complex judgment calls
- **All three together**: Declarations + workflows + enforcement = stable system

## Concept Boundaries — What Goes Where

| Concept | Use When | Common Mistake |
|---|---|---|
| `CLAUDE.md` | Project-level permanent rules | Writing a knowledge base instead of constraints |
| `.claude/rules/*` | Path/language-specific rules | Dumping everything in root CLAUDE.md |
| `Tools / MCP` | Need new action capability | Connecting too many servers (context bloat) |
| `Skills` | Need on-demand workflow/knowledge | Making skills that are encyclopedias |
| `Hooks` | Need deterministic enforcement | Using hooks for complex semantic judgment |
| `Subagents` | Need isolated context for a task | No boundary constraints (fan-out chaos) |
| `Plugins` | Need to distribute skills/hooks/MCP | Treating plugins as runtime primitives |

## Why Students Should Use These Resources

These two resources are a masterclass in **understanding how AI agent systems actually work** — not just using them, but understanding the engineering behind them:

- **Context engineering** teaches resource management — understanding token budgets is like understanding memory management in systems programming
- **The six-layer architecture** maps directly to software architecture courses — separation of concerns, layered design, isolation patterns
- **Hooks and verification** teach the same principles as formal verification and program analysis — ensuring correctness through systematic enforcement rather than hoping the system behaves
- **The HANDOFF.md pattern** teaches documentation and knowledge transfer — a skill every engineer needs
- **TDD with Claude** (Tip 34) reinforces test-driven development in a context where students can see immediate results
- **Skill design patterns** (checklist, workflow, domain-expert) are the same design pattern thinking taught in software engineering courses

For AI education research: these resources demonstrate that effective AI tool usage requires **engineering discipline**, not just prompt writing. The gap between "using Claude Code as a chatbot" and "building a governed AI development system" is exactly the kind of skill gap LAI research can help bridge.

## Install the dx Plugin

```bash
claude plugin marketplace update ykdojo
claude plugin install dx@ykdojo
```

Adds `/handoff`, `/clone`, `/half-clone`, and `/gha` commands. See [dx plugin details](https://github.com/ykdojo/claude-code-tips#tip-44-install-the-dx-plugin).

## Further Reading

- [45 Claude Code Tips — Full README](https://github.com/ykdojo/claude-code-tips)
- [Claude Code Architecture (Chinese) — tw93](https://tw93.fun/2026-03-12/claude.html)
- [Status Line Script Setup](https://github.com/ykdojo/claude-code-tips/blob/main/scripts/README.md)
- [Demo Video — Multi-Claude Workflow](https://www.youtube.com/watch?v=hiISl558JGE)
- [RTK — Rust Token Killer for output filtering](https://github.com/rtk-ai/rtk)
- [Claude Code Official Docs](https://code.claude.com/docs/en/how-claude-code-works)
