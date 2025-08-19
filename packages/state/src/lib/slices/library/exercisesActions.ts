import {
  Exercise,
  ExerciseAttributes,
  ExerciseFilterCheckbox,
} from "@cwt/schema/exercises";

export function filterExercises(
  exercisesToFilter: Exercise[],
  appliedFilters: ExerciseFilterCheckbox[]
) {
  const appliedFilterSelections: ExerciseAttributes[] = appliedFilters.map(
    (f) => f.selection
  );

  return exercisesToFilter.filter((exercise) => 
    appliedFilters.every(({ key }) => {
      const value = exercise[key];

      // Some exercise attributes are type string or list
      if (typeof value === "string") {
        return appliedFilterSelections.includes(value)
      }
      if (Array.isArray(value)) {
        return value.some((v) => appliedFilterSelections.includes(v as ExerciseAttributes))
      }
      return false
    })
  )
}

export function sortExercises(exercises: Exercise[]) {
  return [...exercises].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterExercisesBySearch(exercises: Exercise[], search: string) {
  return exercises.filter((obj) =>
    obj.name.toLowerCase().includes(search.toLowerCase())
  );
}
