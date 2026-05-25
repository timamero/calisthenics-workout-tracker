import { z } from 'zod';

import {
  SetProgressionTypeSchema,
  SetProgressionValueTypeSchema,
  UnitSchema,
  SortDirectionSchema,
  SetProgressionResponseSchema,
} from './schemas';

export type SetProgressionType = z.infer<typeof SetProgressionTypeSchema>;
export type SetProgressionValueType = z.infer<
  typeof SetProgressionValueTypeSchema
>;
export type Unit = z.infer<typeof UnitSchema>;
export type SortDirection = z.infer<typeof SortDirectionSchema>;
export type SetProgressionResponse = z.infer<
  typeof SetProgressionResponseSchema
>;
