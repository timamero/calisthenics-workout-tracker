import { StateCreator } from 'zustand';

import { Muscles, Equipment, Emphasis, Difficulty, Selection, musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum, } from '@cwt/schema/exerciseSchema';

export type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis[]; difficulty: Difficulty[]}
export type FilterGroup = keyof Filter;
export const filterKeys: FilterGroup[] = ["muscle", "equipment", "emphasis", "difficulty"];
type FilterCheckbox = { group: FilterGroup, selection: Selection,  value: boolean }


const muscleSelections: FilterCheckbox[] = musclesEnum.map((a) => ({group: "muscle", selection: a, value: false}))
const equipmentSelections: FilterCheckbox[] = equipmentEnum.map((a) => ({group: "equipment", selection: a, value: false}))
const emphasisSelections: FilterCheckbox[] = emphasisEnum.map((a) => ({group: "emphasis", selection: a, value: false}))
const difficultySelections: FilterCheckbox[] = difficultyEnum.map((a) => ({group: "difficulty", selection: a, value: false}))
const initialFilterCheckboxSelections: FilterCheckbox[] = [...muscleSelections, ...equipmentSelections, ...emphasisSelections, ...difficultySelections]

export interface ExercisesFilterSlice {
  filterCheckboxSelections: FilterCheckbox[]
}

export const createExercisesFilterSlice: StateCreator<ExercisesFilterSlice, [], [], ExercisesFilterSlice> = (set) => ({
  filterCheckboxSelections: initialFilterCheckboxSelections,
})