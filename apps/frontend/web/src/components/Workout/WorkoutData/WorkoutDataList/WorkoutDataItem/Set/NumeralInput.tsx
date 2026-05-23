import { useContext } from 'react';
import { TextInput } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import TextInputReading from './TextInputReading';

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
  const mode = useWorkoutDraftStore((state) => state.mode);

  function TextInputLogging({ value }: { value: string }) {
    return (
      <TextInput
        mod={{ isloginput: true }}
        w={88}
        label={label}
        placeholder={'0'}
        value={value}
        onChange={handleChange}
      />
    );
  }

  if (fieldName === 'value' && trackingType === 'leverages') {
    if (mode === 'read') {
      return (
        <TextInputReading
          label={label}
          value={
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.leverages!.find((field) => field.id === fieldID)!
              .value === undefined ||
            set.fields
              .leverages!.find((field) => field.id === fieldID)!
              .value!.toString() === ''
              ? '0'
              : set.fields
                  .leverages!.find((field) => field.id === fieldID)!
                  .value!.toString()
          }
        />
      );
    }
    return (
      <TextInputLogging
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
      />
    );
  }
  if (fieldName === 'value' && trackingType === 'assists') {
    if (mode === 'read') {
      return (
        <TextInputReading
          label={label}
          value={
            set.fields.assists!.find((field) => field.id === fieldID)!.value ===
              null ||
            set.fields.assists!.find((field) => field.id === fieldID)!.value ===
              undefined ||
            set.fields
              .assists!.find((field) => field.id === fieldID)!
              .value!.toString() === ''
              ? '0'
              : set.fields
                  .assists!.find((field) => field.id === fieldID)!
                  .value!.toString()
          }
        />
      );
    }
    return (
      <TextInputLogging
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
      />
    );
  }
  if (fieldName !== 'value') {
    if (mode === 'read') {
      return (
        <TextInputReading
          label={label}
          value={
            set.fields[fieldName] === undefined ||
            set.fields[fieldName]?.toString() === ''
              ? '0'
              : set.fields[fieldName]!.toString()
          }
        />
      );
    }
    return (
      <TextInputLogging
        value={
          set.fields[fieldName] === undefined
            ? '0'
            : set.fields[fieldName]!.toString()
        }
      />
    );
  }
}
