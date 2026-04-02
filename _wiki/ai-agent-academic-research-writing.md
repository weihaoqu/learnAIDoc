---
title: "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook"
date: 2026-04-01
category: AI Research
tags: [academic-writing, research, obsidian, katmer-code, peer-review, literature-review, citation, claude-code, chatgpt]
related: ["Claude-Prism — Local-First Academic Writing Workspace with AI", "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls", "Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "Five Questions for Critical Paper Reading — The Cambridge Method with Claude"]
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

## Other Tools in the Ecosystem

| Tool | Focus | Key Feature |
|---|---|---|
| [Elicit](https://elicit.com/) | Literature discovery | 138M papers, systematic review automation |
| [Claude-Prism](/learnAIDoc/wiki/claude-prism-academic-writing/) | Local academic workspace | Privacy-first writing with Claude |
| [Gatsbi](https://www.gatsbi.com/) | Full paper generation | Integrated citations, figures, equations |
| [Connected Papers](https://www.connectedpapers.com/) | Citation visualization | Graph-based related paper discovery |
| [Thesify](https://www.thesify.ai/) | Thesis feedback | Structure, argumentation, evidence analysis |

## Links

- **KatmerCode:** [github.com/hkcanan/katmer-code](https://github.com/hkcanan/katmer-code)
- **Nature article:** [Three ways ChatGPT helps me in my academic writing](https://www.nature.com/articles/d41586-024-01042-3)
- **HN discussion:** [Show HN: KatmerCode](https://news.ycombinator.com/item?id=47479462)
- **XDA coverage:** [Claude Code inside Obsidian](https://www.xda-developers.com/claude-code-inside-obsidian-and-it-was-eye-opening/)
