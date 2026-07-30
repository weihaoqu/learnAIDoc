---
title: "Claude Code Plugins & Marketplace"
date: 2026-02-13
category: Claude Code Basics
redirect_from:
  - "/wiki/claude code/claude-code-plugins/"
  - "/wiki/claude-code-best-plugins/"
  - "/wiki/claude code/claude-code-best-plugins/"
  - "/wiki/claude-code-top-20-skills-curated/"
  - "/wiki/skills & plugins/claude-code-top-20-skills-curated/"
tags: [claude-code, cli, plugins, mcp, skills, extensibility]
related: ["Personal AI Skill Cheat Sheet — When to Use Each Skill", "Claude Code Custom Agents", "Understand Anything — Turn Codebases Into Interactive Knowledge Graphs", "Claude Code Tips & Context Engineering — From 45 Tips to Six-Layer Architecture", "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs"]
icon: "🔌"
image: "/assets/images/claude-code-plugins.png"
---

Plugins let you install LSPs, MCPs, skills, agents, and custom hooks into Claude Code from a centralized marketplace. Treat plugins as trusted software, not as harmless prompt snippets: they can add context, run hooks, connect tools, and change how Claude behaves inside a project.

*Source: [Claude Code docs — Discover and install prebuilt plugins](https://code.claude.com/docs/en/discover-plugins) | [Claude Code plugins reference](https://code.claude.com/docs/en/plugins-reference) | [Anthropic-managed official plugin marketplace repo](https://github.com/anthropics/claude-plugins-official)*

## Getting Started

```
> /plugin
```

Run `/plugin` to browse and install from the official Anthropic plugin marketplace.

## What You Can Install

| Plugin type | What it adds |
|-------------|-------------|
| **LSPs** | Language Server Protocols for code intelligence — available for every major language |
| **MCPs** | Model Context Protocol servers for connecting Claude to external tools and data |
| **Skills** | Reusable slash commands (like `/commit`, `/review-pr`) |
| **Agents** | Custom agent configurations for the main conversation |
| **Hooks** | Lifecycle hooks that trigger on Claude events |

## What to Look For First

Old community lists are useful for pattern-spotting, but many named entries move, rename, or turn out to be capability labels rather than installable plugin names. Use them as a shortlist of jobs to cover, then verify the current installable component in `/plugin` or in the source repo.

| Need | Capability to look for | Why it matters |
|---|---|---|
| Larger code changes | Planning / TDD / systematic debugging skills | Keeps Claude from jumping straight to implementation without a testable plan |
| Frontend work | UI review or frontend design skills | Pushes layout, spacing, accessibility, and visual QA into the workflow |
| Browser QA | Playwright / webapp testing plugins | Verifies the page in a real browser instead of trusting static code review |
| PR review | Review agents or review toolkits | Splits review across test coverage, type design, error handling, and code quality |
| Tool building | MCP builder / skill creator workflows | Helps you package repeatable local knowledge instead of pasting prompts |
| Long sessions | Context pack / handoff / planning-with-files workflows | Preserves state across compaction, model switches, or a new terminal session |

## Official vs Custom Marketplaces

### Official Anthropic Marketplace

Claude Code adds the official Anthropic marketplace automatically when you start it. If it is missing, add it manually:

```text
/plugin marketplace add anthropics/claude-plugins-official
```

Then open `/plugin` to browse and install. The official marketplace is curated, but that does not mean every plugin is right for every project. Read what the plugin adds before enabling it.

### Company Marketplaces

You can create your own private marketplace for your team. Then check the marketplace configuration into your codebase's `settings.json` so it auto-adds for everyone:

```json
{
  "marketplaces": [
    "https://your-company.com/claude-plugins"
  ]
}
```

This means when a teammate clones the repo and opens Claude Code, they automatically get access to your team's plugins — no manual setup.

## The Practical Reality

Community roundup posts are a weak source for plugin names, counts, and behavior. The plugin panel is the source of truth for what your local Claude Code can currently install. Recent Claude Code versions also show the plugin's install scope, token/context cost estimate, last updated date, and the commands, agents, skills, hooks, MCP servers, and LSP servers it will add.

The important habit is simple: inspect before install. A plugin can execute code with your user privileges, so apply the same judgment you would apply to a CLI tool or editor extension.

## Practical Adoption Advice

| Tip | Why |
|-----|-----|
| **Start with 3 plugins for one week** | Learn them properly before adding more |
| **Add one at a time after that** | Each plugin changes Claude's behavior; batch-adding creates confusion |
| **Use CLAUDE.md pipes** | Organize plugins into three concerns: one for code quality, one for security, one for workflow |
| **Remove 80% of tools you're not using** | Too many tools makes Claude confused (Vercel learned this the hard way) |
| **Read the official docs first** | Community posts often contain errors or stale counts |

## How LearnAI Team Could Use This

- Package repeatable Claude Code setup as a private plugin marketplace: approved MCP servers, skills, hooks, and agents for course production, documentation review, and research workflows.
- New team members open a project and inherit the same toolchain instead of manually copying local config.
- Keep security-sensitive hooks and permissions consistent across team projects.

## Real-World Use Cases

- Publish a LearnAI internal marketplace with standard review, docs, and research plugins.
- Bundle onboarding tools so contributors get the right skills and MCPs automatically.
- Distribute custom slash commands for team-specific workflows (e.g., `/review-wiki`, `/mywiki`).

## Why This Matters

Plugins turn Claude Code from a single-purpose CLI into an extensible platform. Instead of each developer manually configuring MCPs, writing custom hooks, or sharing skills via copy-paste, plugins provide a standardized install-and-go experience. The team marketplace feature is especially powerful for onboarding — new developers get the full toolchain just by opening the project.
