import { z } from 'zod';

import {
  ExerciseAttributesSchema,
  Exercise,
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
  ExerciseFilterSchema,
  ExerciseFilterKeySchema,
  ExerciseFilterCheckboxSchema
} from './schemas';

export type Muscle = z.infer<typeof MuscleSchema>;
export type Equipment = z.infer<typeof EquipmentSchema>;
export type Emphasis = z.infer<typeof EmphasisSchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;
export type ExerciseAttributes = z.infer<typeof ExerciseAttributesSchema>; // Prevously Selection
export type Exercise = z.infer<typeof Exercise>;
export type ExerciseFilter = z.infer<typeof ExerciseFilterSchema>;
export type ExerciseFilterKey = z.infer<typeof ExerciseFilterKeySchema>;
export type ExerciseFilterCheckbox = z.infer<typeof ExerciseFilterCheckboxSchema>;
