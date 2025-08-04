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

import ExercisesList from '../components/ExercisesList';
import ExercisesFilterOverlay from '../components/ExercisesFilterOverlay';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  const search = useStore((state) => state.exerciseSearch);
  const setSearch = useStore((state) => state.setExerciseSearch);
  const exercises = useStore((state) => state.displayedExercises);
  const filterDisplayedExercisesBySearch = useStore(
    (state) => state.filterDisplayedExercisesBySearch,
  );

  const [filterOpened, filterHandler] = useDisclosure(false);
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

  // Options displayed on search, enable later
  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const handleClearSearch = () => {
    setSearch('');
  };

  type HandleKeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

  const handleKeyDown = (e: HandleKeyDownEvent): void => {
    if (e.code === 'Enter') {
      setSearch(search.trim());
      filterDisplayedExercisesBySearch();
      combobox.closeDropdown();
    }
  };

  // Opens the filter overlay
  const handleClickFilter = () => {
    filterHandler.open();
  };

  return (
    <Stack gap="xl">
      <Title size="h6">Exercise Library</Title>
      <Group>
        <Combobox
          onOptionSubmit={(optionValue) => {
            console.log('onOptionSubmit');
            setSearch(optionValue);
            filterDisplayedExercisesBySearch();
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
              onChange={(event) => {
                setSearch(event.currentTarget.value);
                combobox.openDropdown();
              }}
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
    </Stack>
  );
}
