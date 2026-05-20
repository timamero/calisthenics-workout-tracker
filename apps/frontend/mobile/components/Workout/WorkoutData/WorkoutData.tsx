import { useWorkoutDraftStore } from '@cwt/state/stores';
import { Mode } from '@cwt/schema/workouts';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutDataList from './WorkoutDataList';

export default function WorkoutData() {
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).length;

  return (
    <>
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder mode={mode} />}
      <WorkoutDataList />
    </>
  );
}
