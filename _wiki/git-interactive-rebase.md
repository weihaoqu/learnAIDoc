---
title: "Git Interactive Rebase"
date: 2024-02-05
category: Tools
tags: [git, version-control]
related: ["Git Stash Tricks"]
---

Interactive rebase is a powerful Git feature for rewriting commit history.

## Basic Usage

```bash
git rebase -i HEAD~3  # Rebase last 3 commits
```

## Commands Available

In the editor, you can use these commands:
- `pick` - keep the commit as-is
- `reword` - change the commit message
- `edit` - stop for amending
- `squash` - meld into previous commit
- `fixup` - like squash but discard message
- `drop` - remove the commit

## Common Use Cases

### Squash Multiple Commits
When you want to combine several WIP commits into one clean commit:

1. Run `git rebase -i HEAD~n`
2. Change `pick` to `squash` (or `s`) for commits to combine
3. Save and edit the combined commit message

### Reorder Commits
Simply cut and paste lines in the editor to change commit order.

## Tips

- Never rebase commits that have been pushed to shared branches
- Use `git rebase --abort` if something goes wrong
- The `--autosquash` flag works great with `git commit --fixup`
