import { createFileRoute } from '@tanstack/react-router';
import {
  Title,
  Stack,
  TextInput,
  Combobox,
  useCombobox,
  // CloseButton,
  Group,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoSearchOutline } from 'react-icons/io5';
// import { IoCloseOutline } from 'react-icons/io5';
import { IoFilterOutline } from 'react-icons/io5';

import ExercisesList from '../components/ExercisesList';
import ExercisesFilterOverlay from '../components/ExercisesFilterOverlay';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  // const search = useExercisesStore((state) => state.search);
  // const setSearch = useExercisesStore((state) => state.setSearch);

  const [filterOpened, filterHandler] = useDisclosure(false);
  const combobox = useCombobox();

  // const shouldFilterOptions = !exercises.some(
  //   (exercise) => exercise.name === search,
  // );
  // const filteredOptions = shouldFilterOptions
  //   ? exercises
  //       .filter((exercise) =>
  //         exercise.name.toLowerCase().includes(search.toLowerCase().trim()),
  //       )
  //       .map((ex) => ex.name)
  //   : exercises.map((ex) => ex.name);

  // Options displayed on search, enable later
  // const options = filteredOptions.map((item) => (
  //   <Combobox.Option value={item} key={item}>
  //     {item}
  //   </Combobox.Option>
  // ));

  // Enable later
  // const handleClearSearch = () => {
  //   setSearch('');
  // };

  // Opens the filter overlay
  const handleClickFilter = () => {
    filterHandler.open();
  };

  return (
    <Stack gap="xl">
      <Title size="h6">Exercise Library</Title>
      <Group>
        <Combobox
          // Enable later
          // onOptionSubmit={(optionValue) => {
          //   setSearch(optionValue);
          //   combobox.closeDropdown();
          // }}
          store={combobox}
        >
          <Combobox.Target>
            <TextInput
              style={{ flex: 1 }}
              leftSection={<IoSearchOutline />}
              // Enable later
              // rightSection={
              //   search && (
              //     <CloseButton
              //       onClick={handleClearSearch}
              //       icon={<IoCloseOutline />}
              //     />
              //   )
              // }
              placeholder="Search exercises"
              // Enable later
              // value={search}
              // onChange={(event) => {
              //   setSearch(event.currentTarget.value);
              //   combobox.openDropdown();
              // }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => combobox.closeDropdown()}
            />
          </Combobox.Target>
          {/* Enable later */}
          {/* <Combobox.Dropdown hidden={options.length === 0}>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown> */}
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
