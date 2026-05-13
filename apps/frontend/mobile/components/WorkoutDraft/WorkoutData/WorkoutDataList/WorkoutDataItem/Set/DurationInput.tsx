import { useContext } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { getSecondsInDuration, formatDuration } from '@cwt/utils';
import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

interface DurationInputProps {
  label: string;
  fieldName: 'time' | 'rest';
}

export default function DurationInput({
  label,
  fieldName,
}: DurationInputProps) {
  const theme = useTheme() as CustomTheme;

  const set = useContext(SetContext)!.set;
  const handleRestFieldChange = useFieldInputChange(fieldName, 'duration');
  const mode = useWorkoutDraftStore((state) => state.mode);
  if (mode === 'read') {
    const value = set.fields[fieldName]
      ? formatDuration(set.fields[fieldName])
      : '00:00';
    return (
      <View>
        <Text style={{ color: theme.colors.onBackground }}>{label}</Text>
        <Text style={{ color: theme.colors.onBackground }}>{value}</Text>
      </View>
    );
  }

  return (
    <TextInput
      mode="outlined"
      keyboardType="number-pad"
      placeholder="0"
      placeholderTextColor="grey"
      style={{ height: 32 }}
      textColor={theme.colors.onBackground}
      // label={label[0].toUpperCase() + label.slice(1)}
      value={getSecondsInDuration(set.fields[fieldName]!.toString())}
      onChangeText={(text) => handleRestFieldChange(text)}
    />
  );
}
