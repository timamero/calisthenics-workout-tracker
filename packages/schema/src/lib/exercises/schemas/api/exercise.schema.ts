import { z } from 'zod';

import {
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
  TrackingSchema,
} from '../enums.schema';

export const ExerciseResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  target_muscles: z.array(MuscleSchema),
  required_equipment: z.array(z.optional(EquipmentSchema)),
  emphasis: EmphasisSchema,
  difficulty: DifficultySchema,
  tags: z.array(z.string()),
  instructions: z.array(z.string()),
  default_tracking_type: z.array(TrackingSchema),
  video_url: z.nullable(z.string()),
  source: z.string().default('default'),
  updated_at: z.nullable(z.date()),
  created_at: z.date().default(() => new Date()),
  default_leverage_id: z.nullable(z.number()),
  default_assist_id: z.nullable(z.number()),
});
