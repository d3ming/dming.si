.DEFAULT_GOAL := help
.PHONY: help install dev preview content public-check lint format build test check publish

help:
	@echo "install  Install locked dependencies and Chromium"
	@echo "dev      Preview source changes locally"
	@echo "content  Print validated homepage content as JSON"
	@echo "public-check  Reject private paths and non-public commit identities"
	@echo "lint     Check formatting without editing source"
	@echo "format   Explicitly format source"
	@echo "build    Build and verify production HTML and links"
	@echo "preview  Serve the last production build locally"
	@echo "test     Build and run desktop/mobile browser journeys"
	@echo "check    Run all local and CI gates"
	@echo "publish  Check and deploy production (requires approval and Vercel setup)"

install:
	npm ci
	npx --no-install playwright install chromium

dev preview content public-check lint format build test check:
	npm run $@

publish:
	npm run publish:site
