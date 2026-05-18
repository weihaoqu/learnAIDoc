---
title: "codegraph — Pre-Indexed Knowledge Graph That Cuts Claude Code's Tool Calls 92%"
date: 2026-05-17
category: Skills & Plugins
tags: [claude-code, mcp, knowledge-graph, tree-sitter, sqlite, codegraph, tool-call-reduction, framework-routing, performance, open-source]
related: ["Code Review Graph — Turn Your Codebase Into a Knowledge Graph, Cut Tokens 8x", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Claude Code: Isolate Heavy Tasks with context: fork", "Harness Engineering — The Real Bottleneck Isn't the Model", "GBrain — Garry Tan's Persistent Agent Memory System", "What is Agentic Engineering? A Teaching Primer"]
icon: "🕸️"
image: "/assets/images/codegraph-pre-indexed-claude-code.png"
---

**codegraph** by [colbymchenry](https://github.com/colbymchenry/codegraph) (~3.3k stars, MIT) is an MCP-server-style pre-indexed code knowledge graph that sits between Claude Code's *Explore* agent and your codebase. Instead of letting Claude spend most of a task's time running `grep`, `glob`, and `Read` to discover code structure, codegraph pre-parses everything with **tree-sitter** into a local **SQLite** graph (nodes = symbols, edges = calls / imports / inheritance / framework URL routes), then exposes a small set of MCP query tools that return relationships instantly. The README's top tagline advertises **94% fewer tool calls and 77% faster exploration**; the benchmark table averaged across 6 real codebases reports **92% fewer tool calls and 71% faster** — both directionally consistent.

*Source: [github.com/colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) (MIT, ~3.3k stars at time of writing) | Surfaced via Weibo (爱可可-爱生活), May 2026 — link not preserved*

## The problem it actually solves

Run any non-trivial Claude Code task on a 1k-file project and watch the trace. A large fraction of the agent's runtime — often more than half — is just **discovery**: `grep` for a symbol, `glob` for matching files, `Read` to scan one. Each tool call burns tokens, time, and the context budget. Worse, when an agent gives up on discovery because the context is filling, it may proceed with an incomplete picture and produce a confidently wrong answer.

codegraph's bet: that discovery work is repetitive and *fundamentally cacheable*. Parse the code once, store the structural facts in a tiny local SQLite DB, expose them via MCP, and the agent stops thrashing.

## Architecture in one diagram

```
                ┌──────────────────────┐
                │ Your source code     │
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │ tree-sitter parsers  │  (19 languages —
                │  → ASTs              │   with custom extraction
                │                      │   for Svelte / Vue / Liquid)
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │ Node + edge extract  │
                │  • functions/classes │
                │  • call / import     │
                │  • inherits          │
                │  • framework routes  │
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │ .codegraph/          │
                │  codegraph.db        │
                │  (SQLite + FTS5)     │
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │ MCP server           │
                │  9 query tools (see  │
                │  table below)        │
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │ Claude Code agent    │
                │ (uses graph instead  │
                │  of grep/glob/Read)  │
                └──────────────────────┘

  File watcher (FSEvents / inotify / ReadDirectoryChangesW)
        ↑ auto-debounced re-index on save, started by the
          MCP/watch server after `codegraph init`
```

## The 9 MCP tools codegraph exposes

Per the source (`src/mcp/tools.ts`), codegraph exposes nine query tools — not one. Most users won't invoke them by name; the agent picks whichever fits the question. They split into two tiers:

| Tier | Tool | What it returns |
|---|---|---|
| **Heavy** | `explore` | A deep multi-hop exploration around a symbol or path. The "spend the budget here" call. |
| **Light** | `search` | Full-text + symbol search via SQLite FTS5 |
| **Light** | `context` | Surrounding symbols + call-site context for a target |
| **Light** | `callers` | Who calls this symbol |
| **Light** | `callees` | What this symbol calls |
| **Light** | `impact` | Forward and backward blast radius for a symbol or file |
| **Light** | `node` | Detailed metadata for a specific graph node |
| **Light** | `status` | Index status / freshness |
| **Light** | `files` | List indexed files (with filters) |

The agent's typical pattern is: one or two `search` / `node` / `callers` calls to triangulate, then one `explore` if it needs depth. The 92%/71% numbers come from this composition replacing tens of `grep` + `Read` cycles.

## What's distinctive about codegraph

| Feature | Why it matters |
|---|---|
| **Tiered MCP tool design** | One heavy `explore` tool plus eight lightweight query tools. The agent answers most factual questions with light tools (cheap, fast); only escalates to `explore` for genuine deep dives |
| **Framework-aware URL routing** | Recognizes web frameworks (per `src/resolution/frameworks/`) — Django, FastAPI, Flask, Express, Laravel, Rails, Spring, Gin (incl. chi / gorilla / mux), Axum, actix, Rocket, ASP.NET, Vapor, React (+ React Router), Svelte (+ SvelteKit), SwiftUI/UIKit, and more. URL patterns link to their handler functions/classes. Huge win for "what handles `/api/users/:id`?" queries |
| **File watcher auto-sync** | Native OS events (FSEvents / inotify / ReadDirectoryChangesW). After `codegraph init` does the initial index, the MCP/watch server keeps the graph fresh on subsequent edits with debouncing to avoid thrash |
| **100% local, no API key** | All processing on your machine, SQLite DB only. Nothing leaves your environment |
| **`npx` one-liner install** | Installer auto-wires the MCP server in `~/.claude.json` and adds **auto-allow permissions for the light query tools** (`search`, `context`, `callers`, `callees`, `impact`, `node`, `status`) so the agent doesn't ask permission for every read. The heavier `explore` is **not** auto-allowed by default |

## Performance — what the README claims (6 real codebases)

| Codebase | Tool calls (with → without) | Time (with → without) |
|---|---|---|
| VS Code (TypeScript) | 3 → 52 (**94% fewer**) | 17s → 1m 37s (**82% faster**) |
| Excalidraw | (numbers in README table) | — |
| Claude Code | (numbers in README table) | — |
| Alamofire (Swift) | (numbers in README table) | — |
| Swift Compiler (largest test: 25.8k files, 272.9k nodes) | **84% fewer** | **73% faster**; initial index in <4 min |
| **Average across the table** | **92% fewer tool calls** | **71% faster** |
| **README top tagline** | **94% fewer tool calls** | **77% faster exploration** |

The two numbers don't conflict — the 94%/77% is the README's marketing line; the 92%/71% is the cross-codebase average from the benchmark table. The README's own observation: agents using codegraph "never fell back to raw file reads" for code structure questions on the test set.

**Benchmark methodology caveat (Codex flagged this on review):** the benchmark is 6 codebases, ad-hoc tasks, no statistical reporting. The numbers are directionally trustworthy but should not be quoted as a formal benchmark. Measure on your own codebase before adopting team-wide.

## Install in one command

```bash
npx @colbymchenry/codegraph
```

The interactive installer:
1. Detects your Claude Code config (`~/.claude.json`)
2. Adds the codegraph MCP server entry
3. Auto-allows permissions for the light query tools (per `src/installer/config-writer.ts`): `search`, `context`, `callers`, `callees`, `impact`, `node`, `status`
4. Offers a global install: `npm install -g @colbymchenry/codegraph`

Per-project bootstrap:

```bash
cd your-project
codegraph init -i
```

`codegraph init` builds the initial index synchronously. The file watcher / auto-sync kicks in when the MCP/watch server starts (i.e., once Claude Code opens an MCP session against it). Large projects (~25k files) finish the initial indexing in <4 min on a modern laptop.

## How it differs from the sibling tool

If you've seen [Code Review Graph](/learnAIDoc/wiki/code-review-graph-knowledge-graph/) by tirth8205 (~16.7k stars), you've seen a *cousin* — same underlying idea, different design choices and a substantially broader tool surface:

| Dimension | codegraph (this entry) | code-review-graph (sibling) |
|---|---|---|
| **Primary headline** | 92-94% fewer tool calls, 71-77% faster (per README) | 8.2x token reduction, up to 49x on monorepos |
| **Optimization target** | Eliminate discovery thrash during *any* Claude Code task | Originally framed around code review; now also advertises daily coding, architecture/debug/onboarding prompts, wiki generation, refactoring, and multi-repo search |
| **MCP surface** | 9 tools (1 heavy `explore` + 8 light queries) | 28 tools (search, refactor, dead code, wiki gen, communities…) |
| **Framework awareness** | URL → handler routing built in across many web frameworks | Framework-aware features and resolvers; richer overall toolkit |
| **Update strategy** | OS file-watcher + debounce | Incremental SHA-256 hash diff |
| **Install** | `npx @colbymchenry/codegraph` | `pip install code-review-graph` |
| **License** | MIT | MIT |
| **Stars (at time of writing)** | ~3.3k | ~16.7k |

**Which to pick?** code-review-graph is broader (28 tools, more output modes including auto-wiki generation and community detection); codegraph is narrower (9 tools, framework routing, file watcher). For projects where you mostly want Claude to stop spelunking, codegraph's smaller footprint is appealing. For monorepo refactoring + auto-doc workflows, code-review-graph's richer toolkit wins. They can coexist as MCP servers if you want both.

## Limitations and honest caveats

- **WASM SQLite fallback is meaningfully slower** (README-stated). If `better-sqlite3` (the native module) fails to install on your platform, codegraph falls back to SQLite-WASM, which is **5-10× slower** and can cause `database is locked` errors when the MCP server queries concurrently with indexing. The README has platform-specific C compiler install steps to avoid this.
- **Files >1MB are skipped by default** (README-stated; configurable). Large generated files / minified bundles won't be in the graph.
- **Initial indexing time scales with the codebase** (README-stated). Most projects finish in seconds; the Swift Compiler test (25k+ files) took <4 min. WASM backend is meaningfully slower.
- **Static models don't capture dynamic dispatch / reflection / `eval()` / string-built imports.** (My inference, not directly stated in the README.) The agent will sometimes still need to fall back to `Read` for these patterns.

## How LearnAI Team Could Use This

- **Default-install candidate for LearnAI's Claude Code setup** — pilot it on one team project first, measure your own tool-call/time numbers, then roll out if the win holds on your codebases. The privacy story is solid ("nothing leaves the machine").
- **Pair with CS-310 (Advanced OO Programming & Design)** — codegraph's graph view is a pedagogically useful way to show students *what an LLM is actually looking for* when it reads code. The URL → handler routing is a tangible "framework awareness" lesson.
- **CS-336 (Program Analysis for Security)** — codegraph is a working tree-sitter + AST + graph pipeline. Students can extend it (e.g., add a taint-flow edge type, or an information-flow analysis) as a 2-3 week project; the codebase is the right size for that scope.
- **Research workflow** — when you're skimming an unfamiliar repo for paper-reproduction work, codegraph lets Claude answer "where does this paper's algorithm actually live in the code?" much faster than `grep`-driven discovery. Run a quick before/after measurement on your own repo to confirm the numbers translate.

## Real-World Use Cases

| Scenario | How to use |
|---|---|
| **"Where is X used?" questions** in a large repo | Use `callers` on the symbol; get the list directly |
| **"What does X depend on?"** | Use `callees` for the outgoing call graph |
| **Refactor impact preview** | Use `impact` for the forward/backward blast radius before renaming or removing |
| **API endpoint debugging** | Ask Claude "what code handles `POST /users/:id/auth`?" — codegraph's framework-aware routing finds the handler |
| **Onboarding a new contributor** | Run codegraph; ask Claude "summarize the architecture" with the graph available; result is structurally informed instead of file-list-shallow |

## Important things to know

- **codegraph is one MCP server in a growing space.** Knowledge-graph approaches to agent codebase exploration are a clear pattern now ([Code Review Graph](/learnAIDoc/wiki/code-review-graph-knowledge-graph/) is the most-starred sibling). Treat codegraph as one good implementation — easy to swap if a better one appears for your stack.
- **The benchmark methodology is non-rigorous** (Codex flagged on review). Six codebases, ad-hoc tasks, no statistical reporting. Headline numbers are directionally trustworthy but not a formal benchmark — measure your own before adopting team-wide.
- **The framework registry is updated frequently** in source. Check `src/resolution/frameworks/` for the live list; the framework names in this entry are a snapshot, not exhaustive.
- **No data leaves your machine.** Genuinely a local tool. No API keys, no telemetry mentioned in the README.
- **The "auto-allow on install" applies only to the light query tools.** The heavier `explore` tool still prompts for permission by default, which is correct — you want to know when the agent is about to spend the deeper-exploration budget.
- **Companion deep-dives** in this wiki:
  - [Code Review Graph — 8.2x Token Reduction](/learnAIDoc/wiki/code-review-graph-knowledge-graph/) — sibling tool, broader scope
  - [Claude Code Context Management & CLAUDE.md](/learnAIDoc/wiki/claude-code-context-claudemd-practices/) — the complementary "what lives in conversation context"
  - [Claude Code · context: fork](/learnAIDoc/wiki/claude-code-context-fork/) — isolation pattern for heavy explorations
  - [Harness Engineering — The Real Bottleneck Isn't the Model](/learnAIDoc/wiki/harness-engineering-agents/) — why this kind of tooling is high-leverage
  - [GBrain — Garry Tan's Persistent Agent Memory System](/learnAIDoc/wiki/gbrain-agent-memory/) — the broader pattern of graph-shaped memory for agents
