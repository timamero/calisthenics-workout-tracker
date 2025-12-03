import { useContext } from 'react';
import { TextInput } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useDurationInputChange } from '@cwt/hooks';

import { getSecondsInDuration } from '@cwt/utils';

interface DurationInputProps {
  label: 'rest' | 'time';
}

export default function DurationInput({ label }: DurationInputProps) {
  const set = useContext(SetContext)!.set;
  const handleChange = useDurationInputChange(label);
  return (
    <TextInput
      w={68}
      label={`${label[0].toUpperCase() + label.slice(1)} (sec)`}
      type="text"
      inputMode="numeric"
      pattern="^(0|[1-9][0-9]{0,2})$"
      min={0}
      max={999}
      value={getSecondsInDuration(set.fields[label]!.toString())}
      onChange={handleChange}
      maxLength={3}
      placeholder="0-300"
      autoComplete="off"
    />
  );
}
