import * as React from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

interface FilterProps {
  handleShowModal: () => void;
}

const Filter = ({ handleShowModal }: FilterProps) => (
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
    <Button
      icon="filter-variant"
      mode="outlined"
      textColor="rgb(46, 46, 46)"
      contentStyle={{
        flexDirection: 'row-reverse',
      }}
      style={{
        borderColor: 'rgb(46, 46, 46)',
      }}
      onPress={handleShowModal}
    >
      Filter
    </Button>
  </View>
);

export default Filter;
