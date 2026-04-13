---
title: "Anthropic Managed Agents — Decoupling the Brain from the Hands"
date: 2026-04-13
category: AI Research
tags: [anthropic, agents, architecture, claude-code, infrastructure, open-source, api, systems-design]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "🧠"
image: "/assets/images/anthropic-managed-agents-architecture.png"
---

How do you build an AI agent system that can crash, restart, scale, and evolve — without losing work or leaking secrets? Anthropic's engineering team published their answer: **Managed Agents**, an architecture that splits the "brain" (Claude's reasoning loop) from the "hands" (code execution sandboxes) and the "session" (durable event log). The result: p50 latency dropped 60%, p95 dropped over 90%, and every component became replaceable. This is the systems design behind Claude's agent infrastructure.

*Source: [Anthropic Engineering Blog](https://www.anthropic.com/engineering/managed-agents) (Apr 8, 2026) | [Managed Agents API Docs](https://platform.claude.com/docs/en/managed-agents/overview) | [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python)*

## The Core Problem: "Pet" Containers

The old architecture put everything — Claude's reasoning, tool execution, conversation state — in a single container connected via WebSocket. Each container was a "pet": if it died, the session was lost. If it was slow, you nursed it back to health. Debugging was impossible because container failures, network drops, and harness bugs all looked the same through the WebSocket event stream.

## The Architecture: Brain / Hands / Session

```
┌─────────────────────────────────────────────────────┐
│                   MANAGED AGENTS                     │
│                                                      │
│  ┌──────────┐    ┌──────────────┐    ┌───────────┐  │
│  │  BRAIN   │    │    HANDS     │    │  SESSION   │  │
│  │          │    │              │    │            │  │
│  │ Claude + │───>│  Sandboxes   │    │ Append-only│  │
│  │ Harness  │    │  MCP servers │    │ event log  │  │
│  │ (stateless)│<──│  Custom tools│    │ (durable)  │  │
│  └──────────┘    └──────────────┘    └───────────┘  │
│       │                │                   │         │
│       │   execute()    │     emitEvent()   │         │
│       └────────────────┘───────────────────┘         │
└─────────────────────────────────────────────────────┘
```

| Component | What It Is | Key Property |
|-----------|-----------|--------------|
| **Brain** | Claude + harness loop | Stateless — can crash and be replaced |
| **Hands** | Sandboxes, containers, MCP servers, tools | Interchangeable — `execute(name, input) → string` |
| **Session** | Append-only event log | Durable — survives any crash, queryable |

### The `execute()` Interface

The genius is in the simplicity:

```
execute(name, input) → string
```

A name and input go in, a string comes out. The brain doesn't care if it's talking to a Docker container, an MCP server, or a custom API. Just like the OS `read()` command doesn't care if it's reading from a 1970s disk pack or a modern SSD.

### Crash Recovery

```
Container crashes
       ↓
New harness boots → wake(sessionId) → getSession(id) → resume from last event
       ↓
No work lost. No user impact.
```

The session log is the single source of truth. When anything crashes, a new instance boots, retrieves the log, and continues. All components are "cattle, not pets" — replaceable, restartable, disposable.

### Security Model

Credentials never enter the sandbox:

| Resource | How It Works |
|----------|-------------|
| **Git repos** | Tokens clone repos during init, wired into local remotes. Agent pushes/pulls without seeing tokens. |
| **External APIs** | Tokens in encrypted vault. Claude calls MCP tools via proxy → proxy fetches credentials → makes external call. |

The code Claude generates and executes can never access real secrets. Even if the sandbox is compromised, there's nothing to steal.

## Performance Gains

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **p50 latency (TTFT)** | Baseline | ~40% of baseline | **60% reduction** |
| **p95 latency (TTFT)** | Baseline | ~10% of baseline | **>90% reduction** |

The improvement comes from **lazy container provisioning** — inference starts immediately from the session log. Containers spin up in the background while Claude is already thinking.

## The API

```python
import anthropic

client = anthropic.Anthropic()

# Create an agent (once)
agent = client.beta.agents.create(
    name="Code Review Agent",
    model="claude-opus-4-6",
    system="You are an expert code reviewer...",
    tool_choice={"type": "agent_toolset", "version": "20260401"}
)

# Create a session (per task)
session = client.beta.sessions.create(
    agent_id=agent.id,
    environment_id=env.id
)

# Stream results
with client.beta.sessions.stream(session.id) as stream:
    for event in stream:
        print(event.delta.text)
```

**Pricing:** $0.08/session-hour (active execution only) + standard Claude token rates. A 30-minute task costs ~$0.04 in runtime.

## Managed Agents vs. Agent SDK

| | Managed Agents (API) | Agent SDK (Library) |
|---|---|---|
| **You manage** | Nothing — Anthropic handles infra | Your own deployment |
| **Best for** | Async tasks, no-DevOps teams, long-running work | Custom agent loops, self-hosted, fine-grained control |
| **Crash recovery** | Built-in | You implement it |
| **Sandbox security** | Built-in | You implement it |
| **Cost** | $0.08/hr + tokens | Just tokens (your compute) |

## How LearnAI Team Could Use This

### For Teaching
- **Automated assignment review** — Create a "Code Review Agent" that students submit code to. The agent runs in a managed sandbox, executes tests, reviews style, and returns feedback — all without managing any infrastructure.
- **Interactive lab environments** — Each student gets a session with a coding agent that can execute code safely in a sandbox. No server setup, no container management.
- **Office hours bot** — A managed agent with the course syllabus, textbook, and past lecture notes as context. Students ask questions anytime, the agent responds with source-grounded answers.

### For Research
- **Long-running analysis agents** — Research tasks that take hours (literature review, data processing) run as managed sessions. If anything crashes, work resumes automatically.
- **Multi-agent research workflows** — Use the orchestration preview to coordinate agents: one searches papers, one extracts data, one synthesizes findings.
- **Reproducible experiments** — Every agent session is a durable event log. Share the session ID and anyone can replay the exact sequence of reasoning and actions.

### For the LAI Project
- **Wiki content agents** — Agents that monitor new papers/tools, draft wiki entries, and queue them for review. Run on a schedule, crash-resilient.
- **Student project scaffolding** — An agent that takes a project spec and generates starter code, tests, and documentation in a managed sandbox — students get a working starting point.

## Real-World Use Cases

1. **CI/CD code review** — Companies run managed agents on every PR. The agent checks out the code in a sandbox, runs tests, reviews for security issues, and posts comments — all without access to production credentials.
2. **Customer support automation** — Agents that access internal knowledge bases via MCP, resolve tickets, and escalate to humans when confidence is low. Session logs provide full audit trail.
3. **Data pipeline debugging** — When a data pipeline fails, a managed agent gets the logs, spins up a sandbox with the pipeline code, reproduces the issue, and suggests fixes.
4. **Research replication** — Academic teams use managed agents to replicate paper results: the agent reads the paper, writes code, executes experiments in a sandbox, and compares results.

## The OS Analogy

The blog post draws a deliberate parallel to operating system design. Just as Unix's `read()` abstracts away storage hardware, `execute()` abstracts away tool implementation. Just as processes are isolated from each other, brain and hands are isolated. And just as the filesystem persists beyond any process lifetime, the session log persists beyond any container lifetime.

This isn't just agent infrastructure — it's the beginning of an **operating system for AI agents**. The "meta-harness" that doesn't assume what future harness needs will be, only that the brain needs to operate, the hands need to execute, and the session needs to survive.
