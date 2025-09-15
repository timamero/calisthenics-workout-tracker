import { useShallow } from 'zustand/shallow';

import {
  useExercisesFilterStore,
  useExercisesSearchStore,
} from '@cwt/state/stores';
import { selectHasFilters, selectHasSearch } from '@cwt/state/exercises';
import type {
  ExercisesFilterSlice,
  ExercisesSearchSlice,
} from '@cwt/state/exercises';

export const useFilterSelectors = () => {
  return useExercisesFilterStore(
    useShallow((state: ExercisesFilterSlice) => ({
      hasFilters: selectHasFilters(state),
    }))
  );
};

export const useSearchSelectors = () => {
  return useExercisesSearchStore(
    useShallow((state: ExercisesSearchSlice) => ({
      hasSearch: selectHasSearch(state),
    }))
  );
};
