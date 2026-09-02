from railway_sdk import define_railway, github, preserve, project, service

# Export uppercase PARTIAL to signal to Railway that this file manages a named partial
PARTIAL = "calisthenics-workout-tracker"


@define_railway
def main(ctx=None):
    calisthenicsWorkoutTracker = service(
        "calisthenics-workout-tracker",
        source=github(
            "timamero/calisthenics-workout-tracker",
            branch="CWT-489-update-railway-config",
            checkSuites=False,
            rootDirectory="/apps/backend/",
        ),
        build={
            "buildCommand": "poetry install --no-root --only main",
            "buildEnvironment": "V3",
            "builder": "RAILPACK",
            "watchPatterns": ["/apps/backend/**"],
        },
        start='''poetry run python -c "import app.main; print(\'import ok\')" && poetry
          run uvicorn app.main:app --host 0.0.0.0 --port "${PORT}"''',
        healthcheck="/health",
        replicas={"sfo": 1},
        env={
            "APP_NAME": preserve(),
            "DEBUG": preserve(),
            "ENVIRONMENT": preserve(),
            "NO_CACHE": preserve(),
            "POETRY_VERSION": preserve(),
            "POETRY_VIRTUALENVS_CREATE": preserve(),
            "POETRY_VIRTUALENVS_IN_PROJECT": preserve(),
            "PORT": preserve(),
            "STAGING_MOBILE_ORIGIN": preserve(),
            "STAGING_ORIGIN": preserve(),
            "STAGING_WEB_ORIGIN": preserve(),
            "SUPABASE_ANON_KEY": preserve(),
            "SUPABASE_JWTK_URL": preserve(),
            "SUPABASE_JWT_KEY_ID": preserve(),
            "SUPABASE_URL": preserve(),
            "VERSION": preserve(),
        },
    )

    # Return the project container holding your resource(s)
    return project("Torque Fitness", resources=[calisthenicsWorkoutTracker])
