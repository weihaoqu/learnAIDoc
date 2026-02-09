---
title: "Claude Code /rewind — Undo Without Losing Context"
date: 2026-02-08
category: Tools
tags: [claude-code, cli, productivity, undo, workflow]
related: ["Claude Code Power User Tips"]
icon: "⏪"
image: "/assets/images/claude-code-rewind.jpg"
---

Today I learned Claude Code has a built-in time-travel feature: `/rewind`. It lets you roll back to any previous point in your session — undoing code changes, conversation history, or both — without starting over.

## How to Use It

Type `/rewind` or press **Esc twice** to open an interactive menu showing every prompt from your current session. Each prompt is a checkpoint that Claude automatically captured before making changes.

## What You Can Do at Each Checkpoint

When you select a checkpoint, you get four options:

1. **Restore code and conversation** — Full undo. Both files and chat history revert to that point.
2. **Restore conversation only** — Keep current code, but rewind the chat. Useful when the code is fine but you want to redirect the discussion.
3. **Restore code only** — Undo file changes but keep the conversation. Good when you want to remember what was discussed but need the old code back.
4. **Summarize from here** — Compress everything after this point into a summary to free up context window space. No files change on disk.

## Why This Matters

- **Experiment freely** — Try a bold refactor knowing you can rewind if it breaks things.
- **Branch your approach** — Rewind and take a completely different path from the same starting point.
- **Recover from mistakes** — If Claude introduces a bug, roll back just the code without losing the conversation context.
- **Manage long sessions** — Use "Summarize from here" to reclaim context window space during lengthy debugging sessions.

## Limitations to Know

- **Bash side-effects are not tracked.** If Claude ran `rm`, `mv`, or `cp` via shell commands, those changes won't be undone by rewind. Only direct file edits through Claude's tools are checkpointed.
- **Not a Git replacement.** Checkpoints are session-level undo, not permanent history. Keep using Git for commits and branches.
- **External edits aren't captured.** Manual edits you make outside Claude Code won't appear in checkpoints.

## Pro Tip

Combine `/rewind` with `claude --continue --fork-session` to preserve your original session and try an entirely different approach on a copy.
