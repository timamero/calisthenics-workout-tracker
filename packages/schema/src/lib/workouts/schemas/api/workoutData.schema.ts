import { z } from 'zod';

import { TrackingTypeSchema } from '../enums.schema';

export const SetProgressionSchema = z.object({
  id: z.string(),
  set_progression_id: z.number(),
  value: z.union([z.number(), z.string(), z.null()]),
});
// export const LeverageSchema = z.object({
//   id: z.string(),
//   leverages_assists_id: z.number(),
//   value: z.union([z.number(), z.string(), z.null()]),
// });

// export const AssistSchema = z.object({
//   id: z.string(),
//   leverages_assists_id: z.number(),
//   value: z.union([z.number(), z.string(), z.null()]),
// });

export const SetFieldsSchema = z.object({
  reps: z.nullable(z.number()),
  time: z.nullable(z.string()), // ISO 8601 duration
  rest: z.nullable(z.string()), // ISO 8601 duration
  setProgressions: z.nullable(z.array(SetProgressionSchema)),
});

export const SetSchema = z.object({
  id: z.string(),
  fields: SetFieldsSchema,
  completed: z.boolean(),
  completed_at: z.nullable(z.string()), // ISO 8601 datetime
});

export const ExerciseSchema = z.object({
  id: z.string(),
  exercise_id: z.number(),
  order: z.number(),
  type: z.literal('exercise'),
  tracked: z.array(z.string()),
  sets: z.array(SetSchema),
});

export const SupersetSchema = z.object({
  id: z.string(),
  order: z.number(),
  type: z.literal('superset'),
  exercises: z.array(ExerciseSchema),
});

export const SectionSchema = z.object({
  id: z.string(),
  name: z.nullable(z.string()),
  order: z.number(),
  type: z.literal('section'),
  items: z.array(z.union([ExerciseSchema, SupersetSchema])),
});

export const WorkoutDataSchema = z.object({
  data: z.array(z.union([ExerciseSchema, SectionSchema, SupersetSchema])),
});
