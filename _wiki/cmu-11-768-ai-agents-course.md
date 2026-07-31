---
title: "CMU 11-768 AI Agents — A Course Map for Agent Engineering"
date: 2026-07-31
category: Learning Resources
tags: [cmu, ai-agents, course, curriculum, agent-engineering, evaluation, reinforcement-learning, safety]
related: ["AI Agent Book — Agent = Model + Context + Tools", "What is Agentic Engineering? A Teaching Primer", "Agentic AI Engineer Roadmap 2026 — Eight Pillars from Prompt to Production", "AI Agent Primer — The Vocabulary Ladder and 18-Step Workflow", "AI Engineering from Scratch — Rohit Ghumare's 416-Lesson Math-to-MCP Curriculum"]
icon: "🎓"
image: "/assets/images/cmu-11-768-ai-agents-course.png"
---

CMU's **11-768 AI Agents** course is useful to LearnAI less as "another course link" and more as a signal of what a serious agent-engineering curriculum now includes: scaffolds, evaluations, training, safety, interaction, and a final research project. The course site currently frames it as a Fall 2026 graduate course on LLM-based AI agents.

*Source: [11-768 AI Agents course site](https://www.cmu-agents.com/) | [Graham Neubig announcement](https://www.linkedin.com/posts/graham-neubig-10b41616b_11-768-ai-agents-activity-7478496250892402688-rkaq) | July source screenshot: `IMG_2120.PNG`*

## What the course signals

The most important signal is the order of emphasis. Modern agent education is no longer just "prompting plus tools." The course framing points toward four competencies:

| Competency | Student should be able to |
|---|---|
| Build a scaffold | Put an LLM inside a controlled loop with state, tools, and interfaces |
| Build evaluations | Measure whether the agent completed the task, not just whether the answer sounded plausible |
| Train or adapt | Understand when SFT, RL, or other adaptation is appropriate |
| Secure the system | Reason about sandboxing, adversarial behavior, and unsafe actions |

That is a much stronger teaching model than a tool-of-the-week syllabus.

## A student-friendly module map

The course announcement and site metadata point to a broad syllabus. For LearnAI, the useful adaptation is this map:

```text
Week cluster 1: Agent capabilities
  tool use -> context management -> skills -> memory -> planning

Week cluster 2: Agent domains
  coding -> GUI/browser -> deep research

Week cluster 3: Training and systems
  SFT -> RL -> infrastructure -> evals

Week cluster 4: Safety and interaction
  sandboxing -> adversarial defense -> human-agent interaction
```

This sequence makes a good template for students because every cluster can end with a concrete build or critique assignment.

## Assignment pattern

| Assignment | What it teaches | Proof of learning |
|---|---|---|
| Build an agent harness | Agent loop, tool schemas, state | The agent completes a constrained task with logs |
| Create an agent evaluation | Task definition, success metrics | A benchmark where good and bad agents separate |
| Train or adapt an agent | Data, reward, policy change | Before/after behavior with evidence |
| Final research project | Open-ended agent engineering | Reproducible repo, report, and failure analysis |

The evaluation assignment is the load-bearing one. Without it, students can ship impressive demos that fail silently.

## How LearnAI should use this

Do not copy the course wholesale. Use it as a benchmark for what our own student-facing wiki should teach.

| LearnAI need | Adaptation |
|---|---|
| Beginner pathway | Pair with [AI Agent Primer](/learnAIDoc/wiki/ai-agent-primer-ladder-workflow/) and the AI Agent Book |
| Applied course project | Require a harness, an eval, and an agent trace |
| Research methods | Ask students to critique agent papers through the evaluation/safety lens |
| Faculty workshop | Use the four competency blocks as a 90-minute overview |

## Important things to know

- The course is tied to Fall 2026, so details may change as the semester runs.
- Use the live course site for schedule, assignments, and posted materials before assigning anything.
- Public materials can change during the semester. Check the live site for slides, recordings, assignments, and due dates before building a class around them.
- The course is graduate-level. For undergraduates or non-CS students, start with vocabulary and harness labs before RL.

## How LearnAI Team Could Use This

- **Curriculum audit** — check whether our student wiki covers scaffold, eval, training, safety, and interaction.
- **Project rubric** — grade agent projects on evidence, not demo polish: task definition, logs, safety boundaries, and evaluation design.
- **Reading sequence** — assign this entry after the AI Agent Book overview so students see the academic course version of the same field.

## Real-World Use Cases

| Scenario | Use |
|---|---|
| Designing an AI-agent course | Use the competency blocks as syllabus guardrails |
| Planning student projects | Require harness + eval + trace as minimum deliverables |
| Faculty AI literacy | Explain why agent systems are engineering systems, not just prompts |
| Research group onboarding | Map each student project to one course competency |
