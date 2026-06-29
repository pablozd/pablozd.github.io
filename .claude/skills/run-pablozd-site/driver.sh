#!/usr/bin/env bash
# Driver for serving/checking the pablozd.github.io Jekyll site.
# Run from the repo root. See SKILL.md in this directory for usage.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
LOG="/tmp/pablozd-jekyll.log"
PORT=8080

cmd="${1:-}"

serve() {
  cd "$ROOT" || exit 1
  pkill -9 -f "jekyll serve" 2>/dev/null
  sleep 1
  rm -rf _site .jekyll-cache .jekyll-metadata
  nohup bundle exec jekyll serve --port="$PORT" --host=0.0.0.0 --force_polling > "$LOG" 2>&1 &
  disown -a

  echo "Waiting for Jekyll to finish building (log: $LOG)..."
  for _ in $(seq 1 60); do
    if grep -q "Server running" "$LOG" 2>/dev/null; then
      echo "Ready: http://localhost:$PORT/"
      return 0
    fi
    if grep -qE "EADDRINUSE|Liquid Exception|Jekyll::Errors|^[A-Za-z:./]+\.rb:[0-9]+:in" "$LOG" 2>/dev/null; then
      echo "Build failed, see $LOG:"
      tail -30 "$LOG"
      return 1
    fi
    sleep 1
  done
  echo "Timed out waiting for server. Last lines of $LOG:"
  tail -30 "$LOG"
  return 1
}

stop() {
  pkill -9 -f "jekyll serve" 2>/dev/null
  cd "$ROOT" && rm -rf _site
  echo "Stopped and cleaned _site."
}

check_langs() {
  cd "$ROOT" || exit 1
  echo "--- es-ar nav (expect: inicio/investigación/docencia/herramientas/cv) ---"
  grep -o '<a class="nav-link[^>]*>[^<]*' _site/index.html
  echo "--- en-us nav (expect: about/research/teaching/tools/cv) ---"
  grep -o '<a class="nav-link[^>]*>[^<]*' _site/en-us/index.html
  echo "--- es-ar footer (expect Spanish 'Sitio de pablozd.ar') ---"
  grep -o 'Sitio de\|Powered by Jekyll' _site/index.html
  echo "--- If es-ar shows English text or en-us shows Spanish text, re-run 'serve' (clean rebuild) — do not trust a live-reloaded build. ---"
}

case "$cmd" in
  serve) serve ;;
  stop) stop ;;
  check-langs) check_langs ;;
  *)
    echo "Usage: $0 {serve|stop|check-langs}"
    exit 1
    ;;
esac
