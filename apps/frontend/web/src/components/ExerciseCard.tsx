import { useContext } from 'react';

import {
  Title,
  Text,
  Paper,
  Group,
  Badge,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { type ExerciseResponse } from '@cwt/schema/exercises';

import { ExerciseDetailContext } from '@cwt/context';

interface ExerciseCardProps {
  exercise: ExerciseResponse;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const setDetailExercise = useContext(ExerciseDetailContext)?.setExercise;
  const detailHandlers = useContext(ExerciseDetailContext)?.handlers;

  const difficultyColor =
    exercise.difficulty == 'beginner'
      ? 'blue'
      : exercise.difficulty == 'intermediate'
        ? 'yellow'
        : 'red';

  const handleExerciseClick = () => {
    if (exercise && setDetailExercise && detailHandlers) {
      setDetailExercise(exercise);
      detailHandlers.open();
    }
  };
  return (
    <UnstyledButton onClick={handleExerciseClick}>
      <Paper shadow="lg" p="md" radius="lg" miw={300} maw={460} withBorder>
        <Stack
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="sm"
        >
          <Group justify="flex-end">
            <Badge ff="monospace" color={difficultyColor}>
              {exercise.difficulty}
            </Badge>
          </Group>
          <Group justify="space-between" mb="sm">
            <Title order={2} size="h5">
              {exercise.name}
            </Title>
          </Group>
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <Text tt="uppercase" size="xs" c="gray.7">
              Muscles:{' '}
            </Text>
            <Group gap={8}>
              {exercise.target_muscles.map((muscle, i) => {
                return (
                  <Badge ff="monospace" variant="light" color="grape" key={i}>
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
                <Badge ff="monospace" color="dark" variant="transparent">
                  ---
                </Badge>
              ) : (
                exercise.required_equipment.map((equipment, i) => (
                  <Badge ff="monospace" color="dark" variant="outline" key={i}>
                    {equipment}
                  </Badge>
                ))
              )}
            </Group>
          </Group>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}
