import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../contexts/SetContext';
import { getSecondsInDuration } from '../../../../../../utils/durationUtils'; //TODO: Replace with package util

interface DurationInputProps {
  label: 'rest' | 'time';
}

export default function DurationInput({ label }: DurationInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  const setIndex = React.useContext(SetContext)!.setIndex;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === '') {
      const updatedField: Partial<SetFields> = {
        [label]: '',
      };
      handleSetFieldChange(setIndex, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
      const num = Number(value);
      if (num >= 0 && num <= 300) {
        const updatedField: Partial<SetFields> = {
          [label]: 'PT' + event.currentTarget.value + 'S',
        };
        handleSetFieldChange(setIndex, updatedField);
      }
    }
    // Otherwise, do not update
  };
  return (
    <TextInput
      label={label[0].toUpperCase() + label.slice(1)}
      description="Seconds (0-300)"
      type="text"
      inputMode="numeric"
      pattern="^(0|[1-9][0-9]{0,2})$"
      min={0}
      max={300}
      value={getSecondsInDuration(set.fields[label]!.toString())}
      onChange={handleChange}
      maxLength={3}
      placeholder="0-300"
      autoComplete="off"
    />
  );
}
