# Creator homepage

## Outcome

`dming.si` becomes Dong's main public link: visitors see who he is, open Alpha
or Wire, and find his X, LinkedIn, or Mingdom Substack within one compact page.
Agents can change the content, preview it, and verify the result without chat
history. Public deployment waits for Dong's review.

## Scope settled with Dong on 2026-10-28

- Curated creator homepage; no bulk import of old writing.
- Visible identity is `@dming`, linked directly to X. Dong approved using the
  full name in search metadata so name searches can identify the homepage.
- No personal tagline. Project cards keep equal heights when descriptions wrap.
- Main projects: `https://alpha.dming.si` and `https://wire.dming.si`.
- Social links: `https://x.com/dming`,
  `https://www.linkedin.com/in/dongming/`, and
  `https://mingdom.substack.com` (Dong selected this Substack).
- Astro with static output. Reassess if a real application requirement appears.
- Occasional writing may come later. No CMS or article workflow is claimed.

## Bootstrap

Implemented locally: single content authority, responsive page, metadata,
production verifier, desktop/mobile journeys, CI definition, and a separate
production command that refuses missing hosting setup.

Verified on 2026-10-28:

- `make check` passed on Node 24.22.1 and the host's Node 26.12.1: formatting,
  zero type errors/warnings, production output assertions, and four passing
  browser cases (homepage and 404 recovery at desktop and mobile sizes).
- Inspected the actual local page at desktop size and 390 × 844. Both project
  links and all three social links fit without horizontal scrolling. The tests
  caught and prompted a fix for the X link's undersized tap target.
- Opened Alpha and Wire in the browser and inspected their live homepages.
  Their outbound links are preserved; this is not a product audit of either.
- Initial `make publish` refused a missing Vercel project link before deployment.
- Dependency installation reported zero known vulnerabilities. This is an npm
  audit result at bootstrap, not a permanent security guarantee.

## Public release

Dong authorized a public GitHub repository and publishing to `dming.si` through
Vercel on 2026-10-28. The repository must contain only material intended for
public viewing.

Released and verified on 2026-10-28:

- Public source: [d3ming/dming.si](https://github.com/d3ming/dming.si), default
  branch `main`. Public history uses GitHub no-reply commit identities. Original
  pre-public local history was preserved outside the project before the clean
  public history was created; it was not pushed.
- GitHub secret scanning and push protection are enabled. The public-content
  gate was also tested against an accidentally staged environment file and
  correctly refused it. No values from generated environment files were read
  or published.
- [CI run 40736572954](https://github.com/d3ming/dming.si/actions/runs/40736572954)
  passed both jobs: the full local gate and the complete reachable-history
  Gitleaks scan. The initial scanner wrapper failed on a root-commit range;
  the replacement runs the pinned CLI directly over all reachable history.
- Production: [dming.si](https://dming.si), Vercel project `dming-si`, Node 24.
  Released commit `55fa4d774ff0d3b2632eff45a259ec8ec6e7a862`, deployment
  `dpl_DhyF22kTHpgJuYHHMrUCkrXdLSEA`. Later documentation-only commits do not
  change this deployed build.
- Unauthenticated HTTPS checks returned 200 for the homepage, robots.txt, and
  sitemap; `www.dming.si` redirects to the apex; unknown paths return the custom
  404 with a route home. The production page is indexable and has all five
  requested destinations, the canonical URL, and profile identity markup.
- Inspected the actual production page in the browser. Alpha and Wire retain
  their existing domain assignments. The old website has not been redirected.

GitHub is the public source home. Publishing remains an explicit `make publish`
operation; automatic Git-triggered production deployment is not configured.
See [search.md](search.md) for Search Console and public profile-link follow-up.

Decide the treatment of old writing URLs before retiring `dongming.me`. Until
then it remains the writing archive.
