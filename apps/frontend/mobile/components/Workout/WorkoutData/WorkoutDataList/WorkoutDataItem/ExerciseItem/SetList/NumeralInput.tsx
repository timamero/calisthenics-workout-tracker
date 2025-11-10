import * as React from 'react';
import { TextInput } from 'react-native-paper';

import type { SetFields, Leverage, Assist } from '@cwt/schema/workouts';
import { SetContext } from '@cwt/context';
import { useWorkoutDraftStore } from '@cwt/state/stores';

interface NumeralInputProps {
  label: string;
  fieldName: 'reps' | 'weight' | 'value';
  fieldID?: string;
  trackingType?: string | null;
}

export default function NumeralInput({
  label,
  fieldName,
  fieldID,
  trackingType = null,
}: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  // const setIndex = React.useContext(SetContext)!.setIndex;

  const setLeverageOrAssistIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageOrAssistIDToMod,
  );

  const handleNumeralFieldChange = (text: string) => {
    if (fieldID) {
      setLeverageOrAssistIDToMod(fieldID);
    }
    // Allow empty string for controlled input
    if (text === '') {
      const updatedField:
        | Partial<SetFields>
        | Pick<Leverage, 'value'>
        | Pick<Assist, 'value'> = {
        [fieldName]: undefined,
      };
      handleSetFieldChange(set.id, updatedField);
      return;
    } else {
      const updatedField:
        | Partial<SetFields>
        | Pick<Leverage, 'value'>
        | Pick<Assist, 'value'> = {
        [fieldName]: Number(text),
      };
      handleSetFieldChange(set.id, updatedField);
    }
  };

  if (fieldName === 'value' && trackingType === 'leverages') {
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
          set.fields.leverages!.find((field) => field.id === fieldID)!.value ===
            null ||
          set.fields.leverages!.find((field) => field.id === fieldID)!.value ===
            undefined
            ? ''
            : set.fields
                .leverages!.find((field) => field.id === fieldID)!
                .value!.toString()
        }
        onChangeText={(text) => handleNumeralFieldChange(text)}
      />
    );
  }

  if (fieldName === 'value' && trackingType === 'assists') {
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
          set.fields.assists!.find((field) => field.id === fieldID)!.value ===
            null ||
          set.fields.assists!.find((field) => field.id === fieldID)!.value ===
            undefined
            ? ''
            : set.fields
                .assists!.find((field) => field.id === fieldID)!
                .value!.toString()
        }
        onChangeText={(text) => handleNumeralFieldChange(text)}
      />
    );
  }

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
