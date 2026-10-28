# Make dming.si the public home

## Search snapshot on 2026-10-28

A Google search for `"Dong Ming" "dming"`, including its option to turn off
personalization, surfaced X and `dongming.me` as clear identity matches. The
generated Web Guide also connected LinkedIn and an older about.me profile, but
grouped unrelated academic namesakes into the results. This is a search sample,
not an exhaustive Google index audit or a verified biography.

General web searches also surfaced older Mingdom writing and third-party copies
of X. `dming.si` was not established as the main identity destination in this
sample. The interpretation is that the existing public links still favor the
old site. No claim is made about a guaranteed search position.

## Signals implemented in the homepage

- Keep `@dming` as the visible, X-linked heading. Dong approved using his name
  in search metadata: `Dong Ming (@dming) · Projects and writing`.
- Use one canonical HTTPS origin, `https://dming.si`, in page metadata, the
  sitemap, robots.txt, and structured data.
- Publish WebSite and ProfilePage/Person JSON-LD. Connect the name and handle
  to the existing X, LinkedIn, and Mingdom Substack profiles through `sameAs`.
- Serve complete static HTML so both readers and crawlers can follow the real
  project links without JavaScript. Do not add hidden biography text or keyword
  lists just for search engines.

Google's guidance supports [clear titles and crawlable content](https://developers.google.com/search/docs/fundamentals/seo-starter-guide),
[website name markup](https://developers.google.com/search/docs/appearance/site-names),
and [profile identity markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
Markup helps explain the page; it does not guarantee a rich result or ranking.

## Remaining steps after release

1. Verify `dming.si` in Google Search Console, submit `/sitemap.xml`, and request
   indexing of the homepage. Account verification has not been performed here.
2. Update website links on X, LinkedIn, Substack, and other public profiles to
   `https://dming.si`. Those profile edits need their own approval.
3. Link Alpha and Wire's creator attribution back to `dming.si`. Their owners
   should make those changes; the homepage does not own their source.
4. Decide the old site's archive policy. A homepage redirect can point to
   `dming.si` while article URLs remain available at the old site. Do not use a
   whole-site change-of-address if the writing archive is not moving.
5. Monitor Search Console impressions, queries, indexing, and canonical choice.
   Crawling and ranking changes take time; the live launch is not proof of an
   immediate change in search results.

For any eventual full migration, follow Google's
[site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
and preserve meaningful old URL destinations.
