import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import type {
  Exercise,
  SetFields,
  WorkoutBuildRequest,
  WorkoutLogRequest,
  Mode,
  Section,
  Superset,
  Leverage,
  Assist,
} from '@cwt/schema/workouts';
import type { Tracking } from '@cwt/schema/exercises';

import {
  INITIAL_WORKOUT_LOG_TITLE,
  INITIAL_WORKOUT_BUILD_TITLE,
  INITIALIZED_SET,
  INITIALIZED_WORKOUT_BUILD_TO_SAVE,
  INITIALIZED_WORKOUT_LOG_TO_SAVE,
} from './workoutDefaults';
import {
  createFields,
  updateLeverageOrAssistFieldInSets,
} from './workoutDraftActions';
import { useExerciseLibraryStore } from '../../stores/exercises/exerciseLibraryStore';
import { useLeveragesAssistsStore } from '../../stores/leveragesAssistsStore';

interface WorkoutDraftState {
  mode: Mode | null;
  workoutData: Array<Exercise | Section | Superset>;
  workoutTitle: string | null;
  selectedExerciseIDToAdd: number | null;
  selectedSetIndexToMod: number | null;
  setIDToMod: string | null;
  setIndexToMod: number | null;
  selectedExerciseIndexToMod: number | null;
  exerciseIDToMod: string | null;
  supersetIDToMod: string | null;
  sectionIDToMod: string | null;
  leverageOrAssistIDToMod: string | null;
  isWorkoutSavePending: boolean;
  workoutToSave: WorkoutBuildRequest | WorkoutLogRequest | null;
}

interface WorkoutDraftAction {
  initializeWorkout: (mode: Mode) => void;
  setMode: (mode: Mode) => void;
  setWorkoutData: (
    workoutData: Array<Exercise | Section | Superset> | null,
  ) => void;
  setWorkoutTitle: (title: string) => void;
  setSelectedExerciseIDToAdd: (exerciseID: number | null) => void;
  setSetIDToMod: (id: string | null) => void;
  setSetIndexToMod: (index: number | null) => void;
  setExerciseIDToMod: (id: string | null) => void;
  setSupersetIDToMod: (id: string | null) => void;
  setSectionIDToMod: (id: string | null) => void;
  setLeverageOrAssistIDToMod: (id: string | null) => void;
  addSection: () => void; // CWT-230
  addSuperset: (sectionID: string | null) => void;
  addExercise: (tracking: Tracking[]) => void;
  removeRootItem: (id: string) => void;
  removeNestedItem: () => void;
  reorderRootItem: (id: string, newOrder: number) => void;
  reorderNestedItem: (newOrder: number) => void;
  addSet: () => void;
  addSetToSuperset: () => void;
  deleteSet: () => void;
  deleteSetInSuperset: () => void;
  updateField: (updatedField: Partial<SetFields>) => void;
  updateLeverageOrAssistField: (
    updatedField: Pick<Leverage, 'value'> | Pick<Assist, 'value'>,
  ) => void;
  // TODO: Create this later after refactoring this slice
  // getFieldByID: (
  //   id: string,
  //   setID: string,
  //   exerciseID: string,
  // ) => Leverage | Assist;
  toggleCompleted: (value: boolean) => void;
  initializeWorkoutToSave: () => void;
  addUserIDToWorkoutToSave: (userID: string) => void;
  addDurationToWorkoutToSave: (duration: string) => void;
  resetWorkout: () => void;
}

export type WorkoutDraftSlice = WorkoutDraftState & WorkoutDraftAction;

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
  setIndexToMod: null,
  selectedExerciseIndexToMod: null,
  exerciseIDToMod: null,
  supersetIDToMod: null,
  sectionIDToMod: null,
  leverageOrAssistIDToMod: null,
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
  setWorkoutData: (workoutData) =>
    set((state) => {
      if (workoutData) {
        state.workoutData = workoutData;
      }
    }),
  setWorkoutTitle: (title) =>
    set((state) => {
      state.workoutTitle = title;
    }),
  setSelectedExerciseIDToAdd: (exerciseID) =>
    set((state) => {
      state.selectedExerciseIDToAdd = exerciseID;
    }),
  setSetIDToMod: (id) =>
    set((state) => {
      state.setIDToMod = id;
    }),
  setSetIndexToMod: (index) =>
    set((state) => {
      state.setIndexToMod = index;
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
  setLeverageOrAssistIDToMod: (id) =>
    set((state) => {
      state.leverageOrAssistIDToMod = id;
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

      state.sectionIDToMod = null;
    }),
  addExercise: (tracking) =>
    set((state) => {
      const exerciseID = state.selectedExerciseIDToAdd;
      if (exerciseID == null) {
        console.error('No exerciseID provided');
        return;
      }

      if (state.mode === 'edit' || state.mode === 'build') {
        const selectedExercise = useExerciseLibraryStore
          .getState()
          .getExerciseByID(exerciseID);
        const getLeverageOrAssist = (id: number) =>
          useLeveragesAssistsStore.getState().getLeverageOrAssistByID(id);

        const fields = createFields(
          tracking,
          exerciseID,
          selectedExercise,
          getLeverageOrAssist,
        );

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
          // Add sets to exercise inside superset if existing exercises have more than one set
          if (superset.exercises.length >= 1) {
            const numOfSets = superset.exercises[0].sets.length;

            for (let i = 1; i < numOfSets; i++) {
              exercise.sets = [
                ...exercise.sets,
                { ...INITIALIZED_SET, id: uuidv4(), fields: fields },
              ];
            }
          }
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
            // Add sets to exercise inside superset if existing exercises have more than one set
            if (updatedItem.exercises.length >= 1) {
              const numOfSets = updatedItem.exercises[0].sets.length;

              for (let i = 1; i < numOfSets; i++) {
                exercise.sets = [
                  ...exercise.sets,
                  { ...INITIALIZED_SET, id: uuidv4(), fields: fields },
                ];
              }
            }
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
        const exerciseID = get().exerciseIDToMod;
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
          const itemIDToRemove = supersetID ? supersetID : exerciseID;

          let updatedSection = section;
          updatedSection = {
            ...updatedSection,
            items: updatedSection.items.filter(
              (item) => item.id !== itemIDToRemove,
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
  reorderNestedItem: (newOrder) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const exerciseID = get().exerciseIDToMod;
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

        // Reset state
        state.exerciseIDToMod = null;
        state.supersetIDToMod = null;
        state.sectionIDToMod = null;
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  addSet: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const exerciseID = get().exerciseIDToMod;

        // Prepare helper for creating fields
        const getLeverageOrAssist = (id: number) =>
          useLeveragesAssistsStore.getState().getLeverageOrAssistByID(id);

        // Add set to exercise in root
        if (!sectionID && !supersetID && exerciseID) {
          const exercise = state.workoutData.find(
            (item) => item.id === exerciseID,
          );
          let updatedExercise = exercise as Exercise;
          const tracking = updatedExercise.tracked;

          const selectedExercise = useExerciseLibraryStore
            .getState()
            .getExerciseByID(updatedExercise.exercise_id);
          const fields = createFields(
            tracking,
            updatedExercise.exercise_id,
            selectedExercise,
            getLeverageOrAssist,
          );

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

          const selectedExercise = useExerciseLibraryStore
            .getState()
            .getExerciseByID(updatedExercise.exercise_id);
          const fields = createFields(
            tracking,
            updatedExercise.exercise_id,
            selectedExercise,
            getLeverageOrAssist,
          );

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

          const selectedExercise = useExerciseLibraryStore
            .getState()
            .getExerciseByID(updatedExercise.exercise_id);
          const fields = createFields(
            tracking,
            updatedExercise.exercise_id,
            selectedExercise,
            getLeverageOrAssist,
          );

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

          const selectedExercise = useExerciseLibraryStore
            .getState()
            .getExerciseByID(updatedExercise.exercise_id);
          const fields = createFields(
            tracking,
            updatedExercise.exercise_id,
            selectedExercise,
            getLeverageOrAssist,
          );

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
  addSetToSuperset: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;

        if (!supersetID) {
          console.error('No supersetID provided');
          return;
        }

        // Add set to each exercise in superset at root level
        if (!sectionID && supersetID) {
          const superset = state.workoutData.find(
            (superset) => superset.id === supersetID,
          ) as Superset;

          const getLeverageOrAssist = (id: number) =>
            useLeveragesAssistsStore.getState().getLeverageOrAssistByID(id);

          let updatedSuperset = superset;
          updatedSuperset.exercises = updatedSuperset.exercises.map(
            (exercise) => {
              const tracking = exercise.tracked;
              const selectedExercise = useExerciseLibraryStore
                .getState()
                .getExerciseByID(exercise.exercise_id);
              const fields = createFields(
                tracking,
                exercise.exercise_id,
                selectedExercise,
                getLeverageOrAssist,
              );

              return {
                ...exercise,
                sets: [
                  ...exercise.sets,
                  {
                    ...INITIALIZED_SET,
                    id: uuidv4(),
                    fields: fields as SetFields,
                  },
                ],
              };
            },
          );

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            }
            return item;
          });
          // Add set to each exercise in superset inside a section
        } else if (sectionID && supersetID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;

          const getLeverageOrAssist = (id: number) =>
            useLeveragesAssistsStore.getState().getLeverageOrAssistByID(id);

          let updatedSuperset = superset;
          updatedSuperset.exercises = updatedSuperset.exercises.map(
            (exercise) => {
              const tracking = exercise.tracked;
              const selectedExercise = useExerciseLibraryStore
                .getState()
                .getExerciseByID(exercise.exercise_id);
              const fields = createFields(
                tracking,
                exercise.exercise_id,
                selectedExercise,
                getLeverageOrAssist,
              );

              return {
                ...exercise,
                sets: [
                  ...exercise.sets,
                  {
                    ...INITIALIZED_SET,
                    id: uuidv4(),
                    fields: fields as SetFields,
                  },
                ],
              };
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
            }
            return item;
          });
        }

        // Reset state
        state.sectionIDToMod = null;
        state.supersetIDToMod = null;
      } else {
        console.error('Cannot add set in log mode');
      }
    }),
  deleteSet: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const exerciseID = get().exerciseIDToMod;

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
  deleteSetInSuperset: () =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        const sectionID = get().sectionIDToMod;
        const supersetID = get().supersetIDToMod;
        const setIndex = get().setIndexToMod;

        if (!supersetID || setIndex === null) {
          console.error('No supersetID or setIndex provided');
          return;
        }

        // Delete set from each exercise in superset at root level
        if (!sectionID && supersetID) {
          const superset = state.workoutData.find(
            (superset) => superset.id === supersetID,
          ) as Superset;

          const exercisesLength = superset.exercises.length;
          if (setIndex >= exercisesLength) {
            console.error('setIndex is out of range');
            return;
          }

          let updatedSuperset = superset;
          updatedSuperset.exercises = updatedSuperset.exercises.map(
            (exercise) => {
              return {
                ...exercise,
                sets: exercise.sets.filter((_, index) => index !== setIndex),
              };
            },
          );

          state.workoutData = state.workoutData.map((item) => {
            if (item.id === supersetID) {
              return updatedSuperset;
            }
            return item;
          });
          // Delete set from each exercise in superset inside a section
        } else if (sectionID && supersetID) {
          const section = state.workoutData.find(
            (section) => section.id === sectionID,
          ) as Section;
          const superset = section.items.find(
            (superset) => superset.id === supersetID,
          ) as Superset;

          const exercisesLength = superset.exercises.length;

          if (setIndex >= exercisesLength) {
            console.error('setIndex is out of range');
            return;
          }

          let updatedSuperset = superset;
          updatedSuperset.exercises = updatedSuperset.exercises.map(
            (exercise) => {
              return {
                ...exercise,
                sets: exercise.sets.filter((set, index) => index !== setIndex),
              };
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
            }
            return item;
          });
        }

        // Reset state
        state.sectionIDToMod = null;
        state.supersetIDToMod = null;
        state.setIndexToMod = null;
      } else {
        console.error('Cannot delete set in log mode');
      }
    }),
  updateField: (updatedField) =>
    set((state) => {
      const sectionID = get().sectionIDToMod;
      const supersetID = get().supersetIDToMod;
      const exerciseID = get().exerciseIDToMod;

      // Update field of exercise in root
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
  updateLeverageOrAssistField: (updatedField) =>
    set((state) => {
      const sectionID = get().sectionIDToMod;
      const supersetID = get().supersetIDToMod;
      const exerciseID = get().exerciseIDToMod;
      const leverageOrAssistID = get().leverageOrAssistIDToMod;
      const setID = get().setIDToMod;

      // Update field of exercise in root
      if (!sectionID && !supersetID && exerciseID) {
        const exercise = state.workoutData.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;

        updatedExercise.sets = updateLeverageOrAssistFieldInSets(
          updatedExercise.sets,
          updatedField,
          setID,
          leverageOrAssistID,
        );

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
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updateLeverageOrAssistFieldInSets(
          updatedExercise.sets,
          updatedField,
          setID,
          leverageOrAssistID,
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
        // Update field of exercise in superset
      } else if (!sectionID && supersetID && exerciseID) {
        const superset = state.workoutData.find(
          (superset) => superset.id === supersetID,
        ) as Superset;
        const exercise = superset.exercises.find(
          (item) => item.id === exerciseID,
        ) as Exercise;
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updateLeverageOrAssistFieldInSets(
          updatedExercise.sets,
          updatedField,
          setID,
          leverageOrAssistID,
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
        if (setID == null) {
          console.error('No setID provided');
          return;
        }
        let updatedExercise = exercise;
        updatedExercise.sets = updateLeverageOrAssistFieldInSets(
          updatedExercise.sets,
          updatedField,
          setID,
          leverageOrAssistID,
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
      state.leverageOrAssistIDToMod = null;
    }),
  toggleCompleted: (value) =>
    set((state) => {
      // Toggle completed of set in exercise in root

      const sectionID = get().sectionIDToMod;
      const supersetID = get().supersetIDToMod;
      const exerciseID = get().exerciseIDToMod;
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
// 2080 lines
