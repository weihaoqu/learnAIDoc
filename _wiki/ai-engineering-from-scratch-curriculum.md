---
title: "AI Engineering from Scratch — Rohit Ghumare's 416-Lesson Math-to-MCP Curriculum"
date: 2026-05-10
category: Learning Resources
tags: [ai-engineering, curriculum, learning, open-source, mit-license, from-scratch, math, ml, deep-learning, llm, agents, mcp, multimodal, claude-code, skills, rohit-ghumare]
related: ["Agentic AI Engineer Roadmap 2026 — Eight Pillars from Prompt to Production", "Stanford CS336 — Language Modeling from Scratch: The Complete Free LLM Curriculum", "TensorTonic — Learn Machine Learning by Implementing 200+ Algorithms from Scratch", "Karpathy's MicroGPT — A Complete GPT in 200 Lines of Pure Python", "AI Learning Roadmap 2026 — Best Courses, Certs & YouTube Channels", "Mathematical Foundations of Reinforcement Learning — Free Textbook by Shiyu Zhao", "Claude Code Skills: Resources & Repos", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era"]
icon: "📚"
image: "/assets/images/ai-engineering-from-scratch-curriculum.png"
---

Rohit Ghumare's `ai-engineering-from-scratch` is an unusually broad open-source AI curriculum that surfaced in 2026: **416 lessons across 20 phases (00–19)**, taking a learner from raw linear algebra to shipping a multi-agent system on MCP — with every algorithm derived from math *first*, then re-implemented with frameworks, then shipped as a reusable artifact (prompt, skill, agent, or MCP server). ~7K stars on the repo at the time of writing, MIT-licensed, and structured so individual phases can be forked as standalone bootcamps. It is the closest single-repo attempt at "learn the full stack of modern AI from one place."

*Source: [GitHub — rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | [Course site — aiengineeringfromscratch.com](https://aiengineeringfromscratch.com/) | [Rohit Ghumare on X — @ghumare64](https://x.com/ghumare64) | [Skillget listing](https://skillget.dev/listings/rohitg00-ai-engineering-from-scratch) | [Weibo highlight by 蚂工厂](https://weibo.com)*

## The Pitch

> "84% of students already use AI tools. Only 18% feel prepared to use them professionally."

The curriculum exists to close that gap. Not "learn ChatGPT prompts" — actually learn what's happening when you call a model. Every phase ends with a working artifact you can install into Claude Code, Cursor, or any MCP-compatible agent.

## The 20 Phases

| # | Phase | Lessons |
|---|-------|---------|
| 0 | Setup & Tooling | 12 |
| 1 | Math Foundations | 22 |
| 2 | ML Fundamentals | 18 |
| 3 | Deep Learning Core | 13 |
| 4 | Computer Vision | 28 |
| 5 | NLP: Foundations to Advanced | 29 |
| 6 | Speech & Audio | 17 |
| 7 | Transformers Deep Dive | 14 |
| 8 | Generative AI | 14 |
| 9 | Reinforcement Learning | 12 |
| 10 | LLMs from Scratch | 22 |
| 11 | LLM Engineering | 15 |
| 12 | Multimodal AI | 25 |
| 13 | Tools & Protocols (MCP, A2A) | 23 |
| 14 | Agent Engineering | 30 |
| 15 | Autonomous Systems | 22 |
| 16 | Multi-Agent & Swarms | 25 |
| 17 | Infrastructure & Production | 28 |
| 18 | Ethics, Safety & Alignment | 30 |
| 19 | Capstone Projects | 17 projects |

**Total:** 20 phases (00–19), 416 lessons, an estimated ~320 hours end-to-end, **MIT license**. Languages used across implementations: Python (primary), TypeScript, Rust, Julia.

The phases stack — Phase 1 is for someone new to ML, Phase 10 for someone already fluent in deep learning, Phase 14 for someone with senior engineering background. You don't have to start at 0; Phase 0 (Setup & Tooling) is the on-ramp for learners who want a guided environment setup.

## Lesson Anatomy — The 6-Step Arc

Every lesson follows the same shape, which is the secret of the curriculum's coherence:

```
1. Motto       — the one-line core idea
2. Problem     — concrete pain that this lesson solves
3. Concept     — intuition and visual diagrams
4. Build It    — derive the algorithm from raw math, no frameworks
5. Use It      — re-implement using PyTorch / scikit-learn / etc.
6. Ship It     — produce a reusable artifact: prompt, skill, agent, or MCP server
```

**Step 4 is the pedagogical bet.** By the time PyTorch shows up in step 5, you already know what the framework is hiding. This is the "build a GPT from scratch then use HuggingFace" approach scaled to the entire stack.

**Step 6 is the productivity multiplier.** Every lesson outputs something you can immediately reuse — a prompt template for a workflow, a SKILL.md for Claude Code, an agent definition, an MCP server. The curriculum doubles as a personal toolkit.

## File Layout

```
ai-engineering-from-scratch/
├── phases/
│   └── 14-agents/
│       └── 03-reflexion/
│           ├── docs/en.md         # narrative + diagrams
│           ├── code/              # implementations
│           │   ├── from-scratch/  # raw-math version
│           │   └── framework/     # PyTorch / langchain version
│           └── outputs/           # the shippable artifact
│               ├── prompt.md
│               ├── SKILL.md
│               ├── agent.json
│               └── mcp-server/
```

Reusable artifacts get aggregated into [SkillKit](https://github.com/rohitg00/skillkit) — Rohit's complementary install layer that turns this curriculum's outputs into a personal agent library.

## Built-In Claude Code Skills

The course ships two Claude Code skills:

- **`/find-your-level`** — a placement quiz that drops you at the right phase based on your existing math + ML + LLM background
- **`/check-understanding <phase>`** — a per-phase eval that grades your grasp on the math, the code, and the artifact

This makes the curriculum *adaptive* in a way most free courses aren't.

## What This Is Not

To save time:

- **Not videos.** No 5-minute lecture clips. Markdown + diagrams + code that runs on your laptop.
- **Not API tutorials.** The point is to understand the abstraction beneath the API.
- **Not a bootcamp.** No instructor, no cohort. You set the pace; the artifacts measure progress.
- **Not a survey course.** Each lesson goes deep enough that you can re-derive the result without notes.

## How It Compares

| Resource | Strength | Where This Wins |
|----------|----------|-----------------|
| **Stanford CS336** | Rigorous LM-focused course | This is 5× broader (math → multi-agent → MCP) |
| **Karpathy YouTube** | Iconic from-scratch builds | This is structured 416-lesson curriculum, not standalone videos |
| **Andrew Ng / deeplearning.ai** | Polished video courses | This goes deeper into agents, MCP, production, and ships artifacts |
| **fast.ai** | "Top-down" applied DL | This is "bottom-up" — derive first, then frame |
| **Hugging Face course** | Excellent for transformers + NLP | This covers full stack including agents, RL, MCP, safety |
| **Agentic AI Engineer Roadmap 2026** | 8-pillar roadmap (curated reading list) | This is the actual implementation curriculum behind that roadmap |

## How to Use It Pragmatically

~320 hours is a lot. Three realistic paths:

1. **Cover-to-cover (rough order of one year at ~6 hrs/week):** for full-stack mastery. The capstone projects make this resume-credible.
2. **Phase-by-phase, on-demand:** drop into the phase you need for current work. Most lessons are self-contained.
3. **Artifacts-first:** skim Steps 1–3 of each lesson, build the Step 6 outputs directly into your Claude Code skill library, learn the depth later when an artifact misbehaves.

Path 3 is closest to Boris Cherny–style workflows — ship the artifact, learn the theory when something breaks.

## How LearnAI Team Could Use This

- **Fork as a LearnAI-branded curriculum.** MIT license + explicit forking guide. Rename phases, add LearnAI-specific case studies, gate cohorts on `/check-understanding` evals.
- **Phase 14 (Agent Engineering) as a standalone course.** 30 lessons — a coherent module on agentic AI for a LearnAI cohort.
- **Phase 13 (Tools & Protocols, MCP, A2A) as MCP onboarding.** Replace your team's "intro to MCP" doc with this phase.
- **Capstone projects (Phase 19) as graded final projects.** 17 end-to-end shipping projects — a strong fit for a semester capstone.
- **Mine the `outputs/` folders for skill templates.** With 416 lessons each shipping a reusable artifact, the cumulative library of prompts / SKILL.md / agents / MCP servers is substantial.
- **Run `/find-your-level` on incoming students** to place them by ability, not by year-in-school.

## Real-World Use Cases

- **Self-taught engineers** — the "math-first" approach builds real intuition that lets you debug models, not just train them.
- **Career-changers** — the artifact-shipping structure makes every lesson a portfolio piece. By Phase 14, your GitHub is a credible AI-engineering resume.
- **Bootcamp providers** — fork it, rebrand, layer cohort support. The hardest part (curriculum design) is done.
- **Internal upskilling programs** — corporate L&D teams can adopt this as the "AI engineering" track. Cheap, MIT-licensed, current.
- **Research orgs** — Phase 1, 7, 8, 9, 10 are sufficient grounding for ML-research onboarding. Cheaper than a master's program.
- **MCP / Claude Code skill authors** — every artifact in `outputs/` is a starting template for production skills.

## Links

- **Main repo:** [github.com/rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) (7K+ stars, MIT)
- **Course site:** [aiengineeringfromscratch.com](https://aiengineeringfromscratch.com/)
- **SkillKit (companion):** [github.com/rohitg00/skillkit](https://github.com/rohitg00/skillkit)
- **Forking guide:** [FORKING.md](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/FORKING.md)
- **Author:** [@ghumare64 on X](https://x.com/ghumare64)
