import { Stack, Text, Group } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import FilterCheckbox from './FilterCheckbox';

export default function FilterSelections() {
  const filterCheckboxSelections = useStore(
    (state) => state.filterCheckboxSelections,
  );
  console.log('filterCheckboxSelections', filterCheckboxSelections);

  const filterGroupNames = filterCheckboxSelections.map((obj) => obj.group);
  const uniqueFilterGroupNames = [...new Set(filterGroupNames)];

  const FilterSelections = ({ group }: { group: string }) =>
    filterCheckboxSelections
      .filter((obj) => obj.group === group)
      .map((selectionObj, i) => {
        return (
          <FilterCheckbox
            value={selectionObj.value}
            selection={selectionObj.selection}
            key={i}
          />
        );
      });

  const FilterGroups = () =>
    uniqueFilterGroupNames.map((group, i) => {
      return (
        <Stack gap="sm" key={i}>
          <Text
            tt="uppercase"
            style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
          >
            {group}
          </Text>
          <Group gap={4}>
            <FilterSelections group={group} />
          </Group>
        </Stack>
      );
    });

  return (
    <>
      <FilterGroups />
    </>
  );
}
