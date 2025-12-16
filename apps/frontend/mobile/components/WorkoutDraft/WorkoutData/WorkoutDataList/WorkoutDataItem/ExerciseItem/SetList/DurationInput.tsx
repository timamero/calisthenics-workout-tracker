import * as React from 'react';
import { TextInput } from 'react-native-paper';

// import type { SetFields } from '@cwt/schema/workouts';
import { getSecondsInDuration } from '@cwt/utils';
import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';

interface DurationInputProps {
  label: 'time' | 'rest';
}

export default function DurationInput({ label }: DurationInputProps) {
  const set = React.useContext(SetContext)!.set;
  // const handleSetFieldChange =
  //   React.useContext(SetContext)!.handleSetFieldChange;

  const handleRestFieldChange = useFieldInputChange(label, 'duration');
  // const handleRestFieldChange = (text: string) => {
  //   // Allow empty string for controlled input
  //   if (text === '') {
  //     const updatedField: Partial<SetFields> = {
  //       [label]: '',
  //     };
  //     handleSetFieldChange(set.id, updatedField);
  //     return;
  //   }
  //   // Validate: only numbers, no leading zeros except for '0'
  //   if (/^(0|[1-9][0-9]{0,2})$/.test(text)) {
  //     const num = Number(text);
  //     if (num >= 0 && num <= 300) {
  //       const updatedField: Partial<SetFields> = {
  //         [label]: 'PT' + text + 'S',
  //       };
  //       handleSetFieldChange(set.id, updatedField);
  //     }
  //   }
  //   // Otherwise, do not update
  // };
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
