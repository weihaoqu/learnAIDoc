---
title: "Beads: Graph-Based Memory for AI Coding Agents"
date: 2026-02-08
category: Tools
tags: [ai, agents, memory, graph, git, claude-code]
related: ["Claude Code: Agent Teams vs Subagents", "Claude Code Power User Tips"]
icon: "📿"
image: "/assets/images/beads-graph-memory.jpg"
---

Today I learned about [Beads](https://github.com/steveyegge/beads) — a distributed, git-backed graph issue tracker built specifically for AI coding agents. Instead of flat markdown files for memory, it gives agents a structured dependency graph so they can manage complex, long-running tasks without losing context.

## The Problem with Markdown Memory

Tools like CLAUDE.md and todo lists store agent memory as flat text. This works for simple tasks, but breaks down when:

- Tasks have **dependencies** — what's blocked? what's ready?
- Multiple agents work in parallel — **merge conflicts** on the same markdown file
- Sessions run long — the **context window fills up** with stale completed tasks
- You need to understand **relationships** between tasks, not just a bullet list

## How Beads Solves This

Beads replaces flat text with a **dependency-aware graph** stored as JSONL files in a `.beads/` directory, versioned by git alongside your code.

| | Markdown Memory | Beads (Graph) |
|---|---|---|
| **Structure** | Flat text, unordered | Dependency graph with typed relationships |
| **Task readiness** | Figure it out manually | `bd ready` auto-detects unblocked tasks |
| **Multi-agent** | Conflicts when agents edit same file | Hash-based IDs (`bd-a1b2`) prevent collisions |
| **History** | Overwritten or appended | Full git-versioned audit trail |
| **Context decay** | Context window fills up | Compaction summarizes old closed tasks |
| **Relationships** | None | `relates_to`, `duplicates`, `supersedes`, `replies_to` |

## Getting Started

### Install

```bash
npm install -g @beads/bd    # npm
brew install beads          # Homebrew
go install github.com/steveyegge/beads/cmd/bd@latest  # Go
```

### Initialize in Your Project

```bash
bd init          # Standard — commits to repo
bd init --stealth      # Local only, nothing committed
bd init --contributor  # Routes planning to separate repo
```

## Core Commands

```bash
bd ready                       # Show tasks with no blockers (JSON output)
bd create "Refactor auth" -p 0 # Create a priority-0 task
bd update bd-a1b2 --claim      # Atomically claim a task
bd dep add bd-c3d4 bd-a1b2     # bd-c3d4 is blocked by bd-a1b2
bd show bd-a1b2                # View task details + change history
```

The key command is `bd ready` — it queries the graph and returns only tasks whose dependencies are all resolved. Agents can call this programmatically (JSON output) to decide what to work on next.

## Hierarchical Task Structure

Beads supports epics, tasks, and subtasks:

```
bd-a3f8          (Epic: Redesign auth system)
├── bd-a3f8.1    (Task: Migrate to JWT)
│   ├── bd-a3f8.1.1  (Subtask: Update token generation)
│   └── bd-a3f8.1.2  (Subtask: Add refresh token flow)
└── bd-a3f8.2    (Task: Update middleware)
```

Dependencies between any level — a subtask can block an epic in a different branch of the tree.

## Context Window Management: Compaction

Long-running projects accumulate hundreds of completed tasks. Beads addresses this with **compaction** — semantic summarization of closed tasks. The agent retains the key decisions and outcomes without carrying the full verbose history in its context window.

This is similar to how Claude Code's `/rewind` summarize option works, but applied to the task graph rather than conversation history.

## Why This Matters for Multi-Agent Workflows

When multiple agents (or agent teams) work on the same project:

- **Atomic claiming** (`--claim`) prevents two agents from grabbing the same task
- **Hash-based IDs** eliminate merge conflicts when agents commit simultaneously
- **Dependency resolution** means Agent B automatically sees its task become ready when Agent A finishes the blocker
- **Git-backed** means everything is branchable, mergeable, and auditable

## Workflow Modes

| Mode | Command | Use Case |
|------|---------|----------|
| **Standard** | `bd init` | Full tracking, committed to repo |
| **Stealth** | `bd init --stealth` | Personal use, no commits to main repo |
| **Contributor** | `bd init --contributor` | Routes plans to `~/.beads-planning`, keeps PRs clean |

## When to Use Beads vs Plain Markdown

**Use Beads when:**
- The project has many interdependent tasks
- Multiple agents or team members work in parallel
- Tasks span days or weeks (long-horizon work)
- You need to query "what's ready to work on?" programmatically

**Stick with markdown when:**
- Tasks are simple and sequential
- You're working solo on short sessions
- The overhead of a graph tracker isn't justified
