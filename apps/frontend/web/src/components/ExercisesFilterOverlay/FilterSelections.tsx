import { memo } from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { useShallow } from 'zustand/shallow';

import { useStore } from '@cwt/state/store';
import { type FilterGroup } from '@cwt/state/types';
import { type ExerciseAttributes } from '@cwt/schema/exercises';

import FilterCheckbox from './FilterCheckbox';

const Selections = memo(function Selections({
  group,
  selections,
}: {
  group: FilterGroup;
  selections: ExerciseAttributes[];
}) {
  return (
    <>
      {selections.map((selection) => {
        return (
          <FilterCheckbox group={group} selection={selection} key={selection} />
        );
      })}
    </>
  );
});

export default function FilterSelections() {
  const filterCheckboxSelections = useStore(
    useShallow((state) => state.filterCheckboxSelections),
  );

  const filterGroupNames = filterCheckboxSelections.map((obj) => obj.group);
  const uniqueFilterGroupNames = [...new Set(filterGroupNames)];

  return (
    <>
      {uniqueFilterGroupNames.map((group) => {
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
                selections={filterCheckboxSelections
                  .filter((obj) => obj.group === group)
                  .map((obj) => obj.selection)}
              />
            </Group>
          </Stack>
        );
      })}
    </>
  );
}
