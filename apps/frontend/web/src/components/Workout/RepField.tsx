import { Stack, TextInput } from '@mantine/core';

export default function RepField({ value }: { value: number }) {
  return (
    <Stack>
      <TextInput label="Reps" placeholder="0" value={value} />
    </Stack>
  );
}
