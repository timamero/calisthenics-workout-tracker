import { WorkoutLogResponseSchema } from '../api/workoutLog.schema';

export const WorkoutLogLimitedDetailsSchema = WorkoutLogResponseSchema.pick({
  date: true,
  title: true,
  description: true,
  duration: true,
  goal: true,
});
