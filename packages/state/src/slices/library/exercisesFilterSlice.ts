import { StateCreator } from 'zustand';

import { musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum, } from '@cwt/schema/exerciseSchema';

import { FilterCheckbox } from '../../types';
import { StoreState } from '../../store';


const muscleSelections: FilterCheckbox[] = musclesEnum.map((a) => ({group: "target_muscles", selection: a, value: false}))
const equipmentSelections: FilterCheckbox[] = equipmentEnum.map((a) => ({group: "required_equipment", selection: a, value: false}))
const emphasisSelections: FilterCheckbox[] = emphasisEnum.map((a) => ({group: "emphasis", selection: a, value: false}))
const difficultySelections: FilterCheckbox[] = difficultyEnum.map((a) => ({group: "difficulty", selection: a, value: false}))
const initialFilterCheckboxSelections: FilterCheckbox[] = [...muscleSelections, ...equipmentSelections, ...emphasisSelections, ...difficultySelections]

export interface ExercisesFilterSlice {
  filterCheckboxSelections: FilterCheckbox[];
  appliedFilterSelections: FilterCheckbox[];
  toggleFilterSelection: (filterCheckbox: FilterCheckbox) => void;
  setAppliedFilterSelections: () => void;
  clearFilterCheckboxSelections: () => void;
}

export const createExercisesFilterSlice: StateCreator<StoreState, [], [], ExercisesFilterSlice> = (set) => ({
  filterCheckboxSelections: initialFilterCheckboxSelections,
  appliedFilterSelections: [],
  toggleFilterSelection: (filterCheckbox) => set((state) => {
    const updatedSelections = state.filterCheckboxSelections.map((obj) => {
      if (obj.group === filterCheckbox.group && obj.selection === filterCheckbox.selection) {
        return {
          ...obj,
          value: !obj.value
        }
      }

      return obj
    })
    return {
      filterCheckboxSelections: updatedSelections,
    }
  }),
  setAppliedFilterSelections: () => set((state) => {
    const updatedAppliedFilterSelections = state.filterCheckboxSelections.filter((obj) => obj.value === true)
    return {
      appliedFilterSelections: updatedAppliedFilterSelections
    }
  }),
  clearFilterCheckboxSelections: () => set((state) => {
    const clearedSelections = state.filterCheckboxSelections.map((obj) => {
      if (obj.value === true) {
        return {
          ...obj,
          value: false
        }
      }

      return obj
    })

    return {
      filterCheckboxSelections: clearedSelections
    }
  })
})