import * as React from 'react';
import { TextInput } from '@mantine/core';

import type { Leverage, SetFields } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import { useWorkoutDraftStore } from '@cwt/state/stores';

interface NumeralInputProps {
  label: string;
  fieldName: 'reps' | 'weight' | 'value';
  fieldID?: string;
}

export default function NumeralInput({
  label,
  fieldName,
  fieldID,
}: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const setLeverageIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageOrAssistIDToMod,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldID) {
      setLeverageIDToMod(fieldID);
    }
    if (event.currentTarget.value == '') {
      const updatedField: Partial<SetFields> | Pick<Leverage, 'value'> = {
        [fieldName]: undefined,
      };
      handleSetFieldChange(set.id, updatedField);
    } else {
      const updatedField: Partial<SetFields> | Pick<Leverage, 'value'> = {
        [fieldName]: Number(event.currentTarget.value),
      };
      handleSetFieldChange(set.id, updatedField);
    }
  };

  // const value =
  //   fieldName === 'value'
  //     ? set.fields.leverages![0].value === null
  //       ? ''
  //       : set.fields.leverages![0].value!.toString()
  //     : set.fields[fieldName] === undefined
  //       ? ''
  //       : set.fields[fieldName]!.toString();
  // console.log('NumeralInput - value: ', value);

  if (fieldName === 'value') {
    return (
      <TextInput
        w={68}
        label={label}
        placeholder={'0'}
        value={
          set.fields.leverages!.find((field) => field.id === fieldID)!.value ===
            null ||
          set.fields.leverages!.find((field) => field.id === fieldID)!.value ===
            undefined
            ? ''
            : set.fields
                .leverages!.find((field) => field.id === fieldID)!
                .value!.toString()
        }
        onChange={handleChange}
      />
    );
  }
  return (
    <TextInput
      w={68}
      label={label}
      placeholder={'0'}
      value={
        set.fields[fieldName] === undefined
          ? ''
          : set.fields[fieldName]!.toString()
      }
      onChange={handleChange}
    />
  );
}
