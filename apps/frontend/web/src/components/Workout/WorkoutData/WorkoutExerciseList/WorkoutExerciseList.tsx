import { useWorkoutDraftStore } from '@cwt/state/stores';

import type { UseDisclosureHandlers } from '@mantine/hooks';

import { WorkoutExerciseContext } from '../../../../contexts/WorkoutExerciseContext';
import { WorkoutExerciseContainer as WorkoutExercise } from './WorkoutExercise';

interface WorkoutExerciseListProps {
  deleteExOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
}

export default function WorkoutExerciseList({
  deleteExOverlayHandler,
  deleteSetOverlayHandler,
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
          deleteSetOverlayHandler: deleteSetOverlayHandler,
        }}
      >
        <WorkoutExercise />
      </WorkoutExerciseContext.Provider>
    );
  });
  return <>{workoutExercises}</>;
}
