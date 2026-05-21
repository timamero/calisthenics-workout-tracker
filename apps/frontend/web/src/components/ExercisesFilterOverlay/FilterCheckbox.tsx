import { memo } from 'react';
import { Text, UnstyledButton, Checkbox } from '@mantine/core';

import { type Attributes } from '@cwt/schema/exercises';
import { useExercisesFilterStore } from '@cwt/state/stores';
import type { FilterCheckboxKey } from '@cwt/schema/exercises';

import classes from './FilterCheckbox.module.css';

interface FilterCheckboxProps {
  keyName: FilterCheckboxKey;
  selection: Attributes;
}

const FilterCheckbox = memo(function FilterCheckbox({
  keyName,
  selection,
}: FilterCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof FilterCheckboxProps>) {
  const isSelected = useExercisesFilterStore(
    (state) =>
      state.filterCheckboxSelections.find(
        (s) => s.keyName === keyName && s.selection === selection,
      )?.value,
  );
  const toggleFilterSelection = useExercisesFilterStore(
    (state) => state.toggleFilterSelection,
  );

  const handleClick = () => {
    toggleFilterSelection({ keyName, selection });
  };
  return (
    <UnstyledButton
      m={4}
      size="xs"
      onClick={() => handleClick()}
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
        color="lime.4"
        size="xs"
        mr="xs"
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
});

export default FilterCheckbox;
