import { z } from 'zod';

import { TrackingTypeSchema } from './enums.schema';

export const SetFieldsSchema = z.object({
  reps: z.optional(z.number()),
  weight: z.optional(z.number()),
  time: z.optional(z.iso.time()),
  rest: z.optional(z.iso.time()),
});

export const SetSchema = z.object({
  id: z.uuid(),
  fields: SetFieldsSchema,
  completed: z.boolean(),
  completed_at: z.nullable(z.iso.datetime()),
});

export const WorkoutExerciseSchema = z.object({
  id: z.uuid(),
  exercise_id: z.int(),
  tracked: z.array(TrackingTypeSchema),
  sets: z.array(SetSchema),
});

export const WorkoutDataSchema = z.object({
  exercises: z.array(WorkoutExerciseSchema),
});
