---
title: "Resumes Are Dead — Your .claude/ Folder Is Your New Career Card"
date: 2026-04-05
category: AI for Teaching
redirect_from:
  - "/wiki/ai education/resume-dead-claude-folder-career/"
tags: [career, hiring, interview, claude-code, resume, ai-education, junior-developer, job-market, portfolio]
related: ["Frustration Shifts Upward — How AI Coding Changes What's Hard", "A Lawyer Beat 500 Developers — Problem Definition Is the New Coding", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Career-Ops — The AI Job Search System That Landed a Head of Applied AI Role"]
icon: "💼"
image: "/assets/images/resume-dead-claude-folder-career.png"
---

AI blogger Nav Toor made a provocative argument: in 2026, your `.claude/` directory — CLAUDE.md, skills, MCP configs — is replacing the traditional resume as a developer's most important professional artifact. The data backing this claim is hard to dismiss.

*Source: [Nav Toor on X](https://x.com/heynavtoor) | [默庵·超级个体 on Xiaohongshu](https://www.xiaohongshu.com/) (2026-04)*

## The Data: Three Shifts Happening Simultaneously

### 1. AI Is Writing the Code

| Metric | Number |
|---|---|
| GitHub PRs completed via Claude Code | **4%** of all public PRs (and growing) |
| Projected by end of 2026 | **20%+** |
| Developers using AI coding tools weekly | **84%** |
| Top tech companies: AI tool usage | **95%** |
| Workers with >50% of work done by AI | **75%** at top firms |

### 2. Junior Jobs Are Disappearing

Junior developer job postings dropped **67%** from 2024 to 2025. Many remaining "junior" listings actually require senior-level experience. The entry-level funnel is collapsing — not because juniors aren't needed, but because the definition of "entry-level work" has changed.

### 3. Interviews Are Changing

Interviewers no longer test if you can write code from scratch. They observe **how you collaborate with AI**.

Tyler Folkman (hiring manager) described the new evaluation:

> "The key distinction: is this developer casually playing with AI, or using AI to deliver production software? Can they write specs first? Critically review AI output? Write tests? Or do they treat AI as a wish-granting pool — generate and ship without checking?"

The interview questions that matter now:

| Old Interview | New Interview |
|---|---|
| "Write a binary search" | "How do you verify AI-generated code?" |
| "Explain this algorithm" | "Show me your CLAUDE.md — what rules do you set?" |
| "Debug this function" | "Walk me through how you'd spec this feature for an AI agent" |
| "What languages do you know?" | "What's in your .claude/ folder?" |

## Your .claude/ Folder as Portfolio

Nav Toor's argument: your `.claude/` directory reveals more about your engineering judgment than any resume line item.

```
.claude/
├── CLAUDE.md ··············· Your engineering philosophy
│                             - What coding standards do you enforce?
│                             - How do you handle errors?
│                             - What architecture decisions matter to you?
│
├── rules/ ·················· Your quality standards
│   ├── code-style.md         - Do you have opinions about code?
│   └── testing.md            - Do you write tests or skip them?
│
├── commands/ ··············· Your workflows
│   ├── review.md             - How do you review code?
│   └── deploy.md             - What's your deployment process?
│
├── skills/ ················· Your domain knowledge
│   └── domain/SKILL.md       - What expertise have you encoded?
│
└── agents/ ················· Your delegation strategy
    ├── reviewer.md           - How do you break work into roles?
    └── security.md           - Do you think about security?
```

### What Each File Reveals

| File | What It Shows About You |
|---|---|
| **CLAUDE.md** | Your engineering values — do you prioritize correctness? Testing? Documentation? |
| **rules/** | Your coding standards — do you have opinions, or do you accept defaults? |
| **commands/** | Your process maturity — have you automated repeatable workflows? |
| **skills/** | Your domain depth — what specialized knowledge have you encoded? |
| **agents/** | Your architectural thinking — can you decompose problems into roles? |
| **hooks/** | Your safety awareness — do you enforce constraints programmatically? |

## "I Can Write Python" Means Nothing Now

The punchline from 默庵's analysis:

> "'I can write Python' on a resume has lost all differentiating value. What interviewers actually want to see is: **can you harness AI to build real, working software?**"

This means:
- Writing specs before generating code
- Critically reviewing AI output (not blindly accepting)
- Writing tests (not treating AI as a wish-granting pool)
- Understanding architecture (not just syntax)
- Knowing when AI is wrong (not agreeing with everything it says)

## What This Means for Students

This is directly relevant for CS education:

### What to Teach

| Old Curriculum Focus | New Curriculum Focus |
|---|---|
| Syntax and language features | Problem decomposition and specification |
| Writing code from scratch | Reviewing and verifying AI-generated code |
| Individual coding assignments | AI-collaborative project workflows |
| "Does it compile?" | "Is it correct, tested, and maintainable?" |
| Resume building | Portfolio of `.claude/` configurations and project setups |

### The New Student Portfolio

Instead of a GitHub profile with toy projects, the new portfolio might look like:

1. **CLAUDE.md files** — showing engineering judgment across different projects
2. **Custom skills** — domain knowledge encoded as reusable AI skills
3. **Automated workflows** — commands and hooks showing process maturity
4. **Verified AI output** — projects with tests proving the student can evaluate AI work

## How LearnAI Team Could Use This

- **Career readiness modules** — Have students build and explain a project-specific `CLAUDE.md` as evidence of engineering judgment.
- **Portfolio reviews** — Evaluate whether students can document AI collaboration workflows, verification habits, and domain constraints.
- **AI coding workshops** — Use the `.claude/` folder as a concrete artifact for teaching spec-writing, review discipline, and safe delegation.
- **Employer conversations** — Translate hiring-market changes into curriculum: students need to show how they direct and verify AI-generated work.

## Real-World Use Cases

- **Junior developer portfolio** — A candidate shares repos with `CLAUDE.md`, tests, and custom commands showing collaboration with coding agents.
- **Mock technical interview** — Students walk through how they spec features, review AI output, and prove correctness with tests.
- **Capstone project setup** — Teams define shared AI rules, commands, and review workflows before implementation begins.
- **Career coaching** — Advisors help students turn AI-assisted projects into evidence of process maturity and engineering judgment.

## The Counterargument

To be fair: Nav Toor's framing is deliberately provocative. Resumes aren't literally dead — hiring processes are slow to change, and most companies still use traditional screening. But the *direction* is clear: the ability to collaborate with AI is becoming more important than the ability to write code alone. Whether that shows up as a `.claude/` folder or some other artifact, the signal employers want is changing.

## Links

- **Nav Toor on X:** [heynavtoor](https://x.com/heynavtoor)
- **Tyler Folkman on hiring:** Referenced in Nav Toor's analysis
- **Related:** [Junior Dev Resume in the Age of AI (DEV Community)](https://dev.to/dhruvjoshi9/junior-dev-resume-portfolio-in-the-age-of-ai-what-recruiters-care-about-in-2025-26c7)
