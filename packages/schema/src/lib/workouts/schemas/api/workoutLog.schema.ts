import { z } from 'zod';

import { GoalSchema, StatusSchema } from '../enums.schema';
import { WorkoutDataSchema } from './workoutData.schema';

const WorkoutLogBase = z.object({
  workout_build_id: z.nullable(z.int()),
  user_id: z.uuid(),
  date: z.iso.time(),
  title: z.nullable(z.string().max(70)),
  description: z.nullable(z.string().max(500)),
  duration: z.iso.time(),
  workout_data: WorkoutDataSchema,
  rpe: z.nullable(z.number().lte(10)),
  notes: z.nullable(z.string().max(750)),
  status: StatusSchema,
  updated_at: z.nullable(z.iso.time()),
  goal: z.nullable(GoalSchema),
});

export const WorkoutLogRequestSchema = z.object({
  ...WorkoutLogBase.shape
});

export const WorkoutLogResponseSchema = z.object({
  id: z.number(),
  created_at: z.iso.time(),
  ...WorkoutLogBase.shape
});
