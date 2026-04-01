import { useContext } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

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
  const theme = useTheme() as CustomTheme;
  const set = useContext(SetContext)!.set;

  const handleNumeralFieldChange = useFieldInputChange(
    fieldName,
    'numeral',
    fieldID,
  );
  const mode = useWorkoutDraftStore((state) => state.mode);

  if (fieldName === 'value' && trackingType === 'leverages') {
    if (mode === 'read') {
      return (
        <View>
          <Text style={{ color: theme.colors.light }}>{label}</Text>
          <Text style={{ color: theme.colors.light }}>
            {set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === undefined
              ? ''
              : set.fields
                  .leverages!.find((field) => field.id === fieldID)!
                  .value!.toString()}
          </Text>
        </View>
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
    if (mode === 'read') {
      return (
        <View>
          <Text style={{ color: theme.colors.light }}>{label}</Text>
          <Text style={{ color: theme.colors.light }}>
            {set.fields.assists!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.assists!.find((field) => field.id === fieldID)!.value ===
              undefined
              ? ''
              : set.fields
                  .assists!.find((field) => field.id === fieldID)!
                  .value!.toString()}
          </Text>
        </View>
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

  if (mode === 'read') {
    return (
      <View>
        <Text style={{ color: theme.colors.light }}>{label}</Text>
        <Text style={{ color: theme.colors.light }}>
          {set.fields.reps === undefined || !set.fields.reps
            ? '0'
            : set.fields.reps.toString()}
        </Text>
      </View>
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
