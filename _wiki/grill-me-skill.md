---
title: "grill-me — When AI Interviews You Before Writing Code"
date: 2026-05-14
category: Skills & Plugins
tags: [claude-code, codex, skills, planning, matt-pocock, anti-vibe-coding, requirements, rubber-ducking, course-design, anthropic, viral]
related: ["Matt Pocock's Skills — Claude Code for Real Engineers", "Ponytail — The Anti-Overengineering Skill for Coding Agents", "Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits", "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs", "How Anthropic Uses Skills — Thariq's 9-Category Framework & the Gotchas Pattern", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Claude Code 101 — Anthropic's Official Onboarding Course", "Personal AI Skill Cheat Sheet — When to Use Each Skill"]
icon: "🔥"
image: "/assets/images/grill-me-skill.png"
---

**`grill-me`** is a tiny Claude Code / Codex / agent-agnostic skill by **Matt Pocock** that flips the default agent dynamic: instead of you describing a feature and the agent immediately writing code, the agent interviews *you* — one question at a time, walking down each branch of the decision tree — until you've thought through every dependency. Matt's repo `mattpocock/skills` is at **about 82k stars (May 15, 2026)**, and grill-me is the most-cited piece. Matt himself calls it *"the most flexible skill I've ever created"* — he uses it for non-coding work too, like figuring out which course to build next.

*Source: [SKILL.md (mattpocock/skills)](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) | [Matt's blog: My 'Grill Me' Skill Went Viral](https://www.aihero.dev/my-grill-me-skill-has-gone-viral) | [Parent entry: Matt Pocock's Skills](/learnAIDoc/wiki/matt-pocock-skills-real-engineers/)*

## The entire skill, verbatim

The skill is famously small — about seven lines of prose plus YAML frontmatter. Here it is verbatim from the public `SKILL.md`:

```markdown
---
name: grill-me
description: Interview the user relentlessly about a plan or design
  until reaching shared understanding, resolving each branch of the
  decision tree. Use when user wants to stress-test a plan, get
  grilled on their design, or mentions "grill me".
---

Interview me relentlessly about every aspect of this plan until we
reach a shared understanding. Walk down each branch of the design
tree, resolving dependencies between decisions one-by-one. For each
question, provide your recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the
codebase instead.
```

Three paragraphs. That's it. The skill produces a substantively different agent behavior than any "let me think through this with you" prompt because each directive does specific work:

| Directive | What it changes |
|---|---|
| *"Interview me relentlessly"* | Sets the agent's role from helper to interrogator. No early agreement. |
| *"Walk down each branch of the design tree"* | Structures the conversation around dependencies, not the agent's free-form curiosity |
| *"Provide your recommended answer"* | Stops the conversation devolving into pure Socratic loop; the agent supplies its best guess so you can react, not invent from scratch |
| *"Ask the questions one at a time"* | Prevents the seven-questions-in-one-message wall that paralyzes most planning sessions |
| *"If a question can be answered by exploring the codebase, explore"* | Cuts trivial lookups so the human time goes to the real decisions |

## Why this one went viral

Out of **18 promoted skills** in Matt Pocock's repo (more if you count personal/in-progress entries — third-party indices show ~34 entries in the full tree), grill-me is the breakout. Three reasons in my reading:

1. **It inverts the painful default.** The default behavior of every coding agent is *eager helpfulness* — produce something fast, ask few questions. That looks productive and is responsible for a lot of agent-generated code that gets thrown away because it implemented the wrong thing. grill-me sells "slowness now, quality later" as a feature.

2. **It modernizes a familiar practice.** Matt's framing: *"Before AI came along, devs called this rubber ducking - talking through your idea until you figured out all the permutations."* Rubber ducking is older than most engineers. grill-me is rubber ducking with an opinionated duck.

3. **The "recommended answer" trick is doing a lot of work.** Most planning conversations stall when the human can't answer a question without more context. grill-me requires the agent to *guess first* — which immediately gives the human something to react to. "No, not that, because…" is faster than "Hmm, I haven't decided yet."

## What a session looks like

Matt reports that grilling sessions *often last about 45 minutes*. He doesn't publish a phase breakdown, so the sketch below is **illustrative** (my synthesis based on running it myself), not a Matt-Pocock-prescribed structure:

```
Phase 1   Agent reads the request + skims any relevant code
          → composes its first question

Phase 2   Foundational branches: data model, ownership, lifecycle,
          error handling, who-calls-who. Agent proposes a recommended
          answer, you correct.

Phase 3   Edge cases: race conditions, retries, partial failures,
          auth boundaries, observability. Most surprises live here.

Phase 4   Synthesis: agent provides a summary of the plan with your
          decisions baked in. You either approve or send it back for
          one more pass.
```

If the session is shorter, the problem was probably already well-defined. If it stretches well past an hour, the agent is doing work that should happen later — pause, run the code on a piece, then resume.

## Beyond coding — the part most reviews miss

The skill's most interesting claim — Matt's own — is that grill-me isn't really about code. From his blog: *"It's also great for non-coding use cases. I've used it for figuring out what course to build next…"* He calls it *"the most flexible skill I've ever created."*

Concrete non-coding applications:

| Use case | What you're grilling |
|---|---|
| **Course / syllabus design** (Matt's own example) | What students already know, what they should know by week 8, what the assessments measure, which weeks can be cut if behind schedule |
| **Conference talk outline** | Who's the audience, what's the one thing they should remember, what's the demo, what gets cut if you run long |
| **Research-paper framing** | What's the actual contribution vs. claimed contribution, who's the strongest critic, where's the threats-to-validity section weakest |
| **Workshop / lab plan** | Pre-reqs, deliverable per hour, the "if anyone is stuck" fork, the assessment rubric |
| **Migration / refactor scoping** | What can break, what's not in scope, what's the rollback, what's the proof-of-success check |

The non-coding angle is why this skill is worth understanding even for faculty / non-engineers — it's a structured-planning tool that happens to ride inside an agent shell.

**Important framing note**: Matt's repo README explicitly describes the skills as **small, composable, and agent-agnostic** — they work with Claude Code, Codex, and other AI agents, not just Anthropic's stack. Don't let "Claude Code skill" become a barrier if your colleague is on Codex or another harness.

## July 2026 Extension: grill-me-codex

The July screenshot set also surfaced [`chaseai-yt/grill-me-codex`](https://github.com/chaseai-yt/grill-me-codex), which is best treated as an extension to this entry rather than a separate wiki page. It keeps the original grill-me idea, then adds a cross-model review loop:

```text
Act 1: Claude grills the human until the plan is clear
Act 2: Codex reviews the frozen plan adversarially
Act 3: optional role flip - Codex builds, Claude reviews the diff
```

The durable lesson is the same one in [Cross-Model Code Review](/learnAIDoc/wiki/cross-model-code-review-claude-codex/): the model that wrote the plan should not be the only judge of the plan. For students, this is a useful escalation path:

| Situation | Use |
|---|---|
| Idea is fuzzy | Plain `grill-me` |
| Project has established terminology and docs | `grill-with-docs` |
| Plan is high-risk or expensive to implement | `grill-me-codex` / `codex-review` |
| You want a second model to implement a reviewed spec | `codex-build`, with a clean git tree and proof command |

Keep the caveat clear: cross-model review reduces blind spots, but it is not proof. The proof is still the diff, the tests, and the human's final review.

## Install

```bash
# From within your project (or globally in your home directory):
npx skills@latest add mattpocock/skills

# Or copy just grill-me into ~/.claude/skills/:
git clone https://github.com/mattpocock/skills /tmp/mp-skills
cp -r /tmp/mp-skills/skills/productivity/grill-me ~/.claude/skills/
```

Then in any agent session: type **"grill me"** before describing what you want to build (or design, or plan). The agent will switch into interview mode.

## The community ecosystem around this skill

Because the skill is tiny + MIT-licensed, forks and variants have proliferated. A non-exhaustive map:

| Variant | Distinctive twist |
|---|---|
| [`mattpocock/skills` (original)](https://github.com/mattpocock/skills) — the canonical upstream version | Includes sister skill `/grill-with-docs` |
| [`RobMitt/grill-me-skill`](https://github.com/RobMitt/grill-me-skill) | Marketed for Claude Code / Cowork |
| [`Jekudy/grillme-skill`](https://github.com/Jekudy/grillme-skill) | "Socratic deep interview … structured questioning waves" — more explicit phase structure |
| [`vclimenco/claude-code-skills`](https://github.com/vclimenco/claude-code-skills) | Mirror with light edits |

Pick the original unless a variant pitches a specific twist you need.

## Limitations and honest caveats

- **45 minutes is real.** This is not a 2-minute time-saver. Budget the time, or don't use it for trivial requests.
- **The agent's "recommended answer" can anchor you wrong.** When the agent proposes an answer you're not sure about, treat it as a *strawman to react to*, not a default to accept. Anchoring is a real risk.
- **My own caveat (not Matt's)**: I find grill-me works best when you already have a rough shape of the idea. Matt's blog suggests it works whether your idea is fully formed *or* very vague — try both ends and see what fits your style.
- **Doesn't replace documentation.** grill-me's sister skill `/grill-with-docs` is the one that updates **`CONTEXT.md`** (which the SKILL.md describes explicitly as *"a glossary and nothing else"*) and creates **ADRs** only when decisions are hard to reverse, surprising without context, and involve genuine trade-offs. Plain `/grill-me` is conversational; the decisions live in your chat history unless you save them out.

## How LearnAI Team Could Use This

- **Course-redesign workshops** — assign faculty to run grill-me on one of their existing syllabi. Output: a list of design decisions they hadn't explicitly thought through. Time: roughly an hour per faculty. Use as the *prep* artifact for a sit-down planning meeting, not a replacement for it.
- **Student research-proposal grilling** — before a student submits a CS-336 (Program Analysis for Security) project proposal, require they run grill-me on it. Submit the transcript with the proposal. Tells you in 30 seconds whether they actually thought through the problem or just picked a topic.
- **LearnAI's own internal projects** — when scoping any new tool / curriculum module, run grill-me on the proposal. Cheap, fast, and the recommended-answer mechanic surfaces decisions the team is implicitly making.
- **Faculty onboarding** — pair grill-me with the [non-coding-skills-claude-code](/learnAIDoc/wiki/non-coding-skills-claude-code/) entry as the "AI doesn't just write code" demonstration. The non-coding angle is what gets non-engineer colleagues to actually try an agent shell.

## Real-World Use Cases

| Scenario | Description |
|---|---|
| **Pre-coding planning for a new feature** | Run grill-me before describing the feature. Surfaces decisions that would otherwise show up as "you didn't ask about X" surprises later |
| **Stress-testing a research direction** | Use it to identify the strongest objection to your hypothesis before you've spent months proving it |
| **Course / syllabus design (Matt's own example)** | "What course should I build next?" — exactly the question grill-me was used for by its creator |
| **Conference talk scoping** | The "if you run long, what gets cut?" question alone often reshapes the talk |
| **Onboarding documentation** — grill yourself about your codebase | The transcript becomes the on-call runbook you never had time to write |
| **Pre-mortem on a migration** | Force the "what breaks?" question to be answered branch-by-branch, not waved off |

## Important things to know

- **This is widely considered the highest-leverage skill** in Matt's repo. If you only install one of his skills, install this one.
- **Pair with `/grill-with-docs`** if you want decisions captured automatically. `/grill-me` alone is conversational; `/grill-with-docs` updates `CONTEXT.md` (glossary) and writes ADRs for hard-to-reverse / surprising / trade-off decisions.
- **The "recommended answer" rule is the secret sauce.** Without it, the skill is just structured rubber-ducking. With it, the conversation has momentum.
- **Agent-agnostic**: works in Claude Code, Codex, and other agent harnesses — not Claude Code-only.
- **The skill produces a summary at the end** (per Matt's blog) — the agent restates the plan with your decisions baked in. Save that summary; it's the artifact you'll actually use.
- **Companion deep-dives** in this wiki:
  - [Matt Pocock's Skills — Claude Code for Real Engineers](/learnAIDoc/wiki/matt-pocock-skills-real-engineers/) — the parent repo entry, full skill list
  - [Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits](/learnAIDoc/wiki/karpathy-skills-claude-code/) — adjacent philosophy on small/composable skills
  - [How Anthropic Uses Skills — Thariq's 9-Category Framework & the Gotchas Pattern](/learnAIDoc/wiki/anthropic-skills-thariq-framework/) — the broader skills movement
  - [Claude Code · CLAUDE.md Practices](/learnAIDoc/wiki/claude-code-context-claudemd-practices/) — where grilling-output should land (CLAUDE.md / CONTEXT.md / ADRs)
  - [Claude Code 101](/learnAIDoc/wiki/claude-code-101/) — why the non-coding use case matters for faculty
