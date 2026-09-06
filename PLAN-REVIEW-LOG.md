# Plan Review Log: AI Ethics Classroom Grill Lab

Act 1 (grill) complete — plan locked with Q. MAX_ROUNDS=5.

## Round 1 — Codex

Verdict: REVISE.

Material findings:

- Name the four papers and map their ideas to the classroom prompts.
- Treat the eight-minute primer as operational heuristics, not compressed literature summaries.
- Add an equivalent no-login critique pathway and concrete prohibited-upload examples.
- Reduce identity exposure on shared devices and avoid describing the baseline lock as proof.
- Specify versioned export/import validation, conflict handling, and locked-state restoration.
- Make the report visible before print and keep fallback templates aligned with the web schema.
- Define concrete accessibility, citation, source-calibration, and authorship checks.
- Tighten the 70-minute deliverables.
- Specify that DOCX/PDF templates are prebuilt static assets.

### Codex's response

Accepted all source, privacy, fallback, export/import, report-parity, accessibility, content-review, and authorship findings. Rejected the recommendation to reduce the required classroom questions to 6–8 because Q explicitly requires roughly half of the original 26. The revised plan keeps 13 substantive questions but limits them to five short baseline responses and eight one- or two-sentence variation prompts; deeper development belongs in the three-day report.

## Round 2 — Codex

Verdict: APPROVED.

The reviewer found no remaining blocker. Two residual risks were retained:

- Static DOCX/PDF templates can drift unless the canonical field list is a durable source of truth.
- Playwright WebKit is not identical to testing Safari itself, especially for print behavior.

### Codex's response

Added a versioned JSON report-field manifest with explicit HTML/DOCX/PDF parity verification. Kept automated Chromium and WebKit coverage, while adding actual Safari print preview to Q's required local-test checklist rather than claiming WebKit proves Safari behavior.

## Final implementation review — Codex

Initial verdict: REVISE.

- Removed the `group-members` identity field from group-packet exports.
- Changed partial group-packet imports to merge present fields without erasing omitted local work.
- Added explicit guidance that identifiers entered into free-form group answers will be exported and must be removed before sharing.
- Clarified that the no-JavaScript page is read-only and cannot be used to complete the sequenced activity.
- Added privacy, partial-merge, malformed-packet, and full-backup replacement regression coverage.

Re-review verdict: APPROVED. No material issue remained in the corrected sections. Residual manual check: Playwright WebKit is not an actual Safari print-preview test.
