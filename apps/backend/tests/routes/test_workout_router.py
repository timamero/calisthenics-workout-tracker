from unittest.mock import Mock, ANY

import pytest


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
