---
title: "/goal 使用指南 — The Visual Playbook for Claude Code's Persistent Goal Mechanism"
date: 2026-05-19
category: Claude Code Engineering
tags: [claude-code, slash-goal, persistent-goals, codex, workflow, command-guide, agentic-engineering, visual-guide]
related: ["Beyond /goal — The Orchestrator + Headless Pattern for Long-Running Claude Sessions", "What is Agentic Engineering? A Teaching Primer", "Claude Code 101 — Anthropic's Official Onboarding Course", "Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "🎯"
image: "/assets/images/goal-command-usage-guide.png"
---

This entry is a **usage mechanics guide** for `/goal` in Claude Code — what it does, how to write good goals, and what commands exist. If you want to understand *why* `/goal` alone is insufficient for long-running agentic sessions and what to do instead, see the companion entry: **"Beyond /goal — The Orchestrator + Headless Pattern for Long-Running Claude Sessions."** That entry covers advanced architecture (orchestrator + headless worker, GitHub Projects integration, context-wall failures). This one starts from zero: you've just heard about `/goal`, you want to use it correctly, and you want concrete examples.

*Source: Weibo post by 无疆AI — "/goal 使用指南 — 不是普通快捷键，而是AI Agent的持续目标机制" (2026-05-18)*

## Not a keyboard shortcut — a persistent goal mechanism

Most people encounter `/goal` and treat it like a `/clear` or `/compact` — a convenience command. It isn't. `/goal` activates a **persistent goal loop**: you declare a completion condition, and Claude keeps planning and executing across turns until a separate evaluator model judges the condition satisfied. The agent doesn't stop between turns to wait for you; it loops.

This changes the fundamental collaboration model. Without `/goal`, every multi-turn interaction requires you to re-establish context. With `/goal`, the agent holds the target in memory and auto-sequences toward it. The shift is from "chat with an AI" to "assign a task to an agent."

## Comparison: without /goal vs. with /goal

| Dimension | Without `/goal` | With `/goal` |
|---|---|---|
| **Context across turns** | You re-explain the background each time | AI remembers the goal for the full session |
| **Multi-person collaboration** | Each new message needs re-orientation | AI carries the shared objective automatically |
| **Task sequencing** | You manually prompt each next step | AI auto-plans sub-steps toward completion |
| **Completion signal** | You decide when it's done | Evaluator model checks against your condition |
| **Efficiency** | Low — repeated overhead per turn | High — goal-driven continuous execution |

## The core formula

```
/goal [任务描述] [模型配置] [AI工具配置] [文件/目录]
```

Breaking it down:

```
┌──────────────────────────────────────────────────────────────────┐
│  /goal                                                           │
│         ├── 任务描述   → one-sentence completion condition        │
│         ├── 模型配置   → which model/tools to use (optional)     │
│         ├── AI工具配置 → MCP tools, subagents to enable          │
│         └── 文件/目录  → scope — files, dirs, repos to operate on│
└──────────────────────────────────────────────────────────────────┘
```

The single most important component is **任务描述** — the completion condition. The rest configures the machinery. A weak completion condition ("improve the code") produces a weak loop. A precise one ("all unit tests pass and no TypeScript errors remain in `src/auth/`") produces reliable, verifiable execution.

> **Key insight:** The real power is not `/goal` itself — it's whether you can clearly articulate the **完成标准** (completion criteria). The command is just a vessel; the clarity of your goal definition drives the quality of the result.

## Common commands

| Command | What it does |
|---|---|
| `/goal <目标>` | Set a new persistent goal; agent begins planning immediately |
| `/goal clear` | Clear the current goal; agent stops looping |
| `/pause` | Pause the current task without clearing the goal |

Note: `/pause` suspends execution but preserves the goal state — useful when you need to inspect intermediate output or intervene before continuing.

## Correct usage examples

### 1. Writing and document management

**Scenario:** You need to update a 20-page technical doc to reflect a new API.

```
/goal Update /docs/api-reference.md to reflect the v3 API changes in
     /src/api/routes.ts. All deprecated endpoints must be removed,
     new endpoints documented with examples, and no broken links.
```

When done, clear with `/goal clear document update` to signal completion explicitly. The agent will verify against the stated conditions before declaring done.

### 2. File management and verification

**Scenario:** Reorganize a messy project directory and verify the result.

```
/goal Reorganize /src/components/ by feature domain (auth, dashboard,
     settings). Move all files, update all import paths so the project
     builds without errors, and verify with `npm run build`.
```

The key here is appending a **verifiable action** (`npm run build`). Without a mechanical check, the evaluator can only read conversation — it can't inspect the filesystem. A build command gives it concrete pass/fail evidence.

### 3. Research and structured output

**Scenario:** You want Claude to research a topic and produce a structured summary.

```
/goal Research the current state of WebAssembly component model support
     across major runtimes (Node, Deno, Bun, browsers). Produce a
     comparison table in /notes/wasm-compat.md. Task is done when
     the table has at least 4 runtimes and cites primary sources.
```

This pattern works well for autonomous research because the completion condition is both **quantitative** (4 runtimes) and **qualitative** (primary sources) — the evaluator has something concrete to check.

### 4. Task tracking and subtask breakdown

**Scenario:** A large refactor with multiple sequential steps.

```
/goal Migrate AuthService from class-based to functional pattern across
     all files in /src/. Steps: (1) refactor AuthService.ts, (2) update
     all imports, (3) run tests, (4) fix any failures. Done when
     `npm test` exits 0 with no skipped tests.
```

Spelling out the sub-steps in the goal description is not required, but it helps the agent's planner sequence correctly — especially for tasks where order matters (refactor before import update, not after). The "done when" clause is non-negotiable.

## How LearnAI Team Could Use This

**Teaching students Claude Code workflows:** `/goal` is the best entry point for students who understand basic Claude Code but want to move beyond one-shot prompting. Assign a lab where students must write a `/goal` command for a real task, then evaluate whether their completion criteria are precise enough for the evaluator to catch failures. The exercise trains goal decomposition — a transferable engineering skill.

**CS-336 (Program Analysis for Security) context:** Security analysis tasks are a natural fit for `/goal`. A student running a taint analysis or looking for injection vulnerabilities across a codebase can set a goal like: "Analyze all functions in `/src/` for unsanitized user input that reaches SQL query construction. Output a findings report to `/analysis/taint-report.md`. Done when all `.ts` files have been checked." The agent runs the analysis across turns without losing the objective — ideal for the kind of long, systematic work CS-336 requires.

**Q as instructor:** Use `/goal` to demonstrate the difference between "chat-mode AI" and "agent-mode AI" in a single live demo. Set a goal with a weak completion condition, let it run and observe the mediocre result. Then set the same task with a tight completion condition. The contrast teaches students why **goal engineering** is a skill, not a shortcut.

## Real-World Use Cases

| Domain | Example `/goal` task | Why `/goal` helps |
|---|---|---|
| **Software engineering** | Migrate a test suite from Jest to Vitest; done when all tests pass | Multi-file changes that must be sequenced and verified |
| **Technical writing** | Update API docs to match new SDK; done when no deprecated methods remain | Long document with many interdependent edits |
| **Security analysis** | Audit all route handlers for missing auth middleware; output findings list | Systematic review that must cover every file |
| **Research synthesis** | Survey 5 papers on prompt injection; produce structured notes | Open-ended exploration with a defined deliverable |
| **DevOps** | Update all Dockerfiles to use Node 22 base image; done when `docker build` succeeds | Repetitive change across many files with a mechanical pass/fail check |
| **Education (students)** | Complete a lab assignment: implement BFS in TypeScript, pass provided test suite | Goal-driven coding practice with a clear completion signal |

## Important things to know

**The evaluator only reads the conversation.** The model that decides "is the goal done?" reads the transcript — it does not inspect files, run commands, or verify the repo state independently. This is why embedding a mechanical check (build, test, lint) in your completion condition is critical. If the only evidence of success is the agent's own claims in the conversation, the evaluator can be fooled.

**`/goal` shares one context window.** All planning, execution, and evaluation steps accumulate in the same conversation context. For short tasks (under ~30 minutes of agent work), this is fine. For longer runs, the context fills and accuracy drops — see "Beyond /goal — The Orchestrator + Headless Pattern" for the architectural fix.

**`/pause` is underused.** Most users never reach for it. But for any task where you want to validate intermediate output before the agent continues — a generated file, a migration checkpoint, a test run — `/pause` is the right tool. Resume when you're satisfied.

**Goal clarity compounds.** A vague goal produces vague work that requires vague evaluation. A precise goal — specific files, specific tools, specific pass/fail condition — produces auditable work. The quality ceiling of a `/goal` session is set at the moment you write the goal, not when the agent runs it.
