import {
  Set,
  SetFields,
  WorkoutBuildRequest,
  WorkoutLogRequest,
} from '@cwt/schema/workouts';

export const INITIAL_WORKOUT_LOG_TITLE = 'New workout log' as const;
export const INITIAL_WORKOUT_BUILD_TITLE = 'New workout template' as const;

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
  rest: null,
  setProgressions: null,
} as const;

export const DEFAULT_REP_SET: Pick<SetFields, 'reps'> = {
  reps: 10,
} as const;
export const DEFAULT_TIME_SET: Pick<SetFields, 'time'> = {
  time: 'PT30S',
} as const;
export const DEFAULT_REST_SET: Pick<SetFields, 'rest'> = {
  rest: 'PT30S',
} as const;
