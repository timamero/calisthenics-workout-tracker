import { z } from 'zod';

import {
  LeverageAssistSchema,
  LeveragesAssistValueTypeSchema,
  UnitSchema,
  SortDirectionSchema,
  LeveragesAssistsResponseSchema,
} from './schemas';

export type LeverageAssist = z.infer<typeof LeverageAssistSchema>;
export type LeveragesAssistValueType = z.infer<
  typeof LeveragesAssistValueTypeSchema
>;
export type Unit = z.infer<typeof UnitSchema>;
export type SortDirection = z.infer<typeof SortDirectionSchema>;
export type LeveragesAssistsResponse = z.infer<
  typeof LeveragesAssistsResponseSchema
>;