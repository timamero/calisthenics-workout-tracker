# Torque

**An AI-assisted calisthenics workout tracker — built solo, currently in active development (v0.1.1-alpha.2).**

Torque lets users log bodyweight workouts, track set progressions (challenge/assist variations), and build a training history — with an AI-generated workout feature planned for a later release.

**Live demo:** [Torque](https://torquefit.app)

**Changelog:** [CHANGELOG.md](./CHANGELOG.md)

**Release notes:** [docs/releases/](./docs/releases/)

---

## Status

This project is under active development. The current build (`v0.1.1-alpha.1`) covers core account, logging, and history features — enough for a working demo, not yet feature-complete. See the [roadmap](#roadmap) below for what's next.

---

## What it does (alpha.1)

- **Account creation & login** — Supabase Auth
- **Exercise library** — 100+ bodyweight exercises (push-ups, pull-ups, dips, squats, core, handstand progressions), each tagged with target muscles, equipment, and difficulty
- **Workout builder** — log sets, reps, and timed holds; organize with sections and supersets; reorder freely
- **Set progressions** — track challenge (added difficulty, e.g. weighted vest) and assist (reduced difficulty, e.g. resistance bands) variations per exercise
- **Workout history** — chronological logbook of completed sessions

## Roadmap

| Version | Focus                                                                     |
| ------- | ------------------------------------------------------------------------- |
| alpha.2 | Progressions library, onboarding, profile/settings, calendar logbook view |
| alpha.3 | Progression tracking — detailed status and history per skill              |
| alpha.4 | AI workout generator (GPT 4o mini)                                        |
| beta.1  | Testing, advanced auth, security hardening, UI/UX polish                  |

---

## Architecture

Monorepo (Turborepo) with shared logic between web and mobile:

```
Web (React + Vite + Mantine)  ─┐
Mobile (React Native + Expo)  ─┼─► REST API (FastAPI) ─► Supabase (Postgres)
                               ─┘
```

- **Shared packages** — types, schemas (Zod), API services, hooks, and UI primitives shared across web and mobile
- **Backend** — FastAPI, validated with Pydantic, tested with Pytest
- **Data** — Supabase/Postgres; structured workout data stored as schema-validated JSON for flexibility across builds, logs, and future AI-generated content
- **State** — Zustand
- **Testing** — Vitest, React Testing Library, Playwright (web); Jest, React Native Testing Library, Maestro (mobile)

Full schema and architecture diagrams: coming soon in docs/.

## Tech Stack

**Frontend:** React, React Native (Expo), Vite, Mantine, TanStack Router, Zustand, Zod, React Hook Form
**Backend:** FastAPI, Pydantic, Uvicorn, Pytest
**Data & Infra:** Supabase, Cloudflare, Railway, Render
**AI (alpha.4+):** GPT 4o mini

## My Use of AI in This Project

I use AI tools (Claude, ChatGPT) as a learning aid throughout this project, the way I'd use a senior developer for a second opinion, not as a replacement for writing the code myself. Specifically, I use AI for:

- Scaffolding boilerplate before I customize and extend it
- Debugging help when I'm stuck
- Explaining unfamiliar parts of my own codebase as it grows
- Vulnerability and security scanning
- Sounding board for architecture and design decisions
- Generating and refining body copy and documentation

**The majority of the code, logic, and refactoring in this project is my own.** I treat AI output as a draft or suggestion to review, understand, and rewrite, not as code to copy in directly. I'm including this section because I believe in being transparent about how I work, and because learning to use AI well is itself a skill I want to demonstrate.

## Why This Project

I wanted to build something I'd actually use, as a fitness enthusiast and personal trainer, while practicing full-stack architecture decisions at a level closer to production: shared monorepo packages, schema-driven data, typed contracts between frontend and backend, and a security threat model from the start (see `docs/`).

---

## Contact

Anne Camero — [hey@annecamero.com](hey@annecamero.com) — [LinkedIn](https://www.linkedin.com/in/fannecamero/) — [portfolio](https://annecamero.com)
