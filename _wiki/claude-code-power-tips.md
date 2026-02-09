---
title: "Claude Code Power User Tips"
date: 2024-02-05
category: Tools
tags: [claude-code, cli, productivity, workflow]
related: ["Claude Code Session Stats & Usage"]
icon: "⚡"
image: "/assets/images/claude-code-power-tips.jpg"
---

A collection of advanced tips and workflows for getting more out of Claude Code.

## Permissions & Setup

### Pre-allow Permissions
Run `/permissions` to pre-approve common operations. Avoids constant permission prompts during work.

```
> /permissions
```

### Enable Learning Mode
Instead of a one-time config toggle, add learning instructions directly to your CLAUDE.md so every session follows them automatically.

I added three rules to `~/.claude/CLAUDE.md` (user-level, applies to all projects):

```markdown
# How I Learn — Claude Code Behavior

When explaining code or making changes:

- **Explain the "why", not just the "what"** — Always explain the reasoning
  behind code choices, tradeoffs considered, and why this approach was picked
  over alternatives. Help me learn, not just ship.
- **Generate visual HTML presentations for unfamiliar code** — When I'm
  learning a new codebase or module, create a self-contained HTML slide deck
  that walks through the architecture, key functions, and data flow visually.
- **Draw ASCII diagrams for protocols and codebases** — When explaining
  systems, architectures, data flows, or protocols, include ASCII diagrams
  to build a quick mental model before diving into code.
```

**Where to put it:**

| File | Scope |
|------|-------|
| `~/.claude/CLAUDE.md` | All your projects (personal) |
| `./CLAUDE.md` | This project only (shared with team) |
| `./CLAUDE.local.md` | This project only (personal, gitignored) |

The result: Claude now explains *why* it chose a specific approach every time it writes code, draws diagrams when introducing new systems, and offers HTML slide decks when I'm onboarding into unfamiliar codebases — all without me asking each time.

## Leveraging Subagents

### Throw More Compute at Problems
Append **"use subagents"** to any request where you want Claude to dedicate more processing power.

```
> Refactor this authentication module, use subagents
```

### Keep Main Window Clean
Offload individual tasks to subagents to keep the main agent window focused. The main agent orchestrates while subagents handle discrete work.

## Learning & Understanding Code

### Generate Visual HTML Presentations
Ask Claude to create an HTML presentation explaining unfamiliar code. It produces surprisingly good slides for walkthroughs. With learning mode enabled in your CLAUDE.md, Claude will proactively offer these when you're exploring new code.

```
> Create an HTML slide deck explaining how this codebase handles authentication
```

### ASCII Architecture Diagrams
Ask Claude to draw ASCII diagrams of protocols and codebases. Great for quick mental models. With learning mode, Claude includes these automatically when explaining systems.

```
> Draw an ASCII diagram showing how data flows through this system
```

### Build a Spaced-Repetition Skill
Create a learning skill where:
1. You explain your understanding
2. Claude asks follow-up questions to fill gaps
3. Results are stored for future review

## Planning Complex Work

### Start in Plan Mode
For complex tasks, start in plan mode and do an interview first to clarify requirements.

```
> /plan
```

### Two-Claude Review Strategy
One person's approach: have Claude write the plan, then spin up a **second Claude session** to review it as a "staff engineer". Catches blind spots.

### Write Detailed Specs First
Use the interview skill to reduce ambiguity before handing work off. Vague specs lead to wasted iterations.

## Continuous Improvement

### Update Memory After Corrections
After every correction, end with:

```
> Update your CLAUDE.md so you do not make the same mistake again
```

This builds project-specific knowledge over time.

### Create & Publish Reusable Skills
Build your own skills and reuse them across every project. Publish useful ones for the community.

## Making Claude Your Reviewer

### Grill Me Mode
Challenge Claude to test your understanding before proceeding:

```
> Grill me on these changes and do not make a PR until I pass your test
```

### The Elegant Solution Reset
After a mediocre fix, prompt a fresh approach:

```
> Knowing everything you know now, scrap this and implement the elegant solution
```

Forces Claude to apply lessons learned rather than patch existing work.

## CLI Tool Integration

### Use Specialized CLIs
Ask Claude to use specific CLI tools like `bq` (BigQuery), `aws`, `gcloud`, etc. Claude can leverage these for data queries and cloud operations.

```
> Use bq CLI to query the user_events table for last 7 days
```
