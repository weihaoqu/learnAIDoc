---
title: "PaperSpine — Motivation-Driven Paper Writing Skill Suite for Codex and Claude Code"
date: 2026-05-21
category: AI Tools & Workflows
tags: [paper-writing, academic-writing, claude-code, codex, latex, manuscript, research-workflow, motivation-driven, evidence-bank, writing-rationale]
related: ["Academic Research Skills for Claude Code — From Search to Final Draft", "AI Agent Academic Research Writing — Claude-Based Research-to-Paper Pipeline", "Posterskill — AI-Generated Academic Conference Posters from Your Paper"]
icon: "📄"
image: "/assets/images/paperspine-ai-paper-writing.png"
---

**A manuscript construction skill suite (GitHub: WUBING2023/PaperSpine, ~240 stars as of May 2026, created May 2026) that runs inside Codex (`$paper-spine`) and Claude Code (`/paperspine`). Its defining feature: it refuses to start writing until a `confirmed_motivation.md` exists. Every section, every claim, and every revision is traced back to that central motivation — producing a writing rationale matrix that documents not just what each section says but why it belongs in the paper at all.**

*Source: [Weibo post, May 2026] + [github.com/WUBING2023/PaperSpine](https://github.com/WUBING2023/PaperSpine)*

## What Problem It Solves

Most AI writing tools start from a prompt: "write me an introduction for a paper about X." PaperSpine treats this as the wrong starting point. A paper isn't a collection of sections — it's an argument, and an argument has a spine. Without confirmed motivation, individual sections can be well-written while the paper as a whole fails to cohere.

The toolkit enforces a motivation-first discipline:

```
Confirm motivation → Research SOTA → Build evidence bank
→ Section blueprint → Writing rationale matrix
→ Draft section by section → Revision audit trail
→ Final output (LaTeX + .bib, optional DOCX, optional PDF, optional CN translation)
```

Every artifact in the pipeline answers to the central motivation. If a section can't be justified against the motivation, the rationale matrix exposes it before the writing happens.

## Two First-Class Workflows

**Workflow 1: Rewrite Existing**
You have a manuscript — a draft, a rejected submission, a course report that needs journal quality. PaperSpine audits the existing structure against the motivation it extracts, identifies what to restructure or cut, and rebuilds with a rationale matrix that documents every change.

**Workflow 2: Build From Materials**
You have notes, figures, data summaries, partial drafts, PDFs — but no finished manuscript. PaperSpine assembles the paper from raw inputs, confirming motivation first, then constructing the evidence bank before a word of the main text is written.

Both workflows produce the same artifact set at the end. The difference is the starting point.

## The Central Artifact: Writing Rationale Matrix

The `writing_rationale_matrix.md` is PaperSpine's signature output and the thing that distinguishes it from general-purpose writing assistants:

| Column | What it records |
|--------|----------------|
| **Section** | Which part of the paper (Introduction, Methods, etc.) |
| **Unit purpose** | What this section does for the argument |
| **Motivation link** | How it serves the confirmed central motivation |
| **SOTA lessons** | What was learned from the example papers that informed this section's approach |
| **Evidence support** | Which items from the evidence bank underpin the claims here |
| **Text checks** | Specific checks the draft must pass (no unsupported claims, venue tone match, etc.) |

This matrix is the audit trail. A coauthor, advisor, or reviewer can read it and immediately see whether the paper is arguing coherently or drifting. It is also the primary input for revision: when a reviewer asks you to reframe the contribution, you update the matrix first, then the text.

## Research Phase: Flash vs. Pro

Before any writing, PaperSpine runs a structured literature survey:

| Mode | Papers surveyed | Use when |
|------|----------------|---------|
| **flash** | 3 SOTA examples + 3 recent papers | Time-limited; quick positioning |
| **pro** | 6 SOTA examples + 6 recent papers | Full submission; want deep venue calibration |

The output feeds directly into the evidence bank and informs which claims the rationale matrix will flag as requiring citation.

## Evidence Bank and Claim Register

No claim enters the draft without a corresponding entry in the claim register. The claim register tracks:

- The claim itself
- The evidence bank item(s) that support it
- The section where it appears
- Whether it has been verified against a fetched or provided source

This is the structural answer to hallucination: not a prompt that says "only make claims you can support," but an artifact that makes unsupported claims visible before submission.

## Output Formats

| Format | Notes |
|--------|-------|
| `main.tex` + `.bib` | Always produced; journal/conference-ready LaTeX |
| `.docx` | Optional; for advisors or coauthors who don't use LaTeX |
| PDF | Optional; compiled from LaTeX |
| Chinese translation package | Optional; full CN translation of the finished paper |

## Installation and Invocation

**Codex:**
```
$paper-spine
```
Bundled skill in `dist/codex/paper-spine/`. Available after plugin install.

**Claude Code:**
```
/paperspine
```
Flat skill suite in `dist/claude/`. Install via:
```
/plugin marketplace add https://github.com/WUBING2023/PaperSpine
/plugin install paper-spine
/reload-plugins
```

Both environments run the same underlying workflow; the invocation surface adapts to the tool.

## How It Differs from academic-research-skills (Imbad0202)

These are complementary academic writing suites, not overlapping:

| Dimension | academic-research-skills (Imbad0202) | PaperSpine (WUBING2023) |
|-----------|--------------------------------------|-------------------------|
| **Primary focus** | Research workflow — finding, organizing, synthesizing literature | Manuscript construction — writing, rationale, revision |
| **Entry point** | A research question | A motivation or existing draft |
| **Signature mechanism** | Socratic intent detection + PRISMA systematic review | Writing rationale matrix + claim register |
| **Review simulation** | Yes (EIC + 3 reviewers + Devil's Advocate) | No |
| **LaTeX output** | Yes (via academic-paper skill) | Yes (core output) |
| **Evidence tracking** | Via systematic review pipeline | Via evidence bank + claim register |
| **Best for** | Researchers who need to master the literature before writing | Writers who have the material and need to construct the argument |

The ideal pipeline for a serious paper: use academic-research-skills to master the literature, then hand the evidence to PaperSpine to construct the manuscript.

## How LearnAI Team Could Use This

- **Paper writing module for grad students** — PaperSpine's motivation-first discipline maps directly onto the advice faculty give in every thesis seminar. Teaching it as a skill puts a structure around advice that is usually informal ("make sure your paper has a clear argument").
- **Undergraduate writing quality** — Use the rationale matrix as a grading scaffold: does each section justify its existence against the paper's central claim? Students who use PaperSpine will naturally produce papers that answer this question.
- **Research methods courses** — The evidence bank + claim register is a practical implementation of the "every claim needs a citation" rule. Assign it as infrastructure, not just as a style guide.
- **Academic integrity framing** — PaperSpine is a strong example of AI-augmented writing that keeps the researcher in the epistemic loop. The model drafts; the human controls the motivation, verifies the evidence, and owns the argument. Use it to demonstrate responsible AI use in research.
- **Conference/journal submission preparation** — The flash vs. pro research modes map onto time constraints real researchers face. A short workshop paper can run flash; a journal submission should run pro.

## Real-World Use Cases

| Scenario | How to use |
|---|---|
| Rejected manuscript revision | Use "Rewrite Existing" workflow; the rationale matrix will surface structural problems a reviewer reacted to but couldn't articulate |
| PhD thesis chapter | Confirm motivation at the chapter level; use the matrix to ensure the chapter argument is coherent before drafting 20,000 words |
| Conference deadline crunch | Run "flash" research mode; limit the claim register to the 5–7 claims the paper absolutely must make; draft to the matrix |
| Collaborative paper with international coauthors | The rationale matrix serves as a shared document all coauthors can read and challenge before writing begins, reducing revision cycles |
| Course research paper (undergraduate) | Lower the bar: use it with 2 SOTA + 2 recent papers; the claim register teaches citation discipline as a workflow, not just a rule |
| Multi-language submission | Use the Chinese translation package for papers targeting Chinese venues without a separate translation step |

## Important Things to Know

- **Very new.** Created May 17, 2026 — ~240 stars (as of May 2026) in days, which means the workflow is less battle-tested than academic-research-skills (which has 18K+ stars). Expect rough edges.
- **Motivation-first is non-negotiable.** The skill won't bypass the `confirmed_motivation.md` step. This is by design. If a student or researcher finds this frustrating, that frustration is itself a signal worth examining.
- **The claim register does not fetch sources for you.** It tracks claims and their evidence pointers; you still need to supply the actual papers or use academic-research-skills to surface them.
- **LaTeX is the primary output.** The DOCX option exists but is secondary. Teams that live in Word or Google Docs should pair this with a LaTeX-to-DOCX conversion step.
- **No peer review simulation.** Unlike Imbad0202's suite, PaperSpine does not simulate reviewer feedback. Run the finished manuscript through academic-research-skills' `academic-paper-reviewer` if you want a pre-submission review pass.
- **License: MIT.** The repo is MIT-licensed, so reuse and adaptation are permitted with attribution.

## Links

- **GitHub:** [WUBING2023/PaperSpine](https://github.com/WUBING2023/PaperSpine)
- **Companion entries:** [Academic Research Skills for Claude Code](/learnAIDoc/wiki/academic-research-skills-imbad0202/), [AI Agent Academic Research Writing](/learnAIDoc/wiki/ai-agent-academic-research-writing/), [Posterskill](/learnAIDoc/wiki/posterskill-conference-posters/)
