// import { useNavigate, linkOptions } from '@tanstack/react-router';

import {
  useWorkoutLogDetailContextWeb,
  useWorkoutContextWeb,
} from '@cwt/hooks';
import {
  // useAuthStore,
  // useWorkoutLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import ConfirmationOverlay from '../common/ConfirmationOverlay';
// import { updateWorkoutLog } from '../../services/workoutsService';

export default function CancelUpdateLogConfirmationOverlay() {
  // --- State Management ---
  // const supabaseSession = useAuthStore((state) => state.session);
  // const updateWorkout = useWorkoutLibraryStore((state) => state.updateWorkout);
  const workoutToSave = useWorkoutDraftStore(
    (state) => state.workoutToSave,
  ) as WorkoutLogResponse;
  // const setMode = useWorkoutDraftStore((state) => state.setMode);

  // const historyLinkOptions = linkOptions({
  //   to: '/dashboard/history',
  // });
  // --- Hooks ---
  // const navigate = useNavigate();

  // --- Context ---
  const workoutOverlayHandlers = useWorkoutContextWeb().webOverlayHandlers;
  const workoutLogDetailOverlayHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers;

  // --- Error Handling ---
  if (!workoutToSave) {
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
  // const workoutLogId = workoutToSave.id;
  const cancelUpdateLogOverlayOpened =
    workoutOverlayHandlers.cancelUpdateLogOverlayOpened;
  const cancelUpdateLogOverlayHandler =
    workoutOverlayHandlers.cancelUpdateLogOverlayHandler;
  // const detailHandlers = workoutLogDetailOverlayHandlers.handlers;

  // --- Handlers ---
  // const handleUpdateLogClick = async () => {
  //   if (!supabaseSession) {
  //     console.error('Session not found');
  //     return;
  //   }
  //   const body = JSON.stringify(workoutToSave);
  //   try {
  //     const result = await updateWorkoutLog(supabaseSession.access_token, body);
  //     if (result) {
  //       updateWorkout(workoutToSave);
  //       detailHandlers.open();
  //       setMode('read');
  //       navigate(historyLinkOptions);
  //     } else {
  //       console.error(
  //         'Workout update request failed to update log with ID: ',
  //         workoutLogId,
  //       );
  //     }
  //   } catch (e) {
  //     console.error('Error updating log:', e);
  //   }
  // };

  return (
    <ConfirmationOverlay
      title="Discard changes?"
      message="You have unsaved changes. If you go back now, your edits will be lost."
      confirmButtonLabel="Discard changes"
      cancelButtonLabel="Keep editing"
      opened={cancelUpdateLogOverlayOpened}
      handler={cancelUpdateLogOverlayHandler}
      onConfirmationClick={() => console.log('clicked confirm button')}
    />
  );
}
