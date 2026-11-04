#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# src/index.js loads .env through dotenv, including values with spaces.
# Avoid shell word-splitting and evaluating configuration as shell code.
exec node src/index.js
