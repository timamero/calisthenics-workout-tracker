import { z } from 'zod';

import { Constants } from '../../common/database.types';

const constants = Constants.public.Enums;

export const MuscleSchema = z.enum(constants.muscles);
export const EquipmentSchema = z.enum(constants.equipment);
export const EmphasisSchema = z.enum(constants.emphasis_type);
export const DifficultySchema = z.enum(constants.difficulty_type);
export const TrackingSchema = z.enum(constants.tracking_type);
export const LeverageAssistSchema = z.enum(constants.leverage_assist);
export const LeveragesAssistValueTypeSchema = z.enum(
  constants.leverages_assist_value_type,
);
export const SortDirectionSchema = z.enum(constants.sort_direction);
export const UnitSchema = z.enum(constants.unit);
