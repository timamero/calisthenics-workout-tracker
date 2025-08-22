import { z } from 'zod';

import {
  WorkoutBuildSchema,
  WorkoutLogSchema,
  WorkoutDataSchema,
  WorkoutExerciseSchema,
  SetSchema,
  SetFieldsSchema,
  GoalSchema,
  SourceSchema,
  StatusSchema,
  TrackingTypeSchema,
} from './schemas';

export type WorkoutBuild = z.infer<typeof WorkoutBuildSchema>;
export type WorkoutLog = z.infer<typeof WorkoutLogSchema>;
export type WorkoutData = z.infer<typeof WorkoutDataSchema>;
export type WorkoutExercise = z.infer<typeof WorkoutExerciseSchema>;
export type Set = z.infer<typeof SetSchema>;
export type SetFields = z.infer<typeof SetFieldsSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type TrackingType = z.infer<typeof TrackingTypeSchema>;
