import { z } from "zod";

import { MuscleSchema, EquipmentSchema, EmphasisSchema, DifficultySchema } from "./enums.schema";

// Previously SelectionSchema
export const ExerciseAttributesSchema = z.union([
  MuscleSchema, EquipmentSchema, EmphasisSchema, DifficultySchema
])