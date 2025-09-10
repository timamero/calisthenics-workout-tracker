import { Set, SetFields } from '@cwt/schema/workouts';

// import { WorkoutLogDraft, WorkoutBuildDraft } from './workoutDraftSlice';

export const INITIAL_WORKOUT_LOG_TITLE: string = 'New workout log';
export const INITIAL_WORKOUT_BUILD_TITLE: string = 'New workout template';

// export const INITIALIZED_WORKOUT_LOG: Omit<WorkoutLogDraft, 'date' | 'title'> =
//   {
//     workout_data: { exercises: [] },
//     status: 'draft',
//   };

// export const INITIALIZED_WORKOUT_BUILD: Omit<WorkoutBuildDraft, 'title'> = {
//   workout_data: { exercises: [] },
//   status: 'draft',
//   source: 'manual',
// };

export const INITIALIZED_SET: Omit<Set, 'fields' | 'id'> = {
  completed: false,
  completed_at: null,
};

export const DEFAULT_REP_SET: SetFields = { reps: 10, rest: 'PT30S' };
export const DEFAULT_TIME_SET: SetFields = { time: 'PT30S', rest: 'PT30S' };
