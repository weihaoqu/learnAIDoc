---
title: "leader — Turn Vague Ideas Into /goal-Ready Agent Task Briefs"
date: 2026-08-06
category: Skills & Plugins
tags: [agent-skills, slash-goal, task-briefs, spec-driven, claude-code, codex, autonomous-agents, anti-cheating]
related: ["/goal 使用指南 — The Visual Playbook for Claude Code's Persistent Goal Mechanism", "Using /goal for Wiki Management — Spec-Driven Autonomous Wiki Sessions", "project-spec-interviewer-skill — Interactive Terminal Interview That Writes Your spec.md", "SpecOps — Spec-Driven Development with AI Coding Agents", "grill-me — When AI Interviews You Before Writing Code", "Ponytail — The Anti-Overengineering Skill for Coding Agents"]
icon: "🧭"
---

`leader` is an agent skill by **KKKKhazix** that turns a vague idea into a task brief an autonomous agent can actually run. Its core premise is simple: before you put an agent in charge, write the job like a manager who will not be available for follow-up questions.

The output is meant to be pasted into `/goal` or sent directly to an execution agent. It defines why the work matters, what "done" means, what evidence proves completion, what boundaries the agent must not cross, and what counts as cheating.

*Source: [skills.sh — kkkkhazix/khazix-skills@leader](https://skills.sh/kkkkhazix/khazix-skills/leader) | [GitHub source](https://github.com/KKKKhazix/khazix-skills/tree/main/leader) | [Raw SKILL.md](https://raw.githubusercontent.com/KKKKhazix/khazix-skills/main/leader/SKILL.md)*

## The mental model

The skill separates an agentic workflow into three roles:

| Role | Responsibility |
|---|---|
| **Leader** | Gives the intention and makes tradeoff decisions |
| **Manager** | Investigates the repo or domain, asks only necessary questions, writes the brief, and later verifies the result |
| **Executor** | Receives the brief and runs the task without assuming the leader is present |

That distinction matters. Most bad agent runs fail before execution starts: the task is vague, the finish line is soft, or the agent can satisfy the literal wording while violating the real intent.

## Seven questions for teaching it

A useful way to teach this skill is to translate its task-brief rules into seven questions:

| Question | What it prevents |
|---|---|
| **Why** | The agent optimizes a local action while missing the real outcome |
| **Done** | "I improved it" reports with no objective completion state |
| **Proof** | Self-reported success without commands, artifacts, or reproducible evidence |
| **Anti** | Fake success through skipped tests, weaker assertions, mocks, deleted checks, or `|| true` |
| **Bounds** | Scope creep, unrelated refactors, unsafe deletes, or surprise dependency changes |
| **Trade** | The agent making hidden tradeoffs when requirements conflict |
| **Unknown** | Hallucinated facts, invented commands, or silent blocking conditions |

For students, this is a compact requirements-engineering lesson. A useful agent prompt is not just an instruction. It is a contract.

## What the skill adds beyond a normal prompt

`leader` is stricter than a typical "write me a plan" prompt:

- It tells the assistant to inspect the codebase before asking questions when a repo exists.
- It limits questions to at most five, and only asks questions that change the task brief.
- It separates **execution tasks** from **exploration tasks** such as research, selection, or feasibility checks.
- It requires `PROGRESS.md` for resumability and `BLOCKED.md` for decisions the executor cannot safely make.
- It freezes acceptance criteria so the executor cannot make the test easier after starting.
- It requires anti-cheating rules for common agent shortcuts: skipped tests, loosened assertions, mocked targets, deleted tests, lowered thresholds, changed validators, or shell tricks that turn failure into success.

A strong management pattern in the skill is separating executor-visible checks from manager-held spot checks. The execution agent can run the visible checks, but the manager still verifies the result afterward.

## Install

For Q's local environment, I installed the skill from the GitHub source into both user-level targets:

```text
~/.codex/skills/leader
~/.claude/skills/leader
```

The direct GitHub-folder install command used for Codex was:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo KKKKhazix/khazix-skills \
  --path leader
```

For Claude Code's skill folder, I used the same source with a different destination:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo KKKKhazix/khazix-skills \
  --path leader \
  --dest ~/.claude/skills
```

The public Skills CLI lists it as:

```bash
npx skills add kkkkhazix/khazix-skills@leader -g
```

## How to use it

Ask the assistant to use `leader` before launching a long agent task:

```text
Use the leader skill.
Turn this idea into a /goal-ready task brief:

I want to simplify the LearnAI wiki. Keep the best student-facing posts,
merge duplicates, remove thin/outdated entries, update the index, verify
the site builds, commit locally, and pause before push.
```

A good output should be one pasteable brief, not a long planning essay. It should include:

- why the task exists
- what the executor may edit
- what the executor must not edit
- task zero for baseline checks
- mechanical verification commands
- anti-cheating rules
- `PROGRESS.md` and `BLOCKED.md` behavior
- hard completion criteria

## Where it fits in LearnAI

This skill should sit between the existing spec and `/goal` workflow pages:

```text
idea
  -> leader skill turns it into an executor brief
  -> /goal runs the brief
  -> LearnAI manager verifies visible checks plus hidden spot checks
  -> commit locally or ask for correction
```

It complements **project-spec-interviewer-skill**. The interviewer is better when a human needs help discovering requirements. `leader` is better when an agent manager already has enough context and needs to package the job for another agent.

## Caveats

- The skill is opinionated; translate the output style if the execution agent or class expects a different language or tone.
- It can make small tasks feel too heavy. Use it for multi-step work, not one-line edits.
- The "hidden spot check" idea is useful for management, but do not use it to create adversarial traps in student assignments unless the grading policy says so.
- A brief is only as good as the source facts. If the manager does not actually inspect the repo or source material, the executor will faithfully run the wrong task.

## Best LearnAI use

Use `leader` to teach **goal engineering**: turning intent into a bounded, verifiable job. Students should compare a vague prompt with a `leader`-style task brief and ask which one gives the agent less room to fake success.
