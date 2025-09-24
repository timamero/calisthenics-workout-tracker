import { z } from 'zod';

import { GoalSchema, StatusSchema } from '../enums.schema';
import { WorkoutDataSchema } from './workoutData.schema';

const WorkoutLogBase = z.object({
  workout_build_id: z.nullable(z.int()),
  date: z.iso.datetime(),
  title: z.nullable(z.string().max(70)),
  description: z.nullable(z.string().max(500)),
  duration: z.iso.time(),
  workout_data: WorkoutDataSchema,
  rpe: z.nullable(z.number().lte(10)),
  notes: z.nullable(z.string().max(750)),
  status: StatusSchema,
  updated_at: z.nullable(z.iso.datetime()),
  goal: z.nullable(GoalSchema),
});

export const WorkoutLogRequestSchema = z.object({
  ...WorkoutLogBase.shape,
  user_id: z.nullable(z.uuid()),
});

export const WorkoutLogResponseSchema = z.object({
  id: z.number(),
  created_at: z.iso.datetime(),
  user_id: z.uuid(),
  ...WorkoutLogBase.shape,
});
