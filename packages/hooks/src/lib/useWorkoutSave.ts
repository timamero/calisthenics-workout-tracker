import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useAuthStore } from '@cwt/state/stores';

export function useWorkoutSave() {
  const user = useAuthStore((state) => state.user);
  // Problem here, user is null
  if (user == null) {
    console.error('user object is null');
  }

  const initializeWorkoutToSave = useWorkoutDraftStore(
    (state) => state.initializeWorkoutToSave
  );
  const addUserIDToWorkoutToSave = useWorkoutDraftStore(
    (state) => state.addUserIDToWorkoutToSave
  );

  const setWorkoutToSaveWithUser = () => {
    initializeWorkoutToSave();
    const workoutToSave = useWorkoutDraftStore.getState().workoutToSave;
    if (workoutToSave && user?.id) {
      addUserIDToWorkoutToSave(user.id);
    }
  };

  return { setWorkoutToSaveWithUser };
}
