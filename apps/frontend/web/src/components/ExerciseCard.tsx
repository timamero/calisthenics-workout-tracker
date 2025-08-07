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
import { Exercise } from '@cwt/schema/exerciseSchema';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

// import ExerciseDetailOverlay from './ExerciseDetailOverlay';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const setDetailExercise = useContext(
    ExerciseDetailContext,
  )?.setDetailExercise;

  const difficultyColor =
    exercise.difficulty == 'beginner'
      ? 'blue'
      : exercise.difficulty == 'intermediate'
        ? 'yellow'
        : 'red';

  const handleExerciseClick = () => {
    if (exercise && setDetailExercise) {
      console.log('opened exercise');
      setDetailExercise(exercise);
      // handler.open();
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
            <Badge color={difficultyColor}>{exercise.difficulty}</Badge>
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
                  <Badge variant="light" color="grape" key={i}>
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
                <Badge color="dark" variant="transparent">
                  ---
                </Badge>
              ) : (
                exercise.required_equipment.map((equipment, i) => (
                  <Badge color="dark" variant="outline" key={i}>
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
