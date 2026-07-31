---
title: "AI Agent Book — Agent = Model + Context + Tools"
date: 2026-07-31
category: Learning Resources
tags: [ai-agent, agent-engineering, curriculum, context-engineering, tools, mcp, experiments, open-source]
related: ["AI Agent Primer — The Vocabulary Ladder and 18-Step Workflow", "What is Agentic Engineering? A Teaching Primer", "Agentic AI Engineer Roadmap 2026 — Eight Pillars from Prompt to Production", "AI Engineering from Scratch — Rohit Ghumare's 416-Lesson Math-to-MCP Curriculum", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure"]
icon: "📘"
image: "/assets/images/ai-agent-book-engineering-practice.png"
---

`bojieli/ai-agent-book` is an open-source Chinese book that teaches AI agents from first principles through engineering practice. Its core frame is simple enough for students to remember: **Agent = model + context + tools**. That makes it a useful backbone for LearnAI because it connects vocabulary, implementation, experiments, and evaluation in one place instead of treating "agents" as a bag of demos.

*Source: [GitHub — bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | [Online book](https://bojieli.github.io/ai-agent-book/) | July source screenshot: `IMG_2634.PNG`*

## Why this belongs in the wiki

Most agent resources start from tools: "install this framework, call this model, connect this MCP server." This book starts from a more teachable decomposition:

```text
Agent
  = Model      -> reasoning and decision-making
  + Context    -> instructions, memory, history, retrieved knowledge
  + Tools      -> actions against files, browsers, APIs, code, or the world
```

That is the right beginner mental model. If a student cannot tell whether a failure came from the model, the context, or the tool surface, they cannot debug an agent system.

## The learning path

The repository describes a 10-chapter path with runnable experiments. The exact project count and translations can change, so check the live README before assigning it, but the chapter structure is stable enough to be useful:

| Part | What students learn | Why it matters |
|---|---|---|
| Agent basics | What an agent is, why harness engineering matters | Prevents "agent = chatbot with tools" thinking |
| Context engineering | System prompts, KV cache, compression, skills | Shows why context design changes behavior |
| Memory and knowledge | User memory, RAG, structured knowledge | Separates durable memory from chat history |
| Tools and MCP | Tool categories, protocol design, asynchronous agents | Turns tool use into software architecture |
| Coding agents | Agents that can create or modify code | Makes "code as a meta-tool" concrete |
| Evaluation | Benchmarks, rubrics, statistical comparison | Teaches that agent quality must be measured |
| Post-training | SFT, RL, tool-use learning | Explains when prompting stops being enough |
| Evolution | Updating knowledge, instructions, programs, parameters | Shows how agents improve from traces |
| Multimodal / GUI / robotics | Voice, GUI, physical interaction | Expands agents beyond text |
| Multi-agent collaboration | Context sharing, isolation, coordination | Names the coordination problems early |

## How to use it with students

Use the book as a map, not as a single assigned reading block.

| Student level | Best starting point | Assignment idea |
|---|---|---|
| New to agents | Chapter 1 plus the learning suggestions page | Define model, context, and tools for three real agents |
| Knows Python | One runnable experiment from Chapters 1-4 | Run, modify, and explain what changed |
| Building projects | Tool/MCP and evaluation chapters | Add one typed tool and one proof-of-success check |
| Research-oriented | Evaluation, post-training, evolution chapters | Compare prompting vs. training vs. memory updates |

The key is to make every reading produce an artifact: a diagram, a small modified experiment, a failure analysis, or a design memo.

## LearnAI teaching pattern

This book pairs well with a "debug the layer" exercise:

```text
Observed failure
      |
      v
Is the model unable to reason? ---- yes -> change model/training/eval
      |
      no
      v
Is the context missing or noisy? -- yes -> change memory/retrieval/skills
      |
      no
      v
Is the tool interface weak? ------- yes -> change schema/sandbox/output
```

Students should learn that "the agent failed" is not a diagnosis. It is the start of one.

## Important things to know

- The original book is Chinese-first. Community translations are valuable but may lag the Chinese source.
- The experiments are the value. Reading without running anything turns the book into another conceptual overview.
- Treat API-provider setup sections as practical guidance, not as endorsement of a specific provider.
- Do not cite old screenshot numbers or star counts without rechecking the live repository.
- Use this as the conceptual spine alongside the [AI Agent Primer](/learnAIDoc/wiki/ai-agent-primer-ladder-workflow/) and [What is Agentic Engineering?](/learnAIDoc/wiki/what-is-agentic-engineering/) entries.

## How LearnAI Team Could Use This

- **First-week agent engineering reading** — assign the formula and chapter map before students touch any framework.
- **Shared vocabulary quiz** — ask students to classify every failure as model, context, tool, evaluation, or coordination.
- **Experiment lab** — each team chooses one chapter experiment, runs it, changes one variable, and reports what broke.
- **Curriculum scaffold** — use the 10-chapter structure as the high-level map for a semester agent-engineering module.

## Real-World Use Cases

| Scenario | Use |
|---|---|
| Course onboarding | Gives students one shared definition of agent systems |
| Faculty reading group | Provides a Chinese-first resource that is more practical than hype threads |
| Agent project review | Turns vague demos into layer-by-layer architecture review |
| Research assistant training | Helps new RAs see where memory, tools, and evaluation fit |
