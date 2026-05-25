import { z } from 'zod';

import {
  ExerciseResponseSchema,
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema,
  TrackingSchema,
  AttributesSchema,
  FilterCheckboxSchema,
  FilterCheckboxKeySchema,
} from './schemas';

export type Muscle = z.infer<typeof MuscleSchema>;
export type Equipment = z.infer<typeof EquipmentSchema>;
export type Emphasis = z.infer<typeof EmphasisSchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;
export type Tracking = z.infer<typeof TrackingSchema>;
export type Attributes = z.infer<typeof AttributesSchema>;
export type FilterCheckbox = z.infer<typeof FilterCheckboxSchema>;
export type FilterCheckboxKey = z.infer<typeof FilterCheckboxKeySchema>;
export type ExerciseResponse = z.infer<typeof ExerciseResponseSchema>;
