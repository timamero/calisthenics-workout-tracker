import pytest

from backend.app.api.routes.workout import settings


from backend.app.schemas.workout import WorkoutLogResponseSchema

# This file tests endpoint behavior using httpx.AsyncClient or httpx.Client against
# FastAPI app. It needs to account for environment settings, authentication logic, and
# rate limiting.

# Unit tests to create (fix the response object):
mock_deleted_log_response: WorkoutLogResponseSchema = {
    "id": 54,
    "created_at": "2026-06-23T06:48:01.28881+00:00",
    "user_id": "ee98b2ee-4d06-4c42-803c-04e645dc26e4",
    "workout_build_id": None,
    "date": "2026-06-23",
    "title": "string",
    "description": "string",
    "duration": "3 days",
    "workout_data": {
        "data": [
            {
                "id": "00000000-0000-0000-0000-000000000000",
                "sets": [
                    {
                        "id": "00000000-0000-0000-0000-000000000000",
                        "fields": {
                            "reps": 0,
                            "rest": "string",
                            "time": "string",
                            "setProgressions": [
                                {
                                    "id": "00000000-0000-0000-0000-000000000000",
                                    "value": 0,
                                    "set_progression_id": 0,
                                }
                            ],
                        },
                        "completed": True,
                        "completed_at": "string",
                    }
                ],
                "type": "exercise",
                "order": 0,
                "tracked": ["string"],
                "exercise_id": 0,
            },
            {
                "id": "00000000-0000-0000-0000-000000000000",
                "name": "string",
                "type": "section",
                "items": [
                    {
                        "id": "00000000-0000-0000-0000-000000000000",
                        "sets": [
                            {
                                "id": "00000000-0000-0000-0000-000000000000",
                                "fields": {
                                    "reps": 0,
                                    "rest": "string",
                                    "time": "string",
                                    "setProgressions": [
                                        {
                                            "id": "00000000-0000-"
                                            "0000-0000-000000000000",
                                            "value": 0,
                                            "set_progression_id": 0,
                                        }
                                    ],
                                },
                                "completed": True,
                                "completed_at": "string",
                            }
                        ],
                        "type": "exercise",
                        "order": 0,
                        "tracked": ["string"],
                        "exercise_id": 0,
                    },
                    {
                        "id": "00000000-0000-0000-0000-000000000000",
                        "type": "superset",
                        "order": 0,
                        "exercises": [
                            {
                                "id": "00000000-0000-0000-0000-000000000000",
                                "sets": [
                                    {
                                        "id": "00000000-0000-0000-0000-000000000000",
                                        "fields": {
                                            "reps": 0,
                                            "rest": "string",
                                            "time": "string",
                                            "setProgressions": [
                                                {
                                                    "id": "00000000-0000-0000-"
                                                    "0000-000000000000",
                                                    "value": 0,
                                                    "set_progression_id": 0,
                                                }
                                            ],
                                        },
                                        "completed": True,
                                        "completed_at": "string",
                                    }
                                ],
                                "type": "exercise",
                                "order": 0,
                                "tracked": ["string"],
                                "exercise_id": 0,
                            }
                        ],
                    },
                ],
                "order": 0,
            },
            {
                "id": "00000000-0000-0000-0000-000000000000",
                "type": "superset",
                "order": 0,
                "exercises": [
                    {
                        "id": "00000000-0000-0000-0000-000000000000",
                        "sets": [
                            {
                                "id": "00000000-0000-0000-0000-000000000000",
                                "fields": {
                                    "reps": 0,
                                    "rest": "string",
                                    "time": "string",
                                    "setProgressions": [
                                        {
                                            "id": "00000000-0000-0000-"
                                            "0000-000000000000",
                                            "value": 0,
                                            "set_progression_id": 0,
                                        }
                                    ],
                                },
                                "completed": True,
                                "completed_at": "string",
                            }
                        ],
                        "type": "exercise",
                        "order": 0,
                        "tracked": ["string"],
                        "exercise_id": 0,
                    }
                ],
            },
        ]
    },
    "rpe": 10,
    "notes": "string",
    "status": "draft",
    "updated_at": "2026-06-23T06:46:08.237+00:00",
    "goal": "function",
}

# Local Env - Successful Deletion: Set settings.environment = "local", pass no
# Authorization header, mock delete_workout_log to return a mock payload, and send a
# DELETE request to /workout/log. Assert a 200 OK status and the matching response
# schema.


# @pytest.mark.skip
async def test_delete_workout(client, monkeypatch: pytest.MonkeyPatch):
    # app.dependency_overrides[get_settings] = get_local_settings
    monkeypatch.setattr(
        settings,
        "environment",
        "local",
    )
    monkeypatch.setattr(
        "backend.app.api.routes.workout.delete_workout_log",
        lambda *args, **kwargs: mock_deleted_log_response,
    )

    response = await client.request("DELETE", "/workout/log", json={"id": "54"})

    assert response.status_code == 200
    # assert response.json() == mock_deleted_log_response


# Non-Local Env - Unauthenticated: Set settings.environment = "production" (or any
# non-local string), send a DELETE request without an Authorization header. Assert a
# 401 Unauthorized status.

# Non-Local Env - Authenticated Success: Set settings.environment = "production", send
# a DELETE request with a Authorization: Bearer mock_token header. Mock
# delete_workout_log to receive that token and return valid data. Assert a 200 OK
# status.

# Invalid Request / Database Missing Data: Mock delete_workout_log to return None
# (simulating a scenario where the ID doesn't exist or an error occurred). Send a valid
# payload and assert a 400 Bad Request status.
