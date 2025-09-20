import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';

export default function WorkoutExerciseList() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

  const workoutExercises = workoutData.exercises.map((ex, i) => {
    return (
      <WorkoutExercise key={ex.id} workoutExercise={ex} exerciseIndex={i} />
    );
  });
  return <>{workoutExercises}</>;
}
