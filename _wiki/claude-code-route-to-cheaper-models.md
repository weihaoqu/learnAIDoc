---
title: "Claude Code: Route Tasks to Cheaper Models with Subagents"
date: 2026-02-08
category: Tools
tags: [claude-code, cli, cost-saving, subagents, haiku]
related: ["Claude Code: Agent Teams vs Subagents", "Claude Code Power User Tips"]
icon: "💰"
image: "/assets/images/claude-code-cheaper-models.jpg"
---

Today I learned you can dramatically cut Claude Code costs by routing read-only tasks to Haiku via custom subagents — and the real trick is running many of them in parallel.

## The Idea

Not every task needs Opus. Codebase exploration, file searching, and pattern matching are perfect for Haiku — it's roughly **1/5 the cost**. By restricting the subagent to read-only tools (Read, Grep, Glob), even hallucinations can't accidentally edit your files.

## How to Create a Haiku Subagent

Create a Markdown file with YAML frontmatter in `.claude/agents/` (project-level) or `~/.claude/agents/` (global):

```markdown
<!-- .claude/agents/fast-reader.md -->
---
name: fast-reader
description: Fast, low-cost agent for reading and analyzing code. Use for codebase exploration and file discovery.
model: haiku
tools: Read, Grep, Glob
---

You are a fast code analysis agent optimized for cost efficiency.

When searching:
1. Use Glob to find files by name/extension
2. Use Grep for pattern matching
3. Use Read only for targeted analysis
4. Provide concise summaries with file references
```

Key fields:
- **`model: haiku`** — routes to the cheap, fast model
- **`tools: Read, Grep, Glob`** — allowlist restricts to read-only operations

## Using It

Once the file exists, Claude auto-delegates matching tasks. Or you can ask explicitly:

```
Use the fast-reader to find all files that import 'express' and list the routes they define.
```

## The Real Cost Saver: Parallel Batch Processing

The biggest savings come from running **many Haiku searches in parallel** and merging the results, instead of one expensive Opus pass over the whole codebase.

Example prompt:

```
Search these 5 modules in parallel using subagents:
- src/auth/ — find all permission checks
- src/api/ — list all endpoint definitions
- src/db/ — find all raw SQL queries
- src/utils/ — identify exported helper functions
- src/middleware/ — list all middleware chains
```

Claude spawns multiple Haiku subagents that run concurrently. Each returns a focused summary. The main agent merges the results — faster and cheaper than a single Opus scan.

## Practical Setup: Split Research and Implementation

A common pattern is to pair a cheap reader with a capable writer:

```markdown
<!-- .claude/agents/researcher.md -->
---
name: researcher
description: Fast research agent for codebase exploration
model: haiku
tools: Read, Grep, Glob
---
Answer codebase questions efficiently. Be concise.
```

```markdown
<!-- .claude/agents/implementer.md -->
---
name: implementer
description: Implementation specialist for writing and modifying code
model: sonnet
tools: Read, Write, Edit, Bash, Grep, Glob
---
Expert code implementer for changes and feature development.
```

Workflow:
1. **Research phase** (Haiku) — explore the codebase, understand patterns
2. **Implementation phase** (Sonnet/Opus) — make the actual changes

This cuts the research cost to nearly nothing while keeping full capability for the writing phase.

## Cost Comparison

| Approach | Estimated Cost |
|----------|---------------|
| Single Opus scanning 50 files | $$$ |
| 10 parallel Haiku subagents | ~$ (1/5 per agent, faster total time) |
| Haiku research + Sonnet implementation | ~50% savings overall |

## Where Subagent Files Live

| Location | Scope |
|----------|-------|
| `.claude/agents/` | Project — commit to share with team |
| `~/.claude/agents/` | Personal — available across all projects |

Monitor your spending with `/cost` inside any session.
