#!/usr/bin/env bash
# Compute the same render hash locally that the CI workflow uses.
# Useful for checking "would CI re-render?"
#
# Usage: bash scripts/render-hash.sh

set -euo pipefail

HASH=$(find src/ public/ package.json remotion.config.ts tsconfig.json \
  -type f 2>/dev/null | sort | xargs sha256sum | sha256sum | awk '{print $1}')

echo "Render hash: $HASH"
echo "Cache key:   render-${HASH}"
