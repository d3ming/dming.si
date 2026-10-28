import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Publishing stays a deliberate command; no install, check, or commit triggers it.
const root = new URL("../", import.meta.url);
try {
  const project = JSON.parse(
    await readFile(new URL(".vercel/project.json", root), "utf8"),
  );
  if (
    !project.projectId ||
    !project.orgId ||
    project.projectName !== "dming-si"
  ) {
    throw new Error(
      "The linked Vercel project must be named dming-si. See docs/publishing.md.",
    );
  }
  for (const { command, args } of [
    { command: "npm", args: ["run", "check"] },
    { command: "vercel", args: ["--prod", "--yes"] },
  ]) {
    const result = spawnSync(command, args, {
      cwd: fileURLToPath(root),
      stdio: "inherit",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
} catch (error) {
  console.error(
    "Publish stopped:",
    error instanceof Error ? error.message : error,
  );
  console.error(
    "Hosting setup and approval are required. See docs/publishing.md.",
  );
  process.exitCode = 1;
}
