import {
  useWorkoutContextMobile,
  useWorkoutLogDetailContextMobile,
} from '@cwt/hooks';
// import {
//   useAuthStore,
//   useWorkoutLibraryStore,
//   useWorkoutDraftStore,
// } from '@cwt/state/stores';
import { useNavigation } from '@react-navigation/native';

import ConfirmationDialog from '../../../common/feedback/ConfirmationDialog';

export default function CancelUpdateLogConfirmationOverlay() {
  // --- UI Hooks ---
  const navigation = useNavigation<any>();

  // --- State Management ---
  // const supabaseSession = useAuthStore((state) => state.session);
  // const deleteWorkout = useWorkoutLibraryStore((state) => state.deleteWorkout); // replace with updateWorkout action
  // const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  // --- Context ---
  const workout = useWorkoutLogDetailContextMobile().workout;
  const workoutOverlayHandlers =
    useWorkoutContextMobile().mobileOverlayHandlers;
  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;

  // --- Error Handling ---
  if (!workout) {
    console.error('Error: Workout log not found');
    return null;
  }
  if (!workoutOverlayHandlers) {
    console.error(
      'Error: useWorkoutContextMobile().mobileOverlayHandlers is null',
    );
    return null;
  }
  if (!setDetailWorkout) {
    console.error(
      'Error: useWorkoutLogDetailContextMobile().setWorkout is null',
    );
    return null;
  }

  // --- Variables ---
  const workoutLogId = workout.id;
  const isCancelUpdateLogOverlayVisible =
    workoutOverlayHandlers.isCancelUpdateLogOverlayVisible;
  const setIsCancelUpdateLogOverlayVisible =
    workoutOverlayHandlers.setIsCancelUpdateLogOverlayVisible;

  // --- Handlers ---
  const handleConfirmationPress = async () => {
    console.log('Pressed discard changes');
  };

  return (
    <ConfirmationDialog
      title="Discard changes?"
      message="You have unsaved changes. If you go back now, your edits will be lost."
      confirmButtonLabel="Discard changes"
      isVisible={isCancelUpdateLogOverlayVisible || false}
      handleHideDialog={setIsCancelUpdateLogOverlayVisible}
      onConfirmationPress={handleConfirmationPress}
    />
  );
}
