import { Stack, Text } from '@mantine/core';

export default function EmptyWorkoutPlaceholder({
  action,
}: {
  action: string;
}) {
  return (
    <Stack align="center" bd="2px dashed gray.6" p="lg">
      <Text size="lg" fw={800}>
        {`Ready to start ${action} your workout?`}
      </Text>
      <Text c="gray.8">Add your first exercise to begin</Text>
    </Stack>
  );
}
