import { z } from 'zod';

import { WorkoutBase } from './workoutBase.schema';
import { DurationSchema } from '../../common/schemas/duration.schema';

export const WorkoutLogSchema = z.object({
  ...WorkoutBase.shape,
  user_id: z.uuid(),
  workout_build_id: z.int(),
  date: z.date(),
  duration: DurationSchema,
  rpe: z.optional(z.number().lte(10)),
});
