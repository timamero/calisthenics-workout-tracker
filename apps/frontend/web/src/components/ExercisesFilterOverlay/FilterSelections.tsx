import { memo } from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { useShallow } from 'zustand/shallow';

// import { useStore } from '@cwt/state/store';
import { useExercisesFilterStore } from '@cwt/state/stores';
// import { type FilterGroup } from '@cwt/state/types';
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

  return (
    <>
      {uniqueFilterGroupNames.map((keyName) => {
        return (
          <Stack gap="sm" key={keyName}>
            <Text
              tt="uppercase"
              style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
            >
              {keyName}
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
