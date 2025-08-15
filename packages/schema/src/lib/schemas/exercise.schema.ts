import * as z from "zod";

import { musclesEnum, equipmentEnum, emphasisEnum, difficultyEnum } from "../constants";

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