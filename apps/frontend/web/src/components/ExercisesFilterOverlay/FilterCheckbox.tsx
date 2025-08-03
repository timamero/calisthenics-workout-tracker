import { Text, UnstyledButton, Checkbox } from '@mantine/core';

import { type Selection } from '@cwt/schema/exerciseSchema';
import { useStore } from '@cwt/state/store';
import { type FilterGroup } from '@cwt/state/types';

import classes from './FilterCheckbox.module.css';

interface FilterCheckboxProps {
  group: FilterGroup;
  value: boolean;
  selection: Selection;
}

export default function FilterCheckbox({
  group,
  value,
  selection,
}: FilterCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof FilterCheckboxProps>) {
  const toggleFilterSelection = useStore(
    (state) => state.toggleFilterSelection,
  );

  const handleClick = () => {
    console.log('clicked selection: ');
    toggleFilterSelection({ group, selection, value });
  };
  return (
    <UnstyledButton
      m={4}
      size="xs"
      onClick={() => handleClick()}
      variant={value ? 'filled' : 'outline'}
      color={value ? 'orange' : 'gray'}
      data-checked={value || undefined}
      className={classes.button}
      style={{ minWidth: 100 }}
    >
      <div className={classes.body}>
        <Text fw={500} size="xs" lh={1.2}>
          {selection}
        </Text>
      </div>

      <Checkbox
        checked={value}
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
