// ****** Workout building flow
// When user starts workout building workout state is initialized with metadata and mode is set to build
// The possible values for mode are build, edit, log (will get to edit and log modes in workout logging flow)
// Initial status of workout is draft
// When user selects and exercise and clicks "Add Exercise" button, the exercise is added to workout state and initialized with one set (the first set cannot be deleted)
// For each exercise, user can add sets, delete sets (over set 1), update tracking field value, and delete an exercise
// For now, the tracking field available is only the default. In future release, will allow users to customize tracking fields
// When the user is done building the workout, they can save the workout. Workout is added to workout builds list and sent to database.
// Ensure the build status is changed to finalized before sending to database.

// import { StateCreator } from "zustand";

// import type { WorkoutBuild } from "@cwt/schema/workouts";

// import { StoreState } from "../../store";

// const INITIALIZED_WORKOUT_BUILD: Partial<WorkoutBuild> = {
//   title: "New workout template",
//   workout_data: {exercises: []},
//   status: "draft",
//   source: "manual"
// }
// export interface WorkoutBuildSlice {
//   workoutBuild: Partial<WorkoutBuild> | null;
//   initializeWorkoutBuild: () => void;
// }

// export const createWorkoutBuildSlice: StateCreator<
//   StoreState,
//   [],
//   [],
//   WorkoutBuildSlice
// > = (set, get) => ({
//   workoutBuild: null,
//   initializeWorkoutBuild: () => set(() => ({workoutBuild: INITIALIZED_WORKOUT_BUILD}))
// })