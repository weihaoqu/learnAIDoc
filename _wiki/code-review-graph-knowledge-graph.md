---
title: "Code Review Graph — Turn Your Codebase Into a Knowledge Graph, Cut Tokens 8x"
date: 2026-04-13
category: Skills & Plugins
redirect_from:
  - "/wiki/tools/code-review-graph-knowledge-graph/"
tags: [claude-code, code-review, knowledge-graph, tree-sitter, mcp, token-optimization, blast-radius, open-source]
related: ["Claude Code from Source — The Architecture Book That Treats Claude Code Like an OS", "codegraph — Pre-Indexed Knowledge Graph That Cuts Claude Code's Tool Calls 92%"]
icon: "🕸️"
image: "/assets/images/code-review-graph-knowledge-graph.png"
---

Every time you ask Claude Code to review changes, it re-reads your entire codebase — burning tokens, hitting context limits, and sometimes hallucinating about files it barely scanned. **Code Review Graph** solves this by parsing your codebase into a persistent knowledge graph with Tree-sitter, then exposing it via MCP. When files change, it traces the blast radius — callers, dependents, tests — and feeds only the relevant files to your AI. Average token reduction: **8.2x**. On monorepos: up to **49x**.

*Source: [GitHub — tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) (15.6k stars) | [code-review-graph.com](https://code-review-graph.com)*

## How It Works

```
Source Code → Tree-sitter AST → Nodes + Edges → SQLite Graph
                                                      ↓
File changes → Blast Radius Query → Only relevant files
                                                      ↓
                                        MCP Server → Claude Code
                                        (22 tools, 5 prompt templates)
```

Three core mechanisms:
1. **Blast-radius analysis** — traces every caller, dependent, and test affected by a change. 100% recall (never misses), deliberately over-predicts for safety.
2. **Incremental updates <2s** — SHA-256 hash checks, re-parses only changed files. 2,900-file project reindexes in under 2 seconds.
3. **Monorepo optimization** — Next.js: 27,700 files → ~15 actually read (49x reduction).

## Token Savings

| Repository | Files | Naive Tokens | Graph Tokens | Reduction |
|------------|-------|-------------|-------------|-----------|
| fastapi | 1,122 | 4,944 | 614 | **8.1x** |
| flask | 83 | 44,751 | 4,252 | **9.1x** |
| gin | 99 | 21,972 | 1,153 | **16.4x** |
| httpx | 60 | 12,044 | 1,728 | **6.9x** |
| nextjs | 27,700+ | — | — | **up to 49x** |
| **Average** | | | | **8.2x** |

**Caveat:** Small single-file edits in small packages (Express) can show 0.7x — graph overhead exceeds raw file size.

## 23 Supported Languages

Python, TypeScript/TSX, JavaScript, Vue, Svelte, Go, Rust, Java, Scala, C#, Ruby, Kotlin, PHP, C/C++, Swift, Dart, Solidity, Lua, R, Perl, Zig, PowerShell, Julia + Jupyter/Databricks notebooks.

## 28 MCP Tools

| Category | Tools |
|----------|-------|
| **Graph ops** | Build, update, impact radius, review context, query |
| **Search** | Semantic search, embeddings, cross-repo search |
| **Architecture** | Flows, communities (Leiden), architecture overview |
| **Refactoring** | Large functions, rename preview, dead code, apply refactor |
| **Documentation** | Wiki generation, wiki page retrieval |

## Installation

```bash
pip install code-review-graph
code-review-graph install    # Auto-detects Claude Code/Cursor/etc
code-review-graph build      # Parse codebase into graph
```

Works with: Claude Code, Cursor, Windsurf, Zed, Continue, OpenCode, Codex, Antigravity.

## How LearnAI Team Could Use This

- **Large project code reviews** — For research codebases with 500+ files, install code-review-graph to make Claude Code reviews actually useful instead of surface-level token-limited scans.
- **Teaching code architecture** — The graph visualization (D3.js force-directed) shows students how files are connected. Great for software architecture courses.
- **Student project analysis** — Run blast-radius analysis on student PRs to teach them about change impact and dependency awareness.
- **Research on program analysis** — The Tree-sitter AST → knowledge graph pipeline is directly relevant to Q's research in program analysis and type systems. Compare with traditional call graph tools.
- **Token cost management** — If the team runs Claude Code on a budget, 8x token reduction means 8x more reviews for the same cost.

## Real-World Use Cases

1. **Enterprise code review** — Teams with large monorepos get AI reviews that actually understand cross-file dependencies instead of reviewing files in isolation.
2. **CI/CD integration** — Run blast-radius analysis on every PR to auto-scope the review to affected code.
3. **Onboarding** — The `onboard_developer` prompt template generates a codebase walkthrough from the graph structure.
4. **Refactoring safety** — Before renaming a function, see every caller and test that would be affected.
5. **Architecture documentation** — Auto-generate wiki from code communities (Leiden algorithm clustering).
