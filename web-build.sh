#!/bin/bash
set -euo pipefail

echo "🔍 CF_PAGES_BRANCH = '${CF_PAGES_BRANCH:-}'"

if [ "${CF_PAGES_BRANCH:-}" == "main" ]; then
  echo "🚀 Running Production Build..."
  pnpm build:web:production

elif [[ "${CF_PAGES_BRANCH:-}" == "develop" || "${CF_PAGES_BRANCH:-}" == staging ]]; then
  echo "🧪 Running Staging Build for branch: $CF_PAGES_BRANCH"
  pnpm build:web:staging

else
  echo "❌ Error: No build configured for branch '${CF_PAGES_BRANCH:-<unset>}'"
  exit 1
fi