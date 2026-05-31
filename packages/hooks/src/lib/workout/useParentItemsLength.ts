import { useContext } from "react";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import {
  WorkoutDataItemContext,
  WorkoutDataItemContextType,
} from "@cwt/context";

export default function useParentItemsLength() {
  const workoutDataItemContext = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const parentSectionID = workoutDataItemContext?.parentSectionID;
  const parentSupersetID = workoutDataItemContext?.parentSupersetID;
  const parentLength = workoutDataItemContext?.parentItemsLength;

  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );

  if (!parentSectionID && !parentSupersetID) {
    return rootWorkoutDataLength;
  }
  return parentLength ? parentLength : 0;
}
