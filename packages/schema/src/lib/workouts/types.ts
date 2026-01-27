import { z } from 'zod';

import {
  WorkoutBuildRequestSchema,
  WorkoutBuildResponseSchema,
  WorkoutLogRequestSchema,
  WorkoutLogResponseSchema,
  WorkoutDataSchema,
  WorkoutLogLimitedDetailsSchema,
  ExerciseSchema,
  SupersetSchema,
  SectionSchema,
  LeverageSchema,
  AssistSchema,
  SetSchema,
  SetFieldsSchema,
  GoalSchema,
  SourceSchema,
  StatusSchema,
  TrackingTypeSchema,
  ModeSchema,
  AddExerciseOverlayProps,
  AddExerciseOverlayUIProps,
} from './schemas';

export type WorkoutBuildResponse = z.infer<typeof WorkoutBuildResponseSchema>;
export type WorkoutBuildRequest = z.infer<typeof WorkoutBuildRequestSchema>;
export type WorkoutLogResponse = z.infer<typeof WorkoutLogResponseSchema>;
export type WorkoutLogRequest = z.infer<typeof WorkoutLogRequestSchema>;
export type WorkoutData = z.infer<typeof WorkoutDataSchema>;
export type WorkoutLogLimitedDetails = z.infer<
  typeof WorkoutLogLimitedDetailsSchema
>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Superset = z.infer<typeof SupersetSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Leverage = z.infer<typeof LeverageSchema>;
export type Assist = z.infer<typeof AssistSchema>;
export type Set = z.infer<typeof SetSchema>;
export type SetFields = z.infer<typeof SetFieldsSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type TrackingType = z.infer<typeof TrackingTypeSchema>;
export type Mode = z.infer<typeof ModeSchema>;

export type { AddExerciseOverlayProps, AddExerciseOverlayUIProps };
