import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import Request
from pyrate_limiter import Limiter, Rate, Duration
from fastapi_limiter.depends import RateLimiter
from unittest.mock import Mock
from datetime import datetime, timedelta, timezone
from uuid import UUID

from backend.app.main import app, get_strict_root_limiter, get_standard_api_limiter
from backend.app.schemas.workout import DeleteWorkoutRequestSchema


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


@pytest.fixture
def delete_workout_request_schema() -> DeleteWorkoutRequestSchema:
    return DeleteWorkoutRequestSchema(id=54)


@pytest.fixture
def deleted_workout_log_response() -> dict:
    return {
        "id": 54,
        "created_at": datetime(2026, 6, 23, 6, 48, 1, 288810, tzinfo=timezone.utc),
        "user_id": UUID("ee98b2ee-4d06-4c42-803c-04e645dc26e4"),
        "workout_build_id": None,
        "date": datetime(2026, 6, 23, tzinfo=timezone.utc),
        "title": "string",
        "description": "string",
        "duration": timedelta(days=3),
        "workout_data": {
            "data": [
                {
                    "id": UUID("00000000-0000-0000-0000-000000000001"),
                    "exercise_id": 0,
                    "tracked": ["string"],
                    "order": 0,
                    "type": "exercise",
                    "sets": [
                        {
                            "id": UUID("00000000-0000-0000-0000-000000000002"),
                            "completed": True,
                            "completed_at": "2026-06-23T06:48:01.288810+00:00",
                            "fields": {
                                "reps": 0,
                                "time": "string",
                                "rest": "string",
                                "setProgressions": [
                                    {
                                        "id": UUID(
                                            "00000000-0000-0000-0000-000000000003"
                                        ),
                                        "set_progression_id": 0,
                                        "value": 0,
                                    }
                                ],
                            },
                        }
                    ],
                }
            ]
        },
        "rpe": 10,
        "notes": "string",
        "status": "draft",
        "updated_at": datetime(
            2026,
            6,
            23,
            6,
            46,
            8,
            237000,
            tzinfo=timezone.utc,
        ),
        "goal": "function",
    }


@pytest.fixture
def supabase_delete_client_factory():
    def factory(
        response_data: dict | None = None,
        execute_exception: Exception | None = None,
    ):
        supabase_client = Mock()
        table_chain = Mock()
        delete_chain = Mock()
        eq_chain = Mock()
        response = Mock()
        response.data = [] if response_data is None else [response_data]

        supabase_client.table.return_value = table_chain
        table_chain.delete.return_value = delete_chain
        delete_chain.eq.return_value = eq_chain

        if execute_exception is not None:
            eq_chain.execute.side_effect = execute_exception
        else:
            eq_chain.execute.return_value = response

        return supabase_client

    return factory
