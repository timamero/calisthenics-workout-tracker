import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';

const Filter = () => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingBlock: 12,
      paddingInline: 36,
    }}
  >
    {/* <Text></Text> Add filter results later */}
    <IconButton
      icon="filter-variant"
      iconColor="rgb(46, 46, 46)"
      size={20}
      onPress={() => console.log('Pressed')}
      style={{
        borderColor: 'rgb(46, 46, 46)',
        borderWidth: 2,
        borderRadius: 4,
      }}
    />
  </View>
);

export default Filter;
