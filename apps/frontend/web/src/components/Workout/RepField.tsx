import { useState } from 'react';
import { TextInput } from '@mantine/core';

import type { Set } from '@cwt/schema/workouts';

interface RepFieldProps {
  set: Set;
  index: number;
  value: number;
  handleSetFieldChange: (
    set: Set,
    setIndex: number,
    updatedField: Pick<Set, 'fields'>,
  ) => void;
}

export default function RepField({
  set,
  index,
  value,
  handleSetFieldChange,
}: RepFieldProps) {
  const [reps, setReps] = useState<number>(value);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReps(Number(event.currentTarget.value));
    const updatedField: Pick<Set, 'fields'> = {
      fields: { reps: Number(event.currentTarget.value) },
    };
    handleSetFieldChange(set, index, updatedField);
  };
  return (
    <TextInput
      label="Reps"
      placeholder={value.toString()}
      value={reps}
      onChange={handleChange}
    />
  );
}
