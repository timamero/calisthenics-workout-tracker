import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';

interface NumeralInputProps {
  label: string;
  fieldName: 'reps' | 'weight' | 'leverages' | 'assists';
}

export default function NumeralInput({ label, fieldName }: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value == '') {
      const updatedField: Partial<SetFields> = {
        [fieldName]: undefined,
      };
      handleSetFieldChange(set.id, updatedField);
    } else {
      const updatedField: Partial<SetFields> = {
        [fieldName]: Number(event.currentTarget.value),
      };
      handleSetFieldChange(set.id, updatedField);
    }
  };

  const value =
    fieldName === 'leverages'
      ? set.fields.leverages![0].value === null
        ? ''
        : set.fields.leverages![0].value!.toString()
      : set.fields[fieldName] === undefined
        ? ''
        : set.fields[fieldName]!.toString();
  return (
    <TextInput
      w={68}
      label={label}
      placeholder={'0'}
      value={value}
      // value={
      //   set.fields[fieldName] === undefined
      //     ? ''
      //     : set.fields[fieldName]!.toString()
      // }
      onChange={handleChange}
    />
  );
}
