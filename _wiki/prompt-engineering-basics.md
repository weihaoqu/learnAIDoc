---
title: "Prompt Engineering Basics"
date: 2024-02-03
category: AI
tags: [llm, prompting, chatgpt]
---

Key techniques for getting better results from large language models.

## Core Principles

### Be Specific
Instead of "Write about dogs", try "Write a 200-word article about the health benefits of owning a dog, targeting first-time pet owners."

### Provide Context
Give the model relevant background information before asking your question.

### Use Examples (Few-shot)
Show the model what you want:

```
Convert to bullet points:
Input: "The sky is blue. Grass is green."
Output:
- The sky is blue
- Grass is green

Input: "Cats meow. Dogs bark."
Output:
```

## Useful Patterns

### Role Assignment
> "You are an expert Python developer. Review this code..."

### Step-by-Step
> "Think through this step by step before giving your final answer."

### Output Format
> "Respond in JSON format with keys: title, summary, tags"

## Common Mistakes

- Being too vague
- Not iterating on prompts
- Ignoring the model's limitations
- Not providing enough context
