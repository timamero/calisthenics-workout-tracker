// import { useContext } from 'react';
import { Stack, Text } from '@mantine/core';

// import type { Assist, Leverage, SetFields } from '@cwt/schema/workouts';
import { useExerciseLibraryStore } from '@cwt/state/stores';
// import { useWorkoutDraftStore } from '@cwt/state/stores';
import { SetContext, WorkoutDataItemContext } from '@cwt/context';
import { useUpdateField } from '@cwt/hooks';

import SetContainer from '../ExerciseItem/SetList/SetContainer';

import type { ExercisesGroupedBySetsType } from './ExerciseSetGroup';

interface ExerciseSetGroupItemProps {
  exercisesGroupedBySets: ExercisesGroupedBySetsType;
  parentSectionID: string | null;
  parentSupersetID: string | null;
}

export default function ExerciseSetGroupItem({
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

  const exercisesGroup = exercisesGroupedBySets.exercises.map((ex) => {
    return (
      <Stack key={ex.id}>
        <Text>{getExerciseNameById(ex.exercise_id)}</Text>
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
            <SetContainer />
          </SetContext.Provider>
        </WorkoutDataItemContext.Provider>
      </Stack>
    );
  });
  return (
    <Stack>
      <Text size="xs" fw={600}>
        Set {exercisesGroupedBySets.setGroupNumber + 1}
      </Text>
      <Stack
        bd="1px solid var(--mantine-color-default-border)"
        p="lg"
        w={300}
        bg="transparent"
        bdrs="lg"
      >
        {exercisesGroup}
      </Stack>
    </Stack>
  );
}
