---
title: "Skill Seekers: Auto-Generate Claude Skills"
date: 2024-02-05
category: Tools
tags: [claude-code, skills, automation, scraping]
related: ["Claude Code Skills: Resources & Repos", "Claude Code Power User Tips"]
---

Skill Seekers automates the creation of Claude Skills. Instead of manually copying documentation into prompts, it scrapes websites, GitHub repos, or PDFs and packages them into a format Claude can use as a specialized knowledge base.

## Installation

```bash
# Recommended
pip install skill-seekers

# For high-performance PDF/OCR support (optional)
pip install skill-seekers[pdf]
```

## Core Workflows

The tool operates in three stages: **Scrape → Enhance → Package**

### 1. Scraping Documentation

#### Using a Preset
```bash
skill-seekers scrape --config react
```

#### Custom URL
```bash
skill-seekers scrape --url https://react.dev --name my-react-skill
```

#### GitHub Repo
```bash
skill-seekers scrape --github https://github.com/user/repo
```

### 2. Unified Multi-Source (Docs + Code)

The most powerful feature for developers. Scrapes documentation AND analyzes source code to detect if docs are outdated.

```bash
skill-seekers unified \
  --name my-project \
  --url https://docs.example.com \
  --github https://github.com/example/repo
```

### 3. Scraping PDFs

Convert manuals or textbooks into skills:

```bash
skill-seekers scrape --pdf path/to/manual.pdf --name technical-skill
```

**Tips:**
- Use `--ocr` for scanned PDFs
- Use `--extract-tables` for complex data tables

## Enhancing and Packaging

Once data is collected, turn it into a `.zip` file Claude can use.

### Enhance
Uses AI to summarize scraped data into a high-quality `SKILL.md` entry point:

```bash
skill-seekers enhance output/my-project/
```

### Package
Creates the final distribution file:

```bash
skill-seekers package output/my-project/
```

## Claude Code MCP Integration

Skill Seekers has a built-in Model Context Protocol (MCP) server. Once set up, just ask Claude in natural language:

> "Create a skill for the Tailwind documentation."

> "Generate a config for this GitHub repo and package it."

## Quick Reference

| Command | Purpose |
|---------|---------|
| `scrape --config [preset]` | Use preset for popular frameworks |
| `scrape --url [url]` | Scrape any documentation site |
| `scrape --github [repo]` | Scrape GitHub repository |
| `scrape --pdf [file]` | Convert PDF to skill |
| `unified --url --github` | Combine docs + code analysis |
| `enhance [path]` | AI-summarize into SKILL.md |
| `package [path]` | Create final .zip |

## Example Workflow

```bash
# 1. Scrape React docs and repo
skill-seekers unified \
  --name react-skill \
  --url https://react.dev \
  --github https://github.com/facebook/react

# 2. Enhance with AI summary
skill-seekers enhance output/react-skill/

# 3. Package for distribution
skill-seekers package output/react-skill/

# 4. Install to Claude Code
cp output/react-skill.zip ~/.claude/skills/
```

Now Claude has expert-level React knowledge on demand.
