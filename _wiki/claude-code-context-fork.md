---
title: "Claude Code: Isolate Heavy Tasks with context: fork"
date: 2026-02-08
category: Tools
tags: [claude-code, cli, skills, subagents, context-management]
related: ["Claude Code: Agent Teams vs Subagents", "Claude Code Power User Tips"]
icon: "🍴"
image: "/assets/images/claude-code-context-fork.jpg"
---

Today I learned you can add `context: fork` to a Claude Code skill so it runs in a completely isolated subagent — with its own context window. It does the work, returns a summary, and your main conversation stays clean.

## The Problem

Some tasks produce massive output — deep research, large test runs, code analysis across dozens of files. Running these inline floods your main conversation's context window with verbose intermediate results you don't need to see.

## The Solution: `context: fork`

Add `context: fork` to a skill's frontmatter. The skill runs in its own isolated subagent, does all the heavy lifting privately, and returns only a concise summary to your main conversation.

```yaml
---
name: deep-research
description: Research a topic thoroughly in the codebase
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find all relevant files using Glob and Grep
2. Read and analyze the code
3. Trace dependencies and relationships
4. Summarize findings with specific file references
```

When you invoke `/deep-research authentication flow`, it:
1. Spawns a new Explore subagent with its own context window
2. The agent reads dozens of files, runs searches — all in isolation
3. Returns a clean summary to your main conversation
4. Your main context window is untouched by the intermediate noise

## Choosing an Agent Type

The `agent` field controls which subagent runs the forked skill:

| Agent | Best for | Model | Tools |
|-------|----------|-------|-------|
| `Explore` | Read-only research, codebase analysis | Haiku (fast/cheap) | Read, Grep, Glob |
| `Plan` | Planning before implementation | Inherited | Read-only |
| `general-purpose` | Tasks needing both analysis and edits | Inherited | All tools |

## Practical Examples

### Deep Codebase Research

```yaml
---
name: investigate
description: Deep-dive investigation of a codebase area
context: fork
agent: Explore
---

Investigate $ARGUMENTS in the codebase:

1. Find all related files
2. Trace how the feature is implemented end-to-end
3. Identify dependencies and side effects
4. List any potential issues or tech debt

Provide a structured summary with file:line references.
```

Usage: `/investigate the payment processing pipeline`

The Explore agent searches across the entire codebase — reading dozens of files, tracing imports, following function calls — and returns a concise report. Your main conversation only sees the summary.

### Test Failure Analysis

```yaml
---
name: debug-tests
description: Analyze and debug failing tests
context: fork
allowed-tools: Bash, Read, Grep
---

Debug failing tests:

1. Run the test suite: `npm test 2>&1`
2. For each failure:
   - Read the test file
   - Find the implementation being tested
   - Identify the root cause
3. Report:
   - Each failing test with its root cause
   - Suggested fixes
```

Usage: `/debug-tests`

Test output can be hundreds of lines. The forked agent processes all of it privately and returns just the diagnosis.

### PR Summary

```yaml
---
name: pr-summary
description: Summarize a pull request
context: fork
allowed-tools: Bash(gh *)
---

Summarize this pull request:

- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`

Generate:
1. What changed and why
2. Potential risks
3. Questions for the author
```

Usage: `/pr-summary`

PR diffs can be enormous. The fork absorbs all that context and gives you an executive summary.

### Security Audit

```yaml
---
name: security-scan
description: Scan code for security vulnerabilities
context: fork
agent: Explore
---

Security audit of $ARGUMENTS:

Search for:
- Hardcoded credentials or secrets
- SQL injection vectors
- XSS vulnerabilities
- Missing input validation
- Insecure crypto usage

Report each finding with:
- File and line number
- Severity (critical/high/medium)
- Suggested fix
```

Usage: `/security-scan src/api/`

## When to Use `context: fork`

**Use it when:**
- The task produces verbose intermediate output (research, test logs, diffs)
- You want isolation — the task shouldn't consume your main context window
- The task is self-contained and returns a summary
- You're doing something heavy: analysis across many files, log processing, documentation generation

**Don't use it when:**
- The task needs back-and-forth refinement with you
- The skill contains guidelines (not a concrete task) — guidelines should be inline, not forked
- You need the forked agent to access context from your current conversation

## Where to Put Skill Files

| Location | Scope |
|----------|-------|
| `.claude/skills/` | Project-level — commit to share with team |
| `~/.claude/skills/` | Personal — available across all projects |

The `context: fork` field is the difference between a skill that runs inline (polluting your context) and one that runs in clean isolation (returning only what matters).
