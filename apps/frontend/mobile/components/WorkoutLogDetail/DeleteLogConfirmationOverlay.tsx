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
  const workoutLogDetail = useWorkoutLogDetailContextMobile().workout;
  const isDeleteLogOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers?.isDeleteLogOverlayVisible;
  const setIsDeleteLogOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      ?.setIsDeleteLogOverlayVisible;

  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;

  if (!workoutLogDetail?.id) {
    console.error('Error: WorkoutID not found');
    return null;
  }

  // --- Handlers ---
  const handleDeleteLogPress = async () => {
    if (!supabaseSession) {
      console.error('Session not found');
      return;
    }

    const body = JSON.stringify({ id: workoutLogDetail.id });

    try {
      const result = await deleteWorkoutLog(supabaseSession.access_token, body);
      if (result) {
        deleteWorkout(workoutLogDetail.id);
        setDetailWorkout(null);
        navigation.navigate('App', { screen: 'History' });
      } else {
        console.error(
          'Workout delete request failed to delete log with ID: ',
          workoutLogDetail.id,
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
