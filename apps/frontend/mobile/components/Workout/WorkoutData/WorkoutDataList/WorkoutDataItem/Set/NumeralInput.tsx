import { useContext } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';
import TextInputReading from './TextInputReading';

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
        <TextInputReading
          label={label}
          labelWidth={116}
          value={
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === undefined ||
            set.fields
              .leverages!.find((field) => field.id === fieldID)!
              .value?.toString() === ''
              ? '0'
              : set.fields
                  .leverages!.find((field) => field.id === fieldID)!
                  .value!.toString()
          }
        />
      );
    }
    return (
      <View style={{ display: 'flex', gap: 4 }}>
        <View style={{ width: 116 }}>
          <Text variant="labelMedium">{label}</Text>
        </View>
        {/* <Text variant="labelMedium">{label}</Text> */}
        <TextInput
          mode="outlined"
          placeholder="0"
          placeholderTextColor="grey"
          keyboardType="number-pad"
          contentStyle={{ fontFamily: 'SourceCodePro-Regular' }}
          disabled={set.completed}
          // label={label}
          style={{
            height: 32,
            width: 64,
            backgroundColor: set.completed
              ? theme.colors.gray2
              : theme.colors.background,
          }}
          textColor={
            set.completed ? theme.colors.dark2 : theme.colors.onBackground
          }
          value={
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === undefined
              ? '0'
              : set.fields
                  .leverages!.find((field) => field.id === fieldID)!
                  .value!.toString()
          }
          onChangeText={(text) => handleNumeralFieldChange(text)}
        />
      </View>
    );
  }

  if (fieldName === 'value' && trackingType === 'assists') {
    if (mode === 'read') {
      return (
        <TextInputReading
          label={label}
          labelWidth={116}
          value={
            set.fields.assists!.find((field) => field.id === fieldID)!.value ===
              null ||
            set.fields.assists!.find((field) => field.id === fieldID)!.value ===
              undefined ||
            set.fields
              .assists!.find((field) => field.id === fieldID)!
              .value?.toString() === ''
              ? '0'
              : set.fields
                  .assists!.find((field) => field.id === fieldID)!
                  .value!.toString()
          }
        />
      );
    }
    return (
      <View style={{ display: 'flex', gap: 4 }}>
        <View style={{ width: 116 }}>
          <Text variant="labelMedium">{label}</Text>
        </View>
        {/* <Text variant="labelMedium">{label}</Text> */}
        <TextInput
          mode="outlined"
          placeholder="0"
          placeholderTextColor="grey"
          keyboardType="number-pad"
          // label={label}
          style={{
            height: 32,
            width: 64,
            backgroundColor: set.completed
              ? theme.colors.gray2
              : theme.colors.background,
          }}
          textColor={
            set.completed ? theme.colors.dark2 : theme.colors.onBackground
          }
          contentStyle={{ fontFamily: 'SourceCodePro-Regular' }}
          disabled={set.completed}
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
      </View>
    );
  }

  if (mode === 'read') {
    return (
      <TextInputReading
        label={label}
        labelWidth="auto"
        value={
          set.fields.reps === undefined ||
          set.fields.reps === null ||
          set.fields.reps.toString() === ''
            ? '0'
            : set.fields.reps.toString()
        }
      />
    );
  }

  return (
    <View style={{ display: 'flex', gap: 4 }}>
      {/* <View style={{ width: 116, backgroundColor: 'red' }}>
        <Text variant="labelMedium">{label}</Text>
      </View> */}
      <Text variant="labelMedium">{label}</Text>
      <TextInput
        mode="outlined"
        placeholder="0"
        placeholderTextColor="grey"
        keyboardType="number-pad"
        // label={label}
        contentStyle={{ fontFamily: 'SourceCodePro-Regular' }}
        disabled={set.completed}
        style={{
          height: 32,
          width: 64,
          backgroundColor: set.completed
            ? theme.colors.gray2
            : theme.colors.background,
        }}
        textColor={
          set.completed ? theme.colors.dark2 : theme.colors.onBackground
        }
        value={
          set.fields.reps === undefined || set.fields.reps === null
            ? '0'
            : set.fields.reps.toString()
        }
        onChangeText={(text) => handleNumeralFieldChange(text)}
      />
    </View>
  );
}
