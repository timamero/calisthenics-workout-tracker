import {
  ExerciseResponse,
  Attributes,
  ExerciseFilterCheckbox,
} from '@cwt/schema/exercises';

export function filterExercises(
  exercisesToFilter: ExerciseResponse[],
  appliedFilters: ExerciseFilterCheckbox[],
) {
  const appliedFilterSelections = new Set(
    appliedFilters.map((f) => f.selection),
  );

  return exercisesToFilter.filter((exercise) =>
    appliedFilters.every(({ keyName }) => {
      const value = exercise[keyName];

      // Some exercise attributes are type string or list
      if (typeof value === 'string') {
        return appliedFilterSelections.has(value);
      }
      if (Array.isArray(value)) {
        return value.some((v) => appliedFilterSelections.has(v as Attributes));
      }
      return false;
    }),
  );
}

export function sortExercises(exercises: ExerciseResponse[]) {
  return [...exercises].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterExercisesBySearch(
  exercises: ExerciseResponse[],
  search: string,
) {
  return exercises.filter((obj) =>
    obj.name.toLowerCase().includes(search.toLowerCase()),
  );
}
