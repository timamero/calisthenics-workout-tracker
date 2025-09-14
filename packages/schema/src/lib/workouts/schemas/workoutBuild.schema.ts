import { z } from 'zod';

import { WorkoutBase } from './workoutBase.schema';
import { GoalSchema, StatusSchema, SourceSchema } from './enums.schema';
import { WorkoutDataSchema } from './workoutData.schema';

export const WorkoutBuildSchema = z.object({
  ...WorkoutBase.shape,
  user_id: z.optional(z.uuid()),
  duration: z.nullable(z.iso.time()),
  source: SourceSchema,
});

// export const WorkoutBuildRequestSchema = z.object({
//   updated_at: z.nullable(z.iso.time()),
//   title: z.nullable(z.string().max(70)),
//   description: z.nullable(z.string().max(500)),
//   workout_data: WorkoutDataSchema,
//   status: StatusSchema,
//   goal: z.nullable(GoalSchema),
//   notes: z.nullable(z.string().max(750)),
//   user_id: z.nullable(z.uuid()),
//   estimated_duration: z.nullable(z.iso.time()),
//   source: SourceSchema,
// });

// export const WorkoutBuildResponseSchema = z.object({
//   id: z.number(),
//   created_at: z.iso.time(),
//   updated_at: z.nullable(z.iso.time()),
//   user_id: z.optional(z.uuid()),
//   title: z.nullable(z.string().max(70)),
//   description: z.optional(z.string().max(500)),
//   workout_data: WorkoutDataSchema,
//   status: StatusSchema,
//   goal: z.optional(GoalSchema),
//   notes: z.nullable(z.string().max(750)),
//   estimated_duration: z.nullable(z.iso.time()),
//   source: SourceSchema,
// });
