import pytest

from backend.app.api.routes.workout import settings

from backend.app.schemas.workout import WorkoutLogResponseSchema

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


# @pytest.mark.skip
async def test_delete_workout(client, monkeypatch: pytest.MonkeyPatch):
    """
    Test the successful deletion of a workout log via the DELETE endpoint.

    This test ensures that when a valid delete request is sent to the
    `/workout/log` route, the application correctly handles the deletion
    and returns the expected response.

    **Mocks:**
    * Forces the environment setting to "local-isolated".
    * Patches `delete_workout_log` to bypass actual database/external operations
      and return a predefined mock response (`mock_deleted_log_response`).

    **Assertions:**
    * HTTP status code is 200 (OK).
    * The returned JSON payload matches the structure and ID of the mocked deleted log.
    """
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
    assert response.json()["id"] == mock_deleted_log_response["id"]
    assert len(response.json().items()) == len(mock_deleted_log_response.items())


# TODO: Create the following tests
# Non-local-isolation Env - Unauthenticated:
# Set settings.environment = "local-integration" (or any non-local string), send a
# DELETE request without an Authorization header. Assert a 401 Unauthorized status.

# Non-local-isolation Env - Authenticated Success:
# Set settings.environment = "local-integration", send a DELETE request with a
# Authorization: Bearer mock_token header. Mock delete_workout_log to receive that
# token and return valid data. Assert a 200 OK status.

# Invalid Request / Database Missing Data: Mock delete_workout_log to return None
# (simulating a scenario where the ID doesn't exist or an error occurred). Send a valid
# payload and assert a 400 Bad Request status.
