import type { Assist, Leverage, SetFields } from "@cwt/schema/workouts";
import { useExerciseLibraryStore } from "@cwt/state/stores";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import { SetContext, WorkoutDataItemContext } from "@cwt/context";

export default function useUpdateField(
  setID: string,
  updatedField:
    | Partial<SetFields>
    | Pick<Leverage, "value">
    | Pick<Assist, "value">,
  exerciseID?: string,
  parentSectionID?: string,
  parentSupersetID?: string
) {
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

  const handleUpdateFieldChange = () => {
    setSetIDToMod(setID);
    setExerciseIDToMod(exerciseID!);
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

  return handleUpdateFieldChange;
}
