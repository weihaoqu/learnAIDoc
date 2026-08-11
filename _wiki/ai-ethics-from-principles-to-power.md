---
title: "AI Ethics — From Principles to Power Structures"
date: 2026-08-11
category: AI for Teaching
tags: [ai-ethics, ai-literacy, responsible-ai, governance, fairness, ai-policy, systematic-review, teaching]
related: ["AI Education Search-Space Design — Make Students Wider Before Faster", "What Researchers Should (and Shouldn't) Use LLMs For", "CS329A Agent-System Literacy — The Next Layer of AI Education", "How AI Agents Cheat Benchmarks — Berkeley's Wake-Up Call"]
icon: "⚖️"
image: "/assets/images/ai-ethics-from-principles-to-power.png"
---

AI ethics should not be taught as a checklist of noble words. The useful version is a way to inspect how AI systems distribute power, risk, accountability, attention, and opportunity. Four survey and review papers can be read as a strong teaching map: start with recurring principles, connect them to concrete ethical concerns, compare governance documents, then ask whose lived reality and power position the system changes.

*Source / evidence base: [Jobin, Ienca, and Vayena, "The global landscape of AI ethics guidelines" (Nature Machine Intelligence, 2019)](https://www.nature.com/articles/s42256-019-0088-2); [Corrêa et al., "Worldwide AI Ethics: a review of 200 guidelines and recommendations for AI governance" (Patterns, 2023)](https://doi.org/10.1016/j.patter.2023.100857) and [project page](https://nkluge-correa.github.io/worldwide_AI-ethics/); [Giarmoleo et al., "What ethics can say on artificial intelligence: Insights from a systematic literature review" (Business and Society Review, 2024)](https://doi.org/10.1111/basr.12336); [Groen, Sharon, and Becker, "An overview of AI ethics: moral concerns through the lens of principles, lived realities and power structures" (AI and Ethics, 2026)](https://link.springer.com/article/10.1007/s43681-025-00955-7).*

This page is an educational synthesis of those papers, not a claim that all four authors make one shared framework.

## The Four-Paper Map

These papers are useful together because each one answers a different question.

| Paper | What it maps | Best use |
|---|---|---|
| [Jobin, Ienca, and Vayena 2019](https://www.nature.com/articles/s42256-019-0088-2) | AI ethics guidelines and recurring principles | Historical anchor: what the early "ethical AI" consensus looked like |
| [Corrêa et al. 2023](https://doi.org/10.1016/j.patter.2023.100857) | 200 AI governance guidelines and recommendations | Governance layer: what public bodies, companies, academia, and civil society recommend |
| [Giarmoleo et al. 2024](https://doi.org/10.1111/basr.12336) | 309 academic AI ethics articles through December 2021 | Research layer: what concerns, solutions, and ethical approaches appear in the literature |
| [Groen, Sharon, and Becker 2026](https://link.springer.com/article/10.1007/s43681-025-00955-7) | Three ways the field frames moral concerns: principles, lived realities, and power structures | Teaching frame: why principles are necessary but incomplete |

A teaching pattern that emerges from reading them together is:

```text
principles
  -> ethical concerns in AI design and human-AI interaction
  -> governance mechanisms
  -> lived realities of people affected by the system
  -> power structures that decide who benefits and who carries risk
```

For teaching, that last step is often the most revealing one. AI ethics becomes much sharper when students learn to ask not only "is this fair?" but also "who gets to define fairness, who can contest the output, and who is forced to live with the system?"

## Principles Are the Starting Point

Jobin, Ienca, and Vayena found frequent convergence around principles such as:

```text
transparency
justice and fairness
non-maleficence
responsibility
privacy
```

That list is useful because it gives students vocabulary. A hiring model may raise fairness and accountability concerns. A school monitoring system may raise privacy and autonomy concerns. A medical triage system may raise non-maleficence and responsibility concerns.

But the same paper also highlights the weakness of principle lists: agreement on words does not imply agreement on implementation. Two organizations can both say "fairness" while meaning different metrics, different legal duties, different populations, or different remedies.

So the first teaching rule is:

```text
An AI ethics principle is not an answer.
It is a pointer to a question that still needs context.
```

## Governance Turns Principles into Commitments

Corrêa et al. extend the map from principles to governance documents. Their Patterns paper reviews 200 AI governance policies and ethical guidelines, identifies recurring principles, and releases an open dataset and tool for comparing the documents.

For teaching, this matters because governance forces students to move from abstract values to institutional commitments.

| Principle language | Governance question |
|---|---|
| Transparency | What must be disclosed, to whom, at what time, and in what form? |
| Fairness | Which protected groups, error rates, remedies, and appeal paths matter? |
| Responsibility | Who is accountable when the model causes harm: developer, deployer, vendor, teacher, institution, or user? |
| Privacy | What data is collected, retained, inferred, shared, or made contestable? |
| Safety | What failure modes must be tested before release, and who can stop deployment? |

This is where students stop treating AI ethics as personal opinion. Governance asks whether a principle has teeth: process, ownership, documentation, auditability, redress, and enforcement.

## Research Literature Adds the Problem Space

Giarmoleo et al. reviewed 309 AI ethics articles and organized concerns into two broad groups:

```text
AI design concerns
human-AI interaction concerns
```

That distinction is practical. Some ethical failures are built into the system design: data selection, optimization target, opacity, robustness, security, or biased training signals. Other failures emerge when people interact with the system: over-reliance, deskilling, surveillance, responsibility gaps, manipulation, or institutional misuse.

For students, this gives a diagnostic habit:

```text
Is the problem inside the model/system design,
or does it emerge from the way people and institutions use it?
```

Often the answer is both. A classroom chatbot may hallucinate because of model limitations, but it becomes an ethical problem when a school deploys it without source grounding, teacher oversight, appeal paths, or student privacy rules. A code assistant may generate insecure code because of training patterns, but it becomes an organizational risk when teams merge code without tests or review.

The research literature also helps avoid a common mistake: treating AI ethics as only "bias." Bias is important, but not sufficient. AI ethics can also include accountability, privacy, autonomy, opacity, environmental cost, labor conditions, safety, human judgment, and social consequences.

## Lived Realities and Power Structures Are the Missing Layer

Groen, Sharon, and Becker offer a useful recent frame. They argue that AI ethics literature can be read through three lenses:

```text
principles
lived realities
power structures
```

The principle lens asks what values should guide AI. The lived-realities lens asks how AI changes everyday human experience in specific contexts. The power-structures lens asks how AI is embedded in economic, political, institutional, and social arrangements.

That is the strongest teaching angle. Students need all three lenses:

| Lens | Classroom question | What students learn |
|---|---|---|
| Principles | What value is at stake? | Ethical vocabulary |
| Lived realities | How does this system change daily life for affected people? | Context and human consequences |
| Power structures | Who owns, controls, profits from, or is disciplined by the system? | Accountability and social analysis |

For example, an AI proctoring tool can be described with principles: privacy, fairness, transparency, responsibility. But the lived-reality lens asks what it feels like for students to be watched, misclassified, interrupted, or forced to prove innocence. The power lens asks why the institution adopted surveillance instead of assessment redesign, who sells the system, who can appeal, and whose behavior is treated as suspicious.

That is a better AI ethics lesson than "remember the five principles."

## A Teaching Template

Use this four-layer template for any AI system:

```text
1. Principle
   What ethical value is being invoked?

2. Design concern
   What can go wrong inside the data, model, interface, or optimization target?

3. Governance commitment
   What policy, audit, documentation, appeal, or accountability mechanism exists?

4. Lived reality and power
   Who experiences the consequence, who can contest it, and who benefits?
```

A short classroom version:

| AI system | Principle | Design concern | Governance question | Lived reality / power question |
|---|---|---|---|---|
| AI essay grader | Fairness | Rubric drift, dialect bias, weak reasoning detection | Can students appeal and see criteria? | Who is pressured to write for the grader instead of the teacher? |
| Hiring recommender | Justice | Proxy variables and historical bias | Who audits adverse impact? | Who is filtered out before a human sees them? |
| Medical triage model | Non-maleficence | Distribution shift and calibration failure | Who signs off on deployment and monitoring? | Which patients are over-triaged or under-triaged? |
| Classroom chatbot | Privacy | Collection of sensitive learning data | What is logged, retained, and shared? | Which students become dependent, exposed, or surveilled? |
| Coding agent | Responsibility | Insecure generated code and hidden dependency changes | What tests and reviews gate merge? | Who is accountable when automated work causes production failure? |

The point is not to make every student a philosopher or compliance officer. The point is to give them a repeatable inspection routine.

## The Strongest Synthesis

Together, these papers can be read as supporting a practical lesson:

```text
AI ethics is not a list of principles.
It is a chain from values to systems to institutions to lived consequences.
```

Principles help name what matters. System analysis shows where failures can enter. Governance shows whether accountability exists. Lived-reality and power analysis shows whether the people affected by AI have agency, remedy, and voice.

This is also why "responsible AI" programs can become weak if they stop at published principles. A company can publish a fairness principle while shipping a system that users cannot understand, contest, or escape. A school can write an academic-integrity policy while ignoring whether its AI tools change student agency, privacy, or assessment design. A research lab can discuss safety while leaving data labor, compute concentration, and deployment incentives outside the ethical frame.

## Caveats

Do not over-read the surveys.

- Jobin et al. is a strong historical anchor, but it studies guidelines available up to 2019.
- Giarmoleo et al. is broad and systematic, but its corpus runs through December 2021, before the full post-ChatGPT wave of generative AI deployment.
- Corrêa et al. gives a bigger governance corpus, but governance documents are not the same as enforcement.
- Groen, Sharon, and Becker give a useful conceptual frame, but they explicitly note the limits of an English-language literature base.
- All four papers mostly map published discourse: guidelines, policies, and research literature. That is not the same as deployed-system behavior, enforcement practice, or the priorities of affected communities.
- Corpus selection, language access, and institutional representation can shape what a review sees and what it misses.

So the right conclusion is not "these four papers solve AI ethics." The right conclusion is:

```text
These four papers give students a map for asking better ethical questions.
```

## Reading Path

Read them in this order:

1. [Jobin, Ienca, and Vayena 2019](https://www.nature.com/articles/s42256-019-0088-2) for the classic principle map.
2. [Corrêa et al. 2023](https://doi.org/10.1016/j.patter.2023.100857) for the larger governance-document view.
3. [Giarmoleo et al. 2024](https://doi.org/10.1111/basr.12336) for the academic literature map of concerns, proposed solutions, and ethical approaches.
4. [Groen, Sharon, and Becker 2026](https://link.springer.com/article/10.1007/s43681-025-00955-7) for the more mature frame: principles, lived realities, and power structures.

That sequence teaches a clean progression:

```text
what people say AI should respect
  -> how institutions write those values down
  -> what the research literature says can go wrong
  -> how actual people and power structures are changed
```

## Related Reading

- [AI Education Search-Space Design - Make Students Wider Before Faster](/learnAIDoc/wiki/ai-education-search-space-design/)
- [What Researchers Should and Shouldn't Use LLMs For](/learnAIDoc/wiki/researcher-llm-use-boundaries/)
- [CS329A Agent-System Literacy - The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [How AI Agents Cheat Benchmarks - Berkeley's Wake-Up Call](/learnAIDoc/wiki/ai-agent-benchmark-cheating/)
