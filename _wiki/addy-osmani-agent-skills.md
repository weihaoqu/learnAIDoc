---
title: "Addy Osmani's agent-skills — Senior Engineering Practices as SKILL.md Files"
date: 2026-04-26
category: Skills & Plugins
tags: [agent-skills, engineering-practices, skill-files, addy-osmani, claude-code, software-engineering, google]
related: ["Agents with Taste — Encoding Design Judgment as Skill Files"]
icon: "🛠"
image: "/assets/images/addy-osmani-agent-skills.png"
---

Addy Osmani (Google Chrome engineering lead) packaged senior engineering practices into 20 SKILL.md files that AI coding agents can follow. The insight: AI agents naturally take shortcuts — skipping specs, tests, and security reviews. These skills enforce the discipline that experienced engineers bring to every project. With ~17.2k GitHub stars, it's become the reference implementation for how to encode engineering culture into agent workflows.

*Source: [GitHub - addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | [Weibo discussion by 马力AI和商业思维](https://weibo.com)*

## The 7 Slash Commands

Each command maps to a phase of the software development lifecycle:

| Command | Phase | What It Does |
|---------|-------|-------------|
| `/spec` | Define | Spec before code — clarify requirements first |
| `/plan` | Plan | Break work into small, atomic tasks |
| `/build` | Build | Implement one slice at a time |
| `/test` | Verify | Tests are proof, not decoration |
| `/review` | Review | Improve code health before merge |
| `/code-simplify` | Simplify | Clarity over cleverness |
| `/ship` | Ship | Faster is safer — deploy to production |

## Six Development Phases, 20 Skills

```
Phase 1: DEFINE
├── idea-refine
└── spec-driven-development

Phase 2: PLAN
└── planning-and-task-breakdown

Phase 3: BUILD
├── incremental-implementation
├── test-driven-development
├── frontend-ui-engineering
├── api-and-interface-design
├── context-engineering
└── source-driven-development

Phase 4: VERIFY
├── browser-testing-with-devtools
└── debugging-and-error-recovery

Phase 5: REVIEW
├── code-review-and-quality
├── code-simplification
├── security-and-hardening
└── performance-optimization

Phase 6: SHIP
├── git-workflow-and-versioning
├── ci-cd-and-automation
├── deprecation-and-migration
├── documentation-and-adrs
└── shipping-and-launch
```

Plus 3 specialist agent personas (code-reviewer, test-engineer, security-auditor) and 4 reference checklists.

## What Makes These Skills Special

Each SKILL.md follows a standardized structure with an "anti-rationalization table" — anticipating shortcuts agents try to take:

| Agent Excuse | Skill Response |
|-------------|----------------|
| "I'll add tests later" | Tests are proof. No proof = not done. |
| "This is just a small change" | Small changes cause big outages. |
| "Seems right" | Seems is not evidence. Run it. |
| "I don't need a spec for this" | You don't *know* what you're building without one. |

## Google Engineering Culture Encoded

The skills draw heavily from *Software Engineering at Google*:

- **Hyrum's Law** in API design — backward compatibility matters
- **The Beyonce Rule** in testing — "If you liked it, you should've put a test on it"
- **Chesterton's Fence** in code simplification — don't remove what you don't understand
- **Change sizing norms** (~100 lines) in code review
- **Trunk-based development** in git workflow
- **Shift Left principle** in CI/CD — catch problems early

## Installation

```bash
# Claude Code
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

# Cursor / Gemini CLI / Windsurf / Copilot
npx skills add addyosmani/agent-skills

# Manual (any agent)
git clone https://github.com/addyosmani/agent-skills.git
```

Skills are plain Markdown — any agent accepting system prompts can use them.

## How LearnAI Team Could Use This

- **Teaching software engineering** — the 6-phase lifecycle is a pedagogical framework itself
- **Improving AI-assisted student projects** — install the skills to enforce best practices
- **Studying skill design patterns** — the anti-rationalization table is a novel concept worth teaching
- **Building custom skills** — use this repo as a template for encoding domain expertise

## Real-World Use Cases

- **Engineering teams** — enforce consistent practices across all AI-assisted development
- **Open source projects** — standardize contribution quality regardless of agent used
- **Junior developers** — learn senior-level practices by reading the skill files
- **Code review** — the reviewer agent persona provides structured, opinionated feedback
