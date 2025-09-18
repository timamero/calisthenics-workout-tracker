import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import ExerciseCard from './ExerciseCard';

export default function ExerciseList() {
  const exercises = useExerciseLibraryStore(
    (state) => state.displayedExercises,
  );

  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );

  return (
    <>
      {exercises.map((exercise) => (
        <ExerciseCard
          exercise={exercise}
          key={exercise.id}
          onExercisePress={() => setSelectedExerciseIDToAdd(exercise.id)}
          isSelected={exercise.id === selectedExerciseIDToAdd ? true : false}
        />
      ))}
    </>
  );
}
