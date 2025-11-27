import { useContext } from 'react';
import { Stack, Text } from '@mantine/core';

import type {
  Assist,
  Exercise,
  Leverage,
  SetFields,
} from '@cwt/schema/workouts';
import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { SetContext, WorkoutDataItemContext } from '@cwt/context';

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
  // console.log(
  //   'ExerciseSetGroupItem - exercisesGroupedBySets',
  //   exercisesGroupedBySets,
  // );

  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  // const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  // const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const updateField = useWorkoutDraftStore((state) => state.updateField);
  const updateLeverageOrAssistField = useWorkoutDraftStore(
    (state) => state.updateLeverageOrAssistField,
  );

  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const handleSetFieldChange = (
    setID: string,
    updatedField:
      | Partial<SetFields>
      | Pick<Leverage, 'value'>
      | Pick<Assist, 'value'>,
  ) => {
    setSetIDToMod(setID);
    setExerciseIDToMod(exercise.id);
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    if (useWorkoutDraftStore.getState().leverageOrAssistIDToMod) {
      updateLeverageOrAssistField(
        updatedField as Pick<Leverage, 'value'> | Pick<Assist, 'value'>,
      );
    } else {
      updateField(updatedField as Partial<SetFields>);
    }
  };

  const exercisesGroup = exercisesGroupedBySets.exercises.map((ex) => {
    return (
      <Stack key={ex.id}>
        <Text>{getExerciseNameById(ex.exercise_id)}</Text>
        <WorkoutDataItemContext.Provider
          value={{
            item: ex,
            parentType: 'superset',
            // parentItemsLength: exercisesGroupedBySets.exercises.length,
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
