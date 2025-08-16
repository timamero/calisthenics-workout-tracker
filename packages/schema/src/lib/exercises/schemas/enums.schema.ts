import { z } from 'zod';

import { Constants } from '../../common/database.types';

const constants = Constants.public.Enums;

export const MuscleSchema = z.enum(constants.muscles);
export const MusclesSchema = z.array(MuscleSchema);

export const EquipmentSchema = z.enum(constants.equipment);
export const EquipmentsSchema = z.array(EquipmentSchema);

export const EmphasisSchema = z.enum(constants.emphasis_type);
export const DifficultySchema = z.enum(constants.difficulty_type);
