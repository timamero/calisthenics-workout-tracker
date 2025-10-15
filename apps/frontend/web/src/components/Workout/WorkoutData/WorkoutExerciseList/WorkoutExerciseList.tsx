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
  console.log('WorkoutExerciseList rendered');
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  console.log(
    'WorkoutExerciseList - workoutData: ',
    JSON.stringify(workoutData),
  );
  const workoutExercises = workoutData.map((ex, i) => {
    console.log('exercise: ', JSON.stringify(ex));
    if (ex.type !== 'exercise') return null;
    console.log('return exercises');
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
