---
title: "Claude Code: Share Team Knowledge with @ Imports in CLAUDE.md"
date: 2026-02-08
category: Tools
tags: [claude-code, cli, team, claude-md, configuration]
related: ["Claude Code Power User Tips"]
icon: "📎"
image: "/assets/images/claude-code-imports.jpg"
---

Today I learned CLAUDE.md supports `@` imports to pull in content from other files — including home directory paths. This lets teams share coding standards from a central repo while keeping personal preferences local.

## Basic Syntax

Use `@path/to/file` anywhere in your CLAUDE.md:

```markdown
# CLAUDE.md

See @README.md for project overview.

## Architecture
@docs/architecture.md

## Coding Standards
@docs/coding-standards.md
@docs/testing-conventions.md
```

When Claude starts a session, these imports are expanded and the contents are loaded into context.

## Path Types

```markdown
# Relative paths (relative to the file containing the import)
@docs/guidelines.md
@../shared-standards.md

# Home directory
@~/.claude/my-preferences.md

# Absolute paths
@/home/user/.claude/standards.md
```

## Real-Life Team Setup

### The Pattern: Shared Standards + Personal Preferences

**1. Team commits coding standards to a central repo or shared directory:**

```
shared-standards/
├── code-style.md
├── security.md
└── api-conventions.md
```

**2. Project CLAUDE.md imports them (committed to version control):**

```markdown
# CLAUDE.md — committed, everyone gets this

## Company Standards
@shared-standards/code-style.md
@shared-standards/security.md
@shared-standards/api-conventions.md

## Project Architecture
@docs/architecture.md
```

Every team member cloning the repo gets the same standards automatically.

**3. Personal preferences stay in CLAUDE.local.md (auto-gitignored):**

```markdown
# CLAUDE.local.md — NOT committed, only on your machine

- I prefer 2-space indentation
- Use pnpm instead of npm
- My sandbox test URL: http://localhost:3001

# Pull in personal rules from home directory
@~/.claude/my-debugging-tips.md
```

### Across Multiple Worktrees

If you work with multiple git worktrees of the same project, `CLAUDE.local.md` only exists in one. Use home directory imports to share personal rules across all of them:

```markdown
# CLAUDE.md (committed)
@docs/team-standards.md

# Personal rules shared across worktrees
@~/.claude/my-project-preferences.md
```

## Recursive Imports (Up to 5 Levels)

Imported files can import other files, up to **5 levels deep**:

```
CLAUDE.md
  └── @docs/project-standards.md          (level 2)
       └── @../shared/company-rules.md     (level 3)
            └── @~/.claude/base-rules.md   (level 4)
                 └── @../global.md         (level 5)
                      └── @...             ❌ stops here
```

This lets you build layered hierarchies — global rules → company rules → project rules — without repeating yourself.

## Example: Hierarchical Standards

```markdown
<!-- ~/.claude/base-rules.md (personal global) -->
- Use semantic commit messages
- Write tests for new features
```

```markdown
<!-- shared-standards/company.md -->
@~/.claude/base-rules.md

Company additions:
- Use the company logger, never console.log
- Follow OWASP security guidelines
```

```markdown
<!-- docs/project-standards.md -->
@../shared-standards/company.md

Project additions:
- Use Redux for state management
- All API responses use the standard envelope format
```

```markdown
<!-- CLAUDE.md -->
@docs/project-standards.md
```

Result: Claude loads all four levels of standards in one import chain.

## Things to Know

- **Code blocks are ignored** — `@something` inside backticks or fenced code blocks won't be imported
- **First-time approval** — Claude shows a one-time dialog when a project first uses imports. If declined, imports stay disabled for that project.
- **Check what's loaded** — run `/memory` in a session to see all loaded files including imports
- **Relative paths resolve from the importing file**, not the working directory
