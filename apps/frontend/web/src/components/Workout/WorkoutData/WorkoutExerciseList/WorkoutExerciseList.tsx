import { useWorkoutDraftStore } from '@cwt/state/stores';

import type { UseDisclosureHandlers } from '@mantine/hooks';

import { WorkoutExerciseContext } from '../../../../contexts/WorkoutExerciseContext';
import WorkoutExercise from './WorkoutExercise';

interface WorkoutExerciseListProps {
  deleteExOverlayHandler: UseDisclosureHandlers;
}

export default function WorkoutExerciseList({
  deleteExOverlayHandler,
}: WorkoutExerciseListProps) {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

  const workoutExercises = workoutData.exercises.map((ex, i) => {
    return (
      <WorkoutExerciseContext.Provider
        key={ex.id}
        value={{
          workoutExercise: ex,
          exerciseIndex: i,
          deleteExOverlayHandler: deleteExOverlayHandler,
        }}
      >
        <WorkoutExercise />
      </WorkoutExerciseContext.Provider>
    );
  });
  return <>{workoutExercises}</>;
}
