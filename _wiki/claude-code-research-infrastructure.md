---
title: "Claude Code as Research Infrastructure — From Chatbot to AI Research Team"
date: 2026-03-24
category: Claude Code
tags: [claude-code, research, multi-agent, academic, claude-md, skills, personas]
related: ["Claude Code: Agent Teams vs Subagents", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "The Five Levels of Claude Code — From Prompting to Orchestration", "Claude-Prism — Local-First Academic Writing Workspace with AI"]
icon: "🔬"
image: "/assets/images/claude-code-research-infrastructure.png"
---

Stop using AI as a chatbot. Start building it into your **research infrastructure**. A presentation from a researcher showed how Claude Code transforms from a conversation partner into a persistent, multi-agent research system: CLAUDE.md as project memory, Skills as domain expert specializations, and parallel AI agent teams that turn a single researcher into the **coordinator of an AI intelligence squad**.

*Source: [ClaudeCodeTools Presentation (PDF)](https://github.com/aspi6246/ClaudeCodeTools/blob/main/Presentations/main.pdf) | [爱可可-爱生活 Weibo analysis](https://weibo.com)*

## The Three Layers

```
Layer 3: AI Intelligence Team
  Multiple agents working in parallel
  Researcher = coordinator, not executor
         ↑
Layer 2: Domain Expert Personas
  Skills, Commands, Personas
  "Reviewer #2", "Editor", "Stats Checker"
         ↑
Layer 1: Persistent Project Memory
  CLAUDE.md = project manual
  Goals, decisions, data locations, code standards
```

### Layer 1: CLAUDE.md as Research Memory

Every time Claude Code starts, it reads CLAUDE.md — your project's **persistent, editable memory**:

| What CLAUDE.md Stores | Why It Matters |
|----------------------|----------------|
| Project goals & hypotheses | AI understands *why*, not just *what* |
| Key decisions made | No re-explaining past choices |
| Data file locations | Direct access to your datasets |
| Code standards & conventions | Consistent output across sessions |
| Current progress & open questions | Picks up where you left off |

Without CLAUDE.md, AI is a **forgetful goldfish** — brilliant but amnesiac. With it, AI becomes a colleague who **remembers everything about your project**.

### Layer 2: Domain Expert Personas

Through Skills, Commands, and Personas, you can weaponize Claude as different specialists:

| Persona | What It Does |
|---------|-------------|
| **"Reviewer #2"** | The harshest, most meticulous critic — scrutinizes your code, logic, and methodology with the rigor of a hostile peer reviewer |
| **"Editor"** | Polishes awkward prose into flowing, readable academic writing |
| **"Stats Checker"** | Validates statistical methods, checks assumptions, flags p-hacking risks |
| **"Literature Scout"** | Finds related work, identifies gaps, suggests citations |
| **"Viz Designer"** | Creates publication-quality figures from your data |

You're not asking Claude to "be" these people — you're loading **specific instruction sets** that activate different reasoning modes and quality standards.

### Layer 3: AI Intelligence Team

The most powerful concept: **launch multiple independent AI agents simultaneously**, each handling a different research task:

```
                 ┌─────────────┐
                 │ Researcher  │
                 │(Coordinator)│
                 └──────┬──────┘
          ┌──────┬──────┼──────┬──────┐
          ▼      ▼      ▼      ▼      ▼
       ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐
       │Code ││Data ││Stats││Lit  ││Result│
       │Audit││ Viz ││Check││Review││Report│
       └─────┘└─────┘└─────┘└─────┘└─────┘
          │      │      │      │      │
          └──────┴──────┼──────┴──────┘
                        ▼
                 Consolidated Output
```

Each agent works in its own context (isolated worktree), produces results, and the researcher consolidates. **Humans shift from executors to managers of AI teams.**

## The Research Workflow Revolution

| Traditional Research | AI-Augmented Research |
|---------------------|----------------------|
| Manually clean data | Agent reads data directly, runs cleanup scripts |
| Print-statement debugging | Agent runs code by your rules, finds bugs |
| Half a day on one slide | Viz agent generates publication figures |
| Week-long literature review | Literature agent scans and synthesizes in hours |
| Solo peer-review prep | "Reviewer #2" attacks your paper before submission |

## The Uncomfortable Question

The article ends with a provocation:

> "If experimental validation costs, data visualization costs, and literature review costs all approach zero — how much meaning is left in our 8-hour daily 'brick-laying'?"

This isn't about replacement. It's about **reallocation**: when AI handles the mechanical research tasks, what do researchers spend their freed time on? The answer should be: thinking harder, asking better questions, and doing the creative work that AI can't.

## Getting Started

1. **Create a CLAUDE.md** for your research project — document goals, data locations, conventions
2. **Build 2-3 personas** — start with "Reviewer #2" and "Editor"
3. **Try one parallel session** — run a literature search agent while you work on analysis
4. **Iterate** — update CLAUDE.md as your project evolves

Resources: [ClaudeCodeTools Presentation (PDF)](https://github.com/aspi6246/ClaudeCodeTools/blob/main/Presentations/main.pdf)
