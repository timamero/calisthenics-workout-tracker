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
import { useFiltersAndSearchStatus } from '@cwt/hooks/useFiltersAndSearchStatus';
import type { Exercise } from '@cwt/schema/exercises';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';
import ExercisesList from '../components/ExercisesList';
import ExercisesFilterOverlay from '../components/ExercisesFilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  const exercises = useStore((state) => state.displayedExercises);
  const search = useStore((state) => state.exerciseSearch);
  const setSearch = useStore((state) => state.setExerciseSearch);
  const refreshDisplayedExercises = useStore(
    (state) => state.refreshDisplayedExercises,
  );
  const setAppliedExerciseSearch = useStore((state) => state.setAppliedExerciseSearch)

  const { hasSearch } = useFiltersAndSearchStatus();

  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);

  const [filterOpened, filterHandler] = useDisclosure(false);
  const [detailOpened, detailHandlers] = useDisclosure(false);
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
    setAppliedExerciseSearch("");
    refreshDisplayedExercises();
  };

  type HandleKeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

  const handleKeyDown = (e: HandleKeyDownEvent): void => {
    if (e.code === 'Enter') {
      setAppliedExerciseSearch(search.trim())
      refreshDisplayedExercises();
      combobox.closeDropdown();
    }
  };

  const handleSearchOnChange = (event: {
    currentTarget: { value: string };
  }) => {
    setSearch(event.currentTarget.value);
    combobox.openDropdown();
  };

  const handleClickFilter = () => {
    filterHandler.open();
  };

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
              console.log(`onOptionSubmit: setAppliedExerciseSearch(${search})`);
              // TODO: When option is selected, set appliedExercise to that value
              setAppliedExerciseSearch(search);
              refreshDisplayedExercises();
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
