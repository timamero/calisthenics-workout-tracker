import {
  Stack,
  Group,
  Modal,
  Text,
  Button,
  UnstyledButton,
  Checkbox,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';

import {
  musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum,
} from '@cwt/schema/exerciseSchema';
import { filterKeys } from '@cwt/state/exercises';
// import type { Filter } from '@cwt/state/exercises';

import classes from './FilterCheckbox.module.css';

const filterSelections = [
  musclesEnum,
  equipmentEnum,
  emphasisEnum,
  difficultyEnum,
];

interface FilterCheckboxProps {
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (checked: boolean) => void;
  children: string;
}

function FilterCheckbox({
  selected,
  defaultSelected,
  onChange,
  children,
}: FilterCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof FilterCheckboxProps>) {
  const [isSelected, handleChange] = useUncontrolled({
    value: selected,
    defaultValue: defaultSelected,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      m={4}
      size="xs"
      onClick={() => handleChange(!isSelected)}
      variant={isSelected ? 'filled' : 'outline'}
      color={isSelected ? 'orange' : 'gray'}
      data-checked={isSelected || undefined}
      className={classes.button}
      style={{ minWidth: 100 }}
    >
      <div className={classes.body}>
        <Text fw={500} size="xs" lh={1.2}>
          {children}
        </Text>
      </div>

      <Checkbox
        checked={isSelected}
        onChange={() => {}}
        tabIndex={-1}
        color="orange"
        size="xs"
        mr="xs"
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

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
