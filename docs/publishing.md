# Edit, preview, and publish

## Update the homepage without changing its layout

1. Edit `content/home.json` in a text editor, or ask an agent to edit it. The
   arrays define display order. Descriptions stay short; URLs use HTTPS.
2. Run `make content` for schema validation and machine-readable output.
3. Run `make dev` for a local preview while editing.
4. Run `make check`, then `make preview` for the production version.
5. Inspect desktop and mobile. Local commits are allowed; public changes need
   Dong's approval.

Astro may keep `make dev` or `make preview` running in the background when it
detects an agent. Use `npx --no-install astro dev stop` or
`npx --no-install astro preview stop` to stop the corresponding owned server.
The test server uses `--ignore-lock` so its lifecycle belongs to the test runner.

There is no browser editor or article publishing workflow yet. The old site's
friction came from manually coordinating files, status changes, Git, and
deployment. This project gives the homepage one content file and one deployment
command. Publishing essays would need a separately tested content workflow;
do not describe changing a status field as a complete publishing system.

## Production runs on Vercel

The Vercel project is `dming-si`, serving `https://dming.si`; `www.dming.si`
redirects to the apex. A system `vercel` CLI is required
only for hosting setup and publishing; local development uses locked npm tools.

To connect a new checkout after confirming the intended account/team:

```sh
vercel link --project dming-si
```

Inspect `.vercel/project.json` and confirm the project name is `dming-si`, its
account/team is correct, and no link was inherited from another project. That
file stays ignored. Configure Node 24 and the checked-in `vercel.json` build.
The CLI may generate an ignored `.env.local` while linking. This static site
does not use environment variables; remove that generated file without reading
or committing its values. Do not copy secrets into the project.

GitHub stores the public source and runs CI. Git-triggered automatic production
deployment is not configured; `make publish` remains the deliberate release
command. Do not enable a second production path without updating this contract.

After production approval:

```sh
make publish
```

This refuses an absent or differently named Vercel link, runs the full local
gate, and invokes `vercel --prod --yes`. It does not change DNS, create a GitHub
repo, or retire the old site. No other command deploys.

After deployment, verify the returned URL and `https://dming.si` in a browser:
identity, both projects, all social links, mobile layout, and unknown-page
recovery. A successful upload is not proof that the domain serves that build.
Record the deployment and checks in `docs/plan.md`.

## The old domain needs an explicit cutover

`dongming.me` still owns the old public writing and its deployment. Before
redirecting anything, decide where old post URLs should resolve. Preserve their
paths or redirect each to its actual successor; do not silently send every
article to the homepage. Alpha and Wire keep their existing hosting and DNS.
