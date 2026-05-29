import * as React from "react";

import type { Exercise, Superset, Section, Set } from "@cwt/schema/workouts";

type ExerciseInSetGroupType = Pick<
  Exercise,
  "exercise_id" | "id" | "tracked"
> & { set: Set };

export type ExercisesGroupedBySetsType = {
  setGroupNumber: number;
  exercises: ExerciseInSetGroupType[];
};

export type WorkoutDataItemContextType = {
  item: Exercise | Superset | Section | ExerciseInSetGroupType;
  parentType: "section" | "superset" | null;
  parentItemsLength?: number;
  parentSectionID: string | null;
  parentSupersetID: string | null;
};

export const WorkoutDataItemContext =
  React.createContext<WorkoutDataItemContextType | null>(null);
