---
title: "Seeing Like an Agent — How Anthropic Designs Tools for Claude Code"
date: 2026-04-17
category: Claude Code Engineering
tags: [claude-code, tool-design, agent-architecture, progressive-disclosure, anthropic, harness-engineering, askuserquestion, tasks]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Session Management & 1M Context — The Official Decision Framework"]
icon: "👁️"
image: "/assets/images/seeing-like-an-agent-tool-design.png"
---

Thariq Shihipar (Anthropic) revealed the internal design process behind Claude Code's tools — from three failed attempts at building AskUserQuestion, to replacing TodoWrite with the Task tool, to abandoning RAG in favor of agent-driven search. The core principle: **design tools shaped to the model's abilities, not your assumptions about them.** The only way to know what the model needs is to read its outputs, experiment, and learn to "see like an agent."

*Source: [Seeing like an agent: how we design tools in Claude Code](https://claude.com/blog/seeing-like-an-agent) (Anthropic, April 2026)*

## The Core Framework

Imagine you're solving a hard math problem. What tools do you want?

| Your skill level | Best tool | Tradeoff |
|---|---|---|
| Basic | Paper | Limited by manual calculations |
| Intermediate | Calculator | Need to know the advanced buttons |
| Expert | Computer + code | Most powerful, highest skill floor |

The same applies to AI agents. The tool should match the model's current capabilities — too simple constrains it, too complex confuses it. And as models improve, the right tool changes.

## Case Study 1: AskUserQuestion — Three Attempts

The goal: improve Claude's ability to ask users structured questions (elicitation).

### Attempt 1: Bolt it onto ExitPlanTool

Added a questions parameter to the existing ExitPlanTool. Failed because Claude got confused — is it outputting a plan or asking questions? What if answers contradict the plan?

### Attempt 2: Custom markdown format

Told Claude to output questions in a special markdown format (bullet points with bracketed options). Claude could usually produce it, but not reliably — it would append extra sentences, drop options, or abandon the structure.

### Attempt 3: Dedicated tool (winner)

Created a standalone AskUserQuestion tool that:
- Claude can call at any point (especially during plan mode)
- Shows a modal with structured options
- Blocks the agent loop until the user answers
- Works in the Agent SDK and with skills

**Why it worked:** Claude "liked calling this tool" and produced good outputs. The lesson: **even the best designed tool doesn't work if Claude doesn't understand how to call it.**

```
Attempt 1: Overload existing tool     → Model confused
Attempt 2: Custom output format       → Unreliable formatting
Attempt 3: Dedicated tool + modal UI  → Model uses it naturally ✓
```

## Case Study 2: TodoWrite → Task Tool

The evolution as models got smarter:

```
Early Claude Code:
  TodoWrite + system reminders every 5 turns
  → Model forgot what to do without reminders
  → Reminders made it stick rigidly to the list

Opus 4.5+:
  Task tool (replaced TodoWrite)
  → Tasks support dependencies
  → Subagents can coordinate on shared tasks
  → Model can alter and delete tasks (not just check them off)
```

**The key insight:** As model capabilities increase, tools that once helped start constraining. The TodoWrite reminders that kept early Claude on track made later Claude *too rigid* — it wouldn't adapt when the plan needed to change. The Task tool gives structure without rigidity.

## Case Study 3: RAG → Agent-Driven Search → Progressive Disclosure

The biggest shift in how Claude Code finds context:

| Phase | How context was built | Problem |
|---|---|---|
| **v1: RAG** | Vector DB pre-indexed the codebase; harness retrieved snippets | Fragile setup, Claude was *given* context passively |
| **v2: Grep tool** | Claude searches the codebase itself | Better — Claude builds its own context |
| **v3: Agent Skills** | Progressive disclosure — Claude reads skill files that reference other files recursively | Nested, layered context discovery |

> "Over the course of a year, Claude went from not really being able to build its own context to being able to do nested search across several layers of files to find the exact context it needed."

### Progressive Disclosure in Practice

Instead of frontloading all information in the system prompt (context rot), give Claude a pointer to where information lives and let it discover what it needs:

```
Bad:  System prompt with 50K tokens of documentation
      → Most tokens are irrelevant to the current task
      → Context rot degrades quality

Good: System prompt says "docs are in .claude/skills/"
      → Claude reads the index when needed
      → Follows references to specific files
      → Only loads what's relevant
```

## Case Study 4: The Claude Code Guide Subagent

Problem: Claude didn't know how to explain its own features (MCP setup, slash commands, etc.).

| Approach | Result |
|---|---|
| Put all docs in system prompt | Context rot — interfered with coding, which is the main job |
| Link to docs, let Claude read them | Worked, but Claude pulled huge doc chunks into context |
| **Subagent** — dedicated doc-search agent | Searches in its own context, returns only the answer |

The Guide subagent is progressive disclosure + context isolation. The main agent's context stays clean; the doc-searching noise stays in the child.

## Design Principles Summary

| Principle | What it means |
|---|---|
| **Shape tools to the model** | Match the tool's complexity to what the model can reliably use |
| **Read your outputs** | Watch what the model actually does with the tool — don't assume |
| **Revisit old tools** | As models improve, yesterday's help becomes today's constraint |
| **Progressive disclosure** | Don't frontload — let the model discover context as needed |
| **Minimize tool count** | Claude Code has ~20 tools. The bar to add a new one is high |
| **Prefer skills over tools** | Add functionality through discoverable files, not new tool definitions |

## The Math Problem Analogy (Applied)

```
Building an agent? Ask:

"If I were the model, and I had to solve this task,
 what tools would I want — given MY skill set?"

Not your skill set. The model's.
That's what "seeing like an agent" means.
```

## How LearnAI Team Could Use This

- **Agent SDK projects:** When students build agents in CS305, this framework teaches them to iterate on tool design — start simple, read outputs, evolve. The three AskUserQuestion attempts are a perfect teaching case.
- **CLAUDE.md engineering:** Progressive disclosure is exactly what Q's CLAUDE.md setup does — skills reference files that reference other files, building context on demand.
- **Harness engineering research:** This post is primary-source evidence for the harness engineering thesis — the model is only as good as its tools, and tool design is the bottleneck.
- **Plugin/skill development:** When building new skills for Claude Code, follow the "minimize tool count, maximize progressive disclosure" principle.

## Real-World Use Cases

| Scenario | Principle applied |
|---|---|
| Building a custom Claude Code skill | Shape to the model — test if Claude actually calls it reliably |
| Agent keeps ignoring your instructions | Read outputs — is the tool confusing the model? Simplify |
| Upgrading from Opus 4.6 to 4.7 | Revisit old tools — 4.7 reasons more, needs fewer rigid guides |
| Agent pulls too much context | Progressive disclosure — give pointers, not content |
| Adding a 21st tool to your agent | Minimize count — can you use a skill file instead? |
