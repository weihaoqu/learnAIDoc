---
title: "From /grill-me to Review — A Slide-Based AI Development Workflow"
date: 2026-08-11
category: Skills & Plugins
tags: [claude-code, codex, skills, grill-me, matt-pocock, tdd, code-review, specs, tickets, ai-development, slides, teaching]
related: ["grill-me — When AI Interviews You Before Writing Code", "Matt Pocock's Skills — Claude Code for Real Engineers", "AI Slide Generation with Claude Code — Tool Comparison & Guide", "Personal AI Skill Cheat Sheet — When to Use Each Skill", "SpecOps — Spec-Driven Development with AI Coding Agents", "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs"]
icon: "🧭"
image: "/assets/images/grill-me-ai-development-flow-slides.png"
---

**This entry is a synthesis inspired by the linked `/grill-me` video and expanded with Matt Pocock's skills repo: a 15-slide teaching artifact for using AI agents without surrendering design decisions. The key pattern is simple: let the agent interrogate the human first, freeze the decisions into a spec, cut vertical tickets, execute with TDD, review against both code quality and the spec, then write the workflow down as reusable agent discipline.**

*Source basis: [linked video — "700 萬人下載的 /grill-me，Matt Pocock 到底寫了什麼？"](https://www.youtube.com/watch?v=aR97E7aKEgg); [mattpocock/skills repo snapshot](https://github.com/mattpocock/skills/tree/84fdeffd12f2ee307994d1eb6feb48173b6e0502); internal deck generated from transcript-derived notes, repo inspection, and visual chapter sampling. The "700 萬人下載" phrase is part of the video title, not a usage metric independently verified here. Visual chapter sampling was used to match the deck's visual rhythm, not as a comprehensive factual audit.*

Framing note: the post intentionally separates three layers: **video inspiration**, **repo-grounded skill behavior**, and **LearnAI workflow synthesis**. Treat the pipeline below as a teaching pattern derived from those sources, not as a verbatim workflow prescribed by the video.

## Download the Deck

| Format | Link | Notes |
|---|---|---|
| PDF | [grill-me-ai-workflow.pdf](/learnAIDoc/assets/decks/grill-me-ai-workflow/grill-me-ai-workflow.pdf) | Best for reading and sharing |
| PPTX | [grill-me-ai-workflow.pptx](/learnAIDoc/assets/decks/grill-me-ai-workflow/grill-me-ai-workflow.pptx) | Image-based slides with prompt notes, not fully editable text/shapes |

## Why This Deserves a Separate Post

The existing [grill-me wiki entry](/learnAIDoc/wiki/grill-me-skill/) explains the skill itself. This post is different: it captures a **workflow** that can be taught, practiced, and reused.

The video's useful angle is not just "`/grill-me` asks questions." It is that a good AI development loop separates **decision work** from **execution work**:

```text
grilling -> to-spec -> to-tickets -> implement -> tdd -> code-review
                         |
                         v
                writing-for-agents
```

That matters because many practical AI coding failures are not caused by the model being unable to write code. They come from letting the model silently decide product behavior, edge cases, architecture boundaries, and testing standards before the human has noticed those decisions exist.

## The Workflow

### 1. Start With Grilling

`/grill-me` is the public-facing hook. In the repo snapshot used here, [`grill-me`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/productivity/grill-me/SKILL.md) is a small wrapper that runs a [`/grilling`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/productivity/grilling/SKILL.md) session. The important behavior is decision-tree discovery: each answer exposes the next layer of decisions.

Use this before implementation when the idea is still fuzzy:

- Who is the user?
- What are the failure modes?
- What data exists already?
- What can be out of scope?
- What should the agent not decide alone?

The recommended-answer mechanic is crucial. A question without a recommendation can stall the human. A recommended answer gives the human something concrete to accept, reject, or modify.

### 2. Freeze Decisions Into a Spec

[`to-spec`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/to-spec/SKILL.md) turns the conversation into a stable artifact. The point is not to dump code paths into a document. The point is to preserve problem framing, user stories, implementation decisions, and testing decisions before the chat context gets fuzzy.

Good spec behavior:

- records decisions that should survive the session
- avoids stale implementation detail unless needed
- captures testing seams before code is written
- gives future agents a source of truth

### 3. Cut Vertical Tickets

[`to-tickets`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/to-tickets/SKILL.md) is valuable because it discourages horizontal slicing.

Bad split:

```text
database -> backend -> frontend -> tests
```

Better split:

```text
login slice     -> schema + API + UI + tests
checkout slice  -> schema + API + UI + tests
export slice    -> schema + API + UI + tests
```

Each ticket should be a small proof that the system works through the stack. That gives the agent a narrower frontier and gives the human something real to inspect.

### 4. Execute, But Keep Feedback Loops Tight

[`implement`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/implement/SKILL.md) should not re-plan the product. It should execute a settled spec or ticket.

The guardrails come from two companion skills:

- [`tdd`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/tdd/SKILL.md): write tests against public behavior first, then implement
- [`code-review`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/code-review/SKILL.md): review on two axes, code standards and spec compliance

This is the core anti-vibe-coding lesson: the agent can execute quickly, but the proof has to come from tests, review, and the spec, not from the same model saying its own output looks good. TDD only helps here when tests are derived from the spec or worked examples before implementation; weak tests written first are still weak tests.

### 5. Use Architecture Maintenance as a Recurring Loop

The architecture lesson I take from the video's later section is that agent workflow and module design are connected. AI agents are easier to constrain when important behavior sits behind clear interfaces instead of being spread across many shallow modules with implicit coupling. Deep modules are easier to reason about because a smaller interface hides real complexity.

The architecture maintenance idea here uses deletion-test thinking: if removing a module makes complexity leak everywhere, it may be hiding useful complexity; if removing it makes the system clearer, it may be a shallow middleman.

This should be a recurring maintenance loop, not an emergency refactor:

```text
review diff -> inspect architecture pressure -> identify deepening opportunities -> grill the proposal -> refactor only after the decision is clear
```

### 6. Turn the Workflow Into Agent Writing

[`writing-for-agents`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/productivity/writing-for-agents/SKILL.md) is the meta-layer. A workflow that lives only in one chat dies with that chat. A workflow written as a skill, project rule, or compact instruction becomes reusable.

The writing lesson is compression, not verbosity:

- give the agent a context pointer
- use leading words that trigger known behavior
- define completion criteria
- prune no-op instructions and repetition

This is why the deck ends with `writing-for-agents`: a good AI workflow should eventually become something the next agent session can load.

## Workflow Tradeoff: Superpowers vs Small Skills

Slide 14 introduces Superpowers as a useful contrast with Matt Pocock's smaller composable skills. The point is not that one approach always wins. Heavier workflows can help when the operator needs a complete guardrail system. Small skills are better when the operator already understands the task and wants a flexible control surface.

For teaching, that contrast is useful: students should learn to ask whether they need a **production line** or a **toolbox** before installing another agent framework.

## Teaching Use

This deck works well as a 30-45 minute workshop:

| Segment | Activity |
|---|---|
| 5 min | Show why vague prompts outsource hidden decisions |
| 10 min | Run a live `/grill-me` or `/grilling` session on a small feature |
| 10 min | Convert the decision tree into a spec and vertical tickets |
| 10 min | Show how TDD and code review constrain agent execution |
| 5 min | Ask students to write one reusable agent instruction from the workflow |

The goal is not to make students memorize Matt Pocock's skills. The goal is to teach the operating discipline: **decide deliberately, execute narrowly, verify independently, then preserve the workflow.**

## Slide Gallery

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px;margin:1.5rem 0;">
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/01-slide-cover.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/01-slide-cover.png" alt="Slide 1: /grill-me to controllable AI development flow" style="width:100%;border-radius:8px;"></a>
    <figcaption>1. /grill-me to controllable AI development flow</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/02-slide-core-problem.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/02-slide-core-problem.png" alt="Slide 2: The problem is that AI guesses too much" style="width:100%;border-radius:8px;"></a>
    <figcaption>2. The problem is not coding speed; it is hidden guessing</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/03-slide-small-composable-skills.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/03-slide-small-composable-skills.png" alt="Slide 3: Small composable skills" style="width:100%;border-radius:8px;"></a>
    <figcaption>3. Small composable skills beat one rigid workflow</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/04-slide-grilling-design-tree.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/04-slide-grilling-design-tree.png" alt="Slide 4: Grilling as a design tree" style="width:100%;border-radius:8px;"></a>
    <figcaption>4. Grilling exposes the design tree</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/05-slide-to-spec-freeze-consensus.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/05-slide-to-spec-freeze-consensus.png" alt="Slide 5: to-spec freezes consensus" style="width:100%;border-radius:8px;"></a>
    <figcaption>5. to-spec freezes decisions without stale code detail</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/06-slide-to-tickets-vertical-slices.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/06-slide-to-tickets-vertical-slices.png" alt="Slide 6: to-tickets creates vertical slices" style="width:100%;border-radius:8px;"></a>
    <figcaption>6. to-tickets cuts vertical tracer-bullet slices</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/07-slide-implement-trusts-upstream.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/07-slide-implement-trusts-upstream.png" alt="Slide 7: implement trusts upstream decisions" style="width:100%;border-radius:8px;"></a>
    <figcaption>7. implement executes a settled ticket</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/08-slide-tdd-anti-cheating.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/08-slide-tdd-anti-cheating.png" alt="Slide 8: TDD reduces AI self-justification" style="width:100%;border-radius:8px;"></a>
    <figcaption>8. TDD reduces self-justifying tests</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/09-slide-code-review-two-axis.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/09-slide-code-review-two-axis.png" alt="Slide 9: code-review has standards and spec axes" style="width:100%;border-radius:8px;"></a>
    <figcaption>9. code-review checks standards and spec separately</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/10-slide-deep-vs-shallow-modules.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/10-slide-deep-vs-shallow-modules.png" alt="Slide 10: deep versus shallow modules" style="width:100%;border-radius:8px;"></a>
    <figcaption>10. Deep modules help agents reason locally</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/11-slide-architecture-maintenance.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/11-slide-architecture-maintenance.png" alt="Slide 11: architecture maintenance loop" style="width:100%;border-radius:8px;"></a>
    <figcaption>11. Architecture maintenance as a recurring loop</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/12-slide-writing-for-agents.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/12-slide-writing-for-agents.png" alt="Slide 12: writing for agents" style="width:100%;border-radius:8px;"></a>
    <figcaption>12. Agent instructions should compress behavior</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/13-slide-writing-workflow.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/13-slide-writing-workflow.png" alt="Slide 13: writing workflow fragments shape beats" style="width:100%;border-radius:8px;"></a>
    <figcaption>13. Writing can be split into explore and exploit</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/14-slide-superpowers-comparison.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/14-slide-superpowers-comparison.png" alt="Slide 14: Superpowers versus Matt skills" style="width:100%;border-radius:8px;"></a>
    <figcaption>14. Heavy workflows and modular skills are a tradeoff</figcaption>
  </figure>
  <figure>
    <a href="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/15-slide-back-cover.png"><img src="/learnAIDoc/assets/images/grill-me-ai-development-flow-slides/15-slide-back-cover.png" alt="Slide 15: keep decisions with humans and execution with AI" style="width:100%;border-radius:8px;"></a>
    <figcaption>15. Keep decisions with humans; give execution to AI</figcaption>
  </figure>
</div>

## References

- ["700 萬人下載的 /grill-me，Matt Pocock 到底寫了什麼？"](https://www.youtube.com/watch?v=aR97E7aKEgg), YouTube video.
- [mattpocock/skills](https://github.com/mattpocock/skills), repo snapshot used here: [`84fdeffd12f2ee307994d1eb6feb48173b6e0502`](https://github.com/mattpocock/skills/tree/84fdeffd12f2ee307994d1eb6feb48173b6e0502).
- Upstream skill files consulted: [`grill-me`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/productivity/grill-me/SKILL.md), [`grilling`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/productivity/grilling/SKILL.md), [`to-spec`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/to-spec/SKILL.md), [`to-tickets`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/to-tickets/SKILL.md), [`implement`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/implement/SKILL.md), [`tdd`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/tdd/SKILL.md), [`code-review`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/code-review/SKILL.md), [`improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/engineering/improve-codebase-architecture/SKILL.md), and [`writing-for-agents`](https://github.com/mattpocock/skills/blob/84fdeffd12f2ee307994d1eb6feb48173b6e0502/skills/productivity/writing-for-agents/SKILL.md).
- Related LearnAI entries: [grill-me — When AI Interviews You Before Writing Code](/learnAIDoc/wiki/grill-me-skill/), [Matt Pocock's Skills — Claude Code for Real Engineers](/learnAIDoc/wiki/matt-pocock-skills-real-engineers/), [AI Slide Generation with Claude Code](/learnAIDoc/wiki/ai-slide-generation-tools/).
