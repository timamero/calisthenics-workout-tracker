import { View, ScrollView } from 'react-native';
import { useShallow } from 'zustand/shallow';

import { useStore } from '@cwt/state/store';

import { Text } from '../../customText';

import FilterCheckbox from './FilterCheckbox';

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
              <FilterCheckbox />
              <FilterCheckbox />
              <FilterCheckbox />
              <FilterCheckbox />
              <FilterCheckbox />
              <FilterCheckbox />
              <FilterCheckbox />
              <FilterCheckbox />
            </View>
          </>
        );
      })}
    </ScrollView>
  );
}
