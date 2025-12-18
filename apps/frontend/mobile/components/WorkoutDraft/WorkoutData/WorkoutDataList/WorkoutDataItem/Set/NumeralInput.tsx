import * as React from 'react';
import { TextInput } from 'react-native-paper';

// import type { SetFields, Leverage, Assist } from '@cwt/schema/workouts';
import { SetContext } from '@cwt/context';
// import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useFieldInputChange } from '@cwt/hooks';

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

  const handleNumeralFieldChange = useFieldInputChange(
    fieldName,
    'numeral',
    fieldID,
  );

  if (fieldName === 'value' && trackingType === 'leverages') {
    return (
      <TextInput
        mode="outlined"
        placeholder="0"
        placeholderTextColor="grey"
        textColor="#fff"
        keyboardType="number-pad"
        label={label}
        style={{ height: 32 }}
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
            ? '0'
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
        label={label}
        style={{ height: 32 }}
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
            ? '0'
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
      label={label}
      style={{ height: 32 }}
      theme={{
        colors: {
          onSurfaceVariant: '#FFF',
        },
      }}
      value={
        set.fields.reps === undefined || !set.fields.reps
          ? '0'
          : set.fields.reps.toString()
      }
      onChangeText={(text) => handleNumeralFieldChange(text)}
    />
  );
}
