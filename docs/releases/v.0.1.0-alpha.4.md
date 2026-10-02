# Torque Fit - v0.1.0-alpha.4 Release Notes

**Release Date:** October 1, 2026  
**Version:** 0.1.0-alpha.4  
**Status:** Alpha Release

## Overview

This alpha release updates the product branding to Torque Fit, refreshes the web landing page, centralizes backend authentication and database error handling, and migrates the backend deployment configuration to Railway Infrastructure as Code. It also includes dependency, lockfile, and package version updates for the alpha.4 release.

## What's New

### Backend API

#### Authentication & Error Handling

- Centralized bearer-token extraction in a shared FastAPI dependency
- Supabase-based verification of access tokens outside `local-isolated` mode
- Consistent handling of database failures through a typed `WorkoutDatabaseError`
- Improved workout route responses for database failures and missing workout logs
- Explicit handling for empty results from workout database operations

#### Testing

- Updated backend fixtures and route tests for the shared authentication dependency flow
- Added route and utility coverage for retrieving workout logs and translating database errors into API responses

### Deployment

#### Railway Infrastructure as Code

- Added a Railway SDK configuration for the backend service
- Versioned the backend build command, start command, healthcheck, staging branch, environment variables, and replica settings in the repository
- Added Railway configuration documentation and SDK requirements
- Removed the legacy `railway.toml` configuration

### Frontend

#### Torque Fit Branding

- Updated the product name from Torque to Torque Fit across the web app, mobile app, page metadata, and README
- Added a developer note to the web landing page
- Updated alpha feedback messaging with the `info@torquefit.com` contact address
- Refreshed hero styling and landing-page copy, including feature descriptions and roadmap text

## Changed

- Updated application and shared package versions to `0.1.0-alpha.4`
- Updated frontend, mobile, backend, and workspace dependencies
- Regenerated `pnpm-lock.yaml` and the backend Poetry lockfile
- Moved shared backend authentication and rate-limiter definitions into the core dependency module

## Fixed

- Resolved mobile workspace package version mismatches that could cause build failures
- Removed duplicated route-level authentication checks and aligned affected backend tests with the shared dependency flow
- Improved workout utility return handling when database operations return no rows

## Known Issues & Limitations

- Alpha release — APIs and app flows may still change as the app evolves
- The application remains under active development and is not yet feature-complete
- Railway deployment configuration changes require the repository's Railway IaC setup and environment values

## Testing

- Backend route and utility tests were updated for authentication and workout-log behavior
- The mobile package mismatch fix was tested with `pnpm install` and `pnpm dev-build`
- The branding changes were checked with `git diff --check staging...HEAD`
- No full release-wide automated test run is recorded for this release

---
