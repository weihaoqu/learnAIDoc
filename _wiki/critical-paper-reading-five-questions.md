---
title: "Five Questions for Critical Paper Reading — The Cambridge Method with Claude"
date: 2026-03-22
category: Learning Resources
redirect_from:
  - "/wiki/ai education/critical-paper-reading-five-questions/"
tags: [academic-reading, critical-thinking, claude, research, papers, education, methodology]
related: ["Three Hidden Instructions That Stop Claude from Hallucinating", "AI Research & Thinking Toolkit: 13 Power Prompts", "Claude-Prism — Local-First Academic Writing Workspace with AI", "alphaXiv MCP — Semantic ArXiv Search Directly in Claude Code", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook"]
icon: "📖"
image: "/assets/images/critical-paper-reading-five-questions.png"
---

A viral thread revealed how Cambridge students use Claude to develop critical paper reading skills in 20 minutes that normally take 3 years of graduate training. The method: five targeted questions that force you *inside* a paper's logic rather than just summarizing its surface. The paper doesn't change — the questions change how you see it.

*Source: [X post by @abxxai](https://x.com/abxxai/status/2033473869248610584) | [Claude for Reading Papers — Hans Henrik Sievertsen](https://hanshenriksievertsen.substack.com/p/claude-for-reading-papers)*

## The Five Questions

Most students read papers by highlighting → summarizing → forgetting. That's passive reading. These five questions force **active interrogation**:

| # | Question | What It Reveals |
|---|----------|----------------|
| 1 | **Can the methods and results logically lead to what they claim?** | Whether the paper's conclusions actually follow from its evidence |
| 2 | **What did the study NOT measure, and what assumptions does the methodology silently make?** | Hidden variables, unquestioned premises, measurement blind spots |
| 3 | **If you swap the population or context, would the results hold?** | Generalizability limits, cultural/contextual dependencies |
| 4 | **What debate is this paper responding to, and what position is it taking?** | The paper's place in the intellectual landscape, its implicit arguments |
| 5 | **What key references are missing from the bibliography?** | Potential bias in literature selection, overlooked counter-evidence |

## Why This Works

```
Most students (3 years to develop):
  Read → Highlight → Summarize → Accept
        "What does it say?"

Cambridge method (20 minutes):
  Read → Question → Challenge → Position
        "What does it NOT say?"
```

The shift is from **comprehension** (understanding what the paper says) to **critique** (understanding what the paper *assumes, omits, and implies*). This is the core skill that separates undergraduate reading from graduate-level analysis.

## Using Claude as Your Critical Reading Partner

The key insight: **this is about making YOU think, not making Claude summarize**. Give Claude the paper, then ask it these five questions. But the real learning happens in how you *react* to Claude's answers:

```markdown
## Prompt Template

I'm reading [paper title]. I want to develop critical reading
skills, not just get a summary.

For each of the following questions, give me your analysis,
then ask me a follow-up question that pushes my thinking further:

1. Do the methods and results logically support the claims?
2. What wasn't measured? What assumptions are silent?
3. Would these results hold if the population or context changed?
4. What intellectual debate is this paper positioned within?
5. What important references are missing?

After answering, challenge me: what's the strongest objection
someone could make to this paper's core argument?
```

## The Debate in the Community

The thread sparked pushback:

| Concern | Response |
|---------|----------|
| "The prompt words themselves look AI-generated" | Fair — but the *method* works regardless of who wrote it |
| "If she actually read the paper, she'd already know the answers" | The point is developing the *habit* of asking these questions, not getting answers |
| "This makes Claude do your critical thinking for you" | Only if you stop at Claude's answers — the method is designed to *prompt your own thinking* |

The deeper tension: using AI to build skills that AI could replace. The argument for it: the five questions create a **mental checklist** that eventually becomes automatic. Once internalized, you don't need Claude anymore — you ask these questions yourself.

## Workflow: From 3 Years to 20 Minutes

```
Traditional Graduate Training:
Year 1: Learn to read methods sections carefully
Year 2: Learn to spot methodological assumptions
Year 3: Learn to position papers in debates
→ Eventually develops intuition for all five questions

Accelerated with Claude:
Minute 1-5:   Read abstract + introduction
Minute 5-10:  Ask Claude the five questions about the paper
Minute 10-15: Read Claude's analysis, compare with your instincts
Minute 15-20: Formulate your own position on the paper
→ Compresses the learning loop, not the skill itself
```

## For Educators

This method is particularly valuable for teaching critical thinking in courses that assign paper reading. Instead of asking students to "summarize the paper," assign the five questions as the reading response format. The questions work across disciplines — from biology to political science to computer science.

Consider pairing with Anthropic's [AI Fluency for Educators](https://anthropic.skilljar.com/) course for integrating Claude responsibly into classroom workflows.

## How LearnAI Team Could Use This

- **Paper-reading workshops** — turn the five questions into a repeatable classroom activity for research literacy
- **Prompt library module** — add the template as a reusable prompt for students reviewing papers with Claude
- **Graduate-skills accelerator** — use the method to teach assumptions, limitations, and missing references explicitly
- **Research coaching** — help learners move from summaries to defensible critiques of academic work

## Real-World Use Cases

- **Journal clubs** — structure discussion around evidence, assumptions, context, debate, and missing citations
- **Literature reviews** — identify gaps and overlooked counter-evidence before writing a synthesis
- **Thesis supervision** — help students defend why a paper's claims do or do not follow from its methods
- **Peer review practice** — train reviewers to critique limitations instead of only summarizing contributions
