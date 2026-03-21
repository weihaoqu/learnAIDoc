# /mywiki Skill Design

**Date:** 2026-03-21
**Status:** Implemented

## Summary

A global slash command (`~/.claude/commands/mywiki.md`) that automates the full learnAIDoc wiki entry workflow: input detection, deep research, entry drafting, cover image generation, optional infographics, cross-linking, and commit/push.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Location | `~/.claude/commands/mywiki.md` (global) | Q wants it available from any project |
| Project paths | Hardcoded to learnAIDoc | Simple, works now |
| Input types | Auto-detect (note, topic+links, folder, X post) | Flexible for all Q's workflows |
| Automation | Key checkpoints (draft, cover, before push) | Balance speed with control |
| Research depth | Deep (3-5 searches + papers + tutorials) | Enriches entries significantly |
| Infographics | Ask after entry created | Not always needed |
| Cross-linking | Suggest, confirm before updating | Prevents unwanted changes |
| Architecture | Orchestrator calling existing skills | Reuses baoyu-cover-image, baoyu-infographic, baoyu-danger-x-to-markdown |

## Pipeline

1. Detect input type (Obsidian note, folder, URLs, topic text)
2. Deep research (fetch URLs, 4-5 web searches, overlap check)
3. Draft entry → **CHECKPOINT 1**
4. Generate cover image via baoyu-cover-image → **CHECKPOINT 2**
5. Ask about infographics → generate if yes
6. Suggest cross-links → apply if confirmed
7. Commit & push → **CHECKPOINT 3**

## Dependencies

- `baoyu-cover-image` — cover generation
- `baoyu-infographic` — diagram infographics
- `baoyu-danger-x-to-markdown` — X post extraction
- `obsidian-cli` — Obsidian note reading (optional)
- `baoyu-image-gen` — underlying image generation (Gemini API)
