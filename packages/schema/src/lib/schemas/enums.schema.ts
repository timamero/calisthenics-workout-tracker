import { z } from "zod";

import { MUSCLES, EQUIPMENT, EMPHASIS, DIFFICULTY } from "../constants";

export const MuscleSchema = z.enum(MUSCLES)
export const MusclesSchema = z.array(MuscleSchema)

export const EquipmentSchema = z.enum(EQUIPMENT)
export const EquipmentsSchema = z.array(EquipmentSchema)

export const EmphasisSchema = z.enum(EMPHASIS);
export const DifficultySchema = z.enum(DIFFICULTY);