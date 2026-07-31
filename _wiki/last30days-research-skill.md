---
title: "/last30days — Recent-Signal Research Skill for Agents"
date: 2026-07-31
category: Skills & Plugins
tags: [last30days, agent-skills, research, trend-research, social-search, claude-code, codex, skills]
related: ["SkillsMP — Map the Agent Skills Ecosystem Before You Install", "AI Research Tools Landscape: FARS vs AutoResearch vs ARIS vs Elicit", "Personal AI Skill Cheat Sheet — When to Use Each Skill", "Research Skills Starter Pack — Install and Use Academic AI Skills Without the Hype"]
icon: "🔎"
image: "/assets/images/last30days-research-skill.png"
---

`/last30days` is a recent-signal research skill: instead of asking an agent to summarize stale web pages, it asks the agent to inspect what people have been saying and doing recently across sources such as Reddit, Hacker News, GitHub, arXiv, YouTube, X, Polymarket, and other platform feeds. The useful teaching frame is simple: **use it for topic sensing, not final truth**.

*Source: [GitHub — mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)*

## Why It Belongs Here

Students often ask AI tools questions like "what is happening with X?" and receive a smooth answer based on training data, weak browsing, or SEO content. `/last30days` is interesting because it makes the source model explicit: recent platform signals, ranked by engagement and then synthesized by an agent.

That is valuable for:

| Job | Why `/last30days` helps |
|---|---|
| Choosing a project topic | Finds what communities are currently arguing about |
| Comparing tools | Surfaces recent complaints, launches, issues, and demos |
| Preparing for a meeting | Reads recent public activity instead of old profile pages |
| Watching AI trends | Checks arXiv, GitHub, HN, social posts, and videos together |

## Install Pattern

The README describes two main paths:

```bash
# Agent Skills style install for Codex, Cursor, Gemini CLI, Copilot, etc.
npx skills add mvanhorn/last30days-skill -g
```

For Claude Code, the project also supports marketplace-style plugin installation. That has an update-management advantage, but it is not the same as a plain skill-folder install.

## Student Workflow

Use the result as a **research brief**:

1. Run `/last30days "<topic>"`.
2. Pull out named sources, claims, and links.
3. Verify the top 3-5 claims against primary sources.
4. Turn the brief into a question list, not a final answer.

Example:

```text
/last30days "agent observability tools for Claude Code and Codex"
```

Good output should tell you what to inspect next: repositories, papers, issues, demos, and live discussions.

## Caveats

- Engagement is not truth. Viral complaints and hype both overrepresent themselves.
- Some sources need API keys or authenticated browser sessions.
- Recent signals are volatile. Re-run before publishing a dated claim.
- Treat social-source summaries as leads, not citations.

## Best LearnAI Use

Pair this with [AI-Assisted Research Workflow](/learnAIDoc/wiki/ai-research-workflow-pipeline/): `/last30days` can fill the "find and scan" phase, but the "judge, verify, execute, monitor, record" phases still need deliberate human work.
