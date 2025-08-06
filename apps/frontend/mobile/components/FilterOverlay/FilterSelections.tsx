import { View } from 'react-native';

import { Text } from '../../customText';

import FilterCheckbox from './FilterCheckbox';

export default function FilterSelections() {
  return (
    <View>
      <Text
        style={{ textTransform: 'uppercase', fontWeight: 400 }}
        variant="headlineMedium"
      >
        Muscles
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 12,
          columnGap: 8,
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
    </View>
  );
}
