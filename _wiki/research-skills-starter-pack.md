---
title: "Research Skills Starter Pack — Install and Use Academic AI Skills Without the Hype"
date: 2026-07-31
category: AI for Research
tags: [research-skills, academic-writing, codex, claude-code, paperspine, academic-research-suite, nature-skills, citation-verification, student-workflow]
related: ["Agent AI Survey — Multimodal and Embodied Agents Beyond Chatbots", "academic-research-skills — Imbad0202's 4-Skill Claude Code Pipeline for Academic Research", "PaperSpine — Motivation-Driven Paper Writing Skill Suite for Codex and Claude Code", "Nature Skills — Academic Writing and Research Skill Bundle for Codex and Claude Code", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "Personal AI Skill Cheat Sheet — When to Use Each Skill"]
icon: "🧪"
image: "/assets/images/research-skills-starter-pack.png"
---

The useful version of a "research skills tier list" is not ranking every skill from best to worst. For students, the better question is: **what research job am I trying to do, which skill should I install, and what artifact should I inspect before trusting the output?**

This page is the install-and-use router. The deep dives stay in the companion pages.

*Source: [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills) | [Claude Code skills docs](https://code.claude.com/docs/en/skills) | [ARS-Codex](https://github.com/Imbad0202/academic-research-skills-codex) | [academic-research-skills setup](https://github.com/Imbad0202/academic-research-skills/blob/main/docs/SETUP.md) | [PaperSpine](https://github.com/WUBING2023/PaperSpine/blob/main/README.en.md) | [Nature Skills](https://github.com/Yuan1z0825/nature-skills)*

## The Minimum Stack

Do not install every research skill you see in a screenshot. Too many overlapping skills make routing worse. Start with one skill per job:

| Job | Best first choice | Use when | Output to inspect |
|---|---|---|---|
| Literature review and research planning | `academic-research-suite` / ARS | You need to map a topic, build a reading plan, or stress-test a research question | source matrix, search log, gap list, PRISMA-style flow if relevant |
| Manuscript construction | `paper-spine` | You have papers/data/notes and need to build or rewrite a manuscript | confirmed contribution, evidence bank, writing rationale matrix, claim register |
| Nature-style academic writing workflow | `nature-skills` | You need paper reading, bilingual translation, figure/presentation/citation/reviewer-response support | bilingual Markdown, PPT draft, figure checklist, citation/reviewer-response draft |
| Citation and claim checking | `citation-verifier` or citation-specific mode | You need to check whether claims are actually supported | claim table with source status and unknowns |
| Public research explainer | `content-research-writer` | You are writing a wiki/blog/teaching note rather than a formal paper | outline, source list, unsupported-claim list |

The right workflow is usually **ARS → PaperSpine → citation check**, not one giant "write my paper" prompt.

## July2 Screenshot Triage

The July2 folder had several research-skill ranking screenshots, including ARS Codex, Supervisor-Skills, and updated `academic-research-skills` notes. They are useful signals, but they should not become separate pages unless the tool has a distinct student workflow. Merge them here or into the deeper ARS/Nature/PaperSpine pages.

| Screenshot theme | Wiki action |
|---|---|
| ARS Codex / Academic Research Skills rankings | Keep this starter-pack router current |
| Supervisor-style research guidance skills | Mention only if a verified repo and workflow are available |
| Nature Skills / PaperSpine / citation tooling | Update the existing deep-dive pages, not new posts |
| Research-skill tier lists | Use as scouting data; do not publish ranking screenshots as authority |

## Install Paths

There are two installation models:

| Runtime | Local skill folder | Plugin path |
|---|---|---|
| Codex | `~/.codex/skills/<skill-name>/SKILL.md` | Codex plugin marketplace / desktop plugin UI |
| Claude Code | `~/.claude/skills/<skill-name>/SKILL.md` or project `.claude/skills/` | `/plugin marketplace add ...` then `/plugin install ...` |

OpenAI's docs describe a skill as a directory with a required `SKILL.md`, plus optional `scripts/`, `references/`, `assets/`, and agent metadata. Codex can invoke a skill explicitly with `$skill-name` or implicitly from the description. Claude Code uses skill folders too; a personal or project skill normally becomes a slash command such as `/skill-name`, while plugin skills may be namespaced or expose package-specific commands.

## Install ARS

ARS is the broad research workflow stack.

**Codex-native ARS-Codex, per the upstream README:**

```bash
codex plugin marketplace add Imbad0202/academic-research-skills-codex --ref main
codex plugin add ars-codex@ars-codex
```

After opening a new Codex conversation, invoke it with:

```text
$academic-research-suite
```

or describe the task plainly:

```text
Use academic-research-suite to map this research topic and produce a literature-review plan with missing-evidence checklist.
```

**Claude Code ARS plugin, per the upstream setup guide:**

```text
/plugin marketplace add Imbad0202/academic-research-skills
/plugin install academic-research-skills
```

Then use one of the workflow entries, for example:

```text
/ars-plan
/ars-lit-review "survey refinement types for security-relevant program analysis"
```

Use ARS first when the problem is still research-shaped: finding papers, deciding scope, reviewing a draft, or building a structured research pipeline.

## Install PaperSpine

PaperSpine is for building or rebuilding the manuscript argument. The upstream README says PaperSpine v4 collapsed the old worker-skill layout into one orchestrator skill named `paper-spine`.

The upstream repo provides host-specific distributions under `dist/` and install wrappers. Its docs say the relevant distribution folders are under `dist/claude/skills`, `dist/claude/commands`, `dist/codex/skills`, `dist/openclaw/skills`, and `dist/hermes/skills/academic-writing`; the preferred Claude Code / Codex entry is `/paperspine` where that command file is installed.

Typical invocation:

```text
/paperspine
```

Use PaperSpine after the research question and evidence are no longer vague. It should produce artifacts like:

| Artifact | Why it matters |
|---|---|
| `confirmed_contribution.md` or equivalent | Forces the paper to have one controlling contribution |
| evidence bank | Prevents claims from floating without support |
| writing rationale matrix | Shows why each section exists |
| claim register | Makes unsupported claims visible before submission |

## Install Nature Skills

Nature Skills is useful when the task is not "write the entire paper" but a concrete academic-writing subtask:

```bash
npx skills add Yuan1z0825/nature-skills --list
npx skills add Yuan1z0825/nature-skills --global --agent codex --skill '*' --yes --copy
```

For one Codex skill instead of the full bundle:

```bash
npx skills add Yuan1z0825/nature-skills --agent codex --skill nature-figure --yes --copy
```

For Claude Code, the current upstream README recommends keeping a stable local clone and creating a subagent or slash-command wrapper that points at the real `skills/<name>/SKILL.md` and shared support package. The repo also ships an optional sync script that can copy skills into `~/.claude/skills/`, but review that path before enabling any auto-update hook.

Use it selectively:

| Task | Skill family |
|---|---|
| Read a dense paper with bilingual support | `nature-reader` |
| Make a lab-meeting deck | `nature-paper2ppt` |
| Polish academic prose | `nature-polishing` / `nature-writing` |
| Normalize references | `nature-citation` |
| Draft reviewer response | `nature-response` |
| Improve a figure | `nature-figure` |

This is a strong support stack for students and bilingual researchers, but it should not replace source verification or advisor review.

## Safe Use Workflow

Use this sequence for a course paper or first research note:

```text
1. ARS
   Map the topic, scope the question, collect candidate sources.

2. Human checkpoint
   Remove bad sources, narrow the question, decide what is out of scope.

3. PaperSpine
   Confirm contribution, build evidence bank, create section rationale.

4. Draft
   Write section by section. Do not let the model invent missing evidence.

5. Citation/claim verification
   Produce a claim table: supported, weakly supported, missing, unknown.

6. Final human review
   Read the sources yourself before submission.
```

For students, the graded artifacts should be the intermediate outputs, not just the final prose. A student who submits the source matrix, gap list, rationale matrix, and claim register has learned more than a student who only submits an AI-polished essay.

## Local Setup Example

One working local setup checked on 2026-07-31 by listing the user-level Codex and Claude Code skill folders:

| Runtime | Relevant installed skills |
|---|---|
| Codex | `academic-research-suite`, `paper-spine`, `citation-verifier`, `content-research-writer`, `scientific-writing`, `nature-portfolio-playbook`, `nature-figure`, `paper-reading`, `paper-review`, `paper-writing` |
| Claude Code | `paper-spine`, `paper-spine-research`, `paper-spine-build`, `paper-spine-audit`, `paper-spine-rewrite`, `paper-spine-latex`, `literature-review`, `citation-verifier`, `paper-reading`, `paper-review`, `scientific-writing`, `nature-figure` |

This is a personal setup example, not a required class install list. For students, the right default is still one tool per job and a visible source-checking artifact.

## Student Exercises

| Exercise | Skill | Deliverable |
|---|---|---|
| Map a topic | ARS | 10-paper source matrix + three research gaps |
| Build a paper argument | PaperSpine | contribution statement + rationale matrix |
| Audit a draft | citation verifier | claim table with unsupported claims removed |
| Present a paper | Nature Skills | lab-meeting deck plus three slides students manually improved |
| Compare tools | ARS vs PaperSpine | one-page memo: which tool helped which stage? |

## Important Things To Know

- **Skills are procedures, not authorities.** A skill can enforce workflow discipline, but it cannot make weak sources strong.
- **Install fewer tools than the screenshot suggests.** Keep one tool per job until you know why you need more.
- **Inspect before installing.** Read `SKILL.md`, scripts, plugin manifests, hooks, MCP config, API-key assumptions, and license.
- **Use project-level skills for teaching.** For a course repo, `.claude/skills/` or a repo-local skill package is easier to audit than a student's global setup.
- **Licenses differ.** At the time checked, the Claude ARS repo reports CC-BY-NC 4.0, PaperSpine reports MIT, and Nature Skills reports Apache-2.0. Verify the current license before course-wide redistribution.
- **Every final claim needs a source trail.** Require the claim register or citation table before accepting AI-assisted research writing.
