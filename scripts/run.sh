#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -f "$ROOT_DIR/.env" ]; then
  export $(grep -Ev '^#' "$ROOT_DIR/.env" | xargs)
fi

cd "$ROOT_DIR"
node src/index.js
