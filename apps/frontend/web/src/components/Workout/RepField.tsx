// import { useState } from 'react';
import { TextInput } from '@mantine/core';

// import type { Set } from '@cwt/schema/workouts';

interface RepFieldProps {
  // set: Set;
  index: number;
  value: number;
  handleSetFieldChange: (
    // set: Set,
    setIndex: number,
    updatedField: {
      reps?: number | undefined;
      weight?: number | undefined;
      time?: string | undefined;
      rest?: string | undefined;
    },
  ) => void;
}

export default function RepField({
  // set,
  index,
  value,
  handleSetFieldChange,
}: RepFieldProps) {
  // const [reps, setReps] = useState<string>(value.toString());
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setReps(event.currentTarget.value);
    const updatedField: {
      reps?: number | undefined;
      weight?: number | undefined;
      time?: string | undefined;
      rest?: string | undefined;
    } = {
      reps: Number(event.currentTarget.value),
    };
    handleSetFieldChange(index, updatedField);
  };
  return (
    <TextInput
      label="Reps"
      placeholder={value.toString()}
      value={value}
      onChange={handleChange}
    />
  );
}
