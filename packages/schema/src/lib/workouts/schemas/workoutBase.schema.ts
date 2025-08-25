import { z } from 'zod';

import { GoalSchema, StatusSchema } from './enums.schema';
import { WorkoutDataSchema } from './workoutData.schema';

export const WorkoutBase = z.object({
  id: z.number(),
  created_at: z.iso.time(),
  updated_at: z.nullable(z.iso.time()),
  title: z.nullable(z.string().max(70)),
  description: z.optional(z.string().max(500)),
  workout_data: WorkoutDataSchema,
  status: StatusSchema,
  goal: z.optional(GoalSchema),
  notes: z.nullable(z.string().max(750)),
});
