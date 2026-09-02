from railway_sdk import define_railway, project, service

# Last resort for a per-service CaC repo. Prefer one .railway file for the
# project and drop this if you later combine services into that file.
PARTIAL = "backend"


@define_railway
def main(ctx=None):
    backend = service(
        "backend",
        build="poetry install --no-root --only main",
        start=".venv/bin/uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}",
        healthcheck="/health",
    )
    return project("calisthenics-workout-tracker", resources=[backend])
