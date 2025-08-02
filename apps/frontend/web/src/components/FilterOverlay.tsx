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
import { filterKeys, type FilterKey } from '@cwt/state/exercises';
import { useExercisesStore } from '@cwt/state/exercises';
import { type Selection } from '@cwt/schema/exerciseSchema';
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
  filterGroup: FilterKey;
  handleFilterUpdate: ({
    key,
    selection,
  }: {
    key: FilterKey;
    selection: Selection;
  }) => void;
  children: string;
}

function FilterCheckbox({
  selected,
  defaultSelected,
  onChange,
  filterGroup,
  handleFilterUpdate,
  children,
}: FilterCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof FilterCheckboxProps>) {
  const [isSelected, handleChange] = useUncontrolled({
    value: selected,
    defaultValue: defaultSelected,
    finalValue: false,
    onChange,
  });
  const selectedFilters = useExercisesStore((state) => state.selectedFilters);

  const handleClick = () => {
    handleChange(!isSelected);
    handleFilterUpdate({ key: filterGroup, selection: children });

    console.log('State of selectedFilters: ', selectedFilters);
  };

  return (
    <UnstyledButton
      m={4}
      size="xs"
      onClick={() => handleClick()}
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
  const updatedSelectedFilters = useExercisesStore(
    (state) => state.updateSelectedFilters,
  );
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
            <FilterCheckbox
              filterGroup={fs.filterGroup}
              handleFilterUpdate={updatedSelectedFilters}
              key={i}
            >
              {s.toUpperCase()}
            </FilterCheckbox>
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
