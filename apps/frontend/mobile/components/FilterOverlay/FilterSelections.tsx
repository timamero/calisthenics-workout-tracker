import * as React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useShallow } from 'zustand/shallow';

import { useExercisesFilterStore } from '@cwt/state/stores';

import type { Attributes, FilterCheckboxKey } from '@cwt/schema/exercises';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

import FilterCheckbox from './FilterCheckbox';

const Selections = React.memo(function Selections({
  keyName,
  selections,
}: {
  keyName: FilterCheckboxKey;
  selections: Attributes[];
}) {
  return (
    <>
      {selections.map((selection, i) => {
        return (
          <FilterCheckbox
            keyName={keyName}
            selection={selection}
            key={selection + i}
          />
        );
      })}
    </>
  );
});

export default function FilterSelections() {
  const theme = useTheme() as CustomTheme;

  const height = Dimensions.get('window').height;
  const { top, bottom } = useSafeAreaInsets();
  console.log('height, top, bottom', height, top, bottom);
  const overlayHeight = height - (top + bottom);
  console.log('overlayHeight', overlayHeight);

  const filterCheckboxSelections = useExercisesFilterStore(
    useShallow((state) => state.filterCheckboxSelections),
  );

  const filterKeyNames = new Set(
    filterCheckboxSelections.map((s) => s.keyName),
  );

  return (
    <ScrollView
      style={{
        // height: 870,
        backgroundColor: theme.colors.background,
        paddingInline: 20,
        paddingBlock: 16,
      }}
    >
      {Array.from(filterKeyNames).map((keyName, i) => {
        return (
          <View key={keyName + i}>
            <Text
              style={{
                textTransform: 'uppercase',
                color: theme.colors.gray7,
              }}
              variant="headlineSmall"
              key={i}
            >
              {keyName.split('_').join(' ')}
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
                keyName={keyName}
                selections={filterCheckboxSelections
                  .filter((s) => s.keyName === keyName)
                  .map((s) => s.selection)}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
