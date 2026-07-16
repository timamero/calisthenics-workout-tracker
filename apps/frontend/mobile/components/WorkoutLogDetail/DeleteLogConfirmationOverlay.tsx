import {
  useWorkoutContextMobile,
  useWorkoutLogDetailContextMobile,
} from '@cwt/hooks';
import { useAuthStore, useWorkoutLibraryStore } from '@cwt/state/stores';
import { useNavigation } from '@react-navigation/native';

import ConfirmationDialog from '../common/ConfirmationDialog';
import { deleteWorkoutLog } from '../../services/workoutsService';

export default function DeleteLogConfirmationOverlay() {
  // --- UI Hooks ---
  const navigation = useNavigation<any>();

  // --- State Management ---
  const supabaseSession = useAuthStore((state) => state.session);
  const deleteWorkout = useWorkoutLibraryStore((state) => state.deleteWorkout);

  // --- Context ---
  const workout = useWorkoutLogDetailContextMobile().workout;
  const workoutOverlayHandlers =
    useWorkoutContextMobile().mobileOverlayHandlers;
  const workoutLogDetailOverlayHandlers =
    useWorkoutLogDetailContextMobile().mobileOverlayHandlers;
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
  if (!workoutLogDetailOverlayHandlers) {
    console.error(
      'Error: useWorkoutLogDetailContextMobile().mobileOverlayHandlers is null',
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
  const isDeleteLogOverlayVisible =
    workoutOverlayHandlers.isDeleteLogOverlayVisible;
  const setIsDeleteLogOverlayVisible =
    workoutOverlayHandlers.setIsDeleteLogOverlayVisible;

  // --- Handlers ---
  const handleDeleteLogPress = async () => {
    if (!supabaseSession) {
      console.error('Session not found');
      return;
    }

    const body = JSON.stringify({ id: workoutLogId });

    try {
      const result = await deleteWorkoutLog(supabaseSession.access_token, body);
      if (result) {
        deleteWorkout(workoutLogId);
        setDetailWorkout(null);
        navigation.navigate('App', { screen: 'History' });
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
    <ConfirmationDialog
      title="Delete Log"
      message="Are you sure you want to delete this log?"
      confirmButtonLabel="Delete"
      isVisible={isDeleteLogOverlayVisible || false}
      handleHideDialog={setIsDeleteLogOverlayVisible!}
      onConfirmationPress={handleDeleteLogPress}
    />
  );
}
