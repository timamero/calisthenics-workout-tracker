import { TextInput, useCombobox, Combobox, CloseButton } from '@mantine/core';
import { IoSearchOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';

import { useStore } from '@cwt/state/store';
import { useExercisesFilterStore } from '@cwt/state/stores';
import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useFiltersAndSearchStatus } from '@cwt/hooks/useFiltersAndSearchStatus';

export default function ExerciseSearchBar() {
  const exercises = useExerciseLibraryStore(
    (state) => state.displayedExercises,
  );
  const appliedFilterSelections = useExercisesFilterStore(
    (state) => state.appliedFilterSelections,
  );
  const appliedExerciseSearch = useStore(
    (state) => state.appliedExerciseSearch,
  );
  const exerciseSearch = useStore((state) => state.exerciseSearch);
  const search = useStore((state) => state.exerciseSearch);
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );
  const setSearch = useStore((state) => state.setExerciseSearch);
  const setAppliedExerciseSearch = useStore(
    (state) => state.setAppliedExerciseSearch,
  );

  const { hasSearch } = useFiltersAndSearchStatus();
  const combobox = useCombobox();

  const shouldFilterOptions = !exercises.some(
    (exercise) => exercise.name === search,
  );
  const filteredOptions = shouldFilterOptions
    ? exercises
        .filter((exercise) =>
          exercise.name.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map((ex) => ex.name)
    : exercises.map((ex) => ex.name);

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const handleClearSearch = () => {
    setAppliedExerciseSearch('');
    refreshDisplayedExercises(
      appliedFilterSelections,
      appliedExerciseSearch,
      exerciseSearch,
    );
  };

  type HandleKeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

  const handleKeyDown = (e: HandleKeyDownEvent): void => {
    if (e.code === 'Enter') {
      setAppliedExerciseSearch(search.trim());
      refreshDisplayedExercises(
        appliedFilterSelections,
        appliedExerciseSearch,
        exerciseSearch,
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
        console.log(`onOptionSubmit: setAppliedExerciseSearch(${search})`);
        // TODO: When option is selected, set appliedExercise to that value
        setAppliedExerciseSearch(search);
        refreshDisplayedExercises(
          appliedFilterSelections,
          appliedExerciseSearch,
          exerciseSearch,
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
            search && (
              <CloseButton
                onClick={handleClearSearch}
                icon={<IoCloseOutline />}
              />
            )
          }
          placeholder="Search exercises"
          value={search}
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
