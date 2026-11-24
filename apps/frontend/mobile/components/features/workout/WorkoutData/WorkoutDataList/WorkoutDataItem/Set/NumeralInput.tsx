import { useContext } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../../../../../../theme';
import { Text } from '../../../../../../../customText';
import TextInputReading from './TextInputReading';

interface NumeralInputProps {
  label: string;
  fieldName: 'reps' | 'value';
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
  const route = useRoute();
  const set = useContext(SetContext)!.set;

  const handleNumeralFieldChange = useFieldInputChange(
    fieldName,
    'numeral',
    fieldID,
  );
  const mode = useWorkoutDraftStore((state) => state.mode);

  const isDisabled = set.completed && route.name === 'Workout';

  if (fieldName === 'value') {
    if (mode === 'read') {
      return (
        <TextInputReading
          label={label}
          labelWidth={116}
          value={
            set.fields.setProgressions!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.setProgressions!.find((field) => field.id === fieldID)!
              .value === undefined ||
            set.fields
              .setProgressions!.find((field) => field.id === fieldID)!
              .value?.toString() === ''
              ? '0'
              : set.fields
                  .setProgressions!.find((field) => field.id === fieldID)!
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
        <TextInput
          mode="outlined"
          placeholder="0"
          placeholderTextColor="grey"
          keyboardType="number-pad"
          contentStyle={{ fontFamily: 'SourceCodePro-Regular' }}
          disabled={isDisabled}
          style={{
            height: 32,
            width: 64,
            backgroundColor: isDisabled
              ? theme.colors.gray2
              : theme.colors.background,
          }}
          textColor={
            isDisabled ? theme.colors.dark2 : theme.colors.onBackground
          }
          value={
            set.fields.setProgressions!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.setProgressions!.find((field) => field.id === fieldID)!
              .value === undefined
              ? '0'
              : set.fields
                  .setProgressions!.find((field) => field.id === fieldID)!
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
      <Text variant="labelMedium">{label}</Text>
      <TextInput
        mode="outlined"
        placeholder="0"
        placeholderTextColor="grey"
        keyboardType="number-pad"
        contentStyle={{ fontFamily: 'SourceCodePro-Regular' }}
        disabled={isDisabled}
        style={{
          height: 32,
          width: 64,
          backgroundColor: isDisabled
            ? theme.colors.gray2
            : theme.colors.background,
        }}
        textColor={isDisabled ? theme.colors.dark2 : theme.colors.onBackground}
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
