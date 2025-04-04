#!/bin/bash

# Store the current state
git stash push -m "Backup before auto-commit" && echo "✔ Backed up original state in git stash"

# Fix linting and formatting issues
echo "🔍 Fixing linting and formatting issues..."
npm run lint:fix

# Stage all changes
git add .

# Create commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "chore: auto commit $TIMESTAMP"

# Run pre-push checks
echo "🔍 Running pre-push checks..."
if npm run lint; then
    # If checks pass, push the changes
    git push && echo "✅ Changes pushed successfully"
else
    # If checks fail, restore the original state
    echo "❌ Pre-push checks failed. Restoring original state..."
    git reset --hard HEAD^
    git stash pop
    exit 1
fi 