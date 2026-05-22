import * as React from 'react';
import { Checkbox, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { useExercisesFilterStore } from '@cwt/state/stores';
import type { Attributes, FilterCheckboxKey } from '@cwt/schema/exercises';

import { CustomTheme } from '../../theme';

interface FilterCheckboxProps {
  keyName: FilterCheckboxKey;
  selection: Attributes;
}

export default function FilterCheckbox({
  keyName,
  selection,
}: FilterCheckboxProps) {
  const theme = useTheme() as CustomTheme;

  const isSelected = useExercisesFilterStore(
    (state) =>
      state.filterCheckboxSelections.find(
        (s) => s.keyName === keyName && s.selection === selection,
      )?.value,
  );
  const toggleFilterSelection = useExercisesFilterStore(
    (state) => state.toggleFilterSelection,
  );

  const handlePress = () => {
    toggleFilterSelection({ keyName, selection });
  };

  const checkboxBgColor = isSelected
    ? theme.colors.lime1
    : theme.colors.background;
  const checkboxBorderColor = isSelected
    ? theme.colors.lime2
    : theme.colors.gray3;
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
        uncheckedColor={theme.colors.gray3}
        labelStyle={{
          textTransform: 'uppercase',
          color: theme.colors.onBackground,
          fontWeight: labelFontWeight,
        }}
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={handlePress}
        background={{
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
