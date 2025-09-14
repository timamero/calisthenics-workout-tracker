import { z } from 'zod';

import {
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
} from '../enums.schema';

// Previously SelectionSchema
export const AttributesSchema = z.union([
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
]);
