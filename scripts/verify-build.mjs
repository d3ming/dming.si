import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { homeSchema, SITE_URL } from "../src/lib/home.mjs";

const root = new URL("../", import.meta.url);
const home = homeSchema.parse(
  JSON.parse(await readFile(new URL("content/home.json", root), "utf8")),
);
const html = await readFile(new URL("dist/index.html", root), "utf8");
const encode = (/** @type {string} */ value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

for (const link of [...home.projects, ...home.socials]) {
  assert(
    html.includes(`href="${encode(link.url)}"`),
    `Production page is missing ${link.id}: ${link.url}`,
  );
}
assert(
  html.includes(`rel="canonical" href="${SITE_URL}"`),
  "Canonical URL must point to dming.si",
);
assert(html.includes('name="description"'), "Missing search description");
const graph = JSON.parse(
  html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1] ?? "null",
)["@graph"];
const website = graph.find(
  (/** @type {{ "@type": string }} */ node) => node["@type"] === "WebSite",
);
const profile = graph.find(
  (/** @type {{ "@type": string }} */ node) => node["@type"] === "ProfilePage",
);
assert.equal(website.url, SITE_URL);
assert.equal(website.name, home.handle);
assert.equal(profile.mainEntity.name, home.name);
assert.equal(profile.mainEntity.alternateName, home.handle);
assert.deepEqual(
  profile.mainEntity.sameAs,
  home.socials.map((social) => social.url),
);
assert(
  !/<script\b(?![^>]*type="application\/ld\+json")/i.test(html),
  "The homepage must work without client JavaScript",
);
assert(
  (html.match(/<h1\b/g) ?? []).length === 1,
  "Homepage needs one primary heading",
);
await readFile(new URL("dist/avatar.jpg", root));
await readFile(new URL("dist/favicon.svg", root));
assert(
  (await readFile(new URL("dist/robots.txt", root), "utf8")).includes(
    `${SITE_URL}/sitemap.xml`,
  ),
);
assert(
  (await readFile(new URL("dist/sitemap.xml", root), "utf8")).includes(
    `${SITE_URL}/`,
  ),
);
assert(
  (await readFile(new URL("dist/404.html", root), "utf8")).includes(
    'content="noindex"',
  ),
);
console.log(
  `Production verified: ${home.projects.length} projects, ${home.socials.length} social links, metadata, assets, and no client JavaScript.`,
);
