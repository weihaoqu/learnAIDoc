---
title: "WebNovel Writer — How AI Writes 2M+ Word Novels Without Forgetting"
date: 2026-04-08
category: Creative
tags: [creative-writing, claude-code, long-context, rag, entity-graph, chinese, open-source, novel, skill]
related: ["Karpathy's LLM Knowledge Bases — Building a Personal Wiki with AI", "Supermemory — The Memory API That Makes AI Actually Remember You", "Harness Engineering — The Real Bottleneck Isn't the Model"]
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

## Links

- **GitHub:** [lingfengQAQ/webnovel-writer](https://github.com/lingfengQAQ/webnovel-writer)
- **Version:** v5.5.4
