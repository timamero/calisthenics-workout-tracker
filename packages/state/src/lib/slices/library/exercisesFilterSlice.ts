import { StateCreator } from "zustand";

import { Constants } from "@cwt/schema/common";
import { ExerciseFilterCheckbox } from "@cwt/schema/exercises";
// import { FilterCheckbox } from "../../types";

import { StoreState } from "../../store";

import {
  clearSelections,
  revertFilterSelections,
  updateAppliedSelections,
  updateSelections,
} from "./exerciseFilterActions";

const muscle_list = Constants.public.Enums.muscles;
const equipment_list = Constants.public.Enums.equipment;
const emphasis_list = Constants.public.Enums.emphasis_type;
const difficulty_list = Constants.public.Enums.difficulty_type;

const muscleSelections: ExerciseFilterCheckbox[] = muscle_list.map((a) => ({
  key: "target_muscles",
  selection: a,
  value: false,
}));
const equipmentSelections: ExerciseFilterCheckbox[] = equipment_list.map(
  (a) => ({
    key: "required_equipment",
    selection: a,
    value: false,
  })
);
const emphasisSelections: ExerciseFilterCheckbox[] = emphasis_list.map((a) => ({
  key: "emphasis",
  selection: a,
  value: false,
}));
const difficultySelections: ExerciseFilterCheckbox[] = difficulty_list.map(
  (a) => ({
    key: "difficulty",
    selection: a,
    value: false,
  })
);
const initialFilterCheckboxSelections: ExerciseFilterCheckbox[] = [
  ...muscleSelections,
  ...equipmentSelections,
  ...emphasisSelections,
  ...difficultySelections,
];

export interface ExercisesFilterSlice {
  filterCheckboxSelections: ExerciseFilterCheckbox[]; // List of all filters, this state changes when user toggles filter
  appliedFilterSelections: ExerciseFilterCheckbox[]; // List of the filters that are applied and actively filtering the exercises
  toggleFilterSelection: (filterCheckbox: ExerciseFilterCheckbox) => void;
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
      const updatedSelections = updateSelections(
        state.filterCheckboxSelections,
        filterCheckbox
      );
      return {
        filterCheckboxSelections: updatedSelections,
      };
    }),
  setAppliedFilterSelections: () =>
    set((state) => {
      const updatedAppliedSelections = updateAppliedSelections(
        state.filterCheckboxSelections
      );
      return {
        appliedFilterSelections: updatedAppliedSelections,
      };
    }),
  clearFilterCheckboxSelections: () =>
    set((state) => {
      const clearedSelections = clearSelections(state.filterCheckboxSelections);
      return {
        filterCheckboxSelections: clearedSelections,
      };
    }),
  revertFilterCheckboxSelections: () =>
    // When user updates filters, but then cancels the update, revert back to the last state when filters where applied
    set((state) => {
      const appliedSelectionAttributes = state.appliedFilterSelections.map(
        (obj) => obj.selection
      );
      const revertedFilterSelections = revertFilterSelections(
        state.filterCheckboxSelections,
        appliedSelectionAttributes
      );
      return {
        filterCheckboxSelections: revertedFilterSelections,
      };
    }),
});
