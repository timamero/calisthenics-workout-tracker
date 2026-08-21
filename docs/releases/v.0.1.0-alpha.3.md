# Torque - v0.1.0-alpha.3 Release Notes

**Release Date:** August 20, 2026  
**Version:** 0.1.0-alpha.3  
**Status:** Alpha Release

## Overview

This alpha release focuses on the workout log deletion flow and related stability improvements across the web and mobile apps. It also includes cleanup to the local app experience, maintenance messaging for unfinished routes, and broader test coverage around the workout log workflow.

## What's New

### Frontend - Web Application

#### Workout Log Deletion

- Added a delete confirmation overlay for workout logs
- Added a delete action in the workout log detail menu
- Improved the workout log detail flow to handle missing or stale log data more safely
- Added web tests to cover delete confirmation behavior and error handling

#### Experience & Maintenance

- Temporary maintenance messaging was added to unfinished About and onboarding routes so incomplete pages no longer appear as active app screens
- Updated generated route metadata to reflect the current workout log page structure

### Frontend - Mobile Application

#### Workout Log Deletion

- Added a dedicated workout log detail screen and delete confirmation overlay for mobile
- Updated the mobile workout detail experience to remove stale log state on delete
- Added mobile test coverage for delete confirmation behavior

#### App Stability

- Improved guards around workout log detail and overlay handlers to avoid null/invalid state errors when a log is missing
- Cleaned up older workout log detail components and moved the flow into the current page structure

### Backend API

#### Workout Log Management

- Added and expanded backend route tests covering workout log deletion in both local-isolated and authenticated flows
- Improved validation and error handling for delete requests, including invalid requests and missing auth outside isolated mode
- Updated workout helper logic to better support delete operations and ensure consistent return behavior

### Developer Experience

- Refreshed version metadata across packages and app manifests to `0.1.0-alpha.3`
- Added or reorganized backend test utilities to improve coverage around workout operations
- Removed outdated or disabled code in the workout log flow and reduced dead code in the app
- Added a PR template to support release and issue management workflow

## Changed

- The app now treats incomplete route pages as temporarily unavailable rather than exposing half-finished views
- Workout log deletion flow was standardized across web and mobile to better match the current app behavior
- Version references were updated to the latest alpha release number and release-phase naming across metadata files
- Generated app metadata and route files were refreshed after the workout log screen and overlay changes

## Fixed

- Fixed cases where the app could throw errors when a workout log was missing during deletion
- Corrected guard checks and ordering around overlay handlers used by the delete confirmation flow
- Reduced invalid or stale state transitions when deleting a workout log from the detail pages
- Corrected version-number mismatches and release metadata inconsistencies

## Known Issues & Limitations

- Alpha release — APIs and app flows may still change as the app evolves
- Some routes remain intentionally disabled while work is incomplete
- The app continues to rely on the current alpha-stage experience and is not yet feature-complete

## Testing

```bash
# Web
pnpm --filter @cwt/web test

# Mobile
pnpm --filter @cwt/mobile test

# Backend
cd apps/backend && poetry run pytest
```

---
