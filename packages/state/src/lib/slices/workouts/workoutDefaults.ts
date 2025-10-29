import {
  Set,
  SetFields,
  WorkoutBuildRequest,
  WorkoutLogRequest,
} from '@cwt/schema/workouts';

export const INITIAL_WORKOUT_LOG_TITLE: string = 'New workout log';
export const INITIAL_WORKOUT_BUILD_TITLE: string = 'New workout template';

export const INITIALIZED_SET: Omit<Set, 'fields' | 'id'> = {
  completed: false,
  completed_at: null,
};

export const INITIALIZED_WORKOUT_BUILD_TO_SAVE: Omit<
  WorkoutBuildRequest,
  'workout_data' | 'title'
> = {
  status: 'finalized',
  source: 'manual',
  notes: null,
  estimated_duration: null,
  updated_at: null,
  user_id: null,
  description: null,
  goal: null,
};

export const INITIALIZED_WORKOUT_LOG_TO_SAVE: Omit<
  WorkoutLogRequest,
  'workout_data' | 'title' | 'date'
> = {
  workout_build_id: null,
  status: 'finalized',
  notes: null,
  updated_at: null,
  description: null,
  goal: null,
  rpe: null,
  user_id: null,
  duration: null,
};

export const DEFAULT_FIELDS: SetFields = {
  reps: null,
  time: null,
  weight: null,
  rest: null,
  leverages: null,
  assists: null,
};

export const DEFAULT_REP_SET: Pick<SetFields, 'reps'> = {
  // ...DEFAULT_FIELDS,
  reps: 10,
  // rest: 'PT30S',
};
export const DEFAULT_TIME_SET: Pick<SetFields, 'time'> = {
  // ...DEFAULT_FIELDS,
  time: 'PT30S',
  // rest: 'PT30S',
};
export const DEFAULT_REST_SET: Pick<SetFields, 'rest'> = {
  // ...DEFAULT_FIELDS,
  // time: 'PT30S',
  rest: 'PT30S',
};
