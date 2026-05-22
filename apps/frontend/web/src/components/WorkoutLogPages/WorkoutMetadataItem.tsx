import { Group, Text } from '@mantine/core';

interface WorkoutMetadataProps {
  label: string;
  data: string;
}

export default function WorkoutMetadataItem({
  label,
  data,
}: WorkoutMetadataProps) {
  return (
    <Group align="flex-start" gap="xxs" wrap="nowrap">
      <Text ff="heading" tt="uppercase" size="md" c="gray.7">
        {label}:{' '}
      </Text>
      <Text
        ff="monospace"
        tt="none"
        size="md"
        fw={700}
        lts="var(--mantine-letter-spacing-wider)"
        px="sm"
      >
        {data}
      </Text>
    </Group>
  );
}
