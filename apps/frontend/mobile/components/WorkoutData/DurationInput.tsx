import * as React from 'react';
import { TextInput } from 'react-native-paper';

import type { SetFields } from '@cwt/schema/workouts';
import { getSecondsInDuration } from '@cwt/utils';

import { SetContext } from '../../contexts/SetContext';

interface DurationInputProps {
  label: 'time' | 'rest';
}

export default function DurationInput({ label }: DurationInputProps) {
  const set = React.useContext(SetContext)!.set;
  console.log('set', set);
  // console.log(
  //   'getSecondsInDuration(set.fields.time!)',
  //   getSecondsInDuration(set.fields.time!),
  // );
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const handleRestFieldChange = (text: string) => {
    // Allow empty string for controlled input
    if (text === '') {
      const updatedField: Partial<SetFields> = {
        [label]: '',
      };
      handleSetFieldChange(setIndex, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(text)) {
      const num = Number(text);
      if (num >= 0 && num <= 300) {
        const updatedField: Partial<SetFields> = {
          [label]: 'PT' + text + 'S',
        };
        handleSetFieldChange(setIndex, updatedField);
      }
    }
    // Otherwise, do not update
  };
  return (
    <TextInput
      keyboardType="number-pad"
      label={label[0].toUpperCase() + label.slice(1)}
      value={getSecondsInDuration(set.fields[label]!.toString())}
      onChangeText={(text) => handleRestFieldChange(text)}
    />
  );
}
