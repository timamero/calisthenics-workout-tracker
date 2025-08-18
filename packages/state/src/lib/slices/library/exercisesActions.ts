import {
  Exercise,
  ExerciseAttributes,
  ExerciseFilterCheckbox,
} from "@cwt/schema/exercises";

export function filterExercises(
  exercisesToFilter: Exercise[],
  appliedFilters: ExerciseFilterCheckbox[]
) {
  const appliedFilterGroupNames = appliedFilters.map((obj) => obj.key);
  const uniqueAppliedFilterGroupNames = Array.from(
    new Set(appliedFilterGroupNames)
  );
  const appliedFilterSelections: ExerciseAttributes[] = appliedFilters.map(
    (obj) => obj.selection
  );

  const filteredExercises = exercisesToFilter.filter((obj) => {
    const conditionals: boolean[] = [];
    uniqueAppliedFilterGroupNames.forEach((key) => {
      if (typeof obj[key] === "string") {
        if (appliedFilterSelections.includes(obj[key])) {
          conditionals.push(true);
        } else {
          conditionals.push(false);
        }
      } else if (Array.isArray(obj[key])) {
        const arrayConditionals: boolean[] = [];
        obj[key].forEach((item) => {
          if (appliedFilterSelections.includes(item as ExerciseAttributes)) {
            arrayConditionals.push(true);
          } else {
            arrayConditionals.push(false);
          }
        });

        conditionals.push(arrayConditionals.some((con) => con));
      }
    });

    return conditionals.every((con) => con);
  });

  return filteredExercises;
}

export function sortExercises(exercises: Exercise[]) {
  return exercises.sort((a, b) => a.name.localeCompare(b.name));
}
