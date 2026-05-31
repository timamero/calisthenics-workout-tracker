import {
  ExerciseResponse,
  Attributes,
  FilterCheckbox,
} from '@cwt/schema/exercises';

export function filterExercises(
  exercisesToFilter: ExerciseResponse[],
  appliedFilters: FilterCheckbox[],
): ExerciseResponse[] {
  const appliedFilterSelections: Set<string> = new Set(
    appliedFilters.map((f) => f.selection),
  );

  return exercisesToFilter.filter((exercise) =>
    appliedFilters.every(({ keyName }: FilterCheckbox) => {
      const value = exercise[keyName as keyof ExerciseResponse];

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

export function sortExercises(
  exercises: ExerciseResponse[],
): ExerciseResponse[] {
  return [...exercises].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterExercisesBySearch(
  exercises: ExerciseResponse[],
  search: string,
): ExerciseResponse[] {
  return exercises.filter((obj) =>
    obj.name.toLowerCase().includes(search.toLowerCase()),
  );
}
