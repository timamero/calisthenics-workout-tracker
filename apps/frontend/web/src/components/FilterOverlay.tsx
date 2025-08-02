import { Stack, Group, Modal, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  musclesEnum,
  equipmentEnum,
  difficultyEnum,
} from '@cwt/schema/exerciseSchema';
// import type { Filter } from '@cwt/state/exercises';

// const filterSelectionItems = [
//   {
//     filterGroup:
//   }
// ]

const FilterCheckbox = ({ children }: { children: string }) => {
  const active = false;

  return (
    <Button
      m={4}
      size="xs"
      variant={active ? 'filled' : 'outline'}
      color={active ? 'orange' : 'gray'}
      radius="xl"
    >
      {children}
    </Button>
  );
};

export default function FilterOverlay() {
  const [filterOpened, filterHandler] = useDisclosure(false);

  return (
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
            {musclesEnum.map((muscle, i) => (
              <FilterCheckbox key={i}>{muscle.toUpperCase()}</FilterCheckbox>
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
            {equipmentEnum.map((equipment, i) => (
              <FilterCheckbox key={i}>{equipment.toUpperCase()}</FilterCheckbox>
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
            {difficultyEnum.map((difficulty, i) => (
              <FilterCheckbox key={i}>
                {difficulty.toUpperCase()}
              </FilterCheckbox>
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
  );
}
