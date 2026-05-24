import {
  Title,
  Paper,
  Group,
  Stack,
  UnstyledButton,
  Text,
  Badge,
} from '@mantine/core';
import { type ExerciseResponse } from '@cwt/schema/exercises';

import { getDifficultyVariant } from '../../../utils';
import classes from './ExerciseCard.module.css';

interface ExerciseCardProps {
  exercise: ExerciseResponse;
  isSelected: 'true' | 'false';
  onExerciseClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function ExerciseCard({
  exercise,
  isSelected,
  onExerciseClick,
}: ExerciseCardProps) {
  return (
    <UnstyledButton
      onClick={(e) => onExerciseClick(e)}
      data-exercise-id={exercise.id}
      // miw={300}
      // maw={460}
    >
      <Paper
        data-is-selected={isSelected}
        shadow="sm"
        p="md"
        radius="lg"
        miw={300}
        maw={460}
        h="100%"
        mah={230}
        mx="auto"
        withBorder
        className={classes.card}
      >
        <Stack align="stretch" justify="center" gap="sm">
          <Group justify="flex-end">
            <Badge variant={getDifficultyVariant(exercise.difficulty)}>
              {exercise.difficulty}
            </Badge>
          </Group>
          <Group justify="space-between" mb="sm">
            <Title order={2} size="h5">
              {exercise.name}
            </Title>
          </Group>
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <Text ff="heading" tt="uppercase" size="xs" c="gray.7">
              Muscles:{' '}
            </Text>
            <Group gap={8}>
              {exercise.target_muscles.map((muscle, i) => {
                return (
                  <Badge variant="filled-gray" key={i}>
                    {muscle}
                  </Badge>
                );
              })}
            </Group>
          </Group>
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <Text ff="heading" tt="uppercase" size="xs" c="gray.7">
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
                  <Badge variant="filled" key={i}>
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
