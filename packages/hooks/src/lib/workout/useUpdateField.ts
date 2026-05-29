import { useContext } from "react";

import type { SetProgression, SetFields, Exercise } from "@cwt/schema/workouts";
import {
  WorkoutDataItemContext,
  WorkoutDataItemContextType,
} from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";

export default function useUpdateField(
  parentSectionID?: string | null,
  parentSupersetID?: string | null,
) {
  const workoutDataItemContext = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const exercise = workoutDataItemContext?.item as Exercise;
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
  const updateSetProgressionField = useWorkoutDraftStore(
    (state) => state.updateSetProgressionField,
  );

  const handleSetFieldChange = (
    setID: string,
    updatedField: Partial<SetFields> | Pick<SetProgression, "value">,
    exerciseID?: string,
  ) => {
    setSetIDToMod(setID);
    setExerciseIDToMod(exerciseID ? exerciseID! : exercise.id);
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    if (useWorkoutDraftStore.getState().setProgressionIDToMod) {
      updateSetProgressionField(updatedField as Pick<SetProgression, "value">);
    } else {
      updateField(updatedField as Partial<SetFields>);
    }
  };

  return handleSetFieldChange;
}
