import {
  useWorkoutContextMobile,
  useWorkoutLogDetailContextMobile,
} from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useNavigation } from '@react-navigation/native';

import ConfirmationDialog from '../../../common/feedback/ConfirmationDialog';

export default function CancelUpdateLogConfirmationOverlay() {
  // --- UI Hooks ---
  const navigation = useNavigation<any>();

  // --- State Management ---
  const resetWorkoutUpdate = useWorkoutDraftStore(
    (state) => state.resetWorkoutUpdate,
  );
  const setMode = useWorkoutDraftStore((state) => state.setMode);

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
    resetWorkoutUpdate();
    setMode('read');
    navigation.replace('WorkoutDetails');
  };

  return (
    <ConfirmationDialog
      title="Discard changes?"
      message="You have unsaved changes. If you go back now, your edits will be lost."
      confirmButtonLabel="Discard changes"
      cancelButtonLabel="Keep editing"
      isVisible={isCancelUpdateLogOverlayVisible || false}
      handleHideDialog={setIsCancelUpdateLogOverlayVisible}
      onConfirmationPress={handleConfirmationPress}
    />
  );
}
