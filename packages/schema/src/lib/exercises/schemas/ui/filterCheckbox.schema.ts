import { z } from 'zod';
import {
  DifficultySchema,
  EmphasisSchema,
  EquipmentSchema,
  MuscleSchema,
} from '../enums.schema';
import { AttributesSchema } from './attributes.schema';

const FilterKeyNameSchema = z.object({
  target_muscles: z.array(MuscleSchema),
  required_equipment: z.array(EquipmentSchema),
  emphasis: z.array(EmphasisSchema),
  difficulty: z.array(DifficultySchema),
});

export const FilterCheckboxKeySchema = FilterKeyNameSchema.keyof();

export const FilterCheckboxSchema = z.object({
  keyName: FilterCheckboxKeySchema,
  selection: AttributesSchema,
  value: z.optional(z.boolean()),
});
