import * as React from 'react';
import { TextInput } from 'react-native-paper';

import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '@cwt/context';

export default function NumeralInput() {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const handleNumeralFieldChange = (text: string) => {
    // Allow empty string for controlled input
    if (text === '') {
      const updatedField: Partial<SetFields> = {
        reps: undefined, // Set to undefined to allow empty field
      };
      handleSetFieldChange(set.id, updatedField);
      return;
    } else {
      const updatedField: Partial<SetFields> = {
        reps: Number(text),
      };
      handleSetFieldChange(set.id, updatedField);
    }
  };
  return (
    <TextInput
      mode="outlined"
      placeholder="0"
      placeholderTextColor="grey"
      textColor="#fff"
      keyboardType="number-pad"
      label="Reps"
      theme={{
        colors: {
          onSurfaceVariant: '#FFF',
        },
      }}
      value={
        set.fields.reps === undefined || !set.fields.reps
          ? ''
          : set.fields.reps.toString()
      }
      onChangeText={(text) => handleNumeralFieldChange(text)}
    />
  );
}
