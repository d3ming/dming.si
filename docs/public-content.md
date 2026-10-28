# This repository is public

The homepage and the entire Git history are intended for anyone to read.
Store only public profile copy, public project links, approved public assets,
source code, and project documentation here. Private notes, unpublished drafts,
credentials, account data, local filesystem paths, and private operational
context belong elsewhere. A draft excluded from a website build would still be
public in this repository.

Before staging, review new content, images, and metadata for disclosure. Commit
with GitHub's no-reply email address. `make public-check` rejects tracked
private/runtime paths, machine-specific home paths, and commit identities
outside GitHub's no-reply domain. It runs inside `make check` locally and in CI.
Binary assets still require human review; a scanner cannot decide whether a
photo or a paragraph is appropriate to publish.

CI also runs Gitleaks over the reachable history. Before the first public push,
the source and history were reviewed and scanned with Gitleaks. GitHub secret
scanning and push protection should remain enabled. These detect known secret
patterns; they do not prove the absence of every kind of private information.

If a secret is ever exposed, revoke it first. Removing the file in a later
commit does not remove it from history or from copies others may have made.
