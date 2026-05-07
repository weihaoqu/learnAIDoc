---
title: "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook"
date: 2026-04-01
category: AI for Research
redirect_from:
  - "/wiki/ai research/ai-agent-academic-research-writing/"
tags: [academic-writing, research, obsidian, katmer-code, peer-review, literature-review, citation, claude-code, chatgpt]
related: ["Claude-Prism — Local-First Academic Writing Workspace with AI", "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls", "Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "Five Questions for Critical Paper Reading — The Cambridge Method with Claude", "Paper2Code: Turn ArXiv Papers into Citation-Anchored Code"]
icon: "📝"
image: "/assets/images/ai-agent-academic-research-writing.png"
---

The gap between "ChatGPT can help me write" and a full AI-powered research pipeline is enormous. Two recent resources bridge it: **KatmerCode**, an Obsidian plugin that puts 8 research-specific AI skills in your writing sidebar, and a **Nature career column** by Dritjon Gruda outlining 3 responsible ways to use LLMs for academic writing. Together, they show both the tooling and the mindset for AI-assisted research in 2026.

*Source: [KatmerCode on GitHub](https://github.com/hkcanan/katmer-code) (295 stars) | [Gruda, D. "Three ways ChatGPT helps me in my academic writing" — Nature (2024)](https://www.nature.com/articles/d41586-024-01042-3) | [哈泰利 on Xiaohongshu](https://www.xiaohongshu.com/) | [Hacker News discussion](https://news.ycombinator.com/item?id=47479462)*

## KatmerCode: Full Research Pipeline Inside Obsidian

KatmerCode integrates Claude Code as a sidebar panel in Obsidian — specifically designed for researchers who write in their vault and want AI assistance without leaving the editor. It runs Claude Code CLI as a subprocess, supports streaming, tool calls, and inline diff editing.

```
┌─────────────────────────────────────────────────────┐
│  Obsidian Vault                                     │
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │                  │  │  KatmerCode Sidebar     │  │
│  │  Your Manuscript │  │  ┌──────────────────┐  │  │
│  │  (Markdown)      │◄─┤  │ 8 Research Skills│  │  │
│  │                  │  │  │ /lit-search      │  │  │
│  │  Inline Diffs:   │  │  │ /citation-network│  │  │
│  │  ~~old~~ new     │  │  │ /research-gap    │  │  │
│  │                  │  │  │ /abstract        │  │  │
│  └──────────────────┘  │  │ /journal-match   │  │  │
│                        │  │ /peer-review     │  │  │
│                        │  │ /cite-verify     │  │  │
│                        │  │ /report-template │  │  │
│                        │  └──────────────────┘  │  │
│                        │         │              │  │
│                        │         ▼              │  │
│                        │  Academic databases:   │  │
│                        │  Semantic Scholar,     │  │
│                        │  CrossRef, OpenAlex,   │  │
│                        │  arXiv, PubMed,        │  │
│                        │  Unpaywall             │  │
│                        └────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### The 8 Research Skills

Each skill is triggered via slash command and produces structured HTML reports with charts, tables, and interactive elements.

| Skill | What It Does |
|---|---|
| **`/lit-search`** | Queries arXiv, Semantic Scholar, PubMed, and OpenAlex in parallel; deduplicates and ranks results by relevance |
| **`/citation-network`** | Traces citations forward and backward; generates interactive vis.js graphs showing publication relationships and timelines |
| **`/research-gap`** | Identifies temporal, methodological, thematic, and application gaps in the literature; scores each by feasibility and impact |
| **`/abstract`** | Generates 5 abstract formats: structured, narrative, graphical, highlights, and social media versions |
| **`/journal-match`** | Analyzes your paper's reference profile to recommend target journals with scope fit and acceptance rate assessments |
| **`/peer-review`** | Evaluates manuscripts across 8 criteria with radar chart visualization and section-specific feedback |
| **`/cite-verify`** | Cross-checks every reference against CrossRef, Semantic Scholar, and OpenAlex; flags broken citations, retracted papers, metadata mismatches |
| **`/report-template`** | Wraps all outputs into a unified, styled HTML report viewable in Obsidian or browser |

### Setup & Requirements

```bash
# Requires Claude Code CLI installed globally
npm install -g @anthropic-ai/claude-code

# Clone and build the plugin
git clone https://github.com/hkcanan/katmer-code.git
cd katmer-code && npm install && npm run build

# Copy to your Obsidian vault
cp main.js manifest.json styles.css <vault>/.obsidian/plugins/katmer-code/
```

**Key detail:** KatmerCode inherits MCP servers from `~/.claude.json` — so if you've configured `paper-search-mcp`, `arxiv-mcp-server`, or `openalex-research-mcp` for your terminal Claude Code, they automatically work in the sidebar too.

### Important Caveat

The developers emphasize: these are **research aids, not oracles**. Skills query real databases and apply structured analysis, but the outputs are starting points. They surface overlooked patterns — they don't replace expert review.

## Nature's 3-Way Playbook for AI in Academic Writing

Dritjon Gruda, a professor of organizational behavior at Universidade Católica Portuguesa, published a widely-shared Nature career column on responsible AI use in academic writing. His three use cases:

### 1. Polishing Drafts for Clarity and Coherence

Use AI to refine phrasing in papers **you've already written**. The key: you write the content and ideas first, then use the LLM as an editor — like a native-speaker colleague who smooths your prose. This is especially valuable for non-native English speakers.

### 2. Elevating Peer Review

When reviewing manuscripts, use AI to help organize and articulate feedback — not to generate opinions, but to structure your existing assessment into clear, actionable points. The AI helps you be a **better reviewer**, not a replacement reviewer.

### 3. Optimizing Editorial Feedback

As an editor, use AI to make feedback more precise, actionable, and empathetic. The goal: communication quality, not content generation.

### The Common Thread

All three use cases share a principle: **AI refines your thinking, it doesn't replace it.** You bring domain expertise, original ideas, and judgment. The AI brings language polish, structural consistency, and coverage checks.

## Full Research Workflow: Combining Both

Here's how the two approaches complement each other across the research lifecycle:

| Stage | Tool/Method | What Happens |
|---|---|---|
| **1. Topic Exploration** | `/lit-search` + `/research-gap` | Survey literature, identify gaps worth pursuing |
| **2. Deep Reading** | `/citation-network` | Map the intellectual lineage of key papers |
| **3. Writing** | Your brain + Obsidian | Write the manuscript — ideas are yours |
| **4. Polishing** | Gruda's Method #1 + inline diffs | Refine language, clarity, coherence |
| **5. Self-Review** | `/peer-review` | Get structured feedback before submission |
| **6. Citation Check** | `/cite-verify` | Verify every reference is real and correct |
| **7. Journal Selection** | `/journal-match` | Find the best venue for your paper |
| **8. Abstract Variants** | `/abstract` | Generate submission-ready abstracts |
| **9. Peer Reviewing** | Gruda's Method #2 | Structure your reviews with AI assistance |

## Agentic-Researcher: Lightweight Lit Workflow for IS Researchers

A newer, more focused tool by [SheeanBen](https://github.com/SheeanBen/Agentic-Researcher) — designed specifically for **Information Systems** grad students who use Zotero + Obsidian. Less feature-rich than KatmerCode but more opinionated about the daily reading workflow.

```
Keywords → Auto-expand to IS terms → Search top venues
    → Score & filter papers → Confirm selections
    → Sync PDFs from Zotero → Generate Chinese research notes
    → Daily reading report
```

### 5 Key Features

| Feature | What It Does |
|---|---|
| **Smart keyword expansion** | Input "AI" → auto-adds "agentic AI, multi-agent systems"; prioritizes MISQ, ISR, ICIS, etc. |
| **Auto scoring & filtering** | Each paper gets a score + one-sentence Chinese recommendation |
| **Structured Chinese notes** | Extracts PDF full text, generates notes following: research question → method → experiment → conclusion → critical evaluation |
| **Deduplication** | System remembers all papers you've read; won't repeat |
| **Daily report** | One-click summary of what you read today — advisor-friendly |

### Setup

```bash
git clone https://github.com/SheeanBen/Agentic-Researcher.git
cd Agentic-Researcher
cp .env.example .env.local  # Add API keys if using LLM scoring
```

Requires Python 3.9+, pdftotext (Poppler), Zotero with Attanger plugin for PDF sync. Works offline with heuristic scoring or with OpenAI API for LLM-powered evaluation.

### Who It's For

Best fit: IS/management PhD students who read papers daily in Chinese and use Obsidian for notes. Less general-purpose than KatmerCode but more streamlined for the daily literature grind.

## DeepScientist: Local AI Research Workstation

[DeepScientist](https://github.com/ResearAI/DeepScientist) fills a different gap than KatmerCode or Agentic-Researcher — it manages the **experiment side** of research, not just literature and writing. Set up in 15 minutes, it gives you a persistent, local-first workspace where code, experiments, notes, and paper drafts all live together.

```
Research question or paper
        │
        ▼
┌──────────────────────────────────┐
│  DeepScientist Workspace         │
│                                  │
│  Git repo per project            │
│  ├── Baseline reproduction       │
│  ├── Branch per experiment       │
│  ├── Ablation studies            │
│  ├── Failed paths preserved      │  ← keeps ALL attempts, not just successes
│  ├── Metrics & traces            │
│  └── LaTeX draft + figures       │
│                                  │
│  Access: Web UI (:20999) / TUI   │
│  IM: WeChat, Telegram, Feishu    │
└──────────────────────────────────┘
```

### Key Features

| Feature | What It Does |
|---|---|
| **Quest-based research** | Start from a paper, repo, or natural-language objective |
| **Baseline reproduction** | Auto-restore environments, resolve dependencies |
| **Experiment branching** | Git branch per experiment, structured ablation support |
| **Failure preservation** | Keeps all failed paths — failed experiments teach more than successes |
| **LaTeX + PDF** | Local document compilation, auto figure generation |
| **Multi-surface** | Web UI, terminal, and IM channels (WeChat, Telegram, Feishu) |

### Setup

```bash
npm install -g @researai/deepscientist
codex --login
ds --here
# Access at http://127.0.0.1:20999
```

### Philosophy

> "Persistent repository-based projects over ephemeral chats. Human control over black-box automation. Preserved learning from failed paths."

DeepScientist's core insight: **failed experiments are knowledge too**. Most tools discard failed paths. DeepScientist preserves them with full traces, so you (or your advisor) can see why approach A failed and why approach B worked.

## How LearnAI Team Could Use This

- Build a research-writing workflow template for LearnAI docs: literature search, citation verification, draft polishing, and peer-review checks before publication.
- Use KatmerCode-style slash commands as a model for internal AI documentation agents that produce structured, source-linked reports.
- Turn the Nature playbook into team guidance: AI may improve clarity, structure, and feedback quality, but authors remain responsible for claims, citations, and judgment.
- Use DeepScientist-style experiment preservation for AI tool evaluations so failed trials, prompts, and benchmark notes remain auditable.

## Real-World Use Cases

| Use Case | How It Works | Why It Matters |
|---|---|---|
| Literature review sprint | Search papers, map citation networks, and identify gaps before drafting | Speeds up topic exploration while keeping source review explicit |
| Manuscript polishing | Author writes the argument first, then uses AI for clarity and coherence | Improves readability without outsourcing scholarly judgment |
| Pre-submission review | Run peer-review and citation-verification checks before submitting | Catches weak sections, missing evidence, and broken references earlier |
| Advisor or lab reporting | Generate daily reading notes and experiment summaries from a shared workspace | Makes research progress easier to inspect and discuss |
| Tool evaluation | Preserve failed and successful experiment branches when testing AI research tools | Creates an audit trail for what worked, what failed, and why |

## Other Tools in the Ecosystem

| Tool | Focus | Key Feature |
|---|---|---|
| [Elicit](https://elicit.com/) | Literature discovery | 138M papers, systematic review automation |
| [Claude-Prism](/learnAIDoc/wiki/claude-prism-academic-writing/) | Local academic workspace | Privacy-first writing with Claude |
| [Gatsbi](https://www.gatsbi.com/) | Full paper generation | Integrated citations, figures, equations |
| [Connected Papers](https://www.connectedpapers.com/) | Citation visualization | Graph-based related paper discovery |
| [Thesify](https://www.thesify.ai/) | Thesis feedback | Structure, argumentation, evidence analysis |
| [DeepScientist](https://github.com/ResearAI/DeepScientist) | Experiment management | Local-first, branch-per-experiment, failure preservation |

## Links

- **KatmerCode:** [github.com/hkcanan/katmer-code](https://github.com/hkcanan/katmer-code)
- **Agentic-Researcher:** [github.com/SheeanBen/Agentic-Researcher](https://github.com/SheeanBen/Agentic-Researcher)
- **DeepScientist:** [github.com/ResearAI/DeepScientist](https://github.com/ResearAI/DeepScientist)
- **Nature article:** [Three ways ChatGPT helps me in my academic writing](https://www.nature.com/articles/d41586-024-01042-3)
- **HN discussion:** [Show HN: KatmerCode](https://news.ycombinator.com/item?id=47479462)
- **XDA coverage:** [Claude Code inside Obsidian](https://www.xda-developers.com/claude-code-inside-obsidian-and-it-was-eye-opening/)
<\!-- REVIEW-TODO: [source_links] Xiaohongshu source link is generic (https://www.xiaohongshu.com/), not a specific post URL — find actual 哈泰利 post or remove -->
