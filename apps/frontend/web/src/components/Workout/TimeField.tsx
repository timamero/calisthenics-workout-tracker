import { useState } from 'react';

import type { Set } from '@cwt/schema/workouts';

import DurationInput from '../common/DurationInput';
import { getSecondsInDuration } from '../../utils/durationUtils';

interface TimeFieldProps {
  set: Set;
  index: number;
  value: string;
  handleSetFieldChange: (
    set: Set,
    setIndex: number,
    updatedField: Pick<Set, 'fields'>,
  ) => void;
}

export default function TimeField({
  set,
  index,
  value,
  handleSetFieldChange,
}: TimeFieldProps) {
  const [sec, setSec] = useState<string>(getSecondsInDuration(value));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === '') {
      setSec('');
      const updatedField: Pick<Set, 'fields'> = {
        fields: { time: '' },
      };
      handleSetFieldChange(set, index, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
      const num = Number(value);
      if (num >= 0 && num <= 300) {
        setSec(num.toString());
        const updatedField: Pick<Set, 'fields'> = {
          fields: { time: 'PT' + event.currentTarget.value + 'S' },
        };
        handleSetFieldChange(set, index, updatedField);
      }
    }
    // Otherwise, do not update
  };
  return (
    <DurationInput
      label="Time"
      sec={sec}
      setSec={setSec}
      handleChange={handleChange}
    />
  );
}
