---
title: "SkillsMP — Map the Agent Skills Ecosystem Before You Install"
date: 2026-07-31
category: Skills & Plugins
tags: [skillsmp, skills, skill-discovery, skill-map, codex, claude-code, agent-skills, github, safety]
related: ["Personal AI Skill Cheat Sheet — When to Use Each Skill", "How Anthropic Uses Skills — Thariq's 9-Category Framework & the Gotchas Pattern", "Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits", "Matt Pocock's Skills — Claude Code for Real Engineers", "Addy Osmani's agent-skills — Senior Engineering Practices as SKILL.md Files"]
icon: "🧭"
image: "/assets/images/skillsmp-agent-skills-marketplace.png"
---

**SkillsMP** is an independent community map of public `SKILL.md` files across GitHub. Its value is not that every listed skill is good; it is that the skill ecosystem has grown too large to browse manually. SkillsMP gives students a way to search by occupation, creator, repository, and category before deciding what is worth opening, copying, or installing.

*Source: [SkillsMP](https://skillsmp.com/) | [About SkillsMP](https://skillsmp.com/about) | [OpenAI: Build skills](https://developers.openai.com/codex/build-skills)*

## The Problem

Skills started as small local playbooks. That scale is manageable:

```text
~/.codex/skills/
~/.claude/skills/
repo/.agents/skills/
```

SkillsMP says it indexes 2M+ public skills, so discovery becomes its own problem:

| Without a map | What goes wrong |
|---|---|
| Search GitHub manually | You find popular repos, not necessarily relevant workflows |
| Install from a screenshot | You skip source review and inherit unknown assumptions |
| Trust star counts | A popular skill may still be unsafe, stale, or irrelevant |
| Keep adding skills | Overlapping descriptions make routing worse |

SkillsMP's useful move is to treat skills as an ecosystem to inspect before installing.

## What SkillsMP Maps

The current site describes three discovery paths:

| Path | Use it for |
|---|---|
| Occupations | Learn what workflows different fields are encoding as skills |
| Creators | See which people or teams maintain related skill sets |
| Repositories | Follow a skill back to GitHub before trusting it |

The "occupation" view is especially useful for teaching. It turns skills from a random plugin list into a question: **what parts of real work are people trying to proceduralize for agents?**

## How To Evaluate A Skill Before Installing

Use this checklist before adding any third-party skill to Codex, Claude Code, or another agent:

| Check | Question |
|---|---|
| Trigger clarity | Does the `description` say exactly when the skill should run? |
| Scope | Is it one workflow, or a vague mega-skill? |
| Source quality | Is the GitHub repo active? Are issues and docs coherent? |
| Commands | Does it tell the agent to run shell commands? Which ones? |
| Permissions | Does it touch files, credentials, browsers, MCP servers, hooks, or external APIs? |
| Dependencies | Does it assume Node, Python, Playwright, cloud CLIs, API keys, or paid services? |
| Safety | Does it include verification, rollback, and "ask before destructive action" rules? |
| Overlap | Do you already have a skill that triggers on the same work? |

This is the same discipline as installing npm packages or browser extensions: search is not trust.

## Why This Matters For Codex And Claude Code

OpenAI's skill docs describe a skill as a directory with a `SKILL.md` file plus optional `scripts/`, `references/`, `assets/`, and other supporting files. OpenAI's docs say `name` and `description` are required, and the description helps guide implicit invocation before the full skill is loaded.

That means a marketplace cannot be only a download button. It needs to answer:

```text
What task does this skill handle?
When should it trigger?
What files/scripts does it carry?
What external tools does it assume?
Who maintains it?
What should I read before trusting it?
```

SkillsMP is useful when it sends you back to the source with better context.

## Student Exercise: Skill Triage Lab

Give students one task, such as "build a rubric-based code review workflow." Then ask them to find three candidate skills through SkillsMP and score them:

| Score area | What students inspect |
|---|---|
| Fit | Does the skill actually match the task? |
| Safety | Can it alter files or run commands? |
| Maintainability | Is the repo active and understandable? |
| Trigger design | Would the agent know when to use it? |
| Reuse | Would you install it, fork it, or write your own? |

The deliverable is not "install the best one." The deliverable is a short technical judgment memo.

## How LearnAI Team Could Use This

- **Skill scouting** — use SkillsMP as a first-pass map, then inspect GitHub sources manually.
- **Curriculum examples** — show students how different occupations translate work into agent procedures.
- **Personal skill-stack cleanup** — compare Q's installed skills with public alternatives and remove overlap.
- **Research question generator** — use occupation/category browsing to study what people think can become agent-executable work.

## Real-World Use Cases

| Scenario | Use |
|---|---|
| New project setup | Find candidate skills, then inspect their source before installing |
| Course assignment | Students compare three public skills and defend one install/fork/write decision |
| Team automation | Browse creators/repos to see how mature teams organize skill collections |
| Safety review | Identify skills that add hooks, scripts, or external service dependencies |
| Skill authoring | Study examples before writing a smaller, cleaner local skill |

## Important Things To Know

- **SkillsMP is independent.** Its about page says it is not affiliated with Anthropic or OpenAI.
- **Indexing is not endorsement.** A listed skill can be stale, unsafe, or low quality.
- **Always inspect source before install.** Read `SKILL.md`, scripts, hooks, dependencies, and repo activity.
- **Prefer fewer high-quality skills.** A bloated skill catalog can make routing worse because descriptions overlap.
- **Use marketplaces to learn patterns, not to outsource judgment.** The best outcome may be writing a local skill tailored to your course or repo.
