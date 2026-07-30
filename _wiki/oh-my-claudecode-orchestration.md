---
title: "oh-my-claudecode — Multi-AI Orchestration Plugin for Claude Code"
date: 2026-03-31
category: Skills & Plugins
redirect_from:
  - "/wiki/skills & plugins/oh-my-claudecode-orchestration/"
tags: [claude-code, orchestration, multi-agent, plugin, codex, gemini, oh-my-claudecode, teams, parallel]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code: Agent Teams vs Subagents"]
icon: "💪"
image: "/assets/images/oh-my-claudecode-orchestration.png"
---

"A weapon, not a tool." **oh-my-claudecode (OMC)** is a multi-AI orchestration plugin for Claude Code that coordinates Claude, Gemini, and Codex with 19+ specialized agents, 28 skills, and MCP-powered tools. 14.5K stars, 26.5K installs, zero learning curve — just describe what you want.

*Source: [GitHub — Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) | [Documentation](https://yeachan-heo.github.io/oh-my-claudecode-website) | [爱可可-爱生活 on Weibo](https://weibo.com/)*

## Quick Start

```bash
# In Claude Code:
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode

# Or via npm:
npm i -g oh-my-claude-sisyphus@latest

# Setup:
/setup

# Build something:
autopilot: build a REST API for managing tasks
```

That's it. Everything else is automatic.

## Orchestration Modes

OMC's core strength: **multiple execution strategies** for different task types.

| Mode | What It Does | Best For |
|------|-------------|----------|
| **Team** (recommended) | Staged pipeline: `plan → prd → exec → verify → fix` | Coordinated multi-agent work with shared task list |
| **omc team (CLI)** | tmux workers — real `claude`/`codex`/`gemini` processes in split panes | Multi-model tasks; workers spawn on-demand, die when done |
| **ccg** | `/ask codex` + `/ask gemini`, Claude synthesizes | Mixed backend + UI work needing both Codex and Gemini perspectives |
| **Autopilot** | Single lead agent, autonomous execution | End-to-end feature work with minimal ceremony |
| **Ultrawork** | Maximum parallelism (non-team) | Burst parallel fixes/refactors |
| **Ralph** | Persistent mode with verify/fix loops | Tasks that must complete fully (no silent partials) |
| **Pipeline** | Sequential staged processing | Multi-step transformations with strict ordering |

### Team Mode Pipeline

```
team-plan → team-prd → team-exec → team-verify → team-fix (loop)
```

```bash
# Spawn 3 executor agents for parallel work
/team 3:executor "fix all TypeScript errors"

# Multi-model teams via CLI
omc team 2:codex "review auth module for security issues"
omc team 2:gemini "redesign UI components for accessibility"
omc team 1:claude "implement the payment flow"
```

## Magic Keywords

Natural language works fine, but power users get shortcuts:

| Keyword | Effect |
|---------|--------|
| `autopilot: <task>` | Full autonomous execution |
| `ralph: <task>` | Persistent mode (includes ultrawork) |
| `ulw <task>` | Maximum parallelism |
| `ralplan <task>` | Iterative planning consensus |
| `deep-interview "<idea>"` | Socratic requirements clarification |
| `deepsearch <query>` | Codebase-focused search routing |
| `ultrathink <topic>` | Deep reasoning mode |

## Key Features

### 32 Specialized Agents
Architecture, research, design, testing, data science — each agent has domain expertise. OMC routes to the right agent automatically.

### Smart Model Routing
Haiku for simple tasks, Opus for complex reasoning. Saves **30-50% on tokens** compared to always-Opus.

### Deep Interview
Not sure what to build? The Socratic interview mode exposes hidden assumptions before any code is written:

```bash
/deep-interview "I want to build a task management app"
```

Measures clarity across weighted dimensions, ensuring you know exactly what to build before execution begins.

### Custom Skills — Learn Once, Reuse Forever

OMC extracts debugging knowledge into portable skill files that auto-inject when relevant:

```markdown
# .omc/skills/fix-proxy-crash.md
---
name: Fix Proxy Crash
triggers: ["proxy", "aiohttp", "disconnected"]
---
Wrap handler at server.py:42 in try/except ClientDisconnectedError...
```

| Scope | Path | Shared With |
|-------|------|-------------|
| Project | `.omc/skills/` | Team (version-controlled) |
| User | `~/.omc/skills/` | All your projects |

### HUD Statusline
Real-time orchestration metrics in your terminal status bar — see what agents are doing, token usage, and execution state at a glance.

### Rate Limit Auto-Resume
```bash
omc wait --start   # Enable auto-resume daemon
```
Detects rate limits, waits for reset, auto-resumes your Claude Code session.

## Provider Advisor

Query any AI provider directly and save artifacts:

```bash
omc ask claude "review this migration plan"
omc ask codex --prompt "identify architecture risks"
omc ask gemini --prompt "propose UI polish ideas"
```

Results saved as markdown in `.omc/artifacts/ask/`.

## Notifications

Stop callbacks for Telegram, Discord, Slack — get tagged when sessions complete:

```bash
omc config-stop-callback telegram --enable --token <bot_token> --chat <chat_id>
omc config-stop-callback discord --enable --webhook <url>
```

## The Creator

**Yeachan Heo** ([@bellman_ych](https://x.com/bellman_ych)) — also created [oh-my-codex (OmX)](https://github.com/Yeachan-Heo/oh-my-codex) for OpenAI Codex. Both OMC and OmX were used to build the [Claw Code](https://github.com/instructkr/claw-code) clean-room rewrite of Claude Code's harness.

## Why This Matters

OMC represents the **orchestration layer thesis**: the value isn't in any single model, but in how you coordinate multiple models with specialized agents, persistent execution, and automatic quality verification. It's harness engineering packaged as a plugin.

| Without OMC | With OMC |
|-------------|----------|
| Single model, single task | Multiple models, parallel agents |
| Manual delegation | Automatic routing by task type |
| One-shot execution | Verify/fix loops until complete |
| Generic Claude | 32 specialized domain agents |
| Manual cost tracking | Smart model routing saves 30-50% |

## How LearnAI Team Could Use This

- **Parallel documentation work** — Split research, drafting, review, and polish across specialized agents while keeping a shared execution pipeline.
- **Course tooling experiments** — Prototype LearnAI teaching utilities with staged plan, implementation, verification, and fix loops.
- **Research/code review** — Ask Codex, Gemini, and Claude for separate reviews of the same codebase or paper, then synthesize findings.
- **Reusable team skills** — Capture recurring LearnAI workflows as `.omc/skills/` files for future agent reuse.
- **Long-running automation** — Use rate-limit resume and notifications for jobs that need to finish without constant terminal monitoring.

## Real-World Use Cases

- **Engineering teams** coordinating multi-agent implementation and verification work inside Claude Code.
- **Researchers** comparing model perspectives on code, experiments, or paper drafts.
- **Educators** building teaching demos, course infrastructure, and review materials with staged agent workflows.
- **Solo developers** using autopilot or Ralph mode for end-to-end feature work with verify/fix loops.
- **AI operations teams** standardizing reusable skills, provider routing, and completion notifications across projects.
