import * as React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { CustomTheme } from '../theme';

interface FilterProps {
  handleShowModal: () => void;
}

const Filter = ({ handleShowModal }: FilterProps) => {
  const theme = useTheme() as CustomTheme;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBlock: 12,
        paddingInline: 36,
      }}
    >
      <Button
        icon="filter-variant"
        mode="outlined"
        textColor={theme.colors.light}
        contentStyle={{
          flexDirection: 'row-reverse',
        }}
        style={{
          borderColor: theme.colors.light,
        }}
        onPress={handleShowModal}
      >
        Filter
      </Button>
    </View>
  );
};

export default Filter;
