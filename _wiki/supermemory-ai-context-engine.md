---
title: "Supermemory — The Memory API That Makes AI Actually Remember You"
date: 2026-04-05
category: Tools
tags: [memory, ai-agents, context, api, mcp, open-source, rag, personalization, claude-code]
related: ["Beads: Graph-Based Memory for AI Coding Agents", "Karpathy's LLM Knowledge Bases — Building a Personal Wiki with AI"]
icon: "🧠"
image: "/assets/images/supermemory-ai-context-engine.png"
---

Your AI forgets everything between conversations. Ask it something you told it last week — blank stare. **Supermemory** fixes this with a unified memory and context API: it extracts facts from conversations, tracks changes over time, auto-forgets expired info, and gives any AI app a persistent, personalized memory layer. Ranked **#1** on all three major memory benchmarks (LongMemEval, LoCoMo, ConvoMem).

*Source: [GitHub — supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) (21K+ stars) | [亚莱加德 on Douyin](https://v.douyin.com/) | [supermemory.ai](https://supermemory.ai)*

## Why Not Just RAG?

Traditional RAG retrieves the **same documents** for all users — it doesn't know who's asking. Supermemory is different:

```
Traditional RAG:
  User asks → Search docs → Same results for everyone → Answer

Supermemory:
  User asks → Search docs + recall user-specific facts → Personalized answer
                              │
                              ├── "User prefers Python over Java"
                              ├── "User's project uses PostgreSQL"
                              └── "User said yesterday: budget is $5K"
                                  (supersedes last month's "$10K")
```

Key difference: Supermemory **tracks facts per user over time**, handles contradictions (newer info supersedes older), and auto-forgets temporary context.

## Core Capabilities

| Feature | What It Does |
|---|---|
| **Fact extraction** | Automatically pulls facts from conversations — no manual tagging |
| **Temporal awareness** | Knows that "I moved to NYC" supersedes "I live in SF" from last month |
| **Auto-forgetting** | Expired info (e.g., "meeting at 3pm today") is purged automatically |
| **User profiles** | Auto-maintained context combining stable facts + recent activity (~50ms retrieval) |
| **Hybrid search** | RAG + memory queries combined — knowledge base docs + personalized context in one call |
| **Multi-modal** | PDFs, images (OCR), videos (transcription), code (AST-aware chunking) |
| **Data connectors** | Real-time sync with Google Drive, Gmail, Notion, OneDrive, GitHub |

## Quick Start

### As MCP Server (Claude Code / Cursor / VS Code)

```bash
npx -y install-mcp@latest https://mcp.supermemory.ai/mcp --client claude --oauth=yes
```

One command — Claude Code gains persistent memory across sessions.

### As SDK

```bash
npm install supermemory    # or: pip install supermemory
```

```javascript
import { SuperMemory } from 'supermemory';
const client = new SuperMemory();

// Store a memory
await client.add("User prefers dark mode and uses vim keybindings");

// Retrieve user profile + search
const result = await client.profile({ user_id: "user123", search: "editor preferences" });
```

### Framework Integrations

Drop-in wrappers for: Vercel AI SDK, LangChain, LangGraph, OpenAI Agents SDK, Mastra, Agno, n8n.

## Benchmark Results

| Benchmark | What It Tests | Supermemory Score | Rank |
|---|---|---|---|
| **LongMemEval** | Long-term memory with knowledge updates | 81.6% accuracy | #1 |
| **LoCoMo** | Fact recall across extended conversations | Top | #1 |
| **ConvoMem** | Personalization and preference learning | Top | #1 |

The team also open-sourced **MemoryBench** — a benchmarking framework for comparing memory providers head-to-head.

## How It Compares

| | Supermemory | Mem0 | Zep | Letta |
|---|---|---|---|---|
| **Approach** | Unified memory ontology | Graph-enhanced memory | Temporal knowledge graph | Self-editing memory (OS metaphor) |
| **Temporal handling** | Auto-supersede + auto-forget | Manual updates | Tracks fact changes over time | Archival store |
| **User profiles** | Auto-generated, ~50ms | Manual configuration | Built-in | Per-agent state |
| **MCP support** | Yes (one-command install) | Via community servers | No | No |
| **Multi-modal** | PDF, images, video, code | Text-focused | Text-focused | Text-focused |
| **GitHub stars** | 21K+ | 48K+ | 3K+ | 15K+ |
| **Best for** | Full-stack AI apps with personalization | Chatbots, personal assistants | Enterprise with compliance needs | Agent runtimes with autonomy |

## Architecture: One Ontology, Not Five Systems

Most memory solutions require you to configure separate systems: vector DB for search, graph DB for relationships, key-value store for facts, profile builder for users. Supermemory consolidates everything into a **single unified memory ontology**:

```
┌─────────────────────────────────────────┐
│         Supermemory Unified Layer        │
│                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Fact     │  │ Search   │  │Profile ││
│  │Extraction│  │ (hybrid) │  │Builder ││
│  └────┬─────┘  └────┬─────┘  └───┬────┘│
│       │              │            │      │
│       └──────────────┼────────────┘      │
│                      ▼                   │
│           ┌──────────────────┐           │
│           │  Unified Memory  │           │
│           │  Ontology        │           │
│           └──────────────────┘           │
│                      │                   │
│       ┌──────────────┼────────────┐      │
│       ▼              ▼            ▼      │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │Connectors│  │ Multi-   │  │ Auto-  ││
│  │(Drive,   │  │ modal    │  │ forget ││
│  │ Notion)  │  │(PDF,img) │  │        ││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────┘
```

No separate vector DB to configure. No graph DB to maintain. One system.

## Links

- **GitHub:** [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) (21K+ stars)
- **Docs:** [supermemory.ai/docs](https://supermemory.ai/docs)
- **Console:** [console.supermemory.ai](https://console.supermemory.ai)
- **MemoryBench:** Open-source benchmarking for memory providers
- **MCP install:** `npx -y install-mcp@latest https://mcp.supermemory.ai/mcp --client claude --oauth=yes`
