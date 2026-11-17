import { useContext, type ChangeEvent } from 'react';
import { TextInput } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useFieldInputChange } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import TextInputReading from './TextInputReading';

interface NumeralInputProps {
  label: string;
  fieldName: 'reps' | 'value';
  fieldID?: string;
  trackingType?: string | null;
}

interface TextInputLoggingProps {
  value: string;
  label: string;
  handleChange: (
    eventOrValue: string | ChangeEvent<HTMLInputElement> | null,
  ) => void;
}

function TextInputLogging({
  value,
  label,
  handleChange,
}: TextInputLoggingProps) {
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
export default function NumeralInput({
  label,
  fieldName,
  fieldID,
  trackingType = null,
}: NumeralInputProps) {
  const set = useContext(SetContext)!.set;

  const handleChange = useFieldInputChange(fieldName, 'numeral', fieldID);
  const mode = useWorkoutDraftStore((state) => state.mode);

  if (fieldName === 'value' && trackingType === 'set progressions') {
    if (mode === 'read') {
      return (
        <TextInputReading
          label={label}
          value={
            set.fields.setProgressions!.find((field) => field.id === fieldID)!
              .value === null ||
            set.fields.setProgressions!.find((field) => field.id === fieldID)!
              .value === undefined ||
            set.fields
              .setProgressions!.find((field) => field.id === fieldID)!
              .value!.toString() === ''
              ? '0'
              : set.fields
                  .setProgressions!.find((field) => field.id === fieldID)!
                  .value!.toString()
          }
        />
      );
    }
    return (
      <TextInputLogging
        value={
          set.fields.setProgressions!.find((field) => field.id === fieldID)!
            .value === null ||
          set.fields.setProgressions!.find((field) => field.id === fieldID)!
            .value === undefined
            ? ''
            : set.fields
                .setProgressions!.find((field) => field.id === fieldID)!
                .value!.toString()
        }
        label={label}
        handleChange={handleChange}
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
        label={label}
        handleChange={handleChange}
      />
    );
  }
}
