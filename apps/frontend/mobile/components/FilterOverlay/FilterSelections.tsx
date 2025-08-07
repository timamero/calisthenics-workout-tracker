import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { useShallow } from 'zustand/shallow';

import { useStore } from '@cwt/state/store';
import { FilterGroup } from '@cwt/state/types';
import type { Selection } from '@cwt/schema/exerciseSchema';

import { Text } from '../../customText';

import FilterCheckbox from './FilterCheckbox';

const Selections = React.memo(function Selections({
  group,
  selections,
}: {
  group: FilterGroup;
  selections: Selection[];
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
    <ScrollView style={{ height: 460 }}>
      {uniqueFilterGroupNames.map((group, i) => {
        return (
          <>
            <Text
              style={{ textTransform: 'uppercase', fontWeight: 400 }}
              variant="headlineMedium"
              key={i}
            >
              {group}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                rowGap: 12,
                columnGap: 8,
                marginTop: 12,
                marginBottom: 20,
              }}
            >
              <Selections
                group={group}
                selections={filterCheckboxSelections
                  .filter((obj) => obj.group === group)
                  .map((obj) => obj.selection)}
              />
            </View>
          </>
        );
      })}
    </ScrollView>
  );
}
