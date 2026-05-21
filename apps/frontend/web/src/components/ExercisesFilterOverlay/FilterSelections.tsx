import { memo } from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { useShallow } from 'zustand/shallow';

import { useExercisesFilterStore } from '@cwt/state/stores';
import type { FilterCheckboxKey } from '@cwt/schema/exercises';
import type { Attributes } from '@cwt/schema/exercises';

import FilterCheckbox from './FilterCheckbox';

const Selections = memo(function Selections({
  keyName,
  selections,
}: {
  keyName: FilterCheckboxKey;
  selections: Attributes[];
}) {
  return (
    <>
      {selections.map((selection) => {
        return (
          <FilterCheckbox
            keyName={keyName}
            selection={selection}
            key={selection}
          />
        );
      })}
    </>
  );
});

export default function FilterSelections() {
  const filterCheckboxSelections = useExercisesFilterStore(
    useShallow((state) => state.filterCheckboxSelections),
  );

  const filterGroupNames = filterCheckboxSelections.map((s) => s.keyName);
  const uniqueFilterGroupNames = [...new Set(filterGroupNames)];
  console.log('unique: ', uniqueFilterGroupNames);
  return (
    <>
      {uniqueFilterGroupNames.map((keyName) => {
        return (
          <Stack gap="sm" key={keyName} w="100%">
            <Text
              ff="heading"
              tt="uppercase"
              size="md"
              fw={700}
              c="gray.7"
              lts="var(--mantine-letter-spacing-wider)"
            >
              {keyName.split('_').join(' ')}
            </Text>
            <Group gap={4}>
              <Selections
                keyName={keyName}
                selections={filterCheckboxSelections
                  .filter((obj) => obj.keyName === keyName)
                  .map((obj) => obj.selection)}
              />
            </Group>
          </Stack>
        );
      })}
    </>
  );
}
