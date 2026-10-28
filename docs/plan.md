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
public viewing. Release verification will be recorded here after execution.

Decide the treatment of old writing URLs before retiring `dongming.me`. Until
then it remains the writing archive.
