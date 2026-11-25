// Monday Morning Punchlines — one-line joke about Monday morning.
// Writes the entry to /output/entry.txt (via MAKEFUN_OUTPUT_DIR) and
// prints it to stdout. A self-checking gate runs first and exits non-zero
// if the sealed rules are violated: 1-200 characters, non-blank, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I set five alarms for Monday morning. They formed a union and went on strike.";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

function gate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    fail(`entry is ${chars} characters, must be 1-200`);
  }
  if (text.trim().length === 0) fail("entry is only whitespace");
  if (text !== text.trim()) fail("entry has leading or trailing whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  if (!/monday/i.test(text)) fail("entry must be about Monday morning");
  if (/  /.test(text)) fail("entry contains a double space");
  if (!/[.!?]$/.test(text)) fail("entry must end with terminal punctuation");
}

gate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(ENTRY);
console.log(`wrote ${outPath} (${[...ENTRY].length} chars)`);
