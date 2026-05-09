---
title: "gnhf — Good Night, Have Fun: Run AI Agents While You Sleep"
date: 2026-05-09
category: Claude Code
tags: [claude-code, codex, autonomous-coding, orchestrator, overnight, worktree, multi-agent, cli]
related: ["Ralph: Autonomous Development Loop for Claude Code", "Harness Engineering — The Real Bottleneck Isn't the Model", "Building /review-wiki — A Batch AI Quality Pipeline from Scratch"]
icon: "🌙"
image: "/assets/images/gnhf-overnight-agent-orchestrator.png"
---

gnhf ("Good Night, Have Fun") is an open-source orchestrator that runs AI coding agents in a loop while you sleep. Tell it an objective, go to bed, wake up to a clean git history of incremental commits. It supports six native agent backends (Claude Code, Codex, Copilot CLI, Pi, Rovo Dev, OpenCode) plus ACP targets via the bundled acpx registry, handles failure recovery with automatic rollback, and can run multiple agents in parallel via git worktrees.

*Source: [GitHub — kunchenguid/gnhf](https://github.com/kunchenguid/gnhf) | [DeepWiki](https://deepwiki.com/kunchenguid/gnhf)*

## How It Works

Each iteration follows the same loop:

```
1. Build prompt (inject notes.md context)
        ↓
2. Spawn agent (non-interactive mode)
        ↓
3. Evaluate result
        ↓
  ┌─────┴─────┐
  ▼            ▼
Success      Failure
  │            │
  ▼            ▼
Commit      git reset --hard
Append to   (rollback)
notes.md
  │            │
  └─────┬──────┘
        ▼
4. Check stop conditions
   (max iterations, max tokens,
    --stop-when condition met,
    3 consecutive failures)
        ↓
5. Loop or exit
```

The key design: **each successful iteration = one git commit.** Failed iterations get rolled back via `git reset --hard` (except commit failures, which preserve work for the next iteration to repair). You wake up to a branch of cherry-pickable commits, not a mess.

## Supported Agents

| Agent | Flag | Requirements |
|-------|------|-------------|
| **Claude Code** | `--agent claude` | `claude` CLI signed in |
| **Codex** | `--agent codex` | `codex` CLI authenticated |
| **GitHub Copilot CLI** | `--agent copilot` | Copilot CLI authenticated |
| **Pi** | `--agent pi` | `pi` CLI with configured provider |
| **Rovo Dev** | `--agent rovodev` | Atlassian `acli` with Rovo Dev |
| **OpenCode** | `--agent opencode` | `opencode` with model providers |
| **ACP targets** | `--agent acp:<target>` | Any ACP-compatible agent |

Custom ACP agents work too: `--agent 'acp:./bin/my-agent --profile ci'`

## Quick Start

**Prerequisites:** Node.js >= 20, Git installed, must run inside a git repo with a clean working tree.

```bash
# Install globally
npm install -g gnhf

# Basic usage — tell it what to do and go to bed
gnhf "reduce complexity of the codebase without changing functionality"

# With safety limits
gnhf "add comprehensive tests" --max-iterations 20 --max-tokens 5000000

# Stop when a condition is met
gnhf "fix all TypeScript errors" --stop-when "tsc reports zero errors"

# Run on your current branch and auto-push
gnhf --current-branch --push "keep improving the docs"
```

## Parallel Agents with Worktrees

The killer feature: run **multiple agents simultaneously** on the same repo, each in an isolated git worktree:

```bash
gnhf --worktree "implement feature X" &
gnhf --worktree "add tests for module Y" &
gnhf --worktree "refactor the API layer" &
```

Each agent gets its own working directory and branch. No interference. Merge results manually when they're done.

## Shared Memory: notes.md

Across iterations, agents accumulate context in a shared `notes.md` file. Each iteration reads it and can append observations, discoveries, or next-step guidance. This prevents the agent from repeating failed approaches or forgetting what it learned.

## Failure Recovery

| Scenario | What Happens |
|----------|-------------|
| Agent reports failure | Rollback, retry immediately |
| Hard agent error (retryable) | Exponential backoff |
| 3 consecutive failures | Abort run |
| Permanent error (e.g., no credits) | Abort immediately with details |
| Commit failure | Preserve uncommitted work for next iteration to repair |
| No-op iteration | Counts as failure toward abort limit |

## Configuration

Config lives at `~/.gnhf/config.yml` (auto-generated on first run):

```yaml
agent: claude
maxConsecutiveFailures: 3
preventSleep: true

# Custom agent paths
agentPathOverride:
  claude: ~/bin/claude-code-switch

# Agent-specific args
agentArgsOverride:
  codex:
    - -m
    - gpt-5.4
    - --full-auto

# Commit style
commitMessage:
  preset: conventional
```

## gnhf vs Ralph vs /loop

| Feature | gnhf | Ralph | /loop |
|---------|------|-------|-------|
| **Agents** | 7 (Claude, Codex, Copilot, Pi, Rovo, OpenCode, ACP) | Claude only | Claude only |
| **Worktree parallelism** | Yes | No | No |
| **Shared memory** | notes.md | Task list | Session context |
| **Failure recovery** | Rollback + backoff + 3-strike abort | Basic retry | No retry |
| **Git integration** | Auto-commit per iteration, auto-push | Manual | Per-batch |
| **Stop conditions** | Natural language (`--stop-when`) | Task completion | Timer-based |
| **Resume** | Yes (branch-based) | Yes (task-based) | No |
| **Install** | `npm install -g gnhf` | Clone + setup | Built-in |

## Real-World Use Cases

- **Overnight refactoring** — "Reduce complexity across all modules" with `--max-iterations 50` — wake up to up to 50 incremental commits, each independently revertable.
- **Parallel feature development** — Spin up 3 worktree agents for 3 independent features. Merge the branches in the morning.
- **Continuous improvement** — `gnhf --current-branch --push "keep improving test coverage"` on a CI server for ongoing autonomous improvement.
- **Multi-agent codebase migration** — One agent migrates types, another migrates tests, another updates docs — all concurrently via worktrees.
- **Research automation** — Use `--stop-when "all experiments pass"` with a research objective and let the agent iterate through experimental approaches.

## How LearnAI Team Could Use This

- **Autonomous agent design lab** — Students configure gnhf with different agents and objectives, compare commit histories and quality of results.
- **Failure recovery patterns** — Use gnhf's rollback + backoff + abort design as a case study in building resilient autonomous systems.
- **Parallel agent coordination** — Demonstrate worktree-based parallelism as a practical solution to multi-agent interference problems.
- **Overnight project hackathon** — Students set objectives before leaving class, review results next session — teaching both agent capabilities and limitations.

## Links

- **GitHub:** [kunchenguid/gnhf](https://github.com/kunchenguid/gnhf)
- **npm:** `npm install -g gnhf`
- **DeepWiki:** [kunchenguid/gnhf](https://deepwiki.com/kunchenguid/gnhf)
