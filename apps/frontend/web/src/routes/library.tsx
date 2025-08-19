import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Title,
  Stack,
  TextInput,
  Combobox,
  useCombobox,
  CloseButton,
  Group,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoSearchOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import { IoFilterOutline } from 'react-icons/io5';

import { useStore } from '@cwt/state/store';
// import { useFiltersAndSearchStatus } from '@cwt/hooks/useFiltersAndSearchStatus';
// import { selectHasSearch } from '@cwt/state/library';
import type { Exercise } from '@cwt/schema/exercises';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';
import ExercisesList from '../components/ExercisesList';
import ExercisesFilterOverlay from '../components/ExercisesFilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  console.log('Library view component');
  const exercises = useStore((state) => state.displayedExercises);
  const search = useStore((state) => state.exerciseSearch);
  // const isFilterBySearchApplied = useStore(
  //   (state) => state.isFilterBySearchApplied,
  // );
  // const isFilterApplied = useStore((state) => state.isFilterApplied);
  const setSearch = useStore((state) => state.setExerciseSearch);
  const refreshDisplayedExercises = useStore(
    (state) => state.refreshDisplayedExercises,
  );
  // const hasSearch = useStore((state) => selectHasSearch(state));
  const isSearchApplied = useStore((state) => state.isSearchApplied);
  const applySearchStatus = useStore((state) => state.applySearchStatus);
  // const { hasSearch } = useFiltersAndSearchStatus();
  // const resetDisplayedExerciseBySearch = useStore(
  //   (state) => state.resetDisplayedExerciseBySearch,
  // );
  // const filterDisplayedExercisesBySearch = useStore(
  //   (state) => state.filterDisplayedExercisesBySearch,
  // );
  // const filterDisplayedExercise = useStore(
  //   (state) => state.filterDisplayedExercises,
  // );

  const [filterOpened, filterHandler] = useDisclosure(false);
  const [detailOpened, detailHandlers] = useDisclosure(false);
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  // const [exerciseDetail, setExerciseDetail] = useState<Exercise >({
  //   id: 1,
  //   name: '',
  //   target_muscles: [],
  //   emphasis: '',
  //   difficulty: '',
  //   tags: [],
  //   instructions: [],
  //   required_equipment: null,
  // });
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
    applySearchStatus(false);
    refreshDisplayedExercises();
    // resetDisplayedExerciseBySearch();

    // if (isFilterApplied) {
    //   filterDisplayedExercise();
    // }
  };

  type HandleKeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

  const handleKeyDown = (e: HandleKeyDownEvent): void => {
    if (e.code === 'Enter') {
      console.log('handleKeyDown, search', search);
      setSearch(search.trim());
      applySearchStatus(true);
      // filterDisplayedExercisesBySearch();
      refreshDisplayedExercises();
      combobox.closeDropdown();
    }
  };

  const handleSearchOnChange = (event: {
    currentTarget: { value: string };
  }) => {
    console.log('handleSearchOnChange');
    setSearch(event.currentTarget.value);
    combobox.openDropdown();
  };

  // Opens the filter overlay
  const handleClickFilter = () => {
    filterHandler.open();
  };

  console.log('Library view component return');
  return (
    <ExerciseDetailContext.Provider
      value={{
        exercise: exerciseDetail,
        setExercise: setExerciseDetail,
        opened: detailOpened,
        handlers: detailHandlers,
      }}
    >
      <Stack gap="xl">
        <Title size="h6">Exercise Library</Title>
        <Group>
          <Combobox
            onOptionSubmit={() => {
              console.log('onOptionSubmit');
              // setSearch(optionValue);
              applySearchStatus(true);
              refreshDisplayedExercises();
              // filterDisplayedExercisesBySearch();
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
                disabled={isSearchApplied}
                // disabled={hasSearch}
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
          <ActionIcon
            variant="outline"
            color="gray.5"
            aria-label="Exercise filter"
            onClick={handleClickFilter}
          >
            <IoFilterOutline />
          </ActionIcon>
        </Group>
        <Stack align="center">
          <ExercisesList />
        </Stack>
        <ExercisesFilterOverlay opened={filterOpened} handler={filterHandler} />
        <ExerciseDetailOverlay />
      </Stack>
    </ExerciseDetailContext.Provider>
  );
}
