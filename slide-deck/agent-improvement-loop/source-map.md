# Research Claim Source Map

## Slide 4

### Self-Refine

- Source: https://arxiv.org/abs/2303.17651
- Relevant sections: Section 2, Algorithm 1; Sections 3.2-3.3; Section 4; Appendix H error analysis.
- Supported claim: the same model can generate feedback and iteratively refine; reported gains vary by task; math gains were small; external oracle feedback helped; later iterations show diminishing returns; feedback and revision can be incorrect.

### Reflexion

- Source: https://arxiv.org/abs/2303.11366
- Relevant section: abstract and method description.
- Supported claim: task feedback is converted into textual reflection and retained in episodic memory for later trials without updating model weights.

### CRITIC

- Source: https://arxiv.org/abs/2305.11738
- Relevant section: abstract and framework description.
- Supported claim: external tools provide feedback used to verify and revise outputs.

### Intrinsic self-correction limitation

- Source: https://arxiv.org/abs/2310.01798
- Relevant section: abstract and experiments.
- Supported claim: self-correction without external feedback did not reliably improve reasoning and could degrade it in the studied settings.

## Teaching synthesis

Slides 1-3 and 5-13 are a teaching synthesis derived from the research pattern and agent-engineering practice. The four-question gate, seven-step loop, verifier ladder, situation matrix, worked slide case, classroom timing, and assignment rubric are not presented as findings from any single cited paper.

## Scope boundary

Benchmark findings do not establish effectiveness in every model, classroom, research workflow, or high-stakes domain. The lesson therefore asks students to compare conditions empirically and allows the evidence-verified loop to lose when its overhead is unjustified.
