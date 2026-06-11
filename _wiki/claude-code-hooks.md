---
title: "Claude Code Hooks"
date: 2026-02-13
category: Claude Code Engineering
redirect_from:
  - "/wiki/claude code/claude-code-hooks/"
tags: [claude-code, cli, hooks, automation, workflow]
related: ["Claude Code Power User Tips", "Claude Code Plugins & Marketplace", "Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Environment Replication — Portable Setup Across Machines", "Claude Code Token Guard — Audit Unattended Token Burn"]
icon: "🪝"
image: "/assets/images/claude-code-hooks.png"
---

Hooks are a way to deterministically hook into Claude's lifecycle — running your own code at specific points during a session.

*Source: [Claude Code creator Boris shares 12 ways that most people don't know about](https://www.reddit.com/r/ClaudeAI/comments/1r2b5xk/claude_code_creator_boris_shares_12_ways_that/)*

## Getting Started

Ask Claude to add a hook for you:

```
> Add a hook that logs every bash command to a file
```

Claude will configure the hook in your `settings.json`.

## What You Can Do With Hooks

### Route Permission Requests

Automatically send permission prompts to Slack or another Claude (like Opus) for approval, instead of manually clicking through them.

```
> Add a hook that routes permission requests to our #claude-approvals Slack channel
```

### Nudge Claude to Keep Going

When Claude reaches the end of a turn and stops, a hook can kick off an agent or use a prompt to decide whether Claude should continue working.

```
> Add a hook that checks if the task is complete and nudges Claude to keep going if not
```

### Pre-process or Post-process Tool Calls

Intercept tool calls before or after they execute — useful for adding custom logging, validation, or transformation.

```
> Add a hook that logs all file edits to an audit trail
```

## How Hooks Work

Hooks are shell commands configured in `settings.json` that execute in response to Claude lifecycle events:

```json
{
  "hooks": {
    "onToolCall": {
      "command": "~/scripts/log-tool-call.sh"
    },
    "onPermissionRequest": {
      "command": "~/scripts/route-to-slack.sh"
    },
    "onTurnEnd": {
      "command": "~/scripts/check-completion.sh"
    }
  }
}
```

## Hooks vs Permissions vs Sandbox

| Layer | Purpose |
|-------|---------|
| **Permissions** | Gate whether a tool can run |
| **Sandbox** | Restrict what the OS allows |
| **Hooks** | React to events and add custom behavior |

Hooks don't replace permissions or sandboxing — they add a programmable layer on top. You might use permissions to block `rm -rf`, sandbox to restrict file access, and hooks to log everything that happens.

## How LearnAI Team Could Use This

- Use hooks to log Claude Code activity, route approval requests, and enforce project checks during team development sessions.
- Set up PreToolUse hooks for safety checks on destructive operations in shared repos.
- Use Stop hooks for automatic context handoff and session logging.

## Real-World Use Cases

- Route risky permission requests to a team approval channel.
- Log file edits and shell commands for audit trails.
- Run validation scripts after tool calls.
- Trigger continuation checks when a Claude Code session stops early.

## Why This Matters

Hooks make Claude Code programmable at the workflow level. Instead of just configuring what Claude can and can't do, you can build automated workflows around Claude's behavior — approval flows, audit trails, auto-continuation, and custom integrations with your team's tools.
