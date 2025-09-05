import { Set, SetFields } from '@cwt/schema/workouts';

export const INITIALIZED_SET: Omit<Set, 'fields'> = {
  completed: false,
  completed_at: null,
};

export const DEFAULT_REP_SET: SetFields = { reps: 10, rest: 'PT30S' };
export const DEFAULT_TIME_SET: SetFields = { time: 'PT30S', rest: 'PT30S' };
