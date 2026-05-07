---
title: "alphaXiv MCP — Semantic ArXiv Search Directly in Claude Code"
date: 2026-03-22
category: Skills & Plugins
redirect_from:
  - "/wiki/skills & plugins/alphaxiv-mcp-arxiv-search/"
tags: [mcp, arxiv, research, academic, claude-code, embedding-search, literature-review, paper-search]
related: ["Claude-Prism — Local-First Academic Writing Workspace with AI", "Autoresearch: 100 Autonomous ML Experiments Overnight", "Claude Code Tips & Context Engineering — From 45 Tips to Six-Layer Architecture", "Five Questions for Critical Paper Reading — The Cambridge Method with Claude", "Paper2Code: Turn ArXiv Papers into Citation-Anchored Code"]
icon: "📄"
image: "/assets/images/alphaxiv-mcp-arxiv-search.png"
---

[alphaXiv MCP](https://www.alphaxiv.org/docs/mcp) connects Claude Code directly to arXiv's millions of papers via the Model Context Protocol. The killer feature: **embedding similarity search** — it finds papers that are conceptually related to your query, not just keyword matches. Papers using different terminology but addressing the same problem. Papers you'd never find by searching for exact terms. This is the missing piece in AI-assisted literature reviews.

*Source: [alphaXiv MCP Docs](https://www.alphaxiv.org/docs/mcp) | [alphaXiv Launch Tweet](https://x.com/askalphaxiv/status/2034003206217601375) | [AlphaSignal: Upgrade Your Paper Research](https://alphasignalai.substack.com/p/upgrade-your-alphaxiv-paper-research) | [DeepakNess: arXiv Now Has an MCP Server](https://deepakness.com/raw/arxiv-mcp/)*

## Install — One Command

```bash
claude mcp add --transport http alphaxiv https://api.alphaxiv.org/mcp/v1
```

That's it. Claude Code now has access to arXiv. No API key needed for basic use.

**Known issue:** You may need to reactivate the MCP each time you restart Claude Code.

## Six Tools Available

| Tool | What It Does | Best For |
|---|---|---|
| [`embedding_similarity_search`](https://www.alphaxiv.org/docs/mcp) | Semantic/conceptual paper discovery via embeddings | Finding related work you'd miss with keywords |
| [`full_text_papers_search`](https://www.alphaxiv.org/docs/mcp) | Keyword search across arXiv | Method names, benchmarks, author searches |
| [`agentic_paper_retrieval`](https://www.alphaxiv.org/docs/mcp) | Multi-turn autonomous retrieval (beta) | Complex research questions requiring multiple papers |
| [`get_paper_content`](https://www.alphaxiv.org/docs/mcp) | Get paper text as structured report or raw | Reading and summarizing specific papers |
| [`answer_pdf_queries`](https://www.alphaxiv.org/docs/mcp) | Ask questions about a specific paper | Quick fact extraction from papers |
| [`read_files_from_github_repository`](https://www.alphaxiv.org/docs/mcp) | Access paper codebases on GitHub | Understanding implementations |

## Why Embedding Search Changes Research

```
KEYWORD SEARCH:   "type system" "gradual typing" "security"
                  → finds papers using EXACTLY those terms

EMBEDDING SEARCH: "type systems that improve software security"
                  → finds papers about:
                    - information flow control (different terminology, same concept)
                    - dependent types for memory safety
                    - refinement types for cryptographic protocols
                    - capability-based security (related approach)
                  → papers you'd NEVER find by keyword
```

The embedding search takes 2-3 sentence descriptions covering concepts, methods, applications, and related terminology. Returns up to 25 papers ranked by relevance + popularity.

## Research Workflows

### Literature Review (Parallel Search)

Run all three search tools simultaneously for maximum coverage:

```
1. embedding_similarity_search → conceptual matches
2. full_text_papers_search → exact term matches
3. agentic_paper_retrieval → autonomous deep search
     ↓
   Combine results, deduplicate
     ↓
   get_paper_content → read top papers
     ↓
   answer_pdf_queries → extract specific claims/methods
```

### Reading Dependency Graph

Someone in the community already built this: give a paper, have Claude use alphaXiv to find its key references, then find *their* references, building a dependency graph of what to read in what order. Perfect for learning a new subfield.

### Paper → Code Analysis

```
get_paper_content → extract GitHub URL from paper
     ↓
read_files_from_github_repository → explore repo structure
     ↓
Claude analyzes implementation details
```

## Alternatives & Comparison

| Tool | Scope | Search Type | Setup |
|---|---|---|---|
| [alphaXiv MCP](https://www.alphaxiv.org/docs/mcp) | arXiv | Embedding + keyword + agentic | `claude mcp add` (one command) |
| [arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | arXiv | Keyword | Self-hosted |
| [Semantic Scholar MCP](https://github.com/akapet00/semantic-scholar-mcp) | Semantic Scholar | Semantic | Self-hosted, no API key needed |
| [Academix MCP](https://github.com/xingyulu23/Academix) | OpenAlex + DBLP + S2 + arXiv + CrossRef | Multi-source | Self-hosted |
| [Zotero MCP](https://github.com/54yyyu/zotero-mcp) | Your Zotero library | Local collection | Self-hosted |

alphaXiv MCP is the easiest to set up (one command, no self-hosting) and the only one with embedding search built in.

## How LearnAI Team Could Use This

- **Build faster literature reviews** — combine semantic, keyword, and agentic search when preparing AI education or coding-agent research briefs.
- **Track AI education research** — monitor papers on AI-assisted learning, assessment, tutoring, and classroom coding agents.
- **Support student research projects** — help learners find related work even when they do not know the exact academic terminology.

## Real-World Use Cases

| Scenario | Description |
|---|---|
| **Literature reviews** | Find conceptually related papers beyond exact keyword matches. |
| **Reading lists** | Generate dependency graphs that show what to read first in a new subfield. |
| **Paper-to-code review** | Pull paper text and linked repositories into Claude Code for implementation analysis. |

## For LearnAI Research Areas

| Research Area | How alphaXiv MCP Helps |
|---|---|
| **Type systems** | Embedding search: "type systems that enforce safety properties" finds papers across PL, security, and verification |
| **Program analysis** | Search for conceptually similar analysis techniques even when different terminology is used |
| **Formal verification** | `agentic_paper_retrieval`: "recent advances in automated verification of concurrent programs" |
| **Security education** | Literature review on "teaching security concepts through programming language design" |
| **AI education (LAI)** | Track new papers on AI-assisted learning, coding agents in education, assessment methods |

## For Students

- **Literature review assignments** — students search for papers semantically, not just by keyword
- **Research methodology** — teaches the difference between keyword and embedding search
- **Reading dependency graphs** — Claude builds a "what to read first" map for any topic
- **Paper comprehension** — `answer_pdf_queries` lets students ask questions about papers they're reading

## Further Reading

- [alphaXiv MCP Documentation](https://www.alphaxiv.org/docs/mcp)
- [alphaXiv Explorer](https://www.alphaxiv.org/)
- [AlphaSignal: Claude Skill for alphaXiv](https://alphasignalai.substack.com/p/upgrade-your-alphaxiv-paper-research)
- [Academix MCP (multi-source alternative)](https://github.com/xingyulu23/Academix)
- [Semantic Scholar MCP](https://github.com/akapet00/semantic-scholar-mcp)
- [Zotero MCP](https://github.com/54yyyu/zotero-mcp)
