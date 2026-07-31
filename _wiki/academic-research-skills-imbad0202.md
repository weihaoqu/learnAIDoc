---
title: "academic-research-skills — Imbad0202's 4-Skill Claude Code Pipeline for Academic Research"
date: 2026-05-12
category: AI for Research
tags: [claude-code, skills, academic-research, phd, paper-writing, peer-review, prisma, socratic, devils-advocate, style-calibration, imbad0202, pipeline, research-tools]
related: ["Research Skills Starter Pack — Install and Use Academic AI Skills Without the Hype", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "Claude-Prism — Local-First Academic Writing Workspace with AI", "Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record", "AI Research Tools Landscape: FARS vs AutoResearch vs ARIS vs Elicit", "Building a Research KB — Zotero + Obsidian + Claude Code", "Five Questions for Critical Paper Reading — The Cambridge Method with Claude", "What Researchers Should (and Shouldn't) Use LLMs For", "Socratic Prompting — Ask Questions, Don't Give Instructions", "How Anthropic Uses Skills — Thariq's 9-Category Framework & the Gotchas Pattern", "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs", "Paper-Code Joint Analysis & Contract-Driven Skill Design", "Awesome-Auto-Research-Tools — A Curated Map of Automated-Science Projects", "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls"]
icon: "🎓"
image: "/assets/images/academic-research-skills-imbad0202.png"
---

`Imbad0202/academic-research-skills` (6.3K stars as of May 2026) is a Claude Code skill bundle that turns the end-to-end PhD research workflow — search → write → review → revise → finalize — into a chain of four cooperating skills, each with multiple sub-agents and explicit quality gates. The headline mechanisms are unusually concrete: **PRISMA systematic-review templates**, a **Socratic-mode dialogue health-check every 5 turns**, **Style Calibration** that learns voice from 3+ of your past papers, a **Devil's Advocate concession-threshold protocol** that scores rebuttals 1–5 before agreeing, and an **EIC + three-reviewer rubric** that maps 0–100 scores to Accept/Minor/Major/Reject decisions. Licensed CC BY-NC 4.0 (non-commercial). Verified against the upstream repo on 2026-05-12.

*Source: [GitHub — Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) — 6.3K stars, CC BY-NC 4.0 | `docs/ARCHITECTURE.md`, `docs/SETUP.md`, `docs/PERFORMANCE.md` in repo | Surfaced via [Douyin post by 大大黑猩猩 (March 1, 2026)](https://www.douyin.com/)*

> **Repo claims vs. independent verification:** the per-skill agent counts (13/12/7/orchestrator), mode lists, and rubric thresholds below are taken directly from the upstream `README.md` and `ARCHITECTURE.md`. The Douyin commentary that surfaced the repo is cited separately and not treated as primary source.

## The 4 Skills

| Skill | Version (README / ARCHITECTURE.md) | Agents | What It Does |
|-------|-------------------------------------|--------|--------------|
| **deep-research** | v2.8 / v2.9.2 | 13 | Full research + quick briefs + **PRISMA** systematic reviews + **Socratic** guided questioning + fact-checking + literature reviews + paper-quality assessment |
| **academic-paper** | v3.0 / v3.1.1 | 12 | Full papers, step-by-step planning, outlines, revisions, abstracts, lit reviews, format conversion, citation checking. Outputs **Markdown, DOCX (via Pandoc), and LaTeX/PDF** |
| **academic-paper-reviewer** | v1.8 / v1.9.0 | 7 | Multi-perspective review: **Editor-in-Chief + 3 dynamic reviewers + Devil's Advocate** challenger, quality scoring on 0–100 rubrics, re-review and calibration modes |
| **academic-pipeline** | v3.7 / v3.6.5 (matrix) or v3.7.0 (timeline) | 10-stage orchestrator | Manages the full workflow: research → integrity checks → peer review → revision → finalization, with **Material Passport** handoff schemas and collaboration evaluation |

> **Version drift note:** the repo README and `docs/ARCHITECTURE.md` report slightly different per-skill versions (the architecture doc tends to track ahead of the README between releases). Numbers above are as of the 2026-05-12 check; pin to whatever the upstream commit shows when you install.

Each skill is independent — you can use `deep-research` alone for a literature scan, or chain all four for a full paper-shipping workflow.

## The Five Headline Mechanisms

These are the patterns that make the bundle distinctive vs. a generic "AI writing assistant":

### 1. PRISMA Systematic Review (in deep-research)
A dedicated mode that follows the PRISMA reporting standard: search strategy → records identified → screening → eligibility → inclusion → synthesis. Ships with protocol/report templates and risk-of-bias assessment. Useful for actual systematic reviews; overkill for a quick lit scan (use a different mode there).

### 2. Socratic Mode (in deep-research)
Intent-based activation: detects whether the user is in *exploratory* mode (still figuring out the question) versus *goal-oriented* mode (knows what they want).
- In exploratory mode: **disables premature convergence** so the agent doesn't close down options before the user is ready
- Every 5 turns the agent runs a "dialogue health check" — is the conversation actually moving forward, or going in circles?

This is rare; most assistants just answer whatever is asked, which is a poor fit for *exploring* an open research question.

### 3. Style Calibration (in academic-paper)
The user provides ≥3 of their own past papers. The skill learns the user's voice (sentence rhythm, hedging style, paragraph length) and applies it as a **soft guide** during drafting. **Discipline norms always take hard priority** — the model won't break IMRaD structure or citation style to match your prose.

The "soft guide / hard priority" split is the careful part: prevents the calibrator from producing prose that *sounds like you* but breaks venue requirements.

### 4. Devil's Advocate Concession-Threshold Protocol (in paper-reviewer)
When the Devil's Advocate (DA) reviewer is challenged, the **Concession Threshold Protocol** kicks in:
- DA must score rebuttals 1–5 before responding
- Concession only at score ≥4
- Prevents two well-known failure modes: **sycophantic agreement** (DA caves to author push-back) and **frame-lock** (DA stubbornly refuses to revise once committed)

The numeric threshold is what makes this enforceable — most "play devil's advocate" prompts collapse the moment the author argues back.

### 5. EIC + Three Reviewers + Decision Mapping
The full review team simulates a real journal:
- **Editor-in-Chief** sets scope and arbitrates
- **R1, R2, R3** — three dynamically-spawned reviewers covering different angles
- **Devil's Advocate** — challenges the consensus
- Quality score → decision mapping:

| Score | Decision |
|-------|----------|
| ≥80 | Accept |
| 65–79 | Minor Revision |
| 50–64 | Major Revision |
| <50 | Reject |

The score-to-decision mapping is in the same shape that many journals publish (Accept / Minor / Major / Reject buckets), giving the reviewer output an obvious meaning rather than a generic 5-star rating.

## The 10-Stage Pipeline + Integrity Gates

The `academic-pipeline` orchestrator runs the full workflow as 10 stages with explicit **Material Passport handoff schemas** between them (so each stage knows exactly what shape of artifact the previous stage hands it).

**Integrity gates at Stages 2.5 and 4.5 cannot be skipped.** Every "FULL" checkpoint requires explicit user confirmation. This is the safety mechanism — the agent won't silently auto-advance past a stage that needs human verification.

## License: CC BY-NC 4.0 (Non-Commercial)

The repo is released under Creative Commons Attribution-NonCommercial 4.0:

- ✅ Academic / research use: fine
- ✅ Forking for your own thesis / lab / department: fine
- ✅ Course adoption: fine
- ❌ Commercial use, paid services, SaaS wrapping: **not permitted**
- 📌 Attribution required in all uses

If your use case is for-profit research (industrial R&D, consulting), check with the author or use a differently-licensed alternative.

## Human-in-the-Loop Philosophy

Quoting the repo's framing directly:

> "AI is your copilot, not the pilot... handles the grunt work — hunting down references, formatting citations, verifying data, checking logical consistency — so you can focus on the parts that actually require your brain."

This is not "press one button, get a paper." The pipeline is built so the human has to confirm at every gate, review every claim, and own the final voice. The agent does the labor; the researcher does the thinking.

## Installation

**Plugin method (v3.7.0+, recommended):**
```
/plugin marketplace add Imbad0202/academic-research-skills
/plugin install academic-research-skills
```

**Traditional method:** clone the repo and symlink to `~/.claude/skills/`.

**Prerequisites:**
- Claude Code CLI (latest)
- `ANTHROPIC_API_KEY` set
- Optional: Pandoc + tectonic for DOCX/PDF output

**Verify install:** run `/ars-plan` to start a Socratic dialogue that maps your paper's structure.

## Cost Sketch

The repo's `docs/PERFORMANCE.md` reports rough token budgets per workflow. As a baseline: **~$4–6 per 15K-word paper** through the full pipeline (rough order of magnitude — actual cost varies with mode, paper length, and how many revision rounds you run).

For a PhD student writing one journal paper a quarter, this is order-of-magnitude cheaper than the time spent on grunt-work without it.

## How It Compares to Related Wiki Entries

| Related entry | What's different |
|---------------|------------------|
| [AI Agents for Academic Research & Writing (KatmerCode, Nature Playbook)](/learnAIDoc/wiki/ai-agent-academic-research-writing/) | Covers different repos and the Nature editorial playbook; complementary, not overlapping |
| [Claude PRISM — Adversarial-Iterative Academic Writing](/learnAIDoc/wiki/claude-prism-academic-writing/) | PRISM focuses on iterative revision with adversarial review; this repo is the *broader* end-to-end pipeline that PRISM-style review is one component of |
| [Claude Code Research Infrastructure](/learnAIDoc/wiki/claude-code-research-infrastructure/) | Sets up the *environment* (folders, repos, templates) for research; this repo is the *operational skill bundle* you run inside that environment |
| [AI Research Workflow Pipeline](/learnAIDoc/wiki/ai-research-workflow-pipeline/) | The general principles; this repo is one concrete implementation |
| [Research KB — Zotero + Obsidian + Quartz](/learnAIDoc/wiki/research-kb-zotero-obsidian/) | The KB / literature side; this repo is the writing / review side |

## How LearnAI Team Could Use This

- **PhD-track curriculum module** — assign students to ship one paper using the full pipeline (Stage 1 → Stage 10). Graded artifacts are the per-stage checkpoint outputs, not the final paper. Teaches both research methodology and skill orchestration.
- **Peer-review training** — use the `paper-reviewer` skill on student work, then have students respond to the DA challenges. Builds review skills + resilience to adversarial feedback.
- **Style Calibration exercise** — students upload 3 papers in their field, generate calibrated drafts, then diff against the originals to identify what the calibrator captured (and missed). Teaches the meta-skill of voice in academic writing.
- **PRISMA module** — for systematic-review training, use the dedicated mode and compare students' AI-assisted PRISMA flowcharts to manually-built ones. Catches gaps in both approaches.
- **Socratic mode for thesis planning** — first-year PhDs use the Socratic mode to interrogate their proposed thesis question. The dialogue health check exposes circular reasoning early.
- **Integrity-gates as pedagogy** — every required user-confirmation gate is a teaching moment about what *needs* human judgment in research.

## Real-World Use Cases

- **PhD students** — full-pipeline use during a paper-writing semester. Offloads citation cleanup, formatting, and consistency checks so the student can spend more time on the argument.
- **Junior faculty** — first journal submissions: run `paper-reviewer` as a pre-submission check; surfaces likely reviewer objections before you hit submit.
- **Lab onboarding** — new postdocs can use `deep-research` in Socratic mode to map the lab's existing literature.
- **Grant writing** — Style Calibration on past funded proposals as a soft guide for tone.
- **Open-source research teams** — fork the repo, customize the skills for a subfield (medical imaging, ML theory, materials science), and standardize the team's research workflow.
- **Replication projects** — `paper-reviewer` plus Devil's Advocate as a structured first pass on a paper you're replicating: where might it not hold up?

## Caveats

- **CC BY-NC 4.0** — see license section above. Commercial use needs a different arrangement.
- **Not a paper-writing autopilot** — the gates require human confirmation. Skipping them defeats the design.
- **PRISMA is heavy** — overkill for quick lit scans. Use the appropriate mode for your task.
- **6.3K stars is real traction but not maturity** — expect rough edges; the repo is still evolving (`academic-pipeline` is at v3.7, indicating active iteration).
- **API costs scale with mode** — the 10-stage pipeline with all reviewer modes is materially more expensive than a single skill in isolation. The repo's `PERFORMANCE.md` documents token budgets per mode.

## Links

- **Repo:** [github.com/Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) (6.3K stars, CC BY-NC 4.0)
- **Architecture doc:** `docs/ARCHITECTURE.md` in the repo — flow diagrams, stage-by-stage matrix, mode registry
- **Performance doc:** `docs/PERFORMANCE.md` — token budgets, cost per paper
- **Setup doc:** `docs/SETUP.md` — prerequisites and install
- **Surfaced via:** Douyin post by 大大黑猩猩 (March 1, 2026)
