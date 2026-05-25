import { useContext } from 'react';
import { Select } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useSetProgressionsStore } from '@cwt/state/stores';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import TextInputReading from './TextInputReading';

interface SelectInputProps {
  label: string;
  fieldID: string;
}

export default function SelectInput({ label, fieldID }: SelectInputProps) {
  const set = useContext(SetContext)!.set;

  const setProgressionID = set.fields.setProgressions?.find(
    (field) => field.id === fieldID,
  )!.set_progression_id as number;

  const setProgression = useSetProgressionsStore((state) =>
    state.getSetProgressionByID(setProgressionID),
  );
  const mode = useWorkoutDraftStore((state) => state.mode);

  const handleChange = useFieldInputChange('value', 'select', fieldID);

  const options = setProgression.value_options;
  if (mode === 'read') {
    return (
      <TextInputReading
        label={label}
        value={
          set.fields.setProgressions?.find((field) => field.id === fieldID)
            ?.value
            ? (set.fields.setProgressions.find((field) => field.id === fieldID)!
                .value as string)
            : ''
        }
      />
    );
  }
  return (
    <Select
      w={192}
      label={label}
      data={options}
      value={
        set.fields.setProgressions?.find((field) => field.id === fieldID)?.value
          ? (set.fields.setProgressions.find((field) => field.id === fieldID)!
              .value as string)
          : null
      }
      onChange={handleChange}
    />
  );
}
