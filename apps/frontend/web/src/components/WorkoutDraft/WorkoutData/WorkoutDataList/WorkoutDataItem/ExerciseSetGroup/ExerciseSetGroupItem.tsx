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
  // const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  // const setExerciseIDToMod = useWorkoutDraftStore(
  //   (state) => state.setExerciseIDToMod,
  // );
  // const setSupersetIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSupersetIDToMod,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );
  // const updateField = useWorkoutDraftStore((state) => state.updateField);
  // const updateLeverageOrAssistField = useWorkoutDraftStore(
  //   (state) => state.updateLeverageOrAssistField,
  // );

  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const handleSetFieldChange = useUpdateField(
    parentSectionID,
    parentSupersetID,
  );
  // const handleSetFieldChange = (
  //   setID: string,
  //   updatedField:
  //     | Partial<SetFields>
  //     | Pick<Leverage, 'value'>
  //     | Pick<Assist, 'value'>,
  //   exerciseID?: string,
  // ) => {
  //   setSetIDToMod(setID);
  //   console.log('setting exercise id', exerciseID);
  //   setExerciseIDToMod(exerciseID!);
  //   if (parentSupersetID) {
  //     setSupersetIDToMod(parentSupersetID);
  //   }
  //   if (parentSectionID) {
  //     setSectionIDToMod(parentSectionID);
  //   }
  //   if (useWorkoutDraftStore.getState().leverageOrAssistIDToMod) {
  //     updateLeverageOrAssistField(
  //       updatedField as Pick<Leverage, 'value'> | Pick<Assist, 'value'>,
  //     );
  //   } else {
  //     updateField(updatedField as Partial<SetFields>);
  //   }
  // };

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
