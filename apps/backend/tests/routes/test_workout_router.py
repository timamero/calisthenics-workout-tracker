from unittest.mock import Mock, ANY

import pytest

from backend.app.api.routes.workout import settings


class TestDeleteWorkoutRouter:
    # @pytest.mark.skip(reason="Run this test individually.")
    async def test_delete_workout_local_isolated_returns_deleted_log(
        self,
        client,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
        deleted_workout_log_response,
    ):
        """Verify that it returns the deleted workout log in local-isolated mode."""
        monkeypatch.setattr(settings, "environment", "local-isolated")
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

    # @pytest.mark.skip(reason="Run this test individually.")
    async def test_delete_workout_requires_auth_in_non_local_environment(
        self,
        client,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
    ):
        """
        Verify that it rejects unauthenticated delete requests outside
        local-isolated mode.
        """
        monkeypatch.setattr(settings, "environment", "local-integration")

        response = await client.request(
            "DELETE",
            "/workout/log",
            json=delete_workout_request_schema.model_dump(),
        )

        assert response.status_code == 401
        assert response.json()["detail"] == "Authentication required"

    # @pytest.mark.skip(reason="Run this test individually.")
    async def test_delete_workout_with_bearer_token_calls_helper(
        self,
        client,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
        deleted_workout_log_response,
    ):
        """
        Verify that it passes the bearer token to the delete helper and returns success.
        """
        monkeypatch.setattr(settings, "environment", "local-integration")
        mock_delete_workout_log = Mock(return_value=deleted_workout_log_response)
        monkeypatch.setattr(
            "backend.app.api.routes.workout.delete_workout_log",
            mock_delete_workout_log,
        )

        response = await client.request(
            "DELETE",
            "/workout/log",
            headers={"Authorization": "Bearer mock_token"},
            json=delete_workout_request_schema.model_dump(),
        )

        assert response.status_code == 200

        mock_delete_workout_log.assert_called_once_with(
            ANY,
            "mock_token",
        )
        actual_schema_called = mock_delete_workout_log.call_args[0][0]
        assert actual_schema_called.id == delete_workout_request_schema.id

        assert response.json()["id"] == deleted_workout_log_response["id"]

    # @pytest.mark.skip(reason="Run this test individually.")
    async def test_delete_workout_returns_400_when_helper_returns_none(
        self,
        client,
        monkeypatch: pytest.MonkeyPatch,
        delete_workout_request_schema,
    ):
        """
        Verify that it returns a bad request response when deletion does not find a row.
        """
        monkeypatch.setattr(settings, "environment", "local-isolated")
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

        assert response.status_code == 400
        assert response.json()["detail"] == "Invalid request"
