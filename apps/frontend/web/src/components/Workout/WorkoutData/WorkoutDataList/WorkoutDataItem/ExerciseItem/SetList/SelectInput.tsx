import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { Leverage } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import { useWorkoutDraftStore } from '@cwt/state/stores';

interface NumeralInputProps {
  label: string;
  // fieldName: 'value';
  fieldID?: string;
}

export default function SelectInput({ label, fieldID }: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const setLeverageIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageIDToMod,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldID) {
      setLeverageIDToMod(fieldID);
    }
    if (event.currentTarget.value == '') {
      const updatedField: Pick<Leverage, 'value'> = {
        value: null,
      };
      handleSetFieldChange(set.id, updatedField);
    } else {
      const updatedField: Pick<Leverage, 'value'> = {
        value: Number(event.currentTarget.value),
      };
      handleSetFieldChange(set.id, updatedField);
    }
  };

  return (
    <TextInput
      w={68}
      label={label}
      placeholder={'0'}
      value={
        set.fields.leverages!.find((field) => field.id === fieldID)!.value ===
        null
          ? ''
          : set.fields
              .leverages!.find((field) => field.id === fieldID)!
              .value!.toString()
      }
      onChange={handleChange}
    />
  );
}
