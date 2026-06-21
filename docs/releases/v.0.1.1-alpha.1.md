# Torque - v0.1.1-alpha.1 Release Notes

**Release Date:** June 21, 2026  
**Version:** 0.1.0-alpha.2  
**Status:** Alpha Release

## Overview

This alpha release builds on v0.1.0-alpha.1 with backend rate limiting, clearer environment configuration for local development, production logging hardening on the web app, and documentation and setup improvements in preparation for public release.

## What's New

### Backend API

#### Rate Limiting

API rate limiting is now enforced using `fastapi-limiter` and `pyrate-limiter`:

| Scope          | Limit              | Routes                                                                                                       |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| Strict         | 3 requests/minute  | `GET /`, `GET /info`                                                                                         |
| Standard read  | 60 requests/minute | `GET /exercises`, `GET /exercises/{id}`, `GET /set-progressions`, `GET /workout/logs`, `GET /workout/builds` |
| Standard write | 10 requests/minute | `POST /workout/build`, `POST /workout/log`                                                                   |

Requests exceeding a limit receive HTTP `429 Too Many Requests`.

#### Testing

- Added `pytest-asyncio` for async test support
- Added rate limiting tests for the root health endpoint
- Added test fixtures to reset limiters between tests (`conftest.py`)
- Configured `asyncio_mode = auto` in `pytest.ini`

### Environment Configuration

Environment names were updated for clearer semantics across backend, web, and mobile:

| Previous concept        | New value           | Behavior                                                                                                            |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Local mock/offline mode | `local-isolated`    | Frontend returns sample data; backend allows unauthenticated access in isolated mode; backend uses service role key |
| Full-stack local dev    | `local-integration` | Frontend calls live API; backend uses Supabase anon key                                                             |

Updated across:

- Backend config, CORS, route auth checks, and Supabase client key selection
- Web and mobile service layers (`VITE_ENVIRONMENT`, `EXPO_PUBLIC_ENVIRONMENT`)
- `change-env.sh` (`-l` for `local-isolated`, `-i` for `local-integration`)
- All `.env.example` files

### Frontend - Web Application

#### Production Build

- Extended Vite/Terser production config to strip `console.time` and `console.timeEnd` in addition to other non-error console output

### Developer Experience & Documentation

#### Environment Setup

- Added `.env.example` files:
  - `apps/backend/.env.example`
  - `apps/frontend/web/.env.example`
  - `apps/frontend/mobile/.env.example`

#### Git Ignore Hardening

- Explicit `.env` ignore rules in root, backend, web, and mobile `.gitignore` files
- Added `!.env.example` exceptions so example files can be committed safely
- Added private audit file to root `.gitignore`

#### Public Release Preparation

- Added `docs/public-release-security-checklist.md` (redacted, public-safe security checklist)
- Added `docs/releases/v.0.1.0-alpha.1.md` and initial `CHANGELOG.md` (release documentation from prior merge)

#### Mock Data

- Replaced mock user IDs with a clearly fake UUID (`00000000-0000-4000-8000-000000000001`) in shared mocks and backend mock JSON files

#### Tooling

- Updated root `dev` script to run only `@cwt/web`, `@cwt/mobile`, and `@cwt/backend` via Turborepo filters

## Changed

- Backend default environment is now `local-integration`
- `change-env.sh` flags and help text updated for new environment names
- Web/mobile services now check `local-isolated` instead of previous environment values when returning sample data

## Fixed

- Corrected typo in mobile `.env.example` (`local-integration`)

## Upgrade Notes

### Environment variable migration

If upgrading from v0.1.0-alpha.1, update your local `.env` files:

| App     | Old (if used)                                    | New                                                             |
| ------- | ------------------------------------------------ | --------------------------------------------------------------- |
| Backend | `ENVIRONMENT=local` or `development`             | `ENVIRONMENT=local-isolated` or `local-integration`             |
| Web     | `VITE_ENVIRONMENT=local` or `development`        | `VITE_ENVIRONMENT=local-isolated` or `local-integration`        |
| Mobile  | `EXPO_PUBLIC_ENVIRONMENT=local` or `development` | `EXPO_PUBLIC_ENVIRONMENT=local-isolated` or `local-integration` |

Or use the helper script:

```bash
# local-isolated (mock/sample data mode)
./change-env.sh -l -bwm

# local-integration (full stack)
./change-env.sh -i -bwm
```

### New setup flow

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/web/.env.example apps/frontend/web/.env
cp apps/frontend/mobile/.env.example apps/frontend/mobile/.env
# Fill in Supabase and API values, then start dev servers
pnpm dev
```

## Known Issues & Limitations

- Alpha release — APIs and environment conventions may still change
- Rate limiting uses in-memory limiters; limits are per process/instance
- Git history cleanup for public release may still be in progress on release-prep branches
- Phase 2 history rewrite and credential rotation should be completed before making the repository public

## Testing

```bash
# Run all tests
pnpm test

# Backend rate limit tests
cd apps/backend && poetry run pytest app/test_main.py -v
```

---

**Thank you for trying Torque! Feedback on rate limits and environment setup is especially welcome for this release.**
