import { z } from 'zod';

import { Constants } from '../../common/database.types';

const constants = Constants.public.Enums;

export const SetProgressionTypeSchema = z.enum(constants.set_progression_type);
export const SetProgressionValueTypeSchema = z.enum(
  constants.set_progression_value_type,
);
export const UnitSchema = z.enum(constants.unit);
export const SortDirectionSchema = z.enum(constants.sort_direction);
