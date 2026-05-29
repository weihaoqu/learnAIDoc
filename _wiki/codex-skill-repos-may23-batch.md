---
title: "Codex + Claude Code Skill Repos: May 23 Batch"
date: 2026-05-23
category: Skills & Plugins
tags: [codex, claude-code, skills, awesome-list, marketplace, openai-skills, mattpocock, trailofbits, anthropics-financial-services, voidful, paperspine, imbad0202]
related: ["CodeGraph: Local Code Knowledge Graph that Cuts Token Usage", "academic-research-skills — Imbad0202's 4-Skill Claude Code Pipeline for Academic Research", "Claude Code Skills: Resources & Repos", "How Anthropic Uses Skills — Thariq's 9-Category Framework & the Gotchas Pattern", "Personal AI Skill Cheat Sheet — When to Use Each Skill"]
icon: "📚"
image: "/assets/images/codex-skill-repos-may23-batch.png"
---

# Codex + Claude Code Skill Repos: May 23 Batch

A reference collection of skill repositories worth installing for both **Codex** and **Claude Code**, identified from the 5.23 screenshot batch and verified against GitHub trending charts the same week.

## Direct skill repos (installed locally May 23)

| Repo | ⭐ | Type | Install path |
|------|----|------|--------------|
| [openai/skills](https://github.com/openai/skills) | 20K | Codex catalog (37 skills under `skills/.curated/`) | `~/.codex/skills/` + `~/.claude/skills/` (flat copy) |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 102K | Claude Code plugin | `/plugin marketplace add` |
| [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | 19.7K | CC plugin: research → write → review → revise → finalize | `/plugin marketplace add` |
| [Imbad0202/academic-research-skills-codex](https://github.com/Imbad0202/academic-research-skills-codex) | 1.4K | Codex-native sibling | `~/.codex/skills/academic-research-suite/` |
| [trailofbits/skills](https://github.com/trailofbits/skills) | 5.3K | Security audit (41 plugins, marketplace) | `/plugin marketplace add` + `.codex/skills/` |
| [voidful/academic-skills](https://github.com/voidful/academic-skills) | 60 | Cross-platform (CC + Codex + Gemini) — 7 skills | `~/.codex/skills/` + `~/.claude/skills/` |
| [WUBING2023/PaperSpine](https://github.com/WUBING2023/PaperSpine) | 514 | Codex-native paper writing | `~/.codex/skills/paper-spine/` |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | 27K | CC plugin marketplace (10 agent-plugins + 7 vertical) | `/plugin marketplace add` |
| [aklofas/kicad-happy](https://github.com/aklofas/kicad-happy) | 392 | KiCad/PCB EDA (skipped — not relevant) | — |

## Awesome-* curation lists (reference only — not installable)

| List | ⭐ | What it is |
|------|----|----|
| [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) | 11K | "Plugin marketplace" of practical Codex skills across code dev, automation, doc processing, data analysis, workflow tools |
| [RoggeOhta/awesome-codex-cli](https://github.com/RoggeOhta/awesome-codex-cli) | 210 | 150+ tools/skills/subagents/plugins curation for the OpenAI Codex CLI |
| [Prat011/awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) | 1.3K | Cross-platform LLM/agent skills (CC + Codex + Gemini) |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) | 929 | 67 DESIGN.md and SKILL.md design skill files |
| [xjtulyc/awesome-rosetta-skills](https://github.com/xjtulyc/awesome-rosetta-skills) | 24 | Cross-discipline academic research skills |

## Companion tools (not skills, but related to the workflow)

These showed up in the same trending charts and are worth knowing:

- **[colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)** — code-graph indexing to cut token usage in Claude Code/Codex/Cursor
- **[safaiame/graphify](https://github.com/safaiame/graphify)** — knowledge graph that auto-updates as code changes
- **[rohitg00/agentmemory](https://github.com/rohitg00/agentmemory)** — persistent memory layer for AI coding agents
- **[anthropics/financial-services](https://github.com/anthropics/financial-services)** — also a tool suite (subagents + data connectors), not just skills
- **[CloakHQ/CloakBrowser](https://github.com/CloakHQ/CloakBrowser)** — stealth Chromium for browser-automation use cases
- **[playcanvas/supersplat](https://github.com/playcanvas/supersplat)** — 3D Gaussian-Splat scene editor
- **[millionco/react-doctor](https://github.com/millionco/react-doctor)** — detects React code quality issues in AI-generated code
- **[kellyvv/PhoneClaw](https://github.com/kellyvv/PhoneClaw)** — on-device iPhone AI agent (Gemma 4 + MiniCPM-V)
- **[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)** — personal AI superintelligence platform

## Asen's individual skill pack (mostly covered by oh-my-claudecode)

The 6 skills from 阿森编程日记 (IMG_6499-6504) are already available via oh-my-claudecode:

| Asen original | OMC equivalent |
|---|---|
| `prompt-optimizer` | `prompt-master` |
| `deep-interview` | `oh-my-claudecode:deep-interview` |
| `ralplan` | `oh-my-claudecode:ralplan` |
| `ultraqa` | `oh-my-claudecode:ultraqa` |
| `ai-slop-cleaner` | `oh-my-claudecode:ai-slop-cleaner` |
| `visual-verdict` | `oh-my-claudecode:visual-verdict` |

## Codex content-generation skills (老张与AI pack, IMG_6468-6470)

Not yet installed. If wanted, search for:
- `ai-image-generation` — text → product/character/scene images
- `ai-video-generation` — text → demos/transitions/B-roll
- `ai-avatar-video` — 数字人 talking-head pipeline

(Q already has `utility-skills:baoyu-image-gen` and similar via the baoyu suite, so these may overlap.)

## Karpathy's CLAUDE.md template (IMG_6418)

Not a skill — a reference template for structuring `CLAUDE.md` files. Worth reading for the principles:
- Plan Mode First, Verify Relentlessly, Keep It Simple, Surgical Edits Only, Goal-Driven Execution, Parallelise with Subagents
- Simplicity First, No Laziness, Minimal Impact
- Tenacity, Leverage, Fun, Atrophy, Speedups ≠ Just Faster, Slopocalypse

(Many of these already echo Q's CLAUDE.md, but the "Slopocalypse" / "signal vs hype" framing is fresh.)

## How LearnAI Team Could Use This

- **Academic research suite (Imbad0202)** — drop-in research → write → review → revise pipeline. Perfect for paper writing assignments, MARIE thesis chapters, or literature reviews. Pair with `derekwriting` for style polish.
- **trailofbits security skills** — for the CS-336 (Program Analysis for Security) course, students can use the audit/vulnerability skills to analyze sample programs.
- **openai/skills** — figma-* skills useful for UI-heavy projects; notion-* skills for knowledge capture (Obsidian alternative); deploy-* skills (vercel/netlify/cloudflare/render) for shipping student projects.
- **PaperSpine** — motivation-driven paper writing with LaTeX-safe audits; useful for the formal program-analysis paper draft.

## Real-World Use Cases

1. **Shipping a course project** — student uses `vercel-deploy` or `aws-deploy` skill in Codex to ship their LearnAI demo without learning Docker first.
2. **Paper revision** — Q runs `paperspine` audit on a draft to catch LaTeX issues + revision rationale gaps before submitting.
3. **Pre-defense code review** — MARIE thesis student runs `trailofbits/skills` vulnerability sweep on their codebase to catch obvious issues.
4. **Course material capture** — `notion-meeting-intelligence` + `notion-knowledge-capture` to convert lectures into structured notes.

## Pinned source commits (for reproducibility)

| Staging dir | Repo | Commit |
|---|---|---|
| `openai-skills` | openai/skills | `b0401f0` |
| `mattpocock-skills` | mattpocock/skills | `b8be62f` |
| `imbad-cc` | Imbad0202/academic-research-skills | `8ca9d25` |
| `imbad-codex` | Imbad0202/academic-research-skills-codex | `900238c` |
| `trailofbits-skills` | trailofbits/skills | `a56045e` |
| `voidful-academic` | voidful/academic-skills | `71e9c42` |
| `paperspine` | WUBING2023/PaperSpine | `e215cec` |
| `anthropic-financial` | anthropics/financial-services | `96bc961` |

Staging is **57 MB on disk** (not 14 MB as initially estimated from git db size). Keep `~/skills-staging/` for future `git pull` updates, or delete after recording these hashes.

## Install commands (May 23 batch — already executed)

### Stage 1 — Clone with explicit dir names (avoids `basename` collision)

```bash
mkdir -p ~/skills-staging && cd ~/skills-staging
git clone --quiet https://github.com/openai/skills.git openai-skills
git clone --quiet https://github.com/mattpocock/skills.git mattpocock-skills
git clone --quiet https://github.com/Imbad0202/academic-research-skills.git imbad-cc
git clone --quiet https://github.com/Imbad0202/academic-research-skills-codex.git imbad-codex
git clone --quiet https://github.com/trailofbits/skills.git trailofbits-skills
git clone --quiet https://github.com/voidful/academic-skills.git voidful-academic
git clone --quiet https://github.com/WUBING2023/PaperSpine.git paperspine
git clone --quiet https://github.com/anthropics/financial-services.git anthropic-financial
```

### Stage 2 — Codex skills (`~/.codex/skills/`, +44 from this batch)

Final post-install count: 204 dirs in `~/.codex/skills/`. The baseline measurement of "29" from initial `ls | head -50` undercounted the pre-existing state because alphabetical truncation hid most entries; the actual pre-install state was ~160 (mostly trailofbits security skills + oh-my-claudecode auto-discoveries). The 44 net-new from this batch are: 39 openai/.curated + 1 academic-research-suite + 3 voidful paper-* + 1 PaperSpine codex.



```bash
mkdir -p ~/.codex/skills
# openai curated (39 skills, no collisions with prior installs)
cp -R ~/skills-staging/openai-skills/skills/.curated/*/ ~/.codex/skills/
# Imbad academic suite (1 skill)
cp -R ~/skills-staging/imbad-codex/skills/academic-research-suite/ ~/.codex/skills/
# voidful: the 3 missing (other 4 already installed)
cp -R ~/skills-staging/voidful-academic/paper-reading ~/.codex/skills/
cp -R ~/skills-staging/voidful-academic/paper-review ~/.codex/skills/
cp -R ~/skills-staging/voidful-academic/paper-writing ~/.codex/skills/
# PaperSpine codex single-skill dist
cp -R ~/skills-staging/paperspine/dist/codex/paper-spine ~/.codex/skills/
```

### Stage 3 — Claude Code plugin marketplaces (run interactively in CC)

```
/plugin marketplace add https://github.com/mattpocock/skills
/plugin marketplace add https://github.com/Imbad0202/academic-research-skills
/plugin marketplace add https://github.com/trailofbits/skills
/plugin marketplace add https://github.com/WUBING2023/PaperSpine
/plugin marketplace add https://github.com/anthropics/financial-services
```
Then `/plugin install <name>@<marketplace>` for each plugin you want.

### Stage 4 — Claude flat skills (`~/.claude/skills/`)

```bash
mkdir -p ~/.claude/skills
# openai curated (38 — pdf retained as exception, see below)
for d in ~/skills-staging/openai-skills/skills/.curated/*/; do
  name=$(basename "$d")
  [ -d ~/.claude/skills/"$name" ] || cp -R "$d" ~/.claude/skills/"$name"
done
# voidful all 7
cp -R ~/skills-staging/voidful-academic/experiment-design ~/.claude/skills/
cp -R ~/skills-staging/voidful-academic/idea-generation ~/.claude/skills/
cp -R ~/skills-staging/voidful-academic/paper-reading ~/.claude/skills/
cp -R ~/skills-staging/voidful-academic/paper-review ~/.claude/skills/
cp -R ~/skills-staging/voidful-academic/paper-writing ~/.claude/skills/
cp -R ~/skills-staging/voidful-academic/professor-fit-analyser ~/.claude/skills/
cp -R ~/skills-staging/voidful-academic/proof-writer ~/.claude/skills/
# PaperSpine Claude flat skills (7: paper-spine{,-audit,-build,-intake,-latex,-research,-rewrite})
cp -R ~/skills-staging/paperspine/dist/claude/skills/*/ ~/.claude/skills/
```

## Exceptions / things to know

1. **`pdf` skill was kept as Q's pre-existing version** — not overwritten with openai's curated `pdf`. Q's existing `pdf` is a proprietary/different skill (PDF read/write/OCR/forms). If you want to compare, the openai version is at `~/skills-staging/openai-skills/skills/.curated/pdf/`.

2. **OpenAI curated skill names flattened** (no `openai-` prefix added). Future updates that add new openai skills with names matching skills you've installed from other sources will silently skip due to the `[ -d ... ] || cp` guard. **Run a basename preflight check before re-importing.**

3. **trailofbits security skills appear via existing plugin install**, not from this batch. `~/.codex/skills/` count of 73 includes prior trailofbits installs (differential-review, insecure-defaults, modern-python, agentic-actions-auditor, supply-chain-risk-auditor).

4. **PaperSpine has dual platform output**: `dist/codex/paper-spine/` (single skill, copied to ~/.codex/skills/) AND `dist/claude/skills/` (7 skills: paper-spine + 6 sub-skills, copied to ~/.claude/skills/).

## Lessons

- **Always check for collisions before bulk copy.** I assumed openai/skills would collide with trailofbits' `differential-review` etc., but those came from prior installs. False alarm — wasted a Codex round-trip on it.
- **Symlinks matter.** trailofbits/skills uses symlinks from `.codex/skills/` into `plugins/`. `cp -R` preserves them (good); `cp -RL` dereferences (use only for frozen snapshots).
- **Plugin marketplace > hand-clone.** The marketplace flow gives proper update path + cache management. Hand-cloning into `~/.claude/plugins/` works but breaks `/plugin` lifecycle commands.
- **One repo can ship dual platforms.** PaperSpine has `dist/codex/` AND `dist/claude/skills/` — install both for full coverage. trailofbits has `.claude-plugin/` AND `.codex/`. Look for these markers.

## Source screenshots

`5.23/IMG_6411.PNG` through `IMG_6505.PNG` (34 images, 8 different recommenders / GitHub trending charts dated 5.21 – 5.23).
