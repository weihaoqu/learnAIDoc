---
title: "Browser-Use — Make Any Website Accessible to AI Agents"
date: 2026-05-09
category: Skills & Plugins
tags: [browser-automation, ai-agents, cdp, web-scraping, claude-code, python, open-source]
related: []
icon: "🌐"
image: "/assets/images/browser-use-ai-browser-automation.png"
---

Browser-Use is an open-source Python framework that lets AI agents control web browsers autonomously — clicking, typing, scrolling, filling forms, and navigating multi-step workflows from natural language instructions. It is one of the most visible AI browser automation projects, works with Claude, GPT, Gemini, and local models, and also has a Browser Use CLI path for agent-driven terminal workflows.

*Source: [GitHub — browser-use/browser-use](https://github.com/browser-use/browser-use) | [browser-use.com](https://browser-use.com/) | [Browser Use CLI docs](https://docs.browser-use.com/open-source/browser-use-cli) | [Releases](https://github.com/browser-use/browser-use/releases) | [Benchmark](https://github.com/browser-use/benchmark)*

## What It Does

Give a browser agent a task in plain English, and it figures out how to complete it:

```python
from browser_use import Agent, Browser, ChatBrowserUse
import asyncio

async def main():
    agent = Agent(
        task="Go to Amazon, search for 'wireless headphones under $50', "
             "sort by best reviews, and save the top 3 results to a file",
        llm=ChatBrowserUse(),
        browser=Browser(),
    )
    await agent.run()

asyncio.run(main())
```

The agent processes the page (via DOM/HTML extraction, plus optional vision screenshots), reasons about what to do, takes actions, and repeats until the task is done.

## How a Normal User Would Use This

### Scenario 1: Job Application Automation

You have a resume and want to apply to 20 jobs on LinkedIn:

```python
agent = Agent(
    task="Go to LinkedIn Jobs, search for 'Python developer remote', "
         "apply to the first 20 jobs using Easy Apply. "
         "Use my resume details: [name, email, experience]",
    llm=ChatBrowserUse(),
)
```

### Scenario 2: Price Comparison Shopping

```python
agent = Agent(
    task="Compare prices for 'Sony WH-1000XM5' across Amazon, "
         "Best Buy, and Walmart. Create a markdown table with "
         "price, shipping, and availability for each store.",
    llm=ChatBrowserUse(),
)
```

### Scenario 3: Research Data Collection

```python
agent = Agent(
    task="Go to Google Scholar, search for 'transformer attention efficiency 2026', "
         "collect the titles, authors, and citation counts of the top 20 results, "
         "and save to research_papers.csv",
    llm=ChatBrowserUse(),
)
```

### Scenario 4: Browser Use CLI and Existing-Browser Control

```bash
# Check the current docs before copying exact flags.
browser-use
```

The CLI is the part worth preserving from the older standalone "Browser Use CLI 2.0" page. Its key idea is direct browser control from an agent terminal, including the option to connect to a running Chrome/Chromium session through CDP so the agent can work with existing tabs, cookies, logins, extensions, and console state.

| Mode | How it works | Best for |
|---|---|---|
| **Existing browser / direct CDP** | Connects to a running Chrome/Chromium instance | Debugging, authenticated dashboards, workflows where your current session matters |
| **Managed local browser** | Launches a controlled browser profile | Testing, repeatable QA, safer demos |
| **Hosted cloud browser** | Uses Browser Use's hosted infrastructure | Batch jobs, parallel runs, tasks that benefit from remote browser management |

The old v2 claims about direct CDP being faster and cheaper are directionally useful, but treat exact speed/cost numbers as release-specific. Browser Use has continued to evolve; verify current CLI behavior from the docs and release notes before using it in a workshop or assignment.

## Supported Models

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| **ChatBrowserUse** (recommended) | 3-5x fastest | $0.20/$2.00 per M tokens | Best accuracy, purpose-built |
| **GPT-4o** | Fast | Standard OpenAI pricing | General use |
| **Claude Sonnet/Opus** | Fast | Standard Anthropic pricing | Complex reasoning tasks |
| **Gemini 2.0 Flash** | Very fast | Google pricing | Speed-sensitive tasks |
| **Ollama (local)** | Varies | Free | Privacy-sensitive work |

## Open-Source vs Cloud

| Feature | Open-Source (Self-hosted) | Cloud Agent |
|---------|-------------------------|-------------|
| **Cost** | Free + model API costs | Subscription |
| **CAPTCHA solving** | Manual/third-party | Built-in |
| **Stealth/anti-detection** | Basic | Advanced fingerprinting |
| **Proxy rotation** | Configure yourself | Built-in |
| **Persistent memory** | Custom implementation | Built-in |
| **Custom tools** | Full control | 1000+ integrations |

## Claude Code Integration

Install the Browser-Use skill directly:

```bash
mkdir -p ~/.claude/skills/browser-use
curl -o ~/.claude/skills/browser-use/SKILL.md \
  https://raw.githubusercontent.com/browser-use/browser-use/main/skills/browser-use/SKILL.md
```

Now Claude Code can automate browser tasks as part of your coding workflow.

## Architecture

```
Natural Language Task
        ↓
┌──────────────────┐
│   LLM (reasoning) │  Decides what to do next
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Action Pipeline  │  Translates to browser commands
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Chromium (via CDP)  │  Executes: click, type, scroll, screenshot
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Context Manager  │  Extracts DOM + screenshots for next decision
└──────────────────┘
         ↓
    Loop until done
```

## Real-World Use Cases

- **Form automation** — Job applications, survey completion, account registration across any website.
- **E-commerce** — Grocery shopping lists, price comparison, checkout automation.
- **Research** — Web scraping, competitor monitoring, data collection from sites without APIs.
- **Administrative** — Appointment scheduling, document downloads, account maintenance.
- **Testing** — QA workflows, multi-step user journey testing, accessibility auditing.
- **Social media** — Content posting, engagement tracking, analytics collection.

**Note:** Some use cases (account registration, checkout automation, job applications at scale) may conflict with website Terms of Service. Always verify you have permission before automating interactions with third-party sites.

## How LearnAI Team Could Use This

- **Web automation lab** — Students build browser agents for real tasks (price comparison, data collection) and learn about AI tool use, error recovery, and task decomposition.
- **Agent evaluation project** — Compare Browser-Use across different LLM backends on the same 100-task benchmark — teaching model selection and cost-performance tradeoffs.
- **Ethics discussion** — When should AI automate web interactions? CAPTCHA solving, anti-detection, and Terms of Service implications.

## Links

- **GitHub:** [browser-use/browser-use](https://github.com/browser-use/browser-use)
- **Website:** [browser-use.com](https://browser-use.com/)
- **CLI docs:** [docs.browser-use.com/open-source/browser-use-cli](https://docs.browser-use.com/open-source/browser-use-cli)
- **Benchmark:** [browser-use/benchmark](https://github.com/browser-use/benchmark)
- **Claude Code Skill:** Available via GitHub raw URL
