import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useAuthStore } from '@cwt/state/stores';

export function useWorkoutSave() {
  const user = useAuthStore((state) => state.user);
  const initializeWorkoutToSave = useWorkoutDraftStore(
    (state) => state.initializeWorkoutToSave
  );
  const addUserIDToWorkoutToSave = useWorkoutDraftStore(
    (state) => state.addUserIDToWorkoutToSave
  );
  // const setWorkoutToSave = useWorkoutDraftStore(
  //   (state) => state.setWorkoutToSave
  // );

  // Wrap the original setWorkoutToSave to inject user_id
  const setWorkoutToSaveWithUser = () => {
    initializeWorkoutToSave(); // Create initializeWorkoutToSave and call here
    const workoutToSave = useWorkoutDraftStore.getState().workoutToSave;
    if (workoutToSave && user?.id) {
      addUserIDToWorkoutToSave(user.id);
      // workoutToSave.user_id = user.id;
      // useWorkoutDraftStore.getState().setWorkoutToSave(workoutToSave); // Enable after updating setWorkoutToSave to accept parameters
    }
  };

  return { setWorkoutToSaveWithUser };
}
