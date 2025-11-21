import { useContext } from 'react';
import { TextInput } from '@mantine/core';

import type { SetFields } from '@cwt/schema/workouts';
import { SetContext } from '@cwt/context';

import { getSecondsInDuration } from '@cwt/utils';

interface DurationInputProps {
  label: 'rest' | 'time';
}

export default function DurationInput({ label }: DurationInputProps) {
  const set = useContext(SetContext)!.set;
  const handleSetFieldChange = useContext(SetContext)!.handleSetFieldChange;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === '') {
      const updatedField: Partial<SetFields> = {
        [label]: '',
      };
      handleSetFieldChange(set.id, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
      const num = Number(value);
      if (num >= 0 && num <= 999) {
        const updatedField: Partial<SetFields> = {
          [label]: 'PT' + event.currentTarget.value + 'S',
        };
        handleSetFieldChange(set.id, updatedField);
      }
    }
    // Otherwise, do not update
  };
  return (
    <TextInput
      w={68}
      label={`${label[0].toUpperCase() + label.slice(1)} (sec)`}
      // description="Seconds"
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
