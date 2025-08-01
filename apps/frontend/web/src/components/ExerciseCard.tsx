import { Title, Text, Paper, Group, Badge, Stack } from '@mantine/core';
import { Exercise } from '@cwt/schema/exerciseSchema';

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Paper shadow="lg" p="md" radius="lg">
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="sm"
      >
        <Group justify="space-between" mb="sm">
          <Title order={2} size="h5">
            {exercise.name}
          </Title>
          <Badge color="yellow">{exercise.difficulty}</Badge>
        </Group>
        <Group gap="sm" wrap="nowrap" align="flex-start">
          <Text tt="uppercase" size="xs" c="gray.7">
            Muscles:{' '}
          </Text>
          <Group gap={8}>
            {exercise.target_muscles.map((muscle, i) => {
              return (
                <Badge color="pink" key={i}>
                  {muscle}
                </Badge>
              );
            })}
          </Group>
        </Group>
        <Group gap="sm" wrap="nowrap" align="flex-start">
          <Text tt="uppercase" size="xs" c="gray.7">
            Equipment:{' '}
          </Text>
          <Group gap={8}>
            {exercise.required_equipment == null ||
            exercise.required_equipment.length == 0 ? (
              <Badge>None</Badge>
            ) : (
              exercise.required_equipment.map((equipment, i) => (
                <Badge key={i}>{equipment}</Badge>
              ))
            )}
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
