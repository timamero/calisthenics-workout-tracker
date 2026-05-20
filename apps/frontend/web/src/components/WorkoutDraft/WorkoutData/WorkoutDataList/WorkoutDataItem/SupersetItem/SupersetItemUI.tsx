import {
  Stack,
  Group,
  Title,
  Button,
  Box,
  useMatches,
  Paper,
} from '@mantine/core';
import { IoAdd } from 'react-icons/io5';
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
  const appliedTitleSize = useMatches({
    base: parentType === null ? 'h5' : 'h6',

    md: 'h3',
  });
  return (
    <Paper
      withBorder
      w="100%"
      radius="lg"
      bg="var(--mantine-color-violet-elevation-4)"
      bd="1px solid var(--mantine-color-violet-2)"
      my={{ base: 0, md: parentType === null ? 'xs' : 0 }}
    >
      <Stack bdrs="md" w="100%" align="center" gap={0}>
        <Group
          wrap="nowrap"
          w="100%"
          style={{
            borderBottom: '1px solid var(--mantine-color-violet-2)',
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
              <Title
                order={parentType === null ? 2 : 3}
                size={appliedTitleSize}
                c="dark.3"
              >
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
          <Box w="100%" px={{ base: 'xxs', md: 'lg' }}>
            <ExercisesList />
          </Box>
        ) : (
          <ExerciseSetGroup />
        )}
        {(mode === 'edit' || mode === 'build') && (
          <Stack my="sm">
            <Button
              variant="outline-violet"
              component={Link}
              to="/workout/add-exercise"
              leftSection={<IoAdd size={24} />}
              onClick={() => handleOpenAddExerciseClick()}
            >
              Exercise
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
