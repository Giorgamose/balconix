# Git Commands Reference - Balconix Project

## Repository Remotes

This project is configured with two remotes:
- **origin**: GitHub (https://github.com/Giorgamose/balconix.git)
- **azure**: Azure DevOps (https://dev.azure.com/georgemaevsky/Balconix/_git/Balconix)

## View Remotes

```bash
# List all configured remotes
git remote -v

# Check current branch
git branch

# Check repository status
git status
```

## Basic Git Workflow

```bash
# Stage all changes
git add .

# Stage specific file
git add <filename>

# Commit changes
git commit -m "Your commit message"

# Push to GitHub (origin)
git push origin main

# Push to Azure DevOps
git push azure main

# Push to both remotes
git push origin main && git push azure main
```

## Pull Latest Changes

```bash
# Pull from GitHub
git pull origin main

# Pull from Azure DevOps
git pull azure main
```

## Branching

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch to existing branch
git checkout branch-name

# List all branches
git branch -a

# Delete local branch
git branch -d branch-name

# Push branch to GitHub
git push origin branch-name

# Push branch to Azure DevOps
git push azure branch-name
```

## Deployment Workflow

```bash
# Quick deploy to both GitHub Pages and Azure Static Web Apps
git add .
git commit -m "Update: describe your changes"
git push origin main

# The GitHub Actions workflow will automatically:
# 1. Build the React app
# 2. Deploy to GitHub Pages
# 3. Deploy to Azure Static Web Apps
```

## View Deployment Status

```bash
# Check recent GitHub Actions workflow runs
gh run list --limit 5

# View specific workflow run
gh run view <run-id>

# Watch current workflow run
gh run watch
```

## Sync Between Remotes

```bash
# Ensure both remotes are in sync
git pull origin main
git push azure main
```

## Undo Changes

```bash
# Discard uncommitted changes in working directory
git checkout -- <filename>

# Discard all uncommitted changes
git reset --hard

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a specific commit
git revert <commit-hash>
```

## View History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View history with graph
git log --graph --oneline --all

# View changes in specific commit
git show <commit-hash>
```

## Working with Tags

```bash
# Create a tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0

# Push all tags
git push origin --tags

# List all tags
git tag -l
```

## Emergency Commands

```bash
# Stash current changes
git stash

# Apply stashed changes
git stash pop

# List all stashes
git stash list

# Force push (use with caution!)
git push origin main --force
```

## Update Remote URLs

```bash
# Update GitHub remote URL
git remote set-url origin https://github.com/Giorgamose/balconix.git

# Update Azure DevOps remote URL (with PAT)
git remote set-url azure https://YOUR_PAT@dev.azure.com/georgemaevsky/Balconix/_git/Balconix
```

## Useful Aliases

Add these to your `~/.gitconfig`:

```bash
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    aa = add .
    pushall = !git push origin main && git push azure main
    lg = log --graph --oneline --all --decorate
```

## Project-Specific Workflows

### Deploy New Feature
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add: new feature description"

# 3. Push to GitHub for review
git push origin feature/new-feature

# 4. After approval, merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

### Hotfix Production Issue
```bash
# 1. Create hotfix branch from main
git checkout main
git checkout -b hotfix/issue-description

# 2. Fix the issue and commit
git add .
git commit -m "Fix: issue description"

# 3. Merge back to main
git checkout main
git merge hotfix/issue-description

# 4. Deploy (push to GitHub triggers automatic deployment)
git push origin main

# 5. Clean up
git branch -d hotfix/issue-description
```

## Troubleshooting

```bash
# If push is rejected
git pull origin main --rebase
git push origin main

# If you have conflicts
git status  # See conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "Resolve merge conflicts"
git push origin main

# If deployment fails, check logs
gh run list
gh run view <run-id> --log
```

## Live URLs

- **Azure Static Web Apps**: https://proud-cliff-0f66cbb03.6.azurestaticapps.net
- **GitHub Pages**: https://giorgamose.github.io/balconix/
- **GitHub Repository**: https://github.com/Giorgamose/balconix
- **Azure DevOps**: https://dev.azure.com/georgemaevsky/Balconix

## Notes

- Every push to `main` branch triggers automatic deployment to both platforms
- Build takes approximately 1-2 minutes
- Changes appear on Azure Static Web Apps immediately after successful deployment
- GitHub Pages may take an additional 1-2 minutes to update
