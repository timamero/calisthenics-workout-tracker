import { z } from 'zod';

import {
  WorkoutBuildRequestSchema,
  WorkoutBuildResponseSchema,
  WorkoutLogSchema,
  WorkoutDataSchema,
  WorkoutExerciseSchema,
  SetSchema,
  SetFieldsSchema,
  GoalSchema,
  SourceSchema,
  StatusSchema,
  TrackingTypeSchema,
  ModeSchema,
} from './schemas';

export type WorkoutBuildResponse = z.infer<typeof WorkoutBuildResponseSchema>;
export type WorkoutBuildRequest = z.infer<typeof WorkoutBuildRequestSchema>;
export type WorkoutLog = z.infer<typeof WorkoutLogSchema>;
export type WorkoutData = z.infer<typeof WorkoutDataSchema>;
export type WorkoutExercise = z.infer<typeof WorkoutExerciseSchema>;
export type Set = z.infer<typeof SetSchema>;
export type SetFields = z.infer<typeof SetFieldsSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type TrackingType = z.infer<typeof TrackingTypeSchema>;
export type Mode = z.infer<typeof ModeSchema>;
