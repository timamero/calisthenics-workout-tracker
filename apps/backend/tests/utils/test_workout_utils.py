import pytest

from backend.app.api.utils import workout as workout_utils


class TestDeleteWorkoutLogUtils:
    # @pytest.mark.skip(reason="Run this test individually.")
    def test_delete_workout_log_returns_deleted_row(
        self,
        monkeypatch: pytest.MonkeyPatch,
        supabase_delete_client_factory,
        delete_workout_request_schema,
        deleted_workout_log_response,
    ):
        """It returns the deleted workout row when Supabase succeeds."""
        mock_supabase = supabase_delete_client_factory(
            response_data=deleted_workout_log_response,
        )
        monkeypatch.setattr(
            workout_utils,
            "get_supabase_client",
            lambda access_token=None: mock_supabase,
        )

        result = workout_utils.delete_workout_log(delete_workout_request_schema)

        assert result == deleted_workout_log_response

    # @pytest.mark.skip(reason="Run this test individually.")
    def test_delete_workout_log_returns_none_on_exception(
        self,
        monkeypatch: pytest.MonkeyPatch,
        capsys: pytest.CaptureFixture[str],
        supabase_delete_client_factory,
        delete_workout_request_schema,
    ):
        """It returns None and logs an error when Supabase raises."""
        mock_supabase = supabase_delete_client_factory(
            execute_exception=Exception("database down"),
        )
        monkeypatch.setattr(
            workout_utils,
            "get_supabase_client",
            lambda access_token=None: mock_supabase,
        )

        result = workout_utils.delete_workout_log(delete_workout_request_schema)

        captured = capsys.readouterr()

        assert result is None
        assert "Error deleting workout: database down" in captured.out
