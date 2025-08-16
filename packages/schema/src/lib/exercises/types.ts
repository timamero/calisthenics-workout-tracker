import * as z from "zod";

import {
  ExerciseAttributesSchema,
  Exercise,
  MuscleSchema,
  EquipmentSchema,
  EmphasisSchema,
  DifficultySchema
} from "./schemas";

export type Muscle = z.infer<typeof MuscleSchema>;
export type Equipment= z.infer<typeof EquipmentSchema>;
export type Emphasis = z.infer<typeof EmphasisSchema>;
export type Dificulty = z.infer<typeof DifficultySchema>;
export type ExerciseAttributes = z.infer<typeof ExerciseAttributesSchema>;  // Prevously Selection
export type Exercise = z.infer<typeof Exercise>;