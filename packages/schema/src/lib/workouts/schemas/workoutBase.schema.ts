import { z } from 'zod';

import { GoalSchema, StatusSchema } from './enums.schema';
import { WorkoutDataSchema } from './workoutData.schema';

export const WorkoutBase = z.object({
  id: z.number(),
  updated_at: z.date(),
  title: z.optional(z.string().max(70)),
  description: z.optional(z.string().max(500)),
  workout_data: WorkoutDataSchema,
  status: StatusSchema,
  goal: z.optional(GoalSchema),
  notes: z.optional(z.string().max(750)),
});
