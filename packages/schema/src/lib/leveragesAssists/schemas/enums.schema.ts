import { z } from 'zod';

import { Constants } from '../../common/database.types';

const constants = Constants.public.Enums;

export const LeverageAssistSchema = z.enum(constants.leverage_assist);
export const LeveragesAssistValueTypeSchema = z.enum(
  constants.leverages_assist_value_type,
);
export const UnitSchema = z.enum(constants.unit);
export const SortDirectionSchema = z.enum(constants.sort_direction);
