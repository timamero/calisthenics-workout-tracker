import { useState } from 'react';
import { TextInput } from '@mantine/core';

export default function RepField({ value }: { value: number }) {
  const [reps, setReps] = useState<number>(value);
  return (
    <TextInput
      label="Reps"
      placeholder={value.toString()}
      value={reps}
      onChange={(event) => setReps(Number(event.currentTarget.value))}
    />
  );
}
