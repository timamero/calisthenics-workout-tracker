import * as z from "zod";

export const Emphasis = z.enum(["plyometrics", "mobility", "power", "endurance", "strength"]);
export type Emphasis = z.infer<typeof Emphasis>;

export const Difficulty = z.enum(["beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof Difficulty>;

export const Exercise = z.object({
  id: z.number(),
  name: z.string(),
  target_muscles: z.array(z.string()),
  required_equipment: z.array(z.string()).nullable().optional(),
  emphasis: z.enum(["plyometrics", "mobility", "power", "endurance", "strength"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()),
  instructions: z.array(z.string()),
});

export type Exercise = z.infer<typeof Exercise>;
