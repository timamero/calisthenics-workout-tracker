import { useContext } from 'react';

import type { Assist, Leverage, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutDataItemContext } from '@cwt/context';

export default function useUpdateField(
  parentSectionID?: string | null,
  parentSupersetID?: string | null
) {
  // setID: string,
  // updatedField:
  //   | Partial<SetFields>
  //   | Pick<Leverage, 'value'>
  //   | Pick<Assist, 'value'>,
  // exerciseID?: string,
  // parentSectionID?: string,
  // parentSupersetID?: string
  // const exerciseID = useContext(WorkoutDataItemContext)?.item.id;
  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );
  const setLeverageOrAssistIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageOrAssistIDToMod
  );
  const updateField = useWorkoutDraftStore((state) => state.updateField);
  const updateLeverageOrAssistField = useWorkoutDraftStore(
    (state) => state.updateLeverageOrAssistField
  );

  const handleSetFieldChange = (
    setID: string,
    updatedField:
      | Partial<SetFields>
      | Pick<Leverage, 'value'>
      | Pick<Assist, 'value'>,
    exerciseID?: string
    // parentSectionID?: string,
    // parentSupersetID?: string
  ) => {
    // const parentType = useContext(WorkoutDataItemContext)?.parentType;
    // const exerciseID = useContext(WorkoutDataItemContext)?.item.id;
    setSetIDToMod(setID);
    setExerciseIDToMod(exerciseID!);
    // if (fieldID) {
    //   setLeverageOrAssistIDToMod(fieldID);
    // }
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    if (useWorkoutDraftStore.getState().leverageOrAssistIDToMod) {
      updateLeverageOrAssistField(
        updatedField as Pick<Leverage, 'value'> | Pick<Assist, 'value'>
      );
    } else {
      updateField(updatedField as Partial<SetFields>);
    }
  };

  return handleSetFieldChange;
}
