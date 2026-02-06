---
title: "Claude Code Session Stats & Usage"
date: 2024-02-05
category: Tools
tags: [claude-code, cli, productivity]
icon: "📊"
---

Claude Code provides built-in commands to monitor your session statistics, token usage, and costs.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `/cost` | Show current session cost and token usage |
| `/usage` | Display detailed usage statistics |
| `/stats` | View session statistics |

## Using /cost

Simply type `/cost` in your Claude Code session to see:
- Total tokens used (input + output)
- Estimated cost for the session
- Breakdown by conversation turn

```
> /cost
```

## Using /usage

The `/usage` command provides more detailed insights:
- Token counts per message
- Cache hit rates
- Model being used

## Tips for Managing Costs

### Use Compact Mode
When context gets large, use `/compact` to summarize the conversation and reduce token usage.

### Choose the Right Model
Use `/model` to switch between models:
- `haiku` - Fast and cheap for simple tasks
- `sonnet` - Balanced for most work
- `opus` - Most capable for complex reasoning

### Monitor Regularly
Check `/cost` periodically during long sessions to stay aware of usage.

## Related Commands

- `/clear` - Start fresh conversation (resets context)
- `/compact` - Compress conversation history
- `/config` - View and modify settings
