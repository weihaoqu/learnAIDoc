# CS329A Self-Improving AI Agents: Frozen Source Manifest

Accessed: 2026-08-28

## Authoritative Sources

- Official course site and Autumn 2025 schedule: https://cs329a.stanford.edu/
- Official Stanford Online playlist: https://www.youtube.com/playlist?list=PLangBM27OtEA
- Existing LearnAI educational interpretation: `/_wiki/cs329a-agent-system-literacy.md`

The playlist metadata below was resolved directly with `yt-dlp` on 2026-08-28. Video IDs are the stable identifiers used throughout the project.

| Part | Video ID | Duration | Official title | URL |
|---:|---|---:|---|---|
| 1 | `6YnLB0XbTnI` | 1:09:42 | Course Overview | https://www.youtube.com/watch?v=6YnLB0XbTnI |
| 2 | `-Ggc37xLj_Y` | 1:03:20 | Test-Time Compute Scaling | https://www.youtube.com/watch?v=-Ggc37xLj_Y |
| 3 | `p7TdPUcPoik` | 1:12:58 | Robust Verification | https://www.youtube.com/watch?v=p7TdPUcPoik |
| 4 | `Lxh9RF5S-K0` | 1:11:13 | Learning from Feedback with Tools/Code | https://www.youtube.com/watch?v=Lxh9RF5S-K0 |
| 5 | `Ml_fp9XkB8Y` | 1:14:55 | Planning and Multi-Step Reasoning | https://www.youtube.com/watch?v=Ml_fp9XkB8Y |
| 6 | `yVnmHSAy3ck` | 1:12:38 | Train Time Scaling/Scaling RL | https://www.youtube.com/watch?v=yVnmHSAy3ck |
| 7 | `Uni9dqyuuDM` | 1:12:26 | Self-Improvement and Deep Research Agents | https://www.youtube.com/watch?v=Uni9dqyuuDM |
| 8 | `8JAqLnTaZu4` | 1:15:17 | Agentic Evaluations and Long Horizon Tasks | https://www.youtube.com/watch?v=8JAqLnTaZu4 |
| 9 | `AyO6wyu4DEg` | 1:07:42 | Future Research Areas | https://www.youtube.com/watch?v=AyO6wyu4DEg |

## Production Scope

- Part 1 already has a validated deck and teaching guide in `slide-deck/cs329a-lecture-1/`.
- Parts 2-9 each receive a separate evidence package, deck, wiki post, and Obsidian note.
- Part 1 also receives a wiki post and Obsidian note so the published series is complete.
- A series hub links all nine lectures and the existing agent-system-literacy interpretation.
- Midterm presentations and non-playlist course sessions are outside the current scope.

## Reading Inclusion Rule

For each lecture:

1. Include every paper listed for that topic on the official course schedule as a research candidate.
2. Use a paper substantively only when the lecture discusses it or it is necessary to support a slide claim.
3. Optional/background papers may appear in a further-reading section but must not be presented as required lecture content.
4. Use primary sources: the paper, official project page, or official technical report.
5. Record paper page/section anchors for claims that do not come directly from the lecture transcript.

## Claim Traceability Schema

Every slide maps to one or more evidence rows containing:

| Field | Meaning |
|---|---|
| `slide` | Slide number and filename |
| `claim` | Exact teachable claim |
| `source_type` | `lecture`, `paper`, or `interpretation` |
| `anchor` | Video timestamp or paper page/section |
| `confidence` | `high`, `medium`, `low`, or `unknown` |
| `calibration` | Scope limit, assumption, or counterexample |

Interpretations must be visibly labeled in the deck or speaker notes when a learner could mistake them for a direct Stanford claim.

## Naming Convention

- Deck directory: `slide-deck/cs329a-part-NN-<slug>/`
- Deck files: `cs329a-part-NN-<slug>.pptx` and `.pdf`
- Wiki entry: `_wiki/cs329a-part-NN-<slug>.md`
- Published deck assets: `assets/decks/cs329a-part-NN-<slug>/`
- Obsidian note title: `CS329A Part NN - <Title>`

## Per-Lecture Definition of Done

- [ ] Transcript acquired and read in full
- [ ] Representative and transcript-cue frames extracted and inspected
- [ ] Lecture structure and timestamp map written
- [ ] Official reading candidates checked against primary sources
- [ ] Slide-to-evidence ledger complete
- [ ] `analysis.md`, `outline.md`, prompts, and teaching guide complete
- [ ] 10-14 original 1600x900 slides rendered
- [ ] PPTX and PDF exported
- [ ] PNG dimensions, PPTX integrity, notes count, and PDF parity verified
- [ ] Contact sheet and representative PDF pages visually inspected
- [ ] Codex review completed; material feedback fixed and re-reviewed
- [ ] LearnAI wiki entry created with sourced-versus-interpretation note
- [ ] Wiki post embeds or links PPTX, PDF, contact sheet, and teaching material
- [ ] Wiki post reviewed and local site validated
- [ ] Obsidian note created or updated through `obsidian-cli`
- [ ] Session checkpoint saved

## Final Series QA

After every lecture passes its own definition of done:

- Verify hub ordering and all reciprocal links.
- Check that deck and PDF assets resolve under `/learnAIDoc/`.
- Scan for duplicated or contradictory claims across lectures.
- Check visual consistency without forcing identical slide structures.
- Align Part 1 metadata and naming with the rest of the series.
- Build the Jekyll site and run internal-link checks.
- Begin interactive teaching with Part 2; advance one checkpoint at a time.

## Git Boundary

Creation, local validation, and commits are allowed within the requested workflow. `git push` requires a fresh explicit approval from Q after local testing.
