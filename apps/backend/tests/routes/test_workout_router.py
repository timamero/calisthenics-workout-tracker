from unittest.mock import Mock, ANY

import pytest

from app.api.utils.workout import WorkoutDatabaseError


class TestDeleteWorkoutLogRouter:
    async def test_delete_workout_returns_deleted_log(
        self,
        client,
        mock_access_token,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
        deleted_workout_log_response,
    ):
        """Verify that it returns the deleted workout log."""
        mock_delete_workout_log = Mock(return_value=deleted_workout_log_response)
        monkeypatch.setattr(
            "backend.app.api.routes.workout.delete_workout_log",
            mock_delete_workout_log,
        )

        response = await client.request(
            "DELETE",
            "/workout/log",
            json=delete_workout_request_schema.model_dump(),
        )

        assert response.status_code == 200
        assert response.json()["id"] == deleted_workout_log_response["id"]
        assert len(response.json().items()) == len(deleted_workout_log_response.items())

    async def test_delete_workout_calls_helper(
        self,
        client,
        mock_access_token,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
        deleted_workout_log_response,
    ):
        """
        Verify that the delete helper is called and returns success.
        """
        mock_delete_workout_log = Mock(return_value=deleted_workout_log_response)
        monkeypatch.setattr(
            "backend.app.api.routes.workout.delete_workout_log",
            mock_delete_workout_log,
        )

        response = await client.request(
            "DELETE",
            "/workout/log",
            json=delete_workout_request_schema.model_dump(),
        )

        assert response.status_code == 200

        mock_delete_workout_log.assert_called_once_with(
            workout_log_id=ANY,
            access_token="mock_token",
        )
        actual_schema_called = mock_delete_workout_log.call_args[1]["workout_log_id"]
        assert actual_schema_called.id == delete_workout_request_schema.id
        assert response.json()["id"] == deleted_workout_log_response["id"]

    async def test_delete_workout_returns_404_when_helper_returns_none(
        self,
        client,
        mock_access_token,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
    ):
        """
        Verify that it returns a bad request response when deletion does not find a row.
        """
        mock_delete_workout_log = Mock(return_value=None)
        monkeypatch.setattr(
            "backend.app.api.routes.workout.delete_workout_log",
            mock_delete_workout_log,
        )

        response = await client.request(
            "DELETE",
            "/workout/log",
            json=delete_workout_request_schema.model_dump(),
        )

        assert response.status_code == 404
        assert response.json()["detail"] == "Workout log not found"


class TestGetWorkoutLogsRouter:
    async def test_get_workout_logs_returns_logs(
        self,
        client,
        mock_access_token,
        monkeypatch: pytest.MonkeyPatch,
        workout_logs_response,
    ):
        """Verify that it returns the workout logs from the helper."""
        mock_get_workout_logs = Mock(return_value=workout_logs_response)
        monkeypatch.setattr(
            "backend.app.api.routes.workout.get_workout_logs",
            mock_get_workout_logs,
        )

        response = await client.get("/workout/logs")

        assert response.status_code == 200
        assert len(response.json()) == len(workout_logs_response)
        assert response.json()[0]["id"] == workout_logs_response[0]["id"]
        mock_get_workout_logs.assert_called_once_with(access_token="mock_token")

    async def test_get_workout_logs_returns_500_when_helper_raises_database_error(
        self,
        client,
        mock_access_token,
        monkeypatch: pytest.MonkeyPatch,
    ):
        """Verify that database errors become an internal server error response."""
        mock_get_workout_logs = Mock(side_effect=WorkoutDatabaseError("database down"))
        monkeypatch.setattr(
            "backend.app.api.routes.workout.get_workout_logs",
            mock_get_workout_logs,
        )

        response = await client.get("/workout/logs")

        assert response.status_code == 500
        assert (
            "Unable to retrieve workout logs due to database error"
            in response.json()["detail"]
        )

    # TODO: Add coverage for empty results, authentication, and rate limiting.
