import { z } from 'zod';

import {
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
} from './enums.schema';

export const Exercise = z.object({
  id: z.number(),
  name: z.string(),
  target_muscles: z.array(MuscleSchema),
  // target_muscles: MusclesSchema,
  required_equipment: z.array(z.optional(EquipmentSchema)),
  emphasis: EmphasisSchema,
  difficulty: DifficultySchema,
  tags: z.array(z.string()),
  instructions: z.array(z.string()),
});
