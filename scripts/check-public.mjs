import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const git = (/** @type {string[]} */ args) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" });
const paths = git(["ls-files", "-z"]).split("\0").filter(Boolean);
const problems = [];
const privatePath =
  /(?:^|\/)(?:\.env(?:\..*)?|\.codex|\.claude|\.hermes|\.vercel|\.astro|\.tmp|node_modules|dist|test-results|playwright-report|private|drafts|id_rsa|id_ed25519)(?:\/|$)|\.(?:pem|key|p12|pfx|bundle)$/i;
const machinePath = /\/(?:Users|home)\/[^\s/]+\//;

for (const path of paths) {
  if (privatePath.test(path))
    problems.push(`${path}: private or generated path is tracked`);
  const bytes = await readFile(new URL(`../${path}`, import.meta.url));
  if (!bytes.includes(0) && machinePath.test(bytes.toString("utf8"))) {
    problems.push(`${path}: contains a machine-specific home path`);
  }
}

const emails = git(["log", "HEAD", "--format=%ae%n%ce"]).trim().split("\n");
if (
  emails.some((email) => !/^[^@\s]+@users\.noreply\.github\.com$/.test(email))
) {
  problems.push(
    "Git history contains a commit email outside GitHub's no-reply domain",
  );
}

if (problems.length) {
  // Report locations, never matching private values.
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Public-content checks passed for ${paths.length} tracked files and commit identities.`,
  );
}
