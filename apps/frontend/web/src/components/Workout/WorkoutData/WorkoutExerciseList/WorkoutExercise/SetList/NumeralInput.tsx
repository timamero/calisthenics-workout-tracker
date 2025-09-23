import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../contexts/SetContext';

interface NumeralInputProps {
  label: 'reps' | 'weight';
}

export default function NumeralInput({ label }: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value == '') {
      const updatedField: Partial<SetFields> = {
        [label]: undefined,
      };
      handleSetFieldChange(setIndex, updatedField);
    } else {
      const updatedField: Partial<SetFields> = {
        [label]: Number(event.currentTarget.value),
      };
      handleSetFieldChange(setIndex, updatedField);
    }
  };
  return (
    <TextInput
      label={label[0].toUpperCase() + label.slice(1)}
      placeholder={'0'}
      value={
        set.fields[label] === undefined ? '' : set.fields[label].toString()
      }
      onChange={handleChange}
    />
  );
}
