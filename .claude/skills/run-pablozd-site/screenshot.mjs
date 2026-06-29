#!/usr/bin/env node
// Screenshot driver for the pablozd.github.io Jekyll site.
// Usage: node screenshot.mjs <path> <outfile.png> [--selector CSS] [--click TEXT] [--width N] [--height N]
// See SKILL.md in this directory for usage and examples.

const PLAYWRIGHT_PATH = "/home/vscode/.npm/_npx/e41f203b7505f1fb/node_modules/playwright";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node screenshot.mjs <path> <outfile.png> [--selector CSS] [--click TEXT] [--width N] [--height N]");
  process.exit(1);
}

const [urlPath, outfile] = args;
const getFlag = (name, def) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : def;
};
const selector = getFlag("--selector", null);
const clickText = getFlag("--click", null);
const width = parseInt(getFlag("--width", "1000"), 10);
const height = parseInt(getFlag("--height", "700"), 10);

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require(PLAYWRIGHT_PATH);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});

const base = "http://localhost:8080";
await page.goto(base + urlPath, { waitUntil: "networkidle" });

if (clickText) {
  // Scoped to links/buttons with exact text (tabs, nav items) — a plain
  // text= selector also matches body copy (e.g. page descriptions) and
  // clicks the wrong element.
  await page.locator(`a:text-is("${clickText}"), button:text-is("${clickText}")`).first().click();
  await page.waitForTimeout(200);
}

if (selector) {
  await page.locator(selector).first().screenshot({ path: outfile });
} else {
  await page.screenshot({ path: outfile, fullPage: true });
}

await browser.close();
console.log(`Saved ${outfile}`);
if (consoleErrors.length) {
  console.log("Console errors:", JSON.stringify(consoleErrors));
}
