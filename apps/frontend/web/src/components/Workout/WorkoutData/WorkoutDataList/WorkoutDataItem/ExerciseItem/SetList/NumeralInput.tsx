import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';

interface NumeralInputProps {
  label: 'reps' | 'weight';
}

export default function NumeralInput({ label }: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value == '') {
      const updatedField: Partial<SetFields> = {
        [label]: undefined,
      };
      handleSetFieldChange(set.id, updatedField);
    } else {
      const updatedField: Partial<SetFields> = {
        [label]: Number(event.currentTarget.value),
      };
      handleSetFieldChange(set.id, updatedField);
    }
  };
  return (
    <TextInput
      w={68}
      label={label[0].toUpperCase() + label.slice(1)}
      placeholder={'0'}
      value={
        set.fields[label] === undefined ? '' : set.fields[label]!.toString()
      }
      onChange={handleChange}
    />
  );
}
