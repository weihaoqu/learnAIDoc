---
title: "AI Research Tools Landscape: FARS vs AutoResearch vs ARIS vs Elicit"
date: 2026-04-26
category: AI for Research
tags: [ai-research, automation, fars, autoresearch, aris, elicit, deep-research, autonomous-agents]
related: ["Autoresearch: 100 Autonomous ML Experiments Overnight", "Awesome-Auto-Research-Tools — A Curated Map of Automated-Science Projects"]
icon: "🔬"
image: "/assets/images/ai-research-tools-landscape.png"
---

FARS, AutoResearch, ARIS, and Elicit all claim to help with AI research — but they take completely different approaches. The key insight: these aren't competing products, they're solving different problems along the research pipeline. Understanding which part of research each tool automates is more useful than asking "which is best."

*Source: [FARS by Analemma AI](https://analemma.ai/) | [AutoResearch by Karpathy](https://github.com/karpathy/autoresearch) | [ARIS](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | [Elicit](https://elicit.com/) | [Lei Mao's FARS Review](https://leimao.github.io/blog/How-Is-FARS/)*

## The Three Philosophies

These tools fall into three distinct categories based on what they believe AI should do in research:

```
Philosophy 1: AI DOES the research (FARS)
  └── Full autonomy: idea → plan → experiment → paper

Philosophy 2: AI RUNS the experiment loop (AutoResearch, ARIS)
  └── Human sets direction, AI iterates on code/experiments

Philosophy 3: AI ASSISTS with information (Elicit, Deep Research)
  └── Literature review, synthesis, organization — no experiments
```

| Tool | Philosophy | What It Automates | Human Role |
|------|-----------|-------------------|------------|
| **FARS** | AI does research | Entire pipeline: ideation → writing | Observer / evaluator |
| **AutoResearch** | AI runs experiments | Code modification → training → evaluation loop | Sets `program.md` direction |
| **ARIS** | AI runs experiments + writing | Experiments, paper writing, rebuttals, with cross-model review | Sets research direction |
| **Elicit** | AI assists gathering | Literature search, data extraction, synthesis | Drives the research actively |

## FARS: The Fully Automated Research System

Built by Analemma AI, FARS is the most ambitious — it attempts end-to-end autonomous research with zero human involvement during execution.

**The Live Experiment:** In February 2026, FARS ran a public livestream producing 100 papers over 228 hours using 160 GPUs and 11.4 billion tokens. Results:

| Metric | FARS | Human Baseline |
|--------|------|---------------|
| Average review score | 5.05 (range 3.0–6.3) | ICLR 2026 submissions avg: 4.21 |
| Accepted paper threshold | — | ICLR 2026 accepted avg: 5.39 |

**Pipeline:** Projects advance through a queue with four stages: Ideation → Planning → Experiment → Writing. Multiple projects run in parallel, assembly-line style.

**The catch:** FARS requires massive compute (160 GPU cluster) and produced papers of mixed quality. The average score beats typical human submissions but falls short of accepted papers. The deeper question: are these papers genuinely novel, or are they sophisticated recombinations?

## AutoResearch: The Overnight Experiment Loop

Created by Andrej Karpathy, AutoResearch takes a narrower but more practical approach: AI modifies code, trains for 5 minutes, checks metrics, and repeats.

```
Human writes program.md (research direction)
         ↓
    ┌─────────────┐
    │  Agent reads │
    │  program.md  │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │ Modify       │ ← Only touches train.py
    │ train.py     │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │ Run 5-min    │
    │ experiment   │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │ Evaluate     │ ← Validation bits-per-byte
    │ results      │
    └──────┬──────┘
           ↓
     Keep or discard
           ↓
        Repeat (~12/hour, ~100 overnight)
```

**Design philosophy:** Simplicity over ambition. Three files: `prepare.py` (immutable), `train.py` (agent modifies), `program.md` (human guides). The fixed 5-minute training window ensures fair comparison across experiments.

**Best for:** ML optimization, architecture search, hyperparameter tuning on a single GPU.

## ARIS: Research Engineering with Cross-Model Review

ARIS (Auto-Research-In-Sleep) is the most feature-rich, combining experiment automation with paper writing, rebuttal generation, and a unique cross-model adversarial review system.

**Key innovation:** Two-model architecture to avoid self-play blind spots:
- **Executor:** Claude Code (fast execution)
- **Reviewer:** GPT-5.4 via Codex MCP (rigorous critique)

**Four workflows:**

| Workflow | Purpose | Phases |
|----------|---------|--------|
| **1: Idea Discovery** | Generate research ideas | Literature scan → idea generation → cross-model review |
| **1.5: Experiment Bridge** | Run experiments | Auto-debug, OOM/CUDA retry, queue management |
| **3: Paper Writing** | Multi-phase writing | 6+ phases including claim audit and citation verification |
| **4: Rebuttal** | Conference rebuttal | 7 phases, 3 safety gates |

**Assurance layers:** Experiment audit (detects fake results), claim audit (verifies numbers against raw data), citation audit (checks appropriateness), proof checker (20-category math taxonomy).

**Zero lock-in:** The entire system is plain Markdown SKILL.md files — no framework, no database, no Docker. Works with Claude Code, Codex, Cursor, or any agent.

**Track record:** Papers built with ARIS scored 8/10 ("clear accept") at a CS conference and 7/10 at AAAI 2026.

## Elicit / Deep Research: The Literature Assistant

Unlike the others, Elicit doesn't run experiments — it's built for the information-gathering phase of research.

**Strengths:**
- Find up to 1,000 relevant papers per query
- Analyze up to 20,000 data points at once
- Extract structured data across multiple papers
- Systematic review automation

**Limitations:**
- Restricted to published academic literature
- No web browsing, no experiment execution
- No code generation or modification

**Best for:** Literature reviews, systematic reviews, finding related work, extracting trends across large paper collections.

## Which Tool for Which Research Phase?

```
Research Phase          Best Tool(s)
─────────────────────────────────────────
Literature review  →    Elicit, Deep Research
Idea generation    →    ARIS (Workflow 1), FARS
Experiment design  →    ARIS (Workflow 1.5)
Running experiments →   AutoResearch, ARIS
Analysis/results   →    AutoResearch (auto-eval)
Paper writing      →    ARIS (Workflow 3)
Rebuttal prep      →    ARIS (Workflow 4)
Full autopilot     →    FARS (if you have 160 GPUs)
```

## The Real Question

The original Weibo post that sparked this comparison nailed it: the question isn't "which is strongest" but "which workflow will actually change daily research?"

- If you want to **explore ideas broadly** → Elicit + Deep Research
- If you want to **optimize a model overnight** → AutoResearch
- If you want a **full research engineering pipeline** → ARIS
- If you want to **study what fully automated research looks like** → FARS

Most working researchers will benefit most from combining Elicit (for literature) with either AutoResearch or ARIS (for experiments) — not from going full-autopilot with FARS.

## How LearnAI Team Could Use This

- **AutoResearch** for running overnight experiment sweeps on ML projects
- **ARIS** for end-to-end paper writing workflows with built-in quality assurance
- **Elicit** for systematic literature reviews when preparing grants or survey papers
- **Teaching material** — the comparison itself is a useful framework for discussing AI's role in research methodology

## Real-World Use Cases

- **PhD students** — ARIS for first conference paper with rebuttal support; Elicit for literature surveys
- **ML engineers** — AutoResearch for architecture search and hyperparameter optimization
- **Research labs** — FARS as a benchmark for understanding fully automated research capabilities
- **Grant writing** — Elicit for comprehensive related work sections
