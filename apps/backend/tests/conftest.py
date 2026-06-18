import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import Request
from pyrate_limiter import Limiter, Rate, Duration
from fastapi_limiter.depends import RateLimiter

from backend.app.main import app, get_strict_root_limiter, get_standard_api_limiter


@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac


LIMITER_RESETS = {
    get_strict_root_limiter: Rate(3, Duration.MINUTE),
    get_standard_api_limiter: Rate(60, Duration.MINUTE),
}


@pytest.fixture(autouse=True)
def reset_limiters():
    """Replaces the limiter with a fresh instance before each test."""
    for limiter_func, rate in LIMITER_RESETS.items():
        fresh = RateLimiter(limiter=Limiter(rate))

        def make_override(limiter=fresh):
            async def override_dependency(request: Request):
                return await limiter(request, None)

            return override_dependency

        app.dependency_overrides[limiter_func()] = make_override()
    yield
    app.dependency_overrides.clear()
