# dming.si

@dming's public creator homepage: Alpha, Wire, and links to X, LinkedIn, and Mingdom
on Substack. A small Astro site with static HTML and no client JavaScript.

```sh
make install
make dev
```

Edit [content/home.json](content/home.json) to change the page. No application
code is needed for project names, descriptions, order, or links. `make content`
prints the validated data for agents. The build uses the same schema.

```sh
make check    # public-content checks, formatting, types, build, browser journeys
make preview  # view the checked production build
```

`make format` explicitly formats source. Checks never rewrite it.

- [AGENTS.md](AGENTS.md): working rules and approval boundaries.
- [docs/architecture.md](docs/architecture.md): ownership, decisions, and checks.
- [docs/publishing.md](docs/publishing.md): editing, preview, and deployment.
- [docs/plan.md](docs/plan.md): scope, verified state, and cutover work.
- [docs/search.md](docs/search.md): search presence and homepage discovery.
- [CHANGELOG.md](CHANGELOG.md): substantial changes.

This repository is public, including its history. Keep private information,
unpublished drafts, account data, credentials, and machine-specific context out
of it. [docs/public-content.md](docs/public-content.md) defines the checks and
review boundary. `package.json` uses `private: true` to prevent accidental npm
publication; the source repository is public.

The source home is [d3ming/dming.si](https://github.com/d3ming/dming.si).
Production uses Vercel at [dming.si](https://dming.si). Deployment status and
remaining cutover work are recorded in [docs/plan.md](docs/plan.md).
