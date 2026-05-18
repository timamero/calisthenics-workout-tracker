import { useExerciseLibraryStore } from '@cwt/state/stores';
import { SetContext, WorkoutDataItemContext } from '@cwt/context';
import { useUpdateField } from '@cwt/hooks';

import Set from '../Set';
import type { ExercisesGroupedBySetsReturnType } from '@cwt/utils';

import ExerciseSetGroupItemUI from './ExerciseSetGroupItemUI';
import ExerciseSetUI from './ExerciseSetUI';

interface ExerciseSetGroupItemProps {
  totalSets: number | null;
  exercisesGroupedBySets: ExercisesGroupedBySetsReturnType;
  parentSectionID: string | null;
  parentSupersetID: string | null;
}

export default function ExerciseSetGroupItem({
  totalSets,
  exercisesGroupedBySets,
  parentSectionID,
  parentSupersetID,
}: ExerciseSetGroupItemProps) {
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const handleSetFieldChange = useUpdateField(
    parentSectionID,
    parentSupersetID,
  );

  const exercisesGroup = exercisesGroupedBySets.exercises.map((ex, i) => {
    return (
      <ExerciseSetUI
        key={ex.id}
        isLast={exercisesGroupedBySets.exercises.length === i + 1}
        exerciseName={getExerciseNameById(ex.exercise_id)}
      >
        <WorkoutDataItemContext.Provider
          value={{
            item: ex,
            parentType: 'superset',
            parentSectionID: parentSectionID!,
            parentSupersetID: parentSupersetID!,
          }}
        >
          <SetContext.Provider
            value={{
              setIndex: exercisesGroupedBySets.setGroupNumber,
              set: ex.set,
              handleSetFieldChange: handleSetFieldChange,
            }}
          >
            <Set />
          </SetContext.Provider>
        </WorkoutDataItemContext.Provider>
      </ExerciseSetUI>
    );
  });
  return (
    <ExerciseSetGroupItemUI
      setNumber={exercisesGroupedBySets.setGroupNumber + 1}
      totalSets={totalSets ? totalSets : null}
    >
      {exercisesGroup}
    </ExerciseSetGroupItemUI>
  );
}
