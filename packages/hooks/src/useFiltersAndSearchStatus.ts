import { useStore, StoreState } from "@cwt/state/store";
import { selectHasFilters, selectHasSearch } from "@cwt/state/library";

export const useFiltersAndSearchStatus = () => {
  return useStore((state: StoreState) => ({
    hasFilters: selectHasFilters(state),
    hasSearch: selectHasSearch(state),
  }));
};
