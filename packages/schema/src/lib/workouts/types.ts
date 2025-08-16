import { z } from 'zod';

import {
  WorkoutBuildSchema,
  WorkoutLogSchema,
  GoalSchema,
  SourceSchema,
  StatusSchema,
  TrackingTypeSchema,
} from './schemas';

export type WorkoutBuild = z.infer<typeof WorkoutBuildSchema>;
export type WorkoutLog = z.infer<typeof WorkoutLogSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type TrackingTypeSchema = z.infer<typeof TrackingTypeSchema>;
