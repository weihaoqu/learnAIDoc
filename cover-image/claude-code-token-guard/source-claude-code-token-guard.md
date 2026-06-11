---
title: "Claude Code Token Guard — Audit Unattended Token Burn"
slug: claude-code-token-guard
---

Token Guard is a practical safety pattern for Claude Code users who run long sessions, remote-control channels, scheduled tasks, or permission-bypass modes. It teaches how to audit unattended token burn by separating account usage, local execution, and cloud automation.

The reusable checklist covers launchd persistence, remote-control/channels, permission bypass, background daemons, local schedulers, running-session /loop tasks, Desktop scheduled tasks, cloud routines, quiet-hour transcript timestamps, and long-running sessions.

The main lesson: find persistence before killing processes; distinguish Claude from Codex/OpenAI processes; use transcript timestamps for quiet-hour claims; treat cloud routines as a separate surface; and keep cleanup commands human-approved.
