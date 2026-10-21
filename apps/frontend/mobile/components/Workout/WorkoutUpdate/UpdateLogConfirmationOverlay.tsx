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

import ConfirmationDialog from '../../common/ConfirmationDialog';
import { deleteWorkoutLog } from '../../../services/workoutsService'; // replace with updateWorkoutLog service

export default function DeleteLogConfirmationOverlay() {
  const [isUpdateLogOverlayVisible, setIsUpdateLogOverlayVisible] =
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
  const handleUpdateLogPress = async () => {
    if (!supabaseSession) {
      console.error('Session not found');
      return;
    }

    const body = JSON.stringify({ id: workoutLogId });

    try {
      const result = await deleteWorkoutLog(supabaseSession.access_token, body); // replace with updateWorkoutLog service
      if (result) {
        deleteWorkout(workoutLogId); // replace with updateWorkout action
        setDetailWorkout(null);
        resetWorkout();
        navigation.replace('App', { screen: 'History' }); // navigate to workout log detail screen
      } else {
        console.error(
          'Workout update request failed to delete log with ID: ',
          workoutLogId,
        );
      }
    } catch (e) {
      console.error('Error updating log:', e);
    }
  };

  return (
    <ConfirmationDialog
      title="Save Changes?"
      message="Do you want to save the updates to this workout log?"
      confirmButtonLabel="Save"
      isVisible={isUpdateLogOverlayVisible || false}
      handleHideDialog={setIsUpdateLogOverlayVisible}
      onConfirmationPress={handleUpdateLogPress}
    />
  );
}
