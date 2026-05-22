---
title: "Nature Skills — 9-Skill Claude Code Bundle for Academic Writing at Nature Standards"
date: 2026-05-21
category: AI Tools & Workflows
tags: [claude-code, skills, academic-writing, nature, paper-writing, bilingual, pptx, figure, citation, pubmed, arxiv, reviewer-response, shanghai-jiao-tong, open-source, mit]
related: ["Academic Research Skills for Claude Code — From Search to Final Draft", "PaperSpine — Motivation-Driven Paper Writing Skill for Codex and Claude Code", "MATLAB MCP — Connect Claude Code to Your Local MATLAB Environment", "Posterskill — AI-Generated Academic Conference Posters from Your Paper", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "Claude-Prism — Local-First Academic Writing Workspace with AI"]
icon: "🔬"
image: "/assets/images/nature-skills-academic-writing.png"
---

**Nature Skills is a 10,000+ star MIT-licensed Claude Code skill bundle by a Shanghai Jiao Tong University PhD student that covers multiple stages of academic writing — PDF reading, bilingual translation, PPT generation, figure design, prose polishing, citation management, data analysis, reviewer response, and multi-source search — across nine cooperating skills designed to align with Nature journal standards as described in the repo.**

*Source: [github.com/Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) — 10,000+ stars, 639+ forks, MIT License | Creator: Yuan Yizhe, Shanghai Jiao Tong University*

## What It Is

Academic AI tools tend to fall into two camps: broad general assistants that don't know academic conventions, or narrow single-purpose tools (just citation formatting, just translation). Nature Skills is neither. It's a nine-skill bundle, each targeting a specific friction point in the paper-writing lifecycle, designed to align with Nature-family journal standards as described in the repo.

The headline skills are **nature-reader** (full-paper bilingual PDF → Markdown) and **nature-paper2ppt** (paper → Chinese .pptx for lab meetings), which surface the tool's origin story: a Chinese PhD student solving the real daily problems of reading foreign-language papers and presenting them to a Chinese-speaking lab group.

The bundle has crossed 10,000 GitHub stars and 639 forks, which is exceptional for a niche academic tool. MIT licensed — no commercial restrictions.

**Install:**
```
/plugin marketplace add https://github.com/Yuan1z0825/nature-skills
/plugin install nature-skills
/reload-plugins
```
Most skills activate automatically after install. Some skills (particularly nature-academic-search) may require additional API key configuration — see the repo README per skill for current requirements.

## The 9 Skills

### 1. nature-reader (Beta)
Full-paper bilingual reader. Converts local PDF files into complete bilingual (Chinese–English) Markdown documents with source anchors and figure grounding. Each paragraph or section is rendered in both languages side by side, with figure captions preserved in context.

Trigger: type `nature reader` or `全文翻译` in Claude Code.

This solves the most common friction for non-English-native researchers: reading a dense 15-page Nature paper in a second language takes hours; a bilingual Markdown rendering cuts that to minutes.

### 2. nature-paper2ppt (Beta)
Converts a scientific paper into a Chinese-language `.pptx` file formatted for journal clubs and lab meetings. Automatically identifies paper type (methods paper, results paper, review) and selects only figures that directly support the evidence chain — not all figures from the paper. Outputs a structured deck with title, background, methods, key results, and discussion slides.

### 3. nature-figure
Generates publication-quality figures following Nature's formatting standards — axis labels, font sizes, line weights, color palettes, and panel layouts. Works with matplotlib (Python); R support may also be available (verify current support in the repo README). Outputs figures sized and formatted to Nature's submission specifications.

### 4. nature-polishing
Prose refinement at the sentence level. Rules: sentences ≤30 words, British English, academic register. Strips vague hedging, normalizes passive/active voice for scientific writing conventions, and flags constructions that routinely get flagged by Nature editors.

### 5. nature-writing
Academic writing assistance aligned with Nature standards. Goes beyond polishing to help structure arguments, position claims with appropriate hedging, and frame contributions in the language of a high-impact venue.

### 6. nature-citation
Citation management and formatting. Handles citation style normalization, reference list cleanup, and DOI verification. Works with the major citation formats used across Nature-family journals.

### 7. nature-data
Data analysis and presentation assistance. Helps with statistical framing, figure choice for data type, and interpretation language consistent with Nature's reporting standards.

### 8. nature-response
Reviewer response letters. Generates structured point-by-point rebuttal letters from a list of reviewer comments. Maintains professional tone, formats responses to match standard journal conventions, and helps distinguish between "we agree and changed X" vs. "we respectfully disagree because Y" responses.

This is one of the highest-value skills for anyone who has experienced the anxiety of a Major Revision decision.

### 9. nature-academic-search
Multi-source academic search — supports querying across multiple academic databases simultaneously. See the repo for currently supported sources, deduplication behavior, and result ranking.

## Workflow Map

The nine skills cover the full paper lifecycle:

```
Find papers          → nature-academic-search
Read papers          → nature-reader (bilingual PDF)
Present to lab       → nature-paper2ppt
Analyze data         → nature-data
Write draft          → nature-writing
Polish prose         → nature-polishing
Generate figures     → nature-figure
Manage citations     → nature-citation
Respond to reviewers → nature-response
```

Each skill is independent — use just one, or chain them. The plugin system handles routing; you don't wire them together manually.

## Origin

Yuan Yizhe created Nature Skills as a PhD student at Shanghai Jiao Tong University, solving real daily problems: reading foreign-language papers efficiently, converting them to Chinese-language lab presentations, and writing to the stylistic standards described in the Nature journal guidelines.

## How LearnAI Team Could Use This

- **CS-336 research papers** — Q's Program Analysis for Security course involves reading dense security/PL research. nature-reader's bilingual Markdown output is a practical tool for students who find dense academic prose difficult — the parallel-text format is a known pedagogical scaffold for reading comprehension.
- **Q's own writing** — nature-polishing and nature-writing are directly applicable to Q's research output (type systems, program analysis, formal verification). nature-response is directly applicable when revisions come back.
- **Lab meeting presentation training** — nature-paper2ppt demonstrates to students what a good paper presentation structure looks like, then they refine it. The AI-generated deck is a starting point, not a finished product.
- **Citation management module** — in the AI Engineering from Scratch curriculum or a research methods unit, use nature-citation alongside Zotero to show a two-layer citation workflow.
- **Reviewer response letter workshop** — have students write reviewer responses manually, then compare to nature-response output. What did the AI get right? What did it get wrong? Builds meta-awareness of the rebuttal genre.
- **Multi-source literature search demo** — nature-academic-search querying multiple academic databases simultaneously is a good classroom demo of agentic tool use vs. manual database switching.
- **Figure quality standards** — use nature-figure in a data visualization module: students generate a figure, compare Nature-formatted output to their original, discuss what changed and why.

## Real-World Use Cases

| Scenario | How to Use |
|----------|-----------|
| **PhD student** reading a 20-page Nature paper in English | `nature reader` → bilingual Markdown; read the Chinese, spot-check the English for nuance |
| **Lab member** presenting a paper to a Chinese-speaking group | `nature-paper2ppt` → .pptx in 5 minutes; customize key slides before the meeting |
| **Researcher** submitting figures for a Nature submission | `nature-figure` → matplotlib/R output at Nature spec; no more manual axis-label resize |
| **PI** responding to a Major Revision** | `nature-response` → structured point-by-point draft; PI edits the science, not the format |
| **Student** running a literature review | `nature-academic-search` across multiple academic databases; see repo for supported sources |
| **Author** polishing a methods section | `nature-polishing` → sentence length enforced, British English normalized, hedges checked |
| **Lab** standardizing writing quality | Apply `nature-polishing` + `nature-writing` to all drafts before internal review; consistent register |

## Important Things to Know

- **Both `nature-reader` and `nature-paper2ppt` are Beta.** Expect rough edges; complex multi-column layouts or papers with many embedded equations may not render perfectly.
- **"Nature standards" means Nature-family journals** (Nature, Nature Medicine, Nature Methods, etc.). The style guidance is calibrated to that editorial culture. For Cell, PNAS, or domain-specific journals, some conventions differ — treat the output as a strong starting point, not a guaranteed match.
- **Chinese-language output** is the default for `nature-paper2ppt` (built for SJTU's lab meeting context). If you need English PPT, test whether the skill accepts a language parameter or post-translate.
- **MIT licensed** — commercial use is permitted. Redistributed or adapted copies must retain the copyright and license notice (standard MIT requirement).
- **10,000+ stars, 600+ forks** is strong traction for an academic niche tool, but the repo is from a PhD student, not an institution. Maintenance depends on Yuan Yizhe's continued involvement.
- **Plugin install via URL** — because this isn't in an official marketplace, use the full GitHub URL form: `/plugin marketplace add https://github.com/Yuan1z0825/nature-skills`
- **API keys** — see the repo README for current API key requirements per skill.

## Links

- **Repo:** [github.com/Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) — 10,000+ stars, 639+ forks, MIT
- **Creator:** Yuan Yizhe, Shanghai Jiao Tong University
- **Related:** [MATLAB MCP — Connect Claude Code to Your Local MATLAB Environment](/learnAIDoc/wiki/matlab-mcp-claude-code/)
