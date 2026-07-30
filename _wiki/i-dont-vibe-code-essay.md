---
title: "Why I Don't Vibe Code — Jacob Harr's Defense of Friction and Essential Complexity"
date: 2026-05-21
category: Industry & Trends
tags: [vibe-coding, essential-complexity, software-engineering, ai-ethics, friction, deliberate-practice, cs-education, abstraction]
related: ["Vibe Coding 新手指南 — The Open-Source Primer for Non-Technical AI-Assisted Development", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era", "10 Lessons for Agentic Coding — What Should We Do When Code Is Cheap?", "What is Agentic Engineering? A Teaching Primer"]
icon: "🧱"
image: "/assets/images/i-dont-vibe-code-essay.png"
---

**A personal essay by Jacob Harr — multi-decade programmer, data journalist, Emacs devotee — making a precise and uncomfortable argument: vibe coding does not eliminate complexity, it only relocates it. The accidental complexity (mechanical tedium) that AI handles gracefully is not where real software work happens. Essential complexity — designing elegant, maintainable abstractions that require human judgment — is untouched, and the friction that forces us to engage with it is not a bug to eliminate but a signal worth heeding.**

*Source: ["Why I Don't Vibe Code" — jacobharr.is](https://jacobharr.is/personal/i-dont-vibe-code) | Discovered May 2026*

## The Core Distinction: Accidental vs. Essential Complexity

Harr anchors his argument in a distinction borrowed from Fred Brooks' "No Silver Bullet" (1986):

| Type | Definition | AI's reach |
|------|-----------|-----------|
| **Accidental complexity** | Mechanical tedium — remembering ImageMagick flags, writing repetitive boilerplate, summarizing known material | High — LLMs handle this well |
| **Essential complexity** | Designing elegant, maintainable abstractions; knowing *when* a design is wrong; coordinating human accountability | Low — LLMs lack the metacognitive capacity to know what they don't know |

The vibe coding movement, in Harr's read, correctly identifies accidental complexity as AI's sweet spot. The mistake is assuming that eliminating accidental friction also eliminates essential friction — or that the two can be disentangled.

> "Every abstraction is also an occlusion."

A generated function that works is still a function whose implications you need to understand. The abstraction hides the mechanism, but the mechanism still exists and will eventually matter.

## The Friction Thesis

The essay's most counterintuitive claim: **friction is a feature, not a defect.**

The entry groups his examples into three patterns of productive friction:

**1. Learning-curve friction**
The resistance that comes from encountering something unfamiliar. Pushing through it is how deep competency forms. If an LLM smooths every bump, the developer never internalizes the *why* — they only learn that the bump is smoothable. The next bump, in a context the LLM handles less well, becomes impassable.

**2. Architectural friction**
The feeling that a design is fighting you — that adding a feature is harder than it should be. This is a signal to stop and redesign, not to push through by leaning harder on the model. Architectural friction, when ignored, compounds into technical debt that no amount of prompt engineering resolves.

**3. Deliberate-pause friction**
The moments that force documented decision-making — Harr specifically mentions Architecture Decision Records (ADRs). These pauses produce the record of *why* a choice was made, which matters more than the choice itself when the system needs changing six months later.

Unproductive friction — the kind AI safely targets — is narrow, tedious, and well-defined:

- Remembering arcane CLI flags
- Generating repetitive boilerplate
- Summarizing material for someone already expert enough to verify the summary

## What LLMs Cannot Do: The Metacognition Gap

Harr's sharpest observation is structural, not technical:

> "Asking a LLM to recognize the limitations of its view on reality is like asking a goldfish how the water is."

LLMs have no metacognitive ability to question their own limitations from the inside. They can produce confident-sounding output about their own constraints, but this is a language pattern, not genuine self-awareness. The problem this creates in software engineering: architectural missteps go unchallenged. The model suggests a design, the developer accepts it, and neither party has flagged that the design encodes an assumption about the problem that is subtly wrong.

This is distinct from hallucination (generating false facts). It is *structural blindness* — not knowing that a question is worth asking.

> "An LLM can't care...it has no inner consciousness, let alone a conscience."

Accountability — the sense that a wrong decision will have consequences *for you* — is what keeps humans honest about their choices. That accountability is absent in LLM-generated code. The code ships; if it fails, the model neither learns nor suffers. The human who accepted the output without understanding it does both.

## The DOGE Cautionary Case

Harr extends the argument beyond software into data analysis, where his data journalism background gives him credibility:

- In data journalism, coding errors risked legal liability — a professional standard that enforced rigor
- Harr cites the DOGE/SSA data misread as an example of what happens when simplified data meets overconfident interpretation without expert oversight — he uses it as an analogy, not a direct AI-tools story
- The failure mode parallels vibe coding: the friction of careful, expert-driven verification was absent, and that friction turned out to be the analysis

He avoids outsourcing data analysis to LLMs entirely for this reason — not because the models are incompetent at pattern-matching, but because the *judgment* about which patterns matter, and why the data looks the way it does, requires domain expertise the model cannot supply.

## Not an Anti-AI Argument

Harr is explicit that his objection is not to AI tools in general. The targeted critique is narrow:

| What AI should do | What AI should not replace |
|---|---|
| Handle well-defined, tedious subtasks | Architectural thinking |
| Summarize for already-informed humans | Code review collaboration |
| Generate boilerplate in understood domains | Accountability for failures |
| Remember arcane flags | Human deliberation on design |

The essay's closing thought:

> "Not every whimsy needs to become a reality."

The friction of implementation — the effort required to turn an idea into working, maintainable code — is a natural filter that separates ideas worth pursuing from ideas that sound good. Eliminating that filter doesn't make us more productive; it makes us more prolific at producing things that shouldn't have been built.

## Why This Matters for CS Education

Harr's argument is particularly sharp as a counterpoint to the "just prompt it" culture spreading through early CS education:

- **Competency formation requires resistance.** A student who never debugs, never reads a stack trace, never sits with an unfamiliar codebase long enough to internalize its structure, doesn't build the mental models that make them effective when the AI's answer is wrong.
- **Verification requires expertise.** You can't verify a generated answer you don't understand. Students who learn to generate without understanding become dependent on the generation; the first novel problem breaks them.
- **Professional accountability is real.** In medicine, law, journalism, and increasingly software, you are accountable for outputs you approved — including AI outputs. Understanding what you're approving is not optional.

## How LearnAI Team Could Use This

- **CS ethics and critical thinking module** — Assign the essay as a counterpoint reading before or after a vibe coding module. Ask students: which parts of your project involved accidental complexity? Which involved essential complexity? Where did you feel productive friction?
- **ADR practice** — Use Harr's mention of Architecture Decision Records to introduce the ADR format. Have students document one architectural decision from a class project the way Harr describes.
- **Debate exercise** — Split the class: half argue for Karpathy's "code is the new assembly" thesis, half argue for Harr's friction thesis. Force each side to engage with the other's strongest point.
- **Data analysis integrity** — For courses touching data or AI bias: use the DOGE example to discuss what expert oversight in an AI-assisted pipeline looks like, and what the loop fails when it's absent.
- **Teaching the metacognition gap** — Have students ask an LLM to critique its own architectural suggestion, then evaluate: did it identify real weaknesses, or generate plausible-sounding self-criticism? What's the difference?

## Real-World Use Cases

| Scenario | How to use |
|---|---|
| Code review training | Use Harr's framing to teach reviewers what to look for when reviewing AI-generated code: not "does it work" but "does the design make sense and can we maintain it" |
| Onboarding junior devs | When onboarding engineers who learned primarily through AI assistance, surface the accidental/essential split explicitly — identify which skills they have and which they need to develop |
| Technical writing / ADRs | Use the "productive friction" frame to explain why documenting architectural decisions matters even when AI can regenerate code faster than you can write a doc |
| Engineering retrospectives | After a production incident involving AI-generated code, use Harr's accountability argument to structure the post-mortem: who understood what, and what was accepted without understanding |
| CS curriculum design | When designing AI-integrated coursework, use the essential/accidental complexity distinction to decide which parts of an assignment to AI-enable and which to require manual work |

## Important Things to Know

- **Harr is not a luddite.** He uses AI tools selectively and explicitly endorses them for accidental complexity. The critique is precise, not broad.
- **The Brooks origin matters.** The accidental/essential distinction is 40 years old and has survived every "silver bullet" wave since. Students who know the origin will recognize the argument has deep roots.
- **The goldfish metaphor is memorable but imprecise.** It's a pedagogical shortcut for "structural metacognitive limitation," which is the accurate technical claim. Both are useful — teach the metaphor, then unpack the mechanism.
- **The DOGE reference is politically charged.** Use carefully in classroom contexts; the methodological point (no expert in the loop + simplified data = catastrophic misread) is separable from the politics.
- **This essay pairs best with Karpathy**, not as a refutation but as a productive tension. Karpathy describes the direction of the field; Harr describes what gets lost if the transition is handled carelessly.

## Links

- **Jacob Harr's essay:** [I Don't Vibe Code](https://jacobharr.is/personal/i-dont-vibe-code) — jacobharr.is
- **Related:** [Vibe Coding 新手指南](/learnAIDoc/wiki/vibe-coding-beginners-guide/), [Karpathy: The End of Coding](/learnAIDoc/wiki/karpathy-end-of-coding/), [10 Lessons for Agentic Coding — What Should We Do When Code Is Cheap?](/learnAIDoc/wiki/ten-lessons-agentic-coding/), [What is Agentic Engineering?](/learnAIDoc/wiki/what-is-agentic-engineering/)
