import { z } from "zod";

import { GoalSchema, StatusSchema } from "./enums.schema";

export const WorkoutBase = z.object({
  id: z.number(),
  updated_at: z.date(),
  title: z.optional(z.string().max(70)),
  description: z.optional(z.string().max(500)),
  // workout data here
  status: StatusSchema,
  goal: z.optional(GoalSchema),
  notes: z.optional(z.string().max(750))
});