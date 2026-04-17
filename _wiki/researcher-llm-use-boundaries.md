---
title: "What Researchers Should (and Shouldn't) Use LLMs For"
date: 2026-04-17
category: AI Education
tags: [research, llm-use, academic, boundaries, best-practices, scientific-computing, ai-education]
related: ["Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "Codex + Claude Code for Research — A Practical Tutorial"]
icon: "🎯"
image: "/assets/images/researcher-llm-use-boundaries.png"
---

Most AI-in-research advice falls into two unhelpful camps: "use it for everything" or "don't trust it at all." A more useful framework comes from working researchers who've internalized one principle: **LLMs excel where output is easy to verify, and fail where judgment is required.** A physics researcher's lecture slide crystallizes this — six things they use LLMs for, three things they don't — and the dividing line is sharp enough to generalize across disciplines.

*Source: Lecture slide from a physics/math researcher (shared publicly) | [Gruda, D. "Three ways ChatGPT helps me in my academic writing" — Nature (2024)](https://www.nature.com/articles/d41586-024-01042-3) | [ACM CHIIR 2026: Investigating Academic Researchers' Verification Challenges with LLMs](https://dl.acm.org/doi/full/10.1145/3786304.3787865) | [Carlson et al. "The use of LLMs to annotate data in management research" — Strategic Management Journal (2026)](https://sms.onlinelibrary.wiley.com/doi/full/10.1002/smj.70023) | [LLMs in Science](https://llminscience.com/)*

## The Core Insight: Verifiability as the Dividing Line

```
                    EASY TO VERIFY                    HARD TO VERIFY
                    ─────────────                     ──────────────
                    ✓ Use LLMs here                   ✗ Don't use LLMs here

  Calculations      "Solve this integral"             "Is this proof conceptually sound?"
                    → check the answer                → requires deep understanding

  Literature        "Summarize arXiv:2932.10245"      "Is this research direction interesting?"
                    → read the paper yourself          → requires taste and judgment

  Writing           "Write LaTeX for this section"    "Write my paper's introduction"
                    → edit the output                  → sets the framing you're judged on

  Teaching          "What are solvable 2D QM systems?" "Write my homework problems"
                    → verify against known results     → you need to own the pedagogy
```

The pattern: if you can **check the output faster than you can produce it**, the LLM is a net positive. If checking requires the same expertise as producing, you've gained nothing and risked importing errors you can't see.

## What To Use LLMs For (YES List)

| Use Case | Why It Works | Example |
|---|---|---|
| **Difficult calculations** | Problems hard to solve but easy to check. LLMs can reproduce anything known — derivatives, series expansions, matrix operations. You verify the answer, not the process. | "Compute the partition function for the Mathieu potential" |
| **Cross-disciplinary insights** | LLMs have read papers across every field. They surface connections you'd never find by searching your own discipline's literature. | "Has anyone in fluid dynamics solved a problem structurally similar to this condensed matter system?" |
| **Learning known material** | Asking about established facts and frameworks. The answers are checkable against textbooks and review articles. | "What are the axioms of quantum field theory?" / "What are some exactly solvable 2D quantum mechanical systems?" |
| **Reading and summarizing** | First-pass triage of papers. The LLM highlights claims and methods; you read critically. Explicitly request critical evaluation. | "What do you think of arXiv:2932.10245? Be very critical." |
| **Making figures** | First drafts of plots, diagrams, and schematics. The LLM knows matplotlib/TikZ/pgfplots tricks you'd spend hours finding. Output is visual — you immediately see if it's wrong. | "Plot the band structure with spin-orbit coupling highlighted" |
| **Writing LaTeX** | Drafting sections where the content is already decided. Formatting, notation consistency, boilerplate. You edit the prose; the LLM handles the markup. | "Write a section for my paper generalizing to the Mathieu potential" |

## What NOT To Use LLMs For (NO List)

| Use Case | Why It Fails | The Risk |
|---|---|---|
| **Subtle conceptual points** | These are questions where reasonable experts disagree. The LLM will give you a confident, averaged answer that papers over the disagreement. | You adopt a position without understanding why it's contested. You can't defend it in peer review. |
| **Judging research direction** | "Is this interesting?" requires taste — awareness of what the field needs, what reviewers value, what's been tried and failed. LLMs optimize for plausibility, not insight. | You pursue a direction that looks good on paper but is either trivial or already dead. |
| **Homework problems, talk slides, paper introductions** | These artifacts define *your* voice and pedagogical choices. Outsourcing them means your students/audience get generic framing. | Your introduction frames the paper in a way that doesn't match your actual contribution. Your homework tests what the LLM thinks is important, not what you think is important. |

## The Verification Principle in Practice

A 2026 ACM study on researcher verification behavior found that the key factor determining whether researchers verify LLM output is **perceived accuracy relative to their own domain knowledge**. When researchers are experts, they catch errors easily. When they're outside their domain, they over-trust the LLM — exactly the moment when verification matters most.

This creates a dangerous inversion:

```
Domain expertise HIGH  → Verification easy  → LLM output useful (but you needed it less)
Domain expertise LOW   → Verification hard   → LLM output risky (and you needed it more)
```

The practical rule: **use LLMs most aggressively in your area of expertise** (where you can verify ruthlessly) and **most cautiously outside it** (where confident-sounding nonsense is hardest to detect).

## A Decision Checklist for Researchers

Before using an LLM for a research task, ask:

1. **Can I verify the output in under 5 minutes?** If yes, use the LLM freely.
2. **Is the answer a fact or a judgment?** Facts are checkable. Judgments about importance, novelty, or framing are not.
3. **Would two experts give different answers?** If yes, the LLM's averaged response is actively misleading.
4. **Does the output carry my name?** If it goes in your paper's introduction, your grant proposal's framing, or your lecture slides, you need to own every sentence. Drafting assistance is fine; delegation is not.
5. **Am I in-domain or out-of-domain?** In-domain: verify aggressively, use freely. Out-of-domain: treat every claim as suspect until confirmed by a primary source.

## How LearnAI Team Could Use This

- **CS courses (all levels):** Use this framework as a Day 1 handout. Students need to internalize the verifiability principle before they start using Copilot and Claude for assignments. The YES/NO table translates directly: "use AI to debug your code (easy to verify — run it), don't use AI to design your architecture (requires judgment you're here to develop)."
- **AI education research:** The verification-inversion problem (LLMs most dangerous where you're least expert) is a publishable finding waiting to be replicated in CS education contexts. Run a study: do students catch more LLM errors in topics they've mastered vs. topics they're learning?
- **Faculty workshops:** Most faculty AI-use policies are binary (allowed/banned). This framework gives them a nuanced middle: "here's exactly where AI helps your students and where it stunts their growth." The physics researcher's slide is a perfect conversation starter.
- **Thesis advising:** When students bring LLM-assisted drafts, ask: "which parts did you verify, and how?" This shifts the conversation from policing to metacognition.

## Real-World Use Cases

| Scenario | Verifiable? | LLM Role | Human Role |
|---|---|---|---|
| Deriving a closed-form solution for a differential equation | Yes — plug it back in | Do the algebra | Check the solution, interpret the physics |
| Surveying 50 papers for a literature review section | Partially — claims are checkable | Summarize, extract key claims, flag contradictions | Read the important papers yourself, verify claims against source |
| Deciding whether to pivot your research agenda | No — pure judgment | None. Don't ask. | Talk to your advisor, collaborators, and your own intuition |
| Writing a conference talk | No — voice and emphasis are judgment | At most: suggest structure, check notation | Own every slide. Your talk is your reputation. |
| Finding analogous problems in another discipline | Yes — the analogy either holds or doesn't | Surface candidates from other fields | Evaluate whether the structural similarity is deep or superficial |
| Generating matplotlib/TikZ figures | Yes — you see the output | Draft code, suggest styling tricks | Iterate until the figure communicates what you intend |

## The Broader Principle

This isn't about fear of AI or rigid rules. It's about **comparative advantage**. LLMs are fast, broad, and tireless. Humans have judgment, taste, and accountability. The researchers who thrive will be the ones who assign each task to the right agent — not the ones who use AI for everything or nothing.

The physics researcher's slide is quietly radical: it says "I use AI constantly" and "I never use AI for the parts that matter most" in the same breath. That's not a contradiction. That's expertise.

## Links

- **Nature:** [Three ways ChatGPT helps me in my academic writing](https://www.nature.com/articles/d41586-024-01042-3)
- **ACM CHIIR 2026:** [Investigating Academic Researchers' Verification Challenges with LLMs](https://dl.acm.org/doi/full/10.1145/3786304.3787865)
- **Strategic Management Journal:** [The use of LLMs to annotate data in management research](https://sms.onlinelibrary.wiley.com/doi/full/10.1002/smj.70023)
- **Thoughtworks:** [Managing LLM risks: A framework for academic publishing](https://thoughtworks.medium.com/managing-llm-risks-a-framework-for-academic-publishing-eb2dd6be5615)
- **LLMs in Science:** [llminscience.com](https://llminscience.com/)
- **Harvard OAISC:** [Academic Integrity and Teaching With(out) AI](https://oaisc.fas.harvard.edu/academic-integrity-and-teaching-without-ai/)
- **Nature Scientific Reports:** [Cross-disciplinary thinking in LLMs](https://www.nature.com/articles/s41598-025-27107-5)
