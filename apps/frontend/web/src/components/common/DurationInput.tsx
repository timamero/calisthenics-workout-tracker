import { Stack, Group, NumberInput, Text } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

interface DurationInputProps {
  label: string;
  sec: number | string;
  setSec: Dispatch<SetStateAction<number | string>>;
}

export default function DurationInput({
  label,
  sec,
  setSec,
}: DurationInputProps) {
  return (
    <Stack>
      <Text>{label}</Text>
      <Group>
        <NumberInput
          label="Seconds"
          min={0}
          max={90}
          value={sec}
          onChange={setSec}
        />
      </Group>
    </Stack>
  );
}
