import { Stack, Group, Title, Button, Box } from '@mantine/core';
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
  parentType?: 'superset' | 'section' | null;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSupersetClick: () => void;
  handleOpenAddExerciseClick: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  parentType,
  handleUpClick,
  handleDownClick,
  handleDeleteSupersetClick,
  handleOpenAddExerciseClick,
}: SupersetItemUIProps) {
  return (
    <Stack
      bdrs="md"
      bd="2px solid dark.1"
      bg="elevation.4"
      w="100%"
      maw={600}
      align="center"
      gap={0}
      my={parentType === null ? 'xl' : 0}
    >
      <Group
        // bd="2px solid gray.3"
        // bdrs="lg"
        wrap="nowrap"
        w="100%"
        bg="elevation.5"
        style={{
          borderTopLeftRadius: 'var(--mantine-radius-md)',
          borderTopRightRadius: 'var(--mantine-radius-md)',
          borderBottom: '1px solid var(--mantine-color-dark-1)',
          // borderBottomColor: 'var(--mantine-color-red-3)',
        }}
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
            <Title order={parentType === null ? 1 : 2} size="h4">
              Superset
            </Title>
          </Group>
        </Group>
        {(mode === 'edit' || mode === 'build') && (
          <Box p="xs">
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
        <Stack my="sm">
          <Button
            variant="filled"
            color="orange.9"
            component={Link}
            to="/workout/add-exercise"
            onClick={() => handleOpenAddExerciseClick()}
          >
            Add Exercise
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
