import pytest

from backend.app.api.utils import workout as workout_utils
from backend.app.api.utils.workout import WorkoutDatabaseError


class TestDeleteWorkoutLogUtils:
    def test_delete_workout_log_returns_deleted_row(
        self,
        monkeypatch: pytest.MonkeyPatch,
        supabase_delete_client_factory,
        delete_workout_request_schema,
        deleted_workout_log_response,
    ):
        """Verify that it returns the deleted workout row when Supabase succeeds."""
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

    def test_delete_workout_log_returns_none_when_data_is_empty_list(
        self,
        monkeypatch: pytest.MonkeyPatch,
        supabase_delete_client_factory,
        delete_workout_request_schema,
    ):
        """
        Verify that it returns None when Supabase
        returns an empty list (no rows deleted)."""
        mock_supabase = supabase_delete_client_factory(
            response_data=None,
        )
        monkeypatch.setattr(
            workout_utils,
            "get_supabase_client",
            lambda access_token=None: mock_supabase,
        )

        result = workout_utils.delete_workout_log(delete_workout_request_schema)
        print("DEBUG:, result: ", result)

        assert result is None

    def test_delete_workout_log_raises_exception_on_database_error(
        self,
        monkeypatch: pytest.MonkeyPatch,
        supabase_delete_client_factory,
        delete_workout_request_schema,
    ):
        """Verify that it raises a WorkoutDatabaseError when Supabase raises."""
        mock_supabase = supabase_delete_client_factory(
            execute_exception=Exception("database down"),
        )
        monkeypatch.setattr(
            workout_utils,
            "get_supabase_client",
            lambda access_token=None: mock_supabase,
        )

        with pytest.raises(WorkoutDatabaseError) as excinfo:
            workout_utils.delete_workout_log(delete_workout_request_schema)
        assert "Internal server error: Error deleting workout log from database" in str(
            excinfo.value
        )
