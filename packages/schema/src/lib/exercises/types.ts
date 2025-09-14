import { z } from 'zod';

import {
  ExerciseAttributesSchema,
  ExerciseResponseSchema,
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
  TrackingSchema,
  ExerciseFilterSchema,
  ExerciseFilterKeySchema,
  ExerciseFilterCheckboxSchema,
} from './schemas';

export type Muscle = z.infer<typeof MuscleSchema>;
export type Equipment = z.infer<typeof EquipmentSchema>;
export type Emphasis = z.infer<typeof EmphasisSchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;
export type Tracking = z.infer<typeof TrackingSchema>;
export type ExerciseAttributes = z.infer<typeof ExerciseAttributesSchema>; // Prevously Selection
export type ExerciseResponse = z.infer<typeof ExerciseResponseSchema>;
export type ExerciseFilter = z.infer<typeof ExerciseFilterSchema>;
export type ExerciseFilterKey = z.infer<typeof ExerciseFilterKeySchema>;
export type ExerciseFilterCheckbox = z.infer<
  typeof ExerciseFilterCheckboxSchema
>;
