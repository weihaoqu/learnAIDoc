---
title: "codegraph — Local Code Knowledge Graph for AI Coding Agents"
date: 2026-05-17
category: Skills & Plugins
tags: [claude-code, mcp, knowledge-graph, tree-sitter, sqlite, codegraph, tool-call-reduction, framework-routing, performance, open-source]
related: ["Code Review Graph — Turn Your Codebase Into a Knowledge Graph, Cut Tokens 8x", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Claude Code: Isolate Heavy Tasks with context: fork", "Harness Engineering — The Real Bottleneck Isn't the Model", "GBrain — Garry Tan's Persistent Agent Memory System", "What is Agentic Engineering? A Teaching Primer"]
icon: "🕸️"
image: "/assets/images/codegraph-pre-indexed-claude-code.png"
---

**codegraph** by [colbymchenry](https://github.com/colbymchenry/codegraph) is a local pre-indexed code knowledge graph for AI coding agents. The upstream README lists support for Claude Code, Codex, Gemini, Cursor, OpenCode, AntiGravity, Kiro, and Hermes Agent; check the README for the current list before installing. Instead of letting an agent spend most of a task's time running `grep`, `glob`, and `Read` to discover code structure, codegraph pre-parses source with **tree-sitter** into a local **SQLite** graph (nodes = symbols, edges = calls / imports / inheritance / framework URL routes), then exposes MCP query tools that return relationships instantly. The current README's 2026-07 revalidation reports **89% fewer tool calls, 60% lower cost, and 69% fewer tokens** on average across seven benchmark repos — useful directional vendor claims, not an independent formal benchmark.

*Source: [github.com/colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) (MIT). Benchmark and agent-support claims in this entry are upstream README claims unless explicitly labeled as Q's local test. Discovery note: Weibo post by 爱可可-爱生活, May 2026 — link not preserved.*

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
                │ tree-sitter parsers  │  (multi-language —
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
                │ AI coding agent      │
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

The agent's typical pattern is: one or two `search` / `node` / `callers` calls to triangulate, then one `explore` if it needs depth. The current benchmark numbers come from this composition replacing many `grep` + `Read` cycles.

## What's distinctive about codegraph

| Feature | Why it matters |
|---|---|
| **Tiered MCP tool design** | One heavy `explore` tool plus eight lightweight query tools. The agent answers most factual questions with light tools (cheap, fast); only escalates to `explore` for genuine deep dives |
| **Framework-aware URL routing** | Recognizes web frameworks (per `src/resolution/frameworks/`) — Django, FastAPI, Flask, Express, Laravel, Rails, Spring, Gin (incl. chi / gorilla / mux), Axum, actix, Rocket, ASP.NET, Vapor, React (+ React Router), Svelte (+ SvelteKit), SwiftUI/UIKit, and more. URL patterns link to their handler functions/classes. Huge win for "what handles `/api/users/:id`?" queries |
| **File watcher auto-sync** | Native OS events (FSEvents / inotify / ReadDirectoryChangesW). After `codegraph init` does the initial index, the MCP/watch server keeps the graph fresh on subsequent edits with debouncing to avoid thrash |
| **Local index, no CodeGraph API key** | Parsing and graph storage happen locally in SQLite. Normal agent use can still send returned code snippets to Claude, Codex, or whichever model provider your agent calls |
| **Multi-agent install support** | Installer supports multiple agent configs. Inspect the generated config before writing it, especially because install can add MCP entries and steering text that tells agents to prefer graph queries over raw file reads |

## Performance — what the README claims

The current README reports a 2026-07 revalidation across seven open-source repos, using headless Claude Code with and without CodeGraph. The headline average is **89% fewer tool calls, 60% lower cost, and 69% fewer tokens**. Wall-clock time was noisier: the README reports an average speedup, but small repos sometimes finished faster with raw grep while spending far more tokens and money.

| Codebase | What the README highlights |
|---|---|
| VS Code | Large TypeScript codebase; CodeGraph reduces discovery-heavy file reading |
| Excalidraw | Small-repo floor effect: raw grep can be faster wall-clock, but CodeGraph uses fewer tokens/cost |
| Django | Python ORM architecture query |
| Tokio | Rust async-runtime architecture query |
| OkHttp | Java interceptor-chain query |
| Gin | Small Go routing/middleware query |
| Alamofire | Swift request-building query |

**Benchmark methodology caveat:** the benchmark is still vendor-run, task-specific, and not a peer-reviewed evaluation. The methodology is better documented than the original May snapshot, but the right adoption move is unchanged: measure on your own codebase before rolling it out team-wide.

## Install

```bash
npm i -g @colbymchenry/codegraph
codegraph install --print-config claude
codegraph install --print-config codex
codegraph install
```

The interactive installer:
1. Detects supported agent configs
2. Adds the codegraph MCP server entry
3. May add steering instructions so the agent uses graph queries before raw file reads
4. Can add Claude Code permissions for lightweight query tools, depending on the current installer flags

Per-project bootstrap:

```bash
cd your-project
codegraph init
```

`codegraph init` builds the initial index. The file watcher / auto-sync kicks in when the MCP/watch server starts. Large projects (~25k files in the README benchmark) finish the initial indexing in <4 min on a modern laptop. Older notes in this wiki used `codegraph init -i`; check the current README before copying install commands into a course handout.

## Q's May 23 local check

This section folds in the useful part of the older "CodeGraph: Local Code Knowledge Graph that Cuts Token Usage" entry, which is now archived.

**Install safety check:** Q inspected the npm package path on May 23, 2026. The checked package was a small shim, had no npm lifecycle scripts, and downloaded the release binary from GitHub. That historical check was for `@colbymchenry/codegraph@0.9.3`; do not treat it as a current supply-chain audit for later releases.

**Config inspection:** `codegraph install --print-config` showed the MCP entries before writing them. The important lesson was that install touches more than one layer: the agent MCP config plus steering text in project/user instruction files. Diff your config after install.

**Indexing measurements from Q's local tests:**

| Codebase | Files | Nodes | Edges | Index time | Disk |
|---|---|---|---|---|---|
| Excalidraw shallow clone | 603 TS files | 9,286 | 8,622 | 11.4s | 19MB |
| learnai-3d-studio | 14 TS files | 109 | 95 | 561ms | 0.32MB |

`codegraph sync` on a no-change run took about 0.54s in that local test.

**One illustrative context-query result:** a `codegraph context` query for "how does the scene render and what files are involved" on `learnai-3d-studio` returned about 5,824 chars, versus about 89,025 chars for naively reading all 14 `.ts` / `.tsx` files in `src/`. That is roughly a 93% reduction for one query, but it is not a reproduction of the upstream headless-agent benchmark.

**Why Q did not run the full benchmark:** clean headless Claude Code benchmarking was blocked by session contamination unless using `--bare`, and `--bare` required a separate `ANTHROPIC_API_KEY` rather than subscription OAuth. Treat upstream benchmark numbers as vendor claims until independently reproduced on your own rig.

## How it differs from the sibling tool

If you've seen [Code Review Graph](/learnAIDoc/wiki/code-review-graph-knowledge-graph/) by tirth8205, you've seen a *cousin* — same underlying idea, different design choices and a substantially broader tool surface:

| Dimension | codegraph (this entry) | code-review-graph (sibling) |
|---|---|---|
| **Primary headline** | 89% fewer tool calls, 60% lower cost, 69% fewer tokens in the README's 2026-07 benchmark | 8.2x token reduction, up to 49x on monorepos |
| **Optimization target** | Eliminate discovery thrash during *any* Claude Code task | Originally framed around code review; now also advertises daily coding, architecture/debug/onboarding prompts, wiki generation, refactoring, and multi-repo search |
| **MCP surface** | 9 tools (1 heavy `explore` + 8 light queries) | 28 tools (search, refactor, dead code, wiki gen, communities…) |
| **Framework awareness** | URL → handler routing built in across many web frameworks | Framework-aware features and resolvers; richer overall toolkit |
| **Update strategy** | OS file-watcher + debounce | Incremental SHA-256 hash diff |
| **Install** | `install.sh`, `install.ps1`, npm, or `npx @colbymchenry/codegraph` | `pip install code-review-graph` |
| **License** | MIT | MIT |

**Which to pick?** code-review-graph is broader (28 tools, more output modes including auto-wiki generation and community detection); codegraph is narrower (9 tools, framework routing, file watcher). For projects where you mostly want Claude to stop spelunking, codegraph's smaller footprint is appealing. For monorepo refactoring + auto-doc workflows, code-review-graph's richer toolkit wins. They can coexist as MCP servers if you want both.

## Limitations and honest caveats

- **Files >1MB are skipped by default** (README-stated; configurable). Large generated files / minified bundles won't be in the graph.
- **Initial indexing time scales with the codebase** (README-stated). Most projects finish quickly; very large repos still need real indexing time even if incremental syncs are fast.
- **Static models don't capture dynamic dispatch / reflection / `eval()` / string-built imports.** (My inference, not directly stated in the README.) The agent will sometimes still need to fall back to `Read` for these patterns.

## How LearnAI Team Could Use This

- **Default-install candidate for LearnAI's Claude Code / Codex setup** — pilot it on one team project first, measure your own tool-call/time numbers, then roll out if the win holds on your codebases. The index is local, but returned snippets still enter the cloud model context when your agent uses them.
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
- **The benchmark methodology is still not independent.** Seven codebases, task-specific architecture questions, vendor-run. Headline numbers are directionally useful but not a formal benchmark — measure your own before adopting team-wide.
- **The framework registry is updated frequently** in source. Check `src/resolution/frameworks/` for the live list; the framework names in this entry are a snapshot, not exhaustive.
- **Indexing is local; agent context is still agent context.** CodeGraph does not require a CodeGraph API key for local indexing, but any snippets returned to Claude, Codex, or another cloud model may still be sent to that model provider as normal tool-result context.
- **Installer behavior can change.** Inspect `codegraph install --print-config`, run it on a disposable repo first if needed, and diff agent instruction/config files after install.
- **Companion deep-dives** in this wiki:
  - [Code Review Graph — 8.2x Token Reduction](/learnAIDoc/wiki/code-review-graph-knowledge-graph/) — sibling tool, broader scope
  - [Claude Code Context Management & CLAUDE.md](/learnAIDoc/wiki/claude-code-context-claudemd-practices/) — the complementary "what lives in conversation context"
  - [Claude Code · context: fork](/learnAIDoc/wiki/claude-code-context-fork/) — isolation pattern for heavy explorations
  - [Harness Engineering — The Real Bottleneck Isn't the Model](/learnAIDoc/wiki/harness-engineering-agents/) — why this kind of tooling is high-leverage
  - [GBrain — Garry Tan's Persistent Agent Memory System](/learnAIDoc/wiki/gbrain-agent-memory/) — the broader pattern of graph-shaped memory for agents
