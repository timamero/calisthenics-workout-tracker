# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-alpha.2] - 2026-06-21

### Added

#### Backend API

- API rate limiting via `fastapi-limiter` and `pyrate-limiter`
  - Strict limit (3 requests/minute) on `GET /` and `GET /info`
  - Standard read limit (60 requests/minute) on exercises, set progressions, and workout GET routes
  - Standard write limit (10 requests/minute) on workout POST routes
- Async backend test support with `pytest-asyncio`
- Rate limiting tests and limiter reset fixtures for backend tests

#### Developer Experience

- `.env.example` files for backend, web, and mobile apps
- `docs/public-release-security-checklist.md` for public release preparation
- `docs/releases/v.0.1.0-alpha.1.md` release notes
- Initial project `CHANGELOG.md`

### Changed

- Renamed environment modes for clarity:
  - `local-isolated` — mock/sample data and relaxed local backend auth
  - `local-integration` — full-stack local development with Supabase
- Updated backend default `ENVIRONMENT` to `local-integration`
- Updated backend Supabase client key selection based on new environment names
- Updated web and mobile services to use `local-isolated` for sample data fallback
- Updated `change-env.sh` to support `-l` (local-isolated) and `-i` (local-integration)
- Hardened `.gitignore` rules across root, backend, web, and mobile (with `!.env.example`)
- Sanitized mock user IDs to fake UUID `00000000-0000-4000-8000-000000000001`
- Scoped root `pnpm dev` script to web, mobile, and backend packages only

### Fixed

- Web production build now strips `console.time` and `console.timeEnd` logs
- Fixed typo in mobile `.env.example` for `local-integration`

### Security

- Added public-safe security checklist documentation for open-source release prep
- Ignored private security audit file in root `.gitignore`

---

## [0.1.0-alpha.1] - 2026-06-02

### Added

#### Backend API

- FastAPI-based REST API server with multi-environment support (local, staging, production)
- Exercises endpoint with filtering capabilities and individual exercise retrieval
- Workout management endpoints:
  - Save workout builds (custom workout configurations)
  - Retrieve workout builds for users
  - Save workout logs (workout session records)
  - Retrieve workout logs for users
- Set Progressions endpoint for retrieving challenges and assists
- JWT Bearer token authentication with environment-aware access control
- Supabase integration for database operations
- CORS middleware configured for multiple deployment environments
- Swagger UI and ReDoc documentation (disabled in production/staging)
- Request timing metrics and logging

#### Frontend - Web Application

- React 19 web application built with Vite
- File-based routing with TanStack Router
- Mantine UI component library with custom theme
- Authentication screens (Login, Signup)
- Core features:
  - Workout creation and management interface
  - Exercise library browser with filtering
  - Workout history and logging
  - User profile and settings
  - Onboarding experience
- Form handling with React Hook Form and Zod validation
- State management with Zustand
- Testing infrastructure with Vitest
- Type-safe development with TypeScript
- Multi-environment build support (staging, production)

#### Frontend - Mobile Application

- Expo-based React Native application
- Cross-platform support (iOS and Android)
- EAS (Expo Application Services) integration
- Core features:
  - Native workout tracking interface
  - Exercise library and browsing
  - Workout history and logging
  - User authentication and profile
  - Onboarding flow
  - Settings and preferences
  - About screen
- Environment configuration via app.config.ts
- Deep linking support with React Navigation

#### Shared Packages

- **@cwt/api** - API client utilities and request helpers
- **@cwt/auth** - Authentication logic and hooks for Supabase integration
- **@cwt/content** - Content and data utilities
- **@cwt/context** - React Context providers for shared state (WorkoutContext)
- **@cwt/hooks** - Reusable React hooks including Supabase auth integration
- **@cwt/mocks** - Mock data for development and testing
- **@cwt/schema** - Type-safe database schema with Zod and TypeScript types
- **@cwt/state** - Centralized state management utilities
- **@cwt/utils** - General utility functions and helpers

#### Development Infrastructure

- Turborepo for monorepo management and task orchestration
- pnpm for fast, efficient package management
- Docker support for containerized development and deployment
- Husky for Git hooks and pre-commit workflows
- Multi-environment configuration (local, staging, production)
- Shared ESLint and Prettier configuration
- TypeScript for type-safe development across all packages

#### Documentation

- Database schema documentation
- Sample workout data examples
- JSON schema validation for data structures
- Setup and development guides

### Known Limitations

- Alpha release - API and data models subject to change
- Mobile app requires EAS CLI setup for builds
- Local development requires Supabase project configuration
- Some features may have incomplete error handling

### Project Structure

```
├── apps/
│   ├── backend/         # FastAPI application
│   └── frontend/
│       ├── web/         # React web application
│       └── mobile/      # Expo mobile application
├── packages/            # Shared libraries
└── docs/                # Documentation and schemas
```

---

[0.1.0-alpha.2]: https://github.com/timamero/calisthenics-workout-tracker/releases/tag/v0.1.0-alpha.2
[0.1.0-alpha.1]: https://github.com/timamero/calisthenics-workout-tracker/releases/tag/v0.1.0-alpha.1
