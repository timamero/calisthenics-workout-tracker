# Torque - Calisthenics Workout Tracker

v0.1.0-alpha1

## About this monorepo

### Applications

- FastAPI backend
- Vite + React web application
- Expo + React Navive mobile application
- Supabase

- [Turborepo](https://turborepo.com/docs/getting-started)
- [pnpm](https://pnpm.io/motivation)
- [Docker](https://docs.docker.com/)

## How to get started with development

### Prerequisites

- Docker installed
- pnpm installed
- Supabase project created

1. Install dependencies: `pnpm install`
2. Build docker images
3. Create mobile development build: `pnpm expo:dev-build`

### Mobile

1. Run mobile docker image: `pnpm docker:mobile:run`

### Debugging resources

https://github.com/expo/eas-cli/issues/2789

Backend Setup
In backend app root folder, create .venv directory
Then update poetry config to create the environment in the project folder: `poetry config virtualenvs.in-project true`
Run `poetry install --no-root` to create new environment and install packages

Installation notes:
After creating .venv and changing poetry config, you don't need to run `poetry install --no-root` because when you run `pnpm install` from root, it will also run install in the backend
Also note that you don't have to run `pnpm build:packages` because of the postinstall script in the mobile package that runs all the builds


Database notes:
Login to supabase `supabase login`