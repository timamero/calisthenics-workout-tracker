import { Stack, Group, Text, Button, Box } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { Mode, Superset } from '@cwt/schema/workouts';

import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import ExerciseSetGroup from '../ExerciseSetGroup';
import ExercisesList from './ExercisesList';
import WorkoutItemMenu from '../WorkoutItemMenu';

interface SupersetItemUIProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSupersetClick: () => void;
  handleOpenAddExerciseClick: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSupersetClick,
  handleOpenAddExerciseClick,
}: SupersetItemUIProps) {
  return (
    <Stack bg="transparent" w="100%" maw={600} align="center" gap={0}>
      <Group
        bd="2px solid var(--mantine-color-default-border)"
        bdrs="lg"
        wrap="nowrap"
        w="100%"
      >
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
            <Text>Superset</Text>
          </Group>
        </Group>
        {(mode === 'edit' || mode === 'build') && (
          <Box p="md">
            <WorkoutItemMenu
              itemType="superset"
              handleUpClick={handleUpClick}
              handleDownClick={handleDownClick}
              handleDeleteClick={handleDeleteSupersetClick}
              isFirst={isFirst}
              isLast={isLast}
            />
          </Box>
        )}
      </Group>
      {mode === 'edit' || mode === 'build' ? (
        <ExercisesList />
      ) : (
        <ExerciseSetGroup />
      )}
      {(mode === 'edit' || mode === 'build') && (
        <Button
          variant="filled"
          color="orange.9"
          component={Link}
          to="/workout/add-exercise"
          onClick={() => handleOpenAddExerciseClick()}
        >
          Add Exercise
        </Button>
      )}
    </Stack>
  );
}
