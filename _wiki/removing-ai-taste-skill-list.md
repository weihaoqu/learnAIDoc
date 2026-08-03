---
title: "Editing AI-Sounding Writing: Which Skill Should You Use?"
date: 2026-08-03
category: Prompting & Writing
tags: [ai-writing, ai-slop, writing, editing, skills, codex, claude-code, academic-integrity]
related: ["Killing AI Slop: avoid-ai-writing + stop-slop", "Taste Skill — Teaching AI Agents Design Taste for Frontend Code", "Prompt Master — Write Accurate Prompts for Any AI Tool, Zero Waste"]
---

The useful question is not "which skill hides AI writing?" The useful question is "which skill helps a student turn a generic draft into a specific, accountable piece of writing?"

That distinction matters. Skills that market themselves as detector bypass tools are the wrong default for a learning wiki. They encourage the student to optimize against a classifier instead of improving the draft. The better workflow treats "AI taste" as an editing signal: vague claims, inflated transitions, symmetrical rhythm, fake confidence, missing human agency, and evidence-free polish.

This page is a decision guide. The longer [Killing AI Slop](/learnAIDoc/wiki/removing-ai-slop/) entry covers `stop-slop` and `avoid-ai-writing` in more detail.

*Source: [stop-slop on Skills](https://skills.sh/hardikpandya/stop-slop/stop-slop) | [stop-slop on GitHub](https://github.com/hardikpandya/stop-slop) | [avoid-ai-writing on Skills](https://skills.sh/conorbronsdon/avoid-ai-writing/avoid-ai-writing) | [avoid-ai-writing on GitHub](https://github.com/conorbronsdon/avoid-ai-writing) | [humanize on Skills](https://skills.sh/humanizerai/agent-skills/humanize) | [remove-ai-style on Skills](https://skills.sh/zc277584121/marketing-skills/remove-ai-style)*

## The decision map

| Situation | Use | Why |
|---|---|---|
| You need a fast blunt pass before publishing | `stop-slop` | It scores directness, rhythm, trust, authenticity, and density. It is good at catching filler, false agency, adverbs, and polished-but-empty prose. |
| You need diagnosis, rewrite options, or file edits | `avoid-ai-writing` | It has detect, rewrite, and edit modes, plus context and voice profiles. It explains why a phrase was flagged instead of only banning it. |
| You want to "bypass detectors" | Do not make that the default | That framing trains the wrong habit. Use a writing-quality pass, then add evidence and author judgment. |
| The draft has no specific claims yet | Use neither | A skill cannot humanize an empty argument. Add names, dates, examples, numbers, observations, or a real position first. |

## Default recommendation

Use `stop-slop` first when the draft is short, public, and too smooth. It is deliberately strict. The core rules are easy to teach:

- Cut filler phrases.
- Name the human actor.
- Replace vague abstractions with specific claims.
- Vary sentence length.
- Remove em dashes and formulaic contrasts.
- Score the result out of 50.

This makes it a good classroom tool. A student can run the pass, see the score, then explain which edits improved the draft. The score is not the grade. It is a revision prompt.

Use `avoid-ai-writing` second when you need nuance. It can run in detect-only mode, rewrite mode, or edit a file in place. The context profiles matter: a technical blog should not be judged the same way as a LinkedIn post, and documentation should not be forced into a personal essay voice. The skill also has the right caution built into its premise: AI-writing signals are not proof of authorship.

## A practical workflow

```text
rough draft
  -> add real material       names, examples, dates, measurements, decisions
  -> stop-slop pass          score directness, rhythm, trust, authenticity, density
  -> avoid-ai-writing detect diagnose vocabulary, structure, and context mismatch
  -> revise manually         keep the author's voice and one or two natural irregularities
  -> final read              ask whether each paragraph adds something new
```

The order is intentional. If you run a "humanizer" before the draft contains evidence, the tool can only change surface style. It may sound better, but it still will not say anything.

For student work, I would ask for a short revision note with three rows:

| Before | After | Why the edit improved the argument |
|---|---|---|
| Generic claim | Specific claim | Names the evidence or the actor |
| Smooth transition | Direct bridge | Shows how this paragraph follows the last |
| Detector-style polish | Author voice | Preserves the student's actual judgment |

That turns the skill from a camouflage tool into a writing lesson.

## Install the useful defaults

The Skills CLI supports global, agent-specific installs. For a user-level setup that covers both Codex and Claude Code:

```bash
npx skills add hardikpandya/stop-slop --global --agent codex claude-code --skill stop-slop --yes
npx skills add conorbronsdon/avoid-ai-writing --global --agent codex claude-code --skill avoid-ai-writing --yes
```

After installation, the expected user-level folders are:

```text
~/.codex/skills/stop-slop
~/.codex/skills/avoid-ai-writing
~/.claude/skills/stop-slop
~/.claude/skills/avoid-ai-writing
```

Then invoke them in plain language:

```text
Use stop-slop on this draft. Score it and tell me the three edits that matter most.
```

```text
Use avoid-ai-writing in detect mode on draft.md. Do not rewrite yet. Group issues by severity.
```

```text
Use avoid-ai-writing to edit draft.md in place, technical-blog context, blunt voice. Preserve quotes and code blocks.
```

## Candidates to test, not defaults

Some skill-list posts surface broader "humanizer" tools. Treat them as candidates, not the teaching default.

| Candidate | Status | Why I would be careful |
|---|---|---|
| `humanizerai/agent-skills@humanize` | Needs testing | Its public skill description says it transforms text to bypass AI detectors and uses credits. That is the wrong primary frame for students. |
| `zc277584121/marketing-skills@remove-ai-style` | Worth testing | Its description includes deterministic Markdown analysis before rewrite, which is closer to an editorial workflow. Still verify on real drafts before recommending. |
| Generic AI detectors | Weak signal only | Detectors can help locate patterns, but they should not be used as proof that a student used AI. |

Language-specific writing cleanup should live in separate posts with real examples. Mixing several languages into one skill list would make this page less useful.

## What success looks like

A good pass does not make the prose invisible. It makes the writer more visible.

- Each paragraph adds a claim, example, observation, or decision.
- The draft names who did what instead of assigning agency to abstractions.
- The rhythm varies because the idea demands it, not because a tool shuffled sentence lengths.
- The student can explain what changed and why.
- The final text would still sound like that student in office hours.

That is the line I would teach: remove the machine defaults, then restore the human responsibility.
