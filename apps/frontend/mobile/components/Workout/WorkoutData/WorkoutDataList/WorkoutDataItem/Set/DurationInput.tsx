import { useContext } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { getSecondsInDuration, formatDuration } from '@cwt/utils';
import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';
import TextInputReading from './TextInputReading';

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
    return <TextInputReading label={label} value={value} />;
  }

  return (
    <View style={{ display: 'flex', gap: 4 }}>
      <Text variant="labelMedium">
        {label[0].toUpperCase() + label.slice(1)}
      </Text>
      <TextInput
        mode="outlined"
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor="grey"
        style={{
          height: 32,
          backgroundColor: set.completed
            ? theme.colors.gray2
            : theme.colors.background,
        }}
        textColor={
          set.completed ? theme.colors.dark2 : theme.colors.onBackground
        }
        contentStyle={{ fontFamily: 'SourceCodePro-Regular' }}
        // label={label[0].toUpperCase() + label.slice(1)}
        value={getSecondsInDuration(set.fields[fieldName]!.toString())}
        onChangeText={(text) => handleRestFieldChange(text)}
        disabled={set.completed}
      />
    </View>
  );
}
