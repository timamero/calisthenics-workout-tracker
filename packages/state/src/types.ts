import {
  type ExerciseAttributes,
  Muscle,
  Equipment,
  Emphasis,
  Difficulty,
} from "@cwt/schema/exercises";

export type Filter = {
  target_muscles: Muscle[];
  required_equipment: Equipment[];
  emphasis: Emphasis[];
  difficulty: Difficulty[];
};
export type FilterGroup = keyof Filter;
export const filterKeys: FilterGroup[] = [
  "target_muscles",
  "required_equipment",
  "emphasis",
  "difficulty",
];
export type FilterCheckbox = {
  group: FilterGroup;
  selection: ExerciseAttributes;
  value?: boolean;
};
