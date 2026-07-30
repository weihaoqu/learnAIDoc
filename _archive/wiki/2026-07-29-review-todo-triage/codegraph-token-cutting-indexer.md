---
title: "CodeGraph: Local Code Knowledge Graph that Cuts Token Usage"
date: 2026-05-23
category: Skills & Plugins
tags: [codex, claude-code, mcp, code-indexing, token-optimization, performance, knowledge-graph]
related: ["Codex + Claude Code Skill Repos: May 23 Batch", "academic-research-skills — Imbad0202's 4-Skill Claude Code Pipeline for Academic Research"]
icon: "🕸️"
image: "/assets/images/codegraph-token-cutting-indexer.png"
---

# CodeGraph: Local Code Knowledge Graph that Cuts Token Usage

**TL;DR**: CodeGraph pre-indexes your codebase into a knowledge graph (symbols, call paths, file structure) and exposes it via an MCP server. Agents like Claude Code, Codex CLI, Cursor query the graph instead of fanning out with grep/glob/Read. Upstream's benchmark claims **~35% cheaper, ~70% fewer tool calls, 100% local**. My install + small-repo test on May 23, 2026 **illustrated the mechanism** (a single `codegraph context` query returned **~93% fewer tokens** than naively reading all files in one small project) but I did *not* reproduce the full headless `claude -p` benchmark — see "Why I didn't run the full benchmark" below.

## What it is

- **GitHub**: [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) — ~19K⭐ (snapshot May 23, 2026), MIT, TypeScript. Repo owned by `colbymchenry`.
- **npm**: `@colbymchenry/codegraph@0.9.3`
- **Mechanism**: builds a SQLite knowledge graph (nodes = symbols/files, edges = imports/calls/refs) at project init/index, then serves it via MCP (`codegraph serve --mcp`) so agents can query it via tool calls instead of file reads.
- **Supported agents**: Claude Code, Cursor, Codex CLI, opencode, Hermes Agent.
- **Languages**: README claims 19+ languages. Upstream benchmark winners include Rust (Tokio: 81% fewer tokens), TypeScript (VS Code/Excalidraw: 73%), Python (Django: 64%), Swift (Alamofire: 59%), Java (OkHttp: 41%), Go (Gin: 23%).

## Why it might matter for you

If you use Claude Code or Codex on real codebases (multi-hundred files+), the "Explore" agents normally fan out:

```
Read package.json → grep for X → Read 5 candidate files → grep for Y → Read 3 more →...
```

Each Read/grep is a tool call and burns input tokens. CodeGraph replaces those with a structured query: "What calls `saveScene`?" returns a list of call sites + code snippets, often <2000 tokens, in one call.

The win compounds on large codebases. On VS Code (~10K files), upstream reported 73% fewer tokens. On Gin (~150 files), only 23% fewer. Bigger codebases = bigger wins.

## What I actually tested

### Install safety check (passed)

| Check | Result |
|-------|--------|
| npm package size | 10.5kB, 3 files only (it's a shim) |
| Lifecycle scripts (preinstall/postinstall) | None |
| install.sh review | Clean: downloads tarball from GitHub Releases, symlinks to `~/.local/bin/` |
| License + owner | MIT, repo owned by `colbymchenry` |
| Latest release | v0.9.3 (May 22, 2026) — package.json on main shows 0.9.4 (avoid "latest" ambiguity) |

```bash
# Safe install path (avoided curl|sh):
npm i -g @colbymchenry/codegraph@0.9.3
```

### Dry-run config inspection

**Manual MCP setup** is one stdio entry per agent. **The full `codegraph install` command writes more**: MCP config + agent steering files (CLAUDE.md / AGENTS.md additions instructing the agent to prefer graph queries) + Claude Code auto-allow permissions (unless `--no-permissions` is passed). Inspect via `codegraph install --print-config <agent>` before running.

**Claude Code** (writes to `~/.claude.json`):
```json
{ "mcpServers": { "codegraph": { "type": "stdio", "command": "codegraph", "args": ["serve", "--mcp"] }}}
```

**Codex CLI** (writes to `~/.codex/config.toml`):
```toml
[mcp_servers.codegraph]
command = "codegraph"
args = ["serve", "--mcp"]
```

Use `codegraph install --print-config <agent>` to see the exact diff before writing.

### Indexing performance (real numbers)

| Codebase | Files | Nodes | Edges | Index time | Disk |
|---|---|---|---|---|---|
| Excalidraw (shallow clone) | 603 TS files | 9,286 | 8,622 | 11.4s | 19MB |
| learnai-3d-studio | 14 TS files | 109 | 95 | 561ms | 0.32MB |

`codegraph sync` (incremental update) on no-change: 0.54s. Fast enough to run as a git post-commit hook.

### Context-query value (one concrete example, illustrative only)

Query: *"how does the scene render and what files are involved"* against learnai-3d-studio.

- `codegraph context` output: **5,824 chars (~1,456 tokens)** — structured summary with entry points, related symbols, code snippets, ready to drop into an LLM prompt.
- Naive `Read` of all 14 .ts/.tsx files in `src/`: **89,025 chars (~22,256 tokens)**.
- **~93% reduction** for this one query.

This single observation **illustrates the mechanism** (one structured query vs N file reads) but does **not** reproduce upstream's headless-agent benchmark. It's directional only.

### Why I didn't run the full headless benchmark

Tried to reproduce upstream's `claude -p --strict-mcp-config` benchmark on Excalidraw. Hit two real obstacles:

1. **Session contamination**: without `--bare`, `claude -p` inherits auto-memory, plugin sync, and recent-session prefetch from my parent Claude Code instance. First smoke-test response came back referencing "the earlier polling task" instead of answering about Excalidraw. $1.27 wasted on garbage output.
2. **`--bare` requires `ANTHROPIC_API_KEY`**: CC's `--bare` mode explicitly skips OAuth/keychain, so subscription users can't use it without a separate API key.

**Conclusion**: independent benchmarking of headless agent runs is non-trivial for OAuth-subscription Claude Code users. The upstream benchmark numbers should be treated as upper-bound vendor claims until reproduced by a third party with a clean test rig.

## How to install (for your own use)

```bash
# 1. Inspect package contents before installing
npm pack --dry-run @colbymchenry/codegraph@0.9.3

# 2. Install globally (or use npx for a one-off)
npm i -g @colbymchenry/codegraph@0.9.3
# Alternative dry-run without global install:
#   npx -y @colbymchenry/codegraph@0.9.3 install --print-config claude

# 3. AFTER install, dry-run the agent config writes
codegraph install --print-config claude
codegraph install --print-config codex

# 4. Per-project init + index
cd your-project
codegraph init -i             # initialize + initial index

# 5. Enable MCP server + steering files (writes to ~/.claude.json / ~/.codex/config.toml AND CLAUDE.md/AGENTS.md)
codegraph install             # interactive; add --no-permissions to skip CC auto-allow

# 6. Use it via the agent — restart Claude Code / Codex so MCP picks up

# 7. Keep index fresh after code changes
codegraph sync                # incremental

# 8. Uninstall paths (three independent layers)
codegraph uninstall           # removes agent MCP entries + steering text
codegraph uninit              # removes .codegraph/ index in current project
npm rm -g @colbymchenry/codegraph   # finally remove the global binary
```

## Concerns / things to watch

1. **Vendor benchmark is steel-manned**: 4 runs/arm, median, Opus 4.7 headless. Per the README, all benchmark queries ARE published — verify your real questions look like theirs before extrapolating.
2. **Small-repo gains are smaller, not zero**: Gin (~150 files Go) still showed 23% fewer tokens / 22% cheaper in upstream's table. The break-even point where index overhead exceeds savings is **unmeasured** in my testing. Real-world: don't assume sub-100-file repos won't benefit — measure.
3. **MCP adds a fixed per-query overhead**: stdio pipe + index lookup is non-zero (I did not measure mine; cite or test before quoting numbers). Worth it when it replaces 10+ Read calls; less so for 1-2 reads.
4. **Vendor steers the agent**: codegraph's `install` writes instructions to CLAUDE.md AND AGENTS.md telling the agent to *prefer* graph queries over grep/Read. This is part of the product, but it means "WITH codegraph" includes a behavioral nudge, not just the MCP server. Diff the files after install.
5. **No `--print-instructions` flag**: only `--print-config` shows the MCP entry. Steering-text additions to CLAUDE.md / AGENTS.md aren't dry-runnable — install and diff.
6. **Language mix matters**: README claims 19+ languages. Upstream benchmark range was 23% (Go) → 81% (Rust) fewer tokens. Don't extrapolate TS wins to your favorite language without testing.
7. **Privacy**: the index and MCP server are 100% local, but any code snippet the MCP server returns to your agent is still sent to Claude/Codex's cloud model as normal tool-result context. CodeGraph doesn't change your data-exposure surface, just the volume.

## When it's worth installing

✅ **Yes** if:
- You work on codebases > 500 files (esp. TypeScript/React/Next.js)
- Most of your AI-coding sessions are exploration/architecture questions (not "fix this line")
- You're cost-sensitive on API usage (or hitting subscription rate limits)

❌ **Skip** if:
- Your projects are < 100 files (your Read calls are already cheap)
- You mostly do localized edits (Edit/Write workflows, not Explore)
- You don't want any MCP server in your agent config

## How LearnAI team could use this

- **MARIE thesis codebase**: if multi-hundred-file, codegraph would speed up "where is X called from" exploration during code review.
- **Course assignments**: students working in Claude Code on a moderate-size repo could install codegraph locally to keep their token usage down (especially if they're on free API tier).
- **`learnai-course` site**: currently mostly static HTML, so no big win — keep simple Read.
- **`learnai-3d-studio`**: only 14 files; the index doesn't pay off yet. Revisit when the studio grows.

## Real-world use cases

1. **Exploring an unfamiliar codebase** ("how does feature X work?") — graph traversal beats grep fan-out.
2. **Impact analysis before refactor** ("what calls this function?") — call-graph query is one tool call.
3. **Onboarding documentation prep** — `codegraph context` outputs structured summaries that can seed README architecture sections.
4. **Multi-agent orchestration** — shared `.codegraph` index queried by multiple agents/subagents instead of each fanning out its own grep storm (each agent runs its own stdio MCP process against the same on-disk index).

## Related / alternatives

- **[safaiame/graphify](https://github.com/safaiame/graphify)** — similar idea, "knowledge graph that auto-updates as code changes." NetworkChuck promoted it as a Hermes Agent replacement for OpenClaw. Smaller community.
- **CC's built-in Explore agent** — fine for one-off queries; codegraph helps when the same codebase is queried repeatedly.
- **LSP-based tools (e.g. `lsp_goto_definition` MCP servers)** — narrower scope (symbol lookups only), no full call-graph view.

## My honest take

CodeGraph is a real product, not vaporware. The benchmark numbers are likely overstated for typical use (their questions were chosen to favor the graph), but the **mechanism** is correct: replacing N grep/Read calls with one structured query saves tokens. The 93% token reduction I observed on a single context query is consistent with the upstream claims at the per-query level.

The blocker is the **MCP install touches your agent config in multiple places**: Codex users get changes to `~/.codex/config.toml` AND `~/.codex/AGENTS.md` steering. Claude Code users get changes to `~/.claude.json` (MCP + auto-allow permissions) AND `CLAUDE.md` steering. All reversible via `codegraph uninstall`, but worth diffing first.

I'd install it on real-codebase projects and keep it off the small ones. The token savings on a thesis-sized codebase over 6 months of AI-assisted refactoring would more than pay for the install ceremony.

## Pinned versions used in this evaluation

- codegraph: `0.9.3` (npm) / GitHub `v0.9.3` (released May 22, 2026)
- Test target: `excalidraw` @ `f6d85bc`
- Test target: `learnai-3d-studio` (local)
- Claude Code: 2.1.x (current)
- Date: 2026-05-23

## Source

- [colbymchenry/codegraph README](https://github.com/colbymchenry/codegraph)
- Recommended in: Section D of the [Codex + Claude Code Skill Repos: May 23 Batch](codex-skill-repos-may23-batch.md) wiki entry.
- Screenshot reference: 5.23/IMG_6473 (#3 on "AI 大模型 GitHub 本周十大热门" weekly chart, +10,749 stars/week).
