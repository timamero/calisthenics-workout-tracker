import * as z from "zod";

export const musclesEnum = ["chest", "shoulders", "biceps", "triceps", "latissimus dorsi", "obliques", "abs", "calf", "quadriceps", "hamstrings", "glutes", "lower back", "rhomboid", "full body"]
export const equipmentEnum = ["gymnastic rings", "resistance bands", "bench", "weighted vest", "bar", "parallel bars", "speed rope", "suspension trainer", "paralletes", "ab roller", "pull up bars", "box", "none"]
export const emphasisEnum = ["plyometrics", "mobility", "power", "endurance", "strength"]
export const difficultyEnum = ["beginner", "intermediate", "advanced"]


export const Muscles = z.array(z.enum(musclesEnum as [string, ...string[]]))
export type Muscles = z.infer<typeof Muscles>;

export const Equipment = z.array(z.enum(equipmentEnum as [string, ...string[]]));
export type Equipment = z.infer<typeof Equipment>;


export const Emphasis = z.enum(emphasisEnum as [string, ...string[]]);
export type Emphasis = z.infer<typeof Emphasis>;

export const Difficulty = z.enum(difficultyEnum as [string, ...string[]]);
export type Difficulty = z.infer<typeof Difficulty>;

export const SelectionSchema = z.union([
  z.enum(musclesEnum as [string, ...string[]]),
  z.enum(equipmentEnum as [string, ...string[]]),
  z.enum(emphasisEnum as [string, ...string[]]),
  z.enum(difficultyEnum as [string, ...string[]]),
])
export type Selection = z.infer<typeof SelectionSchema>;

export const Exercise = z.object({
  id: z.number(),
  name: z.string(),
  target_muscles: z.array(z.enum(musclesEnum as [string, ...string[]])),
  required_equipment: z.array(z.enum(equipmentEnum as [string, ...string[]])).nullable().optional(),
  emphasis: z.enum(emphasisEnum as [string, ...string[]]),
  difficulty: z.enum(difficultyEnum as [string, ...string[]]),
  tags: z.array(z.string()),
  instructions: z.array(z.string()),
});
export type Exercise = z.infer<typeof Exercise>;
