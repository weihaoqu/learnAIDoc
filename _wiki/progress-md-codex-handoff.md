---
title: "progress.md Handoff — A Scripted Codex ⇄ Claude Code Workflow"
date: 2026-05-25
category: Agent Setup & Migration
tags: [codex, claude-code, handoff, progress-md, workflow, agents-md, multi-agent, slash-commands, automation, git, project-memory]
related: ["New-Mac Migration — Codex + Claude Code + checkpoint/resume in 90 Minutes", "Claude Code + Codex Handoff Workflow — Switching Models Without Losing Context", "Codex + Claude Code for Research — A Practical Tutorial", "Copy My Claude Code Setup — The LearnAI Agent Stack From Scratch"]
icon: "🔄"
image: "/assets/images/progress-md-codex-handoff.png"
---

**You finish work in Claude Code, stop, come back hours later in Codex (or vice versa), and you want the next agent to know exactly where you left off — branch, HEAD, what changed, what's next, what NOT to touch.** The v1 of this workflow used a hand-edited `# Current Handoff` block inside `CLAUDE.md`. It worked, but the block went stale the moment you made another commit. v2 replaces that block with a **tracked `progress.md` log** at repo root, two slash commands (`/checkpoint`, `/resume`), and a small bash script that handles git-state capture, locking, and atomic writes. You alternate sessions; the file is the shared memory.

*Source: This workflow was built on Q's `learnai-course` project — committed as `3ad104a Switch agent handoff to progress.md log + harden script`. v1 reference: [Claude Code + Codex Handoff Workflow]({{ '/wiki/claude-code-codex-handoff-workflow/' | relative_url }}) | [AGENTS.md spec (OpenAI Developers)](https://developers.openai.com/codex/guides/agents-md) | [AGENTS.md complete guide 2026 (codersera)](https://codersera.com/blog/agents-md-complete-guide-2026/) | [Top AI Agent Standards 2026 (Agentailor)](https://blog.agentailor.com/posts/top-ai-agent-standards-2026)*

## Why v1 wasn't enough

The v1 workflow was: write a `# Current Handoff` block at the top of `CLAUDE.md` before switching sessions, listing branch, latest commit, what changed, what to do next. It worked once. Then it failed in three predictable ways:

| v1 failure mode | Concrete symptom |
|---|---|
| The block goes stale on the very next commit | "Current commit: 3d2803a" stays written there after Codex commits `ac11df9`. The next session reads `3d2803a` and acts on a snapshot of the past. |
| Nothing enforces "did you actually update it" | You commit code, you forget the block, you stop. The next session opens the project blind. |
| Per-target handoff files multiply | If you patch v1 with `/tmp/learnai_resume_in_codex_latest.md` and `..._claude_latest.md`, you have two snapshots that drift apart and one project name hardcoded into a `/tmp` path. |

v2 inverts the problem: instead of a hand-edited block that may or may not match git state, the script generates a fresh **append-only entry** in `progress.md` every time you stop — and the entry captures the git state automatically.

## Why this replaces ad-hoc `HANDOVER.md`

A manual `/handover` command that writes `HANDOVER.md` is still useful for one-off Claude Code sessions. It is weak as a durable cross-agent workflow because the handover file is hand-written, easy to forget, and disconnected from the actual branch / HEAD / dirty-tree state.

`progress.md` keeps the good part — a readable stop-and-resume note — but makes it harder to lie by accident: the script captures git state automatically, prepends entries instead of overwriting history, and gives both Claude Code and Codex the same `/checkpoint` / `/resume` shape. For multi-day work, this is the canonical version; the old `/handover` page has been folded into this entry and archived.

## The shape — one log, two slash commands, one script

```
Time →

Claude Code session                       Codex session
─────────────────                         ──────────────
edit files, test                          
git commit -m "..."                       
/checkpoint                               
  └─ scripts/agent-handoff.sh             
     checkpoint claude --stdin            
     └─ prepends entry to progress.md     
git push  (with Q's approval)             
── STOP ─────────────────────────  ⏸ ──→  │
                                          cd repo && codex \
                                            "Run /resume and continue."
                                          /resume
                                            └─ scripts/agent-handoff.sh resume
                                               prints latest entry + git status
                                          edit, review, fix
                                          /checkpoint
                                            └─ ... checkpoint codex --stdin
                                          git commit
                                          ── STOP ──────────────  ⏸ ──→
... repeat ...
```

Three moving parts:

1. **`progress.md`** at repo root, tracked in git, newest entry on top.
2. **`scripts/agent-handoff.sh`** with three subcommands: `status`, `checkpoint <agent>`, `resume`.
3. **`AGENTS.md`** (for Codex) and Claude Code slash commands `/checkpoint` + `/resume` — both invoke the script.

## `progress.md` anatomy

Each entry is one checkpoint. Structure:

```markdown
# Project Progress

Live cross-agent handoff log. Newest entry on top. Each entry is one
checkpoint written by one agent. Both Codex and Claude Code append
entries; nobody edits prior entries.

<!-- newest entry below -->

## 2026-05-25 12:51:48 EDT — Claude Code

- **Branch:** `slide-redesign-2026-05`
- **HEAD:** `ac11df9` — Add agent handoff workflow
- **Upstream:** origin/slide-redesign-2026-05 — ahead 1, behind 0

### Summary

<what changed this session, what's next, off-limits files,
 server status, push status — markdown allowed>

### Working tree (`git status --short`)
...

### Unstaged diff (`git diff --stat`)
...

### Staged diff (`git diff --cached --stat`)
...

### Latest commit (`git show --stat --oneline HEAD`)
...

---

## 2026-05-24 23:27:14 EDT — Codex
...
```

Three properties make this work:

| Property | Why |
|---|---|
| **Tracked in git** | The log survives `git clone`, lands in PRs, and is reviewable. You can resume on a different machine after `git pull`. |
| **Newest on top** | `resume` reads only the top entry — O(1) regardless of how long the log grows. |
| **Append-only** | Nobody edits prior entries. If you got something wrong, write a new entry that corrects it. The file is durable history, not scratch. |

The HTML marker `<!-- newest entry below -->` is the insertion point the script writes against. It's invisible when rendered.

## `scripts/agent-handoff.sh` — three subcommands

```bash
scripts/agent-handoff.sh status
scripts/agent-handoff.sh checkpoint <agent> -m "<summary>"
scripts/agent-handoff.sh checkpoint <agent> --stdin       # heredoc-friendly
scripts/agent-handoff.sh resume
```

`<agent>` is `codex` or `claude` — **who is writing**, not the audience. Codex writes `checkpoint codex`; Claude Code writes `checkpoint claude`.

What each subcommand does:

- **`status`** — prints branch, HEAD, ahead/behind, working-tree summary, and where `progress.md` lives. Pure read.
- **`checkpoint`** — captures `git status --short`, `git diff --stat`, `git diff --cached --stat`, `git show --stat --oneline HEAD`, plus your summary, and inserts a new entry directly after the marker. Atomic via `mktemp` + `mv -f`. Serialized via a `mkdir`-based lock at `.progress.lock` so two agents writing at the same time can't lose entries.
- **`resume`** — prints `status` followed by just the top entry of `progress.md`. The parser boundaries on the **second** `## YYYY-MM-DD` heading (counted), not on `---`, so summaries containing Markdown horizontal rules or code-block `---` lines don't truncate the output.

A typical checkpoint from inside Claude Code:

```bash
scripts/agent-handoff.sh checkpoint claude --stdin <<'EOF'
**Summary in one sentence.**

What changed this session:
- ...

What's next:
- ...

Off-limits files: <list>
Server status: stopped
Push status: unpushed
EOF
```

The single-quoted `'EOF'` is non-negotiable — it disables shell interpolation so backticks, `$`, and quotes in the summary land verbatim in the file.

## The slash commands

In Claude Code, create two files at `.claude/commands/` in your project root. Each is a small markdown file describing what the slash command should do — Claude Code reads these on session start.

**`.claude/commands/checkpoint.md`**:

```markdown
# /checkpoint

Write a checkpoint entry to `progress.md` so the next session can resume.

## Steps
1. Decide what to cover: what changed (1–3 bullets), what's next,
   off-limits files, server status, push status.
2. Run:
   ```bash
   scripts/agent-handoff.sh checkpoint claude --stdin <<'EOF'
   <your summary, markdown allowed>
   EOF
   ```
3. Report the new entry path to Q. Stop unless Q asks for more.

## Notes
- The `<agent>` argument is who YOU are, not the audience.
  From Codex, use `checkpoint codex`.
- This does NOT commit or push. Q decides whether `progress.md`
  ships in the next commit.
```

**`.claude/commands/resume.md`**:

```markdown
# /resume

Pick up where the last session left off.

## Steps
1. Run `scripts/agent-handoff.sh resume`.
2. Read `CLAUDE.md` and `AGENTS.md` if present.
3. Summarize the current state in ≤6 bullets: branch, HEAD,
   working-tree cleanliness, last entry's "next", off-limits files.
4. Flag any conflict (top entry's HEAD ≠ current HEAD).
5. Ask Q for the next objective unless the entry specifies one.
6. Do NOT commit, push, reset, clean, or switch branches unless
   Q explicitly asks.
```

In Codex, the equivalent is text triggers documented in `AGENTS.md` at repo root:

- When Q says **"resume"** / **"pick up where we left off"** / **"continue"** → Codex runs `scripts/agent-handoff.sh resume`.
- When Q says **"save context"** / **"next session"** / **"checkpoint"** → Codex runs `scripts/agent-handoff.sh checkpoint codex --stdin <<...>>`.

Both sides obey one rule: **the agent label identifies the writer, not the audience.** When Claude Code prepares a handoff for the next Codex run, Claude writes `checkpoint claude`, NOT `checkpoint codex`.

## A worked switch

Start in Claude Code, finish a feature, hand off to Codex. The rule is **commit first, then checkpoint** so the entry captures the final committed state — not a "about to commit" snapshot that goes stale the moment you commit:

```
You:  (edit, test, verify)
You:  "Commit."
Claude: git commit -m "..."
You:  "Push." (explicit approval per Q's standing rule)
Claude: git push
You:  /checkpoint
Claude: (writes entry to progress.md — HEAD now reflects the new commit)
        "Wrote checkpoint for Claude Code -> progress.md"
You:  (close Claude Code, open Codex later that day)
You:  cd repo && codex "Run /resume and continue."
Codex:  (reads top entry, summarizes in ≤6 bullets, asks for next objective)
You:  "Fix the bug in line 42."
Codex:  (edits, tests, asks before committing)
You:  "Commit."
Codex:  git commit -m "..."
Codex:  /checkpoint
        "Wrote checkpoint for Codex -> progress.md"
You:  (back to Claude Code tomorrow)
You:  /resume
```

Either side can pick up. The log shows you the whole evolution. If you DO checkpoint before committing, that's fine too — but the next session will see HEAD ≠ entry.HEAD and AGENTS.md tells the agent to flag that conflict to you before editing.

## Quick Reference — what to type today

The whole workflow is two slash commands in Claude Code (or two trigger words in Codex — see caveat below). Everything else is plumbing.

> **Codex caveat:** Codex's TUI doesn't honor user-defined slash commands — only its built-in slashes (`/model`, `/init`, etc.). In Codex, type the trigger word **without** the leading slash: `checkpoint`, `resume`, `save context`, `wrap up`, `pick up where we left off`. The skill description and `AGENTS.md` both list these phrases, and Codex activates the same `scripts/agent-handoff.sh` workflow off them. Every example below shows the slash form (Claude Code); strip the slash when running in Codex.

### To install the workflow in a NEW project (one command)

From the project's root directory:

```bash
bash ~/.claude/skills/checkpoint/install.sh
```

That copies the 4 handoff files into the project (`scripts/agent-handoff.sh`, `.claude/commands/checkpoint.md`, `.claude/commands/resume.md`, and `AGENTS.md` if absent), adds two `.gitignore` entries, and prints what to do next. Idempotent — safe to re-run. The installer refuses to overwrite an existing `AGENTS.md`; if you have one, it tells you what to append manually. The `~/.codex/skills/checkpoint/install.sh` mirror does the same thing from Codex.

Source path defaults to `~/Desktop/learnai-course`; override with `PROGRESS_HANDOFF_SRC=/path/to/source` if the canonical repo lives elsewhere on your machine.

After install, the next two slash commands work in that project.

### To checkpoint and stop (from EITHER agent)

Just type:

```
/checkpoint
```

The agent will compose the summary from current conversation context, run the script with the correct writer label (`checkpoint claude` from Claude Code, `checkpoint codex` from Codex), and stop.

If you want to write the summary yourself:

```
/checkpoint summary: <one-paragraph summary of what changed, what's next, off-limits>
```

### To resume (from EITHER agent)

Just type:

```
/resume
```

The agent runs the script, reads the top entry of `progress.md`, reads `CLAUDE.md` and `AGENTS.md`, summarizes the state in ≤6 bullets, and asks for the next objective.

### To switch between agents

End of Claude Code session:

```
1. (in chat) "Commit."          Claude commits.
2. (in chat) "Push."            Claude pushes (with your explicit OK).
3. (in chat) "/checkpoint"      Claude writes a checkpoint entry. Close the terminal.
```

Start of Codex session (in a new terminal):

```
cd /path/to/repo
codex "Run /resume and continue."
```

Codex picks up from the top entry. Same shape in reverse to come back to Claude Code.

### The minimum viable session

```
/resume                # at start
... do work ...
"Commit." → "Push."    # if applicable
/checkpoint            # at end
```

Three keystrokes (effectively two slash commands) bracket every session. Skip neither.

### Three guardrails that prevent the common failures

| Failure | Guardrail |
|---|---|
| Next session edits files the previous session intentionally left dirty | List "off-limits files" in your checkpoint summary |
| Next session pushes work that wasn't ready | Say "Push status: unpushed" or "Push: only with Q's explicit approval" in the entry |
| Two sessions conflict because both think they're authoritative | The agent label (`checkpoint claude` vs `checkpoint codex`) makes the writer visible — you can see in `progress.md` and `git log` who wrote what |

### One mental model to keep in your head

**The repo is the shared memory.** Both agents read git state plus one file (`progress.md`). Whatever isn't in those two places doesn't exist between sessions. Treat your conversation history as ephemeral — anything you want to survive the switch goes into the checkpoint.

## Three bugs the audit caught

The first cut of the script had three real bugs that any cross-agent handoff script will hit. Worth knowing before you reinvent this:

1. **`---` collision in the entry parser.** If you used `---` as both the visual entry separator AND the parser stop-line, any summary containing a Markdown horizontal rule (or a code block with a `---` line) would truncate the output of `resume`. **Fix:** parser counts entry **headers** (`## YYYY-MM-DD`) and stops at the *second* one, ignoring `---` entirely.
2. **Race when two checkpoints land at the same time.** `read → split → write → mv` without a lock lets two agents both read the same baseline; the last `mv` wins and silently drops the other entry. **Fix:** `mkdir`-based lock at `.progress.lock` with a 30s wait. `mkdir` is atomic on POSIX, so it works without GNU `flock`.
3. **Combined trap `EXIT INT TERM` doesn't exit on signals.** Bash will run the trap on `INT`/`TERM` and then *resume the script body* with stale state. **Fix:** split the traps — `trap cleanup EXIT` for the normal path, plus `trap 'cleanup; exit 130' INT` and `trap 'cleanup; exit 143' TERM` so signals actually terminate.

Bonus gotcha: if you write a `timeout 180 codex exec ...` example in any doc, remember that `timeout` is **GNU coreutils** and is NOT installed on macOS by default. Use `perl -e 'alarm shift @ARGV; exec { $ARGV[0] } @ARGV' 180 codex exec ...` instead — `perl` is always present.

## `AGENTS.md` is the universal half

The Codex-side rules live in `AGENTS.md` at repo root. This isn't a Codex-only file. Per [Agentailor's 2026 AI agent standards survey](https://blog.agentailor.com/posts/top-ai-agent-standards-2026), AGENTS.md was donated to the Agentic AI Foundation (a directed fund under the Linux Foundation) in December 2025, and the same survey plus the [codersera 2026 guide](https://codersera.com/blog/agents-md-complete-guide-2026/) report native support across a growing list of tools — OpenAI Codex, Cursor, GitHub Copilot coding agent, Gemini CLI, Windsurf, Aider, and several others. Writing your handoff triggers into `AGENTS.md` (rather than a Codex-only config file) means more agents can pick up the workflow without per-tool customization. Verify the current tool list against those sources before betting on a specific assistant.

`CLAUDE.md` stays as Claude Code's project guidance — but with v2, it no longer holds **live state**. The "Current Handoff" block is gone; live state lives only in `progress.md`. `CLAUDE.md` just points at it.

## When this is overkill

| Don't bother if | Use this if |
|---|---|
| You work alone in one tool, one session | You alternate between Codex and Claude Code on the same project across days |
| The project is a throwaway script | The project has a multi-week life and stakeholders care about state |
| You commit every change immediately | You sometimes leave uncommitted work in flight between sessions |
| Only one machine ever touches the repo | You want to resume on a laptop after working on a desktop |

For solo-session work, `git log` is your handoff. For multi-session multi-agent work, `progress.md` is the answer to "what was I doing again?"

## The hand-rolled flavor

This is workflow code, not a framework. It's ~350 lines of bash, six files, no dependencies beyond `git`, `bash`, `awk`, and `mktemp`. The whole thing fits in a single commit. You can fork it for your own project, swap `codex` and `claude` for whatever agents you alternate between, and the same shape applies. The lesson is the shape, not the bash.

## Important things to know

- **The agent label is the WRITER, not the audience.** Easiest mistake to make. Claude Code preparing a handoff writes `checkpoint claude`.
- **Every `git commit` should be followed by a `/checkpoint`** if you're stopping. Otherwise the top entry shows a stale HEAD and the next session has to flag a conflict.
- **`progress.md` is tracked** — it goes into PRs and `git log`. That's a feature (review-ability, cross-machine resume), but it does add log noise. If you want it local-only, add `progress.md` to `.gitignore` and lose the cross-machine resume.
- **Two slash commands per side, not four.** v1 had `/resume-in-codex` and `/resume-in-claude-code` with inverted verbs (`/resume-in-codex` actually *saved* a Codex handoff, didn't load one). v2 collapses to symmetric `/checkpoint` (write a checkpoint and stop) and `/resume` (read the top entry and continue). The old asymmetric commands stay as deprecated wrappers for muscle memory.
- **Tiered Codex review pairs naturally with this.** When you checkpoint, the entry IS the canonical record of what you did. A future tiered review policy ("review canonical files always, skip single-line edits") can refer back to checkpoints as the audit trail.

Sources:
- [AGENTS.md custom instructions — Codex (OpenAI Developers)](https://developers.openai.com/codex/guides/agents-md)
- [AGENTS.md Complete Guide 2026 — codersera](https://codersera.com/blog/agents-md-complete-guide-2026/)
- [How to Build Your AGENTS.md (2026) — Augment Code](https://www.augmentcode.com/guides/how-to-build-agents-md)
- [Top AI Agent Standards to Know in 2026 — Agentailor](https://blog.agentailor.com/posts/top-ai-agent-standards-2026)
- [openai/codex AGENTS.md (GitHub)](https://github.com/openai/codex/blob/main/AGENTS.md)
- [Claude Code + Codex Handoff Workflow (v1 — wiki)]({{ '/wiki/claude-code-codex-handoff-workflow/' | relative_url }})
- Archived predecessor: Claude Code `/handover` as a generic save-context skill. Use `progress.md` for current cross-agent handoff work.
