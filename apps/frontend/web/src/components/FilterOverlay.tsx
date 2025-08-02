import { Stack, Group, Modal, Text, Button } from '@mantine/core';

import {
  musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum,
} from '@cwt/schema/exerciseSchema';
import { filterKeys } from '@cwt/state/exercises';
// import type { Filter } from '@cwt/state/exercises';

const filterSelections = [
  musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum,
];

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

const filterSelectionItemsGrouped = filterKeys.map((key, i) => {
  return {
    filterGroup: key,
    selections: filterSelections[i],
  };
});

function FilterSelections() {
  const filterSelections = filterSelectionItemsGrouped.map((fs, i) => {
    return (
      <Stack gap="sm" key={i}>
        <Text
          tt="uppercase"
          style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
        >
          {fs.filterGroup}
        </Text>
        <Group gap={4}>
          {fs.selections.map((s, i) => (
            <FilterCheckbox key={i}>{s.toUpperCase()}</FilterCheckbox>
          ))}
        </Group>
      </Stack>
    );
  });
  return <Stack gap="xl">{filterSelections}</Stack>;
}
interface FilterOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function FilterOverlay({ opened, handler }: FilterOverlayProps) {

  return (
    <Modal
      opened={opened}
      onClose={() => handler.close()}
      title="Filter Exercises"
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
      <FilterSelections />
      <Group mt="lg" grow>
        <Button color="gray" variant="outline">
          Clear All
        </Button>
        <Button color="orange">Apply Filters</Button>
      </Group>
    </Modal>
  );
}
