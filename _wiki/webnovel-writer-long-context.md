---
title: "WebNovel Writer — How AI Writes 2M+ Word Novels Without Forgetting"
date: 2026-04-08
category: Creative
tags: [creative-writing, claude-code, long-context, rag, entity-graph, chinese, open-source, novel, skill]
related: ["Karpathy's LLM Knowledge Bases — Building a Personal Wiki with AI", "Supermemory — The Memory API That Makes AI Actually Remember You", "Harness Engineering — The Real Bottleneck Isn't the Model", "Novel to Multimedia Pipeline — From Chapter Draft to Douyin in One Session"]
icon: "📖"
image: "/assets/images/webnovel-writer-long-context.png"
---

Writing a 2-million-word web novel with AI sounds impossible — Claude's context window tops out at a fraction of that, and across hundreds of chapters the AI inevitably forgets character details, contradicts earlier plot, or hallucinates facts. **WebNovel Writer** solves this with an architecture worth studying even if you never write fiction: RAG-enhanced context retrieval, entity graph tracking, and narrative momentum metrics. The same patterns apply to any long-context AI application.

*Source: [GitHub — lingfengQAQ/webnovel-writer](https://github.com/lingfengQAQ/webnovel-writer) | [@今天学点啥? on Douyin](https://v.douyin.com/)*

## Why This Matters Beyond Novels

If you care about long-context AI applications — research writing, legal document drafting, code bases that span months — this tool's architecture solves problems you'll face too:

| Problem | How Most Tools Fail | How WebNovel Writer Solves It |
|---|---|---|
| **Forgetting** (context window overflow) | Conversation history truncated, key facts lost | RAG retrieval of relevant past content per task |
| **Character drift** | Names, traits, relationships mutate across chapters | Entity graph with explicit character profiles |
| **Plot contradictions** | AI invents conflicting details | Structured metadata (outlines, plot threads) |
| **Narrative deadness** | AI-generated text feels flat | "Reading momentum" metrics (hooks, cool-points, narrative debt) |

## The Architecture

```
┌──────────────────────────────────────────────────────┐
│            WebNovel Writer Workflow                   │
│                                                       │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     │
│  │ PLAN      │────▶│ WRITE    │────▶│ REVIEW   │     │
│  │          │     │          │     │          │     │
│  │/webnovel-│     │/webnovel-│     │/webnovel-│     │
│  │ plan 1   │     │ write 1  │     │ review   │     │
│  │          │     │          │     │ 1-5      │     │
│  └────┬─────┘     └────┬─────┘     └────┬─────┘     │
│       │                │                │            │
│       ▼                ▼                ▼            │
│  ┌──────────────────────────────────────────┐        │
│  │       Persistent Story Layer              │        │
│  │                                            │        │
│  │  ┌────────────┐  ┌──────────┐  ┌────────┐│        │
│  │  │ Entity     │  │ Chapter   │  │ Plot   ││        │
│  │  │ Graph      │  │ Summaries │  │ Threads││        │
│  │  │(characters,│  │(searchable│  │(active │        │
│  │  │ settings,  │  │ via RAG)  │  │ arcs)  ││        │
│  │  │ relations) │  │           │  │        ││        │
│  │  └────────────┘  └──────────┘  └────────┘│        │
│  │                                            │        │
│  │  ┌────────────────────────────────────┐   │        │
│  │  │ Embeddings + Reranking (Qwen+Jina) │   │        │
│  │  └────────────────────────────────────┘   │        │
│  └──────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────┘
```

### Three-Stage Workflow

1. **Plan** — Outline structure, define characters, set plot threads
2. **Write** — For each chapter, retrieve relevant context via RAG, generate with entity graph constraints
3. **Review** — Check consistency, track momentum metrics, flag contradictions

### Key Technical Insights

**RAG-over-chapters instead of giant context**
Don't try to stuff the whole novel into the prompt. For each new chapter, semantic search retrieves:
- Previous chapters relevant to the current scene
- Character profiles for people appearing in this chapter
- Active plot threads that need progression
- Any "narrative debt" that should be paid off

**Entity graph as source of truth**
Characters have structured profiles: name, physical description, backstory, relationships, current state. Claude writes against this graph, not against fuzzy recollection. When the graph says "Alice is afraid of water," Alice stays afraid of water in chapter 200.

**Reading momentum as a metric**
The review agent tracks narrative momentum:
- **Hooks**: cliffhangers, unresolved tension
- **Cool-points**: memorable scenes, character moments
- **Narrative debt**: promises made that haven't been delivered

This is essentially a **quality metric** for fiction — something that usually requires human editors.

## Installation

```bash
# Via Claude Code marketplace
/plugin marketplace add lingfengQAQ/webnovel-writer
/plugin install webnovel-writer

# Install Python dependencies
pip install -r requirements.txt

# Initialize project
/webnovel-init "My Novel Name"

# Configure embeddings (example: Qwen + Jina)
# Edit config.yaml with your API keys

# Start writing
/webnovel-plan 1        # Plan chapter 1
/webnovel-write 1       # Write it
/webnovel-review 1-5    # Review chapters 1-5
```

Optional: `/webnovel-dashboard` launches a read-only visual dashboard showing project state, entity relationships, and chapter progression.

## Model Flexibility

Different agents can use different Claude models based on task complexity:

| Task | Recommended Model |
|---|---|
| Quick drafts | Haiku (fast, cheap) |
| Main writing | Sonnet (balanced) |
| Complex plot resolution | Opus (deep reasoning) |
| Consistency review | Sonnet |

This is a harness pattern — **match intelligence to stage** — same principle as the planning/execution/verification phases in coding agents.

## What This Teaches About Long-Context AI

Even if you never write fiction, the patterns here apply to any long-running AI project:

1. **Don't fight the context window — bypass it with RAG** — Retrieve only what's relevant, not everything
2. **Structured metadata beats unstructured memory** — Entity graphs, plot threads, and typed profiles are more reliable than "remember what we talked about"
3. **Separate concerns across phases** — Plan/write/review instead of one giant prompt
4. **Define quality metrics, not just correctness** — "Is this chapter engaging?" is the fiction equivalent of "is this code maintainable?" — measure it explicitly
5. **Match model to task** — Opus for the hard parts, Haiku for the easy parts

These are the same principles behind [harness engineering](/learnAIDoc/wiki/claude%20code/harness-engineering-agents/) and [Karpathy's LLM Knowledge Bases](/learnAIDoc/wiki/ai%20research/karpathy-llm-knowledge-bases/). The web novel is just a concrete application of the general pattern.

## Case Study: 《探花书房》 — Full Novel in One Session

I used the webnovel-writer skill to build a complete **48,000-word literary novella** from concept to polished PDF ebook, mostly overnight.

### Setup

The seed was two WeChat screenshots — a Doubao AI prediction about a friend's future girlfriend: she'd be named Lin Wan, from Suzhou, they'd meet at a bookshop called 探花书房 on Nanshizi Street in late autumn 2026 over a Pingjiang Road postcard.

The challenge: the skill is designed for web novel tropes (systems, power levels, face-slapping). I needed to adapt it for **literary fiction** with no golden finger, no antagonist, no power system — just two quiet people slowly falling for each other in Suzhou.

### What Actually Happened

| Step | What | How |
|---|---|---|
| **Init** | `/webnovel-init` deep mode | Collected story seed, adapted all web-novel fields for literary fiction (金手指=无, 反派=无). Custom creative constraints: zero conflict, dialogue restraint, Suzhou real-location details per chapter |
| **Chapter 1** | Full `/webnovel-write` pipeline | Context Agent → Draft → 3 parallel review agents (consistency/continuity/OOC, score: 92/100) → Anti-AI polish → Data Agent → Git commit |
| **Chapters 2-12** | `RemoteTrigger` scheduled agents | Two triggers: 12:20 AM (write all remaining) and 5:20 AM (check + continue). Went to sleep, woke up to 12 finished chapters |
| **Review** | Two fast-reader agents in parallel | Ch1-6 and Ch7-12 reviewed simultaneously. Both rated **A overall**. Found 3 micro-issues |
| **Polish** | Targeted edits | Ch8 ending de-lectured, Ch9 over-reflection trimmed, Ch10 expanded |
| **Ebook** | Cover + PDF | `baoyu-cover-image` generated watercolor cover → `mdpdf` converted styled markdown → `pypdf` merged cover page. 156-page PDF with title page, epigraph, TOC, volume dividers, colophon |

### Architecture Lessons

- **Literary fiction stretches the framework**: "爽点规划" and "反派分层" are wasted on literary fiction, but the core pipeline (context → draft → review → polish → data) works for any genre
- **OOC checker caught real issues**: Flagged Lin Wan being too proactive in Ch1 and Qing's emotional progression exceeding the "noticed, not attracted" boundary — both valid
- **Overnight writing via RemoteTrigger**: The pipeline is autonomous enough for 11 unattended chapters
- **Anti-AI check is critical for literary prose**: Template-ness that's acceptable in web novels is fatal in literary fiction

### Final Numbers

| Metric | Value |
|---|---|
| Words | 48,145 |
| Chapters | 12 |
| Quality | A (both reviewers) |
| Ch1 review score | 92/100 |
| Git commits | 16 |
| PDF pages | 156 |
| Time (Ch1, manual) | ~45 min |
| Time (Ch2-12, overnight) | autonomous |

**Project:** [weihaoqu/tanhua-bookshop](https://github.com/weihaoqu/tanhua-bookshop)

## Links

- **GitHub:** [lingfengQAQ/webnovel-writer](https://github.com/lingfengQAQ/webnovel-writer)
- **Case Study:** [weihaoqu/tanhua-bookshop](https://github.com/weihaoqu/tanhua-bookshop)
- **Version:** v5.5.4
