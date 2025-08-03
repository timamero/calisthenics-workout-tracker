import { Muscles, Equipment, Emphasis, Difficulty, Selection, musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum, } from '@cwt/schema/exerciseSchema';

export type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis[]; difficulty: Difficulty[]}
export type FilterGroup = keyof Filter;
export const filterKeys: FilterGroup[] = ["muscle", "equipment", "emphasis", "difficulty"];
export type FilterCheckbox = { group: FilterGroup, selection: Selection,  value?: boolean }