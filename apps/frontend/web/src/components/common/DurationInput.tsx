import { Stack, Group, NumberInput, Text } from '@mantine/core';

interface DurationInputProps {
  label: string;
}

export default function DurationInput({ label }: DurationInputProps) {
  return (
    <Stack>
      <Text>{label}</Text>
      <Group>
        <NumberInput label="Minutes" min={0} max={60} />
        <NumberInput label="Seconds" min={0} max={60} />
      </Group>
    </Stack>
  );
}
