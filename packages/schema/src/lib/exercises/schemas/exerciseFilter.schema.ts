import { z } from 'zod';
import {
  DifficultySchema,
  EmphasisSchema,
  EquipmentSchema,
  MuscleSchema,
} from './enums.schema';
import { ExerciseAttributesSchemaSuperseded as ExerciseAttributesSchema } from './exerciseAttributes.schema';

const ExerciseFilterSchema = z.object({
  target_muscles: z.array(MuscleSchema),
  required_equipment: z.array(EquipmentSchema),
  emphasis: z.array(EmphasisSchema),
  difficulty: z.array(DifficultySchema),
});

export const ExerciseFilterKeySchema = ExerciseFilterSchema.keyof();

export const ExerciseFilterCheckboxSchema = z.object({
  keyName: ExerciseFilterKeySchema,
  selection: ExerciseAttributesSchema,
  value: z.optional(z.boolean()),
});
