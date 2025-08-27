import {
  Title,
  Paper,
  Group,
  Stack,
  UnstyledButton,
  Text,
  Badge,
} from '@mantine/core';
import { type Exercise } from '@cwt/schema/exercises';

import classes from './ExerciseCard.module.css';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  // const difficultyColor =
  //   exercise.difficulty == 'beginner'
  //     ? 'blue'
  //     : exercise.difficulty == 'intermediate'
  //       ? 'yellow'
  //       : 'red';

  const handleExerciseClick = () => {
    console.log('clicked exercise');
  };
  return (
    <UnstyledButton onClick={handleExerciseClick}>
      <Paper
        shadow="xs"
        p="sm"
        radius="lg"
        miw={300}
        maw={460}
        withBorder
        className={classes.card}
      >
        <Stack
          // bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="sm"
        >
          <Group justify="center" mb="sm">
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
