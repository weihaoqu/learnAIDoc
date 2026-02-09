# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A "Today I Learned" (TIL) wiki built with **Jekyll** and shared via **GitHub Pages**. The goal is to quickly capture and publish bite-sized learnings — primarily around AI, tools, and programming — as Markdown entries that render into a browsable, categorized card-grid site.

## Commands

```bash
# Install dependencies
bundle install

# Run local dev server (http://localhost:4000)
bundle exec jekyll serve

# Build static site (output to _site/)
bundle exec jekyll build
```

There is no test suite or linter configured.

## Architecture

**Jekyll collections-based site** with a two-level template system:

- `_config.yml` — Site config, collection definitions, category list with icons, default front matter values
- `_wiki/` — Content entries (Markdown + YAML front matter). Each entry gets its own page via the `wiki` collection with permalink `/wiki/:categories/:title/`
- `_layouts/default.html` — Base layout (header, content slot, footer)
- `_layouts/entry.html` — Extends default; renders individual wiki entry with cover image, metadata, and related entries
- `index.html` — Home page with Liquid logic: sticky sidebar for category navigation + responsive card grid grouped by category
- `assets/css/style.css` — All styling in one file; uses CSS custom properties for theming, CSS Grid for layout, responsive breakpoints at 900px and 600px
- `assets/images/` — Cover images referenced by entries

## Adding a Wiki Entry

Create a new `.md` file in `_wiki/` with this front matter:

```yaml
---
title: "Entry Title"
date: 2024-02-05
category: AI          # One of: Programming, Tools, AI, Productivity, Other
tags: [tag1, tag2]
related: ["Other Entry Title"]   # optional
icon: "🤖"                       # optional
image: "/assets/images/cover.jpg" # optional
---
```

Categories must match one defined in `_config.yml` under `wiki_categories` for the sidebar navigation to work correctly.

## Key Implementation Details

- **No JavaScript** — All interactivity is CSS-only (hover effects, responsive layout)
- **GitHub Pages gem** (`github-pages ~> 228`) pins all dependencies for compatibility; don't add gems that aren't supported by GitHub Pages
- The sidebar in `index.html` uses Liquid to iterate `site.wiki_categories` and entries are grouped by category using `group_by: "category"`
- Related entries linking works by matching the `related` front matter array against other entry titles
