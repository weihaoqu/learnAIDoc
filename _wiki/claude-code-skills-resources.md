---
title: "Claude Code Skills: Resources & Repos"
date: 2024-02-05
category: Tools
tags: [claude-code, skills, resources, github]
related: ["Claude Code Power User Tips", "Last 30 Days Skill", "mdpdf: Markdown to PDF with Claude Code", "Gstack — Garry Tan's AI Software Factory for Claude Code", "Posterskill — AI-Generated Academic Conference Posters from Your Paper"]
icon: "🔗"
image: "/assets/images/claude-code-resources.jpg"
---

A curated list of resources for finding, creating, and managing Claude Code skills.

## Official Documentation

### Introduction & Advanced
[code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)

### Best Practices
[platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

Essential for understanding how Anthropic expects tools to be structured and described.

---

## Official Repository

### Anthropic Skills
[github.com/anthropics/skills](https://github.com/anthropics/skills) ⭐ 46.9k

The primary source for official skills and implementation examples.

---

## Community & Curated Lists

### Awesome Claude Skills
[github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) ⭐ 22.7k

Pre-built skills for third-party apps:
- Slack
- Gmail
- GitHub
- And more...

---

## Frameworks & Methodologies

### Obra Superpowers
[github.com/wln/obra-superpowers](https://github.com/wln/obra-superpowers) ⭐ 31k

Focuses on the architectural side of giving AI "superpowers" through modular skills.

---

## Skill Marketplaces

### Skills MP
[skillsmp.com](https://skillsmp.com)

A directory with 70,000+ indexed skills.

---

## Automation Tools

### Skill Seekers
[github.com/yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers)

Automatically converts into usable Skills:
- Websites
- Codebases
- PDF files

### HyperSkill
[github.com/hyperbrowserai/hyperbrowser-app-examples/.../hyperskills](https://github.com/hyperbrowserai/hyperbrowser-app-examples/tree/main/hyperskills)

Auto-generates SKILL.md documentation from any web source. Built with Next.js, [Hyperbrowser SDK](https://www.hyperbrowser.ai/), Serper API, and GPT-4o. Three modes:

| Mode | What It Does |
|---|---|
| **Single Skill** | Input a topic or URL → generates one SKILL.md |
| **Batch Mode** | Generate multiple skills at once |
| **Skill Tree** | Generate a hierarchy of related skills |

Useful for quickly turning existing documentation, API references, or tutorials into Claude Code skills without writing SKILL.md by hand.

---

## Courses & Tutorials

### Learn Claude Code — Build an AI Agent from Scratch
[github.com/shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | [Interactive Platform: learn.shareai.run](https://learn.shareai.run)

A 12-lesson course that teaches Claude Code internals by building a complete AI coding agent (`s_full.py`) step by step. Each lesson builds on the previous one:

| Section | Topics |
|---|---|
| **Foundation (1-3)** | Agent Loop basics, Bash Tool, Tool registration & scheduling |
| **Intermediate (4-6)** | Sub-agent task decomposition, Skills dynamic loading, context compression, task persistence, async execution |
| **Advanced (7-9)** | Multi-agent teams, custom inter-agent protocols, worktree isolation |
| **Final** | Combine all 12 lessons into `s_full.py` — a complete AI coding agent |

The interactive platform at [learn.shareai.run](https://learn.shareai.run) provides a visual learning experience (recommended over just reading the repo). Chinese README available at [README-zh.md](https://github.com/shareAI-lab/learn-claude-code/blob/main/README-zh.md).

**Why this matters:** After completing this course, you understand what Claude Code is actually doing under the hood — Agent Loop, Tool system, Skills, Subagents — not just how to use it. This maps directly to the [Claude Certified Architect](/learnAIDoc/wiki/ai/claude-certified-architect/) exam domains.

### Anthropic Academy (Free)
[anthropic.skilljar.com](https://anthropic.skilljar.com/) — 13 free courses including the 8.1-hour "Building with the Claude API" flagship course. See [Claude Certified Architect entry](/learnAIDoc/wiki/ai/claude-certified-architect/) for details.

---

## Quick Reference

| Resource | Type | Best For |
|----------|------|----------|
| [Official Docs](https://code.claude.com/docs/en/skills) | Documentation | Learning the spec |
| [anthropics/skills](https://github.com/anthropics/skills) | Repo | Official examples |
| [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Repo | Pre-built integrations |
| [obra-superpowers](https://github.com/wln/obra-superpowers) | Repo | Architecture patterns |
| [skillsmp.com](https://skillsmp.com) | Marketplace | Browsing 70k+ skills |
| [Skill Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) | Tool | Auto-generating skills from files |
| [HyperSkill](https://github.com/hyperbrowserai/hyperbrowser-app-examples/tree/main/hyperskills) | Tool | Auto-generating SKILL.md from web sources |
| [Learn Claude Code](https://github.com/shareAI-lab/learn-claude-code) | Course | Building agents from scratch |
| [Anthropic Academy](https://anthropic.skilljar.com/) | Course | Free CCA-F exam prep (13 courses) |

## Getting Started

1. Read the **official docs** to understand skill structure
2. Browse **awesome-claude-skills** for inspiration
3. Check **skillsmp.com** if you need something specific
4. Use **Skill Seekers** to convert existing resources into skills
5. Publish your own skills to share with the community
