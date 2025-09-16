import { Set, SetFields, WorkoutBuildRequest } from '@cwt/schema/workouts';

export const INITIAL_WORKOUT_LOG_TITLE: string = 'New workout log';
export const INITIAL_WORKOUT_BUILD_TITLE: string = 'New workout template';

export const INITIALIZED_SET: Omit<Set, 'fields' | 'id'> = {
  completed: false,
  completed_at: null,
};

export const INITIALIZED_WORKOUT_TO_SAVE: Omit<
  WorkoutBuildRequest,
  'workout_data' | 'title'
> = {
  status: 'draft',
  source: 'manual',
  notes: null,
  estimated_duration: null,
  updated_at: null,
  user_id: null,
  description: null,
  goal: null,
};

export const DEFAULT_REP_SET: SetFields = { reps: 10, rest: 'PT30S' };
export const DEFAULT_TIME_SET: SetFields = { time: 'PT30S', rest: 'PT30S' };
