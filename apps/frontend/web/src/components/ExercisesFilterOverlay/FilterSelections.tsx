// import { memo } from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { useShallow } from 'zustand/shallow';

import { useStore } from '@cwt/state/store';
import { type FilterGroup } from '@cwt/state/types';
import type { Selection } from '@cwt/schema/exerciseSchema';

import FilterCheckbox from './FilterCheckbox';

function Selections({
  group,
  selections,
}: {
  group: FilterGroup;
  selections: Selection[];
}) {
  console.log('render FilterSelection');
  return (
    <>
      {selections.map((selection) => {
        return (
          <FilterCheckbox group={group} selection={selection} key={selection} />
        );
      })}
    </>
  );
}
export default function FilterSelections() {
  const filterCheckboxSelections = useStore(
    useShallow((state) => state.filterCheckboxSelections),
  );

  const filterGroupNames = filterCheckboxSelections.map((obj) => obj.group);
  const uniqueFilterGroupNames = [...new Set(filterGroupNames)];

  return (
    <>
      {uniqueFilterGroupNames.map((group) => {
        console.log('render FilterGroup');
        return (
          <Stack gap="sm" key={group}>
            <Text
              tt="uppercase"
              style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
            >
              {group}
            </Text>
            <Group gap={4}>
              <Selections
                group={group}
                selections={filterCheckboxSelections.map(
                  (obj) => obj.selection,
                )}
              />
            </Group>
          </Stack>
        );
      })}
    </>
  );
}
