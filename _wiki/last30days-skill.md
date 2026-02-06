---
title: "Last 30 Days Skill for Claude Code"
date: 2024-02-05
category: Tools
tags: [claude-code, research, skills, reddit, twitter]
related: ["Claude Code Power User Tips"]
icon: "📅"
image: "/assets/images/last30days-skill.jpg"
---

A Claude Code skill that aggregates recent discussions from Reddit and X (Twitter) to research any topic. Great for "priming" Claude with current trends before tackling a task.

## Prerequisites

- **Claude Code**: Paid user (terminal-based interface)
- **OpenAI API Key**: Required for Reddit data via Responses API
- **xAI API Key**: Required for X/Twitter search

Using both keys provides comprehensive coverage.

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/mvanhorn/last30days-skill.git ~/.claude/skills/last30days
```

### Step 2: Configure API Keys

```bash
mkdir -p ~/.config/last30days
cat > ~/.config/last30days/.env << 'EOF'
OPENAI_API_KEY=sk-your_openai_key_here
XAI_API_KEY=xai-your_xai_key_here
EOF
chmod 600 ~/.config/last30days/.env
```

## Basic Usage

### Simple Research

```
/last30days [topic]
```

Example:
```
/last30days best rap songs lately
```

### Targeted Prompt Generation

Generate prompts specifically for another AI tool:

```
/last30days [topic] for [tool]
```

Examples:
```
/last30days prompting techniques for chatgpt for legal questions
/last30days iOS app mockups for Nano Banana Pro
```

## Advanced Flags

| Flag | Description |
|------|-------------|
| `--quick` | Faster research, fewer sources (8-12 each) |
| `--deep` | Comprehensive (50-70 Reddit threads, 40-60 X posts) |
| `--sources=reddit` | Restrict to Reddit only |
| `--sources=x` | Restrict to X/Twitter only |
| `--debug` | Verbose logging for troubleshooting |

## Strategic Workflows

### Priming the Engine

Before asking Claude to build something, run `/last30days` on the topic first. This makes Claude "learn Kung Fu" (ingest latest trends) before attempting your task.

```
> /last30days cloudbot top use cases
> Now build an enterprise version of this tool
```

### Discovery & Trend Analysis

Find viral trends you might have missed to create culturally current content.

```
/last30days viral photo trends this week
```

### Prompt Research

Find what prompting techniques actually work in the community right now, rather than reading outdated documentation.

```
/last30days image generation prompting techniques
```

Discovers practical tips like "use JSON for image prompts" that manuals don't cover.

### Cold Outreach Research

Find high-performing frameworks and generate variants based on fresh research.

```
/last30days cold email frameworks that work
```

Surfaces patterns like "ADA" or "the three Ps" with real examples.

## Why This Matters

This tool implements the **"priming before prompting"** workflow—giving Claude current context before asking it to create. Instead of relying on training data that may be months old, you inject the latest community knowledge.
