import {
  useWorkoutLogDetailContextWeb,
  useWorkoutContextWeb,
} from '@cwt/hooks';
import { useAuthStore, useWorkoutLibraryStore } from '@cwt/state/stores';

import ConfirmationOverlay from '../common/ConfirmationOverlay';
import { deleteWorkoutLog } from '../../services/workoutsService';

export default function DeleteLogConfirmationOverlay() {
  // --- State Management ---
  const supabaseSession = useAuthStore((state) => state.session);
  const deleteWorkout = useWorkoutLibraryStore((state) => state.deleteWorkout);

  // --- Context ---
  const deleteLogOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteLogOverlayOpened;
  const deleteLogOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteLogOverlayHandler;
  const detailHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.handlers;
  
  const workout = useWorkoutLogDetailContextWeb().workout
  if (!workout) {
    console.error('Error: Workout log not found.');
    return null;
  }
  const workoutLogId = workout.id;

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
        detailHandlers?.close();
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
      opened={deleteLogOverlayOpened!}
      handler={deleteLogOverlayHandler!}
      onConfirmationClick={() => handleDeleteLogClick()}
    />
  );
}
