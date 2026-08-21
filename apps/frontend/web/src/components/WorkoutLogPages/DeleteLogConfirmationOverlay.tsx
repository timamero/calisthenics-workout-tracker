import {
  useWorkoutLogDetailContextWeb,
  useWorkoutContextWeb,
} from '@cwt/hooks';
import { useAuthStore, useWorkoutLibraryStore } from '@cwt/state/stores';

import ConfirmationOverlay from '../common/ConfirmationOverlay';
import { deleteWorkoutLog } from '../../services/workoutsService';

/**
 * DeleteLogConfirmationOverlay component is a confirmation dialog that appears
 * when the user attempts to delete a workout log. It handles the deletion
 * process and updates the state accordingly.
 *
 * The component uses various hooks to access the workout context,
 * authentication state, and navigation. It also includes error handling to
 * ensure that all necessary data is available before proceeding with the
 * deletion.
 *
 * @component
 * @example
 * return (
 *   <DeleteLogConfirmationOverlay />
 * )
 *
 * @returns {JSX.Element | null} The DeleteLogConfirmationOverlay component or
 * null if required data is missing.
 */
export default function DeleteLogConfirmationOverlay() {
  // --- State Management ---
  const supabaseSession = useAuthStore((state) => state.session);
  const deleteWorkout = useWorkoutLibraryStore((state) => state.deleteWorkout);

  // --- Context ---
  const workout = useWorkoutLogDetailContextWeb().workout;
  const workoutOverlayHandlers = useWorkoutContextWeb().webOverlayHandlers;
  const workoutLogDetailOverlayHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers;

  // --- Error Handling ---
  if (!workout) {
    console.error('Error: Workout log not found.');
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
  const workoutLogId = workout.id;
  const deleteLogOverlayOpened = workoutOverlayHandlers.deleteLogOverlayOpened;
  const deleteLogOverlayHandler =
    workoutOverlayHandlers.deleteLogOverlayHandler;
  const detailHandlers = workoutLogDetailOverlayHandlers.handlers;

  // --- Handlers ---
  const handleDeleteLogClick = async () => {
    if (!supabaseSession) {
      console.error('Session not found');
      return;
    }
    const body = JSON.stringify({ id: workoutLogId });

    try {
      const result = await deleteWorkoutLog(supabaseSession.access_token, body);
      if (result) {
        deleteWorkout(workoutLogId);
        detailHandlers.close();
      } else {
        console.error(
          'Workout delete request failed to delete log with ID: ',
          workoutLogId,
        );
      }
    } catch (e) {
      console.error('Error deleting log:', e);
    }
  };

  return (
    <ConfirmationOverlay
      title="Delete Log"
      message="Are you sure you want to delete this log?"
      confirmButtonLabel="Delete"
      opened={deleteLogOverlayOpened}
      handler={deleteLogOverlayHandler}
      onConfirmationClick={() => handleDeleteLogClick()}
    />
  );
}
