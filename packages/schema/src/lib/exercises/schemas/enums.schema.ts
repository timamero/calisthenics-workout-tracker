import { z } from 'zod';

import { Constants } from '../../common/database.types';

const constants = Constants.public.Enums;

export const MuscleSchema = z.enum(constants.muscles);
export const EquipmentSchema = z.enum(constants.equipment);
export const EmphasisSchema = z.enum(constants.emphasis_type);
export const DifficultySchema = z.enum(constants.difficulty_type);
export const TrackingSchema = z.enum(constants.tracking_type);
export const SetProgressionTypeSchema = z.enum(constants.set_progression_type);
export const SetProgressionValueTypeSchema = z.enum(
  constants.set_progression_value_type,
);
export const SortDirectionSchema = z.enum(constants.sort_direction);
export const UnitSchema = z.enum(constants.unit);
