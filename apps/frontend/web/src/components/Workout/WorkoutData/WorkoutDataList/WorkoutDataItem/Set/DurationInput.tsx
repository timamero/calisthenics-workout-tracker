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
    const value = set.fields[fieldName]
      ? getSecondsInDuration(set.fields[fieldName])
      : '0s';
    return (
      <Stack gap="xxs">
        <Text ff="heading">{label}</Text>
        <Text fw={600}>{value}s</Text>
      </Stack>
    );
  }
  return (
    <TextInput
      mod={{ isloginput: true }}
      w={88}
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
