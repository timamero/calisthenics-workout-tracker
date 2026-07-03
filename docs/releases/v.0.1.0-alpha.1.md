# Torque - v0.1.0-alpha.1 Release Notes

**Release Date:** June 2, 2026  
**Version:** 0.1.0-alpha.1  
**Status:** Alpha Release

## Overview

Welcome to the first alpha release of Torque, a comprehensive calisthenics workout tracking platform. This release includes a complete full-stack application with a FastAPI backend, React web frontend, React Native mobile frontend, and a suite of shared libraries for code reuse across platforms.

Torque enables users to create custom workouts, track exercise progressions through set variations (challenges and assists), and maintain a detailed history of their training sessions.

## What's New

### Backend API

A robust FastAPI-based REST API server providing:

#### Authentication & Security

- JWT Bearer token-based authentication
- Environment-aware access control (local development has relaxed requirements)
- CORS middleware configured for development, staging, and production

#### Exercises Management

- **GET `/exercises`** - Retrieve exercises with optional filtering
  - Filter by category, difficulty, name, and other parameters
  - Returns paginated exercise list with full details
- **GET `/exercises/{exercise_id}`** - Retrieve specific exercise details

#### Workout Management

- **POST `/workout/build`** - Create and save custom workout configurations
  - Save selected exercises, sets, reps, and progressions
  - Store as reusable workout templates
- **GET `/workout/builds`** - Retrieve user's saved workout builds
- **POST `/workout/log`** - Log completed workout sessions
  - Record actual performance (reps completed, progression level)
  - Timestamp and session metadata
- **GET `/workout/logs`** - Retrieve workout history
  - Filter and paginate historical records

#### Set Progressions

- **GET `/set-progressions`** - List all available challenges and assists
  - Challenges for progression advancement
  - Assists for regression/modification

#### Database Integration

- Supabase PostgreSQL database backend
- Authenticated database access via Supabase client
- Real-time capabilities ready (Supabase subscriptions)

#### Documentation

- Swagger UI available in non-production environments
- ReDoc documentation
- OpenAPI JSON schema

### Frontend - Web Application

A modern React web application built with Vite, providing:

#### Core Features

- **Workout Creation** - Build custom workouts from available exercises
- **Exercise Library** - Browse, search, and filter available exercises
- **Workout History** - View and review past workout sessions
- **User Profile & Settings** - Manage account and preferences
- **Onboarding** - Guided introduction for new users

#### Technology Stack

- **React 19** - Latest React features and improvements
- **Vite** - Lightning-fast build tool and dev server
- **TanStack Router** - Type-safe file-based routing
- **Mantine UI** - Professional component library with theming
- **Zustand** - Lightweight state management
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation
- **Day.js** - Lightweight date manipulation

#### Development Experience

- Hot module replacement for instant feedback
- TypeScript support throughout
- Vitest for unit testing
- ESLint and Prettier for code quality
- Multi-environment builds (staging, production)

### Frontend - Mobile Application

A native cross-platform mobile application built with Expo and React Native:

#### Core Features

- **Native Workout Interface** - Optimized for touch and mobile workflows
- **Exercise Browser** - Mobile-friendly exercise library
- **Session Logging** - Quick workout logging during or after sessions
- **History Tracking** - Review past workouts on the go
- **User Authentication** - Secure login and account management
- **Settings** - Customize app behavior and preferences

#### Technology Stack

- **Expo** - React Native framework for iOS/Android
- **EAS (Expo Application Services)** - Cloud build infrastructure
- **React Navigation** - Native navigation patterns
- **TypeScript** - Full type safety
- **React Native** - Cross-platform native code

#### Platform Support

- **iOS** - iPhone and iPad support
- **Android** - Smartphone and tablet support
- Deep linking support for direct content access

### Shared Libraries

A comprehensive set of shared packages for code reuse:

#### @cwt/api

API client utilities and request helpers for backend communication across platforms.

#### @cwt/auth

Authentication logic and custom hooks integrating Supabase authentication.

- `useSupabaseAuth()` - Main authentication hook
- Session management
- Token handling

#### @cwt/context

React Context providers for shared state management.

- `WorkoutContext` - Shared workout state across the app
- Support for app-type awareness (web vs mobile)

#### @cwt/hooks

Reusable React hooks for common functionality.

- Authentication hooks
- Data fetching hooks
- UI interaction hooks

#### @cwt/mocks

Mock data for development and testing.

- Sample exercise data
- Workout build examples
- Workout log samples

#### @cwt/schema

Type-safe database schema definitions using Zod and TypeScript.

- User models
- Exercise definitions
- Workout structures
- Workout log schemas
- Set progression definitions

#### @cwt/state

Centralized state management utilities.

- Zustand store configurations
- State composition patterns

#### @cwt/utils

General utility functions.

- Data transformations
- Formatting helpers
- Calculation utilities

### Development Infrastructure

#### Monorepo Setup

- **Turborepo** - High-performance build system for the monorepo
- **pnpm** - Fast, efficient package manager with workspace support
- Shared configuration and scripts across packages
- Optimized build caching and parallelization

#### DevOps

- **Docker** - Containerization for consistent environments
- **Multi-environment support** - Local, staging, and production configurations
- **Environment variables** - Secure configuration management

#### Quality Assurance

- **TypeScript** - Full type safety across all projects
- **ESLint** - Code linting and best practices
- **Prettier** - Consistent code formatting
- **Vitest** - Unit testing framework
- **Husky** - Git hooks for pre-commit checks

## Getting Started

### Prerequisites

- Node.js 18+ with pnpm
- Docker (for backend and mobile development)
- Supabase project (create free at supabase.com)
- For mobile development: Expo CLI and EAS CLI

### Installation

```bash
# Install dependencies
pnpm install

# Setup backend
cd apps/backend
poetry install
cd ../..

# Setup environment variables
# Copy .env.example to .env in relevant directories
```

### Development

```bash
# Start all dev servers (web + backend)
pnpm dev:web+backend

# Or run individually
pnpm dev:backend
pnpm dev:web
pnpm dev:mobile
```

### Building

```bash
# Build web for staging/production
pnpm build:web:staging
pnpm build:web:production

# Build mobile
pnpm expo:dev-build
```

## Architecture

### Technology Stack Overview

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- |
| Backend          | FastAPI + Python 3.11+                   |
| Database         | Supabase (PostgreSQL)                    |
| Web Frontend     | React 19 + Vite + TypeScript             |
| Mobile Frontend  | React Native + Expo                      |
| State Management | Zustand                                  |
| Styling          | Mantine UI (Web) + React Native (Mobile) |
| Package Manager  | pnpm                                     |
| Build Tool       | Turborepo                                |
| Deployment       | Docker, Railway, Expo EAS                |

### Project Structure

```
calisthenics-workout-tracker/
├── apps/
│   ├── backend/                 # FastAPI application
│   │   └── app/
│   │       ├── api/             # API routes
│   │       ├── schemas/         # Pydantic models
│   │       ├── core/            # Configuration
│   │       └── services/        # Business logic
│   └── frontend/
│       ├── web/                 # React web app
│       │   └── src/
│       │       ├── routes/      # Page components
│       │       ├── components/  # Reusable components
│       │       ├── services/    # API integration
│       │       └── contexts/    # React contexts
│       └── mobile/              # Expo mobile app
│           ├── screens/         # Screen components
│           ├── navigation/      # Navigation setup
│           └── services/        # API integration
├── packages/                    # Shared libraries
│   ├── api/                     # API utilities
│   ├── auth/                    # Auth logic
│   ├── context/                 # React contexts
│   ├── hooks/                   # Reusable hooks
│   ├── mocks/                   # Mock data
│   ├── schema/                  # Type definitions
│   ├── state/                   # State management
│   └── utils/                   # Utilities
├── docs/                        # Documentation
└── turbo.json                   # Turborepo config
```

## Key Features in Detail

### Exercise Management

- Comprehensive exercise library
- Filtering by category, difficulty, and other attributes
- Exercise progression tracking

### Workout Building

- Create custom workout templates
- Select exercises and configure sets/reps
- Choose progression levels (challenges/assists)
- Save for future reuse

### Workout Logging

- Log actual workout performance
- Record sets, reps, and progression level completed
- Timestamp tracking
- Full workout history

### Multi-Platform Experience

- Synchronized data across web and mobile
- Native UI optimized for each platform
- Consistent user experience

## Known Issues & Limitations

### Alpha Release Notes

- This is an alpha release - APIs and data models may change
- Not all error cases are handled comprehensively
- Performance optimizations may be needed
- UI/UX may be refined based on feedback

### Environment Setup

- Local development requires manual Supabase project configuration
- Mobile EAS builds require account setup
- Some environment variables need manual configuration

### Feature Status

- Core CRUD operations for workouts and exercises ✅
- Basic progression tracking ✅
- Authentication ✅
- History tracking ✅
- Advanced analytics - Coming in future releases
- Community features - Coming in future releases

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Web app tests
pnpm test:web
```

## Deployment

### Backend

- Supports deployment on Railway, Heroku, or any Docker-compatible platform
- Environment-based configuration
- Automatic database migrations via Supabase

### Frontend Web

- Build output suitable for static hosting (Vercel, Netlify, etc.)
- Environment-specific builds for staging/production

### Frontend Mobile

- EAS build for iOS/Android
- Over-the-air updates via Expo

## Contributing

This is an alpha release and feedback is welcome. Please report issues and suggestions.

## Future Roadmap

Planned features for upcoming releases:

- Advanced workout analytics and progress tracking
- Social features and community workouts
- Detailed progress statistics and visualization
- Offline support for mobile app
- Performance optimizations
- Expanded exercise library
- Custom exercise creation
- Training plans and programs

## Support

For issues, questions, or feedback:

- Check the documentation in `/docs`
- Review the README files in each package
- Check existing issues on GitHub

## License

See LICENSE file for details.

---
