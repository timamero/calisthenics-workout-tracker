import { useShallow } from 'zustand/shallow';

import { useStore, StoreState } from '@cwt/state/store';
import { selectHasFilters, selectHasSearch } from '@cwt/state/exercises';

export const useFiltersAndSearchStatus = () => {
  return useStore(
    useShallow((state: StoreState) => ({
      hasFilters: selectHasFilters(state),
      hasSearch: selectHasSearch(state),
    }))
  );
};
