import { readFile } from "node:fs/promises";
import { homeSchema } from "../src/lib/home.mjs";

try {
  const home = homeSchema.parse(
    JSON.parse(
      await readFile(new URL("../content/home.json", import.meta.url), "utf8"),
    ),
  );
  console.log(JSON.stringify(home, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
