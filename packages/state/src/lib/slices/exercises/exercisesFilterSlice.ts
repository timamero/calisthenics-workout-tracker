import { StateCreator } from 'zustand';

import { Constants } from '@cwt/schema/common';
import { ExerciseFilterCheckbox } from '@cwt/schema/exercises';
import { FilterCheckboxKeySchema } from '@cwt/schema/exercises/schemas';

import {
  clearSelections,
  revertFilterSelections,
  updateAppliedSelections,
  updateSelections,
} from './exerciseFilterActions';

const exerciseAttributes = [
  {
    keyName: FilterCheckboxKeySchema.enum.target_muscles,
    attributes: Constants.public.Enums.muscles,
  },
  {
    keyName: FilterCheckboxKeySchema.enum.required_equipment,
    attributes: Constants.public.Enums.equipment,
  },
  {
    keyName: FilterCheckboxKeySchema.enum.emphasis,
    attributes: Constants.public.Enums.emphasis_type,
  },
  {
    keyName: FilterCheckboxKeySchema.enum.difficulty,
    attributes: Constants.public.Enums.difficulty_type,
  },
];
const initialFilterCheckboxSelections: ExerciseFilterCheckbox[] =
  exerciseAttributes.flatMap((category) =>
    category.attributes.map((attribute) => ({
      keyName: category.keyName,
      selection: attribute,
      value: false,
    })),
  );

export interface ExercisesFilterSlice {
  filterCheckboxSelections: ExerciseFilterCheckbox[]; // List of all filters, this state changes when user toggles filter
  appliedFilterSelections: ExerciseFilterCheckbox[]; // List of the filters that are applied and actively filtering the exercises
  toggleFilterSelection: (filterCheckbox: ExerciseFilterCheckbox) => void;
  setAppliedFilterSelections: () => void;
  clearFilterCheckboxSelections: () => void;
  clearAppliedFilterCheckboxSelections: () => void;
  revertFilterCheckboxSelections: () => void;
}

export const createExercisesFilterSlice: StateCreator<
  ExercisesFilterSlice,
  [['zustand/immer', never]],
  [],
  ExercisesFilterSlice
> = (set) => ({
  filterCheckboxSelections: initialFilterCheckboxSelections,
  appliedFilterSelections: [],
  toggleFilterSelection: (filterCheckbox) =>
    set((state) => {
      const updatedSelections = updateSelections(
        state.filterCheckboxSelections,
        filterCheckbox,
      );
      return {
        filterCheckboxSelections: updatedSelections,
      };
    }),
  setAppliedFilterSelections: () =>
    set((state) => {
      const updatedAppliedSelections = updateAppliedSelections(
        state.filterCheckboxSelections,
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
  clearAppliedFilterCheckboxSelections: () =>
    set((state) => {
      return {
        appliedFilterSelections: [],
      };
    }),
  revertFilterCheckboxSelections: () =>
    // When user updates filters, but then cancels the update, revert back to the last state when filters where applied
    set((state) => {
      const appliedSelectionAttributes = state.appliedFilterSelections.map(
        (obj: ExerciseFilterCheckbox) => obj.selection,
      );
      const revertedFilterSelections = revertFilterSelections(
        state.filterCheckboxSelections,
        appliedSelectionAttributes,
      );
      return {
        filterCheckboxSelections: revertedFilterSelections,
      };
    }),
});

export const selectHasFilters = (state: ExercisesFilterSlice): boolean =>
  state.appliedFilterSelections.length > 0;
