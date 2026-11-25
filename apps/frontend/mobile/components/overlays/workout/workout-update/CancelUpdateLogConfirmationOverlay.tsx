import { useState } from 'react';
import {
  useWorkoutContextMobile,
  useWorkoutLogDetailContextMobile,
} from '@cwt/hooks';
import {
  useAuthStore,
  useWorkoutLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import { useNavigation } from '@react-navigation/native';

import ConfirmationDialog from '../../../common/feedback/ConfirmationDialog';

export default function CancelUpdateLogConfirmationOverlay() {
  const [isCancelUpdateLogOverlayVisible, setIsCancelUpdateLogOverlayVisible] =
    useState<boolean>(false);
  // --- UI Hooks ---
  const navigation = useNavigation<any>();

  // --- State Management ---
  const supabaseSession = useAuthStore((state) => state.session);
  const deleteWorkout = useWorkoutLibraryStore((state) => state.deleteWorkout); // replace with updateWorkout action
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

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
  // const isDeleteLogOverlayVisible =
  //   workoutOverlayHandlers.isDeleteLogOverlayVisible;
  // const setIsDeleteLogOverlayVisible =
  //   workoutOverlayHandlers.setIsDeleteLogOverlayVisible;

  // --- Handlers ---
  const handleConfirmationPress = async () => {
    console.log('Pressed discard changes');
  };

  return (
    <ConfirmationDialog
      title="Save Changes?"
      message="Do you want to save the updates to this workout log?"
      confirmButtonLabel="Save"
      isVisible={isCancelUpdateLogOverlayVisible || false}
      handleHideDialog={setIsCancelUpdateLogOverlayVisible}
      onConfirmationPress={handleConfirmationPress}
    />
  );
}
