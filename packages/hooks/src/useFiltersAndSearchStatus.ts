import { useShallow } from 'zustand/shallow';

import { useStore, StoreState } from '@cwt/state/store';
import {
  selectHasFilters as selectedHasFiltersSuperseded,
  selectHasSearch as selectedHasSearchSuperseded,
} from '@cwt/state/exercises';

import { selectHasFilters, selectHasSearch } from '@cwt/state/exercises';
import type {
  ExercisesFilterSlice,
  ExercisesSearchSlice,
} from '@cwt/state/exercises';

export const useFiltersAndSearchStatus = () => {
  return useStore(
    useShallow((state: StoreState) => ({
      hasFilters: selectedHasFiltersSuperseded(state),
      hasSearch: selectedHasSearchSuperseded(state),
    }))
  );
};

export const useFilterSelectors = () => {
  return useStore(
    useShallow((state: ExercisesFilterSlice) => ({
      hasFilters: selectHasFilters(state),
    }))
  );
};

export const useSearchSelectors = () => {
  return useStore(
    useShallow((state: ExercisesSearchSlice) => ({
      hasSearch: selectHasSearch(state),
    }))
  );
};
