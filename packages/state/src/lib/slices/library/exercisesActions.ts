import {
  Exercise,
  ExerciseAttributes,
  ExerciseFilterCheckbox,
  ExerciseSelectionKeys,
} from "@cwt/schema/exercises";
import { ExerciseFilterKeySchema } from "@cwt/schema/exercises/schemas";

// const exercisesToFilter = state.isFilterBySearchApplied
//   ? state.displayedExercises
//   : state.masterExercises;

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

// function appliedFiltersSelections(appliedFiltersObj: ExerciseFilterCheckbox[]) {
//   return appliedFiltersObj.map((obj) => obj.selection);
// }

// function appliedFilterKeys(
//   appliedFiltersObj: ExerciseFilterCheckbox[]
// ): ExerciseSelectionKeys[] {
//   const appliedFilterGroupNames = appliedFiltersObj.map((obj) => obj.key);
//   return Array.from(new Set(appliedFilterGroupNames));
// }

// export function filterExercises(
//   exercises: Exercise[],
//   appliedFiltersObj: ExerciseFilterCheckbox[]
// ) {
//   const keys = Object.values(ExerciseFilterKeySchema.enum);
//   const appliedFilterKey = appliedFilterKeys(appliedFiltersObj);
//   const appliedFilterSelections = appliedFiltersSelections(appliedFiltersObj);
//   const filteredExercises = exercises.filter((obj) => {
//     const conditionals: boolean[] = [];
//     // const exerciseSelectionKey = obj[key]
//     keys.forEach((key) => {
//       if (typeof obj[key] === "string") {
//         // if (appliedFilterKey.includes(obj[key])) {
//         if (appliedFilterKey.includes(obj[key])) {
//           conditionals.push(true);
//         } else {
//           conditionals.push(false);
//         }
//       } else if (Array.isArray(obj[key])) {
//         const arrayConditionals: boolean[] = [];
//         obj[key].forEach((item) => {
//           if (appliedFilterSelections.includes(item as ExerciseAttributes)) {
//             arrayConditionals.push(true);
//           } else {
//             arrayConditionals.push(false);
//           }
//         });

//         conditionals.push(arrayConditionals.some((con) => con));
//       }
//     });

//     return conditionals.every((con) => con);
//   });

//   return filteredExercises;
// }
