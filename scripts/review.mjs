#!/usr/bin/env node
// Headless brand review of one campaign folder. No typing needed, so it can run in CI.
//
// Usage:  node scripts/review.mjs campaigns/<name>
//
// Exit codes:
//   0  review ran, no high-severity findings
//   1  review ran, at least one high-severity finding
//   2  review could not run (bad folder, claude failed, no structured output)

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = join(root, "review", "findings.schema.json");
const outPath = join(root, "review", "findings.json");

function fail(message) {
  console.error(`review: ${message}`);
  process.exit(2);
}

const folderArg = process.argv[2];
if (!folderArg) fail("usage: node scripts/review.mjs <campaign-folder>");

// Use a repo-relative path with forward slashes in the prompt.
const folder = relative(root, resolve(folderArg)).replaceAll("\\", "/");
if (!existsSync(join(root, folder))) fail(`folder not found: ${folderArg}`);

// Minify so the schema passes cleanly as one command-line argument.
const schema = JSON.stringify(JSON.parse(readFileSync(schemaPath, "utf8")));

// If the last review was of this same folder, pass its findings along so we don't repeat them.
function previousFindings() {
  if (!existsSync(outPath)) return null;
  try {
    const saved = JSON.parse(readFileSync(outPath, "utf8"));
    if (saved.folder === folder && Array.isArray(saved.findings)) return saved.findings;
  } catch {
    // Unreadable file: treat it as no earlier review.
  }
  return null;
}

const previous = previousFindings();

let prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. ` +
  `Report only real problems.`;

if (previous) {
  prompt +=
    `\n\nThese are findings from the last review. Report only problems that are new or still not fixed. ` +
    `Don't repeat ones that have been fixed.\n\n` +
    JSON.stringify(previous, null, 2);
}

const run = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schema,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024, timeout: 10 * 60 * 1000 },
);

if (run.error) fail(`could not start claude: ${run.error.message}`);
if (run.status !== 0) fail(`claude exited with code ${run.status}\n${run.stderr || run.stdout}`);

let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch {
  fail(`claude output was not JSON:\n${run.stdout.slice(0, 500)}`);
}

// Output is either one result object, or a list whose last item is the result.
const result = Array.isArray(parsed) ? parsed.at(-1) : parsed;
if (result?.is_error) fail(`claude reported an error: ${result.result ?? result.subtype}`);

const output = result?.structured_output;
if (!output || !Array.isArray(output.findings)) fail("no structured_output.findings in claude's result");

mkdirSync(dirname(outPath), { recursive: true });
// Save the folder too, so the next run knows whether these findings apply.
writeFileSync(outPath, JSON.stringify({ folder, findings: output.findings }, null, 2) + "\n");

const count = { high: 0, medium: 0, low: 0 };
for (const f of output.findings) count[f.severity] = (count[f.severity] ?? 0) + 1;

console.log(
  `Reviewed ${folder}${previous ? ` (with ${previous.length} earlier findings)` : ""}: ` +
  `${output.findings.length} findings ` +
  `(${count.high} high, ${count.medium} medium, ${count.low} low). Saved review/findings.json`,
);

process.exit(count.high > 0 ? 1 : 0);
