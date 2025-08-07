import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
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
      {selections.map((selection, i) => {
        return (
          <FilterCheckbox
            group={group}
            selection={selection}
            key={selection + i}
          />
        );
      })}
    </>
  );
});

export default function FilterSelections() {
  const theme = useTheme();

  const filterCheckboxSelections = useStore(
    useShallow((state) => state.filterCheckboxSelections),
  );

  const filterGroupNames = filterCheckboxSelections.map((obj) => obj.group);
  const uniqueFilterGroupNames = [...new Set(filterGroupNames)];

  return (
    <ScrollView
      style={{
        height: 460,
        backgroundColor: theme.colors.background,
        paddingInline: 20,
      }}
    >
      {uniqueFilterGroupNames.map((group, i) => {
        return (
          <View key={group + i}>
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
          </View>
        );
      })}
    </ScrollView>
  );
}
