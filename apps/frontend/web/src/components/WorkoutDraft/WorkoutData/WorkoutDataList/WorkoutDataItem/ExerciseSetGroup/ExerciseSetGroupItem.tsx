import { useExerciseLibraryStore } from '@cwt/state/stores';

import type { ExercisesGroupedBySetsType } from './ExerciseSetGroup';

interface ExerciseSetGroupItemProps {
  exercisesGroupedBySets: ExercisesGroupedBySetsType;
}

export default function ExerciseSetGroupItem({
  exercisesGroupedBySets,
}: ExerciseSetGroupItemProps) {
  console.log(
    'ExerciseSetGroupItem - exercisesGroupedBySets',
    exercisesGroupedBySets,
  );

  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const exercisesGroup = exercisesGroupedBySets.exercises.map((ex) => {
    return (
      <div key={ex.id}>
        <div>{getExerciseNameById(ex.exercise_id)}</div>
        <div>set id: {ex.set.id}</div>
      </div>
    );
  });
  return (
    <div>
      <div>Set {exercisesGroupedBySets.setGroupNumber + 1}</div>
      {exercisesGroup}
    </div>
  );
}
