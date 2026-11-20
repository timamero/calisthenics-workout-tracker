import { TextInput, useCombobox, Combobox, CloseButton } from '@mantine/core';
import { IoSearchOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';

import { useExercisesFilterStore } from '@cwt/state/stores';
import { useExercisesSearchStore } from '@cwt/state/stores';
import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useSearchSelectors } from '@cwt/hooks';

export default function ExerciseSearchBar() {
  const exercises = useExerciseLibraryStore(
    (state) => state.displayedExercises,
  );
  const exerciseSearch = useExercisesSearchStore(
    (state) => state.exerciseSearch,
  );
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );
  const setSearch = useExercisesSearchStore((state) => state.setExerciseSearch);
  const setAppliedExerciseSearch = useExercisesSearchStore(
    (state) => state.setAppliedExerciseSearch,
  );

  const { hasSearch } = useSearchSelectors();
  const combobox = useCombobox();

  const shouldFilterOptions = !exercises!.some(
    (exercise) => exercise.name === exerciseSearch,
  );
  const filteredOptions = shouldFilterOptions
    ? exercises!
        .filter((exercise) =>
          exercise.name
            .toLowerCase()
            .includes(exerciseSearch.toLowerCase().trim()),
        )
        .map((ex) => ex.name)
    : exercises!.map((ex) => ex.name);

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const handleClearSearch = () => {
    setAppliedExerciseSearch('');
    setSearch('');
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );
  };

  type HandleKeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

  const handleKeyDown = (e: HandleKeyDownEvent): void => {
    if (e.code === 'Enter') {
      setAppliedExerciseSearch(exerciseSearch.trim());
      refreshDisplayedExercises(
        useExercisesFilterStore.getState().appliedFilterSelections,
        useExercisesSearchStore.getState().appliedExerciseSearch,
        useExercisesSearchStore.getState().exerciseSearch,
      );
      combobox.closeDropdown();
    }
  };

  const handleSearchOnChange = (event: {
    currentTarget: { value: string };
  }) => {
    setSearch(event.currentTarget.value);
    combobox.openDropdown();
  };
  return (
    <Combobox
      onOptionSubmit={() => {
        setAppliedExerciseSearch(exerciseSearch);
        refreshDisplayedExercises(
          useExercisesFilterStore.getState().appliedFilterSelections,
          useExercisesSearchStore.getState().appliedExerciseSearch,
          useExercisesSearchStore.getState().exerciseSearch,
        );
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          style={{ flex: 1 }}
          leftSection={<IoSearchOutline />}
          rightSection={
            exerciseSearch && (
              <CloseButton
                onClick={handleClearSearch}
                icon={<IoCloseOutline />}
              />
            )
          }
          placeholder="Search exercises"
          value={exerciseSearch}
          disabled={hasSearch}
          onChange={handleSearchOnChange}
          onKeyDown={handleKeyDown}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown hidden={options.length === 0}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
