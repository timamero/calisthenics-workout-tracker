import { useContext } from "react";
import type { Superset } from "@cwt/schema/workouts";
import { WorkoutDataItemContext } from "@cwt/context";
import { groupExercisesBySet } from "@cwt/utils";

export default function useSupersetState() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const exercisesGroupedBySetsList = groupExercisesBySet(superset);

  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext
  )?.parentSectionID;

  return {
    supersetID: superset.id,
    supersetParentsSectionID,
    exercises: superset.exercises,
    exercisesGroupedBySetsList,
    supersetItemsLength: superset.exercises.length,
  };
}
