#!/bin/bash
# Startet lokalen Server, führt den Smoke-Test aus, räumt auf.
# Aufruf: bash _dev/run-smoke.sh [smoke.mjs-Argumente…]
set -u
DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$DIR"
python3 -m http.server 8000 --bind 127.0.0.1 >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
sleep 0.7
export NODE_PATH="${NODE_PATH:-$HOME/tools/node_modules}"
export LD_LIBRARY_PATH="${LD_LIBRARY_PATH:-$HOME/libs/usr/lib/x86_64-linux-gnu}"
node _dev/smoke.mjs "$@"
