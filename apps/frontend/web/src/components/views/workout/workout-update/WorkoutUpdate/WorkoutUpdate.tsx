import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutData from '../../../../workout-data/WorkoutData';
import WorkoutUpdateUI from './WorkouUpdateUI';
import UpdateLogConfirmationOverlay from './UpdateLogConfirmationOverlay';
import CancelUpdateLogConfirmationOverlay from './CancelUpdateLogConfirmationOverlay';

/**
 * WorkoutUpdate component is responsible for rendering the workout update interface.
 * It retrieves the current workout mode, title, and title setter from the workout draft store.
 * If the mode is null, it logs an error and returns null.
 * Otherwise, it renders the WorkoutUpdateUI component with the appropriate props and children.
 */
export default function WorkoutUpdate() {
  const mode = useWorkoutDraftStore((state) => state.mode);
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );

  if (mode === null) {
    console.error('Error: Workout mode is null.');
    return null;
  }
  return (
    <WorkoutUpdateUI
      mode={mode}
      workoutTitle={workoutTitle || 'Untitled Workout'}
      setWorkoutTitle={setWorkoutTitle}
    >
      <WorkoutData />
      <UpdateLogConfirmationOverlay />
      <CancelUpdateLogConfirmationOverlay />
    </WorkoutUpdateUI>
  );
}
