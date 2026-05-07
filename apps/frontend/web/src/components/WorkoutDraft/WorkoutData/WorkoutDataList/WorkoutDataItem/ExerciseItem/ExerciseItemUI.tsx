import { Stack, Text, Button, Group, Box } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';
import SetList from '../SetList';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import WorkoutItemMenu from '../WorkoutItemMenu';

interface ExerciseItemUIProps {
  mode: Mode;
  name: string;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleAddSetClick: () => void;
  handleDeleteExerciseClick: () => void;
}

export default function ExerciseItemUI({
  mode,
  name,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: ExerciseItemUIProps) {
  return (
    <Stack
      bd="1px solid var(--mantine-color-default-border)"
      // p="lg"
      w="100%"
      maw={600}
      bg="transparent"
      bdrs="lg"
      align="center"
    >
      <Group w="100%" wrap="nowrap">
        <Group justify="space-between" wrap="nowrap" w="100%" p="xs">
          {(mode === 'edit' || mode === 'build') && (
            <ReorderButtonGroup
              handleUpClick={() => handleUpClick()}
              handleDownClick={() => handleDownClick()}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
          <Group flex={1} align="center" justify="center">
            <Text>{name}</Text>
          </Group>
        </Group>
        {(mode === 'edit' || mode === 'build') && (
          <Box p="md">
            <WorkoutItemMenu
              itemType="exercise"
              handleUpClick={handleUpClick}
              handleDownClick={handleDownClick}
              handleDeleteClick={handleDeleteExerciseClick}
              isFirst={isFirst}
              isLast={isLast}
            />
          </Box>
        )}
      </Group>
      <Stack gap="xs">
        <SetList />
      </Stack>
      {(mode === 'edit' || mode === 'build') && (
        <Button
          variant="outline"
          color="dark"
          onClick={() => handleAddSetClick()}
        >
          Add Set
        </Button>
      )}
    </Stack>
  );
}
