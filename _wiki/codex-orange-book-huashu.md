---
title: "Codex Orange Book — 花叔's Bilingual Codex Reference"
date: 2026-05-17
category: Learning Resources
tags: [openai-codex, codex, agents-md, claude-code, comparison, bilingual, ai-coding, orange-book, huashu, indie-dev, book, free-resource]
related: ["Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs", "Codex + Claude Code for Research — A Practical Tutorial", "Beyond /goal — The Orchestrator + Headless Pattern for Long-Running Claude Sessions", "What is Agentic Engineering? A Teaching Primer", "Anthropic Academy — 13 Free AI Courses with Certificates", "Claude Code 101 — Anthropic's Official Onboarding Course", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era"]
icon: "📙"
image: "/assets/images/codex-orange-book-huashu.png"
---

The **Codex Orange Book** (`alchaincyf/codex-orange-book`, CC BY-NC-SA 4.0, ~162 stars as of May 18, 2026) is a **bilingual (Chinese + English) practitioner book** on OpenAI's Codex coding agent, written by **花叔 (HuaShu)** — an AI-native indie developer behind the Kitty Light iOS app (the author and huasheng.ai claim a former #1-paid spot on the App Store; Apple's current listing only confirms the app and provider). The current GitHub release is **v2.0.1**, dated May 15, 2026 to document the mobile companion (which itself shipped May 14, 2026). The book covers all five Codex deployment forms (CLI, Desktop App, Cloud, IDE extension, Chrome extension), AGENTS.md, the `/goal` system, Automations, Skills, MCP, and — distinctively — a data-backed comparison with Claude Code in §10 that documents Claude Opus 4.7 leading GPT-5.5 on SWE-Bench Pro (64.3% vs 58.6%). In my opinion, it is one of the more thorough free Codex references currently available in either Chinese or English.

*Source: [github.com/alchaincyf/codex-orange-book](https://github.com/alchaincyf/codex-orange-book) (CC BY-NC-SA 4.0) | Whole series free at [huasheng.ai/orange-books](https://huasheng.ai/orange-books) | Author: [@AlchainHust](https://x.com/AlchainHust) (X/Twitter), 花叔v (Bilibili)*

## What it actually covers

The book is structured as **10 chapters + 3 appendices** (the GitHub repo's table of contents):

| Section | Chapters | What's in it |
|---|---|---|
| **Foundations** | §1-§3 | The five Codex forms; 10-minute setup; first project |
| **Daily Workflow** | §4-§6 | CLI deep dive, **AGENTS.md** (Codex's CLAUDE.md equivalent), Desktop app, Mobile companion |
| **Beyond Local Machine** | §7-§8 | Codex Cloud, Chrome extension, Skills, MCP, Automations, the `/goal` system |
| **Building Real Things** | §9-§10 | Idea-to-launch flow, **the dual-tool mental model** (Codex + Claude Code) |
| **Appendices** | A-C | Command reference, three-tier pricing, FAQ |

The "five forms" framing is the book's distinctive organizing idea: Codex isn't one product, it's a CLI + a desktop app + a cloud agent + an IDE extension + a browser extension, and the right one depends on the task. Most tutorials cover only the CLI; this book covers all five plus the mobile companion.

## Why this book matters (beyond just being "another Codex tutorial")

| Distinctive feature | What it gives you |
|---|---|
| **Author writes from a non-engineer's seat** | HuaShu states he never hand-codes; he ships production apps (the iOS app Kitty Light; huasheng.ai claims a former #1-paid spot) with AI agents alone. The book is therefore grounded in shipping experience rather than theory |
| **Bilingual editions** | English alongside the Chinese original. The repo describes the English as "native-prose translation, not a literal one"; whether it reads fluently is my editorial impression — verify against the version you download |
| **Honest cross-tool comparison** | §10 admits where Claude Code wins (Opus 4.7 SWE-Bench Pro leadership) and recommends the dual-tool workflow — rare in vendor-aligned tutorials |
| **Updates with Codex releases** | v2.0.0 published mid-May; v2.0.1 within 24 hours to document the mobile launch. Treats the book as living code, not a static PDF |
| **Multi-format** | PDF (1.7-4.2 MB), EPUB (5.6 MB), and HTML — pick the form that fits how you read |

## How it compares to other resources

| Resource | What it's good for | Where this book is different |
|---|---|---|
| **Anthropic Academy** ([wiki](/learnAIDoc/wiki/anthropic-academy-free-courses/)) — 13 free courses | Claude-side onboarding, official | Anthropic-side; covers Claude not Codex |
| **OpenAI's official Codex docs** | Authoritative, fast-moving | Reference-style, not narrative; no opinion on tool selection |
| **Random YouTube Codex tutorials** | Quick orientation | Fragmented; no consistent voice or scope |
| **Codex Orange Book** (this entry) | Full bilingual narrative + opinionated workflow + cross-tool framing | In my opinion, the dual-tool mental model in §10 is one of the more useful chapters for someone already on Claude Code who is evaluating Codex |

## The five-Codex-form mental model (the book's anchor)

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ CLI         │  │ Desktop App │  │ Cloud       │  │ IDE Plugin  │  │ Browser     │
│ (terminal)  │  │ (Mac/Win)   │  │ (long runs) │  │ (VS Code…)  │  │ (Chrome)    │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │                │                │
       └────────────────┴────────────────┴────────────────┴────────────────┘
                                          │
                                ┌─────────▼──────────┐
                                │ Mobile companion   │
                                │ (iOS / Android)    │
                                └────────────────────┘
```

The book's argument: each form fits a different task shape. CLI for focused coding, Desktop for ambient work, Cloud for long-running `/goal`-style jobs, IDE for inline edits, Browser for "code while browsing." Picking the right form matters more than picking the right prompt — a lesson most Codex documentation misses.

## The Codex vs Claude Code chapter (§10) — what it actually says

The book doesn't pretend Codex is universally better. Per §10's data-backed comparison:

- **Claude Opus 4.7 leads GPT-5.5 on SWE-Bench Pro** (64.3% vs 58.6%) — explicitly stated
- **Recommendation**: dual-tool workflow. Use Claude Code for the hardest debugging / multi-file refactoring; use Codex for orchestration breadth, long-running cloud jobs, and mobile-companion convenience
- The book treats the choice as **task-shape-dependent**, not vendor-loyalty-dependent — which fits Q's own [cross-model code review](/learnAIDoc/wiki/cross-model-code-review-claude-codex/) entry's argument

## The broader Orange Book series

The Codex book is part of HuaShu's Orange Book series — practitioner books, free, bilingual where applicable. **Source conflict**: the Codex repo README refers to the series as "eight books," but the current [huasheng.ai/orange-books](https://huasheng.ai/orange-books) collection lists **11 published books**:

| Books currently on huasheng.ai (collection page, May 2026) |
|---|
| Claude Code · Claude Code Source Code Analysis · Harness Engineering · Agent Skills · OpenClaw · Hermes Agent · Cursor · Gemma 4 · Polymarket · Claude Opus 4.7 System Card (Chinese edition) · OpenAI Codex |

Obsidian AI also exists as a GitHub repo (`alchaincyf/obsidian-ai-orange-book`) but is not currently on the huasheng collection page.

**Claude Code Orange Book** is the closest sibling (per huasheng.ai/orange-books/claude-code/): 102 pages, 12 chapters + an appendix.

The series is a recognizable "Chinese-English bilingual practitioner book" pattern worth studying as an artifact in its own right — fast iteration, multi-format, opinionated, free. The pattern could be adapted for technical writing in academic settings.

## Install / read instructions

```bash
git clone https://github.com/alchaincyf/codex-orange-book
cd codex-orange-book
# Open the latest version in your reader of choice:
open Codex-Complete-Guide-en-v2.0.1.pdf   # English edition
open Codex-Complete-Guide-zh-v2.0.1.pdf   # Chinese edition
# or open index.html in a browser; EPUB editions are also available
```

GitHub's PDF preview can fail on the larger files — download and open locally for the best rendering.

## How LearnAI Team Could Use This

- **Recommended reading for any LearnAI member who uses Codex** for code review (which is most of us, given the [cross-model review](/learnAIDoc/wiki/cross-model-code-review-claude-codex/) workflow). The CLI + AGENTS.md chapters alone are worth the time.
- **Tool-selection guide for new colleagues** — when a colleague asks "Claude Code or Codex for this?" point them to §10. The book's framing is task-shape-dependent rather than vendor-loyalty-dependent, which I find more useful than typical vendor blog posts.
- **CS-310 / CS-336 reference** — for students who need to learn Codex (e.g., for cross-model review labs), the book's "five Codex forms" section is a clean introduction. Bilingual edition helps international students.
- **As a writing model for our own wiki entries** — HuaShu's structure (foundations → daily workflow → beyond local → building real things → appendices) is a clean pattern for any tool-deep-dive we author. Steal the structure.

## Real-World Use Cases

| Scenario | How to use the book |
|---|---|
| **Evaluating Codex for a team** | Read §1-3 (foundations) + §10 (Codex vs Claude Code). 60 minutes total; informed decision at the end |
| **Standing up cross-model review** ([wiki](/learnAIDoc/wiki/cross-model-code-review-claude-codex/)) | Read §4 (CLI + AGENTS.md) + §10. Sufficient to wire Codex review into a Claude Code workflow |
| **Setting up `/goal` runs** ([wiki](/learnAIDoc/wiki/goal-orchestrator-headless-pattern/)) | §8's `/goal` section + the orchestrator-headless pattern in the linked entry covers most of what you'd want |
| **Onboarding a non-engineer collaborator** to AI coding | Start with §1-3; the bilingual edition helps Chinese-speaking team members |
| **Picking which Codex form fits a task** | The five-forms framing in the book's TOC is genuinely useful; most other resources only cover the CLI |

## Limitations and honest caveats

- **CC BY-NC-SA 4.0 = non-commercial only.** You can share, adapt, redistribute, but not for commercial use. Re-publishing or selling derivatives is out.
- **Single-author point of view.** HuaShu is opinionated; the book reflects his workflow choices (heavy use of `/goal`, AGENTS.md, multi-form Codex). Read alongside official OpenAI docs for completeness.
- **Versions move fast.** v2.0.0 → v2.0.1 in 24 hours when the mobile companion launched. The version of the book you read in three months won't be the same — re-check the repo for updates.
- **Author's framing assumes you trust agentic coding.** HuaShu's "I never hand-code" stance is a methodology claim, not a universal recommendation. Readers who want hand-coded fallbacks will find less guidance.
- **Star count is modest** (~162 as of May 18, 2026) — the audience is largely Chinese-speaking dev community + early international adopters, not the broad Codex user base. Quality is high; visibility is still catching up.
- **Source-version ambiguity to watch for.** The GitHub repo has v2.0.1 artifacts, but the "Download PDF" link on [huasheng.ai/orange-books/codex/](https://huasheng.ai/orange-books/codex/) currently serves a v2.0.0 PDF whose TOC still says "four forms" in one place — even though the body, the GitHub release, and the [Chrome Web Store Codex extension](https://chromewebstore.google.com/detail/codex/hehggadaopoacecdllhhajmbjkdcmajg) confirm five forms. Cross-check the version you actually have before quoting numbers from it.
- **No formal community forum.** Issues track on GitHub; deeper Q&A happens on the author's social channels.

## Important things to know

- **The dual-tool model in §10 is one of the most practically useful chapters** for someone already comfortable with Claude Code — it's an honest task-shape-based comparison rather than a vendor pitch (my editorial impression).
- **The Orange Book series is itself a teaching artifact.** The "fast-moving practitioner book, bilingual, multi-format, free" pattern is rare and worth studying — useful for anyone writing technical content (including LearnAI wiki entries).
- **AGENTS.md is Codex's equivalent of CLAUDE.md.** §4's coverage of AGENTS.md is a solid practitioner-level walkthrough of how Codex consumes project-level context. Worth reading even if you stay on Claude Code, to understand the cross-tool parallel.
- **The mobile companion is new** (May 15, 2026). Most Codex coverage online doesn't yet cover it — this book does (v2.0.1 documents it).
- **Companion deep-dives** in this wiki:
  - [Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs](/learnAIDoc/wiki/cross-model-code-review-claude-codex/) — the practical workflow that motivates Codex adoption for many teams
  - [Codex + Claude Code for Research — A Practical Tutorial](/learnAIDoc/wiki/codex-claude-code-research-tutorial/) — research-context dual-tool usage
  - [Beyond /goal — The Orchestrator + Headless Pattern](/learnAIDoc/wiki/goal-orchestrator-headless-pattern/) — deeper dive into the `/goal` system the book covers in §8
  - [What is Agentic Engineering? A Teaching Primer](/learnAIDoc/wiki/what-is-agentic-engineering/) — the conceptual scaffold; the Orange Book is the Codex-specific worked instance
  - [Anthropic Academy — 13 Free AI Courses](/learnAIDoc/wiki/anthropic-academy-free-courses/) — the Claude-side counterpart to this resource
  - [Claude Code 101](/learnAIDoc/wiki/claude-code-101/) — start here for the Claude side; then read this book for the Codex side
