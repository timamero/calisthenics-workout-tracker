import {
  useExercisesSearchStore,
  useExercisesFilterStore,
  useExerciseLibraryStore,
} from "@cwt/state/stores";

export function useClearExerciseSearchAndFilters() {
  const setSearch = useExercisesSearchStore((state) => state.setExerciseSearch);
  const setAppliedExerciseSearch = useExercisesSearchStore(
    (state) => state.setAppliedExerciseSearch,
  );

  const clearFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const clearAppliedFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.clearAppliedFilterCheckboxSelections,
  );

  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );

  const clearExerciseSearch = () => {
    setSearch("");
    setAppliedExerciseSearch("");

    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );
  };
  const clearExerciseFilters = () => {
    clearFilterCheckboxSelections();
    clearAppliedFilterCheckboxSelections();

    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );
  };

  return { clearExerciseSearch, clearExerciseFilters };
}
