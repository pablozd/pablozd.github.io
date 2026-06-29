---
name: run-pablozd-site
description: Build, serve, screenshot, and verify the pablozd.github.io Jekyll site (bilingual es-ar/en-us, jekyll-polyglot). Use when asked to run, preview, screenshot, or check the site/sitio, or to verify a change to layouts/pages/data/sass before reporting it done.
---

Bilingual (es-ar default, en-us alternate) Jekyll site built with
jekyll-polyglot, jekyll-scholar, and a custom "zdro." theme on top of
al-folio. Driven by two scripts in this skill directory — paths below
are relative to the repo root.

**Always use the driver scripts below to serve and check the site.**
Do not hand-roll `bundle exec jekyll serve` or `npx playwright ...`
calls — they exist because the obvious shortcuts (live-reload,
generic text selectors) silently produce wrong results on this repo
(see Gotchas).

## Prerequisites

Already satisfied in this container (Ruby 3.4, gems, Playwright
Chromium). On a fresh machine:

```bash
bundle install
npx playwright install chromium
sudo env "PATH=$PATH" npx playwright install-deps chromium
```

## Run (agent path)

1. **Serve** (always does a full clean rebuild — see Gotchas):

   ```bash
   bash .claude/skills/run-pablozd-site/driver.sh serve
   ```

   Polls `/tmp/pablozd-jekyll.log` until "Server running" appears (or
   a real build error), then prints `Ready: http://localhost:8080/`.

2. **Check for language mixing** before trusting anything else:

   ```bash
   bash .claude/skills/run-pablozd-site/driver.sh check-langs
   ```

   Prints the es-ar nav, en-us nav, and footer text. es-ar nav must be
   Spanish, en-us nav must be English. If they're mixed, something
   went wrong with the build — re-run `serve` (do not just refresh the
   browser).

3. **Screenshot / interact:**

   ```bash
   node .claude/skills/run-pablozd-site/screenshot.mjs <path> <outfile.png> [options]
   ```

   - `<path>` — site path, e.g. `/`, `/investigacion/`, `/en-us/cv/`
   - `<outfile.png>` — where to save it
   - `--selector "<css>"` — screenshot one element instead of the full page
   - `--click "<exact text>"` — click a link/button by exact text first
     (e.g. a tab) — useful for the tabbed `/investigacion/` and
     `/en-us/research/` pages (tabs: Proyectos/Grupos/Publicaciones/
     Presentaciones/Drafts)
   - `--width N --height N` — viewport size (default 1000x700)

   Examples actually run in this container:

   ```bash
   node .claude/skills/run-pablozd-site/screenshot.mjs / /tmp/home.png --width 900 --height 700
   node .claude/skills/run-pablozd-site/screenshot.mjs /investigacion/ /tmp/pubs.png --click "Publicaciones" --width 900 --height 600
   ```

4. **Stop and clean up when done:**

   ```bash
   bash .claude/skills/run-pablozd-site/driver.sh stop
   ```

## Run (human path)

`bin/entry_point.sh` is the devcontainer's `postAttachCommand` — it
runs `bundle exec jekyll serve --watch` plus an `inotifywait` loop that
restarts Jekyll on `_config.yml` changes. Fine for a human watching a
browser with live-reload; **don't use it as the agent path** — it
doesn't clean `_site`/`.jekyll-cache` between edits, which is exactly
what triggers the language-mixing bug below.

## Gotchas

- **jekyll-polyglot mixes es-ar/en-us on incremental/live-reload
  builds.** Editing files while a `--force_polling` watch process is
  running can produce a page where the nav is in one language and the
  footer in another (`coordinate_documents`'s `@file_langs` cache
  doesn't always reset cleanly across partial rebuilds). The `serve`
  driver command always does `rm -rf _site .jekyll-cache
  .jekyll-metadata` first — never skip that, and never trust a build
  you didn't just (re)start clean. Always run `check-langs` after
  `serve` before screenshotting anything content-related.
- **Two competing CV data sources.** `_layouts/cv.liquid` prefers
  `assets/json/resume_<lang>.json` over `_data/<lang>/cv.yml` *if that
  json file exists*. As of this writing there's no
  `resume_es-ar.json`/`resume_en-us.json`, so both languages render
  from `_data/<lang>/cv.yml` — but if one reappears, edits to the
  matching `cv.yml` will silently have no effect on `/cv/`.
- **Generic Playwright `text=` selectors hit the wrong element on
  `/investigacion/` and `/en-us/research/`.** Those pages repeat tab
  labels in the page description paragraph ("Proyectos,
  publicaciones, presentaciones y drafts.") above the actual tab
  links, so `page.locator('text=Publicaciones').first()` clicks the
  paragraph, not the tab — the page silently doesn't change. The
  `--click` flag in `screenshot.mjs` already works around this by
  scoping to `a:text-is(...), button:text-is(...)`; don't bypass it
  with a raw Playwright script.
- Port 8080 is reused across runs — if `serve` reports `EADDRINUSE`,
  something didn't get killed; `pkill -9 -f "jekyll serve"` manually
  and retry.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `serve` times out / `EADDRINUSE` | A previous server is still bound to 8080. `pkill -9 -f "jekyll serve"`, wait 1s, retry. |
| `Error [ERR_UNSUPPORTED_DIR_IMPORT]` from `screenshot.mjs` | Playwright was installed somewhere other than the path hardcoded as `PLAYWRIGHT_PATH` in `screenshot.mjs`. Find it with `find / -maxdepth 6 -path "*node_modules/playwright" -type d 2>/dev/null` and update the constant. |
| `screenshot.mjs` says `chromium-headless-shell` missing / launch fails | Run `npx playwright install chromium` (full Chromium, not just the headless shell) and `sudo env "PATH=$PATH" npx playwright install-deps chromium`. |
| `check-langs` shows English text on the es-ar nav (or vice versa) | Stale build. Re-run `serve` — it cleans `_site`/`.jekyll-cache` before rebuilding. |
| A `--click` does nothing (page looks unchanged) | The text matched a non-interactive element first. Use a more specific/unique string, or check the element is actually `<a>`/`<button>`. |
