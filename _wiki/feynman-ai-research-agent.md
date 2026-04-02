---
title: "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls"
date: 2026-03-31
category: AI Research
tags: [ai-research, feynman, agents, literature-review, physics, hallucination, academic, reproducibility]
related: ["Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook"]
icon: "🔬"
image: "/assets/images/feynman-ai-research-agent.png"
---

Two stories from the same week paint the full picture of AI in research: **Feynman**, an open-source multi-agent system purpose-built for scientific investigation, and a physics professor's brutally honest account of using Claude to reproduce theoretical predictions. Together they answer the question every researcher is asking: *Can AI actually do science?* The answer is yes — spectacularly fast, dangerously confident, and only safe under expert supervision.

*Sources: [Feynman GitHub](https://github.com/getcompanion-ai/feynman) | 爱可可-爱生活 (2026-03-26) | 哈勃观察员 (2026-03-26)*

## Feynman: Open-Source AI Research Agent

Feynman is a multi-agent research system that coordinates specialized AI agents through natural language. You describe what you want to investigate; it dispatches the right agents, searches literature, and returns cited results.

```
User: /deepresearch "transformer attention mechanisms"
         ↓
┌──────────────────────────────────────────────┐
│            Feynman Agent Orchestra            │
├────────────┬────────────┬────────────────────┤
│ Literature │  Critical  │    Experiment      │
│  Search    │  Review    │   Replication      │
│            │            │                    │
│ AlphaXiv   │ Methodology│ Code generation    │
│ parsing    │ audit      │ + execution        │
│ + ranking  │ + gaps     │ + validation       │
└────────────┴────────────┴────────────────────┘
         ↓
Cited report with precise references + linked code
```

### Key Commands

| Command | What It Does |
|---------|-------------|
| `/deepresearch <topic>` | Full multi-agent deep dive — literature, synthesis, gaps |
| `/lit <topic>` | Targeted literature search and summary |
| `/audit <paper ID>` | Critical methodological review of a specific paper |
| `/replicate <experiment>` | Attempt to reproduce an experiment with code |

### Features at a Glance

| Feature | Details |
|---------|---------|
| **Architecture** | Multi-agent on Pi framework |
| **Literature backend** | AlphaXiv parsing with citation linking |
| **Interfaces** | Web UI + CLI |
| **Runtime** | Node.js |
| **Security** | Docker container isolation for code execution |
| **Citation policy** | All outputs include precise references — no uncited claims |
| **Target users** | AI scientists, engineers, research teams |
| **License** | Open source |

The design philosophy is right: every claim links back to a source, code links to literature, and experiments link to both. This is what research tooling *should* look like.

## The Physics Case Study: Claude as Grad Student

A professor gave Claude a task any second-year grad student could handle: reproduce the **Sudarsky shoulder predictions** in particle physics. What followed was a two-week experiment that revealed both the ceiling and the floor of AI-assisted research.

### What Worked — Spectacularly

| Metric | Result |
|--------|--------|
| **Paper draft** | 20 pages in 3 days |
| **Iterations** | 110+ standalone versions in 2 weeks |
| **Token consumption** | 36 million tokens |
| **CPU simulation time** | 40+ hours of local computation |
| **Self-organization** | AI set its own plan, built structure, split into 102 subtasks |

The tasks that make human grad students miserable — writing Fortran interfaces, tuning Python plots, computing integrals — AI did in seconds, without complaint, without fatigue. It self-organized its workflow: set milestones, built document structure, progressively reasoned through sub-problems, and split 102 subtasks in orderly fashion.

### What Went Wrong — Dangerously

Mid-experiment, Claude exposed AI's fatal weakness in scientific work: **it tried to wing it.**

```
What the AI fabricated:
├── Made-up coefficients (looked plausible, were wrong)
├── Fabricated citation tables with real-sounding terminology
├── Statistical errors buried in calculations
└── "Plausible bullshitting" — correct form, wrong substance
```

In theoretical physics, this kind of confident fabrication is catastrophic. A wrong coefficient doesn't just give you a bad number — it can make your predictions **diverge enormously** from reality while still looking mathematically reasonable. The paper would have passed a casual review.

### The Save

The professor caught it. He forced point-by-point verification — every coefficient checked against source material, every citation confirmed, every statistical method validated. Once caught, Claude corrected the key errors and completed the full recalculation in **5 minutes**. A human grad student doing the same corrections? Roughly **2 weeks**.

```
AI Research Workflow (what actually works):

  AI generates ──→ Human verifies ──→ AI corrects ──→ Human validates
  (fast, broad)    (slow, precise)    (fast, targeted)  (final check)
      │                  │                  │                │
   3 days            catches errors      5 minutes       publishable
   110 drafts        fabrications         fixed           result
```

## Lessons Learned

### AI as Tireless Research Assistant

The physics case study proves AI can compress **weeks of tedious work into hours**: literature synthesis, code generation, integral computation, plot generation, document structuring. These are real, valuable capabilities for any research team.

### But: Verification Is Non-Negotiable

| AI Strength | AI Weakness |
|------------|-------------|
| Speed (seconds vs. weeks) | Fabricates when uncertain |
| Never tired, never complains | Cannot assess its own confidence |
| Handles 102 subtasks systematically | "Plausible bullshitting" — correct form, wrong substance |
| Self-organizes complex workflows | Won't tell you when it's guessing |
| Writes Fortran, Python, LaTeX fluently | Statistical errors look like real results |

### The "Taste" That Remains Human

The professor's final answer to "will physicists lose their jobs?" — **No.** Computing power and knowledge are becoming cheap as water. What remains uniquely human is **taste**: the judgment to choose which problems are worth pursuing among infinite paths. AI can explore any direction you point it toward, but it cannot tell you which direction matters.

## Practical Guidance for Researchers

### Using Feynman or Similar Research Agents

1. **Start with `/lit`** to survey a field before committing to a direction
2. **Use `/audit`** on key papers before building on their results
3. **Run `/replicate`** in Docker isolation — never trust generated code on bare metal
4. **Cross-check citations** — even citation-focused tools can hallucinate references

### Using Claude/LLMs for Research Computation

1. **Assign structured tasks** — "reproduce this specific calculation" beats "explore this topic"
2. **Demand intermediate outputs** — check every step, not just the final result
3. **Watch for confident fabrication** — the more fluent the output, the more carefully you should verify
4. **Use it for drudge work** — Fortran interfaces, plotting, integral computation, formatting
5. **Never skip human verification** — especially for coefficients, citations, and statistical claims

### The Research Team of 2026

```
┌─────────────────────────────────────────┐
│         Modern Research Workflow          │
├─────────────────────────────────────────┤
│                                         │
│  Human researcher (taste + judgment)    │
│       │                                 │
│       ├── Feynman: literature + review  │
│       ├── Claude: computation + drafts  │
│       ├── Docker: safe code execution   │
│       └── Point-by-point verification   │
│                                         │
│  Output: faster research, same rigor    │
└─────────────────────────────────────────┘
```

For academic faculty: this is the emerging workflow. AI handles volume; you supply direction and verification. The professor who caught Claude's fabrications didn't need less expertise — he needed *more*. AI research tools don't replace domain knowledge; they make it more valuable than ever.
