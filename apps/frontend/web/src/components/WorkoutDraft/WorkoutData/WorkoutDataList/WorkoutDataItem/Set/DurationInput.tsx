import { useContext } from 'react';
import { TextInput, Text, Stack } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';

import { getSecondsInDuration } from '@cwt/utils';
import { useWorkoutDraftStore } from '@cwt/state/stores';

interface DurationInputProps {
  label: string;
  fieldName: 'rest' | 'time';
}

export default function DurationInput({
  label,
  fieldName,
}: DurationInputProps) {
  const set = useContext(SetContext)!.set;
  const handleChange = useFieldInputChange(fieldName, 'duration');
  const mode = useWorkoutDraftStore((state) => state.mode);
  if (mode === 'read') {
    return (
      <Stack>
        <Text>{label}</Text>
        <Text>{getSecondsInDuration(set.fields[fieldName]!.toString())}</Text>
      </Stack>
    );
  }
  return (
    <TextInput
      w={68}
      label={label}
      type="text"
      inputMode="numeric"
      pattern="^(0|[1-9][0-9]{0,2})$"
      min={0}
      max={999}
      value={getSecondsInDuration(set.fields[fieldName]!.toString())}
      onChange={handleChange}
      maxLength={3}
      placeholder="0-999"
      autoComplete="off"
    />
  );
}
