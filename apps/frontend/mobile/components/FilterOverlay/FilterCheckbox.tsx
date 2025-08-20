import * as React from 'react';
import { Checkbox, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { useStore } from '@cwt/state/store';
import type {
  ExerciseAttributes,
  ExerciseFilterKey,
} from '@cwt/schema/exercises';
// import { type FilterGroup } from '@cwt/state/types';

interface FilterCheckboxProps {
  keyName: ExerciseFilterKey;
  selection: ExerciseAttributes;
}

export default function FilterCheckbox({
  keyName,
  selection,
}: FilterCheckboxProps) {
  const theme = useTheme();

  const isSelected = useStore(
    (state) =>
      state.filterCheckboxSelections.find(
        (s) => s.keyName === keyName && s.selection === selection,
      )?.value,
  );
  const toggleFilterSelection = useStore(
    (state) => state.toggleFilterSelection,
  );

  const handlePress = () => {
    toggleFilterSelection({ keyName, selection });
  };

  const checkboxBgColor = isSelected
    ? 'rgba(255, 99, 71, 0.1)'
    : theme.colors.background;
  const checkboxBorderColor = isSelected
    ? theme.colors.primary
    : 'rgb(222, 226, 230)';
  const labelFontWeight = isSelected ? '700' : '400';
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 40,
        borderColor: checkboxBorderColor,
        backgroundColor: checkboxBgColor,
      }}
    >
      <Checkbox.Item
        label={selection}
        labelVariant="bodySmall"
        uncheckedColor="rgb(222, 226, 230)"
        labelStyle={{
          textTransform: 'uppercase',
          color: 'rgb(46, 46, 46)',
          fontWeight: labelFontWeight,
        }}
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={handlePress}
        background={{
          color: 'rgba(255, 99, 71, 0.3)',
          radius: 40,
          borderless: true,
        }}
        style={{
          paddingVertical: 2,
          paddingHorizontal: 8,
          paddingLeft: 12,
        }}
      />
    </View>
  );
}
