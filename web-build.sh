#!/bin/bash

# Check if the current branch is your production branch
if [ "$CF_PAGES_BRANCH" == "main" ]; then
  echo "🚀 Running Production Build..."
  pnpm build:web:production
# Check if branch is 'develop' OR matches the pattern 'release/*'
elif [[ "$CF_PAGES_BRANCH" == "develop" || "$CF_PAGES_BRANCH" == release/* ]]; then
  echo "🚧 Running Staging Build for branch: $CF_PAGES_BRANCH"
  pnpm build:web:staging
fi