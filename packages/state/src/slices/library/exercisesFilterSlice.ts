import { StateCreator } from "zustand";

import { Constants } from "@cwt/schema/common";
import { FilterCheckbox } from "../../types";
import { StoreState } from "../../store";

const muscle_list = Constants.public.Enums.muscles;
const equipment_list = Constants.public.Enums.equipment;
const emphasis_list = Constants.public.Enums.emphasis_type;
const difficulty_list = Constants.public.Enums.difficulty_type;

const muscleSelections: FilterCheckbox[] = muscle_list.map((a) => ({
  group: "target_muscles",
  selection: a,
  value: false,
}));
const equipmentSelections: FilterCheckbox[] = equipment_list.map((a) => ({
  group: "required_equipment",
  selection: a,
  value: false,
}));
const emphasisSelections: FilterCheckbox[] = emphasis_list.map((a) => ({
  group: "emphasis",
  selection: a,
  value: false,
}));
const difficultySelections: FilterCheckbox[] = difficulty_list.map((a) => ({
  group: "difficulty",
  selection: a,
  value: false,
}));
const initialFilterCheckboxSelections: FilterCheckbox[] = [
  ...muscleSelections,
  ...equipmentSelections,
  ...emphasisSelections,
  ...difficultySelections,
];

export interface ExercisesFilterSlice {
  filterCheckboxSelections: FilterCheckbox[];
  appliedFilterSelections: FilterCheckbox[];
  toggleFilterSelection: (filterCheckbox: FilterCheckbox) => void;
  setAppliedFilterSelections: () => void;
  clearFilterCheckboxSelections: () => void;
  revertFilterCheckboxSelections: () => void;
}

export const createExercisesFilterSlice: StateCreator<
  StoreState,
  [],
  [],
  ExercisesFilterSlice
> = (set) => ({
  filterCheckboxSelections: initialFilterCheckboxSelections,
  appliedFilterSelections: [],
  toggleFilterSelection: (filterCheckbox) =>
    set((state) => {
      const updatedSelections = state.filterCheckboxSelections.map((obj) => {
        if (
          obj.group === filterCheckbox.group &&
          obj.selection === filterCheckbox.selection
        ) {
          return {
            ...obj,
            value: !obj.value,
          };
        }

        return obj;
      });
      return {
        filterCheckboxSelections: updatedSelections,
      };
    }),
  setAppliedFilterSelections: () =>
    set((state) => {
      const updatedAppliedFilterSelections =
        state.filterCheckboxSelections.filter((obj) => obj.value === true);
      return {
        appliedFilterSelections: updatedAppliedFilterSelections,
      };
    }),
  clearFilterCheckboxSelections: () =>
    set((state) => {
      const clearedSelections = state.filterCheckboxSelections.map((obj) => {
        if (obj.value === true) {
          return {
            ...obj,
            value: false,
          };
        }

        return obj;
      });

      return {
        filterCheckboxSelections: clearedSelections,
      };
    }),
  revertFilterCheckboxSelections: () =>
    set((state) => {
      const appliedSelections = state.appliedFilterSelections.map(
        (obj) => obj.selection
      );
      const revertedFilterSelections = state.filterCheckboxSelections.map(
        (obj) => {
          if (appliedSelections.includes(obj.selection)) {
            return {
              ...obj,
              value: true,
            };
          }

          return {
            ...obj,
            value: false,
          };
        }
      );
      return {
        filterCheckboxSelections: revertedFilterSelections,
      };
    }),
});
