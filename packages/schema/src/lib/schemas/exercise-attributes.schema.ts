import * as z from "zod";

import { musclesEnum, equipmentEnum, emphasisEnum, difficultyEnum } from "../constants";

export const SelectionSchema = z.union([
  z.enum(musclesEnum as [string, ...string[]]),
  z.enum(equipmentEnum as [string, ...string[]]),
  z.enum(emphasisEnum as [string, ...string[]]),
  z.enum(difficultyEnum as [string, ...string[]]),
])