---
title: "Agent AI Survey — Multimodal and Embodied Agents Beyond Chatbots"
date: 2026-07-31
category: Learning Resources
tags: [agent-ai, multimodal-agents, embodied-ai, survey-paper, arxiv, fei-fei-li, microsoft-research, robotics, gaming, healthcare, agentic-ai]
related: ["AI Agent Primer — The Vocabulary Ladder and 18-Step Workflow", "7 Agent Architectures — From Single Agent to Enterprise Graph Workflows", "What is Agentic Engineering? A Teaching Primer", "Agentic AI Engineer Roadmap 2026 — Eight Pillars from Prompt to Production", "AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record"]
icon: "🤖"
image: "/assets/images/agent-ai-multimodal-interaction-survey.png"
---

**Agent AI: Surveying the Horizons of Multimodal Interaction** is a January 2024 survey paper by Zane Durante, Qiuyuan Huang, Naoki Wake, Ran Gong, Jae Sung Park, Bidipta Sarkar, Rohan Taori, Yusuke Noda, Demetri Terzopoulos, Yejin Choi, Katsushi Ikeuchi, Hoi Vo, Li Fei-Fei, and Jianfeng Gao. It is worth keeping in the wiki because it gives students a vocabulary for **multimodal and embodied agents**: systems that perceive language, vision, context, and environment state, then act in physical or virtual worlds.

Read it as a conceptual map, not as a 2026 state-of-the-art catalog. The agent literature moved quickly after this paper, but the paper's framing remains useful for understanding why agents are more than chatbots with tools.

*Source: [arXiv:2401.03568](https://arxiv.org/abs/2401.03568) (submitted Jan 7, 2024; revised Jan 25, 2024) | [ar5iv HTML rendering](https://ar5iv.labs.arxiv.org/html/2401.03568) | [Microsoft Research Agent AI publications](https://www.microsoft.com/en-us/research/project/agent-ai/publications/)*

## Core Definition

The paper defines Agent AI as interactive systems that can:

| Capability | Student translation |
|---|---|
| Perceive multimodal input | Read language, images, video, audio, environment state, and human behavior |
| Ground behavior in an environment | Know what is happening in a physical, simulated, or virtual scene |
| Predict next embodied actions | Decide what action should happen next, not just what text should be emitted |
| Use knowledge, feedback, and sensory context | Combine foundation models with external knowledge and human/environment feedback |
| Produce meaningful action | Move, navigate, manipulate, respond, explain, or coordinate in the world |

This is the important shift: **LLM agents are not only planning over text; multimodal agents are planning over environments.**

## What The Paper Covers

The survey is broad. A useful reading map:

| Section family | What to look for |
|---|---|
| Agent AI integration | How foundation models are used as building blocks, and where hallucination, bias, privacy, interpretability, and regulation enter |
| Agent AI paradigm | Why the authors frame LLMs/VLMs as parts of an agent transformer-style system |
| Agent learning | Reinforcement learning, imitation learning, in-context learning, optimization, infrastructure, and pretraining/fine-tuning |
| Agent categorization | Embodied agents, action agents, interactive agents, simulation agents, generative agents, knowledge/logical agents, LLM/VLM agents |
| Application tasks | Gaming, robotics, healthcare, multimodal understanding, video-language experiments, and NLP agents |
| Cross-reality transfer | How agents might move between simulation, games, robotics, AR/VR/MR, and real-world settings |
| Datasets and leaderboards | Why agent progress needs environment-grounded benchmarks, not only static QA scores |
| Ethics and broader impact | Privacy, safety, social impact, bias, and accountability for embodied systems |

For students, the fastest path is to read the abstract, contents, introduction overview, and application sections first. Then pick one application domain and trace how perception, action, environment, data, and evaluation fit together.

## Why It Matters

Most beginner explanations collapse agents into this formula:

```text
Agent = LLM + tools + memory
```

That is useful for coding agents, but incomplete for embodied and multimodal agents. This paper pushes a richer formula:

```text
Agent AI = foundation model
         + multimodal perception
         + grounded environment
         + action prediction
         + feedback loop
         + evaluation in context
```

That framing helps students understand why a robot, game NPC, healthcare assistant, and AR/VR companion are all "agent" problems, even though their tools and risks differ.

## Grill Notes: From Multimodal to Agentic

After grilling this post as a learning exercise, the cleanest reading lens is:

```text
Multimodal ability = the model can understand different sources of information.
Agentic ability = the system can use perception, state, goals, actions, and feedback inside an environment.
```

This distinction matters because a model that only describes an image or video is not automatically Agent AI. If an AI watches a classroom video and says "three students look confused," that is mostly multimodal perception. It becomes closer to Agent AI when it chooses an intervention, shows a different explanation, observes the response, and adjusts the next step.

### Multimodal Is Not Automatically Agentic

The common beginner mistake is to equate "can see images" with "agent." A better test is:

```text
Can the system perceive context, choose an action, affect the environment,
observe feedback, and decide what happens next?
```

For education, this separates two different systems:

| System | What it does | Better label |
|---|---|---|
| Captions a student's presentation video | Describes visible or audible signals | Multimodal model |
| Notices a misconception, selects a reteaching path, gives a quiz, and adapts | Uses perception to guide action and feedback | Multimodal classroom agent |

### Education Risk Pattern

The ethical stakes rise when perception becomes action. A text chatbot can give a wrong answer; a classroom agent can misperceive a student, act on that perception, and change the student's learning path or evaluation.

Two practical risk patterns:

- **Privacy exposure:** images, audio, screen recordings, faces, grades, private messages, teacher feedback, or copyrighted course materials may be captured or uploaded without real consent.
- **Wrong perception -> wrong action:** the system may interpret posture, accent, eye movement, disability, lighting, or camera quality as confusion, disengagement, or cheating, then recommend an unfair intervention.

### Governance Checklist

For classroom use, "AI allowed" or "AI banned" is too weak. A useful course policy should define:

- **Approved tools:** which models or agents students and teachers may use.
- **Allowed uses:** brainstorming, explanation, practice, planning, design exploration, revision, and study support.
- **Forbidden uses:** generating final submitted answers, exam work, undisclosed authorship, or unauthorized upload of course materials.
- **Consent boundary:** no recording or analysis of classroom audio/video, screens, peer work, or teacher materials without explicit permission.
- **Disclosure boundary:** students disclose meaningful AI assistance with a privacy-safe summary; raw prompt logs should not expose private or unauthorized material.
- **Authority boundary:** AI can suggest, but humans keep final authority for grades, discipline, accommodations, and appeals.

The strongest student-facing test is simple:

```text
After using AI, can the student explain, verify, adapt, and defend the work?
```

## Slide Deck

I created a companion teaching deck from the grill path:

- [Accessible HTML deck](/learnAIDoc/assets/decks/agent-ai-survey-grill-learning/agent-ai-survey-grill-learning.html)
- [PPTX deck](/learnAIDoc/assets/decks/agent-ai-survey-grill-learning/agent-ai-survey-grill-learning.pptx)
- [PDF deck](/learnAIDoc/assets/decks/agent-ai-survey-grill-learning/agent-ai-survey-grill-learning.pdf)
- [Contact sheet](/learnAIDoc/assets/decks/agent-ai-survey-grill-learning/contact-sheet.png)

The HTML provides semantic headings and lists, and the PDF provides tagged, selectable text. The PPTX is rebuilt with native text and vector shapes so instructors can edit it; full PowerPoint or PDF/UA accessibility conformance has not been independently certified.

## Teaching Use

| Course moment | How to use the paper |
|---|---|
| Intro to AI agents | Contrast text-only tool agents with embodied multimodal agents |
| Multimodal AI unit | Use the paper's categories to show why image/video/audio are not just extra inputs |
| Robotics or embodied AI | Show how LLM/VLM reasoning becomes useful only when grounded in action and feedback |
| Game AI lecture | Use gaming agents as a low-risk simulated environment for studying perception/action loops |
| AI safety discussion | Ask who is responsible when an embodied agent acts incorrectly in a real environment |
| Research methods | Have students build a table: domain, perception input, action output, evaluation metric, safety risk |

Good assignment:

```text
Pick one Agent AI application domain from the paper.
For that domain, write a one-page design memo:
1. What does the agent perceive?
2. What can it do?
3. What feedback does it receive?
4. What benchmark would prove progress?
5. What is the biggest safety or misuse risk?
```

## Critical Notes

- **It is a survey, not a solved architecture.** The paper gives a map of research areas; it does not provide one production-ready agent stack.
- **Some examples are now dated.** Treat specific 2024 model names and benchmark snapshots as historical context.
- **"Toward AGI" language should be handled carefully.** The paper discusses Agent AI as a route toward more general intelligence, but students should separate research framing from demonstrated capability.
- **Grounding does not automatically remove hallucination.** Environment feedback can reduce some errors, but agents can still misperceive scenes, misuse tools, or optimize the wrong objective.
- **Embodiment raises the stakes.** A wrong answer in chat is one failure mode; a wrong action in robotics, healthcare, or public spaces is another.

## How LearnAI Could Use This

- **Bridge page for agent vocabulary** — link this after the AI Agent Primer so students see how the same terms apply beyond coding agents.
- **Research-skills exercise** — pair this with the Research Skills Starter Pack: use ARS to map follow-up papers, then use citation checking to verify claims.
- **Course project seed** — students choose one agent category and design a minimal benchmark or simulator for it.
- **Wiki cleanup anchor** — when a new agent paper appears, compare it against this paper's categories instead of creating disconnected one-off notes.

## Links

- **Paper:** [arXiv:2401.03568 — Agent AI: Surveying the Horizons of Multimodal Interaction](https://arxiv.org/abs/2401.03568)
- **HTML rendering:** [ar5iv](https://ar5iv.labs.arxiv.org/html/2401.03568)
- **Project/publications page:** [Microsoft Research Agent AI](https://www.microsoft.com/en-us/research/project/agent-ai/publications/)
