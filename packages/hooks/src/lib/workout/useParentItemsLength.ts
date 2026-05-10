import { useContext } from "react";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import { WorkoutDataItemContext } from "@cwt/context";

export default function useParentItemsLength() {
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const parentLength = useContext(WorkoutDataItemContext)?.parentItemsLength;

  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );

  if (!parentSectionID && !parentSupersetID) {
    return rootWorkoutDataLength;
  }
  return parentLength ? parentLength : 0;
}
