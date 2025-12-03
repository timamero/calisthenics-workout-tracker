import { useContext, type ChangeEvent } from 'react';
import { TextInput } from '@mantine/core';

import type { Leverage, Assist, SetFields } from '@cwt/schema/workouts';
import { SetContext, WorkoutDataItemContext } from '@cwt/context';

import { useWorkoutDraftStore } from '@cwt/state/stores';

interface NumeralInputProps {
  label: string;
  fieldName: 'reps' | 'weight' | 'value';
  fieldID?: string;
  trackingType?: string | null;
}

export default function NumeralInput({
  label,
  fieldName,
  fieldID,
  trackingType = null,
}: NumeralInputProps) {
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const exerciseID = useContext(WorkoutDataItemContext)?.item.id;
  const set = useContext(SetContext)!.set;
  const handleSetFieldChange = useContext(SetContext)!.handleSetFieldChange;

  const setLeverageOrAssistIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageOrAssistIDToMod,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (fieldID) {
      setLeverageOrAssistIDToMod(fieldID);
    }
    if (event.currentTarget.value == '') {
      const updatedField:
        | Partial<SetFields>
        | Pick<Leverage, 'value'>
        | Pick<Assist, 'value'> = {
        [fieldName]: undefined,
      };
      if (parentType === 'superset') {
        handleSetFieldChange(set.id, updatedField, exerciseID);
      } else {
        handleSetFieldChange(set.id, updatedField);
      }
    } else {
      const updatedField:
        | Partial<SetFields>
        | Pick<Leverage, 'value'>
        | Pick<Assist, 'value'> = {
        [fieldName]: Number(event.currentTarget.value),
      };
      if (parentType === 'superset') {
        handleSetFieldChange(set.id, updatedField, exerciseID);
      } else {
        handleSetFieldChange(set.id, updatedField);
      }
    }
  };

  if (fieldName === 'value' && trackingType === 'leverages') {
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
  if (fieldName === 'value' && trackingType === 'assists') {
    return (
      <TextInput
        w={68}
        label={label}
        placeholder={'0'}
        value={
          set.fields.assists!.find((field) => field.id === fieldID)!.value ===
            null ||
          set.fields.assists!.find((field) => field.id === fieldID)!.value ===
            undefined
            ? ''
            : set.fields
                .assists!.find((field) => field.id === fieldID)!
                .value!.toString()
        }
        onChange={handleChange}
      />
    );
  }
  if (fieldName !== 'value') {
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
}
