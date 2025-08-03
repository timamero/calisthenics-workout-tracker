import { Stack, Text, Group } from '@mantine/core';

import { useStore } from '@cwt/state/store';

// import FilterCheckbox from './FilterCheckbox';

export default function FilterSelections() {
  const filterCheckboxSelections = useStore(
    (state) => state.filterCheckboxSelections,
  );
  console.log('filterCheckboxSelections', filterCheckboxSelections);

  const filterGroups = filterCheckboxSelections.map((obj) => obj.group);
  const uniqueFilterGroups = [...new Set(filterGroups)];

  const FilterGroups = () =>
    uniqueFilterGroups.map((group, i) => {
      return (
        <Stack gap="sm" key={i}>
          <Text
            tt="uppercase"
            style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
          >
            {group}
          </Text>
          <Group gap={4}>
            <p>placeholder</p>
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
