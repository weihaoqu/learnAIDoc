---
title: "10 Lessons for Agentic Coding — What Should We Do When Code Is Cheap?"
date: 2026-05-09
category: Industry & Trends
tags: [agentic-coding, software-engineering, ai-coding, best-practices, taste, testing, architecture]
related: ["Claude Code 101 — Anthropic's Official Onboarding Course", "Harness Engineering — The Real Bottleneck Isn't the Model", "AI Fluency Index: Why Your Best Prompts Might Lead to Your Worst Work"]
icon: "📐"
image: "/assets/images/ten-lessons-agentic-coding.png"
---

When AI agents can generate code in seconds, what changes about how you work? Drew Breunig's "10 Lessons for Agentic Coding" asks: what should we do when code is cheap? The *kind* of work that matters shifts dramatically. Writing code becomes cheap; taste, specs, and knowing what's hard become the scarce resources. The article maps out a practical philosophy for working effectively with coding agents.

*Source: [dbreunig.com — 10 Lessons for Agentic Coding](https://dbreunig.com/2026/05/04/10-lessons-for-agentic-coding.html)*

## The 10 Lessons

### 1. Implement to Learn

Don't spec in a vacuum. Use agents to generate working code early — the act of implementation surfaces decisions you hadn't considered. Code generation becomes a **thinking tool**, not just a production tool.

**Real-world example:** Instead of debating database schema in a doc for a week, have the agent build a prototype in 30 minutes. The prototype reveals edge cases the doc never would.

### 2. Rebuild Often

Code is now cheap to produce. Stop treating the first implementation as precious. Build it, test your assumptions, throw it away, rebuild with better knowledge.

**Real-world example:** Try three different architectures for the same feature in one afternoon. Compare them empirically instead of theoretically.

### 3. Invest in End-to-End Tests

Test **behavior**, not implementation. When agents rebuild code frequently (lesson 2), tests tied to implementation details can become brittle. End-to-end tests that verify "the user can complete checkout" survive any rebuild.

**Real-world example:** A test suite that says "given these inputs, the API returns these outputs" works regardless of which agent wrote the code or how many times the internals were rewritten.

### 4. Document Intent

Capture **why** decisions were made, not just what the code does. Code and tests show the "what" and "how" — intent documentation shows the "why." This guides agents to make consistent future decisions.

**Real-world example:** An ADR (Architecture Decision Record) that says "we chose PostgreSQL over MongoDB because our queries are heavily relational" prevents the next agent session from suggesting a MongoDB migration.

### 5. Keep Specs Synchronized

Your spec is a living document. Update it as you learn from implementation (lesson 1). Stale specs mislead agents, producing code that matches outdated requirements.

**Real-world example:** After building the prototype, update the spec with the 5 edge cases you discovered. The agent's next iteration starts from better requirements.

### 6. Find the Hard Stuff

When code generation is cheap, **your value is in the hard parts**: system design, performance optimization, security review, user experience decisions. Don't spend time on what agents handle well.

**Real-world example:** Let the agent generate the CRUD endpoints. Spend your time designing the authentication flow, the rate limiting strategy, and the data migration plan.

### 7. Automate Everything Easy

The corollary to lesson 6: if it's easy, don't do it yourself. Breunig emphasizes distilling learnings into skills, building automation loops, and letting your tools compound — avoid getting stuck in what he calls "a Mystery House" of manual repetition.

**Real-world example:** Build skills and automation loops for common tasks so each session benefits from previous learnings. The agent compounds your experience over time.

### 8. Develop Your Taste

When code arrives instantly, the bottleneck becomes **evaluating whether it's good**. "Taste" — the ability to quickly assess quality, spot issues, and know what "right" looks like — becomes the most valuable skill.

Breunig ties taste to knowing your domain, your users, and their problems — because external feedback is slower than code generation, your internal quality compass becomes critical.

**Real-world example:** Two developers get the same agent output. One accepts it. The other notices the quality issues immediately. The difference is taste built from domain expertise, not prompting skill.

### 9. Agents Amplify Experience

Technical depth makes agents dramatically more effective. An experienced developer's prompts include implicit constraints ("use connection pooling," "handle backpressure") that novice prompts miss. Experience compounds with agent capability.

Experienced developers bring the right terms, framing, and specificity — saving implementation and debugging cycles and reducing needless exploration.

**Real-world example:** A senior engineer's concise prompt leads to better results because it encodes years of learned patterns in its framing and constraints.

### 10. Remember Hidden Costs

Code generation is cheap. **Code ownership is not.** As Breunig puts it, agentic code is "free as in puppies" — every line generated still needs maintenance, security updates, dependency management, monitoring, and support. Generate carefully — more code = more liability.

**Real-world example:** An agent can generate 10,000 lines in a day. But those 10,000 lines need security audits, performance monitoring, error handling, documentation, and someone to debug them at 3 AM when they break.

## The Meta-Lesson

The 10 lessons converge on one insight: **agentic coding shifts value from code production to code judgment.** The skills that matter are:

| Old World (Code by Hand) | New World (Code by Agent) |
|--------------------------|--------------------------|
| Typing speed | Taste and evaluation speed |
| Memorizing syntax | Knowing what to build |
| Implementation detail | System design |
| Writing tests | Designing test strategies |
| Documentation as afterthought | Specs as primary artifact |

## Real-World Use Cases

- **Senior engineers** — Use lessons 6-9 to focus on architecture and review while agents handle implementation.
- **Tech leads** — Apply lessons 3-5 to establish team practices: e2e tests, living specs, intent docs.
- **Junior developers** — Focus on lesson 8 (developing taste) by reviewing lots of agent output and learning to spot quality issues.
- **Startup founders** — Apply lessons 1-2 (implement to learn, rebuild often) to validate product ideas rapidly without over-investing in first implementations.

## How LearnAI Team Could Use This

- **Software engineering course update** — Use these 10 lessons as a framework for teaching "AI-era software engineering." Each lesson becomes a week's topic with hands-on exercises.
- **Taste development lab** — Students review agent-generated code and score it on quality dimensions (security, performance, maintainability). The goal: develop taste faster through deliberate practice.
- **Spec-first project** — Students write specs before touching code, then let agents implement. Compare results with students who skip the spec. Demonstrates lessons 4-5 empirically.

## Links

- **Article:** [10 Lessons for Agentic Coding](https://dbreunig.com/2026/05/04/10-lessons-for-agentic-coding.html)
- **Author:** [Drew Breunig](https://dbreunig.com/)
