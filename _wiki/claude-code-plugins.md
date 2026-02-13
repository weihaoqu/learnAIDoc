---
title: "Claude Code Plugins & Marketplace"
date: 2026-02-13
category: Tools
tags: [claude-code, cli, plugins, mcp, skills, extensibility]
related: ["Claude Code Skills & Resources", "Claude Code Custom Agents"]
icon: "🔌"
---

Plugins let you install LSPs, MCPs, skills, agents, and custom hooks into Claude Code from a centralized marketplace.

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

## Official vs Custom Marketplaces

### Official Anthropic Marketplace

The default source. Curated plugins maintained by Anthropic and the community.

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

## Why This Matters

Plugins turn Claude Code from a single-purpose CLI into an extensible platform. Instead of each developer manually configuring MCPs, writing custom hooks, or sharing skills via copy-paste, plugins provide a standardized install-and-go experience. The team marketplace feature is especially powerful for onboarding — new developers get the full toolchain just by opening the project.
