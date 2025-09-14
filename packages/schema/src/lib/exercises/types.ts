import { z } from 'zod';

import {
  ExerciseAttributesSchemaSuperseded as ExerciseAttributesSchema,
  ExerciseResponseSchema,
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
  TrackingSchema,
  ExerciseFilterSchema,
  ExerciseFilterKeySchema,
  ExerciseFilterCheckboxSchema,
  AttributesSchema,
  FilterCheckboxSchema,
  FilterCheckboxKeySchema,
  FilterKeyNameSchema,
} from './schemas';

export type Muscle = z.infer<typeof MuscleSchema>;
export type Equipment = z.infer<typeof EquipmentSchema>;
export type Emphasis = z.infer<typeof EmphasisSchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;
export type Tracking = z.infer<typeof TrackingSchema>;
export type ExerciseAttributes = z.infer<typeof ExerciseAttributesSchema>;
export type Attributes = z.infer<typeof AttributesSchema>;
export type FilterCheckbox = z.infer<typeof FilterCheckboxSchema>;
export type FilterCheckboxKey = z.infer<typeof FilterCheckboxKeySchema>;
export type FilterKeyName = z.infer<typeof FilterKeyNameSchema>;
export type ExerciseResponse = z.infer<typeof ExerciseResponseSchema>;
export type ExerciseFilter = z.infer<typeof ExerciseFilterSchema>;
export type ExerciseFilterKey = z.infer<typeof ExerciseFilterKeySchema>;
export type ExerciseFilterCheckbox = z.infer<
  typeof ExerciseFilterCheckboxSchema
>;
