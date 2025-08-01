import { createFileRoute } from '@tanstack/react-router';
import {
  Title,
  Stack,
  SimpleGrid,
  TextInput,
  Combobox,
  useCombobox,
  CloseButton,
  Group,
  ActionIcon,
  Modal,
  Text,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoSearchOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import { IoFilterOutline } from 'react-icons/io5';

import { useExercisesStore } from '@cwt/state/exercises';

import ExerciseCard from '../components/ExerciseCard';
import {
  musclesEnum,
  equipmentEnum,
  difficultyEnum,
} from '@cwt/schema/exerciseSchema';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  const exercises = useExercisesStore((state) => state.displayedExercises);
  const search = useExercisesStore((state) => state.search);
  const setSearch = useExercisesStore((state) => state.setSearch);

  const combobox = useCombobox();
  const [filterOpened, filterHandler] = useDisclosure(false);

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

  const handleClickFilter = () => {
    console.log('clicked filter btn');
    filterHandler.open();
  };

  return (
    <Stack gap="xl">
      <Title size="h6">Exercise Library</Title>
      <Group>
        <Combobox
          onOptionSubmit={(optionValue) => {
            setSearch(optionValue);
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
      <Modal
        opened={filterOpened}
        onClose={() => filterHandler.close()}
        title="Filter Exercises"
        styles={{
          title: {
            fontFamily: 'var(--mantine-font-family-headings)',
            fontWeight: 700,
          },
        }}
      >
        <Stack gap="xl">
          <Stack gap="sm">
            <Text
              tt="uppercase"
              style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
            >
              Muscle Groups
            </Text>
            <Group gap={4}>
              {musclesEnum.map((muscle) => (
                <Button
                  m={4}
                  size="xs"
                  variant="outline"
                  color="gray"
                  radius="xl"
                >
                  {muscle.toUpperCase()}
                </Button>
              ))}
            </Group>
          </Stack>
          <Stack gap="sm">
            <Text
              tt="uppercase"
              style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
            >
              Equipment
            </Text>
            <Group gap={4}>
              {equipmentEnum.map((equipment) => (
                <Button
                  m={4}
                  size="xs"
                  variant="outline"
                  color="gray"
                  radius="xl"
                >
                  {equipment.toUpperCase()}
                </Button>
              ))}
            </Group>
          </Stack>
          <Stack gap="sm">
            <Text
              tt="uppercase"
              style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
            >
              Difficulty
            </Text>
            <Group gap={4}>
              {difficultyEnum.map((difficulty) => (
                <Button
                  m={4}
                  size="xs"
                  variant="outline"
                  color="gray"
                  radius="xl"
                >
                  {difficulty.toUpperCase()}
                </Button>
              ))}
            </Group>
            <Group mt="lg" grow>
              <Button color="gray" variant="outline">
                Clear All
              </Button>
              <Button color="orange">Apply Filters</Button>
            </Group>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}
