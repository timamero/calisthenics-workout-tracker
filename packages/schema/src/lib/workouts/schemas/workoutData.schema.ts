import { z } from 'zod';

import { DurationSchema } from '../../common/schemas/duration.schema';
import { TrackingTypeSchema } from './enums.schema';

export const SetFieldsSchema = z.object({
  reps: z.optional(z.number()),
  weight: z.optional(z.number()),
  duration: z.optional(z.iso.time()),
  rest: z.optional(z.iso.time()),
});

export const SetSchema = z.object({
  fields: SetFieldsSchema,
  completed: z.boolean(),
  completed_at: z.nullable(z.date()),
});

export const WorkoutExerciseSchema = z.object({
  exercise_id: z.int(),
  tracked: z.array(TrackingTypeSchema),
  sets: z.array(SetSchema),
});

export const WorkoutDataSchema = z.object({
  exercises: z.array(WorkoutExerciseSchema),
});
