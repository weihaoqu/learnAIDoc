---
title: "Turn Claude Code into Claude Teacher"
date: 2024-02-05
category: AI for Teaching
redirect_from:
  - "/wiki/ai education/claude-teacher-setup/"
tags: [claude-code, learning, documentation]
related: ["Learning in the AI Era: Amplify Your Thinking, Don't Outsource It", "AI in Education — Teacher's Factory, Not Student's Cheat Tool", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure"]
icon: "👨‍🏫"
image: "/assets/images/claude-teacher-setup.jpg"
---

Transform Claude Code into a personal technical teacher by adding specific instructions to your `CLAUDE.md` file. Every coding project becomes a learning opportunity.

*Source: [Claude Code docs — How Claude remembers your project](https://code.claude.com/docs/en/memory) | [Claude Code best practices — CLAUDE.md](https://code.claude.com/docs/en/best-practices)*

## The Setup

Add this to your project's `CLAUDE.md`:

```markdown
## Teaching Mode

For every project, you MUST create and maintain a file called `FOR_WEIHAO.md`
(or your name) that explains this project in plain language.

### Required Content

1. **Technical Architecture** - How the system is designed and why
2. **Codebase Structure** - What each folder/file does and how they connect
3. **Technology Choices** - What tools/libraries are used and why they were chosen
4. **Decision Reasoning** - The thinking behind key technical decisions

### Lessons Learned Section

Always include:
- Specific bugs encountered and how they were fixed
- Potential pitfalls to avoid in the future
- Insights into how experienced engineers approach these problems
- Patterns and anti-patterns discovered

### Writing Style

- Engaging, NOT boring textbook tone
- Use analogies to explain complex concepts
- Include anecdotes that make information memorable
- Write as if explaining to a curious junior developer
- Make it something you'd actually want to read
```

## Why This Works

This approach implements **high-engagement learning patterns**:

| Pattern | How Teaching Mode Applies |
|---------|--------------------------|
| Conceptual Inquiry | Forces explanation of "why", not just "what" |
| Generation-Then-Comprehension | Code gets written, then deeply explained |
| Hybrid Code-Explanation | Every implementation comes with context |

## Example Output

A `FOR_WEIHAO.md` might include:

```markdown
# Understanding the Auth System

## The Big Picture
Think of our auth like a nightclub bouncer. The JWT token is your
hand stamp - proves you already showed ID at the door...

## Why We Chose This Approach
We went with refresh tokens because... [explanation]

## The Bug That Taught Me Something
Spent 2 hours debugging why tokens expired early. Turns out
server time was UTC but I was comparing to local time.
Lesson: ALWAYS use UTC for time comparisons in distributed systems.
```

## The Benefit

You end up with:
- Personal documentation that actually makes sense to you
- A record of lessons learned (your own spaced-repetition material)
- Deeper understanding through the act of explanation
- A resource you can revisit when working on similar projects

## How LearnAI Team Could Use This

- **Student project documentation** — Ask students to maintain a personalized explanation file alongside their code so technical decisions become visible.
- **AI-assisted tutoring** — Use the setup to make Claude Code explain architecture, bugs, and tradeoffs while students build.
- **Capstone reflection** — Require the generated learning file as part of project submissions to capture lessons learned.
- **Instructor review aid** — Teachers can inspect the explanation file to see whether students understand the implementation, not just whether it runs.

## Real-World Use Cases

1. **Junior developer onboarding** — New engineers get plain-language explanations of a codebase as they work.
2. **Personal learning journal** — Developers build a durable record of bugs, fixes, patterns, and decisions across projects.
3. **Code review preparation** — Teams use the explanation file to clarify why major implementation choices were made.
4. **Self-study projects** — Learners turn every Claude Code session into structured technical notes they can revisit later.
