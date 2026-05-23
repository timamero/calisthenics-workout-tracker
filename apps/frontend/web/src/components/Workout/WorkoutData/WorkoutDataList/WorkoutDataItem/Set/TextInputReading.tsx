import { Stack, Text } from '@mantine/core';

interface TextInputReadingProps {
  label: string;
  value: string;
}

export default function TextInputReading({
  label,
  value,
}: TextInputReadingProps) {
  return (
    <Stack gap={0} mx="md" maw={154}>
      <Text ff="heading" lh="xxs" style={{ textWrap: 'balance' }}>
        {label}
      </Text>

      <Text fw={600}>{value}</Text>
    </Stack>
  );
}
