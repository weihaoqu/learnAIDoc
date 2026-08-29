# Verification Record

## Artifact checks

- 13 slide PNGs, 13 SVGs, and 13 prompt/speaker-note files.
- Every slide PNG is 1600x900.
- Classroom timing sums to 60 minutes.
- PDF contains 13 pages.
- PPTX contains 13 slides and 13 notes sections.
- Public cover, contact sheet, PDF, and PPTX match their source-package copies by SHA-256.
- All 13 slides and the contact sheet were visually inspected at full resolution.
- Jekyll build passed under Homebrew Ruby 3.3.
- Built wiki, cover, contact sheet, PDF, and PPTX exist in `_site`.

## Citation audit

All four external citation links were opened successfully during research and checked again before release.

| Claim | Primary source | Evidence checked |
|---|---|---|
| Self-Refine uses same-model feedback and iterative refinement | https://arxiv.org/abs/2303.17651 | Section 2 and Algorithm 1 |
| Reported gains varied by task; math gains were small; oracle feedback helped; later iterations diminished | https://arxiv.org/abs/2303.17651 | Sections 3.2-3.3, Section 4, and Appendix H |
| Reflexion stores textual reflection from task feedback for later trials | https://arxiv.org/abs/2303.11366 | Abstract and method description |
| CRITIC uses external tools to obtain feedback for verification and revision | https://arxiv.org/abs/2305.11738 | Abstract and framework description |
| Intrinsic self-correction did not reliably improve studied reasoning and could degrade it | https://arxiv.org/abs/2310.01798 | Abstract and reported experiments |

## Claim boundary

The paper findings are presented as reported evidence from specific experiments. The suitability gate, seven-step loop, verifier ladder, situation matrix, worked example, classroom timing, and assignment rubric are labeled as teaching synthesis rather than research findings from one cited paper.

## Existing warnings

The successful Jekyll build emitted three unrelated, pre-existing Liquid warnings in `_wiki/research-kb-zotero-obsidian.md` at lines 109, 116, and 122.
