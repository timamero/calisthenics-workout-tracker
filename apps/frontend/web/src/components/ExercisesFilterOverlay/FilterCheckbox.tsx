import { memo } from 'react';
import { Text, UnstyledButton, Checkbox } from '@mantine/core';

import { type ExerciseAttributes } from '@cwt/schema/exercises';
import { useStore } from '@cwt/state/store';
import type { ExerciseFilterKey } from '@cwt/schema/exercises';
// import { type FilterGroup } from '@cwt/state/types';

import classes from './FilterCheckbox.module.css';

interface FilterCheckboxProps {
  keyName: ExerciseFilterKey;
  selection: ExerciseAttributes;
}

const FilterCheckbox = memo(function FilterCheckbox({
  keyName,
  selection,
}: FilterCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof FilterCheckboxProps>) {

  const isSelected = useStore(
    (state) =>
      state.filterCheckboxSelections.find(
        (s) => s.keyName === keyName && s.selection === selection,
      )?.value,
  );
  const toggleFilterSelection = useStore(
    (state) => state.toggleFilterSelection,
  );
  // console.log('render checkbox');

  const handleClick = () => {
    toggleFilterSelection({ keyName, selection });
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
        <Text fw={isSelected ? 700 : 500} size="xs" lh={1.2} tt="uppercase">
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
