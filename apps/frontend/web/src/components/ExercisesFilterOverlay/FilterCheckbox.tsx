import { memo } from 'react';
import { useShallow } from 'zustand/shallow';
import { Text, UnstyledButton, Checkbox } from '@mantine/core';

import { type Selection } from '@cwt/schema/exerciseSchema';
import { useStore } from '@cwt/state/store';
import { type FilterGroup } from '@cwt/state/types';

import classes from './FilterCheckbox.module.css';

interface FilterCheckboxProps {
  group: FilterGroup;
  selection: Selection;
}

const FilterCheckbox = memo(function FilterCheckbox({
  group,
  selection,
}: FilterCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof FilterCheckboxProps>) {
  const isSelected = useStore(
    useShallow(
      (state) =>
        state.filterCheckboxSelections.find(
          (obj) => obj.group === group && obj.selection === selection,
        )?.value,
    ),
  );
  const toggleFilterSelection = useStore(
    (state) => state.toggleFilterSelection,
  );
  // console.log('render checkbox');

  const handleClick = () => {
    toggleFilterSelection({ group, selection });
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
        <Text fw={500} size="xs" lh={1.2} tt="uppercase">
          {selection}
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
});

export default FilterCheckbox;
