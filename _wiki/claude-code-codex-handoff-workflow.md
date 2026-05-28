---
title: "Claude Code + Codex Handoff Workflow — Switching Models Without Losing Context"
date: 2026-05-22
category: Claude Code Engineering
tags: [claude-code, codex, handoff, multi-agent, project-memory, workflow, context, stale-context, CLAUDE-md, git, worktree]
related: ["Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs", "Codex + Claude Code for Research — A Practical Tutorial", "Codex-Maxxing — Jason Liu's Power User Workflow for OpenAI's Codex Agent", "Claude Code /handover: Never Lose Context Between Sessions", "Harness Engineering — The Real Bottleneck Isn't the Model", "progress.md Handoff — A Scripted Codex ⇄ Claude Code Workflow", "Codex Environment Replication — Portable `~/.codex/` Across Machines"]
icon: "🔄"
image: "/assets/images/claude-code-codex-handoff-workflow.png"
---

**Claude Code and Codex can share one project — but only if the handoff is explicit. The risk is not the model switch itself; the risk is stale context: one session continues from an old mental model and overwrites newer files. A structured handoff block written into `CLAUDE.md` before switching turns model-switching into a research workflow: one agent builds, the other reviews, and both preserve project memory.**

*Source: Q's personal workflow, derived from the LearnAI session slides project — Codex committed `be82d21`, wrote the handoff block, Claude Code pushed without reverting the slide work.*

## Why This Matters

Most multi-model workflows fail not because the models are bad, but because the second agent starts from stale context. It reads an old version of a file, generates changes based on that, and overwrites work the first agent just finished.

The fix is not technical — it's procedural: **write a handoff block before you switch.** The block tells the next agent exactly where things stand: branch, latest commit, what changed, what not to touch, and what to do next.

## The 8-Step Pattern

1. Start with one clear goal.
2. Use a dedicated branch or worktree when the change has real scope.
3. Commit finished scoped work before switching (if Q approved the commit).
4. Write a current handoff block in `CLAUDE.md` with branch, latest commit, changed files, open risks, and exact next step.
5. Leave local coordination files uncommitted unless explicitly asked.
6. Tell the next session what **not** to overwrite.
7. Before pushing, verify the branch is at the expected commit or a descendant.
8. Never push without Q asking in that specific session.

## Handoff Checklist

Before switching models, record:

- **Current branch:** `git branch --show-current`
- **Latest commit:** `git log -1 --oneline`
- **What changed:** committed files vs. local-only files, listed separately
- **What is safe to edit next:** name exact files or folders
- **What must not be touched:** usually the already-committed deliverable
- **Server/process status:** is a local dev server running or stopped?
- **Verification:** tests, builds, browser checks, or manual review already completed

## Handoff Block Template

Paste this into `CLAUDE.md` before switching — remove it after the next session completes the handoff:

```markdown
# Current Handoff — YYYY-MM-DD

Branch: `<branch-name>`
Latest commit: `<hash> <message>`

## Completed
- ...

## Local-only coordination files (do not commit)
- ...

## Do not overwrite
- ...

## Next step
- ...

## Before push
- Confirm `git log -1 --oneline` is `<hash>` or a descendant.
- Push only if Q explicitly asks in this session.
```

## Case Study: LearnAI Slides

- **Goal:** Make the beginner AI-agent slides self-contained, easier to follow, and useful as a `/goal` case study.
- **Codex** updated `session-materials/session-slides.html` and committed it as `be82d21 Improve beginner slides with goal workflow`.
- **Codex** wrote the current handoff block into `CLAUDE.md` so Claude Code could push without accidentally reverting the slide work.
- **Workflow notes** stayed local until Q decided whether to commit them.

Result: Claude Code picked up exactly where Codex left off — correct branch, correct commit baseline, no overwrites.

## How LearnAI Team Could Use This

- **Q's own multi-agent sessions** — Any session where Codex handles implementation and Claude Code handles review (or vice versa) benefits from this pattern. The LearnAI slides case study is the template: Codex builds, writes the handoff, Claude Code verifies and pushes.
- **CS-310 pair programming analog** — Teach students this as the AI analog of a pair-programming handoff. When you hand a codebase to a partner, you brief them: what's done, what's in progress, what not to touch. Same discipline applies when handing to a different AI session.
- **CS-336 multi-agent security analysis** — When running a security audit across multiple sessions (Codex for taint analysis, Claude Code for fix generation), the handoff block prevents the fix agent from re-analyzing files the audit agent already cleared.
- **Teaching context discipline** — The deeper lesson: write completion conditions, pause when context changes, record evidence on disk, and only move on when the next agent can safely continue from the truth in the repository — not from what the previous agent said it did.

## Real-World Use Cases

| Scenario | What the handoff block prevents |
|----------|--------------------------------|
| **Codex implements → Claude Code reviews** | Claude Code re-implementing instead of reviewing |
| **Claude Code drafts → Codex adversarial review** | Codex starting from a stale draft pre-edit |
| **Long session → next-day session** | Second session overwriting uncommitted local files |
| **Feature branch → main merge** | Merge from wrong base commit |
| **Dev server running → new session** | New session starting another server on the same port |

## Important Things to Know

- **The handoff block lives in `CLAUDE.md`, not in a separate file.** It's the first thing any new session reads. Remove it after the handoff completes — stale handoff blocks are worse than none because they mislead future sessions.
- **Committed vs. local-only is the critical distinction.** Committed files are safe — any agent can read the correct version from git. Local-only files are invisible to a new session unless you name them explicitly in the handoff block.
- **"Never push without Q asking in this session"** is non-negotiable in this workflow. The handoff block explicitly calls it out because pushes are the hardest thing to undo and the most common source of cross-session damage.
- **Worktrees help when scope is real.** If the change touches more than 3-4 files or spans a long session, use `git worktree add` to give each model a clean working directory — no accidental cross-contamination.
- **This pattern is model-agnostic.** The same handoff block works for Claude Code → Codex, Codex → Claude Code, or Claude Code → new Claude Code session. The discipline is about explicit state transfer, not which models are involved.
