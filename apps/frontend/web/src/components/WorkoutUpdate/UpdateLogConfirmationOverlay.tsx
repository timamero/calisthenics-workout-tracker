import { useNavigate, linkOptions } from '@tanstack/react-router';

import {
  useWorkoutLogDetailContextWeb,
  useWorkoutContextWeb,
} from '@cwt/hooks';
import {
  useAuthStore,
  useWorkoutLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import ConfirmationOverlay from '../common/feedback/ConfirmationOverlay';
import { updateWorkoutLog } from '../../services/workoutsService';

export default function UpdateLogConfirmationOverlay() {
  // --- State Management ---
  const supabaseSession = useAuthStore((state) => state.session);
  const updateWorkout = useWorkoutLibraryStore((state) => state.updateWorkout);
  const workoutToSave = useWorkoutDraftStore(
    (state) => state.workoutToSave,
  ) as WorkoutLogResponse;
  const setMode = useWorkoutDraftStore((state) => state.setMode);
  // const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  // const initializeUpdatedWorkoutSave = useWorkoutDraftStore(
  //   (state) => state.initializeUpdatedWorkoutToSave,
  // );
  const workoutLogDetail = useWorkoutLogDetailContextWeb().workout;
  const setWorkoutLogDetail = useWorkoutLogDetailContextWeb().setWorkout;

  const historyLinkOptions = linkOptions({
    to: '/dashboard/history',
  });
  // --- Hooks ---
  const navigate = useNavigate();

  // --- Context ---
  const workoutOverlayHandlers = useWorkoutContextWeb().webOverlayHandlers;
  const workoutLogDetailOverlayHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers;

  // --- Error Handling ---
  if (!workoutLogDetail) {
    console.error('Error: Workout log detail not found.');
    return null;
  }
  if (!workoutOverlayHandlers) {
    console.error('Error: useWorkoutContextWeb().webOverlayHandlers is null.');
    return null;
  }
  if (!workoutLogDetailOverlayHandlers) {
    console.error(
      'Error: useWorkoutLogDetailContextWeb().webOverlayHandlers is null.',
    );
    return null;
  }

  // --- Variables ---
  const workoutLogId = workoutLogDetail.id;
  const updateLogOverlayOpened = workoutOverlayHandlers.updateLogOverlayOpened;
  const updateLogOverlayHandler =
    workoutOverlayHandlers.updateLogOverlayHandler;
  const detailHandlers = workoutLogDetailOverlayHandlers.handlers;

  // --- Handlers ---
  const handleUpdateLogClick = async () => {
    // initializeUpdatedWorkoutSave(workoutLogDetail);
    console.log('updating workout with ', workoutToSave);

    if (!supabaseSession) {
      console.error('Session not found');
      return;
    }
    // const workoutToSave = useWorkoutDraftStore.getState()
    //   .workoutToSave as WorkoutLogResponse;

    const body = JSON.stringify(workoutToSave);
    try {
      const result = await updateWorkoutLog(supabaseSession.access_token, body);
      if (result) {
        updateWorkout(workoutToSave);
        setWorkoutLogDetail(workoutToSave);
        detailHandlers.open();
        setMode('read');
        navigate(historyLinkOptions);
        // resetWorkout();
      } else {
        console.error(
          'Workout update request failed to update log with ID: ',
          workoutLogId,
        );
      }
    } catch (e) {
      console.error('Error updating log:', e);
    }
  };

  return (
    <ConfirmationOverlay
      title="Save Changes?"
      message="Do you want to save the updates to this workout log?"
      confirmButtonLabel="Save"
      opened={updateLogOverlayOpened}
      handler={updateLogOverlayHandler}
      onConfirmationClick={handleUpdateLogClick}
    />
  );
}
