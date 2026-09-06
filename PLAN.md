# Plan: AI Ethics Classroom Grill Lab
_Locked via grill — by Codex + Q_

## Goal
Build a self-contained, instructor-paced AI ethics classroom experience for 11 general undergraduate students with no formal ethics prerequisite. In a 70-minute class, students first establish an individual, ungraded, no-AI baseline; then work in groups of 4, 4, and 3 through progressive case variations; use equally provisioned Claude for Education browser accounts only after the baseline is locked; evaluate AI-generated criticism; and produce a structured record that becomes a graded report submitted to eCampus within three days. The exercise must faithfully connect classroom decisions to four AI ethics review papers while clearly labeling the policy framework as an instructional synthesis rather than a framework directly asserted by those papers.

## Approach
1. Add a student-facing Jekyll wiki page using the existing lab layout and progressive-enhancement pattern.
2. Teach an eight-minute four-paper primer using four operational prompts: principle ambiguity, implementation, rules plus judgment, and lived realities plus power.
   - Anna Jobin, Marcello Ienca, and Effy Vayena (2019), *The global landscape of AI ethics guidelines*: shared principles do not guarantee shared definitions.
   - Nicholas Kluge Corrêa et al. (2023), *Worldwide AI Ethics*: repeated principles need operational governance and enforcement.
   - Gaetano Giarmoleo et al. (2024), *What ethics can say on artificial intelligence*: act-centered rules and agent-centered judgment are complementary responses.
   - Elizabeth M. Groen, Tamar Sharon, and Marcel Becker (2026), *An overview of AI ethics*: principles must be examined alongside lived realities and power structures.
   Present these as four usable decision prompts rather than compressed paper summaries; put paper-specific nuance, citations, and cautions in expandable source cards and report guidance.
3. Implement an individual pre-AI checkpoint with five substantive baseline questions plus confidence and a no-AI confirmation. Make it required but ungraded, lock it after submission, and explain that the lock is a reflection aid rather than tamper-proof evidence.
4. Implement eight additional substantive questions across three controlled case variations, producing 13 substantive classroom questions total:
   - access and fairness;
   - privacy and unauthorized uploads;
   - shared accountability under vague rules;
   - allowed, borderline, and prohibited use;
   - principle-to-practice governance;
   - act-centered rules plus agent-centered education;
   - evidence that AI strengthened rather than replaced learning;
   - strongest counterargument and policy revision.
5. Require the classroom progression: individual commitment -> locked baseline -> small-group deliberation -> external Claude critique -> student evaluation -> revised answer -> cross-group defense -> individual exit reflection.
6. Provide a reusable Claude critic prompt. Instruct students to use Claude in the browser, paste only the prewritten fictional case and provisional policy, and record accepted, rejected, and verified advice. Explicitly prohibit names, student responses, instructor feedback, peer work, unpublished course materials, grades, identifiers, and confidential or personal data. State that Claude is a critic, not a scholarly source; any claim attributed to a paper must be checked against the supplied source card or citation. Provide an equivalent instructor-prepared critique card when login, access, or connectivity fails.
7. Add a student decision ledger and assemble the final policy around Allow -> Disclose -> Protect -> Assess.
8. Add a facilitator wiki page with the 70-minute run-of-show, group roles, 4/4/3 grouping, reveal instructions, fixed micro-outputs, counterexample cards, likely misconceptions, and debrief prompts.
9. Store all student data in browser local storage only. Keep identity fields optional until final export. Add explicit backup export and restore, copyable session text, reset controls, and clear privacy/loss warnings. Warn students using shared or public browsers to export, verify the backup, reset the activity, and close the session. Do not add analytics, a database, authentication, or direct eCampus integration.
10. Define a versioned JSON backup schema. Validate imported type, version, required fields, and field lengths; reject malformed or unsupported imports without changing current work. Before replacing an existing session, show a metadata preview and require confirmation. A restored baseline retains its prior locked state and cannot be silently unlocked.
11. Use the term **baseline snapshot** consistently. Explain that the snapshot supports reflection and comparison but is not secure, tamper-proof, or evidence of academic integrity.
12. Generate a plain, fully visible HTML report preview containing identity fields, locked baseline, group reasoning, case revisions, AI-use appendix, four-paper application, final policy, and individual reflection. Separate fields into **individual only**, **group-authored**, and **AI-assisted but student-evaluated** sections. Treat browser Print / Save as PDF as the official eCampus artifact, publish tested-browser guidance, and require students to inspect the preview before printing.
13. Add prebuilt downloadable DOCX and PDF fallback report templates committed as static assets. Make a versioned JSON report-field manifest the source of truth; verify that every required field appears in the HTML preview, DOCX, and PDF so later drift fails verification visibly.
14. Add a 20-point report rubric: paper application, visible reasoning revision, operational policy, fairness/privacy/power analysis, evaluation of AI advice, and AI-use documentation. Grade reasoning quality, not a preferred verdict.
15. Link the student lab, facilitator view, and templates from the existing AI ethics college-policy wiki post.
16. Use this 70-minute schedule: 0–8 primer; 8–17 five short individual baseline questions; 17–22 group comparison; 22–46 eight one- or two-sentence prompts across three variations; 46–54 Claude or fallback critique; 54–61 final policy revision; 61–67 cross-group defense; 67–70 exit reflection and report handoff. Full explanations move to the three-day report.
17. Verify front matter, Jekyll build, JavaScript syntax, local persistence, baseline-snapshot behavior, export/import conflicts and malformed files, report-schema parity, content accuracy, citations, synthesis disclaimers, rubric alignment, no-JavaScript readability, and responsive rendering.
18. Verify accessibility with semantic headings, explicit labels, logical focus order, visible focus states, keyboard-only completion, skip navigation, color-contrast checks, status announcements, and no-JavaScript access. Treat the DOCX as the editable fallback; do not describe the generated PDF as tagged or screen-reader-verified.
19. Start a local server and inspect the student and facilitator pages with Playwright Chromium and WebKit at desktop and mobile widths. Check for overflow, unreadable text, broken controls, stage-navigation failures, complete report preview, and print output. State explicitly that Playwright WebKit is not an actual Safari print test and include Safari print preview in Q's local-test checklist before any push.

## Key Decisions & Tradeoffs
- **Thirteen classroom questions, not all 26:** thirteen preserve roughly half of Q's original grill while leaving enough time for thought, AI criticism, revision, and defense. The complete 26-question path remains linked for extended study.
- **Individual baseline before AI:** students must first produce independent reasoning so later change is observable. This is an instructional checkpoint, not surveillance or proof of non-use.
- **External Claude for Education:** students use individual, equally provisioned browser accounts. The static site does not embed an API or handle credentials.
- **Instructor-paced reveals:** students are asked to wait for each reveal, but the static page does not pretend to enforce synchronization securely.
- **Local-only data:** minimizes privacy and infrastructure risk, but requires prominent backup/restore support because browser storage can be lost.
- **PDF as official submission:** browser-generated PDF is portable for eCampus; DOCX/PDF templates are fallbacks, not the primary evidence path.
- **One evolving case:** each variation changes a focused ethical variable so students can identify why their policy changes.
- **Formative pre-quiz, graded report:** the baseline has no correctness score; the later report rewards defensible reasoning and accurate use of all four papers.

## Risks / Open Questions
- Claude for Education provisioning and classroom connectivity must be tested by the instructor before class; a printed counterargument card is required as a fallback.
- Local-storage locking is user-modifiable and must not be described as secure or tamper-proof.
- Browser PDF output varies across platforms; test Chromium and Safari-compatible print behavior, and retain the fallback templates.
- Thirteen questions remain ambitious in 70 minutes. Each variation must require a tightly bounded one- or two-sentence micro-output before deeper report revision.
- Requiring all four papers can produce superficial name-checking. The rubric must require each source idea to support a concrete policy decision.
- Student identity and answers appear in exported files. The page must explain that exported files leave browser-local storage and should be handled through eCampus.
- Group collaboration can obscure individual authorship. The report and interface must visibly distinguish the locked individual baseline and exit reflection from group-authored policy text and AI-assisted analysis.

## Out of Scope
- Direct eCampus API or LTI integration.
- Server-side response collection, instructor dashboards, analytics, or remote reveal controls.
- Automatic ethical scoring or a single correct policy verdict.
- AI detection, proctoring, browser lockdown, or claims that students did not use AI.
- Shared Claude credentials or storage of Claude authentication data.
- Full summaries of all four papers inside the 70-minute activity.
- Automatic submission to eCampus or deployment before Q tests locally and separately approves a push.
