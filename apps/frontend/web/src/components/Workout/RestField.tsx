import { useState } from 'react';

import type { Set } from '@cwt/schema/workouts';

import DurationInput from '../common/DurationInput';

interface RestFieldProps {
  set: Set;
  index: number;
  value: string;
  handleSetFieldChange: (
    set: Set,
    setIndex: number,
    updatedField: Pick<Set, 'fields'>,
  ) => void;
}

export default function RestField({
  set,
  index,
  value,
  handleSetFieldChange,
}: RestFieldProps) {
  console.log('value passes to rest field', value);
  const [sec, setSec] = useState<string>(getNumberBeforeS(value));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === '') {
      setSec('');
      const updatedField: Pick<Set, 'fields'> = {
        fields: { rest: '' },
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
          fields: { rest: event.currentTarget.value + 'S' },
        };
        handleSetFieldChange(set, index, updatedField);
      }
    }
    // Otherwise, do not update

    // const updatedField: Pick<Set, 'fields'> = {
    //   fields: { rest: event.currentTarget.value + 'S' },
    // };
    // handleSetFieldChange(set, index, updatedField);
  };
  return (
    <DurationInput
      label="Rest"
      sec={sec}
      setSec={setSec}
      handleChange={handleChange}
    />
  );
}

function getNumberBeforeS(inputString: string): string {
  if (typeof inputString !== 'string') {
    console.error('Invalid input: Please provide a string.');
    return '';
  }

  const regex = /^(\d+)S$/;
  const match = inputString.match(regex);

  if (match) {
    return parseInt(match[1], 10).toString();
  }
  return '';
}
