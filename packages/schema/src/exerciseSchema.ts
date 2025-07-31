import * as z from "zod";

const muscles = ["chest", "shoulders", "biceps", "triceps", "latissimus dorsi", "obliques", "abs", "calf", "quadriceps", "hamstrings", "glutes", "lower back", "rhomboid", "full body"]

export const Muscles = z.array(z.enum(muscles as [string, ...string[]]))
export type Muscles = z.infer<typeof Muscles>;

export const Emphasis = z.enum(["plyometrics", "mobility", "power", "endurance", "strength"]);
export type Emphasis = z.infer<typeof Emphasis>;

export const Difficulty = z.enum(["beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof Difficulty>;

export const Exercise = z.object({
  id: z.number(),
  name: z.string(),
  target_muscles: z.array(z.enum(muscles as [string, ...string[]])),
  required_equipment: z.array(z.string()).nullable().optional(),
  emphasis: z.enum(["plyometrics", "mobility", "power", "endurance", "strength"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()),
  instructions: z.array(z.string()),
});

export type Exercise = z.infer<typeof Exercise>;
