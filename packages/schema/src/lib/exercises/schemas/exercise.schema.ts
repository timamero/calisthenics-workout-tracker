import { z } from "zod";

import { MusclesSchema, EquipmentsSchema, EmphasisSchema, DifficultySchema } from "./enums.schema";

export const Exercise = z.object({
  id: z.number(),
  name: z.string(),
  target_muscles: MusclesSchema,
  required_equipment: z.optional(EquipmentsSchema.nullable()),
  emphasis: EmphasisSchema,
  difficulty: DifficultySchema,
  tags: z.array(z.string()),
  instructions: z.array(z.string()),
});