import { useState } from 'react';
import { Stack, TextInput } from '@mantine/core';

export default function RepField({ value }: { value: number }) {
  const [reps, setReps] = useState<number>(value);
  return (
    <Stack>
      <TextInput
        label="Reps"
        placeholder={value.toString()}
        value={reps}
        onChange={(event) => setReps(Number(event.currentTarget.value))}
      />
    </Stack>
  );
}
