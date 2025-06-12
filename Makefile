# Makefile at the root of the monorepo

.PHONY: create-secrets-baseline

create-secrets-baseline:
	cd apps/backend && poetry run detect-secrets -C ../../ scan --exclude-files ../../pnpm.lock.yaml > ../../.secrets.baseline