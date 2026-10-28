# Architecture

## The homepage owns a small set of curated links

Dong's brief on 2026-10-28 is a concise creator homepage, similar in purpose to
Linktree. Alpha and Wire are the main projects. LinkedIn, X, and Mingdom on
Substack must be easy to find. Writing is optional future scope, not an archive
migration requirement.

| Surface                                             | Owner                                      |
| --------------------------------------------------- | ------------------------------------------ |
| Identity, project order, descriptions, social links | `content/home.json`                        |
| Content validation and canonical origin             | `src/lib/home.mjs`                         |
| Page structure and metadata                         | `src/pages/index.astro`                    |
| Colors, layout, responsive behavior                 | `src/styles/global.css`                    |
| Public project behavior and data                    | Alpha and Wire's own repos                 |
| Editing and publishing workflow                     | `docs/publishing.md`, Makefile commands    |
| Old writing, old URLs, current old deployment       | `../dongming.me` until an approved cutover |

## Astro renders files; agents use the same interface as people

Astro produces inspectable HTML without a database or request-time server.
For two project links and three social links, Next.js's application features
would add an unused operating surface. A hand-built generator would require
owning more tooling. This is a scope judgment, not a claim that one framework
performs better in agent benchmarks.

One JSON file gives humans and agents the same content authority. Zod validates
it at the command and rendering boundaries. Unknown fields, unsafe URL schemes,
duplicate IDs, and excessive copy fail the build. No runtime model, MCP server,
database, CMS, or agent-specific configuration is needed for this initial page.

The dark palette and violet accents relate to the live projects inspected on
2026-10-28: [Alpha](https://alpha.dming.si) displays stock research and valuations;
[Wire](https://wire.dming.si) curates podcasts and social signals. Their data is
not copied into the homepage. The avatar is copied byte-for-byte from
`dongming.me/public/avatar.jpg`; no old articles or runtime state are imported.

## Verification checks what is shipped

`make check` runs formatting without writes, Astro's type checker, a production
build, output assertions, and browser journeys at desktop and mobile sizes.
The production verifier checks content links, metadata, assets, and absence of
client JavaScript. Browser tests use Dong's requested destinations as their
outside expected values and run without JavaScript. They check visible links,
usable target sizes, overflow, keyboard focus, and 404 recovery.

Local browser inspection remains necessary for visual quality. CI uses the same
gate. Dependency
versions are locked; use Node 24 (`.nvmrc`). `make install` has no Git hook or
global configuration side effects. Browser installation uses Playwright's
normal user cache.

The real name is used only in search metadata and structured profile data;
the visible heading remains `@dming`. [search.md](search.md) records the search
snapshot, implemented signals, and remaining profile/indexing work.

## Keep additions proportional to actual use

If Dong starts publishing short essays here, first add a Markdown collection
for material already approved for public viewing and one create/preview/publish
workflow. Unpublished drafts must stay outside this public repository. A browser
editor is a separate decision: it must write the same canonical content and
must not create a second database to synchronize. No editor is implemented yet.

Sources consulted: [Astro islands](https://docs.astro.build/en/concepts/islands/)
and [Astro TypeScript](https://docs.astro.build/en/guides/typescript/).
Shared, repo-owned commands and evidence carry project context; agent-private
memory has no authority here. This is a public project, never a store for
private operational information. See [public-content.md](public-content.md).
