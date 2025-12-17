import * as React from 'react';
import { TextInput } from 'react-native-paper';

import { getSecondsInDuration } from '@cwt/utils';
import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';

interface DurationInputProps {
  label: 'time' | 'rest';
}

export default function DurationInput({ label }: DurationInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleRestFieldChange = useFieldInputChange(label, 'duration');

  return (
    <TextInput
      mode="outlined"
      keyboardType="number-pad"
      placeholder="0"
      placeholderTextColor="grey"
      theme={{
        colors: {
          onSurfaceVariant: '#FFF',
        },
      }}
      textColor="#fff"
      label={label[0].toUpperCase() + label.slice(1)}
      value={getSecondsInDuration(set.fields[label]!.toString())}
      onChangeText={(text) => handleRestFieldChange(text)}
    />
  );
}
