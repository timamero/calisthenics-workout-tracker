import { createFileRoute } from '@tanstack/react-router';
import {
  Title,
  Stack,
  SimpleGrid,
  TextInput,
  Combobox,
  useCombobox,
  CloseButton,
} from '@mantine/core';
import { IoSearchOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';

import { useExercisesStore } from '@cwt/state/exercises';

import ExerciseCard from '../components/ExerciseCard';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  const exercises = useExercisesStore((state) => state.displayedExercises);
  const search = useExercisesStore((state) => state.search);
  const setSearch = useExercisesStore((state) => state.setSearch);

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
    setSearch('');
  };

  return (
    <Stack gap="xl">
      <Title size="h6">Exercise Library</Title>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setSearch(optionValue);
          combobox.closeDropdown();
        }}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            // label="Pick value or type anything"
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
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={options.length === 0}>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Stack align="center">
        <SimpleGrid
          cols={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 'lg' }}
          verticalSpacing={{ base: 'lg' }}
          // w="max-content"
        >
          {exercises.map((exercise, i) => (
            <ExerciseCard key={i} exercise={exercise} />
          ))}
        </SimpleGrid>
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
}
