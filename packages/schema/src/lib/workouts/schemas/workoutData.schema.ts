import { z } from 'zod';

import { DurationSchema } from '../../common/schemas/duration.schema';
import { TrackingTypeSchema } from './enums.schema';

const SetFieldsSchema = z.object({
  reps: z.optional(z.number()),
  weight: z.optional(z.number()),
  duration: z.optional(DurationSchema),
  rest: z.optional(DurationSchema),
});

const SetSchema = z.object({
  fields: SetFieldsSchema,
  completed: z.boolean(),
  completed_at: z.date()
});

const WorkoutExerciseSchema = z.object({
  Exercise_id: z.int(),
  tracked: z.array(TrackingTypeSchema),
  sets: z.array(SetSchema)
})

export const WorkoutDataSchema = z.object({
  exercises: z.array(WorkoutExerciseSchema)
})
