#!/bin/sh

# Get current date for the commit message
current_date=$(date +"%Y-%m-%d %H:%M:%S")

# Add all changes
git add .

# Commit with a standard message including the date
git commit -m "chore: auto commit ${current_date}"

# Push to the current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
git push origin $current_branch 