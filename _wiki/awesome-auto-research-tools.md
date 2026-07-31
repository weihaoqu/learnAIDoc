---
title: "Awesome-Auto-Research-Tools — A Curated Map of Automated-Science Projects"
date: 2026-05-14
category: AI for Research
tags: [ai-research, awesome-list, github, automation, deep-research, ai-scientist, autoresearch, claude-code, deepscientist, internagent, bilingual, cc0]
related: ["AI Research Tools Landscape: FARS vs AutoResearch vs ARIS vs Elicit", "Autoresearch: 100 Autonomous ML Experiments Overnight", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era", "AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record", "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls", "academic-research-skills — Imbad0202's 4-Skill Claude Code Pipeline for Academic Research"]
icon: "🗺️"
image: "/assets/images/awesome-auto-research-tools.png"
---

**Awesome-Auto-Research-Tools** ([github.com/handsome-rich/Awesome-Auto-Research-Tools](https://github.com/handsome-rich/Awesome-Auto-Research-Tools)) is a bilingual (English + Chinese), CC0-licensed GitHub catalog of open-source projects that automate parts of the research lifecycle — from literature search and paper reading to idea generation, experiment execution, paper writing, and peer review. About 430 stars as of May 2026; entries are grouped into five categories, with a star-history chart tracking the major systems and a weekly star-count refresh workflow.

*Source: [github.com/handsome-rich/Awesome-Auto-Research-Tools](https://github.com/handsome-rich/Awesome-Auto-Research-Tools) (CC0 1.0) | Spotted via short-form video, May 2026*

## What this list is (and isn't)

| It is | It isn't |
|---|---|
| A **catalog of repos** organized by where in the research lifecycle they help | A benchmark or head-to-head comparison |
| Focused on **automated research** specifically — agents that run lit review, experiments, or writing | A general "awesome AI agents" list (those exist elsewhere) |
| **Bilingual** — full English `README.md` plus `README_CN.md` for Chinese readers | A paper / survey (it links to a few sibling lists, but is itself a list) |
| Maintained with **weekly star-count refresh** via GitHub Actions (`.github/workflows/update-stars.yml`) — the script lives at `scripts/update_stars.py`, and `CLAUDE.md` documents the Claude-Code-driven maintenance pattern | Fully auto-curated — the workflow only refreshes counts; humans still add/remove entries by PR. No broken-link sweep. |
| Public domain (CC0) — adapt freely | A hard-gated list — the inclusion bar (see below) has multiple signals, not one fixed cutoff |

This is the *map*. The wiki entries [AI Research Tools Landscape](/learnAIDoc/wiki/ai-research-tools-landscape/) and [Autoresearch: 100 Autonomous ML Experiments Overnight](/learnAIDoc/wiki/autoresearch-autonomous-ml/) are the *deep-dives* on specific tools the map points to.

## The five categories

```
┌─────────────────────────────────────────────────────────┐
│  🧪 End-to-End Autonomous Research Systems              │
│     Agents that run idea → plan → experiment → paper    │
│     e.g. AI-Scientist, AI-Scientist-v2, RD-Agent,       │
│     DeepScientist, InternAgent, Agent Laboratory,       │
│     AI-Researcher, Karpathy autoresearch, AIDE          │
├─────────────────────────────────────────────────────────┤
│  📚 Deep Research & Literature Synthesis                │
│     Agents that read, summarize, and write reports      │
│     e.g. DeerFlow (ByteDance), STORM (Stanford),        │
│     GPT Researcher, ChatPaper, PaperQA2, OpenScholar,   │
│     Tongyi DeepResearch, Open Deep Research, DATAGEN    │
├─────────────────────────────────────────────────────────┤
│  ⚙️ Automated Experiment & Code Agents                  │
│     Agents that edit code and run experiments           │
│     e.g. AutoGPT, OpenHands, Aider, SWE-agent,          │
│     MLE-agent, claude-scholar                           │
├─────────────────────────────────────────────────────────┤
│  🔧 Research Skills & Plugin Collections                │
│     Reusable skill packs for Claude Code / agents       │
│     e.g. scientific-agent-skills, AI-Research-SKILLs,   │
│     ARIS, Idea2Paper                                    │
├─────────────────────────────────────────────────────────┤
│  📋 Awesome Lists & Surveys                             │
│     Sibling catalogs (NOT survey papers)                │
│     e.g. awesome-ai-for-science, Autonomous-Agents,     │
│     Awesome-Deep-Research                               │
└─────────────────────────────────────────────────────────┘
```

The names above are **selective representatives** — the list also includes Biomni, ChatReviewer, OpenResearcher, PaperBanana, DeepResearchAgent, Auto-Deep-Research, and others. Check the live repo for the full inventory; it changes as the maintainer accepts PRs.

## What's notable in each category

### 🧪 End-to-End — the closed-loop AI scientists

This is the category most worth your time if you're trying to understand "AI scientist" claims. Notable inclusions (descriptions paraphrased from the listed projects' own READMEs):

| Project | Distinctive angle |
|---|---|
| **AI-Scientist / AI-Scientist-v2** (SakanaAI) | The reference fully-automated open-ended discovery system; v2 adds workshop-level agentic tree search |
| **DeepScientist** (ResearAI) | Local-first autonomous research studio. README highlights *Findings Memory* + Bayesian optimization for hypothesis selection |
| **InternAgent** (Alpha-Innovator / InternScience) | Closed-loop hypothesis → verification with deep-research + memory modules. Repo lists domain coverage: physics, biology, earth & life sciences |
| **RD-Agent** (Microsoft) | Industrial R&D loop focus |
| **Agent Laboratory / AI-Researcher** | Multi-agent research orchestration with a graduate-student-style workflow |
| **autoresearch** (Karpathy) | The pattern that named the category — see [our deep-dive](/learnAIDoc/wiki/autoresearch-autonomous-ml/) |
| **AIDE** | Kaggle/ML competition-focused experiment loop |

### 📚 Deep Research — the literature-synthesis agents

The category where most teams actually deploy *today*, in my reading:

- **DeerFlow** (ByteDance) — multi-agent deep research framework
- **STORM** (Stanford) — research outline → Wikipedia-style article
- **GPT Researcher**, **PaperQA2**, **OpenScholar** — long-form report / paper-QA
- **Tongyi DeepResearch**, **Open Deep Research** — open-source analogs of commercial Deep Research products
- **ChatPaper** — paper Q&A and summary

### ⚙️ Experiment / Code agents

The "coding agent" category that overlaps heavily with general dev tooling:

- **AutoGPT**, **OpenHands** (formerly OpenDevin), **Aider**, **SWE-agent**, **MLE-agent**

These show up in this list because researchers often re-purpose them as the *executor* inside an End-to-End system.

### 🔧 Skills & plugin collections

Reusable skill packs you can install into your Claude Code / agent setup — `scientific-agent-skills`, `AI-Research-SKILLs`, `ARIS`, etc. Pairs naturally with [Karpathy: Skills are the Big New Idea](/learnAIDoc/wiki/karpathy-skills-claude-code/).

**Consolidation rule for the wiki:** new research-skill screenshots should land here first unless they clearly introduce a new workflow pattern. A single repo screenshot is not enough for a standalone page. Promote it to a full entry only if it passes three checks:

| Check | Promote only if |
|---|---|
| New capability | It automates a research phase not already covered by the landscape pages |
| Durable mechanism | The interesting part is a method or workflow students can reuse, not just a tool announcement |
| Source depth | There is a primary README/docs page with enough detail to verify claims and teach from |

This keeps the AI-for-research section student-friendly: one map, a few deep dives, and fewer thin tool cards.

### 📋 Awesome lists — sibling catalogs

The list cross-references *other awesome-style catalogs* (`awesome-ai-for-science`, `Autonomous-Agents`, `Awesome-Deep-Research`). It does **not** list standalone academic survey papers directly. If you want the survey-paper layer, follow those sibling lists or the [openags/Awesome-AI-Scientist-Papers](https://github.com/openags/Awesome-AI-Scientist-Papers) repo (which this catalog does not currently link).

## Quality signal — what the inclusion bar actually is

The repo's signals are not fully consistent — worth knowing before you treat any single number as a hard cutoff:

| Source | What it says |
|---|---|
| `README.md` | **500+ stars OR exceptionally notable / top-venue publication** |
| `CLAUDE.md` (maintenance notes) | 500+ stars |
| `scripts/update_stars.py` | `STAR_THRESHOLD = 1000` — but the script only *reports* projects below threshold; it does not remove them |

So treat the inclusion bar as "roughly 500+ stars with publication exceptions," not as an automated gate. The **star-history chart** in the README (the same widget you'd see on `star-history.com`) lets you eyeball whether a listed project is rising, plateauing, or abandoned.

## How LearnAI Team Could Use This

**1. Tool-scouting shortlist (a 2-4 hour audit, not 30 minutes).** Before committing to a deep-research backbone for a LearnAI project, run this recipe instead of an afternoon of unstructured GitHub spelunking:

   1. Open the list, scroll to **Category 📚** (Deep Research).
   2. For each candidate, check the linked repo's **star-history slope** as **one triage signal** — not a hard filter. Mature-but-useful tools can plateau; rising stars can be hype. Pair with: issue activity in the last 30 days, recent commits, and whether the README clearly states *what input it takes* and *what output it produces*.
   3. Pick the **top 3** by community signal **plus** a quick fit-for-purpose read of the README.
   4. Run each on the **same throwaway query** (e.g., "Summarize the last 5 years of work on refinement types for security-relevant program analysis, 2024-2026"). Budget ~30-60 min per tool for accounts/API keys/first-run setup. Score on (a) source quality, (b) report coherence, (c) cost per run, (d) re-runnability.
   5. **Pilot the strongest candidate** for two weeks; keep the runner-up bookmarked.

**2. Curriculum design — map categories to existing courses (with careful scoping).** The 5-category map can be mapped onto specific Monmouth courses, but each pairing needs scoping:

   - **CS-310 (Advanced Object-Oriented Programming & Design)** → Category ⚙️. Assign students to evaluate **Aider** on a small OO-design refactor in their semester project (Aider is the pair-programming CLI — best fit for "I have a focused change in mind"). SWE-agent and OpenHands have different scope (issue-solving agent / autonomous coding platform) and fit better in upper-level SE or research courses.
   - **CS-336 (Program Analysis for Security)** → Category 📚 for security literature review (e.g., "Survey program-analysis techniques for finding integer-overflow bugs, 2020-2026"), and a *small* Category 🧪 exposure as a critique exercise — students read what an AI-scientist agent produces and identify the methodological flaws.
   - **BF422 (Investments)** → Category 📚 for **sector/company literature review** before a stock-pitch assignment (the agent's job: pull 10-K filings, analyst notes, and macro context into a coherent brief; the student's job: verify, add their own thesis, fix what the agent missed).
   - **General grad seminar slide** — the 5-category diagram in this entry can be lifted directly (CC0); add one representative tool per category and you have a 20-minute lecture.

**3. Faculty research-tools menu — the elevator-pitch email.** Save colleagues an hour of "what should I try?" by sending one paragraph: *"There's a curated CC0 catalog at [github.com/handsome-rich/Awesome-Auto-Research-Tools](https://github.com/handsome-rich/Awesome-Auto-Research-Tools) (~430 stars, bilingual). Five categories of automated-research tools, each with a one-line description and a star-history chart. Start in the **Deep Research** category if you want quick wins on literature work; the **End-to-End** category is where the AI-scientist hype lives — promising but still research-grade pilots, not production tools."* Reusable, factually anchored, and points to the *map* rather than guessing for them.

**4. Companion to existing entries — a 3-link reading order for a new colleague.** When someone joins LearnAI and wants to ramp up on "AI in research" in under an hour, give them:

   1. **This entry** (the map — see the lay of the land in ~10 min)
   2. [AI Research Tools Landscape](/learnAIDoc/wiki/ai-research-tools-landscape/) (the comparison — FARS vs AutoResearch vs ARIS vs Elicit, ~15 min)
   3. [Autoresearch: 100 Autonomous ML Experiments Overnight](/learnAIDoc/wiki/autoresearch-autonomous-ml/) (one concrete pattern in depth — ~20 min)

   They finish with a vocabulary, a comparison framework, and one worked pattern. Enough to be useful in a planning meeting the next day.

## Real-World Use Cases

| Scenario | Description |
|---|---|
| **Picking a deep-research agent** for a student team | Filter to Category 📚; weigh star-history alongside issue activity and README clarity, then pilot the top candidate for a few weeks |
| **Adopting a research skill pack** for a course's Claude Code setup | Browse Category 🔧. Inspect one candidate skill pack before installing — third-party skills may carry dependency, tool, or API-key assumptions. Install into `~/.claude/skills/` only after you've read the SKILL.md |
| **Tracking closed-loop AI-scientist systems** | Watch Category 🧪 — DeepScientist, InternAgent, AI-Scientist-v2, Agent Laboratory are recent active entries. Treat them as **research-grade pilots**, not course-ready defaults |
| **Translating tooling memos** for Chinese-speaking collaborators | The `README_CN.md` often saves you a first translation pass; still skim for tone/local-idiom drift |
| **Adapting a published AI-scientist workflow** to your own data | Pick a project from Category 🧪 that has both a repo and an arXiv paper (e.g., AI-Scientist-v2). Run their workflow on your own dataset to *adapt or extend* their results — note this is adaptation, not strict replication (replication uses their benchmarks, configs, and seeds) |
| **Onboarding a new research assistant** | Pin 3 entries from this list as week-1 reading: one from 🧪 (so they grasp the field's ceiling), one from 📚 (so they have a daily-driver tool), one from 🔧 (so they can extend their setup) |

## A Concrete Walk-Through — This Semester at Monmouth

A 4-week plan to actually use this list (not just bookmark it). Plan for **6-10 hours total in the first run** while you build setup, prompts, and rubrics; later iterations drop to ~3 hours once those exist.

| Week | Action | Expected output |
|---|---|---|
| **Week 1 (~2-3 hr)** | Pick **one Category 📚 tool**. **DeerFlow** if you want a multi-agent research harness for complex queries; **STORM** if you want outline-driven, Wikipedia-style synthesis. Run it on a CS-336-relevant query — e.g., "Survey program-analysis techniques for integer-overflow detection, 2020-2026" | One ~5-page synthesis report. Note: what citations did it miss? Where did it hallucinate? File this as evidence for whether the tool is course-ready |
| **Week 2 (~2 hr)** | Read the SKILL.md of **one Category 🔧 skill pack** (e.g., `scientific-agent-skills` or `AI-Research-SKILLs`) before installing. Confirm the dependencies, tool list, and any required API keys. Then drop it into `~/.claude/skills/` and run a sample task | Working integrated skill in `~/.claude/skills/` (or a documented decision to skip — both are valid outcomes) |
| **Week 3 (~1-2 hr)** | Assign **one CS-310 student** (~1 hr of office-hours commitment) to evaluate **Aider** against a small OO-design refactor in their semester project. Same task they'd code by hand | Side-by-side: agent's diff vs. student's diff. A 5-minute classroom share-out the next week becomes a teaching moment about pair-programming-agent failure modes |
| **Week 4 (~1 hr)** | Write a **1-page reflection** — what worked, what didn't, would you do it again. Push to the LearnAI wiki under a new `auto-research-trial-spring-2026` entry | A reusable artifact for the next semester. The trial becomes data, not anecdote |

**Compounding return:** by the end of week 4 you have firsthand data on 3 categories of the list, a documented skill-pack decision, a student-facing case study, and a draft entry you can show colleagues.

## Important things to know

- **The list is human-curated, not auto-curated** — the only automated piece is a weekly GitHub Action that refreshes star counts via `scripts/update_stars.py`. Entries are added/removed by maintainer PRs. Treat it as a living document, not a static reference.
- **Inclusion bar is "roughly 500+ stars, with publication exceptions"** — useful for filtering noise, but means promising small projects won't appear. Cross-reference with [yibie/awesome-autoresearch](https://github.com/yibie/awesome-autoresearch) and [WecoAI/awesome-autoresearch](https://github.com/WecoAI/awesome-autoresearch) if you want the long tail.
- **CC0 license** — public domain, no attribution required. Safe to embed the category map in your own course materials or wiki.
- **Bilingual structure** is a real feature — `README_CN.md` is not a partial translation; it tracks the English version closely.
- **What's *not* here:** no original benchmark table or head-to-head evaluation, no tutorials, no maintainer commentary beyond one-line descriptions. The list is a finder, not a comparator — you still need to evaluate the actual tools yourself.
- **Repo claims to verify yourself** — be aware that some descriptions paraphrase performance or setup claims from the linked projects' own READMEs. For example, DeepScientist's README mentions both "10-minute" and "15-minute" local-setup phrasings; InternAgent's three-subsystem framing (Generation / Verification / Evolution) appears in its associated paper, not the current GitHub README. Always read the source project before adopting.
- **Companion deep-dives** in this wiki:
  - [AI Research Tools Landscape: FARS vs AutoResearch vs ARIS vs Elicit](/learnAIDoc/wiki/ai-research-tools-landscape/) — the *comparison* counterpart
  - [Autoresearch: 100 Autonomous ML Experiments Overnight](/learnAIDoc/wiki/autoresearch-autonomous-ml/) — Karpathy's pattern, the seed of Category 🧪
  - [AI-Assisted Research Workflow](/learnAIDoc/wiki/ai-research-workflow-pipeline/) — the human-in-the-loop framing
  - [Karpathy: Skills are the Big New Idea](/learnAIDoc/wiki/karpathy-skills-claude-code/) — for understanding Category 🔧
