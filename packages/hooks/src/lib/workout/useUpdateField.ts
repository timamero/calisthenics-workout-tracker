import { useContext } from "react";

import type {
  Assist,
  Leverage,
  SetFields,
  Exercise,
} from "@cwt/schema/workouts";
import { WorkoutDataItemContext } from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";

export default function useUpdateField(
  parentSectionID?: string | null,
  parentSupersetID?: string | null
) {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
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
  const updateField = useWorkoutDraftStore((state) => state.updateField);
  const updateLeverageOrAssistField = useWorkoutDraftStore(
    (state) => state.updateLeverageOrAssistField
  );

  const handleSetFieldChange = (
    setID: string,
    updatedField:
      | Partial<SetFields>
      | Pick<Leverage, "value">
      | Pick<Assist, "value">,
    exerciseID?: string
  ) => {
    setSetIDToMod(setID);
    setExerciseIDToMod(exerciseID ? exerciseID! : exercise.id);
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    if (useWorkoutDraftStore.getState().leverageOrAssistIDToMod) {
      updateLeverageOrAssistField(
        updatedField as Pick<Leverage, "value"> | Pick<Assist, "value">
      );
    } else {
      updateField(updatedField as Partial<SetFields>);
    }
  };

  return handleSetFieldChange;
}
