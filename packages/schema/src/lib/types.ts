import * as z from "zod";

import { Muscles, Equipment, Emphasis, Difficulty } from "./constants";
import { SelectionSchema, Exercise } from "./schemas";

export type Muscles = z.infer<typeof Muscles>;
export type Equipment = z.infer<typeof Equipment>;
export type Emphasis = z.infer<typeof Emphasis>;
export type Difficulty = z.infer<typeof Difficulty>;

export type Selection = z.infer<typeof SelectionSchema>;

export type Exercise = z.infer<typeof Exercise>;