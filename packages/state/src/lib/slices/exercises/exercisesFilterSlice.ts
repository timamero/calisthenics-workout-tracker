import { StateCreator } from 'zustand';

import { Constants } from '@cwt/schema/common';
import { FilterCheckbox } from '@cwt/schema/exercises';
import { FilterCheckboxKeySchema } from '@cwt/schema/exercises/schemas';

import {
  clearSelections,
  revertFilterSelections,
  updateAppliedSelections,
  updateSelections,
} from './exerciseFilterActions';

interface ExerciseAttribute {
  keyName: string;
  attributes: readonly string[];
}

const exerciseAttributes: ExerciseAttribute[] = [
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
const initialFilterCheckboxSelections: FilterCheckbox[] = (
  exerciseAttributes as Array<{
    keyName: FilterCheckbox['keyName'];
    attributes: ReadonlyArray<FilterCheckbox['selection']>;
  }>
).flatMap((category: ExerciseAttribute) =>
  category.attributes.map((attribute: string) => ({
    keyName: category.keyName as FilterCheckbox['keyName'],
    selection: attribute as FilterCheckbox['selection'],
    value: false,
  })),
);

export interface ExercisesFilterSlice {
  filterCheckboxSelections: FilterCheckbox[]; // List of all filters, this state changes when user toggles filter
  appliedFilterSelections: FilterCheckbox[]; // List of the filters that are applied and actively filtering the exercises
  toggleFilterSelection: (filterCheckbox: FilterCheckbox) => void;
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
        (obj: FilterCheckbox) => obj.selection,
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
