import { z } from 'zod';

import {
  LeverageAssistSchema,
  LeverageAssistValueTypeSchema,
  UnitSchema,
  SortDirectionSchema,
  LeveragesAssistsResponseSchema,
} from './schemas';

export type LeverageAssist = z.infer<typeof LeverageAssistSchema>;
export type LeverageAssistValueType = z.infer<
  typeof LeverageAssistValueTypeSchema
>;
export type Unit = z.infer<typeof UnitSchema>;
export type SortDirection = z.infer<typeof SortDirectionSchema>;
export type LeveragesAssistsResponse = z.infer<
  typeof LeveragesAssistsResponseSchema
>;
