---
title: "Mathematical Foundations of Reinforcement Learning — Free Textbook by Shiyu Zhao"
date: 2026-04-17
category: AI Education
tags: [reinforcement-learning, textbook, mathematics, free-resource, machine-learning, education, westlake-university]
related: []
icon: "📐"
image: "/assets/images/math-foundations-reinforcement-learning.png"
---

[Mathematical Foundations of Reinforcement Learning](https://github.com/MathFoundationRL/Book-Mathematical-Foundation-of-Reinforcement-Learning/) is a free textbook by Shiyu Zhao (Westlake University) that teaches RL from a mathematical perspective. Unlike most RL books that focus on algorithm procedures, this one explains *why* algorithms are designed the way they are and *why* they work. Published by Springer and Tsinghua University Press (2025), with 10,000+ GitHub stars and 54+ bilingual video lectures totaling 2.1M+ views.

*Source: [GitHub Repository](https://github.com/MathFoundationRL/Book-Mathematical-Foundation-of-Reinforcement-Learning/) | [Springer](https://link.springer.com/content/pdf/10.1007/978-981-97-3944-8.pdf) | [Author Homepage](https://www.shiyuzhao.net/opencourse) | [Amazon](https://www.amazon.com/Mathematical-Foundations-Reinforcement-Learning-Shiyu/dp/9819739438)*

## Why This Book Stands Out

The core differentiator is **math-first pedagogy with controlled depth**:

- **Explains the "why"** — not just how to run value iteration, but why Bellman equations guarantee convergence and why policy gradients work
- **Gray-box design** — deeper mathematical content is placed in shaded boxes that readers can selectively engage with based on their comfort level
- **Unified examples** — every concept and algorithm is illustrated using a single grid-world environment, so readers build cumulative intuition instead of context-switching between toy problems
- **Progressive structure** — each chapter builds on the previous one in a coherent learning path

## Chapter Overview

The book is structured in two parts across 10 chapters:

### Part 1 — Foundational Tools

| Chapter | Topic |
|---|---|
| 1 | Basic Concepts (MDPs, states, actions, rewards, policies) |
| 2 | Bellman Equation |
| 3 | Bellman Optimality Equation |

### Part 2 — Algorithms

| Chapter | Topic |
|---|---|
| 4 | Value Iteration and Policy Iteration |
| 5 | Monte Carlo Methods |
| 6 | Stochastic Approximation and Temporal-Difference Methods |
| 7 | Temporal-Difference Methods (continued) |
| 8 | Value Function Approximation |
| 9 | Policy Gradient Methods |
| 10 | Actor-Critic Methods |

## Companion Resources

| Resource | Details |
|---|---|
| **Video Lectures** | 54+ segments on [YouTube](https://www.youtube.com/@shiyuzhao) and [Bilibili](https://www.bilibili.com/) (Chinese + English) |
| **Code** | Community implementations in Python, MATLAB, R, and C++ |
| **Slides** | LaTeX/Beamer lecture slides (source available upon request) |
| **Study Notes** | Community-contributed supplementary materials |

## How It Compares to Other RL Textbooks

| Book | Approach | Best For |
|---|---|---|
| **Sutton & Barto** (2018) | Intuition-first, broad coverage, foundational | First exposure to RL; conceptual understanding |
| **Szepesvari** (2010) | Dense, proof-heavy, ~100 pages | Convergence proofs, regret bounds, theory researchers |
| **Zhao** (2025) | Math-first but readable, controlled depth | Understanding *why* algorithms work; bridge between intuition and theory |
| **Xiao** (2022) | Unified math framework + Python code | Implementation-oriented learners who want both theory and code |

**Sutton & Barto** is the standard first read — it builds intuition through examples and pseudocode, with math in optional shaded boxes. Zhao's book is the natural second read: it takes concepts you already intuit and gives you the mathematical machinery to understand them rigorously. Where Sutton & Barto says "this works," Zhao shows you the proof of *why* it works — but without the density of Szepesvari's monograph.

The controlled depth is the key insight. Many students bounce off rigorous RL theory because the gap between Sutton & Barto and a measure-theoretic treatment is too large. Zhao fills that gap precisely.

## How LearnAI Team Could Use This

### Teaching RL Courses

- **Graduate RL seminar** — use as the primary textbook. The chapter structure maps cleanly to a semester: Part 1 in weeks 1-5, Part 2 in weeks 6-14
- **Undergraduate AI course** — assign specific chapters (1-4) alongside Sutton & Barto for students who want deeper understanding
- **Math for ML course** — the Bellman equation chapters are excellent standalone material on dynamic programming and fixed-point theory
- **Flipped classroom** — assign the bilingual video lectures as pre-class material, use class time for working through gray-box proofs together

### Self-Study Path for Team Members

```
Week 1-2: Chapters 1-3 (foundations + Bellman equations)
    → Watch corresponding video lectures
    → Run grid-world code examples
Week 3-4: Chapters 4-6 (value iteration, MC, TD)
    → Compare with Sutton & Barto chapters on same topics
    → Note where mathematical insight changes your understanding
Week 5-6: Chapters 7-10 (function approximation, policy gradients, actor-critic)
    → Connect to modern deep RL (PPO, SAC) built on these foundations
```

### Research Applications

- Students working on RL-related projects get a rigorous reference for convergence properties and algorithm design rationale
- The mathematical framework helps when reading RL papers that assume familiarity with Bellman operators, contraction mappings, and stochastic approximation theory
- Gray-box sections serve as a bridge to more advanced references (Bertsekas, Puterman) for students heading into theory research

## Real-World Use Cases

| Use Case | How This Book Helps |
|---|---|
| **Robotics control** | Understanding why policy gradient methods converge (or don't) in continuous action spaces |
| **Game AI** | Mathematical foundation for value iteration and Monte Carlo tree search variants |
| **Recommendation systems** | Bellman equation framework applies directly to sequential recommendation as an MDP |
| **LLM alignment (RLHF)** | Policy gradient and actor-critic chapters provide the mathematical foundation for PPO — the algorithm behind RLHF |
| **Operations research** | Dynamic programming chapters connect RL to classical optimization |
| **Autonomous driving** | Function approximation theory explains when and why deep RL generalizes (or fails to) |

The RLHF connection is particularly timely: anyone working with LLM fine-tuning benefits from understanding *why* PPO works, not just how to call `trl.PPOTrainer()`. Chapters 9-10 on policy gradients and actor-critic methods provide exactly that foundation.

## About the Author

Shiyu Zhao is an Associate Professor and Director of the Intelligent Unmanned Systems Laboratory at Westlake University, Hangzhou, China. PhD in Electrical and Computer Engineering from the National University of Singapore (2014). The book originated from his graduate-level RL lecture notes developed since 2019.
