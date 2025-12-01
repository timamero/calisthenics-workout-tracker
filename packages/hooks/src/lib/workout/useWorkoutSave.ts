import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
} from '@cwt/state/stores';
import { useAuthStore } from '@cwt/state/stores';

export default function useWorkoutSave() {
  const user = useAuthStore((state) => state.user);
  if (user == null) {
    console.error('user object is null');
  }

  const initializeWorkoutToSave = useWorkoutDraftStore(
    (state) => state.initializeWorkoutToSave
  );
  const addUserIDToWorkoutToSave = useWorkoutDraftStore(
    (state) => state.addUserIDToWorkoutToSave
  );
  const addDurationToWorkoutSave = useWorkoutDraftStore(
    (state) => state.addDurationToWorkoutToSave
  );

  const setWorkoutToSaveWithUser = () => {
    initializeWorkoutToSave();
    const workoutToSave = useWorkoutDraftStore.getState().workoutToSave;
    if (workoutToSave && user?.id) {
      addUserIDToWorkoutToSave(user.id);
    }
  };

  const setWorkoutToSaveWithUserAndDuration = () => {
    initializeWorkoutToSave();
    const workoutToSave = useWorkoutDraftStore.getState().workoutToSave;
    const durationInMilliseconds = useWorkoutStopwatchStore
      .getState()
      .getTime();
    const durationInISO = msToIsoDuration(durationInMilliseconds);
    if (workoutToSave && user?.id) {
      addUserIDToWorkoutToSave(user.id);
    }
    if (workoutToSave && durationInISO) {
      addDurationToWorkoutSave(durationInISO);
    }
  };

  return { setWorkoutToSaveWithUser, setWorkoutToSaveWithUserAndDuration };
}

function msToIsoDuration(ms: number): string {
  let seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let duration = 'PT';
  if (hours > 0) duration += hours + 'H';
  if (minutes > 0) duration += minutes + 'M';
  if (seconds > 0 || duration === 'PT') duration += seconds + 'S';

  return duration;
}
