import * as z from "zod";

export const musclesEnum = ["chest", "shoulders", "biceps", "triceps", "latissimus dorsi", "obliques", "abs", "calf", "quadriceps", "hamstrings", "glutes", "lower back", "rhomboid", "full body"]
export const equipmentEnum = ["gymnastic rings", "resistance bands", "bench", "weighted vest", "bar", "parallel bars", "speed rope", "suspension trainer", "paralletes", "ab roller", "pull up bars", "box", "none"]
export const emphasisEnum = ["plyometrics", "mobility", "power", "endurance", "strength"]
export const difficultyEnum = ["beginner", "intermediate", "advanced"]

export const Muscles = z.array(z.enum(musclesEnum as [string, ...string[]]))
export const Equipment = z.array(z.enum(equipmentEnum as [string, ...string[]]));
export const Emphasis = z.enum(emphasisEnum as [string, ...string[]]);
export const Difficulty = z.enum(difficultyEnum as [string, ...string[]]);