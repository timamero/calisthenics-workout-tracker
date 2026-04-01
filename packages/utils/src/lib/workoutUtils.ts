import type { Superset, Exercise, Set } from "@cwt/schema/workouts";

type ExerciseInSetGroupType = Pick<
  Exercise,
  "exercise_id" | "id" | "tracked"
> & { set: Set };

export type ExercisesGroupedBySetsReturnType = {
  setGroupNumber: number;
  exercises: ExerciseInSetGroupType[];
};

export function groupExercisesBySet(
  superset: Superset
): ExercisesGroupedBySetsReturnType[] | null {
  const exercises = superset.exercises;

  if (exercises.length === 0) {
    return null;
  }

  // Check that all exercises have the same number of sets
  if (
    !exercises.map((ex) => ex.sets.length).every((l, _, arr) => l === arr[0])
  ) {
    console.warn("Warning: Exercises have different number of sets");
  }

  const numOfSets = exercises[0].sets.length;

  const exercisesGroupedBySets: ExercisesGroupedBySetsReturnType[] = [];
  for (let i = 0; i < numOfSets; i++) {
    const group: ExercisesGroupedBySetsReturnType = {
      setGroupNumber: i,
      exercises: [],
    };
    exercises.forEach((ex: Exercise) => {
      const exerciseInSetGroup: ExerciseInSetGroupType = {
        exercise_id: ex.exercise_id,
        id: ex.id,
        tracked: ex.tracked,
        set: ex.sets[i],
      };
      group.exercises.push(exerciseInSetGroup);
    });

    exercisesGroupedBySets.push(group);
  }

  return exercisesGroupedBySets;
}
