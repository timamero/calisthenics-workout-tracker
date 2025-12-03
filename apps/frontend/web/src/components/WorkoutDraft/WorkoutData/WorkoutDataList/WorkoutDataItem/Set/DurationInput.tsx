import { useContext } from 'react';
import { TextInput } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useDurationInputChange } from '@cwt/hooks';

import { getSecondsInDuration } from '@cwt/utils';

interface DurationInputProps {
  label: string;
  fieldName: 'rest' | 'time';
}

export default function DurationInput({
  label,
  fieldName,
}: DurationInputProps) {
  const set = useContext(SetContext)!.set;
  const handleChange = useDurationInputChange(fieldName);
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
      placeholder="0-300"
      autoComplete="off"
    />
  );
}
