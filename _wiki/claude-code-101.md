---
title: "Claude Code 101 — Anthropic's Official Onboarding Course"
date: 2026-05-14
category: Learning Resources
tags: [claude-code, anthropic, anthropic-academy, beginner, course, free, certificate, claude-md, explore-plan-code-commit, mcp, subagents, skills, hooks]
related: ["Anthropic Academy — 13 Free AI Courses with Certificates", "Boris Cherny on Claude Code — Origin Story, Product Philosophy & the End of Manual Coding", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Domain Experts Shipping Products with Claude Code — Stories from the Trenches", "The Five Levels of Claude Code — From Prompting to Orchestration", "Codex Orange Book — 花叔's Bilingual Codex Reference"]
icon: "🎓"
image: "/assets/images/claude-code-101.png"
---

**Claude Code 101** is Anthropic's official, free, beginner course for Claude Code — the first stop for someone who has never used an AI coding agent. Hosted on [Anthropic Academy](https://anthropic.skilljar.com/) (Anthropic's learning platform, launched in 2026), it teaches the agentic loop, install paths, the **Explore → Plan → Code → Commit** workflow, and five customization areas — `CLAUDE.md`, subagents, skills, MCP, and hooks. Completion earns an official Anthropic certificate.

*Source: [Claude Code 101 (official)](https://anthropic.skilljar.com/claude-code-101) | [Anthropic Academy catalog](https://anthropic.skilljar.com/) | [Class Central listing](https://www.classcentral.com/course/anthropic-academy-claude-code-101-536158) | [Claude Code in Action (next course)](https://anthropic.skilljar.com/claude-code-in-action)*

## Who it's for

Per the official course page, Claude Code 101 is aimed at:

| Audience | Why this course fits |
|---|---|
| **New developers** entering software engineering | Skips assumed prior knowledge; assumes only basic CLI + editor familiarity |
| **Experienced engineers** who haven't tried AI coding agents | Frames the agentic loop and explains *why* coding agents differ from chat — the missing mental model |

**Prerequisites:** a [Claude](https://claude.com) account (Pro / Max / Enterprise) **or** a Claude API key for the hands-on exercises. Basic familiarity with the terminal and an editor. No prior AI-agent experience required.

**Account note:** the Academy is hosted on Skilljar, so you create a free Skilljar account to track progress and receive the certificate. Lessons are viewable through that account; the *interactive* exercises additionally need a working Claude plan or API key.

## Course structure (synthesized view)

The official curriculum has five top-level sections: *What is Claude Code?* · *Your first prompt* · *Daily workflows* · *Customizing Claude Code* · *Course quiz*. The diagram below regroups the lessons into four progressive phases plus the quiz — this grouping is my own synthesis, not an official structure.

```
┌────────────────────────────────────────────────────┐
│  PHASE 1: Understanding the Agentic Loop          │
│    • What is Claude Code?                          │
│    • How Claude Code works (context, tools,        │
│      permissions — the agentic loop)               │
└──────────────────────┬─────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────┐
│  PHASE 2: Getting Started                          │
│    • Install (terminal / VS Code / JetBrains /     │
│      Claude Desktop / web)                         │
│    • Your first prompt                             │
│    • Approval mode, auto-accept, Plan Mode         │
└──────────────────────┬─────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────┐
│  PHASE 3: Daily Workflows                          │
│    • Explore → Plan → Code → Commit                │
│    • Context management (/compact, /clear,         │
│      /context)                                     │
│    • Code review with Claude                       │
└──────────────────────┬─────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────┐
│  PHASE 4: Customizing Claude Code                  │
│    • The CLAUDE.md file (project memory)           │
│    • Subagents (delegate tasks to isolated agents) │
│    • Skills (reusable capabilities)                │
│    • MCP (external tools and data sources)         │
│    • Hooks (formatting, command blocking,          │
│      notifications — deterministic guardrails)     │
└──────────────────────┬─────────────────────────────┘
                       │
                       ▼
                ┌──────────────┐
                │ Course quiz  │
                │ → certificate│
                └──────────────┘
```

## What you'll be able to do afterward

By the end of the course, you should be able to:

- **Define** an AI coding agent and articulate how Claude Code differs from chat-based AI (it gathers context, takes actions, and verifies results inside your repo).
- **Install** Claude Code in your preferred environment — terminal, IDE plugin (VS Code / JetBrains), Claude Desktop, or the web.
- **Execute** the Explore → Plan → Code → Commit loop: break a task down, let Claude propose an approach, review the diff as it lands, commit cleanly.
- **Manage context** with the built-in slash commands (`/compact`, `/clear`, `/context`) so long sessions stay productive.
- **Write a CLAUDE.md** file so Claude remembers your project's conventions across sessions.
- **Compose** subagents, skills, MCP servers, and hooks to extend Claude Code for tasks you repeat.

## The Explore → Plan → Code → Commit rhythm

This is the pattern the *Daily workflows* section is built around — the one that most often changes how someone works on day one (my summary, not an official course claim):

```
┌─────────┐   ┌──────┐   ┌──────┐   ┌────────┐
│ Explore │ → │ Plan │ → │ Code │ → │ Commit │
└─────────┘   └──────┘   └──────┘   └────────┘
   read       propose      apply      land
   relevant   an           edits      changes
   files      approach     under      with a
              you can      review     clean
              critique                message
```

| Step | Claude does | You do |
|---|---|---|
| **Explore** | Reads files, greps the codebase, builds a mental model | Provide the task, point at relevant files if needed |
| **Plan** | Drafts a step-by-step approach (Plan Mode) | Approve, redirect, or rewrite the plan |
| **Code** | Applies edits, runs commands, shows diffs | Review each change; approve, modify, or revert |
| **Commit** | Drafts a commit message and runs git | Tweak the message; verify; push when ready |

The loop reframes agent use from "single prompt, hope for the best" into a repeatable rhythm with a critique point between each step.

## Suggested follow-up path

```
Claude 101  ─────►  Claude Code 101  ─────►  Claude Code in Action
(general)           (THIS ENTRY)             (21-lesson deep-dive)
                          │
                          ├──►  Introduction to Subagents
                          ├──►  Introduction to Agent Skills
                          ├──►  Intro to Model Context Protocol
                          └──►  MCP: Advanced Topics
```

If you only have a short window, do Claude Code 101 first. To go deeper afterward, **Claude Code in Action** is the natural next step — 21 lessons that practice the same workflow on more substantial codebases. The Subagents / Skills / MCP / Hooks micro-courses are best taken *after* 101, when each name already has a place to land. (Anthropic does not publish an official sequence; this ordering is a suggested path.)

## How LearnAI Team Could Use This

- **Mandatory onboarding** for any LearnAI team member who will touch Claude Code: assign 101 as the ramp-up before they pair on a real task. Lowers the "what do I even type?" friction to near-zero.
- **Faculty workshops** — even though faculty are not the official audience, the 4-phase summary (Loop / Install / Workflow / Customization) works well as a slide template. The phase boundaries are natural pauses for Q&A.
- **Course design for students** — adopt 101 as a prerequisite for any LearnAI course module that uses Claude Code. Free + certificate = easy to make a syllabus requirement.
- **Standardizing the CLAUDE.md story** — the course's CLAUDE.md lesson gives the team a shared vocabulary for project-memory files. Pair with the [Claude Code · CLAUDE.md Practices](/learnAIDoc/wiki/claude-code-context-claudemd-practices/) entry for the deeper how-to.

## Real-World Use Cases

| Scenario | Description |
|---|---|
| **First-time AI-agent users** | Engineer or faculty member who has only used Claude in chat — needs the agentic-loop mental model before doing anything with the CLI |
| **Onboarding new hires** | Replace ad-hoc "watch me use it" demos with a self-paced, certificate-bearing course your reports can finish before day one |
| **Curriculum integration** | Assign as week-1 reading in a CS-205 / CS-310 module; treat the completion certificate as a low-stakes participation grade |
| **Workshop kickoff** | Have attendees finish 101 the night before a half-day workshop, so the workshop itself can focus on real projects |

## Important things to know

- **Hands-on portions require Claude access** — Pro / Max / Enterprise plan **or** API key. Lessons themselves are viewable through your free Skilljar account; the *practice* exercises need a working agent.
- **Skilljar tracks your progress** — lesson completion, quiz scores, time spent, and the final certificate are all tied to your Skilljar account. If you want the certificate, finish the quiz from the same account you started in.
- **The course is not a YouTube playlist** — it's hosted on Skilljar with interactive quizzes and progress tracking. Community-uploaded YouTube mirrors of the video segments exist, but the official course (and the certificate) is on Anthropic Academy.
- **Updates are quiet** — Anthropic updates the course content as Claude Code itself evolves (skills, subagents, 1M-context, etc.), but there's no public changelog. Re-skim every 2–3 months if you're using the course as a teaching reference.
- **Companion deep-dives** in this wiki:
  - [Anthropic Academy — 13 Free AI Courses with Certificates](/learnAIDoc/wiki/anthropic-academy-free-courses/) — parent catalog
  - [Claude Code · CLAUDE.md Practices](/learnAIDoc/wiki/claude-code-context-claudemd-practices/) — Phase 4 deep-dive
  - [Boris Cherny on Claude Code Philosophy](/learnAIDoc/wiki/boris-cherny-claude-code-philosophy/) — *why* the workflow works
  - [Claude Code for Non-Programmers — Shipping Without Coding Background](/learnAIDoc/wiki/claude-code-non-programmers-shipping/) — the natural follow-up for non-engineers
  - [Five Levels of Claude Code Mastery](/learnAIDoc/wiki/claude-code-five-levels-mastery/) — what to learn *after* 101
