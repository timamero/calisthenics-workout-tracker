import { useContext } from "react";
import type { Superset } from "@cwt/schema/workouts";
import {
  WorkoutDataItemContext,
  WorkoutDataItemContextType,
} from "@cwt/context";
import { groupExercisesBySet } from "@cwt/utils";

export default function useSupersetState() {
  const workoutDataItemContext = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const superset = workoutDataItemContext!.item as Superset;
  const exercisesGroupedBySetsList = groupExercisesBySet(superset);

  const supersetParentsSectionID = workoutDataItemContext?.parentSectionID;

  return {
    supersetID: superset.id,
    supersetParentsSectionID,
    exercises: superset.exercises,
    exercisesGroupedBySetsList,
    setsLength:
      superset.exercises.length > 0 ? superset.exercises[0].sets.length : null,
    supersetItemsLength: superset.exercises.length,
  };
}
