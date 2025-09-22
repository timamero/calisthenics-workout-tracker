import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../contexts/SetContext';

export default function RepField() {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value == '') {
      const updatedField: Partial<SetFields> = {
        reps: undefined,
      };
      handleSetFieldChange(setIndex, updatedField);
    } else {
      const updatedField: Partial<SetFields> = {
        reps: Number(event.currentTarget.value),
      };
      handleSetFieldChange(setIndex, updatedField);
    }
  };
  return (
    <TextInput
      label="Reps"
      placeholder={'0'}
      value={set.fields.reps === undefined ? '' : set.fields.reps.toString()}
      onChange={handleChange}
    />
  );
}
