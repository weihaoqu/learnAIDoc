# CS329A Series Verification Report

Date: 2026-08-29

## Scope

This report covers the nine local CS329A lecture packages, their wiki pages, publication copies, course hub, cover images, cross-links, Obsidian notes, and Jekyll output.

## Artifact Counts

The package audit reported the following for every part:

| Artifact | Per part | Series total |
|---|---:|---:|
| Slide PNGs | 12 | 108 |
| Slide SVGs | 12 | 108 |
| Slide prompts | 12 | 108 |
| PDF pages | 12 | 108 |
| PPTX slides | 12 | 108 |
| PPTX speaker-note sections | 12 | 108 |

The audit used `pdfinfo`, PPTX ZIP entry counts, and filesystem counts. It returned success for Parts 1-9.

## Publication-Copy Integrity

For every part, SHA-256 hashes were compared between the slide workspace PDF/PPTX and the corresponding files under `assets/decks/`. Every pair matched.

## Wiki and Link Integrity

- Required front-matter fields were checked for the nine part pages and the course hub: `title`, `date`, `category`, `tags`, `related`, `icon`, and `image`.
- Every referenced cover file exists.
- Every `/learnAIDoc/assets/...` link in the course pages resolves to a local file.
- Every `/learnAIDoc/wiki/...` link in the course pages resolves to a source page.
- Every title in the `related` arrays resolves exactly to a wiki title.

## Visual Inspection

Contact sheets for Parts 1-9 were inspected. The audit found no slide-level clipping, blank output, or incoherent overlap. Selected full-resolution slides and cover images were also inspected during package production.

## Obsidian

The Obsidian CLI lists notes for Parts 1-9 and the course hub under `obsidian-notes-batch/`. The course hub reports nine backlinks.

## Jekyll Build

The final build completed successfully with Homebrew Ruby 3.3 and Bundler 4.0.9:

```bash
export PATH="$(brew --prefix ruby@3.3)/bin:$PATH"
bundle exec jekyll build --config _config.yml,/tmp/cs329a-jekyll-exclude.yml
```

The temporary second config excluded `vendor/` from Jekyll scanning. Ten course pages and sampled deck/cover assets were confirmed in `_site/`.

Three pre-existing Liquid warnings remain in `_wiki/research-kb-zotero-obsidian.md` at lines 109, 116, and 122. They are unrelated to the CS329A files.

## Source-Calibrated Corrections Preserved

- Part 6 identifies DeepSeekMath's `51.7%` result as MATH, not AIME.
- Part 8 treats DeepScholar's `19%` and `31%` as different version snapshots, not a trend.
- Part 9 keeps `88.7%` local-routing coverage separate from the `71.3%` longitudinal win/tie-rate endpoint.

## Independent Review

The final integration review requested canonical title and related-link normalization. Those changes were applied. The bounded re-review returned:

> PASS. No substantive correction needed. Canonical hub title, Part 1-9 titles, cross-links, and course-map labels are consistent.

No commit or push was performed as part of this verification.
