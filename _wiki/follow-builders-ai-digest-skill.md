---
title: "Follow Builders: AI Digest Skill That Tracks Real Builders, Not Influencers"
date: 2026-03-26
category: Skills & Plugins
redirect_from:
  - "/wiki/skills & plugins/follow-builders-ai-digest-skill/"
tags: [claude-code, skills, ai-news, content-curation, builders, x-twitter, podcasts, telegram, discord]
related: ["Claude Code Skills & Resources: Nine Skill Types Taxonomy", "Claude Code Best Plugins: 53 Reality Check"]
icon: "📡"
image: "/assets/images/follow-builders-ai-digest-skill.png"
---

Staying current with AI developments means drowning in noise — influencer threads, recycled takes, and hype cycles. **Follow Builders** is a Claude Code skill that cuts through this by monitoring only the people actually building AI: researchers, founders, PMs, and engineers. It delivers curated digests of their original content straight to your Telegram, Discord, or email.

*Source: [GitHub — zarazhangrui/follow-builders](https://github.com/zarazhangrui/follow-builders)*

## What It Tracks

| Source Type | Content |
|-------------|---------|
| **25 AI Builders on X** | Andrej Karpathy, Swyx, Sam Altman, and 22 more — curated for original insights, not retweets |
| **5 Podcasts** | Latent Space, Training Data, No Priors, Unsupervised Learning, Data Driven NYC |
| **2 Official Blogs** | Anthropic Engineering, Claude Blog — full articles, not just announcements |

The key philosophy: **follow builders, not influencers.** These are people shipping real products and sharing genuine insights — not people amplifying others' work for engagement.

## How It Works

```
Central Feed (updated daily)
        │
        ▼
Agent fetches via single HTTP request
        │
        ▼
Summarizes using your preferences
(language, length, style, focus)
        │
        ▼
Delivers to your chosen channel
(Telegram / Discord / WhatsApp / Email / In-chat)
```

**No API keys needed.** Content is fetched from a central hub that aggregates public posts. Your agent just pulls and summarizes — all configuration and reading history stays local.

## Setup

1. Install the skill:
   ```bash
   # Clone to your skills directory
   git clone https://github.com/zarazhangrui/follow-builders ~/.claude/skills/follow-builders
   ```

2. Run `/follow-builders` in Claude Code

3. Tell it your preferences conversationally:
   - "Send me a daily digest at 8am in English via Telegram"
   - "Weekly summary, bilingual Chinese-English, Discord"
   - "Make summaries more concise and focus on actionable insights"

## Key Features

- **Bilingual support** — Chinese, English, or bilingual summaries
- **Flexible delivery** — Telegram, Discord, WhatsApp, email, or directly in chat
- **Customizable style** — Adjust summary length, tone, and focus via conversation
- **No complex config** — Everything configured through natural language, no file editing required
- **Privacy-first** — All config stored locally; no API keys transmitted externally
- **Zero maintenance** — Central feed auto-updates; just install and go

## Why This Matters

The AI space moves fast, and most curation tools either overwhelm you with everything or filter too aggressively. Follow Builders takes a different approach: **human-curated source list** (the 25 builders) combined with **AI-powered summarization** (your Claude agent). You get the quality of hand-picked sources with the convenience of automated delivery.

It's like having a 24-hour AI news assistant that only reads the good stuff.

## Who It's For

- **Developers** tracking what top AI engineers are building and thinking
- **Researchers** monitoring the latest from Anthropic, OpenAI, and independent labs
- **AI enthusiasts** who want signal without the noise of AI Twitter

## How LearnAI Team Could Use This

- **Weekly AI briefing** — Send the team a concise digest of builder updates before planning or editorial meetings.
- **Course content refresh** — Track new posts from researchers and founders to keep lessons current.
- **Student reading lists** — Turn high-signal builder posts and podcast episodes into recommended weekly readings.
- **Wiki pipeline support** — Use digests to identify emerging tools, workflows, and case studies worth documenting.

## Real-World Use Cases

1. **Engineering teams** — Monitor what leading AI builders are shipping without manually checking X, blogs, and podcasts.
2. **Researchers** — Track new technical ideas, papers, and lab updates from credible sources.
3. **Founders and PMs** — Spot product and market signals from people actively building AI products.
4. **Content teams** — Build newsletters, internal briefings, or article pipelines from curated source updates.
