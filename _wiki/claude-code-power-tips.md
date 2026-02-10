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

Tired of clicking "Yes" every time Claude runs a command? Use `/permissions` to view and manage allow/deny rules, or pre-approve commands in your `settings.json`.

**Interactive: `/permissions` command**

Run `/permissions` inside a session to see all active rules and add new ones. You can also click **"Yes, don't ask again"** on any permission prompt — this permanently saves it for that command in that directory.

**Permanent: `settings.json` rules**

Add allow/deny rules to your settings files:

```json
// ~/.claude/settings.json (all projects)
// or .claude/settings.json (this project, shared with team)
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Bash(docker build *)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Read(./.env*)",
      "Read(~/.ssh/**)"
    ]
  }
}
```

Rules support wildcards: `Bash(npm run *)` matches `npm run build`, `npm run test`, etc. **Deny rules always win** over allow rules.

**Permission modes** — set `defaultMode` in settings:

| Mode | Behavior |
|------|----------|
| `default` | Prompts on first use of each tool |
| `acceptEdits` | Auto-accepts file edits (still prompts for bash) |
| `plan` | Read-only — Claude analyzes but can't modify anything |
| `dontAsk` | Denies everything not explicitly in `allow` list |

**Practical tip:** Start with `acceptEdits` mode + specific bash allows for your build/test commands. This eliminates 90% of prompts while still asking before unfamiliar shell commands.

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Read(./.env*)"
    ]
  }
}
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

## Multi-Task with tmux + /statusline

### Customize the Status Bar with /statusline

The `/statusline` command adds a persistent status bar at the bottom of Claude Code showing context usage, cost, git branch, model — whatever you want.

Quick setup inside any session:

```
> /statusline show git branch, model name, and context usage with a progress bar
```

Claude auto-generates a script and configures it. For manual control, create `~/.claude/statusline.sh`:

```bash
#!/bin/bash
input=$(cat)

MODEL=$(echo "$input" | jq -r '.model.display_name')
DIR=$(echo "$input" | jq -r '.workspace.project_dir' | xargs basename)
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
COST=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
BRANCH=$(git branch --show-current 2>/dev/null || echo "no git")

# Color by context usage
if [ "$PCT" -ge 90 ]; then COLOR='\033[31m'    # Red
elif [ "$PCT" -ge 70 ]; then COLOR='\033[33m'   # Yellow
else COLOR='\033[32m'; fi                        # Green

printf "[$MODEL] %s | %s | ${COLOR}Context: ${PCT}%%\033[0m | \$%.2f" \
  "$DIR" "$BRANCH" "$COST"
```

Then point to it in `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

Claude Code sends JSON to your script via stdin with fields like `model`, `context_window.used_percentage`, `cost.total_cost_usd`, `workspace.project_dir`, and more.

### One tmux Tab Per Task

Use tmux to run isolated Claude Code sessions — one per task, each with its own context and statusline:

```bash
# Create a multi-window session
tmux new-session -s dev -n "frontend" -c ~/projects/frontend
tmux new-window -t dev -n "backend" -c ~/projects/backend
tmux new-window -t dev -n "review" -c ~/projects

# Start Claude Code in each window
tmux send-keys -t dev:frontend "claude" Enter
tmux send-keys -t dev:backend "claude" Enter
tmux send-keys -t dev:review "claude" Enter

# Attach and switch between tasks
tmux attach -t dev
# Ctrl+B then 0,1,2 to switch windows
```

Each window is a fully isolated Claude session with its own context, permissions, and conversation. The statusline at the bottom tells you which branch, how much context is used, and what it's costing — so you always know where you are.

**Useful tmux shortcuts:**

| Keys | Action |
|------|--------|
| `Ctrl+B` then `0-9` | Switch to window by number |
| `Ctrl+B` then `%` | Split pane vertically (side-by-side Claude sessions) |
| `Ctrl+B` then `c` | Create new window |
| `Ctrl+B` then `,` | Rename current window |

**Tip:** Add this to `~/.tmux.conf` for fast switching:

```
bind-key -n M-1 select-window -t 0
bind-key -n M-2 select-window -t 1
bind-key -n M-3 select-window -t 2
```

Now `Alt+1`, `Alt+2`, `Alt+3` jump between tasks instantly.

## CLI Tool Integration

### Use Specialized CLIs
Ask Claude to use specific CLI tools like `bq` (BigQuery), `aws`, `gcloud`, etc. Claude can leverage these for data queries and cloud operations.

```
> Use bq CLI to query the user_events table for last 7 days
```
