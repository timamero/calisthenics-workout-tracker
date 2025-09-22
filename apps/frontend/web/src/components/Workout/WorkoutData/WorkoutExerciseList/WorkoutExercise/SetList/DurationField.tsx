import * as React from 'react';
import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../contexts/SetContext';
import DurationInput from '../../../../../common/DurationInput';
import { getSecondsInDuration } from '../../../../../../utils/durationUtils'; //TODO: Replace with package util

interface DurationFieldProps {
  fieldName: 'rest' | 'time';
  label?: string;
}

export default function DurationField({
  fieldName,
  label,
}: DurationFieldProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  const setIndex = React.useContext(SetContext)!.setIndex;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === '') {
      const updatedField: Partial<SetFields> = {
        [fieldName]: '',
      };
      handleSetFieldChange(setIndex, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
      const num = Number(value);
      if (num >= 0 && num <= 300) {
        const updatedField: Partial<SetFields> = {
          [fieldName]: 'PT' + event.currentTarget.value + 'S',
        };
        handleSetFieldChange(setIndex, updatedField);
      }
    }
    // Otherwise, do not update
  };
  return (
    <DurationInput
      label={label || (fieldName === 'rest' ? 'Rest' : 'Time')}
      sec={getSecondsInDuration(set.fields[fieldName]!.toString())}
      handleChange={handleChange}
    />
  );
}
