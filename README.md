# My Learning Wiki

A personal wiki to document tricks, skills, and knowledge.

## Local Development

```bash
# Install dependencies
bundle install

# Run locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Adding New Entries

Create a new markdown file in `_wiki/` with this format:

```markdown
---
title: "Your Entry Title"
date: 2024-02-05
category: Programming  # Options: Programming, Tools, AI, Productivity, Other
tags: [tag1, tag2]
related: ["Other Entry Title"]  # Optional
---

Your content here...
```

## Deploy to GitHub Pages

1. Create a new repo on GitHub
2. Initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to repo Settings > Pages
4. Set Source to "Deploy from a branch" and select `main`
5. Your site will be at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Customization

- Edit `_config.yml` to change site title and categories
- Modify `assets/css/style.css` for styling
- Update layouts in `_layouts/` for structure changes
