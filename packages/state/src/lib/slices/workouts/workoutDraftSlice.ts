import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import type {
  Exercise,
  SetFields,
  WorkoutBuildRequest,
  WorkoutLogRequest,
  WorkoutData,
  Set,
  Mode,
  Section,
  Superset,
} from '@cwt/schema/workouts';
import type { Tracking } from '@cwt/schema/exercises';

import {
  INITIAL_WORKOUT_LOG_TITLE,
  INITIAL_WORKOUT_BUILD_TITLE,
  INITIALIZED_SET,
  INITIALIZED_WORKOUT_BUILD_TO_SAVE,
  DEFAULT_REP_SET,
  DEFAULT_TIME_SET,
  INITIALIZED_WORKOUT_LOG_TO_SAVE,
} from './workoutDefaults';

interface WorkoutDraftState {
  mode: Mode | null;
  workoutData: Array<Exercise | Section | Superset>;
  // workoutData: WorkoutData;
  workoutTitle: string | null;
  selectedExerciseIDToAdd: number | null;
  selectedSetIndexToMod: number | null;
  setIDToMod: string | null; // CWT-230
  selectedExerciseIndexToMod: number | null;
  exerciseIDToMod: string | null; // CWT-230
  supersetIDToMod: string | null; // CWT-230
  sectionIDToMod: string | null; // CWT-230
  isWorkoutSavePending: boolean;
  workoutToSave: WorkoutBuildRequest | WorkoutLogRequest | null;
}

interface WorkoutDraftAction {
  initializeWorkout: (mode: Mode) => void;
  setMode: (mode: Mode) => void;
  setWorkoutTitle: (title: string) => void;
  setSelectedExerciseIDToAdd: (exerciseID: number | null) => void;
  setSelectedSetIndexToMod: (setIndex: number | null) => void;
  setSetIDToMod: (id: string | null) => void; // CWT-230
  setSelectedExerciseIndexToMod: (exerciseIndex: number | null) => void;
  setExerciseIDToMod: (id: string | null) => void; // CWT-230
  setSupersetIDToMod: (id: string | null) => void; // CWT-230
  setSectionIDToMod: (id: string | null) => void; // CWT-230
  addSection: () => void; // CWT-230
  addSuperset: (sectionID: string | null) => void; // CWT-230
  addExercise: (tracking: Tracking[]) => void;
  removeExercise: (exerciseIndex: number) => void;
  addExerciseUpdated: (tracking: Tracking[]) => void; // CWT-230
  removeRootItem: (id: string) => void; // CWT-230
  removeNestedItem: () => void; // CWT-230
  reorderRootItem: (id: string, newOrder: number) => void; // CWT-230
  reorderNestedItem: (
    sectionID: string | null,
    supersetID: string | null,
    exerciseID: string | null,
    newOrder: number,
  ) => void; // CWT-230
  addSet: (exerciseIndex: number) => void;
  addSetUpdated: () => void;
  deleteSet: (exerciseIndex: number) => void;
  deleteSetUpdated: () => void;
  updateField: (
    exerciseIndex: number,
    updatedField: SetFields,
    // updatedField: Partial<SetFields>,
  ) => void;
  updateFieldUpdated: (updatedField: Partial<SetFields>) => void;
  toggleCompleted: (
    exerciseIndex: number,
    setIndex: number,
    value: boolean,
  ) => void;
  toggleCompletedUpdated: (value: boolean) => void;
  initializeWorkoutToSave: () => void;
  addUserIDToWorkoutToSave: (userID: string) => void;
  addDurationToWorkoutToSave: (duration: string) => void;
  resetWorkout: () => void;
}

export type WorkoutDraftSlice = WorkoutDraftState & WorkoutDraftAction;

// function isExercise(item: Exercise | Section | Superset): item is Exercise {
//   return 'sets' in item;
// }

function isSection(item: any): item is Section {
  return item?.type === 'section';
}

function isSuperset(item: any): item is Superset {
  return item?.type === 'superset';
}

export const createWorkoutDraftSlice: StateCreator<
  WorkoutDraftSlice,
  [['zustand/immer', never]],
  [],
  WorkoutDraftSlice
> = (set, get) => ({
  mode: null,
  workoutData: [],
  workoutTitle: null,
  selectedExerciseIDToAdd: null,
  selectedSetIndexToMod: null,
  setIDToMod: null,
  selectedExerciseIndexToMod: null,
  exerciseIDToMod: null,
  supersetIDToMod: null,
  sectionIDToMod: null,
  isWorkoutSavePending: false,
  workoutToSave: null,

  initializeWorkout: (mode) =>
    set((state) => {
      state.mode = mode;
      state.workoutTitle =
        mode === 'build'
          ? INITIAL_WORKOUT_BUILD_TITLE
          : INITIAL_WORKOUT_LOG_TITLE;
    }),
  setMode: (mode) =>
    set((state) => {
      state.mode = mode;
    }),
  setWorkoutTitle: (title) =>
    set((state) => {
      state.workoutTitle = title;
    }),
  setSelectedExerciseIDToAdd: (exerciseID) =>
    set((state) => {
      state.selectedExerciseIDToAdd = exerciseID;
    }),
  setSelectedSetIndexToMod: (setIndex) =>
    set((state) => {
      state.selectedSetIndexToMod = setIndex;
    }),
  setSetIDToMod: (id) =>
    set((state) => {
      state.setIDToMod = id;
    }),
  setSelectedExerciseIndexToMod: (exerciseIndex) =>
    set((state) => {
      state.selectedExerciseIndexToMod = exerciseIndex;
    }),
  setExerciseIDToMod: (id) =>
    set((state) => {
      state.exerciseIDToMod = id;
    }),
  setSupersetIDToMod: (id) =>
    set((state) => {
      state.supersetIDToMod = id;
    }),
  setSectionIDToMod: (id) =>
    set((state) => {
      state.sectionIDToMod = id;
    }),
  addSection: () =>
    set((state) => {
      state.workoutData.push({
        id: uuidv4(),
        name: null,
        order: state.workoutData.length,
        type: 'section',
        items: [],
      });
    }),
  addSuperset: (sectionID = null) =>
    set((state) => {
      // Add superset to root workout data
      if (sectionID === null) {
        state.workoutData.push({
          id: uuidv4(),
          order: state.workoutData.length,
          type: 'superset',
          exercises: [],
        });
      } else {
        // Add superset to section
        const section = state.workoutData.find(
          (section) => section.id === sectionID,
        ) as Section;

        let updatedSection: Section = section;
        updatedSection.items.push({
          id: uuidv4(),
          order: section.items.length,
          type: 'superset',
          exercises: [],
        });

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === sectionID) {
            return updatedSection;
          } else {
            return item;
          }
        });
      }
    }),
  addExercise: (tracking) =>
    set(
      (state) => {
        // produce((state) => {
        const exerciseID = state.selectedExerciseIDToAdd;
        if (exerciseID == null) {
          console.error('No exerciseID provided');
          return;
        }
        if (state.mode === 'edit' || state.mode === 'build') {
          console.log('addExercise action - adding exercise');
          // let fields: SetFields = {};
          let fields;
          if (tracking.includes('reps')) {
            fields = DEFAULT_REP_SET;
          } else if (tracking.includes('time')) {
            fields = DEFAULT_TIME_SET;
          }

          state.workoutData.push({
            sets: [{ ...INITIALIZED_SET, id: uuidv4(), fields: fields }],
            exercise_id: exerciseID,
            tracked: tracking,
            type: 'exercise',
            id: uuidv4(),
          } as Exercise);
        } else {
          console.error('Cannot add exercise in log mode');
        }
      }, // }),
    ),
  removeExercise: (exerciseIndex) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        state.workoutData.splice(exerciseIndex, 1);
      } else {
        console.error('Cannot remove exercise in log mode');
      }
    }),
  addExerciseUpdated: (tracking) =>
    set((state) => {
      const exerciseID = state.selectedExerciseIDToAdd;
      if (exerciseID == null) {
        console.error('No exerciseID provided');
        return;
      }

      if (state.mode === 'edit' || state.mode === 'build') {
        console.log('addExercise action - adding exercise');
        // let fields: SetFields = {};
        let fields;
        if (tracking.includes('reps')) {
          fields = DEFAULT_REP_SET;
        } else if (tracking.includes('time')) {
          fields = DEFAULT_TIME_SET;
        }

        const exercise = {
          sets: [{ ...INITIALIZED_SET, id: uuidv4(), fields: fields }],
          exercise_id: exerciseID,
          tracked: tracking,
          type: 'exercise',
          id: uuidv4(),
        } as Exercise;

        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;

        if (!sectionID && !supersetID) {
          // Add exercise to root of workout data
          exercise.order = state.workoutData.length;
          state.workoutData.push(exercise);
        } else if (sectionID && supersetID) {
          // Add exercise to superset that is inside a section
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          let updatedSection = section;
          let updatedSuperset = superset;

          exercise.order = superset.exercises.length;

          updatedSuperset.exercises.push(exercise);
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === supersetID) {
                return updatedSuperset;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            } else {
              return item;
            }
          });
        } else {
          // Add exercise to superset or section root items
          const itemID = sectionID ? sectionID : supersetID;
          const item = state.workoutData.find((item) => item.id === itemID) as
            | Section
            | Superset;
          let updatedItem = item;

          if (isSection(updatedItem)) {
            exercise.order = updatedItem.items.length;
            updatedItem.items.push(exercise);
          } else if (isSuperset(updatedItem)) {
            exercise.order = updatedItem.exercises.length;
            updatedItem.exercises.push(exercise);
          }

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedItem;
            } else {
              return item;
            }
          });
        }

        // Reset state
        state.sectionIDToMod = null;
        state.supersetIDToMod = null;
      } else {
        console.error('Cannot add exercise in log mode');
      }
    }),
  // Remove exercise, section, or superset from the root workout data list
  removeRootItem: (id) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const indexOfRemovedItem = state.workoutData.findIndex(
          (item) => item.id == id,
        );
        state.workoutData = state.workoutData.filter((item) => item.id !== id);

        // Update order field for items after deleted item
        state.workoutData = state.workoutData.map((item, index) => {
          if (index >= indexOfRemovedItem) {
            --item.order;
            return item;
          }
          return item;
        });
        // Reset state
        state.exerciseIDToMod = null;
        state.supersetIDToMod = null;
        state.sectionIDToMod = null;
      } else {
        console.error('Cannot remove exercise in log mode');
      }
    }),
  removeNestedItem: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const exerciseID = get().supersetIDToMod;
        // Remove exercise in superset inside section
        if (sectionID && supersetID && exerciseID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          const indexOfRemovedItem = superset.exercises.findIndex(
            (exercise) => exercise.id == exerciseID,
          );

          let updatedSection = section;
          let updatedSuperset = superset;

          let updatedExercises = updatedSuperset.exercises.filter(
            (exercise) => exercise.id !== exerciseID,
          );

          // Update order field for exercises after deleted exercise
          const exercises = updatedExercises.map((exercise, index) => {
            if (index >= indexOfRemovedItem) {
              --exercise.order;
              return exercise;
            }
            return exercise;
          });

          updatedSuperset = {
            ...updatedSuperset,
            exercises: exercises,
          };

          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === supersetID) {
                return updatedSuperset;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            } else {
              return item;
            }
          });
        } else if (
          (sectionID && supersetID && !exerciseID) ||
          (sectionID && !supersetID && exerciseID)
        ) {
          // Remove superset or exercise in section
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const indexOfRemovedItem = section.items.findIndex(
            (item) => item.id == exerciseID || item.id == supersetID,
          );

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.filter(
              (item) => item.id !== supersetID || item.id !== exerciseID,
            ),
          };

          // Update order field for items after deleted item
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item, index) => {
              if (index >= indexOfRemovedItem) {
                --item.order;
                return item;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            } else {
              return item;
            }
          });
        } else if (!sectionID && supersetID && exerciseID) {
          // Remove exercise in root superset
          const superset = state.workoutData.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          const indexOfRemovedItem = superset.exercises.findIndex(
            (exercise) => exercise.id == exerciseID,
          );

          let updatedSuperset = superset;

          let updatedExercises = updatedSuperset.exercises.filter(
            (exercise) => exercise.id !== exerciseID,
          );

          // Update order field for exercises after deleted exercise
          const exercises = updatedExercises.map((exercise, index) => {
            if (index >= indexOfRemovedItem) {
              --exercise.order;
              return exercise;
            }
            return exercise;
          });

          updatedSuperset = {
            ...updatedSuperset,
            exercises: exercises,
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSuperset;
            } else {
              return item;
            }
          });
        }

        // Reset state
        state.exerciseIDToMod = null;
        state.supersetIDToMod = null;
        state.sectionIDToMod = null;
      } else {
        console.error('Cannot remove exercise in log mode');
      }
    }),
  reorderRootItem: (id, newOrder) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        if (state.workoutData.find((item) => item.id === id) === null) {
          console.error('Item to reorder not found');
          return;
        }
        const itemToMove = state.workoutData.find((item) => item.id === id);
        state.workoutData = state.workoutData.filter((item) => item.id !== id);
        state.workoutData.splice(newOrder, 0, itemToMove!);

        // Update order field for all items
        state.workoutData = state.workoutData.map((item, index) => {
          item.order = index;
          return item;
        });
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  reorderNestedItem: (
    sectionID = null,
    supersetID = null,
    exerciseID = null,
    newOrder,
  ) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        if (sectionID && supersetID && exerciseID) {
          // Reorder exercise in superset inside section
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;

          if (superset.exercises.find((ex) => ex.id === exerciseID) === null) {
            console.error('Exercise to reorder not found');
            return;
          }
          const exerciseToMove = superset.exercises.find(
            (ex) => ex.id === exerciseID,
          );
          let updatedSuperset = superset;
          updatedSuperset.exercises = updatedSuperset.exercises.filter(
            (ex) => ex.id !== exerciseID,
          );
          updatedSuperset.exercises.splice(newOrder, 0, exerciseToMove!);

          // Update order field for all exercises
          updatedSuperset.exercises = updatedSuperset.exercises.map(
            (exercise, index) => {
              exercise.order = index;
              return exercise;
            },
          );

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === supersetID) {
                return updatedSuperset;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            } else {
              return item;
            }
          });

          // Update order of superset or exercise in section
        } else if (sectionID && (supersetID || exerciseID)) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          if (
            section.items.find(
              (item) => item.id === supersetID || item.id === exerciseID,
            ) === null
          ) {
            console.error('Item to reorder not found');
            return;
          }
          const itemToMove = section.items.find(
            (item) => item.id === supersetID || item.id === exerciseID,
          );
          let updatedSection = section;
          updatedSection.items = updatedSection.items.filter(
            (item) => item.id !== supersetID && item.id !== exerciseID,
          );
          updatedSection.items.splice(newOrder, 0, itemToMove!);

          // Update order field for all items
          updatedSection.items = updatedSection.items.map((item, index) => {
            item.order = index;
            return item;
          });

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            } else {
              return item;
            }
          });

          // Update order of exercise in root superset
        } else if (!sectionID && supersetID && exerciseID) {
          const superset = state.workoutData.find(
            (superset) => superset.id === supersetID,
          ) as Superset;

          if (superset.exercises.find((ex) => ex.id === exerciseID) === null) {
            console.error('Exercise to reorder not found');
            return;
          }
          const exerciseToMove = superset.exercises.find(
            (ex) => ex.id === exerciseID,
          );
          let updatedSuperset = superset;
          updatedSuperset.exercises = updatedSuperset.exercises.filter(
            (ex) => ex.id !== exerciseID,
          );
          updatedSuperset.exercises.splice(newOrder, 0, exerciseToMove!);

          // Update order field for all exercises
          updatedSuperset.exercises = updatedSuperset.exercises.map(
            (exercise, index) => {
              exercise.order = index;
              return exercise;
            },
          );

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            } else {
              return item;
            }
          });
        }
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  addSet: (exerciseIndex) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Exercise index not provided');
        return;
      }
      if (state.mode === 'edit' || state.mode === 'build') {
        let exercise = state.workoutData[exerciseIndex] as Exercise;

        const tracking = exercise.tracked;
        let fields;
        if (tracking.includes('reps')) {
          fields = DEFAULT_REP_SET;
        } else if (tracking.includes('time')) {
          fields = DEFAULT_TIME_SET;
        }

        exercise = {
          ...exercise,
          sets: [
            ...exercise.sets,
            { ...INITIALIZED_SET, id: uuidv4(), fields: fields as SetFields },
          ],
        };
        state.workoutData[exerciseIndex] = exercise;
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  addSetUpdated: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const exerciseID = get().supersetIDToMod;
        // Add set to exercise in root
        if (!sectionID && !supersetID && exerciseID) {
          const exercise = state.workoutData.find(
            (item) => item.id === exerciseID,
          );
          let updatedExercise = exercise as Exercise;
          const tracking = updatedExercise.tracked;
          let fields;
          if (tracking.includes('reps')) {
            fields = DEFAULT_REP_SET;
          } else if (tracking.includes('time')) {
            fields = DEFAULT_TIME_SET;
          }

          updatedExercise = {
            ...updatedExercise,
            sets: [
              ...updatedExercise.sets,
              { ...INITIALIZED_SET, id: uuidv4(), fields: fields as SetFields },
            ],
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          });
          // Add set to exercise in section
        } else if (sectionID && !supersetID && exerciseID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const exercise = section.items.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          let updatedExercise = exercise as Exercise;
          const tracking = updatedExercise.tracked;
          let fields;
          if (tracking.includes('reps')) {
            fields = DEFAULT_REP_SET;
          } else if (tracking.includes('time')) {
            fields = DEFAULT_TIME_SET;
          }

          updatedExercise = {
            ...updatedExercise,
            sets: [
              ...updatedExercise.sets,
              { ...INITIALIZED_SET, id: uuidv4(), fields: fields as SetFields },
            ],
          };

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === exerciseID) {
                return updatedExercise;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            }
            return item;
          });
          // Add set to exercise in superset
        } else if (!sectionID && supersetID && exerciseID) {
          const superset = state.workoutData.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          const exercise = superset.exercises.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          let updatedExercise = exercise as Exercise;
          const tracking = updatedExercise.tracked;
          let fields;
          if (tracking.includes('reps')) {
            fields = DEFAULT_REP_SET;
          } else if (tracking.includes('time')) {
            fields = DEFAULT_TIME_SET;
          }

          updatedExercise = {
            ...updatedExercise,
            sets: [
              ...updatedExercise.sets,
              { ...INITIALIZED_SET, id: uuidv4(), fields: fields as SetFields },
            ],
          };

          let updatedSuperset = superset;
          updatedSuperset = {
            ...updatedSuperset,
            exercises: updatedSuperset.exercises.map((item) => {
              if (item.id === exerciseID) {
                return updatedExercise;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            }
            return item;
          });
          // Add set to exercise in superset inside a section
        } else if (sectionID && supersetID && exerciseID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          const exercise = superset.exercises.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          let updatedExercise = exercise as Exercise;
          const tracking = updatedExercise.tracked;
          let fields;
          if (tracking.includes('reps')) {
            fields = DEFAULT_REP_SET;
          } else if (tracking.includes('time')) {
            fields = DEFAULT_TIME_SET;
          }

          updatedExercise = {
            ...updatedExercise,
            sets: [
              ...updatedExercise.sets,
              { ...INITIALIZED_SET, id: uuidv4(), fields: fields as SetFields },
            ],
          };

          let updatedSuperset = superset;
          updatedSuperset = {
            ...updatedSuperset,
            exercises: updatedSuperset.exercises.map((item) => {
              if (item.id === exerciseID) {
                return updatedExercise;
              }
              return item;
            }),
          };

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === supersetID) {
                return updatedSuperset;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            }
            return item;
          });
        }
        // Reset state
        state.exerciseIDToMod = null;
        state.supersetIDToMod = null;
        state.sectionIDToMod = null;
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  deleteSet: (exerciseIndex) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Invalid exercise index');
        return;
      }

      const setIndex = state.selectedSetIndexToMod;
      if (setIndex === undefined || setIndex == null) {
        console.error('Invalid set index');
        return;
      }
      if (state.mode === 'edit' || state.mode === 'build') {
        let exercise = state.workoutData[exerciseIndex] as Exercise;
        exercise.sets.splice(setIndex, 1);
        state.workoutData[exerciseIndex] = exercise;
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  deleteSetUpdated: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const exerciseID = get().supersetIDToMod;
        // Delete set of exercise in root
        if (!sectionID && !supersetID && exerciseID) {
          const exercise = state.workoutData.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          const setID = get().setIDToMod;
          if (setID == null) {
            console.error('No setID provided');
            return;
          }
          let updatedExercise = exercise;
          updatedExercise.sets = updatedExercise.sets.filter(
            (set) => set.id !== setID,
          );

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          });
          // Delete set of exercise in section
        } else if (sectionID && !supersetID && exerciseID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const exercise = section.items.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          const setID = state.setIDToMod;
          if (setID == null) {
            console.error('No setID provided');
            return;
          }
          let updatedExercise = exercise;
          updatedExercise.sets = updatedExercise.sets.filter(
            (set) => set.id !== setID,
          );

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === exerciseID) {
                return updatedExercise;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            }
            return item;
          });
          // Delete set of exercise in superset
        } else if (!sectionID && supersetID && exerciseID) {
          const superset = state.workoutData.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          const exercise = superset.exercises.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          const setID = state.setIDToMod;
          if (setID == null) {
            console.error('No setID provided');
            return;
          }
          let updatedExercise = exercise;
          updatedExercise.sets = updatedExercise.sets.filter(
            (set) => set.id !== setID,
          );

          let updatedSuperset = superset;
          updatedSuperset = {
            ...updatedSuperset,
            exercises: updatedSuperset.exercises.map((item) => {
              if (item.id === exerciseID) {
                return updatedExercise;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            }
            return item;
          });
          // Delete set of exercise in superset inside a section
        } else if (sectionID && supersetID && exerciseID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;
          const exercise = superset.exercises.find(
            (item) => item.id === exerciseID,
          ) as Exercise;
          const setID = state.setIDToMod;
          if (setID == null) {
            console.error('No setID provided');
            return;
          }
          let updatedExercise = exercise;
          updatedExercise.sets = updatedExercise.sets.filter(
            (set) => set.id !== setID,
          );

          let updatedSuperset = superset;
          updatedSuperset = {
            ...updatedSuperset,
            exercises: updatedSuperset.exercises.map((item) => {
              if (item.id === exerciseID) {
                return updatedExercise;
              }
              return item;
            }),
          };

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.map((item) => {
              if (item.id === supersetID) {
                return updatedSuperset;
              }
              return item;
            }),
          };

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === sectionID) {
              return updatedSection;
            }
            return item;
          });
        }

        // Reset state
        state.exerciseIDToMod = null;
        state.supersetIDToMod = null;
        state.sectionIDToMod = null;
        state.setIDToMod = null;
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  updateField: (exerciseIndex, updatedField) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Invalid exercise index');
        return;
      }

      const setIndex = get().selectedSetIndexToMod;
      if (setIndex === undefined || setIndex == null) {
        console.error('Invalid set index');
        return;
      }
      let exercise = state.workoutData[exerciseIndex] as Exercise;

      exercise.sets[setIndex] = {
        ...exercise.sets[setIndex],
        fields: { ...exercise.sets[setIndex].fields, ...updatedField },
      };
      state.workoutData[exerciseIndex] = exercise;
      // };
    }),
  updateFieldUpdated: (updatedField) =>
    set((state) => {
      const sectionID = get().sectionIDToMod;
      const supersetID = get().supersetIDToMod;
      const exerciseID = get().supersetIDToMod;
      // Update field of exercise in root
      if (!sectionID && !supersetID && exerciseID) {
        const exercise = state.workoutData.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        // const setID = state.setIDToMod;
        const setID = get().setIDToMod;
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              fields: { ...set.fields, ...updatedField },
            };
          }
          return set;
        });

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === exerciseID) {
            return updatedExercise;
          }
          return item;
        });
        // Update field of exercise in section
      } else if (sectionID && !supersetID && exerciseID) {
        const section = state.workoutData.find(
          (section) => section.id === sectionID,
        ) as Section;
        const exercise = section.items.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        const setID = state.setIDToMod;
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              fields: { ...set.fields, ...updatedField },
            };
          }
          return set;
        });

        let updatedSection = section;
        updatedSection = {
          ...updatedSection,
          items: updatedSection.items.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          }),
        };

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === sectionID) {
            return updatedSection;
          }
          return item;
        });
        // Update field of exercise in superset
      } else if (!sectionID && supersetID && exerciseID) {
        const superset = state.workoutData.find(
          (superset) => superset.id === supersetID,
        ) as Superset;
        const exercise = superset.exercises.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        const setID = state.setIDToMod;
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              fields: { ...set.fields, ...updatedField },
            };
          }
          return set;
        });

        let updatedSuperset = superset;
        updatedSuperset = {
          ...updatedSuperset,
          exercises: updatedSuperset.exercises.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          }),
        };

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === supersetID) {
            return updatedSuperset;
          }
          return item;
        });
        // Update field of exercise in superset inside a section
      } else if (sectionID && supersetID && exerciseID) {
        const section = state.workoutData.find(
          (section) => section.id === sectionID,
        ) as Section;
        const superset = section.items.find(
          (superset) => superset.id === supersetID,
        ) as Superset;
        const exercise = superset.exercises.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        const setID = state.setIDToMod;
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              fields: { ...set.fields, ...updatedField },
            };
          }
          return set;
        });

        let updatedSuperset = superset;
        updatedSuperset = {
          ...updatedSuperset,
          exercises: updatedSuperset.exercises.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          }),
        };

        let updatedSection = section;
        updatedSection = {
          ...updatedSection,
          items: updatedSection.items.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            }
            return item;
          }),
        };

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === sectionID) {
            return updatedSection;
          }
          return item;
        });
      }

      // Reset state
      state.exerciseIDToMod = null;
      state.supersetIDToMod = null;
      state.sectionIDToMod = null;
      state.setIDToMod = null;
    }),
  toggleCompleted: (exerciseIndex, setIndex, value) =>
    set((state) => {
      if (state.mode === 'log') {
        let exercise = state.workoutData[exerciseIndex] as Exercise;
        exercise.sets[setIndex].completed = value;
        state.workoutData[exerciseIndex] = exercise;
        if (value === true) {
          state.workoutData[exerciseIndex].sets[setIndex].completed_at =
            new Date().toISOString();
        } else {
          state.workoutData[exerciseIndex].sets[setIndex].completed_at = null;
        }
      } else {
        console.error(
          'Cannot updated completed checkbox in edit or build mode',
        );
      }
    }),
  toggleCompletedUpdated: (value) =>
    set((state) => {
      // Toggle completed of set in exercise in root

      const sectionID = get().sectionIDToMod;
      const supersetID = get().supersetIDToMod;
      const exerciseID = get().supersetIDToMod;
      const setID = get().setIDToMod;
      if (!sectionID && !supersetID && exerciseID) {
        const exercise = state.workoutData.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              completed: value,
              completed_at: value ? new Date().toISOString() : null,
            };
          }
          return set;
        });

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === exerciseID) {
            return updatedExercise;
          }
          return item;
        });
        // Toggle complete of set of exercise in section
      } else if (sectionID && !supersetID && exerciseID) {
        const section = state.workoutData.find(
          (section) => section.id === sectionID,
        ) as Section;
        const exercise = section.items.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              completed: value,
              completed_at: value ? new Date().toISOString() : null,
            };
          }
          return set;
        });

        let updatedSection = section;
        updatedSection = {
          ...updatedSection,
          items: updatedSection.items.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          }),
        };

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === sectionID) {
            return updatedSection;
          }
          return item;
        });
        // Toggle complete of set of exercise in superset
      } else if (!sectionID && supersetID && exerciseID) {
        const superset = state.workoutData.find(
          (superset) => superset.id === supersetID,
        ) as Superset;
        const exercise = superset.exercises.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              completed: value,
              completed_at: value ? new Date().toISOString() : null,
            };
          }
          return set;
        });

        let updatedSuperset = superset;
        updatedSuperset = {
          ...updatedSuperset,
          exercises: updatedSuperset.exercises.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          }),
        };

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === supersetID) {
            return updatedSuperset;
          }
          return item;
        });
        // Toggle complete of set of exercise in superset inside a section
      } else if (sectionID && supersetID && exerciseID) {
        const section = state.workoutData.find(
          (section) => section.id === sectionID,
        ) as Section;
        const superset = section.items.find(
          (superset) => superset.id === supersetID,
        ) as Superset;
        const exercise = superset.exercises.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        let updatedExercise = exercise;
        updatedExercise.sets = updatedExercise.sets.map((set) => {
          if (set.id === setID) {
            return {
              ...set,
              completed: value,
              completed_at: value ? new Date().toISOString() : null,
            };
          }
          return set;
        });

        let updatedSuperset = superset;
        updatedSuperset = {
          ...updatedSuperset,
          exercises: updatedSuperset.exercises.map((item) => {
            if (item.id === exerciseID) {
              return updatedExercise;
            }
            return item;
          }),
        };

        let updatedSection = section;
        updatedSection = {
          ...updatedSection,
          items: updatedSection.items.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            }
            return item;
          }),
        };

        state.workoutData = state.workoutData.map((item) => {
          if (item.id === sectionID) {
            return updatedSection;
          }
          return item;
        });
      }

      // Reset state
      state.exerciseIDToMod = null;
      state.supersetIDToMod = null;
      state.sectionIDToMod = null;
      state.setIDToMod = null;
    }),
  initializeWorkoutToSave: () =>
    set((state) => {
      if (state.mode === 'build') {
        state.workoutToSave = {
          ...INITIALIZED_WORKOUT_BUILD_TO_SAVE,
          workout_data: { data: state.workoutData },
          title: state.workoutTitle || 'Untitled workout',
        };
      } else {
        state.workoutToSave = {
          ...INITIALIZED_WORKOUT_LOG_TO_SAVE,
          workout_data: { data: state.workoutData },
          title: state.workoutTitle || 'Untitled workout',
          date: new Date().toISOString(),
        };
      }

      state.isWorkoutSavePending = true;
    }),
  addUserIDToWorkoutToSave: (userID) =>
    set((state) => {
      if (state.workoutToSave) {
        state.workoutToSave.user_id = userID;
      } else {
        console.error('workoutToSave is null, cannot add userID');
      }
    }),
  addDurationToWorkoutToSave: (duration) =>
    set((state) => {
      if (
        state.workoutToSave &&
        state.mode !== 'build' &&
        'duration' in state.workoutToSave
      ) {
        state.workoutToSave.duration = duration;
      } else {
        console.error('workoutToSave is null, cannot add userID');
      }
    }),
  resetWorkout: () =>
    set(() => ({
      workoutData: [],
      mode: null,
      workoutToSave: null,
      isWorkoutSavePending: false,
    })),
});
