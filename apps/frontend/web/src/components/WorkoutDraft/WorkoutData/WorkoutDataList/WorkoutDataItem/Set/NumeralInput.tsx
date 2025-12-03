import { useContext } from 'react';
import { TextInput } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';

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
  const set = useContext(SetContext)!.set;

  const handleChange = useFieldInputChange(fieldName, 'numeral', fieldID);

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
