---
title: "Claude Code 必装/进阶十大 Skill — A Community-Curated Map of 20 Power Skills"
date: 2026-05-19
category: Skills & Plugins
tags: [claude-code, skills, curated, superpowers, oh-my-claudecode, community, skill-collection, workflow, productivity]
related: ["Matt Pocock's Claude Code Skills — Real-World Workflow Automation for Engineers", "Anthropic Academy — 13 Free Claude Courses, 12-Week Roadmap", "Beyond /goal — The Orchestrator + Headless Pattern for Long-Running Claude Sessions", "What is Agentic Engineering? A Teaching Primer", "grill-me — When AI Interviews You Before Writing Code"]
icon: "🧰"
image: "/assets/images/claude-code-top-20-skills-curated.png"
---

The Claude Code skill ecosystem has grown to hundreds of community-contributed skills, and the signal-to-noise problem is real. Which ones are actually worth installing? A two-part Weibo post by AI educator @AI学姐小星 cuts through the noise with a curated list of twenty: ten you should install on day one, and ten for when you're ready to go deeper. This entry maps the full list and explains why each one matters.

*Source: Two-part post (slides 1/4 and 2/4) by [@AI学姐小星](https://weibo.com) on Weibo, tagged #Claude #AI工具 #工具*

## The 10 Essential Skills (必装十大)

These are the baseline skills that change how Claude Code feels to use — spanning planning, code quality, UI review, and extensibility. If you're setting up Claude Code for the first time, start here.

| # | Skill | What It Does |
|---|-------|--------------|
| 1 | **Planning with Files** | Turns open-ended writing or coding tasks into structured file-based plans so Claude always knows what the next step is — keeps long sessions on track |
| 2 | **Superpowers** | A suite of Claude Code-specific skills curated as a single pack (14 skills in v5, including brainstorming, TDD, systematic-debugging, and subagent-driven-development); the brainstorming and TDD variants are the standout entries |
| 3 | **Code Review** | Spins up parallel AI agent reviewers with confidence filtering so you get higher-signal review comments and fewer redundant pings |
| 4 | **Webapp Testing** | Playwright-powered browser test harness; turns "run the test suite" into a single repeatable baseline command |
| 5 | **Code Simplifier** | Scans changed code for unnecessary complexity and restructures it — useful after any major feature push |
| 6 | **UI UX Pro Max** | 99 UX guidelines, 50 styles, 97 color palettes, 57 font pairings, and 25 chart types across 9 technology stacks packed into a single reviewable skill; covers accessibility, clarity, and responsible UI patterns |
| 7 | **MCP Builder** | Generates a working MCP (Model Context Protocol) server from a description without requiring an internet connection during build |
| 8 | **Ralph Loop** | Runs Claude in a continuous hook-driven loop — Claude calls tools, observes the result, and self-corrects until the task is complete |
| 9 | **PPTX** | Generates real `.pptx` files directly, bypassing the limitations of generating slide content as Markdown or HTML |
| 10 | **Skill Creator** | The official skill authoring workflow — includes eval test scaffolding so new skills are testable from the moment they're written |

## The 10 Advanced Skills (进阶十大)

These skills assume you're past the setup phase and working on non-trivial codebases or complex multi-step workflows. Each addresses a specific pain point in the professional development lifecycle. **Note:** The names in this section are the curator's descriptive labels — they could not be independently verified as installable skill names in public registries. Use them as a conceptual map of useful capabilities and verify availability before installing.

| # | Skill | What It Does |
|---|-------|--------------|
| 1 | **Context Pack** | Bundles requirements, constraints, and interface definitions into a single structured handoff so nothing gets lost when handing off between sessions or agents |
| 2 | **Repo Cartographer** | Auto-generates a navigable map of an unfamiliar codebase — entry points, key modules, dependency graph — without you having to read every file |
| 3 | **Test Pilot** | Unified harness for unit tests and integration tests; run both with one command and get a coherent pass/fail report |
| 4 | **Debug Radar** | Structures bug investigation: reproduction steps, behavior patterns, search strategy — turns vague "it's broken" reports into actionable diagnoses |
| 5 | **Refactor Lens** | Guides incremental refactoring with behavior-preservation checks at each step, so the codebase improves without unexpected regressions |
| 6 | **API Stitcher** | Wires together API endpoints, fills in missing types, and strengthens interface boundaries — useful when integrating third-party services |
| 7 | **Migration Buddy** | Manages safe data or dependency migrations with parallel testing — migrate incrementally and verify each slice before proceeding |
| 8 | **Docs Whisperer** | Generates READMEs, inline comments, and structured documentation from existing code and test evidence |
| 9 | **Prompt Harness** | Iteratively optimizes prompts against a fixed test set — systematic prompt engineering rather than ad-hoc tweaking |
| 10 | **Ship Checklist** | Runs a pre-release checklist automatically before any deploy: tests, lint, security surface, changelog — the things that slip through when you're in a hurry |

## How to Read This List

This is a **navigation map**, not a specification. The curator's intent is to help you prioritize, not to describe every implementation detail of each skill. A few framings that help:

**By role.** If you're primarily writing and planning, start with Planning with Files, Superpowers, and Context Pack. If you're primarily a developer, Code Review + Webapp Testing + Refactor Lens are the high-leverage picks. If you're building AI tools themselves, MCP Builder + Skill Creator + Prompt Harness form a natural trio.

**By experience level.** The Essential 10 are roughly ordered: the first five change everyday behavior immediately; 6–10 target specific pain points you'll hit as you go deeper. The Advanced 10 assume you're comfortable with Claude Code's agentic loop and want more control over complex workflows.

**By install cost.** Skills vary in how much configuration they need. Some (like Superpowers) are drop-in. Others (like Ralph Loop or MCP Builder) may require reading a README before they click. Start with the low-friction ones and add complexity as you need it.

**What this list doesn't tell you:** exact install commands, version compatibility, or how a skill behaves on edge cases. For that, check each skill's own documentation or the oh-my-claudecode marketplace. The value here is the curation — knowing which 20 out of hundreds are worth your attention.

## How LearnAI Team Could Use This

- **First-day setup guide.** For students encountering Claude Code for the first time, this list is a practical answer to "what do I actually install?" Point them to the Essential 10 and let them pick 3–5 that match their immediate project.
- **Role-based curriculum tracks.** Use this list to differentiate skill recommendations by student role: researchers get Context Pack + Docs Whisperer + Prompt Harness; developers get Code Review + Webapp Testing + Refactor Lens; tool builders get MCP Builder + Skill Creator + Ralph Loop. Teaching students to self-select tools is itself a meta-skill.
- **Skill design assignment.** After walking through the list, have students pick one missing skill they wish existed and draft a one-page spec using the Skill Creator workflow. This builds intuition for what makes a skill genuinely useful versus novelty.
- **Comparative analysis exercise.** Pick two skills that overlap (e.g., Code Simplifier vs. Refactor Lens) and have students articulate when you'd use each. This sharpens mental models of tool scope and forces precise thinking about agentic workflows.

## Real-World Use Cases

| Scenario | Skills That Apply |
|----------|-----------------|
| Starting a new greenfield project | Planning with Files, Superpowers, Skill Creator |
| Onboarding to an unfamiliar codebase | Repo Cartographer, Context Pack, Debug Radar |
| Preparing a production release | Ship Checklist, Webapp Testing, Code Review |
| Building an internal MCP tool | MCP Builder, API Stitcher, Docs Whisperer |
| Improving a messy legacy module | Refactor Lens, Code Simplifier, Test Pilot |
| Giving a team-wide AI tools workshop | UI UX Pro Max, Superpowers, Skill Creator |
| Running a long autonomous session | Ralph Loop, Beyond /goal pattern, Context Pack |
| Optimizing a prompt-heavy pipeline | Prompt Harness, Debug Radar, Context Pack |

## Important Things to Know

**This is a community list, not official documentation.** The source is a community educator's curation post, not Anthropic's official skill rankings. The Essential 10 includes skills that are verifiably installable (Superpowers, oh-my-claudecode's ralph, ui-ux-pro-max, pptx). The Advanced 10 names (Repo Cartographer, Context Pack, Test Pilot, Debug Radar, Refactor Lens, API Stitcher, Migration Buddy, Docs Whisperer, Prompt Harness, Ship Checklist) could not be independently verified as named installable skills in public registries as of this writing — they may be the curator's descriptive categories, skills available under different names, or skills not yet publicly indexed. Treat the Advanced 10 as a conceptual map of useful capability categories, not a confirmed install list. Check the oh-my-claudecode marketplace and the Claude plugin directory for current availability before installing.

**Skill quality varies.** Community skills range from production-grade to experimental. The Essential 10 on this list have proven track records (Superpowers and oh-my-claudecode skills in particular are actively maintained), but always review a skill's source before installing it in a production workflow.

**The Ralph Loop and MCP Builder assume some setup.** These aren't "install and forget" skills — they involve Claude operating in more autonomous, tool-calling modes. Understand what they do before enabling them in sensitive environments.

**The list is a starting point, not a ceiling.** The real power of the Claude Code skill system is that you can write your own. Once you've used a few of the skills above, you'll have a feel for what a good skill looks like — that's the moment to open Skill Creator and encode your own domain knowledge.
