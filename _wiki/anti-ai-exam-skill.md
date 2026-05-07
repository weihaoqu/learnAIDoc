---
title: "Anti-AI Exam Designer — A Claude Code Skill for AI-Resistant Exams"
date: 2026-04-25
category: AI for Teaching
redirect_from:
  - "/wiki/ai education/anti-ai-exam-skill/"
tags: [ai-education, academic-integrity, exam-design, claude-code, skills, anti-cheating, teaching, assessment]
related: ["AI in Education — Teacher's Factory, Not Student's Cheat Tool", "Claude Code Skills: Resources & Repos", "MIT Professor's NotebookLM Grading System — 47 Essays in 12 Minutes", "Make Slides: AI-Powered Interactive Teaching Slides"]
icon: "🛡️"
image: "/assets/images/anti-ai-exam-skill.png"
---

A Claude Code skill that helps CS professors design exams where AI-generated answers are **detectably wrong**. Instead of trying to detect AI usage after the fact, this skill flips the problem: make AI answers carry telltale signatures that only show up when a student bypasses the learning process. Built from adversarial testing against Claude, ChatGPT, and Codex during Spring 2026.

*Source: [GitHub: anti-ai-exam-skill](https://github.com/weihaoqu/anti-ai-exam-skill) | [Cengage: 8 Ways to Prevent Cheating With AI](https://blog.cengage.com/8-ways-to-prevent-students-from-cheating-with-ai/) | [Inside Higher Ed: Best Defense Against AI Cheating](https://www.insidehighered.com/opinion/career-advice/teaching/2026/04/13/best-defense-against-ai-cheating-opinion) | [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)*

## The Core Insight

Most anti-AI strategies try to **detect** AI usage. This skill takes a different approach: **design the exam so AI gets it wrong in predictable, detectable ways.** The key exploit is that AI models rely on public knowledge — textbook definitions, standard notation, common conventions. Anything taught exclusively in your classroom is invisible to AI.

```
Traditional approach:                This skill's approach:
  Student → AI → Answer              Student → AI → Wrong Answer (detectable)
  Professor → Detection tool (?)     Professor → Grading rubric catches it
  Result: Arms race                  Result: AI usage = lower grade
```

## How It Works — Three Phases

The skill runs as an interactive workflow inside Claude Code:

```
┌─────────────────────────────────────────────────┐
│  /anti-ai-exam                                  │
│                                                 │
│  Phase 1: CONSULT ──→ Phase 2: AUDIT            │
│  Adaptive interview     Test questions           │
│  about your course      against AI               │
│       │                      │                   │
│       ▼                      ▼                   │
│  strategies.md          audit-report.md          │
│                              │                   │
│              ┌───────────────┘                   │
│              ▼                                   │
│  Phase 3: GENERATE                               │
│  Exam .docx + Solution + Rubric + AI Baseline   │
└─────────────────────────────────────────────────┘
```

**Phase 1 — Consulting:** An adaptive interview asks about your course (subject, level, exam format, class size), then branches into subject-specific questions. Output: a ranked list of anti-AI strategies tailored to your course.

**Phase 2 — Adversarial Audit:** Paste your exam questions or upload a file. The skill runs a simulated vulnerability scan (always) and optionally a live adversarial test (it actually tries to answer your questions as a student would submit them to AI). Output: per-question vulnerability scores and hardening recommendations.

**Phase 3 — Output Generation:** Generates a complete exam package — the exam document (.docx) with traps baked in, solution key, AI baseline (what AI would answer), grading rubric with AI-detection flag scoring, and a detection checklist for graders.

## The Strategy Arsenal — 28+ Tested Traps

The skill ships with 7 CS subject modules plus 4 universal strategies. Here are the highest-impact ones:

### Universal Strategies (work in any CS course)

| Strategy | Catch Rate | How It Works |
|----------|-----------|--------------|
| **Version Watermarking** | ~100% | Print 2-3 versions with different constants. Mismatch = copied. |
| **Verbal Correction Trap** | ~100% | Print a deliberate typo, correct it verbally in class. AI uses the typo. |
| **Step-by-Step Format** | ~90% | Require labeled intermediate steps. AI produces single nested expressions. |
| **Cross-Student Detection** | — | Framework for spotting identical structures, version mismatches, unknown symbols. |

### Subject-Specific Examples

**Databases — Undefined Semantics Trap (~75%):** Design your schema so `painting.aid` *looks like* "the artist who created it" but you teach in class that it means "the buyer." AI joins tables directly using the obvious meaning — wrong answer. In testing, AI scored **10/30 points** on an 8-question exam.

**Architecture — Custom Opcode Mnemonics (~100%):** Define abbreviated mnemonics in class (LD instead of LOAD, SKP instead of SKIPCOND). AI always uses full standard mnemonics. Any student using standard instead of class notation is instantly flagged.

**Algorithms — "Explain Your Approach" (~90%):** Require 2-3 sentences referencing class discussion before the formal solution. AI cannot reference Lecture 15's proof technique.

**Data Structures — Method Name Misdirection (~75%):** Define `BST.successor(node)` to return the in-order *predecessor* in your implementation. AI assumes the textbook definition.

### The Layering Principle

Any single trap might fail. The skill recommends combining 3-4 independent traps — the probability of AI navigating all of them drops to near zero:

```
Single trap:      ~75% catch rate
Two traps:        ~94% catch rate  (1 - 0.25 × 0.25)
Three traps:      ~98% catch rate  (1 - 0.25³)
Four traps:       ~99.6% catch rate
```

## Supported CS Subjects

| Module | Key Traps | # Strategies |
|--------|-----------|-------------|
| **Databases** | Undefined semantics, custom RA notation, division/universal quantifier, step-by-step format | 4 |
| **Data Structures** | Method name misdirection, trace format, custom pseudocode, implementation details | 4 |
| **Algorithms** | Proof format, recurrence notation, algorithm variants, explain-your-approach | 4 |
| **Architecture** | Assembly dialect, hand-assembly steps, custom opcodes, execution trace format | 4 |
| **Networking** | Protocol field meaning, diagram notation, packet trace format, layer model | 4 |
| **Operating Systems** | Scheduling variables, state diagram notation, trace tables, synchronization | 4 |
| **Programming** | Custom style, explain-before-code, API naming, output format | 4 |

The skill is designed for extensibility — adding a new discipline means adding a strategy module following the template. The orchestrator picks up new modules automatically.

## Course Profiles — Semester-Over-Semester Evolution

The skill saves everything to `anti-ai-profiles/<course>/`:

```
anti-ai-profiles/cs432/
├── profile.json           ← Course metadata from interview
├── strategies.md          ← Active trap strategies
├── trap-history.json      ← Which traps used per exam
├── notation.md            ← Custom notation definitions
└── exams/
    └── midterm-2026/
        ├── audit-report.md      ← AI vulnerability analysis
        ├── detection-checklist.md
        ├── exam.docx            ← Generated exam (optional)
        ├── solution.docx        ← Solution key (optional)
        ├── ai-baseline.md       ← What AI would answer
        └── rubric.md            ← Grading rubric with AI-flag scoring
```

When you come back for the next exam, the skill:
- **Warns against reusing** the same traps (students share strategies)
- **Suggests rotation** ("You used undefined semantics on the midterm — try the notation trap for the final")
- **Tracks effectiveness** over time

## Installation

```bash
git clone https://github.com/weihaoqu/anti-ai-exam-skill ~/.claude/skills/anti-ai-exam
```

The skill is immediately available. Invoke with `/anti-ai-exam` or describe what you need ("audit my exam against AI", "make my database exam AI-proof").

## Case Study: Building This Skill

This skill was built in a single Claude Code session, demonstrating the full workflow from idea to published tool:

**Starting point:** A Word document (`anti-ai-exam-guide.docx`) containing adversarial testing results from a CS database course — catch rates, tested strategies, detection flags.

**Design phase (brainstorming skill):** Five questions shaped the skill's architecture:
1. *What should it do?* → Consulting + audit (both needed)
2. *Which subjects?* → CS-focused now, extensible later
3. *How to test questions?* → Simulated fast pass + optional live adversarial test
4. *How deep an interview?* → Adaptive (start light, go deeper when there's a payoff)
5. *What output?* → Structured files + optional exam .docx, solution, rubric

**Architecture decision:** Orchestrator + phases (single `/anti-ai-exam` entry point, but internally modular). Rejected: monolithic skill (hard to extend) and skill suite (fragmented UX).

**Build:** The complete SKILL.md was written in one pass since all sections are interdependent, then verified by a review subagent against the design document. The review confirmed 100% design coverage with expansions in several areas.

**Publishing:** Created a public GitHub repo with README and MIT license. Collaborators install with a single `git clone` command.

**Total session time:** Design (brainstorming + plan) → implementation → review → publish, all in one conversation.

## How LearnAI Team Could Use This

- Create an internal assessment-design checklist for AI-resistant quizzes, coding exams, and project rubrics.
- Use the skill to audit LearnAI course assessments before release, especially where students could paste questions directly into chatbots.
- Teach instructors to design assessments around local context, class-specific notation, oral corrections, and required intermediate reasoning.

## Real-World Use Cases

- Auditing a CS database midterm for questions that AI can answer using standard textbook assumptions.
- Generating alternate exam versions with watermark constants and grading flags for copied or AI-generated answers.
- Building rubrics that reward class-specific reasoning rather than generic final answers.

## Philosophy

These strategies are **not "gotcha" traps**. They reward students who attend class, read carefully, and understand the material. Every trap has a straightforward correct answer for the prepared student. The goal is to make AI answers *detectably wrong* — shifting the cost-benefit away from cheating.

As [Inside Higher Ed notes](https://www.insidehighered.com/opinion/career-advice/teaching/2026/04/13/best-defense-against-ai-cheating-opinion), the best defense against AI cheating isn't detection technology — it's assessment design that makes genuine understanding the path of least resistance.
