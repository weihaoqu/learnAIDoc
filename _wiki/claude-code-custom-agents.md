---
title: "Claude Code Custom Agents"
date: 2026-02-13
category: Tools
tags: [claude-code, cli, agents, customization]
related: ["Claude Code Agent Teams vs Subagents", "Claude Code Power User Tips"]
icon: "🤖"
image: "/assets/images/claude-code-custom-agents.png"
---

A little-known feature in Claude Code lets you set the default agent used for the main conversation. This changes the system prompt and behavior of your primary Claude session.

*Source: [Claude Code creator Boris shares 12 ways that most people don't know about](https://www.reddit.com/r/ClaudeAI/comments/1r2b5xk/claude_code_creator_boris_shares_12_ways_that/)*

## Getting Started

```
> /agents
```

Run `/agents` to see available agents and get started.

## How to Set a Custom Agent

### Via settings.json

Add the `agent` field to your settings file:

```json
{
  "agent": "your-agent-name"
}
```

### Via CLI flag

Launch Claude Code with a specific agent:

```bash
claude --agent your-agent-name
```

## Why This Matters

Different tasks benefit from different default behaviors. Instead of re-explaining your preferences every session, you can configure an agent that:

- Has domain-specific knowledge baked in
- Follows particular coding conventions by default
- Uses a specific workflow or review process
- Prioritizes certain tools or approaches

## Agent vs CLAUDE.md

| Approach | Best for |
|----------|----------|
| **CLAUDE.md** | Project-specific instructions, conventions, file paths |
| **Custom agent** | Changing the overall persona, workflow, and tool preferences |

Think of CLAUDE.md as "what to know about this project" and agents as "how to behave in general." They work together — your agent defines the baseline behavior, and CLAUDE.md layers on project context.
